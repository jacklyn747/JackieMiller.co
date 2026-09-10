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
  isDemonstration?: boolean;
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
  isDemonstration,
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
            <h2 className="ds-eyebrow ds-eyebrow--solo mb-4">The Strategic Bottleneck</h2>
            <p className="text-base leading-relaxed max-w-[68ch]" style={{ color: "var(--ink-mid)" }}>
              {bottleneck}
            </p>
          </section>

          <section className="py-8 md:py-10 border-t-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
            <h2 className="ds-eyebrow ds-eyebrow--solo mb-4">The AI-Accelerated Methodology</h2>
            <ul className="flex flex-col gap-3 p-0 list-none" role="list">
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
            <h2 className="ds-eyebrow ds-eyebrow--solo mb-4">Enterprise Data Governance & Privacy Protocol</h2>
            <ul className="flex flex-col gap-3 p-0 list-none" role="list">
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
            <h2 className="ds-eyebrow ds-eyebrow--solo mb-4">The Instructional Artifact</h2>
            <p className="text-base leading-relaxed max-w-[68ch]" style={{ color: "var(--ink-mid)" }}>
              {artifact}{" "}
              <Link href="/systems#vault" className="underline" style={{ color: "var(--ox-accent)" }}>
                See the underlying prompt architecture <span aria-hidden="true">→</span>
              </Link>
            </p>
          </section>

          <section className="py-8 md:py-10 border-t-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
            <h2 className="ds-eyebrow ds-eyebrow--solo mb-4">Measurable Business & Efficiency Impact</h2>
            <ul className="flex flex-col gap-3 p-0 list-none" role="list">
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
              {isDemonstration
                ? "Demonstration Artifact: All organizational data, transcripts, and persona dialogue synthesized for portfolio demonstration in compliance with enterprise NDAs."
                : "Enterprise Security Note: All proprietary data and SME transcripts shown have been fully anonymized, synthesized, or demonstrated within sandboxed non-public environments."}
            </p>
          </section>

          <section className="py-10 md:py-14">
            <Link href="/work" className="ds-btn ds-btn--ghost">
              <span aria-hidden="true">←</span> Back to all work
            </Link>
          </section>
        </main>
      </div>
      <ThemeToggle />
    </>
  );
}
