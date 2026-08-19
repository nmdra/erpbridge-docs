# AI Agent Guide

Documentation site for the ERPBridge project family. Built with Docusaurus 3.x (TypeScript), published to GitHub Pages.

## Development Rules

Rules for agents making changes to this repository.

### Plan first

- Read the active plans before coding: `.agents/plans/Plan-docs.md` (this site) and upstream `.agents/plans/Plan*.md` in the ERPBridge repo when relevant.
- Each plan task carries a `Verify:` command — the task is done only when that command is green.
- Open a plan (or extend it) for any work the plans don't cover.

### Small commits

- One plan task = one commit. Keep commits small and single-purpose; separate unrelated changes into their own commits.
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `build:`, `refactor:`) — the git-commiter skill handles message generation and staging.
- Never commit generated artifacts (`build/`, `node_modules/`) — they are gitignored.

### Quality gates

- Run `npm run build` before finishing any task — it fails on broken links and MDX errors, so it is the primary verification.
- Content changes that reflect product behavior keep the upstream ERPBridge repo docs in sync (single source of truth lives there).
- Update CHANGELOG.md (Unreleased) in the same commit as user-facing changes.

### Content conventions

- Docs are plain Markdown, not MDX (`markdown.format: 'md'` in `docusaurus.config.ts`) — do not introduce JSX/React components in `.md` files.
- Each product gets its own section under `docs/<product>/`; register new sections in `sidebars.ts` and the navbar in `docusaurus.config.ts`.
- Prefer relative links between docs pages.