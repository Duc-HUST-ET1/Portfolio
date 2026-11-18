# ADR 0002: Single page without a router initially

**Status:** Proposed; ready for user approval  
**Date:** 2026-11-05

## Context

The initial application is one English portfolio page with section navigation. Project detail pages and other routes are future possibilities only.

## Decision

Compose one HomePage and use native fragment links. Do not add a client router or route configuration initially. Derive section navigation and section rendering from the same meaningful-content visibility decisions. Omit a content section and its navigation item together when its verified data is empty.

Keep stable project IDs and slugs in content records as future route keys, not as a reason to implement routes now.

## Alternatives considered

- Add a router immediately: adds routing and hosting fallback work without an initial multi-page need.
- Separate HTML pages: duplicates app bootstrapping and presentation without a current need.
- A full-stack framework: reconsider only if rendering or publishing requirements justify it.

## Consequences

- Fragment navigation keeps native URL, history, keyboard, and browser behavior.
- The Hero remains present with the approved role direction and conceptual systems diagram; optional personal fields appear only when verified.
- When routes are approved, test direct visits, reload, back/forward, unknown slugs, and host deep-link behavior.

## Revisit when

The user approves project detail pages, a separate project index, a blog, or another independently navigable page.
