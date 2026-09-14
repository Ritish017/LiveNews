import React, { useState } from "react";
import { RankedContentOpportunity } from "../../types";
import {
  Flame, Sparkles, Layers, ArrowRight, ShieldCheck, Clock,
  ChevronDown, ChevronUp, CheckCircle2, AlertCircle
} from "lucide-react";

interface OpportunitiesViewProps {
  opportunities: RankedContentOpportunity[];
  loading: boolean;
  onTurnIntoContent: (opp: RankedContentOpportunity) => void;
  onTurnIntoCluster: (opp: RankedContentOpportunity) => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  opportunities,
  loading,
  onTurnIntoContent,
  onTurnIntoCluster
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(opportunities[0]?.id || null);

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "POST_NOW":
        return "bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-md shadow-rose-500/10";
      case "POST_TODAY":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-md shadow-amber-500/10";
      case "POST_THIS_WEEK":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/50";
      case "WATCH":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-2 text-xs font-mono text-rose-400 font-bold uppercase tracking-wider mb-1">
          <Flame className="w-4 h-4" />
          <span>11-FACTOR CONTENT OPPORTUNITY ENGINE (§7 & §8)</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Ranked Daily Content Opportunities
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Every event evaluated on freshness, momentum, audience fit, content gaps, saturation, and creator fit.
        </p>
      </div>

      {/* Opportunity Cards List */}
      <div className="space-y-4">
        {opportunities.map((opp, idx) => {
          const isExpanded = expandedId === opp.id;
          const scores = opp.scores;

          return (
            <div
              key={opp.id}
              className={`rounded-2xl border transition overflow-hidden ${
                isExpanded
                  ? "bg-[#0d1424] border-amber-500/40 shadow-2xl"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : opp.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-start sm:items-center space-x-3">
                  <div className="h-9 w-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-black text-amber-400 text-sm shrink-0">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getUrgencyBadge(scores.urgency)}`}>
                        {scores.urgency}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {scores.recommended_pillar} • {scores.recommended_series}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {opp.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-center shrink-0">
                  <div className="text-right font-mono">
                    <span className="text-[10px] text-slate-500 block uppercase">Opportunity Score</span>
                    <strong className="text-lg font-black text-amber-400">{scores.total_opportunity_score}</strong>
                    <span className="text-xs text-slate-500">/100</span>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded 11-Factor Telemetry */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-5">
                  <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                    {opp.summary}
                  </p>

                  {/* 11 Factors Radar Grid */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      11-Factor Score Breakdown
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-500 block">Freshness</span>
                        <strong className="text-cyan-400">{scores.freshness}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-500 block">Momentum</span>
                        <strong className="text-amber-400">{scores.momentum}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-500 block">Relevance</span>
                        <strong className="text-emerald-400">{scores.relevance}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-500 block">Audience Fit</span>
                        <strong className="text-white">{scores.audience_fit}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-500 block">Novelty</span>
                        <strong className="text-violet-400">{scores.novelty}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-500 block">Content Gap</span>
                        <strong className="text-rose-400">{scores.content_gap}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Angle & Urgency Reason */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">
                        Recommended Angle
                      </span>
                      <p className="text-amber-300 font-semibold">
                        "{scores.recommended_angle}"
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">
                        Urgency Rationale
                      </span>
                      <p className="text-slate-300">
                        {scores.urgency_reason}
                      </p>
                    </div>
                  </div>

                  {/* Alternative Angles */}
                  {opp.alternative_angles && opp.alternative_angles.length > 0 && (
                    <div className="space-y-1.5 text-xs">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold">
                        Alternative Creative Angles (§65)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                        {opp.alternative_angles.map((ang, aIdx) => (
                          <div key={aIdx} className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/80 text-slate-300">
                            • {ang}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() => onTurnIntoCluster(opp)}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/50 transition flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>1-CLICK CLUSTER (10 PIECES)</span>
                    </button>

                    <button
                      onClick={() => onTurnIntoContent(opp)}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-black bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition shadow-md flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>CREATE CONTENT PACKAGE</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
