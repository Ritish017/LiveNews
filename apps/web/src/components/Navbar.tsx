import React from "react";
import {
  Sparkles,
  Compass,
  Zap,
  Calendar,
  BarChart3,
  Sliders,
  Plus,
  RefreshCw
} from "lucide-react";

export type ContentOSTab =
  | "today"
  | "radar"
  | "create"
  | "calendar"
  | "analytics"
  | "pipeline"
  | "newsroom"
  | "opportunities"
  | "studio"
  | "series"
  | "automations"
  | "brand"
  | "graph"
  | "video"
  | "voice"
  | "saved";

interface NavbarProps {
  activeTab: ContentOSTab;
  setActiveTab: (tab: ContentOSTab) => void;
  osMode: "creator" | "advanced";
  setOsMode: (mode: "creator" | "advanced") => void;
  savedCount: number;
  onRefresh: () => void;
  onWhatShouldIPost?: () => void;
  onOpenCreateStudio?: () => void;
  isRefreshing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  osMode,
  setOsMode,
  onRefresh,
  onOpenCreateStudio,
  isRefreshing
}) => {
  return (
    <nav className="border-b border-slate-800 bg-[#070b14]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        {/* Brand Lockup */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#070b14] rounded-[6px] flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-black text-sm tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              FUTURE.AII
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25">
              @future.aii__
            </span>
          </div>
        </div>

        {/* 5 STREAMLINED CORE TABS */}
        <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/80 overflow-x-auto text-xs no-scrollbar">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
              activeTab === "today"
                ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Today</span>
          </button>

          <button
            onClick={() => setActiveTab("radar")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
              activeTab === "radar"
                ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Radar</span>
          </button>

          <button
            onClick={() => setActiveTab("create")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
              activeTab === "create"
                ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Create</span>
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
              activeTab === "calendar"
                ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
              activeTab === "analytics"
                ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
        </div>

        {/* Right Side Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
            title="Refresh Intelligence"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-amber-400" : ""}`} />
          </button>

          <button
            onClick={() => {
              if (onOpenCreateStudio) {
                onOpenCreateStudio();
              } else {
                setActiveTab("create");
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/10 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
            <span>Create Content</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
