import Swatch from "../Swatch.jsx";

export default function Hook({ data, headingRef, onStart }) {
  return (
    <section className="hook" aria-labelledby="hook-title">
      <Swatch hex={data.hook.swatch_hex} label={data.hook.swatch_label} size="hero" />
      <h1 id="hook-title" ref={headingRef} tabIndex={-1}>
        {data.hook.line}
      </h1>
      <p className="lede">
        Lightening hair doesn't erase warmth. It uncovers it. In about ten minutes I'll show you
        which warm tone shows up at each level, and which toner cancels it.
      </p>
      <p className="objective">
        <span className="eyebrow">By the end</span>
        Give me a starting level and a target level. You'll name the warmth that shows up and pick
        the toner that kills it.
      </p>
      <button type="button" className="btn btn--big" onClick={onStart}>
        Show me why
      </button>
    </section>
  );
}
