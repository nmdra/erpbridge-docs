# Changelog

All notable changes to this documentation site are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Corrected the MCP handshake URL from `POST /mcp/initialize` to `POST /mcp/` with a JSON-RPC `initialize` request in the Transports and Connectivity guides (drift from server.go:465)
- Cache guide: TTL now documented as defaulting to `0` (no expiry), and `bridgectl cache flush` documented with the positional tool argument instead of the non-existent `--tool` flag

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