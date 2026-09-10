import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import ThemeToggle from "@/components/ThemeToggle";
import PromptVault from "@/components/PromptVault";

export const metadata: Metadata = {
  title: "Systems — Jackie Miller",
  description:
    "The High-Velocity ADDIE Pipeline: how enterprise learning production compresses from 16 weeks to 3 weeks, and the sanitized prompt architecture behind it.",
};

type Stage = { n: string; t: string; traditional: string; accelerated: string };
const STAGES: Stage[] = [
  {
    n: "01",
    t: "Analysis & SME Discovery",
    traditional: "4 weeks of scheduling, scattered notes, manual transcript coding.",
    accelerated:
      "Raw SME interviews are run through sanitized, private LLM synthesis pipelines to extract core competencies, edge-case failure modes, and learning gaps in under 24 hours.",
  },
  {
    n: "02",
    t: "Design & Narrative Scaffolding",
    traditional: "3 weeks of manual storyboard writing and slide iteration.",
    accelerated:
      "Multi-tiered prompt chaining generates structured scenario branches, rubric-aligned learning objectives, and initial interactive storyboards for immediate stakeholder review.",
  },
  {
    n: "03",
    t: "Persona Architecture & Simulation Build",
    traditional: "Static branching text with predictable, binary choice trees.",
    accelerated:
      "Synthetic personas are built with defined emotional thresholds, behavioral rules, and specific knowledge boundaries. Learners engage in dynamic dialogue where the persona responds to empathy, technical accuracy, or negotiation tactics.",
  },
  {
    n: "04",
    t: "Governance, Verification & Build",
    traditional: "Ship-and-hope: no standardized human review gate.",
    accelerated:
      "Enterprise authoring (Storyline, Rise, custom LMS modules) paired with rigorous human-in-the-loop factual audits. Every scenario is tested against cognitive load limits and company compliance — 100% human-governed.",
  },
];

export default function Systems() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="max-w-[1120px] mx-auto px-6">
        <section className="pt-16 md:pt-24 lg:pt-28 pb-8 md:pb-12">
          <p className="ds-eyebrow">Applied Methodology</p>
          <h1
            className="text-4xl md:text-6xl mt-3 mb-4"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 400, lineHeight: 1.02, color: "var(--ink)" }}
          >
            The High-Velocity ADDIE Pipeline
          </h1>
          <p className="text-base md:text-lg leading-snug max-w-[62ch]" style={{ color: "var(--ink-mid)" }}>
            How enterprise learning production compresses from a 16-week baseline to a 3-week
            sprint — without cutting pedagogical corners.
          </p>
        </section>

        <section className="py-10 md:py-16">
          <div className="flex flex-col gap-8 md:gap-11">
            {STAGES.map((s) => (
              <div key={s.n} className="border-t-[0.5px] pt-5 md:pt-8" style={{ borderColor: "var(--ink-dim)" }}>
                <div className="flex items-baseline gap-3.5 mb-4">
                  <span className="text-base" style={{ fontFamily: "var(--font-serif)", color: "var(--ox-accent)" }}>
                    {s.n}
                  </span>
                  <h2 className="text-lg md:text-xl font-bold" style={{ color: "var(--ink)" }}>
                    {s.t}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-7">
                  <div className="rounded-2xl p-4 md:p-5 border-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
                    <p className="ds-eyebrow ds-eyebrow--solo">Traditional</p>
                    <p className="mt-2 text-sm leading-snug" style={{ color: "var(--ink-mid)" }}>
                      {s.traditional}
                    </p>
                  </div>
                  <div
                    className="rounded-2xl p-4 md:p-5 border-[0.5px]"
                    style={{ borderColor: "var(--ox-dim)", background: "color-mix(in srgb, var(--ox) 4%, transparent)" }}
                  >
                    <p className="ds-eyebrow ds-eyebrow--solo">Accelerated</p>
                    <p className="mt-2 text-sm leading-snug" style={{ color: "var(--ink)" }}>
                      {s.accelerated}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="mb-6">
            <p className="ds-eyebrow">Prompt & Scaffolding Vault</p>
            <h2 className="hm-sec__title">
              Sanitized architecture, <em>inspectable in the open.</em>
            </h2>
          </div>
          <PromptVault />
        </section>
      </main>
      <ThemeToggle />
    </>
  );
}
