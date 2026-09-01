import { existsSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import MeetJackie from "@/components/MeetJackie";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "About — Jackie Miller",
  description:
    "Meet Jackie Miller — instructional designer for justice-involved and underserved learners. On both sides of the locked door.",
};

// Portrait appears once dropped at public/about/portrait.(jpg|jpeg|png|webp).
function findPortrait(): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const rel = `about/portrait.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", rel))) return `/${rel}`;
  }
  return null;
}

// Interim About: the rapid-fire interview, relocated here from the homepage.
// Box 03 builds this out (story → education → skills & tools → testimonials).
export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <MeetJackie portrait={findPortrait()} />
      <ThemeToggle />
    </>
  );
}
