# Comprehensive Code-vs-Documentation Alignment & Gap Analysis Report: ERPBridge

**Project Analyzed:** [ERPBridge](file:///home/nimendra/Documents/Projects/ERPBridge)  
**Documentation Site:** [erpbridge-docs](file:///home/nimendra/Documents/Projects/erpbridge-docs)  
**Date of Audit:** 2026-08-19  
**Auditor:** Antigravity Autonomous Audit Team (using 4 parallel specialized audit subagents)

---

## Table of Contents

1. [Executive Summary & Subsystem Scorecard](#1-executive-summary--subsystem-scorecard)
2. [Critical Findings, Code Bugs & Documentation Blockers](#2-critical-findings-code-bugs--documentation-blockers)
3. [MCP Server, HTTP APIs, Transports & Observability](#3-mcp-server-http-apis-transports--observability)
4. [Configuration, Environment Variables, Security & Authentication](#4-configuration-environment-variables-security--authentication)
5. [bridgectl CLI & Output Formatter Audit](#5-bridgectl-cli--output-formatter-audit)
6. [IDP Generator, Tool Schema Specification (V2), Caching & Mock ERP](#6-idp-generator-tool-schema-specification-v2-caching--mock-erp)
7. [Comprehensive Inventory of Missing Documentation Areas](#7-comprehensive-inventory-of-missing-documentation-areas)
8. [Side-by-Side Discrepancy & Drift Catalog](#8-side-by-side-discrepancy--drift-catalog)
9. [Actionable Remediation Plan](#9-actionable-remediation-plan)

---

## 1. Executive Summary & Subsystem Scorecard

This audit evaluated every line of Go and Python source code, schemas, configuration files, and Docker setups in **ERPBridge** against all Markdown and MDX files in **erpbridge-docs** (`docs/erpbridge/*`, `docs/bridgectl/*`, `docs/roadmap/*`).

### Alignment Scorecard by Subsystem

| Subsystem | Code Implementation Reference | Docs Reference | Alignment | Key Gaps / Findings |
| :--- | :--- | :--- | :---: | :--- |
| **MCP Server & Transports** | [`internal/mcp/server.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/server.go), [`main.go`](file:///home/nimendra/Documents/Projects/ERPBridge/services/erpbridge-server/main.go) | [`transports.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/transports.mdx), [`mcp-client-guide.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/mcp-client-guide.mdx) | **85%** | Handshake URL documented as `/mcp/initialize` instead of `/mcp/`; built-in tools (`system.*`) undocumented; notifications (`progress`, `alert`) undocumented. |
| **HTTP REST Control Plane** | [`internal/mcp/server.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/server.go#L550-L850) | [`api.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/api.mdx) | **80%** | JSON response envelopes omitted; admission failure HTTP 422 omitted; direct invoke response wrapping omitted. |
| **Prometheus Metrics** | [`internal/metrics/metrics.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/metrics/metrics.go) | [`api.mdx:106`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/api.mdx#L102-L107) | **0%** | All 11 Prometheus metrics, metric types, and label sets in code are completely missing from docs. |
| **Configuration & Env Vars** | [`internal/config/config.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/config/config.go), [`main.go`](file:///home/nimendra/Documents/Projects/ERPBridge/services/erpbridge-server/main.go) | [`environment-variables.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/environment-variables.mdx) | **90%** | CLI environment variables (`BRIDGE_*`) documented; missing `MOCK_ERP_LOG_LEVEL`, `ERP_PRIMARY_KEY` in Compose table. |
| **Authentication & Security** | [`internal/connector/client.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/connector/client.go), [`internal/logger/mcp_handler.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/logger/mcp_handler.go) | [`auth.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/auth.mdx) | **60%** | Inbound auth documented as open/planned; outbound ERP connector auth (`api-key`, `basic`, `bearer`) and sensitive data redaction rules are completely omitted from `auth.mdx`. |
| **Connector Resilience** | [`internal/connector/client.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/connector/client.go) | [`connectivity.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/connectivity.mdx) | **50%** | HTTP timeout (15s), Circuit Breaker (gobreaker), and Exponential Backoff / Retry policies are completely absent from docs. |
| **bridgectl CLI Commands** | [`internal/cli/*.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cli/), [`tools/bridgectl/main.go`](file:///home/nimendra/Documents/Projects/ERPBridge/tools/bridgectl/main.go) | [`docs/bridgectl/*`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/bridgectl/) | **85%** | All 18 commands documented; exit codes (0-7), `AgentActionableError` JSON protocol, and flag shadowing in `tool get` undocumented. |
| **IDP Generator & Tool Schemas** | [`internal/idp/generator.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/idp/generator.go), [`internal/mcp/tool.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/tool.go) | [`tool-schema.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/tool-schema.mdx), [`onboarding.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/onboarding.mdx) | **75%** | `outputSchema` runtime JSON Schema validation omitted; `invalidateOn` vs `flushOn` silent unmarshal drop; batch apply conflict in onboarding guide. |
| **Caching Layer** | [`internal/cache/*.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cache/) | [`caching.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/caching.mdx) | **70%** | Auto-flush short-circuit bug on write tools; `FlushModule` / `FlushAll` key pattern bug; key truncation (8 hex chars) omitted; `--tool` flag syntax drift. |
| **Mock ERP System** | [`mock-erp/*`](file:///home/nimendra/Documents/Projects/ERPBridge/mock-erp/) | [`onboarding.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/onboarding.mdx), [`faq.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/faq.mdx) | **95%** | Endpoints and fixtures align; small port/logging variable discrepancies. |

---

## 2. Critical Findings, Code Bugs & Documentation Blockers

### 2.1 Critical Code Bugs Discovered During Audit

1. **Auto-Flush Short-Circuit on Write Tools ([`internal/mcp/middleware.go:137-139`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/middleware.go#L137-L139))**
   - **Bug:** `CacheMiddleware` begins with:
     ```go
     if s.cache == nil || t.Spec.Cache == nil || !t.Spec.Cache.Enabled {
         return next(ctx, req)
     }
     ```
   - **Impact:** Write operations with `cache: { enabled: false, flushOn: [...] }` immediately bypass the middleware and never reach `s.cache.AutoFlush(ctx, t.Spec.Cache.FlushOn)`. This breaks automatic cache invalidation on mutations despite documentation stating this is the intended design.

2. **`invalidateOn` Silent Unmarshal Drop ([`internal/cache/manager.go:18-23`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cache/manager.go#L18-L23))**
   - **Bug:** `Config` struct only defines `FlushOn []string json:"flushOn"`.
   - **Impact:** `docs/erpbridge/tool-schema.mdx:113` instructs users to write `invalidateOn: ["list_invoices"]` and claims the server maps it. Because no struct tag or unmarshaler handles `invalidateOn`, it is silently ignored by `json.Unmarshal`, leaving `FlushOn` empty.

3. **`FlushModule` and `FlushAll` Pattern Matching Failure ([`internal/cache/flush.go:34-41`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cache/flush.go#L34-L41), [`internal/mcp/server.go:769`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/server.go#L769))**
   - **Bug 1 (`FlushModule`):** Scans Redis keys matching `exact:<module>.*:*`. However, `manager.go:92` formats keys as `exact:<tool>:<roleScope>:<argsHash>` without module prefix. `FlushModule` matches 0 keys.
   - **Bug 2 (`FlushAll`):** `server.go` calls `FlushModule(ctx, "")`, producing pattern `exact:.*:*`. Redis pattern matching evaluates `.` literally, matching only keys starting with `exact:.`, deleting 0 keys instead of matching all exact entries (`exact:*`).

4. **Inconsistent `ERP_BASE_URL` in MCP Resources ([`internal/mcp/resource.go:50-52`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/resource.go#L50-L52))**
   - **Bug:** When executing an MCP resource read, `resource.go` hardcodes `http://localhost:8081` for relative URLs and never checks `os.Getenv("ERP_BASE_URL")`, unlike [`internal/mcp/tool.go:173-196`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/tool.go#L173-L196).

5. **Flag Shadowing in `bridgectl tool get` ([`internal/cli/tool.go:430`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cli/tool.go#L430))**
   - **Bug:** `toolGetCmd.Flags().StringP("output", "o", "table", ...)` re-declares the persistent `-o, --output` flag from [`root.go:105`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cli/root.go#L105), altering Cobra doc generation and causing dual maintenance.

---

## 3. MCP Server, HTTP APIs, Transports & Observability

### 3.1 HTTP Endpoint Inventory Matrix

| Endpoint Path | Methods in Code | Authentication | Middleware Chain | Response Status & Payload | Status in `api.mdx` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/mcp/` | `POST`, `GET`, `OPTIONS` | CORS (`*`) | Session Tracker, Inactive Tool Filter | SSE Stream (`data: {...}\n\n`). JSON-RPC 2.0. | Documented (`api.mdx:98-99`) |
| `/mcp/health` | `GET` | None | None | `200 OK` `{"status":"ok"}` | Documented (`api.mdx:100`) |
| `/api/tools/invoke` | `POST` | None | RateLimit $\to$ Logger $\to$ Metrics $\to$ Cache | `200 OK` `{"result": <data>}`<br/>`500 Internal Error` `{"error": ...}` | Documented (`api.mdx:63-76`), response structure omitted |
| `/api/cache/stats` | `GET` | None | Cache Check | `200 OK` `{"apiVersion":"v1","kind":"CacheStats","status":"active","stats":{"exactKeys":int64,"redisMemory":string}}`<br/>`503 Service Unavailable` | Documented (`api.mdx:82`), response structure omitted |
| `/api/cache/flush` | `GET` | None | Cache Check | `200 OK` `{"deleted": int, "status": "ok"}`<br/>`400 Bad Request`<br/>`503 Service Unavailable` | Documented (`api.mdx:83`), response structure omitted |
| `/api/cache/list` | `GET` | None | None | `501 Not Implemented` | Documented (`api.mdx:84`) |
| `/api/cache/inspect` | `GET` | None | None | `501 Not Implemented` | Documented (`api.mdx:85`) |
| `/api/logs/stream` | `GET` | None | None | `200 OK` (`text/event-stream`) `data: <json>\n\n` | Documented (`api.mdx:92`) |
| `/api/logs/recent` | `GET` | None | None | `200 OK` `[<json>, ...]` (last 1000 items) | Documented (`api.mdx:91`) |
| `/apis/erpbridge.io/v1/tools` | `GET` | None | None | `200 OK` Array of `Tool` objects (`[]*Tool`) | Documented (`api.mdx:23-26`) |
| `/apis/erpbridge.io/v1/tools` | `POST` | None | Admission Controller | `201 Created` `{"status":"applied","name":string,"version":string}`<br/>`422 Unprocessable Entity` | Documented (`api.mdx:30-36`), 422 status omitted |
| `/apis/erpbridge.io/v1/tools` | `DELETE` | None | Immediate Deregistration | `204 No Content`<br/>`400 Bad Request`<br/>`500 Internal Error` | Documented (`api.mdx:39-49`) |
| `/metrics` | `GET` | None | `promhttp.Handler()` | `200 OK` Prometheus Exposition Format | Endpoint mentioned, **0 metric definitions documented** |

### 3.2 Built-in System Tools in Code (Undocumented)

The server registers two built-in tools at [`internal/mcp/server.go:100-171`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/server.go#L100-L171) which are omitted from all documentation:

1. **`system.progress_test`**:
   - **Schema:** `ProgressTestInput { Steps int }` (default: 10, max: 100).
   - **Purpose:** Demonstrates real-time progress notifications over MCP SSE streams (`notifications/progress`).
2. **`system.sensitive_log_test`**:
   - **Schema:** `SensitiveLogTestInput { Token string, Message string }`.
   - **Purpose:** Demonstrates server-side secret masking and client log streaming.

### 3.3 Prometheus Metrics Reference (100% Undocumented)

The following metrics are defined in [`internal/metrics/metrics.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/metrics/metrics.go) but not documented in `erpbridge-docs`:

| Metric Name | Type | Labels | Description in Code |
| :--- | :--- | :--- | :--- |
| `erp_requests_total` | Counter | `method`, `path`, `status` | Outbound requests from ERPConnector to upstream ERP. |
| `erp_request_duration_seconds` | Histogram | `method`, `path` | Latency distribution of outbound ERP requests. |
| `mcp_tool_invocations_total` | Counter | `tool`, `cache_status` (records `SUCCESS`/`ERROR`) | Total MCP tool invocations. |
| `mcp_tool_duration_seconds` | Histogram | `tool` | End-to-end execution duration of MCP tool calls. |
| `cache_hits_total` | Counter | `type` (`exact`) | Number of cache hits. |
| `cache_misses_total` | Counter | *None* | Number of cache misses. |
| `mcp_server_starts_total` | Counter | *None* | Total number of MCP server startup events. |
| `mcp_server_stops_total` | Counter | *None* | Total number of MCP server shutdown events. |
| `mcp_sessions_started_total` | Counter | *None* | Total MCP client sessions established. |
| `mcp_sessions_ended_total` | Counter | *None* | Total MCP client sessions terminated. |
| `mcp_sessions_active` | Gauge | *None* | Current number of active MCP client sessions. |

---

## 4. Configuration, Environment Variables, Security & Authentication

### 4.1 Master Environment Variables Comparison

| Variable Name | Component | Default in Code | Documented in `environment-variables.mdx` | Discrepancy / Gap |
| :--- | :--- | :--- | :--- | :--- |
| `MCP_PORT` | Server | `8080` | `8080` (Line 18) | In sync |
| `MCP_TRANSPORT` | Server | `""` (HTTP) | `(unset)` (Line 19) | In sync (`"stdio"` enables stdio) |
| `DATABASE_PATH` | Server | `data/erpbridge.db` | `data/erpbridge.db` (Line 20) | In sync |
| `REDIS_URL` | Server | `""` | `(empty)` (Line 21) | In sync |
| `RATE_LIMIT_RPS` | Server | `5.0` | `5.0` (Line 22) | In sync (`docker-compose.yml` sets `10`) |
| `RATE_LIMIT_BURST` | Server | `10` | `10` (Line 23) | In sync (`docker-compose.yml` sets `20`) |
| `BASE_URL` | Server | `http://localhost:<MCP_PORT>` | `http://localhost:<MCP_PORT>` (Line 24) | In sync |
| `ERP_BASE_URL` | Server | `http://localhost:8081` | `http://localhost:8081` (Line 25) | In sync |
| `LOG_LEVEL` | Logging | `info` | `info` (Line 26) | In sync (`debug`, `info`, `warn`, `error`) |
| `LOG_LEVEL_<COMPONENT>` | Logging | `(unset)` | `(unset)` (Line 27) | In sync (e.g. `LOG_LEVEL_MCP`) |
| `APP_ENV` | Logging | `(unset)` | `(unset)` (Line 28) | In sync (`production` = JSON) |
| `LOG_TO_STDERR` | Logging | `(unset)` | `(unset)` (Line 29) | In sync (auto-set in stdio mode) |
| `ERP_PRIMARY_KEY` | Security | `(unset)` | `(unset)` (Line 30) | In sync (resolved via `credentialRef`) |
| `BRIDGE_CONTEXT` | CLI | `local` | Line 42 | In sync |
| `BRIDGE_SERVER` | CLI | `http://localhost:8082` | Line 43, 57 (`http://localhost:8082`) | In sync in docs; `.env.example` sets `8080` |
| `BRIDGE_MCP_SERVER` | CLI | `http://localhost:8080` | Line 44, 58 (`http://localhost:8080`) | In sync |
| `BRIDGE_ERP_BASE` | CLI | `http://localhost:8081` | Line 45, 59 (`http://localhost:8081`) | In sync |
| `BRIDGE_AUTH_TYPE` | CLI | `api-key` | Line 46 | In sync |
| `BRIDGE_API_KEY` | CLI | `""` | Line 47 | In sync |
| `BRIDGE_AUTH_HEADER` | CLI | `X-API-Key` | Line 48 | In sync (`.env.example` sets `Authorization`) |
| `BRIDGE_TOKEN` | CLI | `""` | Line 49 | In sync |
| `BRIDGE_USERNAME` | CLI | `""` | Line 50 | In sync |
| `BRIDGE_PASSWORD` | CLI | `""` | Line 51 | In sync |
| `MOCK_ERP_PORT` | Mock ERP | `8081` (hardcoded) | Line 69 | In sync |
| `MOCK_ERP_LOG_LEVEL` | Mock ERP | `debug` (in `.env.example`) | **MISSING** | Defined in `.env.example:32`, omitted from docs |

### 4.2 Outbound ERP Authentication & Security

While [`auth.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/auth.mdx) documents inbound client authentication status (open / planned tokens), it **omits outbound ERP authentication**:

1. **`authType: "api-key"`**: Passes header `Authorization: <key>` (supports Frappe `token key:secret`).
2. **`authType: "basic"`**: Passes header `Authorization: Basic <base64(key)>`.
3. **`authType: "bearer"`**: Passes header `Authorization: Bearer <key>`.
4. **Credential Resolution**: Resolves `credentialRef` from environment variables, with fallback to the literal string value for local testing ([`internal/mcp/tool.go:199-203`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/tool.go#L199-L203)).

### 4.3 Data Redaction Rules

[`internal/logger/mcp_handler.go:32-61`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/logger/mcp_handler.go#L32-L61) automatically masks sensitive information before streaming logs:
- **Redacted Keys:** `password`, `token`, `api_key`, `secret`, `authorization`, `ssn`, `national_id`, `bank_account`.
- **Sensitive Types:** `types.APIToken`, `types.Password`, `types.AuthHeader`, `types.SecretKey`, `types.PII`.
- **Regex Masking:** `(?i)bearer\s+\S+` replaced with `Bearer [REDACTED]`.

---

## 5. bridgectl CLI & Output Formatter Audit

### 5.1 Command Matrix & Flags

All 18 commands and subcommands implemented in Go are documented:

```
bridgectl
├── api
│   ├── list
│   ├── register (--name*, --url*, --module*, --description*, --method, --auth-type, --auth-header, --auth-key)
│   └── test [name]
├── tool
│   ├── apply -f <file/dir>
│   ├── delete <name> <version> (--hard, -y/--yes)
│   ├── describe <name[@version]>
│   ├── generate (--api*, --openapi)
│   ├── get [name]
│   └── validate -f <file>
├── cache
│   ├── flush [tool] (-m/--module, -a/--all)
│   └── stats
├── log
│   ├── stats
│   └── tail (--component, --tool, --level, --request-id)
├── context
│   ├── list
│   └── set <name>
├── doc
├── version
└── completion (bash, fish, powershell, zsh)
```

### 5.2 Agent Actionable Errors & Exit Codes (Undocumented)

[`internal/cli/errors.go`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cli/errors.go) implements structured error handling for automated agents:

| Code Constant | Numeric Exit Code | Trigger Scenario |
| :--- | :---: | :--- |
| `CodeSuccess` | `0` | Command succeeded |
| `CodeGeneralErr` | `1` | Server 500 error or generic unhandled error |
| `CodeBadArgs` | `2` | Malformed URL, missing protocol (`http://`), invalid arguments |
| `CodeNotFound` | `3` | `API_NOT_FOUND` in registry |
| `CodeAuthFail` | `4` | Authentication failure |
| `CodeConflict` | `5` | Resource conflict |
| `CodeTimeout` | `6` | Request timed out |
| `CodePrecondFail` | `7` | `MISCONFIGURED_CONTEXT` (URL not set), `NO_CONTEXT` |

When `bridgectl -o json` is used, errors are serialized to **stdout** as JSON so agent subprocesses can parse error structures:
```json
{
  "error": "API_NOT_FOUND",
  "message": "API \"unknown\" not found in local registry",
  "suggestion": "Run 'bridgectl api list' to see available APIs.",
  "code": 3
}
```

---

## 6. IDP Generator, Tool Schema Specification (V2), Caching & Mock ERP

### 6.1 Tool Schema Specification (V2) Matrix

| Schema Field | Type | Required? | Runtime Behavior & Notes |
| :--- | :--- | :---: | :--- |
| `apiVersion` | `string` | Yes | Must be `"erpbridge.io/v1"`. |
| `kind` | `string` | Yes | `"MCPTool"`. |
| `metadata.name` | `string` | Yes | Intent-based name. Server rejects names containing `"get-"` or `"post-"`. |
| `metadata.version` | `string` | Yes | SemVer string (e.g. `"1.0.0"`). |
| `metadata.module` | `string` | Yes | Module classification (e.g. `"finance"`, `"hr"`). |
| `metadata.isActive` | `bool` | No | Soft-delete flag. Inactive tools are hidden from MCP `tools/list`. |
| `spec.description.short` | `string` | Yes | LLM summary. |
| `spec.description.whenToUse` | `[]string` | No | Positive trigger hints. |
| `spec.description.whenNotToUse`| `[]string` | No | Negative boundary hints. |
| `spec.description.examples` | `[]string` | No | Sample user prompts. |
| `spec.inputSchema` | `object` | Yes | JSON Schema for arguments. |
| `spec.outputSchema` | `object` | No | **Active validation:** If provided, 2xx responses are validated against it with `jsonschema/v6`. |
| `spec.execution.type` | `string` | Yes | `"http"`. |
| `spec.execution.method` | `string` | Yes | `GET`, `POST`, `PUT`, `DELETE`, `PATCH`. |
| `spec.execution.endpoint` | `string` | Yes | URL with `{param}` path placeholders. Secrets forbidden. |
| `spec.execution.mapping` | `map[string]string` | No | Maps LLM argument name $\to$ ERP parameter name. |
| `spec.execution.responsePath` | `string` | No | Top-level JSON key to unwrap (e.g. `"data"`). |
| `spec.security.authType` | `string` | Yes | `api-key`, `bearer`, `basic`. |
| `spec.security.credentialRef`| `string` | Yes | Environment variable name holding credentials. |
| `spec.cache.enabled` | `bool` | No | Enables exact-match caching. |
| `spec.cache.ttlSeconds` | `int` | No | Cache TTL (seconds). Defaults to 0 (no expiry) if omitted. |
| `spec.cache.isReadOnly` | `bool` | No | `true` = shared across all users; `false` = scoped by role. |
| `spec.cache.flushOn` | `[]string` | No | Tool names to invalidate upon execution. |
| `spec.routing` | `object` | No | `priority` (float64), `signals` ([]string), `antiSignals` ([]string). |
| `spec.lifecycle` | `object` | No | `status` (stable, deprecated, sunset), `deprecatedAt`, `sunsetAt`, `replacement`. |

### 6.2 Caching Key & Hashing Architecture

Key construction in [`internal/cache/manager.go:92-113`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cache/manager.go#L92-L113):
$$\text{Redis Key} = \texttt{exact:\{tool\}:\{roleScope\}:\{argsHash\}}$$
- `roleScope`: `"shared"` if `isReadOnly: true`; else user `role` (fallback `"anonymous"`).
- `argsHash`: `"empty"` if arguments map is empty; otherwise canonical JSON of key-sorted pairs hashed with SHA-256 and truncated to **first 4 bytes (8 hex characters)**.

---

## 7. Comprehensive Inventory of Missing Documentation Areas

1. **All 11 Prometheus Metrics**: Metric names, types, and label dimensions are completely absent from `api.mdx` and `architecture.mdx`.
2. **Built-in System Tools**: `system.progress_test` and `system.sensitive_log_test` are undocumented.
3. **Custom Notifications**: `notifications/progress` and `notifications/alert` (emitted on tool errors) are missing from `mcp-client-guide.mdx`.
4. **Outbound ERP Connector Authentication**: `auth.mdx` omits how `spec.security` formats headers and resolves `credentialRef`.
5. **Connector Resilience Policies**: 15s timeout, circuit breaker rules, and 3-attempt retry/jitter policies are missing from `connectivity.mdx`.
6. **Data Redaction Specification**: List of redacted field keys, sensitive types, and Bearer regex rules are undocumented.
7. **CLI Exit Codes & Agent Actionable Errors**: Exit codes 0-7, `AgentActionableError` structure, and stdout JSON error routing are undocumented.
8. **Tool Response Validation (`outputSchema`)**: The active response validation behavior using `jsonschema/v6` is undocumented in `tool-schema.mdx`.
9. **`metadata.isActive`, `spec.lifecycle`, `spec.routing`**: These schema fields are omitted from `tool-schema.mdx`.
10. **`MOCK_ERP_LOG_LEVEL`**: Missing from `environment-variables.mdx`.

---

## 8. Side-by-Side Discrepancy & Drift Catalog

| Item # | Area | Code Implementation | Published Documentation | Drift Severity |
| :---: | :--- | :--- | :--- | :--- |
| **D1** | MCP Handshake URL | `POST /mcp/` with JSON-RPC `{"method":"initialize"}` ([`server.go:465`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/server.go#L465)) | `POST /mcp/initialize` ([`transports.mdx:17`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/transports.mdx#L17), [`connectivity.mdx:17`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/connectivity.mdx#L17)) | **High** |
| **D2** | Cache Invalidation Tag | Struct field is `flushOn` ([`manager.go:22`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cache/manager.go#L22)) | Uses `invalidateOn` and claims server auto-mapping ([`tool-schema.mdx:113`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/tool-schema.mdx#L113)) | **Critical** |
| **D3** | CLI Flush Syntax | Positional arg: `bridgectl cache flush [tool]` ([`cache.go:64`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cli/cache.go#L64)) | Documents `--tool` flag: `bridgectl cache flush --tool list_employees` ([`caching.mdx:94`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/caching.mdx#L94)) | **High** |
| **D4** | Onboarding Batch Apply | `tool generate` creates individual `.json` files; stdout is YAML array `[]Tool` ([`generator.go:280`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/idp/generator.go#L280), [`tool.go:336`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cli/tool.go#L336)) | Redirects to `generated.yaml` and runs `tool apply -f schemas/erp/` which crashes on YAML lists ([`onboarding.mdx:92,120`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/onboarding.mdx#L92)) | **High** |
| **D5** | Cache Default TTL | Omitted `ttlSeconds` defaults to 0 (no expiry) in Redis ([`manager.go:77`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cache/manager.go#L77)) | Claims default is `3600s` ([`caching.mdx:21`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/caching.mdx#L21)) | **Medium** |
| **D6** | Skills Schema Format | Skills asset uses deprecated `endpoint.ref/method` syntax ([`skills/.../mcp-tool.yaml`](file:///home/nimendra/Documents/Projects/ERPBridge/skills/bridgectl-add-api/assets/mcp-tool.yaml)) | Onboarding guide specifies V2 `execution/security` ([`tool-schema.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/tool-schema.mdx)) | **Medium** |
| **D7** | Direct Invoke Tool Name | SQLite stores tool names as `list_employees` ([`schemas/erp/list_employees.json`](file:///home/nimendra/Documents/Projects/ERPBridge/schemas/erp/list_employees.json)) | Quickstart uses `"name": "erp.list_employees"` ([`quickstart.mdx:107`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/quickstart.mdx#L107)) vs `api.mdx:71` (`"name": "list_employees"`) | **Low** |
| **D8** | Protocol Version | Guides use `2024-11-05` ([`mcp-client-guide.mdx:76`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/mcp-client-guide.mdx#L76)) | Transports guide mentions `2025-03-26` / `2025-11-25` ([`transports.mdx:18`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/transports.mdx#L18)) | **Low** |

---

## 9. Actionable Remediation Plan

### 9.1 Priority Documentation Fixes (`erpbridge-docs`)

1. **Fix Handshake URL in [`docs/erpbridge/transports.mdx:17`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/transports.mdx#L17) and [`connectivity.mdx:17`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/connectivity.mdx#L17)**:
   - Change `Handshake: POST /mcp/initialize` to `Handshake: POST /mcp/` with payload `{"jsonrpc":"2.0","method":"initialize",...}`.
2. **Fix Cache CLI Syntax in [`docs/erpbridge/caching.mdx:94`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/caching.mdx#L94)**:
   - Change `bridgectl cache flush --tool list_employees` to `bridgectl cache flush list_employees`.
3. **Add Prometheus Metrics Section in [`docs/erpbridge/api.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/api.mdx)**:
   - Document all 11 Prometheus metrics with descriptions, types, and label dimensions.
4. **Add Outbound ERP Authentication Section in [`docs/erpbridge/auth.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/auth.mdx)**:
   - Detail `api-key`, `basic`, and `bearer` modes and environment variable resolution via `credentialRef`.
5. **Add Connector Resilience Section in [`docs/erpbridge/connectivity.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/connectivity.mdx)**:
   - Document the 15s timeout, Circuit Breaker (60% failure threshold over 5 requests, 30s open window), and 3-attempt exponential backoff retry policy.
6. **Update Onboarding Guide Workflow in [`docs/erpbridge/onboarding.mdx:92-120`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/onboarding.mdx#L92-L120)**:
   - Note that `bridgectl tool generate` writes individual `.json` files directly to `schemas/erp/`, and recommend running `bridgectl tool apply -f schemas/erp/` directly without stdout redirection.
7. **Add Exit Codes & Agent Integration in [`docs/bridgectl/overview.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/bridgectl/overview.mdx)**:
   - Document exit codes 0 through 7 and the `AgentActionableError` JSON payload.
8. **Document Output Schema Response Validation in [`docs/erpbridge/tool-schema.mdx`](file:///home/nimendra/Documents/Projects/erpbridge-docs/docs/erpbridge/tool-schema.mdx)**:
   - Explain how `spec.outputSchema` validates upstream ERP responses at runtime.

### 9.2 Priority Code Fixes (`ERPBridge`)

1. **Fix Cache Middleware Auto-Flush ([`internal/mcp/middleware.go:137-175`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/middleware.go#L137-L175))**:
   - Ensure `AutoFlush` is invoked for write operations even if `t.Spec.Cache.Enabled` is `false`, as long as `len(t.Spec.Cache.FlushOn) > 0`.
2. **Support `invalidateOn` in Cache Config ([`internal/cache/manager.go:18-23`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cache/manager.go#L18-L23))**:
   - Add alias / unmarshal support for both `invalidateOn` and `flushOn`.
3. **Fix `FlushAll` and `FlushModule` Key Patterns ([`internal/cache/flush.go:34-41`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cache/flush.go#L34-L41), [`internal/mcp/server.go:769`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/mcp/server.go#L769))**:
   - `FlushAll` should scan `exact:*`.
4. **Fix Flag Shadowing ([`internal/cli/tool.go:430`](file:///home/nimendra/Documents/Projects/ERPBridge/internal/cli/tool.go#L430))**:
   - Remove redundant local `-o, --output` flag definition from `toolGetCmd`.
5. **Update Skills Template ([`skills/bridgectl-add-api/assets/mcp-tool.yaml`](file:///home/nimendra/Documents/Projects/ERPBridge/skills/bridgectl-add-api/assets/mcp-tool.yaml))**:
   - Update asset template to match V2 schema specification (`execution` and `security` sections).
