# NanoBanana Prompt Pack — The Dreamscape Desk Scene

*Companion to [brief-dreamscape-homepage.md](brief-dreamscape-homepage.md). Jacklyn runs these in Gemini (NanoBanana); we iterate on the outputs together in-session before any component code is written.*

## VIBE LOCK — 2026-07-17 (supersedes the original material palette below)

Jacklyn's mood boards landed: **dark glam maximalism**, not crafty stationery. Oxblood, black, leopard and tortoiseshell, croc-embossed leather, brass/gold, candle- and lamp-light. Vintage Playboy-era luxury — sultry, expensive, personal. The desk flat-lay composition and the four portals are unchanged; every material and the lighting mood are re-specified in the prompts below (originals overwritten).

**Palette (from the boards — these become the site theme tokens):**

| Token | Value | Source |
|---|---|---|
| Oxblood (primary) | `#4E0000` | Pantone 4975C "Red Inferno" board |
| Deep green (secondary dark) | `#001D00` | "Very Deep Green" board |
| Black | `#030303` | Pantone Black C "Armor Wash" board |
| Classic white / warm cream | board "9918 Classic White" | paper, type on dark |
| Brass/gold | accent, from hardware & lamps | boards 2–3 |
| Leopard / tortoise / zebra / croc | texture, never flat color | all boards |

Continuity note: the site's existing `--ox` / `--ox-accent` dark-mode tokens were already oxblood — the boards confirm and sharpen that instinct; align tokens to `#4E0000` when theming begins.

## How to run this (the one rule that matters)

**Generate the day master ONCE, then create every other image by EDITING that image** — upload the day master back into Gemini and ask for the change ("same scene, night lighting", "same scene, journal open"). NanoBanana is strong at consistent edits; fresh generations will drift the composition, and the hotspot coordinates in code are shared across all variants. If a variant drifts (objects move), reject it and re-edit from the master.

Practical settings: landscape, widest/highest resolution offered (we'll serve ~2400px wide). Ask for one image at a time and iterate.

## Prompt 1 — The Day Master (everything derives from this)

> Cinematic overhead flat-lay photograph of a writer's desk, shot straight down, 4k, photorealistic, editorial magazine style. The desk is glossy near-black wood; a leopard-print silk scarf drapes in from one corner under the objects. Slightly left of center: a stunning oxblood crocodile-embossed leather journal, closed, deep red-black sheen, brass corner caps, a black elastic cord wrap with a small gold charm, cream paper edges visible, a gold-and-black fountain pen held in its leather loop. Right of the journal: two cream envelopes sealed with deep-red wax seals, and a black folder with a hand-written gold-ink label. Upper right: a small vintage black-and-white photo print held by a brass paper clip, next to a tortoiseshell luggage-tag charm on a black cord. Lower right: a stamped vintage postcard and a cut-crystal rocks glass with a finger of amber whiskey. Scattered intentional details: gold jewelry, a red lipstick, brass paper clips, a faint ring stain from the glass, a small brass lamp with a black shade at the top edge (off). Lighting: warm directional daylight from off-frame left, rich deep shadows — moody even in daylight, dark tones dominate. Mood: dark glam maximalism — oxblood, black, leopard, brass; vintage Playboy-era luxury, sultry, expensive, personal. No people, no hands, no readable text longer than a scribble.

**Composition requirements (check every render against these):**
- True overhead (90°) — perspective distortion breaks hotspot mapping.
- The four portal objects (journal, envelopes/folder, photo+tag, pen/postcard) each clearly separated with breathing room — they become click targets ≥24 px even on mobile.
- Portal objects clustered in the central ~60% of frame, texture-only details toward the edges — so a portrait crop for mobile keeps every portal.
- Lamp physically in frame at top edge — it's the night variant's light source and the day/night toggle's visual anchor.

## Prompt 2 — Night (edit of the day master)

> Keep this exact scene and composition, every object in the same position. Change only the lighting: it is now night — the brass lamp is on and is the main light source, casting a warm candlelit-feeling pool of light over the oxblood journal, the whiskey glass glowing amber where it catches the light, deep velvety shadows toward the edges, near-black outside the lamp's glow. Sultry, intimate, late-night.

## Prompts 3–6 — Hover/portal variants (each an edit of the matching master, day and night)

1. **Journal opening** (→ Field Notes): "Same scene, same positions: the leather journal is now open to a cream page with faint hand-written ink lines, the elastic cord laid beside it."
2. **Envelope seal broken** (→ Work): "Same scene: the front envelope's wax seal is now broken in half, flap slightly lifted."
3. **Photo lifted** (→ About): "Same scene: the vintage photo is raised slightly as if being picked up, casting a small shadow, paper clip loosened."
4. **Pen uncapped** (→ Contact): "Same scene: the fountain pen is uncapped, cap beside it, nib catching the light, resting on the postcard."

(If per-object edit renders get expensive or drifty, plan B is CSS-only hover treatment — lift/glow/label — on the two masters. Decide after seeing how 1–2 variants come out.)

## Iteration protocol

1. Jacklyn generates Prompt 1, drops renders in-session.
2. We judge against the composition requirements + vibe ("luxury Paper Republic" — reject anything that reads generic-stock or cluttered-cheap).
3. Adjust wording, regenerate until the day master is *right*. Only then run Prompt 2 as an edit, then variants.
4. Approved finals go in `public/scene/` as `desk-day.webp`, `desk-night.webp`, `desk-day-journal-open.webp`, etc. Keep the winning prompts recorded here verbatim for future regeneration.

## Status

- [ ] Day master approved
- [ ] Night edit approved
- [ ] Variants approved (or plan-B CSS hover chosen)
