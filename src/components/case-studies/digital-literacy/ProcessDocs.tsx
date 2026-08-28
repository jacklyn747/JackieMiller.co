"use client";

/* Collapsible "Full Process Documentation" — same treatment as the audit case
   study, reusing the .cr-* classes (rendered inside .cr-root). */

import { useState } from "react";

type Doc = { title: string; file: string };

export default function ProcessDocs({ base, docs }: { base: string; docs: Doc[] }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <div style={{ borderTop: "0.5px solid rgba(241,238,229,0.18)" }}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        className="cr-docs-header"
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
        style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 11, fontWeight: 500, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(241,238,229,0.62)", cursor: "pointer", padding: "26px 0" }}
      >
        <span>Full Process Documentation</span>
        <span style={{ flex: 1, height: 0, borderTop: "0.5px solid rgba(241,238,229,0.18)" }} />
        <span style={{ color: "rgba(241,238,229,0.45)" }}>{open ? "Collapse" : "Expand"}</span>
        <span style={{ color: "#E3C8C2", fontSize: 13, transition: "transform 160ms ease", transform: open ? "rotate(90deg)" : "none" }}>→</span>
      </div>
      {open && (
        <div style={{ padding: "0 0 14px", maxWidth: 720 }}>
          {docs.map((d, i) => (
            <a
              key={d.file}
              href={`${base}/${d.file}.pdf`}
              target="_blank"
              rel="noopener"
              className="cr-doc-row is-linked"
              style={{ display: "grid", gridTemplateColumns: "34px 1fr 66px 18px", gap: 16, alignItems: "baseline", borderTop: "0.5px solid rgba(241,238,229,0.12)", padding: "13px 0", color: "rgba(241,238,229,0.78)", cursor: "pointer" }}
            >
              <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "rgba(241,238,229,0.40)" }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: 13, lineHeight: 1.5 }}>{d.title}</span>
              <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#E3C8C2" }}>PDF</span>
              <span style={{ fontSize: 12, textAlign: "right", color: "var(--oxblood)" }}>→</span>
            </a>
          ))}
          <div style={{ borderTop: "0.5px solid rgba(241,238,229,0.12)", paddingTop: 14, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(241,238,229,0.35)" }}>
            All {docs.length} documents attached.
          </div>
        </div>
      )}
    </div>
  );
}
