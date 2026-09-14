"""
7 Core Content Pillars & Series Engine for future.aii__
Encapsulates pillar templates, series configurations, prompt directives, and cadence logic.
"""

import logging
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.db.models import SeriesModel

logger = logging.getLogger(__name__)

class PillarDefinition(BaseModel):
    id: str
    name: str
    target_share_pct: int
    objective: str
    format_structure: List[str]
    default_formats: List[str]
    cta_patterns: List[str]
    prompt_instructions: str


class SeriesDefinition(BaseModel):
    id: str
    name: str
    pillar: str
    cadence: str  # daily, 3x_weekly, weekly, biweekly
    target_format: str
    description: str
    hook_formula: str
    average_retention: float = 78.5
    average_shares: float = 85.0
    is_active: bool = True


PILLARS_CATALOG: Dict[str, PillarDefinition] = {
    "AI News": PillarDefinition(
        id="pillar_news",
        name="AI News",
        target_share_pct=25,
        objective="Fast, understandable breakdown of major AI releases, breakthroughs, and corporate shifts.",
        format_structure=[
            "HOOK: Visual contrast & headline shock",
            "WHAT HAPPENED: 1-sentence concrete announcement",
            "WHAT ACTUALLY CHANGED: The architectural difference or new capability",
            "WHY IT MATTERS: Real builder / consumer implication",
            "WHAT THIS MEANS FOR YOU: Immediate workflow action",
            "CTA: Discussion / Next update follow"
        ],
        default_formats=["Reel", "Carousel", "Story"],
        cta_patterns=["Follow for the next frontier update", "Would you deploy this in production?", "Save this breakdown"],
        prompt_instructions="Never simply repost 'Company X announced Y'. Highlight what was previously impossible, who is affected, and what mainstream coverage missed."
    ),
    "AI Explained": PillarDefinition(
        id="pillar_explained",
        name="AI Explained",
        target_share_pct=20,
        objective="Turn complicated frontier AI concepts into visual, high-retention short-form education.",
        format_structure=[
            "HOOK: Intuitive paradox or visual question",
            "SIMPLE EXPLANATION: Plain English framing",
            "VISUAL ANALOGY: Physical real-world metaphor",
            "TECHNICAL CORE: How the attention/weights/tokens really operate",
            "REAL EXAMPLE: In-the-wild demonstration",
            "TAKEAWAY: One mental model to remember",
            "CTA: Comment for visual cheat-sheet"
        ],
        default_formats=["Reel", "Carousel"],
        cta_patterns=["Comment 'CHEAT' for the visual diagram", "Save this for your next AI interview", "Share with someone learning AI"],
        prompt_instructions="Offer both Beginner and Technical versions. Use visual metaphors (e.g. library index, GPS routing, memory caches) before diving into technical mechanics."
    ),
    "AI Tools": PillarDefinition(
        id="pillar_tools",
        name="AI Tools",
        target_share_pct=15,
        objective="Make future.aii__ immediately actionable with verified AI workflows and tools.",
        format_structure=[
            "HOOK: Pain point elimination in under 5 seconds",
            "WHAT IT DOES: Concrete utility without marketing fluff",
            "WHO NEEDS IT: Specific ICP (e.g. student, full-stack dev, creator)",
            "ONE REAL WORKFLOW: Step-by-step prompt / tool demo",
            "PRICING & LIMITATIONS: Honest free tier and current edge-case flaws",
            "CTA: Comment keyword to receive the exact link/prompt"
        ],
        default_formats=["Reel", "Carousel"],
        cta_patterns=["Comment 'TOOL' for the link and starter prompt", "Save this workflow for later", "Comment 'WORKFLOW'"],
        prompt_instructions="Do not regurgitate landing page claims. Verify free tiers, realistic limitations, and present one concrete copy-paste workflow."
    ),
    "AI For Normal People": PillarDefinition(
        id="pillar_normal_people",
        name="AI For Normal People",
        target_share_pct=10,
        objective="Expand reach beyond developers by explaining AI to everyday users without jargon.",
        format_structure=[
            "HOOK: Everyday dilemma or relatable misconception",
            "EVERYDAY ANALOGY: Zero-jargon comparison",
            "PLAIN-ENGLISH TRUTH: What AI is actually doing behind the curtain",
            "PRACTICAL EXAMPLE: How it impacts normal jobs or daily tasks",
            "CTA: Thought-provoking question"
        ],
        default_formats=["Reel", "Story"],
        cta_patterns=["Have you noticed this yet?", "Would you trust AI with your calendar?", "Share this with a non-tech friend"],
        prompt_instructions="Scan and replace jargon: convert 'parameters' to 'neural memory', 'tokens' to 'syllables of thought', 'context window' to 'short-term desk space'."
    ),
    "AGI / ASI / Future": PillarDefinition(
        id="pillar_future",
        name="AGI / ASI / Future",
        target_share_pct=10,
        objective="Establish future.aii__ as the thought-leading window into human-level AI and the technological singularity.",
        format_structure=[
            "HOOK: Horizon projection or timeline milestone",
            "THE FACT: What has been empirically proven in research",
            "THE INTERPRETATION: How leading researchers evaluate this leap",
            "THE PREDICTION: 2026-2030 trajectory and societal shift",
            "CTA: Deep perspective question"
        ],
        default_formats=["Reel", "Carousel"],
        cta_patterns=["Do you think AGI arrives before 2028?", "Follow the Road to AGI series", "Save this prediction"],
        prompt_instructions="Strict epistemic hygiene: rigidly isolate FACT from INTERPRETATION from PREDICTION. Never present speculative timelines as objective reality."
    ),
    "AI Memes / Relatable": PillarDefinition(
        id="pillar_memes",
        name="AI Memes / Relatable",
        target_share_pct=10,
        objective="High-velocity acquisition layer driving broad algorithmic reach and cultural relevance.",
        format_structure=[
            "HOOK: Ultra-relatable developer/creator POV",
            "SETUP: The expectation vs reality of autonomous AI",
            "PUNCHLINE: The chaos of agents running wild or prompting at 3 AM",
            "SUBTLE CTA: Follow for the reality of AI"
        ],
        default_formats=["Reel", "Story"],
        cta_patterns=["Tag a developer who does this", "POV: your AI agent just wiped the database", "Follow for daily AI sanity"],
        prompt_instructions="Keep it internet-native, concise (7-15s), fast-paced, and culturally sharp. Feed viewers into educational series."
    ),
    "AI Experiments": PillarDefinition(
        id="pillar_experiments",
        name="AI Experiments",
        target_share_pct=10,
        objective="Original, empirical first-hand testing: GPT vs Claude vs Gemini, agent challenges, and build sprints.",
        format_structure=[
            "QUESTION: What are we testing?",
            "HYPOTHESIS: What we expect to happen",
            "SETUP: Identical benchmark / prompt prompt setup",
            "TEST: Real-time head-to-head execution",
            "RESULT: Concrete quantitative/qualitative output",
            "SURPRISE: The unexpected failure or breakthrough",
            "VERDICT: The decisive winner and why",
            "CTA: Comment for the benchmark prompt suite"
        ],
        default_formats=["Reel", "Carousel", "YouTube Short"],
        cta_patterns=["Comment 'BENCHMARK' for the prompts", "Which model do you think won?", "Follow for Part 2"],
        prompt_instructions="Use empirical evidence and real side-by-side recordings. Show where models hallucinated and where they succeeded."
    )
}

INITIAL_SERIES_LIBRARY: List[SeriesDefinition] = [
    # NEWS
    SeriesDefinition(id="series_news_today", name="AI NEWS TODAY", pillar="AI News", cadence="daily", target_format="Reel", description="Daily punchy recap of the #1 most critical AI development.", hook_formula="This just happened in AI today: [Headline]"),
    SeriesDefinition(id="series_breaking_ai", name="BREAKING AI", pillar="AI News", cadence="urgent", target_format="Reel", description="Rapid response within 15 minutes of tier-1 frontier releases.", hook_formula="OpenAI / Anthropic just made an emergency release: [Topic]"),
    SeriesDefinition(id="series_this_just_happened", name="THIS JUST HAPPENED", pillar="AI News", cadence="3x_weekly", target_format="Reel", description="Deep dive on unexpected industry developments.", hook_formula="Nobody expected this: [Topic]"),

    # EDUCATION
    SeriesDefinition(id="series_ai_in_15s", name="AI IN 15 SECONDS", pillar="AI Explained", cadence="3x_weekly", target_format="Reel", description="High-speed micro-explainer covering core architecture terms.", hook_formula="If you don't understand [Concept] in 2026, watch this in 15 seconds."),
    SeriesDefinition(id="series_ai_explained", name="AI EXPLAINED", pillar="AI Explained", cadence="3x_weekly", target_format="Carousel", description="Visual slide-by-slide breakdowns with diagrams.", hook_formula="How [Concept] actually works under the hood (without a PhD)."),
    SeriesDefinition(id="series_how_ai_works", name="HOW AI ACTUALLY WORKS", pillar="AI Explained", cadence="weekly", target_format="Reel", description="Animated conceptual deep-dives.", hook_formula="What is your computer actually calculating when you ask [Topic]?"),

    # TOOLS
    SeriesDefinition(id="series_tool_you_need", name="AI TOOL YOU NEED", pillar="AI Tools", cadence="3x_weekly", target_format="Reel", description="One tool, one verified workflow, one exact prompt.", hook_formula="Stop doing [Tedious Task] manually — this AI does it in 1 click."),
    SeriesDefinition(id="series_3_ai_tools", name="3 AI TOOLS", pillar="AI Tools", cadence="weekly", target_format="Carousel", description="Categorized roundup for specific builder personas.", hook_formula="3 AI tools so powerful they almost feel illegal to use."),
    SeriesDefinition(id="series_tool_of_day", name="TOOL OF THE DAY", pillar="AI Tools", cadence="daily", target_format="Story", description="Interactive daily tool preview and poll.", hook_formula="Tool of the Day: [Tool Name] — yay or nay?"),

    # FUTURE
    SeriesDefinition(id="series_road_to_agi", name="ROAD TO AGI", pillar="AGI / ASI / Future", cadence="2x_weekly", target_format="Reel", description="Tracking frontier milestones on the march toward AGI.", hook_formula="We just took another step toward AGI — here is the milestone."),
    SeriesDefinition(id="series_after_agi", name="AFTER AGI", pillar="AGI / ASI / Future", cadence="weekly", target_format="Carousel", description="Macro analysis of work, coding, and economics post-human intelligence.", hook_formula="What happens to software engineers the year after AGI?"),
    SeriesDefinition(id="series_ai_2030", name="AI 2030", pillar="AGI / ASI / Future", cadence="weekly", target_format="Reel", description="Research extrapolations and compute projections.", hook_formula="By 2030, this compute curve predicts [Prediction]."),

    # COMPARISON & EXPERIMENTS
    SeriesDefinition(id="series_ai_vs_ai", name="AI VS AI", pillar="AI Experiments", cadence="2x_weekly", target_format="Reel", description="Head-to-head model benchmark challenges.", hook_formula="GPT-5 vs Claude 4 vs Gemini 3: who builds a full app faster?"),
    SeriesDefinition(id="series_i_tested_ai", name="I TESTED AI", pillar="AI Experiments", cadence="weekly", target_format="Reel", description="Hands-on agent autonomy experiments.", hook_formula="I gave an AI agent $100 and access to my terminal for 24 hours."),

    # CULTURE & VALUE
    SeriesDefinition(id="series_ai_pov", name="AI POV", pillar="AI Memes / Relatable", cadence="2x_weekly", target_format="Reel", description="Short relatable creator & engineer humor.", hook_formula="POV: you let the AI agent write the unit tests."),
    SeriesDefinition(id="series_prompt_of_day", name="PROMPT OF THE DAY", pillar="AI Tools", cadence="daily", target_format="Carousel", description="Production-tested prompt templates with comment DM distribution.", hook_formula="The only prompt you need to [Achieve Task]. Comment 'PROMPT'.")
]


class PillarsAndSeriesService:
    """
    Manages the 7 Content Pillars and 16+ Series Library.
    """

    def get_all_pillars(self) -> Dict[str, PillarDefinition]:
        return PILLARS_CATALOG

    def get_pillar(self, pillar_name: str) -> Optional[PillarDefinition]:
        return PILLARS_CATALOG.get(pillar_name)

    async def get_series_list(self, db: Optional[AsyncSession] = None) -> List[SeriesDefinition]:
        """Returns registered series from DB or fallback catalog."""
        if db:
            try:
                stmt = select(SeriesModel).where(SeriesModel.is_active == True)
                res = await db.execute(stmt)
                db_records = res.scalars().all()
                if db_records:
                    return [
                        SeriesDefinition(
                            id=r.id,
                            name=r.name,
                            pillar=r.pillar,
                            cadence=r.cadence,
                            target_format=r.target_format,
                            description=r.description,
                            hook_formula=r.template_structure.get("hook_formula", f"Today in {r.name}:"),
                            average_retention=r.average_retention,
                            average_shares=r.average_shares,
                            is_active=r.is_active
                        ) for r in db_records
                    ]
            except Exception as e:
                logger.warning(f"Error fetching series from DB, using defaults: {e}")

        return INITIAL_SERIES_LIBRARY

    def get_series_for_pillar(self, pillar_name: str) -> List[SeriesDefinition]:
        return [s for s in INITIAL_SERIES_LIBRARY if s.pillar.lower() == pillar_name.lower()]


pillars_and_series_service = PillarsAndSeriesService()
