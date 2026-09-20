"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Site-wide scroll reveal: every element with .rv fades + rises in once,
// the first time it's scrolled into view. Mounted once in the root layout
// so it applies across every route without each page wiring it up itself.
//
// The single-page "dreamscape" cover-pin and anchor-nav highlighter that
// used to live here targeted a homepage concept (one scrolling page, nav
// links as #anchors) that the site no longer uses — routes replaced
// anchors, so that code was dead weight matching nothing on the page.
export default function ScrollAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
