import type { Metadata } from "next";
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate";

export const metadata: Metadata = {
  title: "High-Stakes Leadership Role-Play Simulation — Jackie Miller",
  description:
    "Synthetic stakeholder personas replaced a $180,000 live-actor training budget for coaching and retention conversations, scaled across 800+ facilities.",
};

export default function LeadershipSimulation() {
  return (
    <CaseStudyTemplate
      eyebrow="Leadership Simulation · Persona Architecture & Narrative Design"
      title="High-Stakes Leadership Role-Play Simulation"
      meta={[
        { label: "Organization", value: "Multi-Regional Healthcare Network" },
        { label: "Role", value: "Simulation Architect & Narrative Designer" },
        { label: "Timeline", value: "4 Weeks" },
        { label: "AI Security Tier", value: "Private Local Model Architecture" },
      ]}
      bottleneck={
        'Clinical managers were struggling with high-friction performance evaluations and retention conversations. Static e-learning was universally panned as "unrealistic," while live role-playing with human actors was cost-prohibitive to scale across 800+ facilities.'
      }
      methodology={[
        "Engineered a synthetic stakeholder persona framework, drawing directly from Character.ai behavioral modeling techniques.",
        "Built three distinct synthetic direct reports with hidden variables: emotional resistance, defensiveness, and motivation drivers.",
        "Integrated natural language input: managers conduct a live, text-based or voice-guided coaching conversation where the synthetic employee reacts in real time based on how well the manager applies active listening and conflict-de-escalation frameworks.",
      ]}
      governance={[
        "Model boundaries hardcoded to prevent unscripted persona drift or inappropriate conversational topics.",
        "Human-curated rubric evaluated every branching state.",
      ]}
      artifact="This engagement's synthetic personas were built on the same multi-stage persona conditioning architecture — state variables, boundary guardrails, behavioral thresholds — that underlies every persona-driven artifact on this site."
      impact={[
        "Replaced a $180,000 live-actor training budget with an on-demand, scalable simulation.",
        "4.8/5 learner rating, with 89% of managers reporting high confidence during actual subsequent performance reviews.",
      ]}
    />
  );
}
