---
sidebar_position: 1
---

# Roadmap

This documentation site hosts guides for all ERPBridge-related projects. Each product gets its own section.

## Active projects

- **[ERPBridge](../erpbridge/intro.md)** — MCP middleware for legacy ERP systems.

## Planned

| Project | Status | Notes |
| :--- | :--- | :--- |
| ERPBridge authentication (token-based) | In planning | `API_AUTH_TOKEN` + scoped API tokens; see [Authentication](../erpbridge/auth.md) |
| ERPBridge hardening | In planning | Cache fallback, security, correctness fixes |

## Adding a new project

Create a new section under `docs/<project>/` and register it in `sidebars.ts` and the navbar in `docusaurus.config.ts`.
