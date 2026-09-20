/* Shared section-label chrome for the dark-editorial case-study pages —
   a small-caps label + trailing hairline, optional trailing note. */

export default function SectionLabel({
  children,
  trailing,
  margin,
  color = "rgba(241,238,229,0.72)",
}: {
  children: React.ReactNode;
  trailing?: React.ReactNode;
  margin: string;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.20em",
        textTransform: "uppercase",
        color,
        margin,
      }}
    >
      <span>{children}</span>
      <span style={{ flex: 1, height: 0, borderTop: "0.5px solid rgba(241,238,229,0.18)" }} />
      {trailing}
    </div>
  );
}
