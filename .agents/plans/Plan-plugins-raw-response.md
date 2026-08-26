# Plan: Document raw-response plugin media adaptation

## Goal

Document the approved ERPBridge `raw_response` plugin phase and its stable MCP
output contract. The public guide must explain that plugins are externally
operated, raw payloads are bounded and redacted, the developer owns the final
schema, and media-conversion output changes require a new MCP-visible tool name
and exact tool version.

## Scope

- Update External Plugins, REST API, and Architecture guides.
- Document tagged JSON/base64 raw bodies, status handling, phase order, limits,
  admission gates, cache behavior, fallback policy, and image-to-text output.
- Keep the navigation entry under Plugin integration & development.
- Add an Unreleased changelog entry.

## Verification

- `npm run build`
- Check generated `llms.txt` and page markdown for the raw-response contract.
- Audit examples and prose for credentials, ERP URLs, headers, caller identity,
  and raw response bodies.

## Commit

`docs: document raw media plugin adaptation`
