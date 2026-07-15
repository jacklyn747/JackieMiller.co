import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFieldNote, getFieldNotes } from "@/lib/fieldNotes";
import SubscribeForm from "@/components/SubscribeForm";

export function generateStaticParams() {
  return getFieldNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) return {};
  return {
    title: `${note.title} — Field Notes — Jackie Miller`,
    description: note.summary,
  };
}

// NOTE: inline styles for spacing — the global reset overrides Tailwind's
// margin/padding utilities (see field-notes/page.tsx).
export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) notFound();

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
        <Link
          href="/field-notes"
          style={{
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ink-mid)",
            textDecoration: "none",
          }}
        >
          ← All Field Notes
        </Link>
      </header>

      <article style={{ maxWidth: 672, margin: "0 auto", padding: "80px 24px" }}>
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
        <h1
          style={{
            marginTop: 12,
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(34px, 6vw, 52px)",
            lineHeight: 1.1,
            color: "var(--ink)",
          }}
        >
          {note.title}
        </h1>
        <div
          className="fn-prose"
          style={{ marginTop: 40 }}
          dangerouslySetInnerHTML={{ __html: note.html }}
        />

        <footer
          style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid var(--ink-dim)" }}
        >
          <p style={{ marginBottom: 16, fontSize: 14, color: "var(--ink-mid)" }}>
            One note like this, every week.
          </p>
          <SubscribeForm />
        </footer>
      </article>
    </main>
  );
}
