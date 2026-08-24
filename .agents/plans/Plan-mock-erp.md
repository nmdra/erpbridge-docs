# Plan: Publish the MockERP integration guide

## Goal

Document the pinned MockERP 0.2.0 image, versioned OpenAPI contract, credential
boundary, SQLite reset workflow, and supported ERPNext-aligned fixture groups.
Keep this site synchronized with ERPBridge's in-repository `docs/mock-erp.md`.

## Tasks

- [x] **Task 1: Add the MockERP guide and navigation.** Create the guide from the
  upstream contract, link it from the ERPBridge section, and update the Docker,
  API, and architecture pages with the pinned service boundary.
  (**Verify:** `npm run build`.)
- [x] **Task 2: Update the changelog and verify documentation safety.** Add an
  Unreleased entry, avoid literal credentials, and confirm the guide uses the
  same `0.2.0` image and OpenAPI tag.
  (**Verify:** `npm run build` and `rg -n -i '(api[_-]?key|token|password):\\s*[^<$ {]' docs/erpbridge`.)

## Completion

- [x] Task 1 and Task 2 are complete.
- [ ] Changes use one Conventional Commit for this plan.
