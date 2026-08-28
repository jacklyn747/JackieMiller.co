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
    cover: "/case-studies/digital-literacy/cover.png",
    coverAlt: "The Digital Literacy Fundamentals course open to its title screen on a tablet.",
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
    cover: "/case-studies/content-review/cover.png",
    coverAlt: "The Discovering Your Narrative Voice course on a tablet title screen.",
  },
];
