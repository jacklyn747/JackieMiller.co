import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import CaseNav from "@/components/case-studies/CaseNav";
import GroundedIn from "@/components/case-studies/GroundedIn";
import SectionLabel from "@/components/case-studies/SectionLabel";
import PersonaChat from "@/components/case-studies/PersonaChat";
import "@/components/case-studies/content-review.css";
import "@/components/case-studies/persona.css";

export const metadata: Metadata = {
  title: "Persona Research — Jackie Miller",
  description:
    "A real interview with an Edovo user, turned into a friction map: the environmental and cognitive barriers that stop learning, and the design decisions each one drove.",
};

const ENV_FRICTION: [string, string][] = [
  ["Course assumes a laptop; he has a tablet", "Design for the device he actually holds — tablet-first, touch-first"],
  ["Pulled out by an on-call work order mid-lesson; loses his place", "Resume where he left off — save state, no penalty for the interruption"],
  ["No desk — hunched on a bunk or toilet, TV and dominoes loud, no AC in Texas heat", "Respect the body and the room — short segments, no forced sit-throughs"],
  ["A finance course with no built-in calculator", "The right tool, in context — an on-screen calculator where the math happens"],
];

const COGNITIVE_FRICTION: [string, string][] = [
  ["Fails a quiz → forced to rewatch the entire video, no pause or rewind", "Video as a resource, not a gate — scrub, rewind, review one part"],
  ["Has pen and paper, but no pause — can't stop to grasp a concept and write it down", "Pausable playback that makes room for note-taking"],
  ["Quizzes are multiple-choice / summary only — passable without understanding", "Assessment that teaches, checks comprehension, not just recall"],
  ["An abstract, unfamiliar concept (crypto) taught by passive video + a quiz", "Scaffolding to build a mental model — analogy, worked examples, interactive models"],
  ["Small frictions stack until putting the tablet down is the easiest thing in the room", "Lower the cost of continuing at every step — the pile is the enemy, not any one piece"],
  ["Effort feels disconnected from any payoff (a parole denial made finishing feel pointless)", "Visible progress + intrinsic competence — the motivation the system can't supply"],
];

const REFINEMENTS = [
  { t: "Built for interruption", d: "Progress saves automatically; he resumes exactly where he was pulled away, with no penalty." },
  { t: "Content broken into short segments", d: "Learnable in the fragments of time and comfort he actually gets, instead of one forced sit-through." },
  { t: "Video became a resource, not a gate", d: "Pause / rewind / scrub so a concept can be written down before the video moves on; a failed check returns you to the relevant moment, not the top." },
  { t: "Scaffolding for abstract, unfamiliar concepts", d: "Analogy, visual worked examples, and interactive models build a mental picture for a topic with no real-world anchor." },
  { t: "The right tool, in context", d: "An on-screen calculator inside the finance material." },
  { t: "Tablet-first, touch-first layout", d: "Designed for the device he actually holds." },
];

export default function PersonaPage() {
  return (
    <>
      <SiteNav />
      <main className="cr-root" id="main-content">
        <div className="cr-wrap" style={{ maxWidth: 1160, margin: "0 auto", padding: "0 48px" }}>
          {/* Hero */}
          <div style={{ padding: "80px 0 0", maxWidth: 920 }}>
            <SectionLabel margin="0 0 34px" trailing={<span style={{ color: "rgba(241,238,229,0.55)" }}>Primary research</span>}>
              Persona Research
            </SectionLabel>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(34px,5vw,64px)",
                lineHeight: 1.04,
                letterSpacing: "0.01em",
                color: "var(--paper)",
                textWrap: "balance",
                margin: 0,
              }}
            >
              A real interview, turned into a <em style={{ fontStyle: "italic", color: "#E3C8C2" }}>friction map.</em>
            </h1>
            <p style={{ marginTop: 22, maxWidth: "62ch", fontSize: 16, lineHeight: 1.7, color: "rgba(241,238,229,0.78)" }}>
              This is a real interview with a real Edovo user — conducted by someone he knows, relayed faithfully.
              What&apos;s public here is a de-identified composite, labeled everywhere as{" "}
              <strong style={{ color: "var(--paper)" }}>&ldquo;based on real interviews with Edovo users.&rdquo;</strong>{" "}
              No name, no identifying detail — the honesty is about the method, not his identity.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 16px", marginTop: 40 }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px,3.2vw,38px)", letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--paper)" }}>
                Marcus
              </span>
              <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(241,238,229,0.5)" }}>
                Composite · based on real interviews with Edovo users
              </span>
            </div>
            <ul style={{ listStyle: "none", margin: "20px 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["27 years inside", "Tablet only", "On-call prison job", "Recently denied parole", "Attempting: crypto, personal finance"].map((t) => (
                <li key={t} className="ds-chip ds-chip--dark">{t}</li>
              ))}
            </ul>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(20px,2.4vw,28px)", lineHeight: 1.35, color: "#E3C8C2", margin: "28px 0 0", maxWidth: "32ch", textWrap: "pretty" }}>
              &ldquo;You can&apos;t learn something you&apos;ve never touched just by watching it.&rdquo;
            </p>
          </div>

          {/* Friction map — environmental */}
          <SectionLabel margin="96px 0 12px" trailing={<span style={{ color: "rgba(241,238,229,0.55)" }}>The environment he learns in</span>}>
            Environmental Friction
          </SectionLabel>
          <p style={{ maxWidth: "64ch", fontSize: 14.5, lineHeight: 1.65, color: "rgba(241,238,229,0.62)", margin: "0 0 8px" }}>
            What&apos;s outside him — the device, the room, the interruptions — that most course design never accounts for.
          </p>
          <div className="persona-friction">
            {ENV_FRICTION.map(([f, a]) => (
              <div key={f} className="persona-friction__row">
                <span>{f}</span>
                <span className="persona-friction__arrow" aria-hidden="true">→</span>
                <span>{a}</span>
              </div>
            ))}
          </div>

          {/* Friction map — cognitive / internal */}
          <SectionLabel margin="64px 0 12px" trailing={<span style={{ color: "rgba(241,238,229,0.55)" }}>What&apos;s happening in his head</span>}>
            Internal &amp; Cognitive Friction
          </SectionLabel>
          <p style={{ maxWidth: "64ch", fontSize: 14.5, lineHeight: 1.65, color: "rgba(241,238,229,0.62)", margin: "0 0 8px" }}>
            Working memory, motivation, and how a losing streak with a parole board reframes whether finishing means anything at all.
          </p>
          <div className="persona-friction">
            {COGNITIVE_FRICTION.map(([f, a]) => (
              <div key={f} className="persona-friction__row">
                <span>{f}</span>
                <span className="persona-friction__arrow" aria-hidden="true">→</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28, maxWidth: "62ch", fontSize: 15, lineHeight: 1.7, color: "rgba(241,238,229,0.78)" }}>
            No single row here stops him. <strong style={{ color: "var(--paper)" }}>Together</strong>, every time, the path of
            least resistance wins. That&apos;s the real design problem — not one barrier, but the way small ones compound.
          </p>

          {/* The simulated session */}
          <SectionLabel margin="88px 0 26px" trailing={<span style={{ color: "rgba(241,238,229,0.55)" }}>Simulated, not scripted-for-marketing</span>}>
            The Research Conversation
          </SectionLabel>
          <PersonaChat />

          {/* What it drove */}
          <SectionLabel margin="88px 0 26px" trailing={<span style={{ color: "rgba(241,238,229,0.55)" }}>Digital Literacy Fundamentals</span>}>
            The Refinement It Drove
          </SectionLabel>
          <div className="cr-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "36px 32px" }}>
            {REFINEMENTS.map((r) => (
              <div key={r.t}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 19, color: "var(--paper)", margin: "0 0 8px", textWrap: "pretty" }}>
                  {r.t}
                </h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "rgba(241,238,229,0.65)", margin: 0, textWrap: "pretty" }}>{r.d}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 40 }}>
            <Link href="/work/digital-literacy" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              See it live in the case study →
            </Link>
          </p>

          <div style={{ marginTop: 64 }}>
            <GroundedIn items={["Primary Research", "Trauma-Informed", "Learner Autonomy", "UDL", "Cognitive Load"]} />
          </div>
        </div>

        <div style={{ marginTop: 96 }}>
          <CaseNav nextHref="/work/digital-literacy" nextKicker="Course Design" nextTitle="Digital Literacy Fundamentals" />
        </div>
      </main>
    </>
  );
}
