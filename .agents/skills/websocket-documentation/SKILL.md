---
name: websocket-documentation
description: Use when creating, auditing, or updating public WebSocket documentation from the keyleth-ws backend app, especially docs/websockets/overview.mdx and ../Api/src/apps/keyleth-ws.
---

# WebSocket Documentation

## Goal

Keep public WebSocket documentation synchronized with the implemented `keyleth-ws` backend application.

This skill is mainly for maintainers with access to the private API repository. Public contributors without backend access may use it for wording-only reviews, but must not change WebSocket routes, payloads, auth requirements, event behavior, stream metadata, or examples that imply contract changes.

Expected backend source, when available:

```text
../Api/src/apps/keyleth-ws
../Api/src/pkgs/websockets
```

If your checkout uses a different layout, locate the API repository manually. If the API repository is not available, stop any WebSocket contract update and ask the maintainer for source evidence.

Public docs page:

```text
docs/websockets/overview.mdx
docs/websockets/reports.mdx
docs/websockets/authentication.mdx
docs/websockets/status-and-activity.mdx
docs/websockets/subscriptions.mdx
```

Do not document from memory. Do not invent routes, payload fields, scopes, event timing, metadata, or subscription behavior.

## Required Reading Before Editing

Always read these docs-side files first:

- the relevant page under `docs/websockets/`
- `docs/contributing/websocket-message-format.mdx`
- `docs/data-models.mdx`
- `src/components/ApiEndpoint/index.tsx`
- `.agents/skills/api-documentation/SKILL.md`

Then decide the work mode:

- Wording-only docs edit: backend access is not required. Preserve behavior exactly as written.
- WebSocket contract edit or sync task: backend access is required. Inspect relevant backend files one module at a time.

## Context-Limited Workflow

Use this workflow for tasks like “update WebSocket docs from backend” only when the backend repository is available.

1. Locate the API repository. Prefer `../Api` relative to the docs repo, but accept any local path the user provides.
2. Read `src/apps/keyleth-ws/app.go` to see which modules and routes are registered.
3. Read `src/apps/keyleth-ws/routes.go` to confirm the public socket HTTP path.
4. Read `src/pkgs/websockets/messages.go` and `src/pkgs/websockets/const.go` when message envelope or generic error behavior changes.
5. Process exactly one module at a time under `src/apps/keyleth-ws/modules/<module>/`.
6. For each module, identify route constants, registered handlers, payload structs, validation, success/error routes, event broadcasts, and tests.
7. Compare only that module's docs page or section under `docs/websockets/`.
8. Patch only the affected section.
9. Run verification.

Do not load every WebSocket module into context at once.

## Backend Evidence Checklist

For each WebSocket route or event, verify these from code:

- Route constant, for example `CMD_SET_STATUS = "@wfm|cmd/status/set"`.
- Route registration in `app.go`, for example `node.Add(status.CMD_SET_STATUS, statusMod.StatusHandler)`.
- Middleware applied to the route, for example `node.Use(middlewares.Protect(auth.ReqVerification(true)))`.
- Payload struct and JSON tags, usually in `request.go`.
- Validation rules, enum values, min/max limits, defaults, and null behavior.
- Success route and payload, for example `OK_SET_STATUS` and `EncodeMessage` call.
- Error route and payload, for example `ERR_SET_STATUS` and validation/error branches.
- Server events, broadcast calls, stream metadata, and timing.
- Tests when behavior is unclear.

If a constant exists but the handler is not registered in `app.go`, do not document it as an active public route.

If a handler is a stub, do not document it as implemented. Add a short “not implemented yet” note only if useful.

## Important Backend Files

Common source files:

| File | Purpose |
|---|---|
| `src/apps/keyleth-ws/app.go` | Module assembly and WebSocket route registration. |
| `src/apps/keyleth-ws/routes.go` | HTTP path for the WebSocket server, currently `/socket`. |
| `src/pkgs/websockets/messages.go` | Public message envelope: `route`, `payload`, `id`, `meta`. |
| `src/pkgs/websockets/const.go` | Generic WebSocket error routes. |
| `src/apps/keyleth-ws/middlewares/protect.go` | Auth/role/scope/tier/verification protection behavior. |
| `src/apps/keyleth-ws/modules/user` | Sign-in, sign-out, account events. |
| `src/apps/keyleth-ws/modules/status` | Status/activity command and status stream event. |
| `src/apps/keyleth-ws/modules/subs` | Order subscription commands and events. |
| `src/apps/keyleth-ws/modules/reporter` | Online count event. |

## Message Envelope Rules

The implemented envelope is:

```ts
{
  route: string,
  payload?: unknown,
  id?: string,
  meta?: {
    stream?: string,
    revision?: number,
  },
}
```

Do not document `refId` unless backend code adds it. Current command responses reuse the incoming `id` for correlation.

Use `json` for concrete messages and `ts` for schematic shapes containing model types or non-JSON type placeholders.

Examples:

```json
{
  "route": "@wfm|cmd/auth/signIn",
  "id": "message-id",
  "payload": {
    "token": "jwtToken"
  }
}
```

```ts
{
  route: "@wfm|event/subscriptions/newOrder",
  payload: Order,
}
```

## Route Documentation Format

Use the style from `docs/contributing/websocket-message-format.mdx` and the existing pages in `docs/websockets/`. Keep WebSocket docs mostly Markdown with `WsMessage`, API badges, and callouts where useful.

Required import pattern when using components:

```mdx
import {ApiBadge, ApiCallout, WsMessage} from '@site/src/components/ApiEndpoint';
```

Use this section shape:

````mdx
## Module Name

### Command Or Event Name

<WsMessage
  type="Command"
  route="@wfm|cmd/module/action"
  summary="Short behavior description."
  badges={[{kind: 'neutral', icon: '💬', label: 'Command'}]}
/>

<ApiCallout kind="warning" icon="🔒" title="Requires">

- Authentication
- Verified account

</ApiCallout>

#### Client Message

```json
{
  "route": "@wfm|cmd/module/action",
  "id": "message-id",
  "payload": {}
}
```

#### Payload Fields

| Field | Type | Description |
|---|---|---|
| `field` | <ApiBadge kind="neutral" label="string" /> | Field description. |

#### Success Message

```json
{
  "route": "@wfm|cmd/module/action:ok",
  "id": "message-id"
}
````

#### Error Message

```json
{
  "route": "@wfm|cmd/module/action:error",
  "payload": "app.errors.example",
  "id": "message-id"
}
```
```

Omit sections that do not apply. Events do not need `Client Message`, `Success Message`, or `Error Message` sections.

## Badge Rules

Common WebSocket badges:

```mdx
{kind: 'neutral', icon: '💬', label: 'Command'}
{kind: 'neutral', icon: '🔔', label: 'Event'}
{kind: 'neutral', icon: '🔁', label: 'Stream'}
{kind: 'auth', icon: '🔒', label: 'Auth required'}
{kind: 'danger', icon: '🚧', label: 'Not implemented'}
```

Always include text labels. Do not use emoji as the only source of meaning.

Do not render loose `BadgeGrid` rows before route text. Use `WsMessage` so the route, type, summary, and badges are visually grouped.

## Auth Rules

Auth behavior comes from `middlewares.Protect` in `keyleth-ws`.

- `Protect()` means authentication with default role `user` and not-banned check.
- `auth.ReqVerification(true)` means verified account is required.
- `auth.ReqScopes(...)` means scope requirement.
- `auth.ReqTier(...)`, `auth.ReqRole(...)`, and `auth.ReqSubscription(...)` should be documented when present.
- `@wfm|protect/error` is sent when protection fails.

Do not claim a scope requirement from Notion or memory if backend code does not enforce it.

## Stream Metadata Rules

Only document `meta.stream` and `meta.revision` when backend uses `EncodeMessageWithMeta` or otherwise proves metadata exists.

Status messages currently use:

```ts
meta: {
  stream: `status:${userId}`,
  revision: number,
}
```

## Data Model Links

Link reusable payload shapes to `docs/data-models.mdx` instead of duplicating full schemas.

Examples:

- `Order` -> `../data-models.mdx#order`
- `RichStatus` -> `../data-models.mdx#richstatus`
- `User` -> `../data-models.mdx#user`

Use `ts` blocks for model-shaped examples:

```ts
{
  route: "@wfm|event/subscriptions/newOrder",
  payload: Order,
}
```

## Public Contributor Guidance

If you do not have the private API repository:

- You may fix grammar, spelling, formatting, broken prose, or unclear wording.
- You may not add, remove, or rename routes.
- You may not change payload fields, auth requirements, scopes, validation rules, event timing, stream metadata, or examples that imply behavior changes.
- You should say in your final response that the change was wording-only and not backend-verified.
- If a requested change requires backend verification, ask a maintainer for source evidence instead of guessing.

## Do Not

- Do not document routes that are constants only; confirm they are registered in `app.go`.
- Do not document stubbed handlers as active behavior.
- Do not document Notion-only fields such as `refId` if backend does not implement them.
- Do not use raw `:::warning` directive blocks. Use `ApiCallout`.
- Do not duplicate full reusable model schemas on the WebSockets page.
- Do not rewrite unrelated WebSocket sections while updating one route.

## Verification

After editing WebSocket docs, run:

```bash
yarn build
```

Run this too if TypeScript, React components, Docusaurus config, sidebar, or imports changed:

```bash
yarn typecheck
```

If only `.agents/skills/...` files changed, no Docusaurus verification is required.

## Updating WebSocket Version

The docs reference the current WebSocket backend version in `docs/websockets/overview.mdx`.

- Look for the line: `This documentation describes WebSocket API version \`vX.Y.Z\`.`
- Get the latest WebSocket tag from the backend repo:
  ```bash
  git -C ../Api tag --list 'ws/v*' --sort=-v:refname | head -1
  ```
  This returns something like `ws/v0.13.0`. Extract `0.13.0` and update the docs line.

If `../Api` does not exist, ask the user for the backend repository path. Do not guess version numbers.

See also `.agents/skills/api-documentation/SKILL.md` → "Updating Backend Versions" for the full workflow (includes API version as well).

## Final Response

When done, report:

- Backend files inspected.
- WebSocket docs sections changed.
- Routes, payloads, auth, events, or metadata updated.
- Any unclear or unimplemented behavior left undocumented.
- Verification command results.
