from typing import Dict, Any

class CostEstimator:
    """
    Computes upfront cost expectations before generation.
    Supports FREE-FIRST mode.
    """

    @classmethod
    def estimate_generation_cost(cls, primary_engine: str, free_first: bool = True) -> Dict[str, Any]:
        if free_first or "REMOTION" in primary_engine or "SCREEN_RECORDING" in primary_engine:
            return {
                "tier": "FREE",
                "estimated_usd": "$0.00",
                "breakdown": "Local Remotion render + user included browser credits + FFmpeg.",
                "is_zero_cost": True
            }
        elif "FLOW" in primary_engine:
            return {
                "tier": "LOW",
                "estimated_usd": "$0.00 - $0.20",
                "breakdown": "Included in standard Google VideoFX / Flow quota.",
                "is_zero_cost": False
            }
        elif "HEYGEN" in primary_engine:
            return {
                "tier": "MEDIUM",
                "estimated_usd": "$1.50 - $3.00",
                "breakdown": "1 HeyGen credit per minute of generated avatar footage.",
                "is_zero_cost": False
            }
        else:
            return {
                "tier": "FREE",
                "estimated_usd": "$0.00",
                "breakdown": "Fully free-first stack.",
                "is_zero_cost": True
            }
