import React, { useState } from "react";
import {
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Video,
  Code2,
  BrainCircuit,
  MessageSquare,
  FileText,
  Clock,
  ExternalLink,
  Sliders,
  Share2,
  Terminal,
  Volume2,
  Camera,
  Layers,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { CreatorUniversalPackage } from "../../types";

interface ResultViewProps {
  packageData: CreatorUniversalPackage;
  onBack: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ packageData, onBack }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activePromptTab, setActivePromptTab] = useState<
    "flow" | "gemini" | "chatgpt" | "remotion" | "hyperframes" | "heygen" | "opensource" | "social"
  >("flow");
  const [showAdvancedDrawer, setShowAdvancedDrawer] = useState<boolean>(false);
  const [selectedHookIndex, setSelectedHookIndex] = useState<number | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyAll = () => {
    const fullText = `=== FUTURE.AII CONTENT PACKAGE ===
TITLE: ${packageData.title}
TOPIC: ${packageData.topic}
ENGINE: ${packageData.primary_engine_routed}
COST TIER: ${packageData.cost_tier}

--- 1. IDEA ---
WHAT HAPPENED:
${packageData.what_happened}

WHY IT MATTERS:
${packageData.why_audience_cares}

OUR ANGLE:
${packageData.strategic_angle}

WHY NOW:
${packageData.why_now}

--- 2. SCRIPT ---
HOOK:
${packageData.hook}

FULL SCRIPT:
${packageData.script_full_text}

--- 3. SOCIAL CAPTION ---
${packageData.social_package.caption_long}

COMMENT KEYWORD:
${packageData.social_package.comment_keyword} -> ${packageData.social_package.dm_resource_deliverable}

--- 4. PRODUCTION PROMPTS ---
[Google Flow Video Prompts]
${packageData.flow_prompts.map((f, i) => `SHOT ${i + 1} (${f.duration_sec}s):\n${f.compiled_prompt}`).join("\n\n")}

[Remotion Render Command]
${packageData.remotion_spec.render_command}
`;
    handleCopy("copy_all", fullText);
  };

  const currentHook = selectedHookIndex !== null ? packageData.alternative_hooks[selectedHookIndex] : packageData.hook;

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 animate-fadeIn pb-32">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Create</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => handleCopy("copy_script_top", packageData.script_full_text)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            {copiedKey === "copy_script_top" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Script</span>
          </button>

          <button
            onClick={() =>
              handleCopy(
                "copy_flow_top",
                packageData.flow_prompts.map((f, i) => `[SHOT ${i + 1}]: ${f.compiled_prompt}`).join("\n\n")
              )
            }
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            {copiedKey === "copy_flow_top" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Video className="w-3.5 h-3.5" />}
            <span>Copy Flow</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors flex items-center space-x-1.5 shadow-lg shadow-amber-500/10"
          >
            {copiedKey === "copy_all" ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy All</span>
          </button>

          <button
            onClick={() => setShowAdvancedDrawer(true)}
            className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Open Advanced</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {packageData.primary_engine_routed}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {packageData.format}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>{packageData.cost_tier} Cost</span>
          </span>
          {packageData.anti_slop_passed && (
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Anti-Slop Clean</span>
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
          {packageData.title}
        </h1>
        <p className="text-sm text-slate-400 font-normal">
          {packageData.topic}
        </p>
      </div>

      {/* SECTION 1: IDEA (§61 Section 1) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex items-center space-x-2.5 text-xs font-mono uppercase tracking-widest text-amber-400">
          <Sparkles className="w-4 h-4" />
          <span>Section 1 • The Idea</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">What Happened</h3>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60">
              {packageData.what_happened}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Why It Matters</h3>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60">
              {packageData.why_audience_cares}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase text-amber-400 tracking-wider">Our Angle (@future.aii__)</h3>
            <p className="text-sm text-amber-200/90 leading-relaxed bg-amber-500/5 p-3.5 rounded-xl border border-amber-500/20">
              {packageData.strategic_angle}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Why Now</h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60">
              {packageData.why_now}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: SCRIPT (§61 Section 2) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 text-xs font-mono uppercase tracking-widest text-amber-400">
            <FileText className="w-4 h-4" />
            <span>Section 2 • Script & Hooks</span>
          </div>

          <button
            onClick={() => handleCopy("copy_script_section", packageData.script_full_text)}
            className="text-xs text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors"
          >
            {copiedKey === "copy_script_section" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Full Script</span>
          </button>
        </div>

        {/* Selected Hook Card */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center space-x-1.5">
              <span>⚡ Primary Hook (First 3 Seconds)</span>
            </span>
            <button
              onClick={() => handleCopy("hook", currentHook)}
              className="text-[11px] text-amber-300/80 hover:text-amber-200 flex items-center space-x-1"
            >
              {copiedKey === "hook" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>Copy Hook</span>
            </button>
          </div>
          <p className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug">
            "{currentHook}"
          </p>
        </div>

        {/* Alternative Hooks */}
        {packageData.alternative_hooks && packageData.alternative_hooks.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Alternative Hooks (Click to select)</h4>
            <div className="grid grid-cols-1 gap-2">
              {packageData.alternative_hooks.map((altHook, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHookIndex(selectedHookIndex === idx ? null : idx)}
                  className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${
                    selectedHookIndex === idx
                      ? "bg-amber-500/10 border-amber-500 text-amber-200 font-medium"
                      : "bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <span className="pr-4">"{altHook}"</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 shrink-0">
                    Option {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Full Script */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Spoken Word Script</h4>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
            {packageData.script_full_text}
          </div>
        </div>

        {/* Shot-by-Shot Timeline Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Timeline Shot Breakdown</h4>
          <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/80">
            {packageData.script_shots.map((shot, idx) => (
              <div key={shot.shot_id || idx} className="p-4 bg-slate-950/30 hover:bg-slate-950/60 transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-amber-400 font-semibold">
                      {shot.shot_id.toUpperCase()}
                    </span>
                    <span className="text-slate-400 font-mono">
                      {shot.time_start}s - {shot.time_end}s ({shot.duration_sec}s)
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                      {shot.purpose}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Voiceover</span>
                    <p className="text-slate-200 italic mt-0.5">"{shot.voiceover}"</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">On-Screen Text (Kinetic)</span>
                    <p className="text-amber-300 font-semibold tracking-wide uppercase mt-0.5">{shot.on_screen_text || "—"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: VISUALS (§61 Section 3) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 text-xs font-mono uppercase tracking-widest text-amber-400">
            <Camera className="w-4 h-4" />
            <span>Section 3 • Visual Plan & Production Specs</span>
          </div>

          {packageData.anti_slop_passed && (
            <div className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Anti-Slop Filter Verified</span>
            </div>
          )}
        </div>

        {/* Visual Governance Banner */}
        <div className="p-3.5 bg-blue-500/5 border border-blue-500/20 rounded-xl text-xs text-blue-200/90 flex items-start space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p>
            <strong>Visual Safeguard Enforced:</strong> All shots reject generic AI slop (floating glowing blue brains, digital matrix tunnels, or generic robot hands). Visuals specify concrete photorealistic hardware, screen UI, high-contrast studio setups, and macro optics.
          </p>
        </div>

        {/* Shot Visual Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packageData.script_shots.map((shot, idx) => (
            <div key={idx} className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="font-mono text-xs font-bold text-amber-400">
                  {shot.shot_id.toUpperCase()} • Visual Plan
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {shot.camera} • {shot.lens}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Concept:</span>
                  <p className="text-slate-200 mt-0.5 font-medium">{shot.visual_concept}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                  <div>
                    <span className="font-mono text-slate-400">Subject:</span> {shot.subject}
                  </div>
                  <div>
                    <span className="font-mono text-slate-400">Movement:</span> {shot.movement}
                  </div>
                  <div>
                    <span className="font-mono text-slate-400">Lighting:</span> {shot.lighting}
                  </div>
                  <div>
                    <span className="font-mono text-slate-400">Audio FX:</span> {shot.sound_effects || "None"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: PRODUCTION PROMPTS (Tool-Specific Compilers) (§61 Section 4) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 text-xs font-mono uppercase tracking-widest text-amber-400">
            <Terminal className="w-4 h-4" />
            <span>Section 4 • Tool-Specific Production Prompts</span>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            Directly compiled for your chosen stack
          </span>
        </div>

        {/* Tab Buttons for Compilers */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: "flow", label: "Google Flow / Veo", icon: Video },
            { id: "gemini", label: "Gemini Pro", icon: BrainCircuit },
            { id: "chatgpt", label: "ChatGPT Go", icon: MessageSquare },
            { id: "remotion", label: "Remotion React", icon: Code2 },
            { id: "hyperframes", label: "HyperFrames", icon: Layers },
            { id: "heygen", label: "HeyGen Avatar", icon: Sparkles },
            { id: "opensource", label: "FFmpeg & Whisper", icon: Terminal },
            { id: "social", label: "Social & Comment DM", icon: Share2 }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activePromptTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePromptTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/10"
                    : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT: 1. Google Flow / Veo */}
        {activePromptTab === "flow" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Compiled for Google Flow, Veo 2, and Gemini Omni ({packageData.flow_prompts.length} Shots)
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    "copy_all_flow",
                    packageData.flow_prompts.map((f, i) => `[SHOT ${i + 1} - ${f.duration_sec}s]\n${f.compiled_prompt}`).join("\n\n")
                  )
                }
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1 font-mono"
              >
                {copiedKey === "copy_all_flow" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy All Flow Prompts</span>
              </button>
            </div>

            <div className="space-y-3">
              {packageData.flow_prompts.map((flowShot, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      SHOT {idx + 1} ({flowShot.duration_sec}s) • {flowShot.camera_direction}
                    </span>
                    <button
                      onClick={() => handleCopy(`flow_${idx}`, flowShot.compiled_prompt)}
                      className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                    >
                      {copiedKey === `flow_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 font-mono bg-slate-900/80 p-3 rounded-lg border border-slate-800 leading-relaxed whitespace-pre-line select-all">
                    {flowShot.compiled_prompt}
                  </p>
                  {flowShot.negative_prompt && (
                    <p className="text-[11px] text-rose-400/80 font-mono">
                      <strong>Negative Prompt:</strong> {flowShot.negative_prompt}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: 2. Gemini Pro */}
        {activePromptTab === "gemini" && (
          <div className="space-y-4">
            <span className="text-xs text-slate-400 font-mono block">
              Gemini 2.5 Flash / Pro Deep Prompt Pack (Thinking + Multi-Turn)
            </span>

            <div className="space-y-4">
              {[
                { title: "Deep Research Prompt", content: packageData.gemini_prompts.deep_research_prompt, key: "gemini_research" },
                { title: "Creative Angle Exploration", content: packageData.gemini_prompts.creative_angle_prompt, key: "gemini_angle" },
                { title: "Script Polish & Flow Optimization", content: packageData.gemini_prompts.script_polisher_prompt, key: "gemini_polish" },
                { title: "Repurposing for Threads / Carousel", content: packageData.gemini_prompts.repurposing_prompt, key: "gemini_repurpose" }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-bold">{item.title}</span>
                    <button
                      onClick={() => handleCopy(item.key, item.content)}
                      className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                    >
                      {copiedKey === item.key ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="text-xs text-slate-300 font-mono bg-slate-900/80 p-3 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap select-all">
                    {item.content}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: 3. ChatGPT Go */}
        {activePromptTab === "chatgpt" && (
          <div className="space-y-4">
            <span className="text-xs text-slate-400 font-mono block">
              ChatGPT Go / Plus Creative Director Task Pack
            </span>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-bold">Creative Director Task</span>
                <button
                  onClick={() => handleCopy("chatgpt_task", packageData.chatgpt_prompts.creative_director_task)}
                  className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                >
                  {copiedKey === "chatgpt_task" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="text-xs text-slate-300 font-mono bg-slate-900/80 p-3 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap select-all">
                {packageData.chatgpt_prompts.creative_director_task}
              </pre>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">System Context</span>
              <pre className="text-xs text-slate-400 font-mono bg-slate-900/40 p-3 rounded-lg border border-slate-800/60 overflow-x-auto whitespace-pre-wrap">
                {packageData.chatgpt_prompts.system_context}
              </pre>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 4. Remotion React */}
        {activePromptTab === "remotion" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                1080x1920 30fps • Atelier Safe Zones Ready
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy("remotion_cmd", packageData.remotion_spec.render_command)}
                  className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                >
                  {copiedKey === "remotion_cmd" ? <Check className="w-3 h-3 text-emerald-400" /> : <Terminal className="w-3 h-3" />}
                  <span>Copy Render Command</span>
                </button>
                <button
                  onClick={() => handleCopy("remotion_code", packageData.remotion_spec.copyable_react_code)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                >
                  {copiedKey === "remotion_code" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy React Code</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] font-mono text-slate-400 mb-2">
                CLI Command: <code className="text-amber-300">{packageData.remotion_spec.render_command}</code>
              </div>
              <pre className="text-xs text-slate-300 font-mono bg-slate-900/90 p-4 rounded-lg border border-slate-800 overflow-x-auto max-h-96 select-all">
                {packageData.remotion_spec.copyable_react_code}
              </pre>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 5. HyperFrames */}
        {activePromptTab === "hyperframes" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Kinetic HTML/CSS + GSAP Timeline Animation
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    "hyperframes",
                    `/* GSAP TIMELINE */\n${packageData.hyperframes_spec.gsap_timeline_code}\n\n/* HTML */\n${packageData.hyperframes_spec.html_markup}\n\n/* CSS */\n${packageData.hyperframes_spec.css_styles}`
                  )
                }
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                {copiedKey === "hyperframes" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy HyperFrames Spec</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold block">GSAP Kinetic Animation</span>
              <pre className="text-xs text-slate-300 font-mono bg-slate-900/90 p-3 rounded-lg border border-slate-800 overflow-x-auto max-h-60 select-all">
                {packageData.hyperframes_spec.gsap_timeline_code}
              </pre>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 6. HeyGen */}
        {activePromptTab === "heygen" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Avatar Presenter Setup & B-Roll Cue Points
              </span>
              <button
                onClick={() => handleCopy("heygen", packageData.heygen_spec.speaking_script)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                {copiedKey === "heygen" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Speaking Script</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-400">
                <div>Avatar ID: <span className="text-slate-200">{packageData.heygen_spec.avatar_id}</span></div>
                <div>Voice ID: <span className="text-slate-200">{packageData.heygen_spec.voice_id}</span></div>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">Avatar Script:</span>
                <p className="text-xs text-slate-200 font-sans bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  {packageData.heygen_spec.speaking_script}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 7. Open-Source Stack */}
        {activePromptTab === "opensource" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                100% Free Local Automation (FFmpeg, Whisper, Piper TTS)
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    "ffmpeg",
                    `${packageData.opensource_spec.piper_tts_command}\n\n${packageData.opensource_spec.whisper_transcription_command}\n\n${packageData.opensource_spec.ffmpeg_concat_command}`
                  )
                }
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                {copiedKey === "ffmpeg" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy All Commands</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block">1. Generate Voiceover (Piper TTS)</span>
                <code className="text-xs text-slate-300 font-mono bg-slate-900/90 p-2.5 rounded block border border-slate-800 select-all">
                  {packageData.opensource_spec.piper_tts_command}
                </code>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block">2. Auto-Caption (OpenAI Whisper CLI)</span>
                <code className="text-xs text-slate-300 font-mono bg-slate-900/90 p-2.5 rounded block border border-slate-800 select-all">
                  {packageData.opensource_spec.whisper_transcription_command}
                </code>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block">3. Assemble Video Timeline (FFmpeg)</span>
                <code className="text-xs text-slate-300 font-mono bg-slate-900/90 p-2.5 rounded block border border-slate-800 select-all">
                  {packageData.opensource_spec.ffmpeg_concat_command}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 8. Social & Comment DM */}
        {activePromptTab === "social" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Instagram Caption & ManyChat Comment-to-DM Trigger
              </span>
              <button
                onClick={() =>
                  handleCopy("social_all", `${packageData.social_package.caption_long}\n\n${packageData.social_package.hashtags.join(" ")}`)
                }
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                {copiedKey === "social_all" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Full Caption</span>
              </button>
            </div>

            {/* Comment to DM Trigger Card */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Comment-to-DM Trigger
                </span>
                <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                  KEYWORD: "{packageData.social_package.comment_keyword}"
                </span>
              </div>
              <p className="text-xs text-amber-200">
                Deliverable: {packageData.social_package.dm_resource_deliverable}
              </p>
              <div className="text-[11px] font-mono text-slate-300 bg-slate-950/60 p-2.5 rounded border border-amber-500/20 mt-2">
                <strong>Automated DM Message:</strong> {packageData.social_package.dm_private_message}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">Instagram Caption</span>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line select-all">
                {packageData.social_package.caption_long}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">Hashtags</span>
              <div className="flex flex-wrap gap-1.5">
                {packageData.social_package.hashtags.map((tag, i) => (
                  <span key={i} className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide-out [OPEN ADVANCED] Drawer (§61) */}
      {showAdvancedDrawer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end animate-fadeIn">
          <div className="w-full max-w-xl bg-slate-950 border-l border-slate-800 h-full overflow-y-auto p-6 space-y-6 animate-slideInRight">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-mono uppercase font-bold text-white tracking-wider">
                  Deep Intelligence & Telemetry
                </h3>
              </div>
              <button
                onClick={() => setShowAdvancedDrawer(false)}
                className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-md"
              >
                Close ✕
              </button>
            </div>

            {/* Epistemic & Confidence Status */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Epistemic Status</span>
                <p className="font-mono font-bold text-amber-400">{packageData.epistemic_status}</p>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Confidence Score</span>
                <p className="font-mono font-bold text-emerald-400">{(packageData.confidence_score * 100).toFixed(1)}%</p>
              </div>
            </div>

            {/* Router & Capability */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <h4 className="text-xs font-mono uppercase text-indigo-400 tracking-wider">Engine Routing Rationale</h4>
              <p className="text-xs text-slate-300 font-mono">{packageData.routing_reason}</p>
            </div>

            {/* Source Claims & Verification */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Verified Source Claims ({packageData.source_claims?.length || 0})</h4>
              <div className="space-y-2">
                {packageData.source_claims && packageData.source_claims.length > 0 ? (
                  packageData.source_claims.map((claim, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/40 border border-slate-800 rounded-lg text-xs space-y-1">
                      <p className="text-slate-200 font-medium">{claim.claim || claim.statement || JSON.stringify(claim)}</p>
                      {claim.source && (
                        <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                          <span>Source:</span>
                          <span className="text-indigo-400">{claim.source}</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No external claims flagged for this creative concept.</p>
                )}
              </div>
            </div>

            {/* Differentiation Analysis */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Competitive Differentiation</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{packageData.differentiation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
