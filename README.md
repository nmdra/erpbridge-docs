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

Output goes to `build/`. The site content is plain Markdown (MDX is disabled via `markdown.format: 'md'` so generated shell snippets are not parsed as JSX).

## Structure

```
docs/
├── erpbridge/   # ERPBridge product docs (ported from the ERPBridge repo docs/)
└── roadmap/     # upcoming projects and plans
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys to GitHub Pages via `actions/deploy-pages`. Pull requests are build-checked by `.github/workflows/test-deploy.yml`.

## Contributing

See [CONTRIBUTING-style guidance](https://github.com/nmdra/ERPBridge/blob/main/CONTRIBUTING.md) and the repo's [AGENTS.md](AGENTS.md) for agent workflow rules.