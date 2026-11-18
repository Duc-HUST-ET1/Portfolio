# Skill Usage Plan for the DevOps / System Engineer Portfolio

## 1. Project overview

### Stated brief

- **Purpose:** a professional personal portfolio for DevOps Engineer / System Engineer opportunities, with particular interest in Japanese companies.
- **Intended stack:** React 19, Vite, TypeScript, HTML5, and CSS3.
- **Desired evidence:** technical ability, engineering maturity, projects, research, and professional credibility.

### Repository inspection

At inspection time, the working tree contains Git metadata and agent/environment metadata, but no visible application files. There is no `package.json`, `src/`, `public/`, `index.html`, route configuration, stylesheet, asset, TypeScript/Vite configuration, README, or existing `docs/` directory to inspect. Git reports an unborn `main` branch with no commits. Therefore:

- The technology and objective above are treated as user-provided requirements, not independently verified implementation facts.
- There is no current component architecture or visual system to preserve or critique.
- This plan is a proposed foundation, not a description of existing UI.
- Re-run repository discovery before implementation; the project may need to be populated or the intended checkout clarified.

### Skill inspection method and result

All 16 named directories and `SKILL.md` files under `/home/trananhduc_20233337/.agents/skills/` were found and read. Each skill's purpose, hard rules, workflow, and output expectations were reviewed. Referenced companion files were checked for existence. They are listed below; their detailed recipes/catalogues/templates were not needed to determine whether the skills apply to this analysis and should be opened when the matching implementation/review task is actually selected.

## 2. Complete audit of all 16 skills

“Active invocation” means explicitly bringing that skill's workflow into a later task. It does not mean adding its code or package by default.

| Skill | Actual purpose and core rules from `SKILL.md` | Fit and potential portfolio use | Actively invoke? |
| --- | --- | --- | --- |
| **animate** | Implements a requested web animation. First decide whether motion is warranted and name its purpose; use the cheapest fitting tool, existing tokens, exact properties/curves, reduced-motion handling, and hover capability gating. Avoid `transition: all`, layout animation, and motion without purpose. Companion: `RECIPES.md`. | **Conditional.** Use for a specific useful web interaction, e.g. press feedback or a state transition. Most portfolio content is static and should not be animated merely for decoration. | **Only when a concrete motion request exists.** Read its recipe file for a matching pattern. |
| **animate-expo** | Builds React Native / Expo animation using Reanimated, Gesture Handler and native primitives. Gestures run on the UI runtime, preserve velocity, avoid per-frame React state, use reduced-motion support and real-device release builds. Companion: `RECIPES.md`. | **Irrelevant to the stated web stack.** React Native/Expo, haptics, and native navigation are outside this Vite website. | **No** unless the project becomes an Expo app. |
| **animation-performance** | Diagnoses frame drops by identifying animated properties, rendering work, main-thread contention, per-frame React renders, inherited CSS-variable recalculation, blur cost, and only then appropriate `will-change`. Verify with performance recordings and representative hardware. | **Conditional.** Useful if real motion is janky or the site has a costly moving hero effect; likely unnecessary for a restrained static portfolio. | **Only after observed or measured performance issues**, or when selecting a driver for busy-page motion. |
| **animation-vocabulary** | Maps a user's informal description to names in its curated motion glossary; stay within the glossary and keep answers concise. | **Low relevance.** Can help name a desired effect during design discussion; it does not design or implement the portfolio. | **Only if terminology clarification is needed.** |
| **apple-design** | Applies fluid-interface principles: immediate response, direct manipulation, interruptibility, velocity handoff and momentum projection for gestures, spatially consistent paths/origins, soft boundaries, restrained translucent materials, accessible reduced-motion/transparency/contrast modes, optical typography, and eight foundations: purpose, agency, responsibility, familiarity, flexibility, simplicity, craft, delight. | **Relevant as a principles framework.** Especially useful for clarity, responsive feedback, typography, accessibility and intentional restraint. Gesture physics and translucent chrome should be used only if the chosen design has an actual gesture/floating surface; a portfolio does not require them. | **Yes, as the high-level design lens.** Do not interpret “Apple-style” as a requirement to imitate Apple visuals or add motion. |
| **ask-sonner** | Guides integration, API use, styling and troubleshooting of Sonner toasts. One root-mounted `<Toaster />`, client-side calls, escalation from defaults to headless styling, and remedies for duplication, stacking, theme and mobile issues. Companion: `API.md`. | **Usually irrelevant.** A portfolio's primary interactions are navigation and external/contact links; it need not have notifications. If a real async form or copy action uses Sonner, this skill applies. | **No by default.** Invoke only if Sonner is already selected or an actual toast behavior is requested; read `API.md` for exact API details. |
| **break-ui** | Stress-tests a UI using plausible worst-case data at its data boundary, including empty/one/large states and content edge cases; uses a dev-only toggle, checks widths/zoom/modes, reports breaks before fixing. Companion: `CATALOG.md`. | **Relevant later to project/research cards and profile details.** Long Japanese/English titles, organization names, URLs, missing optional media, unusual counts and empty sections can expose fragile layouts. This skill's specific dataset/toggle workflow is heavier than needed for every simple page. | **Yes, selectively** for content-dense cards or components with variable data; inspect `CATALOG.md` when running it. |
| **emil-design-eng** | Guides detailed UI craft, responsive button feedback, component details, purposeful animation, easing/duration, interruptibility, performance, accessibility and cohesion. A code review must use a Before/After table. | **Strongly relevant.** Use for layout hierarchy, small interaction details, component polish and restrained motion. Treat its concrete animation prescriptions as relevant only when animation is justified. | **Yes, alongside apple-design for implementation and design review.** |
| **find-animation-opportunities** | Read-only sweep for a few high-confidence motion opportunities. Every candidate must pass frequency, purpose, speed and function gates; reject decorative motion on data; report candidates and deliberate rejections. | **Low/conditional.** Could review a completed homepage for whether any transitions clarify state. Its output is an opportunity report, not implementation. On an ordinary portfolio, it may correctly recommend little or no motion. | **Only if explicitly asking what to animate.** |
| **improve-animations** | Read-only audit and planning for an existing motion system; recon, audit, evidence-based prioritization, then self-contained plans only after selection. References: `AUDIT.md`, `PLAN-TEMPLATE.md`. The skill describes using read-only subagents for large repos, but that is unnecessary for this currently empty repository. | **Not currently applicable** because no UI or motion exists. Useful if the finished site accumulates many animations and needs an audit. | **No now.** Use after a meaningful motion surface exists and an animation audit is requested. |
| **mobile-native** | Makes a web app work naturally on phones: capability-based hover gating, tap feedback, viewport units, safe areas, touch actions, zoom-safe inputs, scroll behavior, theme color and real-device verification. Do not disable zoom or use UA sniffing. | **Strongly relevant.** The portfolio must read and navigate well on phones; this is a web skill and complements responsive design. Some app-shell rules (for example suppressing pull-to-refresh) should not be applied to a normal scrolling document without reason. | **Yes, for mobile-specific review/implementation.** Test on actual phone hardware before claiming native-feeling touch behavior. |
| **pick-ui-library** | A curated lookup for choosing a library for a concrete UI need. It first checks `package.json`, recommends one fitting library, and discourages dependency churn. It maps accessible primitives to Base UI, toasts to Sonner, motion to Motion, etc. | **Low/conditional.** There is no need for a library just to build semantic portfolio sections, cards, or links. Useful if a real dialog/menu/toast/chart/drag/virtualization requirement appears. | **Only when a specific component need arises.** Check the actual manifest first; do not install preemptively. |
| **prototype** | Creates three genuinely distinct working variants in an isolated prototype surface and picker; variants share project context/tokens, production code stays untouched until user selection. Companion: `PICKER.md`. | **Useful but optional** for comparing materially different homepage directions (e.g. editorial, systems-console-inspired, conventional portfolio) before committing. The repo is currently empty, so a standalone prototype branch is possible only once a design exploration is requested. | **Only when the user wants visual alternatives or an interactive design exploration.** Read `PICKER.md` before using. |
| **remove-animations** | Removes or reduces unjustified motion and cleans orphaned animation code, checking hidden-state, callbacks, focus, layout shifts and tests. It only subtracts, never retunes or adds; asks before removing an animation dependency. | **Conditional.** Useful if a later version feels over-animated, especially if scroll reveals, loops or hover movement accumulate. Nothing exists to remove today. | **Only when excessive motion is a stated problem.** |
| **review-animations** | Specialized review of motion diffs against ten strict standards: purpose/frequency, easing/duration, physical origin, interruptibility, transform/opacity performance, accessibility and cohesion. Findings must be a Before/After table plus an explicit verdict. Companion: `STANDARDS.md`. | **Conditional.** A valuable final review for any nontrivial motion. Not a general visual, content, or code review. | **Yes, after motion is implemented.** Read `STANDARDS.md` for exact reviewed values. |
| **write-swift** | Modern Swift guidance for value modeling, Swift 6 concurrency and isolation, protocols/generics, API design, performance/ARC, testing, macros, interop and migration. | **Irrelevant to React/Vite/TypeScript/CSS.** It must not influence the site's frontend architecture. | **No** unless a separate Swift app or tool is added to scope. |

## 3. Skill classification

| Classification | Skills | Why they belong here |
| --- | --- | --- |
| **Core design skills** | `apple-design`, `emil-design-eng` | Apple Design supplies product-level principles; Emil Design Engineering translates craft into detailed UI and interaction decisions. |
| **UI and component engineering skills** | `pick-ui-library`, `ask-sonner`, `break-ui`, `prototype` | They cover component/dependency selection, toast behavior, adversarial content checks and alternative visual implementations. All are conditional; a portfolio can avoid most component libraries. |
| **Responsive and mobile skills** | `mobile-native`, `break-ui` | Mobile Native addresses web platform behavior on phones; Break UI checks content/layout resilience across viewport and data extremes. |
| **Animation and interaction skills** | `animate`, `animate-expo`, `animation-vocabulary`, `find-animation-opportunities` | They implement web motion, implement native motion, name a motion effect, or identify possible web motion. Expo-specific `animate-expo` is out of stack. |
| **Animation review and optimization skills** | `review-animations`, `improve-animations`, `remove-animations`, `animation-performance` | They have distinct roles: review a diff, audit/plan a system, subtract excess motion, or diagnose frame performance. Do not treat them as interchangeable. |
| **Optional or irrelevant** | `write-swift`; `animate-expo` for this web project; `ask-sonner`, `pick-ui-library`, `animation-vocabulary`, `find-animation-opportunities`, `improve-animations`, `remove-animations` unless their trigger condition occurs | A skill being installed is not a reason to force it into the product. |

### Relationships and boundaries

- Start with **apple-design** for human needs, predictability, agency, clarity and accessibility; use **emil-design-eng** to carry those choices into component-level polish. They overlap on restraint, feedback and craft, but neither requires adding motion everywhere.
- **prototype** is an exploration step, not a permanent architecture. Keep explorations isolated and only promote a direction after a choice.
- **mobile-native** complements both design skills by checking browser and touch platform details; it does not replace responsive layout design or motion design.
- **break-ui** is a content stress pass after real sections and representative data exist. It complements, rather than substitutes for, accessibility and responsive review.
- For motion: **find-animation-opportunities** proposes only; **animate** implements a chosen web interaction; **review-animations** checks a motion diff; **animation-performance** investigates jank; **improve-animations** audits an existing motion system and plans work; **remove-animations** subtracts unnecessary motion. **animation-vocabulary** only names effects.
- **animate-expo** is the native counterpart to `animate`, but is not a web fallback. **ask-sonner** and **pick-ui-library** are driven by actual component needs, not visual ambition.

## 4. Skill collaboration matrix

| Work phase / need | Primary skill | Pair with | Avoid / boundary |
| --- | --- | --- | --- |
| Establish portfolio principles and hierarchy | `apple-design` | `emil-design-eng` | Do not copy an Apple aesthetic or add gestures/translucency without a functional reason. |
| Compare homepage concepts before implementation | `prototype` | `apple-design`, `emil-design-eng` | Keep variant code isolated. Use only when distinct directions would help a real choice. |
| Implement desktop/mobile interface | `emil-design-eng` | `mobile-native` | No separate animation system unless the design needs it. |
| Add one meaningful web interaction | `animate` | `apple-design`, then `review-animations` | `animate-expo` is for React Native. Keep simple states in CSS. |
| Check responsive content and visual resilience | `mobile-native` | `break-ui` | Test capability queries, not device names; do not create a dev toggle for trivial static content. |
| Stress project/research cards | `break-ui` | `mobile-native` | Use realistic, schema-backed values; report decisions before fixes. |
| Select a dialog/toast/menu/library | `pick-ui-library` | `ask-sonner` if Sonner is selected | Inspect the manifest before recommending a dependency; avoid dependencies for simple links/cards. |
| Audit existing animation system | `improve-animations` | `review-animations`, `animation-performance` as needed | No audit possible until source code and motion exist. |
| Review a motion diff | `review-animations` | `animation-performance` if jank is observed | Not a general design review. |
| Reduce over-animation | `remove-animations` | `improve-animations` for motion that remains but is poorly built | Removal skill must not retune kept animation. |
| Clarify a motion term | `animation-vocabulary` | `animate` if implementation follows | Glossary returns names only; it does not validate a design. |
| Build native app motion | `animate-expo` | Not applicable to this web-only stack | Do not use for Vite website. |
| Swift work | `write-swift` | None for this project | Out of scope. |

## 5. Recommended skill invocation workflow

1. **Confirm the intended checkout and discover source files.** The present repository has no application. Before coding, verify the user wants this exact empty checkout populated or that the project files will be made available.
2. **Resolve content and language requirements.** Gather only factual profile material: name/title, actual projects, actual role/contribution, dates, research, education, skills, links, and preferred contact channel. Decide English, Japanese, or bilingual presentation; do not infer Japanese fluency or career history from the target market.
3. **Set the design foundation.** Use `apple-design` for purpose, agency, familiarity, flexibility, simplicity, responsibility, craft and delight; use `emil-design-eng` for hierarchy, typography and component detail. Choose a visual direction consistent with real work samples.
4. **Explore only if it helps.** If visual direction is unsettled, invoke `prototype` for three distinct homepage directions in an isolated surface. Compare the cost of each and wait for the user's choice before promotion.
5. **Implement core content and responsive structure.** Use semantic React components and plain CSS unless a concrete interaction requires a library. Apply `mobile-native` to mobile viewport, hover, touch and safe-area concerns when relevant.
6. **Stress real variable content.** Invoke `break-ui` on project/research cards or other components with real varying data. Use realistic Japanese/English title lengths, long URLs, absent optional images and empty states. Keep its dev-only switch out of production.
7. **Add motion only for a named purpose.** If motion is selected, invoke `animate`; then use `review-animations`. Bring in `animation-performance` only for a real jank/driver concern. If motion proliferates, use `improve-animations` for a read-only audit or `remove-animations` if the user asks to reduce it.
8. **Select external UI packages only when needed.** Use `pick-ui-library` after the relevant feature is established and check the actual manifest first. Use `ask-sonner` only if Sonner is actually part of a toast workflow.
9. **Do not invoke out-of-scope skills.** `animate-expo` and `write-swift` remain unused for the stated stack; `animation-vocabulary` is an occasional terminology helper.

## 6. Portfolio design principles

1. **Make the candidate's fit quickly legible.** The first viewport should identify role direction, technical focus, and a useful next action.
2. **Show evidence, not a technology cloud.** Organize skills around demonstrable work. Explain constraints, decisions, tradeoffs, operational approach and outcomes only where supported by real details.
3. **Favor reliability and clarity over visual spectacle.** A restrained systems-oriented visual language can imply care and structure, but avoid faux terminals, uptime claims, fake dashboards or decoration presented as proof.
4. **Keep visitor agency.** Use real links and direct section labels; let visitors move to projects, research or contact without forced scroll interactions or modal funnels.
5. **Make the common path simple.** Put key evidence and contact access in the main page. Keep secondary detail one navigation step away rather than hiding important information behind interaction.
6. **Use consistent spatial and type systems.** Deliberate spacing, alignment, line length, typography and color contrasts communicate engineering care.
7. **Support more people and contexts.** Keyboard, screen reader, zoom, reduced-motion, touch and narrow-screen use are baseline design inputs.
8. **Keep claims auditable.** Mark personal contribution, team context, dates, tooling and results precisely; do not fabricate or inflate them.
9. **Treat Japanese-market targeting as a content decision.** Professional presentation may benefit from a Japanese version, but translation quality, language proficiency and hiring conventions need the user's confirmation and accurate copy.

## 7. Proposed design direction

### Visual direction

Use a **calm technical editorial** direction: a light, high-legibility base with a dark or ink-like text color, a restrained single accent, generous but controlled whitespace, fine separators, and compact technical metadata. Let project diagrams, screenshots, architecture drawings, or repository links carry the technical character when authentic assets exist. Avoid making the site look like a fabricated terminal or a generic cloud dashboard.

### Typography system

- Start with a system sans-serif stack for dependable rendering and excellent CJK fallback. If a custom face is later selected, verify Japanese glyph coverage, licensing, loading impact and fallback metrics.
- Use a responsive display size with `clamp()` and tight but readable heading leading; make tracking size-specific (large headings may be slightly negative, small labels slightly positive, body near normal).
- Keep body copy comfortably readable with approximately 1.5 line-height. Test Vietnamese/Japanese glyphs and diacritics for clipping; avoid fixed-height text boxes.
- Use a monospace face only for short technical metadata or code. Long prose and project descriptions should remain in a readable proportional face.
- Build hierarchy through size, weight, line-height and spacing together. Keep all sizing and spacing compatible with browser zoom and text enlargement.

### Color system

- Define semantic tokens for page background, surface, primary text, secondary text, border, accent, focus ring, success/status and link states.
- Use one restrained accent for primary actions, selected navigation and small technical highlights. Validate contrast for text, controls and focus indicators.
- Choose whether dark mode is needed based on audience and implementation scope. If supported, ensure diagrams, images, code snippets and browser theme color follow it; do not add a theme toggle unless both schemes are complete.
- Avoid translucent navigation as a default. If used, retain strong text contrast over changing content and provide a solid/frosted fallback for reduced transparency.

### Spacing and layout

- Use a small spacing scale with values expressed in `rem` and/or CSS custom-property steps; avoid arbitrary per-component gaps.
- Use a centered, readable content column with a wider maximum width only for project grids or diagrams. Keep prose line length moderate.
- Prefer CSS Grid/Flexbox and intrinsic sizing (`minmax(0, 1fr)`, `min-width: 0`) so long titles and URLs do not force overflow.
- Use responsive `clamp()` for fluid margins and heading sizes. Reflow columns into a single column on narrow screens rather than shrinking text.
- Treat images and diagrams as content: preserve aspect ratio, provide text alternatives, and do not rely on color alone to convey architecture or state.

## 8. Section-by-section recommendations

| Section | Recommendation | Credibility and interaction notes |
| --- | --- | --- |
| **Navigation** | Compact header with the person's name/mark and specific anchor links such as Projects, Research, Experience, About, Contact. Keep it lightweight; optionally sticky only if it helps long-page orientation. | Real anchors, visible focus, working skip link, no scroll trapping. If sticky/translucent, keep overlap and legibility under control. |
| **Hero** | Name, exact target role wording, one concise factual positioning statement, and primary links to featured work/contact. A short availability or location line only if accurate and desired. | No auto-typing effect or full-screen animated background. Use a clear `<h1>`, meaningful link labels, and enough content to identify the candidate without scrolling. |
| **About** | Short narrative connecting systems/reliability interests to the person's actual approach and current direction. | Avoid generic claims such as “passionate” without evidence. First person is acceptable; keep language direct. |
| **Technical skills** | Group skills by capability (e.g. infrastructure/cloud, automation/IaC, CI/CD, observability/reliability, operating systems/networking, programming) and list only tools the person can substantiate. | Pair skill groups with project evidence. Avoid self-rating bars, invented proficiency percentages, and an undifferentiated logo wall. |
| **Featured projects** | Lead with a small number of strongest real projects. Each entry: context/problem, scope and constraints, personal contribution, architecture/approach, tradeoffs, result/evidence, stack and repository/demo links. | State team vs individual work and what is public. Do not claim production uptime, scale or impact without evidence. Provide stable image aspect ratios and text descriptions. |
| **Research / publications** | Include research topic, question, method, contribution, status/date and links to papers, posters, code or presentation when real. Separate published, submitted, in progress and planned work accurately. | Distinguish research from implementation projects; don't invent publication status. |
| **Education and experience** | Use a simple reverse-chronological timeline or grouped entries with institution/employer, dates, role/degree and relevant evidence. | Include only confirmed entries. Use clear date formatting and ensure the layout handles long Japanese institution names. |
| **Contact** | Provide a direct preferred contact method and relevant professional profiles, with descriptive accessible links. | Do not invent email, availability, social accounts or phone. A simple mail link may be enough; a form adds validation, spam handling and privacy obligations. |
| **Footer** | Minimal copyright/name and optional concise return-to-top link. | Avoid duplicated navigation clutter and decorative status text that implies unsupported live systems. |

## 9. Responsive and accessibility requirements

- Use semantic landmarks (`header`, `nav`, `main`, sections with headings, `footer`), one clear page-level `h1`, and logical heading order.
- Make every action keyboard operable with visible focus. Use native links and buttons according to their function; do not use clickable generic containers.
- Ensure contrast for text, links, borders needed to identify controls and focus indicators. Do not rely only on color, hover or animation for state.
- Keep content usable at 320 CSS pixels and at 200% zoom; check long Japanese/English text, long project names, URLs, tags, missing images and uneven card lengths.
- Use flexible widths, `min-width: 0`, wrapping rules and content-sized buttons. Do not truncate essential project titles or contact details without another way to access the full text.
- Keep touch targets comfortably operable (aim for approximately 44 CSS px where practical). Provide `:active` response. Gate hover styles with `(hover: hover) and (pointer: fine)`; avoid user-agent sniffing.
- If the page has a normal document scroll, preserve expected browser scrolling and pull-to-refresh. Add `overscroll-behavior: none` only for an app-like surface that needs it.
- Use `100svh` for a hero only if a viewport-height hero is actually desired; avoid forcing content into the viewport. Use `100dvh` for app shells, not as a default marketing-page hero height.
- Respect text resizing and browser zoom. Never disable zoom with `user-scalable=no` or `maximum-scale=1`.
- Honor `prefers-reduced-motion`; consider `prefers-reduced-transparency` if using blur and `prefers-contrast: more` for surfaces.
- If using `viewport-fit=cover`, pair it with safe-area insets for fixed controls; ordinary document content does not need edge-to-edge positioning by default.
- Use a meaningful page title, description, language metadata (`lang` matching the actual primary content), descriptive link text and appropriate alt text. For bilingual content, identify language changes programmatically.
- Test with keyboard-only navigation, a screen reader pass, browser zoom, narrow viewport and a real phone. Device emulation alone cannot verify sticky hover, safe areas, browser chrome or touch feel.

## 10. Animation policy

1. **Default to still content.** Motion is optional. Do not delay access to project evidence with staged entrances, scroll reveal, typewriter text, counters, parallax or looping decoration.
2. **Require a purpose.** A candidate animation must communicate feedback, state, spatial relationship, prevent a jarring change, explain something, or deliver rare delight. “Looks modern” is insufficient.
3. **Favor low-cost CSS transitions** for small press/color states. If used, animate named properties, primarily `transform`/`opacity`, use concise durations appropriate to frequency, and keep existing tokens consistent. Do not add a motion library for simple feedback.
4. **Keep controls immediate.** A press state should respond at pointer/touch down. Hover is supplementary and capability-gated; touch must have its own usable feedback.
5. **Use springs only for real gesture-driven motion.** A portfolio ordinarily has no reason for a draggable drawer or momentum carousel. If one is introduced, maintain direct tracking, capture, offset, interruption, velocity handoff, boundaries and symmetric spatial paths.
6. **Reduced motion is part of the feature.** Replace movement/parallax/springs with a short opacity/color transition or a stable state; do not hide content when animation is skipped.
7. **Treat translucent surfaces carefully.** No blur-for-decoration; verify contrast over every background and provide solid alternatives for reduced-transparency/contrast preferences.
8. **Review any nontrivial motion** with `review-animations`; use `animation-performance` only when measurements or symptoms justify diagnosis. Real-device review is required for gesture or mobile-feel claims.

## 11. Implementation recommendations

These are recommendations for a future implementation; nothing has been built or configured in the current repository.

- First confirm or restore the actual project files. Then inspect the real `package.json`, Vite entry points, `src/`, CSS, assets and configuration before choosing component boundaries or installing packages.
- For a single-page portfolio, begin with semantic sections and a small number of focused React components. Keep factual content in typed data objects only if that improves maintainability; avoid premature state management, routing or CMS architecture.
- Use ordinary anchor links for same-page navigation and external destinations. Add a router only if the site genuinely has multiple independently navigable pages.
- Use CSS custom properties for color, typography, spacing, border and motion tokens; use CSS Grid/Flexbox and content-driven sizing. Do not introduce a styling framework solely for this small site.
- Build with progressive enhancement: meaningful content should render without client-side animation and should remain visible if JavaScript motion fails.
- Consider Japanese localization only after deciding the language strategy and obtaining reviewed copy. A language toggle should preserve the equivalent section/page and expose its current language accessibly.
- Do not add charts, uptime widgets, cloud diagrams, activity numbers, badges or terminal output unless they represent real, attributable work and are maintained.
- Before publishing, verify links and downloadable files, image optimization/alt text, page metadata, mobile layout, readability, reduced-motion behavior, and that every claim is true. This plan intentionally does not run builds or tests because the repository has no application files and the task is analysis-only.

## 12. Risks, limitations, and unresolved questions

### Known limitations

- The active checkout currently provides no source from which to verify the declared stack, architecture, existing content or assets. The skill recommendations are based on full skill documentation and the stated brief; project-specific implementation advice remains provisional.
- No personal details, sample projects, employment, education, research outputs, results or contact information were supplied. The recommendations intentionally leave these factual fields to the user.
- The Japanese-company target does not establish Japanese-language fluency, preferred language, visa/location status, or familiarity with specific hiring practices.
- Some skills are broad or overlap. Their workflows should be invoked only when the task trigger matches; installing packages or creating interactions because a skill mentions them would be unnecessary scope.
- Browser support for newer CSS entry mechanisms and transparency preferences should be checked against an explicit support target if those are selected.

### Decisions to resolve before implementation

1. Is `/home/trananhduc_20233337/portfolio` the intended working copy, and should its missing application files be restored/provided before implementation?
2. Should the portfolio be English-only, Japanese-only, or bilingual? If Japanese is included, who will review translation quality?
3. What verified profile facts and real project/research materials should appear (including contributions, dates, outcomes, repository links and images)?
4. Which contact and professional profile links are safe and preferred to publish?
5. Is the primary visual direction above acceptable, or should a prototype compare alternatives?
6. Are dark mode, a downloadable CV, a contact form, or custom photography/illustration in scope? Each should be included only if useful and supportable.

## 13. Verification checklist

### Audit completeness

- [x] Verified all 16 requested skill directories exist.
- [x] Verified and read all 16 requested `SKILL.md` files.
- [x] Recorded purpose, key rules/workflow, fit, possible use and invocation guidance for every skill.
- [x] Checked existence of referenced companions: `animate/RECIPES.md`, `animate-expo/RECIPES.md`, `ask-sonner/API.md`, `break-ui/CATALOG.md`, `improve-animations/AUDIT.md`, `improve-animations/PLAN-TEMPLATE.md`, `prototype/PICKER.md`, `review-animations/STANDARDS.md`.
- [x] Did not read companion references that are only required when the corresponding component or audit is selected; open them before applying those detailed workflows.

### Project inspection

- [x] Inspected the working tree and Git status.
- [x] Confirmed no visible `package.json`, `src/`, `public/`, `index.html`, app components/styles/assets, routes, or TypeScript/Vite configuration are present.
- [x] Marked stack and objective as user-stated context rather than repository-verified facts.

### Future implementation verification

- [ ] Confirm the correct project checkout and actual stack before implementation.
- [ ] Populate only verified personal/professional information; verify each claim and link.
- [ ] Check semantic structure, keyboard access, focus visibility, contrast, reduced motion and text zoom.
- [ ] Check 320px, 200% zoom, long bilingual strings and missing optional media.
- [ ] Test mobile behavior on physical hardware if mobile-native behavior is claimed.
- [ ] Review nontrivial motion with the appropriate animation skills; otherwise keep the page still and immediate.
- [ ] Have Japanese copy reviewed if a Japanese version is published.

---

**Scope note:** This document is the only requested deliverable created for the audit. No source code, styles, configuration, dependencies, packages or user data were changed.
