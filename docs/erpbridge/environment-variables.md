---
sidebar_position: 9
---

# Environment Variables Reference

This page lists all environment variables read by the ERPBridge server, the `bridgectl` CLI, and the mock ERP service.

## Server Variables

The server reads these variables directly from the environment. It does not load a `.env` file. Export the variables in your shell, or set them in `docker-compose.yml`.

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `MCP_PORT` | `8080` | HTTP listen port. |
| `MCP_TRANSPORT` | (unset) | `stdio` runs the server in stdio mode. Any other value runs the HTTP server. |
| `DATABASE_PATH` | `data/erpbridge.db` | Path of the SQLite tool registry. The parent directory is created automatically. |
| `REDIS_URL` | (empty) | Redis URL (for example `redis://localhost:6379`). If empty, the cache is disabled. |
| `RATE_LIMIT_RPS` | `5.0` | Per-session requests per second (token bucket). |
| `RATE_LIMIT_BURST` | `10` | Token bucket burst size. |
| `BASE_URL` | `http://localhost:<MCP_PORT>` | Public URL of the server. Used for log lines and telemetry only. |
| `ERP_BASE_URL` | `http://localhost:8081` | Base URL of the underlying ERP system. Used by tool execution. |
| `LOG_LEVEL` | `info` | Log level: `debug`, `info`, `warn`, or `error`. |
| `LOG_LEVEL_<COMPONENT>` | (unset) | Per-component log level override, for example `LOG_LEVEL_MCP`, `LOG_LEVEL_CACHE`, `LOG_LEVEL_CONNECTOR`, `LOG_LEVEL_IDP`. |
| `APP_ENV` | (unset) | `production` uses JSON log output. Any other value uses text output. |
| `LOG_TO_STDERR` | (unset) | `true` writes logs to stderr. The server sets this automatically in stdio mode. |
| `ERP_PRIMARY_KEY` | (unset) | Credential referenced by `credentialRef` in tool schemas. Resolved at tool-call time. |

## CLI Variables (`bridgectl`)

The CLI reads these variables to override the active context.

| Variable | Purpose |
| :--- | :--- |
| `BRIDGE_CONTEXT` | Overrides the active context name. |
| `BRIDGE_SERVER` | Base URL for the cache and log endpoints. |
| `BRIDGE_MCP_SERVER` | Base URL for the tool registry API (`/apis/erpbridge.io/v1/tools`). |
| `BRIDGE_ERP_BASE` | Parsed into the context. Not used by any command. |
| `BRIDGE_AUTH_TYPE` | Parsed into the context. Not used by any command. |
| `BRIDGE_API_KEY` | Parsed into the context. Not used by any command. |
| `BRIDGE_AUTH_HEADER` | Parsed into the context. Not used by any command. |
| `BRIDGE_TOKEN` | Parsed into the context. Not used by any command. |
| `BRIDGE_USERNAME` | Parsed into the context. Not used by any command. |
| `BRIDGE_PASSWORD` | Parsed into the context. Not used by any command. |

The CLI reads its defaults from `~/.bridgectl/config.yaml`. The default context uses:

| Key | Default |
| :--- | :--- |
| `server` | `http://localhost:8082` |
| `mcp-server` | `http://localhost:8080` |
| `erp-base` | `http://localhost:8081` |

> **Note:** Nothing listens on port `8082` by default. Set `BRIDGE_SERVER` or edit the config file before you use `bridgectl cache` or `bridgectl log`.

## Mock ERP Variables

| Variable | Purpose |
| :--- | :--- |
| `MOCK_ERP_PORT` | Declared in `.env.example` and the Makefile. The mock ERP hardcodes port `8081` in `main.py`. |

## Deprecated Variables

| Variable | Status |
| :--- | :--- |
| `SCHEMAS_DIR` | Present in the local `.env`. No code reads it. Remove it. |
| `EMBEDDER_URL` | Present in the local `.env`. No code reads it. Remove it. |
