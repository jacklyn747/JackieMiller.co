import { existsSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import MeetJackie from "@/components/MeetJackie";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Jackie Miller — Instructional Designer",
  description:
    "Meet Jackie Miller — instructional designer for justice-involved learners, in a rapid-fire interview. On both sides of the locked door.",
};

// The portrait appears automatically once the file is in place. Drop it at
// public/about/portrait.(jpg|jpeg|png|webp) — no code change needed.
function findPortrait(): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const rel = `about/portrait.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", rel))) return `/${rel}`;
  }
  return null;
}

export default function Home() {
  return (
    <>
      <SiteNav />
      <MeetJackie portrait={findPortrait()} />
      <ThemeToggle />
    </>
  );
}
