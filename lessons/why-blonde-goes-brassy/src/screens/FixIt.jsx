import { useRef, useState } from "react";
import Swatch from "../Swatch.jsx";
import ColorWheel from "../ColorWheel.jsx";
import { bestToner, lower, tonerWorks } from "../lib.js";

export default function FixIt({ data, headingRef, initialPigmentId }) {
  const [pigmentId, setPigmentId] = useState(initialPigmentId);
  const [selected, setSelected] = useState(null); // toner chosen by tap/keyboard
  const [result, setResult] = useState(null); // { tonerId, correct }
  const [drag, setDrag] = useState(null); // { tonerId, x, y, over }
  const dropRef = useRef(null);
  const dragStart = useRef(null);
  const suppressClick = useRef(false);

  const pigment = data.pigmentById[pigmentId];
  const solved = result?.correct;

  function apply(tonerId) {
    setResult({ tonerId, correct: tonerWorks(pigment, tonerId) });
    setSelected(null);
  }

  function choosePigment(id) {
    setPigmentId(id);
    setResult(null);
    setSelected(null);
  }

  function overDrop(x, y) {
    const r = dropRef.current?.getBoundingClientRect();
    if (!r) return false;
    // The whole wheel counts as the target, so a near miss still lands.
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  // Pointer drag works for mouse, pen and touch.
  const onPointerDown = (e, tonerId) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStart.current = { x: e.clientX, y: e.clientY, tonerId, id: e.pointerId };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const s = dragStart.current;
    if (!s) return;
    const moved = Math.hypot(e.clientX - s.x, e.clientY - s.y) > 8;
    if (!drag && !moved) return;
    setDrag({ tonerId: s.tonerId, x: e.clientX, y: e.clientY, over: overDrop(e.clientX, e.clientY) });
  };
  const onPointerUp = (e) => {
    const s = dragStart.current;
    dragStart.current = null;
    if (drag && s) {
      suppressClick.current = true;
      if (overDrop(e.clientX, e.clientY)) apply(s.tonerId);
    }
    setDrag(null);
  };
  const onPointerCancel = () => {
    dragStart.current = null;
    setDrag(null);
  };

  const onChipClick = (tonerId) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    setSelected(selected === tonerId ? null : tonerId);
  };

  const shownToner = result ? data.tonerById[result.tonerId] : null;
  const hintToner = selected ? data.tonerById[selected] : null;

  return (
    <section aria-labelledby="fix-title">
      <span className="eyebrow">Fix it</span>
      <h2 id="fix-title" ref={headingRef} tabIndex={-1}>
        Cancel the warmth on the color wheel
      </h2>
      <p className="lede">
        Colors that sit opposite each other on the wheel cancel out. Drag a toner onto the hair, or
        tap a toner and then tap the hair.
      </p>

      <fieldset className="chip-group">
        <legend className="h-small">Warmth to fix</legend>
        {data.pigments.map((p) => (
          <label key={p.id} className={`chip${p.id === pigmentId ? " is-on" : ""}`}>
            <input
              type="radio"
              name="fix-pigment"
              value={p.id}
              checked={p.id === pigmentId}
              onChange={() => choosePigment(p.id)}
            />
            <span className="chip__dot" style={{ background: p.swatch_hex }} aria-hidden="true" />
            {p.name}
          </label>
        ))}
      </fieldset>

      <div className={`wheel-wrap${drag?.over ? " is-over" : ""}`} ref={dropRef}>
        <ColorWheel
          wheel={data.wheel}
          exposedId={pigment.wheel_id}
          tonerId={shownToner?.id ?? selected ?? drag?.tonerId ?? null}
        />
        <button
          type="button"
          className="wheel-target"
          onClick={() => hintToner && apply(hintToner.id)}
          aria-disabled={!hintToner}
          aria-label={
            hintToner
              ? `Apply ${lower(hintToner.name)} toner to ${lower(pigment.name)} hair`
              : `Hair showing ${lower(pigment.name)}. Pick a toner first.`
          }
        >
          <Swatch
            hex={solved ? pigment.neutral_hex : pigment.swatch_hex}
            label={solved ? pigment.neutral_label : `${pigment.name} warmth`}
            size="round"
            hideCaption
          />
        </button>
      </div>

      <p className="wheel-status">
        Hair now: <strong>{solved ? pigment.neutral_label : `${pigment.name} warmth`}</strong>
      </p>

      <p className="drop-hint" aria-live="polite">
        {drag
          ? drag.over
            ? `Let go to apply ${lower(data.tonerById[drag.tonerId].name)}.`
            : "Drop it on the hair."
          : hintToner
            ? `${hintToner.name} picked. Now tap the hair in the middle of the wheel.`
            : " "}
      </p>

      <div className="toner-tray" role="group" aria-label="Toners">
        {data.toners.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`toner${selected === t.id ? " is-on" : ""}${drag?.tonerId === t.id ? " is-dragging" : ""}`}
            aria-pressed={selected === t.id}
            onPointerDown={(e) => onPointerDown(e, t.id)}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onClick={() => onChipClick(t.id)}
          >
            <span className="toner__dot" style={{ background: t.hex }} aria-hidden="true" />
            {t.name}
          </button>
        ))}
      </div>

      {drag && (
        <div className="drag-ghost" style={{ left: drag.x, top: drag.y }} aria-hidden="true">
          <span className="toner__dot" style={{ background: data.tonerById[drag.tonerId].hex }} />
          {data.tonerById[drag.tonerId].name}
        </div>
      )}

      <div aria-live="polite" className="feedback-slot">
        {result && (
          <div className={`feedback ${result.correct ? "feedback--right" : "feedback--miss"}`}>
            <p className="feedback__title">
              {result.correct ? "Neutral. That's the one." : `Not that one. Here's what ${lower(shownToner.name)} would do.`}
            </p>
            <p>
              {result.correct
                ? `${shownToner.name} sits opposite ${lower(pigment.name)} on the wheel. Opposites cancel, so the warmth goes neutral.`
                : `${shownToner.wrong_effect} Look for the color directly across from ${lower(pigment.name)}.`}
            </p>
            {result.correct && pigment.neutralized_by.length > 1 && (
              <p className="small">
                {pigment.name} sits between two slices, so{" "}
                {pigment.neutralized_by.map((id) => lower(data.tonerById[id].name)).join(" or ")} both
                work here.
              </p>
            )}
            {!result.correct && (
              <button type="button" className="btn btn--ghost btn--small" onClick={() => setResult(null)}>
                Try again
              </button>
            )}
            {result.correct && (
              <p className="small">Pick another warmth above and cancel that one too.</p>
            )}
          </div>
        )}
      </div>

      <details className="rules">
        <summary>Cheat sheet: what cancels what</summary>
        <ul>
          {data.pigments.map((p) => (
            <li key={p.id}>
              {p.name} ({p.levels.includes(" ") ? "levels" : "level"} {p.levels}): {bestToner(data, p).name.toLowerCase()}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
