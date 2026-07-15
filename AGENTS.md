<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Field Notes (the blog)

- Published posts: markdown in `content/field-notes/` (frontmatter: title, date, summary). The site statically renders them at `/field-notes`.
- Drafts awaiting Jacklyn's approval: `drafts/` (not rendered). Pipeline state: `ledgers/field-notes.md`.
- The weekly synthesis protocol that produces drafts is `field-notes`, defined in the Claude-Ops repo — including its sensitivity gate (no live legal-matter specifics, no named private individuals, no unverified claims). Nothing publishes without Jacklyn's explicit approval.
- Email capture: `src/components/SubscribeForm.tsx` — inactive until a Buttondown account exists and `BUTTONDOWN_USERNAME` is set there.
