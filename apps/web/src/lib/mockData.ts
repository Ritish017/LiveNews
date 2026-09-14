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

// ============================================================================
// FUTURE.AII CONTENT OPERATING SYSTEM MOCK DATA
// ============================================================================

import {
  BrandConfig, PillarDefinition, SeriesDefinition, RankedContentOpportunity,
  ContentAssetPackage, TodayWorkspacePayload, ContentClusterPackage,
  ComparativeDiagnosticResult, WinnerDetectionReport, Calendar30DayView,
  PipelineStageSummary
} from "../types";

export const MOCK_FUTURE_AII_BRAND: BrandConfig = {
  handle: "future.aii__",
  brand_name: "future.aii",
  positioning: "Your window into the AI future.",
  tone: "curious, fast, confident, technical but accessible",
  visual_style: "dark, cinematic, high-contrast, modern, internet-native",
  audience_demographics: {
    primary_age: "18-30",
    segments: ["students", "developers", "creators", "entrepreneurs", "freelancers", "AI enthusiasts"]
  },
  pillar_targets: {
    "AI News": 25,
    "AI Explained": 20,
    "AI Tools": 15,
    "AI For Normal People": 10,
    "AGI / ASI / Future": 10,
    "AI Memes / Relatable": 10,
    "AI Experiments": 10
  },
  voice_guidelines: {
    vocabulary: ["frontier", "compute", "inference", "agentic", "architecture", "breakthrough", "latency", "weights"],
    sentence_length: "fast-paced, punchy, active voice, 8-15 words average",
    banned_cliches: ["game-changer", "unleash", "mind-blowing", "dive deep", "in this digital era", "delve"],
    recurring_phrases: ["Here is what actually changed", "Your window into the AI future", "What developers can build with this"],
    hook_style: "curiosity + high specificity + immediate visual contrast"
  },
  anti_generic_rules: [
    "Never repost 'Company X announced Y' without explaining what actually changed and why it matters.",
    "Detect technical jargon and automatically produce plain-English analogies.",
    "Separate FACT from INTERPRETATION from PREDICTION.",
    "Every Reel must provide a verifiable workflow or takeaway, not just surface marketing claims."
  ]
};

export const MOCK_FUTURE_AII_PILLARS: Record<string, PillarDefinition> = {
  "AI News": {
    id: "pillar_news",
    name: "AI News",
    target_share_pct: 25,
    objective: "Fast, understandable breakdown of major AI releases, breakthroughs, and corporate shifts.",
    format_structure: ["HOOK", "WHAT HAPPENED", "WHAT ACTUALLY CHANGED", "WHY IT MATTERS", "WHAT THIS MEANS", "CTA"],
    default_formats: ["Reel", "Carousel", "Story"],
    cta_patterns: ["Follow for daily AI updates", "Would you deploy this?", "Save this breakdown"],
    prompt_instructions: "Never simply repost announcements. Explain the architectural breakthrough."
  },
  "AI Explained": {
    id: "pillar_explained",
    name: "AI Explained",
    target_share_pct: 20,
    objective: "Turn complicated frontier AI concepts into visual, high-retention short-form education.",
    format_structure: ["HOOK", "SIMPLE EXPLANATION", "VISUAL ANALOGY", "TECHNICAL CORE", "REAL EXAMPLE", "TAKEAWAY", "CTA"],
    default_formats: ["Reel", "Carousel"],
    cta_patterns: ["Comment 'CHEAT' for visual diagram", "Save for your next build"],
    prompt_instructions: "Provide Beginner vs Technical versions with visual physical analogies."
  },
  "AI Tools": {
    id: "pillar_tools",
    name: "AI Tools",
    target_share_pct: 15,
    objective: "Make future.aii__ actionable with verified AI workflows and tools.",
    format_structure: ["HOOK", "WHAT IT DOES", "WHO NEEDS IT", "ONE REAL WORKFLOW", "PRICING & LIMITS", "CTA"],
    default_formats: ["Reel", "Carousel"],
    cta_patterns: ["Comment 'TOOL' for link & prompt", "Save workflow"],
    prompt_instructions: "Verify pricing and free tier. No marketing claims without testing."
  },
  "AI For Normal People": {
    id: "pillar_normal",
    name: "AI For Normal People",
    target_share_pct: 10,
    objective: "Expand beyond tech audiences by explaining AI with zero jargon.",
    format_structure: ["HOOK", "EVERYDAY ANALOGY", "PLAIN-ENGLISH TRUTH", "PRACTICAL EXAMPLE", "CTA"],
    default_formats: ["Reel", "Story"],
    cta_patterns: ["Have you tried this yet?", "Share with a non-tech friend"],
    prompt_instructions: "Replace jargon automatically with intuitive mental models."
  },
  "AGI / ASI / Future": {
    id: "pillar_future",
    name: "AGI / ASI / Future",
    target_share_pct: 10,
    objective: "Window into human-level AI and the technological horizon.",
    format_structure: ["HOOK", "THE FACT", "THE INTERPRETATION", "THE PREDICTION", "CTA"],
    default_formats: ["Reel", "Carousel"],
    cta_patterns: ["Do you believe AGI arrives before 2028?", "Follow Road to AGI"],
    prompt_instructions: "Strictly isolate FACT from INTERPRETATION from PREDICTION."
  },
  "AI Memes / Relatable": {
    id: "pillar_memes",
    name: "AI Memes / Relatable",
    target_share_pct: 10,
    objective: "Top of funnel acquisition layer driving reach and cultural awareness.",
    format_structure: ["HOOK", "SETUP", "PUNCHLINE", "CTA"],
    default_formats: ["Reel", "Story"],
    cta_patterns: ["Tag a developer", "POV: agent running at 3 AM"],
    prompt_instructions: "Keep it internet-native, concise, and fast-paced."
  },
  "AI Experiments": {
    id: "pillar_experiments",
    name: "AI Experiments",
    target_share_pct: 10,
    objective: "Hands-on empirical testing: USE AI rather than talk about AI.",
    format_structure: ["QUESTION", "HYPOTHESIS", "SETUP", "TEST", "RESULT", "SURPRISE", "VERDICT", "CTA"],
    default_formats: ["Reel", "Carousel", "YouTube Short"],
    cta_patterns: ["Comment 'BENCHMARK' for prompts", "Which model won?"],
    prompt_instructions: "Head-to-head empirical testing with reproducible prompts."
  }
};

export const MOCK_FUTURE_AII_SERIES: SeriesDefinition[] = [
  { id: "s1", name: "AI NEWS TODAY", pillar: "AI News", cadence: "daily", target_format: "Reel", description: "Daily recap of the #1 most critical AI development.", hook_formula: "This just happened in AI today: [Headline]", average_retention: 78.5, average_shares: 84.0, is_active: true },
  { id: "s2", name: "BREAKING AI", pillar: "AI News", cadence: "urgent", target_format: "Reel", description: "Rapid response within 15 minutes of tier-1 frontier releases.", hook_formula: "Emergency release dropped 20 minutes ago: [Topic]", average_retention: 84.2, average_shares: 92.0, is_active: true },
  { id: "s3", name: "AI IN 15 SECONDS", pillar: "AI Explained", cadence: "3x_weekly", target_format: "Reel", description: "Micro-explainer covering core architecture terms.", hook_formula: "If you don't understand [Concept] in 2026, watch this in 15 seconds.", average_retention: 82.4, average_shares: 88.0, is_active: true },
  { id: "s4", name: "AI EXPLAINED", pillar: "AI Explained", cadence: "3x_weekly", target_format: "Carousel", description: "Visual slide-by-slide breakdowns with diagrams.", hook_formula: "How [Concept] actually works under the hood.", average_retention: 76.0, average_shares: 80.0, is_active: true },
  { id: "s5", name: "AI TOOL YOU NEED", pillar: "AI Tools", cadence: "3x_weekly", target_format: "Reel", description: "One tool, one verified workflow, one exact prompt.", hook_formula: "Stop doing [Tedious Task] manually — this AI does it in 1 click.", average_retention: 79.1, average_shares: 91.0, is_active: true },
  { id: "s6", name: "ROAD TO AGI", pillar: "AGI / ASI / Future", cadence: "2x_weekly", target_format: "Reel", description: "Tracking frontier milestones on the march toward AGI.", hook_formula: "We just took another step toward AGI — here is the milestone.", average_retention: 81.3, average_shares: 86.0, is_active: true },
  { id: "s7", name: "AI VS AI", pillar: "AI Experiments", cadence: "2x_weekly", target_format: "Reel", description: "Head-to-head model benchmark challenges.", hook_formula: "GPT vs Claude vs Gemini: who builds a full app faster?", average_retention: 85.6, average_shares: 94.0, is_active: true },
  { id: "s8", name: "AI POV", pillar: "AI Memes / Relatable", cadence: "2x_weekly", target_format: "Reel", description: "Short relatable creator & engineer humor.", hook_formula: "POV: you let the AI agent write the unit tests.", average_retention: 88.2, average_shares: 96.0, is_active: true }
];

export const MOCK_FUTURE_AII_OPPORTUNITIES: RankedContentOpportunity[] = [
  {
    id: "opp_1",
    title: "Autonomous Coding Agent Framework Solves SWE-Bench Locally",
    summary: "Open-source agent achieves 64.2% on SWE-bench using local weights without external cloud API fees.",
    primary_source: "GitHub & arXiv",
    scores: {
      total_opportunity_score: 94.2,
      freshness: 98.0,
      momentum: 94.0,
      relevance: 96.0,
      audience_fit: 98.0,
      competition: 35.0,
      saturation: 25.0,
      novelty: 92.0,
      content_gap: 94.0,
      creator_fit: 98.0,
      historical_performance: 88.0,
      production_difficulty: 35.0,
      urgency: "POST_NOW",
      urgency_reason: "High novelty local coding breakthrough with strong builder demand.",
      recommended_pillar: "AI Tools",
      recommended_series: "AI TOOL YOU NEED",
      recommended_format: "Reel",
      recommended_angle: "How developers can run autonomous coding agents locally on a single GPU"
    },
    entities: ["DeepSeek", "SWE-Bench", "Autonomous Agents", "Local AI"],
    key_claims: [
      "Achieves 64.2% on SWE-bench benchmark",
      "Runs completely offline on single 24GB GPU",
      "Zero per-token cloud API cost"
    ],
    alternative_angles: [
      "Beginner: What local AI coding agents mean for non-programmers",
      "Contrarian: Why cloud API pricing for agents will collapse in 2026",
      "Future: The step toward autonomous software engineering teams"
    ],
    created_at: new Date().toISOString()
  },
  {
    id: "opp_2",
    title: "Anthropic Unveils Next-Gen Reasoning Architecture for Claude",
    summary: "Test-time compute dynamically scales with query difficulty, slashing formal logic hallucinations by 84%.",
    primary_source: "Anthropic Research",
    scores: {
      total_opportunity_score: 89.5,
      freshness: 92.0,
      momentum: 91.0,
      relevance: 95.0,
      audience_fit: 92.0,
      competition: 55.0,
      saturation: 40.0,
      novelty: 88.0,
      content_gap: 89.0,
      creator_fit: 94.0,
      historical_performance: 85.0,
      production_difficulty: 30.0,
      urgency: "POST_TODAY",
      urgency_reason: "Major frontier model leap. High authority and explainer retention.",
      recommended_pillar: "AI Explained",
      recommended_series: "AI IN 15 SECONDS",
      recommended_format: "Carousel",
      recommended_angle: "How test-time compute allows Claude to think before answering"
    },
    entities: ["Claude", "Anthropic", "Reasoning", "Test-Time Compute"],
    key_claims: [
      "Test-time compute dynamically scales with task difficulty",
      "84% hallucination drop on formal logic benchmarks"
    ],
    alternative_angles: [
      "Technical: Transformer attention head scaling during inference",
      "Future: Why reasoning models represent the true Road to AGI"
    ],
    created_at: new Date().toISOString()
  }
];

export function createMockFutureAiiPackage(topic: string, pillar?: string): ContentAssetPackage {
  const cleanTopic = topic.split(":")[0];
  const p = pillar || "AI Tools";
  return {
    content_id: `pkg_${Math.abs(topic.length * 999)}`,
    pillar: p,
    series: p === "AI Tools" ? "AI TOOL YOU NEED" : "AI NEWS TODAY",
    topic: cleanTopic,
    brand_handle: "future.aii__",
    status: "READY_TO_POST",
    strategy: {
      pillar: p,
      series: "AI TOOL YOU NEED",
      goal: "Reach & Follows",
      angle: `What developers can build with ${cleanTopic} starting today`,
      target_audience: "18-30 AI Builders, Students, and Engineers"
    },
    research: {
      key_claims: [
        `${cleanTopic} achieves 4.2x faster inference streaming`,
        "Verified benchmark confirms zero latency buffer",
        "Available for immediate local integration via open API"
      ],
      confidence_score: 98.0,
      source_count: 8
    },
    fact_audit: {
      total_claims_analyzed: 3,
      confirmed_claims_count: 3,
      unverified_claims_count: 0,
      speculative_predictions_count: 0,
      overall_confidence: 98.0,
      is_fully_traceable: true,
      sentence_traces: [
        {
          sentence_id: "s1",
          script_text: `Yesterday, ${cleanTopic} released with open weights.`,
          extracted_claim: `${cleanTopic} official release`,
          source_name: "Official Technical Benchmark & Architecture Paper",
          source_url: "https://arxiv.org/abs/2609.ai-breakthrough",
          source_date: new Date().toISOString(),
          evidence_snippet: "Primary release announcement on arXiv and official documentation.",
          confidence_score: 99.0,
          epistemic_category: "FACT",
          verification_status: "CONFIRMED"
        }
      ]
    },
    hooks: {
      best_hook: {
        category: "Contrarian",
        text: `Everyone is hyping up ${cleanTopic}, but here is the critical benchmark nobody is talking about.`,
        composite_score: 92.4,
        curiosity: 94.0, clarity: 91.0, novelty: 90.0, relevance: 95.0, retention_potential: 93.0, credibility: 92.0, clickbait_risk: 14.0, tag: "BEST"
      },
      safe_hook: {
        category: "Authority",
        text: `According to the official technical paper, ${cleanTopic} reduces inference latency by 60%.`,
        composite_score: 88.1,
        curiosity: 82.0, clarity: 98.0, novelty: 84.0, relevance: 93.0, retention_potential: 85.0, credibility: 99.0, clickbait_risk: 4.0, tag: "SAFE"
      },
      high_risk_hook: {
        category: "Fear",
        text: `If your current coding workflow still relies on manual debugging, ${cleanTopic} just made it obsolete.`,
        composite_score: 87.5,
        curiosity: 96.0, clarity: 86.0, novelty: 85.0, relevance: 94.0, retention_potential: 95.0, credibility: 82.0, clickbait_risk: 28.0, tag: "HIGH_RISK"
      },
      all_hooks: []
    },
    selected_hook: `Everyone is hyping up ${cleanTopic}, but here is the critical benchmark nobody is talking about.`,
    script: {
      duration_seconds: 30,
      pillar: p,
      series: "AI TOOL YOU NEED",
      hook_text: `Everyone is hyping up ${cleanTopic}, but here is the critical benchmark nobody is talking about.`,
      cta_text: "Comment 'TOOL' and I'll DM you the direct repository link and setup prompt.",
      total_words: 78,
      estimated_wpm: 156,
      segments: [
        {
          sentence_id: "s1_hook",
          time_start: 0.0,
          time_end: 3.0,
          phase: "HOOK",
          voice: `Everyone is hyping up ${cleanTopic}, but here is the critical benchmark nobody is talking about.`,
          visual: "Extreme close-up of dark metallic GPU processor with amber neon light pulses racing across circuits.",
          on_screen_text: `🚨 ${cleanTopic.toUpperCase()}`,
          sfx: "Sub-bass drop + metallic shimmer",
          camera: "Snap zoom into glowing processor core",
          underlying_claim: "Release confirmed"
        },
        {
          sentence_id: "s2_context",
          time_start: 3.0,
          time_end: 9.0,
          phase: "CONTEXT",
          voice: `Instead of waiting on cloud APIs, this model runs entirely on local consumer hardware at 180 tokens per second.`,
          visual: "Terminal screen recording streaming code without buffer delay; high-contrast split screen.",
          on_screen_text: "180 TOKENS / SEC LOCAL",
          sfx: "Keyboard typing rhythm",
          camera: "Static crisp framing",
          underlying_claim: "Local latency"
        },
        {
          sentence_id: "s3_payoff",
          time_start: 9.0,
          time_end: 18.0,
          phase: "PAYOFF",
          voice: `Here is why that matters: it slashes development costs by 90% while keeping all proprietary codebase data completely offline.`,
          visual: "Animated node graph connecting local IDE to offline model weights with green checkmarks.",
          on_screen_text: "90% COST REDUCTION",
          sfx: "High tech swoop",
          camera: "Slow upward pan",
          underlying_claim: "Cost tradeoff"
        },
        {
          sentence_id: "s4_why_matters",
          time_start: 18.0,
          time_end: 24.0,
          phase: "WHY_IT_MATTERS",
          voice: `You can initialize this in your project today with three lines of code and run autonomous unit test sweeps.`,
          visual: "Live IDE demo showing tests passing autonomously in green.",
          on_screen_text: "AUTONOMOUS TEST SWEEPS",
          sfx: "Terminal success chime",
          camera: "Over-the-shoulder coding view",
          underlying_claim: "Workflow test"
        },
        {
          sentence_id: "s5_cta",
          time_start: 24.0,
          time_end: 30.0,
          phase: "CTA",
          voice: "Comment 'TOOL' and I'll DM you the direct repository link and setup prompt.",
          visual: "Dark futuristic Instagram endcard featuring @future.aii__ and pulsating keyword trigger graphic.",
          on_screen_text: "COMMENT 'TOOL' FOR SETUP ⬇️",
          sfx: "Clean chimes tone",
          camera: "Gentle pull-back",
          underlying_claim: undefined
        }
      ],
      formatted_director_notes: "Production cues verified. Ready for recording."
    },
    shot_list: [
      { shot_number: 1, time_range: "0.0s–3.0s", phase: "HOOK", visual_description: "Dark metallic GPU with neon pulses", camera_motion: "Snap zoom", sfx_cue: "Sub-bass impact", on_screen_text: "STOP SCROLLING" },
      { shot_number: 2, time_range: "3.0s–9.0s", phase: "CONTEXT", visual_description: "Terminal code streaming at 180 tokens/sec", camera_motion: "Split screen", sfx_cue: "Typing rhythm", on_screen_text: "180 TOKENS/SEC" },
      { shot_number: 3, time_range: "9.0s–18.0s", phase: "PAYOFF", visual_description: "Node architecture diagram", camera_motion: "Slow upward pan", sfx_cue: "Tech swoosh", on_screen_text: "90% COST SAVED" },
      { shot_number: 4, time_range: "18.0s–24.0s", phase: "WHY_IT_MATTERS", visual_description: "IDE autonomous test passing", camera_motion: "Over shoulder", sfx_cue: "Success chime", on_screen_text: "PASSING" },
      { shot_number: 5, time_range: "24.0s–30.0s", phase: "CTA", visual_description: "Branded outro card", camera_motion: "Pull back", sfx_cue: "Chimes", on_screen_text: "COMMENT 'TOOL'" }
    ],
    visual_plan: {
      aesthetic: "Dark cinematic terminal, high-contrast amber neon glyphs, 1080x1920 9:16 vertical",
      safe_zones_respected: true,
      primary_metaphor: "Direct-to-weights neural pipeline"
    },
    remotion_spec: {
      composition_name: "Reel_Comp_101",
      duration_in_frames: 900,
      fps: 30,
      width: 1080,
      height: 1920,
      safe_zones: { top: 180, bottom: 320, left: 60, right: 120 },
      copyable_react_code: "// Remotion React composition code generated. Copy and render with npx remotion render Root out.mp4",
      implementation_guide: "Paste into src/Root.tsx and run npm start."
    },
    ai_video_prompts: {
      veo_prompt: `Cinematic macro shot of glowing dark GPU processor with neon amber circuitry in dark studio. Topic: ${cleanTopic}.`,
      gemini_omni_prompt: `Ultra-crisp dark coding environment with green terminal benchmarks and floating futuristic holographic nodes. Topic: ${cleanTopic}.`
    },
    thumbnail_spec: {
      headline_overlay: cleanTopic.slice(0, 18).toUpperCase(),
      visual_element: "Surprised dev face + glowing amber code diff",
      contrast_ratio: "High (9:1)"
    },
    caption: `Everyone is hyping up ${cleanTopic}, but here is the critical benchmark nobody is talking about.\n\nHere is what actually changed:\n• Verified 4.2x faster inference\n• Local GPU execution with zero cloud latency\n• Full setup ready in 3 lines of code\n\nComment 'TOOL' and I'll DM you the direct repository link and setup prompt! ⬇️\n\n—\nFollow @future.aii__ — Your window into the AI future.\n\n#AI #Coding #DeepSeek #TechNews #MachineLearning`,
    hashtags: ["#AI", "#TechNews", "#FutureOfAI", "#MachineLearning", "#Coding"],
    cta_spec: {
      cta_type: "DM_Resource",
      public_cta_text: "Comment 'TOOL' and I'll DM you the direct repository link and setup prompt.",
      rationale: "High comment velocity triggering algorithmic boost while delivering legitimate software utility.",
      has_deliverable_resource: true,
      resource_keyword: "TOOL"
    },
    automation_spec: {
      id: "auto_sample",
      content_id: "pkg_sample",
      trigger_source: "COMMENT",
      keywords: ["TOOL", "#TOOL", "tool"],
      match_type: "WORD",
      public_reply_options: ["Just sent the setup docs to your DMs! Check message requests 👀"],
      initial_dm: `Hey! Here is the setup repository and starter prompt for ${cleanTopic} 👇\n\nhttps://github.com/future-aii/starter-kit`,
      resource_type: "LINK",
      resource_content: "https://github.com/future-aii/starter-kit",
      follow_up_nudge: "If you found this useful, follow @future.aii__ for daily AI breakdowns! 🧠",
      status: "ACTIVE",
      analytics: { trigger_count: 412, dm_sent_count: 398, reply_count: 88, conversion_count: 74 }
    },
    story_sequence: {
      topic: cleanTopic,
      total_stories: 3,
      stories: [
        {
          story_number: 1,
          story_type: "POLL",
          headline: `Quick question about ${cleanTopic}...`,
          subtext: "Would you trust an AI agent running this model to manage your computer files autonomously?",
          interactive_sticker: { type: "poll", question: "Trust autonomous AI?", options: ["Yes, 100%", "No way 🙅‍♂️"] },
          background_visual: "Dark moody terminal aesthetic"
        },
        {
          story_number: 2,
          story_type: "TEASER",
          headline: "Here is what happened when we tested it:",
          subtext: "We ran 50 real developer tests. The latency results were surprising.",
          interactive_sticker: { type: "slider", emoji: "🔥", question: "Excitement level" },
          background_visual: "Sneak peek benchmark graph"
        },
        {
          story_number: 3,
          story_type: "RESULT",
          headline: "The Full Teardown Is Live 🚨",
          subtext: "Watch tonight's Reel to see the full code teardown.",
          interactive_sticker: { type: "link", text: "Watch Breakdown 🎥" },
          background_visual: "Crisp dark Reel cover visual",
          cta_link_or_sticker: "instagram.com/future.aii__"
        }
      ]
    },
    carousel_spec: {
      title: `Teardown: ${cleanTopic}`,
      pillar: p,
      total_slides: 8,
      target_aspect_ratio: "4:5",
      slides: [
        { slide_number: 1, slide_role: "HOOK", headline: `Everything You Need To Know About ${cleanTopic}`, body_points: ["The architectural breakthrough that matters", "Swipe for the full teardown →"], visual_layout: "hero_text_center", typography_hierarchy: "H1 52pt Bold / Amber 400", cta_badge: "SWIPE ➡️" },
        { slide_number: 2, slide_role: "WHAT_HAPPENED", headline: "1. What Just Happened", body_points: ["Official announcement released", "Trained on clean verified weights"], visual_layout: "stat_callout_huge", typography_hierarchy: "Headline 32pt Bold" },
        { slide_number: 8, slide_role: "CTA", headline: "Save This For Your Next Build", body_points: ["Comment 'TOOL' for the full cheat sheet", "Follow @future.aii__"], visual_layout: "hero_text_center", typography_hierarchy: "Headline 40pt Gradient", cta_badge: "COMMENT 'TOOL' ⬇️" }
      ],
      caption: `Swipe through for the complete ${cleanTopic} teardown!`,
      hashtags: ["#AI", "#TechNews"]
    },
    x_post: `Everyone is hyping up ${cleanTopic}, but here is what actually changed under the hood 🧵👇`,
    youtube_short: `Title: ${cleanTopic} Changed Everything in 30 Seconds\nDescription: Watch the full teardown.`,
    quality_scores: {
      content_quality: 94.0,
      hook_strength: 92.4,
      story_pacing: 92.0,
      value_density: 95.0,
      originality: 91.0,
      visual_direction: 96.0,
      platform_fit: 98.0,
      cta_alignment: 94.0,
      source_confidence: 98.0,
      brand_fit: 97.0
    },
    is_ready_to_post: true,
    publishing_window: "Today 19:30 - 21:00 UTC"
  };
}

export const MOCK_TODAY_WORKSPACE: TodayWorkspacePayload = {
  greeting: "GOOD MORNING 👋",
  north_star_headline: "Today's #1 Publishable Story: Autonomous Coding Agent Framework Solves SWE-Bench Locally",
  active_events_count: 3,
  top_opportunities: MOCK_FUTURE_AII_OPPORTUNITIES,
  star_opportunity: MOCK_FUTURE_AII_OPPORTUNITIES[0],
  ready_content_packages: [createMockFutureAiiPackage(MOCK_FUTURE_AII_OPPORTUNITIES[0].title, "AI Tools")],
  today_schedule_slots: [
    { date_str: "Today", day_of_week: "Monday", time_slot: "19:30", pillar: "AI Tools", series: "AI TOOL YOU NEED", format: "Reel", title: "Local Autonomous Coding Agents", status: "READY_TO_POST" },
    { date_str: "Today", day_of_week: "Monday", time_slot: "21:00", pillar: "AI News", series: "AI NEWS TODAY", format: "Story", title: "SWE-Bench Poll & Community Debate", status: "SCHEDULED" }
  ],
  engagement_tasks: [
    { task: "Review 38 pending DMs from yesterday's 'TOOL' automation", status: "Ready", estimated_time: "5m" },
    { task: "Reply to top 3 developer debates in comments", status: "Pending", estimated_time: "10m" }
  ],
  yesterday_learnings: [
    "Educational 30s Reels generated 2.4x more saves than broad news recaps.",
    "The 'Contrarian + Benchmark' hook reached 184k views with 74% 2-second retention.",
    "Comment-to-DM keyword 'AGENT' converted at 18.4% without any spam flags."
  ],
  pillar_balance: {
    "AI News": 25.0,
    "AI Explained": 20.0,
    "AI Tools": 15.0,
    "AI For Normal People": 10.0,
    "AGI / ASI / Future": 10.0,
    "AI Memes / Relatable": 10.0,
    "AI Experiments": 10.0
  }
};

export const MOCK_FUTURE_AII_CLUSTER: ContentClusterPackage = {
  cluster_id: "cluster_swe_bench_local",
  event_id: "opp_1",
  event_title: "Autonomous Coding Agent Framework Solves SWE-Bench Locally",
  cluster_theme: "Complete 10-piece multi-format coverage ecosystem",
  created_at: new Date().toISOString(),
  pieces: [
    { piece_id: "p1", role: "Breaking News Reel", format: "Reel", pillar: "AI News", series: "BREAKING AI", target_audience: "General AI Builders", angle: "Urgent breaking alert: SWE-bench solved locally", hook: "This open source AI agent just solved SWE-bench without cloud APIs.", synopsis: "15s rapid response alert.", recommended_duration: 15, cta: "Follow @future.aii__", is_approved: true },
    { piece_id: "p2", role: "What Changed? Reel", format: "Reel", pillar: "AI News", series: "AI NEWS TODAY", target_audience: "Engineers & Founders", angle: "What actually changed under the hood", hook: "Everyone is hyping this agent, but here is what actually changed.", synopsis: "30s analytical breakdown of the architecture.", recommended_duration: 30, cta: "Save this breakdown", is_approved: true },
    { piece_id: "p3", role: "Explainer Reel", format: "Reel", pillar: "AI Explained", series: "AI IN 15 SECONDS", target_audience: "Students & Builders", angle: "Visual mental model of local agent memory", hook: "If you don't understand how coding agents think, watch this in 15 seconds.", synopsis: "Visual analogy comparing local VRAM to desk space.", recommended_duration: 20, cta: "Comment 'EXPLAIN'", comment_keyword: "EXPLAIN", is_approved: true },
    { piece_id: "p4", role: "Tool Demo Reel", format: "Reel", pillar: "AI Tools", series: "AI TOOL YOU NEED", target_audience: "Productivity Seekers", angle: "One real copy-paste workflow", hook: "Stop debugging manually — this local agent does it in 60s.", synopsis: "Live screen recording of automated unit test refactor.", recommended_duration: 30, cta: "Comment 'TOOL'", comment_keyword: "TOOL", is_approved: true },
    { piece_id: "p5", role: "Comparison Reel", format: "Reel", pillar: "AI Experiments", series: "AI VS AI", target_audience: "Developers Choosing Stacks", angle: "Local agent vs Cloud Claude Code", hook: "We tested the local agent against Claude Code on the exact same bug.", synopsis: "Head to head speed and error analysis.", recommended_duration: 45, cta: "Comment 'BENCHMARK'", comment_keyword: "BENCHMARK", is_approved: true },
    { piece_id: "p6", role: "Future / AGI Reel", format: "Reel", pillar: "AGI / ASI / Future", series: "ROAD TO AGI", target_audience: "Futurists", angle: "Why local autonomy shifts the timeline", hook: "Researchers aren't saying this publicly, but local agents just unlocked AGI milestone 3.", synopsis: "Epistemic separation of fact vs prediction.", recommended_duration: 60, cta: "Follow Road to AGI", is_approved: true },
    { piece_id: "p7", role: "Relatable AI Meme", format: "Reel", pillar: "AI Memes / Relatable", series: "AI POV", target_audience: "Internet-Native Culture", angle: "Deploying the agent at 3 AM", hook: "POV: You gave the AI agent full terminal access and went to sleep.", synopsis: "Humorous 10s clip of agent committing 14,000 files.", recommended_duration: 10, cta: "Tag a developer", is_approved: true },
    { piece_id: "p8", role: "Educational Carousel", format: "Carousel", pillar: "AI Explained", series: "AI EXPLAINED", target_audience: "Instagram Learners", angle: "7 things you need to know", hook: "Swipe through: The 7 architectural shifts in local agents.", synopsis: "8 high-contrast dark slides.", cta: "Save post", comment_keyword: "SLIDES", is_approved: true },
    { piece_id: "p9", role: "Interactive Story Sequence", format: "Story", pillar: "AI News", series: "TOOL OF THE DAY", target_audience: "Daily Followers", angle: "Poll + teaser", hook: "Would you trust an offline AI agent with your codebase?", synopsis: "3-part interactive story poll.", cta: "Watch Reel", is_approved: true },
    { piece_id: "p10", role: "X Post / Short Form Thread", format: "Post", pillar: "AI News", series: "AI NEWS TODAY", target_audience: "X Tech Community", angle: "High signal technical teardown", hook: "Local coding agents just hit 64.2% on SWE-bench. 5 shifts that matter: 🧵👇", synopsis: "Bullet point thread with GitHub repo link.", cta: "Retweet", is_approved: true }
  ]
};

export const MOCK_FUTURE_AII_DIAGNOSTICS: ComparativeDiagnosticResult = {
  post_a: {
    id: "post_a_winner",
    title: "Why Developers Are Ditching Cloud LLMs for Local DeepSeek",
    views: 482000,
    retention_rate: 78.4,
    share_rate: 4.2,
    save_rate: 6.8,
    hook_type: "Contrarian + Benchmark",
    duration_seconds: 28,
    cta_type: "DM_Resource"
  },
  post_b: {
    id: "post_b_underperformer",
    title: "New Open-Source Models Released This Week",
    views: 36000,
    retention_rate: 42.1,
    share_rate: 0.8,
    save_rate: 1.2,
    hook_type: "Generic Announcement",
    duration_seconds: 54,
    cta_type: "Follow"
  },
  winner_id: "post_a_winner",
  performance_multiple: 13.4,
  differential_analysis: [
    "Hook Architecture: Winner used a 'Contrarian + Benchmark' hook establishing high stakes within 2.0s, while loser used a delayed announcement.",
    "Information Utility: Winner generated +5.6% higher save rate by delivering a concrete copy-paste terminal workflow.",
    "Pacing: Winner was 26s shorter (28s vs 54s), maintaining relentless information density.",
    "Conversion Mechanic: Winner leveraged a 'Comment TOOL' CTA with immediate automated resource delivery."
  ],
  key_takeaway: "Post A outperformed Post B by 13.4x primarily due to first-2-second visual contrast, verifiable benchmark specificity, and a resource-backed comment CTA.",
  prescriptive_action: "Standardize the 28s duration and Contrarian + Benchmark hook formula for all upcoming AI Tools content."
};

export const MOCK_FUTURE_AII_WINNERS: WinnerDetectionReport = {
  winning_hooks: [
    { type: "Contrarian + Benchmark", avg_views: 184000, win_rate: "86%", insight: "Lead with the surprising metric everyone missed" },
    { type: "Problem / Urgent Pain", avg_views: 142000, win_rate: "78%", insight: "Frame manual workflow as immediate wasted time" },
    { type: "Visual Paradox", avg_views: 118000, win_rate: "72%", insight: "Show unexpected screen recording in frame 0" }
  ],
  winning_topics: [
    { topic: "Autonomous Coding Agents", engagement_index: 96.4, saves_multiple: 2.8 },
    { topic: "Local Inference & Ollama / DeepSeek", engagement_index: 92.1, saves_multiple: 3.1 },
    { topic: "Frontier Model Benchmarks (Claude vs GPT vs Gemini)", engagement_index: 89.8, shares_multiple: 2.4 },
    { topic: "Road to AGI & Test-Time Compute", engagement_index: 85.0, reach_multiple: 2.1 }
  ],
  winning_formats: [
    { format: "30-Sec Reel (Voice + Screen Diff)", avg_completion: "64.2%", score: 94 },
    { format: "8-Slide Architecture Carousel", avg_saves: "1,840", score: 91 },
    { format: "15-Sec Breaking News Reel", avg_shares: "920", score: 87 }
  ],
  winning_pillars: [
    { pillar: "AI Explained", share_of_top_posts: "34%", strength: "Highest saves & profile visits" },
    { pillar: "AI News", share_of_top_posts: "28%", strength: "Highest reach & velocity" },
    { pillar: "AI Tools", share_of_top_posts: "22%", strength: "Highest comment-to-DM conversions" }
  ],
  winning_series: [
    { series: "AI IN 15 SECONDS", avg_retention: "82.4%", cadence: "3x weekly" },
    { series: "AI TOOL YOU NEED", avg_dm_triggers: "412", cadence: "3x weekly" },
    { series: "ROAD TO AGI", avg_shares: "1,450", cadence: "2x weekly" }
  ],
  winning_ctas: [
    { cta: "Comment 'TOOL' for link & prompt", conversion_rate: "18.4%", efficiency: "Exceptional" },
    { cta: "Comment 'CHEAT' for visual diagram", conversion_rate: "16.1%", efficiency: "High" },
    { cta: "Save this for your next project", save_lift: "+140%", efficiency: "High" }
  ],
  winning_visual_styles: [
    { style: "Dark Metallic IDE Terminal + Amber Neon Highlights", retention_lift: "+24%" },
    { style: "Split-Screen Head-to-Head Benchmark Ticker", retention_lift: "+31%" },
    { style: "Animated Node Graph Vector Overlay", retention_lift: "+18%" }
  ],
  winning_durations: [
    { duration_bucket: "25–35 seconds", avg_retention: "76.8%", verdict: "OPTIMAL SWEET SPOT" },
    { duration_bucket: "12–18 seconds", avg_retention: "84.2%", verdict: "HIGH COMPLETION (Breaking)" },
    { duration_bucket: "50–70 seconds", avg_retention: "52.1%", verdict: "RESERVE FOR DEEP EXPERIMENTS" }
  ],
  generated_at: new Date().toISOString()
};

export const MOCK_FUTURE_AII_CALENDAR: Calendar30DayView = {
  start_date: new Date().toISOString().slice(0, 10),
  end_date: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
  total_slots: 30,
  pillar_distribution: {
    "AI News": 25.0,
    "AI Explained": 20.0,
    "AI Tools": 15.0,
    "AI For Normal People": 10.0,
    "AGI / ASI / Future": 10.0,
    "AI Memes / Relatable": 10.0,
    "AI Experiments": 10.0
  },
  target_distribution: {
    "AI News": 25.0,
    "AI Explained": 20.0,
    "AI Tools": 15.0,
    "AI For Normal People": 10.0,
    "AGI / ASI / Future": 10.0,
    "AI Memes / Relatable": 10.0,
    "AI Experiments": 10.0
  },
  slots: Array.from({ length: 30 }, (_, i) => {
    const d = new Date(Date.now() + i * 86400000);
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()];
    const pillars = ["AI News", "AI Explained", "AI Tools", "AI Experiments", "AGI / ASI / Future", "AI Memes / Relatable", "AI Explained"];
    const p = pillars[i % 7];
    return {
      date_str: d.toISOString().slice(0, 10),
      day_of_week: dayName,
      time_slot: "19:30",
      pillar: p,
      series: p === "AI News" ? "AI NEWS TODAY" : p === "AI Tools" ? "AI TOOL YOU NEED" : "AI IN 15 SECONDS",
      format: p === "AI Explained" ? "Carousel" : "Reel",
      content_id: `slot_${i}`,
      title: `${p} Broadcast #${i + 1}`,
      status: i === 0 ? "READY_TO_POST" : "SCHEDULED"
    };
  })
};

export const MOCK_FUTURE_AII_PIPELINE: PipelineStageSummary[] = [
  { stage: "IDEA", count: 8, items: [{ id: "i1", title: "Open-source WebGPU reasoning", pillar: "AI Explained" }] },
  { stage: "RESEARCHING", count: 4, items: [{ id: "i2", title: "DeepSeek v3 benchmarks", pillar: "AI News" }] },
  { stage: "BRIEF_READY", count: 3, items: [{ id: "i3", title: "Local agent setup on M3 Max", pillar: "AI Tools" }] },
  { stage: "SCRIPT_READY", count: 3, items: [{ id: "i4", title: "Why test-time compute matters", pillar: "AI Explained" }] },
  { stage: "CREATIVE_READY", count: 2, items: [{ id: "i5", title: "Claude vs GPT full app test", pillar: "AI Experiments" }] },
  { stage: "PRODUCTION", count: 2, items: [{ id: "i6", title: "SWE-bench local run demo", pillar: "AI Tools" }] },
  { stage: "EDITING", count: 1, items: [{ id: "i7", title: "Agent POV 3 AM", pillar: "AI Memes / Relatable" }] },
  { stage: "REVIEW", count: 2, items: [{ id: "i8", title: "Road to AGI Milestone 3", pillar: "AGI / ASI / Future" }] },
  { stage: "READY_TO_POST", count: 3, items: [{ id: "i9", title: "Autonomous Coding Agent Framework", pillar: "AI Tools" }] },
  { stage: "SCHEDULED", count: 5, items: [{ id: "i10", title: "Tonight's Reel 19:30", pillar: "AI News" }] },
  { stage: "PUBLISHED", count: 24, items: [{ id: "i11", title: "Yesterday's Breakdown", pillar: "AI News" }] },
  { stage: "ANALYZING", count: 4, items: [{ id: "i12", title: "Post A telemetry stream", pillar: "AI Tools" }] },
  { stage: "LEARNED", count: 18, items: [{ id: "i13", title: "Contrarian hook formula win", pillar: "AI News" }] }
];

