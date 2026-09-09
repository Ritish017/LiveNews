# AI VIRAL RADAR — NORTH STAR PRODUCT DEFINITION

**Status: canonical.** This document governs the product. Every feature, review, and
modification is measured against it. Where this document and any other doc, README,
or existing implementation disagree, **this document wins** and the other is the bug.

---

## 1. THE ONE-SENTENCE GOAL

Build an AI-powered Content Intelligence and Creative Production Operating System that
continuously understands what is happening across the internet, identifies the most
valuable content opportunities for the creator, determines exactly what should be created
and why, develops the strongest creative concept, produces production-ready
scripts/storyboards/prompts/assets, and learns from real-world performance to
continuously improve future content.

The product collapses this:

> "I need to search for ideas, research them, decide what to post, write the script,
> figure out visuals, figure out prompts, create the video, edit it, and analyze whether
> it worked."

into this:

> "Show me what matters, tell me what I should create, explain why, and give me
> everything I need to produce it."

---

## 2. WHAT THE PRODUCT ACTUALLY IS

AI Viral Radar is **not** primarily a news aggregator, a trend dashboard, an AI writing
tool, a prompt generator, a video prompt generator, a scheduler, a video editor, a
scraper, or a chatbot. Those are **components**.

The product is an **AI Content Operating System**. Its job is to continuously answer five
questions:

1. **WHAT IS HAPPENING?** — across AI, technology, research, products, companies,
   developers, communities, and the broader internet.
2. **WHAT MATTERS?** — which events are significant, breaking, accelerating, emerging
   before saturation, or likely to become major conversations.
3. **WHAT SHOULD I CREATE?** — given the event, momentum, audience, platform, creator
   identity, previous performance, competition, content gaps, originality, and timing.
4. **HOW SHOULD I CREATE IT?** — story, angle, hook, format, narrative, visuals, shots,
   pacing, platform, assets, model, production method, prompts.
5. **DID IT WORK?** — measure performance, identify what worked and what failed and why,
   update creator intelligence, improve future recommendations.

---

## 3. THE NORTH STAR LOOP

The entire application is designed around one loop:

```text
WORLD → DISCOVER → UNDERSTAND → DETECT → RANK → FIND OPPORTUNITY
      → DECIDE WHAT TO CREATE → DESIGN THE CONTENT
      → CREATE PRODUCTION SPECIFICATION → GENERATE / PUBLISH
      → MEASURE → LEARN → IMPROVE → back to WORLD
```

Every major feature must strengthen one stage of this loop. **If a feature does not
strengthen this loop, question whether it belongs in the product.**

---

## 4. THE PRODUCT THINKS BEFORE IT GENERATES

Forbidden behaviour:

```text
USER: "Make a video about AI."
AI:   "Here is a cinematic video prompt..."
```

Required behaviour:

```text
What is the actual story?
→ Who is this for?
→ Why should they care?
→ What is the most interesting angle?
→ What does the viewer need to understand?
→ What should they feel?
→ What should they see?
→ What is the best format?
→ What is the best visual representation?
→ What production engine is best?
→ Create the production specification.
```

The system behaves like a **creative director**, not a prompt autocomplete engine.

---

## 5. INTELLIGENCE LAYER

Primary focus: **AI** — frontier models, releases, research, benchmarks, agents,
multimodal, video/image generation, coding AI, robotics, infrastructure, chips,
inference, training, startups, funding, products, open source, developer tools.

The architecture must stay extensible to technology, business, science, gaming, finance,
the creator economy, and other verticals.

### 5.1 Event-first intelligence

Never treat every article as a separate trend.

```text
100 ARTICLES → SAME REAL-WORLD EVENT → ONE CANONICAL EVENT
             → MULTIPLE SOURCES → CONFIDENCE → MOMENTUM → TREND
```

The system answers *"what actually happened?"*, never *"what articles were published?"*

### 5.2 Real-time classification

Continuously determine which topics are: breaking, emerging, accelerating, exploding,
saturated, declining, dead.

Every event carries: timestamp, source, source confidence, event confidence, momentum,
velocity, acceleration, coverage, competition, saturation, novelty, audience relevance.

---

## 6. OPPORTUNITY ENGINE

The most important output is **not** "here are today's trends." It is
**"here is what you should create."**

For every major event compute a **Content Opportunity** from: freshness, momentum,
audience relevance, novelty, information value, competition, saturation, creator fit,
platform fit, timing, and historical performance.

Return an opportunity score — **and explain it. Never hide the reasoning behind a
number.**

---

## 7. CONTENT GAP INTELLIGENCE

For every important trend, separate *what everyone is talking about* from *what nobody is
explaining well*. Analyse angles across: breaking news, beginner explanation, technical
explanation, developer impact, business impact, practical application, contrarian,
myth-busting, comparison, tutorial, prediction, case study, data breakdown, story, future
implications.

Then surface **underserved angles**. This is one of the strongest differentiators of the
product.

---

## 8. CREATOR-SPECIFIC INTELLIGENCE

The same trend must produce **different** recommendations for different creators.

```text
WORLD EVENT → CREATOR PROFILE → PERSONALIZED OPPORTUNITY
```

not

```text
WORLD EVENT → GENERIC AI POST
```

The system learns: creator identity, expertise, voice, preferred platforms, preferred
formats, audience, historical performance, successful hooks, successful topics, failed
topics, preferred visual style, content frequency, risk tolerance.

---

## 9. CONTENT CREATION ENGINE

Build the **strategy** before writing the content: objective, audience, angle, format,
hook, story, information hierarchy, emotional arc, CTA, visual strategy, retention
strategy. Only then generate.

### 9.1 Platform-native creation

X ≠ LinkedIn ≠ Instagram ≠ YouTube. Do not rewrite the same content four times.

- **X** — single post, thread, reply, quote post, hot take, breaking, educational,
  prediction, data breakdown. Optimize for hook, information density, curiosity,
  conversation, specificity, credibility.
- **LinkedIn** — professional relevance, insight, business and technical implications,
  authority, discussion. Avoid corporate filler, generic motivation, artificial thought
  leadership.
- **Instagram** — Reel, carousel, single post, story. Optimize for first-second hook,
  visual storytelling, pacing, readability, shareability, saves.
- **YouTube** — title, thumbnail concept, cold open, hook, script, B-roll, graphics,
  chapters, CTA, description, pinned comment. Optimize for CTR, retention, open loops,
  payoff, information density, pattern interruption.

---

## 10. VIDEO IS NOT A PROMPT-GENERATION FEATURE

This is one of the most important product principles. The system never starts with
"write a cinematic prompt." It starts with **"what should the viewer see?"**

```text
CLAIM → VISUAL IDEA → VISUAL CONCEPT → STORYBOARD → SHOT → ENGINE → PROMPT
```

### 10.1 Visual concept engine

For every important claim, determine the strongest visual representation: real footage,
cinematic generation, macro product footage, animation, chart, diagram, UI, code,
geographic map, timeline, character dialogue, metaphor, simulation, split-screen,
comparison, before/after, physical visualization, typography, hybrid.

Ask *"what is the clearest and most compelling way to communicate this idea visually?"*
— never *"what looks cinematic?"*

### 10.2 Shot director

Every video becomes a real production plan. Each shot defines: purpose, duration,
narration, visual, subject, action, environment, composition, camera, movement, lighting,
sound, text, transition, continuity, model, assets, constraints.

### 10.3 Complexity control

Never ask a generative video model to perform impossible combinations.

```text
COMPLEX SHOT → ANALYZE → SPLIT → MICRO-SHOTS
```

Prioritize **reliable generation** over impressive-sounding prompts.

### 10.4 Model routing

Choose the best production method per shot, and **show the user why**:

| Need | Engine |
| --- | --- |
| Photorealistic environment | Gemini Omni / Veo |
| Exact benchmark chart | Remotion |
| Code diff | HyperFrames / Remotion |
| Narrative cinematic sequence | Omni / Veo |
| Cinematic footage + exact statistics | Hybrid |
| Technical UI | Remotion / HyperFrames |

### 10.5 Prompt compilation

Only after all creative decisions are made are prompts generated. Each engine gets its
own compiler: Gemini Omni (generation instructions), Veo (model-compatible cinematic
instructions), Remotion (coding-agent implementation spec), HyperFrames (deterministic
HTML/CSS/GSAP instructions), Hybrid (assembly plan combining footage with deterministic
graphics).

### 10.6 Prompts must be executable

A prompt must never merely *sound* intelligent. It answers: what, when, where, how, how
long, how it moves, what changes, what remains consistent, what must not happen, which
assets are required, which engine, and what the output should look like.

Prefer **operational specificity** over cinematic adjectives.

---

## 11. THE VIDEO QUALITY LOOP

```text
UPLOAD VIDEO → FORENSIC ANALYSIS → VISUAL ANALYSIS → STORY ANALYSIS
             → CONTINUITY ANALYSIS → PLATFORM ANALYSIS → HUMAN REVIEW
```

Then determine: **what went wrong?**

### 11.1 Quality must be empirical — keep the scores separate

Maintain **separate** scores: Prompt Readiness (how good was the instruction?),
Technical Output Quality (did the file work?), Visual Output Quality (does it look good?),
Story Quality (does it communicate the intended story?), Platform Quality (is it right for
the target platform?), Human Quality (would a creator actually publish it?).

**Never collapse these into one misleading number.**

### 11.2 Failure intelligence

Every failed video teaches the system something:

| Failure | Response |
| --- | --- |
| Character drift | Strengthen identity anchor |
| Too many simultaneous actions | Split shot |
| Text distorted | Move text to Remotion |
| Camera didn't move | Simplify action + explicit temporal vector |
| Visual doesn't match narration | Replace visual concept |
| Video feels generic | Increase concept novelty |
| Pacing too slow | Compress setup |
| Pacing too fast | Increase shot duration |

### 11.3 Prompt evolution

```text
V1 → GENERATE → ANALYZE → FAILURE → MUTATE → V2 → GENERATE → ANALYZE → V3
```

The objective is **measurable improvement**. Do not mutate prompts to make them longer.
Mutate only what the evidence indicates is failing.

---

## 12. LEARNING

### 12.1 Creative memory

Learn what works for: topics, audiences, platforms, hooks, formats, visual concepts, shot
structures, models, prompt patterns, pacing, storytelling, thumbnails, CTAs. Eventually
the system can say *"this type of content has historically performed well for you"* and
*"this visual style repeatedly produced weak results."*

### 12.2 Performance learning

After publishing, ingest impressions, views, likes, comments, shares, saves, watch time,
completion rate, CTR, follower growth, engagement rate. Then connect the chain:

```text
EVENT → OPPORTUNITY → CONTENT → VIDEO → PUBLISH → PERFORMANCE
```

This creates a causal-ish learning history. **Avoid claiming causality where the data
cannot prove it.**

---

## 13. THE DAILY EXPERIENCE

Do not overwhelm the user with hundreds of cards. On open, answer: what changed, what
matters, what is accelerating, what is under-covered, what should you create, what should
you ignore, what should you publish now. The system is an **intelligence filter**.

### 13.1 "WHAT SHOULD I POST TODAY?" — a first-class capability

One click. The system considers current events, trend momentum, content gaps, audience,
creator voice, historical performance, platform, available time, and previous posts, then
returns: the #1 recommendation, **why** it is the best opportunity, the angle, the format,
the hook, the production plan, and a ready-to-use production prompt.

### 13.2 "CREATE EVERYTHING" — one action per opportunity

A selected opportunity has one primary action that generates the complete package:

- **Strategy** — objective, audience, angle, opportunity reasoning
- **Copy** — X, LinkedIn, Instagram, YouTube
- **Video** — concept, script, storyboard, shots, model routing, prompts
- **Visuals** — thumbnail, carousel, graphics
- **Publishing** — caption, description, hashtags where appropriate, CTA, pinned comment

Everything remains editable.

---

## 14. TRUTH, SOURCES, AND ORIGINALITY

Never sacrifice truth for speed. For every factual event, preserve source, timestamp,
confidence, and attribution. Keep these **separated at all times**:

```text
FACT | INTERPRETATION | PREDICTION | GENERATIVE VISUALIZATION
```

The product must not become "AI article → AI rewrite." It creates original value through
new angles, synthesis, explanation, analysis, comparison, visualization, personal
expertise, and useful interpretation. The goal is **original content from real
information**.

---

## 15. FRICTION AND FOCUS

Measure success by **time from event detection to publishable content**. Progressively
reduce research, ideation, scripting, visual planning, prompt-writing, production
planning, and analysis time — without sacrificing quality.

Do not add features because they are possible. A smaller system that produces excellent
recommendations and excellent production specifications beats a huge dashboard that
produces mediocre content. Priority order:

1. Intelligence quality
2. Opportunity quality
3. Creative quality
4. Production quality
5. Learning quality
6. UX simplicity

---

## 16. THE CENTRAL INTELLIGENCE QUESTION

Every pipeline effectively asks:

> "If I were the creator, what is the highest-value piece of content I could create right
> now, for this audience, on this platform, given what is happening in the world and what
> I have historically learned?"

### 16.1 The shape of the output

Never merely "here are some trends." Always:

```text
THIS IS HAPPENING. → THIS IS WHY IT MATTERS. → THIS IS WHAT PEOPLE ARE MISSING.
→ THIS IS YOUR OPPORTUNITY. → THIS IS THE BEST ANGLE. → THIS IS THE BEST FORMAT.
→ THIS IS THE STORY. → THIS IS WHAT THE VIEWER SHOULD SEE.
→ THIS IS HOW TO PRODUCE IT. → HERE ARE THE EXACT PROMPTS.
→ HERE IS HOW WE WILL KNOW IF IT WORKED.
```

---

## 17. SUCCESS METRICS

- **Intelligence** — detection latency, event confidence, trend prediction accuracy,
  opportunity precision
- **Creativity** — originality, visual novelty, content gap quality, hook quality
- **Production** — prompt executability, generation success, revision count, video quality
- **Creator** — time saved, satisfaction, publish rate, content throughput
- **Performance** — engagement, retention, CTR, shares, saves, follower conversion
- **Learning** — improvement after revisions, improvement across posts, successful
  heuristic discovery

### 17.1 THE NORTH STAR METRIC

**TIME TO HIGH-QUALITY PUBLISHABLE CONTENT**, measured across the full funnel:

```text
EVENT OCCURS → EVENT DETECTED → OPPORTUNITY IDENTIFIED → CONTENT CREATED
             → VIDEO PRODUCED → QUALITY APPROVED → PUBLISHED
```

The application continuously reduces this time **without sacrificing quality**.

---

## 18. WHAT IT SHOULD FEEL LIKE

Like having a research analyst, trend analyst, strategist, social media strategist,
creative director, scriptwriter, storyboard artist, video director, prompt engineer,
content editor, and performance analyst working together — behind a simple interface.
**The complexity belongs inside the system.**

Ideally the user only: (1) chooses an opportunity, (2) chooses a platform, (3) reviews
creative direction, (4) approves, (5) generates/produces, (6) uploads or publishes,
(7) reviews performance. Everything else is automated or intelligently assisted.

---

## 19. FINAL PRODUCT DEFINITION

> AI Viral Radar is a continuously learning AI Content Intelligence and Creative
> Production OS that discovers what matters, identifies where the creator has an
> opportunity, determines what should be created, designs the strongest story and visual
> concept, compiles production-ready instructions for the appropriate creative engine,
> evaluates the resulting content, and learns from real-world outcomes to make the next
> piece better.

---

## 20. NON-NEGOTIABLE PRINCIPLES

1. Do not confuse **information** with **intelligence**.
2. Do not confuse **prompts** with **videos**.
3. Do not confuse **prompt quality** with **output quality**.
4. Do not confuse **trends** with **opportunities**.
5. Do not confuse **generic content** with **original content**.
6. Do not optimize for **feature count**.
7. Do not optimize for **impressive-looking dashboards**.
8. Optimize for **creator outcomes**.
9. Use **evidence** rather than assumptions.
10. The system **must continuously learn**.

---

## 21. THE SEVEN-QUESTION GATE

When implementing, reviewing, or modifying any feature, ask:

1. Does this help the system understand **what is happening**?
2. Does this help identify **what matters**?
3. Does this help determine **what the creator should create**?
4. Does this improve the **creative decision**?
5. Does this improve **production quality**?
6. Does this reduce **time to publishable content**?
7. Does this help the system **learn from outcomes**?

**If the answer to all seven is NO, do not build the feature merely because it is
technically interesting.**

---

## FINAL NORTH STAR

The application exists to answer one question better than anything else:

> "Given everything happening in the world right now, what is the best content I can
> create next — and can you take me from that opportunity all the way to a high-quality,
> publishable piece?"

Everything in AI Viral Radar serves that question.
