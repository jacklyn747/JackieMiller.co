import MacSim from "./MacSim";
import TabletMock from "./TabletMock";
import ProcessDocs from "./ProcessDocs";
import "../content-review.css"; // reuse the dark-editorial case-study chrome (.cr-root, .cr-wrap, grids)
import "./dl.css";

const DOCS = [
  { title: "Needs & Audience Analysis", file: "needs-and-audience-analysis" },
  { title: "Task & Content Analysis", file: "task-and-content-analysis" },
  { title: "Learning Objectives", file: "learning-objectives" },
  { title: "Instructional Strategy & Approach", file: "instructional-strategy-and-approach" },
  { title: "Style Guide & Design Rationale", file: "style-guide-design-rationale" },
  { title: "Accessibility & Inclusivity Checklist", file: "accessibility-inclusivity-checklist" },
  { title: "Content Quality Rubric", file: "content-quality-rubric" },
  { title: "Evaluation Plan", file: "evaluation-plan" },
  { title: "Content Outline / Blueprint", file: "content-outline-blueprint" },
  { title: "Storyboard / Wireframe", file: "storyboard-wireframe" },
];

/* Digital Literacy Fundamentals — full-course case study.
   Same dark-editorial language as Content Review (continuity), adapted for a
   built course: glam tablet lesson mockups + a live capstone simulation. */

function SectionLabel({ children, trailing, margin }: { children: React.ReactNode; trailing?: React.ReactNode; margin: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 11, fontWeight: 500, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(241,238,229,0.72)", margin }}>
      <span>{children}</span>
      <span style={{ flex: 1, height: 0, borderTop: "0.5px solid rgba(241,238,229,0.18)" }} />
      {trailing}
    </div>
  );
}

const LESSONS = [
  { n: 1, unit: "Orientation", head: "Motivation before mechanics.", teaches: "Laptop fluency is framed against something the learner already wants — a job, an interview, a message home — before a single skill is taught." },
  { n: 2, unit: "The Mouse", head: "Predict, then reveal.", teaches: "Click, double-click, right-click, and drag are taught as a discrimination task, not a lecture. The learner guesses the outcome first, then checks it." },
  { n: 3, unit: "The Keyboard", head: "Correction is a skill.", teaches: "Typing, Backspace, Enter, and Shift — practiced against a seeded typo the learner fixes, so making and fixing a mistake is the exercise, not a failure." },
  { n: 4, unit: "Windows", head: "Correcting a misconception.", teaches: "Open, close, minimize, and switch — built entirely around the belief that minimizing a window deletes your work, then disproving it directly." },
  { n: 5, unit: "The Desktop", head: "Last, on purpose.", teaches: "Icons and the taskbar come last, because the taskbar has no meaning until the learner has lost a window after minimizing it in the lesson before." },
];

const RUBRIC = [
  { label: "Platform independence (no internet required)", score: 4 },
  { label: "Learner control & non-punitive pacing", score: 4 },
  { label: "Names the real-device transfer explicitly", score: 4 },
  { label: "Plain-language reading level (8th–9th grade)", score: 3 },
  { label: "Forgiving tap targets, verified on device", score: 2 },
  { label: "Formal WCAG contrast pass", score: 2 },
];
const FILL: Record<number, string> = { 1: "var(--oxblood)", 2: "rgba(93,15,14,0.62)", 3: "rgba(227,200,194,0.55)", 4: "#E3C8C2" };

export default function DigitalLiteracy() {
  return (
    <main className="cr-root">
      <div style={{ position: "relative" }}>
        <div className="cr-wrap" style={{ position: "relative", maxWidth: 1160, margin: "0 auto", padding: "0 48px" }}>

          {/* Hero */}
          <div style={{ padding: "80px 0 0", maxWidth: 980 }}>
            <SectionLabel margin="0 0 34px">Course Design</SectionLabel>
            <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(44px,6.2vw,82px)", lineHeight: 1.02, letterSpacing: "0.015em", textTransform: "uppercase", margin: 0, maxWidth: "16ch", textWrap: "pretty", color: "var(--paper)" }}>
              Digital Literacy Fundamentals
            </h1>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginTop: 32, maxWidth: "62ch" }}>
              <span style={{ flex: "0 0 auto", width: 44, height: 0, borderTop: "0.5px solid #E3C8C2", marginTop: 16 }} />
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(19px,2.2vw,26px)", lineHeight: 1.34, color: "#E3C8C2", margin: 0, textWrap: "pretty" }}>
                A full six-lesson course that teaches first-time users the four input domains of a laptop — built for learners preparing for reentry, where the first real laptop they touch might be at a job interview.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 26px", marginTop: 44, paddingTop: 22, borderTop: "0.5px solid rgba(241,238,229,0.18)", fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {[["Role", "Instructional Designer"], ["Focus", "Full Course Design · ADDIE"], ["Delivery", "Tablet, self-paced"]].map(([k, v]) => (
                <span key={k} style={{ color: "rgba(241,238,229,0.55)" }}>{k}<span style={{ color: "rgba(241,238,229,0.30)", padding: "0 8px" }}>/</span><span style={{ color: "var(--paper)" }}>{v}</span></span>
              ))}
            </div>
          </div>

          {/* The Challenge */}
          <SectionLabel margin="96px 0 30px">The Challenge</SectionLabel>
          <p style={{ maxWidth: "64ch", fontSize: 17, lineHeight: 1.72, color: "rgba(241,238,229,0.90)", margin: 0, textWrap: "pretty" }}>
            This isn&apos;t onboarding. A learner may take this course days before release, then sit down at a library or a job center and have to operate a laptop they&apos;ve never touched — with no one there to help. Not knowing how has stopped being just a platform barrier. It&apos;s now an employment barrier, and the deadline is real.
          </p>
          <div className="cr-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, marginTop: 56, borderTop: "0.5px solid rgba(241,238,229,0.18)" }}>
            {[
              { t: "First laptop, ever", accent: false, d: "M4 6h16v11H4z M2 20h20" },
              { t: "No internet access", accent: false, d: "M5 12a9 9 0 0 1 14 0 M8.5 15a5 5 0 0 1 7 0 M12 18h.01" },
              { t: "No IT support", accent: false, d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M9 9a3 3 0 0 1 5 2c0 2-3 2-3 4" },
              { t: "A real external deadline", accent: true, d: "M12 7v5l3 2 M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18" },
            ].map((c, i, arr) => (
              <div key={c.t} style={{ display: "flex", flexDirection: "column", gap: 20, padding: i === 0 ? "30px 26px 0 0" : i === arr.length - 1 ? "30px 0 0 26px" : "30px 26px 0", borderRight: i < arr.length - 1 ? "0.5px solid rgba(241,238,229,0.18)" : undefined }}>
                <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke={c.accent ? "#E3C8C2" : "var(--paper)"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d={c.d} /></svg>
                <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.5, color: c.accent ? "#E3C8C2" : "var(--paper)" }}>{c.t}</div>
              </div>
            ))}
          </div>

          {/* The Course — 6-lesson architecture */}
          <SectionLabel margin="96px 0 44px" trailing={<span style={{ color: "rgba(241,238,229,0.55)" }}>Six lessons</span>}>The Course</SectionLabel>
          <div className="cr-grid-process" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", alignItems: "start" }}>
            {[
              ["01", "Orientation", "Why"], ["02", "The Mouse", "Click"], ["03", "The Keyboard", "Type"],
              ["04", "Windows", "Manage"], ["05", "The Desktop", "Navigate"], ["06", "Capstone", "Do it live"],
            ].map(([num, title, sub], i, a) => {
              const last = i === a.length - 1;
              return (
                <div key={num} style={{ display: "flex", flexDirection: "column", gap: 22, paddingRight: last ? 0 : 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 0, height: 12 }}>
                    <span style={{ flex: "0 0 auto", width: 9, height: 9, background: last ? "var(--oxblood)" : "#E3C8C2", border: last ? "0.5px solid #E3C8C2" : undefined, borderRadius: "50%" }} />
                    <span style={{ flex: 1, height: 0, borderTop: last ? undefined : "0.5px solid rgba(241,238,229,0.30)" }} />
                    {!last && <span style={{ flex: "0 0 auto", color: "rgba(241,238,229,0.30)", fontSize: 12, lineHeight: 1, marginLeft: -1 }}>→</span>}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: "0.20em", color: "#E3C8C2", marginBottom: 12 }}>{num}</div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, lineHeight: 1.1, letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--paper)" }}>{title}</div>
                    <div style={{ fontSize: 12, letterSpacing: "0.10em", textTransform: "uppercase", lineHeight: 1.5, color: "rgba(241,238,229,0.62)", marginTop: 10 }}>{sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ maxWidth: "64ch", fontSize: 15, lineHeight: 1.7, color: "rgba(241,238,229,0.66)", margin: "34px 0 0", textWrap: "pretty" }}>
            The order is fixed by prerequisite, not topic. The Desktop comes last on purpose — the taskbar has no instructional value until the learner has lost a window after minimizing it, which is exactly what Windows teaches them to do first.
          </p>

          {/* The teaching lessons — glam tablet mockups */}
          <SectionLabel margin="96px 0 8px" trailing={<span style={{ color: "rgba(241,238,229,0.55)" }}>On the tablet</span>}>The Teaching Lessons</SectionLabel>
          <p style={{ maxWidth: "60ch", fontSize: 15, lineHeight: 1.7, color: "rgba(241,238,229,0.7)", margin: "0 0 40px", textWrap: "pretty" }}>
            Five short lessons delivered on the tablet the learner already has, in the course&apos;s own visual system.
          </p>
          <div className="dl-lessons">
            {LESSONS.map((l) => (
              <div key={l.n} className="dl-lesson">
                <TabletMock lesson={l.n} />
                <div className="dl-lesson__cap">
                  <div className="dl-lesson__unit"><span>{String(l.n).padStart(2, "0")}</span> {l.unit}</div>
                  <h3>{l.head}</h3>
                  <p>{l.teaches}</p>
                </div>
              </div>
            ))}
          </div>

          {/* The Capstone — the live simulation */}
          <div className="dl-capstone-intro">
            <SectionLabel margin="104px 0 30px" trailing={<span style={{ color: "#E3C8C2" }}>Live</span>}>The Capstone</SectionLabel>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(30px,3.8vw,48px)", lineHeight: 1.08, letterSpacing: "0.015em", textTransform: "uppercase", margin: 0, maxWidth: "18ch", color: "var(--paper)" }}>
              Then the sixth lesson breaks the pattern
            </h2>
            <p style={{ maxWidth: "66ch", fontSize: 17, lineHeight: 1.72, color: "rgba(241,238,229,0.9)", margin: "26px 0 0", textWrap: "pretty" }}>
              The teaching lessons look like the course. The capstone deliberately doesn&apos;t — it looks like a real laptop, because the whole point is transfer to a device the learner will one day use unsupervised. So the final lesson is a live, working desktop. Open a file. Drag one to the Trash. Move a window, minimize it, find it again. Every action names its real-world equivalent as you go.
            </p>
            <p style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#E3C8C2", margin: "22px 0 0" }}>
              This one is real — try it ↓
            </p>
          </div>
        </div>

        {/* full-bleed sim */}
        <div className="dl-sim-wrap">
          <div className="dl-sim"><MacSim /></div>
          <div className="dl-sim-note">A working prototype of the capstone environment · best explored on a computer</div>
        </div>

        <div className="cr-wrap" style={{ position: "relative", maxWidth: 1160, margin: "0 auto", padding: "0 48px" }}>

          {/* Data — content quality (placeholder) */}
          <SectionLabel margin="96px 0 0" trailing={
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(241,238,229,0.55)" }}>
              <span>Weak</span>
              {[1, 2, 3, 4].map((n) => <span key={n} style={{ width: 22, height: 8, background: FILL[n], border: "0.5px solid rgba(241,238,229,0.30)" }} />)}
              <span>Strong</span>
            </div>
          }>Content Quality</SectionLabel>
          <div style={{ marginTop: 36 }}>
            {RUBRIC.map((r) => (
              <div key={r.label} className="cr-rubric-row" style={{ display: "grid", gridTemplateColumns: "minmax(240px,40%) 1fr 44px", gap: 24, alignItems: "center", borderTop: "0.5px solid rgba(241,238,229,0.18)", padding: "18px 0" }}>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(241,238,229,0.90)", textWrap: "pretty" }}>{r.label}</div>
                <div className="cr-rubric-bar" style={{ height: 18, border: "0.5px solid rgba(241,238,229,0.18)", background: "rgba(241,238,229,0.05)" }}>
                  <div style={{ height: "100%", width: `${(r.score / 4) * 100}%`, background: FILL[r.score], borderRight: `0.5px solid ${r.score > 2 ? "rgba(241,238,229,0.30)" : "#E3C8C2"}` }} />
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, lineHeight: 1, textAlign: "right", color: "var(--paper)" }}>{r.score}</div>
              </div>
            ))}
            <div style={{ borderTop: "0.5px solid rgba(241,238,229,0.18)" }} />
          </div>
          <p style={{ maxWidth: "80ch", fontSize: 14, lineHeight: 1.7, color: "rgba(241,238,229,0.6)", margin: "22px 0 0", textWrap: "pretty" }}>
            <span style={{ color: "#E3C8C2", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: 11 }}>Placeholder data</span> — scored against the course&apos;s own Content Quality Rubric. The honest low marks (device-verified tap targets, a formal WCAG contrast pass) are flagged as open, not hidden. Real numbers to come.
          </p>

        </div>

        {/* Full-bleed oxblood rupture — the closing statement, oversized */}
        <div className="dl-rupture">
          <div className="dl-rupture__inner">
            <span className="mark" />
            <p className="lead">The first real laptop a learner touches may be at an interview, with no one there to help.</p>
            <p className="big">
              The whole course is built so that moment <em>isn’t the first time.</em>
            </p>
          </div>
        </div>

        {/* Full process documentation */}
        <div className="cr-wrap" style={{ position: "relative", maxWidth: 1160, margin: "0 auto", padding: "clamp(72px,10vw,110px) 48px 0" }}>
          <ProcessDocs base="/case-studies/digital-literacy" docs={DOCS} />
        </div>
      </div>
    </main>
  );
}
