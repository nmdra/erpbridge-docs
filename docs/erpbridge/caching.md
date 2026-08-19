---
sidebar_position: 11
---

# Exact Match Caching

ERPBridge has a caching layer that reduces latency and load on legacy ERP systems. It serves repetitive queries directly from Redis.

## 🚀 Overview

The caching mechanism runs as middleware in the MCP tool execution pipeline. It uses **Redis** as the backend.

### Layer 1: Exact Match (SHA256)

The system gives O(1) lookups for identical requests.

- **Key Generation**: A deterministic hash of the tool name, the user role scope, and the JSON-sorted arguments.
- **TTL**: Configurable per tool (default: 3600s).
- **Benefit**: Fast response times for repetitive queries.

## ⚙️ Configuration

Caching is opt-in. It is configured per tool in the `spec.cache` section of the tool schema.

### Example Schema Configuration

```json
{
  "apiVersion": "erpbridge.io/v1",
  "kind": "MCPTool",
  "metadata": {
    "name": "list_employees",
    "version": "1.0.0",
    "module": "hr"
  },
  "spec": {
    "cache": {
      "enabled": true,
      "ttlSeconds": 3600,
      "isReadOnly": true,
      "flushOn": []
    }
  }
}
```

| Field | Description |
| :--- | :--- |
| `enabled` | Enables or disables the cache middleware for this tool. |
| `ttlSeconds` | How long the entry stays in Redis. |
| `isReadOnly` | If `true`, the cache is shared globally (`role: shared`). If `false`, entries are isolated by the MCP role of the user. |
| `flushOn` | An array of tool names. When the current tool runs, it flushes the cache of the listed tools. |

## 🧹 Cache Invalidation (Auto-Flush)

ERPBridge supports automatic cache invalidation. Use it on `POST`, `PUT`, or `PATCH` tools.

**Example: Invalidating "Get Invoices" when a new one is created.**

```json
"spec": {
  "cache": {
    "enabled": false,
    "flushOn": ["get_invoices"]
  }
}
```

## 🛠 Management with `bridgectl`

The developer CLI provides tools to monitor and manage the cache.

### Check Cache Statistics

Shows counts of cached keys and memory usage.

```bash
bridgectl cache stats
```

### Flush Cache

Clears the cache for a specific tool or an entire module.

```bash
# Flush specific tool
bridgectl cache flush --tool list_employees

# Flush entire module
bridgectl cache flush --module erp

# Flush everything
bridgectl cache flush --all
```

## 🔎 When Redis Is Not Configured

If `REDIS_URL` is not set, the server disables the cache. Tool calls still work. The cache endpoints return HTTP 503:

- `GET /api/cache/stats`
- `GET /api/cache/flush`

## 🏗 System Architecture

1. **ERPBridge Server**: Orchestrates the middleware and talks to Redis.
2. **Redis**: Stores the hashes and responses for high-speed retrieval.

For deployment details, see the [Docker Guide](./docker.md).
