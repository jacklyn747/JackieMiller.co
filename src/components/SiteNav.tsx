"use client";

/* Global site navigation — the persistent "visible nav fallback" the
   dreamscape brief calls for, and the industry-standard portfolio nav.
   Four destinations, matching the site's four portals:
     Work · About · Field Notes · Contact
   Rendered as the site's dark "spine" (same treatment in both themes),
   sticky at the top of every page except the dreamscape homepage. */

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./site-nav.css";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname() ?? "";

  return (
    <header className="site-nav">
      <Link href="/" className="site-nav__mark">
        Jackie Miller
      </Link>
      <nav className="site-nav__links" aria-label="Primary">
        {LINKS.map((l) => {
          const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`site-nav__link${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
