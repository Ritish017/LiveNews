from typing import Dict, Any, List
from backend.services.content_os.prompt_compiler.universal_prompt_schema import GeminiPromptPack, SceneShotSpec

class GeminiPromptCompiler:
    """
    Compiles optimized Gemini Pro prompt suites for deep reasoning,
    script polishing, critical forensic evaluation, and multi-platform repurposing.
    Supports Standard thinking and Extended thinking patterns.
    """

    @classmethod
    def compile_pack(
        cls,
        title: str,
        topic: str,
        content_type: str,
        strategic_angle: str,
        script_full_text: str,
        source_claims: List[Dict[str, Any]]
    ) -> GeminiPromptPack:
        claims_summary = "\n".join([
            f"- [{c.get('source_name', 'Verified Source')}] {c.get('claim', '')} (Confidence: {c.get('confidence', 95)}%)"
            for c in source_claims[:5]
        ])

        research_prompt = f"""You are an elite AI investigative researcher and technical journalist for @future.aii__.
Analyze this topic using Extended Thinking:
Topic: {topic}
Angle: {strategic_angle}
Core Claims to Verify:
{claims_summary}

Tasks:
1. Conduct deep technical validation: What actually changed under the hood?
2. Separate FACT vs INTERPRETATION vs PREDICTION.
3. Identify what most shallow tech reporting missed.
4. Output 3 non-obvious engineering implications that matter to students, developers, and AI operators."""

        creative_prompt = f"""You are the Creative Director for @future.aii__, a premier high-contrast AI media publication.
Brainstorm 5 contrarian, retention-maximizing angles for '{title}'.
Format:
- Angle Name
- Hook Formula (Sub-2.0 second visual/verbal punch)
- Why the audience stops scrolling
- The counter-intuitive takeaway"""

        polisher_prompt = f"""Review and polish this production Reel script for @future.aii__.
Script:
{script_full_text}

Rules:
1. Eliminate all AI buzzwords (e.g., 'game-changer', 'in the fast-paced world', 'delve', 'revolutionary').
2. Ensure every sentence has a distinct visual purpose.
3. Keep spoken pacing between 150-165 WPM.
4. End on a high-value CTA that triggers a comment-to-DM resource."""

        critic_prompt = f"""Critique this proposed video concept with high skepticism:
Title: {title}
Angle: {strategic_angle}
Script:
{script_full_text}

Score across 4 forensic dimensions:
1. Hook Retention Risk (Will viewers swipe away in 1.5s?)
2. Technical Accuracy (Are any claims exaggerated?)
3. Anti-AI-Slop (Does the visual plan rely on cliché glowing brains or floating code?)
4. Conversion Probability (Is the CTA irresistible?)"""

        repurposing_prompt = f"""Take this approved master content package:
Title: {title}
Script:
{script_full_text}

Repurpose into 5 platform-native formats:
1. Instagram Carousel (8-slide breakdown with headline & visual layout)
2. 3-Part Interactive Instagram Story (Poll -> Behind-the-scenes -> CTA)
3. High-engagement X Post / Thread (Punchy hook + bulleted evidence + link)
4. YouTube Short (Vertical 1080x1920 script with retention reset cues)
5. LinkedIn Founder / Tech Breakdown (Professional insights & architectural takeaway)"""

        return GeminiPromptPack(
            deep_research_prompt=research_prompt,
            creative_angle_prompt=creative_prompt,
            script_polisher_prompt=polisher_prompt,
            critic_prompt=critic_prompt,
            repurposing_prompt=repurposing_prompt
        )
