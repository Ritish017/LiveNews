import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Flame,
  Zap,
  ArrowRight,
  Clock,
  CheckCircle2,
  Lightbulb,
  Search,
  Layers,
  Plus
} from "lucide-react";
import { fetchCreatorToday } from "../../lib/api";
import { CreatorTodayPayload, CreatorTodayRecommendation } from "../../types";

interface TodayViewProps {
  onSelectRecommendation: (rec: CreatorTodayRecommendation) => void;
  onNavigateToCreate: (topic?: string, contentType?: string) => void;
  onNavigateToRadar: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  onSelectRecommendation,
  onNavigateToCreate,
  onNavigateToRadar
}) => {
  const [data, setData] = useState<CreatorTodayPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadTodayData();
  }, []);

  const loadTodayData = async () => {
    setLoading(true);
    try {
      const res = await fetchCreatorToday();
      setData(res);
    } catch (err) {
      console.error("Failed to load today data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-fadeIn">
        <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-xs font-mono text-slate-400">Loading today's creator intelligence...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4 animate-fadeIn pb-24">
      {/* 1. Brand Hero Header (§59) */}
      <div className="space-y-4 border-b border-slate-800/80 pb-8">
        <div className="flex items-center space-x-2.5">
          <span className="font-black tracking-tight text-white font-mono text-base">
            FUTURE.AII
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            AI CONTENT OS
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Good morning. <br />
          <span className="text-slate-400 font-semibold text-2xl sm:text-3xl">
            {data.greeting || "What should we create today?"}
          </span>
        </h1>

        {/* 3 Large Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              if (data.recommendations && data.recommendations.length > 0) {
                onSelectRecommendation(data.recommendations[0]);
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs font-mono transition flex items-center space-x-2 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-black" />
            <span>WHAT SHOULD I POST?</span>
          </button>

          <button
            onClick={() => onNavigateToCreate()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono border border-slate-800 hover:border-slate-700 transition flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>CREATE CONTENT</span>
          </button>

          <button
            onClick={onNavigateToRadar}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs font-mono border border-slate-800 hover:border-slate-700 transition flex items-center space-x-2 cursor-pointer"
          >
            <Search className="w-4 h-4 text-sky-400" />
            <span>FIND AI NEWS</span>
          </button>
        </div>
      </div>

      {/* 2. WHAT SHOULD I POST TODAY? (3-5 Plain Language Cards §3) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            WHAT SHOULD I POST TODAY?
          </h2>
          <span className="text-[11px] font-mono text-slate-500">
            {data.recommendations?.length || 3} Plain Recommendations
          </span>
        </div>

        <div className="space-y-4">
          {data.recommendations?.map((rec: CreatorTodayRecommendation, idx: number) => (
            <div
              key={rec.id || idx}
              className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 shadow-xl space-y-4 group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  {rec.badge}
                </span>

                <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                  <span>Format: <strong className="text-white">{rec.format}</strong></span>
                  <span>•</span>
                  <span>Type: <strong className="text-amber-400">{rec.content_type}</strong></span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition">
                  "{rec.title}"
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
                  <strong className="text-slate-400 font-mono">Why: </strong>
                  {rec.why}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
                <span className="text-[11px] font-mono text-slate-400">
                  Ready to compile complete production package
                </span>

                <button
                  onClick={() => onSelectRecommendation(rec)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono transition flex items-center space-x-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <span>{rec.action_label || "CREATE EVERYTHING"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TODAY'S BEST IDEAS (§59) */}
      {data.best_ideas?.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-800/80">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
            TODAY'S BEST IDEAS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.best_ideas.map((idea, i) => (
              <div
                key={i}
                onClick={() => onNavigateToCreate(idea.title, idea.type)}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/70 hover:border-slate-700 cursor-pointer transition space-y-1"
              >
                <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  #{idea.rank} • {idea.type}
                </div>
                <div className="text-xs font-semibold text-slate-200 line-clamp-2">
                  {idea.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. CONTENT QUEUE (§59) */}
      {data.content_queue_today?.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              CONTENT QUEUE (TODAY)
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">On Schedule</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.content_queue_today.map((slot, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">{slot.time}</span>
                  <span className="text-amber-400 font-semibold">{slot.pillar}</span>
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {slot.title}
                </div>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{slot.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. CREATOR LEARNING BOX (§59) */}
      {data.creator_learning && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/30 flex items-start space-x-3.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-indigo-300 uppercase font-bold tracking-wider">
              CREATOR LEARNING LOOP
            </div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
              "{data.creator_learning}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
