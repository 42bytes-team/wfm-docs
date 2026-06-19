---
sidebar_position: 1
---

# Intoduction

This site documents public Warframe.market contracts for API clients, OAuth integrations, WebSocket clients, and marketplace policy consumers.

These pages are intentionally Markdown-first so maintainers and LLM agents can update them locally, review diffs, and publish a static site.

## Current Status

This Docusaurus project is the new home for public documentation. The initial pages are drafts that establish structure and writing conventions before the existing Notion content is migrated.

## Documentation Areas

| Area | Purpose |
|---|---|
| [HTTP API](./api/overview.mdx) | Endpoint behavior, headers, request fields, response envelopes, rate limits, caching, and errors. |
| [Data Models](./data-models.mdx) | Reusable JSON shapes, enum values, visibility rules, and examples. |
| [OAuth 2.0](./oauth/overview.md) | Client authorization, scopes, token exchange, refresh, revoke, and OAuth errors. |
| [WebSockets](./websockets/overview.md) | Realtime message envelopes, commands, events, routes, payloads, and auth behavior. |
| [Rules](./rules/overview.md) | Public marketplace rules and client-facing policy notes. |

## Local Development

Run the development server from `Services/Docs`:

```bash
yarn start
```

The dev server listens on `0.0.0.0:3001` so the local Nginx container can proxy `docs.warframe.test` to the host machine.
