---
name: code-review
description: Use for reviewing docs, Docusaurus config, package changes, public contract documentation changes, pull requests, or diffs in the Warframe.market Docs repository.
---

# Code Review

Review for correctness, public contract accuracy, build safety, and maintainability. Prioritize real defects over style preferences.

## Findings First

Start with findings ordered by severity. If there are no findings, say so clearly.

## Review Checks

- Public docs match source code evidence.
- Routes, methods, headers, scopes, fields, enum values, WebSocket routes, and OAuth behavior are exact.
- Examples are copyable and do not contain invalid JSON comments.
- Sidebar paths match existing files.
- Docusaurus config stays simple and buildable.
- Package-manager policy stays Yarn 4. No npm lockfiles are introduced.
- Links are not broken when they can be checked.
- Generated files and build outputs are not committed.

## Output Format

```text
## Findings

### Blocking
1. ...

### Non-blocking
1. ...

### Questions
1. ...

## Verification
- Checked:
- Missing:
- Suggested commands:
```
