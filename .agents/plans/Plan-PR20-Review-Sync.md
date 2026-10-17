# Plan: PR #20 remediation documentation sync

## Goal

Keep the public management MCP guide aligned with the four fixes approved in ERPBridge's `Plan-PR20-Review-Fixes.md`. The user approved committing this sync on the local main branch without a push.

## Task

- [x] Document literal deletion-query identities, canonical endpoint field spelling, shared sensitive-key screening, and empty resource inventories. **Files:** `docs/bridgectl/mcp.mdx`, `CHANGELOG.md`. **Seam:** public management MCP contract. **Verify:** `npm run build`; `git diff --check`; compare the changed contract paragraphs with `../ERPBridge/docs/bridgectl-mcp.md`. Commit these files and this completed plan together. Do not change generated build artifacts.

## Verification evidence

- `npm run build` succeeds and processes 76 documents, including the LLM-friendly artifacts.
- `git diff --check` is clean.
- The management MCP contract additions match the upstream guide.
- No generated artifacts are included. The upstream product fixes and regression tests pass their acceptance checks.
