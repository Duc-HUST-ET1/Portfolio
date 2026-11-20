import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

let vite;
let projects;
let skills;
let research;
let availability;
let validation;
let registry;

before(async () => {
  vite = await createServer({ configFile: false, appType: 'custom', server: { middlewareMode: true, hmr: false } });
  projects = await vite.ssrLoadModule('/src/features/projects/selectors.ts');
  skills = await vite.ssrLoadModule('/src/features/skills/selectors.ts');
  research = await vite.ssrLoadModule('/src/features/research/selectors.ts');
  availability = await vite.ssrLoadModule('/src/features/contentAvailability/selectors.ts');
  validation = await vite.ssrLoadModule('/src/content/validate.ts');
  registry = await vite.ssrLoadModule('/src/content/index.ts');
});

after(async () => { await vite?.close(); });

const emptyContent = {
  profile: {}, projects: [], projectCategories: [], skills: [], skillCategories: [],
  research: [], education: [], experience: [], socialLinks: [],
};

test('empty registry and selectors are safe; home remains available', () => {
  assert.deepEqual(registry.portfolioContent.projects, []);
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
