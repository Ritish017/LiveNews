import React from "react";
import { Calendar30DayView } from "../../types";
import {
  Calendar as CalendarIcon, Clock, CheckCircle2,
  BarChart2, ArrowRight
} from "lucide-react";

interface CalendarViewProps {
  calendar: Calendar30DayView | null;
  loading: boolean;
  onOpenSlot?: (contentId?: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  calendar,
  loading,
  onOpenSlot
}) => {
  if (loading || !calendar) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-slate-400">Loading 30-day dynamic calendar...</p>
      </div>
    );
  }

  const getPillarColor = (pillar: string) => {
    switch (pillar) {
      case "AI News": return "border-amber-500/40 bg-amber-500/10 text-amber-300";
      case "AI Explained": return "border-cyan-500/40 bg-cyan-500/10 text-cyan-300";
      case "AI Tools": return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
      case "AGI / ASI / Future": return "border-rose-500/40 bg-rose-500/10 text-rose-300";
      case "AI Memes / Relatable": return "border-orange-500/40 bg-orange-500/10 text-orange-300";
      case "AI Experiments": return "border-violet-500/40 bg-violet-500/10 text-violet-300";
      default: return "border-slate-700 bg-slate-800 text-slate-300";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>30-DAY CONTENT CALENDAR (§30 & §31)</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Pillar-Balanced Publishing Schedule
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dynamically balancing 7 core engines (News 25%, Explained 20%, Tools 15%, Experiments 10%, Future 10%, Memes 10%).
          </p>
        </div>
      </div>

      {/* 7-Pillar Balance Strip */}
      <div className="p-5 rounded-2xl bg-[#0c1220] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center space-x-1.5">
            <BarChart2 className="w-4 h-4 text-amber-400" />
            <span>Pillar Target Distribution Balance</span>
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">OPTIMIZED (100%)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs font-mono">
          {Object.entries(calendar.pillar_distribution).map(([p, pct]) => (
            <div key={p} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block truncate">{p}</span>
              <div className="flex items-baseline justify-between">
                <strong className="text-amber-400 text-sm">{pct}%</strong>
                <span className="text-[10px] text-slate-500">Target {calendar.target_distribution[p] || 10}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {calendar.slots.map((slot, idx) => (
          <div
            key={idx}
            onClick={() => onOpenSlot && onOpenSlot(slot.content_id)}
            className="p-4 rounded-2xl bg-gradient-to-b from-[#0d1424] to-[#090d16] border border-slate-800 hover:border-slate-700 transition space-y-2.5 shadow-md flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <strong className="text-white">{slot.date_str}</strong>
                <span className="text-slate-400">{slot.day_of_week.slice(0, 3)}</span>
              </div>

              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getPillarColor(slot.pillar)}`}>
                {slot.pillar}
              </span>

              <h4 className="text-xs font-bold text-slate-200 leading-snug line-clamp-2">
                {slot.title}
              </h4>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
              <span>{slot.time_slot} UTC • {slot.format}</span>
              <span className="text-emerald-400 font-bold">{slot.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
