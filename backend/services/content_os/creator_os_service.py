import uuid
from datetime import datetime
from typing import Dict, Any, List, Optional

from backend.services.content_os.prompt_compiler import (
    SceneShotSpec,
    FlowPromptCompiler,
    GeminiPromptCompiler,
    ChatGPTPromptCompiler,
    RemotionPromptCompiler,
    HyperFramesPromptCompiler,
    HeyGenPromptCompiler,
    OpenSourcePromptCompiler,
    EditingPromptCompiler,
    SocialDistributionPackage,
    UniversalContentPackage
)
from backend.services.content_os.seven_engines import (
    AINewsEngine,
    AIExplainedEngine,
    AIToolsEngine,
    AINormalPeopleEngine,
    FutureEngine,
    AIMemeEngine,
    AIExperimentEngine
)
from backend.services.content_os.capabilities import CapabilityRegistry, ToolRouter, CostEstimator
from backend.services.content_os.quality.prompt_quality import PromptQualityChecker
from backend.services.content_os.social.cta_engine import CTAEngine
from backend.services.content_os.learning.creator_profile import FutureAiiVoiceProfile

class CreatorOSService:
    """
    Master orchestrator for FUTURE.AII CONTENT OS.
    Executes the principle:
    THE ENGINE IS EXTREMELY INTELLIGENT.
    THE INTERFACE IS EXTREMELY SIMPLE.
    """

    @classmethod
    def get_today_mission_control(cls) -> Dict[str, Any]:
        """
        §3 & §59: Plain-language recommendations answering 'What should I post today?'
        No 94.2/100 or momentum 83 clutter. Only plain decisions.
        """
        return {
            "greeting": "Good morning. What should we create today?",
            "recommendations": [
                {
                    "id": "rec_1",
                    "badge": "🔥 POST THIS",
                    "title": "Open-Source AI Just Achieved Local Reasoning Under 400ms",
                    "why": "High relevance + strong creator opportunity + useful to AI developers.",
                    "format": "30-sec Reel",
                    "content_type": "AI Tools",
                    "topic": "Autonomous Local Coding Agents with DeepSeek",
                    "action_label": "CREATE EVERYTHING"
                },
                {
                    "id": "rec_2",
                    "badge": "📈 RISING FAST",
                    "title": "Why You Don't Need Cloud APIs to Build AI Apps Anymore",
                    "why": "Massive save intent as developers look to slash monthly subscription bills.",
                    "format": "30-sec Reel",
                    "content_type": "AI Explained",
                    "topic": "Local Inference & Context Windows",
                    "action_label": "CREATE EVERYTHING"
                },
                {
                    "id": "rec_3",
                    "badge": "🧠 IMPORTANT SHIFT",
                    "title": "Anthropic vs OpenAI: The Real Difference in Agent Architectures",
                    "why": "Clears up widespread confusion and drives high profile follows.",
                    "format": "45-sec Reel",
                    "content_type": "AI News",
                    "topic": "Frontier Agent Orchestration",
                    "action_label": "CREATE EVERYTHING"
                }
            ],
            "best_ideas": [
                {"rank": 1, "type": "AI News", "title": "Google DeepMind's New Memory Architecture"},
                {"rank": 2, "type": "AI Tool", "title": "Free Local Agent That Replaces GitHub Copilot"},
                {"rank": 3, "type": "AI Explained", "title": "How Test-Time Compute Actually Works"}
            ],
            "content_queue_today": [
                {"time": "09:00", "pillar": "AI News", "title": "Local Reasoning Breakthrough", "status": "Ready to Post"},
                {"time": "13:00", "pillar": "AI Tools", "title": "Free Offline Coding Agent", "status": "Script Ready"},
                {"time": "20:00", "pillar": "AI Memes", "title": "Friday Production Deploy Chaos", "status": "Ideation"}
            ],
            "creator_learning": "Your tool demonstrations are performing 2.1× better than generic news summaries. Continue prioritizing practical terminal workflows."
        }

    @classmethod
    def get_radar_trends(cls) -> Dict[str, Any]:
        """
        §37: Simplified Radar organized into 5 plain buckets.
        """
        return {
            "breaking_now": [
                {
                    "id": "trend_1",
                    "topic": "OpenAI Agent Swarm & Infrastructure Security",
                    "what_happened": "Security researchers documented autonomous agent package uploads.",
                    "why_it_matters": "Changes how companies audit third-party AI package permissions.",
                    "best_content_type": "AI News",
                    "recommended_angle": "What developers must configure to safeguard dependencies today."
                }
            ],
            "rising": [
                {
                    "id": "trend_2",
                    "topic": "Test-Time Compute & Reasoning Models",
                    "what_happened": "Shift from pre-training scale to inference-time reasoning budgets.",
                    "why_it_matters": "Allows smaller models to beat larger models on hard math and coding.",
                    "best_content_type": "AI Explained",
                    "recommended_angle": "Why waiting 10 seconds for AI to 'think' saves hours of debugging."
                },
                {
                    "id": "trend_3",
                    "topic": "Local Code Agents on Apple Silicon",
                    "what_happened": "Quantized reasoning models achieving 140 tok/s on M3/M4 hardware.",
                    "why_it_matters": "Eliminates monthly cloud API fees for student and freelance developers.",
                    "best_content_type": "AI Tools",
                    "recommended_angle": "How to set up an offline coding assistant tonight for free."
                }
            ],
            "under_the_radar": [
                {
                    "id": "trend_4",
                    "topic": "World Models & Interactive Simulation",
                    "what_happened": "Research showing real-time action chunk editing in generative video.",
                    "why_it_matters": "Lays foundational architecture for autonomous physical robotics.",
                    "best_content_type": "Future / AGI / ASI",
                    "recommended_angle": "Why video models will teach robots how physical reality works."
                }
            ],
            "saturated": [
                {
                    "id": "trend_5",
                    "topic": "Generic Top 5 AI Tools Lists",
                    "what_happened": "Over-saturated copycat lists across TikTok and Instagram.",
                    "why_it_matters": "Viewers instantly scroll past generic marketing claims.",
                    "best_content_type": "AI Experiments",
                    "recommended_angle": "Skip the list: test one specific workflow rigorously."
                }
            ],
            "declining": [
                {
                    "id": "trend_6",
                    "topic": "Basic Prompt Engineering Hacks",
                    "what_happened": "Reasoning models make elaborate prompt personas obsolete.",
                    "why_it_matters": "Audience wants verifiable agentic tools, not 50-word prompt formulas.",
                    "best_content_type": "AI for Normal People",
                    "recommended_angle": "Why modern reasoning models just need plain English instructions."
                }
            ]
        }

    @classmethod
    def create_everything(
        cls,
        content_type: str,
        topic: str,
        angle: str = "",
        format_type: str = "Reel",
        style: str = "Fast",
        duration_sec: int = 30,
        free_first: bool = True
    ) -> UniversalContentPackage:
        """
        §13, §14, §33, §68: UNIVERSAL ONE-CLICK 'CREATE EVERYTHING' PIPELINE.
        Dispatches to one of the 7 engines, compiles prompt packs across all tools,
        verifies quality, and outputs a complete ready-to-produce package.
        """
        content_id = f"cnt_{uuid.uuid4().hex[:8]}"
        ct_clean = content_type.lower()

        # 1. Dispatch to Seven Content Engines (§6 - §12)
        if "explain" in ct_clean:
            engine_output = AIExplainedEngine.generate_content(topic, angle, duration_sec)
        elif "tool" in ct_clean:
            engine_output = AIToolsEngine.generate_content(topic, angle, duration_sec)
        elif "normal" in ct_clean or "everyday" in ct_clean:
            engine_output = AINormalPeopleEngine.generate_content(topic, angle, duration_sec)
        elif "future" in ct_clean or "agi" in ct_clean:
            engine_output = FutureEngine.generate_content(topic, angle, duration_sec)
        elif "meme" in ct_clean:
            engine_output = AIMemeEngine.generate_content(topic, angle, duration_sec)
        elif "experiment" in ct_clean:
            engine_output = AIExperimentEngine.generate_content(topic, angle, duration_sec)
        else:  # AI News default
            engine_output = AINewsEngine.generate_content(topic, angle, duration_sec)

        title = engine_output["title"]
        strategic_angle = engine_output["strategic_angle"]
        hook = engine_output["hook"]
        alt_hooks = engine_output.get("alternative_hooks", [])
        shots: List[SceneShotSpec] = engine_output["shots"]
        script_full = engine_output["script_full_text"]
        series = engine_output["series"]

        # 2. Social Distribution & CTA Engine (§15 & §16)
        cta_data = CTAEngine.select_cta(content_type, topic)
        social_pkg = SocialDistributionPackage(
            caption_short=f"What actually changed with {topic}: {strategic_angle}. {cta_data['cta_primary']}",
            caption_long=(
                f"Most headlines about {topic} missed the real story.\n\n"
                f"Here is what actually happened: {strategic_angle}.\n\n"
                f"1. Verified under the hood\n"
                f"2. Measurable developer impact\n"
                f"3. Practical next steps\n\n"
                f"{cta_data['cta_primary']}\n\n"
                f"{cta_data['follow_nudge']}"
            ),
            hashtags=["#AI", "#ArtificialIntelligence", "#MachineLearning", "#TechTrends", "#FutureTech", "#futureaii"],
            cta_primary=cta_data["cta_primary"],
            cta_type=cta_data["cta_type"],
            comment_keyword=cta_data["comment_keyword"],
            dm_public_reply=cta_data["dm_public_reply"],
            dm_private_message=cta_data["dm_private_message"],
            dm_resource_deliverable=cta_data["dm_resource_deliverable"],
            follow_nudge=cta_data["follow_nudge"]
        )

        # 3. Model Routing & Cost Estimation (§31 & §69)
        primary_engine, cost_tier, routing_reason = ToolRouter.route_production(content_type, format_type, free_first)

        # 4. Universal Prompt Compilers (§20 - §32)
        flow_prompts = FlowPromptCompiler.compile_shots(shots)
        gemini_prompts = GeminiPromptCompiler.compile_pack(
            title=title,
            topic=topic,
            content_type=content_type,
            strategic_angle=strategic_angle,
            script_full_text=script_full,
            source_claims=engine_output.get("sources", [])
        )
        chatgpt_prompts = ChatGPTPromptCompiler.compile_pack(
            title=title,
            topic=topic,
            content_type=content_type,
            strategic_angle=strategic_angle,
            hook=hook,
            script_full=script_full
        )
        remotion_spec = RemotionPromptCompiler.compile_spec(
            composition_name=f"Reel_{content_id}",
            shots=shots,
            total_duration_sec=float(duration_sec)
        )
        hyperframes_spec = HyperFramesPromptCompiler.compile_spec(shots, float(duration_sec))
        heygen_spec = HeyGenPromptCompiler.compile_spec(shots)
        opensource_spec = OpenSourcePromptCompiler.compile_spec(f"Reel_{content_id}", shots)
        editing_plan = EditingPromptCompiler.compile_spec(shots)

        # 5. Quality & Anti-AI-Slop Governance (§19 & §49)
        quality_report = PromptQualityChecker.audit_all_shots(shots)

        return UniversalContentPackage(
            id=content_id,
            title=title,
            content_type=content_type,
            series=series,
            format=format_type,
            duration_seconds=duration_sec,
            target_audience="Developers, AI enthusiasts, and curious operators",
            core_objective="Drive engagement, saves, and verified resource delivery",
            strategic_angle=strategic_angle,
            why_now=engine_output.get("why_now", "Immediate relevance to daily technical workflows."),
            why_audience_cares=engine_output.get("why_audience_cares", "Saves time and eliminates subscription overhead."),
            differentiation=engine_output.get("differentiation", "Grounded in verifiable technical facts rather than press hype."),
            hook=hook,
            alternative_hooks=alt_hooks,
            script_full_text=script_full,
            script_shots=shots,
            flow_prompts=flow_prompts,
            gemini_prompts=gemini_prompts,
            chatgpt_prompts=chatgpt_prompts,
            remotion_spec=remotion_spec,
            hyperframes_spec=hyperframes_spec,
            heygen_spec=heygen_spec,
            opensource_spec=opensource_spec,
            editing_plan=editing_plan,
            social_package=social_pkg,
            cost_tier=cost_tier,
            primary_engine_routed=primary_engine,
            routing_reason=routing_reason,
            source_claims=engine_output.get("sources", []),
            confidence_score=engine_output.get("confidence_score", 96.0),
            epistemic_status=engine_output.get("epistemic_status", "CONFIRMED"),
            originality_score=quality_report.get("quality_score", 94),
            anti_slop_passed=quality_report.get("passed", True),
            created_at=datetime.utcnow().isoformat()
        )

    @classmethod
    def get_calendar_schedule(cls) -> Dict[str, Any]:
        """
        §38: Simple daily posting schedule answering 'What am I posting today?'
        """
        return {
            "date": datetime.utcnow().strftime("%A, %B %d, %Y"),
            "schedule": [
                {
                    "time": "09:00 AM",
                    "pillar": "AI News",
                    "format": "Reel (30s)",
                    "title": "Breaking Lab Model Announcement",
                    "status": "Scheduled"
                },
                {
                    "time": "01:00 PM",
                    "pillar": "AI Tools",
                    "format": "Reel (30s)",
                    "title": "Offline Coding Agent Setup",
                    "status": "Ready to Post"
                },
                {
                    "time": "06:30 PM",
                    "pillar": "AI Explained",
                    "format": "Carousel (7 Slides)",
                    "title": "How Reasoning Models Actually Think",
                    "status": "Draft"
                },
                {
                    "time": "09:00 PM",
                    "pillar": "AI Memes",
                    "format": "Reel (15s)",
                    "title": "When the Autonomous Agent Deletes Production",
                    "status": "Idea"
                }
            ],
            "pacing_note": "Target: 2 Reels + 1 Carousel daily. Quality > Quantity. Never post filler."
        }

    @classmethod
    def get_analytics_learnings(cls) -> Dict[str, Any]:
        """
        §39: Creator-focused metrics & actionable learnings.
        """
        return {
            "account": "@future.aii__",
            "overall_views_30d": 3840000,
            "average_completion_rate": "62.4%",
            "top_performing_pillar": "AI Tools & Demonstrations",
            "key_learnings": [
                "Tool demonstrations outperform generic AI news summaries by 2.1× in saves and DMs.",
                "Sub-2.0s curiosity hooks ('Stop doing this manually') achieve 76% 3-second hold rates.",
                "Comment trigger 'TOOL' generates 14× more active conversations than generic 'Follow for more' CTAs."
            ],
            "best_performing_formats": [
                {"format": "30s Terminal Demo Reel", "avg_views": "480K", "retention": "68%"},
                {"format": "8-Slide Architecture Carousel", "avg_saves": "14.2K", "shares": "6.1K"},
                {"format": "15s Comedic Contrast Meme", "avg_views": "820K", "shares": "28.4K"}
            ]
        }
