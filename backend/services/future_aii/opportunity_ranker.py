"""
11-Factor Opportunity Ranking Engine for future.aii__
Implements §7 and §8 to evaluate events into ranked, actionable content opportunities.
"""

import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

class OpportunityScoreBreakdown(BaseModel):
    total_opportunity_score: float = 88.5
    freshness: float = 95.0
    momentum: float = 90.0
    relevance: float = 92.0
    audience_fit: float = 94.0
    competition: float = 40.0  # lower competition is better, normalized
    saturation: float = 30.0   # lower saturation is better
    novelty: float = 85.0
    content_gap: float = 88.0
    creator_fit: float = 95.0
    historical_performance: float = 82.0
    production_difficulty: float = 35.0  # lower difficulty is easier to produce
    
    urgency: str = "POST_TODAY"  # POST_NOW, POST_TODAY, POST_THIS_WEEK, WATCH, SKIP
    urgency_reason: str = "High novelty and strong builder audience fit with low saturation."
    recommended_pillar: str = "AI News"
    recommended_series: str = "AI NEWS TODAY"
    recommended_format: str = "Reel"
    recommended_angle: str = "What changed for developers and how to run it locally"


class RankedContentOpportunity(BaseModel):
    id: str
    event_id: Optional[str] = None
    title: str
    summary: str
    primary_source: str = "Official"
    scores: OpportunityScoreBreakdown
    entities: List[str] = Field(default_factory=list)
    key_claims: List[str] = Field(default_factory=list)
    alternative_angles: List[str] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class OpportunityRanker:
    """
    Evaluates events through the 11-Factor North Star Opportunity Engine.
    """

    def evaluate_event(
        self,
        event_dict: Dict[str, Any],
        historical_pillar_retention: Optional[Dict[str, float]] = None
    ) -> OpportunityScoreBreakdown:
        """
        Calculates deterministic 11-factor scores from event metadata, latency, and signals.
        """
        title = event_dict.get("canonical_title") or event_dict.get("title") or ""
        summary = event_dict.get("summary") or event_dict.get("content") or ""
        category = event_dict.get("category") or "AI Models"
        source_count = event_dict.get("source_count") or 1
        confidence = float(event_dict.get("confidence_score") or 85.0)

        # 1. Freshness: based on time elapsed since detection / occurrence
        event_time = event_dict.get("event_timestamp") or event_dict.get("published_at")
        hours_old = 2.0
        if event_time:
            try:
                if isinstance(event_time, str):
                    clean_str = event_time.replace("Z", "+00:00")
                    dt = datetime.fromisoformat(clean_str)
                else:
                    dt = event_time
                if dt.tzinfo is not None:
                    now = datetime.now(timezone.utc)
                else:
                    now = datetime.utcnow()
                diff_hours = (now - dt).total_seconds() / 3600.0
                hours_old = max(0.1, diff_hours)
            except Exception:
                hours_old = 3.0

        if hours_old < 2.0:
            freshness = 98.0
        elif hours_old < 6.0:
            freshness = 90.0
        elif hours_old < 24.0:
            freshness = 80.0
        elif hours_old < 72.0:
            freshness = 65.0
        else:
            freshness = 45.0

        # 2. Momentum: based on velocity and multi-source signals
        momentum_raw = float(event_dict.get("momentum_score") or 75.0)
        momentum = min(100.0, max(20.0, momentum_raw + (source_count * 2.5)))

        # 3. Relevance: AI frontier models, coding agents, GPUs have top relevance
        high_rel_terms = ["model", "agent", "reasoning", "benchmark", "claude", "gpt", "gemini", "weights", "compute", "nvidia", "deepseek", "suno", "runway"]
        combined_text = f"{title} {summary}".lower()
        rel_hits = sum(1 for term in high_rel_terms if term in combined_text)
        relevance = min(100.0, 75.0 + (rel_hits * 5.0))

        # 4. Audience Fit (18-30 builders, developers, students)
        builder_terms = ["developer", "code", "github", "api", "open-source", "workflow", "prompt", "free", "student", "framework"]
        aud_hits = sum(1 for term in builder_terms if term in combined_text)
        audience_fit = min(100.0, 78.0 + (aud_hits * 4.5))

        # 5. Competition & Saturation
        # High tier tech press saturated quickly; early github / paper releases have low saturation
        if source_count > 12:
            competition = 85.0
            saturation = 75.0
        elif source_count > 5:
            competition = 55.0
            saturation = 45.0
        else:
            competition = 25.0
            saturation = 20.0

        # 6. Novelty
        novelty = 88.0 if ("first" in combined_text or "breakthrough" in combined_text or "releases" in combined_text or source_count <= 4) else 74.0

        # 7. Content Gap: high if competition is high but technical teardown is missing
        content_gap = 92.0 if saturation > 50.0 else 80.0

        # 8. Creator Fit for future.aii__
        creator_fit = 95.0

        # 9. Historical Performance
        historical_performance = 84.0

        # 10. Production Difficulty: news reel is low difficulty (30), complex multi-model experiment is medium-high (65)
        is_experiment = "vs" in title.lower() or "challenge" in title.lower()
        production_difficulty = 60.0 if is_experiment else 30.0

        # Weighted aggregate opportunity score:
        # High value on Freshness, Momentum, Audience Fit, Novelty, Content Gap
        # Penalty for high Saturation and high Competition unless Content Gap is huge
        weighted_score = (
            (freshness * 0.18) +
            (momentum * 0.16) +
            (relevance * 0.14) +
            (audience_fit * 0.14) +
            (novelty * 0.12) +
            (content_gap * 0.12) +
            (creator_fit * 0.08) +
            ((100.0 - saturation) * 0.06)
        )
        total_opportunity = round(min(100.0, max(10.0, weighted_score)), 1)

        # Urgency recommendation
        if total_opportunity >= 90.0 or (freshness >= 95.0 and relevance >= 90.0):
            urgency = "POST_NOW"
            urgency_reason = "Breaking frontier development with exceptional velocity and freshness. Act immediately."
        elif total_opportunity >= 80.0:
            urgency = "POST_TODAY"
            urgency_reason = "High audience resonance and strong viral potential. Schedule for today's peak window."
        elif total_opportunity >= 70.0:
            urgency = "POST_THIS_WEEK"
            urgency_reason = "Solid educational or tool workflow opportunity. Prime candidate for mid-week slot."
        elif total_opportunity >= 50.0:
            urgency = "WATCH"
            urgency_reason = "Emerging conversation. Monitor community reactions before committing production."
        else:
            urgency = "SKIP"
            urgency_reason = "Low relevance or oversaturated topic without distinct creator gap."

        # Strategic mapping
        if "agent" in combined_text or "coding" in combined_text or "ide" in combined_text:
            rec_pillar = "AI Tools"
            rec_series = "AI TOOL YOU NEED"
            rec_format = "Reel"
            rec_angle = "What developers can build with this starting today"
        elif "explain" in combined_text or "transformer" in combined_text or "architecture" in combined_text or "rag" in combined_text:
            rec_pillar = "AI Explained"
            rec_series = "AI IN 15 SECONDS"
            rec_format = "Carousel"
            rec_angle = "Visual mental model of how this actually calculates output"
        elif "agi" in combined_text or "future" in combined_text or "reasoning" in combined_text:
            rec_pillar = "AGI / ASI / Future"
            rec_series = "ROAD TO AGI"
            rec_format = "Reel"
            rec_angle = "The milestone that brings us closer to autonomous systems"
        elif is_experiment:
            rec_pillar = "AI Experiments"
            rec_series = "AI VS AI"
            rec_format = "Reel"
            rec_angle = "Head-to-head empirical test under real-world pressure"
        else:
            rec_pillar = "AI News"
            rec_series = "AI NEWS TODAY"
            rec_format = "Reel"
            rec_angle = "What actually changed and why mainstream news missed the point"

        return OpportunityScoreBreakdown(
            total_opportunity_score=total_opportunity,
            freshness=round(freshness, 1),
            momentum=round(momentum, 1),
            relevance=round(relevance, 1),
            audience_fit=round(audience_fit, 1),
            competition=round(competition, 1),
            saturation=round(saturation, 1),
            novelty=round(novelty, 1),
            content_gap=round(content_gap, 1),
            creator_fit=round(creator_fit, 1),
            historical_performance=round(historical_performance, 1),
            production_difficulty=round(production_difficulty, 1),
            urgency=urgency,
            urgency_reason=urgency_reason,
            recommended_pillar=rec_pillar,
            recommended_series=rec_series,
            recommended_format=rec_format,
            recommended_angle=rec_angle
        )

    def rank_events(self, events: List[Dict[str, Any]]) -> List[RankedContentOpportunity]:
        """Ranks multiple events and returns ordered opportunities."""
        ranked = []
        for e in events:
            score_data = self.evaluate_event(e)
            eid = e.get("id") or f"opp_{abs(hash(e.get('title', '')))}"
            title = e.get("canonical_title") or e.get("title") or "AI Development"
            summary = e.get("summary") or e.get("content") or ""
            source = e.get("primary_source_name") or e.get("source") or "Official Announcement"
            entities = e.get("entities") or []
            claims = e.get("key_facts") or [title]

            alt_angles = [
                f"Beginner: What {title.split(':')[0]} means for normal computer users",
                f"Developer: The API latency and architectural tradeoff",
                f"Contrarian: Why this release might be overhyped compared to benchmarks",
                f"Future: What this unlocks on the Road to AGI"
            ]

            ranked.append(RankedContentOpportunity(
                id=f"opp_{eid}",
                event_id=eid,
                title=title,
                summary=summary,
                primary_source=source,
                scores=score_data,
                entities=entities,
                key_claims=claims[:4],
                alternative_angles=alt_angles
            ))

        # Sort descending by total_opportunity_score
        ranked.sort(key=lambda x: x.scores.total_opportunity_score, reverse=True)
        return ranked


opportunity_ranker = OpportunityRanker()
