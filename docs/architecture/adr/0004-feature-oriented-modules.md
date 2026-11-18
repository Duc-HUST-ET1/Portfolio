# ADR 0004: Feature-oriented modules

**Status:** Proposed; ready for user approval  
**Date:** 2026-11-05

## Context

The portfolio has a small page surface and several content domains. A single all-purpose component would couple content, page structure, theme state, and repeated project presentation; an enterprise service/use-case stack would be disproportionate for local static content.

## Decision

Use the modest structure in the architecture document: app/provider wiring, one page composition, shared layout and controls, semantic homepage sections, feature-owned domain types and repeatable presentation, typed local content, and semantic CSS. HomePage owns imports and section visibility; presentational components receive typed props and do not reach into global content modules.

Add files and abstractions when real content or repeated behavior requires them. Do not create speculative service, repository, route, or feature layers.

## Alternatives considered

- Put all markup and records in App: rejected due to unclear ownership and scaling.
- Use repositories/services/use-cases for in-process local records: premature.
- Put every type in one global types directory: likely to become an unowned dumping ground.

## Consequences

- New projects use shared list/card rendering and data selectors; no per-record JSX is added.
- Feature-local pure selectors may handle ordering and future filters without a state library.
- Add shared types only when a concept is genuinely used across domains.

## Revisit when

Multiple data sources, complex workflows, multiple teams, or repeated cross-feature behavior justify more formal application/domain layers.
