// Registry of published case studies. The /work index renders from this;
// each entry's `slug` maps to a page at /work/<slug>.
// Add a new object here (and its page) when a case study ships.

export type CaseStudy = {
  slug: string;
  category: string;
  discipline: string;
  title: string;
  summary: string;
  role: string;
  focus: string;
  cover: string;
  coverAlt: string;
  live?: boolean; // render a live component cover (see /work page) instead of an image
  statNum?: string; // render a stat-face cover instead of an image (see /work page)
  statLabel?: string;
  isDemonstration?: boolean; // synthesized/anonymized case study — carries the Security Footnote
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "digital-literacy",
    category: "Course Design",
    discipline: "Instructional Design",
    title: "Digital Literacy Fundamentals",
    summary:
      "A full six-lesson course teaching first-time users the four input domains of a laptop — with a live, interactive capstone simulation — for learners preparing for reentry.",
    role: "Instructional Designer",
    focus: "Full Course Design",
    cover: "/case-studies/digital-literacy/cover.png",
    coverAlt: "The Digital Literacy Fundamentals course open to its title screen on a tablet.",
  },
  {
    slug: "fintech-systems-onboarding",
    category: "Enterprise Onboarding",
    discipline: "AI-Accelerated Instructional Design",
    title: "Enterprise Systems Modernization & Onboarding",
    summary:
      "Training 2,400 distributed operators on a new core banking interface — an automated SME synthesis pipeline compressed a 14-week baseline to 21 days.",
    role: "Principal Learning Experience Architect",
    focus: "AI-Accelerated Curriculum Sprint",
    cover: "",
    coverAlt: "",
    statNum: "78%",
    statLabel: "Faster Time-to-Certification",
    isDemonstration: true,
  },
  {
    slug: "leadership-simulation",
    category: "Leadership Simulation",
    discipline: "Persona Architecture & Narrative Design",
    title: "High-Stakes Leadership Role-Play Simulation",
    summary:
      "Synthetic stakeholder personas replaced a live-actor training budget for coaching and retention conversations, scaled across 800+ facilities.",
    role: "Simulation Architect & Narrative Designer",
    focus: "Persona-Driven Simulation Design",
    cover: "",
    coverAlt: "",
    statNum: "$180K",
    statLabel: "Live-Actor Budget Replaced",
    isDemonstration: true,
  },
  {
    slug: "developer-enablement",
    category: "Technical Enablement",
    discipline: "Rapid Content Systems",
    title: "Technical Product Enablement in 72-Hour Sprints",
    summary:
      "A rapid ingestion engine turns release notes and PR summaries into customer-facing enablement decks within 72 hours of every release.",
    role: "Lead Enablement Architect",
    focus: "Continuous Sprint Engine",
    cover: "",
    coverAlt: "",
    statNum: "72 HRS",
    statLabel: "Release-to-Enablement",
    isDemonstration: true,
  },
];
