"""
Remotion Motion Graphics Code Generator for future.aii__
Implements §26 & §27: Generates copyable, production-ready Remotion React compositions
conforming to Instagram Reels 1080x1920 9:16 safe zones, dynamic FPS, and dark cinematic motion graphics.
"""

import logging
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

class RemotionSpec(BaseModel):
    composition_name: str = "FutureAiiReel"
    duration_in_frames: int = 900  # 30s at 30fps
    fps: int = 30
    width: int = 1080
    height: int = 1920
    safe_zones: Dict[str, int] = Field(default_factory=lambda: {
        "top": 180,     # avoid Instagram status/profile overlay
        "bottom": 320,  # avoid caption, audio ticker, like buttons
        "left": 60,
        "right": 120
    })
    copyable_react_code: str
    implementation_guide: str


REMOTION_REACT_TEMPLATE = """import React from "react";
import {
  Composition,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill
} from "remotion";

/**
 * FUTURE.AII INSTAGRAM REEL COMPOSITION
 * Topic: __TOPIC__
 * Duration: __DURATION__s (__FRAMES__ frames @ __FPS__fps)
 * Safe Zone: Top 180px, Bottom 320px
 */

export const __COMP_NAME__: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgGlow = interpolate(
    Math.sin(frame / 15),
    [-1, 1],
    [0.15, 0.35]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#090d16", color: "#ffffff", fontFamily: "system-ui, sans-serif" }}>
      {/* Dynamic Ambient Background Grid & Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 30%, rgba(245, 158, 11, ${bgGlow}), transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top Brand Watermark (Inside Safe Zone) */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 50,
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#f59e0b", boxShadow: "0 0 12px #f59e0b" }} />
        <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: 1.5, color: "#f8fafc", textTransform: "uppercase" }}>
          FUTURE.AII
        </span>
        <span style={{ fontSize: 16, color: "#94a3b8", fontWeight: 600, fontFamily: "monospace" }}>
          // RADAR
        </span>
      </div>

      {/* SEGMENT 1: 0s–3.5s HOOK */}
      <Sequence from={0} durationInFrames={__HOOK_FRAMES__}>
        <HookScene hookText="__HOOK_TEXT__" />
      </Sequence>

      {/* SEGMENT 2: 3.5s–12s THE ARCHITECTURAL SHIFT */}
      <Sequence from={__HOOK_FRAMES__} durationInFrames={__CONTEXT_FRAMES__}>
        <ContextScene topic="__TOPIC__" />
      </Sequence>

      {/* SEGMENT 3: 12s–23s BENCHMARK & CODE PAYOFF */}
      <Sequence from={__PAYOFF_START__} durationInFrames={__PAYOFF_FRAMES__}>
        <PayoffScene />
      </Sequence>

      {/* SEGMENT 4: 23s–OUTRO CTA */}
      <Sequence from={__OUTRO_START__} durationInFrames={__OUTRO_FRAMES__}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

// 1. Hook Scene
const HookScene: React.FC<{ hookText: string }> = ({ hookText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const opacity = interpolate(frame, [0, 10], [0, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 80px" }}>
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "center"
        }}
      >
        <span style={{ padding: "8px 20px", borderRadius: 999, backgroundColor: "rgba(245, 158, 11, 0.2)", border: "1px solid rgba(245, 158, 11, 0.4)", color: "#fbbf24", fontSize: 22, fontWeight: 800, textTransform: "uppercase" }}>
          ⚠️ Breaking Frontier AI
        </span>
        <h1 style={{ fontSize: 62, fontWeight: 900, lineHeight: 1.15, textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}>
          {hookText}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// 2. Context Scene
const ContextScene: React.FC<{ topic: string }> = ({ topic }) => {
  const frame = useCurrentFrame();
  const translateY = interpolate(frame, [0, 20], [50, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 15], [0, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 80px" }}>
      <div style={{ transform: `translateY(${translateY}px)`, opacity, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontFamily: "monospace", color: "#38bdf8", fontSize: 26 }}>[01] WHAT CHANGED</div>
        <h2 style={{ fontSize: 52, fontWeight: 800, color: "#f1f5f9" }}>
          Architecture redesigned for zero-latency inference.
        </h2>
        <div style={{ backgroundColor: "#1e293b", padding: 24, borderRadius: 16, border: "1px solid #334155" }}>
          <p style={{ fontSize: 28, color: "#cbd5e1", lineHeight: 1.4 }}>
            Instead of waiting on server queues, weights are optimized directly for native streaming.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 3. Payoff Scene
const PayoffScene: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 45], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 80px" }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 28 }}>
        <span style={{ fontFamily: "monospace", color: "#a855f7", fontSize: 24 }}>[BENCHMARK TELEMETRY]</span>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 36, fontWeight: 700 }}>Speed Multiplier</span>
          <span style={{ fontSize: 72, fontWeight: 900, color: "#f59e0b" }}>+420%</span>
        </div>
        <div style={{ width: "100%", height: 16, backgroundColor: "#1e293b", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", backgroundColor: "#f59e0b", transition: "width 0.1s" }} />
        </div>
        <p style={{ fontSize: 26, color: "#94a3b8" }}>
          Verified across 10,000 parallel test cases under production load.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// 4. Outro Scene
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 80px" }}>
      <div style={{ transform: `scale(${scale})`, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ width: 90, height: 90, borderRadius: 24, background: "linear-gradient(135deg, #f59e0b, #ef4444)", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 0 30px rgba(245,158,11,0.5)" }}>
          <span style={{ fontSize: 48 }}>⚡</span>
        </div>
        <h3 style={{ fontSize: 50, fontWeight: 900, color: "#ffffff" }}>Comment 'AGENT'</h3>
        <p style={{ fontSize: 28, color: "#94a3b8", maxWidth: 600 }}>
          I'll DM you the full setup repository & benchmark prompts.
        </p>
        <span style={{ fontSize: 22, color: "#f59e0b", fontWeight: 700 }}>@future.aii__</span>
      </div>
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => {
  return (
    <Composition
      id="__COMP_NAME__"
      component={__COMP_NAME__}
      durationInFrames={__FRAMES__}
      fps={__FPS__}
      width={1080}
      height={1920}
    />
  );
};
"""


class RemotionGenerator:
    """
    Generates deterministic React + Remotion source code for automated video rendering.
    """

    def generate_remotion_composition(
        self,
        topic: str,
        hook: str,
        script_segments: List[Dict[str, Any]],
        duration_seconds: int = 30,
        fps: int = 30
    ) -> RemotionSpec:
        clean_topic = topic.replace('"', '\\"').split(":")[0] if ":" in topic else topic
        clean_hook = hook.replace('"', '\\"')
        total_frames = duration_seconds * fps

        comp_name = f"Reel_{abs(hash(topic)) % 100000}"

        hook_frames = int(fps * 3.5)
        context_frames = int(fps * 8.5)
        payoff_start = hook_frames + context_frames
        payoff_frames = int(fps * 11)
        outro_start = payoff_start + payoff_frames
        outro_frames = max(fps * 3, total_frames - outro_start)

        code = REMOTION_REACT_TEMPLATE
        code = code.replace("__TOPIC__", clean_topic)
        code = code.replace("__DURATION__", str(duration_seconds))
        code = code.replace("__FRAMES__", str(total_frames))
        code = code.replace("__FPS__", str(fps))
        code = code.replace("__COMP_NAME__", comp_name)
        code = code.replace("__HOOK_FRAMES__", str(hook_frames))
        code = code.replace("__HOOK_TEXT__", clean_hook)
        code = code.replace("__CONTEXT_FRAMES__", str(context_frames))
        code = code.replace("__PAYOFF_START__", str(payoff_start))
        code = code.replace("__PAYOFF_FRAMES__", str(payoff_frames))
        code = code.replace("__OUTRO_START__", str(outro_start))
        code = code.replace("__OUTRO_FRAMES__", str(outro_frames))

        guide = (
            "1. Copy this code into your Remotion project (`src/Root.tsx`).\n"
            "2. Run `npm start` to preview interactive playback.\n"
            "3. Render production MP4: `npx remotion render Root out.mp4`"
        )

        return RemotionSpec(
            composition_name=comp_name,
            duration_in_frames=total_frames,
            fps=fps,
            width=1080,
            height=1920,
            copyable_react_code=code,
            implementation_guide=guide
        )


remotion_generator = RemotionGenerator()
