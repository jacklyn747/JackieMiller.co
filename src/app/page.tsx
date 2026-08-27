import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ThemeToggle from "@/components/ThemeToggle";
import "./home.css";

// Interim front door. Robust and content-first — replaces the old Cover +
// placeholder sections that rendered blank when their scroll animation failed.
// The immersive "dreamscape" homepage remains the planned replacement.
const DOORS = [
  { href: "/work", title: "Work", desc: "Case studies — receipts, not highlights." },
  { href: "/about", title: "About", desc: "Meet Jackie, in a rapid-fire interview." },
  { href: "/field-notes", title: "Field Notes", desc: "Notes from building real systems with AI." },
  { href: "/contact", title: "Contact", desc: "If one of these is yours too, let’s talk." },
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="home">
        <div className="home-inner">
          <div className="home-eyebrow">Jackie Miller — Instructional Designer · Houston, TX</div>

          <h1 className="home-statement">
            I design learning for the people usually left out of it.
          </h1>
          <p className="home-tag">Part architect, part artist.</p>

          <div className="home-cta">
            <Link href="/work">See the work →</Link>
            <Link href="/about">Meet Jackie →</Link>
          </div>

          <nav className="home-doors" aria-label="Sections">
            {DOORS.map((d, i) => (
              <Link key={d.href} href={d.href} className="home-door">
                <span className="home-door__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="home-door__body">
                  <span className="home-door__title">{d.title}</span>
                  <span className="home-door__desc">{d.desc}</span>
                </span>
                <span className="home-door__arrow">→</span>
              </Link>
            ))}
          </nav>

          <p className="home-foot">Jackie Miller · Houston, Texas</p>
        </div>
      </main>
      <ThemeToggle />
    </>
  );
}
