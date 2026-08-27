import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { caseStudies } from "@/lib/caseStudies";
import "./work.css";

export const metadata: Metadata = {
  title: "Work — Jackie Miller",
  description:
    "Selected case studies in instructional design and systems work — audits, revisions, and the judgment behind them.",
};

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main className="work-page">
        <div className="work-head">
          <div className="work-eyebrow">Selected Work</div>
          <h1 className="work-title">Case Studies</h1>
          <p className="work-intro">
            A few projects, written up as receipts rather than highlights: the
            problem as it actually arrived, the judgment calls, and the built
            result. Indexed, not narrated.
          </p>
        </div>

        <div className="work-grid">
          {caseStudies.map((cs) => (
            <Link key={cs.slug} href={`/work/${cs.slug}`} className="work-card">
              <div className="work-card__cover">
                <Image
                  src={cs.cover}
                  alt={cs.coverAlt}
                  fill
                  sizes="(max-width: 720px) 100vw, 560px"
                />
              </div>
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

        <p className="work-more">More case studies in progress.</p>
      </main>
    </>
  );
}
