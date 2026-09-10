# Enterprise L&D Rebrand — Master Phasing

> Source spec: 5 docs on Desktop, "JackieMiller.co Master Roadmap Step 1–5
> (Updated for AI Acceleration & Enterprise Safety)". This file maps that
> spec onto the actual repo and breaks it into independently-shippable
> phases. Each phase gets (or will get) its own detailed plan under this
> directory, following `superpowers:writing-plans`.

## Why phased

The spec's Step 4 (live persona sandbox with an LLM backend) and Step 5
(external services: Tally.so, Cal.com, Substack/Beehiiv, LinkedIn launch)
are independent subsystems with different risk profiles — one needs a
server-side API key and rate-limiting, the other needs Jacklyn to create
accounts and hand back embed URLs before any code can be written. Bundling
everything into one plan would hide that. Per the writing-plans "Scope
Check," each phase below produces working, shippable software on its own.

## Phase map

| Phase | Scope | Depends on external accounts/secrets? | Status |
|---|---|---|---|
| 1 | `/` hero, trust badges, L&D Dilemma module, 4 Operating Pillars, Governance Accordion; `/systems` route (ADDIE pipeline copy, prompt vault w/ copy-to-clipboard) | No | Plan written: `2026-09-09-phase1-homepage-systems.md` |
| 2 | `/work`: 5-Tier Case Study template + 3 flagship case studies + Security Footnote disclosure | No | Not started — open decision below |
| 3 | `/contact` dual-track router; interactive Velocity Pipeline Visualizer (click-to-expand); before/after slider | No | Not started |
| 4 | Live "Marcus" persona simulation sandbox (chat + Inspector Panel) | **Yes** — Anthropic/OpenAI API key, stateless proxy route, rate limiting, corporate-firewall fallback | Not started — needs its own plan given the security surface |
| 5 | Governance Charter artifact, dual-track funnel embeds (Cal.com/Tally), editorial (Substack/Beehiiv) tie-in, LinkedIn launch copy | **Partially** — most of this is Jacklyn creating accounts and handing back URLs/keys; code surface is small | Not started — mostly blocked on Jacklyn's action, not code |

## Two decisions needed before Phase 2

1. **Fate of the two real, existing case studies** (*Digital Literacy
   Fundamentals*, *Discovering Your Narrative Voice* — real work for
   justice-involved/reentry learners). The new spec's homepage/`/work`
   only shows the 3 new flagship studies. Default plan: keep both live at
   their current URLs (never delete real shipped work without being
   asked), just drop them from the primary `/work` grid and homepage
   "Featured Case Studies" — or keep them under a secondary section.
   **Needs Jacklyn's confirmation before Phase 2 starts.**

2. **Governance Charter PDF** (Step 5 asks for a downloadable
   `jackie-miller-enterprise-ai-charter.pdf`). Rather than adding a
   PDF-generation dependency, default plan: build it as a normal web page
   with `@media print` styling, so "Save as PDF" works natively in any
   browser — no new library, no build step. Flag if a real designed PDF
   (Figma/Canva export) is wanted instead.

## Fabrication/disclosure guardrail (already handled by the spec, tracked here so it isn't dropped in execution)

The spec itself requires, and every phase must preserve:
- Every case study carries a **Security Footnote**: *"All proprietary
  data and SME transcripts shown have been fully anonymized, synthesized,
  or demonstrated within sandboxed non-public environments."*
- Every interactive artifact carries the **Demonstration Artifact**
  watermark verbatim from the spec: *"Demonstration Artifact: All
  organizational data, transcripts, and persona dialogue synthesized for
  portfolio demonstration in compliance with enterprise NDAs."*

Neither disclosure is optional styling — drop it from a task and stop and
flag it rather than shipping without it.
