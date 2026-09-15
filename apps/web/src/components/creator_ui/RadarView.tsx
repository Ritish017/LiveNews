import React, { useState, useEffect } from "react";
import {
  Flame,
  Zap,
  Compass,
  AlertTriangle,
  TrendingDown,
  ArrowRight,
  Filter,
  Sparkles,
  Layers,
  CheckCircle2
} from "lucide-react";
import { fetchCreatorRadar } from "../../lib/api";
import { CreatorRadarPayload, CreatorRadarItem } from "../../types";

interface RadarViewProps {
  onSelectTopicToCreate: (topic: string, contentType: string, angle?: string) => void;
}

export const RadarView: React.FC<RadarViewProps> = ({ onSelectTopicToCreate }) => {
  const [data, setData] = useState<CreatorRadarPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "breaking" | "rising" | "under_the_radar" | "saturated" | "declining"
  >("all");

  useEffect(() => {
    loadRadar();
  }, []);

  const loadRadar = async () => {
    setLoading(true);
    try {
      const res = await fetchCreatorRadar();
      setData(res);
    } catch (err) {
      console.error("Failed to load radar items:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-fadeIn">
        <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-xs font-mono text-slate-400">Scanning real-time AI radar signals...</p>
      </div>
    );
  }

  const renderRadarCard = (item: CreatorRadarItem, bucketColor: string, bucketLabel: string) => (
    <div
      key={item.id}
      className="bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition-all space-y-4 group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${bucketColor}`}>
              {bucketLabel}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
              {item.best_content_type}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
            {item.topic}
          </h3>
        </div>

        <button
          onClick={() => onSelectTopicToCreate(item.topic, item.best_content_type, item.recommended_angle)}
          className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-semibold flex items-center space-x-1.5 shrink-0 transition-all shadow-md shadow-amber-500/10 hover:shadow-amber-500/20"
        >
          <span>Create</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">What Happened</span>
          <p className="text-slate-200 leading-relaxed">{item.what_happened}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">Why It Matters</span>
          <p className="text-slate-300 leading-relaxed">{item.why_it_matters}</p>
        </div>
      </div>

      <div className="pt-1 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono text-amber-400 font-semibold">Recommended Angle:</span>
          <span className="text-slate-300 italic">"{item.recommended_angle}"</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 animate-fadeIn pb-32">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-amber-500" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI Intelligence Radar
          </h1>
        </div>
        <p className="text-sm text-slate-400 max-w-2xl">
          What happened, why it matters, and what to post today. Categorized into 5 simple buckets with zero confusing formulas or raw metric clutter.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "All Buckets", count: (data.breaking_now?.length || 0) + (data.rising?.length || 0) + (data.under_the_radar?.length || 0) + (data.saturated?.length || 0) + (data.declining?.length || 0) },
          { id: "breaking", label: "Breaking Now", count: data.breaking_now?.length || 0, color: "text-rose-400" },
          { id: "rising", label: "Rising", count: data.rising?.length || 0, color: "text-amber-400" },
          { id: "under_the_radar", label: "Under the Radar", count: data.under_the_radar?.length || 0, color: "text-indigo-400" },
          { id: "saturated", label: "Saturated", count: data.saturated?.length || 0, color: "text-amber-500/80" },
          { id: "declining", label: "Declining", count: data.declining?.length || 0, color: "text-slate-400" }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 ${
              activeFilter === filter.id
                ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/10"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <span className={activeFilter === filter.id ? "text-slate-950" : filter.color}>{filter.label}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeFilter === filter.id ? "bg-slate-950/20 text-slate-950" : "bg-slate-800 text-slate-400"
              }`}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bucket 1: BREAKING NOW */}
      {(activeFilter === "all" || activeFilter === "breaking") && data.breaking_now?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <h2 className="text-sm font-mono uppercase font-bold text-rose-400 tracking-wider">
              1. Breaking Now (Last 6-12 Hours)
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.breaking_now.map(item =>
              renderRadarCard(item, "bg-rose-500/10 text-rose-400 border-rose-500/20", "Breaking")
            )}
          </div>
        </div>
      )}

      {/* Bucket 2: RISING */}
      {(activeFilter === "all" || activeFilter === "rising") && data.rising?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-mono uppercase font-bold text-amber-400 tracking-wider">
              2. Rising (Momentum Accelerating)
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.rising.map(item =>
              renderRadarCard(item, "bg-amber-500/10 text-amber-400 border-amber-500/20", "Rising")
            )}
          </div>
        </div>
      )}

      {/* Bucket 3: UNDER THE RADAR */}
      {(activeFilter === "all" || activeFilter === "under_the_radar") && data.under_the_radar?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-mono uppercase font-bold text-indigo-400 tracking-wider">
              3. Under The Radar (Early Alpha / Hidden Gems)
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.under_the_radar.map(item =>
              renderRadarCard(item, "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", "Alpha")
            )}
          </div>
        </div>
      )}

      {/* Bucket 4: SATURATED */}
      {(activeFilter === "all" || activeFilter === "saturated") && data.saturated?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-mono uppercase font-bold text-amber-500 tracking-wider">
              4. Saturated (High Competition — Use Contrarian Angle Only)
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.saturated.map(item =>
              renderRadarCard(item, "bg-amber-500/10 text-amber-500 border-amber-500/20", "Saturated")
            )}
          </div>
        </div>
      )}

      {/* Bucket 5: DECLINING */}
      {(activeFilter === "all" || activeFilter === "declining") && data.declining?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-mono uppercase font-bold text-slate-400 tracking-wider">
              5. Declining (Fading Interest — Avoid Unless Inverting)
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.declining.map(item =>
              renderRadarCard(item, "bg-slate-800 text-slate-400 border-slate-700", "Declining")
            )}
          </div>
        </div>
      )}
    </div>
  );
};
