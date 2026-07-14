// Email capture via Buttondown. To activate: create the Buttondown account,
// then set BUTTONDOWN_USERNAME below. Until then a quiet placeholder renders.
const BUTTONDOWN_USERNAME = "";

export default function SubscribeForm() {
  if (!BUTTONDOWN_USERNAME) {
    return (
      <p style={{ fontSize: 13, color: "var(--ink-mid)", fontStyle: "italic" }}>
        Email delivery is coming — for now, notes land here weekly.
      </p>
    );
  }
  return (
    <form
      action={`https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`}
      method="post"
      target="_blank"
      className="flex gap-3 flex-wrap"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        aria-label="Email address"
        style={{
          background: "transparent",
          border: "1px solid var(--ink-dim)",
          padding: "10px 14px",
          fontSize: 14,
          fontFamily: "var(--font-sans)",
          color: "var(--ink)",
          minWidth: 240,
        }}
      />
      <button
        type="submit"
        style={{
          background: "var(--ox)",
          color: "var(--paper)",
          border: "none",
          padding: "10px 18px",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Get the notes
      </button>
    </form>
  );
}
