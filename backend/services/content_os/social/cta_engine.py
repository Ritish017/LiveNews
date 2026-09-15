from typing import Dict, Any

class CTAEngine:
    """
    ENGINE — CTA & COMMENT → DM SELECTOR (§15 & §16)
    Chooses the most relevant call-to-action based on content objective.
    Never uses a lazy 'Follow for more' when high-value engagement is possible.
    """

    @classmethod
    def select_cta(
        cls,
        content_type: str,
        topic: str,
        goal: str = "Engagement"
    ) -> Dict[str, Any]:
        ct = content_type.lower()
        if "tool" in ct:
            keyword = "TOOL"
            cta_text = "Comment TOOL and I'll DM you the direct repository link and setup workflow."
            public_reply = "Sending the setup link directly to your DMs! Check message requests 👀"
            private_dm = f"Hey! Here is the verified setup guide for {topic} you requested 👇\n\nhttps://future-aii.com/tools"
            resource = f"Direct GitHub Setup & Workflow Guide for {topic}"
        elif "explain" in ct:
            keyword = "GUIDE"
            cta_text = "Comment GUIDE and I will DM you my 1-page visual architecture breakdown."
            public_reply = "Sent the visual guide to your DMs! ⚡"
            private_dm = f"Hey! You asked for the visual breakdown of {topic} 👇\n\nhttps://future-aii.com/cheatsheet"
            resource = f"1-Page Visual Cheat Sheet: {topic}"
        elif "normal people" in ct:
            keyword = "TEMPLATE"
            cta_text = "Comment TEMPLATE and I will DM you the free prompt pack."
            public_reply = "Just sent you the full prompt template! Check DMs 🚀"
            private_dm = f"Here is the prompt template you can copy and use right away 👇\n\nhttps://future-aii.com/templates"
            resource = "Everyday Automation Prompt Pack"
        elif "experiment" in ct:
            keyword = "TEST"
            cta_text = "Comment TEST if you want the full evaluation code and diffs."
            public_reply = "Sent you the raw benchmark code and data! 📊"
            private_dm = f"Here are the complete benchmark prompts and execution diffs 👇\n\nhttps://future-aii.com/benchmarks"
            resource = "Complete Model Benchmark Suite"
        elif "future" in ct:
            keyword = "AGI"
            cta_text = "What year do you think AGI officially arrives? Drop your prediction below!"
            public_reply = "Interesting prediction! Sent you our 2026-2030 timeline roadmap in DMs 🧠"
            private_dm = "Here is the @future.aii__ Road to AGI comprehensive timeline report 👇\n\nhttps://future-aii.com/reports/agi"
            resource = "Road to AGI Timeline Report"
        elif "meme" in ct:
            keyword = "SHARE"
            cta_text = "Send this to someone who vibe-codes into production on Friday."
            public_reply = "Thanks for sharing! Keep building 🫡"
            private_dm = "Welcome to the @future.aii__ community hub! 👇\n\nhttps://future-aii.com/community"
            resource = "Community Hub Link"
        else:  # AI News
            keyword = "NEWS"
            cta_text = "Comment NEWS and I will DM you the primary lab paper and code repo."
            public_reply = "Sending you the verified primary source link! 📰"
            private_dm = f"Here is the primary research paper and technical documentation for {topic} 👇\n\nhttps://future-aii.com/news"
            resource = f"Verified Primary Source & Paper: {topic}"

        return {
            "cta_primary": cta_text,
            "cta_type": "COMMENT_TO_DM" if keyword != "SHARE" else "SHARE",
            "comment_keyword": keyword,
            "dm_public_reply": public_reply,
            "dm_private_message": private_dm,
            "dm_resource_deliverable": resource,
            "follow_nudge": "If you found this useful, follow @future.aii__ for daily AI breakdowns."
        }
