import type { ResearchItem } from './types';

export const selectPublishedResearch = (items: readonly ResearchItem[]) =>
  items.filter((item) => item.visibility === 'published' && item.title.trim());

export const selectResearchForProject = (items: readonly ResearchItem[], projectId: string) =>
  selectPublishedResearch(items).filter((item) => item.relatedProjectIds?.includes(projectId));
