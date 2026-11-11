import { useState } from "react";
import Swatch from "../Swatch.jsx";
import { bestToner, lower, pigmentForLevel, tonerWorks } from "../lib.js";

const levelWord = (levels) => (levels.includes(" ") ? `levels ${levels}` : `level ${levels}`);

export default function ProveIt({ data, headingRef, onRestart }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [scenarioId]: { pigment, toner, checked } }
  const total = data.scenarios.length;
  const finished = index >= total;

  const scored = data.scenarios.map((s) => {
    const a = answers[s.id];
    if (!a?.checked) return { pigment: false, toner: false };
    const p = pigmentForLevel(data, s.goal);
    return { pigment: a.pigment === p.id, toner: tonerWorks(p, a.toner) };
  });
  const score = scored.reduce((n, r) => n + (r.pigment ? 1 : 0) + (r.toner ? 1 : 0), 0);
  const max = total * 2;

  if (finished) {
    return (
      <section aria-labelledby="prove-title">
        <span className="eyebrow">Prove it</span>
        <h2 id="prove-title" ref={headingRef} tabIndex={-1}>
          You got {score} of {max}.
        </h2>
        <p className="lede">
          {score === max
            ? "Clean sweep. You can call the warmth before you mix a thing."
            : score >= max - 2
              ? "Close. Go back to the Level Lab for the one that slipped."
              : "Worth another lap. Run the Level Lab again, then come back."}
        </p>
        <ol className="recap">
          {data.scenarios.map((s, i) => {
            const p = pigmentForLevel(data, s.goal);
            return (
              <li key={s.id}>
                Client {i + 1}: level {s.start} to {s.goal}. Warmth: {lower(p.name)}
                {scored[i].pigment ? " (you got it)" : " (missed)"}. Toner: {lower(bestToner(data, p).name)}
                {scored[i].toner ? " (you got it)" : " (missed)"}.
              </li>
            );
          })}
        </ol>
        <div className="row">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setAnswers({});
              setIndex(0);
            }}
          >
            Try the clients again
          </button>
          <button type="button" className="btn btn--ghost" onClick={onRestart}>
            Start the lesson over
          </button>
        </div>
      </section>
    );
  }

  const s = data.scenarios[index];
  const a = answers[s.id] ?? {};
  const set = (patch) => setAnswers({ ...answers, [s.id]: { ...a, ...patch } });
  const correctP = pigmentForLevel(data, s.goal);
  const startLvl = data.levelByNum[s.start];
  const goalLvl = data.levelByNum[s.goal];

  const pigmentLine = () => {
    if (a.pigment === correctP.id)
      return `Right. Lifting to level ${s.goal} exposes ${lower(correctP.name)}.`;
    const chosen = data.pigmentById[a.pigment];
    return `Not quite. ${chosen.name} shows up around ${levelWord(chosen.levels)}. At level ${s.goal} you're fighting ${lower(correctP.name)}.`;
  };
  const tonerLine = () => {
    const t = data.tonerById[a.toner];
    if (tonerWorks(correctP, a.toner))
      return `Right. ${t.name} sits opposite ${lower(correctP.name)}, so it cancels it.`;
    return `Not quite. ${t.wrong_effect} For ${lower(correctP.name)}, reach for ${lower(bestToner(data, correctP).name)}.`;
  };

  return (
    <section aria-labelledby="prove-title">
      <span className="eyebrow">Prove it · Client {index + 1} of {total}</span>
      <h2 id="prove-title" ref={headingRef} tabIndex={-1}>
        Call it before you mix it
      </h2>

      <div className="client">
        <div className="client__swatches">
          <Swatch hex={startLvl.hex} label={`Now: level ${s.start}, ${lower(startLvl.name)}`} size="md" />
          <span className="client__arrow" aria-hidden="true">→</span>
          <Swatch hex={goalLvl.hex} label={`Goal: level ${s.goal}, ${lower(goalLvl.name)}`} size="md" />
        </div>
        <p className="client__text">{s.client}</p>
      </div>

      <fieldset className="chip-group" disabled={a.checked}>
        <legend className="h-small">1. Which warmth will show up?</legend>
        {data.pigments.map((p) => (
          <label key={p.id} className={`chip${a.pigment === p.id ? " is-on" : ""}`}>
            <input
              type="radio"
              name={`${s.id}-pigment`}
              value={p.id}
              checked={a.pigment === p.id}
              onChange={() => set({ pigment: p.id })}
            />
            <span className="chip__dot" style={{ background: p.swatch_hex }} aria-hidden="true" />
            {p.name}
          </label>
        ))}
      </fieldset>

      <fieldset className="chip-group" disabled={a.checked}>
        <legend className="h-small">2. Which toner cancels it?</legend>
        {data.toners.map((t) => (
          <label key={t.id} className={`chip${a.toner === t.id ? " is-on" : ""}`}>
            <input
              type="radio"
              name={`${s.id}-toner`}
              value={t.id}
              checked={a.toner === t.id}
              onChange={() => set({ toner: t.id })}
            />
            <span className="chip__dot" style={{ background: t.hex }} aria-hidden="true" />
            {t.name}
          </label>
        ))}
      </fieldset>

      <div aria-live="polite">
        {a.checked && (
          <ul className="answer-feedback">
            <li className={a.pigment === correctP.id ? "is-right" : "is-miss"}>
              <span className="mark" aria-hidden="true">{a.pigment === correctP.id ? "✓" : "✗"}</span>
              {pigmentLine()}
            </li>
            <li className={tonerWorks(correctP, a.toner) ? "is-right" : "is-miss"}>
              <span className="mark" aria-hidden="true">{tonerWorks(correctP, a.toner) ? "✓" : "✗"}</span>
              {tonerLine()}
            </li>
          </ul>
        )}
      </div>

      <div className="row">
        {!a.checked ? (
          <button
            type="button"
            className="btn"
            disabled={!a.pigment || !a.toner}
            onClick={() => set({ checked: true })}
          >
            Check my answers
          </button>
        ) : (
          <button type="button" className="btn" onClick={() => setIndex(index + 1)}>
            {index + 1 < total ? "Next client" : "See my score"}
          </button>
        )}
        <p className="score" aria-live="polite">
          Score so far: {score} of {max}
        </p>
      </div>
    </section>
  );
}
