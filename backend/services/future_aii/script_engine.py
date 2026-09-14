"""
Production-Ready Reel Script Engine for future.aii__
Implements §12 & §13: Timestamped cues (VOICE, VISUAL, ON-SCREEN TEXT, SFX, CAMERA),
dynamic durations (10s, 15s, 20s, 30s, 45s, 60s, 90s), and narrative payoff structure.
"""

import logging
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

class ScriptSegment(BaseModel):
    sentence_id: str
    time_start: float
    time_end: float
    phase: str  # HOOK, CONTEXT, PAYOFF, WHY_IT_MATTERS, CTA
    voice: str
    visual: str
    on_screen_text: str
    sfx: str
    camera: str
    underlying_claim: Optional[str] = None


class ProductionScript(BaseModel):
    duration_seconds: int = 30
    pillar: str = "AI News"
    series: str = "AI NEWS TODAY"
    hook_text: str
    cta_text: str
    total_words: int
    estimated_wpm: int = 150
    segments: List[ScriptSegment] = Field(default_factory=list)
    formatted_director_notes: str = ""


class ScriptEngine:
    """
    Synthesizes precision production scripts formatted for immediate recording or Remotion rendering.
    """

    VALID_DURATIONS = [10, 15, 20, 30, 45, 60, 90]

    def generate_script(
        self,
        topic: str,
        angle: str,
        pillar: str,
        series: str,
        hook: str,
        cta: str,
        duration: int = 30,
        claims: Optional[List[str]] = None,
        tool_name: Optional[str] = None
    ) -> ProductionScript:
        """
        Builds a timestamped production-ready script matching the requested duration.
        """
        if duration not in self.VALID_DURATIONS:
            duration = 30

        clean_topic = topic.split(":")[0] if ":" in topic else topic
        claims_list = claims or [
            f"{clean_topic} introduces major latency reductions",
            "Initial benchmarks show superior token reasoning",
            "Developers can integrate it through open API endpoints"
        ]

        claim_1 = claims_list[0] if len(claims_list) > 0 else f"{clean_topic} launched"
        claim_2 = claims_list[1] if len(claims_list) > 1 else "Architecture redesigned from the ground up"
        claim_3 = claims_list[2] if len(claims_list) > 2 else "Free tier available for initial testing"

        segments: List[ScriptSegment] = []

        if duration == 15:
            # 15s Rapid Breakdown
            segments = [
                ScriptSegment(
                    sentence_id="s1_hook",
                    time_start=0.0,
                    time_end=2.5,
                    phase="HOOK",
                    voice=hook,
                    visual="Fast zoom into glowing futuristic terminal displaying code diff; dark cinematic neon accents.",
                    on_screen_text=f"🚨 {clean_topic.upper()}",
                    sfx="Subtle digital riser + bass drop",
                    camera="Rapid push-in (0.5s) to center focus",
                    underlying_claim=claim_1
                ),
                ScriptSegment(
                    sentence_id="s2_context",
                    time_start=2.5,
                    time_end=6.0,
                    phase="CONTEXT",
                    voice=f"Here is what just happened: {claim_1}.",
                    visual="Screen recording of benchmark comparison chart; high-contrast amber telemetry overlay.",
                    on_screen_text="WHAT CHANGED",
                    sfx="Keyboard typing tap audio cue",
                    camera="Static crisp framing, split-screen comparison",
                    underlying_claim=claim_1
                ),
                ScriptSegment(
                    sentence_id="s3_payoff",
                    time_start=6.0,
                    time_end=11.0,
                    phase="PAYOFF",
                    voice=f"Unlike older models, {claim_2}. This cuts deployment latency by half.",
                    visual="Animated node graph connecting API client to model weights without buffer delay.",
                    on_screen_text="ZERO LATENCY BUFFER",
                    sfx="Swoosh transition audio",
                    camera="Slow upward pan across the node hierarchy",
                    underlying_claim=claim_2
                ),
                ScriptSegment(
                    sentence_id="s4_cta",
                    time_start=11.0,
                    time_end=15.0,
                    phase="CTA",
                    voice=cta,
                    visual="Clean dark brand graphic showing @future.aii__ with glowing verification badge.",
                    on_screen_text="COMMENT BELOW ⬇️",
                    sfx="Subtle bell ping",
                    camera="Gentle pull-back to full framing",
                    underlying_claim=None
                )
            ]

        elif duration == 30:
            # 30s High-Retention Standard Reel
            segments = [
                ScriptSegment(
                    sentence_id="s1_hook",
                    time_start=0.0,
                    time_end=3.0,
                    phase="HOOK",
                    voice=hook,
                    visual="Extreme close-up of dark metallic GPU processor with light pulses racing across circuits.",
                    on_screen_text=f"⚠️ STOP SCROLLING",
                    sfx="Deep sub-bass impact + metallic shimmer",
                    camera="Snap zoom into glowing processor core",
                    underlying_claim=claim_1
                ),
                ScriptSegment(
                    sentence_id="s2_context",
                    time_start=3.0,
                    time_end=8.0,
                    phase="CONTEXT",
                    voice=f"Yesterday, {clean_topic} was announced. Most people think it's just another release, but {claim_1}.",
                    visual="Screen capture of official research paper highlight followed by developer terminal execution.",
                    on_screen_text="WHAT MAINSTREAM MISSED",
                    sfx="Subtle paper page flick + digital beep",
                    camera="Smooth lateral tracking shot across terminal output",
                    underlying_claim=claim_1
                ),
                ScriptSegment(
                    sentence_id="s3_payoff",
                    time_start=8.0,
                    time_end=16.0,
                    phase="PAYOFF",
                    voice=f"Here is why: {claim_2}. Instead of waiting on cloud APIs, developers can run local inference at native speeds.",
                    visual="Side-by-side speed test: old architecture lagging at 42 tokens/sec vs new model streaming at 180 tokens/sec.",
                    on_screen_text="4.2x FASTER INFERENCE",
                    sfx="High-speed digital ticker count-up",
                    camera="Locked center-frame split screen with glowing boundary",
                    underlying_claim=claim_2
                ),
                ScriptSegment(
                    sentence_id="s4_why_matters",
                    time_start=16.0,
                    time_end=23.0,
                    phase="WHY_IT_MATTERS",
                    voice=f"What this means for you: {claim_3}. You can build automated agents today without spending thousands on compute.",
                    visual="Dynamic UI wireframe showing an autonomous agent completing a multi-step debugging workflow.",
                    on_screen_text="PRODUCTION READY TODAY",
                    sfx="Smooth tech woosh",
                    camera="Slow orbital 15-degree rotate",
                    underlying_claim=claim_3
                ),
                ScriptSegment(
                    sentence_id="s5_cta",
                    time_start=23.0,
                    time_end=30.0,
                    phase="CTA",
                    voice=cta,
                    visual="Dark futuristic Instagram endcard featuring @future.aii__ and pulsating keyword trigger graphic.",
                    on_screen_text="COMMENT 'AGENT' FOR SETUP ⬇️",
                    sfx="Clean chimes tone",
                    camera="Gentle cinematic pull-out with floating UI cards",
                    underlying_claim=None
                )
            ]

        elif duration == 60:
            # 60s Deep Dive / Experiment / Road to AGI Reel
            segments = [
                ScriptSegment(
                    sentence_id="s1_hook",
                    time_start=0.0,
                    time_end=4.0,
                    phase="HOOK",
                    voice=hook,
                    visual="Cinematic dark workspace: multiple curved monitors glowing with real-time neural network visualizations.",
                    on_screen_text="ROAD TO AGI 🧠",
                    sfx="Atmospheric synth drone + heavy impact",
                    camera="Slow cinematic dolly forward",
                    underlying_claim=claim_1
                ),
                ScriptSegment(
                    sentence_id="s2_context",
                    time_start=4.0,
                    time_end=14.0,
                    phase="CONTEXT",
                    voice=f"To understand why this is a turning point, look at what happened today with {clean_topic}. {claim_1}.",
                    visual="High-contrast chronological timeline showing AI progress from 2023 to 2026, highlighting the breakthrough.",
                    on_screen_text="THE EVOLUTION",
                    sfx="Subtle clock ticks + digital sync",
                    camera="Horizontal track along the timeline curve",
                    underlying_claim=claim_1
                ),
                ScriptSegment(
                    sentence_id="s3_payoff_1",
                    time_start=14.0,
                    time_end=26.0,
                    phase="PAYOFF",
                    voice=f"The breakthrough comes down to architecture: {claim_2}. In past models, reasoning required massive test-time compute. Now it happens natively in weights.",
                    visual="3D animated visualization of multi-layer transformer attention heads condensing queries into instant paths.",
                    on_screen_text="NATIVE REASONING WEIGHTS",
                    sfx="Futuristic energy surge sound",
                    camera="3D orbit around the attention matrix",
                    underlying_claim=claim_2
                ),
                ScriptSegment(
                    sentence_id="s4_payoff_2",
                    time_start=26.0,
                    time_end=38.0,
                    phase="PAYOFF",
                    voice=f"We tested this against previous checkpoints. In every coding benchmark, hallucination dropped by over 60%, and complex refactoring completed in a single pass.",
                    visual="Recorded IDE footage with green test suites passing instantly without developer intervention.",
                    on_screen_text="60% FEWER HALLUCINATIONS",
                    sfx="Terminal success chime",
                    camera="Over-the-shoulder coding view",
                    underlying_claim=claim_2
                ),
                ScriptSegment(
                    sentence_id="s5_why_matters",
                    time_start=38.0,
                    time_end=50.0,
                    phase="WHY_IT_MATTERS",
                    voice=f"This changes the calculus for software engineering. {claim_3}. We are moving from AI that autocomplete to AI that independently verify and ship code.",
                    visual="Split screen: human engineer collaborating with 3 autonomous agents simultaneously.",
                    on_screen_text="AUTONOMOUS DEV TEAMS",
                    sfx="Deep resonant pad",
                    camera="Wide cinematic pan across modern studio",
                    underlying_claim=claim_3
                ),
                ScriptSegment(
                    sentence_id="s6_cta",
                    time_start=50.0,
                    time_end=60.0,
                    phase="CTA",
                    voice=cta,
                    visual="Sleek branding card with animated comments icon and clickable DM prompt badge.",
                    on_screen_text="FOLLOW @FUTURE.AII__ 🚀",
                    sfx="Positive outro swell",
                    camera="Smooth fade to dark branding horizon",
                    underlying_claim=None
                )
            ]

        else:
            # Fallback 20s or 10s
            segments = [
                ScriptSegment(
                    sentence_id="s1_hook",
                    time_start=0.0,
                    time_end=3.0,
                    phase="HOOK",
                    voice=hook,
                    visual="High-impact visual text over dark futuristic terminal.",
                    on_screen_text=f"{clean_topic.upper()}",
                    sfx="Riser + drop",
                    camera="Quick push-in",
                    underlying_claim=claim_1
                ),
                ScriptSegment(
                    sentence_id="s2_body",
                    time_start=3.0,
                    time_end=float(duration - 4),
                    phase="PAYOFF",
                    voice=f"{claim_1}. {claim_2}. Builders can test this workflow immediately.",
                    visual="Live terminal recording showing verified execution.",
                    on_screen_text="VERIFIED BENCHMARK",
                    sfx="Typing sound",
                    camera="Static focus",
                    underlying_claim=claim_2
                ),
                ScriptSegment(
                    sentence_id="s3_cta",
                    time_start=float(duration - 4),
                    time_end=float(duration),
                    phase="CTA",
                    voice=cta,
                    visual="Branded @future.aii__ outro.",
                    on_screen_text="SAVE & SHARE ⬇️",
                    sfx="Bell ping",
                    camera="Pull out",
                    underlying_claim=None
                )
            ]

        # Calculate word count & format director notes
        all_words = " ".join([s.voice for s in segments]).split()
        total_words = len(all_words)
        director_notes = []
        for s in segments:
            director_notes.append(
                f"{s.time_start:.1f}s–{s.time_end:.1f}s [{s.phase}]\n"
                f"VOICE: {s.voice}\n"
                f"VISUAL: {s.visual}\n"
                f"ON-SCREEN TEXT: {s.on_screen_text}\n"
                f"SFX: {s.sfx} | CAMERA: {s.camera}\n"
            )

        return ProductionScript(
            duration_seconds=duration,
            pillar=pillar,
            series=series,
            hook_text=hook,
            cta_text=cta,
            total_words=total_words,
            estimated_wpm=int((total_words / duration) * 60),
            segments=segments,
            formatted_director_notes="\n".join(director_notes)
        )


script_engine = ScriptEngine()
