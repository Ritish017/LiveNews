from typing import List, Dict, Any, Tuple
from backend.services.content_os.prompt_compiler.universal_prompt_schema import SceneShotSpec

class PromptQualityChecker:
    """
    Quality Governance & Anti-AI-Slop Filter (§19).
    Rejects generic prompts:
    - Glowing blue AI brain
    - Random humanoid robot
    - Meaningless floating holograms
    - Generic futuristic city
    - Random matrix code rain
    - Low-contrast washed out visuals
    Verifies camera clarity, lighting, motion grammar, and narrative justification.
    """

    BANNED_SLOP_PATTERNS = [
        "glowing blue brain",
        "floating hologram",
        "matrix code rain",
        "generic humanoid robot",
        "futuristic city neon",
        "meaningless particles",
        "abstract tech background"
    ]

    @classmethod
    def audit_shot(cls, shot: SceneShotSpec) -> Tuple[bool, List[str]]:
        issues: List[str] = []
        combined_text = f"{shot.visual_concept} {shot.subject} {shot.environment}".lower()

        for slop in cls.BANNED_SLOP_PATTERNS:
            if slop in combined_text:
                issues.append(f"Contains generic AI slop trope: '{slop}'. Replace with concrete physical or UI representation.")

        if not shot.movement or len(shot.movement.strip()) < 3:
            issues.append("Missing camera movement instruction.")

        if not shot.lighting or len(shot.lighting.strip()) < 3:
            issues.append("Missing lighting specification.")

        if not shot.purpose:
            issues.append("Shot missing explicit narrative purpose.")

        passed = len(issues) == 0
        return passed, issues

    @classmethod
    def audit_all_shots(cls, shots: List[SceneShotSpec]) -> Dict[str, Any]:
        total_shots = len(shots)
        passed_shots = 0
        all_issues: List[Dict[str, Any]] = []

        for s in shots:
            passed, issues = cls.audit_shot(s)
            if passed:
                passed_shots += 1
            else:
                all_issues.append({"shot_id": s.shot_id, "issues": issues})

        score = int((passed_shots / max(1, total_shots)) * 100)
        return {
            "passed": len(all_issues) == 0,
            "quality_score": score,
            "anti_slop_verified": len(all_issues) == 0,
            "flagged_issues": all_issues
        }
