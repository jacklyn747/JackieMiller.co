import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "About — Jackie Miller",
  description: "Part architect, part artist — designing systems that turn complex ideas into things people can use, learn, and buy.",
};

// STARTER PAGE — copy below is a truthful, on-brand placeholder drawn from the
// brand canon (design-system readme + positioning notes). Jackie writes the
// final bio; keep claims to what she can stand behind.
export default function AboutPage() {
  const label: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 14,
    fontFamily: "var(--font-sans), sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--ink-mid)",
  };

  return (
    <>
      <SiteNav />
      <main style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)" }}>
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(72px,10vw,120px) clamp(24px,5vw,48px) 128px" }}>
          <div style={label}>
            <span>About</span>
            <span style={{ flex: 1, height: 0, borderTop: "0.5px solid var(--ink-dim)" }} />
          </div>

          <h1
            style={{
              marginTop: 28,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 400,
              fontSize: "clamp(40px,6vw,72px)",
              lineHeight: 1.02,
              letterSpacing: "0.015em",
              textTransform: "uppercase",
              color: "var(--ink)",
              maxWidth: "18ch",
            }}
          >
            Part Architect, Part Artist
          </h1>

          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 22, maxWidth: "62ch" }}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--ink)", textWrap: "pretty" }}>
              I design and build systems that turn complex ideas into things people can use, learn, and buy. The work sits between structure and expression: the rigor to make something scale, and the narrative to make it worth paying attention to.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.72, color: "var(--ink-mid)", textWrap: "pretty" }}>
              Most of it is instructional design and content systems — auditing what exists, deciding what to cut versus rebuild, and shipping revisions that respect the people on the other side of the screen. The judgment is mine; the tools execute.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.72, color: "var(--ink-mid)", textWrap: "pretty" }}>
              Based in Houston, Texas.
            </p>
          </div>

          <p
            style={{
              marginTop: 56,
              paddingTop: 26,
              borderTop: "0.5px solid var(--ink-dim)",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-mid)",
            }}
          >
            A fuller story is on the way.
          </p>
        </section>
      </main>
    </>
  );
}
