from typing import List, Dict, Any
from backend.services.content_os.prompt_compiler.universal_prompt_schema import SceneShotSpec, HeyGenSpec

class HeyGenPromptCompiler:
    """
    Compiles avatar spokesperson scripts and B-roll cutaway plans
    for HeyGen / AI presenter workflows.
    """

    @classmethod
    def compile_spec(cls, shots: List[SceneShotSpec]) -> HeyGenSpec:
        full_voice = " ".join([s.voiceover for s in shots])
        b_roll_cues = []
        for s in shots:
            if s.purpose in ["CONTEXT", "PAYOFF"]:
                b_roll_cues.append({
                    "time_start": s.time_start,
                    "time_end": s.time_end,
                    "b_roll_action": s.visual_concept,
                    "on_screen_text": s.on_screen_text,
                    "camera_angle": "Cut from presenter to high-res B-roll screen recording"
                })

        return HeyGenSpec(
            avatar_id="josh_lite3_2024",
            voice_id="en-US-Neural2-F",
            speaking_script=full_voice,
            b_roll_cues=b_roll_cues
        )
