# DarkImmersion Component

Full-bleed dark editorial wrapper for case study deep-dives. Smoothly transitions from paper background to rich charcoal dark mode as the user scrolls into core narrative sections.

## Features

- **Scroll-triggered activation** — Smooth transition when 20% of wrapper enters viewport
- **Full-bleed design** — Edge-to-edge cinematic presentation
- **Spotlight effects** — Dramatic shadows and glows on tablet mockups and interactive elements
- **Hardware-accelerated** — 0.6s cubic-bezier transitions per CLAUDE.md standards
- **Vignette effect** — Subtle inset shadows focus attention on content
- **Flexible configuration** — Can start dark, light, or activate on scroll

## Usage Examples

### Basic Scroll-Triggered Dark Mode

Wrap sections that should transition to dark as user scrolls:

```tsx
import DarkImmersion from "@/components/case-studies/DarkImmersion";

export default function MyCaseStudy() {
  return (
    <main>
      {/* Light hero section */}
      <section className="hero">
        <h1>Case Study Title</h1>
      </section>

      {/* Deep-dive content transitions to dark on scroll */}
      <DarkImmersion>
        <section className="problem-narrative">
          <h2>The Challenge</h2>
          <p>Core problem description...</p>
          {/* Tablet screenshots get cinematic spotlight */}
          <TabletMock />
        </section>

        <section className="solution">
          <h2>The Approach</h2>
          {/* Interactive simulations get enhanced glow */}
          <MacSim />
        </section>
      </DarkImmersion>
    </main>
  );
}
```

### Always Dark (No Transition)

Start in dark mode without scroll-based transition:

```tsx
<DarkImmersion startDark={true} activateOnScroll={false}>
  <YourContent />
</DarkImmersion>
```

### Custom Activation Threshold

Activate when 50% of wrapper is visible instead of default 20%:

```tsx
<DarkImmersion activationThreshold={0.5}>
  <YourContent />
</DarkImmersion>
```

## Visual Effects

### Spotlighting

Elements inside `DarkImmersion--active` receive automatic spotlight treatment:

- **Tablet mockups** (`.tbl`, `[class*="tablet"]`, `[class*="mock"]`)
  - Cinematic drop shadows
  - Subtle glow halo
  - Hover lift effect

- **Interactive simulations** (`[class*="sim"]`, `[class*="interactive"]`)
  - Enhanced borders
  - Oxblood accent glow
  - Depth shadows

- **MacSim desktop** (`.macsim-root`)
  - Dramatic 120px depth shadow
  - Cream accent glow

### Typography & Colors

- **Background**: Linear gradient from `#0a0a0c` to `#0d0d0f` (rich editorial charcoal)
- **Text**: Automatically reverses to `var(--paper)` cream
- **Links**: `#e3c8c2` cream accent, transitions to paper on hover
- **Borders**: Adjust to `rgba(241, 238, 229, 0.12)` for dark ground

## Props Reference

```tsx
interface DarkImmersionProps {
  children: React.ReactNode;
  startDark?: boolean;           // Start in dark mode (default: false)
  activateOnScroll?: boolean;    // Activate on scroll (default: true)
  activationThreshold?: number;  // Viewport % visible to activate (default: 0.2)
}
```

## Integration with Existing Case Studies

### Digital Literacy Example

```tsx
// Before: static dark .cr-root
<main className="cr-root">
  <section>Hero content</section>
  <section>Problem narrative</section>
  <section>Interactive simulation</section>
</main>

// After: dynamic dark immersion
<main className="cr-root">
  <section>Hero content (stays light)</section>

  <DarkImmersion>
    <section>Problem narrative (transitions to dark)</section>
    <section>Interactive simulation (spotlighted)</section>
  </DarkImmersion>
</main>
```

## Technical Details

- **IntersectionObserver API** — Efficient scroll detection
- **Threshold array** — `[0, 0.2, 0.5, 0.8, 1]` for smooth activation
- **Root margin** — `-10%` top/bottom prevents premature activation
- **Transitions** — 0.6s cubic-bezier(0.4, 0, 0.2, 1) for color shift
- **Reduced motion** — Respects `prefers-reduced-motion` media query

## CSS Classes

- `.dark-immersion` — Base wrapper (transparent/neutral state)
- `.dark-immersion--active` — Dark mode activated
- `.dark-immersion__content` — Centered content wrapper (max 1160px)

## Browser Support

Modern browsers with IntersectionObserver support (all evergreen browsers).

## Performance

- Hardware-accelerated via `will-change: background-color, color`
- Minimal reflows — full-bleed prevents layout shift
- Efficient observer cleanup on unmount
