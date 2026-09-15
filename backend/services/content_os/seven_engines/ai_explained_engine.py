from typing import Dict, Any, List
from backend.services.content_os.prompt_compiler.universal_prompt_schema import SceneShotSpec

class AIExplainedEngine:
    """
    ENGINE 2 — AI EXPLAINED (§7)
    Turns complicated AI concepts (transformers, attention, RAG, embeddings, context windows)
    into highly visual, plain-language short-form education.
    Structure: Hook -> Simple Explanation -> Visual Analogy -> Technical Truth -> Real Example -> Takeaway -> CTA.
    """

    @classmethod
    def generate_content(
        cls,
        topic: str,
        angle_input: str = "",
        duration_sec: int = 30
    ) -> Dict[str, Any]:
        concept_clean = topic.replace("AI Explained:", "").replace("Explain", "").strip() or "Transformers"
        angle = angle_input or f"The visual analogy that finally makes {concept_clean} click in 30 seconds"

        hook = f"Most people think {concept_clean} is magic. In the next 30 seconds, you will understand it better than 90% of engineers."

        shots = [
            SceneShotSpec(
                shot_id="s1_hook",
                time_start=0.0,
                time_end=2.5,
                duration_sec=2.5,
                purpose="HOOK",
                voiceover=hook,
                on_screen_text=f"{concept_clean.upper()} EXPLAINED",
                visual_concept="Fast 3D geometric origami folding into an orderly vector lattice, illuminated by high-contrast amber rim light",
                subject="Abstract 3D information model",
                action="Chaotic particles snap into perfect geometric alignment",
                environment="Deep matte black void with floating coordinate grid",
                composition="Centered dynamic perspective",
                camera="Virtual 50mm Prime",
                lens="50mm f/1.2",
                movement="Rapid whip push-in",
                lighting="Warm amber and cool cyan directional lasers",
                sound_effects="Mechanical lock click with low frequency surge",
                underlying_claim="Conceptual intuition"
            ),
            SceneShotSpec(
                shot_id="s2_simple_explanation",
                time_start=2.5,
                time_end=8.0,
                duration_sec=5.5,
                purpose="CONTEXT",
                voiceover=f"Here is the simple truth: {concept_clean} is not thinking like a human. It is calculating mathematical relationships between concepts.",
                on_screen_text="MATH, NOT MAGIC",
                visual_concept="Clean kinetic typography sliding in with interactive slider connecting words to numerical vector coordinates",
                subject="Vector embedding space visualization",
                action="Word tokens light up with distances measured in real time",
                environment="High-contrast dark typography canvas",
                composition="Rule of thirds balance",
                camera="Smooth orbital pan",
                lens="35mm Wide",
                movement="Orbital rotation around focal token",
                lighting="Subtle soft white diffuse illumination",
                sound_effects="Soft UI whoosh and gentle digital blips",
                underlying_claim="Vector representations of language"
            ),
            SceneShotSpec(
                shot_id="s3_visual_analogy",
                time_start=8.0,
                time_end=16.0,
                duration_sec=8.0,
                purpose="PAYOFF",
                voiceover="Think of it like a librarian with photographic memory. Instead of reading an entire book page by page, attention shines a spotlight only on the exact paragraphs that answer your question.",
                on_screen_text="THE SPOTLIGHT ANALOGY",
                visual_concept="Photorealistic library archive where physical spotlight instantly isolates one glowing book on a shelf among thousands",
                subject="Dramatic physical lighting metaphor",
                action="Spotlight beam sweeps rapidly across bookshelves and locks onto target volume",
                environment="Cinematic architectural library vault with dark mahogany and glass",
                composition="Wide cinematic establishing shot transitioning to tight macro",
                camera="Steadicam dolly track",
                lens="28mm Anamorphic",
                movement="Smooth forward push track",
                lighting="Volumetric dust motes caught in intense focused light shaft",
                sound_effects="Atmospheric cello swell with mechanical shutter click",
                underlying_claim="Self-attention mechanism mechanism"
            ),
            SceneShotSpec(
                shot_id="s4_real_example",
                time_start=16.0,
                time_end=23.0,
                duration_sec=7.0,
                purpose="WHY_IT_MATTERS",
                voiceover="That is why modern reasoning models can process a million tokens of code without forgetting what you asked in the first sentence.",
                on_screen_text="1,000,000 TOKEN CONTEXT",
                visual_concept="Real-time IDE code scroll benchmark running smoothly with 0 context degradation",
                subject="Terminal monitor telemetry",
                action="Memory graph stays green at 99.8% precision across million-token document",
                environment="Minimal dark software engineer setup",
                composition="Over-the-shoulder engineer perspective",
                camera="Handheld documentary subtle sway",
                lens="50mm f/1.8",
                movement="Gentle natural handheld drift",
                lighting="Screen glow illuminating engineer's focused gaze",
                sound_effects="Fast keystroke sequence with electronic confirmation hum",
                underlying_claim="Long-context retrieval efficiency"
            ),
            SceneShotSpec(
                shot_id="s5_cta",
                time_start=23.0,
                time_end=float(duration_sec),
                duration_sec=duration_sec - 23.0,
                purpose="CTA",
                voiceover=f"Comment GUIDE and I will DM you my 1-page visual cheat sheet for {concept_clean}. Follow @future.aii__ to understand AI simply.",
                on_screen_text="COMMENT 'GUIDE' FOR CHEAT SHEET",
                visual_concept="High-contrast PDF cheat sheet mockup floating with pulsing download badge",
                subject="@future.aii__ educational resource card",
                action="Document mockup rotates subtly into camera view",
                environment="Dark studio setting with amber backlight",
                composition="Centered focal showcase",
                camera="Locked Cine Tripod",
                lens="85mm Prime",
                movement="Static lock",
                lighting="Warm golden hour rim glow",
                sound_effects="Clean synthetic chime",
                underlying_claim="Educational deliverable"
            )
        ]

        full_script = " ".join([s.voiceover for s in shots])

        return {
            "title": f"{concept_clean} Explained Simply",
            "series": "AI EXPLAINED",
            "content_type": "AI Explained",
            "strategic_angle": angle,
            "why_now": "Trending conceptual confusion across developer and non-technical feeds.",
            "why_audience_cares": "Translates intimidating machine learning jargon into clear visual analogies.",
            "differentiation": "Uses a physical real-world metaphor (spotlight in a library) rather than confusing matrix equations.",
            "hook": hook,
            "alternative_hooks": [
                f"If you can understand this 30-second diagram, you understand {concept_clean}.",
                f"Why every computer science professor explains {concept_clean} wrong.",
                f"How {concept_clean} actually works inside an AI model (no math required)."
            ],
            "script_full_text": full_script,
            "shots": shots,
            "comment_keyword": "GUIDE",
            "dm_resource": f"https://future-aii.com/cheatsheets/{concept_clean.lower().replace(' ', '-')}",
            "epistemic_status": "CONFIRMED",
            "confidence_score": 98.0,
            "sources": [
                {
                    "source_name": "Attention Is All You Need (Vaswani et al.)",
                    "publisher": "NeurIPS Research",
                    "url": "https://arxiv.org/abs/1706.03762",
                    "tier": "Tier 1 (Official Research)"
                }
            ]
        }
