"""
CTA Engine & Comment -> DM Automation Engine for future.aii__
Implements §14, §15, §16, §17, §18: Context-specific CTAs, resource matching,
Meta-compliant automation architecture, and interactive DM simulation.
"""

import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

class CTASpec(BaseModel):
    cta_type: str  # Follow, Save, Share, Comment, DM_Resource, Discussion, Series
    public_cta_text: str
    rationale: str
    has_deliverable_resource: bool = False
    resource_keyword: Optional[str] = None


class AutomationSpec(BaseModel):
    id: str
    content_id: Optional[str] = None
    trigger_source: str = "COMMENT"  # COMMENT, STORY_REPLY
    keywords: List[str] = Field(default_factory=lambda: ["PROMPT"])
    match_type: str = "WORD"  # EXACT, WORD, FLEXIBLE
    public_reply_options: List[str] = Field(default_factory=list)
    initial_dm: str
    resource_type: str = "PROMPT"  # PROMPT, LINK, CHEATSHEET, GUIDE, CODE
    resource_content: str
    follow_up_nudge: Optional[str] = None
    status: str = "READY"  # DRAFT, READY, ACTIVE, PAUSED
    analytics: Dict[str, int] = Field(default_factory=lambda: {
        "trigger_count": 0,
        "dm_sent_count": 0,
        "reply_count": 0,
        "conversion_count": 0
    })


class SimulationResult(BaseModel):
    user_comment: str
    matched_keyword: Optional[str]
    is_match: bool
    public_reply_sent: Optional[str]
    dm_sent: Optional[str]
    resource_delivered: Optional[str]
    follow_up_sent: Optional[str]
    status: str


class CTAAndAutomationEngine:
    """
    Orchestrates strategic call-to-actions and compliant Comment-to-DM automated flows.
    """

    def select_cta(
        self,
        pillar: str,
        goal: str,
        topic: str,
        has_resource: bool = False,
        custom_keyword: Optional[str] = None
    ) -> CTASpec:
        """
        Determines the optimal CTA based on pillar, goal, and genuine resource availability (§18).
        """
        clean_topic = topic.split(":")[0] if ":" in topic else topic

        # If it's a tool or explainer with a genuine asset, prioritize DM resource delivery
        if has_resource or pillar in ["AI Tools", "AI Explained", "AI Experiments"]:
            if pillar == "AI Tools":
                keyword = custom_keyword or "TOOL"
                return CTASpec(
                    cta_type="DM_Resource",
                    public_cta_text=f"Comment '{keyword}' and I'll DM you the direct link and starter setup prompt.",
                    rationale="High comment velocity triggering algorithmic boost while delivering legitimate software utility.",
                    has_deliverable_resource=True,
                    resource_keyword=keyword
                )
            elif pillar == "AI Explained":
                keyword = custom_keyword or "CHEAT"
                return CTASpec(
                    cta_type="DM_Resource",
                    public_cta_text=f"Comment '{keyword}' to get the full visual architecture cheat-sheet in your DMs.",
                    rationale="Direct value exchange maximizing saves and profile visits from serious AI learners.",
                    has_deliverable_resource=True,
                    resource_keyword=keyword
                )
            elif pillar == "AI Experiments":
                keyword = custom_keyword or "PROMPT"
                return CTASpec(
                    cta_type="DM_Resource",
                    public_cta_text=f"Comment '{keyword}' and I'll send you the exact benchmark prompts we tested.",
                    rationale="Verifiable empirical reproduction for builders wanting to test their own models.",
                    has_deliverable_resource=True,
                    resource_keyword=keyword
                )

        # For pure news or high-level future discussions, do NOT fake a resource
        if pillar == "AI News":
            if goal == "Followers":
                return CTASpec(
                    cta_type="Follow",
                    public_cta_text="Follow @future.aii__ to stay ahead of the next frontier model drop.",
                    rationale="Capitalizes on breaking news curiosity to acquire long-term brand audience.",
                    has_deliverable_resource=False
                )
            elif goal == "Comments":
                return CTASpec(
                    cta_type="Discussion",
                    public_cta_text=f"Would you trust {clean_topic} in production? Drop your take below.",
                    rationale="Sparks genuine developer debate and high comment-to-view ratios.",
                    has_deliverable_resource=False
                )
            else:
                return CTASpec(
                    cta_type="Save",
                    public_cta_text="Save this breakdown — you'll need the benchmark comparisons this week.",
                    rationale="Drives saves, the highest weighted signal in the 2026 Instagram algorithm.",
                    has_deliverable_resource=False
                )

        if pillar == "AGI / ASI / Future":
            return CTASpec(
                cta_type="Series",
                public_cta_text="Follow @future.aii__ for Part 2 of the Road to AGI series.",
                rationale="Builds recurring audience anticipation for episodic deep dives.",
                has_deliverable_resource=False
            )

        if pillar == "AI Memes / Relatable":
            return CTASpec(
                cta_type="Share",
                public_cta_text="Share this with a developer who prompts AI at 3 AM.",
                rationale="Peer-to-peer DMs and shares supercharge top-of-funnel virality.",
                has_deliverable_resource=False
            )

        # Fallback Discussion CTA
        return CTASpec(
            cta_type="Discussion",
            public_cta_text="What is your honest take on this? Let's discuss in the comments.",
            rationale="Authentic conversation starter avoiding spam penalties.",
            has_deliverable_resource=False
        )

    def create_automation(
        self,
        content_id: str,
        keyword: str,
        topic: str,
        resource_payload: str,
        resource_type: str = "PROMPT"
    ) -> AutomationSpec:
        """
        Builds a Meta-compliant Comment-to-DM automation specification.
        """
        clean_kw = keyword.upper().strip()
        auto_id = f"auto_{content_id}_{clean_kw.lower()}"

        public_replies = [
            f"Just sent you the full details in your DMs! Check your message requests 👀",
            f"Sent to your DMs! Let me know if you have questions on the setup 🚀",
            f"Check your DMs — the link and starter prompt are waiting for you ⚡"
        ]

        dm_body = (
            f"Hey! Here is the {resource_type.lower()} for {topic} you requested 👇\n\n"
            f"{resource_payload}\n\n"
            f"Let me know what you build with it!"
        )

        follow_up = (
            "By the way: if you find this useful, follow @future.aii__ for daily AI workflows and breakdown reels! 🧠"
        )

        return AutomationSpec(
            id=auto_id,
            content_id=content_id,
            trigger_source="COMMENT",
            keywords=[clean_kw, f"#{clean_kw}", clean_kw.lower()],
            match_type="WORD",
            public_reply_options=public_replies,
            initial_dm=dm_body,
            resource_type=resource_type,
            resource_content=resource_payload,
            follow_up_nudge=follow_up,
            status="ACTIVE"
        )

    def simulate_interaction(
        self,
        automation: AutomationSpec,
        incoming_comment: str,
        user_handle: str = "ai_builder_99"
    ) -> SimulationResult:
        """
        Simulates comment matching and DM dispatch without touching production Instagram APIs.
        """
        comment_cleaned = incoming_comment.strip().upper()
        matched_kw = None

        for kw in automation.keywords:
            if automation.match_type == "EXACT":
                if comment_cleaned == kw.upper():
                    matched_kw = kw
                    break
            elif automation.match_type == "WORD":
                words = [w.strip(".,!?#") for w in comment_cleaned.split()]
                if kw.upper() in words:
                    matched_kw = kw
                    break
            else:  # FLEXIBLE
                if kw.upper() in comment_cleaned:
                    matched_kw = kw
                    break

        if not matched_kw:
            return SimulationResult(
                user_comment=incoming_comment,
                matched_keyword=None,
                is_match=False,
                public_reply_sent=None,
                dm_sent=None,
                resource_delivered=None,
                follow_up_sent=None,
                status="NO_MATCH: Comment did not contain trigger keyword"
            )

        # Matched!
        pub_reply = f"@{user_handle} {automation.public_reply_options[0]}"
        return SimulationResult(
            user_comment=incoming_comment,
            matched_keyword=matched_kw,
            is_match=True,
            public_reply_sent=pub_reply,
            dm_sent=automation.initial_dm,
            resource_delivered=automation.resource_content,
            follow_up_sent=automation.follow_up_nudge,
            status="SUCCESS: Webhook triggered, public reply posted, and private DM delivered."
        )


cta_automation_engine = CTAAndAutomationEngine()
