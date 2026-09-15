import React, { useState } from "react";
import { Navbar, ContentOSTab } from "./components/Navbar";
import { TodayView } from "./components/creator_ui/TodayView";
import { CreateView } from "./components/creator_ui/CreateView";
import { ResultView } from "./components/creator_ui/ResultView";
import { RadarView } from "./components/creator_ui/RadarView";
import { CalendarView as CreatorCalendarView } from "./components/creator_ui/CalendarView";
import { AnalyticsView as CreatorAnalyticsView } from "./components/creator_ui/AnalyticsView";
import { createCreatorContent } from "./lib/api";
import { CreatorUniversalPackage, CreatorTodayRecommendation } from "./types";
import { AlertCircle, Sparkles } from "lucide-react";

export function App() {
  const [activeTab, setActiveTab] = useState<ContentOSTab>("today");
  const [osMode, setOsMode] = useState<"creator" | "advanced">("creator");
  const [activePackage, setActivePackage] = useState<CreatorUniversalPackage | null>(null);
  const [initialCreateTopic, setInitialCreateTopic] = useState<string>("");
  const [initialCreateEngine, setInitialCreateEngine] = useState<string>("AI Tools");
  const [isCreatingPackage, setIsCreatingPackage] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle generating content from any entry point
  const handleCreateContent = async (params: {
    content_type: string;
    topic: string;
    angle?: string;
    format_type?: string;
    style?: string;
    duration_sec?: number;
    free_first?: boolean;
  }) => {
    setIsCreatingPackage(true);
    setError(null);
    try {
      const res = await createCreatorContent({
        content_type: params.content_type,
        topic: params.topic,
        angle: params.angle,
        format_type: params.format_type || "Reel",
        style: params.style || "Cinematic Dark Tech",
        duration_sec: params.duration_sec || 30,
        free_first: params.free_first !== undefined ? params.free_first : true
      });
      setActivePackage(res);
    } catch (err: any) {
      console.error("Failed to create creator content:", err);
      setError(err?.message || "Failed to compile content package. Please try again.");
    } finally {
      setIsCreatingPackage(false);
    }
  };

  // From Today view recommendation click
  const handleSelectRecommendation = (rec: CreatorTodayRecommendation) => {
    handleCreateContent({
      content_type: rec.content_type || "AI News",
      topic: rec.topic || rec.title,
      angle: rec.why,
      format_type: rec.format?.includes("Carousel") ? "Carousel" : "Reel",
      duration_sec: 30,
      free_first: true
    });
  };

  // Navigate to create with prefilled values
  const handleNavigateToCreate = (topic?: string, contentType?: string) => {
    if (topic) setInitialCreateTopic(topic);
    if (contentType) setInitialCreateEngine(contentType);
    setActivePackage(null);
    setActiveTab("create");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Clean 5-Tab Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActivePackage(null);
          setActiveTab(tab);
        }}
        osMode={osMode}
        setOsMode={setOsMode}
        savedCount={0}
        onRefresh={handleRefresh}
        onOpenCreateStudio={() => {
          setActivePackage(null);
          setActiveTab("create");
        }}
        isRefreshing={isRefreshing}
      />

      {/* 2. Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="px-2 py-0.5 rounded bg-rose-900/60 hover:bg-rose-800 text-rose-200 font-mono text-[11px]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Loading Overlay when generating universal content package */}
        {isCreatingPackage && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4 animate-fadeIn">
            <div className="relative">
              <div className="w-14 h-14 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white font-mono">
                Compiling Universal Content Package
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Running 7 Intelligence Engines • Checking Anti-Slop Constraints • Generating 8 Tool Prompts...
              </p>
            </div>
          </div>
        )}

        {/* Display Result View if activePackage is loaded */}
        {activePackage ? (
          <ResultView
            packageData={activePackage}
            onBack={() => setActivePackage(null)}
          />
        ) : (
          <>
            {/* TAB 1: TODAY */}
            {activeTab === "today" && (
              <TodayView
                onSelectRecommendation={handleSelectRecommendation}
                onNavigateToCreate={handleNavigateToCreate}
                onNavigateToRadar={() => setActiveTab("radar")}
              />
            )}

            {/* TAB 2: RADAR */}
            {activeTab === "radar" && (
              <RadarView
                onSelectTopicToCreate={(topic, contentType, angle) =>
                  handleCreateContent({
                    content_type: contentType,
                    topic: topic,
                    angle: angle,
                    format_type: "Reel",
                    duration_sec: 30,
                    free_first: true
                  })
                }
              />
            )}

            {/* TAB 3: CREATE */}
            {activeTab === "create" && (
              <CreateView
                initialTopic={initialCreateTopic}
                initialContentType={initialCreateEngine}
                onCreateEverything={handleCreateContent}
                isCreating={isCreatingPackage}
                onNavigateToRadar={() => setActiveTab("radar")}
              />
            )}

            {/* TAB 4: CALENDAR */}
            {activeTab === "calendar" && (
              <CreatorCalendarView
                onSelectSlotToCreate={(topic, pillar) => {
                  setInitialCreateTopic(topic);
                  setInitialCreateEngine(pillar);
                  setActiveTab("create");
                }}
              />
            )}

            {/* TAB 5: ANALYTICS */}
            {activeTab === "analytics" && (
              <CreatorAnalyticsView />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
