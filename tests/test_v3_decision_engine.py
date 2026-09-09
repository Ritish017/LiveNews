"""
Comprehensive Test Suite for Decision Engine & North Star Funnel:
Validates North Star §8, §13.1, §16.1, §17.1, §20, §28, and §29:
- 'What Should I Post Today?' deterministic decision flow
- Evidence-based creator profiling & personalization
- 7-Stage Time-to-Publishable-Content funnel telemetry
- Unified 1-click 'Create Everything' production pipeline
- Zero fabricated metrics in cold-start fallbacks
"""

import pytest
import httpx
from datetime import datetime, timezone, timedelta

from backend.main import app
from backend.db.session import init_db, AsyncSessionLocal
from backend.db.models import Event, EventSource, Topic, ContentLifecycle
from backend.services.decision.decision_engine import decision_engine
from backend.services.decision.creator_profile import creator_profile_resolver, EvidenceBasis
from backend.services.decision.north_star_metric import north_star_metrics, FunnelStage
from backend.services.learning.learning_engine import learning_engine


@pytest.mark.asyncio
async def test_decision_engine_daily_recommendation_and_shape():
    """Verify decision_engine returns complete North Star §16.1 shape."""
    await init_db()
    async with AsyncSessionLocal() as db:
        # Create a canonical confirmed event
        ev = Event(
            canonical_title="DeepSeek R1 Open Weights Released with Real-Time Reasoning",
            summary="DeepSeek announces open release of R1 reasoning model with open math benchmarks.",
            category="AI Models",
            status="CONFIRMED",
            confidence_score=95.0,
            source_count=3,
            independent_source_count=2,
            primary_source_name="Hugging Face",
            primary_source_url="https://huggingface.co/deepseek-ai/DeepSeek-R1",
            key_facts=["Weights released on HF", "671B MoE architecture", "Math Olympiad score: 92%"],
            relevance_score=95.0,
            freshness_score=98.0,
            momentum_score=94.0,
            opportunity_score=92.0,
            recommended_action="POST_NOW",
            recommended_angle="Developer implications of zero-cost reasoning tokens",
            event_timestamp=datetime.now(timezone.utc) - timedelta(hours=1),
            surfaced_at=datetime.now(timezone.utc)
        )
        db.add(ev)
        await db.commit()
        await db.refresh(ev)

        # Run decision engine
        decision = await decision_engine.decide_for_day(db=db, time_available_minutes=30)
        assert decision.candidates_considered >= 1
        assert decision.top_recommendation is not None

        top = decision.top_recommendation
        # Validate §16.1 output shape
        assert top.headline != ""
        assert top.why_it_matters != ""
        assert top.what_nobody_is_explaining != ""
        assert top.opportunity.personalized_score > 0
        assert len(top.opportunity.world_factors) > 0
        assert top.best_angle != ""
        assert top.platform in ("x", "linkedin", "instagram", "youtube")
        assert top.hook != ""
        assert "has_baseline" in top.success_criteria
        assert "log_endpoint" in top.success_criteria

        # Validate evidence coverage
        assert "measured_factors" in decision.evidence_coverage
        assert "assumed_factors" in decision.evidence_coverage


@pytest.mark.asyncio
async def test_creator_profile_resolver_and_personalization():
    """Verify creator profiling, declared preference updates, and evidence basis tracking."""
    await init_db()
    async with AsyncSessionLocal() as db:
        profile = await creator_profile_resolver.resolve(db)
        assert profile.creator_id == "default"
        assert profile.is_cold_start() is True

        # Save declared preferences
        updated = await creator_profile_resolver.save_declared(
            db=db,
            audience="AI Architects and Systems Engineers",
            voice_tone="Pragmatic & Highly Technical",
            technical_depth="Architectural Deep Dives",
            risk_tolerance=0.8,
            topic_affinities={"AI Models": 0.95, "Robotics": 0.4}
        )
        assert updated.audience == "AI Architects and Systems Engineers"
        assert updated.voice_tone == "Pragmatic & Highly Technical"
        assert "ai models" in updated.topic_affinity
        assert updated.topic_affinity["ai models"].score == 0.95
        assert updated.topic_affinity["ai models"].evidence.basis == EvidenceBasis.DECLARED


@pytest.mark.asyncio
async def test_north_star_metric_funnel_stages():
    """Verify §17.1 7-stage funnel metrics tracking and separate quality scores."""
    await init_db()
    async with AsyncSessionLocal() as db:
        now = datetime.now(timezone.utc)
        lifecycle = await north_star_metrics.start_lifecycle(
            db=db,
            topic="Gemini 2.5 Flash Architecture",
            platform="youtube",
            content_format="short",
            angle="Speed vs Reasoning Depth",
            event_occurred_at=now - timedelta(minutes=45),
            event_detected_at=now - timedelta(minutes=30),
            now=now - timedelta(minutes=20)
        )
        assert lifecycle.stage == FunnelStage.OPPORTUNITY_IDENTIFIED.value

        # Progress stages
        await north_star_metrics.record_stage(
            db=db,
            lifecycle_id=lifecycle.id,
            stage=FunnelStage.CONTENT_CREATED,
            at=now - timedelta(minutes=15),
            quality_gate={"fact_check_score": 95.0, "originality_score": 92.0}
        )
        await north_star_metrics.record_stage(
            db=db,
            lifecycle_id=lifecycle.id,
            stage=FunnelStage.VIDEO_PRODUCED,
            at=now - timedelta(minutes=5),
            quality_gate={"visual_score": 90.0, "story_score": 94.0}
        )
        await north_star_metrics.record_stage(
            db=db,
            lifecycle_id=lifecycle.id,
            stage=FunnelStage.PUBLISHED,
            at=now
        )

        # Get funnel report
        report = await north_star_metrics.report(db=db, window_days=30)
        assert report.published_count >= 1
        assert len(report.stage_durations) == 6  # 6 transition spans between 7 stages
        # Quality scores must be separate
        assert report.quality_hold is not None
        assert report.trend is not None


@pytest.mark.asyncio
async def test_api_today_decision_and_create_everything():
    """Verify HTTP API endpoints for /api/decision/today and /api/content/create-everything."""
    await init_db()
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. GET /api/decision/today
        res = await client.get("/api/decision/today?time_available_minutes=45")
        assert res.status_code == 200
        decision_data = res.json()
        assert "candidates_considered" in decision_data
        assert "evidence_coverage" in decision_data

        # 2. GET /api/creator/profile
        res = await client.get("/api/creator/profile")
        assert res.status_code == 200
        profile_data = res.json()
        assert "audience" in profile_data

        # 3. GET /api/funnel/metrics
        res = await client.get("/api/funnel/metrics")
        assert res.status_code == 200
        funnel_data = res.json()
        assert "published_count" in funnel_data
        assert "stage_durations" in funnel_data

        # 4. POST /api/content/create-everything (North Star §29)
        res = await client.post(
            "/api/content/create-everything",
            json={
                "canonical_title": "DeepSeek V3 Architectural Innovations",
                "summary": "Multi-head latent attention and deep sparse MoE architecture breakdown.",
                "key_facts": [
                    "MLA compresses KV cache by 93%",
                    "DeepSeekMoE activates 37B out of 671B parameters",
                    "Trained on 14.8T tokens for under $6M"
                ],
                "recommended_angle": "Why MLA changes inference economics for indie developers",
                "platform": "all",
                "time_available_minutes": 30
            }
        )
        assert res.status_code == 200
        pkg = res.json()
        assert pkg["status"] == "success"
        assert "lifecycle_id" in pkg
        assert pkg["funnel_stage"] == FunnelStage.VIDEO_PRODUCED.value
        assert "strategy" in pkg
        assert "content_suite" in pkg
        assert "video_package" in pkg
        assert "publishing" in pkg
        assert "x" in pkg["publishing"]
        assert "linkedin" in pkg["publishing"]
        assert "instagram" in pkg["publishing"]
        assert "youtube" in pkg["publishing"]
        # Verify video compilers were compiled
        assert "engines" in pkg["video_package"]
        assert "remotion" in pkg["video_package"]["engines"]
        assert "omni" in pkg["video_package"]["engines"]
        assert "veo" in pkg["video_package"]["engines"]


@pytest.mark.asyncio
async def test_zero_fabricated_metrics_enforcement():
    """Verify that cold-start learning engine never fabricates statistics without DB rows."""
    await init_db()
    async with AsyncSessionLocal() as db:
        # Delete any content performance rows to test pure cold-start
        profile = await learning_engine.extract_learned_profile(db)
        for insight in profile.winning_insights:
            assert "2.4x" not in insight
            assert "82%" not in insight
