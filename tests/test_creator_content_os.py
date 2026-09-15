import pytest
from httpx import AsyncClient, ASGITransport
from backend.main import app
from backend.services.content_os.creator_os_service import CreatorOSService
from backend.services.content_os.capabilities import CapabilityRegistry, ToolRouter, CostEstimator
from backend.services.content_os.quality.prompt_quality import PromptQualityChecker
from backend.services.content_os.seven_engines import (
    AINewsEngine,
    AIExplainedEngine,
    AIToolsEngine,
    AINormalPeopleEngine,
    FutureEngine,
    AIMemeEngine,
    AIExperimentEngine
)

@pytest.mark.asyncio
async def test_all_seven_content_engines_benchmark():
    """
    §75: Benchmark all 7 content engines across real-world test cases.
    """
    # 1. AI News
    news_res = AINewsEngine.generate_content("DeepSeek-R2 Open Weights Release")
    assert "DeepSeek-R2" in news_res["title"]
    assert len(news_res["shots"]) == 5
    assert news_res["shots"][0].purpose == "HOOK"
    assert news_res["shots"][-1].purpose == "CTA"
    assert news_res["epistemic_status"] == "CONFIRMED"

    # 2. AI Explained
    explained_res = AIExplainedEngine.generate_content("Transformers & Self-Attention")
    assert "Transformers" in explained_res["title"]
    assert "SPOTLIGHT" in explained_res["shots"][2].on_screen_text.upper() or "librarian" in explained_res["shots"][2].voiceover.lower()

    # 3. AI Tools
    tool_res = AIToolsEngine.generate_content("Local Coding Assistant")
    assert tool_res["tool_answers"]["verified_free_tier"] is True
    assert "TOOL" in tool_res["comment_keyword"]

    # 4. AI Normal People
    normal_res = AINormalPeopleEngine.generate_content("Resume & Job Application")
    assert "problem" in normal_res["shots"][0].shot_id.lower() or "hook" in normal_res["shots"][0].shot_id.lower()
    assert "TEMPLATE" in normal_res["comment_keyword"] or "RESUME" in normal_res["comment_keyword"]

    # 5. Future / AGI
    future_res = FutureEngine.generate_content("Autonomous Software 2028")
    assert future_res["epistemic_status"] == "PREDICTION"
    assert "AGI" in future_res["comment_keyword"]

    # 6. AI Memes
    meme_res = AIMemeEngine.generate_content("Agent CSS Margin Infinite Loop")
    assert len(meme_res["shots"]) >= 4
    assert "POV" in meme_res["hook"]

    # 7. AI Experiments
    exp_res = AIExperimentEngine.generate_content("GPT vs Claude vs Gemini")
    assert "experiment_design" in exp_res
    assert "TEST" in exp_res["comment_keyword"]

def test_prompt_compilers_and_anti_slop_quality():
    """
    Verify universal prompt compilers, Remotion code, and anti-AI-slop quality check.
    """
    pkg = CreatorOSService.create_everything(
        content_type="AI Tools",
        topic="Offline LLM Coding Agent",
        duration_sec=30,
        free_first=True
    )

    assert pkg.cost_tier == "FREE"
    assert len(pkg.flow_prompts) == 5
    assert "remotion render" in pkg.remotion_spec.render_command
    assert "SafeZoneOverlay" in pkg.remotion_spec.copyable_react_code
    assert pkg.anti_slop_passed is True
    assert pkg.social_package.comment_keyword == "TOOL"
    assert "dm_resource_deliverable" in pkg.social_package.model_dump()

def test_capability_registry_and_tool_routing():
    """
    Verify capabilities, tool statuses, and Free-First routing rules.
    """
    tools = CapabilityRegistry.get_all_capabilities()
    tool_ids = [t.tool_id for t in tools]
    assert "remotion" in tool_ids
    assert "google_flow" in tool_ids
    assert "gemini_pro" in tool_ids

    # Route technical explainer -> Remotion Free
    engine, tier, reason = ToolRouter.route_production("AI Explained", free_first=True)
    assert "REMOTION" in engine
    assert tier == "FREE"

    # Cost estimate for free-first
    cost = CostEstimator.estimate_generation_cost(engine, free_first=True)
    assert cost["is_zero_cost"] is True

@pytest.mark.asyncio
async def test_content_os_fastapi_endpoints():
    """
    Verify all /api/content/... endpoints.
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # 1. GET /api/content/today
        res_today = await ac.get("/api/content/today")
        assert res_today.status_code == 200
        today_data = res_today.json()
        assert len(today_data["recommendations"]) >= 3
        assert "🔥 POST THIS" in today_data["recommendations"][0]["badge"]

        # 2. GET /api/content/radar
        res_radar = await ac.get("/api/content/radar")
        assert res_radar.status_code == 200
        radar_data = res_radar.json()
        assert "breaking_now" in radar_data
        assert "rising" in radar_data

        # 3. POST /api/content/create
        res_create = await ac.post("/api/content/create", json={
            "content_type": "AI News",
            "topic": "Anthropic Claude Hybrid Reasoning Announcement",
            "duration_sec": 30,
            "free_first": True
        })
        assert res_create.status_code == 200
        pkg_data = res_create.json()
        assert pkg_data["content_type"] == "AI News"
        assert len(pkg_data["flow_prompts"]) > 0
        assert pkg_data["remotion_spec"]["fps"] == 30

        # 4. GET /api/content/capabilities
        res_caps = await ac.get("/api/content/capabilities")
        assert res_caps.status_code == 200
        assert len(res_caps.json()["tools"]) >= 5

        # 5. GET /api/content/calendar
        res_cal = await ac.get("/api/content/calendar")
        assert res_cal.status_code == 200
        assert len(res_cal.json()["schedule"]) >= 4

        # 6. GET /api/content/analytics
        res_ana = await ac.get("/api/content/analytics")
        assert res_ana.status_code == 200
        assert len(res_ana.json()["key_learnings"]) >= 2
