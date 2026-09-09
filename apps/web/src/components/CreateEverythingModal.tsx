import React, { useState } from "react";
import { CreateEverythingPackage } from "../types";
import { 
  X, Sparkles, Copy, Check, Video, Share2, Layers, Download, CheckCircle2, 
  ChevronRight, ArrowRight, Film, FileText, Send, Flame, MessageSquare, 
  ExternalLink, Eye, PlaySquare, Hash, BookOpen
} from "lucide-react";

interface CreateEverythingModalProps {
  packageData: CreateEverythingPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInVideoDirector?: (event: any) => void;
}

export const CreateEverythingModal: React.FC<CreateEverythingModalProps> = ({
  packageData,
  isOpen,
  onClose,
  onOpenInVideoDirector
}) => {
  const [activeTab, setActiveTab] = useState<"strategy" | "x" | "linkedin" | "instagram" | "youtube" | "video" | "publishing">("strategy");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen || !packageData) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(packageData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `create_everything_${packageData.lifecycle_id || "package"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-gradient-to-b from-slate-900 via-[#0c101a] to-[#080c14] border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                CREATE EVERYTHING SUITE (§13.2, §29)
              </span>
              <span className="text-xs font-mono text-slate-400">
                1-Click Multi-Platform Output
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {packageData.strategy?.angle || "Coordinated Content Production Package"}
            </h2>
            <p className="text-xs text-slate-400 max-w-3xl">
              Deterministic strategy, platform-native copy, multi-engine video specifications, and publishing kits for instant deployment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJSON}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Download JSON Export"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto text-xs font-mono">
          {[
            { id: "strategy", label: "🎯 Strategy", icon: FileText },
            { id: "x", label: "𝕏 Post & Thread", icon: MessageSquare },
            { id: "linkedin", label: "💼 LinkedIn", icon: BookOpen },
            { id: "instagram", label: "📸 Instagram Reel", icon: Share2 },
            { id: "youtube", label: "▶️ YouTube", icon: PlaySquare },
            { id: "video", label: "🎬 Video Spec", icon: Film },
            { id: "publishing", label: "🚀 Publishing Kit", icon: Send },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-2 rounded-lg font-bold flex items-center space-x-1.5 transition cursor-pointer whitespace-nowrap ${
                activeTab === t.id
                  ? "bg-amber-500 text-black shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="min-h-[420px] max-h-[560px] overflow-y-auto pr-1">
          {/* 1. STRATEGY TAB */}
          {activeTab === "strategy" && (
            <div className="space-y-6 text-sm">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono font-bold text-amber-400 uppercase text-xs">
                    Strategic Foundation
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Audience: {packageData.strategy?.audience}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase">Objective</span>
                    <p className="text-slate-200 font-medium">{packageData.strategy?.goal}</p>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase">Primary Angle</span>
                    <p className="text-white font-bold text-base">"{packageData.strategy?.angle}"</p>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase">Opportunity Rationale</span>
                    <p className="text-slate-300 leading-relaxed text-xs">{packageData.strategy?.reasoning}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/20 to-slate-900/60 border border-violet-500/20 space-y-3">
                <h4 className="font-mono font-bold text-violet-300 uppercase text-xs flex items-center gap-2">
                  <Flame className="w-4 h-4 text-violet-400" />
                  <span>The Contrarian Advantage</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  While competitors churn generic benchmark numbers, this suite focuses strictly on real developer workflows, architectural tradeoffs, and immediate practical utility.
                </p>
              </div>
            </div>
          )}

          {/* 2. X (TWITTER) TAB */}
          {activeTab === "x" && (
            <div className="space-y-6">
              {/* Single Post */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                    1. High-Curiosity Single Tweet
                  </span>
                  <button
                    onClick={() => handleCopy(packageData.content_suite?.x_content?.single_post || packageData.publishing?.x?.text || "", "x_single")}
                    className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "x_single" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "x_single" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-sans text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {packageData.content_suite?.x_content?.single_post || packageData.publishing?.x?.text}
                </div>
              </div>

              {/* Thread */}
              {(packageData.content_suite?.x_content?.thread?.length || packageData.publishing?.x?.thread?.length) ? (
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                      2. Deep-Dive Thread ({(packageData.content_suite?.x_content?.thread || packageData.publishing?.x?.thread || []).length} Tweets)
                    </span>
                    <button
                      onClick={() => handleCopy((packageData.content_suite?.x_content?.thread || packageData.publishing?.x?.thread || []).join("\n\n---\n\n"), "x_thread")}
                      className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "x_thread" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === "x_thread" ? "Copied All" : "Copy Thread"}</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(packageData.content_suite?.x_content?.thread || packageData.publishing?.x?.thread || []).map((tweet, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 relative group">
                        <span className="text-[10px] font-mono text-slate-400 block mb-1">Tweet {i + 1}</span>
                        <div className="whitespace-pre-wrap">{tweet}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Hook Alternatives */}
              {packageData.content_suite?.x_hooks && packageData.content_suite.x_hooks.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Alternative Tested Hooks</span>
                  <div className="space-y-2">
                    {packageData.content_suite.x_hooks.map((h, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300 italic">
                        "{h.text}"
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. LINKEDIN TAB */}
          {activeTab === "linkedin" && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase">
                    LinkedIn Authority Breakdown
                  </span>
                  <button
                    onClick={() => handleCopy(packageData.content_suite?.linkedin_content?.content || packageData.publishing?.linkedin?.text || "", "li_post")}
                    className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "li_post" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "li_post" ? "Copied" : "Copy Post"}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-sans text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {packageData.content_suite?.linkedin_content?.content || packageData.publishing?.linkedin?.text}
                </div>
              </div>
            </div>
          )}

          {/* 4. INSTAGRAM TAB */}
          {activeTab === "instagram" && (
            <div className="space-y-6">
              {/* Reel Script */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                    Instagram Reel Script (High Retention)
                  </span>
                  <button
                    onClick={() => handleCopy(packageData.content_suite?.instagram_reel?.script || packageData.publishing?.instagram?.reel_script || "", "ig_reel")}
                    className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "ig_reel" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "ig_reel" ? "Copied" : "Copy Script"}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {packageData.content_suite?.instagram_reel?.script || packageData.publishing?.instagram?.reel_script}
                </div>
              </div>

              {/* Carousel Cards */}
              {(packageData.content_suite?.instagram_carousel?.slides || packageData.publishing?.instagram?.carousel_slides) && (
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase block">
                    Carousel Slide Plan
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(packageData.content_suite?.instagram_carousel?.slides || packageData.publishing?.instagram?.carousel_slides || []).map((slide, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                        <span className="text-[10px] font-mono text-rose-400 font-bold block">SLIDE {slide.slide_number || i + 1}</span>
                        <div className="font-semibold text-white">{slide.title || `Slide ${i + 1}`}</div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">{slide.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. YOUTUBE TAB */}
          {activeTab === "youtube" && (
            <div className="space-y-6">
              {/* Titles & Thumbnail Concept */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <span className="text-xs font-mono font-bold text-red-400 uppercase block">
                  1. High-CTR YouTube Titles
                </span>
                <div className="space-y-2">
                  {(packageData.content_suite?.youtube_content?.titles || packageData.publishing?.youtube?.titles || []).map((t, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-bold flex items-center justify-between">
                      <span>{t}</span>
                      <button
                        onClick={() => handleCopy(t, `yt_title_${i}`)}
                        className="text-[11px] text-slate-400 hover:text-white"
                      >
                        {copiedKey === `yt_title_${i}` ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-slate-400 block uppercase">Thumbnail Visual Concept</span>
                  <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {packageData.content_suite?.youtube_content?.thumbnails?.[0]?.visual_concept ||
                     packageData.publishing?.youtube?.thumbnail_concepts?.[0]?.visual_concept ||
                     "High-contrast split screen comparing raw inference latency before and after optimization."}
                  </p>
                </div>
              </div>

              {/* Cold Open & Script */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                    2. Cold Open & Retention Script
                  </span>
                  <button
                    onClick={() => handleCopy(packageData.content_suite?.youtube_content?.script || packageData.publishing?.youtube?.script || "", "yt_script")}
                    className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "yt_script" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "yt_script" ? "Copied" : "Copy Script"}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {packageData.content_suite?.youtube_content?.script || packageData.publishing?.youtube?.script}
                </div>
              </div>
            </div>
          )}

          {/* 6. VIDEO SPECIFICATION & PROMPTS TAB */}
          {activeTab === "video" && (
            <div className="space-y-6">
              {/* Routing Header */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                      Multi-Engine Model Routing
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                      {packageData.video_package?.generation_strategy || "HYBRID"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Routing deterministic data to Remotion / HyperFrames and cinematic footage to Veo / Gemini Omni.
                  </p>
                </div>

                {onOpenInVideoDirector && (
                  <button
                    onClick={() => onOpenInVideoDirector(packageData.video_package)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Open in Video Director</span>
                  </button>
                )}
              </div>

              {/* Compiled Prompts per Engine */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Remotion Prompt */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-sky-400">REMOTION CODING SPEC</span>
                    <button
                      onClick={() => handleCopy(packageData.video_package?.engines?.remotion?.standalone_agent_prompt || "", "p_remotion")}
                      className="text-[11px] font-mono text-slate-400 hover:text-white"
                    >
                      {copiedKey === "p_remotion" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-slate-300 max-h-36 overflow-y-auto leading-relaxed">
                    {packageData.video_package?.engines?.remotion?.standalone_agent_prompt || "Deterministic SVG code diff & benchmark motion graphics component."}
                  </div>
                </div>

                {/* Veo / Cinematic Prompt */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">VEO CINEMATIC PROMPT</span>
                    <button
                      onClick={() => handleCopy(packageData.video_package?.engines?.veo?.[0]?.prompt || "", "p_veo")}
                      className="text-[11px] font-mono text-slate-400 hover:text-white"
                    >
                      {copiedKey === "p_veo" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-slate-300 max-h-36 overflow-y-auto leading-relaxed">
                    {packageData.video_package?.engines?.veo?.[0]?.prompt || "Cinematic 4K macro shot of GPU cluster with motivated dolly zoom."}
                  </div>
                </div>

                {/* Omni Prompt */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-400">GEMINI OMNI PROMPT</span>
                    <button
                      onClick={() => handleCopy(packageData.video_package?.engines?.omni?.[0]?.visual_prompt || "", "p_omni")}
                      className="text-[11px] font-mono text-slate-400 hover:text-white"
                    >
                      {copiedKey === "p_omni" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-slate-300 max-h-36 overflow-y-auto leading-relaxed">
                    {packageData.video_package?.engines?.omni?.[0]?.visual_prompt || "Multimodal vision-narrated demonstration with temporal identity anchor."}
                  </div>
                </div>

                {/* HyperFrames Prompt */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-rose-400">HYPERFRAMES HTML/GSAP</span>
                    <button
                      onClick={() => handleCopy(packageData.video_package?.engines?.hyperframes?.standalone_agent_prompt || "", "p_hf")}
                      className="text-[11px] font-mono text-slate-400 hover:text-white"
                    >
                      {copiedKey === "p_hf" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-slate-300 max-h-36 overflow-y-auto leading-relaxed">
                    {packageData.video_package?.engines?.hyperframes?.standalone_agent_prompt || "Deterministic DOM token tree animation specification."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. PUBLISHING METADATA TAB */}
          {activeTab === "publishing" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs font-mono">
                <span className="text-xs font-bold text-amber-400 uppercase block">
                  Publishing & Metadata Checklist
                </span>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-1 text-[10px]">CAPTION & COPY</span>
                    <p className="text-slate-200 font-sans text-xs">{packageData.publishing?.instagram?.caption || packageData.publishing?.x?.text || packageData.content_suite?.x_content?.single_post}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-1 text-[10px]">CALL TO ACTION (CTA)</span>
                    <p className="text-amber-300 font-medium">{packageData.publishing?.linkedin?.cta || "Save this post and drop your biggest architectural question below."}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-1 text-[10px]">PINNED COMMENT FOR DISCUSSION</span>
                    <p className="text-slate-300 italic">{packageData.publishing?.youtube?.pinned_comment || "Are you planning to adopt this in production, or waiting for independent benchmark verification?"}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block text-[10px]">HASHTAGS</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(packageData.publishing?.x?.hashtags || packageData.publishing?.linkedin?.hashtags || packageData.publishing?.instagram?.hashtags || ["#ArtificialIntelligence", "#MachineLearning", "#SystemDesign"]).map((h, i) => (
                          <span key={i} className="text-sky-400 font-semibold">{h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Coordinated Suite Ready for Multi-Platform Distribution</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
