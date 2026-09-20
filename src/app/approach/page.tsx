import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import "../work/work.css";
import "./approach.css";

export const metadata: Metadata = {
  title: "Approach — Jackie Miller",
  description:
    "The learning-design philosophy behind every project I ship — six commitments, the frameworks they're grounded in, and where AI fits in the process.",
};

const PRINCIPLES = [
  { t: "Start from the real stakes", d: "Design backward from the moment the skill actually gets used — the interview, the job center — not the syllabus." },
  { t: "Prototype, don't propose", d: "Build it playable and iterate (SAM / LXD), instead of handing over a document and hoping." },
  { t: "Grounded in learning science", d: "Cognitive load, retrieval practice, Merrill's First Principles, andragogy — why it works, not just what looks good." },
  { t: "Aesthetics are instruction", d: "How a screen feels decides whether a learner will risk a mistake. Craft is pedagogy, not decoration." },
  { t: "Designed for dignity & access", d: "Trauma-informed pacing, UDL, and the real environment — locked devices, no internet — as the starting point." },
  { t: "Made with AI, judged by a human", d: "AI accelerates the build; the call on what's accurate and worth teaching stays mine." },
];

const FRAMEWORKS: { group: string; items: string[] }[] = [
  { group: "Foundational Models", items: ["ADDIE", "SAM", "Backward Design", "Merrill's First Principles"] },
  { group: "Learning Theory", items: ["Andragogy", "Constructivism", "Cognitive Load", "Scaffolding", "Multimodal"] },
  { group: "Inclusive & Trauma-Informed Design", items: ["Trauma-Informed", "UDL", "Accessibility (WCAG)", "Learner Autonomy"] },
  { group: "Evaluation", items: ["Kirkpatrick"] },
];

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

export default function ApproachPage() {
  return (
    <>
      <SiteNav />
      <main className="work-page">
        {/* ── Hero: the thesis, straight from how she actually talks about the work ── */}
        <section className="wk-hero">
          <div className="ds-eyebrow">
            <span>Philosophy &amp; Frameworks</span>
          </div>
          <h1 className="wk-thesis">
            If a learner struggles, I ask what <em>we</em> designed badly first.
          </h1>
          <p className="wk-sub">
            Six commitments run under every project I ship — grounded in learning science, tested against the
            hardest environment I design for: incarceration and reentry. The same commitments hold anywhere the
            stakes are real and the margin for a confusing screen is zero.
          </p>
        </section>

        {/* ── The six principles — reused from /work, this is now their home ── */}
        <section className="wk-block">
          <div className="ds-eyebrow"><span>The Approach</span></div>
          <p className="wk-approach-lead">
            Learning designed to be <em>experienced,</em> not endured.
          </p>
          <div className="wk-approach ds-index">
            {PRINCIPLES.map((a) => (
              <div key={a.t} className="ds-index__row" tabIndex={0}>
                <h3 className="ds-index__t">{a.t}</h3>
                <p className="ds-index__d">{a.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── The frameworks every case study is tagged against ── */}
        <section className="wk-block">
          <div className="ds-eyebrow"><span>Grounded In</span></div>
          <p className="ap-fw-lead">
            Every &ldquo;Grounded in&rdquo; tag on a case study points back here.
          </p>
          <div className="ap-fw-groups">
            {FRAMEWORKS.map((g) => (
              <div key={g.group} className="ap-fw-group">
                <h3 className="ap-fw-group__t">{g.group}</h3>
                <ul className="ap-fw-group__list">
                  {g.items.map((t) => (
                    <li key={t} className="ds-chip">{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Working with AI — moved here from /work, this is a methodology question ── */}
        <section className="wk-block">
          <div className="ds-eyebrow"><span>Working with AI</span></div>
          <p className="wk-lead">AI is my force-multiplier — I direct the instructional design; AI accelerates the build.</p>
          <div className="ap-ai-layout">
            <div className="ap-ai-photo">
              <Image src="/approach/working.jpg" alt="Jackie Miller working at her laptop" fill sizes="(max-width: 820px) 100vw, 320px" />
            </div>
            <div className="wk-ai-grid">
              {AI_WORK.map((a) => (
                <div key={a.t} className="wk-ai-card">
                  <h3>{a.t}</h3>
                  <p>{a.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closer: send them to see it applied ── */}
        <section className="wk-closer">
          <p className="wk-closer-line">See these six commitments applied, not just stated.</p>
          <Link href="/work" className="ds-btn ds-btn--solid">
            See the work <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
    </>
  );
}
