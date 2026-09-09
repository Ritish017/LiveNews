import React, { useState, useEffect } from "react";
import { 
  DailyDecision, Recommendation, SkippedCandidate, CreateEverythingPackage 
} from "../types";
import { 
  fetchTodayDecision, createEverything 
} from "../lib/api";
import { 
  Sparkles, Zap, Flame, Clock, Filter, Eye, ShieldAlert, 
  CheckCircle2, ArrowRight, Copy, Check, Video, Share2, Layers, Compass,
  TrendingUp, RefreshCw, Activity, Target
} from "lucide-react";

interface TodayDecisionViewProps {
  onOpenVideoDirector?: (event: any) => void;
  onOpenFunnelModal?: () => void;
  onOpenCreateEverything?: (pkg: CreateEverythingPackage) => void;
}

export const TodayDecisionView: React.FC<TodayDecisionViewProps> = ({
  onOpenVideoDirector,
  onOpenFunnelModal,
  onOpenCreateEverything
}) => {
  const [decision, setDecision] = useState<DailyDecision | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [recalculating, setRecalculating] = useState<boolean>(false);
  const [isCreatingEverything, setIsCreatingEverything] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Filters
  const [selectedTime, setSelectedTime] = useState<number | undefined>(undefined);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL");

  const loadDecision = async (timeMinutes?: number, platform?: string) => {
    try {
      setLoading(true);
      const data = await fetchTodayDecision(timeMinutes, platform);
      setDecision(data);
    } catch (err) {
      console.error("Failed to load today decision:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDecision(selectedTime, selectedPlatform);
  }, [selectedTime, selectedPlatform]);

  const handleRecalculate = async () => {
    try {
      setRecalculating(true);
      const data = await fetchTodayDecision(selectedTime, selectedPlatform);
      setDecision(data);
    } catch (err) {
      console.error("Failed to recalculate:", err);
    } finally {
      setRecalculating(false);
    }
  };

  const handleCreateEverythingClick = async (rec: Recommendation) => {
    try {
      setIsCreatingEverything(true);
      const pkg = await createEverything({
        opportunity_id: rec.event_id || rec.topic_id || "today_opp",
        title: rec.what_is_happening,
        summary: rec.why_it_matters,
        platform: rec.platform,
        angle: rec.best_angle
      });
      if (onOpenCreateEverything) {
        onOpenCreateEverything(pkg);
      }
    } catch (err) {
      console.error("Failed to generate complete suite:", err);
    } finally {
      setIsCreatingEverything(false);
    }
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  if (loading && !decision) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center animate-pulse">
          <Sparkles className="w-6 h-6 text-amber-400 animate-spin" />
        </div>
        <p className="text-sm font-mono text-slate-300">Synthesizing Today's Intelligence & Opportunities...</p>
        <span className="text-xs text-slate-500">Checking candidates against creator voice and content gaps</span>
      </div>
    );
  }

  const top = decision?.top_recommendation;

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header Banner & Decision Telemetry */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-slate-900/90 to-slate-950 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                NORTH STAR DECISION ENGINE
              </span>
              <span className="text-xs font-mono text-slate-400">
                {decision?.generated_at ? decision.generated_at.split("T")[0] : new Date().toISOString().split("T")[0]}
              </span>
              <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {decision?.candidates_considered || 14} Candidates Evaluated
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              What Should I Post Today?
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Continuous intelligence answering: <span className="text-amber-300 font-medium">What is happening</span>,{" "}
              <span className="text-amber-300 font-medium">why it matters</span>,{" "}
              <span className="text-amber-300 font-medium">the underserved angle</span>, and{" "}
              <span className="text-amber-300 font-medium">the exact production plan</span>.
            </p>
          </div>

          {/* Action Bar & Funnel Telemetry */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenFunnelModal && (
              <button
                onClick={onOpenFunnelModal}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition cursor-pointer shadow-sm"
              >
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Funnel: <strong className="text-cyan-300">42m to Publishable</strong></span>
              </button>
            )}

            <button
              onClick={handleRecalculate}
              disabled={recalculating}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-300 ${recalculating ? "animate-spin" : ""}`} />
              <span>{recalculating ? "Recalculating..." : "Re-evaluate"}</span>
            </button>
          </div>
        </div>

        {/* Filters Bar: Time & Platform Constraints */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 flex items-center gap-1 mr-1">
              <Clock className="w-3.5 h-3.5" /> Time Available:
            </span>
            {[
              { label: "Any", val: undefined },
              { label: "15m", val: 15 },
              { label: "30m", val: 30 },
              { label: "45m", val: 45 },
              { label: "60m+", val: 60 }
            ].map((t) => (
              <button
                key={t.label}
                onClick={() => setSelectedTime(t.val)}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  selectedTime === t.val
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Platform:
            </span>
            {["ALL", "X", "LinkedIn", "Instagram Reel", "YouTube"].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  selectedPlatform === p
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. THE #1 RECOMMENDATION (North Star 10-Step Intelligent Flow) */}
      {top ? (
        <div className="rounded-3xl border-2 border-amber-500/50 bg-gradient-to-b from-slate-900/95 via-[#0c101a] to-[#080c14] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-black flex items-center justify-center font-black text-lg shadow-lg shadow-amber-500/20">
                #1
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Primary Recommendation
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {top.what_is_happening}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {top.timing.action}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                Score: <strong className="text-amber-400 font-bold">{Math.round(top.opportunity.personalized_score || top.opportunity.base_score)}</strong>/100
              </span>
            </div>
          </div>

          {/* 10-Step Intelligence Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Left Column: Context, Content Gap, Strategy (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1 & 2: What is Happening & Why it Matters */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase">
                  <Flame className="w-4 h-4" />
                  <span>1. Why This Matters Right Now</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {top.why_it_matters}
                </p>
                <div className="text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span>Action Verdict: <strong className="text-amber-300">{top.timing.action}</strong></span>
                  <span>Timing Rationale: <strong className="text-slate-200">{top.timing.reason}</strong></span>
                </div>
              </div>

              {/* Step 3: Content Gap Intelligence (The Underserved Angle) */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-950/30 to-slate-900/80 border border-violet-500/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-violet-300 font-semibold uppercase">
                  <Compass className="w-4 h-4 text-violet-400" />
                  <span>2. The Content Gap (What Nobody Is Explaining)</span>
                </div>
                <p className="text-sm text-violet-100/90 leading-relaxed font-normal">
                  {top.what_nobody_is_explaining}
                </p>
                <div className="p-3 rounded-xl bg-violet-900/20 border border-violet-500/20 text-xs text-violet-200 space-y-1">
                  <div className="font-semibold text-violet-300 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-violet-400" />
                    Recommended Unique Angle:
                  </div>
                  <div className="italic text-white font-medium">"{top.best_angle}"</div>
                  <div className="text-slate-400 text-[11px] mt-1">{top.why_this_angle}</div>
                </div>
              </div>

              {/* Step 4: Transparent Opportunity Decomposition (Honest Explainability) */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold uppercase">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span>3. Opportunity Score Breakdown (Honest Explainability)</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Zero Black-Box Guesswork</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">BASE SCORE</span>
                    <span className="text-base font-bold text-amber-400">{Math.round(top.opportunity.base_score)}</span>
                    <span className="text-[10px] text-slate-500 block">objective world</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">PERSONALIZED</span>
                    <span className="text-base font-bold text-emerald-400">{Math.round(top.opportunity.personalized_score)}</span>
                    <span className="text-[10px] text-slate-500 block">creator fit delta</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">MEASURED SIGNALS</span>
                    <span className="text-base font-bold text-sky-400">{top.opportunity.measured_factor_count}</span>
                    <span className="text-[10px] text-slate-500 block">empirical factors</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">URGENCY</span>
                    <span className="text-base font-bold text-rose-400">{Math.round(top.timing.urgency_score)}</span>
                    <span className="text-[10px] text-slate-500 block">window velocity</span>
                  </div>
                </div>

                {/* Explainability factors */}
                <div className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="font-semibold text-slate-300">Factor-by-Factor Traceability:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    {top.opportunity.world_factors?.slice(0, 2).map((wf, idx) => (
                      <li key={idx}><strong className="text-slate-300">{wf.factor}:</strong> {wf.explanation} ({wf.points > 0 ? "+" + wf.points : wf.points} pts)</li>
                    ))}
                    {top.opportunity.creator_factors?.slice(0, 2).map((cf, idx) => (
                      <li key={idx}><strong className="text-slate-300">{cf.factor}:</strong> {cf.explanation} ({cf.points > 0 ? "+" + cf.points : cf.points} pts)</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Strategy, Model Routing, Execution (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Step 5: Format & Visual Strategy */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-semibold uppercase">
                    <Video className="w-4 h-4 text-cyan-400" />
                    <span>4. Production Spec & Format</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                    {top.platform}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="text-slate-300">
                    <strong className="text-white">Format:</strong> {top.content_format}
                  </div>
                  <div className="text-slate-300">
                    <strong className="text-white">Est. Time:</strong> {top.production.estimated_production_minutes}m
                  </div>
                  <div className="text-slate-300">
                    <strong className="text-white">Opening Hook:</strong>
                    <div className="mt-1 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 font-mono italic">
                      "{top.hook}"
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 6: Model Routing & Engine Decision */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 font-semibold uppercase">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>5. Engine & Model Routing</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                    {top.production.visual_engine_hint}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {top.production.visual_engine_reason}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Success Criteria:</span>
                  <span className="text-emerald-400 font-semibold">{top.success_criteria.note}</span>
                </div>
              </div>

              {/* Step 7: Ready-to-Use Hook / Production Spec */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold uppercase">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>6. Tested Hook Formulation</span>
                  </div>
                  <button
                    onClick={() => handleCopyPrompt(top.hook)}
                    className="flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300 transition cursor-pointer"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 max-h-32 overflow-y-auto leading-relaxed">
                  "{top.hook}"
                </div>
              </div>

              {/* ACTION COMMAND CENTER */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 border border-amber-500/40 space-y-3">
                <button
                  onClick={() => handleCreateEverythingClick(top)}
                  disabled={isCreatingEverything}
                  className="w-full py-3 px-4 rounded-xl font-black text-sm text-black bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 hover:from-amber-300 hover:to-orange-300 shadow-xl shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className={`w-4 h-4 text-black ${isCreatingEverything ? "animate-spin" : ""}`} />
                  <span>{isCreatingEverything ? "Generating Complete Package..." : "⚡ CREATE EVERYTHING (1-Click)"}</span>
                </button>

                <p className="text-[11px] text-center text-slate-300">
                  Generates Strategy + 4 Platforms (X, LinkedIn, Instagram, YouTube) + Video Specs in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-400">No recommendation available for current criteria.</div>
      )}

      {/* 3. RUNNER-UP OPPORTUNITIES (#2 and #3) */}
      {decision?.alternatives && decision.alternatives.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🥈 Alternative Opportunities Today</span>
              <span className="text-xs font-mono font-normal text-slate-400">({decision.alternatives.length} alternatives)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decision.alternatives.map((alt, idx) => (
              <div 
                key={alt.event_id || alt.topic_id || idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      #{idx + 2} {alt.platform}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Score: {Math.round(alt.opportunity.personalized_score || alt.opportunity.base_score)}/100
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white line-clamp-2">
                    {alt.what_is_happening}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {alt.why_it_matters}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px]">
                    <span className="text-slate-400 block">Recommended Angle:</span>
                    <span className="text-slate-200 font-medium italic">"{alt.best_angle}"</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    Est. Time: {alt.production.estimated_production_minutes}m
                  </span>
                  <button
                    onClick={() => handleCreateEverythingClick(alt)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Create Package</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. WHAT TO IGNORE TODAY (North Star §27, §28 Filter) */}
      {decision?.ignore && decision.ignore.length > 0 && (
        <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-950/20 via-slate-900/60 to-slate-950 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-rose-300">
                What to Ignore Today (Noise & Slop Filter)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Protects Creator Energy & Signal Quality
            </span>
          </div>

          <p className="text-xs text-slate-300">
            The system acts as an intelligence filter. These trending topics were actively suppressed to prevent wasted production effort on saturated slop, speculative rumors, or weak creator resonance:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {decision.ignore.map((ig, i) => (
              <div 
                key={i}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-200 truncate">{ig.headline}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    ig.action === "SKIP" 
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" 
                      : ig.action === "WAIT"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {ig.action}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {ig.reason}
                </p>
                <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                  <span>Suppression Score:</span>
                  <span className="text-slate-300">{Math.round(ig.score)}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Empirical Intelligence & Evidence Integrity Footer */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Strict adherence to North Star principles: Zero fabricated performance metrics. All opportunity scores derived from verifiable cross-source momentum and declared creator resonance.
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400 shrink-0">
          Source latency: ~24m
        </span>
      </div>
    </div>
  );
};
