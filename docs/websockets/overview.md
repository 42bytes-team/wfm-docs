---
sidebar_position: 1
---

# WebSockets

This section documents public realtime contracts for Warframe.market WebSocket clients.

## Draft Connection URLs

| Environment | URL |
|---|---|
| Production | `wss://ws.warframe.market/socket` |
| Local development | `wss://ws.warframe.test/socket` |

## Message Envelope

Document route names exactly as they are implemented in the WebSocket service.

```json
{
  "route": "@wfm|cmd/domain/action",
  "payload": {}
}
```

## Command Template

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
