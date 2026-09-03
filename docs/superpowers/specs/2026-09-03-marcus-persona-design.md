# Design spec — Marcus, the living learner persona

**Date:** 2026-09-03
**Status:** Approved design, ready to build
**Source research:** [docs/research/2026-09-03-edovo-learner-interview.md](../../research/2026-09-03-edovo-learner-interview.md)

## Goal

Turn a real Edovo-learner interview into the portfolio's centerpiece: a composite learner
persona ("Marcus") that proves Jackie designs from real primary research, and demonstrates a
repeatable method. The persona both *validates* the case-study audit fixes and *drives* a
refinement — the empathy hook and the rigor signal in one.

## Transparency framing (non-negotiable)

Everywhere the persona appears, it is labeled as **"based on real interviews with Edovo
users."** Plural, generic, de-identified. No name, no identifying case detail of the real
interviewee. The honesty about the *method* is the flex; the real person's privacy is protected.
Any AI-generated element is labeled AI-simulated.

## The persona (composite — all details adjustable with Jackie)

- **Name:** Marcus (pseudonym)
- **Profile:** ~50 years old; ~27 years incarcerated; a Texas unit — **tablet only, no laptop**;
  holds a prison job; **recently denied parole**; attempting **cryptocurrency** and **finance**
  courses — domains with no real-world anchor for him after decades inside.
- **Core tension:** motivated to build a post-release future, but the parole denial planted a
  *"does any of this even matter?"* block. Starts many courses, finishes few.
- **Grounding facts** (from the interview) map 1:1 to real friction points — see research doc.

## The persona page (`/persona` or `/learner`, exact route TBD in plan)

Three parts, top to bottom (inverted pyramid: hook → story → method):

1. **The Blueprint** — snapshot (profile card), goals, the discouragement arc, real context
   (noise / no desk / tablet-only), and a **friction map**: each pain point → the design demand
   it creates. In his voice, with pull-quotes.

2. **The simulated session** — the animated centerpiece. A **self-typing chat** replays a scripted
   exchange between Jackie and Marcus in which he hits the walls concretely (fails a quiz → forced
   full-video rewatch, no pause/notes → no hands-on to make crypto real → disengages). Clearly
   labeled *simulated, grounded in real interviews.*

3. **The refinement it drove** — the payoff. The persona surfaced specific failures; here is what
   changed in the designs (e.g. pause/rewind + note-anchoring, a hands-on/sandbox beat for
   cold-start topics, an in-context on-screen calculator, tablet-first layout). Links out to the
   case studies where each change lives.

## The animated chat (the "simulated session" component)

- **Technique:** a real HTML/CSS/JS chat UI where messages **type themselves out** in sequence —
  NOT a GIF/video (crisp at any size, theme-aware, editable, tiny, screen-reader accessible).
- **Trigger:** plays when it **scrolls into view**; a **"▶ replay"** button re-runs it. (No
  hover-only trigger — hover fails on touch devices.)
- **Content:** a fixed, hand-authored script (real content written from the interview). Reduced-
  motion users get the full transcript shown statically (respect `prefers-reduced-motion`).
- **Accessibility:** messages are real text (selectable, readable by screen readers); the replay
  control is keyboard-operable; an accessible fallback shows the whole exchange without animation.
- **Reuse:** the same component, with a shorter script, is embedded as the woven-in beat in the
  case studies.

## Weave-in

At the exact decision moment, **Content Review** and **Digital Literacy** each link
*"This came from a real learner →"* into the persona page (and/or embed the short animated beat).
- Content Review: persona *validates* the audit fixes from the learner's mouth.
- Digital Literacy: persona *hits a wall* → drives a named refinement.

## Out of scope (documented future upgrade — NOT this build)

- **Live interactive chat** (real Claude API, per-message, account + key, rate-limiting). The
  simulated version is a clean stepping stone: same UI, the script becomes the "example," the
  written Marcus becomes the live fuel. Requires an Anthropic account with billing, which only
  Jackie can set up. Revisit later if desired.

## Build order

1. **Write Marcus** — blueprint content + the scripted exchange, in his voice. Jackie reviews and
   corrects until he sounds like a real person. *(The human core; everything depends on it.)*
2. **Build the page + the self-typing chat component** on the shared `.ds-*` system.
3. **Weave into** Content Review + Digital Literacy.

## Design-Decision Test check

1. *Solves a specific problem* — proves primary-research-driven design; gives recruiters a concrete
   learner instead of abstractions. ✅
2. *Serves the learner + the approach* — every persona detail is a real friction point that shaped a
   real design decision. ✅
3. *Data-driven* — grounded in an actual interview, transparently labeled. ✅
4. *Respects the learner's real-time perspective* — the whole artifact IS the learner's perspective. ✅
