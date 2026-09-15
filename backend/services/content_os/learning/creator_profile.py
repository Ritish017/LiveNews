from typing import Dict, Any, List

class FutureAiiVoiceProfile:
    """
    Brand Voice & Creator Profile for @future.aii__ (§40).
    Enforces distinct aesthetic: dark/cinematic, high-contrast, modern, futuristic, fast-paced, internet-native.
    """

    HANDLE = "future.aii__"
    TAGLINE = "Your window into the AI future."
    AUDIENCE = "18–30 internet-native developers, creators, students, and operators."

    PREFERRED_VOCABULARY = [
        "what actually changed",
        "here is why it matters",
        "under the hood",
        "let's test it",
        "deterministic",
        "latency",
        "reasoning compute",
        "token efficiency",
        "agentic loop",
        "open-weights",
        "local inference"
    ]

    BANNED_WORDS = [
        "game-changer",
        "insane update",
        "blow your mind",
        "in the fast-paced world",
        "delve into",
        "tapestry",
        "revolutionary",
        "unleash the power",
        "buckle up"
    ]

    VISUAL_IDENTITY = {
        "primary_background": "#06090F (Deep Obsidian)",
        "card_background": "#090D16 (Matte Navy)",
        "accent_primary": "#F59E0B (Amber Gold)",
        "accent_secondary": "#06B6D4 (Cyan Electric)",
        "accent_success": "#10B981 (Emerald)",
        "typography": "Inter / JetBrains Mono",
        "video_aspect_ratio": "9:16 (1080x1920)",
        "frame_rate": "30 fps"
    }

    @classmethod
    def get_profile(cls) -> Dict[str, Any]:
        return {
            "handle": cls.HANDLE,
            "tagline": cls.TAGLINE,
            "audience": cls.AUDIENCE,
            "preferred_vocabulary": cls.PREFERRED_VOCABULARY,
            "banned_words": cls.BANNED_WORDS,
            "visual_identity": cls.VISUAL_IDENTITY
        }
