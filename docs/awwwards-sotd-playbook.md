# Playbook: Building a Site That Qualifies for Awwwards Site of the Day

*Generic reference — not specific to this site's positioning or content. Written 2026-09-19 as the shared standard this project is building against. See [positioning.md](positioning.md) for the project-specific direction this playbook gets applied to.*

## 0. Understand what's actually being judged

Awwwards jurors score every submission on four criteria, each 0–10:

- **Design** (visual execution — typography, color, composition, imagery)
- **Usability** (does it work, is it intuitive, does it respect the user)
- **Creativity** (original concept and execution — not just "different for the sake of different")
- **Content** (quality and relevance of copy, media, and information — substance, not just surface)

The average of juror scores determines the outcome: a low average gets nothing, a moderate one earns an **Honorable Mention**, a high one wins **Site of the Day (SOTD)**, and the best SOTDs get nominated for **Site of the Month** and **Site of the Year**. A **Developer Award** is sometimes given separately for technical craft.

**Implication:** you cannot win on visual design alone. A gorgeous site with confusing navigation or thin content scores low on two of the four axes. Treat all four as first-class requirements from day one, not something to patch in QA.

## 1. Concept & strategy (before any visual work)

1. Define the single idea the whole site expresses. Award-winning sites are built around one governing concept that every later decision gets checked against.
2. Define the audience and the primary action you want them to take. Usability is judged relative to intent.
3. Audit inspiration deliberately, don't imitate — extract principles (pacing, restraint, use of white space), not specific effects.
4. Inventory actual content before designing anything. Real typography and spacing decisions require real content, not placeholder text.
5. Write a one-sentence creative concept statement. If you can't state the idea in one sentence, the site doesn't have one yet.

## 2. Information architecture & content strategy

1. Map every page/section and the one job each must do.
2. Decide the narrative arc of the primary path through the site — award sites are often authored as a sequence, not a set of independent destinations.
3. Write real copy early so layout and type decisions are made against real line lengths and real rhythm.
4. Decide what's essential vs. decorative. Content that doesn't earn its place reads as filler to a juror.

## 3. Visual system (art direction)

1. **Typography first.** Small number of typefaces, a real type scale, disciplined pairing. Custom/licensed display type is a common differentiator over default web-safe choices.
2. **Color as a system, not decoration.** A restrained palette with clear roles (background, ink, one or two accents) as tokens, not hardcoded per-component values.
3. **Grid and spacing rules.** A real grid and spacing scale — inconsistent spacing is one of the fastest ways a site reads as "template."
4. **Mood board and reference sheet** locked before building components, so pages don't drift.
5. **One signature visual/interactive motif** — a cursor treatment, a transition style, a recurring device — that makes the site identifiable and distinct.

## 4. Interaction & UX design

1. Wireframe key screens for structure before visual polish — structure is usability, judged independently of how pretty it looks.
2. Design states, not just screens: hover, active, loading, empty, error, keyboard focus, disabled.
3. Map every micro-interaction deliberately — nothing should feel like a browser default if the rest of the site is custom.
4. Prototype the riskiest interaction (the signature motif) first.
5. Design mobile as its own experience, not a squeezed desktop layout — judges explicitly evaluate the responsive version.

## 5. Motion & animation design

1. Define a motion language up front: standard easing curves, standard durations, rules for when animation triggers.
2. Plan scroll-driven storytelling deliberately — what reveals, in what order, at what pace.
3. Design transitions between pages/states, not just within them.
4. Build in restraint. The most common motion mistake is too much animation competing for attention, not too little.
5. Choose animation tooling based on need (CSS-only where sufficient, a scroll/animation library for complex sequencing, WebGL/3D only if the concept genuinely calls for it) — technical choice follows the concept.

## 6. Technical build

1. Performance budget first, code second.
2. Accessibility from the start: semantic markup, keyboard navigation, focus states, color contrast, reduced-motion support — bolted-on accessibility usually shows.
3. Optimize media aggressively: compression, correct formats, lazy-loading, minimal critical-path preloading.
4. Test on real devices, not just resized browser windows.
5. Build the design system as reusable components/tokens, not one-off page-specific code.

## 7. Content production

1. Commission/produce final photography, illustration, video at the resolution and aspect ratios the design needs — stock imagery is one of the most common reasons a design reads as generic.
2. Have copy edited by someone other than the writer.
3. Cut anything added just to fill space; every piece of content must earn its place.

## 8. QA, polish, and the details pass

1. Cross-browser and cross-device testing, not just the primary path.
2. Real performance audit (Lighthouse or equivalent), fix regressions.
3. Fresh proofread of all copy.
4. Dedicated "details" pass: custom favicon, custom 404, custom cursor if relevant, social preview cards, scroll behavior, loading states.
5. Outside eyes before submitting.

## 9. Pre-submission checklist

- Live at a public URL, not password-protected.
- Fully responsive — mobile is evaluated, not optional.
- Recently launched or substantially updated (check current Awwwards submission guidelines for the active recency window).
- Project write-up ready: title, one-line description, stack/tools used, full credits.
- No broken links, console errors, or missing alt text.

## 10. Submission & timing

1. Submit through the official Awwwards flow, current submission fee applies.
2. Expect a review queue — plan public launch timing around it if the two need to coincide.
3. If it doesn't place, treat visible juror feedback as real signal and revise before resubmitting.
4. Site of the Month/Year nominations are pulled automatically from SOTD winners — not a separate submission.
