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
    cover: "",
    coverAlt: "Digital Literacy Fundamentals course on a tablet.",
    live: true,
  },
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
