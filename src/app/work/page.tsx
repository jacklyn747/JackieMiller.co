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

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main className="work-page">
        <div className="work-head">
          <div className="work-eyebrow">Instructional Design</div>
          <h1 className="work-title">
            Designing for learners is one thing. Designing for learners inside is another.
          </h1>
          <p className="work-lede">Instructional design doesn’t happen in a vacuum.</p>
          <div className="work-body">
            <p>
              When your learners are incarcerated, the usual assumptions behind course design can
              disappear: reliable internet, personal devices, unrestricted access to information,
              familiar technology, flexible learning environments, and even the ability to choose
              when and how you learn.
            </p>
            <p>Far from being an afterthought, constraints directly shape the design process.</p>
            <p>
              I create learning experiences and instructional materials around the realities of
              correctional education rather than adapting conventional courses as an afterthought.
            </p>
            <p>
              That means thinking differently about access, motivation, technology, literacy,
              cognitive load, autonomy, engagement, assessment, and the physical and institutional
              environment in which learning takes place.
            </p>
            <p>
              My approach combines instructional design, learning science, storytelling, and
              firsthand knowledge of incarceration to create education that works within those
              constraints without allowing those constraints to define what learners are capable of.
            </p>
          </div>
          <p className="work-closer">Different environment. Different problems. Different design.</p>
        </div>

        <div className="work-section-label">Case Studies</div>

        <div className="work-grid">
          {caseStudies.map((cs) => (
            <Link key={cs.slug} href={`/work/${cs.slug}`} className="work-card">
              {cs.live ? (
                <div className="work-card__cover is-live" aria-label={cs.coverAlt}>
                  <TabletMock lesson={2} />
                </div>
              ) : (
                <div className="work-card__cover">
                  <Image src={cs.cover} alt={cs.coverAlt} fill sizes="(max-width: 720px) 100vw, 560px" />
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

        <p className="work-more">More case studies in progress.</p>
      </main>
    </>
  );
}
