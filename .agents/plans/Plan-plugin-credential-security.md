# Plan: ERPBridge Plugin Credential Security Documentation

## Goal

Mirror ERPBridge's credential-reference, plugin authentication, endpoint allowlist,
secure transport, Docker fixture, rotation, and legacy-registry migration
behavior in the public Docusaurus documentation. Keep ERPBridge responsible for
request policy and credential references only; plugin deployment remains outside
ERPBridge.

Source of truth: the active ERPBridge plan at
`../ERPBridge/.agents/plans/active/Plan-Plugin-Endpoint-Authentication.md` and
its in-repository `docs/` pages.

## Tasks

- [x] **Task 1: Synchronize public security documentation.** Update the plugin,
  REST API, architecture, Docker, and environment-variable pages with the
  supported bearer/API-key `PluginAuth` contract, `PLUGIN_*` credential
  references, protected admission and exact endpoint allowlists, HTTPS and
  exact HTTP development exceptions, redirect behavior, secret rotation,
  legacy registry scrubbing, and the authenticated Compose fixture. Do not
  document raw-secret persistence, dynamic secret providers, OAuth, mTLS,
  application encryption, or plugin lifecycle management as supported.
  Update `CHANGELOG.md` under Unreleased without literal credential values.
  (**Seam:** public contract and security guidance; **Files:** listed pages and
  `CHANGELOG.md`; **Verify:** `npm run build` and a repository search over
  published docs finds no literal credentials or generated secret values.)
