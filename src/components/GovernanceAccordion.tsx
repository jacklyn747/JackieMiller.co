"use client";

import { useState } from "react";
import "./governance-accordion.css";

type Panel = { q: string; a: string };

const PANELS: Panel[] = [
  {
    q: "Where does my enterprise data go?",
    a: "Nowhere. Workflows run exclusively through private, enterprise-tier environments configured with Zero Data Retention (ZDR) agreements. Proprietary SOPs, internal transcripts, and proprietary knowledge bases are never ingested into public model training sets.",
  },
  {
    q: "How do you prevent hallucinations and factual inaccuracies?",
    a: "Models are strictly constrained using closed-context retrieval (grounding prompts) and bounded system parameters. More importantly, we enforce a mandatory Human-in-the-Loop (HITL) gate: no instructional objective, technical task, or assessment item is finalized without subject-matter and instructional validation.",
  },
  {
    q: "How does this differ from generic “AI-generated” content?",
    a: "Anyone can ask an LLM to “write a 5-question quiz.” That produces shallow, generic “slop.” I build multi-layered system prompt architectures that enforce specific pedagogical structures, tone constraints, Bloom-level targeting, and behavioral branch points. AI handles raw synthesis; instructional design governs the output.",
  },
];

export default function GovernanceAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-8 md:mt-10 border-t-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
      {PANELS.map((panel, i) => {
        const expanded = open === i;
        return (
          <div key={panel.q} className="border-b-[0.5px]" style={{ borderColor: "var(--ink-dim)" }}>
            <button
              type="button"
              className="gov-q flex w-full items-center justify-between gap-4 py-5 md:py-6 px-1 text-left text-[15px] md:text-lg font-semibold"
              style={{ color: "var(--ink)" }}
              aria-expanded={expanded}
              aria-controls={`gov-panel-${i}`}
              onClick={() => setOpen(expanded ? null : i)}
            >
              <span>{panel.q}</span>
              <span className="text-lg flex-shrink-0" style={{ color: "var(--ox-accent)" }} aria-hidden="true">
                {expanded ? "–" : "+"}
              </span>
            </button>
            <div id={`gov-panel-${i}`} className="max-w-[68ch] px-1 pb-5 md:pb-6" role="region" hidden={!expanded}>
              <p className="text-[14.5px] leading-relaxed" style={{ color: "var(--ink-mid)" }}>
                {panel.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
