"""
Decision Engine — North Star §13.1 ("What should I post today?") and §16.

Turns canonical events into *personalized* opportunities: the deterministic world-side
opportunity score from `TrendOpportunityEngine`, adjusted by explicit, itemized creator
deltas, and rendered in the output shape the North Star mandates (§16.1):

    THIS IS HAPPENING → WHY IT MATTERS → WHAT PEOPLE ARE MISSING → YOUR OPPORTUNITY
    → BEST ANGLE → BEST FORMAT → HOW TO PRODUCE IT → HOW WE'LL KNOW IF IT WORKED

Two rules shape every line of this module:

* Never hide the reasoning behind a number (§6). Every score ships with the factors that
  produced it, each carrying its own evidence basis.
* Never present an assumption as a measurement (§20.9). Creator deltas are zero when the
  history to justify them does not exist, and the gap is reported in `assumptions`.
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple

from pydantic import BaseModel, Field
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.db.models import Event, Topic
from backend.services.decision.creator_profile import (
    Affinity,
    CreatorProfile,
    EvidenceBasis,
    creator_profile_resolver,
    normalize_key,
)
from backend.services.trends.content_gap import content_gap_engine
from backend.services.trends.trend_opportunity import trend_opportunity_engine

logger = logging.getLogger(__name__)

# Events the sourcing layer has not corroborated must never win a recommendation.
BLOCKING_EVENT_STATUS = {"CONTRADICTED"}
LOW_TRUST_EVENT_STATUS = {"UNVERIFIED"}

class PlatformProfile(BaseModel):
    """What a platform is good for, and what it costs the creator to produce."""

    platform: str
    production_minutes: int
    strong_for: List[str]
    default_format: str
    fast_format: str


PLATFORM_PROFILES: Dict[str, PlatformProfile] = {
    "x": PlatformProfile(
        platform="x",
        production_minutes=10,
        strong_for=["breaking", "data breakdown", "contrarian", "developer impact"],
        default_format="thread",
        fast_format="single_post",
    ),
    "linkedin": PlatformProfile(
        platform="linkedin",
        production_minutes=20,
        strong_for=["business impact", "policy", "funding", "enterprise implications"],
        default_format="executive_post",
        fast_format="executive_post",
    ),
    "instagram": PlatformProfile(
        platform="instagram",
        production_minutes=45,
        strong_for=["product demo", "visual comparison", "beginner explanation"],
        default_format="reel",
        fast_format="carousel",
    ),
    "youtube": PlatformProfile(
        platform="youtube",
        production_minutes=120,
        strong_for=["technical explanation", "tutorial", "research", "case study"],
        default_format="short",
        fast_format="short",
    ),
}

# Which platforms a category tends to reward. Product heuristic, labelled as such
# wherever it is surfaced — not a measurement.
CATEGORY_PLATFORM_HINTS: Dict[str, List[str]] = {
    "ai models": ["x", "youtube", "linkedin", "instagram"],
    "research": ["x", "youtube", "linkedin", "instagram"],
    "coding": ["x", "youtube", "instagram", "linkedin"],
    "agents": ["x", "youtube", "linkedin", "instagram"],
    "business": ["linkedin", "x", "youtube", "instagram"],
    "policy": ["linkedin", "x", "youtube", "instagram"],
    "hardware": ["x", "linkedin", "youtube", "instagram"],
    "video": ["instagram", "youtube", "x", "linkedin"],
    "image": ["instagram", "x", "youtube", "linkedin"],
    "robotics": ["instagram", "youtube", "x", "linkedin"],
    "companies": ["x", "linkedin", "youtube", "instagram"],
}

class ScoreContribution(BaseModel):
    """One line of the audit trail behind a score."""

    factor: str
    raw_value: float
    weight: float = 1.0
    points: float                       # signed effect on the final score
    basis: EvidenceBasis = EvidenceBasis.DEFAULT
    sample_size: int = 0
    explanation: str


class PersonalizedOpportunity(BaseModel):
    """
    A world-side opportunity score plus the creator-side adjustments applied to it.

    `delta_vs_generic` is the whole point of §8: it is the number that proves this
    recommendation is not the same one every other creator would receive.
    """

    base_score: float
    personalized_score: float
    delta_vs_generic: float
    opportunity_type: str
    world_factors: List[ScoreContribution] = Field(default_factory=list)
    creator_factors: List[ScoreContribution] = Field(default_factory=list)
    measured_factor_count: int = 0
    assumed_factor_count: int = 0

    def reasoning_lines(self) -> List[str]:
        return [f"{c.factor}: {c.explanation}" for c in self.world_factors + self.creator_factors]


class TimingVerdict(BaseModel):
    action: str                          # POST_NOW, POST_SOON, WATCH, WAIT, SKIP
    reason: str
    window_hours: Optional[float] = None
    age_hours: Optional[float] = None


class SourceRef(BaseModel):
    name: str
    url: Optional[str] = None
    published_at: Optional[str] = None
    quality_tier: Optional[str] = None

class Recommendation(BaseModel):
    """The §16.1 output shape for a single opportunity."""

    event_id: Optional[str] = None
    topic_id: Optional[str] = None
    headline: str

    # Kept separate on purpose (§14): fact, interpretation, prediction.
    what_is_happening: str                     # FACT — from sourced event data
    why_it_matters: str                        # INTERPRETATION — labelled as such
    what_nobody_is_explaining: str             # gap analysis
    what_everyone_is_saying: str = ""

    opportunity: PersonalizedOpportunity
    timing: TimingVerdict

    best_angle: str
    why_this_angle: str
    alternative_angles: List[str] = Field(default_factory=list)

    platform: str
    why_this_platform: str
    content_format: str
    estimated_production_minutes: int

    hook_type: str
    hook: str

    production: Dict[str, Any] = Field(default_factory=dict)
    success_criteria: Dict[str, Any] = Field(default_factory=dict)

    # Truth surface (§14)
    event_status: str = "DEVELOPING"
    event_confidence: float = 0.0
    source_count: int = 0
    sources: List[SourceRef] = Field(default_factory=list)
    claims_to_avoid: List[str] = Field(default_factory=list)


class SkippedCandidate(BaseModel):
    headline: str
    event_id: Optional[str] = None
    action: str
    reason: str
    score: float

class DailyDecision(BaseModel):
    """The answer to "what should I post today?" — one click, §13.1."""

    generated_at: str
    creator: Dict[str, Any] = Field(default_factory=dict)
    candidates_considered: int = 0
    time_available_minutes: Optional[int] = None

    top_recommendation: Optional[Recommendation] = None
    alternatives: List[Recommendation] = Field(default_factory=list)
    publish_now: List[str] = Field(default_factory=list)
    ignore: List[SkippedCandidate] = Field(default_factory=list)

    # Honesty surface — §20.9. The UI is expected to render these.
    assumptions: List[str] = Field(default_factory=list)
    evidence_coverage: Dict[str, Any] = Field(default_factory=dict)
    no_recommendation_reason: Optional[str] = None


def _age_hours(moment: Optional[datetime], now: Optional[datetime] = None) -> Optional[float]:
    if moment is None:
        return None
    now = now or datetime.now(timezone.utc)
    if moment.tzinfo is None:
        moment = moment.replace(tzinfo=timezone.utc)
    return max(0.0, (now - moment).total_seconds() / 3600.0)


def _affinity_points(affinity: Affinity, max_points: float) -> float:
    """
    Converts a 0..1 affinity into signed points. A neutral (unmeasured) affinity
    contributes exactly zero, so a cold-start creator gets the honest world-side score.
    """
    if affinity.is_neutral:
        return 0.0
    return round((affinity.score - 0.5) * 2.0 * max_points, 2)

class DecisionEngine:
    """
    Ranks what the creator should make next. Deterministic, database-only, no model calls:
    the decision must still be available when the network or the model is not.
    """

    # Mirrors TrendOpportunityEngine's formula so the audit trail is exactly additive.
    WORLD_WEIGHTS = {
        "momentum": 0.22,
        "freshness": 0.15,
        "novelty": 0.15,
        "audience_fit": 0.15,
        "discussion_potential": 0.10,
        "importance": 0.10,
        "source_quality": 0.05,
        "competition_headroom": 0.08,
    }

    MAX_CREATOR_POINTS = {
        "topic_history": 8.0,
        "platform_history": 5.0,
        "format_history": 4.0,
        "hook_history": 3.0,
    }
    REPETITION_PENALTY_POINTS = 12.0
    REPETITION_COOLDOWN_DAYS = 7.0
    UNVERIFIED_DISCOUNT_POINTS = 15.0

    # ------------------------------------------------------------------ world
    def _world_signals(
        self, event: Event, topic: Optional[Topic]
    ) -> Tuple[Dict[str, float], Dict[str, Tuple[EvidenceBasis, str]]]:
        """Extracts the eight world-side signals and where each one came from."""
        source_count = max(1, int(event.source_count or 1))
        independent = max(1, int(event.independent_source_count or source_count))

        signals: Dict[str, float] = {
            "momentum": float(event.momentum_score or 0.0),
            "freshness": float(event.freshness_score or 0.0),
            "importance": float(event.relevance_score or 0.0),
            "source_quality": float(event.confidence_score or 0.0),
            # Independent corroboration is the best available proxy for how much
            # conversation an event is actually generating.
            "discussion_potential": min(100.0, 40.0 + independent * 8.0),
        }

        provenance: Dict[str, Tuple[EvidenceBasis, str]] = {
            "momentum": (EvidenceBasis.MEASURED, f"Momentum {signals['momentum']:.0f}/100 from event observations."),
            "freshness": (EvidenceBasis.MEASURED, f"Freshness {signals['freshness']:.0f}/100 from the event timestamp."),
            "importance": (EvidenceBasis.MEASURED, f"Relevance {signals['importance']:.0f}/100 from the intelligence layer."),
            "source_quality": (
                EvidenceBasis.MEASURED,
                f"{event.status} across {source_count} sources ({independent} independent).",
            ),
            "discussion_potential": (
                EvidenceBasis.MEASURED,
                f"{independent} independent sources are already covering this.",
            ),
        }

        if topic is not None:
            signals["novelty"] = float(topic.novelty_score or 0.0)
            signals["audience_fit"] = float(topic.audience_fit_score or 0.0)
            competition = float(topic.competition_score or 0.0)
            provenance["novelty"] = (EvidenceBasis.MEASURED, f"Trend novelty {signals['novelty']:.0f}/100.")
            provenance["audience_fit"] = (
                EvidenceBasis.MEASURED,
                f"Trend audience fit {signals['audience_fit']:.0f}/100 for {topic.primary_audience}.",
            )
            provenance["competition_headroom"] = (
                EvidenceBasis.MEASURED,
                f"Competition {competition:.0f}/100 on this trend leaves {100 - competition:.0f} points of headroom.",
            )
        else:
            # No clustered trend yet. Coverage volume is the only competition signal
            # available, and novelty/fit are product defaults — say so.
            signals["novelty"] = 70.0
            signals["audience_fit"] = 75.0
            competition = min(95.0, source_count * 9.0)
            provenance["novelty"] = (EvidenceBasis.DEFAULT, "No clustered trend yet — novelty assumed at 70/100.")
            provenance["audience_fit"] = (EvidenceBasis.DEFAULT, "No clustered trend yet — audience fit assumed at 75/100.")
            provenance["competition_headroom"] = (
                EvidenceBasis.MEASURED,
                f"Estimated from coverage volume: {source_count} sources → competition {competition:.0f}/100.",
            )

        signals["competition"] = competition
        signals["competition_headroom"] = max(0.0, 100.0 - competition)
        return signals, provenance

    def score(
        self,
        event: Event,
        topic: Optional[Topic],
        profile: CreatorProfile,
        platform: str,
        content_format: str,
        hook_type: str,
        now: Optional[datetime] = None,
    ) -> PersonalizedOpportunity:
        """Base world score + itemized creator deltas. Every point is traceable."""
        signals, provenance = self._world_signals(event, topic)

        world: List[ScoreContribution] = []
        for factor, weight in self.WORLD_WEIGHTS.items():
            raw = signals[factor]
            basis, detail = provenance[factor]
            world.append(
                ScoreContribution(
                    factor=factor,
                    raw_value=round(raw, 1),
                    weight=weight,
                    points=round(raw * weight, 2),
                    basis=basis,
                    sample_size=int(event.source_count or 1),
                    explanation=detail,
                )
            )

        base_score = trend_opportunity_engine.calculate_opportunity_score(
            momentum_score=signals["momentum"],
            freshness_score=signals["freshness"],
            novelty_score=signals["novelty"],
            audience_fit_score=signals["audience_fit"],
            discussion_score=signals["discussion_potential"],
            importance_score=signals["importance"],
            source_quality_score=signals["source_quality"],
            competition_score=signals["competition"],
        )

        # Keep the audit trail exactly additive even when the engine clamps.
        summed = round(sum(c.points for c in world), 2)
        if abs(summed - base_score) > 0.15:
            world.append(
                ScoreContribution(
                    factor="score_floor_or_ceiling",
                    raw_value=base_score,
                    weight=1.0,
                    points=round(base_score - summed, 2),
                    basis=EvidenceBasis.DEFAULT,
                    explanation="Opportunity scores are clamped to the 15–100 range.",
                )
            )

        creator: List[ScoreContribution] = []
        topic_key = topic.name if topic is not None else event.category

        for bucket, key, label in (
            ("topic", topic_key, "topic_history"),
            ("platform", platform, "platform_history"),
            ("format", content_format, "format_history"),
            ("hook", hook_type, "hook_history"),
        ):
            affinity = profile.affinity(bucket, key)
            points = _affinity_points(affinity, self.MAX_CREATOR_POINTS[label])
            if points == 0.0:
                continue
            direction = "outperform" if points > 0 else "underperform"
            creator.append(
                ScoreContribution(
                    factor=label,
                    raw_value=round(affinity.score, 3),
                    weight=self.MAX_CREATOR_POINTS[label],
                    points=points,
                    basis=affinity.evidence.basis,
                    sample_size=affinity.evidence.sample_size,
                    explanation=(
                        f"You {direction} your own baseline on {bucket} '{affinity.key}' "
                        f"by {affinity.lift_vs_baseline_pct:+.0f}% across "
                        f"{affinity.evidence.sample_size} posts."
                    ),
                )
            )

        # Don't recommend what the creator just published (§13.1 "previous posts").
        days_ago = profile.days_since_posted_about(topic_key)
        if days_ago is not None and days_ago < self.REPETITION_COOLDOWN_DAYS:
            decay = 1.0 - (days_ago / self.REPETITION_COOLDOWN_DAYS)
            creator.append(
                ScoreContribution(
                    factor="recent_repetition",
                    raw_value=round(days_ago, 2),
                    weight=self.REPETITION_PENALTY_POINTS,
                    points=-round(self.REPETITION_PENALTY_POINTS * decay, 2),
                    basis=EvidenceBasis.MEASURED,
                    sample_size=1,
                    explanation=(
                        f"You published on '{topic_key}' {days_ago:.1f} days ago — "
                        "repeating it this soon competes with your own post."
                    ),
                )
            )

        # Truth before speed (§14): an uncorroborated event is not an opportunity.
        if (event.status or "").upper() in LOW_TRUST_EVENT_STATUS:
            creator.append(
                ScoreContribution(
                    factor="verification_discount",
                    raw_value=float(event.confidence_score or 0.0),
                    weight=self.UNVERIFIED_DISCOUNT_POINTS,
                    points=-self.UNVERIFIED_DISCOUNT_POINTS,
                    basis=EvidenceBasis.MEASURED,
                    sample_size=int(event.source_count or 1),
                    explanation=(
                        "Only one uncorroborated source so far — publishing on this "
                        "risks your credibility more than it gains reach."
                    ),
                )
            )

        personalized = round(
            min(100.0, max(0.0, base_score + sum(c.points for c in creator))), 1
        )
        all_factors = world + creator
        return PersonalizedOpportunity(
            base_score=base_score,
            personalized_score=personalized,
            delta_vs_generic=round(personalized - base_score, 1),
            opportunity_type=(topic.opportunity_type if topic is not None else "EVENT_OPPORTUNITY"),
            world_factors=world,
            creator_factors=creator,
            measured_factor_count=sum(1 for c in all_factors if c.basis == EvidenceBasis.MEASURED),
            assumed_factor_count=sum(1 for c in all_factors if c.basis != EvidenceBasis.MEASURED),
        )

    # --------------------------------------------------------------- routing
    def choose_platform(
        self,
        event: Event,
        profile: CreatorProfile,
        time_available_minutes: Optional[int] = None,
        forced_platform: Optional[str] = None,
    ) -> Tuple[PlatformProfile, str]:
        """Picks the platform and explains the choice (§9.1). Never silently generic."""
        category = normalize_key(event.category)
        ranked = CATEGORY_PLATFORM_HINTS.get(category, ["x", "linkedin", "youtube", "instagram"])

        if forced_platform:
            chosen = PLATFORM_PROFILES.get(normalize_key(forced_platform))
            if chosen is not None:
                return chosen, f"You asked for {chosen.platform}."

        affordable = [
            p for p in ranked
            if time_available_minutes is None
            or PLATFORM_PROFILES[p].production_minutes <= time_available_minutes
        ]
        if not affordable:
            cheapest = min(ranked, key=lambda p: PLATFORM_PROFILES[p].production_minutes)
            profile_hit = PLATFORM_PROFILES[cheapest]
            return profile_hit, (
                f"{time_available_minutes} minutes is below every platform's production "
                f"cost for this category; {profile_hit.platform} is the cheapest at "
                f"~{profile_hit.production_minutes} min."
            )

        def rank_score(name: str) -> float:
            positional = float(len(affordable) - affordable.index(name))
            affinity = profile.affinity("platform", name)
            return positional + (affinity.score - 0.5) * 6.0

        best = max(affordable, key=rank_score)
        chosen = PLATFORM_PROFILES[best]
        affinity = profile.affinity("platform", best)

        why = (
            f"{chosen.platform} rewards {', '.join(chosen.strong_for[:2])}, which is what "
            f"a {event.category} story is; ~{chosen.production_minutes} min to produce."
        )
        if affinity.evidence.basis == EvidenceBasis.MEASURED:
            why += (
                f" Your {chosen.platform} posts run {affinity.lift_vs_baseline_pct:+.0f}% "
                f"against your baseline over {affinity.evidence.sample_size} posts."
            )
        else:
            why += " Platform fit is a product heuristic — you have no measured history here yet."
        return chosen, why

    def choose_format(
        self,
        platform: PlatformProfile,
        profile: CreatorProfile,
        time_available_minutes: Optional[int] = None,
    ) -> str:
        """Default format, unless the time budget or measured history prefers the fast one."""
        default, fast = platform.default_format, platform.fast_format
        if time_available_minutes is not None and time_available_minutes < platform.production_minutes:
            return fast
        if default == fast:
            return default
        a_default = profile.affinity("format", default)
        a_fast = profile.affinity("format", fast)
        if a_fast.evidence.basis == EvidenceBasis.MEASURED and a_fast.score > a_default.score:
            return fast
        return default

    def choose_hook(
        self,
        topic: Optional[Topic],
        opportunity_type: str,
        profile: CreatorProfile,
    ) -> Tuple[str, str]:
        """Returns (hook_type, why)."""
        if topic is not None and topic.recommended_hook_type:
            base = normalize_key(topic.recommended_hook_type)
            why = f"Trend intelligence recommends a {base} hook for this topic."
        elif opportunity_type in ("BREAKING", "HIGH_REACH"):
            base, why = "breaking", "The story is still surging — lead with the fact, not the take."
        elif opportunity_type == "OVERSATURATED":
            base, why = "contrarian", "Coverage is crowded — only a differentiated take earns attention."
        elif opportunity_type == "EARLY_DISCOVERY":
            base, why = "builder", "Early and under-covered — a hands-on angle beats commentary."
        else:
            base, why = "data_driven", "A concrete number is the most reliable opener for this topic."

        measured = [a for a in profile.hook_affinity.values() if a.evidence.is_measured]
        if measured:
            best = max(measured, key=lambda a: a.score)
            if best.score > 0.5 and best.key != base:
                return best.key, (
                    f"{why} Overridden to '{best.key}': your {best.key} hooks run "
                    f"{best.lift_vs_baseline_pct:+.0f}% against your baseline across "
                    f"{best.evidence.sample_size} posts."
                )
        return base, why

    def timing(
        self,
        event: Event,
        topic: Optional[Topic],
        opportunity_score: float,
        now: Optional[datetime] = None,
    ) -> Tuple[TimingVerdict, str]:
        """Returns (verdict, opportunity_type) using the shared classifier."""
        age = _age_hours(event.event_timestamp, now)
        lifecycle = (topic.lifecycle_stage if topic is not None else None) or (
            "EMERGING" if (age or 99) <= 6 else "RISING"
        )
        opp_type, action, reason = trend_opportunity_engine.classify_opportunity(
            opportunity_score=opportunity_score,
            lifecycle_stage=lifecycle,
            momentum_change_pct=float(topic.momentum_change_pct or 0.0) if topic is not None else 0.0,
            competition_score=float(topic.competition_score or 0.0) if topic is not None else 40.0,
            novelty_score=float(topic.novelty_score or 70.0) if topic is not None else 70.0,
            audience_fit_score=float(topic.audience_fit_score or 75.0) if topic is not None else 75.0,
            age_hours=age if age is not None else 6.0,
        )
        window = None
        if action == "POST_NOW":
            window = 6.0 if lifecycle in ("EXPLODING", "EMERGING") else 12.0
        elif action == "POST_SOON":
            window = 24.0
        return (
            TimingVerdict(action=action, reason=reason, window_hours=window, age_hours=round(age, 1) if age else None),
            opp_type,
        )

    def _success_criteria(self, profile: CreatorProfile, platform: str) -> Dict[str, Any]:
        """
        How we'll know if it worked (§16.1, §17). Targets come from the creator's own
        measured baseline, or are explicitly absent when there is no baseline.
        """
        baseline = profile.baseline_engagement_rate
        if baseline is None:
            return {
                "has_baseline": False,
                "note": (
                    "No engagement baseline yet — log this post's metrics and it becomes "
                    "the first data point the recommendations learn from."
                ),
                "log_endpoint": "POST /api/performance/log",
            }
        return {
            "has_baseline": True,
            "baseline_engagement_rate_pct": baseline,
            "target_engagement_rate_pct": round(baseline * 1.2, 3),
            "basis": f"Median of {profile.measured_posts} published posts with known reach.",
            "log_endpoint": "POST /api/performance/log",
            "platform": platform,
        }

    def _hook_draft(self, event: Event, hook_type: str, key_fact: Optional[str]) -> str:
        """
        A grounded opening line, not a creative flourish. Anchored to a verifiable fact so
        the content factory refines real substance rather than inventing it.
        """
        anchor = key_fact or event.canonical_title
        drafts = {
            "breaking": f"{event.canonical_title} — and the part that actually matters: {anchor}",
            "contrarian": f"Everyone is repeating the headline. {anchor} is the detail that undercuts it.",
            "builder": f"Here's what {event.canonical_title} changes in your stack today: {anchor}",
            "data_driven": f"{anchor}. That single number is the story in {event.canonical_title}.",
            "educational": f"What {event.canonical_title} actually does, in plain terms: {anchor}",
        }
        return drafts.get(hook_type, drafts["data_driven"])

    def _why_it_matters(
        self,
        event: Event,
        gap_saturation: str,
        key_fact: Optional[str],
    ) -> str:
        """Interpretation, explicitly labelled and built only from fields we hold (§14)."""
        independent = max(1, int(event.independent_source_count or event.source_count or 1))
        age = _age_hours(event.event_timestamp)
        parts: List[str] = []
        if key_fact:
            parts.append(f"The verifiable change is: {key_fact}")
        age_text = f"{age:.0f}h after the event" if age is not None else "since detection"
        parts.append(
            f"{independent} independent source(s) corroborate it {age_text}, with momentum at "
            f"{float(event.momentum_score or 0):.0f}/100 and confidence {float(event.confidence_score or 0):.0f}/100."
        )
        parts.append(f"Coverage is {gap_saturation.lower()}, so the explanation gap is still open.")
        return "Interpretation (not a sourced claim): " + " ".join(parts)

    def _sources(self, event: Event) -> List[SourceRef]:
        refs: List[SourceRef] = []
        try:
            for src in list(event.sources or [])[:6]:
                refs.append(
                    SourceRef(
                        name=src.source_name,
                        url=src.url,
                        published_at=src.published_at.isoformat() if src.published_at else None,
                        quality_tier=src.quality_tier,
                    )
                )
        except Exception:  # relationship not loaded — fall back to the canonical source
            refs = []
        if not refs and event.primary_source_url:
            refs.append(SourceRef(name=event.primary_source_name or "Primary source", url=event.primary_source_url))
        return refs

    def build_recommendation(
        self,
        event: Event,
        topic: Optional[Topic],
        profile: CreatorProfile,
        time_available_minutes: Optional[int] = None,
        forced_platform: Optional[str] = None,
        now: Optional[datetime] = None,
    ) -> Recommendation:
        """Assembles one full §16.1 recommendation for a single event."""
        platform_profile, why_platform = self.choose_platform(
            event, profile, time_available_minutes, forced_platform
        )
        content_format = self.choose_format(platform_profile, profile, time_available_minutes)

        competition = float(topic.competition_score or 40.0) if topic is not None else min(
            95.0, max(1, int(event.source_count or 1)) * 9.0
        )
        gap = content_gap_engine.analyze_gap(
            trend_name=(topic.name if topic is not None else event.canonical_title),
            category=event.category or "AI Models",
            items_summary=event.summary or "",
            competition_score=competition,
        )

        provisional = self.score(
            event, topic, profile, platform_profile.platform, content_format, "data_driven", now
        )
        verdict, opp_type = self.timing(event, topic, provisional.personalized_score, now)
        hook_type, why_hook = self.choose_hook(topic, opp_type, profile)

        opportunity = self.score(
            event, topic, profile, platform_profile.platform, content_format, hook_type, now
        )
        opportunity.opportunity_type = opp_type

        key_facts = list(event.key_facts or [])
        key_fact = str(key_facts[0]) if key_facts else None

        angle = (
            (topic.recommended_angle if topic is not None else None)
            or event.recommended_angle
            or gap.recommended_angle
        )
        alternatives = [a for a in (gap.underserved_angles + gap.contrarian_angles) if a != angle][:5]

        claims_to_avoid = [str(c) for c in (event.contradictions or [])][:3]
        claims_to_avoid.append(gap.what_not_to_repeat)

        # §10.4 in decision form: the shape of the visual determines the engine.
        needs_exact_numbers = any(ch.isdigit() for ch in (key_fact or ""))
        production = {
            "create_everything_endpoint": "POST /api/create/everything",
            "payload": {
                "event_id": event.id,
                "platform": platform_profile.platform,
                "angle": angle,
                "format": content_format,
            },
            "visual_engine_hint": "remotion" if needs_exact_numbers else "gemini_omni",
            "visual_engine_reason": (
                "The claim turns on exact figures, which deterministic Remotion renders reliably "
                "and generative video does not."
                if needs_exact_numbers
                else "The claim is narrative rather than numeric, so generative footage carries it."
            ),
            "estimated_production_minutes": platform_profile.production_minutes,
        }

        return Recommendation(
            event_id=event.id,
            topic_id=topic.id if topic is not None else None,
            headline=event.canonical_title,
            what_is_happening=event.summary or event.canonical_title,
            why_it_matters=self._why_it_matters(event, gap.saturation_level, key_fact),
            what_nobody_is_explaining=gap.what_is_missing or gap.underserved_perspective,
            what_everyone_is_saying=gap.what_everyone_is_saying,
            opportunity=opportunity,
            timing=verdict,
            best_angle=angle,
            why_this_angle=(
                f"{gap.what_everyone_is_saying} {gap.underserved_perspective} "
                f"Competition on this trend is {competition:.0f}/100 "
                f"({gap.saturation_level.lower()} saturation)."
            ),
            alternative_angles=alternatives,
            platform=platform_profile.platform,
            why_this_platform=why_platform,
            content_format=content_format,
            estimated_production_minutes=platform_profile.production_minutes,
            hook_type=hook_type,
            hook=self._hook_draft(event, hook_type, key_fact),
            production=production,
            success_criteria=self._success_criteria(profile, platform_profile.platform),
            event_status=event.status or "DEVELOPING",
            event_confidence=float(event.confidence_score or 0.0),
            source_count=int(event.source_count or 1),
            sources=self._sources(event),
            claims_to_avoid=[c for c in claims_to_avoid if c],
        )

    # ---------------------------------------------------------------- top-level
    async def decide_today(
        self,
        db: AsyncSession,
        platform: Optional[str] = None,
        time_available_minutes: Optional[int] = None,
        limit: int = 3,
        candidate_pool: int = 25,
        now: Optional[datetime] = None,
    ) -> DailyDecision:
        """
        "What should I post today?" — §13.1.

        Returns the single best opportunity with its full reasoning, ranked alternatives,
        an explicit ignore list, and every assumption the ranking had to make.
        """
        from sqlalchemy.orm import selectinload  # local import keeps module import cheap

        profile = await creator_profile_resolver.resolve(db)

        events: List[Event] = []
        try:
            events = list(
                (
                    await db.execute(
                        select(Event)
                        .options(selectinload(Event.sources))
                        .order_by(desc(Event.momentum_score), desc(Event.detected_at))
                        .limit(candidate_pool)
                    )
                )
                .scalars()
                .all()
            )
        except Exception as exc:
            logger.warning("Decision engine could not load events: %s", exc)

        decision = DailyDecision(
            generated_at=(now or datetime.now(timezone.utc)).isoformat(),
            creator=profile.summary(),
            time_available_minutes=time_available_minutes,
            assumptions=list(profile.assumptions),
        )

        usable = [e for e in events if (e.status or "").upper() not in BLOCKING_EVENT_STATUS]
        decision.candidates_considered = len(usable)
        if not usable:
            decision.no_recommendation_reason = (
                "No corroborated events are on the radar right now. Run discovery "
                "(POST /api/collect) before asking for a recommendation."
                if not events
                else "Every candidate event is currently contradicted by its own sources."
            )
            return decision

        topic_ids = {e.topic_id for e in usable if e.topic_id}
        topics: Dict[str, Topic] = {}
        if topic_ids:
            try:
                rows = (
                    await db.execute(select(Topic).where(Topic.id.in_(topic_ids)))
                ).scalars().all()
                topics = {t.id: t for t in rows}
            except Exception as exc:
                logger.warning("Decision engine could not load topics: %s", exc)

        recommendations: List[Recommendation] = []
        for event in usable:
            try:
                recommendations.append(
                    self.build_recommendation(
                        event=event,
                        topic=topics.get(event.topic_id) if event.topic_id else None,
                        profile=profile,
                        time_available_minutes=time_available_minutes,
                        forced_platform=platform,
                        now=now,
                    )
                )
            except Exception as exc:  # one bad row must not sink the whole decision
                logger.warning("Skipped candidate %s: %s", event.id, exc)

        recommendations.sort(key=lambda r: r.opportunity.personalized_score, reverse=True)

        actionable = [r for r in recommendations if r.timing.action in ("POST_NOW", "POST_SOON")]
        skipped = [r for r in recommendations if r.timing.action not in ("POST_NOW", "POST_SOON")]

        if actionable:
            decision.top_recommendation = actionable[0]
            decision.alternatives = actionable[1:limit]
        else:
            decision.no_recommendation_reason = (
                f"All {len(recommendations)} candidates scored as WATCH, WAIT or SKIP. "
                "Nothing on the radar is worth your time right now — see the ignore list for why."
            )

        decision.publish_now = [
            r.headline for r in actionable if r.timing.action == "POST_NOW"
        ][:5]
        decision.ignore = [
            SkippedCandidate(
                headline=r.headline,
                event_id=r.event_id,
                action=r.timing.action,
                reason=r.timing.reason,
                score=r.opportunity.personalized_score,
            )
            for r in skipped[:5]
        ]

        top = decision.top_recommendation
        measured = top.opportunity.measured_factor_count if top else 0
        assumed = top.opportunity.assumed_factor_count if top else 0
        decision.evidence_coverage = {
            "measured_factors": measured,
            "assumed_factors": assumed,
            "creator_posts_on_record": profile.measured_posts,
            "personalized": bool(top and top.opportunity.delta_vs_generic != 0.0),
            "delta_vs_generic": top.opportunity.delta_vs_generic if top else 0.0,
        }
        if profile.is_cold_start():
            decision.assumptions.append(
                "This ranking is not yet personalized to your results — it reflects the "
                "world-side opportunity only. Log published posts to change that."
            )
        return decision

    decide_for_day = decide_today


decision_engine = DecisionEngine()

