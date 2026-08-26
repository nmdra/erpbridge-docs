# Plan: Documentation editorial standardization

## Goal

Apply one language and terminology system across the ERPBridge documentation site without changing documented technical behavior.

## Tasks

- [x] **Task 1: Normalize language and structure.** Standardize sentence-case headings, direct instructions, terminology, product names, link labels, and homepage copy across hand-written Server, `bridgectl`, SDK, roadmap, FAQ, and site-chrome content.
  (**Verify:** `npm run build`.)
- [x] **Task 2: Correct review findings.** Use plain `bridgectl` labels in Docusaurus configuration, preserve `MockERP` as the product name and `mock-erp` as the service name, use `ERPBridge Server` for the runtime, and standardize `stdio`.
  (**Verify:** `npm run build`; `git diff --check`.)
- [ ] **Task 3: Review generated CLI references at their source.** The site stores Cobra-generated Markdown under `docs/bridgectl/`; update the upstream generator/source descriptions and regenerate the references so generated pages follow the same terminology without manual drift.
  (**Verify:** regenerate the CLI reference, then `npm run build`.)
