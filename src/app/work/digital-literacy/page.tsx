import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import DigitalLiteracy from "@/components/case-studies/digital-literacy/DigitalLiteracy";

export const metadata: Metadata = {
  title: "Digital Literacy Fundamentals — Jackie Miller",
  description:
    "A full six-lesson digital-literacy course for first-time device users preparing for reentry — glam tablet lessons and a live, interactive laptop capstone simulation.",
};

export default function DigitalLiteracyPage() {
  return (
    <>
      <SiteNav />
      <DigitalLiteracy />
    </>
  );
}
