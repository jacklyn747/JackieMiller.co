---
title: The skill is the protocol, the ledger is the memory
date: 2026-07-14
summary: Working with AI every day taught me that the model was never the bottleneck — the missing operating system around it was. Here are the four layers I now run everything on.
---

I work with AI all day, across very different kinds of projects — research-heavy work where a wrong citation is a disaster, web builds where the design is the point, and long-running personal projects that mostly need to not be forgotten. For months I kept hitting the same wall: every conversation started smart and ended amnesiac. The work was good *in the moment* and invisible a week later.

The fix turned out not to be a better model, a better prompt, or a better app. It was an operating layer — four pieces that do the jobs a model fundamentally can't do for itself. I remember them with one line:

> The skill is the protocol, the ledger is the memory, the trigger is the discipline, and the connector is the feed.

## The skill is the protocol

Every procedure I repeat is written down as a readable rulebook the AI follows — not tribal knowledge, not "the way we did it last time," a file I can literally open and inspect. When the AI improvises a procedure twice, that's the signal to write it down. The test of a good protocol: someone else could audit it.

## The ledger is the memory

AI memory is a marketing term; files in version control are memory. Every project's state — what's done, what's in flight, what's blocked and on whom — lives in structured files that get updated as part of the work, and committed. If it isn't in a ledger, it didn't happen. The killer feature isn't recall, it's *audit*: git remembers what we believed on any given date, which matters enormously when the work involves deadlines and agencies.

## The trigger is the discipline

Nothing runs itself, and rot is invisible without a schedule. Every protocol has a defined cadence — a weekly audit that reconciles the ledgers against reality, an end-of-day wrap-up that writes the day's learning down before it evaporates. The insight that took me longest: a system without triggers isn't a system, it's a pile of good intentions with a README.

## The connector is the feed

Ledgers that humans update by hand die within two weeks — manual logging is how systems die. So the ledgers update from feeds that already exist: the repos themselves, email, calendars. The human answers questions only a human can answer; everything checkable gets checked against a source.

---

One more rule came out of the first week of running this, and it might be the most important one: **memory proposes, sources confirm.** The model is allowed to suggest anything from recall — a case citation, a best practice, a config incantation — but nothing enters the record until the actual source has been fetched and read. The model's memory is a lead generator, never a witness.

None of this is complicated. That's the point. The complicated version is the one you build accidentally, one clever conversation at a time, and it has no protocols, no memory, no discipline, and no feed — just vibes and scroll-back.
