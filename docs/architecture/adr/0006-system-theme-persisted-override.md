# ADR 0006: System, Light, and Dark theme preference

**Status:** Proposed; ready for user approval  
**Date:** 2026-11-05

## Context

The portfolio needs a System default and explicit Light and Dark choices. The selected explicit preference must survive browser sessions.

## Decision

Model preference as `system | light | dark`; model resolved appearance separately as `light | dark`. Default to `system`. Resolve it with `prefers-color-scheme` and respond to OS changes only while System is selected. Persist explicit Light or Dark preferences in localStorage. Selecting System removes the override.

Use one ThemeProvider as the owner of preference state, storage, media-query subscription, root `data-theme`, and `theme-color`. A small defensive bootstrap in the root HTML applies the same validated storage/resolver rules before styled paint; provider initialization must adopt the same key and behavior. If storage is unavailable, the page still uses the current selection for that session and System remains the fallback.

The control must expose all three choices accessibly. Do not use a binary toggle that hides the System state.

## Alternatives considered

- Always follow OS: prevents user override.
- Default permanently to Light: ignores OS preference.
- Store separate state in controls/sections: causes inconsistent appearance.
- Add a theme package: unnecessary for a single global preference and CSS token set.

## Consequences

- OS changes update the page only in System mode; explicit preference remains stable across sessions.
- Bootstrap and provider share one storage key and resolution contract and must not drift.
- Privacy/storage access errors are handled without breaking theme controls.

## Revisit when

Account-synced preferences or a rendering/security architecture changes how early theme resolution can work.
