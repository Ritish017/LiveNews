"""
Unit and Integration Tests for FUTURE.AII Content Operating System
Tests the 7 Pillars, 16+ Series, 11-Factor Opportunity Scorer, 1-to-10 Cluster Engine,
10-Hook Engine, Timestamped Script Engine, Comment->DM Automation, Remotion Generator,
Traceability, 30-Day Calendar, 13-Stage Pipeline, Comparative Analytics, and FastAPI Endpoints.
"""

import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.future_aii import (
    brand_service,
    pillars_and_series_service,
    opportunity_ranker,
    cluster_engine,
    hook_engine,
    script_engine,
    cta_automation_engine,
    carousel_story_engine,
    experiment_engine,
    traceability_engine,
    remotion_generator,
    calendar_pipeline_service,
    analytics_learning_service,
    content_os_service
)
from backend.services.future_aii.analytics_and_learning_service import PostComparisonItem

client = TestClient(app)

def test_brand_service_defaults_and_anti_generic():
    profile = brand_service.audit_anti_generic(
        text="This is a game-changer that will revolutionize and unleash AI deep dive",
        hook="Mind-blowing update",
        cta="Follow for more"
    )
    assert profile.is_generic is True
    assert profile.generic_score > 35.0
    assert len(profile.detected_cliches) >= 3

    good_audit = brand_service.audit_anti_generic(
        text="Here is what actually changed: native weights reduce inference latency by 60%. This means developers can run local models instead of paying for cloud APIs. Comment TOOL for the GitHub link.",
        hook="Stop scrolling — here is the real benchmark numbers for DeepSeek.",
        cta="Comment TOOL for the link"
    )
    assert good_audit.is_generic is False
    assert good_audit.has_what_changed is True
    assert good_audit.has_why_it_matters is True
    assert good_audit.has_concrete_takeaway is True


def test_pillars_and_series_catalog():
    pillars = pillars_and_series_service.get_all_pillars()
    assert len(pillars) == 7
    assert "AI News" in pillars
    assert "AI Explained" in pillars
    assert "AI Tools" in pillars
    assert "AI For Normal People" in pillars
    assert "AGI / ASI / Future" in pillars
    assert "AI Memes / Relatable" in pillars
    assert "AI Experiments" in pillars

    # Verify target share sums to 100%
    total_pct = sum(p.target_share_pct for p in pillars.values())
    assert total_pct == 100

    # Test series count
    news_series = pillars_and_series_service.get_series_for_pillar("AI News")
    assert len(news_series) >= 2
    assert any(s.name == "AI NEWS TODAY" for s in news_series)


def test_opportunity_ranker_11_factors():
    test_event = {
        "id": "test_event_1",
        "canonical_title": "New Frontier Reasoning Model Released with Open Weights",
        "summary": "Full weights released under Apache 2.0 with benchmark scores beating proprietary models.",
        "category": "AI Models",
        "source_count": 9,
        "confidence_score": 98.0,
        "momentum_score": 85.0,
        "key_facts": ["Weights released", "Local inference verified", "SWE-bench score 62%"]
    }
    score_breakdown = opportunity_ranker.evaluate_event(test_event)
    assert score_breakdown.total_opportunity_score >= 70.0
    assert score_breakdown.urgency in ["POST_NOW", "POST_TODAY", "POST_THIS_WEEK"]
    assert score_breakdown.audience_fit >= 70.0
    assert score_breakdown.recommended_pillar != ""
    assert score_breakdown.recommended_series != ""


def test_cluster_engine_10_pieces():
    test_event = {
        "id": "evt_deepseek_v3",
        "canonical_title": "DeepSeek V3 Open Weights",
        "summary": "Massive milestone in open-weights reasoning efficiency."
    }
    cluster = cluster_engine.generate_cluster(test_event)
    assert len(cluster.pieces) == 10
    roles = [p.role for p in cluster.pieces]
    assert "Breaking News Reel" in roles
    assert "What Changed? Reel" in roles
    assert "Explainer Reel" in roles
    assert "Comparison Reel" in roles
    assert "Tool Demo Reel" in roles
    assert "Future / AGI Reel" in roles
    assert "Relatable AI Meme" in roles
    assert "Educational Carousel" in roles
    assert "Interactive Story Sequence" in roles
    assert "X Post / Short Form Thread" in roles


def test_hook_engine_scoring_and_selection():
    suite = hook_engine.generate_hooks(
        topic="Autonomous Coding Agents",
        angle="Why local coding agents eliminate cloud API costs",
        key_claims=["Zero latency buffer", "Runs on local GPU"]
    )
    assert len(suite.all_hooks) == 10
    assert suite.best_hook is not None
    assert suite.safe_hook is not None
    assert suite.high_risk_hook is not None
    assert suite.best_hook.tag == "BEST"
    assert suite.safe_hook.tag == "SAFE"
    assert suite.high_risk_hook.tag == "HIGH_RISK"
    assert suite.best_hook.composite_score >= 80.0


def test_script_engine_dynamic_duration():
    for duration in [15, 30, 60]:
        script = script_engine.generate_script(
            topic="Local AI Agents",
            angle="Run coding agents offline",
            pillar="AI Tools",
            series="AI TOOL YOU NEED",
            hook="Stop scrolling — this agent runs locally.",
            cta="Comment 'TOOL' for setup.",
            duration=duration
        )
        assert script.duration_seconds == duration
        assert len(script.segments) >= 3
        # Check that segments contain voice, visual, text, sfx, camera
        for seg in script.segments:
            assert seg.voice != ""
            assert seg.visual != ""
            assert seg.on_screen_text != ""
            assert seg.sfx != ""
            assert seg.camera != ""


def test_cta_and_automation_engine():
    # Test tool CTA has resource
    tool_cta = cta_automation_engine.select_cta(
        pillar="AI Tools",
        goal="Leads",
        topic="Claude Code",
        has_resource=True
    )
    assert tool_cta.has_deliverable_resource is True
    assert tool_cta.resource_keyword == "TOOL"

    # Test news CTA does not fake resource
    news_cta = cta_automation_engine.select_cta(
        pillar="AI News",
        goal="Followers",
        topic="OpenAI Announcement",
        has_resource=False
    )
    assert news_cta.has_deliverable_resource is False

    # Test automation simulation
    auto = cta_automation_engine.create_automation(
        content_id="test_101",
        keyword="AGENT",
        topic="Local AI Agent",
        resource_payload="https://github.com/future-aii/agent"
    )
    sim = cta_automation_engine.simulate_interaction(auto, "Can you send the AGENT prompt please?")
    assert sim.is_match is True
    assert sim.matched_keyword == "AGENT"
    assert "https://github.com/future-aii/agent" in sim.resource_delivered


def test_carousel_and_story_engine():
    carousel = carousel_story_engine.generate_carousel(
        topic="Transformer Attention Heads",
        angle="Visual explanation of Q, K, V",
        pillar="AI Explained",
        slide_count=8
    )
    assert carousel.total_slides == 8
    assert carousel.slides[0].slide_role == "HOOK"
    assert carousel.slides[-1].slide_role == "CTA"

    story_seq = carousel_story_engine.generate_story_sequence(
        topic="Autonomous AI",
        reel_title="Road to AGI"
    )
    assert story_seq.total_stories == 3
    assert story_seq.stories[0].story_type == "POLL"


def test_traceability_engine():
    sample_segments = [
        {"sentence_id": "s1", "voice": "Yesterday, DeepSeek released a new model.", "phase": "CONTEXT"},
        {"sentence_id": "s2", "voice": "Architectural tests confirm 60% lower latency.", "phase": "PAYOFF"},
        {"sentence_id": "s3", "voice": "By 2028, autonomous agents will predict full software builds.", "phase": "PAYOFF"},
        {"sentence_id": "s4", "voice": "Comment below.", "phase": "CTA"}
    ]
    report = traceability_engine.build_claim_traces(sample_segments)
    assert report.total_claims_analyzed == 3  # CTA excluded
    assert report.speculative_predictions_count == 1
    assert report.confirmed_claims_count == 2
    assert report.is_fully_traceable is True


def test_remotion_generator():
    remotion = remotion_generator.generate_remotion_composition(
        topic="AI Speed Multiplier",
        hook="Stop scrolling — AI just got 4x faster.",
        script_segments=[],
        duration_seconds=30
    )
    assert remotion.duration_in_frames == 900
    assert "remotion" in remotion.copyable_react_code.lower()
    assert "HookScene" in remotion.copyable_react_code
    assert "PayoffScene" in remotion.copyable_react_code


def test_comparative_diagnostics_and_winners():
    post_a = PostComparisonItem(
        id="post_a", title="Post A", views=500000, retention_rate=80.0,
        share_rate=5.0, save_rate=7.0, hook_type="Contrarian", duration_seconds=30, cta_type="DM"
    )
    post_b = PostComparisonItem(
        id="post_b", title="Post B", views=50000, retention_rate=40.0,
        share_rate=1.0, save_rate=1.5, hook_type="Announcement", duration_seconds=60, cta_type="Follow"
    )
    diag = analytics_learning_service.compare_posts(post_a, post_b)
    assert diag.winner_id == "post_a"
    assert diag.performance_multiple == 10.0
    assert len(diag.differential_analysis) >= 3

    winners = analytics_learning_service.get_winner_detection_report()
    assert len(winners.winning_hooks) > 0
    assert len(winners.winning_topics) > 0
    assert len(winners.winning_durations) > 0


@pytest.mark.asyncio
async def test_content_os_master_package_and_today_workspace():
    package = await content_os_service.create_complete_content_package(
        topic="DeepSeek R1 Reasoning Model",
        goal="Reach & Follows",
        duration=30
    )
    assert package.content_id != ""
    assert package.selected_hook != ""
    assert package.script.duration_seconds == 30
    assert package.fact_audit.is_fully_traceable is True
    assert package.remotion_spec.duration_in_frames == 900
    assert len(package.carousel_spec.slides) >= 5
    assert package.is_ready_to_post is True

    today = await content_os_service.get_today_workspace()
    assert today.greeting == "GOOD MORNING 👋"
    assert len(today.top_opportunities) > 0
    assert len(today.ready_content_packages) > 0
    assert len(today.yesterday_learnings) >= 3


def test_fastapi_future_aii_endpoints():
    # 1. Health
    res = client.get("/api/health")
    assert res.status_code == 200

    # 2. Today Workspace
    res = client.get("/api/future-aii/today")
    assert res.status_code == 200
    data = res.json()
    assert "top_opportunities" in data
    assert "ready_content_packages" in data

    # 3. Brand
    res = client.get("/api/future-aii/brand")
    assert res.status_code == 200
    assert res.json()["handle"] == "future.aii__"

    # 4. Pillars
    res = client.get("/api/future-aii/pillars")
    assert res.status_code == 200
    assert "AI News" in res.json()

    # 5. Opportunities
    res = client.get("/api/future-aii/opportunities")
    assert res.status_code == 200
    assert len(res.json()) > 0

    # 6. Event to Cluster
    res = client.post("/api/future-aii/event-to-cluster", json={
        "title": "OpenAI Autonomous Agent Release",
        "summary": "Agent framework that can control computer screens and write code."
    })
    assert res.status_code == 200
    assert len(res.json()["pieces"]) == 10

    # 7. Automations simulate
    res = client.post("/api/future-aii/automations/simulate", json={
        "keyword": "AGENT",
        "incoming_comment": "Please send the AGENT link!",
        "user_handle": "test_dev"
    })
    assert res.status_code == 200
    assert res.json()["is_match"] is True

    # 8. Diagnostics
    res = client.get("/api/future-aii/analytics/diagnostics")
    assert res.status_code == 200
    assert "winner_id" in res.json()

    # 9. Winners
    res = client.get("/api/future-aii/learning/winners")
    assert res.status_code == 200
    assert "winning_hooks" in res.json()
