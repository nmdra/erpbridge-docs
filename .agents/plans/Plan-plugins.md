# Plan: ERPBridge External Plugin Documentation

## Goal

Document the generic external-plugin control plane and mirror the contract from
ERPBridge's in-repository developer documentation without documenting plugin
deployment as an ERPBridge responsibility.

## Tasks

- [x] Add the external-plugin guide with resource manifests, the synchronous
  `POST /v1/process` contract, exact-version bindings, failure policies, cache
  behavior, and the separate `ERPBridge-Plugins` deployment boundary.
- [x] Update the architecture, REST API, and Docker pages with plugin control
  plane routes, lifecycle behavior, and the opt-in integration stack.
- [x] Add the plugin page to the ERPBridge sidebar and update the Unreleased
  changelog entry.

**Verify:** `npm run build` succeeds and the generated documentation contains
no literal credentials.
