import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Page not found — Jackie Miller",
};

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main
        id="main-content"
        style={{
          minHeight: "100vh",
          background: "var(--paper)",
          color: "var(--ink)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <section style={{ maxWidth: 640, margin: "0 auto", padding: "clamp(72px,10vw,120px) clamp(24px,5vw,48px)" }}>
          <div className="ds-eyebrow ds-eyebrow--solo">404</div>
          <h1
            style={{
              marginTop: 22,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 400,
              fontSize: "clamp(36px,5.5vw,60px)",
              lineHeight: 1.05,
              color: "var(--ink)",
              textWrap: "balance",
            }}
          >
            This page went <span style={{ fontStyle: "italic", color: "var(--ox-accent)" }}>missing.</span>
          </h1>
          <p
            style={{
              marginTop: 20,
              maxWidth: "48ch",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ink-mid)",
            }}
          >
            Whatever you were looking for isn&apos;t here — but the work, the approach, and a way to reach me are.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 32 }}>
            <Link href="/" className="ds-btn ds-btn--solid">
              Back home <span aria-hidden="true">→</span>
            </Link>
            <Link href="/work" className="ds-btn ds-btn--ghost">
              See the work
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
