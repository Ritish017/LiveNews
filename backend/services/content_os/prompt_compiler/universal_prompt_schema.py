from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class SceneShotSpec(BaseModel):
    shot_id: str
    time_start: float
    time_end: float
    duration_sec: float
    purpose: str
    voiceover: str
    on_screen_text: str
    visual_concept: str
    subject: str
    action: str
    environment: str
    composition: str
    camera: str
    lens: str
    movement: str
    lighting: str
    time_of_day: str = "Contemporary studio / high-contrast neon night"
    materials: str = "Sleek glass, brushed titanium, matte silicon"
    physics: str = "Real-world fluid motion with subtle kinetic acceleration"
    motion_intensity: str = "MODERATE"
    facial_expression: Optional[str] = None
    character_continuity: Optional[str] = None
    sound_effects: str
    transition_out: str = "Hard cut on beat"
    negative_constraints: List[str] = Field(
        default_factory=lambda: [
            "no generic glowing blue AI brains",
            "no meaningless floating holograms",
            "no random matrix code rain",
            "no distorted hands or disjointed limbs",
            "no low-contrast washed-out stock aesthetics"
        ]
    )
    underlying_claim: Optional[str] = None
    source_citation: Optional[str] = None

class FlowShotPrompt(BaseModel):
    shot_id: str
    duration_sec: float
    input_type: str = "TEXT_TO_VIDEO"  # TEXT_TO_VIDEO, IMAGE_TO_VIDEO, INGREDIENTS
    compiled_prompt: str
    camera_direction: str
    lighting_and_style: str
    negative_prompt: str

class GeminiPromptPack(BaseModel):
    deep_research_prompt: str
    creative_angle_prompt: str
    script_polisher_prompt: str
    critic_prompt: str
    repurposing_prompt: str

class ChatGPTGoPromptPack(BaseModel):
    system_context: str
    creative_director_task: str
    plugin_ready: bool = False
    recommended_plugins: List[str] = Field(default_factory=list)

class RemotionProjectSpec(BaseModel):
    composition_name: str
    duration_in_frames: int = 900
    fps: int = 30
    width: int = 1080
    height: int = 1920
    is_atelier_mode: bool = True
    copyable_react_code: str
    render_command: str

class HyperFramesSpec(BaseModel):
    html_markup: str
    css_styles: str
    gsap_timeline_code: str
    duration_sec: float

class HeyGenSpec(BaseModel):
    avatar_id: str = "josh_lite3_2024"
    voice_id: str = "en-US-Neural2-F"
    speaking_script: str
    b_roll_cues: List[Dict[str, Any]] = Field(default_factory=list)

class OpenSourceStackSpec(BaseModel):
    ffmpeg_concat_command: str
    whisper_transcription_command: str
    piper_tts_command: str
    free_stock_keywords: List[str] = Field(default_factory=list)

class EditingPlanSpec(BaseModel):
    software_targets: List[str] = Field(default_factory=lambda: ["CapCut", "Premiere Pro", "DaVinci Resolve"])
    timeline_cuts: List[Dict[str, Any]]
    audio_track_guidelines: str
    export_preset: str = "1080x1920 30fps H.264 / ProRes 422"

class SocialDistributionPackage(BaseModel):
    caption_short: str
    caption_long: str
    hashtags: List[str]
    cta_primary: str
    cta_type: str
    comment_keyword: str
    dm_public_reply: str
    dm_private_message: str
    dm_resource_deliverable: str
    follow_nudge: str

class UniversalContentPackage(BaseModel):
    id: str
    title: str
    content_type: str  # AI News, AI Explained, AI Tools, AI for Normal People, Future, Memes, Experiments
    series: str
    format: str  # Reel, Carousel, Story, Meme, Short, X, LinkedIn
    duration_seconds: int
    target_audience: str
    core_objective: str
    strategic_angle: str
    why_now: str
    why_audience_cares: str
    differentiation: str
    hook: str
    alternative_hooks: List[str] = Field(default_factory=list)
    script_full_text: str
    script_shots: List[SceneShotSpec]
    
    # Tool-specific prompt pack
    flow_prompts: List[FlowShotPrompt]
    gemini_prompts: GeminiPromptPack
    chatgpt_prompts: ChatGPTGoPromptPack
    remotion_spec: RemotionProjectSpec
    hyperframes_spec: HyperFramesSpec
    heygen_spec: HeyGenSpec
    opensource_spec: OpenSourceStackSpec
    editing_plan: EditingPlanSpec
    
    # Social Engagement & Automation
    social_package: SocialDistributionPackage
    
    # Cost & Capabilities
    cost_tier: str = "FREE"  # FREE, LOW, MEDIUM, HIGH
    primary_engine_routed: str
    routing_reason: str
    
    # Advanced / Audit (hidden in drawer by default)
    source_claims: List[Dict[str, Any]] = Field(default_factory=list)
    confidence_score: float = 95.0
    epistemic_status: str = "CONFIRMED"  # CONFIRMED, LIKELY, DEVELOPING, UNVERIFIED
    originality_score: int = 94
    anti_slop_passed: bool = True
    created_at: str
