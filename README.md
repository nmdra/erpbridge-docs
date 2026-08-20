# erpbridge-docs

Documentation site for [ERPBridge](https://github.com/nmdra/ERPBridge) and related projects, built with [Docusaurus](https://docusaurus.io) and published to GitHub Pages.

**Live site:** https://blog.nimendra.xyz/erpbridge-docs/

## Local development

```bash
npm install
npm start
```

Opens a dev server with live reload at http://localhost:3000/erpbridge-docs/.

## Build

```bash
npm run build
```

Output goes to `build/`. Hand-written pages use MDX (`.mdx`) via `markdown.format: 'detect'`, while the generated cobra CLI reference (`.md`) stays as plain CommonMark so shell snippets like `<(...)` or `$(...)` are not parsed as JSX.

## Structure

```
docs/
├── erpbridge/   # ERPBridge Server docs — quickstart, transports, REST API, architecture, caching, auth, env vars
├── bridgectl/   # bridgectl CLI reference — overview plus per-command pages (generated)
├── sdk/         # ERPBridge SDK (in progress)
├── roadmap/     # upcoming projects, status, and phased plan
└── faq.mdx      # global FAQ
```

## AI readiness

The site is optimized for LLM consumption:

- **`llms.txt` / `llms-full.txt`** — generated at build time by `docusaurus-plugin-llms` (llmstxt.org standard) and served at `/erpbridge-docs/llms.txt` and `/erpbridge-docs/llms-full.txt`.
- **Per-page Markdown** — every doc is also served as raw Markdown at `/{path}.md`.
- **Copy page button** — `docusaurus-plugin-copy-page-button` adds a "copy as Markdown / open in ChatGPT / Claude / Gemini" button to every page, plus a one-click MCP server install for Cursor/VS Code.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys to GitHub Pages via `actions/deploy-pages`. Pull requests are build-checked by `.github/workflows/test-deploy.yml`.

## Contributing

See [CONTRIBUTING-style guidance](https://github.com/nmdra/ERPBridge/blob/main/CONTRIBUTING.md) and the repo's [AGENTS.md](AGENTS.md) for agent workflow rules.