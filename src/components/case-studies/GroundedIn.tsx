/* "Grounded in" — the frameworks a given case study actually applies,
   named as tags in the dark-editorial case-study language. Only ever the
   evidenced subset for that project, laddering up to the site-wide Approach. */

export default function GroundedIn({ items }: { items: string[] }) {
  return (
    <div style={{ marginTop: 40 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          color: "rgba(241,238,229,0.72)",
          marginBottom: 18,
        }}
      >
        <span>Grounded in</span>
        <span style={{ flex: 1, height: 0, borderTop: "0.5px solid rgba(241,238,229,0.18)" }} />
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 10 }}>
        {items.map((t) => (
          <li key={t} className="ds-chip ds-chip--dark">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
