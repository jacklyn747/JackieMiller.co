"use client";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <>
      <style>{`
        .theme-toggle .tt-dark  { display: none; }
        .theme-toggle .tt-light { display: inline; }
        [data-theme='dark'] .theme-toggle .tt-dark  { display: inline; }
        [data-theme='dark'] .theme-toggle .tt-light { display: none; }
        .theme-toggle:hover { opacity: 1; }
      `}</style>
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle lights"
        className="theme-toggle fixed bottom-6 right-6 z-[600] cursor-pointer"
        style={{
          fontFamily: "var(--font-hand)",
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: "var(--nav-fg)",
          background: "var(--nav-bg)",
          border: "1px solid rgba(241,238,229,0.16)",
          borderRadius: 999,
          padding: "6px 16px 8px",
          opacity: 0.82,
          boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
          transition: "opacity 200ms ease, background-color 0.45s ease",
        }}
      >
        <span className="tt-light">lights out ☾</span>
        <span className="tt-dark">lights on ☀</span>
      </button>
    </>
  );
}
