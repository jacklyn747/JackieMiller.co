import { existsSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ThemeToggle from "@/components/ThemeToggle";
import TabletMock from "@/components/case-studies/digital-literacy/TabletMock";
import GovernanceAccordion from "@/components/GovernanceAccordion";
import { caseStudies } from "@/lib/caseStudies";
import "./home.css";
import "./work/work.css";

export const metadata: Metadata = {
  title: "Jackie Miller — High-Velocity Learning Architecture",
  description:
    "Senior Learning Experience Architect & AI Workflow Lead. Compressing enterprise learning production timelines 3x–5x through LLM orchestration and synthetic persona simulation — secured by zero-data-retention, human-in-the-loop governance.",
  openGraph: {
    title: "Jackie Miller — High-Velocity Learning Architecture. Governed Enterprise AI.",
    description:
      "Senior Learning Experience Architect & AI Workflow Lead. Compressing enterprise learning production timelines 3x–5x through LLM orchestration and synthetic persona simulation.",
    url: "https://jackiemiller.co",
    siteName: "Jackie Miller",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jackie Miller — High-Velocity Learning Architecture. Governed Enterprise AI.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jackie Miller — High-Velocity Learning Architecture. Governed Enterprise AI.",
    description:
      "Senior Learning Experience Architect & AI Workflow Lead. Compressing enterprise learning production timelines 3x–5x through LLM orchestration and synthetic persona simulation.",
    images: ["/og.png"],
  },
};

// The homepage About-teaser frame is a 4:5 vertical, so it prefers its own
// portrait-home crop and falls back to the shared about/portrait if absent.
// Coupling note: that fallback means if portrait-home.* is ever removed
// while portrait.* still exists, this function and findHeroPortrait() below
// will resolve to the same file — the hero and About-teaser will silently
// show the same photo instead of the deliberate pair they're meant to be.
// Keep that in mind before deleting either asset.
function findPortrait(): string | null {
  for (const base of ["portrait-home", "portrait"]) {
    for (const ext of ["jpg", "jpeg", "png", "webp"]) {
      const rel = `about/${base}.${ext}`;
      if (existsSync(path.join(process.cwd(), "public", rel))) return `/${rel}`;
    }
  }
  return null;
}

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

const PROOF = [
  <>MEd · <b>Instructional Design</b></>,
  <>Trained LLMs at <b>Character.AI</b></>,
  <>Built a <b>live, playable course</b></>,
];

type Pillar = { n: string; t: string; d: string };
const PILLARS: Pillar[] = [
  {
    n: "01",
    t: "Applied AI Workflow Acceleration",
    d: "The Velocity Layer. Transforming unstructured SME transcripts, technical roadmaps, and fragmented documentation into structured instructional outlines, branching storyboards, and interactive exercises in hours. We eliminate mechanical drag so instructional craft can focus on deep impact.",
  },
  {
    n: "02",
    t: "Dynamic Persona & Simulation Architecture",
    d: "The Immersive Layer. Leveraging advanced conversational modeling to build responsive, role-specific agents. Learners navigate difficult conversations, complex sales objections, and leadership challenges with synthetic stakeholders that react with authentic behavioral fidelity.",
  },
  {
    n: "03",
    t: "Strict Enterprise IP & Data Sandboxing",
    d: "The Trust Layer. No corporate secrets in public training models. Ever. All workflow acceleration is executed within zero-data-retention APIs, air-gapped instances, or sanitized local environments. Your IP remains your IP.",
  },
  {
    n: "04",
    t: "Human-in-the-Loop Pedagogical Rigor",
    d: "The Integrity Layer. AI generates the baseline; human expertise approves the artifact. Every module is verified against adult learning principles, cognitive load thresholds, and company-specific compliance standards before it ever reaches a learner.",
  },
];

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

// Testimonials render only when real quotes exist — no placeholder fakes.
const TESTIMONIALS: { quote: string; name: string; role: string }[] = [];

export default function Home() {
  const portrait = findPortrait();
  const heroPortrait = findHeroPortrait();

  return (
    <>
      <SiteNav />
      <main className="home">
        {/* ── HERO ── */}
        <section className="hm hm-hero">
          <div className="hm-hero__lede">
            <p className="ds-eyebrow">Jackie Miller · Senior Learning Experience Architect & AI Workflow Lead</p>
            <h1 className="hm-hero__title">
              High-Velocity Learning Architecture. <em>Governed Enterprise AI.</em>
            </h1>
            <p className="hm-hero__sub">
              Most enterprise learning teams are trapped between two extremes: traditional 16-week
              production bottlenecks that lag behind business change, or unvetted AI experiments that
              leak proprietary data and output sterile content. I engineer the high-performance middle
              ground — uniting classical learning science with private LLM orchestration and synthetic
              persona simulations to compress development timelines by 3x–5x, secured by strict
              human-in-the-loop governance.
            </p>
            <ul className="flex flex-wrap gap-3 mt-2 p-0 list-none" aria-label="Trust signals">
              <li
                className="flex flex-col gap-1 max-w-[220px] rounded-2xl px-5 py-3 border-[0.5px]"
                style={{ borderColor: "var(--ink-dim)" }}
              >
                <span className="text-xs font-bold tracking-[0.01em]" style={{ color: "var(--ink)" }}>
                  3x–5x Delivery Compression
                </span>
                <span className="text-[11px] leading-snug" style={{ color: "var(--ink-mid)" }}>
                  From SME discovery to high-fidelity pilot.
                </span>
              </li>
              <li
                className="flex flex-col gap-1 max-w-[220px] rounded-2xl px-5 py-3 border-[0.5px]"
                style={{ borderColor: "var(--ink-dim)" }}
              >
                <span className="text-xs font-bold tracking-[0.01em]" style={{ color: "var(--ink)" }}>
                  Zero-Data-Retention Security
                </span>
                <span className="text-[11px] leading-snug" style={{ color: "var(--ink-mid)" }}>
                  Private sandbox isolation for all enterprise IP.
                </span>
              </li>
              <li
                className="flex flex-col gap-1 max-w-[220px] rounded-2xl px-5 py-3 border-[0.5px]"
                style={{ borderColor: "var(--ink-dim)" }}
              >
                <span className="text-xs font-bold tracking-[0.01em]" style={{ color: "var(--ink)" }}>
                  Cognitive Rigor Guaranteed
                </span>
                <span className="text-[11px] leading-snug" style={{ color: "var(--ink-mid)" }}>
                  Every objective anchored in measurable behavioral change.
                </span>
              </li>
            </ul>
            <div className="hm-hero__cta">
              <Link href="/systems" className="ds-btn ds-btn--solid">
                Explore the Production Systems <span aria-hidden="true">→</span>
              </Link>
              <Link href="#governance" className="ds-btn ds-btn--ghost">
                Review the AI Governance Charter
              </Link>
            </div>
          </div>
          <div className="hm-hero__art">
            {heroPortrait ? (
              <div className="hm-hero__portrait">
                <Image
                  src={heroPortrait}
                  alt="Jackie Miller, portrait"
                  fill
                  priority
                  sizes="(max-width: 900px) 90vw, 500px"
                />
              </div>
            ) : (
              <div className="hm-hero__portrait is-empty">Portrait</div>
            )}
          </div>
        </section>

        {/* ── PROOF STRIP ── */}
        <section className="hm-proof" aria-label="Credentials at a glance">
          <div className="hm-proof__in">
            {PROOF.map((item, i) => (
              <span key={i} className="hm-proof__item">
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* ── THE MODERN L&D DILEMMA ── */}
        <section className="hm hm-sec" id="dilemma">
          <div className="hm-sec__head">
            <p className="ds-eyebrow">The Production Reality</p>
            <h2 className="hm-sec__title">
              Why the next generation of enterprise learning requires <em>a new operational standard.</em>
            </h2>
            <p className="hm-sec__intro">
              Speed without governance is an enterprise compliance disaster. Governance without speed is
              an organizational bottleneck. Generative models have made it possible to rapidly extract
              expertise, scaffold complex scenarios, and deploy interactive simulations in days rather
              than quarters — but off-the-shelf prompts and public consumer tools create hallucination
              risks, IP exposure, and generic learner fatigue. True acceleration requires an architect who
              understands both sides of the glass: the computational mechanics of system prompts and
              behavioral persona parameters, and the human psychology of cognitive load, narrative
              immersion, and enterprise accountability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-8 md:mt-12">
            <div className="rounded-[18px] p-6 md:p-8 border-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
              <p className="ds-eyebrow ds-eyebrow--solo">The Traditional Bottleneck</p>
              <ul className="flex flex-col gap-3 mt-4 p-0 list-none">
                {[
                  "12–16 week development cycles.",
                  "SME interview transcripts gathering dust.",
                  "Static multiple-choice click-through quizzes.",
                  "Fear-driven paralysis regarding AI adoption.",
                ].map((line) => (
                  <li key={line} className="relative pl-[18px] text-[15px] leading-snug" style={{ color: "var(--ink-mid)" }}>
                    <span
                      className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--ink-dim)" }}
                      aria-hidden="true"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-[18px] p-6 md:p-8 border-[0.5px]"
              style={{ borderColor: "var(--ox-dim)", background: "color-mix(in srgb, var(--ox) 4%, transparent)" }}
            >
              <p className="ds-eyebrow ds-eyebrow--solo">The Jackie Miller Engine</p>
              <ul className="flex flex-col gap-3 mt-4 p-0 list-none">
                {[
                  "2–3 week agile sprint cycles.",
                  "LLM-driven thematic synthesis and rapid storyboarding.",
                  "Dynamic, multi-turn synthetic persona simulations (role-plays).",
                  "Strict private-sandbox protocols ensuring zero data leakage.",
                ].map((line) => (
                  <li key={line} className="relative pl-[18px] text-[15px] leading-snug" style={{ color: "var(--ink)" }}>
                    <span
                      className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--ox-accent)" }}
                      aria-hidden="true"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 4 OPERATING PILLARS ── */}
        <section className="hm hm-sec hm-sec--alt" id="pillars">
          <div className="hm-sec__head">
            <p className="ds-eyebrow">The Operating System</p>
            <h2 className="hm-sec__title">
              Four pillars, <em>one governed pipeline.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7 mt-8 lg:mt-12">
            {PILLARS.map((p) => (
              <div key={p.t} className="pillar-card rounded-2xl p-5 lg:p-7" style={{ background: "var(--paper)" }}>
                <span className="block text-[13px] mb-2.5" style={{ fontFamily: "var(--font-serif)", color: "var(--ox-accent)" }}>
                  {p.n}
                </span>
                <h3 className="text-base font-bold mb-2.5" style={{ color: "var(--ink)" }}>
                  {p.t}
                </h3>
                <p className="text-[13.5px] leading-snug" style={{ color: "var(--ink-mid)" }}>
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ENTERPRISE AI SAFETY & GOVERNANCE ── */}
        <section className="hm hm-sec" id="governance">
          <div className="hm-sec__head">
            <p className="ds-eyebrow">Enterprise AI Safety & Governance</p>
            <h2 className="hm-sec__title">
              Ask your CISO. <em>We already answered.</em>
            </h2>
          </div>
          <GovernanceAccordion />
        </section>

        {/* ── SELECTED WORK ── */}
        <section className="hm hm-sec">
          <div className="hm-sec__head">
            <p className="ds-eyebrow">Selected Work</p>
            <h2 className="hm-sec__title">
              Case studies in <em>compressed, governed delivery.</em>
            </h2>
          </div>
          <div className="wk-cards">
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
                  {cs.isDemonstration && (
                    <>
                      <span className="divider" />
                      <span style={{ color: "var(--ox-accent)" }}>Demonstration</span>
                    </>
                  )}
                </div>
                <h3 className="work-card__title">{cs.title}</h3>
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

        {/* ── ABOUT TEASER ── */}
        <section className="hm hm-sec hm-about">
          <div className="hm-about__grid">
            <div>
              <p className="ds-eyebrow">About</p>
              <h2 className="hm-sec__title">Education is in my blood.</h2>
              <p className="hm-sec__intro">
                A superintendent grandfather, a librarian grandmother, two lifelong-teacher aunts — and a
                creative-writing degree that taught me to build a story people actually want to finish. I
                came up through art, photography, and words, and instructional design is the one field that
                lets me use all of it at once.
              </p>
              <div className="hm-cta-inline">
                <Link href="/about" className="ds-btn ds-btn--ghost">
                  More about me <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            {portrait ? (
              <div className="hm-about__portrait">
                <Image src={portrait} alt="Jackie Miller, seated portrait" fill sizes="(max-width: 820px) 100vw, 360px" />
              </div>
            ) : (
              <div className="hm-about__portrait is-empty">Portrait</div>
            )}
          </div>
        </section>

        {/* ── HOW I WORK ── */}
        <section className="hm hm-sec">
          <div className="hm-sec__head">
            <p className="ds-eyebrow">How I Work</p>
            <h2 className="hm-sec__title">
              The craft decisions behind <em>every accelerated delivery.</em>
            </h2>
          </div>
          <div className="hm-how__grid">
            {HOW.map((c, i) => (
              <div key={c.t} className="hm-card">
                {c.icon ? (
                  // decorative — the card title carries the meaning, so the icon is aria-hidden
                  <Image src={c.icon} alt="" width={c.iw!} height={c.ih!} className="hm-card__icon" />
                ) : (
                  <span className="hm-card__n">{String(i + 1).padStart(2, "0")}</span>
                )}
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS (renders only when real quotes exist) ── */}
        {TESTIMONIALS.length > 0 && (
          <section className="hm hm-sec hm-sec--alt" aria-label="Testimonials">
            {/* filled in once real quotes are gathered */}
          </section>
        )}

        {/* ── CLOSING CTA ── */}
        <section className="hm-close">
          <div className="hm">
            <p className="hm-close__line">
              Let&apos;s make learning <em>worth someone&apos;s time.</em>
            </p>
            <Link href="/contact" className="ds-btn ds-btn--ghost ds-btn--dark">
              Start a conversation <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="hm-foot">
          <div className="hm-foot__in">
            <span className="hm-foot__mark">Jackie Miller</span>
            <nav className="hm-foot__links" aria-label="Footer">
              <Link href="/systems">Systems</Link>
              <Link href="/work">Work</Link>
              <Link href="/about">About</Link>
              <Link href="/field-notes">Field Notes</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </footer>
      </main>
      <ThemeToggle />
    </>
  );
}
