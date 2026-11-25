import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';
import { renderToStaticMarkup } from 'react-dom/server';

let vite;
let projects;
let skills;
let research;
let availability;
let validation;
let registry;
let homepage;
let navigation;

before(async () => {
  vite = await createServer({ configFile: false, appType: 'custom', server: { middlewareMode: true, hmr: false, ws: false } });
  projects = await vite.ssrLoadModule('/src/features/projects/selectors.ts');
  skills = await vite.ssrLoadModule('/src/features/skills/selectors.ts');
  research = await vite.ssrLoadModule('/src/features/research/selectors.ts');
  availability = await vite.ssrLoadModule('/src/features/contentAvailability/selectors.ts');
  validation = await vite.ssrLoadModule('/src/content/validate.ts');
  registry = await vite.ssrLoadModule('/src/content/index.ts');
  homepage = await vite.ssrLoadModule('/src/pages/HomePage.tsx');
  navigation = await vite.ssrLoadModule('/src/components/layout/navigation.ts');
});

after(async () => { await vite?.close(); });

const emptyContent = {
  profile: {}, projects: [], projectCategories: [], skills: [], skillCategories: [],
  research: [], education: [], experience: [], socialLinks: [],
};

test('empty registry and selectors are safe; home remains available', () => {
  assert.deepEqual(registry.portfolioContent, emptyContent);
  assert.equal(Object.hasOwn(registry, 'templateContent'), false);
  assert.deepEqual(projects.selectPublishedProjects([]), []);
  assert.deepEqual(projects.selectFeaturedProjects([]), []);
  assert.deepEqual(skills.selectPublishedSkills([]), []);
  assert.deepEqual(research.selectResearchForProject([], 'missing'), []);
  assert.deepEqual(availability.selectContentAvailability(emptyContent), {
    home: true, about: false, skills: false, projects: false, research: false, experience: false, contact: false,
  });
  assert.deepEqual(validation.validatePortfolioContent(emptyContent), []);
});

test('published project selectors filter drafts and support sorting and facets', () => {
  const records = [
    { id: 'b', slug: 'bravo', title: 'Bravo', shortDescription: 'B', visibility: 'published', featured: true, featuredOrder: 2, categoryId: 'infra', tags: ['Cloud'], technologies: ['TypeScript'] },
    { id: 'a', slug: 'alpha', title: 'Alpha', shortDescription: 'A', visibility: 'published', featured: true, featuredOrder: 1, categoryId: 'infra', tags: ['systems'], technologies: ['Linux'] },
    { id: 'draft', slug: 'draft', title: 'Draft', shortDescription: 'Hidden', visibility: 'draft', categoryId: 'infra', tags: ['cloud'], technologies: ['Linux'] },
  ];
  assert.deepEqual(projects.selectPublishedProjects(records).map(({ id }) => id), ['b', 'a']);
  assert.deepEqual(projects.selectFeaturedProjects(records).map(({ id }) => id), ['a', 'b']);
  assert.deepEqual(projects.selectProjectsByCategory(records, 'infra').map(({ id }) => id), ['b', 'a']);
  assert.deepEqual(projects.selectProjectsByTag(records, 'CLOUD').map(({ id }) => id), ['b']);
  assert.deepEqual(projects.selectProjectsByTechnology(records, 'linux').map(({ id }) => id), ['a']);
});

test('research, category and content availability selectors use published meaningful records', () => {
  const projectsList = [{ id: 'p', slug: 'p', title: 'P', shortDescription: 'P', visibility: 'published' }];
  const items = [
    { id: 'r', title: 'R', visibility: 'published', relatedProjectIds: ['p'] },
    { id: 'draft', title: 'D', visibility: 'draft', relatedProjectIds: ['p'] },
  ];
  assert.deepEqual(research.selectResearchForProject(items, 'p').map(({ id }) => id), ['r']);
  const content = { ...emptyContent, projects: projectsList, research: items, skills: [{ id: 's', name: 'Skill', visibility: 'published' }] };
  assert.deepEqual(availability.selectContentAvailability(content), {
    home: true, about: false, skills: true, projects: true, research: true, experience: false, contact: false,
  });
  assert.deepEqual(availability.selectContentAvailability({
    ...emptyContent,
    socialLinks: [{ id: 'unsafe', platform: 'other', label: 'Unsafe', href: 'javascript:alert(1)', visibility: 'published' }],
  }).contact, false);
});

test('about availability requires profile prose instead of identity metadata', () => {
  assert.equal(availability.selectContentAvailability({ ...emptyContent, profile: { name: 'Verified Name', headline: 'Verified Role', location: 'Verified Place' } }).about, false);
  assert.equal(availability.selectContentAvailability({ ...emptyContent, profile: { shortIntroduction: 'Shown in Hero.' } }).about, false);
  assert.equal(availability.selectContentAvailability({ ...emptyContent, profile: { biography: 'Verified biography.' } }).about, true);
});

test('homepage renders only Home with an empty registry and keeps navigation targets valid', () => {
  const selected = availability.selectContentAvailability(emptyContent);
  const markup = renderToStaticMarkup(ReactElement(homepage.HomePage({ content: emptyContent, availability: selected })));
  const nav = navigation.getAvailableNavigationItems(selected);
  assert.match(markup, /id="home"/);
  assert.match(markup, />Portfolio</);
  assert.doesNotMatch(markup, /id="(about|skills|projects|research|experience|contact)"/);
  for (const item of nav) assert.match(markup, new RegExp(`id="${item.id}"`));
  assert.deepEqual(nav.map(({ id }) => id), ['home']);
});

test('homepage renders multiple published records, hides drafts, and omits invalid optional links', () => {
  const content = {
    ...emptyContent,
    profile: { name: 'Verified Name', shortIntroduction: 'Verified introduction.' },
    projects: [
      { id: 'p1', slug: 'one', title: 'Project One', shortDescription: 'Summary one', visibility: 'published', featured: true },
      { id: 'p2', slug: 'two', title: 'Project Two', shortDescription: 'Summary two', visibility: 'published', links: [{ id: 'unsafe', label: 'Unsafe', href: 'javascript:alert(1)', kind: 'other' }] },
      { id: 'draft', slug: 'draft', title: 'Draft Project', shortDescription: 'Hidden', visibility: 'draft' },
    ],
    skillCategories: [
      { id: 'systems', title: 'Systems category', visibility: 'published', order: 1 },
      { id: 'delivery', title: 'Delivery category', visibility: 'published', order: 2 },
    ],
    skills: [
      { id: 's1', name: 'Verified Skill One', visibility: 'published', categoryId: 'systems' },
      { id: 's2', name: 'Verified Skill Two', visibility: 'published', categoryId: 'delivery' },
      { id: 'sd', name: 'Draft Skill', visibility: 'draft' },
    ],
    research: [
      { id: 'r1', title: 'Verified Research One', visibility: 'published', publication: { venue: 'Verified venue' }, relatedProjectIds: ['p1'] },
      { id: 'r2', title: 'Verified Research Two', visibility: 'published' },
      { id: 'rd', title: 'Draft Research', visibility: 'draft' },
    ],
    experience: [
      { id: 'e1', organization: 'Verified Org', role: 'Verified Role', visibility: 'published', startDate: '2025-01-01', endDate: null },
      { id: 'e2', organization: 'Another Verified Org', role: 'Another Verified Role', visibility: 'published' },
      { id: 'ed', organization: 'Draft Org', role: 'Draft Role', visibility: 'draft' },
    ],
    education: [
      { id: 'edu1', institution: 'Verified Institution One', program: 'Verified Program One', visibility: 'published', endDate: null },
      { id: 'edu2', institution: 'Verified Institution Two', program: 'Verified Program Two', visibility: 'published' },
    ],
    socialLinks: [
      { id: 'social1', platform: 'website', label: 'Verified website', href: 'https://example.com', visibility: 'published', target: 'new-tab' },
      { id: 'social2', platform: 'email', label: 'Verified email', href: 'mailto:owner@example.com', visibility: 'published' },
      { id: 'social-draft', platform: 'other', label: 'Draft social', href: 'https://example.org', visibility: 'draft' },
      { id: 'social-empty-mail', platform: 'email', label: 'Invalid email', href: 'mailto:', visibility: 'published' },
    ],
  };
  const selected = availability.selectContentAvailability(content);
  const markup = renderToStaticMarkup(ReactElement(homepage.HomePage({ content, availability: selected })));
  const nav = navigation.getAvailableNavigationItems(selected);
  assert.match(markup, /Project One/);
  assert.match(markup, /Project Two/);
  assert.match(markup, /Verified Skill One/);
  assert.match(markup, /Verified Skill Two/);
  assert.match(markup, /Systems category/);
  assert.match(markup, /Delivery category/);
  assert.match(markup, /Verified Research One/);
  assert.match(markup, /Verified Research Two/);
  assert.match(markup, /Related projects: Project One/);
  assert.match(markup, /Verified Program One/);
  assert.match(markup, /Verified Program Two/);
  assert.match(markup, /Another Verified Role/);
  assert.match(markup, /Verified website/);
  assert.match(markup, /Verified email/);
  assert.match(markup, /Present/);
  assert.doesNotMatch(markup, /Draft Project|Draft Skill|Draft Research|Draft Org|Draft social|Invalid email|javascript:alert/);
  assert.match(markup, /rel="noopener noreferrer"/);
  for (const item of nav) assert.match(markup, new RegExp(`id="${item.id}"`));
  assert.doesNotMatch(markup, /href="javascript:/);
});

test('many project records render from data without fixed-count assumptions', () => {
  const records = Array.from({ length: 40 }, (_, index) => ({
    id: `project-${index}`,
    slug: `project-${index}`,
    title: `Project ${index}`,
    shortDescription: `Summary ${index}`,
    visibility: 'published',
  }));
  const content = { ...emptyContent, projects: records };
  const selected = availability.selectContentAvailability(content);
  const markup = renderToStaticMarkup(ReactElement(homepage.HomePage({ content, availability: selected })));
  assert.equal((markup.match(/<article class="project-card/g) ?? []).length, records.length);
});

test('validator catches malformed visibility, published records, link metadata, and image paths', () => {
  const issues = validation.validatePortfolioContent({
    ...emptyContent,
    profile: { name: '  ' },
    projectCategories: [{ id: 'category', title: ' ', visibility: 'published' }],
    projects: [{
      id: 'project', slug: 'good-slug', title: 'Project', shortDescription: 'Summary', visibility: 'public',
      tags: ['  '],
      coverImage: { src: '//assets.example/image.png', alt: 'Image', width: 0 },
      links: [{ id: 'repo', label: ' ', href: 'https://example.com', kind: 'github' }],
    }],
    skills: [{ id: 'skill', name: 'Skill', visibility: 'hidden' }],
    research: [{ id: 'research', title: 'Research', visibility: 'published' }],
    education: [{ id: 'education', institution: ' ', program: ' ', visibility: 'published' }],
    experience: [{ id: 'experience', organization: ' ', role: ' ', visibility: 'published' }],
    socialLinks: [{ id: 'email', platform: 'email', label: 'Email', href: 'mailto:', visibility: 'published', order: -1 }],
  });
  const byPath = new Map(issues.map(({ code, path }) => [`${code}:${path}`, true]));
  for (const expected of [
    'invalid-visibility:projects[0].visibility',
    'empty-value:profile.name',
    'empty-value:projects[0].tags[0]',
    'invalid-visibility:skills[0].visibility',
    'incomplete-published-record:projectCategories[0].title',
    'empty-link-label:projects[0].links[0].label',
    'invalid-image-path:projects[0].coverImage.src',
    'invalid-image-dimensions:projects[0].coverImage.width',
    'incomplete-published-record:education[0]',
    'incomplete-published-record:experience[0]',
    'invalid-url:socialLinks[0].href',
    'invalid-order:socialLinks[0].order',
  ]) assert.ok(byPath.has(expected), `Expected ${expected}`);
});

function ReactElement(element) { return element; }

test('integrity validation reports duplicate identifiers, unsafe URLs, missing references and date errors', () => {
  const content = {
    ...emptyContent,
    projectCategories: [{ id: 'cat', title: 'Category', visibility: 'published' }],
    projects: [
      { id: 'p', slug: 'same', title: 'P', shortDescription: 'P', visibility: 'published', categoryId: 'missing', featured: true, featuredOrder: -1, startDate: '2025-02-30', links: [{ id: 'bad', label: 'Bad', href: 'javascript:alert(1)', kind: 'other' }] },
      { id: 'p', slug: 'same', title: 'Q', shortDescription: 'Q', visibility: 'draft' },
    ],
    research: [{ id: 'r', title: 'R', visibility: 'published', relatedProjectIds: ['missing'] }],
  };
  const codes = validation.validatePortfolioContent(content).map(({ code }) => code);
  for (const code of ['duplicate-id', 'duplicate-slug', 'missing-project-category', 'invalid-featured-order', 'invalid-date', 'invalid-url', 'missing-project-reference']) {
    assert.ok(codes.includes(code), `Expected ${code}`);
  }
});
