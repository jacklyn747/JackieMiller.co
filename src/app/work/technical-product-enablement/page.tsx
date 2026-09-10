import type { Metadata } from "next";
import CaseStudyTemplate from "@/components/case-studies/CaseStudyTemplate";

export const metadata: Metadata = {
  title: "Technical Product Enablement in 72-Hour Sprints — Jackie Miller",
  description:
    "A rapid ingestion engine turns release notes and PR summaries into customer-facing enablement decks within 72 hours of every release.",
};

export default function DeveloperEnablement() {
  return (
    <CaseStudyTemplate
      isDemonstration={true}
      eyebrow="Technical Enablement · Rapid Content Systems"
      title="Technical Product Enablement in 72-Hour Sprints"
      meta={[
        { label: "Organization", value: "Enterprise Developer Tooling / Cloud Infrastructure" },
        { label: "Role", value: "Lead Enablement Architect" },
        { label: "Timeline", value: "Continuous 72-Hour Sprint Engine" },
        { label: "AI Security Tier", value: "Air-Gapped Internal Pipeline" },
      ]}
      bottleneck="Bi-weekly software releases meant customer-facing teams (Solutions Architects, Account Executives) were consistently out of sync with product capabilities, resulting in sales cycle stalls and support ticket spikes."
      methodology={[
        "Created a rapid ingestion engine that parses developer release notes, GitHub PR summaries, and Jira tickets.",
        "Automated the generation of interactive customer scenario decks, objection-handling flashcards, and feature-benefit translation matrices.",
      ]}
      governance={[
        "Air-gapped pipeline ensuring unreleased product features remained strictly confidential inside internal firewalls.",
      ]}
      artifact="This engagement's release-note ingestion and translation pipeline follows the same context-bounded extraction pattern used across this site's own prompt architecture — bounded to only the source material provided, with a hard flag on anything it can't verify."
      impact={[
        "Compressed enablement delivery from 14 business days post-release to under 72 hours.",
        "31% decrease in Tier-1 technical escalations during major release windows.",
      ]}
    />
  );
}
