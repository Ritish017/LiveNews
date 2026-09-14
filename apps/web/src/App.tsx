import React, { useState, useEffect } from "react";
import {
  ContentItem,
  Topic,
  SavedItem,
  OpportunityCard,
  V3Event,
  TrendDetail,
  CreateEverythingPackage,
  TodayWorkspacePayload,
  RankedContentOpportunity,
  PipelineStageSummary,
  Calendar30DayView,
  SeriesDefinition,
  ContentAssetPackage,
  ContentClusterPackage
} from "./types";
import {
  fetchFeed,
  fetchTrending,
  fetchSavedItems,
  saveStory,
  deleteSavedItem,
  triggerCollection,
  fetchTopOpportunities,
  fetchTrends,
  // future.aii__ APIs
  fetchTodayWorkspace,
  fetchFutureAiiOpportunities,
  fetchFutureAiiPipeline,
  moveFutureAiiPipeline,
  fetchFutureAiiCalendar,
  fetchFutureAiiSeries,
  fetchFutureAiiItemDetail,
  createFutureAiiContent,
  createFutureAiiCluster,
} from "./lib/api";
import { Navbar, ContentOSTab } from "./components/Navbar";
import { TerminalStatusBar } from "./components/TerminalStatusBar";
import { TodayDecisionView } from "./components/TodayDecisionView";
import { NorthStarFunnelModal } from "./components/NorthStarFunnelModal";
import { CreateEverythingModal } from "./components/CreateEverythingModal";
import { LiveRadarView } from "./components/LiveRadarView";
import { GlobalNewsCenter } from "./components/GlobalNewsCenter";
import { TrendNetworkGraph } from "./components/TrendNetworkGraph";
import { ContentOpportunitiesView } from "./components/ContentOpportunitiesView";
import { SavedBoard } from "./components/SavedBoard";
import { VoiceLearningView } from "./components/VoiceLearningView";
import { ContentStudioV3 } from "./components/ContentStudioV3";
import { PromptLabModal } from "./components/PromptLabModal";
import { DailyBriefModal } from "./components/DailyBriefModal";
import { GlobalSearchModal } from "./components/GlobalSearchModal";
import { TrendDetailModal } from "./components/TrendDetailModal";
import { VideoDirectorStudio } from "./components/VideoDirectorStudio";
import { AlertCircle } from "lucide-react";

// future.aii__ Content OS Core Views
import { TodayWorkspaceView } from "./components/future_aii/TodayWorkspaceView";
import { NewsroomView } from "./components/future_aii/NewsroomView";
import { OpportunitiesView } from "./components/future_aii/OpportunitiesView";
import { PipelineView } from "./components/future_aii/PipelineView";
import { StudioView } from "./components/future_aii/StudioView";
import { CalendarView } from "./components/future_aii/CalendarView";
import { SeriesView } from "./components/future_aii/SeriesView";
import { AutomationsView } from "./components/future_aii/AutomationsView";
import { AnalyticsDiagnosticsView } from "./components/future_aii/AnalyticsDiagnosticsView";
import { BrandVoiceView } from "./components/future_aii/BrandVoiceView";
import { ContentDetailModal } from "./components/future_aii/ContentDetailModal";
import { ClusterModal } from "./components/future_aii/ClusterModal";

export function App() {
  // Navigation mode: future.aii__ Content OS (default) vs Radar V3 Engine
  const [osMode, setOsMode] = useState<"future_aii" | "radar_v3">("future_aii");
  const [activeTab, setActiveTab] = useState<ContentOSTab>("today");

  // future.aii__ Data states
  const [workspace, setWorkspace] = useState<TodayWorkspacePayload | null>(null);
  const [futureAiiEvents, setFutureAiiEvents] = useState<V3Event[]>([]);
  const [futureAiiOpps, setFutureAiiOpps] = useState<RankedContentOpportunity[]>([]);
  const [pipelineData, setPipelineData] = useState<PipelineStageSummary[]>([]);
  const [calendarData, setCalendarData] = useState<Calendar30DayView | null>(null);
  const [seriesData, setSeriesData] = useState<SeriesDefinition[]>([]);
  const [isGeneratingContent, setIsGeneratingContent] = useState<boolean>(false);

  // future.aii__ Modals state
  const [selectedPackage, setSelectedPackage] = useState<ContentAssetPackage | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [clusterData, setClusterData] = useState<ContentClusterPackage | null>(null);

  // Legacy/V3 Data states
  const [opportunities, setOpportunities] = useState<OpportunityCard[]>([]);
  const [trends, setTrends] = useState<Topic[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // V3 Modals state
  const [studioEvent, setStudioEvent] = useState<V3Event | null>(null);
  const [promptLabEvent, setPromptLabEvent] = useState<V3Event | null>(null);
  const [videoDirectorEvent, setVideoDirectorEvent] = useState<V3Event | null>(null);
  const [isDailyBriefOpen, setIsDailyBriefOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedTrendDetailId, setSelectedTrendDetailId] = useState<string | null>(null);

  // North Star Decision & Funnel state
  const [isFunnelOpen, setIsFunnelOpen] = useState<boolean>(false);
  const [isCreateEverythingOpen, setIsCreateEverythingOpen] = useState<boolean>(false);
  const [createEverythingPackage, setCreateEverythingPackage] = useState<CreateEverythingPackage | null>(null);

  // Load all initial data
  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [
        ws,
        opps,
        pipe,
        cal,
        ser,
        feedData,
        v3Opps,
        v3Trends,
        savedList
      ] = await Promise.all([
        fetchTodayWorkspace(),
        fetchFutureAiiOpportunities(),
        fetchFutureAiiPipeline(),
        fetchFutureAiiCalendar(),
        fetchFutureAiiSeries(),
        fetchFeed({ page: 1, pageSize: 20 }),
        fetchTopOpportunities(5),
        fetchTrends("opportunity"),
        fetchSavedItems()
      ]);

      setWorkspace(ws);
      setFutureAiiOpps(opps);
      setPipelineData(pipe);
      setCalendarData(cal);
      setSeriesData(ser);

      if (feedData && feedData.items) {
        // Map feed items to V3Event shape for the newsroom
        const mappedEvents: V3Event[] = feedData.items.map((item: any) => ({
          id: item.id || `ev_${Math.random()}`,
          title: item.title,
          summary: item.content || item.summary,
          category: item.category || "General AI",
          status: "CONFIRMED",
          confidence_score: item.confidence_score || 92.0,
          source_count: item.source_count || 1,
          independent_source_count: 1,
          primary_source_name: item.source || "TechCrunch",
          primary_source_url: item.url || "https://techcrunch.com",
          entities: [],
          key_facts: item.confirmed_facts || [item.title],
          relevance_score: 90.0,
          freshness_score: 95.0,
          momentum_score: item.viral_potential || 85.0,
          opportunity_score: 88.0,
          recommended_action: "POST_NOW",
          recommended_angle: `Why this matters for @future.aii__`,
          recommended_platform: "Instagram",
          event_timestamp: item.published_at || new Date().toISOString(),
          first_seen_at: new Date().toISOString(),
          surfaced_at: new Date().toISOString(),
          total_pipeline_latency: 18.0,
          sources: [
            {
              source_name: item.source || "Primary Source",
              url: item.url || "https://news.ycombinator.com",
              quality_tier: "Tier 1"
            }
          ]
        }));
        setFutureAiiEvents(mappedEvents);
      }

      setOpportunities(v3Opps.top_opportunities || []);
      setTrends(v3Trends || []);
      setSavedItems(savedList || []);
    } catch (err: any) {
      console.error("Initial load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();

    // Keyboard shortcut '/' or 'Ctrl+K' to open global search
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await triggerCollection();
      await loadAllData();
    } catch (err) {
      console.error("Manual sync failed:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleWhatShouldIPost = () => {
    setActiveTab("today");
  };

  const handleOpenDetailModal = (pkg: ContentAssetPackage) => {
    setSelectedPackage(pkg);
    setIsDetailModalOpen(true);
  };

  const handleGenerateContent = async (params: {
    topic: string;
    pillar: string;
    series: string;
    angle?: string;
    goal: string;
    duration: number;
  }) => {
    setIsGeneratingContent(true);
    try {
      const pkg = await createFutureAiiContent(params);
      setSelectedPackage(pkg);
      setIsDetailModalOpen(true);
      // Refresh pipeline
      const updatedPipe = await fetchFutureAiiPipeline();
      setPipelineData(updatedPipe);
    } catch (err) {
      console.error("Failed to generate content package:", err);
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const handleTurnIntoCluster = async (title: string, summary?: string, id?: string) => {
    try {
      const cluster = await createFutureAiiCluster(title, summary, id);
      setClusterData(cluster);
    } catch (err) {
      console.error("Failed to turn into cluster:", err);
    }
  };

  const handleMovePipelineStage = async (itemId: string, newStage: string) => {
    try {
      await moveFutureAiiPipeline(itemId, newStage);
      const updatedPipe = await fetchFutureAiiPipeline();
      setPipelineData(updatedPipe);
    } catch (err) {
      console.error("Failed to move stage:", err);
    }
  };

  const handleOpenPipelineItem = async (itemId: string) => {
    try {
      const pkg = await fetchFutureAiiItemDetail(itemId);
      setSelectedPackage(pkg);
      setIsDetailModalOpen(true);
    } catch (err) {
      console.error("Failed to load item detail:", err);
    }
  };

  const handleSaveItem = async (item: ContentItem) => {
    try {
      const saved = await saveStory(item.id, "Idea");
      setSavedItems((prev) => [saved, ...prev.filter((s) => s.content_item_id !== item.id)]);
    } catch (err) {
      console.error("Failed to save story:", err);
    }
  };

  const handleDeleteSaved = async (id: string) => {
    try {
      await deleteSavedItem(id);
      setSavedItems((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete saved story:", err);
    }
  };

  const handleUpdateSavedStatus = async (item: SavedItem, newStatus: "Idea" | "Draft" | "Posted" | "Ignored") => {
    try {
      const updated = await saveStory(item.content_item_id, newStatus, item.notes);
      setSavedItems((prev) => prev.map((s) => (s.id === item.id ? updated : s)));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleOpenStudioForNews = (news: any) => {
    handleGenerateContent({
      topic: news.title,
      pillar: "AI News",
      series: "AI NEWS TODAY",
      angle: `Practical takeaways from ${news.title}`,
      goal: "Reach & Follows",
      duration: 30
    });
  };

  const handleSelectOpportunity = (opp: OpportunityCard) => {
    handleGenerateContent({
      topic: opp.topic,
      pillar: "AI Tools",
      series: "AI TOOLS YOU NEED",
      angle: opp.recommended_angle,
      goal: "Saves & Shares",
      duration: 30
    });
  };

  return (
    <div className="min-h-screen bg-[#06090f] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Terminal Real-Time Top Status Bar */}
      <TerminalStatusBar
        onRefresh={handleRefresh}
        onOpenDailyBrief={() => setIsDailyBriefOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. Global Navigation Bar with Mode Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        osMode={osMode}
        setOsMode={setOsMode}
        savedCount={savedItems.length}
        onRefresh={handleRefresh}
        onWhatShouldIPost={handleWhatShouldIPost}
        onOpenCreateStudio={() => setActiveTab("studio")}
        onOpenFunnel={() => setIsFunnelOpen(true)}
        isRefreshing={isRefreshing}
      />

      {/* 3. Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>{error}</span>
            </div>
            <button onClick={loadAllData} className="underline hover:text-white font-mono">
              Retry Sync
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* FUTURE.AII CONTENT OS MODE (PRIMARY BRAND OPERATING SYSTEM)  */}
        {/* ============================================================ */}
        {osMode === "future_aii" && (
          <>
            {/* TAB 1: TODAY'S MISSION CONTROL (§34, §75) */}
            {activeTab === "today" && (
              <TodayWorkspaceView
                workspace={workspace}
                loading={loading}
                onOpenContentPackage={handleOpenDetailModal}
                onTurnIntoCluster={(opp) => handleTurnIntoCluster(opp.title, opp.scores?.recommended_angle, opp.id)}
                onRefresh={loadAllData}
              />
            )}

            {/* TAB 2: AI NEWSROOM (§52, §53) */}
            {activeTab === "newsroom" && (
              <NewsroomView
                events={futureAiiEvents}
                loading={loading}
                onTurnIntoContent={(title, summary) =>
                  handleGenerateContent({
                    topic: title,
                    pillar: "AI News",
                    series: "AI NEWS TODAY",
                    angle: summary,
                    goal: "Reach & Follows",
                    duration: 30
                  })
                }
                onTurnIntoCluster={(title, summary, id) => handleTurnIntoCluster(title, summary, id)}
                onRefresh={loadAllData}
              />
            )}

            {/* TAB 3: OPPORTUNITY RADAR (§7, §8) */}
            {activeTab === "opportunities" && (
              <OpportunitiesView
                opportunities={futureAiiOpps}
                loading={loading}
                onTurnIntoContent={(opp) =>
                  handleGenerateContent({
                    topic: opp.title,
                    pillar: opp.scores?.recommended_pillar || "AI Tools",
                    series: opp.scores?.recommended_series || "AI TOOLS YOU NEED",
                    angle: opp.scores?.recommended_angle || opp.summary,
                    goal: "Reach & Saves",
                    duration: 30
                  })
                }
                onTurnIntoCluster={(opp) => handleTurnIntoCluster(opp.title, opp.scores?.recommended_angle, opp.id)}
              />
            )}

            {/* TAB 4: 13-STAGE PRODUCTION PIPELINE (§29, §33) */}
            {activeTab === "pipeline" && (
              <PipelineView
                pipeline={pipelineData}
                loading={loading}
                onMoveStage={handleMovePipelineStage}
                onOpenItem={handleOpenPipelineItem}
              />
            )}

            {/* TAB 5: CONTENT CREATION STUDIO (§10, §12, §13, §58) */}
            {activeTab === "studio" && (
              <StudioView
                onGenerate={handleGenerateContent}
                isGenerating={isGeneratingContent}
              />
            )}

            {/* TAB 6: 30-DAY CONTENT CALENDAR (§30, §31) */}
            {activeTab === "calendar" && (
              <CalendarView
                calendar={calendarData}
                loading={loading}
                onOpenSlot={(contentId) => {
                  if (contentId) handleOpenPipelineItem(contentId);
                }}
              />
            )}

            {/* TAB 7: 16+ RECURRING SERIES ENGINE (§5) */}
            {activeTab === "series" && (
              <SeriesView
                seriesList={seriesData}
                loading={loading}
                onCreateSeriesEpisode={(seriesName, pillar) => {
                  setActiveTab("studio");
                }}
              />
            )}

            {/* TAB 8: COMMENT → DM META-COMPLIANT AUTOMATIONS (§15 - §18) */}
            {activeTab === "automations" && (
              <AutomationsView />
            )}

            {/* TAB 9: COMPARATIVE ANALYTICS & 8-DIMENSION WINNERS (§36 - §38) */}
            {activeTab === "analytics" && (
              <AnalyticsDiagnosticsView />
            )}

            {/* TAB 10: BRAND STYLE GUIDE & ANTI-GENERIC FILTER (§39, §40, §72) */}
            {activeTab === "brand" && (
              <BrandVoiceView />
            )}
          </>
        )}

        {/* ============================================================ */}
        {/* RADAR V3 ENGINE MODE (INTELLIGENCE & RESEARCH TOOLS)         */}
        {/* ============================================================ */}
        {osMode === "radar_v3" && (
          <>
            {activeTab === "today" && (
              <TodayDecisionView
                onOpenVideoDirector={(ev) => {
                  setVideoDirectorEvent(ev);
                  setActiveTab("video");
                }}
                onOpenFunnelModal={() => setIsFunnelOpen(true)}
                onOpenCreateEverything={(pkg) => {
                  setCreateEverythingPackage(pkg);
                  setIsCreateEverythingOpen(true);
                }}
              />
            )}

            {activeTab === "radar" && (
              <LiveRadarView
                onOpenContentStudio={(ev) => setStudioEvent(ev)}
                onOpenPromptLab={(ev) => setPromptLabEvent(ev)}
                onOpenVideoDirector={(ev) => {
                  setVideoDirectorEvent(ev);
                  setActiveTab("video");
                }}
                onOpenEventDetail={(ev) => setSelectedTrendDetailId(ev.id)}
              />
            )}

            {activeTab === "news" && (
              <GlobalNewsCenter
                onOpenContentStudioForNews={handleOpenStudioForNews}
              />
            )}

            {activeTab === "graph" && (
              <TrendNetworkGraph
                onSelectTrendNode={(name) => {
                  setActiveTab("opportunities");
                }}
              />
            )}

            {activeTab === "opportunities" && (
              <ContentOpportunitiesView
                opportunities={opportunities}
                isLoading={loading}
                onRefresh={handleWhatShouldIPost}
                onSelectOpportunity={handleSelectOpportunity}
                onViewTrendDetail={(id) => setSelectedTrendDetailId(id)}
              />
            )}

            {activeTab === "video" && (
              <VideoDirectorStudio
                initialEvent={videoDirectorEvent}
              />
            )}

            {activeTab === "voice" && <VoiceLearningView />}

            {activeTab === "saved" && (
              <SavedBoard
                items={savedItems}
                onDelete={handleDeleteSaved}
                onUpdateStatus={handleUpdateSavedStatus}
                onOpenStudio={(it) => handleOpenStudioForNews(it)}
              />
            )}
          </>
        )}
      </main>

      {/* ============================================================ */}
      {/* GLOBAL FUTURE.AII MODALS                                     */}
      {/* ============================================================ */}

      {/* 18-Element Master Content Asset Package Modal (§28, §35) */}
      <ContentDetailModal
        pkg={selectedPackage}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedPackage(null);
        }}
      />

      {/* Synchronized 1-Event to 10-Piece Content Cluster Modal (§9, §51) */}
      <ClusterModal
        cluster={clusterData}
        isOpen={!!clusterData}
        onClose={() => setClusterData(null)}
        onOpenStudioForItem={(item) => {
          setClusterData(null);
          handleGenerateContent({
            topic: item.title,
            pillar: item.pillar || "AI News",
            series: item.series || "AI NEWS TODAY",
            angle: item.angle || item.recommended_angle,
            goal: item.goal || "Reach",
            duration: 30
          });
        }}
      />

      {/* Legacy/V3 Modals */}
      {studioEvent && (
        <ContentStudioV3
          event={studioEvent}
          isOpen={!!studioEvent}
          onClose={() => setStudioEvent(null)}
          onAddToQueue={(qItem) => {
            fetch("/api/queue", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(qItem)
            });
            setStudioEvent(null);
          }}
        />
      )}

      {promptLabEvent && (
        <PromptLabModal
          event={promptLabEvent}
          isOpen={!!promptLabEvent}
          onClose={() => setPromptLabEvent(null)}
        />
      )}

      {isDailyBriefOpen && (
        <DailyBriefModal
          isOpen={isDailyBriefOpen}
          onClose={() => setIsDailyBriefOpen(false)}
          onOpenOpportunity={(id) => {
            setIsDailyBriefOpen(false);
            setSelectedTrendDetailId(id);
          }}
        />
      )}

      {isSearchOpen && (
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectResult={(type, item) => {
            setIsSearchOpen(false);
            if (type === "event") setStudioEvent(item);
            else if (type === "trend") setSelectedTrendDetailId(item.id);
          }}
        />
      )}

      {selectedTrendDetailId && (
        <TrendDetailModal
          trendId={selectedTrendDetailId}
          onClose={() => setSelectedTrendDetailId(null)}
          onCreatePostFromTrend={(trend) => {
            setSelectedTrendDetailId(null);
          }}
        />
      )}

      {isFunnelOpen && (
        <NorthStarFunnelModal
          isOpen={isFunnelOpen}
          onClose={() => setIsFunnelOpen(false)}
        />
      )}

      {isCreateEverythingOpen && createEverythingPackage && (
        <CreateEverythingModal
          isOpen={isCreateEverythingOpen}
          onClose={() => {
            setIsCreateEverythingOpen(false);
            setCreateEverythingPackage(null);
          }}
          packageData={createEverythingPackage}
        />
      )}
    </div>
  );
}
