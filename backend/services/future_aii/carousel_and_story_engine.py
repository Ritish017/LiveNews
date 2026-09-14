"""
Carousel & Story Engine for future.aii__
Implements §19 & §20: Instagram Carousel builder (5-12 structured slides with layout & typography hierarchy)
and Interactive Stories builder (polls, quizzes, sliders, teasers).
"""

import logging
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

class CarouselSlide(BaseModel):
    slide_number: int
    slide_role: str  # HOOK, WHAT_HAPPENED, WHY_IT_MATTERS, HOW_IT_WORKS, WHAT_PEOPLE_MISS, EXAMPLE, IMPLICATION, TAKEAWAY, CTA
    headline: str
    body_points: List[str] = Field(default_factory=list)
    visual_layout: str  # hero_text_center, split_diagram_right, code_terminal_bottom, stat_callout_huge, side_by_side_matrix
    typography_hierarchy: str  # H1 48pt Bold / H2 24pt Semi / Body 16pt Mono
    diagram_spec: Optional[str] = None
    cta_badge: Optional[str] = None


class CarouselSpec(BaseModel):
    title: str
    pillar: str
    total_slides: int
    target_aspect_ratio: str = "4:5"  # 1080x1350 Instagram native
    slides: List[CarouselSlide] = Field(default_factory=list)
    caption: str
    hashtags: List[str] = Field(default_factory=list)


class StoryItem(BaseModel):
    story_number: int
    story_type: str  # POLL, QUIZ, SLIDER, TEASER, RESULT, COUNTDOWN
    headline: str
    subtext: str
    interactive_sticker: Dict[str, Any] = Field(default_factory=dict)
    background_visual: str
    cta_link_or_sticker: Optional[str] = None


class StorySequenceSpec(BaseModel):
    topic: str
    total_stories: int
    stories: List[StoryItem] = Field(default_factory=list)


class CarouselAndStoryEngine:
    """
    Generates production-spec Instagram Carousels and interactive Story sequences.
    """

    def generate_carousel(
        self,
        topic: str,
        angle: str,
        pillar: str,
        claims: Optional[List[str]] = None,
        slide_count: int = 8
    ) -> CarouselSpec:
        """
        Builds a high-contrast 5-12 slide Instagram carousel specification.
        """
        slide_count = max(5, min(12, slide_count))
        clean_topic = topic.split(":")[0] if ":" in topic else topic
        claims_list = claims or [
            f"{clean_topic} introduces major architectural changes",
            "Latency dropped significantly across benchmarks",
            "New capability opens autonomous local workflows"
        ]

        c1 = claims_list[0] if len(claims_list) > 0 else f"{clean_topic} announcement"
        c2 = claims_list[1] if len(claims_list) > 1 else "Performance leap confirmed by benchmarks"
        c3 = claims_list[2] if len(claims_list) > 2 else "Real-world developer workflow verified"

        slides: List[CarouselSlide] = [
            CarouselSlide(
                slide_number=1,
                slide_role="HOOK",
                headline=f"Everything You Need To Know About {clean_topic}",
                body_points=[
                    "The architectural breakthrough that actually matters",
                    "Swipe to see what changed under the hood →"
                ],
                visual_layout="hero_text_center",
                typography_hierarchy="H1: 52pt Outfit Black / Accents: Amber 400 Glowing / Dark Slate 950 BG",
                diagram_spec="Futuristic glowing circuit icon with bold headline and swipe indicator",
                cta_badge="SWIPE ➡️"
            ),
            CarouselSlide(
                slide_number=2,
                slide_role="WHAT_HAPPENED",
                headline="1. What Just Happened",
                body_points=[
                    f"Official announcement: {c1}.",
                    "Trained on clean verified data architecture.",
                    "Available for immediate developer deployment."
                ],
                visual_layout="stat_callout_huge",
                typography_hierarchy="Headline: 32pt Bold / Body: 18pt Clean Sans",
                diagram_spec="Timeline callout card highlighting release milestone",
                cta_badge=None
            ),
            CarouselSlide(
                slide_number=3,
                slide_role="WHY_IT_MATTERS",
                headline="2. Why It Matters",
                body_points=[
                    "Most tech news focuses on surface features.",
                    f"The real impact: {c2}.",
                    "Developers can eliminate heavy cloud middleware."
                ],
                visual_layout="split_diagram_right",
                typography_hierarchy="Headline: 32pt Bold / Accent: Rose 400",
                diagram_spec="Before vs After comparison diagram showing simplified data pipeline",
                cta_badge=None
            ),
            CarouselSlide(
                slide_number=4,
                slide_role="HOW_IT_WORKS",
                headline="3. How It Actually Works",
                body_points=[
                    "Transformer attention heads bypass redundant token caching.",
                    "Native reasoning runs directly inside the model weights.",
                    "Zero-shot verification before output streaming."
                ],
                visual_layout="split_diagram_right",
                typography_hierarchy="Headline: 30pt Semi / Code: 14pt JetBrains Mono",
                diagram_spec="Dark technical node architecture with glowing data flow vectors",
                cta_badge=None
            ),
            CarouselSlide(
                slide_number=5,
                slide_role="WHAT_PEOPLE_MISS",
                headline="4. What Most People Miss",
                body_points=[
                    "The hidden limitation: context window memory scaling.",
                    "Local deployment requires at least 16GB VRAM for full speed.",
                    "Do not deploy in production without output guardrails."
                ],
                visual_layout="side_by_side_matrix",
                typography_hierarchy="Warning Header: 28pt Amber / Checklist: 16pt Sans",
                diagram_spec="Matrix comparing marketing promises vs verified engineering realities",
                cta_badge="PRO TIP 💡"
            ),
            CarouselSlide(
                slide_number=6,
                slide_role="EXAMPLE",
                headline="5. The 60-Second Setup",
                body_points=[
                    "Step 1: Pull the latest model checkpoint via API",
                    "Step 2: Initialize system prompt with tool execution schema",
                    f"Step 3: Execute the verified workflow: {c3}"
                ],
                visual_layout="code_terminal_bottom",
                typography_hierarchy="Header: 28pt / Terminal: 14pt Mono with syntax highlighting",
                diagram_spec="Realistic dark macOS terminal window running Python SDK initialization",
                cta_badge=None
            ),
            CarouselSlide(
                slide_number=7,
                slide_role="TAKEAWAY",
                headline="6. The Core Takeaway",
                body_points=[
                    "We are shifting from static LLM chats to autonomous pipelines.",
                    "The competitive advantage belongs to builders who automate now.",
                    "Expect 3 more open checkpoints to follow this standard."
                ],
                visual_layout="stat_callout_huge",
                typography_hierarchy="Quote Callout: 36pt Semi-Bold Italic / Slate 200",
                diagram_spec="Minimalist dark quote card with luminous brand border",
                cta_badge=None
            ),
            CarouselSlide(
                slide_number=8,
                slide_role="CTA",
                headline="Save This For Your Next Build",
                body_points=[
                    "Comment 'SLIDES' and I'll DM you the full PDF cheat sheet.",
                    "Follow @future.aii__ for daily AI breakdowns & workflows.",
                    "Share this with your developer team."
                ],
                visual_layout="hero_text_center",
                typography_hierarchy="Headline: 40pt Bold Gradient / CTA: 20pt Bold White",
                diagram_spec="future.aii__ brand card with glowing Instagram save icon and DM badge",
                cta_badge="COMMENT 'SLIDES' ⬇️"
            )
        ]

        # Truncate or extend to match slide_count
        final_slides = slides[:slide_count]
        # Ensure last slide is CTA
        if len(final_slides) > 1 and final_slides[-1].slide_role != "CTA":
            final_slides[-1] = slides[-1]
            final_slides[-1].slide_number = len(final_slides)

        caption = (
            f"Here is everything you actually need to know about {clean_topic} 🧠👇\n\n"
            f"While mainstream news talks about the announcement, the real architectural shift is {c1}.\n\n"
            f"Swipe through all {len(final_slides)} slides for the technical teardown and local setup.\n\n"
            f"💬 Comment 'SLIDES' and I'll DM you the full visual architecture cheat sheet!\n\n"
            f"—\nFollow @future.aii__ for your daily window into the AI future."
        )

        hashtags = ["#AI", "#MachineLearning", "#ArtificialIntelligence", "#TechNews", "#FutureOfTech", "#SoftwareEngineering", "#Developers"]

        return CarouselSpec(
            title=f"Teardown: {clean_topic}",
            pillar=pillar,
            total_slides=len(final_slides),
            slides=final_slides,
            caption=caption,
            hashtags=hashtags
        )

    def generate_story_sequence(self, topic: str, reel_title: str) -> StorySequenceSpec:
        """
        Creates a 3-part interactive Instagram Story sequence driving traffic to the main post.
        """
        clean_topic = topic.split(":")[0] if ":" in topic else topic

        stories = [
            StoryItem(
                story_number=1,
                story_type="POLL",
                headline=f"Quick question about {clean_topic}...",
                subtext="Would you trust an AI agent running this model to manage your computer files autonomously?",
                interactive_sticker={
                    "type": "poll",
                    "question": "Trust autonomous AI?",
                    "options": ["Yes, 100%", "No way 🙅‍♂️"]
                },
                background_visual="Dark moody terminal aesthetic with floating question glyph",
                cta_link_or_sticker=None
            ),
            StoryItem(
                story_number=2,
                story_type="TEASER",
                headline="Here is what happened when we tested it:",
                subtext="We ran 50 real developer tests. The latency and reasoning results were not what we expected.",
                interactive_sticker={
                    "type": "slider",
                    "emoji": "🔥",
                    "question": "Excitement level"
                },
                background_visual="Blurred sneak peek screenshot of benchmark comparison chart with glowing red highlight",
                cta_link_or_sticker=None
            ),
            StoryItem(
                story_number=3,
                story_type="RESULT",
                headline="The Full Teardown Is Live 🚨",
                subtext=f"Watch tonight's Reel: '{reel_title}' to see the full code and benchmark teardown.",
                interactive_sticker={
                    "type": "link",
                    "text": "Watch Breakdown 🎥"
                },
                background_visual="Crisp dark Reel cover visual featuring @future.aii__ watermark",
                cta_link_or_sticker="instagram.com/future.aii__"
            )
        ]

        return StorySequenceSpec(
            topic=clean_topic,
            total_stories=len(stories),
            stories=stories
        )


carousel_story_engine = CarouselAndStoryEngine()
