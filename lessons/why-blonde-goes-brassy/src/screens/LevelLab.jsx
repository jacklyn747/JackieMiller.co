import { useId } from "react";
import Swatch from "../Swatch.jsx";
import { developerForLift, lower, pigmentForLevel } from "../lib.js";

export default function LevelLab({ data, lab, setLab, headingRef }) {
  const { start, target, colored } = lab;
  const lift = target - start;
  const exposed = lift > 0 ? pigmentForLevel(data, target) : null;
  const dev = developerForLift(data, lift);
  const set = (patch) => setLab({ ...lab, ...patch });

  const lifted = [];
  for (let l = start + 1; l <= target; l++) lifted.push(l);

  return (
    <section aria-labelledby="lab-title">
      <span className="eyebrow">Explore</span>
      <h2 id="lab-title" ref={headingRef} tabIndex={-1}>
        The Level Lab
      </h2>
      <p className="lede">
        Every head of hair has warm pigment hiding under the color you see. Lighten it and the
        warmth comes forward, darkest first. Move the sliders and watch what shows up.
      </p>

      <div className="sliders">
        <LevelSlider
          label="Natural starting level"
          value={start}
          data={data}
          onChange={(v) => set({ start: v })}
        />
        <LevelSlider
          label="Target level"
          value={target}
          data={data}
          onChange={(v) => set({ target: v })}
        />
      </div>

      <label className="toggle">
        <input
          type="checkbox"
          checked={colored}
          onChange={(e) => set({ colored: e.target.checked })}
        />
        <span>Hair already colored</span>
      </label>

      <div aria-live="polite" className="lab-result">
        {!exposed ? (
          <p className="callout">{data.callouts.no_lift.text}</p>
        ) : (
          <>
            <div className="exposed">
              <Swatch
                hex={exposed.swatch_hex}
                label={`${exposed.name} exposed at level ${target}`}
                size="lg"
              />
              <div>
                <p className="big-stat">
                  <span className="big-stat__num">{lift}</span>{" "}
                  {lift === 1 ? "level" : "levels"} of lift
                </p>
                <p>
                  At level {target}, the warmth left behind is{" "}
                  <strong>{lower(exposed.name)}</strong>. That's what you'll need to tone.
                </p>
              </div>
            </div>

            <h3 className="h-small">What shows up on the way</h3>
            <ol className="lift-row">
              {lifted.map((l) => {
                const p = pigmentForLevel(data, l);
                return (
                  <li key={l} className={l === target ? "is-target" : undefined}>
                    <Swatch hex={p.swatch_hex} label={`Level ${l}: ${p.name}`} size="sm" />
                  </li>
                );
              })}
            </ol>

            {colored ? (
              <div className="callout callout--alert" role="note">
                <p className="callout__title">{data.callouts.color_doesnt_lift_color.title}</p>
                <p>{data.callouts.color_doesnt_lift_color.text}</p>
              </div>
            ) : (
              <div className="dev-card">
                <h3 className="h-small">Developer usually needed</h3>
                {dev ? (
                  <p>
                    For {lift} {lift === 1 ? "level" : "levels"} of lift, I'd expect{" "}
                    <strong>{dev.volume} volume</strong>.
                  </p>
                ) : (
                  <p className="callout callout--alert">{data.callouts.beyond_developer.text}</p>
                )}
                <table className="dev-table">
                  <caption className="sr-only">Developer volume and typical lift</caption>
                  <thead>
                    <tr>
                      <th scope="col">Developer</th>
                      <th scope="col">Typical lift</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.developers.map((d) => {
                      const match = dev && d.volume === dev.volume;
                      return (
                        <tr key={d.volume} className={match ? "is-match" : undefined}>
                          <th scope="row">
                            {d.volume} vol
                            {match && <span className="match-tag"> ← your lift</span>}
                          </th>
                          <td>{d.lift_label}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function LevelSlider({ label, value, data, onChange }) {
  const id = useId();
  const lvl = data.levelByNum[value];
  return (
    <div className="slider">
      <div className="slider__head">
        <label htmlFor={id} className="slider__label">
          {label}
        </label>
        <span className="slider__value" aria-hidden="true">
          Level {value} · {lvl.name}
        </span>
      </div>
      <div className="slider__body">
        <input
          id={id}
          type="range"
          min={1}
          max={10}
          step={1}
          value={value}
          aria-valuetext={`Level ${value}, ${lvl.name}`}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <Swatch hex={lvl.hex} label={`Level ${value}: ${lvl.name}`} size="xs" hideCaption />
      </div>
    </div>
  );
}
