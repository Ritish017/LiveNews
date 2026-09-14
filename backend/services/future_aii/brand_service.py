"""
Brand & Voice Service for future.aii__
Manages brand profile, tone parameters, anti-generic content heuristics, and pillar target balance.
"""

import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.db.models import BrandProfileModel

logger = logging.getLogger(__name__)

DEFAULT_BRAND_PROFILE = {
    "handle": "future.aii__",
    "brand_name": "future.aii",
    "positioning": "Your window into the AI future.",
    "tone": "curious, fast, confident, technical but accessible",
    "visual_style": "dark, cinematic, high-contrast, modern, internet-native",
    "audience_demographics": {
        "primary_age": "18-30",
        "segments": ["students", "developers", "creators", "entrepreneurs", "freelancers", "AI enthusiasts"]
    },
    "pillar_targets": {
        "AI News": 25,
        "AI Explained": 20,
        "AI Tools": 15,
        "AI For Normal People": 10,
        "AGI / ASI / Future": 10,
        "AI Memes / Relatable": 10,
        "AI Experiments": 10
    },
    "voice_guidelines": {
        "vocabulary": ["frontier", "compute", "inference", "agentic", "architecture", "breakthrough", "latency", "weights"],
        "sentence_length": "fast-paced, punchy, active voice, 8-15 words average",
        "banned_cliches": [
            "game-changer", "unleash", "mind-blowing", "dive deep", "in this digital era",
            "delve", "testament", "beacon", "landscape", "revolutionize"
        ],
        "recurring_phrases": [
            "Here is what actually changed",
            "Your window into the AI future",
            "What developers can build with this",
            "Why this matters for your workflow"
        ],
        "hook_style": "curiosity + high specificity + immediate visual contrast"
    },
    "anti_generic_rules": [
        "Never repost 'Company X announced Y' without explaining what actually changed and why it matters.",
        "Detect technical jargon and automatically produce plain-English analogies.",
        "Separate FACT from INTERPRETATION from PREDICTION.",
        "Every Reel must provide a verifiable workflow or takeaway, not just surface marketing claims."
    ]
}


class BrandConfig(BaseModel):
    handle: str = "future.aii__"
    brand_name: str = "future.aii"
    positioning: str = "Your window into the AI future."
    tone: str = "curious, fast, confident, technical but accessible"
    visual_style: str = "dark, cinematic, high-contrast, modern, internet-native"
    audience_demographics: Dict[str, Any] = Field(default_factory=lambda: DEFAULT_BRAND_PROFILE["audience_demographics"])
    pillar_targets: Dict[str, int] = Field(default_factory=lambda: DEFAULT_BRAND_PROFILE["pillar_targets"])
    voice_guidelines: Dict[str, Any] = Field(default_factory=lambda: DEFAULT_BRAND_PROFILE["voice_guidelines"])
    anti_generic_rules: List[str] = Field(default_factory=lambda: DEFAULT_BRAND_PROFILE["anti_generic_rules"])


class AntiGenericAuditResult(BaseModel):
    is_generic: bool = False
    generic_score: float = 12.0  # 0 to 100 (lower is better, <25 is approved)
    detected_cliches: List[str] = Field(default_factory=list)
    has_what_changed: bool = True
    has_why_it_matters: bool = True
    has_concrete_takeaway: bool = True
    recommendations: List[str] = Field(default_factory=list)


class BrandService:
    """
    Encapsulates brand identity rules, voice enforcement, and anti-generic verification.
    """

    async def get_brand_profile(self, db: Optional[AsyncSession] = None) -> BrandConfig:
        """Retrieves active future.aii__ brand profile from DB or returns default."""
        if db:
            try:
                stmt = select(BrandProfileModel).where(BrandProfileModel.handle == "future.aii__")
                res = await db.execute(stmt)
                record = res.scalar_one_or_none()
                if record:
                    return BrandConfig(
                        handle=record.handle,
                        brand_name=record.brand_name,
                        positioning=record.positioning,
                        tone=record.tone,
                        visual_style=record.visual_style,
                        audience_demographics=record.audience_demographics or DEFAULT_BRAND_PROFILE["audience_demographics"],
                        pillar_targets=record.pillar_targets or DEFAULT_BRAND_PROFILE["pillar_targets"],
                        voice_guidelines=record.voice_guidelines or DEFAULT_BRAND_PROFILE["voice_guidelines"],
                        anti_generic_rules=record.anti_generic_rules or DEFAULT_BRAND_PROFILE["anti_generic_rules"]
                    )
            except Exception as e:
                logger.warning(f"Error fetching brand profile from db, using defaults: {e}")

        return BrandConfig(**DEFAULT_BRAND_PROFILE)

    async def update_brand_profile(self, config: BrandConfig, db: AsyncSession) -> BrandConfig:
        """Updates or seeds brand profile settings in the DB."""
        stmt = select(BrandProfileModel).where(BrandProfileModel.handle == config.handle)
        res = await db.execute(stmt)
        record = res.scalar_one_or_none()

        if not record:
            record = BrandProfileModel(
                handle=config.handle,
                brand_name=config.brand_name,
                positioning=config.positioning,
                tone=config.tone,
                visual_style=config.visual_style,
                audience_demographics=config.audience_demographics,
                pillar_targets=config.pillar_targets,
                voice_guidelines=config.voice_guidelines,
                anti_generic_rules=config.anti_generic_rules
            )
            db.add(record)
        else:
            record.brand_name = config.brand_name
            record.positioning = config.positioning
            record.tone = config.tone
            record.visual_style = config.visual_style
            record.audience_demographics = config.audience_demographics
            record.pillar_targets = config.pillar_targets
            record.voice_guidelines = config.voice_guidelines
            record.anti_generic_rules = config.anti_generic_rules
            record.updated_at = datetime.now(timezone.utc).replace(tzinfo=None)

        await db.commit()
        await db.refresh(record)
        return config

    def audit_anti_generic(self, text: str, hook: str = "", cta: str = "") -> AntiGenericAuditResult:
        """
        Applies §72 Anti-Generic Content Rule:
        'Could another generic AI account have produced this?'
        Checks for banned cliches, vague marketing hype, and missing concrete mechanics.
        """
        combined = f"{hook} {text} {cta}".lower()
        banned = DEFAULT_BRAND_PROFILE["voice_guidelines"]["banned_cliches"]
        
        detected_cliches = [cliche for cliche in banned if cliche.lower() in combined]
        
        # Check specific analytical phrases
        has_what_changed = any(phrase in combined for phrase in ["changed", "instead of", "differs", "now able to", "new benchmark", "breakthrough", "architecture"])
        has_why_it_matters = any(phrase in combined for phrase in ["means for", "why it matters", "builders can", "developers can", "workflow", "save", "production"])
        has_concrete_takeaway = any(phrase in combined for phrase in ["prompt", "link", "github", "model", "parameter", "agent", "tool", "cost", "latency"])

        penalty = len(detected_cliches) * 15.0
        if not has_what_changed:
            penalty += 20.0
        if not has_why_it_matters:
            penalty += 20.0
        if not has_concrete_takeaway:
            penalty += 15.0

        generic_score = min(100.0, max(0.0, penalty))
        is_generic = generic_score > 35.0

        recommendations = []
        if detected_cliches:
            recommendations.append(f"Remove generic cliches: {', '.join(detected_cliches)}. Use precise technical descriptors.")
        if not has_what_changed:
            recommendations.append("Clarify what actually changed versus the previous version/model checkpoint.")
        if not has_why_it_matters:
            recommendations.append("Explicitly state why this matters for developers, creators, or students.")
        if not has_concrete_takeaway:
            recommendations.append("Add a concrete takeaway (workflow, prompt, benchmark comparison, or resource delivery).")

        return AntiGenericAuditResult(
            is_generic=is_generic,
            generic_score=round(generic_score, 1),
            detected_cliches=detected_cliches,
            has_what_changed=has_what_changed,
            has_why_it_matters=has_why_it_matters,
            has_concrete_takeaway=has_concrete_takeaway,
            recommendations=recommendations
        )


brand_service = BrandService()
