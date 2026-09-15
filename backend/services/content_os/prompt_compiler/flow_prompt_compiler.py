from typing import List
from backend.services.content_os.prompt_compiler.universal_prompt_schema import SceneShotSpec, FlowShotPrompt

class FlowPromptCompiler:
    """
    Compiles production-ready Google Flow / Veo / Gemini Omni shot prompts.
    Does NOT lump everything into one vague prompt.
    Produces individual, cinematic shot instructions with motion, lighting, and negative constraints.
    """

    @classmethod
    def compile_shots(cls, shots: List[SceneShotSpec]) -> List[FlowShotPrompt]:
        compiled_list: List[FlowShotPrompt] = []
        for s in shots:
            prompt_parts = [
                f"[SHOT {s.shot_id.upper()} - {s.duration_sec}s - {s.purpose.upper()}]",
                f"Subject: {s.subject}.",
                f"Action: {s.action}.",
                f"Environment: {s.environment}.",
                f"Composition & Framing: {s.composition} shot using {s.lens} on {s.camera}.",
                f"Camera Movement: {s.movement}.",
                f"Lighting: {s.lighting}, setting the mood for {s.time_of_day}.",
                f"Materials & Surface Physics: {s.materials}. {s.physics}.",
                f"Aesthetic: High-contrast, cinematic modern dark tech, sleek 8K photoreal.",
                f"Sound Atmosphere: {s.sound_effects}."
            ]
            compiled_text = " ".join(prompt_parts)
            neg_text = ", ".join(s.negative_constraints)

            compiled_list.append(
                FlowShotPrompt(
                    shot_id=s.shot_id,
                    duration_sec=s.duration_sec,
                    input_type="TEXT_TO_VIDEO",
                    compiled_prompt=compiled_text,
                    camera_direction=f"{s.movement} | {s.composition} | {s.lens}",
                    lighting_and_style=f"{s.lighting} | Dark high-contrast cinematic",
                    negative_prompt=neg_text
                )
            )
        return compiled_list
