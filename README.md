# Warframe.market Docs

Public documentation site for Warframe.market developers and contributors.

The site documents the public Warframe.market HTTP API, WebSocket API, OAuth plans, shared data models, marketplace rules, and contributor guidance. It is built with [Docusaurus](https://docusaurus.io/), React, TypeScript, and Yarn 4.

## Repository Overview

| Path | Purpose |
|---|---|
| `docs/` | Main documentation pages. Most content changes happen here. |
| `docs/api/` | HTTP API documentation. |
| `docs/websockets/` | WebSocket command, event, and payload documentation. |
| `docs/oauth/` | OAuth 2.0 documentation. |
| `docs/contributing/` | Contributor guides and documentation style rules. |
| `src/` | Docusaurus pages, React components, and custom CSS. |
| `static/` | Static assets copied into the final site. |
| `sidebars.ts` | Sidebar navigation order. Update this when adding docs pages. |
| `docusaurus.config.ts` | Docusaurus site configuration. |

## Requirements

- Node.js 20 or newer.
- Yarn 4.14 or newer.
- Corepack, recommended for using the Yarn version declared in `package.json`.

If Yarn 4 is not already available, enable Corepack first:

```bash
corepack enable
```

## Quick Start

Install dependencies:

```bash
yarn install
```

Start the local docs site:

```bash
yarn start
```

This starts Docusaurus on `0.0.0.0:3001` and opens `http://docs.warframe.test/docs/intro` when the server is ready. In the Warframe local stack, Nginx proxies `docs.warframe.test` to that host-machine port.

If you are not using the Warframe local Nginx setup, use the default Docusaurus local server instead:

```bash
yarn start:local
```

Build the static production site:

```bash
yarn build
```

The generated site is written to `build/`.

## Contributing Documentation

Start with the contributor-facing style guide: [Documentation Style](docs/contributing/documentation-style.md).

Public contributors are welcome to make wording-only improvements, such as grammar fixes, clearer explanations, formatting improvements, broken link fixes, and typo corrections.

Changes that alter documented public behavior require backend source evidence from maintainers. This includes request or response shapes, fields, enum values, authentication requirements, scopes, status codes, validation rules, WebSocket routes, OAuth behavior, and examples that imply contract changes.

Before opening a pull request:

1. Keep changes small and focused.
2. Read nearby docs to match existing terminology and format.
3. Add new docs pages to `sidebars.ts`.
4. Run `yarn build` for docs, sidebar, link, or MDX changes.
5. Run `yarn typecheck` for TypeScript, React, or Docusaurus config changes.

## Local Development Options

Start without opening a browser:

```bash
yarn start:no-open
```

Equivalent environment toggle:

```bash
DOCS_OPEN=false yarn start
```

Open a different URL after the server starts:

```bash
DOCS_OPEN_URL=http://docs.warframe.test/docs/api/overview yarn start
```

Use a different host or port:

```bash
DOCS_HOST=127.0.0.1 DOCS_PORT=3002 yarn start
```

The automatic browser open uses the system opener: `xdg-open` on Linux, `open` on macOS, or `cmd /c start` on Windows.

## Useful Commands

| Command | What it does |
|---|---|
| `yarn install` | Installs project dependencies. |
| `yarn start` | Starts the local dev server on `0.0.0.0:3001` and opens `docs.warframe.test` when ready. |
| `yarn start:no-open` | Starts the same dev server without opening a browser. |
| `yarn start:local` | Starts Docusaurus with default local behavior and no automatic browser open. |
| `yarn build` | Builds optimized static production output into `build/`. Run this before publishing or reviewing docs structure changes. |
| `yarn serve` | Serves the already-built `build/` output locally. Run `yarn build` first. |
| `yarn typecheck` | Runs TypeScript checks for Docusaurus config and custom React pages. |
| `yarn clear` | Clears Docusaurus caches such as `.docusaurus/`. Use when generated metadata, routes, or sidebars appear stale. |
| `yarn docusaurus` | Runs the Docusaurus CLI directly. Useful for commands that do not have a package script yet. |
| `yarn swizzle` | Copies selected Docusaurus theme components into this repo. Use carefully because swizzled components become maintenance burden. |
| `yarn deploy` | Runs the Docusaurus deployment flow. Production deployment for this project is not configured here. |
| `yarn write-translations` | Generates translation JSON files for a locale. Example: `yarn write-translations --locale <lang>`. |
| `yarn write-heading-ids` | Adds explicit heading IDs to docs. Useful before translating or linking heavily. |

## Translations

Docusaurus i18n is enabled with English as the default locale and additional locales can be added.

Translated docs live under this shape:

```text
i18n/<locale>/docusaurus-plugin-content-docs/current/<doc-path>.md
```

Example translated page:

```text
i18n/<lang>/docusaurus-plugin-content-docs/current/intro.md
```

Run the dev site for any locale in development mode:

```bash
yarn start --locale <lang>
```

Without opening a browser:

```bash
yarn start:no-open --locale <lang>
```

Docusaurus serves one selected locale at the root path in dev mode. `yarn start:no-open` serves the default English locale only, so `/<lang>/docs/intro` is not available from the dev server. Start with `--locale <lang>` to work on another language. After `yarn build`, non-default static builds are emitted under `build/<locale>`, so production-style serving uses paths like `/<lang>/docs/intro`.

Generate translation message files for a locale:

```bash
yarn write-translations --locale <lang>
```

Translation guidance:

- Keep source docs in `docs/` as the canonical English version.
- Translate only verified public behavior.
- Keep route paths, JSON field names, headers, scopes, and enum values in code formatting and do not translate them.
- Run `yarn build` after adding or moving translated docs.
