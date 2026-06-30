import Cover from "@/components/Cover";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Cover />

        {/* Placeholder sections — content to follow */}
        <section id="opener" style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 32, color: "var(--ink)", opacity: 0.3 }}>00 — Start Here</p>
        </section>

        <section id="starts" style={{ minHeight: "100vh", background: "var(--paper2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 32, color: "var(--ink)", opacity: 0.3 }}>01 — How It Starts</p>
        </section>

        <section id="thinking" style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 32, color: "var(--ink)", opacity: 0.3 }}>02 — How I Think</p>
        </section>

        <section id="built" style={{ minHeight: "100vh", background: "var(--ox)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 32, color: "var(--paper)", opacity: 0.5 }}>03 — What I&apos;ve Built</p>
        </section>

        <section id="behind" style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 32, color: "var(--ink)", opacity: 0.3 }}>04 — Who&apos;s Behind This</p>
        </section>

        <section id="threads" style={{ minHeight: "100vh", background: "var(--ox)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 32, color: "var(--paper)", opacity: 0.5 }}>05 — Loose Threads</p>
        </section>
      </main>
    </>
  );
}
