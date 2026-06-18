---
sidebar_position: 2
---

# HTTP API

This page will contain public HTTP endpoint documentation migrated from Notion.

## Endpoint Template

Use this structure for endpoint sections unless the endpoint is intentionally simpler.

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

- Cache behavior, rate limits, platform behavior, language behavior, and sorting rules go here when implemented.
````

## Endpoint Index

Endpoint groups will be added here during migration.
