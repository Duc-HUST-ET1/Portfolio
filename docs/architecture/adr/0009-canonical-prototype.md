# ADR 0009: Canonical prototype

**Status:** Proposed; ready for user approval  
**Date:** 2026-11-05

## Context

The repository contains multiple isolated prototype artifacts. The user selected `prototypes/portfolio-concepts.html` as the canonical Hybrid Systems design reference; other artifacts are to be preserved.

## Decision

Use `prototypes/portfolio-concepts.html` as the sole canonical visual reference. Keep every prototype outside application source and do not import prototype HTML, CSS, or JavaScript into `src/`. Preserve all existing prototype files unchanged.

## Alternatives considered

- `hybrid-systems.html`: similar Hybrid concept but not selected as canonical.
- `portfolio-concepts.backup.html`: archived multi-concept exploration, not the selected design.
- Merge or rename prototypes: unnecessary and out of scope.

## Consequences

- Design and implementation reviews use one reference, preventing visual drift.
- This documentation decision does not authorize prototype or production edits.

## Revisit when

The user explicitly approves a new visual direction or replaces the canonical reference.
