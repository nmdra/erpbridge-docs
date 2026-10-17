# Plan: ERPBridge v0.6.0-alpha.1 documentation sync

## Goal

Synchronize current-release indicators and the management MCP version contract with the user-approved upstream feature release. Retain SDK v1.1.0 and historical compatibility records.

## Task

- [x] Update the shared ERPBridge release constant, roadmap release table and server status heading, the shipped CLI management MCP row, and management MCP identity guidance. Record the documentation changes under Unreleased. **Files:** `src/constants/releases.ts`, `docs/roadmap/overview.mdx`, `docs/roadmap/server.mdx`, `docs/roadmap/bridgectl.mdx`, `docs/bridgectl/mcp.mdx`, `CHANGELOG.md`, and this plan. **Seam:** current site chrome and product status, built MDX and release metadata guidance. **Verify:** `npm run build`; `git diff --check`; compare the version paragraph with upstream `docs/bridgectl-mcp.md`. Commit locally on main and push only after upstream artifact publication succeeds. No generated files or dependency changes.

## Local evidence

- Production Docusaurus build passes and generates LLM artifacts for 76 documents.
- `git diff --check` passes, and the management MCP identity paragraph matches upstream.
- The feature/version fix is tagged upstream at `v0.6.0-alpha.1` (`7a2d7a4`). Public push is gated on successful upstream workflow `39031853926` and artifact checks.
- SDK v1.1.0 and historical changelog entries are unchanged. No generated artifacts are committed.
