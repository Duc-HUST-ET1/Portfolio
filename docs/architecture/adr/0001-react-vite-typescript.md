# ADR 0001: React, Vite, TypeScript, and npm

**Status:** Proposed; ready for user approval  
**Date:** 2026-11-05

## Context

The Phase 1.1 audit found this target checkout has no app source, manifest, lockfile, or dependencies. The project direction now explicitly selects this checkout, React + Vite + TypeScript, and npm.

## Decision

After explicit approval for Phase 2, initialize this checkout as a client-rendered React + React DOM, Vite, and TypeScript application using npm and a committed npm lockfile. Use the official Vite React integration. Select compatible stable versions at setup and enable strict TypeScript checking. Do not add a framework, router, library, or service beyond this baseline without a concrete approved need.

## Alternatives considered

- Restore another application: no other source tree is present in the audited checkout, and the user designated this repository as the target.
- A React framework: revisit if approved requirements need server rendering, static generation, or server capabilities.
- Plain HTML/CSS: does not match the selected stack.

## Consequences

- This is a proposed setup choice, not a claim that packages already exist.
- npm is the sole package manager for the initial app; do not add competing lockfiles.
- No setup, package manifest, or installation is authorized by this ADR review phase.

## Revisit when

The user changes the stack/package manager or approves a rendering requirement that warrants reconsidering the platform.
