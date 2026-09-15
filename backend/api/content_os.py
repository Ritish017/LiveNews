from fastapi import APIRouter, HTTPException, Query, Body
from typing import Dict, Any, Optional
from pydantic import BaseModel

from backend.services.content_os.creator_os_service import CreatorOSService
from backend.services.content_os.capabilities import CapabilityRegistry

router = APIRouter(prefix="/api/content", tags=["Creator Content OS"])

class CreateContentRequest(BaseModel):
    content_type: str = "AI Tools"
    topic: str
    angle: Optional[str] = ""
    format_type: Optional[str] = "Reel"
    style: Optional[str] = "Fast"
    duration_sec: Optional[int] = 30
    free_first: Optional[bool] = True

@router.get("/today")
async def get_today():
    """
    §3 & §59: Simplified mission control answering 'What should I post today?'
    """
    return CreatorOSService.get_today_mission_control()

@router.get("/radar")
async def get_radar():
    """
    §37: Simplified radar with 5 plain buckets (Breaking Now, Rising, Under the Radar, Saturated, Declining).
    """
    return CreatorOSService.get_radar_trends()

@router.post("/create")
async def create_content(req: CreateContentRequest):
    """
    §13, §14, §68: One-Click 'CREATE EVERYTHING' endpoint.
    Compiles full content package with tool-specific prompts (Flow, Gemini, Remotion, HyperFrames, HeyGen, etc.).
    """
    if not req.topic.strip():
        raise HTTPException(status_code=400, detail="Topic cannot be empty.")
    
    package = CreatorOSService.create_everything(
        content_type=req.content_type,
        topic=req.topic,
        angle=req.angle or "",
        format_type=req.format_type or "Reel",
        style=req.style or "Fast",
        duration_sec=req.duration_sec or 30,
        free_first=req.free_first if req.free_first is not None else True
    )
    return package

@router.get("/capabilities")
async def get_capabilities():
    """
    §47 & §48: Capability registry answering tool reality.
    """
    return {
        "tools": CapabilityRegistry.get_all_capabilities()
    }

@router.get("/calendar")
async def get_calendar():
    """
    §38: Simple daily posting schedule.
    """
    return CreatorOSService.get_calendar_schedule()

@router.get("/analytics")
async def get_analytics():
    """
    §39: Creator metrics and actionable learnings.
    """
    return CreatorOSService.get_analytics_learnings()
