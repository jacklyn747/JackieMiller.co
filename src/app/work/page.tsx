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
