# Phase 6.1 — Featured Project Ordering Documentation Fix

## Findings from the implementation

- `Project` declares both `featured?: boolean` and `featuredOrder?: number`; neither is required by the TypeScript model.
- `selectFeaturedProjects` first selects published projects with non-empty titles and short descriptions, then keeps projects with a truthy `featured` value. `featuredOrder` does not decide whether a project is featured.
- Featured projects sort by ascending `featuredOrder`. The selector substitutes `Number.MAX_SAFE_INTEGER` for a missing order, so projects without an order follow projects with defined orders. The selector then sorts by ascending `id` whenever the compared order values tie. This means IDs order missing-order projects, and provide a defensive tie-break for equal defined orders.
- `validatePortfolioContent` permits an absent `featuredOrder`. If supplied, the value must be a non-negative integer and the project must have `featured: true`. It rejects duplicate defined orders among featured projects. Multiple featured projects may therefore omit the order.
- Home renders the featured group before the non-featured group. Its non-featured project list is filtered from the source project list, preserving that list's module order; `featuredOrder` does not reorder it.
- Existing content tests cover sorting featured projects with explicit orders and a featured project without an order in the homepage fixture. They do not directly assert the selector's ordering among missing-order featured projects or ID tie-breaking for those projects.

## Documentation changes

- `CONTENT_AUTHORING_GUIDE.md`: clarified that `featuredOrder` is optional, described the ascending order, missing-order placement, ID tie-break, validation constraints and source order of non-featured projects.
- `CONTENT_FIELD_REFERENCE.md`: specified the optional field's validation rules and clarified selection and sorting behavior after the field table.
- `CONTENT_RELEASE_WORKFLOW.md`: replaced the prior ambiguous sorting statement with the same sorting and validation behavior.

## Source changes

No application source, selector, type, validator, test, project record, or dependency was changed. The inspected behavior is internally consistent, so no source-code bug requiring a behavior change was identified.

## Verification

- `npm run typecheck` — passed.
- `npm run test:content` — passed (1 test file, 0 failures).
- `npm run validate:content` — passed (0 issues).
- `npm run build` — passed; Vite production build completed.
- `git diff --check` — passed.

## Remaining limitations

The existing test suite does not directly test the ID ordering of multiple featured projects with missing `featuredOrder` values or selector tie-breaking for duplicate defined values. The selector source explicitly implements both behaviors, while the validator rejects duplicate defined values. No content records were added as part of this documentation fix.
