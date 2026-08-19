---
sidebar_position: 13
---

# REST API Reference

The ERPBridge server exposes direct HTTP endpoints. They do not require an MCP handshake. They serve the `bridgectl` CLI, scripts, and monitoring tools.

## Base URL

`http://localhost:8080` (or the value of `MCP_PORT`)

## Tool Registry (Control Plane)

The registry API is Kubernetes-style. It stores tool definitions in SQLite.

### List Tools

```http
GET /apis/erpbridge.io/v1/tools
```

Returns a JSON array of tool definitions.

### Apply a Tool

```http
POST /apis/erpbridge.io/v1/tools
Content-Type: application/json
```

Body: one tool definition (kind `MCPTool`). Returns `201 Created` on success.

### Delete a Tool

```http
DELETE /apis/erpbridge.io/v1/tools?name=<name>&version=<version>&hard=true
```

| Query param | Description |
| :--- | :--- |
| `name` | Tool name. Required. |
| `version` | Tool version. Required. |
| `hard` | `true` removes the row from SQLite. Omitted or `false` soft-deletes the tool. |

Returns `204 No Content` on success.

### Admission Rules

The server rejects tool definitions when:

- The tool name starts with `get-` or `post-`.
- The endpoint path contains embedded secrets (for example `token ` or `key=`).

## Tool Invocation

### Invoke a Tool

```http
POST /api/tools/invoke
Content-Type: application/json
```

Body:

```json
{
  "name": "list_employees",
  "arguments": {}
}
```

The call goes through the middleware chain: rate limiting, cache, and resilience.

## Cache

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/cache/stats` | `GET` | Cache key counts and memory usage. Returns `503` when the cache is disabled. |
| `/api/cache/flush` | `GET` | Flush cache entries. Query params: `tool`, `module`, `all=true`. Returns `503` when the cache is disabled. |
| `/api/cache/list` | `GET` | Reserved. Returns `501 Not Implemented`. |
| `/api/cache/inspect` | `GET` | Reserved. Returns `501 Not Implemented`. |

## Logs

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/logs/recent` | `GET` | JSON array of the last 1000 log entries. |
| `/api/logs/stream` | `GET` | Server-sent events stream of log entries. |

## MCP Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/mcp/` | `POST` | MCP JSON-RPC requests (Streamable HTTP). |
| `/mcp/` | `GET` | SSE notification stream for the session. |
| `/mcp/health` | `GET` | Returns `{"status": "ok"}`. |

## Observability

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/metrics` | `GET` | Prometheus-formatted metrics. |

## Error Responses

The server uses standard HTTP status codes. For cache endpoints, `503` means the cache is not enabled.
