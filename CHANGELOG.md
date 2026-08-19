# Changelog

All notable changes to this documentation site are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Docusaurus 3.10 site (TypeScript) with project-page deployment at https://blog.nimendra.xyz/erpbridge-docs/
- ERPBridge product docs section ported from the ERPBridge repo `docs/` tree (guides, REST API reference, and full `bridgectl` CLI reference)
- New pages: Introduction, Quickstart, Transports, Authentication (planned design)
- Roadmap section for upcoming projects in the ERPBridge family
- Local search via `@easyops-cn/docusaurus-search-local`
- GitHub Pages CI/CD: `test-deploy.yml` (PR build check) and `deploy.yml` (build + deploy on push to `main`)
- AI-readiness: `docusaurus-plugin-copy-page-button` (copy page as Markdown, open in ChatGPT/Claude/Gemini, MCP server install for Cursor/VS Code, per-page `.md` routes) and `docusaurus-plugin-llms` (`llms.txt` + `llms-full.txt` per the llmstxt.org standard)
- README, AGENTS.md, and this changelog