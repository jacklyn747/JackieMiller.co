# Design spec — Completing JackieMiller.co to Awwwards caliber

**Date:** 2026-09-20
**Status:** Design approved by Jacklyn; implementation not yet started
**Branch:** `feature/lxd-portfolio-core`
**Governing reference:** [docs/awwwards-sotd-playbook.md](../../awwwards-sotd-playbook.md)
**Supersedes as design direction (not as merge source):** the paused `awwwards-overhaul` branch (commit `3a2b8c2`) — its ideas are mined below; its code is not ported.

## Goal

Bring the whole site up to the standard of craft described in `docs/awwwards-sotd-playbook.md` — Design, Usability, Creativity, and Content as first-class, judged-equally axes — without an actual Awwwards submission being the target. Quality bar only.

This design covers the full site. It is intentionally decomposed into phases (see §6); each phase gets its own implementation plan via `writing-plans`, following this repo's existing SDD phase-ledger convention (see `.superpowers/sdd/progress.md` for the pattern from the earlier enterprise-L&D exploration).

## Context this design was built against

- Current positioning (settled earlier this session): the correctional/justice-involved-learner case studies stay as the proof; the site's headline frame is cognitive load theory + AI-accelerated prototyping. Already partially built on this branch (homepage hero, Featured Prototypes, Field Notes teaser, About interview surfacing the cognitive-load line).
- The repo has been through three prior positioning pivots (dreamscape — archived; enterprise L&D rebuild — abandoned on `feature/enterprise-ld-rebrand`, never merged; the `awwwards-overhaul` visual system — paused, never resumed, now stale against `main`). None of that code is reused directly; only design ideas from `awwwards-overhaul` are carried forward (§2), and its self-reported "95/100 Awwwards score" / "96/100 audit score" claims in `AWWWARDS-AUDIT.md` are explicitly **not** treated as validated — they're self-graded, unverified numbers.
- Current motion system (`ScrollAnimations.tsx`) is a single generic fade-up-on-scroll effect. No signature motif exists today — this is the gap the playbook calls out in §3.5 and §5.

## 1. Creative concept statement

*"Every element on this site either shows you the friction of bad learning design or resolves it — the way she designs, made visible in how the page itself behaves."*

This is the one governing idea every later decision (motif, type, grid, copy) gets checked against, per playbook §1.5.

## 2. Signature motif — the Friction Cursor

The playbook (§3.5) requires one recurring, identifiable interactive device. This one is not decorative: it dramatizes the "friction audit" method already described in the site's own copy (`/approach`: *"a friction audit — every barrier that stops a specific learner... Diagnose the friction, then build the fix"*).

**Scope:** site-wide, not limited to case studies.

**Content model:** authors mark spans/blocks with `data-friction` (jargon, constraints, unresolved problems, dense unchunked text) or `data-resolved` (the fix, the outcome, a clean CTA, well-chunked content). Untagged content is neutral — the motif never applies to everything indiscriminately.

**Desktop behavior (`(pointer: fine)`):**
- Custom cursor renders as scattered/trailing dots when hovering over or near `data-friction` content.
- Collapses to a single clean dot over `data-resolved` content.
- Default/neutral cursor everywhere untagged.

**Mobile/touch behavior:** no literal cursor exists on touch. Same tags instead drive a static-to-resolved visual echo: `data-friction` content renders slightly muted/denser by default, and visibly crisps up (small transition, not a cursor) on tap or on scrolling fully into view. Same design language, different mechanism.

**Accessibility guardrails (non-negotiable — ties to AUTHORITIES.md's WCAG 2.2 AA commitment):**
- Respects `prefers-reduced-motion`: motion disables; the friction/resolved distinction falls back to a static styling difference only (never disappears entirely).
- Never hides or replaces the real keyboard focus indicator (2.4.7).
- The distinction is never conveyed by hover/cursor state *alone* — every `data-friction`/`data-resolved` element also carries a static visual tell (e.g., a subtle border/weight/color difference), so the information isn't locked behind a mouse-only interaction (this is what makes the mobile echo a true equivalent, not an afterthought).
- `cursor: none` (native cursor suppression) only applies when JS confirms `(pointer: fine)` — never suppresses the native cursor for touch, stylus, or keyboard-only navigation.

**Why this motif over the alternatives considered:** a "Dark Immersion" light-to-dark scroll transition (thematically tied to "both sides of the locked door") and an "everything is a working prototype" device-frame treatment were both considered. The Friction Cursor was chosen because it dramatizes the *design philosophy* itself rather than a single narrative beat or the AI-build differentiator alone — and it's reusable everywhere, including pages (About, Contact) the other two candidates didn't naturally extend to.

## 3. Visual system

**Typography:** display headers scale up to `clamp(60px, 10vw, 140px)` (from today's `clamp(40px, 5.6vw, 76px)`) at hero/section-break moments only. Instrument Serif stays the display face; Archivo tightens to 9–11px with heavy tracking (0.2–0.28em) for metadata/labels — both fonts already in use today, no new typefaces.

**Grid:** an 11-column asymmetrical layout (`repeat(7, 1fr) minmax(40px, 80px) repeat(3, 1fr)`) applied to hero-type sections specifically — homepage hero, `/work` index hero, each case-study hero. Collapses to 8-column tablet, single-column mobile. This mirrors the pattern from the paused `awwwards-overhaul` branch, reimplemented fresh against current markup rather than ported.

**Scope discipline:** body copy, cards, forms, and the rest of the `.ds-*` design system (AGENTS.md's "one grammar" rule) are untouched — only hero/section-break moments get the louder treatment. This is deliberate: the Friction Cursor is the interaction signature; if type/grid also went maximal everywhere, the two would compete for attention. They're kept in separate zones — type/grid loud at structural moments with no dense body copy, cursor reactive within body/case-study copy where the tags actually live.

## 4. Content

The open item in `docs/fixes-backlog.md` — bare framework acronyms (ADDIE, SAM, Kirkpatrick, UDL, Merrill's First Principles) with no plain-language framing — becomes a real requirement of this work, not a someday-fix. Every framework chip touched by the new visual system (Approach page's "Grounded In" groups, each case study's `GroundedIn` tag list) gets adjacent plain-language framing so a lay reader (a generalist recruiter, a journalist, family) loses nothing essential.

## 5. Explicitly out of scope

- New photography/video production (playbook §7.1) — working within existing assets.
- Actual Awwwards submission logistics (playbook §9–10) — quality bar only, per Jacklyn's call.
- Reviving or merging any code from `awwwards-overhaul` or `feature/enterprise-ld-rebrand` — ideas only, as noted above.

## 6. Phase roadmap

Each phase gets its own `writing-plans` implementation plan and SDD progress ledger entry, following this repo's existing convention. Phases are sequential; each is verified (build + manual browser check, per this branch's established practice) before the next starts.

- **Phase A — Visual system + Friction Cursor foundation.** Build the cursor component (desktop + mobile-echo fallback), the `data-friction`/`data-resolved` tagging convention, and the type/grid system. Apply to the homepage (already-drafted hero/prototypes/Field-Notes sections from this session get the new treatment).
- **Phase B — `/work` index + both case studies.** Rebuild Digital Literacy Fundamentals and Discovering Your Narrative Voice on the new grid/type/motif; fold in the jargon plain-language pass (§4) since both case studies carry `GroundedIn` framework tags.
- **Phase C — Remaining pages.** About (MeetJackie), Approach, Persona (Marcus), Contact brought onto the new system; Approach's own "Grounded In" framework groups get the plain-language pass.
- **Phase D — Field Notes + details pass.** Field Notes list/detail pages onto the new system; custom 404 (one already exists — audit and upgrade if needed), favicon, OG/social preview cards, loading states (playbook §8.4).
- **Phase E — QA.** Cross-browser/cross-device testing (not just the primary path), a real Core Web Vitals audit against the thresholds already pinned in AUTHORITIES.md, a full WCAG 2.2 AA pass specifically re-verifying the Friction Cursor's accessibility guardrails (§2), fresh proofread of all copy.

## 7. Open questions / risks flagged for Jacklyn (not blocking, but worth knowing)

- The Friction Cursor's content-tagging is real editorial work across every page — Phase B and C both carry a non-trivial "decide what's friction vs. resolved, per section" task, not just styling.
- No new photography means the extreme editorial grid/type has to carry more of the "distinctive" weight on pages that are currently text-heavy with sparse imagery (e.g., Approach, Contact).
- `awwwards-overhaul`'s self-reported audit scores are not to be cited or trusted as evidence this direction already "works" — Phase E's QA is the only source of truth on whether this build actually hits performance/accessibility targets.
