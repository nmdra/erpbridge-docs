---
sidebar_position: 2
---

# Quickstart

Get ERPBridge running locally in a few minutes.

## Prerequisites

- Docker (recommended) or a local Go toolchain (Go 1.26+)
- A GitHub account for MCP clients like Claude Desktop or Cursor

## 1. Start the stack

```bash
git clone https://github.com/nmdra/ERPBridge.git
cd ERPBridge
docker compose up -d
```

This starts:

- `erpbridge-server` on port `8080`
- `mock-erp` (mock ERPNext) on port `8081`

## 2. Verify the server is healthy

```bash
curl http://localhost:8080/mcp/health
```

Expected response: `{"status":"ok"}`

## 3. Connect an MCP client

### Streamable HTTP (Postman, remote clients)

Base URL: `http://localhost:8080/mcp/`

### Stdio (Claude Desktop, Cursor)

Run the server binary in stdio mode:

```bash
erpbridge-server --stdio
```

## 4. Discover tools

Request the tool list through the MCP `initialize` and `tools/list` lifecycle, or use the CLI:

```bash
./bridgectl tool get
```

## 5. Call a tool

```bash
curl -X POST http://localhost:8080/api/tools/invoke \
  -H 'Content-Type: application/json' \
  -d '{"name": "erp.list_employees", "arguments": {}}'
```

## Next steps

- See the [Connectivity & Transport Guide](./connectivity.md) for transport details and Postman setup.
- See [bridgectl](./cli/bridgectl.md) for the CLI reference.
- See [Environment Variables](./environment-variables.md) for configuration options.
