# Plan: ERPBridge Console Documentation Sync

> **Status: COMPLETED — VERIFIED 2026-08-26**

## Goal

Document the read-only local ERPBridge Console and `bridgectl web` command in the
public Docusaurus site without exposing credentials or unsafe plugin data.

## Scope

- Add the generated-style `bridgectl web` command reference.
- Add the local console usage, loopback security boundary, safe data sources,
  live-only metrics, topology match states, and plugin feature gate.
- Add the safe `/api/info` server metadata endpoint to the REST API reference.
- Document feature-detected, read-only plugin and binding metadata after the
  external-plugin plan is complete.
- Update the Unreleased documentation changelog.

## Tasks

- [x] **Task 1: Add public console and CLI documentation.** Add the web command
  reference, console guide, and sidebar entries. **Verify:** `npm run build`.
- [x] **Task 2: Synchronize API and changelog references.** Document `/api/info`
  and add an Unreleased entry. **Verify:** `npm run build`.
- [x] **Task 3: Document plugin-aware console views.** Document safe plugin and
  binding metadata, topology nodes, and tool binding panels. **Verify:**
  `npm run build`.

## Verification

Run `npm run build` from the repository root. Do not commit generated `build/`
output or `node_modules/`.
