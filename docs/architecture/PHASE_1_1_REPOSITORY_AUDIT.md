# Phase 1.1 — Portfolio Repository Audit & Architecture Analysis

**Audit date:** 2026-11-04  
**Scope:** Read-only repository and architecture audit, except for creation of this document.  
**Status:** No application implementation was performed.

## 1. Current repository status

### Verified facts

- The current branch is **main**, with no commits yet. The repository has no tracked baseline.
- Before this report was added, the only files discoverable outside Git and environment metadata were:
  - docs/SKILL_USAGE_PLAN.md
  - prototypes/hybrid-systems.html
  - prototypes/portfolio-concepts.html
  - prototypes/portfolio-concepts.backup.html
- All currently visible files are untracked. The audit deliverable is the only file created by this phase.
- There is no package.json, lockfile, node_modules directory, src/, public/, root index.html, Vite config, TypeScript config, README, or AGENTS.md in the current checkout.
- Consequently, there is no repository-verifiable runtime, dependency set, npm script, source CSS strategy, test/lint workflow, or existing application architecture.
- The brief names React + Vite + TypeScript as the intended technology direction. That is a user requirement, not an existing verified stack.
- The IDE tabs mentioned in earlier context (such as README.md, package.json, and TypeScript config) do not match files present in this checkout at audit time.
- docs/SKILL_USAGE_PLAN.md is available and has been read completely. Its repository snapshot predates the current prototype artifacts, so its statement that no docs directory existed is historical. Its statement that there was no application source remains consistent with this audit.

### Existing prototype artifacts

- prototypes/portfolio-concepts.html is the current single Hybrid Systems prototype. It contains standalone HTML, inline CSS, and inline JavaScript for page rendering, theme selection, navigation, and reveal behavior.
- prototypes/hybrid-systems.html is another standalone Hybrid prototype with similar sections and theme behavior, plus a one-choice prototype picker and replay control.
- prototypes/portfolio-concepts.backup.html is a preserved three-concept comparison prototype with concept renderers and picker logic. Its presence is intentional backup, not production code.
- The prototypes demonstrate the approved English, single-page, technical editorial direction, light/dark palettes, conceptual systems diagram, placeholder content, and responsive CSS. They are design references only and do not establish production component boundaries or a working React architecture.
- The current checkout contains duplicated Hybrid presentation content across two prototype files, and an older concept comparison backup. A canonical prototype should be named before implementation so future reviews and migration do not drift.

## 2. Existing technology stack

| Area | Repository evidence | Audit conclusion |
| --- | --- | --- |
| React | No package manifest or source files | Intended, not installed or verified |
| Vite | No config, entry HTML, scripts, or dependency manifest | Intended, not installed or verified |
| TypeScript | No tsconfig or TS/TSX files | Intended, not installed or verified |
| HTML/CSS/JavaScript | Inline markup, styles, and script in prototype HTML files | Present only in isolated design prototypes |
| Dependencies | No manifest, lockfile, or node_modules | Cannot inventory; none are established by this checkout |
| Tooling | No scripts/configurations found | No verified development, build, lint, typecheck, or test workflow |

No dependency version should be inferred from the prototype files or IDE tabs.

## 3. Existing file and folder structure

Visible tree at the start of the audit (the requested report is added under docs/architecture/):

    portfolio/
    ├── docs/
    │   └── SKILL_USAGE_PLAN.md
    └── prototypes/
        ├── hybrid-systems.html
        ├── portfolio-concepts.backup.html
        └── portfolio-concepts.html

Git metadata exists, but the current main branch has no commit. Environment metadata directories are not application source and are not part of the proposed app architecture.

## 4. Problems and technical risks

### Current repository blockers

1. **No runnable app:** there is no manifest, entry point, source tree, Vite config, or TypeScript config. A production implementation cannot be audited or continued from these artifacts without first establishing the app.
2. **No dependency or script inventory:** dependency recommendations must remain provisional until the intended package manifest is restored or created in a later approved phase.
3. **No tracked baseline:** all visible project artifacts are untracked and the branch is unborn. This makes provenance and change review harder; preserve the prototypes and document the initial project state before implementation.
4. **Prototype duplication:** two files contain similar Hybrid page concepts. Keeping both as equally authoritative risks visual and content drift. The backup is explicitly archival and should remain distinguishable from the canonical prototype.
5. **Prototype implementation is not production architecture:** inline styling and JavaScript template-string rendering are appropriate to a standalone demo, but should not be copied wholesale into a React app. Content is placeholder text and the examples do not constitute verified project data.
6. **Facts are not available:** no verified profile, project, education, employment, research, skill evidence, or contact details are present. Keep placeholders until supplied; do not let architecture examples become published claims.
7. **Localization is unresolved:** English is the current approved language. Japanese-market audience does not establish Japanese fluency or approved translation copy.
8. **Hosting behavior is unknown:** future detail-page routes may require host fallback/rewrites. No deployment target is present, so this cannot be configured or verified now.

### Risks to avoid in a future implementation

- A single large App component that owns page composition, project data, theme state, filtering, and routing.
- Hardcoding one project or skill card per JSX block, which makes content changes require presentation edits.
- Adding a router, CMS, API client, state library, CSS framework, animation library, or i18n package before a real feature requires it.
- Putting placeholder claims, fake metrics, unsupported proficiency labels, fake external links, or simulated infrastructure status in production.
- Building Japanese support by translating UI labels alone while leaving project content, dates, navigation, and accessibility language metadata inconsistent.
- Treating the current static demo as proof of mobile behavior; phone-specific viewport and touch behavior require device testing.

## 5. Architecture goals

The first implementation should be a focused single-page portfolio that:

- Presents the approved Hybrid Systems technical editorial design and all approved content sections.
- Stores repeatable content as data so adding, removing, editing, featuring, categorizing, or tagging projects does not require rewriting card components.
- Separates page composition, reusable presentation, domain data, types, theme state, and domain-specific behavior.
- Uses semantic HTML and accessible native interactions by default.
- Supports the agreed light/dark themes and responsive layouts.
- Leaves clear extension points for project detail pages, filtering, bilingual content, a technical blog, analytics, and a CMS/API, without implementing those features prematurely.

## 6. Proposed architectural principles

1. **Start with the smallest working app.** Set up React, Vite, and TypeScript only after the user authorizes the implementation phase and confirms this checkout. Keep the initial page static and data-driven.
2. **Compose the homepage from named sections.** Keep App responsible for top-level providers and page routing/composition; keep section composition in HomePage; keep individual section markup in focused components.
3. **Model content once.** Render project and skill lists from typed arrays and stable IDs. Featured status, categories, tags, and project references should be fields, not separate hardcoded components.
4. **Keep UI and domain behavior distinct.** ProjectCard displays a project. Project selectors/filter functions choose which projects are displayed. Content editing does not belong in the card.
5. **Use native browser behavior first.** Use anchors for page sections and links, buttons for state changes, details/summary only where disclosure is meaningful, and CSS Grid/Flexbox for layout.
6. **Keep abstractions proportional.** A small theme provider/hook may centralize a shared preference. Avoid global state libraries or generic “frameworks” for a mostly static portfolio.
7. **Make accessibility part of component contracts.** Preserve heading order, keyboard access, visible focus, readable contrast, reduced-motion support, mobile touch targets, zoom, and non-color ways to understand the diagram.
8. **Keep the approved visual tokens semantic.** Define theme-level colors, typography, spacing, border, and focus tokens centrally; sections should consume semantic variables rather than repeat hex values.
9. **Make external content boundaries explicit.** Local TypeScript content is sufficient initially. If a CMS/API is introduced later, map and validate that input at an adapter boundary rather than making view components depend on a provider’s raw schema.
10. **Treat prototypes as references.** Keep standalone explorations outside src/ and do not import them into the app.

## 7. Proposed folder structure

A modest initial structure:

    src/
    ├── app/
    │   ├── App.tsx
    │   └── providers/
    │       └── ThemeProvider.tsx
    ├── components/
    │   ├── layout/
    │   │   ├── SiteHeader.tsx
    │   │   ├── SiteFooter.tsx
    │   │   └── SkipLink.tsx
    │   └── ui/
    │       └── ThemeToggle.tsx
    ├── pages/
    │   └── HomePage.tsx
    ├── sections/
    │   ├── HeroSection.tsx
    │   ├── AboutSection.tsx
    │   ├── SkillsSection.tsx
    │   ├── ProjectsSection.tsx
    │   ├── ResearchSection.tsx
    │   ├── ExperienceSection.tsx
    │   └── ContactSection.tsx
    ├── features/
    │   ├── projects/
    │   │   ├── ProjectCard.tsx
    │   │   ├── ProjectList.tsx
    │   │   ├── projectSelectors.ts
    │   │   └── types.ts
    │   ├── skills/
    │   │   ├── SkillGroup.tsx
    │   │   └── types.ts
    │   └── research/
    │       └── types.ts
    ├── content/
    │   ├── profile.ts
    │   ├── projects.ts
    │   ├── skills.ts
    │   ├── research.ts
    │   ├── education.ts
    │   ├── experience.ts
    │   └── socialLinks.ts
    ├── hooks/
    │   └── useTheme.ts
    └── styles/
        ├── tokens.css
        ├── global.css
        └── theme.css

    prototypes/
    docs/
    index.html
    vite.config.ts
    tsconfig.json

This is a starting map, not a requirement to create every file immediately. Co-locate small feature-specific components and styles where that is easier to follow. Do not create empty folders for future CMS, blog, routes, analytics, or localization work.

### Responsibilities of major modules

| Module | Responsibility |
| --- | --- |
| app/App | Root shell, shared providers, and route outlet when routing exists |
| pages/HomePage | Compose the single-page sections in logical reading order |
| sections | Present one page section; receive content via props/imported data, not duplicate records |
| components/layout | Shared site framing, landmarks, skip link, footer, and navigation |
| components/ui | Small reusable controls with a clear interaction/accessibility contract |
| features/projects | Project model, project list/card rendering, featured selection, category/tag filtering logic when introduced |
| features/skills | Skill-domain presentation and typed associations |
| features/research | Research item structure and presentation |
| content | Placeholder/current authored portfolio records; no component markup |
| hooks / ThemeProvider | Shared theme preference and theme toggle state; keep DOM persistence details centralized |
| styles | Semantic color and spacing tokens, base styles, and theme selectors |
| prototypes | Isolated HTML design artifacts; never production imports |
| docs | Design, architecture, and implementation notes that explain repository decisions |

## 8. Proposed content data model

Use stable string IDs and slugs for references and future URLs. Keep content optional only when the presentation can omit it cleanly. Do not use a proficiency score unless the owner supplies a defensible scale and evidence.

### TypeScript shape examples

All bracketed values below are literal placeholders. They are examples only and must not be published as personal or project facts.

    export type ProjectLink = {
      label: string;
      href: string; // "[Verified repository, demo, or publication URL]"
    };

    export type Project = {
      id: string;                 // "[stable-project-id]"
      slug: string;               // "[future-project-url-slug]"
      title: string;              // "[Project title]"
      summary: string;            // "[Verified concise summary]"
      featured: boolean;
      categories: string[];       // ["[category]"]
      tags: string[];             // ["[verified technology or topic]"]
      problem?: string;           // "[Context, constraints, and problem]"
      approach?: string;          // "[Engineering approach and decisions]"
      contribution?: string;      // "[Verified individual contribution]"
      outcome?: string;           // "[Verified attributable outcome, if any]"
      links: ProjectLink[];
      relatedSkillIds?: string[];
    };

    export type SkillCategory = {
      id: string;                 // "[infrastructure]"
      title: string;              // "[Technical domain]"
      order: number;
    };

    export type Skill = {
      id: string;                 // "[linux-administration]"
      categoryId: string;        // "[operating-systems]"
      name: string;               // "[Technology or practice]"
      context: string;            // "[Where/how it was used, once verified]"
      relatedProjectIds?: string[];
    };

    export type ResearchItem = {
      id: string;                 // "[research-id]"
      title: string;              // "[Research topic]"
      status: "in-progress" | "submitted" | "published" | "completed";
      objective: string;          // "[Research question or objective]"
      method?: string;            // "[Verified method]"
      contribution?: string;      // "[Verified contribution and collaborators]"
      dateLabel?: string;         // "[Verified date or date range]"
      links: ProjectLink[];
    };

    export type Education = {
      id: string;                 // "[education-id]"
      institution: string;        // "[Institution]"
      qualification: string;      // "[Degree or qualification]"
      field?: string;             // "[Field of study]"
      startDate?: string;         // "[YYYY-MM]"
      endDate?: string | null;    // "[YYYY-MM or null if ongoing]"
      details?: string;           // "[Verified relevant detail]"
    };

    export type Experience = {
      id: string;                 // "[experience-id]"
      organization: string;       // "[Organization]"
      role: string;               // "[Role]"
      startDate: string;          // "[YYYY-MM]"
      endDate?: string;           // "[YYYY-MM or omit if current]"
      summary: string;            // "[Verified scope and responsibilities]"
      projectIds?: string[];
    };

    export type SocialLink = {
      id: string;                 // "[github-profile]"
      platform: "github" | "linkedin" | "website" | "other";
      label: string;              // "[Public display label]"
      href: string;               // "[Verified external URL]"
      order: number;
    };

    export type Profile = {
      name: string;               // "[Your Name]"
      headline: string;           // "[DevOps Engineer / System Engineer]"
      introduction: string;      // "[Verified professional introduction]"
      location?: string;          // "[Optional verified location]"
      email?: string;             // "[Optional verified email]"
      socialLinks: SocialLink[];
    };

### Data model guidance

- Store as many project records as needed in content/projects.ts and render using map; feature logic should filter/sort records by fields rather than encode a fixed count.
- Use a separate category list and tags. Categories express a small navigable taxonomy; tags are flexible labels. Keep both controlled by data.
- Use project IDs for skill/research cross-references rather than duplicating project names in multiple records.
- Featured projects are a boolean or explicit rank. If there may be several, prefer featuredRank or a separate featured-order field over assuming exactly one.
- Keep external links as labeled data and validate protocols/URLs before rendering. Never create a link from placeholder text.
- Skill records have context and evidence references, not an inferred “expert/advanced” classification. Add ratings only by explicit owner decision.
- Research status is an enum to make its meaning consistent. Do not mark publication or completion without evidence.
- Validate local data with TypeScript’s compile-time checking initially. Runtime schema validation is only needed when data comes from an external or editable boundary.
- Keep the example types near the domain that owns them. A single shared types file is suitable only for truly cross-domain primitives such as DateRange or Link.

## 9. TypeScript type organization

- Start with feature-owned types: project types in features/projects/types.ts, skill types in features/skills/types.ts, and research types in features/research/types.ts.
- Put shared, cross-domain concepts (Profile, SocialLink, common external link) in a small shared content type module only if they are used by more than one feature.
- Type local content objects with the feature types and TypeScript’s satisfies operator so literals remain narrow while structural mistakes are caught.
- Enable strict TypeScript options when the project is initialized. Do not add generic schemas for hand-authored local objects without a runtime validation need.
- Add runtime parsing/validation at future CMS/API input boundaries, not throughout presentational components.

## 10. Theme and styling architecture

- Keep the approved palette as semantic CSS custom properties: background, surface, muted surface, primary, accent, text, muted text, border, focus ring, diagram line/grid, and action foreground.
- Put shared spacing/type/radius tokens in styles/tokens.css and theme-specific color values in styles/theme.css. Keep base document and typography rules in styles/global.css.
- Use a root data-theme attribute or a class on the app root. Components should consume semantic tokens and must not branch on literal palette values.
- Default to the operating-system color preference. Persist an explicit user selection in localStorage; initialize before React paints if needed to avoid a theme flash. Update theme-color metadata to match the active surface.
- Keep theme toggle a real button, keyboard accessible, visibly focused, and announced with an accurate label/pressed state.
- Check text, controls, borders, diagrams, focus indicators, hover/active states, and browser chrome in both themes. Do not use orange as small text unless the contrast of that specific token is verified.
- Prefer the agreed system font stack initially. If selecting a custom font later, check font licensing, CJK glyph coverage, download cost, and fallback metrics.
- Use CSS Grid/Flexbox with intrinsic sizing, min-width: 0, wrapping, and content-driven height. Do not clip long names, localized text, tags, or URLs.
- Keep hover rules behind capability queries. Preserve touch press feedback, visible keyboard focus, browser zoom, and prefers-reduced-motion behavior.
- The current prototype declares viewport-fit=cover but has no fixed bottom UI that needs safe-area offsets. Do not carry that metadata forward automatically; retain it only if the production layout uses edge-to-edge fixed chrome and applies env(safe-area-inset-*) appropriately.

## 11. Routing strategy

### Initial release

- Use one HomePage and normal fragment links to sections. No router is required for a single document.
- Keep project slugs in the data model now so links are stable later, but do not create empty detail routes or route configuration before detail pages are approved.
- Keep section navigation URLs useful and keyboard/screen-reader accessible.

### When detail pages are approved

- Add a route layer with a route for the project index if filtering/search needs a shareable page, and a project detail route keyed by stable slug.
- Keep page composition separate from feature data and components. A project detail page should query the same project record as the homepage.
- Configure the hosting provider’s SPA fallback or static route output and test refresh/deep links. No deployment provider is currently known.
- If search engines, static pages, or content growth make client-only routing insufficient, revisit the rendering strategy (static generation/SSR) as a separate decision rather than preemptively switching frameworks.

## 12. Future expansion strategy

| Future need | Extension point | Defer until |
| --- | --- | --- |
| Many projects | Typed project collection and reusable list/card | First project entries are authored |
| Categories/tags | Data taxonomy and pure filtering/sorting selectors | A visitor needs to navigate a sizable collection |
| Project detail pages | Stable slug plus detail page/route reusing Project data | First project requires more space than a card |
| English/Japanese localization | Locale-specific UI messages and content records keyed by stable IDs/slugs | Japanese copy and review process are approved |
| CMS/API | Content adapter maps external records into internal domain types; validate at boundary | Manual editing becomes a real burden |
| Technical blog | Separate Post model, list/detail feature, and route family | There are actual publishable posts |
| Analytics | Small privacy-conscious integration with disclosed purpose/consent where required | The owner approves what is measured and why |
| Additional content types | Add one domain model and presentation feature per real content need | The content exists and a reader benefits from it |

The portfolio should be able to grow through new records and focused features, not a speculative plugin system or generalized content framework.

## 13. Dependency recommendations

### Verifiable current dependencies

None can be inventoried because there is no package manifest, lockfile, or node_modules directory.

### Recommendation for initial app setup

- Use only the requested baseline: React, React DOM, Vite, and TypeScript once implementation is approved and their versions are selected.
- No UI component kit is necessary for semantic sections, navigation, cards, theme control, or the conceptual diagram.
- No state-management package is justified for static content and one theme preference.
- No router is needed until multiple routes are approved.
- No animation package is justified for a restrained diagram/section effect; CSS is enough if those effects remain.
- No i18n package, CMS SDK, API client, analytics package, charting library, or contact-form service should be added before the corresponding feature and content workflow are approved.
- Reassess dependencies against the real manifest and requirements at the phase where the feature is selected. This is a recommendation, not a package change.

## 14. Migration considerations

1. Decide which Hybrid file is the canonical visual reference. Keep the comparison backup labeled as an archive; do not use its alternate themes/concepts as production direction.
2. Confirm this checkout is the intended app location. It currently has no source or app setup despite earlier IDE tabs suggesting otherwise.
3. Once authorized, create or restore the minimal React/Vite/TypeScript application and document the selected versions/scripts.
4. Translate the approved palette and spacing into semantic CSS tokens before extracting sections.
5. Build the structural shell and navigation first, then add section components in reading order.
6. Move placeholder copy into typed content data and render repeated items from collections. Replace placeholders only from user-provided verified facts.
7. Keep all prototype files outside src/ and avoid copying their template-string innerHTML rendering technique into React.
8. Add accessibility and responsive checks as the components are introduced; add real device review for mobile-specific behavior.
9. Add project routes or filters only after the user confirms content volume and desired visitor workflow.
10. Establish a tracked baseline and reviewable changes through the user’s normal repository process; this audit does not create commits.

## 15. Open questions and decisions requiring approval

1. Is this exact checkout the intended implementation target, despite the absence of application files and the mismatch with the IDE tabs?
2. Should Phase 2 establish a fresh React/Vite/TypeScript app here, or will the existing application files be restored?
3. Which Hybrid prototype should be canonical: prototypes/portfolio-concepts.html or prototypes/hybrid-systems.html? The former is currently picker-free; the latter retains single-variant picker/replay chrome.
4. Is the initial product English-only? The current approved content language is English; a Japanese version needs reviewed copy and a decision about language switching and URLs.
5. Should theme preference follow the OS and persist a manual override? The recommendation is OS default plus persisted explicit selection.
6. What verified profile, project, skill evidence, research, education, experience, and contact data may be used in a later content phase?
7. Are project detail pages, filtering/search, a technical blog, a CMS/API, analytics, a contact form, downloadable CV, or custom assets approved for later phases? None is needed to establish the first page.
8. Which deployment host and URL strategy should be used if detail routes are later added? No hosting choice is currently visible.

## 16. Relevant Agent Skills

The paths below were checked under /home/trananhduc_20233337/.agents/skills/ and the relevant guidance was read. No repository-audit or frontend-architecture-specific skill is installed; the repository inspection and architecture proposal are based on the verified files and this brief.

| Skill | Status in this audit | How it influenced this document |
| --- | --- | --- |
| apple-design | Read and applied as a design/accessibility lens | Keep hierarchy purposeful, navigation direct, interaction state immediate, and motion restrained; preserve agency, contrast, and reduced-motion support. Gesture physics and translucent chrome are not architectural requirements for this site. |
| emil-design-eng | Read and applied as a craft lens | Prefer clear component responsibilities, named interaction states, small purposeful motion, and no motion/dependency added just for polish. |
| mobile-native | Read and applied to responsive implementation planning | Use capability queries, touch-sized controls, safe-area metadata only when needed, zoom-safe patterns, and verify mobile claims on real hardware. |
| break-ui | Read; not activated as a UI stress-test workflow | Its schema-backed long-text, missing-field, empty-list, and localized-content cases inform later checks once real content and components exist. No test toggle was added during this audit. |
| prototype | Read; not activated to create variants | The current work audits and reconciles existing artifacts; it does not create new alternatives. Prototypes remain isolated from production source. |
| animate | Installed; conditional, not invoked | Only needed if a concrete web animation is selected for implementation. The current phase adds no motion. |
| review-animations | Installed; conditional, not invoked | Use for a focused motion review after implementation; this architecture audit is not a motion-diff review. |
| animation-performance | Installed; not applicable now | No jank symptom or performance recording exists to diagnose. Use only if performance symptoms are observed. |
| pick-ui-library | Installed; not applicable now | No component-library requirement exists; semantic native controls suffice for the planned first page. |
| Other listed skills | As recorded in docs/SKILL_USAGE_PLAN.md | Their triggers do not match this web architecture audit; notably animate-expo and write-swift are outside the target stack. |

All skills described as relevant or conditional above were verified at their installed paths. The 16-skill audit and invocation criteria remain in docs/SKILL_USAGE_PLAN.md.

## 17. Limitations and verification

- This is a source and structure audit only. There is no application to build, run, typecheck, lint, test, or profile.
- No browser rendering or mobile hardware review was performed for this architecture task.
- Dependency versions, hosting behavior, current package APIs, and deployment constraints remain unknown.
- Prototype visual behavior is not treated as verified production behavior.
- No personal/project facts have been added. Every code example above is marked with placeholders.

## Final scope confirmation

Created file: docs/architecture/PHASE_1_1_REPOSITORY_AUDIT.md

No other file was modified by this audit. No application source, package manifest, dependency, deployment configuration, user project data, commit, or push was created or changed. No application implementation was performed.
