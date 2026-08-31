# Plan: Benchmark Page Visual Treatment

## Goal

Make the public ERPBridge benchmarking page easier to scan by presenting its
scope, commands, and measured results as responsive visual groups without
changing benchmark contracts or claims.

## Current State

- `docs/erpbridge/benchmarking.mdx` contains the benchmark instructions and
  measured result tables, but uses only default Markdown layout
  (`docs/erpbridge/benchmarking.mdx:8-71`).
- The site already uses responsive card grids with theme-aware Infima variables
  in the roadmap page and global stylesheet
  (`docs/roadmap/overview.mdx:20-41`, `src/css/custom.css:88-188`).
- The site requires `npm run build` for MDX, links, and generated artifact
  validation (`AGENTS.md:21-25`).

## Tasks

- [x] Add semantic MDX wrappers for a benchmark overview, command cards, and
  metric-summary cards; retain accessible text equivalents for every visual
  metric. **Files:** `docs/erpbridge/benchmarking.mdx`. **Verify:** `npm run build`.
- [x] Add responsive, theme-aware CSS scoped to the benchmark page; preserve
  reduced-motion behavior and avoid global table changes. **Files:**
  `src/css/custom.css`. **Verify:** `npm run build`.

## Verification

The page remains readable at mobile width, keeps the same benchmark results and
limitations, and the Docusaurus build passes.
