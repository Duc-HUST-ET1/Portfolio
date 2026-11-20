import type { Education } from './types';

export const selectPublishedEducation = (items: readonly Education[]) =>
  items.filter((item) => item.visibility === 'published' && item.institution.trim() && item.program.trim());
