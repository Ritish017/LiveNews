import { V3Event, OpportunityCard, Topic, ContentItem } from "../types";

export const MOCK_EVENTS: V3Event[] = [
  {
    id: "event_suno_v6_music",
    title: "Suno Replaces AI Models with Licensed Music Architecture Amid Copyright Lawsuits",
    summary: "As copyright lawsuits intensify, Suno announces its new model, Suno v6, completely abandoning previous web-scraped datasets and training exclusively on licensed music catalogs.",
    category: "Generative Audio",
    status: "CONFIRMED",
    confidence_score: 99,
    source_count: 16,
    independent_source_count: 9,
    primary_source_name: "TechCrunch",
    primary_source_url: "https://techcrunch.com/2026/09/09/suno-replaces-its-ai-models-with-a-new-one-trained-on-licensed-music-as-copyright-suits-pile-up/",
    entities: ["Suno", "Suno v6", "Music Copyright", "RIAA", "Generative Audio"],
    key_facts: [
      "Suno v6 is trained entirely without data from previous controversial model checkpoints.",
      "Direct response to major record label lawsuits alleging unauthorized copyright scraping.",
      "New enterprise licensing model allows commercial music synchronization with full indemnification."
    ],
    relevance_score: 99,
    freshness_score: 98,
    momentum_score: 97,
    opportunity_score: 98,
    recommended_action: "POST_NOW",
    recommended_angle: "Why the death of uncurated training data is the biggest precedent in AI audio",
    recommended_platform: "X",
    event_timestamp: new Date(Date.now() - 3600000).toISOString(),
    first_seen_at: new Date(Date.now() - 7200000).toISOString(),
    surfaced_at: new Date(Date.now() - 3500000).toISOString(),
    total_pipeline_latency: 18.4,
    sources: [
      {
        source_name: "TechCrunch",
        url: "https://techcrunch.com/2026/09/09/suno-replaces-its-ai-models-with-a-new-one-trained-on-licensed-music-as-copyright-suits-pile-up/",
        quality_tier: "Tier 1",
        title: "Suno replaces its AI models with a new one trained on licensed music as copyright suits pile up",
        published_at: new Date(Date.now() - 3600000).toISOString()
      },
      {
        source_name: "Billboard",
        url: "https://billboard.com/business/legal/suno-v6-licensed-music-pivot",
        quality_tier: "Tier 1",
        title: "Suno pivots to clean data pipeline as label settlement talks advance",
        published_at: new Date(Date.now() - 4200000).toISOString()
      }
    ]
  },
  {
    id: "event_anthropic_extinction_warning",
    title: "Anthropic Researcher Warns of >10% AI Extinction Risk Following Colleague Resignation",
    summary: "Senior Anthropic alignment researchers go on record warning that existential catastrophe risk from autonomous frontier systems exceeds 10%, triggering bipartisan congressional hearings.",
    category: "AI Safety & Policy",
    status: "CONFIRMED",
    confidence_score: 97,
    source_count: 18,
    independent_source_count: 11,
    primary_source_name: "BBC News",
    primary_source_url: "https://bbc.com/news/technology/anthropic-ai-risk-warning",
    entities: ["Anthropic", "Claude", "AI Safety", "P(Doom)", "Frontier AI"],
    key_facts: [
      "Second senior alignment departure from Anthropic within 60 days citing rapid scaling risks.",
      "Researcher claims internal safety evaluations lag behind autonomous multi-step reasoning capabilities.",
      "Bipartisan lawmakers call for emergency review of voluntary frontier safety commitments."
    ],
    relevance_score: 98,
    freshness_score: 96,
    momentum_score: 98,
    opportunity_score: 97,
    recommended_action: "POST_NOW",
    recommended_angle: "The insider reality: why internal alignment researchers are sounding the alarm now",
    recommended_platform: "LinkedIn",
    event_timestamp: new Date(Date.now() - 7200000).toISOString(),
    first_seen_at: new Date(Date.now() - 10800000).toISOString(),
    surfaced_at: new Date(Date.now() - 6800000).toISOString(),
    total_pipeline_latency: 21.2,
    sources: [
      {
        source_name: "BBC News",
        url: "https://bbc.com/news/technology/anthropic-ai-risk-warning",
        quality_tier: "Tier 1",
        title: "Anthropic researcher believes more than 10% chance AI 'could kill all humans'",
        published_at: new Date(Date.now() - 7200000).toISOString()
      },
      {
        source_name: "CNBC",
        url: "https://cnbc.com/2026/09/09/anthropic-researcher-quits-ai-risk.html",
        quality_tier: "Tier 1",
        title: "Anthropic researcher says AI has more than 10% chance of 'killing all humans'",
        published_at: new Date(Date.now() - 8000000).toISOString()
      }
    ]
  },
  {
    id: "event_cognition_48b_valuation",
    title: "Cognition Hits $48B Valuation as Autonomous Coding Agents Scale Across Enterprise",
    summary: "Cognition AI closes massive funding round valuing the company at $48B, indicating investor conviction that software engineering automation is expanding into multi-repo enterprise orchestration.",
    category: "AI Coding & Agents",
    status: "CONFIRMED",
    confidence_score: 96,
    source_count: 14,
    independent_source_count: 8,
    primary_source_name: "TechCrunch",
    primary_source_url: "https://techcrunch.com/2026/09/08/cognition-hits-48b-valuation/",
    entities: ["Cognition", "Devin", "Cursor", "AI Coding", "Enterprise SaaS"],
    key_facts: [
      "Valuation surges past Cursor's previous acquisition multiple.",
      "Enterprise ARR reportedly grew 8x year-over-year from automated migration pipelines.",
      "Signals aggressive competition between autonomous agent startups and legacy developer tooling."
    ],
    relevance_score: 96,
    freshness_score: 93,
    momentum_score: 95,
    opportunity_score: 96,
    recommended_action: "POST_NOW",
    recommended_angle: "The $48B software rewrite: why coding agents won the enterprise before consumer chat",
    recommended_platform: "X",
    event_timestamp: new Date(Date.now() - 14400000).toISOString(),
    first_seen_at: new Date(Date.now() - 18000000).toISOString(),
    surfaced_at: new Date(Date.now() - 14000000).toISOString(),
    total_pipeline_latency: 24.8,
    sources: [
      {
        source_name: "TechCrunch",
        url: "https://techcrunch.com/2026/09/08/cognition-hits-48b-valuation/",
        quality_tier: "Tier 1",
        title: "Cognition hits $48B valuation, signaling investors believe AI coding is far from winner-take-all",
        published_at: new Date(Date.now() - 14400000).toISOString()
      }
    ]
  },
  {
    id: "event_meta_muse_agent",
    title: "Meta Debuts Muse Personal AI Agent with System-Wide OS Permissions",
    summary: "Meta launches Muse, a deeply integrated personal AI agent with access to user calendars, emails, transactions, and health data, setting up a privacy showdown with Apple and Google.",
    category: "Personal AI Agents",
    status: "CONFIRMED",
    confidence_score: 95,
    source_count: 12,
    independent_source_count: 7,
    primary_source_name: "TechCrunch",
    primary_source_url: "https://techcrunch.com/2026/09/08/meta-debuts-its-muse-ai-agent-will-consumers-trust-it/",
    entities: ["Meta", "Muse", "Personal AI", "Agentic Systems", "Privacy"],
    key_facts: [
      "Operates directly across WhatsApp, Instagram, desktop OS, and Ray-Ban smart glasses.",
      "Can execute financial micro-transactions and automated scheduling without app switching.",
      "Privacy advocacy groups question Meta's cross-platform data blending policies."
    ],
    relevance_score: 94,
    freshness_score: 92,
    momentum_score: 94,
    opportunity_score: 94,
    recommended_action: "POST_NOW",
    recommended_angle: "The trust trade-off: why Meta is betting the company on an agent that reads everything",
    recommended_platform: "X",
    event_timestamp: new Date(Date.now() - 21600000).toISOString(),
    first_seen_at: new Date(Date.now() - 25200000).toISOString(),
    surfaced_at: new Date(Date.now() - 21000000).toISOString(),
    total_pipeline_latency: 26.5,
    sources: [
      {
        source_name: "TechCrunch",
        url: "https://techcrunch.com/2026/09/08/meta-debuts-its-muse-ai-agent-will-consumers-trust-it/",
        quality_tier: "Tier 1",
        title: "Meta debuts its Muse AI agent. Will consumers trust it?",
        published_at: new Date(Date.now() - 21600000).toISOString()
      }
    ]
  },
  {
    id: "event_alphagenome_atlas",
    title: "Google DeepMind Unveils AlphaGenome Atlas Mapping 3B Human DNA Base Pairs",
    summary: "Google DeepMind introduces AlphaGenome Atlas, a predictive neural map modeling every possible DNA mutation across the human genome to accelerate disease therapeutics.",
    category: "Genomics & Life Sciences",
    status: "CONFIRMED",
    confidence_score: 98,
    source_count: 15,
    independent_source_count: 10,
    primary_source_name: "The Verge",
    primary_source_url: "https://theverge.com/ai-artificial-intelligence/google-launches-alpha-genome-atlas",
    entities: ["Google DeepMind", "AlphaGenome Atlas", "Genomics", "Healthcare AI", "Biology"],
    key_facts: [
      "Models the functional impact of single-letter base pair substitutions across all 3 billion human genome locations.",
      "Predicts non-coding variant consequences with unprecedented spatial molecular accuracy.",
      "Made available freely to global academic researchers and non-profit disease foundations."
    ],
    relevance_score: 95,
    freshness_score: 91,
    momentum_score: 93,
    opportunity_score: 93,
    recommended_action: "POST_SOON",
    recommended_angle: "Beyond AlphaFold: how DeepMind is converting the entire genetic code into a differentiable map",
    recommended_platform: "LinkedIn",
    event_timestamp: new Date(Date.now() - 28800000).toISOString(),
    first_seen_at: new Date(Date.now() - 32400000).toISOString(),
    surfaced_at: new Date(Date.now() - 28000000).toISOString(),
    total_pipeline_latency: 31.0,
    sources: [
      {
        source_name: "The Verge",
        url: "https://theverge.com/ai-artificial-intelligence/google-launches-alpha-genome-atlas",
        quality_tier: "Tier 1",
        title: "Google's Atlas of the human genome could pave the way for new treatments",
        published_at: new Date(Date.now() - 28800000).toISOString()
      }
    ]
  },
  {
    id: "event_mistral_3b_series_d",
    title: "Mistral Raises €3B Series D at €21B Valuation for Sovereign European AI",
    summary: "French AI champion Mistral AI secures €3 billion in funding led by Samsung and European sovereign funds to expand proprietary inference superclusters across the EU.",
    category: "Enterprise AI & Funding",
    status: "CONFIRMED",
    confidence_score: 96,
    source_count: 11,
    independent_source_count: 6,
    primary_source_name: "TechCrunch",
    primary_source_url: "https://techcrunch.com/2026/09/08/mistral-raises-e3b-as-sovereign-ai-becomes-big-business/",
    entities: ["Mistral AI", "Sovereign AI", "European AI", "Samsung", "Series D"],
    key_facts: [
      "Valuation reaches €21 billion, solidifying Mistral as Europe's premier frontier AI lab.",
      "Capital dedicated to localized sovereign compute clusters compliant with EU AI Act.",
      "Introduces customized enterprise private models deployed completely behind corporate air-gaps."
    ],
    relevance_score: 92,
    freshness_score: 89,
    momentum_score: 90,
    opportunity_score: 91,
    recommended_action: "POST_SOON",
    recommended_angle: "The sovereign AI boom: why nations and conglomerates are paying premiums for non-US models",
    recommended_platform: "LinkedIn",
    event_timestamp: new Date(Date.now() - 36000000).toISOString(),
    first_seen_at: new Date(Date.now() - 39600000).toISOString(),
    surfaced_at: new Date(Date.now() - 35500000).toISOString(),
    total_pipeline_latency: 25.4,
    sources: [
      {
        source_name: "TechCrunch",
        url: "https://techcrunch.com/2026/09/08/mistral-raises-e3b-as-sovereign-ai-becomes-big-business/",
        quality_tier: "Tier 1",
        title: "Mistral raises €3B as sovereign AI becomes big business",
        published_at: new Date(Date.now() - 36000000).toISOString()
      }
    ]
  }
];

export const MOCK_OPPORTUNITIES: OpportunityCard[] = [
  {
    rank: 1,
    id: "opp_suno_v6",
    topic: "Suno Licensed Data Pivot",
    category: "Generative Audio",
    opportunity_score: 98,
    opportunity_type: "INDUSTRY_PRECEDENT",
    lifecycle: "EXPLODING",
    lifecycle_badge: "🔥 BREAKING TODAY",
    momentum: 97,
    momentum_change_pct: 42.5,
    momentum_direction: "ACCELERATING",
    competition: 21,
    novelty: 98,
    audience_fit: 96,
    primary_audience: "Creators, Audio Engineers & Tech Founders",
    recommended_action: "POST_NOW",
    action_reason: "First major generative AI lab to scrap its core dataset in favor of licensed training. Peak viral distribution window is active right now.",
    recommended_angle: "Why Suno v6 marks the end of the 'scrape first, ask forgiveness later' AI era",
    alternative_angles: [
      "The business economics of licensed generative audio models",
      "What creators need to know about commercial indemnification in 2026"
    ],
    recommended_hook: "Suno just deleted their entire training dataset and started over. Here's why this changes everything.",
    hook_strategy: "CONTRARIAN",
    recommended_format: "X Thread + Video Reel",
    format_scores: { "X Thread": 98, "LinkedIn Post": 94, "Video Reel": 92 },
    item_count: 16,
    primary_source: "TechCrunch",
    sources_summary: ["TechCrunch", "Billboard", "Reuters"]
  },
  {
    rank: 2,
    id: "opp_anthropic_safety",
    topic: "Anthropic 10% AI Extinction Risk",
    category: "AI Safety & Policy",
    opportunity_score: 97,
    opportunity_type: "WHISTLEBLOWER_SIGNAL",
    lifecycle: "EXPLODING",
    lifecycle_badge: "⚡ VIRAL SURGE",
    momentum: 98,
    momentum_change_pct: 38.0,
    momentum_direction: "ACCELERATING",
    competition: 32,
    novelty: 96,
    audience_fit: 95,
    primary_audience: "AI Engineers, Policy Leaders & Tech Commentators",
    recommended_action: "POST_NOW",
    action_reason: "High controversy and massive mainstream coverage across BBC, CNBC, and X. High engagement on balanced technical dissections.",
    recommended_angle: "Separating media sensationalism from actual alignment bottlenecks: what the departing researchers are actually warning about",
    alternative_angles: [
      "Why multi-step autonomous reasoning makes black-box evaluations fail",
      "The governance dilemma: can voluntary lab safety standards survive commercial pressures?"
    ],
    recommended_hook: "When a top Anthropic safety researcher resigns and warns of a 10% extinction probability, you don't ignore it.",
    hook_strategy: "URGENCY",
    recommended_format: "LinkedIn In-Depth Breakdown",
    format_scores: { "LinkedIn Post": 98, "X Thread": 96, "Video": 89 },
    item_count: 18,
    primary_source: "BBC News",
    sources_summary: ["BBC News", "CNBC", "Anthropic Alignment Forum"]
  },
  {
    rank: 3,
    id: "opp_cognition_48b",
    topic: "Cognition $48B Valuation & Coding Agents",
    category: "AI Coding & Agents",
    opportunity_score: 96,
    opportunity_type: "VENTURE_MILESTONE",
    lifecycle: "ACCELERATING",
    lifecycle_badge: "🚀 EXPLODING",
    momentum: 95,
    momentum_change_pct: 26.5,
    momentum_direction: "ACCELERATING",
    competition: 28,
    novelty: 94,
    audience_fit: 96,
    primary_audience: "Software Developers & Engineering Managers",
    recommended_action: "POST_NOW",
    action_reason: "Proof that software generation agents are dominating enterprise IT budgets faster than any other generative AI category.",
    recommended_angle: "The $48B enterprise coding thesis: how multi-repo orchestration replaced autocomplete",
    alternative_angles: [
      "Benchmark breakdown: autonomous bug fixes vs developer oversight",
      "Why developer tooling multiple valuations are outpacing foundation models"
    ],
    recommended_hook: "Cognition is now worth $48 Billion. Here is why enterprise software development will never look the same.",
    hook_strategy: "DATA_DRIVEN",
    recommended_format: "X Thread + Architecture Diagram",
    format_scores: { "X Thread": 96, "LinkedIn Post": 95, "Video Reel": 88 },
    item_count: 14,
    primary_source: "TechCrunch",
    sources_summary: ["TechCrunch", "The Information", "GitHub Trends"]
  },
  {
    rank: 4,
    id: "opp_meta_muse",
    topic: "Meta Muse Personal Agent Launch",
    category: "Personal AI Agents",
    opportunity_score: 94,
    opportunity_type: "CONSUMER_AI_LAUNCH",
    lifecycle: "EMERGING",
    lifecycle_badge: "🔥 NEW TODAY",
    momentum: 94,
    momentum_change_pct: 31.0,
    momentum_direction: "ACCELERATING",
    competition: 36,
    novelty: 92,
    audience_fit: 93,
    primary_audience: "Tech Consumers & Product Builders",
    recommended_action: "POST_SOON",
    action_reason: "Major tech giant making unprecedented request for deep OS and financial permissions. High debate potential.",
    recommended_angle: "The privacy bargain of 2026: would you let an AI read all your messages if it saved you 5 hours a week?",
    alternative_angles: [
      "Meta Muse architecture: on-device vs cloud agent execution",
      "How Muse compares to Apple Intelligence and Google Project Astra"
    ],
    recommended_hook: "Meta just launched Muse, an AI agent that wants access to your bank, calendar, and health data. Would you trust it?",
    hook_strategy: "PROVOCATIVE_QUESTION",
    recommended_format: "Poll + Carousel Breakdown",
    format_scores: { "X Thread": 94, "LinkedIn Post": 91, "Video Reel": 93 },
    item_count: 12,
    primary_source: "TechCrunch",
    sources_summary: ["TechCrunch", "The Verge", "Meta Newsroom"]
  },
  {
    rank: 5,
    id: "opp_alphagenome",
    topic: "AlphaGenome Atlas DNA Mapping",
    category: "Genomics & Life Sciences",
    opportunity_score: 93,
    opportunity_type: "SCIENTIFIC_BREAKTHROUGH",
    lifecycle: "EMERGING",
    lifecycle_badge: "🧬 BREAKTHROUGH",
    momentum: 93,
    momentum_change_pct: 19.5,
    momentum_direction: "ACCELERATING",
    competition: 18,
    novelty: 99,
    audience_fit: 91,
    primary_audience: "Biotech Builders, Researchers & Tech Enthusiasts",
    recommended_action: "POST_SOON",
    action_reason: "Profound scientific impact. Low saturation in general tech feeds; high viral curiosity on the biology implications.",
    recommended_angle: "How DeepMind converted 3 billion letters of human DNA into a predictive computer program",
    alternative_angles: [
      "The therapeutic revolution: predicting mutation outcomes before clinical trials",
      "Why biology continues to be AI's most undeniable achievement"
    ],
    recommended_hook: "DeepMind just mapped all 3 billion letters of human DNA with AI. Here is what this means for curing genetic diseases.",
    hook_strategy: "WONDER",
    recommended_format: "Educational Visual Carousel",
    format_scores: { "LinkedIn Post": 96, "X Thread": 92, "YouTube Short": 94 },
    item_count: 15,
    primary_source: "The Verge",
    sources_summary: ["The Verge", "Google DeepMind Blog", "Nature"]
  }
];

export const MOCK_TRENDS: Topic[] = [
  {
    id: "trend_licensed_audio",
    name: "Generative Audio & Copyright Pipelines",
    category: "Generative Audio",
    momentum: 97,
    momentum_change_pct: 42.0,
    momentum_direction: "ACCELERATING",
    status: "CONFIRMED",
    lifecycle_stage: "EXPLODING",
    opportunity_score: 98,
    opportunity_type: "INDUSTRY_PRECEDENT",
    competition_score: 21,
    novelty_score: 98,
    audience_fit_score: 96,
    recommended_action: "POST_NOW",
    action_reason: "High momentum catalyst triggered by Suno v6 complete dataset rewrite.",
    recommended_angle: "The clean data era: why synthetic & licensed pipelines are replacing web scraping",
    alternative_angles: ["Legal risks for creators using early generative tools", "Fair use defense collapse in commercial music"],
    recommended_hook_type: "CONTRARIAN",
    hook_strategy: "Highlighting rapid commercial compliance pivot",
    recommended_format: "X Thread + Audio Snippet",
    item_count: 16,
    sources_summary: ["TechCrunch", "Billboard", "Reuters"],
    primary_source: "TechCrunch",
    updated_at: new Date().toISOString()
  },
  {
    id: "trend_ai_safety_governance",
    name: "Frontier Model Alignment & Extinction Risk",
    category: "AI Safety & Policy",
    momentum: 98,
    momentum_change_pct: 38.0,
    momentum_direction: "ACCELERATING",
    status: "CONFIRMED",
    lifecycle_stage: "EXPLODING",
    opportunity_score: 97,
    opportunity_type: "WHISTLEBLOWER_SIGNAL",
    competition_score: 32,
    novelty_score: 96,
    audience_fit_score: 95,
    recommended_action: "POST_NOW",
    action_reason: "High debate velocity following senior Anthropic alignment departures.",
    recommended_angle: "Why evaluation benchmarks are struggling to keep up with autonomous multi-step reasoning",
    alternative_angles: ["The policy timeline: upcoming US/EU regulatory audits"],
    recommended_hook_type: "URGENCY",
    hook_strategy: "Direct quotation of insider whistleblower statements",
    recommended_format: "In-Depth LinkedIn Post",
    item_count: 18,
    sources_summary: ["BBC News", "CNBC", "Wired"],
    primary_source: "BBC News",
    updated_at: new Date().toISOString()
  },
  {
    id: "trend_coding_agents_enterprise",
    name: "Autonomous Coding & Enterprise Multi-Repo Agents",
    category: "AI Coding & Agents",
    momentum: 95,
    momentum_change_pct: 26.5,
    momentum_direction: "ACCELERATING",
    status: "CONFIRMED",
    lifecycle_stage: "EXPLODING",
    opportunity_score: 96,
    opportunity_type: "VENTURE_MILESTONE",
    competition_score: 28,
    novelty_score: 94,
    audience_fit_score: 96,
    recommended_action: "POST_NOW",
    action_reason: "Cognition $48B valuation milestone sparks massive technical debate.",
    recommended_angle: "Why the value in developer tooling shifted from code completion to automated test verification",
    alternative_angles: ["The economics of enterprise software rewrite loops"],
    recommended_hook_type: "DATA_DRIVEN",
    hook_strategy: "Contrasting market valuation with legacy developer SaaS metrics",
    recommended_format: "X Thread",
    item_count: 14,
    sources_summary: ["TechCrunch", "GitHub", "The Information"],
    primary_source: "TechCrunch",
    updated_at: new Date().toISOString()
  }
];

export const MOCK_NEWS_ITEMS = [
  {
    id: "news_1",
    title: "Suno replaces its AI models with a new one trained on licensed music as copyright suits pile up",
    content: "As it grapples with a bevy of lawsuits, Suno said its new model, Suno v6, is not trained using music it used to train previous versions of the AI model.",
    source: "TechCrunch",
    source_quality: "Tier 1",
    url: "https://techcrunch.com/2026/09/09/suno-replaces-its-ai-models-with-a-new-one-trained-on-licensed-music-as-copyright-suits-pile-up/",
    published_at: new Date(Date.now() - 3600000).toISOString(),
    category: "Generative Audio",
    viral_potential: 98,
    confirmed_facts: ["Suno v6 launched", "100% licensed training catalog", "Prior checkpoint deprecation"],
    uncertain_claims: []
  },
  {
    id: "news_2",
    title: "Anthropic researcher believes more than 10% chance AI 'could kill all humans'",
    content: "Senior safety researcher at Anthropic makes urgent public appeal following high-profile team resignations, urging stricter oversight before next-gen reasoning models deploy.",
    source: "BBC News",
    source_quality: "Tier 1",
    url: "https://bbc.com/news/technology/anthropic-ai-risk-warning",
    published_at: new Date(Date.now() - 7200000).toISOString(),
    category: "AI Safety & Policy",
    viral_potential: 97,
    confirmed_facts: ["Senior researcher public statement", "Congressional hearing requested"],
    uncertain_claims: []
  },
  {
    id: "news_3",
    title: "Cognition hits $48B valuation, signaling investors believe AI coding is far from winner-take-all",
    content: "The creator of autonomous software engineer Devin closes multi-billion dollar round at $48B valuation as enterprise software teams deploy automated migration agents.",
    source: "TechCrunch",
    source_quality: "Tier 1",
    url: "https://techcrunch.com/2026/09/08/cognition-hits-48b-valuation/",
    published_at: new Date(Date.now() - 14400000).toISOString(),
    category: "AI Coding & Agents",
    viral_potential: 96,
    confirmed_facts: ["$48B valuation", "Enterprise ARR expansion"],
    uncertain_claims: []
  },
  {
    id: "news_4",
    title: "Meta debuts its Muse AI agent requesting system-wide device permissions",
    content: "Meta's new personal assistant Muse asks users for unprecedented access across email, calendars, financial payment rails, and camera feeds.",
    source: "TechCrunch",
    source_quality: "Tier 1",
    url: "https://techcrunch.com/2026/09/08/meta-debuts-its-muse-ai-agent-will-consumers-trust-it/",
    published_at: new Date(Date.now() - 21600000).toISOString(),
    category: "Personal AI Agents",
    viral_potential: 94,
    confirmed_facts: ["Cross-platform launch", "Financial execution integration"],
    uncertain_claims: []
  },
  {
    id: "news_5",
    title: "Google's Atlas of the human genome could pave the way for new disease treatments",
    content: "DeepMind introduces AlphaGenome Atlas, modeling the exact clinical impact of single DNA base changes across the entire 3 billion letter human genome.",
    source: "The Verge",
    source_quality: "Tier 1",
    url: "https://theverge.com/ai-artificial-intelligence/google-launches-alpha-genome-atlas",
    published_at: new Date(Date.now() - 28800000).toISOString(),
    category: "Genomics & Life Sciences",
    viral_potential: 93,
    confirmed_facts: ["AlphaGenome Atlas released", "Free academic license"],
    uncertain_claims: []
  }
];

export const MOCK_GRAPH_DATA = {
  nodes: [
    { id: "node_audio", label: "Generative Audio", type: "category", size: 28, momentum: 97, color: "#f59e0b" },
    { id: "node_safety", label: "Frontier Alignment", type: "category", size: 26, momentum: 98, color: "#ef4444" },
    { id: "node_agents", label: "Enterprise Coding", type: "category", size: 25, momentum: 96, color: "#3b82f6" },
    { id: "node_genomics", label: "AlphaGenome Atlas", type: "topic", size: 22, momentum: 93, color: "#10b981" },
    { id: "node_suno", label: "Suno v6 Licensed Pivot", type: "event", size: 24, momentum: 98, color: "#f59e0b" },
    { id: "node_anthropic", label: "Anthropic Safety Quits", type: "event", size: 23, momentum: 97, color: "#ef4444" },
    { id: "node_cognition", label: "Cognition $48B Valuation", type: "event", size: 22, momentum: 95, color: "#3b82f6" }
  ],
  links: [
    { source: "node_audio", target: "node_suno", strength: 0.9 },
    { source: "node_safety", target: "node_anthropic", strength: 0.9 },
    { source: "node_agents", target: "node_cognition", strength: 0.8 },
    { source: "node_safety", target: "node_agents", strength: 0.5 },
    { source: "node_audio", target: "node_agents", strength: 0.4 }
  ]
};

export function createMockVideoPackage(title = "Suno Replaces AI Models with Licensed Music Architecture", platform = "X & YouTube"): any {
  return {
    package_id: "pkg_" + Date.now(),
    title: title,
    topic: title,
    platform: "X & YouTube",
    readiness_score: 96,
    timeline: [
      {
        scene_number: 1,
        timecode: "00:00 - 00:04",
        duration_sec: 4,
        beat_type: "Hook / Disruption",
        narration: "The 'scrape first, ask forgiveness later' era of AI just ended.",
        visual_direction: "Macro zoom on audio waveform disintegrating into clean licensing contract text.",
        camera_instruction: "Rapid push-in with anamorphic lens flare.",
        on_screen_text: "DATASETS DELETED",
        recommended_engine: "Google Veo 3",
        asset_prompt: "Cinematic recording studio console glowing with purple neon telemetry"
      },
      {
        scene_number: 2,
        timecode: "00:04 - 00:12",
        duration_sec: 8,
        beat_type: "Mechanism / Paradigm Shift",
        narration: "Suno v6 discarded every piece of prior training data to build a 100% legally clean pipeline.",
        visual_direction: "Split screen showing record label legal filings against neural audio spectrograms.",
        camera_instruction: "Lateral tracking dolly pan.",
        on_screen_text: "100% LICENSED DATA",
        recommended_engine: "Remotion Engine",
        asset_prompt: "Animated legal vs dataset comparison chart with high-contrast UI"
      },
      {
        scene_number: 3,
        timecode: "00:12 - 00:20",
        duration_sec: 8,
        beat_type: "Industry Impact",
        narration: "This sets the gold standard for every media lab: training data provenance is now table stakes.",
        visual_direction: "Server rack interior illuminating sequentially as verified green lock icons appear.",
        camera_instruction: "Elevated high angle forward crane descend.",
        on_screen_text: "PROVENANCE > BRUTE FORCE",
        recommended_engine: "OpenAI Sora 2",
        asset_prompt: "Futuristic digital audio workstation with holographic compliance badges"
      }
    ],
    shot_list: [
      { shot_id: "shot_01", scene_number: 1, shot_type: "Extreme Close-Up", camera_angle: "Low Angle", lens: "50mm Anamorphic", movement: "Push-In", lighting: "Cyberpunk Violet", duration_sec: 4, complexity_score: 2, framing: "Rule of Thirds", focal_plane: "Front" }
    ],
    asset_manifest: [],
    audio_plan: {
      voiceover_script: "The 'scrape first, ask forgiveness later' era of AI just ended...",
      music_genre: "Dark Propulsive Electronic",
      bpm_range: "124 BPM",
      emotional_role: "Authoritative & Revelatory",
      sfx_cues: []
    },
    engines: {},
    quality_report: {
      overall_readiness_score: 96,
      passes_quality_gate: true,
      dimension_scores: { temporal_coherence: 96, camera_grammar: 97, pacing_velocity: 95, asset_anchoring: 96, anti_slop_cleanliness: 98 },
      self_critique: ["Camera motion strictly reinforces the business revelation."],
      prohibited_phrases_detected: []
    },
    visual_concepts: { suite_id: "vc_01", candidates: [], selected_concept: null },
    forensic_report: { report_id: "rep_01", triad_score: { overall_quality_score: 95.0, physical_realism_score: 94.0, prompt_fidelity_score: 97.0, production_execution_score: 95.0 }, critical_failures_detected: [], verdict: "PRODUCTION_READY" },
    created_at: new Date().toISOString()
  };
}

export const MOCK_DAILY_DECISION: any = {
  generated_at: new Date().toISOString(),
  creator: {
    creator_id: "default_creator",
    audience: "AI Engineers, Tech Founders & Creators",
    voice_tone: "Technical & Direct",
    technical_depth: "High (Architecture & Market Economics)",
    risk_tolerance: 0.75,
    measured_posts: 16,
    baseline_engagement_rate: 5.12
  },
  candidates_considered: 18,
  top_recommendation: {
    event_id: "event_suno_v6_music",
    headline: "Suno Replaces AI Models with Licensed Architecture Amid Copyright Lawsuits",
    what_is_happening: "Suno officially announced Suno v6, abandoning all previously web-scraped checkpoints to retrain from scratch on fully licensed catalogs as record label lawsuits reach critical junctures.",
    why_it_matters: "This is the first time a premier consumer generative AI lab has capitulated on scraped training data and proven a top-tier model can be built exclusively with licensed rights.",
    what_nobody_is_explaining: "Most press coverage treats this merely as legal settlement PR. What nobody is explaining is the architectural cost and how provenance watermarking is being baked into model latent space.",
    what_everyone_is_saying: "Everyone is hyping the copyright drama without explaining the fundamental shift from open web scraping to proprietary licensing cartels.",
    opportunity: {
      base_score: 96.0,
      personalized_score: 98.0,
      delta_vs_generic: 2.0,
      opportunity_type: "INDUSTRY_PRECEDENT",
      world_factors: [
        { factor: "momentum", raw_value: 97.0, weight: 0.25, points: 24.25, basis: "MEASURED", sample_size: 16, explanation: "Viral surge across TechCrunch, Billboard, and creator communities." },
        { factor: "freshness", raw_value: 98.0, weight: 0.25, points: 24.50, basis: "MEASURED", sample_size: 1, explanation: "Surfaced live today; peak engagement window is active." },
        { factor: "novelty", raw_value: 98.0, weight: 0.25, points: 24.50, basis: "MEASURED", sample_size: 1, explanation: "First complete architectural pivot on training data provenance." },
        { factor: "competition", raw_value: 24.0, weight: 0.25, points: 6.00, basis: "MEASURED", sample_size: 8, explanation: "Low competition on rigorous technical diffs." }
      ],
      creator_factors: [
        { factor: "topic_affinity", raw_value: 96.0, weight: 0.5, points: 1.5, basis: "MEASURED", sample_size: 8, explanation: "AI audio & model economics posts consistently beat creator baseline." },
        { factor: "format_affinity", raw_value: 92.0, weight: 0.5, points: 1.0, basis: "MEASURED", sample_size: 6, explanation: "Technical breakdown threads hold high bookmark retention." }
      ],
      measured_factor_count: 8,
      assumed_factor_count: 0
    },
    timing: {
      action: "POST_NOW",
      reason: "Story surfaced within the last 4 hours. High opportunity window open before mainstream saturation peaks tonight.",
      urgency_score: 98.0
    },
    best_angle: "Why Suno v6 marks the end of the 'scrape first, ask forgiveness later' AI era",
    why_this_angle: "Cuts straight past superficial reporting to address what this means for every commercial AI company training on web data.",
    alternative_angles: [
      "How to build models on licensed data without sacrificing quality",
      "The provenance watermark: how Suno proves track ownership mathematically",
      "Contrarian take: why licensing deals will entrench hyperscalers and squeeze out open source"
    ],
    platform: "X",
    why_this_platform: "Real-time AI discourse, industry insiders, and audio creators are actively debating the lawsuit developments on X right now.",
    content_format: "thread",
    estimated_production_minutes: 15,
    hook_type: "CONTRARIAN",
    hook: "Suno just deleted their entire training dataset and started over. Here's why this changes the entire generative AI industry.",
    production: {
      create_everything_endpoint: "POST /api/content/create-everything",
      payload: {
        event_id: "event_suno_v6_music",
        platform: "X",
        angle: "The end of uncurated web scraping in commercial AI"
      },
      visual_engine_hint: "hybrid",
      visual_engine_reason: "Combine audio waveform motion graphics with timeline licensing comparison.",
      estimated_production_minutes: 15
    },
    success_criteria: {
      has_baseline: true,
      note: "Target >5.2% engagement rate and >200 bookmarks to beat historical benchmarks.",
      log_endpoint: "POST /api/performance/log",
      target_metric: "5.2% Engagement / 200+ Bookmarks"
    },
    event_status: "CONFIRMED",
    event_confidence: 99.0,
    source_count: 16,
    sources: [
      { name: "TechCrunch", url: "https://techcrunch.com", quality_tier: "Tier 1" },
      { name: "Billboard", url: "https://billboard.com", quality_tier: "Tier 1" }
    ],
    claims_to_avoid: [
      "Do not claim Suno settled with record labels unless officially signed.",
      "Avoid hyperbolic 'AI music is dead' claims."
    ]
  },
  skipped_candidates: [
    {
      headline: "Corporate Press Release on Minor Partnership",
      event_id: "evt_skip_01",
      action: "SKIP",
      reason: "High promotional buzzword ratio with zero technical novelties.",
      score: 22.0
    }
  ],
  timing_verdict: {
    action: "POST_NOW",
    reason: "High viral velocity signal active right now.",
    urgency_score: 98.0
  }
};

export const MOCK_FUNNEL_REPORT: any = {
  generated_at: new Date().toISOString(),
  window_days: 30,
  clock_start: "EVENT_OCCURRED",
  clock_start_note: "Timed from when the event occurred in the world — true end-to-end latency.",
  published_count: 24,
  completed_count: 24,
  measured: true,
  time_to_publishable_median_seconds: 1840,
  time_to_publishable_p90_seconds: 3600,
  time_to_publishable_fastest_seconds: 620,
  stages: {
    EVENT_OCCURRED: 24,
    SIGNAL_DETECTED: 24,
    VERIFIED: 24,
    OPPORTUNITY_IDENTIFIED: 22,
    CONTENT_CREATED: 20,
    VIDEO_PRODUCED: 16
  },
  stalled: [],
  honest_gaps: [
    "VIDEO_PRODUCED duration measured across 16 video pieces."
  ]
};

export function createMockEverythingPackage(title = "Suno Replaces AI Models with Licensed Music Architecture"): any {
  return {
    status: "success",
    lifecycle_id: "lc_live_" + Date.now(),
    funnel_stage: "VIDEO_PRODUCED",
    strategy: {
      topic: title,
      angle: "Why Suno v6 marks the end of the 'scrape first, ask forgiveness later' era in commercial AI",
      audience: "AI Engineers, Creators, Tech Founders & Media Strategists",
      goal: "Establish authoritative technical leadership on training data provenance and AI licensing",
      hook_strategy: "Contrarian revelation of the architectural and legal precedent",
      visual_strategy: "Dark technical motion graphics with waveform spectrogram comparisons",
      platform_strategy: "Lead on X with technical breakdown; post executive strategic insight on LinkedIn; high-retention video on YouTube Shorts",
      reasoning: "Grounded in breaking live news with verified high momentum across major tech press."
    },
    content_suite: {
      brief: {
        topic: title,
        angle: "The end of uncurated web scraping in commercial AI"
      },
      quality: {
        total_quality_score: 95.5,
        fact_check_score: 98.0,
        originality_score: 96.0,
        hook_strength_score: 95.0,
        clarity_score: 96.0,
        platform_fit_score: 96.0,
        audience_fit_score: 95.0,
        cta_effectiveness: 92.0,
        spam_score: 1.0,
        clickbait_penalty: 0.0,
        editorial_quality_score: 96.0
      },
      x_content: {
        single_post: `The "scrape first, ask forgiveness later" era of AI just hit a brick wall.\n\nSuno officially discarded their prior model checkpoints to launch Suno v6, trained 100% on licensed music catalogs.\n\nWhy this is a watershed moment:\n1. Training data provenance is no longer optional for enterprise commercialization\n2. The legal moat moves from model weights to licensing agreements\n3. Proof that state-of-the-art generative audio can be trained without controversial copyright scraping\n\nFull breakdown below:`,
        thread: [
          `1/ The "scrape first, ask forgiveness later" era of commercial AI just hit a brick wall.\n\nSuno officially discarded their previous checkpoints and launched Suno v6, trained entirely on licensed catalogs.\n\nHere is why this changes everything:`,
          `2/ For two years, the consensus was that competitive generative audio required unconstrained web scraping. Suno v6 proves that hypothesis wrong.`,
          `3/ As copyright lawsuits mounted, enterprise buyers refused to touch outputs with legal exposure. Clean training data became the ultimate product feature.`,
          `4/ The architectural lesson: clean datasets with high-fidelity annotations allow faster convergence with significantly fewer parameters.`,
          `5/ The new battleground isn't raw model scale—it's dataset provenance and indemnification guarantees.`
        ]
      },
      x_hooks: [
        { category: "Contrarian", text: "The 'scrape first, ask forgiveness later' era of AI just ended.", hook_score: 97, curiosity: 95, specificity: 96, novelty: 97, clarity: 98, scroll_stop_potential: 98, credibility: 96, conversation_potential: 96 },
        { category: "Data Driven", text: "Suno v6 discarded 100% of their legacy training checkpoints. Here is what happened to output quality.", hook_score: 94, curiosity: 92, specificity: 97, novelty: 93, clarity: 95, scroll_stop_potential: 93, credibility: 97, conversation_potential: 92 }
      ],
      linkedin_content: {
        content: `A critical legal and architectural precedent was established in the AI industry today.\n\nSuno has launched Suno v6, completely replacing its legacy models with an architecture trained exclusively on licensed music catalogs.\n\nFor technology leaders and enterprise executives, the takeaways are immediate:\n\n1. Intellectual Property Risk Is Dictating Architecture\nEnterprise clients are demanding full indemnification and mathematically verifiable data provenance before integrating generative tools into production.\n\n2. Curated Licensing Yields Superior Efficiency\nBy training on clean, high-signal licensed stems rather than noisy web scrapes, training convergence accelerated while eliminating copyright liabilities.\n\n3. The Moat Shifts to Rights Management\nModel architectures are commoditizing; the enduring barrier to entry is proprietary, legally sound data partnerships.\n\nHow is your team auditing third-party AI models for training data provenance?`
      },
      instagram_carousel: {
        slides: [
          { slide_number: 1, title: "The Day AI Music Changed", body: "Suno deleted their old models and rebuilt from scratch with licensed data.", visual_note: "Dark neon UI" },
          { slide_number: 2, title: "Why It Matters", body: "Scraping copyrighted work without licenses is no longer a viable commercial strategy.", visual_note: "Clean checklist" }
        ]
      },
      instagram_reel: {
        script: "Hook: Everyone thought commercial AI couldn't survive without scraping the entire open web. Today, Suno proved them wrong by releasing Suno v6, built 100% on licensed catalogs. Here's why this changes the entire generative AI landscape..."
      },
      youtube_content: {
        titles: [
          "Suno v6: The End of Unlicensed AI Training Data",
          "How Suno Rebuilt Their Entire Model from Scratch (And Why It Matters)"
        ],
        thumbnails: [{ title: "THE CLEAN DATA ERA", visual_concept: "Split comparison between lawsuit filings and clean neural waveforms", badge_text: "FULL ANALYSIS" }],
        script: "Cold Open: For the past three years, generative AI grew on a simple playbook: scrape everything, build the model, and deal with lawsuits later. Today, that playbook officially died...",
        pinned_comment: "Do you think all commercial AI models will eventually be forced to switch to 100% licensed training data? Let's discuss below."
      }
    },
    video_package: createMockVideoPackage(title),
    publishing: {
      x: {
        text: "The 'scrape first, ask forgiveness later' era of AI just hit a brick wall.",
        thread: ["1/ Suno v6 marks the end of uncurated web scraping..."],
        top_hook: "The 'scrape first, ask forgiveness later' era of AI just ended.",
        hashtags: []
      },
      linkedin: {
        text: "A critical legal and architectural precedent was established today...",
        cta: "How is your team auditing third-party AI models for training data provenance?",
        hashtags: ["#ArtificialIntelligence", "#TechStrategy", "#GenerativeAI"]
      }
    },
    quality_summary: {
      content_quality: { total_quality_score: 95.5, fact_check_score: 98.0, originality_score: 96.0 },
      video_quality: { video_prompt_readiness_score: 96.0, is_production_ready: true }
    }
  };
}
