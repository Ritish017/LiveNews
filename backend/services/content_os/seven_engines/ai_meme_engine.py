from typing import Dict, Any, List
from backend.services.content_os.prompt_compiler.universal_prompt_schema import SceneShotSpec

class AIMemeEngine:
    """
    ENGINE 6 — AI MEMES / RELATABLE (§11)
    High-reach acquisition engine.
    Understands real meme anatomy: Setup -> Expectation -> Contrast -> Punchline.
    Avoids generic cringey AI jokes. Grounded in actual developer and creator culture.
    """

    @classmethod
    def generate_content(
        cls,
        topic: str,
        angle_input: str = "",
        duration_sec: int = 15
    ) -> Dict[str, Any]:
        meme_concept = topic.replace("Meme:", "").strip() or "AI Agent Infinite Loops"
        angle = angle_input or "The exact moment you let an autonomous coding agent fix one small typo"

        hook = "POV: You told your autonomous AI agent to fix one CSS margin and went to grab coffee."

        shots = [
            SceneShotSpec(
                shot_id="s1_setup",
                time_start=0.0,
                time_end=3.0,
                duration_sec=3.0,
                purpose="HOOK",
                voiceover=hook,
                on_screen_text="POV: 'JUST FIX ONE SMALL MARGIN'",
                visual_concept="Developer walking back to desk smiling with a fresh cup of coffee, completely relaxed",
                subject="Unsuspecting developer returning to battle-station",
                action="Takes a relaxed sip of coffee before glancing at screen",
                environment="Modern tech office with soft background depth of field",
                composition="Over-the-shoulder medium shot",
                camera="Sony FX3 Handheld",
                lens="35mm f/1.4",
                movement="Smooth walking handheld tracking",
                lighting="Warm ambient office interior",
                sound_effects="Relaxing coffee shop jazz music playing quietly",
                underlying_claim="Relatable developer setup"
            ),
            SceneShotSpec(
                shot_id="s2_expectation",
                time_start=3.0,
                time_end=6.0,
                duration_sec=3.0,
                purpose="CONTEXT",
                voiceover="Expectation: PR ready, tests passing, 2-line diff.",
                on_screen_text="EXPECTATION: +2 -2 LINES",
                visual_concept="Clean GitHub pull request mockup showing green checkmark and tiny diff",
                subject="Ideal workflow illusion",
                action="Clean green PR checkmark badge with happy notification pop",
                environment="Clean browser UI mockup",
                composition="Centered graphic presentation",
                camera="Static screen capture",
                lens="Digital 4K",
                movement="Gentle 1.05x zoom",
                lighting="Bright clean daylight UI",
                sound_effects="Positive uplifting chime",
                underlying_claim="Intended outcome"
            ),
            SceneShotSpec(
                shot_id="s3_contrast",
                time_start=6.0,
                time_end=11.0,
                duration_sec=5.0,
                purpose="PAYOFF",
                voiceover="Reality: The agent deleted the production database, rewritten the entire backend in Rust, and is now arguing with itself on Hacker News.",
                on_screen_text="REALITY: 142 FILES DELETED IN RUST",
                visual_concept="Extreme close-up of developer's eyes widening in pure horror as red terminal error lines stream at 100 mph",
                subject="Shocked developer realization",
                action="Coffee cup freezes mid-air as red terminal reflection illuminates terrified face",
                environment="Dimly lit desk with frantic red terminal light flickering",
                composition="Extreme close-up macro eye reflection",
                camera="Fast whip zoom into reflection in pupil",
                lens="85mm Macro",
                movement="Violent comedic snap zoom",
                lighting="High-contrast frantic red emergency terminal strobe",
                sound_effects="Music abruptly record-scratches into industrial alert sirens and keyboard smashing",
                underlying_claim="Agent loop comedic contrast"
            ),
            SceneShotSpec(
                shot_id="s4_punchline_cta",
                time_start=11.0,
                time_end=float(duration_sec),
                duration_sec=duration_sec - 11.0,
                purpose="CTA",
                voiceover="Send this to the developer on your team who trusts AI a little too much.",
                on_screen_text="SEND THIS TO THAT DEVELOPER",
                visual_concept="Fast cut to terminal showing prompt: 'Agent: I have resolved all issues by removing the codebase.'",
                subject="Final comedic punchline terminal output",
                action="Terminal cursor blinks innocently in pure silence",
                environment="Minimal dark terminal interface",
                composition="Centered text lockup",
                camera="Static lock",
                lens="50mm Cine",
                movement="Static lock",
                lighting="Cold single monitor glow",
                sound_effects="Single lonely cursor beep and dead silence",
                underlying_claim="Viral shareability trigger"
            )
        ]

        full_script = " ".join([s.voiceover for s in shots])

        return {
            "title": f"POV: {meme_concept}",
            "series": "AI MEMES",
            "content_type": "AI Memes / Relatable",
            "strategic_angle": angle,
            "why_now": "High cultural virality and relatable developer anxiety over autonomous agents.",
            "why_audience_cares": "High share rate among tech teams, students, and freelancers.",
            "differentiation": "Specific software engineering humor (Rust rewrites, git diffs) rather than boomer AI jokes.",
            "hook": hook,
            "alternative_hooks": [
                "Me after promising my boss AI would finish the project in 20 minutes.",
                "AI engineers explaining why their model needs 40,000 H100 GPUs to generate a cat meme.",
                "The senior dev watching the junior dev vibe-code into production on a Friday."
            ],
            "script_full_text": full_script,
            "shots": shots,
            "comment_keyword": "MEME",
            "dm_resource": "https://future-aii.com/community",
            "epistemic_status": "OPINION",
            "confidence_score": 99.0,
            "sources": [
                {
                    "source_name": "Developer Community Culture & GitHub Discussions",
                    "publisher": "Tech Community Trends",
                    "url": "https://github.com",
                    "tier": "Tier 3 (Community Culture)"
                }
            ]
        }
