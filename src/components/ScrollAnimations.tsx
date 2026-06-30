"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cover page-turn — pin the cover, scrub it upward as user scrolls
      // Creates the feel of lifting the front cover of a journal
      const cover = document.querySelector<HTMLElement>(".cover");
      if (cover) {
        gsap.to(cover, {
          yPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: cover,
            start: "top top",
            end: "+=100%",
            scrub: 1.2,
            pin: true,
            pinSpacing: false,
          },
        });
      }

      // Section entrance — every .rv element fades + rises in when scrolled to
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

      // Nav active state — highlight link when its section is in view
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const navLinks = document.querySelectorAll<HTMLAnchorElement>("nav a[href^='#']");

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActive(section.id),
          onEnterBack: () => setActive(section.id),
        });
      });

      function setActive(id: string) {
        navLinks.forEach((a) => {
          const active = a.getAttribute("href") === `#${id}`;
          a.style.color = active ? "rgba(241,238,229,0.9)" : "rgba(241,238,229,0.38)";
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
