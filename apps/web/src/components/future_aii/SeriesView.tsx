import React, { useState } from "react";
import { SeriesDefinition } from "../../types";
import {
  Film, Sparkles, Clock, ArrowRight, BarChart2,
  CheckCircle2, Plus
} from "lucide-react";

interface SeriesViewProps {
  seriesList: SeriesDefinition[];
  loading: boolean;
  onCreateSeriesEpisode: (seriesName: string, pillar: string) => void;
}

export const SeriesView: React.FC<SeriesViewProps> = ({
  seriesList,
  loading,
  onCreateSeriesEpisode
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const pillars = ["All", "AI News", "AI Explained", "AI Tools", "AGI / ASI / Future", "AI Memes / Relatable", "AI Experiments"];

  const filteredSeries = seriesList.filter(s =>
    selectedFilter === "All" || s.pillar === selectedFilter
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
            <Film className="w-4 h-4" />
            <span>RECURRING SERIES ENGINE (§5)</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Recognizable Episodic Formats
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Building brand equity with recurring, expected series rather than one-off disconnected posts.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-mono">
          {pillars.map(p => (
            <button
              key={p}
              onClick={() => setSelectedFilter(p)}
              className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
                selectedFilter === p
                  ? "bg-amber-500 text-black font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Series Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSeries.map((s) => (
          <div
            key={s.id}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#0c1220] to-[#090d16] border border-slate-800 hover:border-slate-700 transition space-y-4 flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {s.pillar}
                </span>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                  {s.cadence.toUpperCase()} • {s.target_format}
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-white tracking-wide">
                  {s.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {s.description}
                </p>
              </div>

              {/* Hook formula */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 text-xs">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                  Signature Hook Formula
                </span>
                <p className="text-amber-300 font-mono text-[11px] italic">
                  "{s.hook_formula}"
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-3 text-slate-400">
                <span>Ret: <strong className="text-white">{s.average_retention}%</strong></span>
                <span>•</span>
                <span>Shares: <strong className="text-white">{s.average_shares}</strong></span>
              </div>

              <button
                onClick={() => onCreateSeriesEpisode(s.name, s.pillar)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-black bg-amber-500 hover:bg-amber-400 transition flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Episode</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
