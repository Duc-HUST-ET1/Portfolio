# ADR 0008: Defer API, CMS, and localization

**Status:** Proposed; ready for user approval  
**Date:** 2026-11-05

## Context

English is the initial language. The audience may include Japanese companies, but no reviewed Japanese copy or localization workflow is supplied. No external content service or editing workflow is approved.

## Decision

Use local English TypeScript content and no API, CMS, database, or i18n dependency initially. Keep content separate from presentation and stable IDs so later localization or an adapter can be introduced without duplicating components.

## Alternatives considered

- Bilingual release now: lacks reviewed Japanese content and language/URL decisions.
- CMS/API now: no publishing workflow warrants external infrastructure.
- Translate only UI labels: would create inconsistent language across content and metadata.

## Consequences

- Japanese language proficiency is not inferred from the audience.
- A future localization decision must specify reviewed translated content, language control or URL strategy, correct document/fragment language, and review ownership.
- A future remote source must be validated and mapped at an adapter boundary.

## Revisit when

Reviewed Japanese copy and its publishing workflow are supplied, or local editing becomes a demonstrated burden.
