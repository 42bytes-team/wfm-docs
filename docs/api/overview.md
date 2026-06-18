---
sidebar_position: 1
---

# HTTP API Overview

Warframe.market exposes HTTP APIs for marketplace data, user-facing actions, and integration workflows.

This page will hold shared behavior that applies across endpoint groups, including base URLs, response envelope shape, auth headers, platform headers, language headers, rate limits, caching, and common error behavior.

## Draft Base URLs

| Environment | Base URL |
|---|---|
| Production API | `https://api.warframe.market` |
| Local development API | `https://api.warframe.test` |

## Response Envelope

Most JSON endpoints use the public response envelope:

```json
{
  "apiVersion": "x.x.x",
  "data": {},
  "error": null
}
```

Document endpoint-specific `data` shapes on [HTTP API](./http-api.md) and reusable shapes on [Data Models](./data-models.md).

## Contract Source Of Truth

Before updating endpoint documentation, inspect the route registration, handler, request validation, response construction, service behavior, and tests in the API repository. Do not document behavior from memory.
