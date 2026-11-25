# Content Authoring Guide

Portfolio records live in the typed modules under `src/content/`. The aggregate registry in `src/content/index.ts` is the only registry imported by the app. Add records to the relevant module; do not add JSX per record or import a data file directly into a section.

## Before authoring

- Use only owner-verified facts, dates, claims, images and destination URLs.
- Stable IDs are lowercase, descriptive identifiers used by relationships. Do not change an ID after other records refer to it.
- Project slugs are unique, lowercase kebab-case strings.
- `visibility: 'draft'` keeps a record out of selectors and the homepage. It is a presentation filter, not a privacy boundary: content imported into the client registry can still be present in the shipped JavaScript. Do not put confidential or sensitive facts in draft records. Keep unapproved material outside the registry.
- Optional values should be omitted when unknown. Do not enter empty strings, whitespace, guessed dates, or fake URLs.
- All examples below are documentation-only schema examples. Bracketed values must be replaced by owner-verified facts before authoring. None are imported into `src/content/`.

## Profile

**Purpose:** owner-verified identity and introduction for the Hero/About areas.

**Required fields:** none; an empty profile is valid. **Optional fields:** `name`, `headline`, `shortIntroduction`, `biography`, `location`, `image`, `resumeLink`, `availabilityStatus`, `socialLinkIds`.

- Strings should contain verified, non-empty text. `shortIntroduction` appears in Hero; `biography` enables About and may contain paragraphs separated by blank lines.
- `image` is an `ImageAsset` with a root-relative URL for a file under `public/` or an absolute HTTP(S) URL, plus meaningful alt text.
- `resumeLink` is an `ExternalLink` with an absolute HTTP(S) URL. Local relative document URLs are not currently accepted by validation.
- Availability values: `open-to-opportunities`, `not-looking`, `unspecified`. Omit if unknown.
- `socialLinkIds` refer to IDs in `socialLinks.ts`. The current Contact section displays selector-approved social links from that collection; this reference field is validated but does not filter the Contact section.
- Profile has no visibility flag and is treated as authored public content when populated.

```ts
// Documentation-only example; replace with facts verified by the owner.
import type { Profile } from '../features/profile/types';
const profileExample: Profile = {};
```

## Projects

**Purpose:** verified project records used by the Projects section and cross-references.

**Required fields:** `id`, `slug`, `title`, `shortDescription`, `visibility`. **Optional:** `longDescription`, `categoryId`, `technologies`, `tags`, `coverImage`, `gallery`, `links`, `featured`, `featuredOrder`, `startDate`, `endDate`, `status`, `teamContext`, `role`, `relatedResearchIds`, `relatedProjectIds`.

- Slugs use lowercase letters/numbers separated by single hyphens and must be unique.
- A published project must have a non-empty title and short description. Drafts may be incomplete, but IDs, slugs, references, URLs and any supplied fields are still validated.
- `categoryId` refers to a `ProjectCategory.id`. Related IDs refer to project or research IDs. Avoid self/cyclic relationships unless the connection is meaningful.
- `featured: true` places a published project in the featured group; `featuredOrder` is optional and its absence does not make the project non-featured. When present, `featuredOrder` must be a non-negative integer, is valid only with `featured: true`, and must be unique among featured projects that provide an order. Featured projects sort by ascending `featuredOrder`; projects without one come after projects with an order. ID ascending breaks equal-order ties and orders projects whose `featuredOrder` is absent. Validation rejects duplicate defined orders, so equal defined orders are only a defensive selector tie case. Non-featured projects retain content-module order.
- Dates use real `YYYY-MM-DD` dates; if both are set, start must not be later than end. `status`: `planned`, `in-progress`, `completed`, `archived`.
- `links` use `ExternalLink`; only absolute HTTP(S) URLs are accepted. Images use `ImageAsset`.
- Technologies and tags are plain string arrays, not ratings. Omit empty items. The homepage does not add filters from them.

```ts
// Documentation-only example; bracketed copy is not a portfolio record.
import type { Project } from '../features/projects/types';
const projectExample = {
  id: 'verified-project-id',
  slug: 'verified-project-slug',
  title: '[Verified project title]',
  shortDescription: '[Verified concise description]',
  visibility: 'draft',
} satisfies Project;
```

## Project Categories

**Purpose:** controlled project taxonomy for project records.

**Required:** `id`, `title`, `visibility`. **Optional:** `description`, `order`.

- A published category needs a non-empty title. `order`, when set, is a non-negative integer.
- Project `categoryId` values reference this collection. Categories do not currently create separate UI groups; their order is available for a future category listing.
- Visibility is `draft` or `published`. A category with no projects is not rendered as a homepage section.

```ts
// Documentation-only example.
import type { ProjectCategory } from '../features/projects/types';
const projectCategoryExample = {
  id: 'verified-category-id', title: '[Verified category]', visibility: 'draft',
} satisfies ProjectCategory;
```

## Skills

**Purpose:** factual technologies or practices, optionally grouped by category and related to evidence.

**Required:** `id`, `name`, `visibility`. **Optional:** `description`, `categoryId`, `iconId`, `relatedProjectIds`, `order`.

- A published skill needs a non-empty name. Do not add proficiency ratings; the model has none.
- `categoryId` refers to `SkillCategory.id`; project references must exist.
- `order`, when set, is a non-negative integer. Skills sort by order then ID. Skills without a visible category are presented in “Other skills.”

```ts
// Documentation-only example.
import type { Skill } from '../features/skills/types';
const skillExample = {
  id: 'verified-skill-id', name: '[Verified skill]', visibility: 'draft',
} satisfies Skill;
```

## Skill Categories

**Purpose:** group related skills in the Skills section.

**Required:** `id`, `title`, `visibility`. **Optional:** `description`, `order`.

- Published categories need a non-empty title. Only published categories with at least one published skill are selected for display.
- `order` is a non-negative integer; categories sort by order then ID.

```ts
// Documentation-only example.
import type { SkillCategory } from '../features/skills/types';
const skillCategoryExample = {
  id: 'verified-skill-category-id', title: '[Verified skill category]', visibility: 'draft',
} satisfies SkillCategory;
```

## Research

**Purpose:** a verified research record with optional publication context, topics and evidence links.

**Required:** `id`, `title`, `visibility`. **Optional:** `description`, `topics`, `publication`, `date`, `links`, `relatedProjectIds`.

- Published records need a non-empty title. `date` is a valid `YYYY-MM-DD` date when supplied.
- `publication` may contain `venue`, `citation`, and `status` (`preprint`, `submitted`, `published`). Do not infer publication status.
- Related projects must exist. Links use `ExternalLink` and absolute HTTP(S) URLs.
- Research is shown in source-module order. No research image field exists in the model.

```ts
// Documentation-only example.
import type { ResearchItem } from '../features/research/types';
const researchExample = {
  id: 'verified-research-id', title: '[Verified research title]', visibility: 'draft',
} satisfies ResearchItem;
```

## Education

**Purpose:** a verified education entry within the combined Experience & Education section.

**Required:** `id`, `institution`, `program`, `visibility`. **Optional:** `fieldOfStudy`, `startDate`, `endDate`, `description`, `achievements`.

- Published entries need institution and program. Dates, if supplied, must be valid `YYYY-MM-DD`; `endDate: null` means ongoing. When both dates are strings, start must not follow end.
- Achievements are factual strings; omit unsupported or empty entries.
- Entries keep authored module order; no date sort is applied by the selector.

```ts
// Documentation-only example.
import type { Education } from '../features/education/types';
const educationExample = {
  id: 'verified-education-id', institution: '[Verified institution]',
  program: '[Verified program]', visibility: 'draft',
} satisfies Education;
```

## Experience

**Purpose:** verified role and organization records in the combined Experience & Education section.

**Required:** `id`, `organization`, `role`, `visibility`. **Optional:** `startDate`, `endDate`, `description`, `responsibilities`, `achievements`, `location`, `relatedProjectIds`.

- Published entries need organization and role. Dates use valid `YYYY-MM-DD`; `endDate: null` means ongoing. Start cannot follow end.
- Related project IDs must exist. Responsibilities and achievements should describe substantiated work; omit empty lists/items.
- Entries keep authored module order; the selector does not automatically sort by date.

```ts
// Documentation-only example.
import type { Experience } from '../features/experience/types';
const experienceExample = {
  id: 'verified-experience-id', organization: '[Verified organization]',
  role: '[Verified role]', visibility: 'draft',
} satisfies Experience;
```

## Social Links

**Purpose:** verified contact and public profile destinations.

**Required:** `id`, `platform`, `label`, `href`, `visibility`. **Optional:** `order`, `target`.

- `platform`: `github`, `linkedin`, `email`, `website`, `other`. Published links need a label.
- `href` must be absolute HTTP(S); `mailto:recipient@example.com` is accepted only for the email platform. Empty `mailto:` is rejected.
- `target`: `same-tab` or `new-tab`; external new-tab links use `noopener noreferrer`. Order is a non-negative integer; records sort by order then ID.
- Only published records with a non-empty label and safe URL appear in Contact.

```ts
// Documentation-only example; never substitute an unverified address.
import type { SocialLink } from '../features/socialLinks/types';
const socialLinkExample = {
  id: 'verified-social-id', platform: 'website', label: '[Verified link label]',
  href: 'https://example.invalid', visibility: 'draft',
} satisfies SocialLink;
```

## Editing and removing records

Edit the existing record in its type-specific module and preserve its ID if references exist. To unpublish, set visibility to `draft`; remember that this hides rendered output but does not make client-bundled content private. To remove a record, first remove or update every reference to its ID, then delete the record and run validation, tests, typecheck and build.

No source template files are created. Keeping examples in documentation avoids a second registry, accidental production imports, and repeated type definitions; the examples use the actual interfaces via `satisfies`.
