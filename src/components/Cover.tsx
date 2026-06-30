"use client";

export default function Cover() {
  return (
    <section className="cover relative h-screen min-h-[640px] overflow-hidden" style={{ background: "var(--cover-bg)" }}>

      {/* SVG filters — suede texture + deboss lighting */}
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" style={{ position: "absolute", overflow: "hidden", width: 0, height: 0 }}>
        <defs>
          <filter id="suede-cover" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="1.05 0.24" numOctaves={6} seed={17} stitchTiles="stitch" result="noise"/>
            <feDiffuseLighting in="noise" lightingColor="white" surfaceScale={0.8} diffuseConstant={1.6} kernelUnitLength={1} result="lit">
              <feDistantLight azimuth={112} elevation={66}/>
            </feDiffuseLighting>
            <feColorMatrix in="lit" type="saturate" values="0" result="grey-lit"/>
            <feComponentTransfer in="grey-lit" result="dim-lit">
              <feFuncR type="linear" slope={0.06}/>
              <feFuncG type="linear" slope={0.06}/>
              <feFuncB type="linear" slope={0.06}/>
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="dim-lit" mode="screen"/>
          </filter>

          <filter id="deboss-name" x="-6%" y="-25%" width="116%" height="155%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation={3.5} result="bump"/>
            <feSpecularLighting in="bump" lightingColor="rgb(226,219,203)" surfaceScale={7} specularConstant={1.1} specularExponent={18} kernelUnitLength={1} result="spec">
              <feDistantLight azimuth={138} elevation={26}/>
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceAlpha" operator="in" result="spec-on-text"/>
            <feBlend in="SourceGraphic" in2="spec-on-text" mode="screen"/>
          </filter>
        </defs>
      </svg>

      {/* Suede leather surface */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--cover-bg)", filter: "url(#suede-cover)", zIndex: 0 }} aria-hidden="true"/>

      {/* Binding */}
      <div className="absolute left-0 top-0 bottom-0 w-[22px] flex flex-col justify-between py-10 border-r" style={{ background: "#0a0908", borderColor: "rgba(241,238,229,0.05)", zIndex: 10 }} aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-[2px]" style={{ background: "rgba(241,238,229,0.07)" }}/>
        ))}
      </div>

      {/* Grain texture */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08, mixBlendMode: "screen", zIndex: 1 }} aria-hidden="true"/>

      {/* Annotation */}
      <div className="absolute top-[58px] left-16 z-[9] animate-fade-up" style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--ox)", opacity: 0, animation: "fade-up 0.6s ease 1.4s forwards" }} aria-hidden="true">
        vol. 01 — ongoing
      </div>

      {/* Monogram */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[5]">
        <span
          className="block text-center whitespace-nowrap"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(160px, 26vw, 520px)",
            letterSpacing: "0.05em",
            lineHeight: 1,
            background: "linear-gradient(175deg, rgba(241,238,229,0.22) 0%, rgba(241,238,229,0.14) 35%, rgba(241,238,229,0.07) 70%, rgba(241,238,229,0.03) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "url(#deboss-name)",
            opacity: 0,
            animation: "name-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s forwards",
          }}
        >
          JM
        </span>
        <div
          className="mt-8"
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(241,238,229,0.22)",
            opacity: 0,
            animation: "fade-up 0.6s ease 0.85s forwards",
          }}
        >
          Systems Design · Houston, TX · Jackie Miller
        </div>
      </div>

      {/* Footer CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 flex justify-center items-center z-[6]"
        style={{
          padding: "20px 56px 28px",
          borderTop: "0.5px solid rgba(241,238,229,0.08)",
          opacity: 0,
          animation: "fade-up 0.6s ease 1.0s forwards",
        }}
      >
        <a
          href="#opener"
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(241,238,229,0.38)",
            textDecoration: "none",
            transition: "color 200ms",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(241,238,229,0.8)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(241,238,229,0.38)")}
        >
          Open the notebook <em>→</em>
        </a>
      </div>

      <style>{`
        @keyframes name-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 0.75; transform: none; }
        }
      `}</style>
    </section>
  );
}
