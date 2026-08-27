import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import ContentReview from "@/components/case-studies/ContentReview";

export const metadata: Metadata = {
  title: "Content Review — Discovering Your Narrative Voice · Jackie Miller",
  description:
    "An audit and revision of an existing course for a secure, closed-platform learning environment serving justice-involved learners — treating interaction and aesthetic choices as instructional decisions.",
};

export default function ContentReviewCaseStudyPage() {
  return (
    <>
      <SiteNav />
      <ContentReview />
    </>
  );
}
