import re
from typing import List
from backend.services.content_os.prompt_compiler.universal_prompt_schema import SceneShotSpec, RemotionProjectSpec

class RemotionPromptCompiler:
    """
    Compiles deterministic, high-production React Remotion code for vertical 1080x1920 Instagram Reels.
    Uses Atelier Mode (bespoke scene choreography) with kinetic typography,
    subtle spring physics, and safe zone constraints.
    """

    @classmethod
    def compile_spec(
        cls,
        composition_name: str,
        shots: List[SceneShotSpec],
        total_duration_sec: float = 30.0
    ) -> RemotionProjectSpec:
        fps = 30
        total_frames = int(total_duration_sec * fps)
        safe_composition_name = re.sub(r"[^a-zA-Z0-9]", "", composition_name) or "FutureAiiReel"

        # Build scene code snippets
        scenes_data_code = []
        for i, s in enumerate(shots):
            start_frame = int(s.time_start * fps)
            end_frame = int(s.time_end * fps)
            duration_frames = max(30, end_frame - start_frame)
            escaped_voice = s.voiceover.replace('"', '\\"').replace("\n", " ")
            escaped_text = s.on_screen_text.replace('"', '\\"').replace("\n", " ")
            escaped_concept = s.visual_concept.replace('"', '\\"').replace("\n", " ")

            scenes_data_code.append(
                f"""  {{
    id: "{s.shot_id}",
    from: {start_frame},
    duration: {duration_frames},
    phase: "{s.purpose}",
    onScreenText: "{escaped_text}",
    voiceover: "{escaped_voice}",
    visualConcept: "{escaped_concept}",
    accentColor: "{"#F59E0B" if s.purpose == "HOOK" else "#38BDF8" if s.purpose == "PAYOFF" else "#10B981"}"
  }}"""
            )

        scenes_str = ",\n".join(scenes_data_code)

        react_code = f"""import React from "react";
import {{
  Composition,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill
}} from "remotion";

const SCENES = [
{scenes_str}
];

export const {safe_composition_name}Composition: React.FC = () => {{
  return (
    <AbsoluteFill style={{{{ backgroundColor: "#06090F", color: "#F8FAFC", fontFamily: "Inter, sans-serif" }}}}>
      {{SCENES.map((scene) => (
        <Sequence key={{scene.id}} from={{scene.from}} durationInFrames={{scene.duration}}>
          <SceneCard scene={{scene}} />
        </Sequence>
      ))}}
      <SafeZoneOverlay />
    </AbsoluteFill>
  );
}};

const SceneCard: React.FC<{{ scene: (typeof SCENES)[0] }}> = ({{ scene }}) => {{
  const frame = useCurrentFrame();
  const {{ fps }} = useVideoConfig();

  const scale = spring({{{{ frame, fps, config: {{{{ damping: 14, mass: 0.6 }}}} }}}});
  const opacity = interpolate(frame, [0, 8, scene.duration - 8, scene.duration], [0, 1, 1, 0], {{{{ extrapolateRight: "clamp" }}}});

  return (
    <AbsoluteFill style={{{{
      padding: "180px 80px 260px 80px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      opacity
    }}}}>
      {{/* Top Brand & Phase Pill */}}
      <div style={{{{
        padding: "8px 20px",
        borderRadius: "9999px",
        background: "rgba(255,255,255,0.06)",
        border: `1px solid ${{scene.accentColor}}66`,
        color: scene.accentColor,
        fontSize: "24px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase"
      }}}}>
        @future.aii__ • {{scene.phase}}
      </div>

      {{/* Main Kinetic Typography */}}
      <div style={{{{ transform: `scale(${{scale}})`, maxWidth: "920px" }}}}>
        <h1 style={{{{
          fontSize: "64px",
          fontWeight: 900,
          lineHeight: 1.15,
          textShadow: "0 8px 32px rgba(0,0,0,0.8)",
          background: "linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: 0
        }}}}>
          {{scene.onScreenText}}
        </h1>
        <p style={{{{ fontSize: "28px", color: "#94A3B8", marginTop: "24px", lineHeight: 1.4 }}}}>
          {{scene.visualConcept}}
        </p>
      </div>

      {{/* Subtle Bottom Progress bar */}}
      <div style={{{{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}}}>
        <div style={{{{
          width: `${{(frame / scene.duration) * 100}}%`,
          height: "100%",
          background: scene.accentColor
        }}}} />
      </div>
    </AbsoluteFill>
  );
}};

const SafeZoneOverlay: React.FC = () => (
  <AbsoluteFill style={{{{ pointerEvents: "none" }}}}>
    {{/* Instagram Reels UI Top 150px and Bottom 220px visual protection */}}
    <div style={{{{ position: "absolute", top: 0, left: 0, right: 0, height: "150px" }}}} />
    <div style={{{{ position: "absolute", bottom: 0, left: 0, right: 0, height: "220px" }}}} />
  </AbsoluteFill>
);

export const registerRoot = () => (
  <Composition
    id="{safe_composition_name}"
    component={{{safe_composition_name}Composition}}
    durationInFrames={{{total_frames}}}
    fps={{{fps}}}
    width={{1080}}
    height={{1920}}
  />
);
"""

        render_command = f"npx remotion render src/index.ts {safe_composition_name} out/{safe_composition_name}.mp4 --props='{total_duration_sec}s'"

        return RemotionProjectSpec(
            composition_name=safe_composition_name,
            duration_in_frames=total_frames,
            fps=fps,
            width=1080,
            height=1920,
            is_atelier_mode=True,
            copyable_react_code=react_code,
            render_command=render_command
        )
