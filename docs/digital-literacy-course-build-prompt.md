# Build prompt — Digital Literacy Fundamentals (complete interactive course)

> Paste everything below the line into Claude to build the course. It is self-contained.

---

## Your job

Build the **complete, interactive Digital Literacy Fundamentals course** — all six lessons, 26 screens — as a polished, runnable web experience inside this Next.js repo (`JackieMiller.co`). A working capstone simulation already exists (`src/components/case-studies/digital-literacy/MacSim.tsx`); the course wraps around it and hands off to it. This is a real, clickable course a person can move through start to finish — not a slideshow of screenshots and not a static mockup.

Make it **impressive**: smooth screen-to-screen transitions, real interactive practice on every practice screen (not just "Next" buttons), progress that feels earned, and a cohesive visual system. It's a portfolio centerpiece for an instructional designer, so the craft of the interactions is the point.

## Who this is for (read before you write a single word of copy)

Adults in jails and prisons using a shared or personal tablet, many encountering a modern computer for the first time — including long-sentence learners whose last exposure to consumer tech predates touchscreens. Variable reading levels. Often preparing for reentry, where operating a laptop is now an unstated job requirement (applications, onboarding, interviews).

This audience drives non-negotiable design rules:
- **Trauma-informed.** No scores, no pass/fail gates, no timers, no attempt-tracking anywhere the learner or staff can see. Every mistake is privately recoverable with no record and no penalty.
- **Self-paced and untimed.** Progress is shown as literal position ("Lesson 2 of 6"), never as a clock or a grade.
- **Dignity in framing.** Never remedial ("catch up on basic tech"), never condescending ("don't worry, this is easy!"), never clinical ("demonstrate competency"). Adult-to-adult, second person, direct. Reading level ~8th–9th grade for ALL copy including buttons and hints.
- **Name the transfer.** Every simulated action is explicitly tied to its real-laptop equivalent ("You just clicked — on a real laptop, this is done with a mouse or trackpad"). Teaching transfer to a real device the learner hasn't touched yet is the entire point of the course.

## Interaction model (locked — do not deviate)

- **Single tap only.** No simulated on-screen cursor the learner drags, no double-tap-to-open, no long-press menus beyond what a screen explicitly teaches, no swipe gestures. Dragging is *demonstrated* in a step-through animation, never performed by the learner in the teaching lessons. (Rationale: adding finger-to-cursor translation is extraneous cognitive load and an unrelated failure mode.)
- **Teaching before performing.** Lessons 1–5 are illustrated/accordion-style explanation and low-stakes guided practice. Live, independent performance is reserved for the capstone (Lesson 6). Never make the learner's first attempt at a skill happen under performance conditions.
- Every interaction in the capstone must map to a skill already taught in Lessons 2–5. Nothing in the sim requires a gesture the learner hasn't met.

## Full course structure — 26 screens across 6 lessons

Build each screen. Copy shown is the intent; write it out in full at 8th–9th grade level, second person.

**Lesson 1 — Orientation (2 screens)**
- 1.1 Title: "Digital Literacy Fundamentals" / "Getting comfortable with a laptop, one step at a time." Next advances.
- 1.2 Motivation — "Why This Matters": connect laptop fluency to a concrete, learner-owned goal (a job application, an interview, staying in touch). This is the motivational hook; make it land. Next advances.

**Lesson 2 — The Mouse (5 screens)**
- 2.1 Title: "The Mouse" / "How you'll point, select, and move things."
- 2.2 Concept + practice — "A Single Click": short explanation, then a practice icon the learner taps; tap shows a visible highlight/confirmation labeled "This is a click."
- 2.3 Discrimination — "One Tap or Two?": show single-click vs double-click outcomes side by side; learner predicts which is which, then taps to reveal. No scoring, unlimited retries.
- 2.4 Concept — "Right-Click: More Options": a right-click menu is *more choices, not an error*. Tap opens a small options menu; tap outside or an × closes it (teaching safe exit from an unfamiliar state).
- 2.5 Guided demo — "Dragging": step-through animation of press–hold–move–release as one continuous action. Demonstrated, not performed.

**Lesson 3 — The Keyboard (5 screens)**
- 3.1 Title: "The Keyboard" / "Typing, correcting, and confirming."
- 3.2 Practice — "Typing": a real text field; learner types their first name or any short text with immediate character feedback.
- 3.3 Seeded correction — "Fixing a Mistake": field pre-filled with an intentional typo; learner uses Backspace/Delete to fix it. Completes when corrected text matches target; no penalty for extra attempts.
- 3.4 Concept — "Pressing Enter": Enter/Return confirms or submits. Learner types then presses Enter; screen visibly confirms "Entered!" rather than silently advancing.
- 3.5 Practice — "Capital Letters": learner types a capitalized word using Shift. Validate the capital; if the first try isn't capitalized, show a plain hint ("Try holding Shift while pressing the letter").

**Lesson 4 — Windows (5 screens)**
- 4.1 Title: "Windows" / "How programs open and stay organized."
- 4.2 Concept — "What's a Window?": tap-to-toggle between desktop-with and desktop-without an open window so the learner *sees* the difference, not just reads it. A window is a separate space.
- 4.3 Practice — "Opening and Closing": tap an icon to open a simple window, tap × to close. Real-laptop labels throughout.
- 4.4 Practice + misconception check — "Minimize Doesn't Mean Delete": learner minimizes a window (to a visible taskbar entry), then is asked to find it again and taps the entry to restore it — directly disproving "minimized = gone."
- 4.5 Practice — "Switching Between Windows": two windows open; learner taps between them, reusing the taskbar pattern from 4.4 (not introduced as new).

**Lesson 5 — The Desktop (3 screens)**
- 5.1 Title: "The Desktop" / "Your home base."
- 5.2 Concept + practice — "Icons": icons are launch points; a practice desktop shows two–three icons to tap, each opening a placeholder window (reinforcing the click concept in a new context).
- 5.3 Concept — "The Taskbar": the taskbar is a persistent home base for finding open windows; reference the minimize/restore practice from Lesson 4. Explanatory, no new interaction.

**Lesson 6 — Capstone: Practice Environment (6 screens)**
- 6.1 Intro — "Your Turn": frame as independent practice, NOT a test. Next advances into the live simulated desktop.
- 6.2 Task 1 — "Open the Notes icon." Learner taps the correct icon among two–three. A real-laptop label is available on tap-and-hold of a small "?" control, not shown by default.
- 6.3 Task 2 — "Type your first name, then press Enter." Uses the keyboard inside the opened window; validates on Enter (matches Lesson 3).
- 6.4 Task 3 — "Open the Calendar icon too, then switch back to Notes." Requires two windows open and a taskbar switch (exercises the Lesson 4/5 dependency chain).
- 6.5 Task 4 — "Minimize the Calendar window." Completes when the taskbar entry is confirmed present and tappable.
- 6.6 Completion — "You Did It": plain confirmation, no score. Optional open-text "How would you improve this?" field, no minimum, advances regardless of input.

**Use the existing `MacSim.tsx` as the capstone environment.** It already implements a live desktop: open/close/minimize/restore windows, a dock/taskbar, a Finder-style browser, Notes/Calendar apps, and file interactions. Wire the six capstone task-steps (6.2–6.5) as a guided task rail on top of it — a small instruction strip that advances as each task's success condition is met — then land on 6.6. Adapt MacSim's controls to the single-tap model (no drag-to-trash requirement in the graded task path; keep drag only as optional exploration). Keep its icons and window chrome **generic and non-branded** — do not turn it into a pixel copy of macOS or Windows (that teaches one brand and raises a trademark question).

## Visual system — TWO deliberately distinct looks, both on the new black base

This course uses two visual systems on purpose, because they serve opposite instructional jobs. **Important override:** the source Style Guide doc says to keep a "kraft-paper / tan" shell and lists it under "what not to change." That is stale — the whole JackieMiller.co portfolio has since moved from warm brown to **faded black**. Apply the black design system below to the shell. Preserve the *distinction* between shell and simulation; just render the shell on the new black base, not tan.

**Shell (Lessons 1–5)** — reads like the rest of the LMS/portfolio: calm, consistent, low-stakes.
- Base background: `--paper #0d0d0f` (faded black), surfaces `--paper2 #141417`.
- Text: `--ink #E7E1D3`.
- Accent (sparingly — used for emphasis, not alarm): oxblood surface `--ox #4A1210`, oxblood text/links `--ox-accent #B04A44`.
- Nav/header bar: `--nav-bg #0b0b0e`. Header shows course icon, lesson title, and a literal numeric progress counter ("2 / 6", counting lessons).
- Primary CTA: a solid, high-contrast "go/positive" button (the portfolio uses a confident accent for primary actions — a saturated green or oxblood-family fill with bold light text; pick the one that hits WCAG AA on the black base and reads unmistakably as forward/positive). White/`--ink` bold label.
- Typography: rounded, high-legibility sans-serif; generous size and line-height for variable reading levels and possible corrective-lens limits.
- Definitional content uses accordion cards (one open at a time). No hidden gesture without a visible tappable equivalent.

**Simulation (Lesson 6 capstone)** — deliberately breaks from the shell so the learner recognizes it as a stand-in for a real, external device.
- Neutral generic desktop wallpaper (solid or simple gradient), NOT the black LMS shell and no portfolio branding.
- Light gray/white window chrome; high-contrast, generously-sized × (close) and – (minimize) controls in a consistent top corner.
- A persistent taskbar strip, always visible, visually distinct from both desktop and windows.
- Real-laptop label annotations on/near interactive elements, dismissible after a few uses but re-summonable on request.
- MacSim already largely matches this — keep it; just ensure the wallpaper and chrome stay generic and the contrast targets are met.

## Accessibility & quality bar

- WCAG 2.2 AA: color contrast on both visual systems, visible focus states, full keyboard operability, semantic headings, ARIA where needed, respects `prefers-reduced-motion` (transitions and the drag demo must have a reduced-motion path).
- Every icon pairs with a text label. Tap targets are large and forgiving.
- Works on a tablet-sized touch screen first; degrade gracefully to desktop.
- No dependency on open internet — everything runs inside the app (this mirrors the real closed-platform constraint).

## Technical notes

- Repo: `JackieMiller.co`, Next.js. **This is a non-standard Next.js build with breaking changes vs. what you may expect — read the relevant guide in `node_modules/next/dist/docs/` before writing routing/component code, and heed deprecation notices.** (See `AGENTS.md`.)
- Existing assets to reuse/extend: `src/components/case-studies/digital-literacy/` — `MacSim.tsx` (+ `mac-sim.css`), `DigitalLiteracy.tsx`, `TabletMock.tsx`, `dl.css`, `tablet.css`. Design tokens live in `src/app/globals.css` (light + dark `--ink/--paper/--paper2/--ox/--ox-accent/--nav-bg` sets shown above).
- Build the course as its own runnable interactive experience (a route/flow the six lessons move through), state-managed so a learner can move forward/back and resume a lesson without losing their place. Don't gate lessons behind scores; free navigation between lessons is fine, forward flow within a lesson is guided.
- Reduce cognitive load in code the same way you reduce it for the learner: one clear component per screen type (Title, Concept, Practice, Discrimination, GuidedDemo, CapstoneTask), driven by a small screen manifest, so the 26 screens are data, not 26 bespoke files.

## Source of truth (Google Docs — read these if you need the full rationale)

A "Digital Literacy" folder holds the complete design record. Most load-bearing for the build:
- 10 Storyboard / Wireframe — the 26 screens above, verbatim.
- 04 Instructional Strategy & Approach — why it's built this way (Andragogy, Trauma-Informed, Cognitive Load, Gagné).
- 05 Style Guide & Design Rationale — the two-visual-system logic (apply with the black override above).
- 01 Needs & Audience Analysis, 02 Task & Content Analysis, 03 Learning Objectives, 06 Accessibility Checklist, 07 Content Quality Rubric, 08 Evaluation Plan, 09 Content Outline / Blueprint.

## Definition of done

All 26 screens built and navigable; every practice screen genuinely interactive per its spec; the capstone runs the live MacSim with the four tasks wired as success-gated steps and a no-score completion screen; two distinct visual systems both on the black base and both passing AA; reduced-motion and keyboard paths work; runs with no open-internet dependency. Show it running end to end before calling it done.
