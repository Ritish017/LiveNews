import React, { useState } from "react";
import {
  X,
  Layers,
  Sparkles,
  Film,
  FileText,
  Share2,
  Tv,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  Send,
  Sliders
} from "lucide-react";
import { ContentClusterPackage, ClusterPiece } from "../../types";

interface ClusterModalProps {
  cluster: ContentClusterPackage | null | any;
  isOpen: boolean;
  onClose: () => void;
  onOpenStudioForItem?: (item: any) => void;
}

export const ClusterModal: React.FC<ClusterModalProps> = ({
  cluster,
  isOpen,
  onClose,
  onOpenStudioForItem
}) => {
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen || !cluster) return null;

  const items = cluster.pieces || cluster.items || [];
  const activeItem = items[selectedItemIdx] || items[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Reel":
        return <Film className="w-4 h-4 text-amber-400" />;
      case "Carousel":
        return <Layers className="w-4 h-4 text-sky-400" />;
      case "Story":
        return <Sparkles className="w-4 h-4 text-pink-400" />;
      case "X Post":
        return <Share2 className="w-4 h-4 text-emerald-400" />;
      case "YouTube Short":
        return <Tv className="w-4 h-4 text-rose-400" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#090d16] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                §9 & §51 ONE EVENT → 10-PIECE CONTENT CLUSTER
              </span>
              <span className="text-xs font-mono text-slate-400">
                Event ID: {cluster.event_id}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1 leading-snug">
              {cluster.event_title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left sidebar list (10 pieces) + Right preview panel */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3">
          {/* Left Column: 10 Synchronized Content Pieces */}
          <div className="border-r border-slate-800 overflow-y-auto p-3 space-y-1.5 bg-slate-950/40">
            <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400 font-bold">
              Synchronized 10-Piece Cluster:
            </div>
            {items.map((item: any, idx: number) => {
              const isSelected = idx === selectedItemIdx;
              return (
                <button
                  key={item.id || idx}
                  onClick={() => setSelectedItemIdx(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-start space-x-3 cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 border-amber-500/50 shadow-md"
                      : "bg-slate-900/30 border-slate-800/60 hover:bg-slate-900/60 hover:border-slate-700"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-800/80 shrink-0 mt-0.5">
                    {getFormatIcon(item.format)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-amber-400 font-semibold">{item.format}</span>
                      <span className="text-slate-400 font-mono">#{idx + 1}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-200 truncate mt-0.5">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      Pillar: {item.pillar}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Piece Detailed Inspect & Launch */}
          <div className="md:col-span-2 overflow-y-auto p-6 space-y-5">
            {activeItem ? (
              <>
                {/* Meta details */}
                <div className="space-y-3 pb-4 border-b border-slate-800">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      {activeItem.format}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      Pillar: {activeItem.pillar}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      Platform: {activeItem.platform || "Instagram"}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      Goal: {activeItem.goal || "Reach"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {activeItem.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <span className="text-slate-400 font-mono font-bold">Angle:</span>{" "}
                    {activeItem.angle || activeItem.recommended_angle || "Practical takeaway"}
                  </p>
                </div>

                {/* Hook Box */}
                {activeItem.hook && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                        Selected Hook (First 2.0s):
                      </span>
                      <button
                        onClick={() => handleCopy(activeItem.hook, "hook")}
                        className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        {copiedId === "hook" ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === "hook" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <p className="text-sm font-bold text-white italic">
                      "{activeItem.hook}"
                    </p>
                  </div>
                )}

                {/* Script / Body Box */}
                {activeItem.script && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-sky-400 font-bold uppercase">
                        Script Breakdown:
                      </span>
                      <button
                        onClick={() => handleCopy(activeItem.script, "script")}
                        className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        {copiedId === "script" ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === "script" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                      {activeItem.script}
                    </pre>
                  </div>
                )}

                {/* Caption & Comment CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      Call to Action (CTA)
                    </span>
                    <p className="text-xs font-semibold text-slate-200">
                      {activeItem.cta || "Comment AGENT and I'll send the prompt"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                      Comment Trigger Keyword
                    </span>
                    <p className="text-xs font-mono font-bold text-white">
                      {activeItem.comment_trigger || "AGENT"}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    Piece {selectedItemIdx + 1} of {items.length} in this cluster
                  </div>

                  <div className="flex items-center space-x-3">
                    {onOpenStudioForItem && (
                      <button
                        onClick={() => onOpenStudioForItem(activeItem)}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold transition flex items-center space-x-1.5"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Customize in Studio</span>
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono transition flex items-center space-x-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Into Pipeline</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs font-mono">
                No items in cluster.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
