import React from "react";
import {
  Flame, RefreshCw, Bookmark, Mic, Globe, Radio,
  Zap, Activity, Share2, Sparkles, SlidersHorizontal, Film,
  Calendar, Layers, MessageSquare, BarChart3, ShieldAlert,
  GitBranch, CheckCircle2, ChevronRight, Sliders
} from "lucide-react";

export type ContentOSTab =
  | "today"
  | "newsroom"
  | "opportunities"
  | "pipeline"
  | "studio"
  | "calendar"
  | "series"
  | "automations"
  | "analytics"
  | "brand"
  | "radar"
  | "news"
  | "graph"
  | "video"
  | "voice"
  | "saved";

interface NavbarProps {
  activeTab: ContentOSTab;
  setActiveTab: (tab: ContentOSTab) => void;
  osMode: "future_aii" | "radar_v3";
  setOsMode: (mode: "future_aii" | "radar_v3") => void;
  savedCount: number;
  onRefresh: () => void;
  onWhatShouldIPost: () => void;
  onOpenCreateStudio?: () => void;
  onOpenFunnel?: () => void;
  isRefreshing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  osMode,
  setOsMode,
  savedCount,
  onRefresh,
  onWhatShouldIPost,
  onOpenCreateStudio,
  onOpenFunnel,
  isRefreshing,
}) => {
  return (
    <nav className="border-b border-slate-800 bg-[#090d16]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        {/* Brand & Mode Switcher */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#090d16] rounded-[6px] flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-black text-sm tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              FUTURE.AII
            </span>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              CONTENT OS
            </span>
          </div>

          {/* Engine Mode Toggle */}
          <div className="hidden lg:flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px] font-mono">
            <button
              onClick={() => {
                setOsMode("future_aii");
                if (["radar", "graph", "video", "voice", "saved"].includes(activeTab)) {
                  setActiveTab("today");
                }
              }}
              className={`px-2 py-0.5 rounded-md transition ${
                osMode === "future_aii"
                  ? "bg-amber-500 text-black font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              @future.aii__
            </button>
            <button
              onClick={() => {
                setOsMode("radar_v3");
                if (["pipeline", "studio", "calendar", "series", "automations", "analytics", "brand"].includes(activeTab)) {
                  setActiveTab("radar");
                }
              }}
              className={`px-2 py-0.5 rounded-md transition ${
                osMode === "radar_v3"
                  ? "bg-slate-800 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Radar V3
            </button>
          </div>
        </div>

        {/* Center Navigation Tabs (Dynamic based on Mode) */}
        <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 overflow-x-auto text-xs no-scrollbar">
          {osMode === "future_aii" ? (
            /* 10 CORE CONTENT OS TABS */
            <>
              <button
                onClick={() => setActiveTab("today")}
                className={`px-2.5 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
                  activeTab === "today"
                    ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20"
                    : "text-amber-400 hover:bg-amber-500/10"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Today</span>
              </button>

              <button
                onClick={() => setActiveTab("newsroom")}
                className={`px-2.5 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
                  activeTab === "newsroom"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Radio className="w-3.5 h-3.5 text-sky-400" />
                <span>Newsroom</span>
              </button>

              <button
                onClick={() => setActiveTab("opportunities")}
                className={`px-2.5 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
                  activeTab === "opportunities"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Radar</span>
              </button>

              <button
                onClick={() => setActiveTab("pipeline")}
                className={`px-2.5 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
                  activeTab === "pipeline"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pipeline</span>
              </button>

              <button
                onClick={() => setActiveTab("studio")}
                className={`px-2.5 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
                  activeTab === "studio"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Studio</span>
              </button>

              <button
                onClick={() => setActiveTab("calendar")}
                className={`px-2.5 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
                  activeTab === "calendar"
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                <span>Calendar</span>
              </button>

              <button
                onClick={() => setActiveTab("series")}
                className={`px-2.5 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
                  activeTab === "series"
                    ? "bg-pink-500/20 text-pink-300 border border-pink-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-pink-400" />
                <span>Series</span>
              </button>

              <button
                onClick={() => setActiveTab("automations")}
                className={`px-2.5 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
                  activeTab === "automations"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>DM Bot</span>
              </button>

              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-2.5 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
                  activeTab === "analytics"
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Analytics</span>
              </button>

              <button
                onClick={() => setActiveTab("brand")}
                className={`px-2.5 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition shrink-0 ${
                  activeTab === "brand"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Brand</span>
              </button>
            </>
          ) : (
            /* RADAR V3 ENGINE TABS */
            <>
              <button
                onClick={() => setActiveTab("radar")}
                className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
                  activeTab === "radar"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Radar</span>
              </button>

              <button
                onClick={() => setActiveTab("news")}
                className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
                  activeTab === "news"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>Global News</span>
              </button>

              <button
                onClick={() => setActiveTab("graph")}
                className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
                  activeTab === "graph"
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Share2 className="w-3.5 h-3.5 text-violet-400" />
                <span>Trend Graph</span>
              </button>

              <button
                onClick={() => setActiveTab("video")}
                className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
                  activeTab === "video"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>Video Director</span>
              </button>

              <button
                onClick={() => setActiveTab("voice")}
                className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition ${
                  activeTab === "voice"
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-indigo-400" />
                <span>My Voice</span>
              </button>

              <button
                onClick={() => setActiveTab("saved")}
                className={`px-3 py-1.5 rounded-lg font-mono font-semibold flex items-center space-x-1.5 transition relative ${
                  activeTab === "saved"
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved</span>
                {savedCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-black font-bold">
                    {savedCount}
                  </span>
                )}
              </button>
            </>
          )}
        </div>

        {/* Action Button: Create / What Should I Post */}
        <div className="flex items-center space-x-2 shrink-0">
          {onOpenFunnel && (
            <button
              onClick={onOpenFunnel}
              className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-500/60 transition cursor-pointer"
              title="North Star Metric: Time to High-Quality Publishable Content"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>42m Funnel</span>
            </button>
          )}

          <button
            onClick={onOpenCreateStudio || onWhatShouldIPost}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 shadow-md transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Create Content</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
