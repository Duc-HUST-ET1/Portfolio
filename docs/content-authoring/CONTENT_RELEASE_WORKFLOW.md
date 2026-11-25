# Content Release Workflow

## Author and validate a record

1. **Create the record** in the matching `src/content/` module. Keep content data out of components and do not create a second registry.
2. **Assign identity**: use a stable, unique ID; projects also need a unique lowercase kebab-case slug. Add relationships only after the referenced record exists.
3. **Fill required fields** from verified sources. Include optional claims, dates, links and assets only when confirmed. Omit unknown optional fields.
4. **Stage as draft** with `visibility: 'draft'` for collection records. Profile has no visibility field; review it as public as soon as it is added.
5. **Run explicit validation** with `npm run validate:content`. Fix each reported path and code. Validation is not part of the production build and is not run automatically.
6. **Review links and assets**: open destinations, confirm labels, inspect image paths/alt text, check dates and relationships, and confirm the record is appropriate for public release.
7. **Publish** by changing the record's visibility to `published`. Profile fields have no visibility flag, so add them only when ready to be public.
8. **Run checks**: `npm run validate:content`, `npm run test:content`, `npm run typecheck`, and `npm run build`.
9. **Verify the homepage** in a browser: confirm the record content, ordering, links, related names, section visibility and navigation target. Review both themes and a narrow viewport as part of the release review. Browser testing is not performed by the validation command.

## Visibility and privacy

Selectors omit draft collection records from rendered sections. However, the aggregate TypeScript registry is imported into the client application, so draft text can still be present in the built JavaScript bundle. Visibility is not access control. Do not store confidential facts, private URLs, unpublished sensitive work, personal contact information not approved for release, or secrets as draft records in these modules. Keep unapproved content outside the public registry.

The Profile object is not visibility-gated. Treat every populated Profile field as public. In particular, only add `resumeLink`, `image`, social IDs, location, headline, or availability when the owner has verified and approved it.

## Sorting and relationships

- Featured projects come first by unique `featuredOrder`, with IDs breaking ties if order is absent; non-featured projects follow module order.
- Skills and skill categories sort by optional `order`, then ID. Social links sort the same way.
- Research, Education, Experience and non-featured projects retain module order. Arrange those records intentionally in their content files.
- Project categories have an `order` field, but no current project-category listing consumes it.
- The validator checks project/research/skill/social references. Remove or update references before deleting a referenced record.

## Roll back a release

For a quick presentation rollback, change a published collection record to `draft`, then run validation, tests, typecheck and build before redeploying. Since draft records are still imported into the client bundle, remove a record entirely if its facts or URL must no longer be shipped. Also remove or update incoming references. If the latest deployment is already live, redeploy the last approved build or publish the corrected content through the normal hosting workflow. Profile fields require deletion or restoration because Profile has no draft state.

## Validation command behavior

`npm run validate:content` runs `validatePortfolioContent(portfolioContent)` explicitly. It prints each issue's record path, issue code and explanation, then exits non-zero if any issue exists. A clean empty registry prints a success message. It does not mutate records, publish drafts, or run as a side effect of production builds.
