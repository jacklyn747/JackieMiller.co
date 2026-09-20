# System Architecture — The Four-Layer Verification System

*How we build the thing the positioning promises. Designed July 13–14, 2026, against the Walker case failure (see [positioning.md](positioning.md)).*

## The core principle

Nothing in these systems requires AI to be smart about the domain. Every failure in the Walker case was a failure to **know the state of your own file** — and that is the easiest, most defensible kind of system to build, because the AI never has to be "right" about the law (or medicine, or history). It only has to be right about what's in the file, and everything it says is checkable against the file.

The pitch line: *"Nothing in this system depends on the AI remembering — only on the file being right. And you can check the file."*

What the system pointedly does **not** do: draft arguments, assess guilt, decide strategy, or touch anything where a hallucination could poison the work. Every output is a claim about the file that a human can verify against the file in seconds. The client keeps signing their name; the system guarantees they know what they're signing.

## The four layers

> **The skill is the protocol, the ledger is the memory, the trigger is the discipline, and the connector is the feed.**

| Layer | Role | Implementation |
|---|---|---|
| 1. Protocols | The "how" — codified SOPs | **Claude Skills** (SKILL.md + resources) |
| 2. State | The "what we know" — persistent memory | **Ledgers**: structured files or a small DB in the project |
| 3. Cadence | The "when" — nothing runs itself | **Triggers**: scheduled runs, hooks, standing rituals |
| 4. Ingestion | The "feed" — data arrives without manual logging | **MCP connectors**: email, docs, case management systems |

Most people selling "AI workflows" ship layer 1 only and wonder why it decays. The Walker case failed on layers 2 and 3: nobody knew the state, and nothing ran on a schedule.

### Layer 1 — Protocols as Claude Skills

Each protocol becomes one skill: a folder with a `SKILL.md` (plain-English instructions Claude loads when the task matches) plus supporting reference files/scripts. The skill encodes the steps, the output format, and the **verification rules** — what the output must cite, what a human must sign off on, what the skill is forbidden to assert without a source in the file.

Why this is the right container for this business: **a skill is a document the client can read.** The SKILL.md *is* the protocol — inspectable, versionable, sitting in their repo. When a client asks "how do I know it's not making things up," you open the file and show the rule that says every claim must cite a ledger entry. For buyers whose hesitation is "I can't put my name on a black box," a readable rulebook is the sales argument made tangible.

### Layer 2 — State as ledgers

Structured files (markdown/CSV/JSON) or a small database that every skill reads and writes. The skill remembers nothing between runs; **the files do.** That's a feature: a file can be audited, a model's memory can't. Run #47 is as reliable as run #1 because the state lives outside the model.

### Layer 3 — Cadence as triggers

Someone or something must actually run the audit every Monday. Scheduled jobs, hooks, or standing rituals ("the briefing generates automatically 48 hours before every court date"). This was the prosecutor's biggest missing layer — no cadence, so rot accumulated silently. A brilliant skill nobody invokes equals no skill. **Honest-pitch caution:** never let a client believe the skill "watches" anything on its own. It runs when triggered; reliability comes from cadence + state files, not model vigilance. Saying this out loud is the most credible sentence in the pitch.

### Layer 4 — Ingestion as MCP connectors

Connectors to email, documents, and line-of-business systems so ledgers update from communications that already happen. Manual logging is how these systems die.

## The Walker case, mapped to subsystems

Three distinct failures → three subsystems, plus one product on top:

**1. "Can't say when I last spoke to the sole eyewitness" → Witness contact ledger with staleness alerts.**
Every witness gets a record: role, criticality tier (sole eyewitness = highest), contact log. AI ingests existing emails/call notes/interview memos and extracts contact events automatically — the ledger doesn't depend on a busy human updating a spreadsheet. Rule: critical witness with no contact in X days escalates, first to the owner, then to their supervisor. The deeper failure: he didn't just not know the answer — he didn't know that he didn't know. The system makes ignorance of your own case impossible.

**2. "We don't have the gun" (they did) → Evidence inventory that reconciles statements against reality.**
One canonical evidence register built by AI reading intake docs, property records, lab submissions, and discovery productions and reconciling them. Killer feature: the **contradiction check** — before anything is represented to the defense or the court, the claim is checked against the register ("here's a draft statement; here's the inventory; flag every claim the inventory contradicts"). He didn't lie; his mental model drifted from the file. The system pins them together.

**3. Ballistics/cell data untested until court-ordered → Task clock tied to the case timeline.**
Every evidence item has a status (collected → submitted → tested → reviewed) and stalled statuses accrue age. The system surfaces compound risk: "ballistics untested 14 months on a case that is itself 30 months old." No single deadline was missed — it was slow rot, invisible to deadline calendars, trivially visible to a system that measures the age of every open item.

**The product on top: the pre-hearing briefing.**
Before any court date, a one-page state-of-the-case: every witness + last contact, every evidence item + status, every open item + age, every representation previously made to the court. The prosecutor walks into the courtroom having read, five minutes earlier, the exact answers to the questions that ended his case. **The briefing is the deliverable; the ledgers and clocks exist to feed it.**

## The pattern transfers (this is the IP)

Same four layers, different nouns — each engagement customizes proven protocol skills rather than starting from scratch, which is the difference between selling hours and selling a system:

| Vertical | The ledger | The staleness alert | The briefing |
|---|---|---|---|
| Legal (prosecutor/litigator) | Witnesses + evidence + representations made | Critical witness uncontacted; evidence untested | Pre-hearing state-of-the-case |
| Documentary film | Every factual claim, its source, verification status | Claim unverified as cut approaches lock | Pre-lock fact-integrity report |
| Clinical nutrition pilot | Every participant: intake data, contraindications, flags | Participant not reviewed before next session | Pre-session client review sheet |

The failure mode being sold against is the same everywhere: **entropy** — a competent person managing too many stateful items with memory and a calendar, where "I lost track" is indistinguishable from negligence the moment someone checks.

## Candidate skill library (working names)

- `witness-contact-audit` / generalized: `critical-contact-audit`
- `evidence-reconciliation` / generalized: `claim-vs-inventory contradiction check`
- `pre-hearing-briefing` / generalized: `pre-event state briefing`
- `source-verification-ledger` (documentary variant)
- `client-intake-review` (clinic variant)
