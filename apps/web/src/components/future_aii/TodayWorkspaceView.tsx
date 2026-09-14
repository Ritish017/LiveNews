import React, { useState } from "react";
import {
  TodayWorkspacePayload,
  ContentAssetPackage,
  RankedContentOpportunity,
  ContentClusterPackage
} from "../../types";
import {
  Sparkles, Flame, Clock, CheckCircle2, MessageSquare, ArrowRight,
  ShieldAlert, Send, Eye, RefreshCw, BarChart2, BookOpen, Layers
} from "lucide-react";

interface TodayWorkspaceViewProps {
  workspace: TodayWorkspacePayload | null;
  loading: boolean;
  onOpenContentPackage: (pkg: ContentAssetPackage) => void;
  onTurnIntoCluster: (opp: RankedContentOpportunity) => void;
  onRefresh: () => void;
}

export const TodayWorkspaceView: React.FC<TodayWorkspaceViewProps> = ({
  workspace,
  loading,
  onOpenContentPackage,
  onTurnIntoCluster,
  onRefresh
}) => {
  const [scheduledSuccess, setScheduledSuccess] = useState<boolean>(false);

  if (loading || !workspace) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-mono text-slate-400">
          Syncing future.aii__ Morning Mission Control...
        </p>
      </div>
    );
  }

  const starOpp = workspace.star_opportunity;
  const starPkg = workspace.ready_content_packages[0];

  const handleApproveAndSchedule = () => {
    setScheduledSuccess(true);
    setTimeout(() => setScheduledSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Welcome & Mission Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            <span>FUTURE.AII CONTENT OS // MORNING BRIEFING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {workspace.greeting}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            "What is the best content future.aii__ can publish today, why should we publish it, and can you prepare everything required to publish it?"
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onRefresh}
            className="px-3 py-2 rounded-xl text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex items-center space-x-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Rescan Radar</span>
          </button>
        </div>
      </div>

      {/* #1 STAR OPPORTUNITY CARD — NORTH STAR ANSWER */}
      {starOpp && starPkg && (
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 bg-gradient-to-b from-[#121927] via-[#090d16] to-[#090d16] shadow-2xl p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md shadow-amber-500/20">
                ⭐ #1 BEST CONTENT TO POST TODAY
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                {starOpp.scores.urgency}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-800 text-amber-300 font-bold">
                Score: {starOpp.scores.total_opportunity_score}/100
              </span>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Target Slot: <strong className="text-white">Today 19:30 UTC</strong>
            </div>
          </div>

          {/* Story Title & Strategy */}
          <div className="space-y-3 mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              {starOpp.title}
            </h2>
            <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
              {starOpp.summary}
            </p>
          </div>

          {/* Tactical Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 mb-6 text-xs font-mono">
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Recommended Pillar</span>
              <strong className="text-amber-400 text-sm">{starOpp.scores.recommended_pillar}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Series</span>
              <strong className="text-cyan-400 text-sm">{starOpp.scores.recommended_series}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Format & Duration</span>
              <strong className="text-white text-sm">30-sec Reel (9:16)</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Primary Audience</span>
              <strong className="text-slate-200 text-sm">AI Devs & Builders</strong>
            </div>
          </div>

          {/* Hook & Angle Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">
                Selected Hook Formula
              </span>
              <p className="text-sm font-semibold text-white italic">
                "{starPkg.selected_hook}"
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">
                Strategic Angle & Takeaway
              </span>
              <p className="text-sm font-semibold text-slate-200">
                {starOpp.scores.recommended_angle}
              </p>
            </div>
          </div>

          {/* Readiness Checklist (§49) */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap gap-y-2 py-3 border-t border-slate-800 text-xs font-mono text-slate-400 mb-6">
            <span className="flex items-center space-x-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Script [READY]</span>
            </span>
            <span className="flex items-center space-x-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Visual Plan [READY]</span>
            </span>
            <span className="flex items-center space-x-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Remotion Code [READY]</span>
            </span>
            <span className="flex items-center space-x-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Caption & CTA [READY]</span>
            </span>
            <span className="flex items-center space-x-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Comment → DM [READY]</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            <button
              onClick={() => onOpenContentPackage(starPkg)}
              className="px-6 py-3 rounded-xl text-xs font-mono font-bold text-black bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition shadow-xl shadow-amber-500/20 flex items-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>OPEN FULL 18-PIECE CONTENT PACKAGE</span>
            </button>

            <button
              onClick={handleApproveAndSchedule}
              className={`px-5 py-3 rounded-xl text-xs font-mono font-bold transition flex items-center space-x-2 cursor-pointer ${
                scheduledSuccess
                  ? "bg-emerald-500 text-black font-black"
                  : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{scheduledSuccess ? "SCHEDULED FOR 19:30 UTC" : "APPROVE & SCHEDULE (19:30)"}</span>
            </button>

            <button
              onClick={() => onTurnIntoCluster(starOpp)}
              className="px-4 py-3 rounded-xl text-xs font-mono font-bold text-cyan-400 bg-cyan-950/30 border border-cyan-500/30 hover:bg-cyan-900/40 transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>TURN INTO 10-PIECE CLUSTER</span>
            </button>
          </div>
        </div>
      )}

      {/* 3-COLUMN DASHBOARD SECTION: OPPORTUNITIES, TODAY'S SCHEDULE, LEARNINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Ranked Content Opportunities */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-400 uppercase">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Today's Opportunity Radar</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              {workspace.top_opportunities.length} Ranked
            </span>
          </div>

          <div className="space-y-3">
            {workspace.top_opportunities.map((opp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                    #{idx + 1} {opp.scores.recommended_pillar}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {opp.scores.total_opportunity_score} pts
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                  {opp.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {opp.summary}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                  <span className="text-amber-400">{opp.scores.recommended_series}</span>
                  <button
                    onClick={() => onTurnIntoCluster(opp)}
                    className="text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Cluster</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Today's Schedule & 7-Pillar Balance */}
        <div className="space-y-6">
          {/* Today's Schedule Slots */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-400 uppercase">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Today's Publishing Schedule</span>
            </div>

            <div className="space-y-3">
              {workspace.today_schedule_slots.map((slot, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-mono">
                      <strong className="text-amber-400">{slot.time_slot} UTC</strong>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300 font-semibold">{slot.format}</span>
                    </div>
                    <h5 className="text-xs font-bold text-white">{slot.title}</h5>
                    <span className="text-[10px] font-mono text-slate-400 block">{slot.pillar}</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {slot.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Pillar Balance */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center space-x-1.5">
                <BarChart2 className="w-4 h-4 text-amber-400" />
                <span>7-Pillar Content Distribution</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400">BALANCED</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {Object.entries(workspace.pillar_balance).map(([pName, pct]) => (
                <div key={pName} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300">{pName}</span>
                    <span className="text-slate-400">{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                      style={{ width: `${pct * 3}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Yesterday's Lessons & Engagement Tasks */}
        <div className="space-y-6">
          {/* Yesterday's Learnings */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-400 uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Yesterday's Empirical Lessons</span>
            </div>

            <div className="space-y-2.5">
              {workspace.yesterday_learnings.map((lesson, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  💡 {lesson}
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Tasks (§43 & §44) */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Engagement Action Tasks</span>
              </span>
              <span className="text-[10px] font-mono text-amber-400">2 Pending</span>
            </div>

            <div className="space-y-2 text-xs">
              {workspace.engagement_tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <p className="text-slate-200 font-medium">{task.task}</p>
                    <span className="text-[10px] font-mono text-slate-500">{task.estimated_time}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300">
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
