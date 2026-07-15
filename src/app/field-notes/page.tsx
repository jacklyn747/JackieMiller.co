import type { Metadata } from "next";
import Link from "next/link";
import { getFieldNotes } from "@/lib/fieldNotes";
import SubscribeForm from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Field Notes — Jackie Miller",
  description:
    "Weekly notes from building real systems with AI — what worked, what bit me, and the protocols that came out of it.",
};

// NOTE: this codebase's global reset (unlayered `* { margin:0; padding:0 }`)
// overrides Tailwind's layered spacing utilities — use inline styles for
// margin/padding, like the rest of the site does.
export default function FieldNotesPage() {
  const notes = getFieldNotes();

  return (
    <main style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <header
        className="flex items-center justify-between border-b"
        style={{ padding: "0 32px", height: 56, borderColor: "var(--ink-dim)" }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          Jackie Miller
        </Link>
        <span
          style={{
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ink-mid)",
          }}
        >
          Field Notes
        </span>
      </header>

      <section style={{ maxWidth: 672, margin: "0 auto", padding: "80px 24px" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(40px, 7vw, 64px)",
            lineHeight: 1.05,
            color: "var(--ink)",
          }}
        >
          Field Notes
        </h1>
        <p
          style={{
            marginTop: 24,
            fontSize: 16,
            lineHeight: 1.7,
            color: "var(--ink-mid)",
            maxWidth: "48ch",
          }}
        >
          Weekly notes from building real systems with AI — what worked, what bit
          me, and the protocols that came out of it. Written from practice, not
          theory.
        </p>
        <div style={{ marginTop: 32 }}>
          <SubscribeForm />
        </div>

        <div className="flex flex-col" style={{ marginTop: 64, gap: 48 }}>
          {notes.length === 0 && (
            <p style={{ color: "var(--ink-mid)", fontStyle: "italic" }}>
              First note lands soon.
            </p>
          )}
          {notes.map((note) => (
            <article key={note.slug}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ox-accent)",
                }}
              >
                {note.date}
              </p>
              <h2 style={{ marginTop: 8 }}>
                <Link
                  href={`/field-notes/${note.slug}`}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 28,
                    lineHeight: 1.2,
                    color: "var(--ink)",
                    textDecoration: "none",
                  }}
                >
                  {note.title}
                </Link>
              </h2>
              {note.summary && (
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "var(--ink-mid)",
                  }}
                >
                  {note.summary}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
