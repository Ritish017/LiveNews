"""
The North Star Metric — §17.1: TIME TO HIGH-QUALITY PUBLISHABLE CONTENT.

Measured across the full funnel:

    EVENT OCCURS -> EVENT DETECTED -> OPPORTUNITY IDENTIFIED -> CONTENT CREATED
                 -> VIDEO PRODUCED -> QUALITY APPROVED -> PUBLISHED

Two rules govern this module:

1. A stage the product never recorded is reported as unmeasured, not as zero. Speed you
   did not measure is not speed you achieved (§20.9).
2. Time is only ever reported next to quality. "Faster" is meaningless on its own, and
   the six quality dimensions stay separate (§11.1) — nothing here averages them.
"""

from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone
from enum import Enum
from typing import Any, Dict, List, Optional, Tuple

from pydantic import BaseModel, Field
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.db.models import ContentLifecycle

logger = logging.getLogger(__name__)

# A single lifecycle is an anecdote; medians need a floor to mean anything.
MIN_SAMPLES_FOR_MEDIAN = 3
DEFAULT_WINDOW_DAYS = 30

# How far back to read lifecycles. Single-creator scale, so this is a bound on memory,
# not a sampling decision.
LIFECYCLE_LOOKBACK = 2000

# Unpublished work untouched for this long is stalled, not in progress.
STALL_HOURS = 36.0

# Quality dimensions are 0..100 in this product; a move smaller than this is noise.
QUALITY_NOISE_FLOOR = 1.0


class FunnelStage(str, Enum):
    """The §17.1 funnel. Declaration order *is* the pipeline order."""

    EVENT_OCCURRED = "EVENT_OCCURRED"
    EVENT_DETECTED = "EVENT_DETECTED"
    OPPORTUNITY_IDENTIFIED = "OPPORTUNITY_IDENTIFIED"
    CONTENT_CREATED = "CONTENT_CREATED"
    VIDEO_PRODUCED = "VIDEO_PRODUCED"
    QUALITY_APPROVED = "QUALITY_APPROVED"
    PUBLISHED = "PUBLISHED"

    @property
    def column(self) -> str:
        """The ContentLifecycle column holding this stage's timestamp."""
        return STAGE_COLUMNS[self]

    @property
    def label(self) -> str:
        return self.value.replace("_", " ").title()


STAGE_COLUMNS: Dict["FunnelStage", str] = {
    FunnelStage.EVENT_OCCURRED: "event_occurred_at",
    FunnelStage.EVENT_DETECTED: "event_detected_at",
    FunnelStage.OPPORTUNITY_IDENTIFIED: "opportunity_identified_at",
    FunnelStage.CONTENT_CREATED: "content_created_at",
    FunnelStage.VIDEO_PRODUCED: "video_produced_at",
    FunnelStage.QUALITY_APPROVED: "quality_approved_at",
    FunnelStage.PUBLISHED: "published_at",
}

STAGE_ORDER: List[FunnelStage] = list(FunnelStage)

# VIDEO_PRODUCED is genuinely optional: a text post is publishable without it, so a
# lifecycle that skips it is complete, not broken.
OPTIONAL_STAGES = {FunnelStage.VIDEO_PRODUCED}

# The clock for the north star metric starts when the world moved, not when we noticed.
# If we never learned when the event actually happened, detection is the honest fallback
# and the result is labelled as such.
PRIMARY_START = FunnelStage.EVENT_OCCURRED
FALLBACK_START = FunnelStage.EVENT_DETECTED
TERMINAL_STAGE = FunnelStage.PUBLISHED


class StageDuration(BaseModel):
    """How long content sits between two adjacent funnel stages."""

    from_stage: str
    to_stage: str
    label: str
    median_seconds: Optional[float] = None
    p90_seconds: Optional[float] = None
    fastest_seconds: Optional[float] = None
    sample_size: int = 0
    measured: bool = False
    note: str = ""


class QualityHold(BaseModel):
    """
    The quality half of the metric. §17.1 requires time to fall *without sacrificing
    quality*, so every duration in this report is published beside these medians.

    Dimensions are reported individually and never averaged (§11.1).
    """

    sample_size: int = 0
    dimension_medians: Dict[str, float] = Field(default_factory=dict)
    dimensions_reported: List[str] = Field(default_factory=list)
    measured: bool = False
    note: str = "No quality gates recorded — speed cannot be judged against quality yet."


class NorthStarTrend(BaseModel):
    """Current window vs the immediately preceding window of equal length."""

    comparable: bool = False
    current_median_seconds: Optional[float] = None
    previous_median_seconds: Optional[float] = None
    change_pct: Optional[float] = None
    direction: str = "INSUFFICIENT HISTORY"
    quality_direction: str = "INSUFFICIENT HISTORY"
    verdict: str = "Not enough completed lifecycles in both windows to compare."


class NorthStarReport(BaseModel):
    generated_at: str
    window_days: int
    clock_start: str
    clock_start_note: str

    published_count: int = 0
    completed_count: int = 0
    measured: bool = False

    time_to_publishable_median_seconds: Optional[float] = None
    time_to_publishable_p90_seconds: Optional[float] = None
    time_to_publishable_fastest_seconds: Optional[float] = None
    median_human: str = "Not measured yet"

    stage_durations: List[StageDuration] = Field(default_factory=list)
    slowest_stage: Optional[str] = None
    slowest_stage_seconds: Optional[float] = None

    quality_hold: QualityHold = Field(default_factory=QualityHold)
    trend: NorthStarTrend = Field(default_factory=NorthStarTrend)

    in_flight: Dict[str, int] = Field(default_factory=dict)
    stalled: List[Dict[str, Any]] = Field(default_factory=list)
    honest_gaps: List[str] = Field(default_factory=list)


def _aware(value: Optional[datetime]) -> Optional[datetime]:
    """Normalizes to UTC-aware. SQLite hands back naive datetimes."""
    if value is None:
        return None
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def _median(values: List[float]) -> Optional[float]:
    if not values:
        return None
    ordered = sorted(values)
    mid = len(ordered) // 2
    if len(ordered) % 2 == 1:
        return round(ordered[mid], 2)
    return round((ordered[mid - 1] + ordered[mid]) / 2.0, 2)


def _percentile(values: List[float], pct: float) -> Optional[float]:
    """Nearest-rank percentile — no interpolation, so the number is always a real sample."""
    if not values:
        return None
    ordered = sorted(values)
    idx = min(len(ordered) - 1, max(0, int(round(pct * (len(ordered) - 1)))))
    return round(ordered[idx], 2)


def humanize_seconds(seconds: Optional[float]) -> str:
    if seconds is None:
        return "Not measured yet"
    if seconds < 90:
        return f"{seconds:.0f}s"
    minutes = seconds / 60.0
    if minutes < 90:
        return f"{minutes:.0f}m"
    hours = minutes / 60.0
    if hours < 48:
        return f"{hours:.1f}h"
    return f"{hours / 24.0:.1f}d"

# __APPEND_MARKER__


def _naive_utc(value: Optional[datetime]) -> Optional[datetime]:
    """
    SQLite has no timezone storage, and the rest of this schema defaults to
    `datetime.utcnow()`. Persist naive-UTC so every row on disk means the same thing.
    """
    aware = _aware(value)
    return aware.replace(tzinfo=None) if aware else None


def stage_of(value: Optional[str]) -> FunnelStage:
    """Stored stage string -> enum. Unknown values fall back to the earliest real stage."""
    try:
        return FunnelStage(str(value))
    except ValueError:
        return FunnelStage.EVENT_DETECTED


def completion_seconds(row: ContentLifecycle) -> Tuple[Optional[float], str]:
    """
    Elapsed time from the world moving to the piece being published.

    Returns (seconds, basis). Basis is EVENT_OCCURRED when we know when the event really
    happened, EVENT_DETECTED when we only know when we noticed, and "" when the piece has
    not published yet. A negative span means the clocks disagree, so it is discarded
    rather than reported as an impossibly fast result.
    """
    published = _aware(row.published_at)
    if published is None:
        return None, ""
    for start_stage in (PRIMARY_START, FALLBACK_START):
        started = _aware(getattr(row, start_stage.column, None))
        if started is None:
            continue
        seconds = (published - started).total_seconds()
        if seconds < 0:
            continue
        return round(seconds, 2), start_stage.value
    return None, ""


class NorthStarMetricService:
    """Writes the funnel timestamps, then reads the metric back out of them."""

    # ------------------------------------------------------------------ writes
    async def start_lifecycle(
        self,
        db: AsyncSession,
        *,
        topic: str,
        event_id: Optional[str] = None,
        platform: Optional[str] = None,
        content_format: Optional[str] = None,
        angle: Optional[str] = None,
        creator_id: str = "default",
        event_occurred_at: Optional[datetime] = None,
        event_detected_at: Optional[datetime] = None,
        recommendation_snapshot: Optional[Dict[str, Any]] = None,
        now: Optional[datetime] = None,
    ) -> ContentLifecycle:
        """
        Opens a lifecycle at OPPORTUNITY_IDENTIFIED — the moment the product told the
        creator this was worth making. Upstream timestamps are copied from the event when
        known and left NULL when not.
        """
        moment = now or datetime.now(timezone.utc)
        row = ContentLifecycle(
            creator_id=creator_id,
            event_id=event_id,
            topic=topic,
            platform=platform,
            content_format=content_format,
            angle=angle,
            stage=FunnelStage.OPPORTUNITY_IDENTIFIED.value,
            event_occurred_at=_naive_utc(event_occurred_at),
            event_detected_at=_naive_utc(event_detected_at or moment),
            opportunity_identified_at=_naive_utc(moment),
            recommendation_snapshot=recommendation_snapshot or {},
            quality_gate={},
        )
        db.add(row)
        await db.flush()
        return row

    async def record_stage(
        self,
        db: AsyncSession,
        lifecycle_id: str,
        stage: FunnelStage,
        at: Optional[datetime] = None,
        quality_gate: Optional[Dict[str, Any]] = None,
        commit: bool = True,
    ) -> Optional[ContentLifecycle]:
        """
        Stamps one stage.

        Idempotent by design: the first recorded time for a stage wins, because a stage
        happened when it first happened — not when something reported it again. `stage`
        only ever moves forward, so a late CONTENT_CREATED call cannot rewind a published
        piece back down the funnel.
        """
        row = (
            await db.execute(
                select(ContentLifecycle).where(ContentLifecycle.id == lifecycle_id)
            )
        ).scalar_one_or_none()
        if row is None:
            logger.warning("record_stage: unknown lifecycle id %s", lifecycle_id)
            return None

        if getattr(row, stage.column, None) is None:
            setattr(row, stage.column, _naive_utc(at or datetime.now(timezone.utc)))

        if STAGE_ORDER.index(stage) >= STAGE_ORDER.index(stage_of(row.stage)):
            row.stage = stage.value

        if quality_gate:
            merged = dict(row.quality_gate or {})
            # Only real numbers land in the gate; a missing dimension stays missing.
            merged.update({k: v for k, v in quality_gate.items() if v is not None})
            row.quality_gate = merged

        row.time_to_publishable_seconds = completion_seconds(row)[0]
        await db.flush()
        if commit:
            await db.commit()
        return row
# __APPEND_MARKER_2__

    # ------------------------------------------------------------------- reads
    async def report(
        self,
        db: AsyncSession,
        window_days: int = DEFAULT_WINDOW_DAYS,
        creator_id: Optional[str] = None,
        now: Optional[datetime] = None,
        days: Optional[int] = None,
        platform: Optional[str] = None,
    ) -> NorthStarReport:
        """
        Loads lifecycles and hands them to the pure builder. A degraded DB reports
        "not measured" rather than raising — the metric is an observation of the product,
        not a dependency of it.
        """
        if days is not None:
            window_days = days
        moment = _aware(now) or datetime.now(timezone.utc)
        rows: List[ContentLifecycle] = []
        try:
            stmt = (
                select(ContentLifecycle)
                .order_by(desc(ContentLifecycle.created_at))
                .limit(LIFECYCLE_LOOKBACK)
            )
            if creator_id:
                stmt = stmt.where(ContentLifecycle.creator_id == creator_id)
            rows = list((await db.execute(stmt)).scalars().all())
        except Exception as exc:  # pragma: no cover - metric must never break the app
            logger.warning("North star metric unavailable: %s", exc)
        return self.build_report(rows, window_days=window_days, now=moment)

    def build_report(
        self,
        rows: List[ContentLifecycle],
        window_days: int = DEFAULT_WINDOW_DAYS,
        now: Optional[datetime] = None,
    ) -> NorthStarReport:
        """Pure computation over lifecycle rows — no I/O, so it is directly testable."""
        moment = _aware(now) or datetime.now(timezone.utc)
        window_start = moment - timedelta(days=window_days)
        previous_start = window_start - timedelta(days=window_days)

        current = [r for r in rows if _anchor_in(r, window_start, moment)]
        previous = [r for r in rows if _anchor_in(r, previous_start, window_start)]

        published = [r for r in current if _aware(r.published_at) is not None]
        completions = [(s, b) for s, b in map(completion_seconds, published) if s is not None]
        durations = [secs for secs, _ in completions]
        bases = {basis for _, basis in completions}

        report = NorthStarReport(
            generated_at=moment.isoformat(),
            window_days=window_days,
            clock_start=_clock_start(bases),
            clock_start_note=_clock_start_note(bases),
            published_count=len(published),
            completed_count=len(durations),
            measured=len(durations) >= MIN_SAMPLES_FOR_MEDIAN,
        )
# __APPEND_MARKER_3__

        if durations:
            report.time_to_publishable_median_seconds = _median(durations)
            report.time_to_publishable_p90_seconds = _percentile(durations, 0.9)
            report.time_to_publishable_fastest_seconds = round(min(durations), 2)
            report.median_human = humanize_seconds(report.time_to_publishable_median_seconds)

        report.stage_durations = self._stage_durations(current)
        measured_stages = [
            d for d in report.stage_durations if d.measured and d.median_seconds is not None
        ]
        if measured_stages:
            slowest = max(measured_stages, key=lambda d: d.median_seconds or 0.0)
            report.slowest_stage = slowest.label
            report.slowest_stage_seconds = slowest.median_seconds

        report.quality_hold = self._quality_hold(published)
        report.trend = self._trend(
            current_durations=durations,
            previous_rows=previous,
            current_quality=report.quality_hold,
        )
        report.in_flight = self._in_flight(rows)
        report.stalled = self._stalled(rows, moment)
        report.honest_gaps = self._honest_gaps(report, published)
        return report
# __APPEND_MARKER_4__

    # ------------------------------------------------------------- report parts
    def _stage_durations(self, rows: List[ContentLifecycle]) -> List[StageDuration]:
        """
        Time spent between each adjacent pair of funnel stages.

        A row only contributes to a pair when it stamped both ends, so a text post that
        skipped video production simply adds no sample to the two video pairs instead of
        distorting them with a zero.
        """
        out: List[StageDuration] = []
        for earlier, later in zip(STAGE_ORDER, STAGE_ORDER[1:]):
            samples: List[float] = []
            for row in rows:
                start = _aware(getattr(row, earlier.column, None))
                end = _aware(getattr(row, later.column, None))
                if start is None or end is None:
                    continue
                delta = (end - start).total_seconds()
                if delta < 0:  # clocks disagree — discard rather than invent speed
                    continue
                samples.append(delta)

            measured = len(samples) >= MIN_SAMPLES_FOR_MEDIAN
            if measured:
                note = f"Median across {len(samples)} lifecycles."
            elif samples:
                note = (
                    f"Only {len(samples)} lifecycle(s) recorded both stages; "
                    f"{MIN_SAMPLES_FOR_MEDIAN} are needed for a median."
                )
            elif later in OPTIONAL_STAGES or earlier in OPTIONAL_STAGES:
                note = "Never recorded — expected for content published without video."
            else:
                note = "Never recorded — this stage is not being stamped yet."

            out.append(
                StageDuration(
                    from_stage=earlier.value,
                    to_stage=later.value,
                    label=f"{earlier.label} -> {later.label}",
                    median_seconds=_median(samples) if measured else None,
                    p90_seconds=_percentile(samples, 0.9) if measured else None,
                    fastest_seconds=round(min(samples), 2) if samples else None,
                    sample_size=len(samples),
                    measured=measured,
                    note=note,
                )
            )
        return out
# __APPEND_MARKER_5__

    def _quality_hold(self, published_rows: List[ContentLifecycle]) -> QualityHold:
        """
        Median of each recorded quality dimension across published pieces.

        Dimensions are reported side by side and never combined — collapsing them is
        exactly the misleading single number §11.1 forbids.
        """
        buckets: Dict[str, List[float]] = {}
        rows_with_gate = 0
        for row in published_rows:
            gate = row.quality_gate if isinstance(row.quality_gate, dict) else {}
            if not gate:
                continue
            rows_with_gate += 1
            for dimension, value in gate.items():
                try:
                    buckets.setdefault(str(dimension), []).append(float(value))
                except (TypeError, ValueError):
                    continue  # non-numeric notes in the gate are not scores

        medians: Dict[str, float] = {}
        for dimension, values in sorted(buckets.items()):
            if len(values) < MIN_SAMPLES_FOR_MEDIAN:
                continue
            median = _median(values)
            if median is not None:
                medians[dimension] = median

        if medians:
            note = (
                f"Median per dimension across {rows_with_gate} published pieces with a "
                "recorded quality gate. Dimensions are never averaged together."
            )
        elif rows_with_gate:
            note = (
                f"{rows_with_gate} published piece(s) carry a quality gate; "
                f"{MIN_SAMPLES_FOR_MEDIAN} per dimension are needed for a median."
            )
        else:
            note = "No quality gates recorded — speed cannot be judged against quality yet."

        return QualityHold(
            sample_size=rows_with_gate,
            dimension_medians=medians,
            dimensions_reported=list(medians.keys()),
            measured=bool(medians),
            note=note,
        )
# __APPEND_MARKER_6__

    def _trend(
        self,
        current_durations: List[float],
        previous_rows: List[ContentLifecycle],
        current_quality: QualityHold,
    ) -> NorthStarTrend:
        """
        Current window vs the preceding window of equal length.

        Speed and quality are reported together on purpose: §17.1 asks for less time
        *without sacrificing quality*, so a faster median with regressing dimensions is
        reported as a warning, not a win.
        """
        previous_published = [r for r in previous_rows if _aware(r.published_at) is not None]
        previous_durations = [
            s for s, _ in map(completion_seconds, previous_published) if s is not None
        ]
        now_median = _median(current_durations)
        before_median = _median(previous_durations)

        if (
            len(current_durations) < MIN_SAMPLES_FOR_MEDIAN
            or len(previous_durations) < MIN_SAMPLES_FOR_MEDIAN
            or not before_median
        ):
            return NorthStarTrend(
                current_median_seconds=now_median,
                previous_median_seconds=before_median,
                verdict=(
                    f"{len(current_durations)} completed this window and "
                    f"{len(previous_durations)} the window before; "
                    f"{MIN_SAMPLES_FOR_MEDIAN} in each are needed to compare."
                ),
            )

        change = round(((now_median - before_median) / before_median) * 100.0, 1)
        direction = "FASTER" if change <= -5.0 else "SLOWER" if change >= 5.0 else "FLAT"
        quality_direction, quality_note = _compare_quality(
            current_quality, self._quality_hold(previous_published)
        )
        return NorthStarTrend(
            comparable=True,
            current_median_seconds=now_median,
            previous_median_seconds=before_median,
            change_pct=change,
            direction=direction,
            quality_direction=quality_direction,
            verdict=_trend_verdict(direction, change, now_median, before_median, quality_direction, quality_note),
        )
# __APPEND_MARKER_7__

    def _in_flight(self, rows: List[ContentLifecycle]) -> Dict[str, int]:
        """Where unpublished work is currently sitting, in funnel order."""
        counts: Dict[str, int] = {}
        for row in rows:
            if _aware(row.published_at) is not None or row.abandoned_reason:
                continue
            key = stage_of(row.stage).value
            counts[key] = counts.get(key, 0) + 1
        return {stage.value: counts[stage.value] for stage in STAGE_ORDER if stage.value in counts}

    def _stalled(
        self, rows: List[ContentLifecycle], now: datetime
    ) -> List[Dict[str, Any]]:
        """
        Work that entered the funnel and stopped moving. This is the actionable half of
        the metric: an idea stuck at CONTENT_CREATED for two days is time being lost.
        """
        stalled: List[Dict[str, Any]] = []
        for row in rows:
            if _aware(row.published_at) is not None or row.abandoned_reason:
                continue
            touched = _aware(row.updated_at) or _aware(row.created_at)
            if touched is None:
                continue
            idle_hours = (now - touched).total_seconds() / 3600.0
            if idle_hours < STALL_HOURS:
                continue
            stalled.append(
                {
                    "lifecycle_id": row.id,
                    "topic": row.topic,
                    "platform": row.platform,
                    "stage": stage_of(row.stage).value,
                    "idle_hours": round(idle_hours, 1),
                }
            )
        stalled.sort(key=lambda item: item["idle_hours"], reverse=True)
        return stalled[:10]
# __APPEND_MARKER_8__

    def _honest_gaps(
        self, report: NorthStarReport, published: List[ContentLifecycle]
    ) -> List[str]:
        """Everything this report cannot claim, stated plainly (§20.9)."""
        gaps: List[str] = []
        if report.published_count == 0:
            gaps.append(
                "No published lifecycle recorded in this window — the north star metric "
                "is unmeasured, not zero."
            )
        elif not report.measured:
            gaps.append(
                f"{report.completed_count} completed lifecycle(s) with a usable start and "
                f"publish time; {MIN_SAMPLES_FOR_MEDIAN} are needed before a median means "
                "anything."
            )
        if published and report.completed_count < report.published_count:
            gaps.append(
                f"{report.published_count - report.completed_count} published piece(s) "
                "have no usable start time, so they are excluded from the timing median."
            )
        if report.clock_start == FALLBACK_START.value:
            gaps.append(
                "The clock starts at detection, not at the event itself — no event "
                "occurrence time was recorded, so true end-to-end time is longer than "
                "reported."
            )
        if not report.quality_hold.measured:
            gaps.append(report.quality_hold.note)
        never = [
            d.label
            for d in report.stage_durations
            if d.sample_size == 0
            and FunnelStage(d.to_stage) not in OPTIONAL_STAGES
            and FunnelStage(d.from_stage) not in OPTIONAL_STAGES
        ]
        if never:
            gaps.append("Stages never stamped: " + "; ".join(never) + ".")
        if report.stalled:
            gaps.append(
                f"{len(report.stalled)} piece(s) idle for more than {STALL_HOURS:.0f}h are "
                "counted as in-flight, not as time saved."
            )
        return gaps

    funnel_report = report
# __APPEND_MARKER_9__


def _anchor_in(row: ContentLifecycle, start: datetime, end: datetime) -> bool:
    """Buckets a lifecycle by when it published, or when it was created if it hasn't."""
    anchor = _aware(row.published_at) or _aware(row.created_at)
    if anchor is None:
        return False
    return start <= anchor <= end


def _clock_start(bases: set) -> str:
    if not bases:
        return FALLBACK_START.value
    if bases == {PRIMARY_START.value}:
        return PRIMARY_START.value
    if PRIMARY_START.value in bases:
        return "MIXED"
    return FALLBACK_START.value


def _clock_start_note(bases: set) -> str:
    start = _clock_start(bases)
    if start == PRIMARY_START.value:
        return "Timed from when the event actually happened — true end-to-end latency."
    if start == "MIXED":
        return (
            "Some pieces are timed from the real event time and some only from detection, "
            "so the median understates true end-to-end latency."
        )
    return (
        "Timed from detection because no event occurrence time was recorded. Real "
        "end-to-end latency is longer than this number."
    )


def _compare_quality(now: QualityHold, before: QualityHold) -> Tuple[str, str]:
    """
    Compares quality dimension by dimension. Deliberately counts movements instead of
    averaging scores — averaging is the collapse §11.1 forbids.
    """
    shared = [d for d in now.dimension_medians if d in before.dimension_medians]
    if not shared:
        return "INSUFFICIENT HISTORY", "no dimension has a median in both windows"
    improved = [
        d for d in shared
        if now.dimension_medians[d] - before.dimension_medians[d] > QUALITY_NOISE_FLOOR
    ]
    regressed = [
        d for d in shared
        if before.dimension_medians[d] - now.dimension_medians[d] > QUALITY_NOISE_FLOOR
    ]
    if regressed and improved:
        direction = "MIXED"
    elif regressed:
        direction = "REGRESSED"
    elif improved:
        direction = "IMPROVED"
    else:
        direction = "HELD"
    return direction, (
        f"{len(improved)} of {len(shared)} dimensions improved, {len(regressed)} regressed"
    )
# __APPEND_MARKER_10__


def _trend_verdict(
    direction: str,
    change: float,
    now_median: float,
    before_median: float,
    quality_direction: str,
    quality_note: str,
) -> str:
    span = f"{humanize_seconds(before_median)} -> {humanize_seconds(now_median)}"
    if direction == "FLAT":
        speed = f"Median time to publishable held flat ({span})"
    else:
        verb = "fell" if change < 0 else "rose"
        speed = f"Median time to publishable {verb} {abs(change):.1f}% ({span})"

    if quality_direction == "INSUFFICIENT HISTORY":
        return f"{speed}; quality cannot be compared yet ({quality_note})."
    if direction == "FASTER" and quality_direction in {"REGRESSED", "MIXED"}:
        return (
            f"{speed}, but quality {quality_direction.lower()} ({quality_note}). "
            "Faster at the cost of quality is not progress against the north star."
        )
    return f"{speed} with quality {quality_direction.lower()} ({quality_note})."


north_star_metrics = NorthStarMetricService()














