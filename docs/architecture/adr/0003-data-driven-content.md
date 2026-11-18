# ADR 0003: Data-driven portfolio content

**Status:** Proposed; ready for user approval  
**Date:** 2026-11-05

## Context

The site should accommodate a growing collection of projects and other records without requiring repeated JSX edits. No real portfolio content has been supplied; fabricating examples is prohibited.

## Decision

Represent owner-supplied, verified content as typed records in local modules. Render all repeated records from stable IDs using reusable feature components and data selectors. Model controlled categories separately from flexible tags; represent featured ordering as optional data. Keep public content collections empty until real records are provided. Do not keep fake, placeholder, or unpublished records in public content modules.

## Alternatives considered

- Hardcode each card in JSX: rejected because content edits would require presentation changes.
- Add a CMS/API now: no editing workflow or service is approved.
- Use an untyped generic map: loses clear domain contracts and compile-time checking.

## Consequences

- Adding, editing, removing, featuring, categorizing, or tagging projects changes content data rather than ProjectCard markup.
- Empty collections and optional fields have explicit behavior: omit the content and its section/navigation item when no meaningful verified content remains.
- Large collections are data-driven without a fixed JSX count. Add browsing controls or virtualization only after measuring real content and approving the visitor flow.
- TypeScript checks local data shape; validate at runtime if an external source is later introduced.

## Revisit when

An external editor/API, complex relational content, or a publishing workflow makes local TypeScript modules burdensome.
