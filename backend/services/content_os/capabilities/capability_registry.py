from typing import Dict, Any, List
from enum import Enum
from pydantic import BaseModel

class ToolStatus(str, Enum):
    AVAILABLE = "AVAILABLE"          # Direct native/local execution (e.g. Remotion, FFmpeg, Whisper)
    CONFIGURED = "CONFIGURED"        # API key verified and active
    SUPPORTED = "SUPPORTED"          # Supported via prompt compilation & manual copy-paste
    MANUAL = "MANUAL"                # Manual workflow prompt generated (e.g. Google Flow studio, CapCut)
    UNAVAILABLE = "UNAVAILABLE"      # Neither API key nor tool environment found
    EXPERIMENTAL = "EXPERIMENTAL"    # Beta / emerging open-source tool

class ToolCapability(BaseModel):
    tool_id: str
    name: str
    category: str  # video_gen, motion_graphics, avatar, research, editing, voice
    status: ToolStatus
    is_free_tier: bool
    estimated_cost_per_generation: str
    notes: str

class CapabilityRegistry:
    """
    Registry that answers tool reality accurately.
    Never promises an external API is automated unless actually configured.
    """

    _TOOLS: Dict[str, ToolCapability] = {
        "remotion": ToolCapability(
            tool_id="remotion",
            name="Remotion (React)",
            category="motion_graphics",
            status=ToolStatus.AVAILABLE,
            is_free_tier=True,
            estimated_cost_per_generation="$0.00 (Local compute)",
            notes="Local React rendering for kinetic typography, code demos, and benchmark charts."
        ),
        "ffmpeg": ToolCapability(
            tool_id="ffmpeg",
            name="FFmpeg CLI",
            category="editing",
            status=ToolStatus.AVAILABLE,
            is_free_tier=True,
            estimated_cost_per_generation="$0.00",
            notes="Local deterministic concatenation, aspect ratio padding, and compression."
        ),
        "whisper": ToolCapability(
            tool_id="whisper",
            name="Whisper / WhisperX",
            category="voice",
            status=ToolStatus.AVAILABLE,
            is_free_tier=True,
            estimated_cost_per_generation="$0.00",
            notes="Local speech-to-text for subtitle generation."
        ),
        "google_flow": ToolCapability(
            tool_id="google_flow",
            name="Google Flow / Veo / Gemini Omni",
            category="video_gen",
            status=ToolStatus.MANUAL,
            is_free_tier=True,
            estimated_cost_per_generation="Included in user Google AI / Flow tier",
            notes="Generates production shot prompts for direct paste into Google Flow / VideoFX studio."
        ),
        "gemini_pro": ToolCapability(
            tool_id="gemini_pro",
            name="Google Gemini Pro (Extended Thinking)",
            category="research",
            status=ToolStatus.CONFIGURED,
            is_free_tier=True,
            estimated_cost_per_generation="Free Tier / Included",
            notes="Active for deep reasoning, script polishing, and research verification."
        ),
        "chatgpt_plugins": ToolCapability(
            tool_id="chatgpt_plugins",
            name="ChatGPT Go / Plus (Plugins & Apps)",
            category="research",
            status=ToolStatus.SUPPORTED,
            is_free_tier=False,
            estimated_cost_per_generation="Included in Plus/Go plan",
            notes="Provides ready-to-run prompt packs with plugin-ready flags."
        ),
        "hyperframes": ToolCapability(
            tool_id="hyperframes",
            name="HyperFrames (HTML/GSAP)",
            category="motion_graphics",
            status=ToolStatus.SUPPORTED,
            is_free_tier=True,
            estimated_cost_per_generation="$0.00 (Web-based)",
            notes="Web motion graphics for data telemetry and kinetic text."
        ),
        "heygen": ToolCapability(
            tool_id="heygen",
            name="HeyGen AI Avatar",
            category="avatar",
            status=ToolStatus.MANUAL,
            is_free_tier=False,
            estimated_cost_per_generation="1 credit per min",
            notes="Generates speaking script and B-roll cutaway cues for avatar production."
        ),
        "capcut_premiere": ToolCapability(
            tool_id="capcut_premiere",
            name="CapCut / Premiere Pro",
            category="editing",
            status=ToolStatus.MANUAL,
            is_free_tier=True,
            estimated_cost_per_generation="$0.00",
            notes="Provides complete shot-by-shot timeline cut plans."
        )
    }

    @classmethod
    def get_all_capabilities(cls) -> List[ToolCapability]:
        return list(cls._TOOLS.values())

    @classmethod
    def get_tool(cls, tool_id: str) -> ToolCapability:
        return cls._TOOLS.get(
            tool_id,
            ToolCapability(
                tool_id=tool_id,
                name=tool_id.title(),
                category="other",
                status=ToolStatus.UNAVAILABLE,
                is_free_tier=False,
                estimated_cost_per_generation="Unknown",
                notes="Tool not registered in capability database."
            )
        )
