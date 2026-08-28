import "./tablet.css";

/* A dark, premium course screen inside a realistic iPad frame — one per
   teaching lesson. Presentational only. */

type Lesson = { n: number; unit: string; title: string; lead: string; note: string; cta: string; stage: React.ReactNode };

const COURSE = [
  ["01", "Orientation"], ["02", "The Mouse"], ["03", "The Keyboard"],
  ["04", "Windows"], ["05", "The Desktop"], ["06", "Capstone"],
];

const LESSONS: Record<number, Lesson> = {
  1: {
    n: 1, unit: "Orientation",
    title: "What you’ll learn",
    lead: "",
    note: "Six lessons · about 30 minutes",
    cta: "Begin",
    stage: (
      <div className="tbl-index">
        {COURSE.map(([rn, rt], i) => (
          <div key={rn} className={`row${i === 0 ? " on" : ""}`}><span className="rn">{rn}</span><span className="rt">{rt}</span><span className="dot" /></div>
        ))}
      </div>
    ),
  },
  2: {
    n: 2, unit: "The Mouse",
    title: "One tap, or two?",
    lead: "One of these opened with a single click. The other needed a double-click. Which was which?",
    note: "Tap to answer · no wrong answers",
    cta: "Check",
    stage: (
      <div className="tbl-choices">
        <div className="tbl-choice pick">
          <div className="glyph"><svg viewBox="0 0 22 22"><circle cx="11" cy="11" r="8" /><circle cx="11" cy="11" r="2" fill="var(--brass)" stroke="none" /></svg></div>
          <div className="ct">Single click</div>
          <div className="cs">Highlights the item</div>
          <div className="tag">Selects</div>
        </div>
        <div className="tbl-choice">
          <div className="glyph"><svg viewBox="0 0 22 22"><circle cx="8" cy="11" r="6" /><circle cx="15" cy="11" r="6" /></svg></div>
          <div className="ct">Double-click</div>
          <div className="cs">Opens the item</div>
          <div className="tag">Opens</div>
        </div>
      </div>
    ),
  },
  3: {
    n: 3, unit: "The Keyboard",
    title: "Fixing a mistake",
    lead: "This field has a typo. Use the Delete key to remove the extra letters, then type it correctly.",
    note: "Try it · unlimited attempts",
    cta: "Done",
    stage: (
      <div className="tbl-fieldwrap">
        <div className="tbl-field">Jacki<span className="typo">eee</span><span className="car" /></div>
        <div className="tbl-key">Press <span className="cap">⌫ delete</span> to remove the extra letters</div>
      </div>
    ),
  },
  4: {
    n: 4, unit: "Windows",
    title: "Minimize doesn’t mean delete",
    lead: "It isn’t gone — it’s waiting on the taskbar.",
    note: "Find it again",
    cta: "Restore it",
    stage: (
      <div className="tbl-mini">
        <div className="tbl-win"><div className="wb"><i className="r" /><i className="y" /><i className="g" /></div><div className="wc"><span /><span /></div></div>
        <div className="bar"><span className="ent"><i />Your work</span></div>
        <span className="arrow">↑</span>
      </div>
    ),
  },
  5: {
    n: 5, unit: "The Desktop",
    title: "Your home base",
    lead: "Icons are launch points. The taskbar along the bottom is where your open windows live — always there when you need them.",
    note: "About 3 minutes",
    cta: "Continue",
    stage: (
      <div className="tbl-desk">
        <div className="icons">
          <div className="ic"><span className="t"><svg viewBox="0 0 24 24"><path d="M6 3h9l3 3v15H6z" /><path d="M9 9h6M9 13h6" /></svg></span><span className="l">Notes</span></div>
          <div className="ic"><span className="t"><svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /></svg></span><span className="l">Calendar</span></div>
          <div className="ic"><span className="t"><svg viewBox="0 0 24 24"><path d="M4 7h6l2 2h8v9H4z" /></svg></span><span className="l">Files</span></div>
        </div>
        <div className="taskbar"><span className="tk" /><span className="tk" /><span className="lab">Taskbar</span></div>
      </div>
    ),
  },
};

export default function TabletMock({ lesson }: { lesson: number }) {
  const L = LESSONS[lesson];
  if (!L) return null;
  return (
    <div className="tbl">
      <div className="tbl-device">
        <div className="tbl-screen">
          <div className="tbl-head">
            <span className="mk" />
            <span className="nm">Digital Literacy</span>
            <span className="prog">
              <span className="track"><span className="fill" style={{ width: `${(L.n / 6) * 100}%` }} /></span>
              <span className="pct">{L.n} / 6</span>
            </span>
            <span className="q">?</span>
          </div>
          <div className="tbl-body">
            <div className="tbl-eyebrow"><span className="n">{String(L.n).padStart(2, "0")}</span>{L.unit}</div>
            <div className="tbl-title">{L.title}</div>
            {L.lead && <div className="tbl-lead">{L.lead}</div>}
            <div className="tbl-stage">{L.stage}</div>
          </div>
          <div className="tbl-foot">
            <span className="tbl-note">{L.note}</span>
            <span className="tbl-cta">{L.cta}<span className="a">→</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
