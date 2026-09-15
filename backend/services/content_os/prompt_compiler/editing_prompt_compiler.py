from typing import List, Dict, Any
from backend.services.content_os.prompt_compiler.universal_prompt_schema import SceneShotSpec, EditingPlanSpec

class EditingPromptCompiler:
    """
    Compiles CapCut, Premiere Pro, and DaVinci Resolve shot-by-shot
    timeline edit plans with audio stems and transition guidelines.
    """

    @classmethod
    def compile_spec(cls, shots: List[SceneShotSpec]) -> EditingPlanSpec:
        timeline_cuts: List[Dict[str, Any]] = []
        for i, s in enumerate(shots):
            timeline_cuts.append({
                "track": 1,
                "clip_name": f"Shot_{s.shot_id}",
                "start_time": f"00:00:{int(s.time_start):02d}:00",
                "end_time": f"00:00:{int(s.time_end):02d}:00",
                "transition": s.transition_out,
                "caption_overlay": s.on_screen_text,
                "sfx_cue": s.sound_effects,
                "color_grade": "Dark Teal & Orange / High Contrast / 6500K Neutral",
                "zoom_punch": "1.08x punch-in on first key syllable"
            })

        audio_guide = (
            "Track A1: Clean vocal narration (-3dB peak, sidechain compression on master music bed). "
            "Track A2: Cinematic dark electronic synth riser building into payoff (-18dB). "
            "Track A3: Sub-bass drop on hook payoff at 00:00:02:00, crisp mechanical keyboard clicks under UI demo."
        )

        return EditingPlanSpec(
            software_targets=["CapCut Mobile/Desktop", "Adobe Premiere Pro", "DaVinci Resolve 19"],
            timeline_cuts=timeline_cuts,
            audio_track_guidelines=audio_guide,
            export_preset="1080x1920 30fps H.264 / ProRes 422"
        )
