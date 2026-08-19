---
sidebar_position: 12
---

# Frequently Asked Questions

## Configuration

### How do I configure the server?

Set the environment variables listed in the [Environment Variables Reference](./environment-variables.md). Export them in your shell, or set them in `docker-compose.yml`.

### How do I configure the CLI?

The CLI reads `~/.bridgectl/config.yaml`. The file holds named contexts. Each context has a `server`, `mcp-server`, and `erp-base` URL.

To switch contexts:

```bash
bridgectl context list
bridgectl context set <name>
```

To override the address for one command:

```bash
BRIDGE_MCP_SERVER=http://localhost:8080 bridgectl tool get
```

### Why do `bridgectl cache` and `bridgectl log` fail with "connection refused"?

The default context points `server` at `http://localhost:8082`. Nothing listens there. Set `BRIDGE_SERVER=http://localhost:8080`, or edit the `server` value in `~/.bridgectl/config.yaml`.

### How do I enable debug logging?

Set `LOG_LEVEL=debug` on the server. You can also set per-component levels, for example `LOG_LEVEL_MCP=debug`.

### How do I run the server in JSON log mode?

Set `APP_ENV=production`.

### Do I need Redis?

No. The cache is optional. If `REDIS_URL` is empty, the server disables the cache and tool calls still work. The cache endpoints return `503`.

## Tools & Schemas

### Where do tool schemas come from?

The `schemas/` directory is not tracked by git. Generate the schemas from the OpenAPI spec of your ERP:

```bash
bridgectl api register --name erp --url http://localhost:8081 --module erp --description "Mock ERP"
bridgectl tool generate --api erp --openapi mock-erp/openapi.yaml -o yaml > schemas/erp/generated.yaml
bridgectl tool apply -f schemas/erp/
```

### How do I update a tool?

Apply the new version with `bridgectl tool apply -f <file>`. The registry keeps multiple versions. MCP clients receive the latest stable version.

### How do I hide a tool without deleting it?

Soft-delete it:

```bash
bridgectl tool delete <name> <version>
```

The tool stays in the database. It no longer appears in `tools/list`.

### How do I restore a soft-deleted tool?

Apply the schema again:

```bash
bridgectl tool apply -f schemas/erp/<name>.json
```

### How do I permanently remove a tool?

```bash
bridgectl tool delete <name> <version> --hard
```

CAUTION: A hard delete removes the tool from the database. You cannot restore it.

### How quickly does the server pick up tool changes?

Within 10 seconds. The reconciliation controller ticks every 10 seconds. A tool applied over the API is visible immediately.

## Authentication

### How does the server authenticate ERP calls?

Tool schemas reference a credential by name (`credentialRef`). The server resolves the reference from environment variables at call time. Schemas never contain raw secrets.

The mock ERP accepts:

- Token header: `token adm_key_001:adm_sec_stu901`
- Session cookie (`sid`)
- Basic auth: `admin:admin`

See the [Mock ERP in the repository](https://github.com/nmdra/ERPBridge/tree/main/mock-erp) for details.

## Upgrades

### How do I upgrade ERPBridge?

1. Pull the latest changes: `git pull`
2. Rebuild the binaries: `make build`
3. Restart the containers: `docker compose up -d --build`

The SQLite registry keeps its data. The server runs a startup migration. Errors are logged but do not stop the server.

### Where do I find release notes?

See [CHANGELOG.md](https://github.com/nmdra/ERPBridge/blob/main/CHANGELOG.md).

## Troubleshooting

### Tool calls return `internal server error`

Check the server logs:

```bash
docker compose logs erpbridge-server
```

Common causes:

- The ERP service is unreachable. Make sure `ERP_BASE_URL` uses `http://mock-erp:8081` inside Docker.
- The tool endpoint path contains a secret pattern and was rejected.
- The MCP role of the session has no cache scope.

### Where do I get help?

- Report bugs and request features: [GitHub Issues](https://github.com/nmdra/ERPBridge/issues)
- See [CONTRIBUTING.md](https://github.com/nmdra/ERPBridge/blob/main/CONTRIBUTING.md)
- See the [Troubleshooting section of the Onboarding Guide](./onboarding.md#troubleshooting)
