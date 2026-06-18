---
sidebar_position: 1
---

# OAuth 2.0

This section documents Warframe.market OAuth behavior for public clients and first-party clients.

Document only behavior that is implemented in the API code or explicitly approved as planned. Do not infer OAuth behavior from the generic OAuth specification without repository evidence.

## Topics To Migrate

- OAuth client model and first-party or third-party distinctions.
- Authorization endpoint behavior.
- Token endpoint behavior.
- PKCE requirements.
- Refresh and revoke behavior.
- Scope names, defaults, and enforcement.
- Token lifetimes when exposed to clients.
- Success and error response examples.

## Endpoint Template

````md
## POST /oauth/token

Short behavior description.

### Request Fields

| Field | Type | Description |
|---|---|---|
| `grant_type` | `string` | Supported grant type. |

### Response

```json
{
  "access_token": "...",
  "token_type": "Bearer"
}
```
````
