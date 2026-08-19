# Changelog

All notable changes to this documentation site are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `llms.txt` link rendered next to the Copy page button so users can open the full documentation index directly
- New **ERPBridge SDK** section (work in progress) documenting the upcoming SDK with a built-in MCP client, log aggregation, and metrics viewing
- New global FAQ page (`/docs/faq`) answering common project-level questions, linked from the navbar and footer
- ERPBridge FAQ expanded with sections on MCP clients & transports, caching, notifications & system tools, and errors & exit codes
- Roadmap page rewritten with shipped/in-flight status tables and phased plan

### Changed

- Site title shortened from "ERPBridge Docs" to "ERPBridge" (navbar, hero, browser tab)
- Hero primary button renamed to **Try ERPBridge**
- Hero illustration redesigned: minimal composition (no text labels) showing data transformation — raw ERP packets flow into the hub and leave as structured packets for AI agents
- Site tagline updated to "Connect your legacy ERP to AI-based workflows without changing your code base" (homepage hero, meta description, `llms.txt`)
- Homepage feature sections extended to six: the original **MCP Made Simple**, **Tool Registry**, and **Resilient by Default**, plus **Non-Invasive Integration**, **AI-Agent-First Design**, and **BYOERP — Bring Your Own ERP**, each with a custom icon

### Fixed

- Corrected the MCP handshake URL from `POST /mcp/initialize` to `POST /mcp/` with a JSON-RPC `initialize` request in the Transports and Connectivity guides (drift from server.go:465)
- Cache guide: TTL now documented as defaulting to `0` (no expiry), and `bridgectl cache flush` documented with the positional tool argument instead of the non-existent `--tool` flag
- REST API reference: documented all 11 Prometheus metrics (names, types, labels), the `201` apply response envelope, the `422` admission status, and the `/api/tools/invoke`, `/api/cache/stats`, `/api/cache/flush` response envelopes (drift from internal/metrics/metrics.go and internal/mcp/server.go)
- Authentication guide: added outbound ERP authentication (`api-key`/`basic`/`bearer` header construction and `credentialRef` resolution) and the logger's data redaction rules (drift from internal/mcp/tool.go and internal/logger/mcp_handler.go)
- Connectivity guide: documented connector resilience (15s timeout, 3-attempt retry with jitter, gobreaker circuit breaker thresholds) that was previously undocumented (internal/connector/client.go)
- Onboarding guide: corrected the batch-apply workflow — `tool generate` writes individual `.json` files into `schemas/erp/`; the now-recommended flow applies the directory instead of the broken stdout-YAML redirect (internal/idp/generator.go)
- Bridgectl overview: documented exit codes 0–7 and the structured `AgentActionableError` JSON payload for agents; aligned the typical-workflow snippet with the corrected generate/apply flow (internal/cli/errors.go)
- Tool schema reference: documented `metadata.isActive`, `spec.outputSchema` runtime validation, `spec.execution.type`, `spec.routing`, `spec.lifecycle`, and corrected the cache invalidation field to `flushOn` (internal/mcp/tool.go)
- Tool schema reference: documented `metadata.isActive`, `spec.outputSchema` runtime validation, `spec.execution.type`, `spec.routing`, `spec.lifecycle`, and corrected the cache invalidation field to `flushOn` (internal/mcp/tool.go)
- MCP client guide: added the built-in system tools (`system.progress_test`, `system.sensitive_log_test`) and the `notifications/progress` + `notifications/alert` payloads; aligned protocol version (`2025-03-26`) and tool names (`list_purchase_invoices`) with current code
- Environment variables guide: added `MOCK_ERP_LOG_LEVEL`
- Quickstart: corrected the direct-invoke tool name from `erp.list_employees` to `list_employees`

### Added

- Split documentation into two product sections: **ERPBridge Server** (`docs/erpbridge/`) and **Bridgectl CLI** (`docs/bridgectl/`), each with its own sidebar
- Navbar restructure: renamed `ERPBridge` entry to `Docs` (umbrella) and added `Server` and `Bridgectl` shortcuts
- New Bridgectl overview landing page (`docs/bridgectl/overview.mdx`) with command-group table and typical workflow
- Mermaid architecture diagrams (control-plane overview and tool-lifecycle sequence) via `@docusaurus/theme-mermaid`

### Changed

- Hand-written pages converted from Markdown to **MDX** (`.mdx`) and upgraded with Docusaurus native features: `Tabs`, admonitions, collapsible `<details>`, code block titles, and richer front matter (description, keywords)
- `markdown.format` switched from `'md'` to `'detect'` so `.mdx` pages get full MDX while the generated cobra CLI reference stays CommonMark-safe
- Fixed MDX rendering: moved `mermaid` into the top-level `markdown` config (was misplaced in `themeConfig`) and re-enabled `mdx1Compat.admonitions` (disabled by `future.v4`) so `:::tip Title` admonitions render instead of showing as literal text
- Reordered server sidebar: Introduction → Quickstart → Onboarding → Connectivity → Transports → Architecture → Tool Schema → MCP Client Guide → Auth → Docker → Environment Variables → Caching → API → FAQ
- Bridgectl sidebar now groups commands by parent command (api, tool, cache, log, context, other)

### Added

- Custom ERPBridge branding: new logo, hero illustration (ERP ↔ AI bridge over MCP), and feature illustrations for the homepage
- Hero illustration upgraded to an animated SVG: rotating gears, blinking server lights, protective "0 code changes" halo, streaming energy + traveling data packets across the MCP bridge, orbiting hub rings, pulsing neural network, twinkling sparkles, and a 24/7 automation clock
- Blog section disabled (hidden from navbar/footer, plugin turned off)

### Added

- Docusaurus 3.10 site (TypeScript) with project-page deployment at https://blog.nimendra.xyz/erpbridge-docs/
- ERPBridge product docs section ported from the ERPBridge repo `docs/` tree (guides, REST API reference, and full `bridgectl` CLI reference)
- New pages: Introduction, Quickstart, Transports, Authentication (planned design)
- Roadmap section for upcoming projects in the ERPBridge family
- Local search via `@easyops-cn/docusaurus-search-local`
- GitHub Pages CI/CD: `test-deploy.yml` (PR build check) and `deploy.yml` (build + deploy on push to `main`)
- AI-readiness: `docusaurus-plugin-copy-page-button` (copy page as Markdown, open in ChatGPT/Claude/Gemini, MCP server install for Cursor/VS Code, per-page `.md` routes) and `docusaurus-plugin-llms` (`llms.txt` + `llms-full.txt` per the llmstxt.org standard)
- README, AGENTS.md, and this changelog