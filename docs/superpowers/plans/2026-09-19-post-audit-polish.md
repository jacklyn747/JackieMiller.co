# Post-Audit Polish Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Address the actionable findings from the Awwwards + VP-of-LXD audit (2026-09-19), plus add two new black-and-white portraits Jacklyn provided. Fixes the audit's #1 Critical finding (hero image contradicts hero copy) by reusing the new portrait photography rather than needing new visual assets.

**Architecture:** Small, independent content/copy/asset edits to `src/app/page.tsx` and `src/components/case-studies/digital-literacy/DigitalLiteracy.tsx`. No new components, no new routes. Two image files (already staged, uncommitted) get committed as part of Task 1.

**Tech Stack:** Same as Phase 1/2 — Next.js 16 App Router, Tailwind v4 utilities in JSX + inline `style` for design-token colors.

## Global Constraints

- Same conventions as Phase 1/2: Tailwind utility classes for spacing/typography, inline `style` for design-token colors, no new CSS files unless a `:hover`/`:focus-visible` state needs one.
- Do not delete `public/home/hero-flash.png` (the flash-tattoo illustration being replaced) — stop referencing it, don't remove the asset. It may be reused elsewhere later.
- Do not touch `src/components/ScrollAnimations.tsx`, `src/lib/gsap.ts`, or the `gsap` dependency — investigated and deliberately left alone (see plan notes below); out of scope for this pass.
- Do not start `/contact` work — that's a separate, larger phase.
- Commit message ends with an accurate self-attribution line (Co-Authored-By naming the model that did the work) and, if available, a Claude-Session line.
- End of every task: `npm run lint && npm run build` must both pass with zero errors.

---

### Task 1: Verify and commit the staged portrait integration

**Files:**
- Commit (already modified/added in the working tree, not created by this task): `public/about/portrait.jpg`, `public/about/portrait-home.jpg`, `src/app/page.tsx` (the `findPortrait()` function only — do not touch anything else in this file, later tasks handle the rest of it)

**Context:** A prior session already dropped two new black-and-white portraits into `public/about/` and updated `findPortrait()` in `src/app/page.tsx` to prefer `portrait-home.(jpg|jpeg|png|webp)` for the homepage's 4:5 About-teaser frame, falling back to the shared `portrait.*` if absent. This was never committed. Your job is to verify it's correct and commit it — not to redo the work.

- [ ] **Step 1: Verify the current state**

Run:
```bash
git status
git diff src/app/page.tsx
```
Confirm the diff touches ONLY the `findPortrait()` function (should change from a single-basename loop to a two-basename loop trying `portrait-home` before `portrait`). If the diff shows changes to anything else in `page.tsx`, STOP and report BLOCKED — that would mean something else is mixed into this diff that this task didn't expect.

Confirm both image files exist and are real photos, not empty/corrupt:
```bash
file public/about/portrait.jpg public/about/portrait-home.jpg
```
Both should report as valid JPEG images with reasonable dimensions (not 0 bytes, not obviously corrupt).

- [ ] **Step 2: Verify it renders correctly**

Start the dev server if not already running (`npm run dev`), then visit `http://localhost:3000/about` and confirm a real portrait photo renders (not the "Portrait" placeholder text). Visit `http://localhost:3000/` and scroll to the "About" teaser section (`id`-less section with eyebrow "About", header "Education is in my blood.") and confirm a portrait renders there too — it should be a DIFFERENT photo/pose than `/about`'s, per the existing fallback logic (portrait-home takes priority on the homepage).

- [ ] **Step 3: Commit**

```bash
git add public/about/portrait.jpg public/about/portrait-home.jpg src/app/page.tsx
git commit -m "$(cat <<'EOF'
feat: add new black-and-white portrait photography

Two portraits: a direct-gaze crop for /about and the shared fallback,
and a closer chin-on-fist crop preferred by the homepage's 4:5
About-teaser frame.
EOF
)"
```
(Add your own accurate Co-Authored-By line to the commit message before running it — don't skip attribution.)

Note: this commit will only include `page.tsx`'s `findPortrait()` change. Task 2 makes further changes to this same file (the hero section) — do NOT commit those as part of this task, they're explicitly Task 2's job.

---

### Task 2: Replace the homepage hero illustration with the new portrait

**Files:**
- Modify: `src/app/page.tsx` (hero section only, specifically the `<div className="hm-hero__art">` block)

**Context:** The audit's #1 Critical finding: the current hero art is a flash-tattoo illustration (oxblood sunburst, open book, "The Way Out" banner) built for the old justice-involved-learner narrative — it sits directly beside "High-Velocity Learning Architecture. Governed Enterprise AI." copy with zero connective tissue. Replace it with the new portrait photo (the same file used on `/about`, giving the homepage hero a strong, editorial photographic treatment instead of mismatched illustration).

- [ ] **Step 1: Replace the hero art block**

In `src/app/page.tsx`, find:

```tsx
          <div className="hm-hero__art">
            <div className="hm-flash">
              <Image
                src="/home/hero-flash.png"
                alt="Flash-tattoo illustration: an open book over an oxblood sunburst, with a banner reading The Way Out."
                width={2400}
                height={2800}
                priority
                sizes="(max-width: 900px) 90vw, 500px"
              />
            </div>
          </div>
```

Replace with:

```tsx
          <div className="hm-hero__art">
            {portrait ? (
              <div className="hm-hero__portrait">
                <Image
                  src={portrait}
                  alt="Jackie Miller"
                  fill
                  priority
                  sizes="(max-width: 900px) 90vw, 500px"
                />
              </div>
            ) : (
              <div className="hm-hero__portrait is-empty">Portrait</div>
            )}
          </div>
```

This reuses the same `portrait` variable already computed at the top of `Home()` via `findPortrait()` (Task 1) — no new lookup logic needed. Since `findPortrait()` prefers `portrait-home` and this is also on the homepage, the hero will show the SAME photo as the About-teaser section further down by default. That's likely too repetitive for one page — to keep them visually distinct, change the hero specifically to prefer the OTHER photo. Do this by adding one more tiny helper right next to `findPortrait()` (do not modify `findPortrait()` itself — Task 1 already committed it and other code may come to depend on its exact behavior):

```tsx
// The hero wants the direct-gaze "portrait" crop specifically (not
// portrait-home, which the About-teaser section already uses lower on
// this same page) so the two photos read as a deliberate pair, not a
// repeat.
function findHeroPortrait(): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const rel = `about/portrait.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", rel))) return `/${rel}`;
  }
  return null;
}
```

Add this function directly below `findPortrait()`. Then in `Home()`, add a second variable alongside the existing `const portrait = findPortrait();`:

```tsx
  const portrait = findPortrait();
  const heroPortrait = findHeroPortrait();
```

And in the hero art JSX you just added, use `heroPortrait` instead of `portrait`:

```tsx
          <div className="hm-hero__art">
            {heroPortrait ? (
              <div className="hm-hero__portrait">
                <Image
                  src={heroPortrait}
                  alt="Jackie Miller"
                  fill
                  priority
                  sizes="(max-width: 900px) 90vw, 500px"
                />
              </div>
            ) : (
              <div className="hm-hero__portrait is-empty">Portrait</div>
            )}
          </div>
```

- [ ] **Step 2: Add the CSS**

The hero art column currently sizes itself around the old `.hm-flash` illustration. Find the `.hm-flash` rule in `src/app/home.css` (search for `.hm-flash`) and read its container sizing (likely on `.hm-hero__art` itself or a fixed max-width). Add a new rule for the portrait treatment, styled as a tall editorial photo (not a square/logo mark) — append this near the existing `.hm-flash` rules in `home.css`:

```css
.hm-hero__portrait {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 18px;
  overflow: hidden;
  background: var(--paper2);
}
.hm-hero__portrait img { object-fit: cover; }
.hm-hero__portrait.is-empty {
  display: grid;
  place-items: center;
  color: var(--ink-mid);
  font-family: var(--font-sans), sans-serif;
  font-size: 13px;
}
```

Do not delete the existing `.hm-flash` rules — they become unused CSS (matching how Phase 2 left `.wk-hero`/`.wk-block` unused rather than deleting mid-task) but the underlying asset and its styling stay available if needed later.

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/home.css
git commit -m "fix: replace homepage hero illustration with portrait photography

The flash-tattoo illustration (built for the prior justice-involved-
learner narrative) sat beside enterprise-positioning copy with no
connection. Replaced with the new portrait photography."
```
(Add your accurate attribution line.)

---

### Task 3: Name the Kirkpatrick framework in Digital Literacy's evaluation section

**Files:**
- Modify: `src/components/case-studies/digital-literacy/DigitalLiteracy.tsx`

**Context:** The evaluation section already measures exactly what a Kirkpatrick Level 1-3 framework measures (self-reported confidence = reaction/Level 1, capstone task success = learning/Level 2, completion by input domain = behavior/Level 3) but never names the framework. A VP of LXD scanning in 30 seconds pattern-matches on the term itself.

- [ ] **Step 1: Add the line**

Find this paragraph (search for "completion by input domain"):

```tsx
          <p style={{ maxWidth: "82ch", fontSize: 14, lineHeight: 1.7, color: "rgba(241,238,229,0.72)", margin: "22px 0 0", textWrap: "pretty" }}>
            The low marks — device-verified tap targets, a formal WCAG contrast pass — are left visible on purpose: a rubric that only ever returns fours isn&apos;t a rubric. In the field, three things get measured first: <span style={{ color: "#E3C8C2" }}>completion by input domain</span> (where does a first-time user stall — the mouse, the keyboard, or windows?), <span style={{ color: "#E3C8C2" }}>capstone task success unaided</span>, and <span style={{ color: "#E3C8C2" }}>self-reported confidence before versus after.</span>
          </p>
```

Add a new, second paragraph directly after it (same indentation level, as a sibling):

```tsx
          <p style={{ maxWidth: "82ch", fontSize: 13, lineHeight: 1.7, color: "rgba(241,238,229,0.55)", margin: "14px 0 0", textWrap: "pretty" }}>
            That&apos;s a Kirkpatrick Level 1–3 measurement plan — reaction (confidence), learning (task success), and behavior (completion by domain) — chosen before a single learner touches the course, not backfilled after.
          </p>
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/case-studies/digital-literacy/DigitalLiteracy.tsx
git commit -m "feat: name the Kirkpatrick framework in Digital Literacy's evaluation plan"
```
(Add your accurate attribution line.)

---

### Task 4: Rewrite "Selected Work" and "How I Work" homepage copy

**Files:**
- Modify: `src/app/page.tsx` (the `HOW` array and the "Selected Work" section header only)

**Context:** The audit flagged a tonal seam: the homepage drops from CISO-facing enterprise-governance language straight into "Courses built to be worth someone's time" and "Boring is the enemy" — casual, personal-voice copy left over from the pre-rebrand site. This task tones the copy to match the new register without deleting the section or duplicating the "4 Operating Pillars" section that already exists above it — the substance of each "How I Work" point (visual craft as instructional craft, designing for real constraints, AI as a force multiplier, narrative for retention) is real and stays; only the voice changes.

- [ ] **Step 1: Update the "Selected Work" header**

Find:

```tsx
        {/* ── SELECTED WORK ── */}
        <section className="hm hm-sec">
          <div className="hm-sec__head">
            <p className="ds-eyebrow">Selected Work</p>
            <h2 className="hm-sec__title">
              Courses built to be <em>worth someone&apos;s time.</em>
            </h2>
          </div>
```

Replace the `<h2>` with:

```tsx
            <h2 className="hm-sec__title">
              Case studies in <em>compressed, governed delivery.</em>
            </h2>
```

- [ ] **Step 2: Update the "How I Work" section**

Find the `HOW` array near the top of the file:

```tsx
type HowCard = { t: string; d: string; icon?: string; iw?: number; ih?: number; alt?: string };
const HOW: HowCard[] = [
  {
    t: "Boring is the enemy",
    d: "I treat visual craft as instructional craft. If a course looks like a chore, it teaches like one — so mine don't.",
    icon: "/home/icon-lightning.png", iw: 1640, ih: 2360, alt: "Lightning bolt",
  },
  {
    t: "Designed for the real world",
    d: "Locked-down devices, variable literacy, no IT support. I design around real constraints, not despite them.",
    icon: "/home/icon-anchor.png", iw: 1640, ih: 2360, alt: "Anchor",
  },
  {
    t: "AI is my force-multiplier",
    d: "I direct the instructional design; AI accelerates the build — storyboard to working prototype, faster.",
    icon: "/home/icon-star.png", iw: 2360, ih: 1640, alt: "Shooting star",
  },
  {
    t: "Humans are wired for story",
    d: "We're built to remember narrative, not bullet points — so I design learning as story. That's what the creative-writing degree was really for.",
    icon: "/home/icon-pen.png", iw: 1640, ih: 2360, alt: "Fountain pen writing",
  },
];
```

Replace with:

```tsx
type HowCard = { t: string; d: string; icon?: string; iw?: number; ih?: number; alt?: string };
const HOW: HowCard[] = [
  {
    t: "Visual craft is instructional craft",
    d: "A course that looks like a chore teaches like one. Every interface decision is treated as a pedagogical decision, not a skin applied after the fact.",
    icon: "/home/icon-lightning.png", iw: 1640, ih: 2360, alt: "Lightning bolt",
  },
  {
    t: "Designed for real-world constraints",
    d: "Locked-down devices, variable literacy, no IT support, or an enterprise security review — the design starts from the actual environment, not an idealized one.",
    icon: "/home/icon-anchor.png", iw: 1640, ih: 2360, alt: "Anchor",
  },
  {
    t: "AI as force-multiplier, not author",
    d: "I direct the instructional design; AI accelerates the build — storyboard to working prototype, faster, with every objective still human-verified.",
    icon: "/home/icon-star.png", iw: 2360, ih: 1640, alt: "Shooting star",
  },
  {
    t: "Narrative for retention, not decoration",
    d: "People remember story structure, not bullet points. Scenario-based learning and persona-driven simulation exist because narrative is a retention mechanism, not a stylistic choice.",
    icon: "/home/icon-pen.png", iw: 1640, ih: 2360, alt: "Fountain pen writing",
  },
];
```

Then find the section header:

```tsx
        {/* ── HOW I WORK ── */}
        <section className="hm hm-sec">
          <div className="hm-sec__head">
            <p className="ds-eyebrow">How I Work</p>
            <h2 className="hm-sec__title">
              A designer who thinks learning should look like something you&apos;d <em>choose</em> to do.
            </h2>
          </div>
```

Replace the `<h2>` with:

```tsx
            <h2 className="hm-sec__title">
              The craft decisions behind <em>every governed pipeline.</em>
            </h2>
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "fix: retone Selected Work and How I Work copy to match enterprise register"
```
(Add your accurate attribution line.)

---

### Task 5: Give the demonstration case studies' Instructional Artifact tier a real visual treatment

**Files:**
- Modify: `src/components/case-studies/CaseStudyTemplate.tsx`

**Context:** The audit noted the 3 demonstration case studies' "Instructional Artifact" tier is a plain paragraph, while the real Digital Literacy case study has a genuinely embedded interactive prototype — an asymmetry that runs backward for the studies built specifically to prove capability. There is no real interactive artifact to embed here yet (that's Phase 4 territory — a live persona sandbox and interactive velocity visualizer). Do NOT fabricate a fake product screenshot or mockup image — that would stack a second fabrication on top of the case study's own already-disclosed synthetic content. Instead, give the existing text a distinct, bordered "artifact preview" callout treatment so it reads as a deliberate proof-element rather than another paragraph in the flow.

- [ ] **Step 1: Update the Instructional Artifact section**

Find:

```tsx
          <section className="py-8 md:py-10 border-t-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
            <h2 className="ds-eyebrow ds-eyebrow--solo mb-4">The Instructional Artifact</h2>
            <p className="text-base leading-relaxed max-w-[68ch]" style={{ color: "var(--ink-mid)" }}>
              {artifact}{" "}
              <Link href="/systems#vault" className="underline" style={{ color: "var(--ox-accent)" }}>
                See the underlying prompt architecture <span aria-hidden="true">→</span>
              </Link>
            </p>
          </section>
```

Replace with:

```tsx
          <section className="py-8 md:py-10 border-t-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
            <h2 className="ds-eyebrow ds-eyebrow--solo mb-4">The Instructional Artifact</h2>
            <div
              className="rounded-2xl p-6 md:p-7 border-[0.5px]"
              style={{ borderColor: "var(--ox-dim)", background: "color-mix(in srgb, var(--ox) 4%, transparent)" }}
            >
              <p className="text-[10.5px] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: "var(--ox-accent)" }}>
                Artifact Summary
              </p>
              <p className="text-base leading-relaxed max-w-[68ch]" style={{ color: "var(--ink)" }}>
                {artifact}
              </p>
              <Link
                href="/systems#vault"
                className="inline-flex items-center gap-1 mt-4 text-sm font-semibold underline"
                style={{ color: "var(--ox-accent)" }}
              >
                See the underlying prompt architecture <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
```

(Note: the exact opening tag of this section — whether it's currently `<h2>` or `<p>` for "The Instructional Artifact" — depends on whether Phase 2's final-review fix already converted it. Check the actual current file first; if it's still `<p className="ds-eyebrow ds-eyebrow--solo mb-4">`, keep it as `<p>` in your edit rather than introducing a second `<h2>` inconsistently with the other tier labels in this same file — match whatever tag the OTHER 4 tier labels in this file currently use.)

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0. Visually the change only affects the 3 case studies using `CaseStudyTemplate` — confirm none of Digital Literacy or Content Review (which don't use this component) are affected.

- [ ] **Step 3: Commit**

```bash
git add src/components/case-studies/CaseStudyTemplate.tsx
git commit -m "fix: give the Instructional Artifact tier a distinct visual callout treatment"
```
(Add your accurate attribution line.)

---

### Task 6: Manual browser verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Verify in a real browser, fresh tab / hard load**

Visit `/` and confirm:
- Hero shows the new portrait photo, correctly sized/cropped, not the flash-tattoo illustration.
- The About-teaser section further down shows a DIFFERENT photo/pose than the hero.
- "Selected Work" and "How I Work" sections show the new copy.
- Nothing else on the homepage regressed (trust badges, dilemma module, pillars, governance accordion, case study grid all still render correctly).

Visit `/about` and confirm the portrait still renders correctly there (unaffected by Task 2's hero-specific change).

Visit `/work/digital-literacy` and confirm the new Kirkpatrick sentence appears in the Evaluation section, styled consistently with the surrounding dark-immersion copy.

Visit each of the 3 demonstration case studies (`/work/fintech-systems-migration`, `/work/high-stakes-leadership-simulation`, `/work/technical-product-enablement`) and confirm the Instructional Artifact section now has a visually distinct bordered callout, and the "See the underlying prompt architecture" link still works (lands on `/systems` scrolled to the Prompt Vault).

Toggle dark/light mode on `/` and one case study page; confirm no unstyled flashes, no dark-body-bleed-through gutters, at a viewport wider than 1080px.

- [ ] **Step 3: Report back**

Note any visual issues found for follow-up — do not silently patch and move on without flagging what broke.

---

## Self-Review Notes

- **Spec coverage:** New portraits committed ✓ (Task 1), hero illustration replaced ✓ (Task 2, resolves audit Critical #1), Kirkpatrick framework named ✓ (Task 3), tonal-register copy fixed ✓ (Task 4), Instructional Artifact visual upgrade ✓ (Task 5). **Deliberately not addressed, with reasoning recorded:** GSAP `ScrollAnimations.tsx` reconnection (investigated — built for the paused `awwwards-overhaul` branch's `.cover`/`.rv` design system, which doesn't exist on this branch; "reconnecting" it would mean rewriting it, not wiring it in; left alone rather than forcing a mismatched fix). `/contact` dual-track router — Phase 3-sized, scoped as its own separate plan.
- **Placeholder scan:** clean — every task has real, complete code; the Instructional Artifact fix explicitly avoids fabricating a fake screenshot/mockup, using a styled text callout instead.
- **Type consistency:** Task 2 adds `findHeroPortrait()` as a sibling to the existing `findPortrait()`, both returning `string | null`, no signature drift.
