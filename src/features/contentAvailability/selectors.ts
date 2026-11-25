import type { PortfolioContent } from '../../content/types';
import { selectPublishedEducation } from '../education/selectors';
import { selectPublishedExperience } from '../experience/selectors';
import { selectPublishedProjects } from '../projects/selectors';
import { selectPublishedResearch } from '../research/selectors';
import { selectAvailableSocialLinks } from '../socialLinks/selectors';
import { selectPublishedSkills } from '../skills/selectors';
import type { ContentAvailability } from './types';

export function selectContentAvailability(content: PortfolioContent): ContentAvailability {
  const profile = content.profile;
  // Identity and metadata belong in the hero; About needs actual introductory prose.
  // shortIntroduction is already presented in the Hero; About owns the longer biography.
  const hasAbout = [profile.biography]
    .some((value) => typeof value === 'string' && value.trim().length > 0);
  return {
    home: true,
    about: hasAbout,
    skills: selectPublishedSkills(content.skills).length > 0,
    projects: selectPublishedProjects(content.projects).length > 0,
    research: selectPublishedResearch(content.research).length > 0,
    experience: selectPublishedEducation(content.education).length > 0 || selectPublishedExperience(content.experience).length > 0,
    contact: selectAvailableSocialLinks(content.socialLinks).length > 0,
  };
}
