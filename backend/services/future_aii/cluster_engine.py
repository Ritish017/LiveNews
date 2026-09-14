"""
Content Cluster Engine for future.aii__
Implements §9 & §51: ONE EVENT -> 10-PIECE CONTENT CLUSTER.
"""

import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

class ClusterPiece(BaseModel):
    piece_id: str
    role: str  # Breaking Reel, Explainer Reel, Demo Reel, Comparison Reel, Future Reel, Meme Reel, Carousel, Story, X Post, YouTube Short
    format: str  # Reel, Carousel, Story, Post, Short
    pillar: str
    series: str
    target_audience: str
    angle: str
    hook: str
    synopsis: str
    recommended_duration: Optional[int] = 30
    cta: str
    comment_keyword: Optional[str] = None
    is_approved: bool = True


class ContentClusterPackage(BaseModel):
    cluster_id: str
    event_id: Optional[str] = None
    event_title: str
    cluster_theme: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    pieces: List[ClusterPiece] = Field(default_factory=list)


class ClusterEngine:
    """
    Transforms a single verified AI development into a complete, synchronized 10-piece multi-format cluster.
    """

    def generate_cluster(self, event_data: Dict[str, Any]) -> ContentClusterPackage:
        title = event_data.get("canonical_title") or event_data.get("title") or "Frontier AI Development"
        summary = event_data.get("summary") or event_data.get("content") or title
        event_id = event_data.get("id") or "event_current"
        cluster_id = f"cluster_{event_id}_{int(datetime.now(timezone.utc).timestamp())}"

        short_title = title.split(":")[0] if ":" in title else title

        pieces = [
            ClusterPiece(
                piece_id=f"{cluster_id}_p1",
                role="Breaking News Reel",
                format="Reel",
                pillar="AI News",
                series="BREAKING AI",
                target_audience="General AI Enthusiasts & Builders",
                angle=f"Immediate breaking report: {short_title} just dropped",
                hook=f"This AI company just changed everything we thought was possible with {short_title}.",
                synopsis=f"Urgent 15-second alert breaking down the confirmed announcement, latency milestone, and initial benchmarks.",
                recommended_duration=15,
                cta="Follow @future.aii__ for the immediate technical teardown tonight.",
                comment_keyword=None
            ),
            ClusterPiece(
                piece_id=f"{cluster_id}_p2",
                role="What Changed? Reel",
                format="Reel",
                pillar="AI News",
                series="AI NEWS TODAY",
                target_audience="Software Engineers & Tech Founders",
                angle=f"What actually changed under the hood with {short_title}",
                hook=f"Everyone is talking about {short_title} — but almost everyone missed what actually changed.",
                synopsis=f"30-second analytical breakdown cutting through marketing fluff to expose the real architectural shift.",
                recommended_duration=30,
                cta="Save this breakdown — you'll need it when deploying this week.",
                comment_keyword=None
            ),
            ClusterPiece(
                piece_id=f"{cluster_id}_p3",
                role="Explainer Reel",
                format="Reel",
                pillar="AI Explained",
                series="AI IN 15 SECONDS",
                target_audience="Students & Self-Taught Devs",
                angle=f"Visual mental model explaining the core mechanism of {short_title}",
                hook=f"If you don't understand how {short_title} actually calculates answers, watch this in 15 seconds.",
                synopsis=f"Zero-jargon visual analogy comparing the process to a high-speed library card catalog.",
                recommended_duration=20,
                cta="Comment 'EXPLAIN' and I'll DM you the 1-page visual architecture diagram.",
                comment_keyword="EXPLAIN"
            ),
            ClusterPiece(
                piece_id=f"{cluster_id}_p4",
                role="Comparison Reel",
                format="Reel",
                pillar="AI Experiments",
                series="AI VS AI",
                target_audience="Developers Choosing Tech Stacks",
                angle=f"Head-to-head showdown: {short_title} vs existing frontier models",
                hook=f"We gave {short_title} and Claude the exact same coding prompt — the difference was insane.",
                synopsis=f"Side-by-side terminal screen recording showing speed, token consumption, and code accuracy.",
                recommended_duration=45,
                cta="Which model would you trust in production? Let me know below.",
                comment_keyword=None
            ),
            ClusterPiece(
                piece_id=f"{cluster_id}_p5",
                role="Tool Demo Reel",
                format="Reel",
                pillar="AI Tools",
                series="AI TOOL YOU NEED",
                target_audience="Creators, Freelancers & Productivity Seekers",
                angle=f"One real copy-paste workflow you can run with {short_title} today",
                hook=f"Stop doing this manually — here is how to automate it in 60 seconds with {short_title}.",
                synopsis=f"Live screen recording of a concrete workflow, highlighting free tier limits and exact setup.",
                recommended_duration=30,
                cta="Comment 'WORKFLOW' and I'll DM you the full setup prompt.",
                comment_keyword="WORKFLOW"
            ),
            ClusterPiece(
                piece_id=f"{cluster_id}_p6",
                role="Future / AGI Reel",
                format="Reel",
                pillar="AGI / ASI / Future",
                series="ROAD TO AGI",
                target_audience="Futurists & AI Researchers",
                angle=f"Why {short_title} shifts the timeline for autonomous systems",
                hook=f"Researchers aren't saying this publicly, but {short_title} just solved a major hurdle toward AGI.",
                synopsis=f"Rigorous separation of fact from research interpretation, projecting the 2026-2028 trajectory.",
                recommended_duration=60,
                cta="Do you believe autonomous agents will manage 50% of codebases by 2027?",
                comment_keyword=None
            ),
            ClusterPiece(
                piece_id=f"{cluster_id}_p7",
                role="Relatable AI Meme",
                format="Reel",
                pillar="AI Memes / Relatable",
                series="AI POV",
                target_audience="Internet-Native Dev & Creator Culture",
                angle=f"The reality of deploying {short_title} at 3 AM",
                hook=f"POV: You gave the new AI agent full terminal access and went to sleep.",
                synopsis=f"10-second fast-paced humorous video using high-contrast text and viral audio cue.",
                recommended_duration=10,
                cta="Tag the developer who needs this warning.",
                comment_keyword=None
            ),
            ClusterPiece(
                piece_id=f"{cluster_id}_p8",
                role="Educational Carousel",
                format="Carousel",
                pillar="AI Explained",
                series="AI EXPLAINED",
                target_audience="Instagram Savvy Learners",
                angle=f"The 7 things you need to know about {short_title}",
                hook=f"Swipe through: Everything you need to know about {short_title} in 7 slides.",
                synopsis=f"High-contrast dark slides featuring architecture diagrams, benchmark comparisons, and actionable takeaways.",
                recommended_duration=None,
                cta="Save this post for your next project review.",
                comment_keyword="SLIDES"
            ),
            ClusterPiece(
                piece_id=f"{cluster_id}_p9",
                role="Interactive Story Sequence",
                format="Story",
                pillar="AI News",
                series="TOOL OF THE DAY",
                target_audience="Daily Active Followers",
                angle=f"Poll + teaser for tonight's Reel on {short_title}",
                hook=f"Would you trust {short_title} to run autonomously on your local computer?",
                synopsis=f"3-part story sequence: Slide 1 Poll (Yes/No), Slide 2 Screen recording sneak peek, Slide 3 CTA link to Reel.",
                recommended_duration=None,
                cta="Tap the sticker to watch the full benchmark breakdown.",
                comment_keyword=None
            ),
            ClusterPiece(
                piece_id=f"{cluster_id}_p10",
                role="X Post / Short Form Thread",
                format="Post",
                pillar="AI News",
                series="AI NEWS TODAY",
                target_audience="X / Twitter Tech Community",
                angle=f"High-signal technical teardown of {short_title}",
                hook=f"{short_title} just released. Here are the 5 architectural shifts that actually matter:",
                synopsis=f"Bullet-point thread with links to arXiv paper / GitHub repo and zero corporate fluff.",
                recommended_duration=None,
                cta="Retweet to share with builders.",
                comment_keyword=None
            )
        ]

        return ContentClusterPackage(
            cluster_id=cluster_id,
            event_id=event_id,
            event_title=title,
            cluster_theme=f"Complete multi-format coverage ecosystem for {short_title}",
            pieces=pieces
        )


cluster_engine = ClusterEngine()
