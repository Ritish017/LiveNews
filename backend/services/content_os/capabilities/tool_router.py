from typing import Dict, Any, Tuple
from backend.services.content_os.capabilities.capability_registry import CapabilityRegistry, ToolStatus

class ToolRouter:
    """
    Decides the optimal primary production engine and secondary tools.
    Enforces Free-First mode unless the creator explicitly requests premium paid engines.
    """

    @classmethod
    def route_production(
        cls,
        content_type: str,
        format_type: str = "Reel",
        free_first: bool = True
    ) -> Tuple[str, str, str]:
        """
        Returns (primary_engine, cost_tier, routing_reason)
        """
        ct = content_type.lower()
        if "explain" in ct or "normal people" in ct:
            return (
                "REMOTION",
                "FREE",
                "Educational breakdown routed to Remotion Atelier for kinetic typography, code/UI diagrams, and zero-cost local rendering."
            )
        elif "tool" in ct:
            return (
                "REMOTION + SCREEN_RECORDING",
                "FREE",
                "Tool review routed to Remotion UI frame with split-screen workflow recordings."
            )
        elif "future" in ct or "agi" in ct:
            return (
                "GOOGLE_FLOW + REMOTION",
                "FREE" if free_first else "LOW",
                "Cinematic future speculation routed to Google Flow shot prompts with Remotion typography overlays."
            )
        elif "meme" in ct:
            return (
                "REMOTION_QUICK",
                "FREE",
                "Meme routed to fast Remotion vertical template with punchy contrast typography."
            )
        elif "experiment" in ct:
            return (
                "SCREEN_RECORDING + REMOTION",
                "FREE",
                "Empirical experiment routed to side-by-side terminal evidence and Remotion metrics table."
            )
        else:  # AI News default
            return (
                "HYBRID (FLOW + REMOTION)",
                "FREE",
                "News package routed to verified B-roll shot prompts and Remotion headline overlays."
            )
