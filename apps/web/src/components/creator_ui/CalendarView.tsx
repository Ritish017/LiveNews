import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  CheckCircle2,
  FileEdit,
  Lightbulb,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { fetchCreatorCalendar } from "../../lib/api";

interface CalendarViewProps {
  onSelectSlotToCreate: (topic: string, contentType: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onSelectSlotToCreate }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadCalendar();
  }, []);

  const loadCalendar = async () => {
    setLoading(true);
    try {
      const res = await fetchCreatorCalendar();
      setData(res);
    } catch (err) {
      console.error("Failed to load calendar data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-fadeIn">
        <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-xs font-mono text-slate-400">Loading publishing schedule...</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Scheduled":
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Scheduled</span>;
      case "Ready to Post":
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Ready to Post</span>;
      case "Draft":
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Draft</span>;
      default:
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">Idea</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 animate-fadeIn pb-32">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-amber-500" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Publishing Schedule
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Target daily cadence for <span className="text-white font-mono">@future.aii__</span>. Optimized for Instagram algorithm distribution.
        </p>
      </div>

      {/* Pacing Banner */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl flex items-start space-x-3 text-xs text-amber-200">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Cadence Philosophy:</strong> {data.pacing_note}
        </div>
      </div>

      {/* Date Today Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-mono text-slate-300 font-semibold">{data.date}</span>
        <span className="text-xs font-mono text-slate-400">4 Posting Slots</span>
      </div>

      {/* Daily Slots List */}
      <div className="space-y-4">
        {data.schedule?.map((item: any, idx: number) => (
          <div
            key={idx}
            className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-start sm:items-center space-x-4">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center shrink-0 min-w-[85px]">
                <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-[11px] font-mono font-bold text-white block">{item.time}</span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  {getStatusBadge(item.status)}
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    {item.pillar}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.format}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>

            <button
              onClick={() => onSelectSlotToCreate(item.title, item.pillar)}
              className="px-3.5 py-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 shrink-0 transition-all border border-slate-700 hover:border-amber-500"
            >
              <span>{item.status === "Scheduled" ? "Edit Slot" : "Create"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
