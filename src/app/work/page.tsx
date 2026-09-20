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

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main className="work-page" id="main-content">
        {/* ── Hero: thesis + one line + scannable constraints ── */}
        <section className="wk-hero">
          <div className="ds-eyebrow">
            <span>Instructional Design · Correctional Education</span>
          </div>
          <h1 className="wk-thesis">
            Designing for learners is one thing. Designing for learners <span className="ds-punch">inside</span> is another.
          </h1>
          <p className="wk-sub">
            I build learning for incarcerated and reentry-bound adults — designed around the realities of the
            environment, not despite them.
          </p>
          <ul className="wk-constraints" aria-label="The realities I design around">
            {CONSTRAINTS.map((c) => (
              <li key={c} className="ds-chip">{c}</li>
            ))}
          </ul>
        </section>

        {/* ── Selected Work: cards, high on the page ── */}
        <section className="wk-block rv">
          <div className="ds-eyebrow"><span>Selected Work</span></div>
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

        {/* ── The Approach: teaser only — the full six commitments + frameworks + AI stance live at /approach ── */}
        <section className="wk-block rv">
          <div className="ds-eyebrow"><span>The Approach</span></div>
          <p className="wk-approach-lead">
            Learning designed to be <em>experienced,</em> not endured.
          </p>
          <p className="wk-lead" style={{ marginTop: 18 }}>
            Six commitments run under every project here, grounded in learning science and tested against the
            realities of the environment I design for most.
          </p>
          <Link href="/approach" className="ds-btn ds-btn--ghost" style={{ marginTop: 24 }}>
            Read the full approach <span aria-hidden="true">→</span>
          </Link>
        </section>

        {/* ── Closer + CTA ── */}
        <section className="wk-closer rv">
          <p className="wk-closer-line">Different environment. Different problems. Different design.</p>
          <Link href="/contact" className="ds-btn ds-btn--solid">
            Start a conversation <span aria-hidden="true">→</span>
          </Link>
          <p className="wk-note">More case studies in progress.</p>
        </section>
      </main>
    </>
  );
}
