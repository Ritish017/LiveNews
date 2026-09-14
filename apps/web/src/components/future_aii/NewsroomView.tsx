import React, { useState } from "react";
import { V3Event, RankedContentOpportunity } from "../../types";
import {
  Globe, ShieldCheck, Zap, Sparkles, Layers, Search, Filter,
  ArrowRight, ExternalLink, RefreshCw, Flame, CheckCircle2, AlertTriangle
} from "lucide-react";

interface NewsroomViewProps {
  events: V3Event[];
  loading: boolean;
  onTurnIntoContent: (title: string, summary: string) => void;
  onTurnIntoCluster: (title: string, summary: string, id: string) => void;
  onRefresh: () => void;
}

export const NewsroomView: React.FC<NewsroomViewProps> = ({
  events,
  loading,
  onTurnIntoContent,
  onTurnIntoCluster,
  onRefresh
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "AI Models", "Coding Agents", "Generative Audio", "AI Safety & Policy", "Research"];

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      (e.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (e.summary?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesCategory = selectedCategory === "All" || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Newsroom Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            <span>GLOBAL AI NEWSROOM // VERIFIED INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Live AI Developments & Verification Stream
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Continuous ingestion via Firecrawl, arXiv, and official repositories. Clustered into single canonical events.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex items-center space-x-1.5 shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Newsroom</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0c1220] p-3 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search AI events, models, repos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition shrink-0 ${
                selectedCategory === cat
                  ? "bg-amber-500 text-black font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Stream */}
      <div className="space-y-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0e1524] to-[#090d16] border border-slate-800 hover:border-slate-700 transition space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  {evt.category}
                </span>

                {evt.status === "CONFIRMED" ? (
                  <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED ({evt.confidence_score}%)</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
                    <AlertTriangle className="w-3 h-3" />
                    <span>DEVELOPING</span>
                  </span>
                )}

                <span className="text-[11px] font-mono text-slate-400">
                  {evt.source_count} Sources ({evt.independent_source_count} Independent)
                </span>
              </div>

              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="text-slate-400">Opportunity:</span>
                <strong className="text-amber-400 text-sm">{evt.opportunity_score}/100</strong>
              </div>
            </div>

            {/* Title & Summary */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white leading-snug">
                {evt.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {evt.summary}
              </p>
            </div>

            {/* Key Claims */}
            {evt.key_facts && evt.key_facts.length > 0 && (
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs">
                <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">
                  Verified Key Claims (§23 Factual Grounding)
                </span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  {evt.key_facts.slice(0, 3).map((f, fIdx) => (
                    <li key={fIdx}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sources & Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex items-center space-x-2 text-slate-400 font-mono">
                <span>Primary Source:</span>
                <strong className="text-slate-200">{evt.primary_source_name || "Official"}</strong>
                {evt.primary_source_url && (
                  <a
                    href={evt.primary_source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 ml-1 inline-flex items-center space-x-0.5"
                  >
                    <span>Paper / Docs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onTurnIntoContent(evt.title, evt.summary)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-black bg-amber-500 hover:bg-amber-400 transition flex items-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CREATE CONTENT</span>
                </button>

                <button
                  onClick={() => onTurnIntoCluster(evt.title, evt.summary, evt.id)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/50 transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>1-CLICK CLUSTER</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
