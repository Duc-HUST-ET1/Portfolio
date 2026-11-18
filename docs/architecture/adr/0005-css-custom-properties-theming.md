# ADR 0005: CSS custom properties for themes

**Status:** Proposed; ready for user approval  
**Date:** 2026-11-05

## Context

The approved visual direction has Light and Dark appearances with exact palette colors shared by page sections, controls, and the conceptual diagram.

## Decision

Define semantic CSS custom properties for the approved palette and derived text, border, focus, and diagram tokens. Apply the resolved Light or Dark appearance through a root `data-theme` attribute and CSS custom properties. Components consume semantic variables; do not embed palette hex values in component rules.

The user preference (`system`, `light`, `dark`) is separate from the effective appearance (`light`, `dark`). The exact approved palette values are recorded in the architecture document.

## Alternatives considered

- Duplicate literal colors in component styles: risks theme drift.
- CSS-in-JS, utility framework, or theme package: no current need justifies the additional system or dependency.

## Consequences

- One resolved root appearance updates the full page and browser `theme-color` metadata.
- Derived small-text, focus, border, and diagram colors must be contrast-checked in both appearances before implementation.
- Theme preference persistence is owned by the single theme provider in ADR 0006.

## Revisit when

A broader design system or multiple independently themed surfaces create a real need for a different styling model.
