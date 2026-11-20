import type { Experience } from './types';

export const selectPublishedExperience = (items: readonly Experience[]) =>
  items.filter((item) => item.visibility === 'published' && item.organization.trim() && item.role.trim());
