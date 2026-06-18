# Warframe.market Docs

Public documentation for Warframe.market APIs, OAuth, WebSockets, data models, and rules.

This website is built with [Docusaurus](https://docusaurus.io/) and Yarn 4.

## Installation

```bash
yarn install
```

## Local Development

```bash
yarn start
```

This starts Docusaurus on `0.0.0.0:3001` and opens `http://docs.warframe.test/docs/intro` when the server is ready. In the Warframe local stack, Nginx proxies `docs.warframe.test` to that host-machine port.

The automatic browser open uses the system opener: `xdg-open` on Linux, `open` on macOS, or `cmd /c start` on Windows.

To start without opening a browser:

```bash
yarn start:no-open
```

Equivalent environment toggle:

```bash
DOCS_OPEN=false yarn start
```

To open a different URL after the server starts:

```bash
DOCS_OPEN_URL=http://docs.warframe.test/docs/api/http-api yarn start
```

To use a different host or port:

```bash
DOCS_HOST=127.0.0.1 DOCS_PORT=3002 yarn start
```

For Docusaurus default local behavior without the Warframe Nginx proxy URL:

```bash
yarn start:local
```

## Build

```bash
yarn build
```

This generates static content into the `build` directory.

## Useful Commands

| Command | What it does |
|---|---|
| `yarn docusaurus` | Runs the Docusaurus CLI directly. Useful for commands that do not have a package script yet. |
| `yarn start` | Starts the local dev server on `0.0.0.0:3001` and opens `docs.warframe.test` when ready. |
| `yarn start:no-open` | Starts the same dev server but does not open a browser. |
| `yarn start:local` | Starts Docusaurus with default local behavior and no automatic browser open. |
| `yarn build` | Builds optimized static production output into `build/`. Run this before publishing or reviewing site config changes. |
| `yarn swizzle` | Copies selected Docusaurus theme components into this repo so they can be customized. Use carefully because swizzled components become maintenance burden. |
| `yarn deploy` | Runs Docusaurus deployment flow, mostly useful for GitHub Pages-style deployment. Production deployment for this project is not configured yet. |
| `yarn clear` | Clears Docusaurus caches such as `.docusaurus/`. Use when generated metadata, routes, or sidebars appear stale. |
| `yarn serve` | Serves the already-built `build/` output locally. Run `yarn build` first. |
| `yarn write-translations` | Generates translation JSON files for a locale. Example: `yarn write-translations --locale ru`. |
| `yarn write-heading-ids` | Adds explicit heading IDs to docs. Useful before translating or linking heavily, because stable heading IDs survive heading text changes. |
| `yarn typecheck` | Runs TypeScript checks for Docusaurus config and custom React pages. |

## Translations

Docusaurus i18n is enabled with English as the default locale and Russian as an example locale.

Translated docs live under this shape:

```text
i18n/<locale>/docusaurus-plugin-content-docs/current/<doc-path>.md
```

Example translated page:

```text
i18n/ru/docusaurus-plugin-content-docs/current/intro.md
```

Run the Russian dev site:

```bash
DOCS_OPEN_URL=http://docs.warframe.test/ru/docs/intro yarn start -- --locale ru
```

Generate translation message files for Russian:

```bash
yarn write-translations --locale ru
```

Translation guidance:

- Keep source docs in `docs/` as the canonical English version.
- Translate only verified public behavior.
- Keep route paths, JSON field names, headers, scopes, and enum values in code formatting and do not translate them.
- Run `yarn build` after adding or moving translated docs.
