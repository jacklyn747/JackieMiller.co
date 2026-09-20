# Creative Brief — The Dreamscape Homepage
*Captured 2026-07-15 from Jacklyn's direction + interview. This is the governing vision doc for the rebuild.*

> ## SCOPE CHANGE — 2026-07-15 (Jacklyn's decision): FULL GROUND-UP REBUILD
> This is no longer a homepage patch — it is a **complete rebuild of JackieMiller.co from scratch**, as the immersive dreamscape described below.
>
> **Why nothing is worth saving:** the current homepage is broken for real visitors (a white client-side crash — "there's a problem"), and even the old cover relied on a fragile scroll-reveal pattern that hides ALL content when the JavaScript hiccups. Do not debug it. Do not port it. Start clean.
>
> **The only thing to carry forward:** the Field Notes content — the published posts in `content/field-notes/`. Everything else (the Cover component, the placeholder sections 00–05, the GSAP scroll-reveal) is discarded.
>
> **Build under the operating-layer rules** (this is a Tier-2 project):
> 1. Run `authority-setup` first — declare the standards that govern it (WCAG 2.2 AA, mobile breakpoints, Core Web Vitals) in an AUTHORITIES.md, before building.
> 2. **The deploy gate this week's disaster earned, now mandatory:** every deploy ends by loading the REAL domain `https://jackiemiller.co` in a REAL, foreground browser and confirming a human sees the intended page. NEVER trust a green build log, a 200 status, or the in-app preview pane — the preview pane freezes CSS/JS animations and shows false blank/black screens, and a build can pass while the live URL 404s or crashes. Verify at the URL a human types, with human-visible rendering, or it isn't done.
> 3. Prefer robust-by-default: content visible without JS; animation is enhancement, never a prerequisite for seeing the page.
> 4. Do the NanoBanana render iteration WITH Jacklyn before writing component code.

## The vision, in her words (distilled)

Jackie's corner of the internet — ideas, aesthetic, and personality turned into an immersive digital world that actually feels like her. **A quirky but expensive journal theme**: personalized, leather, intentional, curated details, tactile, premium paper, sophisticated, hand-crafted. Think *luxury Paper Republic* — charms, cords, clips, custom stickers, labels, inserts, loops, fountain pen.

> **VIBE AMENDMENT — 2026-07-17 (Jacklyn's mood boards; supersedes the material palette above).** The aesthetic is **dark glam maximalism**: oxblood (Pantone 4975C, `#4E0000`), black, deep green, leopard/tortoise/croc textures, brass and gold, lamp- and candle-light — vintage Playboy-era luxury, sultry and expensive. "Quirky but expensive journal" stands, but the journal is oxblood croc, not cognac pebble; the desk world is moody even by day. Composition, portals, and all operating rules unchanged. Palette + revised prompts: [nanobanana-prompts.md](nanobanana-prompts.md).

## Decisions (interviewed & locked 2026-07-15)

1. **The scene: writer's desk flat-lay.** Cinematic overhead view of a leather journal on a beautiful desk — fountain pen, charms, cords, clips, stickers, coffee ring, lamp light. Every object is a hotspot.
2. **Portals (object → destination):**
   - **The leather journal** → Field Notes (`/field-notes`) — the journal literally opens into the weekly notes
   - **Wax-sealed envelopes / labeled folders** → Work & projects (one seal/label per project)
   - **Photo under a paper clip / luggage-tag charm** → About / her story
   - **The fountain pen / a stamped postcard** → Contact ("write to me")
3. **Current site: rebuild the homepage, keep Field Notes.** The dreamscape replaces the cover/homepage entirely. Field Notes keeps its editorial paper style (it *is* the journal's interior) and becomes a destination inside the world. **Merge PR #2 first, then rebase this work on top.**
4. **Sound: ambient, off by default.** Quiet lo-fi/ambient loop + tactile sound details (pen scratch, page turn, clip snap) behind an elegant toggle. Opt-in (browsers block autoplay-with-sound anyway).

## Requirements from Jacklyn (verbatim list)

- Cinematic homepage using AI-generated visuals
- Develop the visual identity and online atmosphere
- Use **NanoBanana** (Gemini image generation) to generate the custom dreamscape environment
- Clickable interactive hotspots — objects in the scene become links, portals, experiences
- Day/night toggles, music, immersive details

## Build notes (for the session that picks this up)

- **Day/night:** build on the dark mode merged in PR #3 — the toggle should morph the *scene* (day: window light, warm paper; night: lamp glow, deeper shadows) AND the site theme together. Generate matched day + night renders of the identical scene composition so hotspot coordinates are shared.
- **NanoBanana workflow:** generate the master desk scene (day + night) at high res; generate individual object variants (journal closed/opening, envelope sealed/broken seal) for hover states. Consistent camera angle across all generations — lock the composition prompt. Jacklyn runs the generations (needs her Gemini access); iterate with her in-session on the renders until the vibe is right before any code.
- **Hotspots:** positioned overlay regions on the scene image (percentage-based coordinates so they survive responsive scaling); hover = subtle lift/glow + label in the site's hand-written font (Caveat); click = portal transition (e.g. journal opens → page-turn into /field-notes).
- **Mobile:** flat-lay actually suits portrait — crop tighter, hotspots become larger touch targets; or a graceful fallback list under a cropped hero. Decide in-session with real renders. Body must never scroll horizontally.
- **Accessibility & performance:** keyboard-navigable hotspot equivalents (visible nav fallback), `prefers-reduced-motion` respected, alt text per object, preload day variant only, lazy-load night + audio. Lighthouse budget stays honest — this is still a Tier-2 gated deploy.
- **Music sourcing:** needs a licensed/royalty-free ambient track — Jacklyn to pick or commission; log the license in the repo.

## Order of operations

1. Merge PR #2 (Field Notes) → 2. Rebase/resolve vs. dark-mode main → 3. Decide PR #1 (inbox) → 4. NanoBanana render iteration with Jacklyn → 5. Build scene + hotspots + toggle → 6. Sound layer → 7. Tier-2 gate (mobile, a11y, performance) → 8. Ship.
