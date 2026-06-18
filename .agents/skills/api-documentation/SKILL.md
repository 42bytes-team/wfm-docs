---
name: api-documentation
description: Use when adding or changing public Warframe.market docs for HTTP API, data models, OAuth, WebSockets, rules, response shapes, route behavior, auth, scopes, headers, rate limits, caching, or marketplace policy.
---

# API Documentation

## Golden Rule

Document public behavior from code evidence, not memory.

Before changing docs, inspect the source of truth in the relevant service repository. If you cannot verify behavior from code or tests, mark it as a draft or ask the user.

## When Docs Must Change

Update docs when public behavior changes:

- HTTP methods, paths, auth requirements, scopes, headers, query params, request fields, response fields, status codes, errors, rate limits, caching, sorting, or visibility.
- Data model field names, types, optionality, enum values, examples, or access rules.
- WebSocket route names, message envelopes, commands, events, payloads, subscriptions, broadcasts, auth, scopes, timing, or error routes.
- OAuth clients, authorization, PKCE, token exchange, refresh, revoke, scopes, token lifetime, redirect behavior, or error shape.
- Public marketplace rules or API client rules.

If a code change is internal only, state that no public docs update was needed.

## Source Evidence Checklist

- HTTP routes: route registration, handler, request DTO, validation, response construction, service method, tests.
- Data models: JSON serializers, protobuf or generated public shapes, enum constants, visibility checks, tests.
- WebSockets: route constants, handlers, payload structs, validation, success/error routes, broadcast calls, tests.
- OAuth: handlers, clients, token code, scopes, middleware, first-party checks, tests.
- Rules: policy source, moderation behavior, product owner notes, or existing public rules.

## Markdown Style

- Use `.md` files for docs unless MDX is required.
- Use fenced `json`, `bash`, `http`, or language-specific code blocks.
- Use inline code for paths, route names, fields, headers, scopes, enum values, and status codes.
- Use tables for fields, headers, enum values, and model properties.
- Keep JSON examples clean and copyable. Do not include comments inside JSON.
- Do not use old Notion color spans such as `<span color="pink">` in new Markdown docs.
- Link reusable data models instead of duplicating full schemas on endpoint pages.

## HTTP Endpoint Template

````md
## GET /v2/example/{id}

Short purpose sentence.

Requires:

- Authentication: yes or no
- Scopes: `scopeName` if enforced

### URL Parameters

| Name | Type | Description |
|---|---|---|
| `id` | `string` | Public resource identifier. |

### Query Parameters

| Name | Type | Description |
|---|---|---|
| `limit` | `int` | Optional. Default: `50`. Min: `1`. Max: `100`. |

### Request Body

```json
{
  "field": "value"
}
```

### Response

```json
{
  "apiVersion": "x.x.x",
  "data": {},
  "error": null
}
```

### Notes

- Add cache, rate-limit, platform, language, sorting, and visibility notes when implemented.
````

## Data Model Template

````md
## ModelName

One sentence describing where the model is used.

| Field | Access | Type | Description |
|---|---|---|---|
| `field` |  | `string` | Public field description. |
| `optionalField` |  | `string or null` | Omitted or `null` when not available. |
| `moderationField` | `moderator` | `string` | Returned to moderators and higher. |

<details>
<summary>JSON example</summary>

```json
{
  "field": "value",
  "optionalField": null
}
```

</details>
````

## WebSocket Template

````md
## Command name

Short behavior description.

Requires:

- Authentication: yes or no
- Scopes: `scopeName` if enforced

### Client Message

```json
{
  "route": "@wfm|cmd/domain/action",
  "payload": {}
}
```

### Success Message

```json
{
  "route": "@wfm|cmd/domain/action:ok",
  "payload": {}
}
```

### Error Message

```json
{
  "route": "@wfm|cmd/domain/action:error",
  "payload": "app.error.key"
}
```
````

## Verification

After docs edits, run `yarn build` when practical. For small text-only edits, at least check links and sidebar paths if touched.
