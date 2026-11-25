# Content Field Reference

This reference follows the TypeScript declarations under `src/features/` and `src/content/types.ts`. Required means required by the TypeScript shape. Published records can have additional meaningful-content requirements enforced by selectors and `validatePortfolioContent`.

## Shared types

### `Visibility`

| Field/value | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `visibility` | `'draft' \| 'published'` | Required on collection records | Draft records are excluded from public selectors. Validator accepts only these values. Draft is not a confidentiality boundary. |

### `ImageAsset`

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `src` | `string` | Required | Root-relative public asset path (for example `/assets/...`) or absolute HTTP(S) URL. Validator rejects protocol-relative `//...`, whitespace, backslashes and unsafe protocols. Existence is not checked. |
| `alt` | `string` | Required | Meaningful description of the image; whitespace-only is invalid. |
| `width` | `number` | Optional | Source width in pixels; if supplied, must be a positive integer. |
| `height` | `number` | Optional | Source height in pixels; if supplied, must be a positive integer. |

### `ExternalLink`

Used by `Profile.resumeLink`, `Project.links`, and `ResearchItem.links`.

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `id` | `string` | Required | Stable link ID, unique within its link collection; non-empty and trimmed. |
| `label` | `string` | Required | Reader-facing link text; non-empty. |
| `href` | `string` | Required | Absolute HTTP(S) URL. Mailto is not valid for this type. |
| `kind` | `'github' \| 'demo' \| 'documentation' \| 'download' \| 'article' \| 'other'` | Required | Link purpose; validator checks the union. |
| `target` | `'same-tab' \| 'new-tab'` | Optional | Desired browsing context; new-tab links use `noopener noreferrer`. |

`externalLinkAttributes(link)` returns safe target/rel attributes for `new-tab`.

## Profile (`src/features/profile/types.ts`)

Profile is a single object, not a visibility-gated collection. All fields are optional; `{}` is valid.

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `name` | `string` | Optional | Verified display name; if present, cannot be blank. |
| `headline` | `string` | Optional | Verified role/title; if present, cannot be blank. |
| `shortIntroduction` | `string` | Optional | Brief verified introduction shown in Hero; if present, cannot be blank. |
| `biography` | `string` | Optional | Longer verified prose; non-empty biography makes About available. Blank lines become paragraph boundaries. |
| `location` | `string` | Optional | Verified location text; if present, cannot be blank. |
| `image` | `ImageAsset` | Optional | Profile image; see shared image rules. |
| `resumeLink` | `ExternalLink` | Optional | Resume/CV destination; currently absolute HTTP(S) only. |
| `availabilityStatus` | `'open-to-opportunities' \| 'not-looking' \| 'unspecified'` | Optional | Verified availability state; validator checks the union. |
| `socialLinkIds` | `readonly string[]` | Optional | IDs referring to `SocialLink.id`; validator checks existence. The current Contact selector does not use this field as a filter. |

## Project (`src/features/projects/types.ts`)

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `id` | `string` | Required | Stable record ID; non-empty and unique within projects. |
| `slug` | `string` | Required | Stable URL-safe identifier; lowercase alphanumeric segments with single hyphens; unique. |
| `title` | `string` | Required | Published projects need non-empty title. |
| `shortDescription` | `string` | Required | Published projects need non-empty summary. |
| `visibility` | `Visibility` | Required | Draft or published. |
| `longDescription` | `string` | Optional | Longer verified narrative; if present, cannot be blank. |
| `categoryId` | `string` | Optional | References `ProjectCategory.id`; validator checks existence. |
| `technologies` | `readonly string[]` | Optional | Factual technology names; empty items are invalid. |
| `tags` | `readonly string[]` | Optional | Factual descriptive tags; empty items are invalid. |
| `coverImage` | `ImageAsset` | Optional | Optional project-card image. |
| `gallery` | `readonly ImageAsset[]` | Optional | Optional gallery metadata; the current homepage does not render the gallery. |
| `links` | `readonly ExternalLink[]` | Optional | Optional verified HTTP(S) links. Link IDs are unique within this list. |
| `featured` | `boolean` | Optional | Whether to place this project in the featured group. |
| `featuredOrder` | `number` | Optional | If supplied, must be a non-negative integer, requires `featured: true`, and must be unique among featured projects with a supplied order. It is not required when `featured: true`; omission does not make a project non-featured. |
| `startDate` | `string` | Optional | Real calendar date in `YYYY-MM-DD`. |
| `endDate` | `string` | Optional | Real calendar date; if both dates exist, cannot precede start. |
| `status` | `'planned' \| 'in-progress' \| 'completed' \| 'archived'` | Optional | Project lifecycle label; validator checks the union. |
| `teamContext` | `string` | Optional | Verified team/collaboration context; if present, cannot be blank. |
| `role` | `string` | Optional | Verified contribution/role; if present, cannot be blank. |
| `relatedResearchIds` | `readonly string[]` | Optional | References `ResearchItem.id`; validator checks existence. |
| `relatedProjectIds` | `readonly string[]` | Optional | References other `Project.id` values; validator checks existence. |

Published project completeness is checked by `selectPublishedProjects` and validator. `featured: true` selects a published project into the featured group. That group sorts by ascending `featuredOrder`; projects with no order follow ordered projects. ID ascending breaks equal-order ties and sorts projects with no order. The validator rejects duplicate defined orders, so equal defined orders are only a defensive selector tie case. Non-featured projects retain content-module order on Home.

## Project Category (`src/features/projects/types.ts`)

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `id` | `string` | Required | Stable unique category ID. |
| `title` | `string` | Required | Category label; required when published. |
| `visibility` | `Visibility` | Required | Draft or published. |
| `description` | `string` | Optional | Brief verified taxonomy description; if present, cannot be blank. |
| `order` | `number` | Optional | Non-negative integer for ordered category presentation. No project-category listing currently consumes it. |

## Skill Category (`src/features/skills/types.ts`)

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `id` | `string` | Required | Stable unique category ID. |
| `title` | `string` | Required | Group label; required when published. |
| `visibility` | `Visibility` | Required | Draft or published. |
| `description` | `string` | Optional | Verified category context; if present, cannot be blank. |
| `order` | `number` | Optional | Non-negative integer; sort tie-breaks by ID. |

## Skill (`src/features/skills/types.ts`)

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `id` | `string` | Required | Stable unique skill ID. |
| `name` | `string` | Required | Skill label; required when published. |
| `visibility` | `Visibility` | Required | Draft or published. |
| `description` | `string` | Optional | Verified usage context; if present, cannot be blank. |
| `categoryId` | `string` | Optional | References `SkillCategory.id`; validator checks existence. |
| `iconId` | `string` | Optional | Identifier for a future/selected icon; if present, cannot be blank. No icon registry is currently defined. |
| `relatedProjectIds` | `readonly string[]` | Optional | References `Project.id`; validator checks existence. |
| `order` | `number` | Optional | Non-negative integer; skill sorting uses order then ID. |

## Research (`src/features/research/types.ts`)

### `ResearchPublication`

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `venue` | `string` | Optional | Verified publication venue; if present, cannot be blank. |
| `citation` | `string` | Optional | Verified citation text; if present, cannot be blank. |
| `status` | `'preprint' \| 'submitted' \| 'published'` | Optional | Verified status; validator checks the union. |

### `ResearchItem`

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `id` | `string` | Required | Stable unique research ID. |
| `title` | `string` | Required | Research title; required when published. |
| `visibility` | `Visibility` | Required | Draft or published. |
| `description` | `string` | Optional | Verified summary; if present, cannot be blank. |
| `topics` | `readonly string[]` | Optional | Verified topic labels; empty items are invalid. |
| `publication` | `ResearchPublication` | Optional | Optional publication metadata above. |
| `date` | `string` | Optional | Real calendar date in `YYYY-MM-DD`. |
| `links` | `readonly ExternalLink[]` | Optional | Optional HTTP(S) evidence links; IDs unique within the list. |
| `relatedProjectIds` | `readonly string[]` | Optional | References `Project.id`; validator checks existence. |

Research keeps authored module order. There is no research image field.

## Education (`src/features/education/types.ts`)

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `id` | `string` | Required | Stable unique education ID. |
| `institution` | `string` | Required | Institution; required and non-empty when published. |
| `program` | `string` | Required | Program/qualification; required and non-empty when published. |
| `visibility` | `Visibility` | Required | Draft or published. |
| `fieldOfStudy` | `string` | Optional | Verified field; if present, cannot be blank. |
| `startDate` | `string` | Optional | Real `YYYY-MM-DD` date. |
| `endDate` | `string \| null` | Optional | Real date, or `null` for ongoing. |
| `description` | `string` | Optional | Verified description; if present, cannot be blank. |
| `achievements` | `readonly string[]` | Optional | Verified achievements; empty items are invalid. |

## Experience (`src/features/experience/types.ts`)

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `id` | `string` | Required | Stable unique experience ID. |
| `organization` | `string` | Required | Organization; required and non-empty when published. |
| `role` | `string` | Required | Role; required and non-empty when published. |
| `visibility` | `Visibility` | Required | Draft or published. |
| `startDate` | `string` | Optional | Real `YYYY-MM-DD` date. |
| `endDate` | `string \| null` | Optional | Real date, or `null` for ongoing. |
| `description` | `string` | Optional | Verified summary; if present, cannot be blank. |
| `responsibilities` | `readonly string[]` | Optional | Verified responsibilities; empty items are invalid. |
| `achievements` | `readonly string[]` | Optional | Verified achievements; empty items are invalid. |
| `location` | `string` | Optional | Verified location; if present, cannot be blank. |
| `relatedProjectIds` | `readonly string[]` | Optional | References `Project.id`; validator checks existence. |

## Social Link (`src/features/socialLinks/types.ts`)

| Field | Type | Required? | Meaning and validation |
| --- | --- | --- | --- |
| `id` | `string` | Required | Stable unique social-link ID. |
| `platform` | `'github' \| 'linkedin' \| 'email' \| 'website' \| 'other'` | Required | Platform; validator checks the union. |
| `label` | `string` | Required | Reader-facing label; required when published. |
| `href` | `string` | Required | Absolute HTTP(S), or recipient-bearing `mailto:` only for platform `email`. |
| `visibility` | `Visibility` | Required | Draft or published. |
| `order` | `number` | Optional | Non-negative integer; links sort by order then ID. |
| `target` | `'same-tab' \| 'new-tab'` | Optional | Browsing context; validator checks values. |

## Registry shape

`PortfolioContent` requires `profile: Profile` and readonly arrays for `projects`, `projectCategories`, `skills`, `skillCategories`, `research`, `education`, `experience`, and `socialLinks`. The arrays may be empty. No template registry or separate schema is defined.
