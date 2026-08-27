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
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "content-review",
    category: "Content Review",
    discipline: "Instructional Design",
    title: "Discovering Your Narrative Voice",
    summary:
      "Auditing and revising an existing course for a secure, closed-platform learning environment serving justice-involved learners — treating interaction and aesthetic choices as instructional decisions.",
    role: "Instructional Designer",
    focus: "Content Audit & Revision",
    cover: "/case-studies/content-review/audit-01.webp",
    coverAlt: "A person composing a shot with a camera, from the revised course.",
  },
];
