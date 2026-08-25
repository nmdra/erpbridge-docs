# Changelog

All notable changes to this documentation site are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added the read-only ERPBridge Console guide and `bridgectl web` command reference, including its loopback security boundary, safe data projections, topology match states, live metrics limitations, and plugin feature gate.
- Documented clickable tool inventory entries and the read-only tool manifest detail view.
- Documented the light-mode default and collapsible ERPBridge Console sidebar.
- Documented the homepage notice that separates monitoring from `bridgectl` configuration work.
- Documented descending timestamp order for recent Logs page events.
- Documented read-only plugin and binding metadata views, plugin-aware topology, and safe tool binding panels.
- Added the Agentic Tools MCP Integration guide for Codex CLI, OpenCode,
  OpenClaw, and Hermes Agent, including scoped bearer authentication and stdio
  credential boundaries.

- Documentation now covers the bounded in-memory cache fallback, generated YAML sequence and multi-document apply flow, exact tool filters, and MCP result-envelope boundaries.
- The homepage now highlights environment-backed authentication and external response plugins. The ERPBridge sidebar groups External Plugins under Plugin integration & development.
- The homepage durable-integration capability grid now contains six balanced cards.
- The MockERP guide now states that MockERP is for testing and learning only.
- Authentication documentation now covers hashed scoped API tokens, admin roles, bearer route policy, and one-time token disclosure.
- REST, connectivity, schema, environment, and bridgectl pages now document per-tool roles, selector handling, CORS, and CLI token precedence.
- Added the API Token Guide and bridgectl token command references.
- **SDK API reference** page (`docs/sdk/api-reference.mdx`) documenting the complete public surface of `@erpbridge/sdk` — entry points, every function, the client facade, the error hierarchy, configuration, and shared types. Replaces the generated TypeDoc site.
- **SDK overview** now links the npm package (with provenance note) and the new API reference page.
- **SDK authentication** page (`docs/sdk/authentication.mdx`) covering consume-only bearer credentials, per-surface token routing, declared scopes, and auth error handling.
- **SDK upgrade guide** (`docs/sdk/upgrade-guide.mdx`) migrating consumers to the v0.3 compatibility contract: `McpToolResult` envelopes and active credential configuration.
- SDK pages now document `AuthorizationError`, exact registry filters, REST invoke roles via `X-ERPBridge-Role`, and per-surface auth configuration.

- **Roadmap** split into Server, Bridgectl, and SDK sections and updated with current active plans.
- Added the MockERP Integration Contract guide for the pinned 0.2.1 image,
  credential boundary, SQLite reset flow, and supported fixture groups.
- Added the External Plugins guide covering exact-version resources, the
  synchronous HTTP protocol, failure policies, cache behavior, and the
  separate plugin deployment boundary.
- Updated architecture, REST API, Docker, and bridgectl references for
  external plugins and the opt-in black-box integration fixture.
- Documented plugin bearer/API-key credential references, exact endpoint
  allowlists, HTTPS transport policy, credential rotation, and explicit legacy
  registry scrubbing without plaintext backups.

### Fixed

- The OpenCode section of the Agentic Tools MCP Integration guide now shows
  the validated flat `mcp.<name>` config shape instead of the rejected
  `mcp.servers.<name>` nesting, adds `"enabled": true`, documents
  `oauth: false` for static bearer tokens, and notes client-side tool
  filtering via `tools` glob patterns.
- **Bridgectl Skill Usage** page (`docs/bridgectl/skills.mdx`) documenting the `bridgectl-ops` AI agent skill — onboarding, maintenance, authentication, operations, troubleshooting, and sanitized bug-report workflows
- **SDK Agent Guide** page (`docs/sdk/agent-guide.mdx`) mirroring the ERPBridge SDK repository's `AGENTS.md` — plan-first workflow, TDD, quality gates, release pipeline, and code conventions
- SDK overview page now links to the SDK repository and its agent guide
- Roadmap Phase 3 lists the ERPBridge SDK as an ecosystem item
- **SDK docs**: real landing page (`docs/sdk/overview.mdx`) plus new `installation.mdx`, `quickstart.mdx` (npm/pnpm tabs), `mcp-tools.mdx`, and `logs-metrics.mdx` covering the shipped client surface
- SDK listed in the `erpbridge/intro.mdx` components table and the SDK roadmap moved to Shipped (v0.1.1)

- Docs now distinguish the independently released products: ERPBridge Server and `bridgectl` at **v0.3.0-alpha.1**, and `@erpbridge/sdk` at **v0.1.1**
- Homepage redesigned with a modern dark theme: release badge pill, gradient title, atmospheric radial glows, and a **bridgectl terminal mockup** hero card
- Homepage **Start building** section with 6 pathway cards (**Quickstart**, **Onboarding Guide**, **Bridgectl CLI**, **ERPBridge SDK**, **REST API Reference**, and **Roadmap**) with circular animated arrow-chip buttons
- **Dedicated social card** (`static/img/social-card.svg`) for link previews on social platforms; replaces the SVG logo as the OG image
- **Announcement bar** surfacing the Alpha status with a link to the roadmap
- Footer **Community** section expanded with a **Discussions** link alongside GitHub and Issues
- New **ERPBridge SDK** section (work in progress) documenting the upcoming SDK with a built-in MCP client, log aggregation, and metrics viewing
- New global FAQ page (`/docs/faq`) answering common project-level questions, linked from the navbar and footer
- ERPBridge FAQ expanded with sections on MCP clients & transports, caching, notifications & system tools, and errors & exit codes
- Roadmap page rewritten with shipped/in-flight status tables and phased plan

### Changed

- SDK release references updated from v0.1.1 to **v1.0.0** across the homepage release badge, announcement bar, SDK overview status callout, and roadmap pages; the SDK roadmap now lists consume-only authentication as Shipped and the upgrade guide describes the ERPBridge v0.3 compatibility contract as the breaking v1.0.0 release.
- Product release versions (`ERPBridge + bridgectl` and `@erpbridge/sdk`) are centralized in `src/constants/releases.ts`; site chrome (announcement bar, docs version label, homepage badges) imports from it.
- ERPBridge now uses a clearer, scalable bridge-and-connection mark in the site logo and social card.
- SDK documentation now replaces the shared docs badge with `SDK · v0.1.1`; Server and `bridgectl` pages retain the ERPBridge release badge.
- Homepage and docs now show separate, current version lines for ERPBridge Server/`bridgectl` and `@erpbridge/sdk`.
- Roadmap pages now separate shipped, in-flight, and future work with product status cards and technical references.
- The global FAQ is organized by product, onboarding, security, and operations with links to the owning technical guides.
- Homepage refreshed with marketing-led onboarding copy, an ERP-to-agent workflow, Server/bridgectl/SDK entry points, shipped capability highlights, and focused start routes; product introduction pages retain technical-first language.
- Homepage product chooser now distinguishes the Server’s control-plane/runtime role from bridgectl’s developer tools and calls out the shipped `bridgectl-ops` agent skill.
- Homepage hero subtitle now uses the product tagline: “Connect your legacy ERP to AI-based workflows without changing your code base.”
- Navbar now exposes local search directly, with stronger keyboard focus treatment and responsive reduced-motion safeguards shared across the site.
- Homepage feature-card icons marked `aria-hidden` so screen readers skip the decorative image and announce only the card title
- Homepage hero terminal: the six `bridgectl` lines now fade up in sequence on first paint instead of appearing all at once (disabled under `prefers-reduced-motion`)
- Homepage feature-card description text now uses the `--ifm-color-emphasis-700` Infima token instead of hardcoded slate values, so it tracks the light/dark theme
- Homepage feature cards are now **clickable links** to their respective doc pages (MCP→Transports, Tool Registry→Tool Schema, Resilient→Caching, Non-Invasive→Onboarding, AI-Agent-First→MCP Client Guide, BYOERP→Connectivity)
- Homepage quickstart cards now include **category icons** (rocket, plug, terminal, code, globe, map) for visual differentiation
- Inline `<code>` in feature descriptions now has a background, border, and rounded corners instead of bare text
- Hero terminal mockup now **scrolls horizontally** on narrow screens with a reduced font size instead of wrapping awkwardly
- **Feature icons rewritten** to use `currentColor` for neutral elements so they adapt to light/dark themes instead of hardcoded slate fills; replaced fragile `<text>` in the non-invasive icon with a no-code circle-and-slash symbol
- Navbar: "Source" and "GitHub" text links replaced with a single **GitHub icon** linking to the main ERPBridge repo (docs repo link stays in the footer)
- Navbar restyled with a **frosted-glass** effect (backdrop blur + translucent background)
- Homepage feature cards modernized into a clean **3×2 grid** with large left-aligned icons, hover lift, and dark-mode border glow
- Navbar reordered: **SDK** entry moved to right after **Bridgectl** (before Roadmap and FAQ)
- Site title shortened from "ERPBridge Docs" to "ERPBridge" (navbar, hero, browser tab)
- Hero primary button renamed to **Try ERPBridge**
- Hero illustration redesigned: minimal composition (no text labels) showing data transformation — raw ERP packets flow into the hub and leave as structured packets for AI agents
- Site tagline updated to "Connect your legacy ERP to AI-based workflows without changing your code base" (homepage hero, meta description, `llms.txt`)
- Homepage feature sections extended to six: the original **MCP Made Simple**, **Tool Registry**, and **Resilient by Default**, plus **Non-Invasive Integration**, **AI-Agent-First Design**, and **BYOERP — Bring Your Own ERP**, each with a custom icon

### Fixed

- Updated cache, environment, onboarding, quickstart, FAQ, REST API, and MCP client pages to match the current server behavior.
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
- Authentication guide: replaced the planned-authentication text with the current admin, scoped-token, CORS, and guarded-tool behavior

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
