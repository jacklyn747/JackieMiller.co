import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact — Jackie Miller",
  description: "Get in touch about instructional design, content systems, and consulting work.",
};

// Jackie's real inbox for now (she'll swap to a branded address later).
const CONTACT_EMAIL = "jacklyn747@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/jacklyn747";
const RESUME_PATH = "/Jacklyn-Miller-Resume.pdf";

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

          <div className="contact-icons">
            <a className="contact-icon" href={`mailto:${CONTACT_EMAIL}`} aria-label={`Email ${CONTACT_EMAIL}`} title="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3.5 6.5 12 13l8.5-6.5" />
              </svg>
            </a>
            <a className="contact-icon" href={RESUME_PATH} download aria-label="Download résumé (PDF)" title="Résumé (PDF)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5" />
                <path d="M12 11.5v5M9.5 14l2.5 2.5L14.5 14" />
              </svg>
            </a>
            <a className="contact-icon" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" />
              </svg>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
