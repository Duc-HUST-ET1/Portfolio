import type { Visibility } from '../shared/types';

export type SkillCategory = {
  id: string;
  title: string;
  visibility: Visibility;
  description?: string;
  order?: number;
};

export type Skill = {
  id: string;
  name: string;
  visibility: Visibility;
  description?: string;
  categoryId?: string;
  iconId?: string;
  relatedProjectIds?: readonly string[];
  order?: number;
};
