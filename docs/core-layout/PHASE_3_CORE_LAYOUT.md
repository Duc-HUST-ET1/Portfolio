# Phase 3 — Core Layout

**Status:** Implemented for review. This phase provides an application frame and temporary structure preview; portfolio content is not populated.

## Layout architecture

`App` renders `CoreLayoutPreview` inside the existing `ThemeProvider` from `main.tsx`. The preview composes a `SiteLayout`, which owns the skip link, shared header, one main landmark, and footer. Its children are page content. Layout styles use the existing semantic color, width, spacing, radius, and control-size tokens.

## Component responsibilities

- `SiteLayout`: shared page frame, one `<main id="main-content">`, skip link, header, and footer.
- `SiteHeader`: neutral identity, available section links, existing theme control, and local responsive-menu state.
- `SiteFooter`: visual separation and neutral identity; accepts children for later verified footer links or contact content.
- `SkipLink`: first focusable page link to the main landmark.
- `CoreLayoutPreview`: temporary, explicit structural preview with labeled section anchors. Its copy states that these are not portfolio content.
- `navigation.ts`: typed candidate section identifiers and a helper that returns only the items available in the current page.

## Navigation configuration and future sections

The typed candidate configuration contains `home`, `about`, `skills`, `projects`, `research`, `experience`, and `contact`. `getAvailableNavigationItems` filters this configuration using IDs supplied by the page. The preview supplies all seven IDs and renders matching labeled structural targets, so every preview link resolves. A real page should derive available IDs from sections that have meaningful content and render those same IDs as targets. Do not create empty portfolio sections or links just to fill the navigation. Keep `home` available for the brand link.

To add an item, add its ID and label to `navigationConfiguration`, then add a matching page section and include its ID in the page's available list only when that section exists. To remove or hide an item, remove the candidate or omit its ID from the available list; there is no duplicated header markup to update.

The active appearance follows the URL fragment and uses both a visible underline/border and an accessible current-location state. It is not a scroll spy; that behavior can be reconsidered once real page sections establish a useful reading flow.

## Mobile navigation behavior

At 980 px and below, the desktop links collapse behind a native button disclosure. The button exposes its name, `aria-expanded`, and `aria-controls`; the navigation remains a list of ordinary links, not an ARIA menu widget. Opening the menu expands the sticky header in document flow, so it is not a modal overlay and needs no scroll lock. Escape closes the menu and returns focus to the trigger. Selecting a link focuses the destination and closes the menu. Pointer interaction outside the header closes it. Switching back to desktop width resets the open state. No hover is required and no menu animation is used.

## Responsive rules

- Above 980 px: identity, full section navigation, and theme choices share one aligned header row.
- 981 px and below: compact header with a disclosure navigation and a second row for the theme control.
- 760 px and below: structural slot content reflows into a narrower two-column arrangement.
- 560 px and below: one-column slots, tighter horizontal gutters, and stacked footer content.
- Shared gutters use the same 48 px / 40 px / 32 px responsive pattern as Phase 2; the content width remains capped by `--content-width`. Header and menu controls meet the existing 44 px target where practical.

## Accessibility and theme integration

The layout has semantic header, navigation, main, and footer landmarks; a single main landmark; a skip link; heading levels; native anchors and button; visible focus rings; and no color-only active indicator. The document remains English. Smooth anchor scrolling is enabled only when reduced motion is not requested. The menu has no motion dependency. `ThemeControl` is reused directly, so the Phase 2 provider remains the only owner of System/Light/Dark state and persistence.

## Known limitations

- The rendered page is a temporary structural review surface. Replace `CoreLayoutPreview` with the approved homepage composition when content implementation begins.
- Navigation active state follows the fragment, not the scroll position.
- The footer is intentionally neutral and has no social/contact links or copyright claim.
- Browser/device inspection was unavailable in the implementation environment. Responsive behavior was checked from source rules and build output; visual and keyboard interaction still need a real-browser review.
