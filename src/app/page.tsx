import { existsSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ThemeToggle from "@/components/ThemeToggle";
import TabletMock from "@/components/case-studies/digital-literacy/TabletMock";
import { caseStudies } from "@/lib/caseStudies";
import "./home.css";
import "./work/work.css";

export const metadata: Metadata = {
  title: "Jackie Miller — Instructional Designer",
  description:
    "Jackie Miller designs learning people actually want to do — built around real people, real constraints, and the belief that learning is the way out.",
};

// Portrait appears once dropped at public/about/portrait.(jpg|jpeg|png|webp).
function findPortrait(): string | null {
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

// Testimonials render only when real quotes exist — no placeholder fakes.
const TESTIMONIALS: { quote: string; name: string; role: string }[] = [];

export default function Home() {
  const portrait = findPortrait();

  return (
    <>
      <SiteNav />
      <main className="home">
        {/* ── HERO ── */}
        <section className="hm hm-hero">
          <div className="hm-hero__lede">
            <p className="ds-eyebrow">Instructional Designer</p>
            <h1 className="hm-hero__title">
              Most learning is boring. <em>Mine isn&apos;t.</em>
            </h1>
            <p className="hm-hero__sub">
              I&apos;m Jackie Miller. I design learning people actually want to do — built around real
              people, real constraints, and the belief that learning is the way out.
            </p>
            <div className="hm-hero__cta">
              <Link href="/work" className="ds-btn ds-btn--solid">
                See the work <span aria-hidden="true">→</span>
              </Link>
              <Link href="/about" className="ds-btn ds-btn--ghost">
                Read my story
              </Link>
            </div>
          </div>
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

        {/* ── SELECTED WORK ── */}
        <section className="hm hm-sec">
          <div className="hm-sec__head">
            <p className="ds-eyebrow">Selected Work</p>
            <h2 className="hm-sec__title">
              Courses built to be <em>worth someone&apos;s time.</em>
            </h2>
          </div>
          <div className="wk-cards">
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
                <div className="work-card__label">
                  <span>{cs.category}</span>
                  <span className="divider" />
                  <span className="disc">{cs.discipline}</span>
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
                <Image src={portrait} alt="Jackie Miller" fill sizes="(max-width: 820px) 100vw, 360px" />
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
              A designer who thinks learning should look like something you&apos;d <em>choose</em> to do.
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
