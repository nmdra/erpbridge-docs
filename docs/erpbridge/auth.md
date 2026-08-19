---
sidebar_position: 4
---

# Authentication

Authentication protects the management endpoints and MCP transport from unauthorized access.

## Current status

- The MCP endpoint (`/mcp/`) and direct API endpoints are **open** — no authentication is enforced yet.
- Token-based authentication is **planned** and will land in an upcoming release (see [Roadmap](../roadmap/overview.md)).

## Planned design

Token-based authentication with two token classes:

| Token class | Source | Scopes | Purpose |
| :--- | :--- | :--- | :--- |
| Admin token | `API_AUTH_TOKEN` environment variable | all (implicit) | Server administration, CLI operations |
| API tokens | `api_tokens` store (created via the control plane) | `mcp`, `metrics`, `logs` | MCP clients, monitoring, log access |

Key properties of the planned design:

- API token values are shown **once** at creation, prefixed `erpbt_`; only a SHA-256 hash is stored.
- Tokens can be scoped (`mcp | metrics | logs`), expire, and be revoked individually.
- When `API_AUTH_TOKEN` is set, protected routes return `401` with a `WWW-Authenticate: Bearer` challenge.
- Stdio transport stays unauthenticated (local-only by design).

## Reporting auth issues

Open an issue at [github.com/nmdra/ERPBridge/issues](https://github.com/nmdra/ERPBridge/issues).
