"use client";

/* The "simulated session" — a scripted exchange that types itself out when
   scrolled into view. Real text in the DOM throughout (not a GIF/video),
   so it's screen-reader readable, selectable, and tiny. Respects
   prefers-reduced-motion by rendering the full transcript immediately,
   statically. Content is fixed and hand-authored from a real interview —
   see docs/research/2026-09-03-edovo-learner-interview.md. */

import { useEffect, useRef, useState } from "react";

type Msg = { who: "jackie" | "marcus"; text: string };

const SCRIPT: Msg[] = [
  { who: "jackie", text: "You signed up for the crypto course a while back. How far did you get?" },
  { who: "marcus", text: "Started it. Didn't finish it. That's kind of my pattern, if I'm honest." },
  { who: "jackie", text: "What stops you?" },
  {
    who: "marcus",
    text: "It's never just one thing. I work HVAC on the unit — they call me out at all hours, not just my shift. So I'll be in a lesson and get pulled for a work order. Come back, I've lost my spot.",
  },
  { who: "jackie", text: "And picking it back up?" },
  {
    who: "marcus",
    text: "That's the part. No desk in here — I'm on the bunk or the toilet, tablet on my knees, back aching. TV's up loud, dominoes slapping the table, guys hollering, and it's Texas hot, no AC. Now I gotta sit through a fifteen-minute video again in all that. Any one of those, fine. All of it at once? You just set the tablet down and go do something else.",
  },
  { who: "jackie", text: "Why start it over — can't you go back to where you were?" },
  {
    who: "marcus",
    text: "Nah. Miss the quiz, you watch the whole thing from the top. And there's no controls — no pause, no going back to the part you missed. I've got my pen and paper right there, but it won't stop for me. Soon as a concept lands and I go to write it down, the video's already three steps ahead.",
  },
  { who: "jackie", text: "And the material itself — crypto?" },
  {
    who: "marcus",
    text: "That's a whole other thing. I've been down 27 years — that world got built while I was gone, so I'm starting from nothing. It's all abstract. Somebody talking at me on a video, then a quiz. I can memorize enough to pass, but I couldn't tell you I actually understand it.",
  },
  { who: "jackie", text: "If you could change one thing about how these are built —" },
  {
    who: "marcus",
    text: "Let me do something. Give me a calculator in the finance class. Let me stop the video and write it down. And let me pick back up where I left off — I'm gonna get called out, that's the job. Treat me like I'm trying to learn it, not just trying to pass it.",
  },
];

export default function PersonaChat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [started, setStarted] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [partial, setPartial] = useState("");

  useEffect(() => {
    // Reading a client-only media query safely after mount (SSR has no
    // `window`) is an accepted exception to "no setState in effect" — there's
    // no synchronous alternative that doesn't risk a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || started) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || reduced || msgIndex >= SCRIPT.length) return;
    const full = SCRIPT[msgIndex].text;
    let i = 0;
    const timer = setInterval(() => {
      i += 2;
      setPartial(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(timer);
        window.setTimeout(() => {
          setMsgIndex((n) => n + 1);
          setPartial("");
        }, 450);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, msgIndex, reduced]);

  const replay = () => {
    setPartial("");
    setMsgIndex(0);
    setStarted(true);
  };

  const shownCount = reduced ? SCRIPT.length : msgIndex;
  const typingMsg = !reduced && started && msgIndex < SCRIPT.length ? SCRIPT[msgIndex] : null;

  return (
    <div className="persona-chat" ref={containerRef}>
      <div className="persona-chat__head">
        <span>A simulated research session — grounded in a real interview</span>
        <button type="button" className="persona-chat__replay" onClick={replay}>
          ▶ Replay
        </button>
      </div>
      <div className="persona-chat__body">
        {SCRIPT.slice(0, shownCount).map((m, i) => (
          <div key={i} className={`persona-chat__row is-${m.who}`}>
            <span className="persona-chat__who">{m.who === "jackie" ? "Jackie" : "Marcus"}</span>
            <p className="persona-chat__text">{m.text}</p>
          </div>
        ))}
        {typingMsg && (
          <div className={`persona-chat__row is-${typingMsg.who}`}>
            <span className="persona-chat__who">{typingMsg.who === "jackie" ? "Jackie" : "Marcus"}</span>
            <p className="persona-chat__text">
              {partial}
              <span className="persona-chat__cursor" aria-hidden="true" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
