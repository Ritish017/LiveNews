export interface Analysis {
  summary: string;
  main_claim?: string;
  why_viral: string[];
  hook_type?: string;
  content_type?: string;
  key_facts: string[];
  important_entities: string[];
  audience?: string;
  recommended_angle?: string;
  risk_flags: string[];
  confirmed_facts?: string[];
  uncertain_claims?: string[];
  viral_potential?: number;
}

export interface GeneratedVariant {
  id?: string;
  variant_type: "news" | "hot_take" | "educational" | "builder" | "thread" | "question";
  tone: string;
  length: string;
  content: string;
  thread_items?: string[];
  similarity_score: number;
  is_safe: boolean;
  attribution_included: boolean;
}

export interface ContentItem {
  id: string;
  source: string;
  source_type: "firecrawl" | "rss" | "x" | "github" | "reddit" | "news" | "demo";
  source_quality?: string;
  source_count?: number;
  primary_source_url?: string;
  title: string;
  content: string;
  url: string;
  author?: string;
  author_handle?: string;
  author_url?: string;
  published_at: string;
  collected_at: string;
  views?: number | null;
  likes?: number | null;
  reposts?: number | null;
  replies?: number | null;
  quotes?: number | null;
  media: string[];
  hashtags: string[];
  language: string;
  engagement_rate?: number | null;
  engagement_velocity: number;
  viral_score?: number | null;
  viral_potential: number;
  trend_score: number;
  topic: string;
  entities: string[];
  sentiment: string;
  content_type: string;
  hook_type: string;
  source_urls: string[];
  confirmed_facts?: string[];
  uncertain_claims?: string[];
  original_content_id?: string;
  attribution_required: boolean;
  analysis?: Analysis;
  generated_variants?: GeneratedVariant[];
}

export interface OpportunityCard {
  rank: number;
  id: string;
  topic: string;
  category: string;
  opportunity_score: number;
  opportunity_type: string;
  lifecycle: string;
  lifecycle_badge: string;
  momentum: number;
  momentum_change_pct: number;
  momentum_direction: "ACCELERATING" | "STABLE" | "DECELERATING" | "INSUFFICIENT HISTORY";
  competition: number;
  novelty: number;
  audience_fit: number;
  primary_audience: string;
  recommended_action: "POST_NOW" | "POST_SOON" | "WATCH" | "WAIT" | "SKIP";
  action_reason: string;
  recommended_angle: string;
  alternative_angles: string[];
  recommended_hook: string;
  hook_strategy: string;
  recommended_format: string;
  format_scores: Record<string, number>;
  item_count: number;
  primary_source?: string;
  sources_summary: string[];
}

export interface TopOpportunitiesResponse {
  total_trends_analyzed: number;
  top_opportunities: OpportunityCard[];
  generated_at: string;
}

export interface SourceEvidenceItem {
  title: string;
  url: string;
  source: string;
  source_quality: string;
  published_at?: string;
  role: string;
}

export interface TrendObservation {
  id: string;
  trend_id: string;
  timestamp: string;
  mention_count: number;
  source_count: number;
  source_diversity: number;
  social_mentions?: number;
  engagement?: number;
  new_items: number;
  momentum_score: number;
  competition_score: number;
  opportunity_score: number;
}

export interface TrendDetail {
  id: string;
  name: string;
  category: string;
  lifecycle_stage: string;
  status: string;
  opportunity_score: number;
  opportunity_type: string;
  competition_score: number;
  novelty_score: number;
  audience_fit_score: number;
  momentum: number;
  momentum_change_pct: number;
  momentum_direction: string;
  what_happened: string;
  why_trending: string;
  what_changed?: string;
  what_is_saturated?: string;
  what_is_missing?: string;
  who_cares?: string;
  best_angle: string;
  alternative_angles: string[];
  saturated_angles: string[];
  under_served_angles: string[];
  best_hook_type: string;
  hook_strategy: string;
  best_format: string;
  format_scores: Record<string, number>;
  timing_verdict: string;
  timing_reason: string;
  claims_to_avoid: string[];
  primary_audience?: string;
  secondary_audiences?: string[];
  source_evidence: SourceEvidenceItem[];
  observations: TrendObservation[];
}

export interface Topic {
  id: string;
  name: string;
  category: string;
  momentum: number;
  momentum_change_pct?: number;
  momentum_direction?: string;
  status: string;
  lifecycle_stage?: string;
  opportunity_score?: number;
  opportunity_type?: string;
  competition_score?: number;
  novelty_score?: number;
  audience_fit_score?: number;
  recommended_action?: string;
  action_reason?: string;
  recommended_angle?: string;
  alternative_angles?: string[];
  saturated_angles?: string[];
  under_served_angles?: string[];
  recommended_hook_type?: string;
  hook_strategy?: string;
  recommended_format?: string;
  format_scores?: Record<string, number>;
  primary_audience?: string;
  secondary_audiences?: string[];
  item_count: number;
  sources_summary: string[];
  primary_source?: string;
  updated_at: string;
}

export interface SavedItem {
  id: string;
  content_item_id: string;
  status: "Idea" | "Draft" | "Posted" | "Ignored";
  notes?: string;
  saved_at: string;
  content_item?: ContentItem;
}

export interface VoiceProfile {
  id?: string;
  name: string;
  tone_preference: string;
  voice_examples: string[];
  guidelines?: string;
  updated_at?: string;
}

// =========================================================================
// V3 REAL-TIME GLOBAL AI INTELLIGENCE & CONTENT OPERATING SYSTEM TYPES
// =========================================================================

export interface TerminalStatus {
  status: "LIVE" | "SYNCING" | "OFFLINE";
  last_ingestion_seconds_ago: number;
  detection_latency_seconds: number;
  events_today_count: number;
  breaking_count: number;
  emerging_count: number;
  exploding_count: number;
  opportunities_count: number;
  services: {
    firecrawl: { status: string; latency_ms: number };
    gemini: { status: string; model: string };
    database: { status: string; type: string };
    sources?: {
      total_sources: number;
      healthy_count: number;
      degraded_count: number;
      offline_count: number;
    };
  };
}

export interface V3EventSource {
  source_name: string;
  url: string;
  quality_tier: string;
  title?: string;
  published_at?: string;
}

export interface V3Event {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: "CONFIRMED" | "LIKELY" | "DEVELOPING" | "UNVERIFIED" | "CONTRADICTED";
  confidence_score: number;
  source_count: number;
  independent_source_count: number;
  primary_source_name?: string;
  primary_source_url?: string;
  entities: string[];
  key_facts: string[];
  relevance_score: number;
  freshness_score: number;
  momentum_score: number;
  opportunity_score: number;
  recommended_action: "POST_NOW" | "POST_SOON" | "WATCH" | "WAIT" | "SKIP";
  recommended_angle?: string;
  recommended_platform: "X" | "LinkedIn" | "Instagram" | "YouTube";
  event_timestamp: string;
  first_seen_at: string;
  surfaced_at: string;
  total_pipeline_latency: number;
  sources: V3EventSource[];
}

export interface HookCandidate {
  category: string;
  text: string;
  hook_score: number;
  curiosity: number;
  specificity: number;
  novelty: number;
  clarity: number;
  scroll_stop_potential: number;
  credibility: number;
  conversation_potential: number;
}

export interface ContentBriefData {
  topic: string;
  audience: string;
  goal: string;
  angle: string;
  content_format: string;
  hook_strategy: string;
  key_claims: string[];
  supporting_facts: string[];
  counterpoint: string;
  cta_strategy: string;
  visual_strategy: string;
  platform_strategy: string;
}

export interface QualityEvaluation {
  total_quality_score: number;
  fact_check_score: number;
  originality_score: number;
  hook_strength_score: number;
  clarity_score: number;
  platform_fit_score: number;
  audience_fit_score: number;
  cta_effectiveness: number;
  spam_score: number;
  clickbait_penalty: number;
  is_approved: boolean;
  feedback: string[];
}

export interface PlatformSuite {
  brief: ContentBriefData;
  quality: QualityEvaluation;
  x_content: {
    platform: string;
    selected_hook: HookCandidate;
    single_post: string;
    thread: string[];
    char_count: number;
    hashtags: string[];
  };
  x_hooks: HookCandidate[];
  linkedin_content: {
    platform: string;
    content: string;
    word_count: number;
    cta: string;
  };
  instagram_carousel: {
    platform: string;
    format: string;
    total_slides: number;
    slides: Array<{
      slide_number: number;
      type: string;
      headline: string;
      subtext: string;
      visual_direction: string;
      asset_prompt: string;
    }>;
    caption: string;
  };
  instagram_reel: {
    platform: string;
    format: string;
    duration_seconds: number;
    beats: Array<{
      timecode: string;
      beat: string;
      narration: string;
      visual: string;
    }>;
  };
  youtube_content: {
    platform: string;
    titles: Array<{ style: string; title: string }>;
    selected_title: string;
    thumbnails: Array<{
      concept: number;
      name: string;
      subject: string;
      foreground_text: string;
      emotion: string;
      prompt: string;
    }>;
    short_script: {
      title: string;
      duration: string;
      sections: Array<{ time: string; type: string; text: string }>;
    };
    description: string;
    seo_tags: string[];
  };
}

export interface OmniPromptPayload {
  subject: string;
  action: string;
  environment: string;
  time_of_day: string;
  lighting: string;
  camera: Record<string, string>;
  composition: string;
  depth: string;
  materials: string;
  physics: string;
  motion: string;
  audio: string;
  dialogue: string;
  style: string;
  color_tone: string;
  continuity: string;
  negative_constraints: string[];
  output_format: string;
  compiled_master_prompt: string;
}

export interface StoryboardScene {
  scene_number: number;
  timecode: string;
  duration_sec: number;
  beat_type: string;
  narration: string;
  visual_direction: string;
  camera_instruction: string;
  on_screen_text: string;
  recommended_engine: string;
  asset_prompt: string;
}

export interface DailyBrief {
  title: string;
  generated_at: string;
  summary: string;
  metrics: {
    major_events_count: number;
    emerging_trends_count: number;
    exploding_trends_count: number;
    opportunities_count: number;
  };
  best_opportunity?: {
    id: string;
    topic: string;
    opportunity_score: number;
    competition_score: number;
    recommended_angle: string;
    status: string;
  };
  top_events: Array<{
    id: string;
    title: string;
    status: string;
    confidence: number;
    category: string;
    momentum: number;
  }>;
  what_you_should_post_today: string;
}

export interface DayPlanSlot {
  time_slot: string;
  platform: string;
  format: string;
  topic: string;
  recommended_angle: string;
  priority: string;
  action: string;
}

export interface ContentQueueItem {
  id: string;
  event_id?: string;
  platform: string;
  title: string;
  content: string;
  status: "IDEA" | "DRAFT" | "REVIEW" | "APPROVED" | "READY" | "SCHEDULED" | "PUBLISHED" | "PERFORMING" | "COMPLETED";
  priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW";
  scheduled_for?: string;
  created_at: string;
}

export interface TrendGraphData {
  nodes: Array<{
    id: string;
    name: string;
    type: "category" | "trend" | "event";
    size: number;
    color: string;
    momentum?: number;
    opportunity?: number;
    lifecycle?: string;
    status?: string;
  }>;
  links: Array<{
    source: string;
    target: string;
    value: number;
    type: string;
  }>;
  meta: {
    total_nodes: number;
    total_links: number;
    active_categories: string[];
  };
}

export interface VideoHookVisualizer {
  hook_id: string;
  first_spoken_line: string;
  first_visual: string;
  first_camera_movement: string;
  first_on_screen_text: string;
  first_sfx: string;
  curiosity_mechanism: string;
  retention_score: number;
}

export interface VideoStoryboardScene {
  scene_number: number;
  start_time_sec: number;
  end_time_sec: number;
  duration_sec: number;
  narrative_purpose: string;
  visual_objective: string;
  voiceover_text: string;
  on_screen_text: string;
  recommended_engine: "REMOTION" | "OMNI" | "VEO" | "HYPERFRAMES" | "HYBRID";
  transition_out: string;
  sound_design: string;
}

export interface VideoShotDirection {
  shot_id: string;
  scene_number: number;
  start_sec: number;
  duration_sec: number;
  engine: "REMOTION" | "OMNI" | "VEO" | "HYPERFRAMES";
  visual_objective: string;
  camera_position: string;
  camera_movement: string;
  subject_action: string;
  environment_lighting: string;
  shot_complexity: number;
  exact_model_prompt: string;
  negative_constraints: string;
  continuity_requirements: string;
  copyable_prompt: string;
}

export interface VideoAssetRequirement {
  asset_id: string;
  asset_type: string;
  description: string;
  source: string;
  aspect_ratio: string;
  used_by_shot: string;
}

export interface VideoPackage {
  package_id: string;
  event_id?: string;
  title: string;
  platform: string;
  duration_seconds: number;
  aspect_ratio: string;
  style_preset: string;
  generation_strategy: string;
  creative_concept: string;
  why_this_video: string;
  ranked_hooks: VideoHookVisualizer[];
  storyboard: VideoStoryboardScene[];
  shot_list: VideoShotDirection[];
  asset_manifest: VideoAssetRequirement[];
  audio_plan: {
    voiceover_script: string;
    music_genre: string;
    bpm_range: string;
    emotional_role: string;
    sfx_cues: Array<{ timestamp_sec: number; sound_event: string; intensity: string }>;
  };
  engines: {
    remotion?: {
      standalone_agent_prompt: string;
      video_props_interface: string;
      render_command: string;
    };
    omni?: Array<{
      shot_id: string;
      purpose: string;
      visual_prompt: string;
      audio_direction: string;
      continuity: string;
      avoid: string;
    }>;
    veo?: Array<{
      shot_id: string;
      workflow_type: string;
      prompt: string;
      start_frame_prompt?: string;
      end_frame_prompt?: string;
      motion_prompt?: string;
    }>;
    hyperframes?: {
      composition_id: string;
      html_markup: string;
      css_styles: string;
      gsap_timeline_code: string;
      standalone_agent_prompt: string;
    };
  };
  hybrid_assembly?: {
    layer_order: string[];
    compositing_instructions: string;
  };
  quality_report: {
    overall_readiness_score: number;
    passes_quality_gate: boolean;
    dimension_scores: Record<string, number>;
    self_critique: string[];
    prohibited_phrases_detected: string[];
  };
  visual_concepts?: VisualConceptSuite;
  production_shots?: ProductionShotSpec[];
  forensic_report?: VideoForensicReport;
  prompt_evolution?: PromptEvolutionLineage;
  created_at: string;
}

export interface VisualConcept {
  concept_id: string;
  representation_type: string;
  headline: string;
  core_visual_metaphor: string;
  description: string;
  what_viewer_sees: string;
  what_viewer_understands: string;
  information_density: number;
  conceptual_clarity: number;
  emotional_impact: number;
  novelty_score: number;
  production_feasibility: number;
  recommended_engine: string;
  asset_requirements?: string[];
  anti_slop_safeguards?: string[];
  overall_fit_score: number;
  is_recommended?: boolean;
  selection_rationale?: string;
}

export interface VisualConceptSuite {
  suite_id: string;
  claim_or_narration: string;
  topic?: string;
  platform?: string;
  candidates: VisualConcept[];
  selected_concept: VisualConcept;
}

export interface ProductionShotSpec {
  shot_id: string;
  scene_number: number;
  duration_sec: number;
  purpose: string;
  narration: string;
  visual_representation_type: string;
  primary_engine: string;
  model_selection_reason: string;
  subject: string;
  action: string;
  environment: string;
  composition_and_framing: string;
  camera_movement: string;
  lighting: string;
  color_palette: string;
  complexity_score: number;
  is_decomposed: boolean;
  decomposed_micro_shots?: Array<any>;
}

export interface ForensicDimensionEvaluation {
  dimension_name: string;
  score: number;
  status: "PASS" | "WARN" | "FAIL";
  evidence: string[];
}

export interface VideoForensicReport {
  analysis_id: string;
  video_identifier: string;
  prompt_readiness_score: number;
  expected_executability_score: number;
  actual_video_quality_score: number;
  overall_verdict: "EXCELLENT" | "PASS" | "WARN" | "FAIL";
  dimension_scores: Record<string, number>;
  dimension_evaluations: ForensicDimensionEvaluation[];
  detected_failures: Array<{
    id: string;
    category: string;
    dimension?: string;
    severity: string;
    description: string;
    recommended_fix: string;
  }>;
  representative_frames: Array<{
    frame_index: number;
    timestamp_sec: number;
    percentage: number;
    timecode: string;
    description: string;
  }>;
  extracted_metadata?: {
    duration_sec: number;
    width: number;
    height: number;
    aspect_ratio: string;
    fps: number;
    frame_count: number;
    has_audio: boolean;
    bitrate_kbps: number;
    scene_cut_count: number;
  };
  remediation_actions: string[];
}

export interface PromptEvolutionLineage {
  evolution_id: string;
  parent_version: string;
  new_version: string;
  primary_failure_addressed: string;
  mutations_applied: Array<{
    operator: string;
    target_shot_or_section: string;
    rationale: string;
    original_snippet?: string;
    mutated_snippet?: string;
    expected_quality_delta: number;
  }>;
  evolved_prompt_text: string;
  expected_executability_score: number;
  predicted_quality_score: number;
  lineage_notes: string;
}

export interface FailurePatternDashboard {
  most_common_failures: Array<{
    failure_name: string;
    frequency_percentage: number;
    impact: string;
    failure_code?: string;
  }>;
  best_improvement_mutations: Array<{
    mutation: string;
    quality_gain_percentage: string;
    confidence: number;
  }>;
  learned_heuristics: Array<{
    heuristic_id: string;
    context_condition: string;
    recommendation: string;
    confidence: number;
    sample_count: number;
    validation_status: string;
  }>;
  total_evaluations_monitored: number;
}

// =========================================================================
// NORTH STAR PRODUCT SUITE TYPES (§8, §13, §16.1, §17.1, §28, §29)
// =========================================================================

export interface ScoreContribution {
  factor: string;
  raw_value: number;
  weight: number;
  points: number;
  basis: "MEASURED" | "DECLARED" | "DEFAULT";
  sample_size: number;
  explanation: string;
}

export interface PersonalizedOpportunity {
  base_score: number;
  personalized_score: number;
  delta_vs_generic: number;
  opportunity_type: string;
  world_factors: ScoreContribution[];
  creator_factors: ScoreContribution[];
  measured_factor_count: number;
  assumed_factor_count: number;
}

export interface TimingVerdict {
  action: "POST_NOW" | "POST_SOON" | "WATCH" | "WAIT" | "SKIP";
  reason: string;
  urgency_score: number;
}

export interface RecommendationSource {
  name: string;
  url?: string;
  published_at?: string;
  quality_tier?: string;
}

export interface Recommendation {
  event_id?: string;
  topic_id?: string;
  headline: string;
  what_is_happening: string;
  why_it_matters: string;
  what_nobody_is_explaining: string;
  what_everyone_is_saying: string;
  opportunity: PersonalizedOpportunity;
  timing: TimingVerdict;
  best_angle: string;
  why_this_angle: string;
  alternative_angles: string[];
  platform: string;
  why_this_platform: string;
  content_format: string;
  estimated_production_minutes: number;
  hook_type: string;
  hook: string;
  production: {
    create_everything_endpoint: string;
    payload: Record<string, any>;
    visual_engine_hint: string;
    visual_engine_reason: string;
    estimated_production_minutes: number;
  };
  success_criteria: {
    has_baseline: boolean;
    note: string;
    log_endpoint: string;
    target_metric?: string;
  };
  event_status: string;
  event_confidence: number;
  source_count: number;
  sources: RecommendationSource[];
  claims_to_avoid: string[];
}

export interface SkippedCandidate {
  headline: string;
  event_id?: string;
  action: string;
  reason: string;
  score: number;
}

export interface DailyDecision {
  generated_at: string;
  creator: {
    creator_id: string;
    audience: string;
    voice_tone: string;
    technical_depth: string;
    risk_tolerance: number;
    measured_posts: number;
    baseline_engagement_rate?: number;
  };
  candidates_considered: number;
  top_recommendation?: Recommendation;
  alternatives: Recommendation[];
  publish_now: string[];
  ignore: SkippedCandidate[];
  evidence_coverage: {
    measured_factors: number;
    assumed_factors: number;
    creator_posts_on_record: number;
    personalized: boolean;
    delta_vs_generic: number;
  };
  assumptions: string[];
  no_recommendation_reason?: string;
}

export interface StageDuration {
  from_stage: string;
  to_stage: string;
  label: string;
  median_seconds?: number;
  p90_seconds?: number;
  fastest_seconds?: number;
  human: string;
  sample_size: number;
}

export interface QualityHold {
  fact_check?: number;
  originality?: number;
  prompt_readiness?: number;
  technical?: number;
  visual?: number;
  story?: number;
  platform?: number;
  human?: number;
  sample_size: number;
}

export interface NorthStarTrend {
  current_median_seconds?: number;
  previous_median_seconds?: number;
  change_pct?: number;
  direction: string;
  quality_direction: string;
  verdict: string;
}

export interface NorthStarReport {
  generated_at: string;
  window_days: number;
  clock_start: string;
  clock_start_note: string;
  published_count: number;
  completed_count: number;
  measured: boolean;
  time_to_publishable_median_seconds?: number;
  time_to_publishable_p90_seconds?: number;
  time_to_publishable_fastest_seconds?: number;
  median_human: string;
  stage_durations: StageDuration[];
  slowest_stage?: string;
  slowest_stage_seconds?: number;
  quality_hold: QualityHold;
  trend: NorthStarTrend;
  in_flight: Record<string, number>;
  stalled: Array<{
    lifecycle_id: string;
    topic?: string;
    stage: string;
    stalled_at: string;
    idle_hours: number;
  }>;
  honest_gaps: string[];
}

export interface CreateEverythingPackage {
  status: string;
  lifecycle_id: string;
  funnel_stage: string;
  strategy: {
    topic: string;
    angle: string;
    audience: string;
    goal: string;
    hook_strategy: string;
    visual_strategy: string;
    platform_strategy: string;
    reasoning: string;
  };
  content_suite: {
    brief: any;
    quality: any;
    x_content: {
      single_post: string;
      thread: string[];
    };
    x_hooks: HookCandidate[];
    linkedin_content: {
      content: string;
    };
    instagram_carousel: {
      slides: Array<{ slide_number: number; title: string; body: string; visual_note?: string }>;
    };
    instagram_reel: {
      script: string;
    };
    youtube_content: {
      titles: string[];
      thumbnails: Array<{ title: string; visual_concept: string; badge_text?: string }>;
      script: string;
      pinned_comment: string;
    };
  };
  video_package: VideoPackage;
  publishing: {
    x: {
      text: string;
      thread: string[];
      top_hook: string;
      hashtags: string[];
    };
    linkedin: {
      text: string;
      cta: string;
      hashtags: string[];
    };
    instagram: {
      carousel_slides: Array<{ slide_number: number; title: string; body: string; visual_note?: string }>;
      reel_script: string;
      caption: string;
      hashtags: string[];
    };
    youtube: {
      titles: string[];
      thumbnail_concepts: Array<{ title: string; visual_concept: string; badge_text?: string }>;
      script: string;
      pinned_comment: string;
    };
  };
  quality_summary: {
    content_quality: any;
    video_quality: any;
  };
}

export interface CreatorProfile {
  creator_id: string;
  niche: string;
  tone: string;
  primary_platforms: string[];
  target_audience: string;
  content_style_notes?: string;
}

// =========================================================================
// FUTURE.AII CONTENT OPERATING SYSTEM TYPES
// =========================================================================

export interface BrandConfig {
  handle: string;
  brand_name: string;
  positioning: string;
  tone: string;
  visual_style: string;
  audience_demographics: {
    primary_age: string;
    segments: string[];
  };
  pillar_targets: Record<string, number>;
  voice_guidelines: {
    vocabulary: string[];
    sentence_length: string;
    banned_cliches: string[];
    recurring_phrases: string[];
    hook_style: string;
  };
  anti_generic_rules: string[];
}

export interface PillarDefinition {
  id: string;
  name: string;
  target_share_pct: number;
  objective: string;
  format_structure: string[];
  default_formats: string[];
  cta_patterns: string[];
  prompt_instructions: string;
}

export interface SeriesDefinition {
  id: string;
  name: string;
  pillar: string;
  cadence: string;
  target_format: string;
  description: string;
  hook_formula: string;
  average_retention: number;
  average_shares: number;
  is_active: boolean;
}

export interface OpportunityScoreBreakdown {
  total_opportunity_score: number;
  freshness: number;
  momentum: number;
  relevance: number;
  audience_fit: number;
  competition: number;
  saturation: number;
  novelty: number;
  content_gap: number;
  creator_fit: number;
  historical_performance: number;
  production_difficulty: number;
  urgency: "POST_NOW" | "POST_TODAY" | "POST_THIS_WEEK" | "WATCH" | "SKIP";
  urgency_reason: string;
  recommended_pillar: string;
  recommended_series: string;
  recommended_format: string;
  recommended_angle: string;
}

export interface RankedContentOpportunity {
  id: string;
  event_id?: string;
  title: string;
  summary: string;
  primary_source: string;
  scores: OpportunityScoreBreakdown;
  entities: string[];
  key_claims: string[];
  alternative_angles: string[];
  created_at: string;
}

export interface HookEvaluation {
  category: string;
  text: string;
  composite_score: number;
  curiosity: number;
  clarity: number;
  novelty: number;
  relevance: number;
  retention_potential: number;
  credibility: number;
  clickbait_risk: number;
  tag?: "BEST" | "SAFE" | "HIGH_RISK" | null;
}

export interface HookSuite {
  best_hook: HookEvaluation;
  safe_hook: HookEvaluation;
  high_risk_hook: HookEvaluation;
  all_hooks: HookEvaluation[];
}

export interface ScriptSegment {
  sentence_id: string;
  time_start: number;
  time_end: number;
  phase: "HOOK" | "CONTEXT" | "PAYOFF" | "WHY_IT_MATTERS" | "CTA";
  voice: string;
  visual: string;
  on_screen_text: string;
  sfx: string;
  camera: string;
  underlying_claim?: string;
}

export interface ProductionScript {
  duration_seconds: number;
  pillar: string;
  series: string;
  hook_text: string;
  cta_text: string;
  total_words: number;
  estimated_wpm: number;
  segments: ScriptSegment[];
  formatted_director_notes: string;
}

export interface CTASpec {
  cta_type: string;
  public_cta_text: string;
  rationale: string;
  has_deliverable_resource: boolean;
  resource_keyword?: string;
}

export interface AutomationSpec {
  id: string;
  content_id?: string;
  trigger_source: string;
  keywords: string[];
  match_type: "EXACT" | "WORD" | "FLEXIBLE";
  public_reply_options: string[];
  initial_dm: string;
  resource_type: string;
  resource_content: string;
  follow_up_nudge?: string;
  status: string;
  analytics: {
    trigger_count: number;
    dm_sent_count: number;
    reply_count: number;
    conversion_count: number;
  };
}

export interface CarouselSlide {
  slide_number: number;
  slide_role: string;
  headline: string;
  body_points: string[];
  visual_layout: string;
  typography_hierarchy: string;
  diagram_spec?: string;
  cta_badge?: string;
}

export interface CarouselSpec {
  title: string;
  pillar: string;
  total_slides: number;
  target_aspect_ratio: string;
  slides: CarouselSlide[];
  caption: string;
  hashtags: string[];
}

export interface StoryItem {
  story_number: number;
  story_type: string;
  headline: string;
  subtext: string;
  interactive_sticker: Record<string, any>;
  background_visual: string;
  cta_link_or_sticker?: string;
}

export interface StorySequenceSpec {
  topic: string;
  total_stories: number;
  stories: StoryItem[];
}

export interface RemotionSpec {
  composition_name: string;
  duration_in_frames: number;
  fps: number;
  width: number;
  height: number;
  safe_zones: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  copyable_react_code: string;
  implementation_guide: string;
}

export interface SentenceClaimTrace {
  sentence_id: string;
  script_text: string;
  extracted_claim: string;
  source_name: string;
  source_url: string;
  source_date: string;
  evidence_snippet: string;
  confidence_score: number;
  epistemic_category: "FACT" | "INTERPRETATION" | "PREDICTION";
  verification_status: "CONFIRMED" | "UNVERIFIED" | "SPECULATIVE";
}

export interface FactAuditReport {
  total_claims_analyzed: number;
  confirmed_claims_count: number;
  unverified_claims_count: number;
  speculative_predictions_count: number;
  overall_confidence: number;
  is_fully_traceable: boolean;
  sentence_traces: SentenceClaimTrace[];
}

export interface ContentAssetPackage {
  content_id: string;
  pillar: string;
  series: string;
  topic: string;
  brand_handle: string;
  status: string;
  strategy: Record<string, any>;
  research: Record<string, any>;
  fact_audit: FactAuditReport;
  hooks: HookSuite;
  selected_hook: string;
  script: ProductionScript;
  shot_list: Array<{
    shot_number: number;
    time_range: string;
    phase: string;
    visual_description: string;
    camera_motion: string;
    sfx_cue: string;
    on_screen_text: string;
  }>;
  visual_plan: Record<string, any>;
  remotion_spec: RemotionSpec;
  ai_video_prompts: Record<string, string>;
  thumbnail_spec: Record<string, any>;
  caption: string;
  hashtags: string[];
  cta_spec: CTASpec;
  automation_spec?: AutomationSpec;
  story_sequence: StorySequenceSpec;
  carousel_spec: CarouselSpec;
  x_post: string;
  youtube_short: string;
  quality_scores: Record<string, number>;
  is_ready_to_post: boolean;
  publishing_window: string;
}

export interface TodayWorkspacePayload {
  greeting: string;
  north_star_headline: string;
  active_events_count: number;
  top_opportunities: RankedContentOpportunity[];
  star_opportunity: RankedContentOpportunity;
  ready_content_packages: ContentAssetPackage[];
  today_schedule_slots: Array<{
    date_str: string;
    day_of_week: string;
    time_slot: string;
    pillar: string;
    series: string;
    format: string;
    title: string;
    status: string;
  }>;
  engagement_tasks: Array<{
    task: string;
    status: string;
    estimated_time: string;
  }>;
  yesterday_learnings: string[];
  pillar_balance: Record<string, number>;
}

export interface ClusterPiece {
  piece_id: string;
  role: string;
  format: string;
  pillar: string;
  series: string;
  target_audience: string;
  angle: string;
  hook: string;
  synopsis: string;
  recommended_duration?: number;
  cta: string;
  comment_keyword?: string;
  is_approved: boolean;
}

export interface ContentClusterPackage {
  cluster_id: string;
  event_id?: string;
  event_title: string;
  cluster_theme: string;
  created_at: string;
  pieces: ClusterPiece[];
}

export interface ComparativeDiagnosticResult {
  post_a: {
    id: string;
    title: string;
    views: number;
    retention_rate: number;
    share_rate: number;
    save_rate: number;
    hook_type: string;
    duration_seconds: number;
    cta_type: string;
  };
  post_b: {
    id: string;
    title: string;
    views: number;
    retention_rate: number;
    share_rate: number;
    save_rate: number;
    hook_type: string;
    duration_seconds: number;
    cta_type: string;
  };
  winner_id: string;
  performance_multiple: number;
  differential_analysis: string[];
  key_takeaway: string;
  prescriptive_action: string;
}

export interface WinnerDetectionReport {
  winning_hooks: Array<Record<string, any>>;
  winning_topics: Array<Record<string, any>>;
  winning_formats: Array<Record<string, any>>;
  winning_pillars: Array<Record<string, any>>;
  winning_series: Array<Record<string, any>>;
  winning_ctas: Array<Record<string, any>>;
  winning_visual_styles: Array<Record<string, any>>;
  winning_durations: Array<Record<string, any>>;
  generated_at: string;
}

export interface CalendarDaySlot {
  date_str: string;
  day_of_week: string;
  time_slot: string;
  pillar: string;
  series: string;
  format: string;
  content_id?: string;
  title?: string;
  status: string;
}

export interface Calendar30DayView {
  start_date: string;
  end_date: string;
  total_slots: number;
  pillar_distribution: Record<string, number>;
  target_distribution: Record<string, number>;
  slots: CalendarDaySlot[];
}

export interface PipelineStageSummary {
  stage: string;
  count: number;
  items: Array<Record<string, any>>;
}

export interface ContentOSItem {
  id: string;
  title: string;
  brand?: string;
  pillar: string;
  series: string;
  topic: string;
  event_id?: string;
  goal: string;
  audience: string;
  platform: string;
  format: string;
  angle: string;
  research?: Record<string, any>;
  sources?: Array<{
    id?: string;
    source_name: string;
    url: string;
    date?: string;
    confidence?: number;
  }>;
  claims?: Array<{
    claim_id: string;
    claim: string;
    source_name: string;
    source_url: string;
    confidence: number;
  }>;
  hook: string;
  all_hooks?: Array<{
    category: string;
    text: string;
    scores: Record<string, number>;
    badge: string;
  }>;
  script: string;
  script_cues?: Array<{
    sentence_id: string;
    time_start: number;
    time_end: number;
    phase: string;
    voice: string;
    visual: string;
    on_screen_text: string;
    sfx: string;
    camera: string;
    underlying_claim: string;
  }>;
  visual_plan?: {
    format: string;
    duration_seconds: number;
    style: string;
    color_palette: string[];
    motion_intensity: string;
    soundtrack: string;
    remotion_ready: boolean;
  };
  remotion_code?: string;
  caption?: string;
  hashtags?: string[];
  cta?: string;
  comment_trigger?: string;
  dm_automation?: {
    trigger_type: string;
    keywords: string[];
    public_reply: string;
    dm_text: string;
    resource_url: string;
    resource_name: string;
    followup_nudge: string;
  };
  carousel_slides?: Array<{
    slide_number: number;
    role: string;
    headline: string;
    body: string;
    visual_direction: string;
    cta_text?: string;
  }>;
  story_sequence?: Array<{
    story_number: number;
    type: string;
    title: string;
    interactive_element: string;
    options?: string[];
    cta_text?: string;
  }>;
  x_post?: string;
  youtube_short?: {
    title: string;
    hook: string;
    script: string;
    description: string;
    tags: string[];
  };
  status?: string;
  stage?: string;
  quality_score?: number;
  duplication_checked?: boolean;
  created_at?: string;
  published_at?: string;
  performance?: Record<string, any>;
  learning?: Record<string, any>;
}
