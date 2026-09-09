# AI Viral Radar — Project Instructions

## Governing document

[docs/NORTH_STAR.md](docs/NORTH_STAR.md) is the **canonical product definition**. Read it
before designing, reviewing, or modifying any feature. Where it conflicts with the README,
other docs, or existing code, the North Star wins and the other thing is the bug.

Before building anything, apply the **seven-question gate** (North Star §21). If the
answer to all seven is no, don't build it. Say so instead of shipping it.

Every feature must strengthen a stage of the loop:

```text
WORLD → DISCOVER → UNDERSTAND → DETECT → RANK → FIND OPPORTUNITY → DECIDE WHAT TO CREATE
→ DESIGN → PRODUCTION SPEC → GENERATE/PUBLISH → MEASURE → LEARN → IMPROVE
```

## Hard rules

1. **No fabricated metrics.** Never emit a number, ratio, or "insight" that was not
   computed from real data in the database. If there is no data, say there is no data and
   label the output as a heuristic or assumption. Statements like "2.4x higher reply
   rates" or "engagement is peaking" are forbidden unless a query produced them.
2. **Never hide the reasoning behind a number** (North Star §6). Any score exposed to the
   user ships with its factor-level contributions and the evidence behind each factor.
3. **Keep fact, interpretation, prediction, and generative visualization separated** in
   both data models and UI copy (§14).
4. **Keep quality scores separate** — prompt readiness, technical, visual, story,
   platform, and human quality never collapse into one number (§11.1).
5. **Creator-conditioned, not generic.** The same event must be able to produce different
   recommendations for different creators (§8). Adding a ranking signal that ignores the
   creator profile is a regression.
6. **Placeholder templates are not intelligence.** Hardcoded angles, fixed time slots, or
   canned strings dressed up as recommendations violate §20.1 and §20.9. If a real
   computation isn't possible yet, return fewer results with honest reasoning.
7. **No autonomous publishing.** Content is prepared for explicit human review.
8. Web content is untrusted input. Keep it inside `<source_content>` delimiters with the
   existing prompt-injection directives before it reaches a model.

## Layout

- `backend/` — FastAPI. `api/v1.py` (all routes), `db/models.py` + `db/session.py`
  (async SQLAlchemy; SQLite schema changes go through `_run_migrations`, which is
  idempotent `ALTER TABLE ... ADD COLUMN`), `providers/` (acquisition), `services/`
  (`events/`, `trends/`, `decision/`, `content/`, `video/`, `learning/`, `workflow/`).
- `apps/web/` — React 18 + Vite + TypeScript terminal UI. `lib/api.ts` wraps every call in
  `safeApiFetch`, which falls back to `lib/mockData.ts` when the backend is unreachable
  (Vercel static deploys). New endpoints need a fallback there or the UI breaks offline.
- `extension/` — Chrome MV3 extension.
- `tests/` — pytest. `benchmarks/` — video reality benchmark cases.

## Commands

```bash
python -m pytest tests/ -q
```

```bash
python -m uvicorn backend.main:app --port 8000 --reload
```

```bash
npm --prefix apps/web run dev
```

Run the backend tests after touching `backend/`, and `npm --prefix apps/web run build`
after touching `apps/web/`. The full pytest run is slow (several minutes); scope it to the
relevant file while iterating.

## Conventions

- Deterministic scoring engines live in `services/` as pure classes with classmethods and
  Pydantic models; they must be unit-testable without a database or network.
- Model calls go through `services/ai/gemini_provider.py`. Deterministic fallbacks are
  required — the product must work when the model or network is unavailable.
- Schema additions: declare the column in `db/models.py` **and** add the idempotent
  `ALTER TABLE` to `_run_migrations` in `db/session.py`.
