import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import TabletMock from "@/components/case-studies/digital-literacy/TabletMock";
import { caseStudies } from "@/lib/caseStudies";
import "./work.css";

export const metadata: Metadata = {
  title: "Work — Jackie Miller",
  description:
    "Instructional design for correctional education — building learning experiences around the realities of incarceration, not despite them.",
};

const CONSTRAINTS = ["No open internet", "Shared, locked-down devices", "Variable literacy", "No IT support"];

const AI_WORK = [
  {
    t: "Trained LLMs, from the inside",
    d: "At Character.AI I wrote and evaluated thousands of dialogue examples alongside ML engineers — I know these models as materials, not magic.",
  },
  {
    t: "Built my own AI tools",
    d: "A RAG instructional-design assistant (LangChain, ChromaDB) that answers design questions against my own source library, with citations.",
  },
  {
    t: "Built this course with AI",
    d: "The Digital Literacy course and its live simulation — I directed the design; AI accelerated the build from storyboard to prototype.",
  },
  {
    t: "AI-native production",
    d: "Prompt-chained drafting, structuring, and quality-checking — more output, the same judgment over what's accurate and worth teaching.",
  },
];

const APPROACH = [
  { t: "Start from the real stakes", d: "Design backward from the moment the skill actually gets used — the interview, the job center — not the syllabus." },
  { t: "Prototype, don't propose", d: "Build it playable and iterate (SAM / LXD), instead of handing over a document and hoping." },
  { t: "Grounded in learning science", d: "Cognitive load, retrieval practice, Merrill's First Principles, andragogy — why it works, not just what looks good." },
  { t: "Aesthetics are instruction", d: "How a screen feels decides whether a learner will risk a mistake. Craft is pedagogy, not decoration." },
  { t: "Designed for dignity & access", d: "Trauma-informed pacing, UDL, and the real environment — locked devices, no internet — as the starting point." },
  { t: "Made with AI, judged by a human", d: "AI accelerates the build; the call on what's accurate and worth teaching stays mine." },
];

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main className="work-page">
        {/* ── Hero: thesis + one line + scannable constraints ── */}
        <section className="wk-hero">
          <div className="wk-eyebrow">
            <span>Instructional Design · Correctional Education</span>
          </div>
          <h1 className="wk-thesis">
            Designing for learners is one thing. Designing for learners <em>inside</em> is another.
          </h1>
          <p className="wk-sub">
            I build learning for incarcerated and reentry-bound adults — designed around the realities of the
            environment, not despite them.
          </p>
          <ul className="wk-constraints" aria-label="The realities I design around">
            {CONSTRAINTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {/* ── Selected Work: cards, high on the page ── */}
        <section className="wk-block">
          <div className="wk-label"><span>Selected Work</span></div>
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

        {/* ── The Approach: an editorial manifesto index, not a box grid ── */}
        <section className="wk-block">
          <div className="wk-label"><span>The Approach</span></div>
          <p className="wk-approach-lead">
            Learning designed to be <em>experienced,</em> not endured.
          </p>
          <div className="wk-approach ds-index">
            {APPROACH.map((a) => (
              <div key={a.t} className="ds-index__row" tabIndex={0}>
                <h3 className="ds-index__t">{a.t}</h3>
                <p className="ds-index__d">{a.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Working with AI: compact module, not an essay ── */}
        <section className="wk-block">
          <div className="wk-label"><span>Working with AI</span></div>
          <p className="wk-lead">AI is my force-multiplier — I direct the instructional design; AI accelerates the build.</p>
          <div className="wk-ai-grid">
            {AI_WORK.map((a) => (
              <div key={a.t} className="wk-ai-card">
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Closer + CTA ── */}
        <section className="wk-closer">
          <p className="wk-closer-line">Different environment. Different problems. Different design.</p>
          <Link href="/contact" className="wk-cta">
            Start a conversation <span aria-hidden="true">→</span>
          </Link>
          <p className="wk-note">More case studies in progress.</p>
        </section>
      </main>
    </>
  );
}
