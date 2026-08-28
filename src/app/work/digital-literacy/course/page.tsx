import type { Metadata } from "next";
import Course from "@/components/case-studies/digital-literacy/course/Course";

export const metadata: Metadata = {
  title: "Digital Literacy Fundamentals — the course — Jackie Miller",
  description:
    "The complete, playable six-lesson Digital Literacy Fundamentals course: five interactive tablet lessons and a live laptop capstone, built for first-time device users preparing for reentry.",
};

/* Full-screen, immersive — no site nav. The course paints its own dark stage. */
export default function DigitalLiteracyCoursePage() {
  return <Course />;
}
