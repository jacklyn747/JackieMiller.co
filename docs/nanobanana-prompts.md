# NanoBanana Prompt Pack — The Dreamscape Desk Scene

*Companion to [brief-dreamscape-homepage.md](brief-dreamscape-homepage.md). Jacklyn runs these in Gemini (NanoBanana); we iterate on the outputs together in-session before any component code is written.*

## How to run this (the one rule that matters)

**Generate the day master ONCE, then create every other image by EDITING that image** — upload the day master back into Gemini and ask for the change ("same scene, night lighting", "same scene, journal open"). NanoBanana is strong at consistent edits; fresh generations will drift the composition, and the hotspot coordinates in code are shared across all variants. If a variant drifts (objects move), reject it and re-edit from the master.

Practical settings: landscape, widest/highest resolution offered (we'll serve ~2400px wide). Ask for one image at a time and iterate.

## Prompt 1 — The Day Master (everything derives from this)

> Cinematic overhead flat-lay photograph of a writer's desk, shot straight down, 4k, photorealistic. On a rich walnut desk: a beautiful cognac-brown leather journal, closed, slightly left of center — pebbled leather, an elastic cord wrap with a small brass charm, cream paper edges visible, a leather bookmark loop holding a fountain pen. Right of the journal: two cream envelopes sealed with deep-red wax seals, and a kraft-paper folder with a hand-written label. Upper right: a small vintage photo print held by a brass paper clip, next to a leather luggage-tag charm on a cord. Lower right: a stamped vintage postcard. Scattered intentional details: a faint coffee ring stain, a few custom stickers and paper clips, washi tape, a small brass lamp at the top edge (off). Lighting: soft warm daylight from a window off-frame left, gentle shadows, warm paper tones. Mood: quirky but expensive — a luxury stationery brand, tactile, hand-crafted, personal. No people, no hands, no text longer than a scribble.

**Composition requirements (check every render against these):**
- True overhead (90°) — perspective distortion breaks hotspot mapping.
- The four portal objects (journal, envelopes/folder, photo+tag, pen/postcard) each clearly separated with breathing room — they become click targets ≥24 px even on mobile.
- Portal objects clustered in the central ~60% of frame, texture-only details toward the edges — so a portrait crop for mobile keeps every portal.
- Lamp physically in frame at top edge — it's the night variant's light source and the day/night toggle's visual anchor.

## Prompt 2 — Night (edit of the day master)

> Keep this exact scene and composition, every object in the same position. Change only the lighting: it is now night — the brass lamp is on and is the only light source, casting a warm pool of light over the journal, deeper soft shadows toward the edges, cooler dark tones outside the lamp's glow, cozy and intimate.

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
