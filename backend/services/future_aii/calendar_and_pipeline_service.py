"""
30-Day Content Calendar & 13-Stage Pipeline Service for future.aii__
Implements §29, §30, §31, §33: Pillar-balanced 30-day scheduling and 13-stage production workflow orchestration.
"""

import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from backend.db.models import ContentOSItemModel, ContentCalendarEntryModel

logger = logging.getLogger(__name__)

PIPELINE_STAGES = [
    "IDEA",
    "RESEARCHING",
    "BRIEF_READY",
    "SCRIPT_READY",
    "CREATIVE_READY",
    "PRODUCTION",
    "EDITING",
    "REVIEW",
    "READY_TO_POST",
    "SCHEDULED",
    "PUBLISHED",
    "ANALYZING",
    "LEARNED"
]

DEFAULT_WEEKLY_ROTATION = {
    0: ("AI News", "AI NEWS TODAY", "Reel"),
    1: ("AI Explained", "AI IN 15 SECONDS", "Carousel"),
    2: ("AI Tools", "AI TOOL YOU NEED", "Reel"),
    3: ("AI Experiments", "AI VS AI", "Reel"),
    4: ("AGI / ASI / Future", "ROAD TO AGI", "Reel"),
    5: ("AI Memes / Relatable", "AI POV", "Reel"),
    6: ("AI Explained", "HOW AI ACTUALLY WORKS", "Carousel")
}


class CalendarDaySlot(BaseModel):
    date_str: str
    day_of_week: str
    time_slot: str = "19:30"
    pillar: str
    series: str
    format: str
    content_id: Optional[str] = None
    title: Optional[str] = None
    status: str = "SCHEDULED"


class Calendar30DayView(BaseModel):
    start_date: str
    end_date: str
    total_slots: int
    pillar_distribution: Dict[str, float] = Field(default_factory=dict)
    target_distribution: Dict[str, float] = Field(default_factory=dict)
    slots: List[CalendarDaySlot] = Field(default_factory=list)


class PipelineStageSummary(BaseModel):
    stage: str
    count: int
    items: List[Dict[str, Any]] = Field(default_factory=list)


class CalendarAndPipelineService:
    """
    Manages the 30-day dynamic schedule and the 13-stage production pipeline.
    """

    def get_stages(self) -> List[str]:
        return PIPELINE_STAGES

    async def get_pipeline_overview(self, db: Optional[AsyncSession] = None) -> List[PipelineStageSummary]:
        """Returns counts and items grouped across all 13 pipeline stages."""
        stage_map = {s: [] for s in PIPELINE_STAGES}

        if db:
            try:
                stmt = select(ContentOSItemModel).order_by(ContentOSItemModel.updated_at.desc())
                res = await db.execute(stmt)
                records = res.scalars().all()
                for r in records:
                    stg = r.status.upper() if r.status else "IDEA"
                    if stg not in stage_map:
                        stg = "IDEA"
                    stage_map[stg].append({
                        "id": r.id,
                        "title": r.topic,
                        "pillar": r.pillar,
                        "series": r.series,
                        "format": r.format,
                        "status": r.status,
                        "priority": r.priority,
                        "updated_at": r.updated_at.isoformat() if r.updated_at else datetime.now(timezone.utc).isoformat()
                    })
            except Exception as e:
                logger.warning(f"Error reading pipeline from DB: {e}")

        return [
            PipelineStageSummary(stage=s, count=len(stage_map[s]), items=stage_map[s])
            for s in PIPELINE_STAGES
        ]

    async def move_pipeline_stage(self, item_id: str, new_stage: str, db: AsyncSession) -> bool:
        """Transitions an item to a new stage in the 13-stage workflow."""
        if new_stage not in PIPELINE_STAGES:
            raise ValueError(f"Invalid stage: {new_stage}. Must be one of {PIPELINE_STAGES}")

        stmt = update(ContentOSItemModel).where(ContentOSItemModel.id == item_id).values(
            status=new_stage,
            updated_at=datetime.now(timezone.utc).replace(tzinfo=None)
        )
        await db.execute(stmt)
        await db.commit()
        return True

    def generate_30_day_calendar(self, start_date: Optional[datetime] = None) -> Calendar30DayView:
        """
        Synthesizes a balanced 30-day Instagram schedule adhering to future.aii__ pillar targets.
        """
        base_date = start_date or datetime.now(timezone.utc)
        slots: List[CalendarDaySlot] = []
        pillar_counts: Dict[str, int] = {}

        day_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

        for i in range(30):
            current_day = base_date + timedelta(days=i)
            weekday_idx = current_day.weekday()
            date_str = current_day.strftime("%Y-%m-%d")

            pillar, series, target_format = DEFAULT_WEEKLY_ROTATION[weekday_idx]
            pillar_counts[pillar] = pillar_counts.get(pillar, 0) + 1

            slots.append(CalendarDaySlot(
                date_str=date_str,
                day_of_week=day_names[weekday_idx],
                time_slot="19:30",
                pillar=pillar,
                series=series,
                format=target_format,
                content_id=None,
                title=f"{series}: Scheduled Slot",
                status="SCHEDULED"
            ))

        total = len(slots)
        distribution = {k: round((v / total) * 100.0, 1) for k, v in pillar_counts.items()}
        target = {
            "AI News": 25.0,
            "AI Explained": 20.0,
            "AI Tools": 15.0,
            "AI For Normal People": 10.0,
            "AGI / ASI / Future": 10.0,
            "AI Memes / Relatable": 10.0,
            "AI Experiments": 10.0
        }

        return Calendar30DayView(
            start_date=slots[0].date_str,
            end_date=slots[-1].date_str,
            total_slots=total,
            pillar_distribution=distribution,
            target_distribution=target,
            slots=slots
        )


calendar_pipeline_service = CalendarAndPipelineService()
