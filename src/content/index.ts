import { education } from './education';
import { experience } from './experience';
import { profile } from './profile';
import { projectCategories } from './projectCategories';
import { projects } from './projects';
import { research } from './research';
import { skillCategories } from './skillCategories';
import { skills } from './skills';
import { socialLinks } from './socialLinks';
import type { PortfolioContent } from './types';

export type { PortfolioContent } from './types';
export const portfolioContent: PortfolioContent = {
  profile, projects, projectCategories, skills, skillCategories,
  research, education, experience, socialLinks,
};
