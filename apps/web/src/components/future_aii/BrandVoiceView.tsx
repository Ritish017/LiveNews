import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Terminal,
  BookOpen,
  Volume2,
  Flame,
  Award,
  Layers
} from "lucide-react";
import { fetchBrandProfile, checkAntiGeneric } from "../../lib/api";

export const BrandVoiceView: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Anti-generic tester state
  const [testDraft, setTestDraft] = useState(
    "In the fast-paced world of technology, OpenAI just game-changed everything with an insane new model. Here are 5 AI tools that will blow your mind!"
  );
  const [auditResult, setAuditResult] = useState<any>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  useEffect(() => {
    loadBrand();
  }, []);

  const loadBrand = async () => {
    setIsLoading(true);
    try {
      const data = await fetchBrandProfile();
      setProfile(data);
    } catch (err) {
      console.error("Failed to load brand profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunAudit = async () => {
    if (!testDraft.trim()) return;
    setIsAuditing(true);
    try {
      const res = await checkAntiGeneric(testDraft);
      setAuditResult(res);
    } catch (err) {
      console.error("Audit error:", err);
    } finally {
      setIsAuditing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-xs font-mono text-slate-400">Loading future.aii__ brand style guide & voice profile...</p>
      </div>
    );
  }

  const voice = profile?.voice_profile || {};
  const allocations = profile?.pillar_allocations || {};

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              §39, §40, §72 ENGINE
            </span>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Brand Identity & Anti-Generic Filter
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Core voice parameters, 7-pillar balancing matrix, and the automated anti-cliché detection engine for @future.aii__.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={loadBrand}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition"
            title="Refresh brand configuration"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Brand Configuration vs Anti-Generic Test Bench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLS: BRAND & VOICE CONFIGURATION */}
        <div className="lg:col-span-2 space-y-6">
          {/* Brand Manifesto Card */}
          <div className="rounded-xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                  Primary Brand Account
                </span>
                <h2 className="text-xl font-black text-white font-mono mt-0.5">
                  @{profile?.account_handle || "future.aii__"}
                </h2>
              </div>
              <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                {profile?.tagline || "Your window into the AI future."}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {profile?.positioning ||
                "future.aii__ is the premier cinematic, internet-native AI publication. We decode transformers, evaluate coding agents, run live AI experiments, and forecast the Road to AGI for developers, students, and curious operators."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Visual Style</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">
                  Dark, Cinematic, High Contrast
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Target Audience</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">
                  18–30 Internet-Native Creators
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Tone of Voice</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">
                  Curious, Fast, Technical Yet Simple
                </span>
              </div>
            </div>
          </div>

          {/* 7 Pillars Allocation Matrix (§68) */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                7-Pillar Target Portfolio Allocation (§68)
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Total: 100% Balanced</span>
            </div>

            <div className="space-y-3">
              {Object.entries(allocations).map(([pillar, pct]: [string, any]) => (
                <div key={pillar} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-300 font-semibold">{pillar}</span>
                    <span className="font-mono font-bold text-amber-400">{pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Profile Breakdown (§39) */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-sky-400" />
              Creator Voice Characteristics & Rules
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Allowed / Preferred Vocabulary */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Preferred Vocabulary & Phrasing
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(voice?.preferred_vocabulary || [
                    "What actually changed",
                    "Here is why it matters",
                    "Under the hood",
                    "Let's test it",
                    "Deterministic",
                    "Latency",
                    "Token efficiency",
                    "Reasoning compute",
                    "Agentic loop"
                  ]).map((word: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Banned Clichés (§72 Anti-Generic) */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  Banned Clichés & AI Tells
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(voice?.banned_cliches || [
                    "Game-changer",
                    "Insane update",
                    "Blow your mind",
                    "In the fast-paced world",
                    "Delve into",
                    "Tapestry",
                    "Revolutionary",
                    "Unleash the power",
                    "Buckle up"
                  ]).map((word: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20 line-through"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COL: INTERACTIVE ANTI-GENERIC TEST BENCH (§72) */}
        <div className="space-y-6">
          <div className="rounded-xl bg-slate-900 border-2 border-amber-500/40 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Anti-Generic Content Filter (§72)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              "Could another generic AI account have produced this?" Run drafts through our heuristic anti-cliché analyzer before recording.
            </p>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                Test Reel Hook or Script Draft:
              </label>
              <textarea
                value={testDraft}
                onChange={(e) => setTestDraft(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono leading-relaxed"
                placeholder="Paste script snippet..."
              />
            </div>

            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono transition flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              {isAuditing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Auditing Draft...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Audit Anti-Generic Score</span>
                </>
              )}
            </button>

            {/* Audit Results Output */}
            {auditResult && (
              <div
                className={`p-4 rounded-xl border space-y-3 animate-fadeIn ${
                  auditResult.passed
                    ? "bg-emerald-950/20 border-emerald-500/30"
                    : "bg-rose-950/20 border-rose-500/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase flex items-center gap-1.5">
                    {auditResult.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                    )}
                    <span className={auditResult.passed ? "text-emerald-300" : "text-rose-300"}>
                      {auditResult.verdict || (auditResult.passed ? "PASSED ANTI-GENERIC" : "TOO GENERIC")}
                    </span>
                  </span>
                  <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    Score: {auditResult.originality_score ?? (auditResult.passed ? 92 : 44)}/100
                  </span>
                </div>

                {auditResult.detected_cliches?.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
                      Detected Clichés:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {auditResult.detected_cliches.map((cliche: string, i: number) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        >
                          "{cliche}"
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-slate-300 leading-relaxed font-sans border-t border-slate-800/60 pt-2">
                  <span className="font-bold text-white block mb-0.5">Recommendations:</span>
                  {auditResult.recommendations ||
                    (auditResult.passed
                      ? "High specificity and authentic voice. Grounding is verifiable with no synthetic filler phrases."
                      : "Replace vague hype words ('insane', 'blow your mind') with exact quantitative facts (e.g. 'reduced latency from 4.2s to 800ms').")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
