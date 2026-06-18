---
sidebar_position: 3
---

# Data Models

Reusable public JSON shapes and enum values will be documented here.

## Access Markers

Use the `Access` column when a field is not always public.

| Marker | Meaning |
|---|---|
| Empty | Public field. |
| `authenticated` | Returned only for authenticated requests. |
| `owner` | Returned only to the affected or owning user. |
| `moderator` | Returned only to moderators and higher. |
| `first-party` | Returned only to first-party clients. |

## Model Template

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

## Models

Models will be added here during migration.
