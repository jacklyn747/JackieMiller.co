"use client";

/* ─────────────────────────────────────────────────────────────
   Content Review Case Study
   Ported from the Claude Design canvas file of the same name.

   The source used a small canvas runtime (<x-dc>, sc-for, sc-if,
   <image-slot>, DCLogic state). This is a faithful React port:
   - sc-for  → Array.map
   - sc-if   → conditional render
   - DCLogic state (open card, docs section) → useState
   - <image-slot> → <ImageSlot>, backed by the screenshots the
     author dropped into the canvas, extracted to /public.

   Styling stays inline (as in the source, and as the rest of this
   site does — the global reset strips Tailwind's spacing layer).
   Scoped tokens + hover states live in content-review.css.
   ───────────────────────────────────────────────────────────── */

import Image from "next/image";
import { useState } from "react";
import "./content-review.css";

const IMG_BASE = "/case-studies/content-review";
/* Slots the author filled on the canvas. proof-after was never
   supplied (and could not be recovered from the canvas sidecar),
   so it renders the design's own placeholder treatment. */
const FILLED = new Set([
  "audit-01",
  "audit-02",
  "audit-03",
  "audit-04",
  "audit-05",
  "proof-before",
]);

function ImageSlot({ id, placeholder }: { id: string; placeholder: string }) {
  if (FILLED.has(id)) {
    return (
      <span style={{ position: "relative", display: "block", width: "100%", height: "100%" }}>
        <Image
          src={`${IMG_BASE}/${id}.webp`}
          alt={placeholder}
          fill
          sizes="(max-width: 720px) 100vw, 440px"
          style={{ objectFit: "cover" }}
        />
      </span>
    );
  }
  return <div className="cr-slot-empty">{placeholder}</div>;
}

/* ── Data (verbatim from the canvas logic) ── */

type Detail = { label: string; text: string };
type AuditCard = {
  n: string;
  slot: string;
  slotLabel: string;
  issue: string;
  fix: string;
  detail: Detail[];
};

const AUDIT: AuditCard[] = [
  {
    n: "01",
    slot: "audit-01",
    slotLabel: "Screenshot: locked video screen",
    issue: "Forced video gate, no skip option",
    fix: "Learner-controlled skip, reworded prompt",
    detail: [
      { label: "Original", text: "Video screens were hard-locked with 'WATCH THE VIDEO TO CONTINUE' and no visible scrub or skip control." },
      { label: "What's Wrong", text: "Trauma-informed design leans on learner autonomy and control over pacing. A locked progress bar removes choice rather than respecting it." },
      { label: "Fix", text: "Auto play and Auto progress turned off, skip button enabled, prompt reworded to 'Watch now, or skip when you're ready.'" },
      { label: "Why It Matters", text: "The difference between naming a principle like trauma-informed design and actually applying the mechanism behind it." },
    ],
  },
  {
    n: "02",
    slot: "audit-02",
    slotLabel: "Screenshot: outbound links screen",
    issue: "Standalone screen of outbound links",
    fix: "Embedded original content, no outbound dependency",
    detail: [
      { label: "Original", text: "A dedicated screen listed three outbound links with no other content." },
      { label: "What's Wrong", text: "On a closed platform those links don't resolve, and the screen has no content of its own once they're removed." },
      { label: "Fix", text: "Replaced with an embedded 'Craft Tips' card. Three original writing tips authored in-house." },
      { label: "Why It Matters", text: "Not every fix is a content swap. Recognizing when to cut versus rebuild is real content-management judgment." },
    ],
  },
  {
    n: "03",
    slot: "audit-03",
    slotLabel: "Screenshot: second video gate",
    issue: "Second forced video gate",
    fix: "Same fix applied consistently",
    detail: [
      { label: "Applied fix", text: "Same forced-lock pattern as the first video gate. Applied the identical fix: skip enabled, prompt reworded, no forced wait." },
    ],
  },
  {
    n: "04",
    slot: "audit-04",
    slotLabel: "Screenshot: 'Voice Switch' activity",
    issue: "Activity depends on an external website",
    fix: "Source material embedded directly in the activity",
    detail: [
      { label: "Original", text: "The 'Voice Switch' activity sent learners to an external site to choose a source story." },
      { label: "What's Wrong", text: "Unlike the standalone link screen, this dependency was load-bearing. The activity couldn't function without it." },
      { label: "Fix", text: "Replaced the link with a 150-300 word short story excerpt embedded directly on-screen." },
      { label: "Why It Matters", text: "Content that assumes open web access would get flagged in exactly the review process meant to keep a closed platform closed." },
    ],
  },
  {
    n: "05",
    slot: "audit-05",
    slotLabel: "Screenshot: character-profile prompt",
    issue: "Stigmatizing character-profile prompt",
    fix: "Reworded to focus on interiority, not biography",
    detail: [
      { label: "Original", text: "A character-building activity included the prompt: 'Do they come from a broken home?'" },
      { label: "What's Wrong", text: "A stigmatizing, judgment-loaded phrase. For a population where many learners have lived that reality, it stops being a hypothetical writing prompt." },
      { label: "Fix", text: "Replaced with: 'What's a decision they made that they'd take back?' and 'Who do they trust, and who do they perform for?'" },
      { label: "Why It Matters", text: "The exact judgment call content review requires: catching what non-specialist reviewers might miss because the phrase reads as ordinary anywhere else." },
    ],
  },
];

const RUBRIC = [
  { label: "No external links required", score: 1 },
  { label: "No forced-wait gates", score: 1 },
  { label: "No stigmatizing language", score: 1 },
  { label: "Instructions as invitations, not commands", score: 2 },
  { label: "Icon + text label pairing", score: 3 },
  { label: "Content chunked for cognitive load", score: 3 },
];

const SCORE_FILL: Record<number, string> = {
  1: "var(--oxblood)",
  2: "rgba(93,15,14,0.62)",
  3: "rgba(227,200,194,0.55)",
  4: "#E3C8C2",
};

const DOC_FILES: Record<string, string> = {
  "Needs & Audience Analysis": `${IMG_BASE}/needs-and-audience-analysis.pdf`,
  "Task & Content Analysis": `${IMG_BASE}/task-and-content-analysis.pdf`,
  "Learning Objectives": `${IMG_BASE}/learning-objectives.pdf`,
  "Instructional Strategy & Approach": `${IMG_BASE}/instructional-strategy-and-approach.pdf`,
  "Storyboard / Wireframe": `${IMG_BASE}/storyboard-wireframe.pdf`,
  "Content Outline / Blueprint": `${IMG_BASE}/content-outline-blueprint.pdf`,
  "Style Guide & Design Rationale": `${IMG_BASE}/style-guide-design-rationale.pdf`,
  "Accessibility & Inclusivity Checklist": `${IMG_BASE}/accessibility-inclusivity-checklist.pdf`,
  "Content Quality Rubric": `${IMG_BASE}/content-quality-rubric.pdf`,
  "Evaluation Plan": `${IMG_BASE}/evaluation-plan.pdf`,
};

const DOC_TITLES = [
  "Needs & Audience Analysis",
  "Task & Content Analysis",
  "Learning Objectives",
  "Instructional Strategy & Approach",
  "Storyboard / Wireframe",
  "Content Outline / Blueprint",
  "Style Guide & Design Rationale",
  "Accessibility & Inclusivity Checklist",
  "Content Quality Rubric",
  "Evaluation Plan",
];

/* ── Shared bits of chrome ── */

function SectionLabel({
  children,
  trailing,
  margin,
  color = "rgba(241,238,229,0.72)",
}: {
  children: React.ReactNode;
  trailing?: React.ReactNode;
  margin: string;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.20em",
        textTransform: "uppercase",
        color,
        margin,
      }}
    >
      <span>{children}</span>
      <span style={{ flex: 1, height: 0, borderTop: "0.5px solid rgba(241,238,229,0.18)" }} />
      {trailing}
    </div>
  );
}

export default function ContentReview() {
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [docsOpen, setDocsOpen] = useState(false);

  const rubric = RUBRIC.map((r) => ({
    ...r,
    w: `${(r.score / 4) * 100}%`,
    fill: SCORE_FILL[r.score],
    edge: r.score > 2 ? "rgba(241,238,229,0.30)" : "#E3C8C2",
  }));

  const scale = [1, 2, 3, 4].map((n) => ({ n: String(n), fill: SCORE_FILL[n] }));

  const docs = DOC_TITLES.map((title, i) => {
    const href = DOC_FILES[title];
    return {
      n: String(i + 1).padStart(2, "0"),
      title,
      href,
      kind: href ? "PDF" : "Pending",
      tone: href ? "rgba(241,238,229,0.78)" : "rgba(241,238,229,0.42)",
      kindTone: href ? "#E3C8C2" : "rgba(241,238,229,0.30)",
      arrowTone: href ? "var(--oxblood)" : "rgba(241,238,229,0.25)",
    };
  });

  return (
    <main className="cr-root">
      <div style={{ position: "relative" }}>
        {/* ── Hero + dark body (global SiteNav sits above this) ── */}
        <div className="cr-wrap" style={{ position: "relative", maxWidth: 1160, margin: "0 auto", padding: "0 48px" }}>
          {/* Hero */}
          <div style={{ padding: "80px 0 0", maxWidth: 960 }}>
            <SectionLabel margin="0 0 34px">Content Review</SectionLabel>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(46px,6.4vw,84px)",
                lineHeight: 1.02,
                letterSpacing: "0.015em",
                textTransform: "uppercase",
                margin: 0,
                maxWidth: "17ch",
                textWrap: "pretty",
                color: "var(--paper)",
              }}
            >
              Discovering Your Narrative Voice
            </h1>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginTop: 32, maxWidth: "60ch" }}>
              <span style={{ flex: "0 0 auto", width: 44, height: 0, borderTop: "0.5px solid #E3C8C2", marginTop: 16 }} />
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(19px,2.2vw,26px)",
                  lineHeight: 1.34,
                  color: "#E3C8C2",
                  margin: 0,
                  textWrap: "pretty",
                }}
              >
                Auditing and revising an existing course for a secure, closed-platform learning environment serving justice-involved learners.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "12px 26px",
                marginTop: 44,
                paddingTop: 22,
                borderTop: "0.5px solid rgba(241,238,229,0.18)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {[
                ["Role", "Instructional Designer"],
                ["Focus", "Content Audit & Revision"],
                ["Phases", "Analysis, Design, Development, Evaluation"],
              ].map(([k, v]) => (
                <span key={k} style={{ color: "rgba(241,238,229,0.55)" }}>
                  {k}
                  <span style={{ color: "rgba(241,238,229,0.30)", padding: "0 8px" }}>/</span>
                  <span style={{ color: "var(--paper)" }}>{v}</span>
                </span>
              ))}
            </div>
          </div>

          {/* The Challenge */}
          <SectionLabel margin="96px 0 30px">The Challenge</SectionLabel>
          <p style={{ maxWidth: "64ch", fontSize: 17, lineHeight: 1.72, color: "rgba(241,238,229,0.90)", margin: 0, textWrap: "pretty" }}>
            Course content on a secure learning platform assumes the learner can already operate the device it&apos;s delivered on. For a meaningful portion of this population, that assumption doesn&apos;t hold. Some learners are encountering a touchscreen for the first time as adults, with no internet access, no IT support on demand, and real consequences for visible failure in front of peers or staff.
          </p>
          <div className="cr-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, marginTop: 56, borderTop: "0.5px solid rgba(241,238,229,0.18)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "30px 26px 0 0", borderRight: "0.5px solid rgba(241,238,229,0.18)" }}>
              <svg viewBox="0 0 32 32" width="38" height="38" fill="none" stroke="var(--paper)" strokeWidth="1.25" style={{ display: "block", overflow: "visible" }}>
                <circle cx="16" cy="16" r="11" />
                <path d="M5 16h22" />
                <path d="M16 5c4 3.4 4 18.2 0 22" />
                <path d="M16 5c-4 3.4-4 18.2 0 22" />
                <path d="M4.5 27.5 27.5 4.5" stroke="var(--ink)" strokeWidth="4" />
                <path d="M4.5 27.5 27.5 4.5" strokeWidth="2" />
              </svg>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.5, color: "var(--paper)" }}>No Internet Access</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "30px 26px 0", borderRight: "0.5px solid rgba(241,238,229,0.18)" }}>
              <svg viewBox="0 0 32 32" width="38" height="38" fill="none" stroke="var(--paper)" strokeWidth="1.25" style={{ display: "block", overflow: "visible" }}>
                <circle cx="16" cy="16" r="11" />
                <path d="M16 9v7.6l5.4 3.2" />
              </svg>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.5, color: "var(--paper)" }}>Shared Device Time</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "30px 26px 0", borderRight: "0.5px solid rgba(241,238,229,0.18)" }}>
              <svg viewBox="0 0 32 32" width="38" height="38" fill="none" stroke="var(--paper)" strokeWidth="1.25" style={{ display: "block", overflow: "visible" }}>
                <path d="M6 20v-3a10 10 0 0 1 20 0v3" />
                <path d="M3.5 20h5v6.5h-5z" />
                <path d="M23.5 20h5v6.5h-5z" />
                <path d="M4.5 27.5 27.5 4.5" stroke="var(--ink)" strokeWidth="4" />
                <path d="M4.5 27.5 27.5 4.5" strokeWidth="2" />
              </svg>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.5, color: "var(--paper)" }}>No IT Support</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "30px 0 0 26px" }}>
              <svg viewBox="0 0 32 32" width="38" height="38" fill="none" stroke="#E3C8C2" strokeWidth="1.25" style={{ display: "block", overflow: "visible" }}>
                <path d="M16 4.5 29 27H3z" />
                <path d="M16 12.5v7.2" />
                <path d="M16 22.8v1.4" />
              </svg>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.5, color: "#E3C8C2" }}>High Stakes for Failure</div>
            </div>
          </div>

          {/* Process */}
          <SectionLabel margin="96px 0 44px">Process</SectionLabel>
          <div className="cr-grid-process" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", alignItems: "start" }}>
            {[
              { n: "01", title: "Analysis", sub: "Needs & Task Analysis", last: false },
              { n: "02", title: "Design", sub: "Objectives & Storyboard", last: false },
              { n: "03", title: "Development", sub: "Style Guide & Accessibility", last: false },
              { n: "04", title: "Evaluation", sub: "Rubric & Measurement Plan", last: true },
            ].map((p) => (
              <div key={p.n} style={{ display: "flex", flexDirection: "column", gap: 22, paddingRight: p.last ? 0 : 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 0, height: 12 }}>
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: 9,
                      height: 9,
                      background: p.last ? "var(--oxblood)" : "#E3C8C2",
                      border: p.last ? "0.5px solid #E3C8C2" : undefined,
                      borderRadius: "50%",
                    }}
                  />
                  <span style={{ flex: 1, height: 0, borderTop: p.last ? undefined : "0.5px solid rgba(241,238,229,0.30)" }} />
                  {!p.last && <span style={{ flex: "0 0 auto", color: "rgba(241,238,229,0.30)", fontSize: 12, lineHeight: 1, marginLeft: -1 }}>→</span>}
                </div>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.20em", color: "#E3C8C2", marginBottom: 12 }}>{p.n}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, lineHeight: 1.1, letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--paper)" }}>{p.title}</div>
                  <div style={{ fontSize: 12, letterSpacing: "0.10em", textTransform: "uppercase", lineHeight: 1.5, color: "rgba(241,238,229,0.62)", marginTop: 10 }}>{p.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* What the Audit Found */}
          <SectionLabel margin="96px 0 8px" trailing={<span style={{ color: "rgba(241,238,229,0.55)" }}>Five screens</span>}>
            What the Audit Found
          </SectionLabel>
          <div className="cr-audit-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24, alignItems: "stretch", marginTop: 32 }}>
            {AUDIT.map((c, i) => {
              const on = openCard === i;
              return (
                <div key={c.n} style={{ background: "var(--paper)", color: "var(--ink)", display: "flex", flexDirection: "column" }}>
                  <div style={{ width: "100%", height: 200, position: "relative", background: "rgba(26,22,20,0.06)", borderBottom: "0.5px solid var(--ink-15)" }}>
                    <ImageSlot id={c.slot} placeholder={c.slotLabel} />
                  </div>
                  <div style={{ padding: "26px 26px 0", display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase", color: "var(--oxblood)" }}>
                      <span>{c.n}</span>
                      <span style={{ flex: 1, height: 0, borderTop: "0.5px solid var(--ink-15)" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.20em", textTransform: "uppercase", color: "var(--oxblood)", marginBottom: 8 }}>Issue</div>
                      <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, lineHeight: 1.16, letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--ink)", textWrap: "pretty" }}>{c.issue}</div>
                    </div>
                    <div style={{ borderTop: "0.5px solid var(--ink-15)", paddingTop: 16 }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.20em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 8 }}>Fix</div>
                      <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink)", textWrap: "pretty" }}>{c.fix}</div>
                    </div>
                  </div>
                  {on && (
                    <div style={{ padding: "22px 26px 0", display: "flex", flexDirection: "column", gap: 18 }}>
                      {c.detail.map((d) => (
                        <div key={d.label} style={{ borderTop: "0.5px solid var(--ink-15)", paddingTop: 14 }}>
                          <div style={{ fontSize: 10, letterSpacing: "0.20em", textTransform: "uppercase", color: "var(--oxblood)", marginBottom: 8 }}>{d.label}</div>
                          <p style={{ fontSize: 14, lineHeight: 1.68, color: "var(--ink-soft)", margin: 0, textWrap: "pretty" }}>{d.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={on}
                    className="cr-audit-toggle"
                    onClick={() => setOpenCard(on ? null : i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenCard(on ? null : i);
                      }
                    }}
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "22px 26px",
                      borderTop: "0.5px solid var(--ink-15)",
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--ink-soft)",
                    }}
                  >
                    <span>{on ? "Hide detail" : "Read the detail"}</span>
                    <span style={{ color: "var(--oxblood)", fontSize: 14, transition: "transform 160ms ease", transform: on ? "rotate(90deg)" : "none" }}>→</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Proof — full-bleed cream */}
          <div className="cr-fullbleed" style={{ background: "var(--paper)", color: "var(--ink)", margin: "104px -48px 0", padding: "64px 48px 60px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 11, fontWeight: 500, letterSpacing: "0.20em", textTransform: "uppercase", color: "var(--oxblood)" }}>
              <span>Proof</span>
              <span style={{ flex: 1, height: 0, borderTop: "0.5px solid var(--ink-15)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(38px,4.6vw,60px)", lineHeight: 1.04, letterSpacing: "0.015em", textTransform: "uppercase", margin: "26px 0 0", maxWidth: "20ch", color: "var(--ink)" }}>
              Built, Not Just Proposed
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 32, marginTop: 52 }}>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: 11, fontWeight: 500, letterSpacing: "0.20em", textTransform: "uppercase", color: "var(--ink-soft)", paddingBottom: 14, borderBottom: "0.5px solid var(--ink-15)", minHeight: 42 }}>
                  <span style={{ lineHeight: 1.5, textWrap: "pretty" }}>Before</span>
                </div>
                <div style={{ width: "100%", height: "clamp(240px,34vw,440px)", marginTop: 20, background: "rgba(26,22,20,0.06)" }}>
                  <ImageSlot id="proof-before" placeholder="Screenshot: original locked video screen" />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: 11, fontWeight: 500, letterSpacing: "0.20em", textTransform: "uppercase", color: "var(--oxblood)", paddingBottom: 14, borderBottom: "0.5px solid var(--oxblood)", minHeight: 42 }}>
                  <span style={{ lineHeight: 1.5, textWrap: "pretty" }}>After &mdash; Implemented in the Live LMS</span>
                </div>
                <div style={{ width: "100%", height: "clamp(240px,34vw,440px)", marginTop: 20, background: "rgba(26,22,20,0.06)" }}>
                  <ImageSlot id="proof-after" placeholder="Screenshot: revised screen in the live LMS" />
                </div>
              </div>
            </div>
            <p style={{ maxWidth: "88ch", fontSize: 17, lineHeight: 1.66, color: "var(--ink-soft)", margin: "36px 0 0", textWrap: "pretty" }}>
              Play on demand, Auto play, and Auto progress all off; skip button enabled; prompt reworded. Learner now controls when the video plays and whether they continue watching or move on.
            </p>
          </div>

          {/* Scoring the Original */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 11, fontWeight: 500, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(241,238,229,0.72)", margin: "96px 0 0" }}>
            <span>Scoring the Original</span>
            <span style={{ flex: 1, height: 0, borderTop: "0.5px solid rgba(241,238,229,0.18)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(241,238,229,0.55)" }}>
              <span>Weak</span>
              {scale.map((s) => (
                <span key={s.n} style={{ width: 22, height: 8, background: s.fill, border: "0.5px solid rgba(241,238,229,0.30)" }} />
              ))}
              <span>Strong</span>
            </div>
          </div>
          <div style={{ marginTop: 36 }}>
            {rubric.map((r) => (
              <div key={r.label} className="cr-rubric-row" style={{ display: "grid", gridTemplateColumns: "minmax(220px,34%) 1fr 44px", gap: 24, alignItems: "center", borderTop: "0.5px solid rgba(241,238,229,0.18)", padding: "18px 0" }}>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(241,238,229,0.90)", textWrap: "pretty" }}>{r.label}</div>
                <div className="cr-rubric-bar" style={{ height: 18, border: "0.5px solid rgba(241,238,229,0.18)", background: "rgba(241,238,229,0.05)" }}>
                  <div style={{ height: "100%", width: r.w, background: r.fill, borderRight: `0.5px solid ${r.edge}`, transition: "width 400ms ease" }} />
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, lineHeight: 1, textAlign: "right", color: "var(--paper)" }}>{r.score}</div>
              </div>
            ))}
            <div style={{ borderTop: "0.5px solid rgba(241,238,229,0.18)" }} />
          </div>
          <p style={{ maxWidth: "80ch", fontSize: 16, lineHeight: 1.7, color: "rgba(241,238,229,0.88)", margin: "30px 0 0", textWrap: "pretty" }}>
            <span style={{ color: "#E3C8C2" }}>Average score: 1.8 of 4.</span> Reflecting real strengths in a few categories alongside specific, fixable failures. The rubric doesn&apos;t just confirm what was found; it shows the original module wasn&apos;t uniformly weak.
          </p>

          {/* Pull quote */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: "0 auto", padding: "132px 0 128px", maxWidth: 940 }}>
            <span style={{ width: 72, height: 0, borderTop: "0.5px solid var(--oxblood)" }} />
            <p style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.24, letterSpacing: "0.005em", color: "var(--paper)", margin: "48px 0 0", textWrap: "pretty" }}>
              A learner&apos;s sense of safety, trust, and willingness to make a visible mistake is shaped by what a screen looks and feels like before they read a single word of content on it. <span style={{ fontStyle: "italic", color: "#E3C8C2" }}>That makes aesthetic and interaction choices instructional decisions, not cosmetic ones layered on top.</span>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 52 }}>
              <span style={{ width: 28, height: 0, borderTop: "0.5px solid rgba(241,238,229,0.30)" }} />
              <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(241,238,229,0.62)", lineHeight: 1.6, maxWidth: "52ch" }}>
                On why this project treats visual design as instructional design, not decoration.
              </span>
              <span style={{ width: 28, height: 0, borderTop: "0.5px solid rgba(241,238,229,0.30)" }} />
            </div>
          </div>

          {/* Measuring What Actually Worked */}
          <SectionLabel margin="0 0 34px">Measuring What Actually Worked</SectionLabel>
          <div className="cr-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div style={{ borderTop: "0.5px solid rgba(241,238,229,0.18)", paddingTop: 22 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(241,238,229,0.62)", marginBottom: 16 }}>Not measurable, by design</div>
              <p style={{ fontSize: 17, lineHeight: 1.72, color: "rgba(241,238,229,0.90)", margin: 0, textWrap: "pretty" }}>
                Not every outcome is measurable on a platform built around learner privacy. Activities are written on paper by design, so the deepest measures of whether the skill actually landed aren&apos;t visible to the platform, and that&apos;s treated as the design working as intended, not a data gap to route around.
              </p>
            </div>
            <div style={{ borderTop: "0.5px solid #E3C8C2", paddingTop: 22 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase", color: "#E3C8C2", marginBottom: 16 }}>What is measurable</div>
              <p style={{ fontSize: 17, lineHeight: 1.72, color: "rgba(241,238,229,0.90)", margin: 0, textWrap: "pretty" }}>
                Completion rates, where learners drop off, and whether they actually use the new skip controls. Each tied to a specific hypothesis from the original audit, checked after the first cohort and quarterly after that.
              </p>
            </div>
          </div>
        </div>

        {/* Full Process Documentation */}
        <div className="cr-wrap" style={{ position: "relative", maxWidth: 1160, margin: "0 auto", padding: "0 48px 120px" }}>
          <div style={{ borderTop: "0.5px solid rgba(241,238,229,0.18)" }}>
            <div
              role="button"
              tabIndex={0}
              aria-expanded={docsOpen}
              className="cr-docs-header"
              onClick={() => setDocsOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setDocsOpen((v) => !v);
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "rgba(241,238,229,0.62)",
                cursor: "pointer",
                padding: "26px 0",
              }}
            >
              <span>Full Process Documentation</span>
              <span style={{ flex: 1, height: 0, borderTop: "0.5px solid rgba(241,238,229,0.18)" }} />
              <span style={{ color: "rgba(241,238,229,0.45)" }}>{docsOpen ? "Collapse" : "Expand"}</span>
              <span style={{ color: "#E3C8C2", fontSize: 13, transition: "transform 160ms ease", transform: docsOpen ? "rotate(90deg)" : "none" }}>→</span>
            </div>
            {docsOpen && (
              <div style={{ padding: "0 0 14px", maxWidth: 720 }}>
                {docs.map((d) => {
                  const rowStyle: React.CSSProperties = {
                    display: "grid",
                    gridTemplateColumns: "34px 1fr 66px 18px",
                    gap: 16,
                    alignItems: "baseline",
                    borderTop: "0.5px solid rgba(241,238,229,0.12)",
                    padding: "13px 0",
                    color: d.tone,
                    cursor: d.href ? "pointer" : "default",
                  };
                  const inner = (
                    <>
                      <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "rgba(241,238,229,0.40)" }}>{d.n}</span>
                      <span style={{ fontSize: 13, lineHeight: 1.5 }}>{d.title}</span>
                      <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: d.kindTone }}>{d.kind}</span>
                      <span style={{ fontSize: 12, textAlign: "right", color: d.arrowTone }}>→</span>
                    </>
                  );
                  return d.href ? (
                    <a key={d.n} href={d.href} target="_blank" rel="noopener" className="cr-doc-row is-linked" style={rowStyle}>
                      {inner}
                    </a>
                  ) : (
                    <div key={d.n} className="cr-doc-row" style={rowStyle}>
                      {inner}
                    </div>
                  );
                })}
                <div style={{ borderTop: "0.5px solid rgba(241,238,229,0.12)", paddingTop: 14, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(241,238,229,0.35)" }}>
                  All 10 documents attached.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
