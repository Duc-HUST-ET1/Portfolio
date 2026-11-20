# Phase 4 — Content Architecture

## Purpose

Portfolio content is authored as typed local TypeScript data and is kept separate from page and component markup. The current registry is deliberately empty because verified personal content has not been supplied. This phase provides the models, selectors, integrity checks, and availability calculation; it does not build the portfolio sections.

## Organization

```text
src/features/
  shared/{types,selectors}.ts
  profile/types.ts
  projects/{types,selectors}.ts
  skills/{types,selectors}.ts
  research/{types,selectors}.ts
  education/selectors.ts, types.ts
  experience/selectors.ts, types.ts
  socialLinks/{selectors,types}.ts
  contentAvailability/{selectors,types}.ts
src/content/
  types.ts, index.ts, validate.ts
  profile.ts, projects.ts, projectCategories.ts, skills.ts,
  skillCategories.ts, research.ts, education.ts, experience.ts, socialLinks.ts
```

Feature directories own domain types and selectors. `src/content/` owns editable records and the aggregate registry. The registry is the page-level boundary; view components should consume selected records rather than import individual data modules. `PortfolioContent` is the common selector input. The feature modules do not import UI modules, and the content registry imports feature types only, avoiding circular dependencies.

## Models and relationships

- **Profile** (`features/profile/types.ts`): optional name, headline, introduction, biography, location, image, resume link, availability status, and social link IDs. An empty object is valid.
- **Project** (`features/projects/types.ts`): stable ID, URL-safe slug, title, short description, required visibility, and optional longer copy, category, technologies, tags, cover/gallery, typed links, featured flag/order, dates, status, role/team context, and research/project references. IDs are independent of titles; project count is unrestricted.
- **ProjectCategory**: ID, title, visibility, and optional description/order.
- **Skill**: stable ID, name, visibility, and optional description, category, icon identifier, project references, and order. No rating or proficiency scale is modeled.
- **SkillCategory**: stable ID, title, visibility, and optional description/order. Skills refer to one category by ID; category selectors omit categories without published skills.
- **ResearchItem**: stable ID, title, visibility, optional description/topics, publication metadata, date, typed links, and project references.
- **Education**: stable ID, institution, program, visibility, and optional field, dates, description, and verified achievements.
- **Experience**: stable ID, organization, role, visibility, optional dates, description, responsibilities, achievements, location, and project references.
- **SocialLink**: stable ID, typed platform, label, URL, visibility, optional order and tab behavior. Profile references these by ID.
- **Shared types**: `Visibility` (`draft` or `published`), image assets with alt text, and typed links. `externalLinkAttributes` returns safe `target`/`rel` attributes when a link is configured for a new tab.

Dates use `YYYY-MM-DD`; a nullable end date can represent ongoing education or experience. Optional fields should be omitted until known. A record intended for public display must provide its required identity fields and be marked `published`.

## Selectors and visibility

Selectors return only `published` records with required display text present:

- Projects: `selectPublishedProjects`, `selectFeaturedProjects`, `selectProjectsByCategory`, `selectProjectsByTag`, `selectProjectsByTechnology`.
- Skills: `selectPublishedSkills`, `selectSkillsByCategory`, `selectPublishedSkillCategories`.
- Research: `selectPublishedResearch`, `selectResearchForProject`.
- Education / experience: `selectPublishedEducation`, `selectPublishedExperience`.
- Social: `selectAvailableSocialLinks`.
- Navigation: `selectContentAvailability` returns booleans for each section; Home is always available. About requires meaningful profile copy, Skills/Projects/Research require a published record, Experience requires education or experience, and Contact requires a published social link. The layout navigation consumes these booleans, so empty or draft-only sections are not linked.

Project tag and technology matching is case-insensitive and Unicode-normalized. Featured items sort by explicit `featuredOrder`, then stable ID; items without an order follow explicitly ordered items. Skills, categories, and social links sort by optional order and then ID. Selectors accept arrays and do not assume a fixed collection size.

## Integrity checks

`validatePortfolioContent` is a lightweight runtime utility over the aggregate registry. It reports duplicate/empty IDs, duplicate or malformed project slugs, incomplete published records, invalid HTTP(S) links (email social links may use `mailto:`), invalid image paths or missing alt text, missing category/project/research/social references, invalid or duplicate featured order, and malformed or reversed dates.

TypeScript checks authored object shapes at build time; it does not validate runtime values. The integrity utility checks values and cross-record references when called. Selectors independently filter drafts and incomplete records before display. No validation package or automatic validation side effect is introduced; call the validator in an explicit development/CI integration when desired.

## Authoring records

All current data files export empty typed values. Add records only after facts and URLs are verified.

1. **Project:** append a `Project` object to `src/content/projects.ts` with a stable ID, unique lowercase hyphenated slug, title, short description, and visibility. Add a category ID only after adding that category to `projectCategories.ts`. Add link records only with verified URLs. Set `featured` and a unique non-negative `featuredOrder` only when the item should be featured. Keep dates, claims, images, relationships, and outcome details absent until confirmed.
2. **Skills:** add skill records in `skills.ts`; add categories in `skillCategories.ts` and reference them by stable IDs. Add related project IDs only when those projects exist. There are no proficiency ratings.
3. **Research:** add `ResearchItem` records in `research.ts`; relate them to projects through project IDs, with matching references in project data when a bidirectional relationship is desired. The validator checks each declared reference against the registry.
4. **Education and experience:** add factual records in their respective files. Use ISO dates and omit uncertain dates/details. Omit the entry entirely if no verified record is available.
5. **Profile and social links:** fill optional `profile.ts` fields only with owner-provided facts. Add link records in `socialLinks.ts` and reference IDs from the profile if desired. Email addresses use `mailto:`; external web URLs use HTTP(S).

The shared registry in `src/content/index.ts` is the only aggregate export needed by the application. Adding a record does not require editing a repeated UI component. Future lists, filters, or detail routes can select from these same records, but none are implemented here.

## Empty state and preview boundary

The profile and all collections currently contain no personal information or records. Empty and unpublished collections produce empty selector results and availability false, except Home. The application still shows `CoreLayoutPreview`, whose visibly labeled structural slots are development scaffolding and not portfolio claims. Its slot list is intentionally separate from public navigation availability. The next UI phase should replace this preview with a data-consuming home page, render only available sections, and retain empty navigation suppression; that work is not part of Phase 4.

## Extension boundaries and limitations

Stable IDs and optional typed fields leave room for project detail pages, galleries, search/facets, localization, or a CMS adapter. There is no router, backend, runtime schema library, localization layer, search, pagination, or CMS migration in this phase. Media paths are strings rather than an asset-management system. The validator is explicit and lightweight, not automatically run against imported content. No real browser/device review is implied by the selector tests.
