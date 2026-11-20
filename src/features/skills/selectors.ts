import type { Skill, SkillCategory } from './types';
import { byOrderThenId } from '../shared/selectors';

export const selectPublishedSkills = (skills: readonly Skill[]) =>
  skills.filter((skill) => skill.visibility === 'published' && skill.name.trim()).sort(byOrderThenId);

export const selectSkillsByCategory = (skills: readonly Skill[], categoryId: string) =>
  selectPublishedSkills(skills).filter((skill) => skill.categoryId === categoryId);

export const selectPublishedSkillCategories = (categories: readonly SkillCategory[], skills: readonly Skill[]) => {
  const used = new Set(selectPublishedSkills(skills).flatMap((skill) => skill.categoryId ? [skill.categoryId] : []));
  return categories.filter((category) => category.visibility === 'published' && category.title.trim() && used.has(category.id)).sort(byOrderThenId);
};
