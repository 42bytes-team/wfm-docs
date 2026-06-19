---
name: http-api-endpoint-documentation
description: Use when creating, auditing, or updating public HTTP endpoint documentation from Warframe.market API route registrations and handlers, especially routes.go and apps/vex-web/handlers.
---

# HTTP API Endpoint Documentation

## Goal

Create and maintain public HTTP endpoint docs from backend code evidence.

This skill is mainly for maintainers with access to the private API repository. Public contributors without backend access may use it for wording-only reviews, but must not change endpoint behavior, request/response fields, auth, scopes, headers, status codes, or examples.

Expected backend sources, when available:

```text
../Api/src/apps/vex-web/routes.go
../Api/src/apps/vex-web/handlers
```

If your checkout uses a different layout, locate the API repository manually. If the API repository is not available, stop any contract update and ask the maintainer for source evidence.

Primary docs/style sources:

```text
docs/api/overview.mdx
docs/contributing/http-api-endpoint-format.mdx
src/components/ApiEndpoint/index.tsx
.agents/skills/api-documentation/SKILL.md
```

Do not document from memory. Do not invent endpoints, fields, headers, query parameters, status codes, auth requirements, scopes, cache behavior, sorting, or response shapes.

## Required Reading Before Editing

Always read these docs-side files first:

- `docs/contributing/http-api-endpoint-format.mdx`
- `src/components/ApiEndpoint/index.tsx`
- `.agents/skills/api-documentation/SKILL.md`

Then decide the work mode:

- Wording-only docs edit: backend access is not required. Preserve endpoint behavior exactly as written.
- Endpoint contract edit or new endpoint docs: backend access is required. Read only the backend route group and handler files needed for the endpoint you are documenting.

## Context-Limited Workflow

Use this workflow for tasks like: “document this new endpoint” or “audit API docs against the backend.” Use it only when the backend repository is available.

1. Locate the API repository. Prefer `../Api` relative to the docs repo, but accept any local path the user provides.
2. Read `src/apps/vex-web/routes.go` and find the relevant `Map...Routes` function.
3. Write down the route group name, HTTP methods, canonical path, aliases, middleware, and handler function names.
4. Read only the matching handler package under `src/apps/vex-web/handlers/<group>/`.
5. Read request DTO files such as `requests.go` only when the endpoint has a body or query parsing there.
6. Read response helper files such as `responses.go` only when the handler uses them.
7. Read relevant tests such as `api_test.go` or `requests_test.go` when validation, errors, or examples are unclear.
8. Read data model docs or backend `src/internal/wfm/entity_*.json.go` only when the response references a model shape.
9. Patch only the endpoint section or page that needs updating.
10. Run verification.

If asked to audit all endpoints, process one route group at a time:

```text
MapItemsRoutes -> handlers/items -> docs update/no changes
MapOrdersRoutes -> handlers/orders -> docs update/no changes
MapUserRoutes -> handlers/user -> docs update/no changes
```

Do not load every handler file into context at once. A 128k-context local model can still fail if you flood it.

## Route Extraction

Routes are registered in `routes.go` with Chi methods.

Common patterns:

```go
o.Mux.Get("/items", api.GetItems)
o.Mux.Route("/item/{slug}", func(r chi.Router) {
    r.Use(o.Middlewares.Items.Slug)
    r.Get("/", api.GetItem)
})
o.Mux.With(o.Middlewares.Auth.Protect()).Get("/orders/my", api.GetMy)
```

How to document them:

- `o.Mux.Get("/items", api.GetItems)` means `GET /items`.
- `r.Get("/", api.GetItem)` inside `Route("/item/{slug}")` means `GET /item/{slug}`.
- `r.Get("/top", api.GetTopByItem)` inside `Route("/orders/item/{slug}")` means `GET /orders/item/{slug}/top`.
- Routes calling the same handler and returning the same shape are one endpoint with `aliases`.
- Put the preferred public route in `path` and variants in `aliases`.
- Do not include the HTTP method in `aliases`.

Example:

```mdx
<ApiEndpoint
  method="GET"
  path="/orders/item/{slug}/top"
  aliases={["/orders/itemId/{id}/top"]}
  summary="Get the top buy and sell orders for an item."
  badges={[{kind: 'crossplay', icon: '🌀', label: 'Crossplay aware'}]}
/>
```

Only add a version prefix such as `/v2` if existing docs or verified route mounting proves that public clients use it. `routes.go` itself currently registers paths without `/v2`.

## Internal Endpoint Rules

Some routes are operational or internal. Do not document them as public API endpoints unless the user explicitly asks.

Usually internal or non-public:

- `/monitoring/...`
- `/debug/pprof...`
- `/health-report`
- `/ghetto-xs23dfs/verification`
- any route protected by admin-only middleware and used for infrastructure.

If unsure whether an endpoint is public, ask the user or mention the uncertainty in the final response instead of adding public docs.

## Handler Evidence Checklist

For each endpoint, inspect the handler function and nearby request/response helpers.

Look for:

- URL params: `chi.URLParam(r, "id")` or middleware like `o.Middlewares.Items.Slug`.
- Query params: `r.URL.Query().Get(...)`, `r.URL.Query().Has(...)`, helper functions such as `getIntQuerryParam`.
- Request body DTO: `json.DecodeRequest(w, r, &requestStruct)`.
- Multipart body: `r.ParseMultipartForm`, `r.FormFile`, form key constants, max size, extension checks.
- Validation: `Validate()`, `ValidateBasic()`, `ValidateAgainstItem()`, `PointerMinMaxInt`, `RequiredString`, `CustomRule`, enum checks.
- Auth and access: `Auth.Protect(...)`, `ReqScopes`, `ReqRole`, `ReqTier`, `ReqVerification`, `ReqNotBeBanned`.
- Request context headers: `LangFromContext`, `PlatformFromContext`, `CrossplayFromContext`.
- Response data: `web.WriteResponse(r, w, status, data)`.
- Error responses: `web.WriteError(r, w, status, ...)`.
- Response models: `.Shape()`, `.ShapeCompact()`, `.ShapePublic()`, `.ShapeMe()`, inline response structs, response helper structs.
- Sorting/filtering/caching: service call names, comments, tests, or explicit code.

If the handler delegates behavior to a service and the public result depends on that behavior, inspect the service or tests. If you cannot verify it, do not document it as fact.

## Shared Headers

Global header parsing is in `middlewares/headers.go`.

Document these headers only when the endpoint actually uses their context or the response changes because of them.

| Header | Default | Evidence |
|---|---|---|
| `Language` | `en` | Handler/service uses `LangFromContext(ctx)` or localized shape calls. |
| `Platform` | `pc` | Handler/service uses `PlatformFromContext(ctx)`. |
| `Crossplay` | `false` | Handler/service uses `CrossplayFromContext(ctx)`. |

Do not add `Language`, `Platform`, or `Crossplay` tables to every endpoint automatically.

## Auth Rules

Auth middleware is in `middlewares/auth.go`.

Route evidence examples:

```go
r.Use(o.Middlewares.Auth.Protect())
r.Use(o.Middlewares.Auth.Protect(auth.ReqVerification(true)))
r.With(o.Middlewares.Auth.Protect(auth.ReqTier(auth.TierSilver))).Post("/background", api.Background)
```

Document auth with `ApiCallout` and badges.

Examples:

```mdx
badges={[{kind: 'auth', icon: '🔒', label: 'Auth required'}]}

<ApiCallout kind="warning" icon="🔒" title="Requires">

- Authentication
- Verified account
- Scope: `orders`

</ApiCallout>
```

Use precise requirements:

- `Protect()` means authentication is required with default role `user`.
- `ReqVerification(true)` means verified account is required.
- `ReqNotBeBanned(true)` means banned users cannot perform the action.
- `ReqRole(auth.RoleAdmin)` or `ReqRole(auth.RoleModerator)` means role requirement.
- `ReqScopes(...)` means OAuth/token scope requirement.
- `ReqTier(auth.TierSilver)` means a minimum subscription tier unless moderator override is coded.

Do not claim a scope requirement if it is commented out in code.

## Request Body Rules

Request body structs are usually in `handlers/<group>/requests.go`.

For each JSON request field:

- Use the JSON tag name, not the Go field name.
- `omitempty` or pointer types mean optional.
- Validation methods define required fields, min/max values, enum values, defaults, and cross-field rules.
- Use a `#### Body Fields` table under `### Request`.

Example table:

```mdx
#### Body Fields

| Field | Type | Description |
|---|---|---|
| `itemId` | <ApiBadge kind="neutral" label="string" /> | Required. Item identifier. |
| `type` | <ApiBadge kind="neutral" label="string" /> | Required. Must be `sell` or `buy`. |
| `rank` | <ApiBadge kind="neutral" label="int or null" /> | Optional. Required only for ranked items. Range: `0` to item max rank. |
```

For multipart endpoints:

````mdx
#### Body

Content-Type: `multipart/form-data`

```http
form-data; name="avatar"; filename="avatar.png"
```

#### Body Fields

| Field | Type | Description |
|---|---|---|
| `avatar` | <ApiBadge kind="neutral" label="file" /> | Image file to upload. |
````

Document max upload size, accepted extensions, resize/crop behavior, and output format only when code proves it.

## Query Parameter Rules

Query params are usually parsed in handler `api.go`.

For each query param:

- Use `#### Query Parameters` under `### Request`.
- Include type, optionality, accepted range, defaults, precedence, and ignored conditions.
- If helper functions apply common rules, read the helper.
- If param is only valid for some item kinds, state that condition.

Example:

```mdx
| `rank` | <ApiBadge kind="neutral" label="int" /> | Optional. Exact item rank. Accepted range: `0` to item max rank. |
| `rankLt` | <ApiBadge kind="neutral" label="int" /> | Optional. Match ranks lower than this value. Accepted range: `1` to item max rank. |
```

## Response Rules

Most JSON endpoints use `web.WriteResponse`, which is documented as the response envelope:

```json
{
  "apiVersion": "x.x.x",
  "data": {},
  "error": null
}
```

In endpoint docs:

- Show the envelope in `#### Body`.
- Put endpoint-specific fields inside `data`.
- Use `#### Data Fields` for inline response shapes.
- Link to `../data-models.mdx` for reusable models from endpoint pages instead of duplicating full schemas.
- If handler returns a model via `.Shape()` or `.ShapeCompact()`, document the model name and any compact/visibility differences.
- If handler returns an inline struct, document that inline `data` shape directly.
- If handler intentionally returns an empty body or plain string, verify how `web.WriteResponse` serializes it before documenting.
- Use `json` only for concrete, copyable payload examples.
- Use `ts` for schematic response shapes that contain reusable model types, such as `data: Order[]` or `data: UserPrivate`.
- Do not write reusable model placeholders as JSON strings, such as `"data": "Order"` or `"data": ["Order"]`.

Response example:

````mdx
### Response

#### Body

```ts
{
  apiVersion: "x.x.x",
  data: {
    sell: Order[],
    buy: Order[],
  },
  error: null,
}
```

#### Data Fields

| Field | Type | Description |
|---|---|---|
| `sell` | <ApiBadge kind="neutral" label="[]Order" /> | Sell orders. |
| `buy` | <ApiBadge kind="neutral" label="[]Order" /> | Buy orders. |
````

## Error And Status Code Rules

Document endpoint-specific errors when the handler explicitly returns them.

Look for:

```go
web.WriteError(r, w, http.StatusBadRequest, web.InputError(errMap))
web.WriteError(r, w, http.StatusUnauthorized, web.RequestError(i18n.ERR_UNAUTHORIZED))
web.WriteError(r, w, http.StatusForbidden, web.RequestError(...))
web.WriteError(r, w, http.StatusNotFound, web.RequestError(...))
web.WriteError(r, w, http.StatusInternalServerError, web.RequestError(...))
```

Do not list every generic `500` if it adds noise. Do document important public errors, validation failures, auth failures, and not-found behavior.

Use a table if helpful:

```mdx
#### Errors

| Status | Condition |
|---|---|
| `400` | Request body failed validation. |
| `401` | Authentication is missing or invalid. |
| `403` | User is not verified. |
```

## Endpoint Page Format

Use the style from `docs/contributing/http-api-endpoint-format.mdx`.

Endpoint docs that use components should be `.mdx` and import:

```mdx
import ApiEndpoint, {ApiBadge, ApiCallout} from '@site/src/components/ApiEndpoint';
```

Use this skeleton:

````mdx
## Get Top Orders

<ApiEndpoint
  method="GET"
  path="/orders/item/{slug}/top"
  aliases={["/orders/itemId/{id}/top"]}
  summary="Get the top buy and sell orders for an item."
  badges={[
    {kind: 'crossplay', icon: '🌀', label: 'Crossplay aware'},
  ]}
/>

### Request

#### URL Parameters

| Name | Type | Description |
|---|---|---|
| `slug` | <ApiBadge kind="neutral" label="string" /> | Item slug. |

#### Query Parameters

| Name | Type | Description |
|---|---|---|
| `rank` | <ApiBadge kind="neutral" label="int" /> | Optional. Exact item rank. |

### Response

#### Body

```ts
{
  apiVersion: "x.x.x",
  data: Order[],
  error: null,
}
```
````

Rules:

- Use `##` for endpoint names.
- Use `### Request` and `### Response`.
- Use `####` under those for URL parameters, query parameters, headers, body, body fields, constraints, data fields, and errors.
- Keep the right TOC clean with page front matter if needed:

```mdx
---
toc_min_heading_level: 2
toc_max_heading_level: 2
---
```

## Badge Rules

Use endpoint badges only when code proves behavior.

Common badges:

```mdx
{kind: 'auth', icon: '🔒', label: 'Auth required'}
{kind: 'i18n', icon: '🇬🇧', label: 'Language aware'}
{kind: 'crossplay', icon: '🌀', label: 'Crossplay aware'}
{kind: 'cache', icon: '⏱', label: '60s cache'}
{kind: 'firstParty', icon: '◆', label: 'First-party only'}
{kind: 'danger', icon: '✕', label: 'Deletes data'}
{kind: 'neutral', icon: '⇅', label: 'Custom ranking'}
{kind: 'neutral', icon: '☁', label: 'File upload'}
```

Never use an emoji or icon as the only meaning. Always include a text label.

## Source-To-Docs Checklist

Before finalizing an endpoint, answer these from code evidence:

- What route and HTTP method are registered in `routes.go`?
- Are there aliases that call the same handler?
- What middleware applies to the route and parent route group?
- Does the route require auth, verification, role, tier, subscription, not-banned, or scopes?
- Which URL params come from route placeholders or resource middlewares?
- Which query params are parsed?
- Which request body struct is decoded?
- What validation applies to every request field?
- What shared headers affect behavior?
- What response status is used on success?
- What is passed to `web.WriteResponse`?
- Is the response a reusable model from `docs/data-models.mdx`?
- What important public errors are returned?
- Are there tests that prove examples or edge cases?

If any answer is unknown, inspect more code or ask the user. Do not guess.

## Public Contributor Guidance

If you do not have the private API repository:

- You may fix grammar, spelling, formatting, broken prose, or unclear wording.
- You may improve examples only when you do not change their shape or semantics.
- You may not add, remove, or rename endpoints, fields, headers, auth requirements, scopes, status codes, enum values, constraints, sorting, caching, or examples that imply behavior changes.
- You should say in your final response that the change was wording-only and not backend-verified.
- If a requested change requires backend verification, ask a maintainer for source evidence instead of guessing.

## Do Not

- Do not document an endpoint from handler comments alone; verify route registration.
- Do not document internal/admin/monitoring/debug routes as public unless explicitly asked.
- Do not add auth scopes if they are commented out.
- Do not add `Language`, `Platform`, or `Crossplay` headers unless the handler/service uses them.
- Do not add cache badges without explicit cache behavior.
- Do not duplicate full data model schemas on endpoint pages.
- Do not include HTTP methods in `aliases`.
- Do not use raw `:::warning` directive blocks unless rendering is verified. Use `ApiCallout`.
- Do not rewrite unrelated endpoint sections while documenting one endpoint.

## Verification

After editing endpoint docs, run:

```bash
yarn build
```

Run this too if TypeScript, React components, Docusaurus config, sidebar, or imports changed:

```bash
yarn typecheck
```

If only `.agents/skills/...` files changed, no Docusaurus verification is required.

## Final Response

When done, report:

- Backend route group and handler files inspected.
- Endpoint docs added or changed.
- Auth/header/request/response behavior documented.
- Any unclear behavior left undocumented.
- Verification command results.
