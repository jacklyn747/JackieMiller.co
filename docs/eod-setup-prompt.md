# Paste-in prompt: install the end-of-day ritual in a project

Paste the block below into a Claude session in any project to install the
end-of-day skill and run it for that day. Already installed in this repo at
`.claude/skills/end-of-day/SKILL.md`.

```
Set up my end-of-day system in this project, then run it.

1. Create a skill at .claude/skills/end-of-day/SKILL.md. It should trigger when
   I say "lights out", "/end-of-day", "wrap it up", or "call it a day", and do
   the following: review today's conversation and write a report to
   docs/eod/YYYY-MM-DD.md (today's date) containing — a standalone 2-3 sentence
   TL;DR at the top; Revelations (things we learned or figured out, not just
   activity); Decisions (what we chose and why, including options we rejected so
   I don't re-litigate them); Work product (files, commits, PRs, with links);
   State of play (done / in flight / blocked); Pick up tomorrow (ordered list,
   first item startable in under 5 minutes); Open questions (things only I can
   decide). Keep it to about one page. Rules: never invent progress — if
   something failed or is broken, say so plainly; every claim must be checkable
   against the conversation, a file, or a commit. Commit and push to the current
   working branch (ride along on an existing PR if one is open — don't open a
   new PR just for the report). Reply to me with only the TL;DR and the first
   pick-up-tomorrow item.

2. Then run that skill right now for today's session.

This feeds a morning routine that sweeps all my repos for the newest
docs/eod/ report on any branch, so the file name and location matter exactly.
```
