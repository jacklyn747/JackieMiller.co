import Image from "next/image";
import "./meet-jackie.css";

// "Meet Jackie" — a rapid-fire interview. This is the site's front door.
// Static content (no hooks) so it renders server-side; the portrait path is
// resolved by the page and passed in.

type QA = { q: string; a: string; long?: boolean; accent?: boolean };

const INTERVIEW: QA[] = [
  { q: "Name?", a: "Jackie Miller." },
  { q: "Credentials?", a: "A BFA in Creative Writing for Entertainment and a master’s in Instructional Design and Technology.", long: true },
  { q: "Why creative writing?", a: "I wanted to learn how to tell stories so I could use storytelling inside learning experiences.", long: true },
  { q: "And the master’s?", a: "That taught me how to turn a good story into good learning." },
  { q: "What do you do?", a: "I design learning experiences." },
  { q: "For whom?", a: "People who are usually left out of the design process." },
  { q: "More specifically?", a: "Justice-involved learners." },
  { q: "Why them?", a: "Because they need education. And they’re not getting enough of it." },
  { q: "What did that teach you?", a: "That “hard to reach” and “poorly served” are not necessarily the same thing.", long: true },
  { q: "Why do you care?", a: "Because I know what it’s like to have a system decide who you are before you get to introduce yourself.", long: true },
  { q: "Personal experience?", a: "I have a 15-year-old felony conviction." },
  { q: "And you’re an instructional designer?", a: "Exactly." },
  { q: "Does the conviction go away?", a: "Nope. The record stays." },
  { q: "So does it define you?", a: "Only if I let it.", accent: true },
  { q: "What does the research say?", a: "Correctional education is directly correlated with reduced recidivism." },
  { q: "So education fixes crime?", a: "No. Humans are more complicated than that." },
  { q: "Then what can education do?", a: "Open doors." },
  { q: "What makes your approach different?", a: "I’ve been on both sides of the locked door." },
  { q: "Your superpower?", a: "Turning complicated things into opportunity." },
  { q: "Your mission?", a: "Build learning that gives people a reason to believe there’s something on the other side of their past.", long: true },
  { q: "What makes a learning experience good?", a: "It respects the learner’s time, intelligence, experience, and reality.", long: true },
  { q: "So what happens when the learner has experienced trauma?", a: "You design differently." },
  { q: "How?", a: "You reduce unnecessary cognitive load. Build psychological safety. Give learners control where possible. Use clear language. Create predictable structure.", long: true },
  { q: "And that matters in instructional design because…?", a: "If a learner struggles with a course, I want to ask what we designed badly before I ask what the learner did wrong.", long: true },
  { q: "What do you bring besides lived experience?", a: "Storytelling. Visual design. Instructional design. Technology. AI. Research. And a slightly obsessive interest in making complicated things make sense.", long: true },
  { q: "AI?", a: "I use it as a tool, and to automate. Not a substitute for judgment.", long: true },
  { q: "Meaning?", a: "It can analyze, organize, and quality-check content. But I still decide whether something is accurate, useful, accessible, and actually worth teaching.", long: true },
  { q: "What kind of designer are you?", a: "A builder." },
  { q: "What does that mean?", a: "I don’t just want to make the course. I want to figure out how we can make the next ten courses better, faster, and more consistently.", long: true },
  { q: "Last question: what’s your unfair advantage?", a: "I understand the system from the inside. And I know how powerful it can be when we design a way through it.", long: true },
];

export default function MeetJackie({ portrait }: { portrait: string | null }) {
  return (
    <main className="about-page">
      <div className="mj-inner">
        <header className="mj-head">
          <div className="about-eyebrow">Instructional Designer · Houston, Texas</div>
          <h1 className="about-title">Meet Jackie</h1>
          <p className="about-subhead">A rapid-fire interview. No warm-up.</p>
        </header>

        <div className={`mj-grid${portrait ? "" : " mj-grid--solo"}`}>
          {portrait && (
            <div className="mj-photo">
              <div className="mj-photo__frame">
                <Image src={portrait} alt="Portrait of Jackie Miller" fill sizes="(max-width: 820px) 100vw, 460px" priority />
              </div>
            </div>
          )}

          <ol className="qa">
            {INTERVIEW.map((item, i) => (
              <li className="qa-row" key={i}>
                <span className="qa-n">{String(i + 1).padStart(2, "0")}</span>
                <div className="qa-body">
                  <p className="qa-q">{item.q}</p>
                  <p className={`qa-a${item.long ? " is-long" : ""}${item.accent ? " is-accent" : ""}`}>{item.a}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="about-close">Jackie Miller · Houston, Texas</p>
      </div>
    </main>
  );
}
