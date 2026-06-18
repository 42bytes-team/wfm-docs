---
sidebar_position: 1
---

# Documentation Style

Use this page as the human-facing version of the agent documentation rules.

## Principles

- Document implemented public behavior, not expected behavior from memory.
- Keep examples copyable and syntactically valid.
- Use stable headings so future diffs and links remain easy to review.
- Prefer tables for request fields, response fields, model fields, enum values, and headers.
- Link reusable models from endpoint pages instead of duplicating large schemas.
- Mention auth, scopes, rate limits, caching, platform behavior, language behavior, sorting, and visibility rules when they affect clients.

## Markdown Conventions

- Use fenced code blocks for JSON and shell commands.
- Use inline code for route paths, header names, field names, enum values, and scopes.
- Use `string or null`, `object or null`, and `[]ModelName` for public JSON types.
- Do not use HTML color spans from old Notion docs in new Markdown pages.
- Keep one public contract per section when practical.
