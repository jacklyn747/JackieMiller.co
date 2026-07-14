import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const NOTES_DIR = path.join(process.cwd(), "content", "field-notes");

export type FieldNote = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  html: string;
};

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, body: raw.slice(match[0].length) };
}

export function getFieldNotes(): FieldNote[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(NOTES_DIR, file), "utf8");
      const { meta, body } = parseFrontmatter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: meta.title ?? file.replace(/\.md$/, ""),
        date: meta.date ?? "",
        summary: meta.summary ?? "",
        html: marked.parse(body, { async: false }) as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFieldNote(slug: string): FieldNote | undefined {
  return getFieldNotes().find((n) => n.slug === slug);
}
