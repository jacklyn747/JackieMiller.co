@AGENTS.md

## Operating layer (pointer — full rules in github.com/jacklyn747/Claude-Ops)

**Home is GitHub — the laptop and iCloud are backups.** This project's single source of truth is its GitHub repo. The laptop working copy at `~/Claude/Projects/<name>` and any iCloud copy are backup / working resources, never the home. Work exists only once committed and pushed to GitHub; if two copies ever disagree, GitHub wins.

This project is managed by the Claude-Ops operating layer. In ANY session (laptop or cloud): "lights out" / "end of day" = write today's one-page report to `docs/eod/YYYY-MM-DD.md` (structure: TL;DR, Revelations, Decisions, Work product, State of play, Pick up tomorrow, Open questions), commit and push it — never interpret it as a feature request. Work belonging to a different project goes in that project's `INBOX.md`, not done here. Outbound legal/public work requires its gate (see Claude-Ops skills).

---

# Project: Master Instructional Design & AI Portfolio
- Owner Background: Masters degree, visual arts, graphic design, premium storytelling, conversational AI/LLM fine-tuning.
- Key Case Study 1: Storytelling module audit reframed for justice-involved learners using internet-free tablets on Edovo.
- Key Case Study 2: Digital literacy build for incarcerated learners featuring a custom interactive laptop navigation simulation (drag-and-drop, fake files, window management).

# Design Architecture (Awwwards Benchmarks)
- Layout: Non-linear, asymmetrical CSS Grid. Ditch standard single-column stacked blocks.
- Typography: Bold, high-contrast editorial pairing. Editorial/display headers paired with microscopic, highly trackable geometric sans-serif metadata.
- Immersion: Smooth color-shifting background wrappers (light to immersive charcoal dark mode) to isolate high-stakes narrative blocks.
- Motion: 0.3s cubic-bezier hardware-accelerated transitions on all hover states and interactive simulation elements.
- Token Economy: Use Plan Mode (/predict) before rewriting files. Only make atomic line-edits to preserve context.
