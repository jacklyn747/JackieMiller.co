<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design system — one grammar, reused

The whole site is built from one set of design tokens and shared components. Keep it that way; do not re-invent primitives (this is a recurring source of visual drift).

- **Colors, spacing, and type** come from the CSS custom-property tokens in `src/app/globals.css`. Never hardcode a color or a one-off value — reference a token.
- **Buttons, eyebrows/labels, chips/tags, and the editorial statement index** are the `.ds-*` components in `src/app/system.css`. Compose those in the markup instead of writing a new class that re-implements the same primitive.
- New UI should read as part of the existing system. If something genuinely needs a new primitive, add it to `system.css` (with a variant modifier) so the whole site can share it — don't fork a local copy.

# Field Notes (the blog)

- Published posts: markdown in `content/field-notes/` (frontmatter: title, date, summary). The site statically renders them at `/field-notes`.
- Drafts awaiting Jacklyn's approval: `drafts/` (not rendered). Pipeline state: `ledgers/field-notes.md`.
- The weekly synthesis protocol that produces drafts is `field-notes`, defined in the Claude-Ops repo — including its sensitivity gate (no live legal-matter specifics, no named private individuals, no unverified claims). Nothing publishes without Jacklyn's explicit approval.
- Email capture: `src/components/SubscribeForm.tsx` — inactive until a Buttondown account exists and `BUTTONDOWN_USERNAME` is set there.
