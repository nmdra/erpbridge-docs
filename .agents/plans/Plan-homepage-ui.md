# Plan: Homepage UI/UX Polish

## Goal

Refine the existing ERPBridge homepage (`/`) — the hero with the `bridgectl`
terminal mockup and the feature/quickstart card grids — without adding new
sections. Focus: accessibility gaps, a subtle motion-polish for the hero
terminal, and theme-token consistency. Audience: first-time visitors on
desktop and mobile, including keyboard/screen-reader and reduced-motion users.

Scope decision: **Polish only** (chosen over "polish + new section" and
"structural redesign"). The page is already sectioned and branded; this plan
tightens what exists rather than re-architecting it.

## Current State

Homepage entry point renders `src/pages/index.tsx` inside `@theme/Layout`
(`index.tsx:124-136`). It composes:

- **Hero** (`HomepageHeader`, `index.tsx:92-122`): a `ReleaseBadge` pill linking
  to the roadmap, a gradient `heroTitle`, the site tagline, two CTA buttons
  ("Try ERPBridge" → `/docs/erpbridge/intro`, "Quickstart"), and a
  `TerminalMockup` card on the right.
- **Terminal mockup** (`TerminalMockup`, `index.tsx:37-90`): six `.terminalLine`
  blocks inside `.terminalBody` — five `bridgectl` command/output lines plus a
  final blinking-cursor line. Text is static; only the cursor blinks and the
  release dot pulses.
- **Features + Start building** (`src/components/HomepageFeatures/index.tsx`):
  a 3×2 grid of six `Feature` cards (`index.tsx:78-92`), each with an inline SVG
  icon rendered as `<Svg className={styles.featureSvg} role="img" />`
  (`index.tsx:82`) beside an `<h3>` card title, followed by a 3×2 "Start
  building" grid of six pathway `Link` cards with an `ArrowChip`.

Styling:

- `src/pages/index.module.css` — hero, terminal card, buttons. Reduced-motion
  block (`index.module.css:311-316`) disables only `.releaseDot` and
  `.terminalCursor` animations.
- `src/components/HomepageFeatures/styles.module.css` — card grid, hover lift,
  arrow-chip; reduced-motion block (`styles.module.css:201-208`). Card
  description text uses hardcoded `#475569` (light, `styles.module.css:88`) and
  `#cbd5e1` (dark, `styles.module.css:92`) instead of Infima theme tokens.
- `src/css/custom.css` — Infima `--ifm-color-primary` vars (light `#2e8555`,
  dark `#25c2a0`), frosted navbar, GitHub link. `colorMode.defaultMode: 'dark'`
  with `respectPrefersColorScheme: true` (`docusaurus.config.ts:117-120`).

Evidence-backed gaps:

1. **Decorative icons exposed to AT.** Each feature card renders the icon with
   `role="img"` (`index.tsx:82`) but no accessible name — the six
   `static/img/feature-*.svg` files contain no `<title>` element (grep for
   `<title` across `static/img/feature-*.svg`: 0 matches). Because each icon
   sits beside a visible `<h3>` with identical meaning, the icon is decorative;
   it should be hidden from assistive tech rather than announced as an unnamed
   image.
2. **Static terminal.** The hero terminal only animates the cursor
   (`terminalCursor` blink, `index.module.css:296-309`). The command/output
   lines appear all at once; a staggered reveal would add life consistent with
   the existing cursor/dot motion.
3. **Hardcoded slate tokens.** `.cardDescription` uses literal `#475569` /
   `#cbd5e1` (`styles.module.css:88,92`) while the rest of the homepage uses
   `--ifm-color-emphasis-*` tokens, so the card text does not track the Infima
   theme variables.

Constraints (from `AGENTS.md`): hand-written pages use MDX, but the homepage is
a React page (`index.tsx`) styling CSS Modules — no MDX concerns here. Each task
commits with a `CHANGELOG.md` Unreleased entry. `npm run build` is the primary
verification (it fails on broken links/MDX errors and regenerates the
AI-readiness artifacts).

## Decisions

- **Decorative icons → `aria-hidden`.** Alternative considered: add `<title>`
  to each SVG or an `aria-label` on `<Svg role="img">`. Rejected because the
  icon duplicates the adjacent visible `<h3>` title, so an accessible name
  would be redundant announcement; hiding decorative imagery is the correct
  WCAG treatment.
- **Terminal reveal via pure CSS, gated by `prefers-reduced-motion`.** A JS
  typewriter was considered and rejected: it adds state/complexity, can
  re-trigger on reflow, and fights SSR. A CSS `@keyframes` fade-up with
  `nth-child` delays is SSR-safe, deterministic, and trivially disabled under
  reduced motion. Reveal is one-shot (`forwards`), not looping, so it never
  competes with the existing cursor blink.
- **Use `--ifm-color-emphasis-700` for card description text.** It adapts to
  light/dark automatically, removing the need for the `[data-theme='dark']`
  override and matching the token usage already used elsewhere on the page
  (e.g. `.quickstartDescription` at `styles.module.css:198`). The muted
  visual weight is preserved.

## Scope

In scope:

- `src/components/HomepageFeatures/index.tsx` (icon a11y).
- `src/components/HomepageFeatures/styles.module.css` (token swap).
- `src/pages/index.module.css` (terminal reveal animation + reduced-motion).
- `CHANGELOG.md` (one Unreleased entry per task commit).

Intentionally out of scope: new homepage sections (e.g. a "How it works"
flow diagram), brand color changes, navbar/footer changes, terminal content
rewording, and any docs-section edits.

## Tasks

- [ ] **Task 1: Hide decorative feature-card icons from assistive tech.**
  In `src/components/HomepageFeatures/index.tsx:82`, replace
  `<Svg className={styles.featureSvg} role="img" />` with
  `<Svg className={styles.featureSvg} aria-hidden="true" />` (drop `role="img"`
  so the image role and its empty name are removed). The six SVG files
  (`static/img/feature-*.svg`) need no change. (**Seam:** `Feature` component
  render on the homepage; **Files:** `src/components/HomepageFeatures/index.tsx`;
  **Verify:** `npm run build` is green, then in a browser open the homepage and
  inspect the accessibility tree — feature icons are absent/ignored while each
  `<h3>` card title still reads as the card label.)
- [ ] **Task 2: Staggered reveal for hero terminal lines.**
  In `src/pages/index.module.css`, extend the `.terminalLine` rule (currently
  `index.module.css:259-262`) with `opacity: 0; transform: translateY(6px);` and
  `animation: terminalReveal 0.45s ease forwards;`, add `nth-child(1..6)`
  delays from `0.05s` to `0.55s` in `0.1s` steps, and add a `@keyframes
  terminalReveal { to { opacity: 1; transform: translateY(0); } }`. Add
  `.terminalLine` to the existing reduced-motion block
  (`index.module.css:311-316`) with `animation: none; opacity: 1; transform:
  none;`. The six `.terminalLine` children of `.terminalBody` correspond to the
  five `bridgectl` lines plus the cursor line (`index.tsx:46-86`).
  (**Seam:** `TerminalMockup` render in the hero; **Files:**
  `src/pages/index.module.css`; **Verify:** `npm run build` is green, then load
  the homepage — the six terminal lines fade up in sequence on first paint; with
  the OS "reduce motion" preference on, all lines are visible immediately with no
  animation.)
- [ ] **Task 3: Use Infima theme token for feature card description text.**
  In `src/components/HomepageFeatures/styles.module.css`, set
  `.cardDescription` `color` (`styles.module.css:88`) from `#475569` to
  `var(--ifm-color-emphasis-700)` and delete the `[data-theme='dark']
  .cardDescription` override (`styles.module.css:90-92`). (**Seam:** feature
  card grid on the homepage; **Files:**
  `src/components/HomepageFeatures/styles.module.css`; **Verify:** `npm run
  build` is green, then toggle light/dark mode on the homepage — card
  description text stays readable and now tracks the theme.)

## Verification

- `npm run build` is green for every task (primary gate per `AGENTS.md`; it
  also regenerates `llms.txt`, `llms-full.txt`, and per-page `.md`).
- Homepage (`/`) loads with no console errors; check both light and dark modes
  (default is dark, `respectPrefersColorScheme` is on).
- Accessibility tree (browser DevTools) shows feature-card icons as ignored and
  card titles as the labels.
- Terminal lines reveal sequentially on load; under reduced-motion preference
  they are all visible immediately.
- Each task is one Conventional Commit (`feat:`/`style:`/`fix:`) with a matching
  `CHANGELOG.md` Unreleased entry.

## Open Questions

None.
