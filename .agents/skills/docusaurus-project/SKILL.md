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

- `yarn start` runs Docusaurus on `localhost:3000` and opens the browser (public contributor default).
- `yarn start:wfm` runs on `0.0.0.0:3001` with health check, opens `docs.warframe.test` (internal devs only).
- `yarn start:wfm:no-open` runs the same WFM dev server without opening a browser.
- Use `yarn start --locale <locale>` for non-default locales.
- Docusaurus dev mode serves one locale at a time. The `/ko/...` path exists in production builds, not default dev mode.
- Local Nginx proxies `docs.warframe.test` to `host.docker.internal:3001`.
- If the page is not reachable through Nginx, check that the Docusaurus dev server is running and that Nginx was reloaded after config changes.
- `scripts/start-wfm.js` supports env vars: `DOCS_HOST`, `DOCS_PORT`, `DOCS_OPEN`, `DOCS_OPEN_URL` (see `scripts/README.md`).

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
