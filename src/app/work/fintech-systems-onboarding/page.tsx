import type { Metadata } from "next";
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate";

export const metadata: Metadata = {
  title: "Enterprise Systems Modernization & Onboarding — Jackie Miller",
  description:
    "Training 2,400 distributed operators on a new core banking interface — 14 weeks compressed to 21 days via an automated SME synthesis pipeline.",
};

export default function FintechSystemsOnboarding() {
  return (
    <CaseStudyTemplate
      eyebrow="Enterprise Onboarding · AI-Accelerated Instructional Design"
      title="Enterprise Systems Modernization & Onboarding"
      meta={[
        { label: "Organization", value: "Global FinTech / Enterprise SaaS" },
        { label: "Role", value: "Principal Learning Experience Architect" },
        { label: "Timeline", value: "3 Weeks (vs. 14-week baseline)" },
        { label: "AI Security Tier", value: "Level 4 Enterprise Sandbox (Zero Data Retention)" },
      ]}
      bottleneck="A major platform migration required training 2,400 distributed operators on an entirely new core banking interface. Traditional curriculum design was quoted at 3.5 months, which would have delayed the product launch and incurred massive double-licensing costs."
      methodology={[
        "Built an automated SME transcript synthesis pipeline that ingested 15 hours of engineering walkthroughs in a private sandbox, distilling them into 12 core workflow competencies.",
        "Used structured system prompt chains to draft micro-learning modules, click-through system simulation guides, and contextual error-recovery challenges.",
      ]}
      governance={[
        "Customer PII and internal API tokens were stripped prior to analysis.",
        "100% human-verified against engineering acceptance criteria.",
      ]}
      artifact="This engagement shipped as click-through system simulation guides and contextual error-recovery challenges, generated through the same prompt-chaining architecture used across every project on this site."
      impact={[
        "78% reduction in instructional production time (14 weeks down to 21 days).",
        "94% first-time pass rate on system certification.",
        "Zero security or privacy incidents across enterprise audit.",
      ]}
    />
  );
}
