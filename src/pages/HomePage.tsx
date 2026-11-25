import { selectPublishedEducation } from '../features/education/selectors';
import { selectPublishedExperience } from '../features/experience/selectors';
import { selectFeaturedProjects, selectPublishedProjects } from '../features/projects/selectors';
import { selectPublishedResearch } from '../features/research/selectors';
import { selectPublishedSkillCategories, selectPublishedSkills } from '../features/skills/selectors';
import { selectAvailableSocialLinks } from '../features/socialLinks/selectors';
import type { PortfolioContent } from '../content/types';
import type { ContentAvailability } from '../features/contentAvailability/types';
import { AboutSection } from '../components/sections/AboutSection';
import { ContactSection } from '../components/sections/ContactSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { HeroSection } from '../components/sections/HeroSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ResearchSection } from '../components/sections/ResearchSection';
import { SkillsSection, type SkillGroupData } from '../components/sections/SkillsSection';

type HomePageProps = { content: PortfolioContent; availability: ContentAvailability };

export function HomePage({ content, availability }: HomePageProps) {
  const projects = selectPublishedProjects(content.projects);
  const featured = selectFeaturedProjects(content.projects);
  const orderedProjects = [...featured, ...projects.filter((project) => !project.featured)];
  const skills = selectPublishedSkills(content.skills);
  const categories = selectPublishedSkillCategories(content.skillCategories, skills);
  const categorizedIds = new Set<string>();
  const skillGroups: SkillGroupData[] = categories.map((category) => {
    const records = skills.filter((skill) => skill.categoryId === category.id);
    records.forEach((skill) => categorizedIds.add(skill.id));
    return { category, skills: records };
  });
  const ungrouped = skills.filter((skill) => !categorizedIds.has(skill.id));
  if (ungrouped.length) skillGroups.push({ skills: ungrouped });

  return <>
    <HeroSection profile={content.profile} />
    {availability.about && <AboutSection profile={content.profile} />}
    {availability.skills && <SkillsSection groups={skillGroups} />}
    {availability.projects && <ProjectsSection projects={orderedProjects} />}
    {availability.research && <ResearchSection items={selectPublishedResearch(content.research)} projects={projects} />}
    {availability.experience && <ExperienceSection experience={selectPublishedExperience(content.experience)} education={selectPublishedEducation(content.education)} />}
    {availability.contact && <ContactSection links={selectAvailableSocialLinks(content.socialLinks)} />}
  </>;
}
