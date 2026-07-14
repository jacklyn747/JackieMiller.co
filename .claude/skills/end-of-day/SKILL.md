---
name: end-of-day
description: "End-of-day wrap-up ritual. Use when Jackie says '/end-of-day', 'lights out', 'wrap it up', 'call it a day', or otherwise asks to close out the working day. Produces the day's report in docs/eod/ and pushes it so the morning-report routine can pick it up."
---

# End-of-Day Report

You are closing out a working session. Produce a report of what happened today in this project so that (a) Jackie can pick up cold tomorrow morning and (b) the automated morning-report routine can find and summarize it.

## Steps

1. Review the full conversation for today's session(s). Extract, in this order of importance:
   - **Revelations** — things we *learned* or *figured out* (research findings, insights, reframes). Not activity; understanding.
   - **Decisions** — things we *chose*, with a one-line why. Include options we explicitly rejected and the reason, so tomorrow-Jackie doesn't re-litigate them.
   - **Work product** — what was actually created/changed (files, commits, PRs, deployments), each with a link or path.
   - **State of play** — where things stand right now: what's done, what's in flight, what's blocked and on what.
   - **Pick up tomorrow** — a short, ordered list of concrete next actions. First item should be startable in under five minutes with no re-reading required.
   - **Open questions** — anything Jackie needs to decide that Claude couldn't decide alone.

2. Write the report to `docs/eod/YYYY-MM-DD.md` (today's date). Start the file with a 2–3 sentence TL;DR in plain conversational prose — that TL;DR is what the morning report quotes, so make it standalone. Keep the whole report to roughly one page; link out to docs/PRs rather than duplicating their content.

3. If any durable strategy or architecture decisions were made today that belong in the project wiki (`docs/positioning.md`, `docs/system-architecture.md`, or a new doc), update those docs too — the EOD report is a diary, the wiki is the canon. Don't let canon live only in diary entries.

4. Commit everything to the current working branch and push. Use a commit message like `EOD report YYYY-MM-DD`. If a PR is already open for the branch, the commit rides along; do not open a second PR just for the report.

5. Reply to Jackie with only the TL;DR and the first "pick up tomorrow" item. She's tired — the full detail is in the file, not the chat.

## Rules

- Never invent progress. If something failed or was left broken, the report says so plainly — this system exists to make the true state of the work impossible to lose track of.
- Every claim in the report must be checkable against the conversation, a file, or a commit. No aspirational statements written as accomplishments.
- If today produced nothing worth reporting (rare), write the file anyway with a one-line entry — the morning routine treats a missing file as "session forgot to close out," not as "nothing happened."
