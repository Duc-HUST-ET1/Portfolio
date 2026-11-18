# Phase 2 — Design System Foundation

**Status:** Implemented foundation; ready for review. This is not the portfolio homepage.

## Purpose and boundaries

The React application currently renders a design-system showcase so the approved visual foundation can be reviewed before portfolio content is added. It contains no profile, project, education, employment, achievement, skill, or contact claims. The showcase is a temporary page in `src/pages/DesignSystemShowcase.tsx`; portfolio sections and content models remain out of scope for this phase.

## Visual direction

Technical editorial: warm neutral surfaces, forest green for identity and actions, muted orange for restrained emphasis, a serif display face used selectively, and monospace metadata. The system font stack avoids font downloads and keeps the initial page lightweight. Borders and surface changes establish grouping; shadows are limited to none in the base system.

## Color tokens

| Semantic token | Light | Dark | Intended use |
| --- | --- | --- | --- |
| `--color-background` | `#F5F5F0` | `#151A19` | Page canvas |
| `--color-surface` | `#FFFFFF` | `#202927` | Controls and raised content |
| `--color-surface-muted` | `#EAECE5` | `#29322F` | Grouped/supporting surfaces |
| `--color-primary` | `#203D35` | `#9DBDAE` | Identity and primary action |
| `--color-accent` | `#D97843` | `#E49A69` | Decorative and small emphasis |
| `--color-accent-strong` | `#99441F` | `#F2B68E` | Accent text with contrast |
| `--color-text` | `#24322E` | `#E8EEEA` | Main text |
| `--color-text-muted` | `#53625C` | `#C0CBC5` | Supporting text |
| `--color-text-subtle` | `#596960` | `#AEBBB4` | Metadata and low-priority labels |
| `--color-border` | `#CFD7D0` | `#3D4A45` | Component boundaries |
| `--color-border-strong` | `#AEBDB3` | `#65756C` | Higher emphasis boundaries |
| `--color-focus` | `#99441F` | `#F2B68E` | Keyboard focus ring |
| `--color-success` | `#286B4B` | `#81C79E` | Success state |
| `--color-warning` | `#875400` | `#F1C16E` | Warning state |
| `--color-error` | `#A12F2C` | `#FF958D` | Error state |
| `--color-selection` | `#D5E5DB` | `#3B5548` | Selected text background |

The approved orange values are retained as the accent token. Orange is not used as small text on a light surface; the separate `--color-accent-strong` token is used when accent-colored text needs readable contrast.

## Typography, spacing, and layout

- Display headings use Georgia selectively; interface and body text use the system sans-serif stack.
- Metadata and token labels use a system monospace stack.
- Spacing tokens range from 4 px to 64 px. Content is capped at 1200 px; reading copy is limited to roughly 68 characters per line.
- The showcase uses intrinsic CSS Grid/Flex layouts and 980 px, 760 px, and 560 px breakpoints. Controls use at least 44 px interactive targets where appropriate.
- Borders, clear alignment, and whitespace carry hierarchy; the system avoids excessive cards and ornament.

## Theme behavior

The appearance control exposes **System**, **Light**, and **Dark** as a native radio group. System is the initial preference and follows `prefers-color-scheme`; explicit Light and Dark choices are saved in `localStorage`. Choosing System removes the saved override. A small inline bootstrap in `index.html` resolves the theme before styles paint; the React provider then owns preference updates, system-change listening, and browser theme-color metadata. If storage is unavailable, the current-page selection still works and the next load returns to System.

## Accessibility and motion

The page has a skip link, semantic landmarks and headings, labeled native controls, visible `:focus-visible` rings, and non-color text labels for statuses. System fonts respect user text scaling. Reduced-motion disables smooth scrolling and transitions. Hover styling is limited to hover-capable pointers. The showcase does not use fixed UI or require safe-area metadata.

Contrast ratios were calculated from the implemented colors using the WCAG relative-luminance formula. Representative normal-text pairs: light main text/background 12.22:1, muted text/background 5.87:1, accent text/background 6.00:1, white/primary button 11.80:1; dark main text/background 14.95:1, muted text/background 10.55:1, accent text/background 9.93:1, dark button text/primary button 8.65:1. These checks do not replace review of every rendered state or browser rendering.

## Responsive review status

The layout rules provide a wide desktop grid, a condensed tablet layout, and stacked mobile sections. Source review found no fixed-width content columns at the narrow breakpoint; long token labels and sample copy can wrap. Automated screenshot/device inspection was not available in this environment, so the rendered appearance at desktop, tablet, mobile, zoom, and assistive-technology combinations remains for human/browser review.

## Files and usage

- App shell and entry: `src/app/App.tsx`, `src/main.tsx`
- Theme state/control: `src/app/providers/ThemeProvider.tsx`, `src/hooks/useTheme.ts`, `src/components/ui/ThemeControl.tsx`
- Tokens and showcase: `src/styles/`, `src/pages/DesignSystemShowcase.tsx`
- Run locally: `npm install`, then `npm run dev`
- Verify: `npm run typecheck` and `npm run build`

No router, UI library, animation library, backend, CMS, or state-management dependency is used.
