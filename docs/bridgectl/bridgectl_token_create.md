---
title: bridgectl token create
---

## bridgectl token create

Create an API token. The raw token is returned only in this response.

```
bridgectl token create --name <name> [flags]
```

### Options

```
      --expires string    Expiry as RFC3339 or a positive duration
  -h, --help              help for create
      --name string       Token display name
      --role stringArray  Token role (repeatable)
      --scope stringArray Token scope (repeatable: mcp, metrics, logs)
```

Use `--token`, `BRIDGE_API_TOKEN`, or the active context `api-token` for the
admin credential. Flag, environment, and context are the precedence order.
