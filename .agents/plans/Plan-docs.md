# Plan: SDK Release Sync and Version Centralization

## Goal

Sync every published release string on the site with reality: `@erpbridge/sdk`
v1.0.0 shipped on npm and GitHub (`sdk-v1.0.0`, 2026-08-22) while the site
still documents v0.1.1 in six places. Centralize the release strings into one
module so future bumps are a single edit.

Evidence:

- `npm view @erpbridge/sdk version` → `1.0.0`; remote tag `sdk-v1.0.0`
  exists; upstream CHANGELOG marks it BREAKING: "align client with ERPBridge
  v0.3" (`McpToolResult` envelope, active credentials).
- Stale strings: `docs/sdk/overview.mdx`, `docs/roadmap/overview.mdx`,
  `docs/roadmap/sdk.mdx`, `docusaurus.config.ts` (announcement bar),
  `src/theme/DocVersionBadge/index.tsx`, `src/pages/index.tsx`.
- Stale wording: `docs/sdk/upgrade-guide.mdx:10` calls the v0.3 contract work
  "a pre-1.0 minor migration"; `docs/roadmap/sdk.mdx` still lists consume-only
  authentication as future although v1.0.0 ships it.

Out of scope: the local `~/Documents/Projects/erpbridge-sdk` clone is behind
origin/main (release-please commits); pull it separately.

## Tasks

- [x] **Task 1: Centralize release versions (site chrome only).** Add
  `src/constants/releases.ts` exporting `ERPBRIDGE_RELEASE` and
  `SDK_RELEASE`, and wire the TS consumers to import it:
  `docusaurus.config.ts` (version label + announcement bar),
  `src/theme/DocVersionBadge/index.tsx`, `src/pages/index.tsx` (release
  badges). Values stay at the old releases in this commit; the bump is its own
  commit. MDX pages keep literal strings: `docusaurus-plugin-llms` v0.5.1
  feeds raw markdown source into `llms-full.txt`
  (`processMarkdownFile` → gray-matter), so `{CONST}` expressions would leak
  into that artifact unrendered.
  (**Seam:** version display in site chrome and homepage; **Files:** listed
  above; **Verify:** `npm run build` green; `build/llms-full.txt` and
  `build/docs/**/**.md` contain rendered versions with no `{*_RELEASE}`
  literals.)
- [x] **Task 2: Document the v1.0.0 release line.** Bump `SDK_RELEASE` to
  `v1.0.0` and update every literal `v0.1.1` mention in
  `docs/sdk/overview.mdx`, `docs/roadmap/overview.mdx`, and
  `docs/roadmap/sdk.mdx`. Reword `docs/sdk/upgrade-guide.mdx` so the ERPBridge
  v0.3 compatibility contract is described as shipping as the breaking v1.0.0.
  In `docs/roadmap/sdk.mdx`, move consume-only authentication from Future
  direction into the Shipped table; language ports stay future. Add an
  Unreleased entry to `CHANGELOG.md`.
  (**Seam:** SDK status surfaces site-wide; **Files:** `src/constants/releases.ts`,
  `docs/sdk/overview.mdx`, `docs/roadmap/overview.mdx`, `docs/roadmap/sdk.mdx`,
  `docs/sdk/upgrade-guide.mdx`, `CHANGELOG.md`;
  **Verify:** `npm run build` green and no remaining `v0.1.1` references
  outside `CHANGELOG.md` history.)
- [x] **Task 3: Correct OpenCode MCP config shape in agent-integrations.**
  The guide showed a nested `mcp.servers.<name>` block; current opencode
  releases validate a flat `mcp.<name>` record and reject the nested shape.
  Fix both examples (stdio, remote HTTP), add required-in-practice
  `"enabled": true`, document `oauth: false` for static bearer tokens, and
  note the client-side `tools` glob control (`"erpbridge_*": false`).
  Verified against https://opencode.ai/docs/mcp-servers and a live local
  server (nested shape → config validation error; flat shape → connected).
  (**Seam:** agent onboarding instructions for OpenCode; **Files:**
  `docs/erpbridge/agent-integrations.mdx`, `CHANGELOG.md`; **Verify:**
  `npm run build` green.)
