# Scripts

## start-wfm.js

Wrapper around `docusaurus start` for internal Warframe.market developers who run the full local Docker stack with Nginx proxying.

Binds to `0.0.0.0:3001` so that Nginx can proxy `docs.warframe.test` to the dev server. Waits for the server to be healthy, then opens `http://docs.warframe.test/docs/intro` in the system browser.

### Environment Variables

| Variable        | Default                                | Description                                               |
| --------------- | -------------------------------------- | --------------------------------------------------------- |
| `DOCS_HOST`     | `0.0.0.0`                              | Host the dev server binds to.                             |
| `DOCS_PORT`     | `3001`                                 | Port the dev server listens on.                           |
| `DOCS_OPEN`     | `true`                                 | Set to `false` to skip opening the browser automatically. |
| `DOCS_OPEN_URL` | `http://docs.warframe.test/docs/intro` | URL to open after the server is ready.                    |

### Usage

```bash
yarn start:wfm                  # Start and open docs.warframe.test
yarn start:wfm:no-open          # Start without opening browser
yarn start:wfm --locale ko      # Start with locale flag passed through
```
