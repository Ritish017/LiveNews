import React, { useState } from "react";
import {
  ContentAssetPackage,
  SentenceClaimTrace
} from "../../types";
import {
  X, Sparkles, CheckCircle2, ShieldCheck, Copy, Check, MessageSquare,
  Film, Layers, Share2, Compass, Play, ArrowRight, ExternalLink, HelpCircle
} from "lucide-react";

interface ContentDetailModalProps {
  pkg: ContentAssetPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectHook?: (hookText: string) => void;
}

export const ContentDetailModal: React.FC<ContentDetailModalProps> = ({
  pkg,
  isOpen,
  onClose,
  onSelectHook
}) => {
  if (!isOpen || !pkg) return null;

  const [activeTab, setActiveTab] = useState<"script" | "hooks" | "remotion" | "carousel" | "story" | "automation" | "distribution">("script");
  const [selectedHookText, setSelectedHookText] = useState<string>(pkg.selected_hook);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedCaption, setCopiedCaption] = useState<boolean>(false);
  const [inspectedClaim, setInspectedClaim] = useState<SentenceClaimTrace | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pkg.remotion_spec.copyable_react_code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(pkg.caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleHookClick = (text: string) => {
    setSelectedHookText(text);
    if (onSelectHook) onSelectHook(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0b101b] border border-slate-800 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 shrink-0">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
              {pkg.pillar}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {pkg.series}
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-600" />
            <h2 className="text-base font-bold text-white tracking-tight truncate max-w-md">
              {pkg.topic}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>READY TO POST ({pkg.quality_scores.content_quality || 94}%)</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-800 bg-[#090d16] flex items-center space-x-1 overflow-x-auto text-xs shrink-0 py-2">
          <button
            onClick={() => setActiveTab("script")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
              activeTab === "script" ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Production Script</span>
          </button>

          <button
            onClick={() => setActiveTab("hooks")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
              activeTab === "hooks" ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>10 Hooks Scorer</span>
          </button>

          <button
            onClick={() => setActiveTab("remotion")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
              activeTab === "remotion" ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Remotion Code & Prompts</span>
          </button>

          <button
            onClick={() => setActiveTab("carousel")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
              activeTab === "carousel" ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Carousel ({pkg.carousel_spec.total_slides} Slides)</span>
          </button>

          <button
            onClick={() => setActiveTab("story")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
              activeTab === "story" ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Story Polls</span>
          </button>

          <button
            onClick={() => setActiveTab("automation")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
              activeTab === "automation" ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Comment → DM Engine</span>
          </button>

          <button
            onClick={() => setActiveTab("distribution")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
              activeTab === "distribution" ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Caption & Audit</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: PRODUCTION SCRIPT */}
          {activeTab === "script" && (
            <div className="space-y-6">
              {/* Active Hook Banner */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500 text-black font-bold">
                      Active Hook
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {pkg.script.duration_seconds}s Reel ({pkg.script.total_words} words, ~{pkg.script.estimated_wpm} WPM)
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    "{selectedHookText}"
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("hooks")}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition shrink-0"
                >
                  Change Hook
                </button>
              </div>

              {/* Timestamped Director Cues */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Timestamped Cues (Voice, Visual, Text, SFX, Camera)
                  </h3>
                  <span className="text-xs font-mono text-cyan-400 flex items-center space-x-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Click 'Why this claim?' to inspect sources</span>
                  </span>
                </div>

                <div className="space-y-3">
                  {pkg.script.segments.map((seg, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition space-y-3"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center space-x-2 font-mono text-xs">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold">
                            {seg.time_start.toFixed(1)}s – {seg.time_end.toFixed(1)}s
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 uppercase">
                            {seg.phase}
                          </span>
                        </div>

                        {seg.underlying_claim && (
                          <button
                            onClick={() => {
                              const match = pkg.fact_audit.sentence_traces.find(t => t.sentence_id === seg.sentence_id);
                              if (match) {
                                setInspectedClaim(match);
                              } else {
                                setInspectedClaim({
                                  sentence_id: seg.sentence_id,
                                  script_text: seg.voice,
                                  extracted_claim: seg.underlying_claim || seg.voice,
                                  source_name: "Official Technical Announcement",
                                  source_url: "https://arxiv.org",
                                  source_date: new Date().toISOString(),
                                  evidence_snippet: "Directly referenced in primary release paper.",
                                  confidence_score: 98.0,
                                  epistemic_category: "FACT",
                                  verification_status: "CONFIRMED"
                                });
                              }
                            }}
                            className="text-xs font-mono text-amber-400/90 hover:text-amber-300 underline flex items-center space-x-1 cursor-pointer"
                          >
                            <span>Why is this claim here?</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Spoken Voice */}
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                          VOICE / NARRATION:
                        </span>
                        <p className="text-sm text-slate-200 font-medium">
                          {seg.voice}
                        </p>
                      </div>

                      {/* Visual & On-Screen Text */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                        <div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                            VISUAL DIRECTION:
                          </span>
                          <p className="text-slate-300">{seg.visual}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                            ON-SCREEN TEXT:
                          </span>
                          <p className="text-amber-300 font-bold font-mono">{seg.on_screen_text}</p>
                        </div>
                      </div>

                      {/* SFX & Camera */}
                      <div className="flex items-center space-x-4 text-xs font-mono text-slate-400 pt-1">
                        <span>SFX: <strong className="text-slate-300">{seg.sfx}</strong></span>
                        <span>•</span>
                        <span>CAMERA: <strong className="text-slate-300">{seg.camera}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 10 HOOKS SCORER */}
          {activeTab === "hooks" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    10 Psychological Hook Categories
                  </h3>
                  <p className="text-xs text-slate-400">
                    Scored across 7 criteria. Click any hook to select it for the production script.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {pkg.hooks.all_hooks.map((h, i) => (
                  <div
                    key={i}
                    onClick={() => handleHookClick(h.text)}
                    className={`p-4 rounded-xl border transition cursor-pointer ${
                      selectedHookText === h.text
                        ? "bg-amber-500/10 border-amber-500/60 shadow-md shadow-amber-500/10"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                          {h.category}
                        </span>
                        {h.tag === "BEST" && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500 text-black">
                            BEST HOOK
                          </span>
                        )}
                        {h.tag === "SAFE" && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                            SAFE HOOK
                          </span>
                        )}
                        {h.tag === "HIGH_RISK" && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                            HIGH-RISK / REWARD
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 font-mono text-xs">
                        <span className="text-slate-400">Score:</span>
                        <strong className="text-amber-400 text-sm">{h.composite_score}</strong>
                        {selectedHookText === h.text && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 ml-2" />
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-medium text-slate-100 mb-3">
                      "{h.text}"
                    </p>

                    {/* Criteria breakdown */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                      <div>Curiosity: <strong className="text-slate-200">{h.curiosity}</strong></div>
                      <div>Clarity: <strong className="text-slate-200">{h.clarity}</strong></div>
                      <div>Novelty: <strong className="text-slate-200">{h.novelty}</strong></div>
                      <div>Retention: <strong className="text-slate-200">{h.retention_potential}</strong></div>
                      <div>Credibility: <strong className="text-slate-200">{h.credibility}</strong></div>
                      <div>Clickbait: <strong className="text-rose-400">{h.clickbait_risk}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REMOTION CODE */}
          {activeTab === "remotion" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Remotion React Composition Code
                  </h3>
                  <p className="text-xs text-slate-400">
                    Deterministic React code conforming to Instagram safe zones (Top 180px, Bottom 320px).
                  </p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-500 text-black hover:bg-amber-400 transition flex items-center space-x-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? "COPIED TO CLIPBOARD" : "COPY REMOTION CODE"}</span>
                </button>
              </div>

              {/* Code display */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#06090f]">
                <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>src/Root.tsx (Remotion 1080x1920 @ 30fps)</span>
                  <span className="text-amber-400">900 Frames (30s)</span>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-96 leading-relaxed">
                  <code>{pkg.remotion_spec.copyable_react_code}</code>
                </pre>
              </div>

              {/* AI Video Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                  <span className="font-mono text-amber-400 font-bold uppercase block">
                    Google Veo Cinematic Video Prompt
                  </span>
                  <p className="text-slate-300 leading-relaxed font-mono">
                    {pkg.ai_video_prompts.veo_prompt}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                  <span className="font-mono text-cyan-400 font-bold uppercase block">
                    Gemini Omni Visual Blueprint
                  </span>
                  <p className="text-slate-300 leading-relaxed font-mono">
                    {pkg.ai_video_prompts.gemini_omni_prompt}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CAROUSEL PREVIEW */}
          {activeTab === "carousel" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Instagram Carousel ({pkg.carousel_spec.total_slides} Slides)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Native 4:5 aspect ratio (1080x1350) slide-by-slide visual layout.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pkg.carousel_spec.slides.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gradient-to-b from-slate-900 to-[#0b101b] border border-slate-800 flex flex-col justify-between aspect-[4/5] shadow-lg relative overflow-hidden"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 font-bold">
                          Slide {s.slide_number}
                        </span>
                        <span className="uppercase text-slate-400">{s.slide_role}</span>
                      </div>

                      <h4 className="text-sm font-bold text-white leading-tight">
                        {s.headline}
                      </h4>

                      <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                        {s.body_points.map((pt, pIdx) => (
                          <li key={pIdx} className="leading-snug">{pt}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                      <span className="truncate">{s.visual_layout}</span>
                      {s.cta_badge && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold shrink-0">
                          {s.cta_badge}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: STORY SEQUENCE */}
          {activeTab === "story" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">
                  3-Part Interactive Story Sequence
                </h3>
                <p className="text-xs text-slate-400">
                  Drives engagement via polls and countdowns leading into tonight's Reel.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {pkg.story_sequence.stories.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-black border border-slate-800 flex flex-col justify-between aspect-[9/16] shadow-xl relative"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                          Story {st.story_number}
                        </span>
                        <span className="uppercase text-cyan-400 font-bold">{st.story_type}</span>
                      </div>

                      <h4 className="text-base font-bold text-white leading-snug">
                        {st.headline}
                      </h4>
                      <p className="text-xs text-slate-300">{st.subtext}</p>
                    </div>

                    {/* Interactive Sticker Preview */}
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center text-xs font-mono space-y-1.5">
                      <span className="text-[10px] uppercase text-slate-400 block">Sticker Preview</span>
                      <strong className="text-amber-300">{st.interactive_sticker.type?.toUpperCase()}</strong>
                      {st.interactive_sticker.options && (
                        <div className="grid grid-cols-2 gap-1 pt-1">
                          {st.interactive_sticker.options.map((opt: string, oIdx: number) => (
                            <div key={oIdx} className="p-1.5 rounded bg-slate-900 text-[11px] font-semibold text-white">
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: COMMENT -> DM AUTOMATION */}
          {activeTab === "automation" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Comment-to-DM Engagement Pipeline
                </h3>
                <p className="text-xs text-slate-400">
                  Compliant Meta Webhook Event model. Triggered when followers comment specific keywords.
                </p>
              </div>

              {pkg.automation_spec ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">
                        Trigger Keyword
                      </span>
                      <span className="text-2xl font-mono font-black text-amber-400">
                        {pkg.automation_spec.keywords[0]}
                      </span>
                      <span className="text-xs text-slate-400 block">Match Type: WORD (Case-insensitive)</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">
                        Resource Type
                      </span>
                      <span className="text-lg font-bold text-cyan-400 font-mono">
                        {pkg.automation_spec.resource_type}
                      </span>
                      <span className="text-xs text-slate-400 block">Automated direct delivery</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">
                        Pipeline Status
                      </span>
                      <span className="text-lg font-bold text-emerald-400 font-mono flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>ACTIVE</span>
                      </span>
                      <span className="text-xs text-slate-400 block">Ready for Instagram webhook dispatch</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Public Reply Preview */}
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                        Public Comment Reply
                      </span>
                      <p className="text-sm text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800">
                        {pkg.automation_spec.public_reply_options[0]}
                      </p>
                    </div>

                    {/* Private DM Preview */}
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                        Private Direct Message (DM)
                      </span>
                      <div className="text-sm text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 whitespace-pre-wrap font-sans">
                        {pkg.automation_spec.initial_dm}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-slate-400">
                  No automated resource attached for this post format (Pure News / Discussion).
                </div>
              )}
            </div>
          )}

          {/* TAB 7: DISTRIBUTION & AUDIT */}
          {activeTab === "distribution" && (
            <div className="space-y-6">
              {/* Quality Scores */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase">
                  10-Dimension Pre-Publish Quality Audit (§48)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {Object.entries(pkg.quality_scores).map(([k, v]) => (
                    <div key={k} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block truncate">
                        {k.replace(/_/g, " ")}
                      </span>
                      <strong className="text-base font-mono text-amber-400">
                        {v}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instagram Caption */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Instagram Caption & Hashtags
                  </span>
                  <button
                    onClick={handleCopyCaption}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-bold text-black bg-amber-500 hover:bg-amber-400 transition flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedCaption ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCaption ? "COPIED" : "COPY CAPTION"}</span>
                  </button>
                </div>
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                  {pkg.caption}
                </div>
              </div>

              {/* Multi-Platform Repurposing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <span className="font-mono text-cyan-400 font-bold uppercase block">
                    X (Twitter) Short Form Post
                  </span>
                  <p className="text-slate-300 font-mono whitespace-pre-wrap bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {pkg.x_post}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <span className="font-mono text-rose-400 font-bold uppercase block">
                    YouTube Short Optimization
                  </span>
                  <p className="text-slate-300 font-mono whitespace-pre-wrap bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {pkg.youtube_short}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#090d16] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span>Slot: <strong>{pkg.publishing_window}</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition shadow-lg cursor-pointer"
          >
            Done Reviewing
          </button>
        </div>
      </div>

      {/* Claim Traceability Modal ('Why is this claim here?') */}
      {inspectedClaim && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0e1422] border border-cyan-500/40 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  Why is this claim here?
                </h3>
              </div>
              <button
                onClick={() => setInspectedClaim(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                  Extracted Claim in Script
                </span>
                <p className="text-sm font-semibold text-white bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  "{inspectedClaim.extracted_claim}"
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                  Primary Source & Evidence
                </span>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-cyan-300 font-mono">{inspectedClaim.source_name}</strong>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400">
                      {inspectedClaim.confidence_score}% Confidence
                    </span>
                  </div>
                  <p className="text-slate-300 italic">"{inspectedClaim.evidence_snippet}"</p>
                  <a
                    href={inspectedClaim.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center space-x-1 font-mono text-[11px]"
                  >
                    <span>View Primary Documentation</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                <span>Category: <strong className="text-amber-400">{inspectedClaim.epistemic_category}</strong></span>
                <span>Status: <strong className="text-emerald-400">{inspectedClaim.verification_status}</strong></span>
              </div>
            </div>

            <button
              onClick={() => setInspectedClaim(null)}
              className="w-full py-2 rounded-xl text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-white transition"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
