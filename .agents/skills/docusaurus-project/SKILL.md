---
name: docusaurus-project
description: Use for Docusaurus config, navigation, styling, package scripts, dependency, build, local dev, or site structure changes in the Warframe.market Docs repository.
---

# Docusaurus Project

## Stack

- Docusaurus 3.10+
- TypeScript config files
- React for custom pages/components
- Markdown docs under `docs/`
- Yarn 4 with `nodeLinker: node-modules`

## Package Manager

Use Yarn, not npm.

```bash
yarn install
yarn add package-name
yarn add --dev package-name
yarn build
```

## Local Development

- `yarn start` runs Docusaurus on `0.0.0.0:3001` and opens `docs.warframe.test` when ready.
- `yarn start:no-open` runs the same dev server without opening a browser.
- Set `DOCS_OPEN=false` to disable browser opening or `DOCS_OPEN_URL=...` to change the opened URL.
- Local Nginx proxies `docs.warframe.test` to `host.docker.internal:3001`.
- If the page is not reachable through Nginx, check that the Docusaurus dev server is running and that Nginx was reloaded after config changes.

## Editing Rules

- Keep generated Docusaurus config simple and close to upstream patterns.
- Prefer adding docs under `docs/` and updating `sidebars.ts` explicitly.
- Do not add plugins, themes, search, versioning, or localization unless requested.
- Do not use MDX-only features unless Markdown cannot express the content.
- Keep homepage React minimal; most site content belongs in docs.
- Keep CSS small and scoped where possible.

## Verification

After site structure, config, package, or custom React/CSS changes, run:

```bash
yarn build
```

Also run `yarn typecheck` when TypeScript config, React pages, or Docusaurus config changed.
