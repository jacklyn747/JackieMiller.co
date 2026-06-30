"use client";

import { useEffect, useRef } from "react";

const links = [
  { href: "#opener",   label: "00 Start Here" },
  { href: "#starts",   label: "01 How It Starts" },
  { href: "#thinking", label: "02 How I Think" },
  { href: "#built",    label: "03 What I've Built" },
  { href: "#behind",   label: "04 Who's Behind This" },
  { href: "#threads",  label: "05 Loose Threads" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cover = document.querySelector(".cover");
    const nav = navRef.current;
    if (!cover || !nav) return;

    const observer = new IntersectionObserver(
      ([entry]) => nav.classList.toggle("nav-visible", !entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(cover);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        nav {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }
        nav.nav-visible {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-12 h-14 border-b"
        style={{ background: "var(--ink)", borderColor: "rgba(241,238,229,0.1)" }}
      >
        <span style={{ fontFamily: "var(--font-hand)", fontSize: 22, fontWeight: 600, color: "var(--paper)", letterSpacing: "0.01em" }}>
          Jackie Miller
        </span>
        <ul className="flex gap-9 list-none">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(241,238,229,0.38)", textDecoration: "none", transition: "color 120ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--paper)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(241,238,229,0.38)")}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
