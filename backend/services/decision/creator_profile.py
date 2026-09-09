"""
Creator Intelligence Layer — North Star §8.

Resolves a `CreatorProfile` from evidence: measured performance history first, declared
voice settings second, product defaults last. Every trait carries the basis it came from
so downstream scoring can never present an assumption as a measurement (North Star §20.9,
"use evidence rather than assumptions").

This module is deliberately free of network and model calls: it is pure computation over
rows the product already owns, so it is unit-testable and always available.
"""

from __future__ import annotations

import logging
import math
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.db.models import ContentPerformance, VoiceProfile

logger = logging.getLogger(__name__)

# A single post is an anecdote. These thresholds are the line between
# "we measured this" and "we are assuming this".
MIN_SAMPLES_FOR_SIGNAL = 3
MIN_SAMPLES_FOR_BASELINE = 5
HISTORY_LOOKBACK = 200

# Used only to attribute a platform to legacy rows recorded before
# ContentPerformance.platform existed. Never used to invent a metric.
FORMAT_TO_PLATFORM = {
    "single_post": "x",
    "thread": "x",
    "quote_post": "x",
    "reply": "x",
    "carousel": "instagram",
    "reel": "instagram",
    "story": "instagram",
    "short": "youtube",
    "long_form": "youtube",
    "video_script": "youtube",
    "article": "linkedin",
    "executive_post": "linkedin",
}

class EvidenceBasis(str, Enum):
    """Where a trait came from. Order matters: MEASURED outranks DECLARED outranks DEFAULT."""

    MEASURED = "MEASURED"   # computed from real ContentPerformance rows
    DECLARED = "DECLARED"   # the creator told us directly (VoiceProfile / settings)
    DEFAULT = "DEFAULT"     # product default — an assumption, not a fact


class Evidence(BaseModel):
    basis: EvidenceBasis = EvidenceBasis.DEFAULT
    sample_size: int = 0
    detail: str = "Product default — no creator data recorded yet."

    @property
    def is_measured(self) -> bool:
        return self.basis == EvidenceBasis.MEASURED


class Affinity(BaseModel):
    """
    A preference weight in 0..1 with the evidence behind it.

    0.5 means "no evidence either way" and therefore applies no adjustment downstream.
    Values only move away from 0.5 when measured against the creator's own baseline.
    """

    key: str
    score: float = 0.5
    lift_vs_baseline_pct: Optional[float] = None
    evidence: Evidence = Field(default_factory=Evidence)

    @property
    def is_neutral(self) -> bool:
        return abs(self.score - 0.5) < 1e-9

class CreatorProfile(BaseModel):
    """
    The creator model that turns a world event into a *personalized* opportunity.

    `assumptions` is a first-class field: it lists, in plain language, every trait the
    system had to assume because no data supported it. The UI is expected to show it.
    """

    creator_id: str = "default"

    # Identity & positioning
    audience: str = "AI engineers and technical builders"
    voice_tone: str = "Technical & direct"
    technical_depth: str = "High"
    expertise_domains: List[str] = Field(default_factory=list)
    avoid_patterns: List[str] = Field(default_factory=list)

    # Behavioural preferences
    risk_tolerance: float = 0.5          # 0 = safe//explanatory, 1 = contrarian
    posts_per_day_target: float = 2.0

    # Learned affinities (empty dicts are honest: nothing measured yet)
    topic_affinity: Dict[str, Affinity] = Field(default_factory=dict)
    platform_affinity: Dict[str, Affinity] = Field(default_factory=dict)
    format_affinity: Dict[str, Affinity] = Field(default_factory=dict)
    hook_affinity: Dict[str, Affinity] = Field(default_factory=dict)

    # Measured performance context
    baseline_engagement_rate: Optional[float] = None
    measured_posts: int = 0
    recent_posts: List[Dict[str, Any]] = Field(default_factory=list)

    # Honesty surface
    assumptions: List[str] = Field(default_factory=list)
    evidence: Dict[str, Evidence] = Field(default_factory=dict)

    # ---------------------------------------------------------------- helpers
    def affinity(self, bucket: str, key: Optional[str]) -> Affinity:
        """Returns the measured affinity for a key, or a neutral one if unmeasured."""
        table: Dict[str, Affinity] = getattr(self, f"{bucket}_affinity", {}) or {}
        norm = normalize_key(key)
        if norm and norm in table:
            return table[norm]
        return Affinity(
            key=norm or "unknown",
            score=0.5,
            evidence=Evidence(
                basis=EvidenceBasis.DEFAULT,
                sample_size=0,
                detail=f"No measured {bucket} history for '{norm or 'unknown'}' — treated as neutral.",
            ),
        )

    def days_since_posted_about(self, topic: Optional[str]) -> Optional[float]:
        """Days since this creator last published on `topic`. None if never (or unknown)."""
        norm = normalize_key(topic)
        if not norm:
            return None
        best: Optional[float] = None
        for post in self.recent_posts:
            if normalize_key(post.get("topic")) != norm:
                continue
            age = post.get("days_ago")
            if age is None:
                continue
            best = age if best is None else min(best, float(age))
        return best

    def is_cold_start(self) -> bool:
        """True when there is not enough history to personalize from measurement."""
        return self.measured_posts < MIN_SAMPLES_FOR_BASELINE

    def summary(self) -> Dict[str, Any]:
        measured = sum(
            1
            for table in (
                self.topic_affinity,
                self.platform_affinity,
                self.format_affinity,
                self.hook_affinity,
            )
            for a in table.values()
            if a.evidence.is_measured
        )
        return {
            "creator_id": self.creator_id,
            "audience": self.audience,
            "voice_tone": self.voice_tone,
            "measured_posts": self.measured_posts,
            "baseline_engagement_rate": self.baseline_engagement_rate,
            "measured_signals": measured,
            "cold_start": self.is_cold_start(),
            "assumption_count": len(self.assumptions),
        }


def normalize_key(value: Optional[str]) -> str:
    """Lowercase, trimmed key used for all affinity lookups."""
    if not value:
        return ""
    return " ".join(str(value).strip().lower().split())

def _engagement_rate(row: ContentPerformance) -> Optional[float]:
    """
    Engagement rate for one post, or None when the row has no denominator.

    Returning None (rather than 0.0) matters: a post with unknown reach must not drag a
    measured average downward and must not be counted as a sample.
    """
    if row.engagement_rate is not None:
        return float(row.engagement_rate)
    reach = row.views or getattr(row, "impressions", None)
    if not reach:
        return None
    engagements = (
        (row.likes or 0)
        + (row.replies or 0)
        + (row.reposts or 0)
        + (getattr(row, "bookmarks", None) or 0)
    )
    return round((engagements / float(reach)) * 100.0, 3)


def _median(values: List[float]) -> Optional[float]:
    if not values:
        return None
    ordered = sorted(values)
    mid = len(ordered) // 2
    if len(ordered) % 2 == 1:
        return ordered[mid]
    return (ordered[mid - 1] + ordered[mid]) / 2.0


def _row_platform(row: ContentPerformance) -> str:
    explicit = normalize_key(getattr(row, "platform", None))
    if explicit:
        return explicit
    return FORMAT_TO_PLATFORM.get(normalize_key(row.format), "")


def _lift_to_score(lift: float) -> float:
    """
    Maps measured lift-vs-baseline onto 0..1, centred on 0.5 with saturating tails.

    tanh keeps a single freak post from pinning a signal to 1.0 while still letting a
    consistent 2x performer land near 0.9.
    """
    return round(0.5 * (1.0 + math.tanh(lift)), 4)

class CreatorProfileResolver:
    """Builds a `CreatorProfile` from whatever evidence exists — and says what doesn't."""

    def build_affinities(
        self,
        samples: List[tuple[str, float]],
        baseline: Optional[float],
        bucket: str,
    ) -> Dict[str, Affinity]:
        """
        Groups (key, engagement_rate) samples and scores each key against the creator's
        own baseline. Keys below MIN_SAMPLES_FOR_SIGNAL are omitted entirely rather than
        guessed at — an absent affinity reads as neutral downstream.
        """
        grouped: Dict[str, List[float]] = {}
        for key, rate in samples:
            if not key:
                continue
            grouped.setdefault(key, []).append(rate)

        out: Dict[str, Affinity] = {}
        for key, rates in grouped.items():
            if len(rates) < MIN_SAMPLES_FOR_SIGNAL or not baseline:
                continue
            mean_rate = sum(rates) / len(rates)
            lift = (mean_rate / baseline) - 1.0
            out[key] = Affinity(
                key=key,
                score=_lift_to_score(lift),
                lift_vs_baseline_pct=round(lift * 100.0, 1),
                evidence=Evidence(
                    basis=EvidenceBasis.MEASURED,
                    sample_size=len(rates),
                    detail=(
                        f"{len(rates)} published posts in this {bucket} averaged "
                        f"{mean_rate:.2f}% engagement vs a {baseline:.2f}% baseline."
                    ),
                ),
            )
        return out

    async def resolve(self, db: AsyncSession, creator_id: str = "default") -> CreatorProfile:
        """Loads declared settings + measured history into a single profile."""
        rows: List[ContentPerformance] = []
        voice: Optional[VoiceProfile] = None
        try:
            rows = list(
                (
                    await db.execute(
                        select(ContentPerformance)
                        .order_by(desc(ContentPerformance.published_at))
                        .limit(HISTORY_LOOKBACK)
                    )
                )
                .scalars()
                .all()
            )
            voice = (await db.execute(select(VoiceProfile).limit(1))).scalar_one_or_none()
        except Exception as exc:  # pragma: no cover - degraded DB must not break decisions
            logger.warning("Creator profile falling back to defaults: %s", exc)

        return self.assemble(rows=rows, voice=voice, creator_id=creator_id)

    def assemble(
        self,
        rows: List[ContentPerformance],
        voice: Optional[VoiceProfile] = None,
        creator_id: str = "default",
    ) -> CreatorProfile:
        """Pure assembly step — no I/O, so it can be tested directly."""
        profile = CreatorProfile(creator_id=creator_id)
        assumptions: List[str] = []
        evidence: Dict[str, Evidence] = {}

        # ---- Declared traits (voice profile) ------------------------------
        if voice is not None and voice.tone_preference:
            profile.voice_tone = voice.tone_preference
            evidence["voice_tone"] = Evidence(
                basis=EvidenceBasis.DECLARED,
                sample_size=len(voice.voice_examples or []),
                detail="Taken from the saved voice profile.",
            )
        else:
            evidence["voice_tone"] = Evidence(detail="No voice profile saved.")
            assumptions.append(
                "Voice is assumed to be technical and direct — no voice profile has been saved."
            )

        # ---- Measured traits (performance history) ------------------------
        scored: List[tuple[ContentPerformance, float]] = []
        for row in rows:
            rate = _engagement_rate(row)
            if rate is not None:
                scored.append((row, rate))

        profile.measured_posts = len(scored)
        baseline = _median([r for _, r in scored]) if len(scored) >= MIN_SAMPLES_FOR_BASELINE else None
        profile.baseline_engagement_rate = round(baseline, 3) if baseline is not None else None

        if baseline is None:
            evidence["baseline_engagement_rate"] = Evidence(
                sample_size=len(scored),
                detail=(
                    f"Only {len(scored)} posts with known reach on record; "
                    f"{MIN_SAMPLES_FOR_BASELINE} are required for a baseline."
                ),
            )
            assumptions.append(
                "No engagement baseline yet — topic, format, platform and hook fit are "
                "scored neutrally instead of from your history."
            )
        else:
            evidence["baseline_engagement_rate"] = Evidence(
                basis=EvidenceBasis.MEASURED,
                sample_size=len(scored),
                detail=f"Median engagement rate across {len(scored)} published posts.",
            )

        profile.topic_affinity = self.build_affinities(
            [(normalize_key(r.topic), rate) for r, rate in scored], baseline, "topic"
        )
        profile.platform_affinity = self.build_affinities(
            [(_row_platform(r), rate) for r, rate in scored], baseline, "platform"
        )
        profile.format_affinity = self.build_affinities(
            [(normalize_key(r.format), rate) for r, rate in scored], baseline, "format"
        )
        profile.hook_affinity = self.build_affinities(
            [(normalize_key(r.hook), rate) for r, rate in scored], baseline, "hook"
        )

        # ---- Expertise & recency -----------------------------------------
        measured_topics = [
            a.key for a in sorted(
                profile.topic_affinity.values(), key=lambda x: x.score, reverse=True
            ) if a.score > 0.5
        ]
        if measured_topics:
            profile.expertise_domains = measured_topics[:5]
            evidence["expertise_domains"] = Evidence(
                basis=EvidenceBasis.MEASURED,
                sample_size=len(measured_topics),
                detail="Topics where your posts beat your own engagement baseline.",
            )
        else:
            evidence["expertise_domains"] = Evidence(
                detail="No topic has enough posts to show a measurable edge yet."
            )
            assumptions.append(
                "Expertise domains are unknown — no topic has cleared "
                f"{MIN_SAMPLES_FOR_SIGNAL} published posts with known reach."
            )

        now = datetime.now(timezone.utc)
        recent: List[Dict[str, Any]] = []
        for row in rows[:60]:
            published = row.published_at
            if published is None:
                continue
            if published.tzinfo is None:
                published = published.replace(tzinfo=timezone.utc)
            recent.append(
                {
                    "topic": row.topic,
                    "platform": _row_platform(row) or None,
                    "format": row.format,
                    "published_at": published.isoformat(),
                    "days_ago": round((now - published).total_seconds() / 86400.0, 2),
                }
            )
        profile.recent_posts = recent

        profile.avoid_patterns = [
            "Generic hype without a verifiable number",
            "Press-release restatement",
            "Claims the sources do not support",
        ]
        evidence["avoid_patterns"] = Evidence(
            basis=EvidenceBasis.DEFAULT,
            detail="Product-level originality guardrails (North Star §14), not learned preferences.",
        )

        profile.assumptions = assumptions
        profile.evidence = evidence
        return profile

    async def save_declared(
        self,
        db: AsyncSession,
        audience: Optional[str] = None,
        voice_tone: Optional[str] = None,
        technical_depth: Optional[str] = None,
        expertise_domains: Optional[List[str]] = None,
        avoid_patterns: Optional[List[str]] = None,
        risk_tolerance: Optional[float] = None,
        posts_per_day_target: Optional[float] = None,
        topic_affinities: Optional[Dict[str, float]] = None,
        platform_affinities: Optional[Dict[str, float]] = None,
        creator_id: str = "default",
    ) -> CreatorProfile:
        """Persists declared creator preferences and returns updated CreatorProfile."""
        voice = (await db.execute(select(VoiceProfile).limit(1))).scalar_one_or_none()
        if voice is None:
            voice = VoiceProfile(
                name=f"{creator_id} Voice",
                tone_preference=voice_tone or "Technical & Direct",
                guidelines=audience or "AI Engineers & Technical Founders"
            )
            db.add(voice)
        else:
            if voice_tone:
                voice.tone_preference = voice_tone
            if audience:
                voice.guidelines = f"Audience: {audience} | Depth: {technical_depth or 'High'}"
        await db.commit()
        await db.refresh(voice)

        profile = await self.resolve(db, creator_id=creator_id)
        if audience:
            profile.audience = audience
        if voice_tone:
            profile.voice_tone = voice_tone
        if technical_depth:
            profile.technical_depth = technical_depth
        if expertise_domains:
            profile.expertise_domains = expertise_domains
        if avoid_patterns:
            profile.avoid_patterns = avoid_patterns
        if risk_tolerance is not None:
            profile.risk_tolerance = risk_tolerance
        if posts_per_day_target is not None:
            profile.posts_per_day_target = posts_per_day_target
        if topic_affinities:
            for k, v in topic_affinities.items():
                profile.topic_affinity[normalize_key(k)] = Affinity(
                    key=normalize_key(k),
                    score=float(v),
                    evidence=Evidence(basis=EvidenceBasis.DECLARED, detail="Creator explicitly declared topic affinity.")
                )
        if platform_affinities:
            for k, v in platform_affinities.items():
                profile.platform_affinity[normalize_key(k)] = Affinity(
                    key=normalize_key(k),
                    score=float(v),
                    evidence=Evidence(basis=EvidenceBasis.DECLARED, detail="Creator explicitly declared platform affinity.")
                )
        return profile


creator_profile_resolver = CreatorProfileResolver()

