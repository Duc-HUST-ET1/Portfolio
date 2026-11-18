# ADR 0007: Local TypeScript content source

**Status:** Proposed; ready for user approval  
**Date:** 2026-11-05

## Context

The repository has no content service or real portfolio records. English is the initial language. The user prohibits invented personal facts, projects, experience, skills, achievements, and contact information.

## Decision

Use local TypeScript modules as the initial authored content source, with feature-owned types, stable IDs, and stable project slugs. Type collections with `satisfies`. Public data modules contain only verified owner-supplied content. Start with empty collections where facts have not yet been supplied; omit sections and navigation links with no meaningful content. Documentation examples remain explicitly marked placeholders and are never copied as published records.

Do not add drafts, fake records, placeholder URLs, or runtime schema dependencies. TypeScript is sufficient for local static data; add runtime validation at a future external data boundary.

## Alternatives considered

- JSX-authored cards: content edits would be coupled to presentation.
- JSON: possible, but TS modules fit local authored data and imported image assets.
- CMS/API or runtime schema library: no current workflow or external input warrants them.

## Consequences

- Content additions do not require repeated UI changes.
- Absence is represented as absence, not invented default copy.
- Any externally supplied data must be validated and mapped to these internal domain types.

## Revisit when

Non-developers need editing access, content changes become difficult to review, or an external content source is approved.
