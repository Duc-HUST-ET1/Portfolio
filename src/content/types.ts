import type { Education } from '../features/education/types';
import type { Experience } from '../features/experience/types';
import type { Profile } from '../features/profile/types';
import type { Project, ProjectCategory } from '../features/projects/types';
import type { ResearchItem } from '../features/research/types';
import type { SocialLink } from '../features/socialLinks/types';
import type { Skill, SkillCategory } from '../features/skills/types';

export type PortfolioContent = {
  profile: Profile;
  projects: readonly Project[];
  projectCategories: readonly ProjectCategory[];
  skills: readonly Skill[];
  skillCategories: readonly SkillCategory[];
  research: readonly ResearchItem[];
  education: readonly Education[];
  experience: readonly Experience[];
  socialLinks: readonly SocialLink[];
};
