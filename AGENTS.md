# AGENTS.md

## Purpose

This repository contains the public Warframe.market documentation site. It uses Docusaurus and Markdown files so humans and LLM agents can update docs with small, reviewable diffs.

## Skill Routing

Before specialized work, read the matching skill:

| Task | Skill |
|---|---|
| Docusaurus config, package scripts, navigation, styling, build, or dependency changes | `.agents/skills/docusaurus-project/SKILL.md` |
| HTTP endpoint documentation from `vex-web/routes.go` and `handlers/` | `.agents/skills/http-api-endpoint-documentation/SKILL.md` |
| Data model documentation from backend `entity_*.json.go` files | `.agents/skills/data-model-documentation/SKILL.md` |
| API, OAuth, WebSocket, rules, or public contract documentation | `.agents/skills/api-documentation/SKILL.md` |
| Git status, staging, commits, branches, or repository hygiene | `.agents/skills/git-workflow/SKILL.md` |
| Code review, docs review, diff review, or merge-readiness check | `.agents/skills/code-review/SKILL.md` |

If more than one skill applies, read all relevant skills. More specific instructions override this file.

## Core Rules

1. Read before writing. Inspect nearby docs, sidebar entries, config, and source code evidence before editing.
2. Keep docs Markdown-first. Prefer `.md` for content unless MDX features are required.
3. Document implemented public behavior. Do not invent routes, fields, OAuth behavior, WebSocket events, scopes, rate limits, or rules.
4. Keep diffs small. Do not rewrite broad sections when a targeted edit solves the task.
5. Keep examples copyable. JSON examples must be valid enough for readers to understand the shape.
6. Use stable headings and simple tables so future LLM updates and reviews are reliable.
7. Run the smallest relevant verification: usually `yarn build`, `yarn typecheck`, or both.

## Public Contributors

Most public contributors will not have access to the private API backend repository. Without backend source evidence, only make wording-only documentation improvements such as grammar, clarity, formatting, or typo fixes. Do not change documented public behavior, request/response shapes, fields, auth requirements, scopes, status codes, enum values, validation rules, or examples that imply contract changes.

Maintainers usually keep the private API repository next to this docs repository as `../Api`. If that repository is unavailable and a requested change needs backend verification, ask for maintainer input instead of guessing.

## Project Layout

```text
docs/
  intro.md
  api/
  oauth/
  websockets/
  rules/
  contributing/
src/
  pages/
  css/
static/
docusaurus.config.ts
sidebars.ts
```

## Local Commands

- `yarn install` - install dependencies with Yarn 4.
- `yarn start` - start Docusaurus on `0.0.0.0:3001` for Nginx proxying and open `docs.warframe.test`.
- `yarn start:no-open` - start the same dev server without opening a browser.
- `yarn start --locale <locale>` - start the dev server for one non-default locale.
- `yarn start:no-open --locale <locale>` - start the dev server for one non-default locale without opening a browser.
- `yarn start:local` - start Docusaurus with default local behavior and no browser open.
- `yarn build` - build the static site.
- `yarn typecheck` - run TypeScript checks.

## Communication

Report what changed, why it changed, and what was verified. If verification was skipped, say why and name the command that should run.
