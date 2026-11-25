# Phase 5 — Homepage Architecture

## Homepage composition

`App` reads the aggregate registry, calculates `selectContentAvailability` once, derives navigation from that result, and passes both content and availability to `HomePage`. `HomePage` owns section order and passes selected, typed records into the presentation components.

```text
portfolioContent (src/content)
  → feature selectors + selectContentAvailability
  → App (shared SiteLayout + available navigation)
  → HomePage
  → Hero / About / Skills / Projects / Research / Experience / Contact
```

The Hero always renders at `#home`. It uses only Profile fields for personal information and falls back to the neutral page title “Portfolio.” The approved conceptual systems diagram fills the secondary area unless a valid profile image with alt text is supplied. The diagram is labeled as conceptual and not a deployment diagram. A verified resume link and the explicit `open-to-opportunities` state are optional.

## Section responsibilities and interfaces

All sections live under `src/components/sections/`. They receive data through props and do not import individual content files or reach into the registry.

| Component | Props | Responsibility |
| --- | --- | --- |
| `HeroSection` | `profile: Profile` | Always-present introduction, optional image/resume/availability, approved conceptual diagram |
| `AboutSection` | `profile: Profile` | Biography paragraphs; splits blank-line-separated prose into paragraphs |
| `SkillsSection` | `groups: SkillGroupData[]` | Group selected skills by published category, with an “Other skills” group for uncategorized records |
| `SkillGroup`, `SkillItem` | `group: SkillGroupData`, `skill: Skill` | Reusable grouped skill presentation without ratings |
| `ProjectsSection` | `projects: Project[]` | Flexible project collection layout |
| `ProjectCard` | `project: Project` | Reusable project title, copy, optional media, technologies, tags and safe links |
| `ResearchSection` | `items: ResearchItem[]`, `projects: Project[]` | Research metadata, topics, safe links and resolvable related project names |
| `ExperienceSection` | `experience: Experience[]`, `education: Education[]` | Editorial work and education entries; `endDate: null` displays “Present” |
| `ContactSection` | `links: SocialLink[]` | Available email and external links |
| `SectionHeading` | `id`, `index`, `label`, `title`, optional `summary` | Consistent section heading structure |

List/card components map all supplied records by stable IDs. Optional fields are omitted when absent. External links opening a new tab receive `rel="noopener noreferrer"`. Link renderers reject non-HTTP(S) URLs except mailto links where the model allows email.

## Availability and navigation rules

`selectContentAvailability` is the sole section visibility decision. `getAvailableNavigationItems` consumes the same object. `HomePage` renders the Hero unconditionally and each other section only when its matching availability flag is true. Presentational sections receive already-selected data and do not calculate their own visibility.

- Home is always available and has a matching `#home` target.
- About requires a non-empty biography. `shortIntroduction` appears in Hero, so it does not create a redundant About section by itself. Name, headline, and location alone do not create About.
- Skills, Projects and Research require at least one meaningful published record, using the existing feature selectors.
- Experience requires a meaningful published education or experience record.
- Contact requires a published social link with a non-empty label and safe URL.
- Draft-only and incomplete records are excluded by selectors.

The Project selector supplies published projects. Featured projects are shown first in configured order; remaining published projects follow. No section ID is included in navigation unless its section is rendered.

## Responsive behavior and accessibility

Sections use the existing semantic design tokens, content width and spacing scale. The Hero uses an editorial two-column layout on wide screens and stacks at the existing 760 px breakpoint. Record grids use intrinsic `auto-fit` sizing; at narrow widths they become a single column. Images retain their source aspect ratio, project covers use a 16:9 frame, and variable content wraps without fixed card heights.

The page keeps a single `h1`, semantic sections with heading associations, native links, list markup, the shared skip link and visible focus rings. The conceptual diagram has a text alternative that names its relationship; its labels remain visible without connector colors. Hover styles are capability-gated. No entrance animation or animation dependency was added; existing reduced-motion behavior remains in force.

The shared Phase 3 navigation retains its disclosure button, Escape handling, focus return and link close behavior. Theme selection remains owned by the existing System/Light/Dark provider.

## Empty-content behavior

With the current empty registry, the public page renders the neutral Hero and its approved conceptual diagram. About, Skills, Projects, Research, Experience and Contact are absent, and Home is the only navigation target. No sample records, placeholder descriptions, contact URLs or personal facts are published. The neutral page title is structural UI text, not profile data.

The old `CoreLayoutPreview` is retained in source for reference, but App no longer uses it. It remains explicitly a development preview and is not part of the public homepage.

## Adding verified content

Add factual records to the typed modules in `src/content/`:

1. Add only owner-verified values to `profile.ts`; Profile fields are optional. A biography enables About, while a short introduction is shown in Hero.
2. Add published Skills and their categories to `skills.ts` and `skillCategories.ts`. Use stable IDs and existing category IDs; no rating or proficiency is inferred.
3. Add Projects to `projects.ts` with stable IDs/slugs, title, short description and `visibility: 'published'`. Optional media requires accurate alt text. Add only verified links and technologies/tags.
4. Add Research, Education and Experience records to their existing content modules. Use ISO date strings and `endDate: null` for ongoing records; leave unsupported optional details absent.
5. Add SocialLinks to `socialLinks.ts` with a verified destination and label. The Contact section only uses selector-approved links.
6. Keep draft records out of rendered output by setting `visibility: 'draft'`; selectors are the public visibility boundary.

The aggregate `portfolioContent` in `src/content/index.ts` updates automatically as these modules change. Run `npm run typecheck`, `npm run test:content` and `npm run build` after authoring. The explicit content validator in `src/content/validate.ts` can be used to inspect IDs, dates, URLs and references.

## Adding a new section

Add a typed feature selector if one is needed, update `ContentAvailability` and `selectContentAvailability`, add the matching candidate ID/label in `src/components/layout/navigation.ts`, create a focused section component under `src/components/sections/`, then add its conditional composition in `HomePage`. Use the exact same availability key for the section and navigation so no dead anchor can appear. Add fixtures for empty, draft and published states to `scripts/content.test.mjs`. Do not add a new route or dependency for a section.

## Known limitations

- Profile data has no publish flag; Profile fields are owner-authored and treated as verified only when populated.
- The Hero’s conceptual diagram is static. The profile image path is accepted when `src` and alt text are non-empty; asset existence is not checked at render time.
- Dates are shown as ISO year-month slices rather than localized dates.
- No project detail route, search, filtering, pagination, CMS, backend or contact form is included.
- Real browser inspection, screen-reader testing, physical-device review, computed contrast checks, and 320 px/200% zoom overflow checks remain necessary before release.
