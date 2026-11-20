import type { Project } from './types';

const normalize = (value: string) => value.normalize('NFKC').trim().toLocaleLowerCase('en');

export const selectPublishedProjects = (projects: readonly Project[]) =>
  projects.filter((project) => project.visibility === 'published' && project.title.trim() && project.shortDescription.trim());

export const selectFeaturedProjects = (projects: readonly Project[]) =>
  selectPublishedProjects(projects)
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER) || a.id.localeCompare(b.id));

export const selectProjectsByCategory = (projects: readonly Project[], categoryId: string) =>
  selectPublishedProjects(projects).filter((project) => project.categoryId === categoryId);

export const selectProjectsByTag = (projects: readonly Project[], tag: string) =>
  selectPublishedProjects(projects).filter((project) => project.tags?.some((value) => normalize(value) === normalize(tag)));

export const selectProjectsByTechnology = (projects: readonly Project[], technology: string) =>
  selectPublishedProjects(projects).filter((project) => project.technologies?.some((value) => normalize(value) === normalize(technology)));

