---
sidebar_position: 1
---

# Introduction

**ERPBridge** is a middleware that connects legacy ERP systems to modern AI agents through the **Model Context Protocol (MCP)**.

It exposes ERP functionality as MCP tools, so agents like Claude, Cursor, and other MCP-compatible clients can discover and call ERP operations without writing custom integrations.

## Why ERPBridge?

- **Standards-based** — implements MCP over streamable HTTP and stdio.
- **Tool registry** — register ERP APIs once, generate and validate MCP tool schemas.
- **Resilient** — built-in caching, rate limiting, and connection handling for upstream ERP systems.
- **Observable** — structured JSON logs, Prometheus metrics, and a health endpoint.
- **Agent-friendly** — a `bridgectl` CLI for local development and CI workflows.

## Components

| Component | Description |
| :--- | :--- |
| `erpbridge-server` | The MCP middleware server (HTTP + stdio transports). |
| `bridgectl` | Developer CLI to register APIs, manage tools, and monitor the middleware. |
| `mock-erp` | A mock ERP (FastAPI) for local development and testing. |

## Getting started

Start with the [Quickstart](./quickstart.md), or jump straight to the [Connectivity & Transport Guide](./connectivity.md) if you already run the server.
