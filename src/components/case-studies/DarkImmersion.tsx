"use client";

import { useEffect, useRef, useState } from "react";
import "./dark-immersion.css";

/**
 * DarkImmersion — Full-bleed dark editorial wrapper for case study deep-dives.
 *
 * Native JavaScript IntersectionObserver monitors when core narrative container
 * hits 30% visibility in viewport. Triggers smooth dark-mode class toggle with
 * hardware-accelerated CSS transition (0.6s cubic-bezier(0.25, 1, 0.5, 1)).
 *
 * Perfectly fluid on mobile and desktop with zero performance lag.
 *
 * Usage:
 * <DarkImmersion>
 *   <YourCaseStudyContent />
 * </DarkImmersion>
 *
 * Props:
 * - startDark: If true, starts in dark mode without transition (default: false)
 * - activateOnScroll: If true, activates when scrolled into view (default: true)
 * - activationThreshold: Percentage of element visible before activating (default: 0.3 = 30%)
 */
interface DarkImmersionProps {
  children: React.ReactNode;
  startDark?: boolean;
  activateOnScroll?: boolean;
  activationThreshold?: number;
}

export default function DarkImmersion({
  children,
  startDark = false,
  activateOnScroll = true,
  activationThreshold = 0.3, // 30% visibility threshold
}: DarkImmersionProps) {
  const [isActive, setIsActive] = useState(startDark);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activateOnScroll) {
      setIsActive(startDark);
      return;
    }

    // Native IntersectionObserver for efficient scroll detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle dark mode when 30% of container is visible
        setIsActive(entry.isIntersecting && entry.intersectionRatio >= activationThreshold);
      },
      {
        // Fine-grained thresholds for smooth activation
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        // Slight root margin to prevent premature activation
        rootMargin: "-5% 0px -5% 0px",
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, [activateOnScroll, startDark, activationThreshold]);

  return (
    <div
      ref={wrapperRef}
      className={`dark-immersion ${isActive ? "dark-immersion--active" : ""}`}
      data-immersion-state={isActive ? "active" : "inactive"}
    >
      <div className="dark-immersion__content">
        {children}
      </div>
    </div>
  );
}
