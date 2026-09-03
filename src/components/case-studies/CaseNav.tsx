import Link from "next/link";
import "./case-nav.css";

/* Shared case-study footer: a "next project" hand-off + the site footer,
   in the dark-editorial case-study language (continuity across both studies). */

export default function CaseNav({
  nextHref,
  nextKicker,
  nextTitle,
}: {
  nextHref: string;
  nextKicker: string;
  nextTitle: string;
}) {
  return (
    <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 48px" }}>
      <Link
        href={nextHref}
        className="cs-next"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          borderTop: "0.5px solid rgba(241,238,229,0.18)",
          padding: "clamp(52px,7vw,92px) 0",
          textDecoration: "none",
          color: "var(--paper)",
        }}
      >
        <span style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.20em", textTransform: "uppercase", color: "#E3C8C2" }}>
            Next project · {nextKicker}
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: "clamp(30px,4.4vw,56px)",
              lineHeight: 1.04,
              letterSpacing: "0.015em",
              textTransform: "uppercase",
              color: "var(--paper)",
              textWrap: "balance",
            }}
          >
            {nextTitle}
          </span>
        </span>
        <span className="cs-next__arrow" style={{ fontSize: "clamp(30px,4vw,46px)", color: "#E3C8C2", flex: "0 0 auto" }}>
          →
        </span>
      </Link>

      <footer
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "14px 24px",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "0.5px solid rgba(241,238,229,0.18)",
          padding: "26px 0 72px",
          fontSize: 12.5,
        }}
      >
        <Link href="/" style={{ fontWeight: 700, letterSpacing: "0.08em", color: "var(--paper)", textDecoration: "none" }}>
          Jackie Miller
        </Link>
        <span style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          {[
            ["/work", "Work"],
            ["/about", "About"],
            ["/field-notes", "Field Notes"],
            ["/contact", "Contact"],
          ].map(([h, l]) => (
            <Link key={h} href={h} className="cs-foot-link" style={{ color: "rgba(241,238,229,0.62)", textDecoration: "none", letterSpacing: "0.06em" }}>
              {l}
            </Link>
          ))}
        </span>
      </footer>
    </div>
  );
}
