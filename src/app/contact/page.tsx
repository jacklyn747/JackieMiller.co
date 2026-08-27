import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Contact — Jackie Miller",
  description: "Get in touch about instructional design, content systems, and consulting work.",
};

// STARTER PAGE. The email below is a placeholder on Jackie's own domain —
// CONFIRM the address routes (or swap in her preferred email / LinkedIn / form)
// before this goes live. Do not ship a bouncing mailbox.
const CONTACT_EMAIL = "hello@jackiemiller.co";

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)" }}>
        <section style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(72px,10vw,120px) clamp(24px,5vw,48px) 128px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--ink-mid)",
            }}
          >
            <span>Contact</span>
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
              maxWidth: "16ch",
            }}
          >
            Let&apos;s Talk
          </h1>

          <p style={{ marginTop: 36, maxWidth: "56ch", fontSize: 18, lineHeight: 1.7, color: "var(--ink)", textWrap: "pretty" }}>
            Some of these are half-built. Some are just itches. If one of them is
            yours too, or you have work that has to be right, write to me.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              marginTop: 40,
              fontFamily: "var(--font-serif), serif",
              fontSize: "clamp(24px,3.4vw,34px)",
              letterSpacing: "0.01em",
              color: "var(--ox-accent)",
              textDecoration: "none",
            }}
          >
            {CONTACT_EMAIL}
            <span style={{ fontSize: 20 }}>→</span>
          </a>
        </section>
      </main>
    </>
  );
}
