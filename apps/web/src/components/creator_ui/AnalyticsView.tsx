import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Eye,
  CheckCircle2,
  Bookmark,
  Share2,
  Lightbulb,
  Zap,
  ArrowUpRight
} from "lucide-react";
import { fetchCreatorAnalytics } from "../../lib/api";

export const AnalyticsView: React.FC = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetchCreatorAnalytics();
      setData(res);
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-fadeIn">
        <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-xs font-mono text-slate-400">Loading performance intelligence...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-fadeIn pb-32">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-amber-500" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Creator Performance & Learnings
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Account intelligence for <span className="text-white font-mono">{data.account}</span>. High-signal learnings to refine future content.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Views (30 Days)</span>
            <Eye className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
            {(data.overall_views_30d / 1000000).toFixed(2)}M
          </div>
          <p className="text-[11px] text-emerald-400 font-mono flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+24.8% vs previous month</span>
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Avg Completion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
            {data.average_completion_rate}
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Target benchmark: &gt; 55%
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Top Performing Pillar</span>
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
            {data.top_performing_pillar}
          </div>
          <p className="text-[11px] text-indigo-300 font-mono">
            Highest save-to-reach ratio
          </p>
        </div>
      </div>

      {/* Key Learnings (Plain Language Insights) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
          <Lightbulb className="w-4 h-4" />
          <span>Actionable Creator Learnings</span>
        </div>

        <div className="space-y-3">
          {data.key_learnings?.map((learning: string, idx: number) => (
            <div
              key={idx}
              className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl text-sm text-slate-200 leading-relaxed flex items-start space-x-3"
            >
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{learning}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Performing Formats */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <BarChart3 className="w-4 h-4" />
            <span>Format Performance Comparison</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Past 90 Days</span>
        </div>

        <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden">
          {data.best_performing_formats?.map((fmt: any, idx: number) => (
            <div key={idx} className="p-4 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-white text-sm">{fmt.format}</span>
              <div className="flex items-center space-x-4 font-mono text-slate-300">
                {fmt.avg_views && <span>Views: <strong className="text-amber-400">{fmt.avg_views}</strong></span>}
                {fmt.retention && <span>Retention: <strong className="text-emerald-400">{fmt.retention}</strong></span>}
                {fmt.avg_saves && <span>Saves: <strong className="text-indigo-400">{fmt.avg_saves}</strong></span>}
                {fmt.shares && <span>Shares: <strong className="text-blue-400">{fmt.shares}</strong></span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
