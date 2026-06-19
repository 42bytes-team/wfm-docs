---
name: git-workflow
description: Git workflow and commit-message guidance for this repository. Use when checking git state, staging changes, preparing commits, writing commit messages, reviewing diffs before commit, handling dirty worktrees, or when the user asks to commit, amend, rebase, reset, stash, or explain Git changes.
---

# Git Workflow

Use this skill for Git operations and commit preparation.

## Safety Rules

- Do not commit unless the user explicitly asks for a commit.
- Do not amend, rebase, reset, checkout, clean, stash, or discard changes unless explicitly requested.
- Stage only intended files.
- Treat unrelated dirty files as user work. Do not stage, modify, revert, or format them.
- This repository is nested under the larger Warframe checkout; do not stage parent repository changes.

## Branch

Use `master` as the default branch.

## Conventional Commit Format

Use conventional commits:

```text
type[optional scope]: description
```

Allowed common types:

- `fix`: bug fix
- `feat`: user-facing feature
- `docs`: documentation-only change
- `test`: tests only or test infrastructure
- `refactor`: behavior-preserving content restructuring
- `perf`: performance improvement
- `style`: formatting or style-only change
- `chore`: maintenance, tooling, build, or repository housekeeping

Use a scope when it improves clarity, such as `api`, `oauth`, `websockets`, `rules`, `agents`, or a doc area.

## Message Style

Follow `.gitmessage`:

- Keep the subject around 50 characters when practical, but it's not a hard limit.
- Use imperative present tense: `fix order docs`, not `fixed order docs`.
- Explain the problem and solution in the body when the subject alone is not enough.
- Wrap body/footer lines around 72 characters.
- Add issue references in the footer when provided.

For docs and skills changes, prefer concise subjects such as:

```text
docs(api): add order endpoint draft
docs(agents): clarify websocket workflow
chore(site): update docusaurus config
```

## Commit Process

1. Run `git status --short`.
2. Inspect relevant unstaged changes with `git diff -- <path>`.
3. Stage only intended files.
4. Inspect staged changes with `git diff --cached`.
5. Commit with a conventional message.
6. Report the commit hash.

If verification was skipped, say why and name the command that would be relevant (usually `yarn build` or `yarn typecheck`).
