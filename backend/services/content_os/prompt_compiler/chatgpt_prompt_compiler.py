from typing import List
from backend.services.content_os.prompt_compiler.universal_prompt_schema import ChatGPTGoPromptPack

class ChatGPTPromptCompiler:
    """
    Compiles structured ChatGPT Go / Plus prompt packs with system context,
    creative director instructions, and plugin recommendations.
    """

    @classmethod
    def compile_pack(
        cls,
        title: str,
        topic: str,
        content_type: str,
        strategic_angle: str,
        hook: str,
        script_full: str
    ) -> ChatGPTGoPromptPack:
        system_context = (
            "System: You are an expert AI Video Producer and Creative Director for the brand @future.aii__. "
            "Your tone is curious, fast, confident, and technical yet immediately accessible. "
            "Never generate generic corporate AI slop, glowing blue brains, or cliché marketing jargon."
        )

        task = f"""Creative Director Task:
Generate an optimized production breakdown for this Reel:
Title: {title}
Topic: {topic}
Engine: {content_type}
Strategic Angle: {strategic_angle}
Hook: "{hook}"

Master Script:
{script_full}

Required Output:
1. Scene-by-scene visual instructions with safe zone annotations for 9:16 vertical video.
2. Kinetic on-screen caption cues emphasizing active verbs and metrics.
3. Recommended B-roll clips (screen recordings, architecture diagrams, benchmark tests).
4. Audio pacing suggestions (SFX placement, riser frequencies, bass drops on payoff)."""

        return ChatGPTGoPromptPack(
            system_context=system_context,
            creative_director_task=task,
            plugin_ready=True,
            recommended_plugins=["Web Browsing", "Code Interpreter / Advanced Data Analysis", "Canva / Video Producer"]
        )
