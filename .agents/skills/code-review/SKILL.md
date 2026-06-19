---
name: code-review
description: Code review workflow for this repository. Use when reviewing docs, Docusaurus config, package changes, pull requests, diffs, proposed changes, staged changes, or when the user asks for a review, audit, risk check, or merge-readiness assessment.
---

# Code Review

Review for correctness, public contract accuracy, build safety, and maintainability. Prioritize real defects over style preferences.

## Process

Before commenting:

1. Understand the purpose of the change.
2. Read relevant surrounding docs, not only the diff.
3. Identify risks introduced by the change.

Do not assume unfamiliar docs are wrong. Verify against source code evidence in the repository.

## Focus Areas

Look for:

- Public docs that contradict source code evidence
- Routes, methods, headers, scopes, fields, enum values, WebSocket events, or OAuth behavior that are incorrect
- Examples that are not copyable or contain invalid JSON (e.g., JSON comments)
- Broken internal links or sidebar paths that reference missing files
- Inconsistent heading structure, table formatting, or terminology
- Missing documentation for changed public behavior
- Generated files or build outputs committed to the repository
- Unclear naming, scattered related content, or structure that obscures intent

Avoid comments about formatter-owned style, personal preference, speculative refactors, or abstractions without demonstrated need.

## Project-Specific Review Checks

### Markdown

- Headings follow a stable, predictable hierarchy
- Internal links point to existing files or valid anchor targets
- Tables have consistent column counts and formatting
- Code blocks use correct language identifiers
- Terminology matches the rest of the documentation

### Docusaurus

- `docusaurus.config.ts` stays simple and buildable
- `sidebars.ts` paths match existing files
- Navigation structure is consistent with existing patterns
- No undocumented plugin or preset changes

### Examples

- JSON examples are valid and copyable
- No JSON comments (use separate text blocks for explanations)
- API request/response shapes match actual contracts
- OAuth flows, WebSocket events, and scope lists are accurate

### Tooling

- Package-manager policy stays Yarn 4. No npm lockfiles are introduced.
- Scripts work in local and CI-like modes
- Peer dependency warnings are understood, not ignored blindly

## Severity

- **Blocking**: Must fix before merge. The change is incorrect, unsafe, breaks a contract, or misses required behavior.
- **Non-blocking**: Worth improving, but merge can proceed.
- **Question**: Something is unclear and needs confirmation.
- **Suggestion**: Optional improvement.

Default to non-blocking unless there is a concrete correctness, safety, compatibility, or maintainability risk.

## Comment Style

Every comment should state:

- What is wrong or risky
- Why it matters
- Where it happens
- A concrete fix or direction

Do not present guesses as facts. If unproven, label the item as a question or risk.

## Output Format

Start with findings, ordered by severity. Keep the summary brief.

```text
## Findings

### Blocking
1. ...

### Non-blocking
1. ...

### Questions
1. ...

## Verification
- Build checked:
- Build missing:
- Suggested commands:
```

If no issues are found, say that clearly and mention residual build or coverage risk.
