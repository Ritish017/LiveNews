from typing import Dict, Any, List
from backend.services.content_os.prompt_compiler.universal_prompt_schema import SceneShotSpec

class FutureEngine:
    """
    ENGINE 5 — FUTURE / AGI / ASI (§10)
    Brand identity pillar. Creates cinematic, forward-looking narratives on the Road to AGI.
    Maintains strict epistemic separation between FACT, PREDICTION, SCENARIO, and SPECULATION.
    """

    @classmethod
    def generate_content(
        cls,
        topic: str,
        angle_input: str = "",
        duration_sec: int = 30
    ) -> Dict[str, Any]:
        future_topic = topic.replace("Future:", "").replace("Road to AGI:", "").strip() or "Autonomous Software Economies"
        angle = angle_input or f"What happens to the global software industry when AI agents write 95% of production code by 2028"

        hook = f"Imagine waking up in 2028: software engineering is no longer done by typing code into an editor."

        shots = [
            SceneShotSpec(
                shot_id="s1_hook",
                time_start=0.0,
                time_end=2.5,
                duration_sec=2.5,
                purpose="HOOK",
                voiceover=hook,
                on_screen_text="ROAD TO AGI: 2028",
                visual_concept="Cinematic macro shot of an empty minimalist glass desk where an autonomous AI agent swarm is silently deploying cloud clusters",
                subject="Futuristic developer interface",
                action="Holographic timeline scrolls rapidly from '2024 Autocomplete' to '2028 Autonomous Systems'",
                environment="Ultra-modern architectural penthouse studio overlooking city skyline at dusk",
                composition="Low angle cinematic wide shot",
                camera="RED V-Raptor 8K emulation",
                lens="35mm Anamorphic T1.5",
                movement="Slow cinematic creep forward",
                lighting="Deep indigo twilight with warm tungsten interior accent lighting",
                sound_effects="Deep atmospheric low-frequency drone with subtle digital heartbeat",
                underlying_claim="Autonomous software projection"
            ),
            SceneShotSpec(
                shot_id="s2_current_fact",
                time_start=2.5,
                time_end=8.5,
                duration_sec=6.0,
                purpose="CONTEXT",
                voiceover="Here is the confirmed reality right now: frontier reasoning models have solved over 65% of real-world SWE-bench engineering tickets completely autonomously.",
                on_screen_text="FACT: 65% OF TICKETS SOLVED",
                visual_concept="Clean data visualization overlay tracking benchmark trajectory curve climbing steeply upward",
                subject="SWE-bench verified progress curve",
                action="Trajectory curve accelerates through 2024 to 2026 milestones",
                environment="High-contrast dark matte background with glowing emerald data line",
                composition="Grid alignment with floating metric cards",
                camera="Smooth orbital rotation around data curve",
                lens="50mm Prime",
                movement="Orbital drift",
                lighting="Emerald and amber phosphor lines glowing against pure black void",
                sound_effects="Digital telemetry tick sequence and soft whoosh",
                underlying_claim="SWE-bench published benchmarks"
            ),
            SceneShotSpec(
                shot_id="s3_plausible_future",
                time_start=8.5,
                time_end=17.5,
                duration_sec=9.0,
                purpose="PAYOFF",
                voiceover="Plausible scenario: individual creators will not hire engineering teams. One person with an idea will direct swarms of specialized coding and QA agents that test, deploy, and scale apps in hours.",
                on_screen_text="THE 1-PERSON UNICORN",
                visual_concept="Interactive 3D node network visualizing a single operator coordinating 50 autonomous agent instances",
                subject="Agentic swarm coordination architecture",
                action="Pulses of light travel from central human node to specialized worker agents",
                environment="Deep space aesthetic with crystalline data pipelines",
                composition="Wide systemic overview",
                camera="Dynamic virtual crane shot sweeping overhead",
                lens="24mm Wide Anamorphic",
                movement="High crane sweep downward into central cluster",
                lighting="Prismatic cyan, violet, and gold light refractions",
                sound_effects="Resonant harmonic chime building into bass drop",
                underlying_claim="Agentic swarm scaling hypothesis"
            ),
            SceneShotSpec(
                shot_id="s4_epistemic_check",
                time_start=17.5,
                time_end=24.0,
                duration_sec=6.5,
                purpose="WHY_IT_MATTERS",
                voiceover="This is not science fiction. The bottleneck is no longer raw intelligence—it is test-time compute and verifiable tool execution.",
                on_screen_text="PREDICTION: NOT SPECULATION",
                visual_concept="Split-screen contrasting physical GPU data center hardware with high-speed synthetic reasoning loops",
                subject="Test-time compute scaling visualization",
                action="Compute racks illuminate in synchronized rhythm",
                environment="Immense futuristic clean-room server facility",
                composition="One-point perspective down infinite server corridor",
                camera="Steadicam glide down server aisle",
                lens="21mm Ultra-Wide",
                movement="Relentless forward dolly track",
                lighting="Cold industrial LED rows with cyan floor reflections",
                sound_effects="Subtle cooling fan roar and electrical hum",
                underlying_claim="Scaling laws for reasoning compute"
            ),
            SceneShotSpec(
                shot_id="s5_cta",
                time_start=24.0,
                time_end=float(duration_sec),
                duration_sec=duration_sec - 24.0,
                purpose="CTA",
                voiceover="What year do you think AGI will officially arrive? Drop your prediction below and follow @future.aii__ for our deep roadmaps.",
                on_screen_text="DROP YOUR PREDICTION BELOW",
                visual_concept="Cinematic end card displaying timeline roadmap: 2026 -> 2028 -> 2030 with pulsing query node",
                subject="@future.aii__ roadmap end card",
                action="Year counter animates and locks with pulsing amber border",
                environment="Dark cinematic studio space",
                composition="Centered focal graphic",
                camera="Locked camera",
                lens="50mm Cine",
                movement="Static lock",
                lighting="Warm amber backlight glow",
                sound_effects="Deep resonance chime and quiet cinematic hit",
                underlying_claim="Community engagement query"
            )
        ]

        full_script = " ".join([s.voiceover for s in shots])

        return {
            "title": f"Road to AGI: {future_topic}",
            "series": "ROAD TO AGI",
            "content_type": "Future / AGI / ASI",
            "strategic_angle": angle,
            "why_now": "Rapid advances in reasoning models making long-term predictions immediate and urgent.",
            "why_audience_cares": "Explores the existential and economic transformation of human work.",
            "differentiation": "Rigorously separates proven benchmark facts from future scenarios without fearmongering.",
            "hook": hook,
            "alternative_hooks": [
                f"Why 2027 will change the definition of what a software company is.",
                f"We just took the biggest step toward AGI all decade. Here is the proof.",
                f"What happens to programmers when AI writes 100% of software?"
            ],
            "script_full_text": full_script,
            "shots": shots,
            "comment_keyword": "AGI",
            "dm_resource": "https://future-aii.com/reports/road-to-agi-2026-2030",
            "epistemic_status": "PREDICTION",
            "confidence_score": 93.0,
            "sources": [
                {
                    "source_name": "SWE-bench Verified Benchmark Results & Scaling Law Papers",
                    "publisher": "Princeton NLP & Frontier Labs",
                    "url": "https://swebench.com",
                    "tier": "Tier 1 (Academic Benchmark)"
                }
            ]
        }
