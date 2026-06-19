---
name: data-model-documentation
description: Use when creating, auditing, or updating Warframe.market public data model documentation from backend Go JSON model files, especially docs/data-models.mdx and ../Api/src/internal/wfm/entity_*.json.go when the private API repository is available.
---

# Data Model Documentation

## Goal

Keep `docs/data-models.mdx` synchronized with public JSON models implemented in the API backend.

This skill is mainly for maintainers with access to the private API repository. Public contributors without backend access may use it for wording-only reviews, but must not change model fields, types, optionality, enum values, visibility, or examples.

Expected backend source, when available:

```text
../Api/src/internal/wfm/entity_*.json.go
```

If your checkout uses a different layout, locate the API repository manually. If the API repository is not available, stop any model contract update and ask the maintainer for source evidence.

The public docs page is:

```text
docs/data-models.mdx
```

Do not document from memory. Do not invent fields, enum values, access rules, or descriptions.

## Required Context

Before editing, read these files:

- `docs/data-models.mdx`
- `src/components/ApiEndpoint/index.tsx`
- `.agents/skills/api-documentation/SKILL.md`

Then decide the work mode:

- Wording-only docs edit: backend access is not required. Preserve model behavior exactly as written.
- Model contract edit or sync task: backend access is required. Inspect backend files one at a time. Do not load every backend model file into context at once.

## Backend File Inventory

Find backend model files with:

```text
Glob: ../Api/src/internal/wfm/entity_*.json.go
```

If `../Api` does not exist, ask the user for the API repository path. If they cannot provide it, only perform wording-only edits.

Known files currently include:

- `entity_achievement.json.go`
- `entity_archive.json.go`
- `entity_client.json.go`
- `entity_dashboard.json.go`
- `entity_group.json.go`
- `entity_item.json.go`
- `entity_lich.json.go`
- `entity_location.json.go`
- `entity_mission.json.go`
- `entity_npc.json.go`
- `entity_order.json.go`
- `entity_riven.json.go`
- `entity_riven_attribute.json.go`
- `entity_sister.json.go`
- `entity_user.json.go`
- `entity_version.json.go`

If new matching files exist, inspect them too.

## Context-Limited Workflow

Use this workflow for tasks like: “consult our backend models one by one and update documentation if necessary.” Use it only when the backend repository is available.

1. Read `docs/data-models.mdx` first.
2. Locate the API repository. Prefer `../Api` relative to the docs repo, but accept any local path the user provides.
3. Build the backend file list with Glob.
4. Process exactly one backend file at a time.
5. For that file, identify all `type ...Json struct` definitions and related nested structs.
6. Compare only those models against the matching section in `docs/data-models.mdx`.
7. Patch only the relevant doc section for that backend file.
8. Move to the next backend file.
9. After all files are processed, run verification.

If context is tight, keep a short scratch checklist in your own notes, not in the repository:

```text
entity_item.json.go: checked, docs updated/no changes
entity_order.json.go: checked, docs updated/no changes
...
```

Never rewrite the whole data-model page just because one model changed.

## How To Read Go JSON Models

Document public JSON output, not Go implementation details.

For each struct field, read:

```go
FieldName GoType `json:"jsonName,omitempty"`
```

Use `jsonName` as the documented field name. Do not document Go field names.

Ignore fields with:

```go
json:"-"
```

Treat a field as `optional/contextual` when any of these are true:

- JSON tag includes `omitempty` or `omitzero`.
- Go type is a pointer, for example `*int32`, `*bool`, `*UserShortJson`.
- Shape code sets the field only behind a condition, for example `Has...()`, `includeModerationData`, first-party checks, role checks, language filters, platform filters, or endpoint-specific shape methods.
- Comments say the field is optional, contextual, moderator-only, owner-only, first-party-only, or only available for some clients.

Do not mark a field optional only because its Go zero value could be empty. Use JSON tags, pointer types, comments, or shape logic as evidence.

## Go Type To Docs Type Mapping

Use these public docs types:

| Go type | Docs type |
|---|---|
| `string` | `string` |
| `bool`, `*bool` | `boolean` |
| `int`, `int32`, `int64`, `uint32`, `uint64` | `int` |
| `float32`, `float64` | `number` |
| `[]string` | `[]string` or `string[]`; keep existing page style if already present. |
| `[]Type` | `[]Type` or `Type[]`; keep existing page style if already present. |
| `map[string]Type` | `map[string]Type` |
| `map[string]*Type` | `map[string]Type` |
| `*Type` | `Type`; add `optional/contextual` flag. |
| `any`, `interface{}` | `object`, unless code proves a stricter shape. |

Do not expose Go-only package names, protobuf names, or pointer syntax in public docs.

## Access And Flag Rules

The data-model page uses a `Flags` column, not an `Access` column.

Use these MDX badges:

```mdx
<ApiBadge kind="neutral" label="optional/contextual" />
<ApiBadge kind="auth" icon="👤" label="owner/self" />
<ApiBadge kind="auth" icon="🛡️" label="moderator+" />
<ApiBadge kind="firstParty" icon="◆" label="first-party" />
<ApiBadge kind="auth" icon="🔒" label="auth required" />
<ApiBadge kind="danger" icon="🚧" label="unstable" />
```

Use multiple badges in one `Flags` cell when needed.

Examples:

```mdx
| `banMessage` | <ApiBadge kind="neutral" label="optional/contextual" /> <ApiBadge kind="auth" icon="👤" label="owner/self" /> <ApiBadge kind="auth" icon="🛡️" label="moderator+" /> | <ApiBadge kind="neutral" label="string" /> | Ban reason. |
| `email` | <ApiBadge kind="neutral" label="optional/contextual" /> <ApiBadge kind="firstParty" icon="◆" label="first-party" /> | <ApiBadge kind="neutral" label="string" /> | Email address. |
```

Leave `Flags` empty for public, normally present fields.

## Docs Page Style

`docs/data-models.mdx` must stay MDX because it uses API UI components.

Required front matter:

```mdx
---
sidebar_position: 3
toc_min_heading_level: 2
toc_max_heading_level: 2
---
```

Required import pattern:

```mdx
import {ApiBadge, ApiCallout, BadgeGrid} from '@site/src/components/ApiEndpoint';
```

Top-level models use `## ModelName`.

Nested models use `### NestedModelName` under their parent model.

Field tables use this exact shape:

```mdx
| Field | Flags | Type | Description |
|---|---|---|---|
| `id` |  | <ApiBadge kind="neutral" label="string" /> | Unique identifier. |
| `avatar` | <ApiBadge kind="neutral" label="optional/contextual" /> | <ApiBadge kind="neutral" label="string" /> | Avatar image path. |
```

Keep model headings stable. Other docs may link to them.

## Model Section Content

For each model section:

1. Add one short sentence if the model purpose is clear from code, routes, or existing docs.
2. Add the fields table.
3. Add nested model subsections immediately after the parent model when the nested model is only used there.
4. Add short notes only when code comments or shape logic prove behavior.

Do not add Go struct examples to public docs unless the user explicitly asks. Public docs should describe JSON output, not Go implementation.

JSON examples are optional. If adding them, use foldable details and keep them short:

````mdx
<details>
<summary>JSON example</summary>

```json
{
  "id": "example-id",
  "slug": "example-slug"
}
```

</details>
````

Only add JSON examples when the example is accurate and useful. Do not add examples just to fill space.

## Matching Backend Structs To Docs Models

Common mappings:

| Backend struct/file | Docs model |
|---|---|
| `ItemJson` in `entity_item.json.go` | `Item` |
| `ItemI18NJson` | `ItemI18NJson` |
| `RivenJson` or similar in `entity_riven.json.go` | `Riven Item` |
| `RivenAttributeJson` | `Riven Attribute` |
| `LichWeaponJson`, `LichEphemeraJson`, `LichQuirkJson` | `Lich Weapon`, `Lich Ephemera`, `Lich Quirk` |
| `SisterWeaponJson`, `SisterEphemeraJson`, `SisterQuirkJson` | `Sister Weapon`, `Sister Ephemera`, `Sister Quirk` |
| `NpcJson` | `Npc` |
| `LocationJson` | `Location` |
| `MissionJson` | `Mission` |
| `OrderJson` | `Order` |
| transaction/archive structs | `Transaction` or archive-specific model, only if public. |
| `UserShortJson` | `UserShort` |
| `UserJson` | `User` |
| `MeJson` | `UserPrivate` |
| `ActivityJson` | `Activity` |
| `NameHistoryJson` | `NameHistory`, nested under `User` if documented. |
| `ClientJson` | `Client` |
| `GroupJson` | `Group` |
| `DashboardShowcaseJson` | `DashboardShowcase` |
| `VersionJson` | `Versions` |

If a backend struct has no docs section:

- Check whether it is public by inspecting route handlers or usage.
- If clearly public, add a section.
- If unclear, do not document it as public. Ask the user or leave a note in your final response.

## Visibility Evidence

Visibility often comes from shape methods, not struct tags.

Examples of evidence:

- `ShapePublic(includeModerationData bool)` means some fields are moderator-only when populated only after `includeModerationData` is true.
- `ShapePrivate`, `ShapeMe`, or `MeJson` means the model is private/self-user context.
- Comments like “only available for 1st party clients” mean use `first-party` flag.
- Checks like `if u.HasActivity()` mean the field is optional/contextual.
- Language loops that include only `en` and requested language mean localized maps are context-dependent.

When field visibility differs between public `User`, private `UserPrivate`, and short `UserShort`, document each model separately. Do not merge them.

## Enum And Constant Maintenance

The bottom of `docs/data-models.mdx` has `## Enums And Constants`.

When updating it:

1. Search backend constants and protobuf-generated enum values if needed.
2. Add only public enum values.
3. Preserve stable names: `Status`, `ActivityType`, `Role`, `Tier`, `Language`, `Platform`, `Scope`.
4. If an enum changed but the source is not in `entity_*.json.go`, search the API repository for the constant before editing.

## Safe Update Checklist

For each backend file:

- Did any `json:"..."` field name change?
- Was a field added or removed?
- Did `omitempty` or `omitzero` change?
- Did a pointer become a value or a value become a pointer?
- Did shape logic add or remove a field condition?
- Did comments mention owner/self, moderator+, first-party, auth, or unstable behavior?
- Did a nested `...Json` struct change?
- Did an enum-like string field gain or lose known values?

If yes, update only the affected docs section.

## Public Contributor Guidance

If you do not have the private API repository:

- You may fix grammar, spelling, formatting, broken prose, or unclear wording.
- You may improve examples only when you do not change their shape or semantics.
- You may not add, remove, rename, or retype fields.
- You may not change optional/contextual flags, owner/self flags, moderator+ flags, first-party flags, enum values, or model visibility.
- You should say in your final response that the change was wording-only and not backend-verified.
- If a requested change requires backend verification, ask a maintainer for source evidence instead of guessing.

## Verification

After editing `docs/data-models.mdx`, run:

```bash
yarn build
```

Run this too if TypeScript, React components, Docusaurus config, or imports changed:

```bash
yarn typecheck
```

If only `.agents/skills/...` files changed, no Docusaurus verification is required.

## Final Response

When done, report:

- Backend files inspected.
- Docs sections changed.
- Fields added, removed, or changed.
- Any unclear public/private model questions.
- Verification command results.
