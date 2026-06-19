---
name: api-documentation
description: Use when adding or changing public Warframe.market docs for HTTP API, data models, OAuth, WebSockets, rules, response shapes, route behavior, auth, scopes, headers, rate limits, caching, or marketplace policy.
---

# API Documentation

## Golden Rule

Document public behavior from code evidence, not memory.

Before changing public API behavior docs, inspect the source of truth in the relevant service repository. If you cannot verify behavior from code or tests, do not invent it; ask the maintainer or limit the change to wording-only edits.

## Contributor Modes

Choose the correct mode before editing:

- Wording-only docs edit: grammar, clarity, typos, formatting, navigation text, or examples that do not change public behavior. Backend access is not required. Do not reinterpret API behavior.
- Public contract edit: routes, fields, auth, scopes, headers, status codes, examples, request/response shapes, validation, visibility, rate limits, caching, sorting, or rules. Backend source evidence is required.
- Maintainer sync task: compare docs against the private API repository and update docs. Backend source evidence is required.

Most public contributors will not have access to the private API repository. If backend source is unavailable, they can still make wording-only improvements, but they must not change the documented contract.

Backend source locations in specialized skills are examples. Maintainers commonly keep the private API repository next to this docs repository as `../Api`, but contributors may not have it. If the API repository is unavailable, stop any contract update and state that backend verification is required.

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

## HTTP Endpoint Page Format

Use this format for HTTP API endpoint documentation. Do not invent a new visual system unless the user explicitly asks.

Reference implementation:

- Example page: `docs/contributing/http-api-endpoint-format.mdx`
- Components: `src/components/ApiEndpoint/index.tsx`
- Styles: `src/css/custom.css`

Use `.mdx` for endpoint pages that use `ApiEndpoint`, `ApiBadge`, `ApiCallout`, or `BadgeGrid`. Use `.md` only for plain text pages that do not need these components.

### Imports

At the top of an MDX endpoint page, import only the components you use:

```mdx
import ApiEndpoint, {ApiBadge, ApiCallout, BadgeGrid} from '@site/src/components/ApiEndpoint';
import Admonition from '@theme/Admonition';
```

If the right-side table of contents becomes noisy, keep it endpoint-only with front matter:

```mdx
---
toc_min_heading_level: 2
toc_max_heading_level: 2
---
```

### Endpoint Skeleton

Each endpoint should follow this order exactly:

```mdx
## Endpoint Name

<ApiEndpoint
  method="GET"
  path="/v2/items/{slug}"
  aliases={["/v2/items/id/{itemId}"]}
  summary="Get one item by slug or ID."
  badges={[
    {kind: 'i18n', icon: '🇬🇧', label: 'Language aware'},
    {kind: 'cache', icon: '⏱', label: '60s cache'},
  ]}
/>

<ApiCallout kind="warning" icon="🔒" title="Requires">

- Authentication
- Scope: `items.read`

</ApiCallout>

### Request

#### URL Parameters

| Name | Type | Description |
|---|---|---|
| `slug` | <ApiBadge kind="neutral" label="string" /> | `slug` field from the `Item` model. |

#### Query Parameters

| Name | Type | Description |
|---|---|---|
| `include` | <ApiBadge kind="neutral" label="string" /> | Optional comma-separated includes. |

#### Headers

| Name | Type | Description |
|---|---|---|
| `Language` | <ApiBadge kind="i18n" label="Language" /> | Translation language. Default: `en`. |

#### Body

```json
{
  "example": true
}
```

#### Body Fields

| Field | Type | Description |
|---|---|---|
| `example` | <ApiBadge kind="neutral" label="bool" /> | Example request flag. |

#### Constraints

- List validation rules, precedence rules, visibility rules, and size limits here.

### Response

#### Body

```ts
{
  apiVersion: "x.x.x",
  data: ExampleModel,
  error: null,
}
```

#### Data Fields

| Field | Access | Type | Description |
|---|---|---|---|
| `id` |  | <ApiBadge kind="neutral" label="string" /> | Unique identifier. |
```

Omit sections that do not apply. For example, a `GET` endpoint with no request body should not include `#### Body` or `#### Body Fields`.

### Endpoint Header Rules

- Use exactly one `ApiEndpoint` per documented route behavior.
- Put the canonical route in `path` and route variants in `aliases`.
- Do not include the HTTP method in `aliases`; use `aliases={["/v2/example/{id}"]}`, not `aliases={["GET /v2/example/{id}"]}`.
- Keep aliases short and less visually important than the canonical route.
- Write `summary` as one short sentence that states what the endpoint does.
- Keep the route path literal in `path`; MDX safely handles `{id}` inside component props.

### Badge Rules

Use badges to show endpoint behavior at a glance. Use text labels even when using icons, because icons alone are not accessible.

- `auth`: authentication, ownership, or auth-only data.
- `i18n`: response changes with `Language`.
- `crossplay`: response changes with `Crossplay`.
- `cache`: response is cached or has a documented freshness window.
- `firstParty`: first-party-only behavior, subscription tier, or restricted client access.
- `danger`: destructive or restricted behavior.
- `neutral`: generic state, sorting, upload, ranking, or metadata.

Common badge examples:

```mdx
{kind: 'auth', icon: '🔒', label: 'Auth required'}
{kind: 'i18n', icon: '🇬🇧', label: 'Language aware'}
{kind: 'crossplay', icon: '🌀', label: 'Crossplay aware'}
{kind: 'cache', icon: '⏱', label: '60s cache'}
{kind: 'firstParty', icon: '◆', label: 'First-party only'}
{kind: 'danger', icon: '✕', label: 'Deletes data'}
{kind: 'neutral', icon: '⇅', label: 'Custom ranking'}
```

### Callout Rules

Use `ApiCallout` for auth requirements, first-party restrictions, subscription restrictions, response context, cache notes, and destructive behavior.

Do not use raw Docusaurus directive blocks such as `:::warning` until directive rendering is verified in the running site. In this repository, explicit MDX components are safer:

```mdx
<ApiCallout kind="warning" icon="🔒" title="Requires">

- Authentication
- Scope: `orders.write`

</ApiCallout>
```

Use Docusaurus `Admonition` only when a built-in admonition is specifically desired:

```mdx
<Admonition type="info" title="Note">
This is a rendered Docusaurus admonition.
</Admonition>
```

### Request And Response Rules

- Use `### Request` and `### Response` as the two big sections inside each endpoint.
- Use `#### URL Parameters`, `#### Query Parameters`, `#### Headers`, `#### Body`, `#### Body Fields`, and `#### Constraints` under `Request`.
- Use `#### Body` and `#### Data Fields` under `Response`.
- Keep the right TOC clean by using page front matter when needed, instead of inventing non-heading markup.
- Do not wrap every subsection in custom cards or containers. It makes the MDX hard to maintain and hurts readability.
- Use tables for structured field information and short paragraphs for behavior notes.

### Table Rules

- Parameter tables use `Name`, `Type`, and `Description`.
- Request body field tables use `Field`, `Type`, and `Description`.
- Response field tables use `Field`, `Access`, `Type`, and `Description` when visibility differs by user role.
- Use `<ApiBadge kind="neutral" label="string" />` for types in rich MDX tables.
- Use access badges such as `<ApiBadge kind="auth" icon="👤" label="owner" />` only when the field is not visible to every caller.

### JSON, Type Shape, And HTTP Examples

- Keep JSON valid and copyable.
- Do not put comments inside JSON examples.
- Use `json` only for real request bodies, real error envelopes, concrete inline responses, and other copyable payloads.
- Use `ts` for schematic response shapes that reference reusable models, such as `data: Item[]` or `data: UserPrivate`.
- Do not write model placeholders as JSON strings, such as `"data": "Item"` or `"data": ["Item"]`; they read as string values, not model types.
- Use realistic placeholder values such as `example-id`, not random UUIDs unless the real format matters.
- For multipart requests, show the content type and a small `http` fenced block.

### Do Not

- Do not use Notion-only formatting or old color spans.
- Do not make emojis the only source of meaning.
- Do not include HTTP methods in alternative routes.
- Do not add decorative route icons unless the user asks.
- Do not create nested container/card layouts around every subsection.
- Do not duplicate large reusable schemas on endpoint pages; link shared models instead.

## Verification

After docs edits, run `yarn build` when practical. For small text-only edits, at least check links and sidebar paths if touched.
