# Phase 2 — /work Rebuild & 3 Flagship Case Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Rebuild `/work` around the new enterprise L&D positioning per the master roadmap's Step 2/3 spec (meta-header, structured project cards, deep-dive case study pages), ship the 3 flagship case studies using a shared 5-tier template, and reconcile the two real existing case studies per Jacklyn's explicit direction: *Digital Literacy Fundamentals* gets equal weight alongside the 3 new flagship studies in the grid; *Discovering Your Narrative Voice* (content-review) is removed from every grid/listing but its page stays live at its existing URL.

**Architecture:** One new shared component (`CaseStudyTemplate`) renders the 5-tier structure (meta strip → strategic bottleneck → AI-accelerated methodology → governance & privacy → instructional artifact → measurable impact) plus the Security Footnote disclosure, consumed by 3 new thin page files. `src/lib/caseStudies.ts` gains 3 new entries and drops the content-review entry (its page file is untouched — the array only drives grid rendering, no route depends on it). `/work`'s existing hero/"Approach"/"Working with AI" sections (all correctional-education framing) are replaced per Jacklyn's explicit direction to follow the roadmap and not treat the old site as something to preserve by default — this project is now one demonstration case among several, not the site's framing device. The homepage's "Selected Work" grid is updated to the same 4-card set for consistency.

**Tech Stack:** Same as Phase 1 — Next.js 16 App Router, React 19, Tailwind v4 utilities in JSX + inline `style` for design-token colors, a real CSS file only where a `:hover`/`:focus-visible` state needs a token color.

## Global Constraints

- **Spacing/typography:** standard Tailwind utility classes in JSX `className` (default scale or bracket arbitrary values) — never custom CSS variables for these. [carried over from Phase 1, confirmed working]
- **Colors:** only the existing CSS custom-property tokens (`--ink`, `--paper`, `--ox-accent`, `--ink-mid`, `--ink-dim`, `--ox-dim`, etc.) via inline `style` — never a Tailwind color utility (none exist for these), never a new custom CSS class for a color alone.
- **Existing `.work-card`, `.wk-*`, `.ds-*` primitives are reused, not forked** — per `AGENTS.md`. New CSS additions to `work.css` are limited to the one new visual variant this plan requires (a no-image "stat" card face — Task 1).
- **Real work is never deleted without being asked.** Content-review's page, route, and component are untouched; only its entry in the grid-driving array is removed. Digital Literacy's existing page/component is completely untouched — only its grid-card treatment is unified with the new cards' visual weight.
- **Security Footnote is disclosure, not decoration:** every one of the 3 new (synthesized/anonymized) case studies carries the exact string from the spec, verbatim: *"Enterprise Security Note: All proprietary data and SME transcripts shown have been fully anonymized, synthesized, or demonstrated within sandboxed non-public environments."* This does **not** appear on Digital Literacy or Content Review — that work is real, not synthesized, and labeling it as such would be dishonest in the other direction.
- **Tier 4 ("Instructional Artifact") copy is authored, not fabricated-as-real:** the roadmap's per-study blueprints don't include dedicated Tier-4 text (that tier is meant to hold a live interactive demo, which is Phase 4 — out of scope here). Each case study's Tier 4 in this plan is a short, grounded paragraph describing the artifact type already named in that study's own Tier-2 bullets, with a plain link to the real, already-shipped Prompt & Scaffolding Vault on `/systems` — never a claim that a live demo of that specific engagement exists yet.
- **Commit attribution:** every commit message ends with `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>` (this line, exactly).
- End of every task: `npm run lint && npm run build` must both pass with zero errors.

---

### Task 1: Extend the case-study data layer + add the no-image card variant

**Files:**
- Modify: `src/lib/caseStudies.ts` (extend the `CaseStudy` type, remove the content-review entry, add 3 new entries)
- Modify: `src/app/work/work.css` (add the `.work-card__cover.is-stat` variant — a no-image card face for the 3 new studies, styled like the existing `.is-live` dark-gradient treatment)

**Interfaces:**
- Produces: `CaseStudy` type gains `statNum?: string`, `statLabel?: string`, `isDemonstration?: boolean`. Tasks 2, 6, 7 consume these.

- [x] **Step 1: Update the type and array**

Replace the full contents of `src/lib/caseStudies.ts`:

```ts
// Registry of published case studies. The /work index renders from this;
// each entry's `slug` maps to a page at /work/<slug>.
// Add a new object here (and its page) when a case study ships.

export type CaseStudy = {
  slug: string;
  category: string;
  discipline: string;
  title: string;
  summary: string;
  role: string;
  focus: string;
  cover: string;
  coverAlt: string;
  live?: boolean; // render a live component cover (see /work page) instead of an image
  statNum?: string; // render a stat-face cover instead of an image (see /work page)
  statLabel?: string;
  isDemonstration?: boolean; // synthesized/anonymized case study — carries the Security Footnote
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "digital-literacy",
    category: "Course Design",
    discipline: "Instructional Design",
    title: "Digital Literacy Fundamentals",
    summary:
      "A full six-lesson course teaching first-time users the four input domains of a laptop — with a live, interactive capstone simulation — for learners preparing for reentry.",
    role: "Instructional Designer",
    focus: "Full Course Design",
    cover: "/case-studies/digital-literacy/cover.png",
    coverAlt: "The Digital Literacy Fundamentals course open to its title screen on a tablet.",
  },
  {
    slug: "fintech-systems-onboarding",
    category: "Enterprise Onboarding",
    discipline: "AI-Accelerated Instructional Design",
    title: "Enterprise Systems Modernization & Onboarding",
    summary:
      "Training 2,400 distributed operators on a new core banking interface — an automated SME synthesis pipeline compressed a 14-week baseline to 21 days.",
    role: "Principal Learning Experience Architect",
    focus: "AI-Accelerated Curriculum Sprint",
    cover: "",
    coverAlt: "",
    statNum: "78%",
    statLabel: "Faster Time-to-Certification",
    isDemonstration: true,
  },
  {
    slug: "leadership-simulation",
    category: "Leadership Simulation",
    discipline: "Persona Architecture & Narrative Design",
    title: "High-Stakes Leadership Role-Play Simulation",
    summary:
      "Synthetic stakeholder personas replaced a live-actor training budget for coaching and retention conversations, scaled across 800+ facilities.",
    role: "Simulation Architect & Narrative Designer",
    focus: "Persona-Driven Simulation Design",
    cover: "",
    coverAlt: "",
    statNum: "$180K",
    statLabel: "Live-Actor Budget Replaced",
    isDemonstration: true,
  },
  {
    slug: "developer-enablement",
    category: "Technical Enablement",
    discipline: "Rapid Content Systems",
    title: "Technical Product Enablement in 72-Hour Sprints",
    summary:
      "A rapid ingestion engine turns release notes and PR summaries into customer-facing enablement decks within 72 hours of every release.",
    role: "Lead Enablement Architect",
    focus: "Continuous Sprint Engine",
    cover: "",
    coverAlt: "",
    statNum: "72 HRS",
    statLabel: "Release-to-Enablement",
    isDemonstration: true,
  },
];
```

(Note: `content-review` is intentionally removed from this array — its page at `src/app/work/content-review/page.tsx` and component are untouched and stay live at that URL; it's simply no longer rendered in any grid.)

- [x] **Step 2: Add the no-image "stat" card face**

Append to `src/app/work/work.css`, right after the existing `.work-card__cover.is-live .tbl` rules (after the line `.work-card:hover .work-card__cover.is-live .tbl { transform: translateY(-4px); }`):

```css
.work-card__cover.is-stat {
  aspect-ratio: 16 / 10;
  background: radial-gradient(120% 130% at 50% -10%, #2a1614 0%, #1a0f0d 62%, #120a09 100%);
  display: grid;
  place-items: center;
  padding: clamp(20px, 4vw, 40px);
  text-align: center;
}
.work-card__cover.is-stat .stat-num {
  font-family: var(--font-serif), serif;
  font-weight: 400;
  font-size: clamp(40px, 6vw, 64px);
  line-height: 1;
  color: #e3c8c2;
}
.work-card__cover.is-stat .stat-label {
  margin-top: 10px;
  font-family: var(--font-sans), sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(227, 200, 194, 0.7);
}
```

- [x] **Step 3: Verify**

Run: `npm run lint && npm run build`
Expected: build will show type errors in `src/app/page.tsx` and `src/app/work/page.tsx` where they render `cs.cover`/`Image` unconditionally for entries that now have `cover: ""` — this is expected and resolved by Tasks 6 and 7, which update both render sites. Do not attempt to fix those files here.

- [x] **Step 4: Commit**

```bash
git add src/lib/caseStudies.ts src/app/work/work.css
git commit -m "$(cat <<'EOF'
feat: extend case-study data for 3 flagship studies, add no-image card face

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Build the shared CaseStudyTemplate component

**Files:**
- Create: `src/components/case-studies/CaseStudyTemplate.tsx`

**Interfaces:**
- Produces: `export default function CaseStudyTemplate(props: CaseStudyTemplateProps)`. Consumed by Tasks 3, 4, 5. `CaseStudyTemplateProps` type is exported from this file so the 3 page files can type their own content objects against it.

- [x] **Step 1: Create the component**

Create `src/components/case-studies/CaseStudyTemplate.tsx`:

```tsx
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ThemeToggle from "@/components/ThemeToggle";

type MetaItem = { label: string; value: string };

export type CaseStudyTemplateProps = {
  eyebrow: string;
  title: string;
  meta: MetaItem[];
  bottleneck: string;
  methodology: string[];
  governance: string[];
  artifact: string;
  impact: string[];
};

export default function CaseStudyTemplate({
  eyebrow,
  title,
  meta,
  bottleneck,
  methodology,
  governance,
  artifact,
  impact,
}: CaseStudyTemplateProps) {
  return (
    <>
      <SiteNav />
      <div style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)" }}>
        <main className="max-w-[860px] mx-auto px-6">
          <section className="pt-16 md:pt-24 lg:pt-28 pb-8 md:pb-10">
            <p className="ds-eyebrow">{eyebrow}</p>
            <h1
              className="text-4xl md:text-6xl mt-3 mb-6"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 400, lineHeight: 1.04, color: "var(--ink)" }}
            >
              {title}
            </h1>
            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t-[0.5px] pt-6" style={{ borderColor: "var(--ink-dim)" }}>
              {meta.map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase" style={{ color: "var(--ink-mid)" }}>
                    {m.label}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="py-8 md:py-10 border-t-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
            <p className="ds-eyebrow ds-eyebrow--solo mb-4">The Strategic Bottleneck</p>
            <p className="text-base leading-relaxed max-w-[68ch]" style={{ color: "var(--ink-mid)" }}>
              {bottleneck}
            </p>
          </section>

          <section className="py-8 md:py-10 border-t-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
            <p className="ds-eyebrow ds-eyebrow--solo mb-4">The AI-Accelerated Methodology</p>
            <ul className="flex flex-col gap-3 p-0 list-none">
              {methodology.map((line) => (
                <li key={line} className="relative pl-[18px] text-base leading-relaxed" style={{ color: "var(--ink)" }}>
                  <span
                    className="absolute left-0 top-[0.65em] w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--ox-accent)" }}
                    aria-hidden="true"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section className="py-8 md:py-10 border-t-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
            <p className="ds-eyebrow ds-eyebrow--solo mb-4">Enterprise Data Governance & Privacy Protocol</p>
            <ul className="flex flex-col gap-3 p-0 list-none">
              {governance.map((line) => (
                <li key={line} className="relative pl-[18px] text-base leading-relaxed" style={{ color: "var(--ink)" }}>
                  <span
                    className="absolute left-0 top-[0.65em] w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--ink-dim)" }}
                    aria-hidden="true"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section className="py-8 md:py-10 border-t-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
            <p className="ds-eyebrow ds-eyebrow--solo mb-4">The Instructional Artifact</p>
            <p className="text-base leading-relaxed max-w-[68ch]" style={{ color: "var(--ink-mid)" }}>
              {artifact}{" "}
              <Link href="/systems#governance" className="underline" style={{ color: "var(--ox-accent)" }}>
                See the underlying prompt architecture →
              </Link>
            </p>
          </section>

          <section className="py-8 md:py-10 border-t-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
            <p className="ds-eyebrow ds-eyebrow--solo mb-4">Measurable Business & Efficiency Impact</p>
            <ul className="flex flex-col gap-3 p-0 list-none">
              {impact.map((line) => (
                <li
                  key={line}
                  className="text-lg md:text-xl leading-snug"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--ink)" }}
                >
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section className="py-8 md:py-10 border-t-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
            <p className="text-[11px] leading-relaxed max-w-[68ch] opacity-80" style={{ color: "var(--ink-mid)" }}>
              Enterprise Security Note: All proprietary data and SME transcripts shown have been fully anonymized,
              synthesized, or demonstrated within sandboxed non-public environments.
            </p>
          </section>

          <section className="py-10 md:py-14">
            <Link href="/work" className="ds-btn ds-btn--ghost">
              ← Back to all work
            </Link>
          </section>
        </main>
      </div>
      <ThemeToggle />
    </>
  );
}
```

- [x] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: exit 0 (this component isn't imported anywhere yet, so it just needs to type-check and lint clean on its own).

- [x] **Step 3: Commit**

```bash
git add src/components/case-studies/CaseStudyTemplate.tsx
git commit -m "$(cat <<'EOF'
feat: add shared 5-tier CaseStudyTemplate component

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Case study page — Enterprise Systems Modernization & Onboarding

**Files:**
- Create: `src/app/work/fintech-systems-onboarding/page.tsx`

**Interfaces:**
- Consumes: `CaseStudyTemplate` (`@/components/case-studies/CaseStudyTemplate`) from Task 2.

- [x] **Step 1: Create the page**

Create `src/app/work/fintech-systems-onboarding/page.tsx`:

```tsx
import type { Metadata } from "next";
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate";

export const metadata: Metadata = {
  title: "Enterprise Systems Modernization & Onboarding — Jackie Miller",
  description:
    "Training 2,400 distributed operators on a new core banking interface — 14 weeks compressed to 21 days via an automated SME synthesis pipeline.",
};

export default function FintechSystemsOnboarding() {
  return (
    <CaseStudyTemplate
      eyebrow="Enterprise Onboarding · AI-Accelerated Instructional Design"
      title="Enterprise Systems Modernization & Onboarding"
      meta={[
        { label: "Organization", value: "Global FinTech / Enterprise SaaS" },
        { label: "Role", value: "Principal Learning Experience Architect" },
        { label: "Timeline", value: "3 Weeks (vs. 14-week baseline)" },
        { label: "AI Security Tier", value: "Level 4 Enterprise Sandbox (Zero Data Retention)" },
      ]}
      bottleneck="A major platform migration required training 2,400 distributed operators on an entirely new core banking interface. Traditional curriculum design was quoted at 3.5 months, which would have delayed the product launch and incurred massive double-licensing costs."
      methodology={[
        "Built an automated SME transcript synthesis pipeline that ingested 15 hours of engineering walkthroughs in a private sandbox, distilling them into 12 core workflow competencies.",
        "Used structured system prompt chains to draft micro-learning modules, click-through system simulation guides, and contextual error-recovery challenges.",
      ]}
      governance={[
        "Customer PII and internal API tokens were stripped prior to analysis.",
        "100% human-verified against engineering acceptance criteria.",
      ]}
      artifact="This engagement shipped as click-through system simulation guides and contextual error-recovery challenges, generated through the same prompt-chaining architecture used across every project on this site."
      impact={[
        "78% reduction in instructional production time (14 weeks down to 21 days).",
        "94% first-time pass rate on system certification.",
        "Zero security or privacy incidents across enterprise audit.",
      ]}
    />
  );
}
```

- [x] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: exit 0. Route `/work/fintech-systems-onboarding` appears in the build's route list as a static page.

- [x] **Step 3: Commit**

```bash
git add src/app/work/fintech-systems-onboarding/page.tsx
git commit -m "$(cat <<'EOF'
feat: add Enterprise Systems Modernization & Onboarding case study

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Case study page — High-Stakes Leadership Role-Play Simulation

**Files:**
- Create: `src/app/work/leadership-simulation/page.tsx`

**Interfaces:**
- Consumes: `CaseStudyTemplate` from Task 2.

- [x] **Step 1: Create the page**

Create `src/app/work/leadership-simulation/page.tsx`:

```tsx
import type { Metadata } from "next";
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate";

export const metadata: Metadata = {
  title: "High-Stakes Leadership Role-Play Simulation — Jackie Miller",
  description:
    "Synthetic stakeholder personas replaced a $180,000 live-actor training budget for coaching and retention conversations, scaled across 800+ facilities.",
};

export default function LeadershipSimulation() {
  return (
    <CaseStudyTemplate
      eyebrow="Leadership Simulation · Persona Architecture & Narrative Design"
      title="High-Stakes Leadership Role-Play Simulation"
      meta={[
        { label: "Organization", value: "Multi-Regional Healthcare Network" },
        { label: "Role", value: "Simulation Architect & Narrative Designer" },
        { label: "Timeline", value: "4 Weeks" },
        { label: "AI Security Tier", value: "Private Local Model Architecture" },
      ]}
      bottleneck={
        'Clinical managers were struggling with high-friction performance evaluations and retention conversations. Static e-learning was universally panned as "unrealistic," while live role-playing with human actors was cost-prohibitive to scale across 800+ facilities.'
      }
      methodology={[
        "Engineered a synthetic stakeholder persona framework, drawing directly from Character.ai behavioral modeling techniques.",
        "Built three distinct synthetic direct reports with hidden variables: emotional resistance, defensiveness, and motivation drivers.",
        "Integrated natural language input: managers conduct a live, text-based or voice-guided coaching conversation where the synthetic employee reacts in real time based on how well the manager applies active listening and conflict-de-escalation frameworks.",
      ]}
      governance={[
        "Model boundaries hardcoded to prevent unscripted persona drift or inappropriate conversational topics.",
        "Human-curated rubric evaluated every branching state.",
      ]}
      artifact="This engagement's synthetic personas were built on the same multi-stage persona conditioning architecture — state variables, boundary guardrails, behavioral thresholds — that underlies every persona-driven artifact on this site."
      impact={[
        "Replaced a $180,000 live-actor training budget with an on-demand, scalable simulation.",
        "4.8/5 learner rating, with 89% of managers reporting high confidence during actual subsequent performance reviews.",
      ]}
    />
  );
}
```

- [x] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: exit 0. Route `/work/leadership-simulation` appears in the build's route list.

- [x] **Step 3: Commit**

```bash
git add src/app/work/leadership-simulation/page.tsx
git commit -m "$(cat <<'EOF'
feat: add High-Stakes Leadership Role-Play Simulation case study

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Case study page — Technical Product Enablement in 72-Hour Sprints

**Files:**
- Create: `src/app/work/developer-enablement/page.tsx`

**Interfaces:**
- Consumes: `CaseStudyTemplate` from Task 2.

- [x] **Step 1: Create the page**

Create `src/app/work/developer-enablement/page.tsx`:

```tsx
import type { Metadata } from "next";
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate";

export const metadata: Metadata = {
  title: "Technical Product Enablement in 72-Hour Sprints — Jackie Miller",
  description:
    "A rapid ingestion engine turns release notes and PR summaries into customer-facing enablement decks within 72 hours of every release.",
};

export default function DeveloperEnablement() {
  return (
    <CaseStudyTemplate
      eyebrow="Technical Enablement · Rapid Content Systems"
      title="Technical Product Enablement in 72-Hour Sprints"
      meta={[
        { label: "Organization", value: "Enterprise Developer Tooling / Cloud Infrastructure" },
        { label: "Role", value: "Lead Enablement Architect" },
        { label: "Timeline", value: "Continuous 72-Hour Sprint Engine" },
        { label: "AI Security Tier", value: "Air-Gapped Internal Pipeline" },
      ]}
      bottleneck="Bi-weekly software releases meant customer-facing teams (Solutions Architects, Account Executives) were consistently out of sync with product capabilities, resulting in sales cycle stalls and support ticket spikes."
      methodology={[
        "Created a rapid ingestion engine that parses developer release notes, GitHub PR summaries, and Jira tickets.",
        "Automated the generation of interactive customer scenario decks, objection-handling flashcards, and feature-benefit translation matrices.",
      ]}
      governance={[
        "Air-gapped pipeline ensuring unreleased product features remained strictly confidential inside internal firewalls.",
      ]}
      artifact="This engagement's release-note ingestion and translation pipeline follows the same context-bounded extraction pattern used across this site's own prompt architecture — bounded to only the source material provided, with a hard flag on anything it can't verify."
      impact={[
        "Compressed enablement delivery from 14 business days post-release to under 72 hours.",
        "31% decrease in Tier-1 technical escalations during major release windows.",
      ]}
    />
  );
}
```

- [x] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: exit 0. Route `/work/developer-enablement` appears in the build's route list.

- [x] **Step 3: Commit**

```bash
git add src/app/work/developer-enablement/page.tsx
git commit -m "$(cat <<'EOF'
feat: add Technical Product Enablement in 72-Hour Sprints case study

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Rebuild the /work index page

**Files:**
- Modify: `src/app/work/page.tsx` (full rewrite of the page body — hero, card grid, closer; drop "The Approach" and "Working with AI" sections per Jacklyn's explicit direction not to preserve the old correctional-education framing as the page's positioning device)

**Interfaces:**
- Consumes: `caseStudies` (Task 1), `TabletMock` (existing), `ThemeToggle` (existing, newly added to this page for consistency with `/systems` and `/about`).

- [x] **Step 1: Rewrite the page**

Replace the full contents of `src/app/work/page.tsx`:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ThemeToggle from "@/components/ThemeToggle";
import TabletMock from "@/components/case-studies/digital-literacy/TabletMock";
import { caseStudies } from "@/lib/caseStudies";
import "./work.css";

export const metadata: Metadata = {
  title: "Work — Jackie Miller",
  description:
    "Case studies in AI-accelerated instructional design: enterprise onboarding, leadership simulation, and technical enablement, each governed by the same human-in-the-loop protocol.",
};

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <div style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)" }}>
        <main className="max-w-[1080px] mx-auto px-6">
          <section className="pt-16 md:pt-24 lg:pt-28 pb-8 md:pb-12">
            <p className="ds-eyebrow">Velocity & Governance</p>
            <h1
              className="text-4xl md:text-6xl mt-3 mb-4"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 400, lineHeight: 1.04, color: "var(--ink)" }}
            >
              Case studies in <em style={{ color: "var(--ox-accent)" }}>compressed, governed delivery.</em>
            </h1>
            <p className="text-base md:text-lg leading-snug max-w-[62ch]" style={{ color: "var(--ink-mid)" }}>
              Every project below follows the same shape: a strategic bottleneck, an AI-accelerated methodology,
              a governance protocol, and a measurable business outcome — whether the domain is enterprise
              banking, healthcare leadership, or a reentry classroom.
            </p>
          </section>

          <section className="py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-14">
              {caseStudies.map((cs) => (
                <Link key={cs.slug} href={`/work/${cs.slug}`} className="work-card">
                  {cs.live ? (
                    <div className="work-card__cover is-live" aria-label={cs.coverAlt}>
                      <TabletMock lesson={2} />
                    </div>
                  ) : cs.statNum ? (
                    <div className="work-card__cover is-stat">
                      <div>
                        <div className="stat-num">{cs.statNum}</div>
                        <div className="stat-label">{cs.statLabel}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="work-card__cover">
                      <Image src={cs.cover} alt={cs.coverAlt} fill sizes="(max-width: 900px) 100vw, 520px" />
                    </div>
                  )}
                  <div className="work-card__label">
                    <span>{cs.category}</span>
                    <span className="divider" />
                    <span className="disc">{cs.discipline}</span>
                  </div>
                  <h2 className="work-card__title">{cs.title}</h2>
                  <p className="work-card__summary">{cs.summary}</p>
                  <div className="work-card__meta">
                    <span>{cs.role}</span>
                    <span className="spacer" />
                    <span>Read the case study</span>
                    <span className="work-card__arrow">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="wk-closer">
            <p className="wk-closer-line">
              Different domain. Same governed, high-velocity method.
            </p>
            <Link href="/contact" className="ds-btn ds-btn--solid">
              Start a conversation <span aria-hidden="true">→</span>
            </Link>
          </section>
        </main>
      </div>
      <ThemeToggle />
    </>
  );
}
```

- [x] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0. This resolves Task 1's expected type error at this file.

- [x] **Step 3: Commit**

```bash
git add src/app/work/page.tsx
git commit -m "$(cat <<'EOF'
feat: rebuild /work index around enterprise L&D positioning

Replaces the correctional-education-framed hero, "The Approach," and
"Working with AI" sections with the roadmap's meta-header + structured
project grid. Digital Literacy now has equal visual weight alongside the
3 new flagship case studies; Discovering Your Narrative Voice is dropped
from the grid (page stays live at /work/content-review).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Update the homepage's "Selected Work" grid to match

**Files:**
- Modify: `src/app/page.tsx` (the existing "Selected Work" section only — everything else on the homepage is untouched)

**Interfaces:**
- Consumes: `caseStudies` (Task 1), same as Task 6's rendering logic.

- [x] **Step 1: Update the render logic**

In `src/app/page.tsx`, find the `{/* ── SELECTED WORK ── */}` section's `caseStudies.map(...)` block:

```tsx
{caseStudies.map((cs) => (
  <Link key={cs.slug} href={`/work/${cs.slug}`} className="work-card">
    {cs.live ? (
      <div className="work-card__cover is-live" aria-label={cs.coverAlt}>
        <TabletMock lesson={2} />
      </div>
    ) : (
      <div className="work-card__cover">
        <Image src={cs.cover} alt={cs.coverAlt} fill sizes="(max-width: 900px) 100vw, 520px" />
      </div>
    )}
```

Replace with:

```tsx
{caseStudies.map((cs) => (
  <Link key={cs.slug} href={`/work/${cs.slug}`} className="work-card">
    {cs.live ? (
      <div className="work-card__cover is-live" aria-label={cs.coverAlt}>
        <TabletMock lesson={2} />
      </div>
    ) : cs.statNum ? (
      <div className="work-card__cover is-stat">
        <div>
          <div className="stat-num">{cs.statNum}</div>
          <div className="stat-label">{cs.statLabel}</div>
        </div>
      </div>
    ) : (
      <div className="work-card__cover">
        <Image src={cs.cover} alt={cs.coverAlt} fill sizes="(max-width: 900px) 100vw, 520px" />
      </div>
    )}
```

Nothing else in this section (the surrounding `<section>`, the `.hm-sec__head` heading, the closing markup) changes.

- [x] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0. This resolves Task 1's expected type error at this file. Homepage now shows all 4 case studies (Digital Literacy + 3 flagship); content-review no longer appears here either.

- [x] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "$(cat <<'EOF'
feat: update homepage Selected Work grid for the 4-case-study set

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Manual browser verification

**Files:** none (verification only)

- [x] **Step 1: Start the dev server**

Run: `npm run dev`

- [x] **Step 2: Verify in a real browser, fresh tab / hard load for each URL (per AUTHORITIES.md's deploy-verify gate, and per Phase 1's lesson that client-side nav can mask a rendering bug a hard load exposes)**

Visit `/work` directly and confirm:
- New hero copy renders, no leftover correctional-education framing.
- 4 cards render: Digital Literacy (real cover image), the 3 flagship studies (dark stat-face cards with their stat number/label), in a 2-column grid at desktop width.
- No trace of "Discovering Your Narrative Voice" / content-review anywhere on this page.
- Closer CTA and `ThemeToggle` present and working.

Visit `/` (homepage) and confirm the Selected Work section shows the same 4 cards, content-review gone.

Visit `/work/content-review` directly and confirm the page still loads normally (untouched, just unlisted).

Visit each of `/work/fintech-systems-onboarding`, `/work/leadership-simulation`, `/work/developer-enablement` directly (hard load) and confirm:
- All 5 tiers render in order with the correct copy.
- The Enterprise Security Note footer text is present verbatim.
- The "See the underlying prompt architecture →" link goes to `/systems#governance` and works.
- "← Back to all work" link works.

Toggle dark/light mode on `/work` and on one case study page; confirm no unstyled flashes, no dark-body-bleed-through gutters (the specific bug class found in Phase 1 — check at a viewport wider than 1080px too).

- [x] **Step 3: Report back**

Note any visual issues found for follow-up — do not silently patch and move on without flagging what broke.

---

## Self-Review Notes

- **Spec coverage:** 5-Tier Case Study Architecture ✓ (Task 2), 3 flagship case studies ✓ (Tasks 3-5), Security Footnote disclosure ✓ (Task 2, verbatim), `/work` meta-header + structured card grid ✓ (Task 6), Digital Literacy equal weight ✓ (Task 6/7 — same card treatment, no visual demotion), content-review delisted-not-deleted ✓ (Task 1). **Not in this phase, by design:** the live persona sandbox and interactive velocity visualizer (Phase 4 — needs an API backend); `/contact` dual-track router (Phase 3).
- **Placeholder scan:** clean — every task has real, complete code and real, roadmap-sourced or explicitly-authored-and-labeled copy; no `{{...}}` or TODO markers.
- **Type consistency:** `CaseStudyTemplateProps` is defined once in Task 2 and consumed identically by Tasks 3-5; `CaseStudy`'s new optional fields (Task 1) are consumed identically in Tasks 6 and 7's render logic.

## Status: Shipped (2026-09-10)

All 8 tasks complete, executed subagent-driven. Final commit: `6dceb46` on `feature/enterprise-ld-rebrand`.

## Deviations & fixes found in final review

The final whole-branch review (opus) found the architecture, token/utility discipline, numeric consistency across all three case-study surfaces, and Content Review's untouched status to all be clean — no Critical findings in the original implementation. One consolidated fix pass (`6dceb46`) addressed everything below, re-reviewed clean:

1. **Real-world case-study slugs were renamed** at Jacklyn's explicit request, after the plan shipped: `fintech-systems-onboarding` → `fintech-systems-migration`, `leadership-simulation` → `high-stakes-leadership-simulation`, `developer-enablement` → `technical-product-enablement`. Done via `git mv` to preserve history; `caseStudies.ts`'s `slug` fields updated to match; verified zero live-source references to the old slugs survive.
2. **A real former employer's name was generalized out of fabricated content.** The leadership-simulation case study originally cited "Character.ai behavioral modeling techniques" — Character.AI is Jacklyn's real former employer, named inside an admittedly-synthesized client engagement. Changed to "advanced persona modeling and behavioral conditioning techniques" at her explicit request.
3. **The disclosure the plan shipped with wasn't strong enough, and Jacklyn asked for more.** The Security Footnote text (pulled verbatim from the roadmap) reads as "we protected a real client's data," not "this engagement didn't happen" — and nothing distinguished the 3 fabricated studies from Digital Literacy's real one in either grid. Added: a visible "Demonstration" chip on the flagship cards' label row in both `/work` and the homepage grid (gated on `caseStudies.ts`'s pre-existing but previously-unused `isDemonstration` field), and the `CaseStudyTemplate`'s footnote now renders the roadmap's own more explicit "Demonstration Artifact: ...synthesized for portfolio demonstration..." text when `isDemonstration` is true, falling back to the original Security Note otherwise (so a future real case study built on this template still gets the correct copy).
4. **`/systems#governance` was a dead anchor** — that id only exists on the homepage, not `/systems`. The Instructional Artifact tier's "See the underlying prompt architecture →" link on all 3 case studies was silently landing at the top of `/systems` instead of the Prompt & Scaffolding Vault. Added `id="vault"` to that section and fixed the link.
5. **One stat label conflated two different metrics.** The FinTech case study's card said "78% Faster Time-to-Certification," but 78% is a production-time reduction and 94% is the actual certification pass rate. Relabeled to "Faster Content Production."
6. **`/work`'s closer section had doubled horizontal padding** after the Task 6 rewrite nested it inside a new `<main>` wrapper that already provided the same max-width/padding as the old standalone `.wk-closer` rule. Removed `.wk-closer` from the old shared-column CSS selector.
7. **5 section-tier labels were `<p>` elements with no real heading**, leaving each case study page with a single `<h1>` and no document outline for 6 sections. Changed to `<h2>` (same class, same text).
8. Two small accessibility items: `role="list"` on 3 bulleted lists (Safari/VoiceOver drops list semantics with `list-style: none` and no explicit role); arrow glyphs in link text wrapped in `aria-hidden` spans so they don't get announced as part of the accessible name.

**Not addressed, flagged for a human decision:**
- `work.css` has ~90 lines of now-orphaned selectors from the old `/work` hero/Approach/AI-work sections Task 6 removed (`.wk-hero`, `.wk-thesis`, `.wk-sub`, `.wk-constraints`, `.ds-index__row/t/d`, `.wk-ai-grid`, `.wk-ai-card`, `.wk-lead`, `.wk-note`, plus `.wk-block`/`.wk-hero` themselves after fix #6 above). Doesn't break anything — dead CSS, not a bug — but worth a cleanup pass.
- `caseStudies.ts`'s `live: true` branch (and the `TabletMock` import it requires in both grid files) has been unreachable since before this phase — no entry sets `live: true`. Pre-existing, not a regression, but the natural moment to remove it was this phase's grid rewrites.
- The exported function names on 2 of the 3 renamed case-study pages (`FintechSystemsOnboarding`, `DeveloperEnablement`) still reflect the old slugs — cosmetic only, Next.js doesn't care, but a future reader might.
- No `CaseNav`-style "next case study" link exists between the 3 new flagship studies (only "← Back to all work" on each); Digital Literacy and Content Review still link to each other in a closed loop. A real cross-case-study nav ring is a Phase 3-sized decision, not a defect in this phase.
