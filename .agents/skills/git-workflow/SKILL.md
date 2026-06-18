---
name: git-workflow
description: Use for Git status, staging, commits, branches, repository initialization, or commit-message work in the Warframe.market Docs repository.
---

# Git Workflow

## Safety

- Do not commit unless the user explicitly asks for a commit.
- Do not amend, rebase, reset, checkout, clean, stash, or discard changes unless explicitly requested.
- Stage only intended files.
- This repository is nested under the larger Warframe checkout; do not stage parent repository changes.

## Branch

Use `master` as the default branch.

## Commit Style

Use conventional commits:

```text
type(scope): short imperative description
```

Common types: `docs`, `feat`, `fix`, `chore`, `refactor`, `test`, `style`.

Examples:

```text
docs(api): add order endpoint draft
chore(site): update docusaurus config
docs(agents): clarify websocket workflow
```

## Before Commit

Run:

```bash
git status --short
git diff
yarn build
```

If verification cannot run, say why.
