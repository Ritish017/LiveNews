import React, { useState } from "react";
import { PipelineStageSummary } from "../../types";
import {
  Layers, ArrowRight, ArrowLeft, CheckCircle2, Clock,
  Filter, Sparkles, AlertCircle
} from "lucide-react";

interface PipelineViewProps {
  pipeline: PipelineStageSummary[];
  loading: boolean;
  onMoveStage: (itemId: string, newStage: string) => void;
  onOpenItem?: (itemId: string) => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  pipeline,
  loading,
  onMoveStage,
  onOpenItem
}) => {
  const [selectedPillarFilter, setSelectedPillarFilter] = useState<string>("All");

  const pillars = ["All", "AI News", "AI Explained", "AI Tools", "AGI / ASI / Future", "AI Memes / Relatable", "AI Experiments"];

  const getNextStage = (currentStage: string): string | null => {
    const idx = pipeline.findIndex(p => p.stage === currentStage);
    if (idx >= 0 && idx < pipeline.length - 1) {
      return pipeline[idx + 1].stage;
    }
    return null;
  };

  const getPrevStage = (currentStage: string): string | null => {
    const idx = pipeline.findIndex(p => p.stage === currentStage);
    if (idx > 0) {
      return pipeline[idx - 1].stage;
    }
    return null;
  };

  return (
    <div className="space-y-6 max-w-full pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>13-STAGE PRODUCTION PIPELINE (§29 & §33)</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Content Lifecycle & Queue
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Full lifecycle tracking: IDEA → RESEARCHING → BRIEF → SCRIPT → PRODUCTION → REVIEW → READY → PUBLISHED → LEARNED.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-mono">
          {pillars.map(p => (
            <button
              key={p}
              onClick={() => setSelectedPillarFilter(p)}
              className={`px-3 py-1 rounded-lg transition shrink-0 ${
                selectedPillarFilter === p
                  ? "bg-amber-500 text-black font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 13-Stage Horizontal Board */}
      <div className="flex items-start space-x-4 overflow-x-auto pb-6 pt-2">
        {pipeline.map((stageSummary, sIdx) => {
          const filteredItems = stageSummary.items.filter(item =>
            selectedPillarFilter === "All" || item.pillar === selectedPillarFilter
          );

          return (
            <div
              key={sIdx}
              className="w-72 bg-[#0c1220] border border-slate-800/80 rounded-2xl p-4 flex flex-col space-y-3 shrink-0 min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                <span className="font-bold text-slate-200 tracking-wide">
                  {stageSummary.stage.replace(/_/g, " ")}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-bold">
                  {filteredItems.length}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {filteredItems.map((item) => {
                  const nextStage = getNextStage(stageSummary.stage);
                  const prevStage = getPrevStage(stageSummary.stage);

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-2.5 shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400">
                          {item.pillar}
                        </span>
                        {item.priority === "HIGH" && (
                          <span className="text-[10px] font-mono text-rose-400 font-bold">
                            HIGH
                          </span>
                        )}
                      </div>

                      <h4
                        onClick={() => onOpenItem && onOpenItem(item.id)}
                        className="text-xs font-bold text-white leading-snug cursor-pointer hover:text-amber-400 transition"
                      >
                        {item.title}
                      </h4>

                      {/* Advance Stage buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono">
                        {prevStage ? (
                          <button
                            onClick={() => onMoveStage(item.id, prevStage)}
                            className="text-slate-500 hover:text-slate-300 flex items-center space-x-0.5 cursor-pointer"
                            title={`Move back to ${prevStage}`}
                          >
                            <ArrowLeft className="w-3 h-3" />
                            <span>Back</span>
                          </button>
                        ) : <span />}

                        {nextStage ? (
                          <button
                            onClick={() => onMoveStage(item.id, nextStage)}
                            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center space-x-1 cursor-pointer"
                            title={`Advance to ${nextStage}`}
                          >
                            <span>Advance</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-emerald-400 flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Complete</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {filteredItems.length === 0 && (
                  <div className="h-32 flex items-center justify-center text-xs font-mono text-slate-600 border border-dashed border-slate-800/80 rounded-xl">
                    No items in {stageSummary.stage.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
