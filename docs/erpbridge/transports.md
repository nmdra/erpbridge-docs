---
sidebar_position: 3
---

# Transports

ERPBridge speaks MCP over two transports, plus direct HTTP endpoints for tooling.

## 1. Streamable HTTP

The MCP streamable HTTP transport. Best for remote clients, web apps, and Postman.

- **Base URL:** `http://localhost:8080/mcp/`
- **Handshake:** `POST /mcp/initialize`
- **Specification:** MCP 2025-03-26, negotiates up to `2025-11-25`
- **Session management:** `Mcp-Session-Id` header
- **CORS:** enabled by default for browser and desktop clients

## 2. Stdio

The client starts `erpbridge-server` as a child process and communicates over standard input/output. Best for local agents (Claude Desktop, Cursor, IDE integrations).

```bash
erpbridge-server --stdio
```

## 3. Direct API

Internal endpoints for management, monitoring, and the `bridgectl` CLI — no MCP handshake required. See the [REST API Reference](./api.md).

## Choosing a transport

| Client type | Transport | How to connect |
| :--- | :--- | :--- |
| Postman / web | Streamable HTTP | `http://localhost:8080/mcp/` |
| Claude / Cursor | Stdio | `erpbridge-server --stdio` |
| Scripts / CI | Direct API | `http://localhost:8080/api/` |

For the full details — session management, Postman collections, and protection limits — see the [Connectivity & Transport Guide](./connectivity.md).
