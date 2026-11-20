import type { PortfolioContent } from './types';

export type IntegrityIssue = {
  code: string;
  path: string;
  message: string;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
};
const validUrl = (value: string, allowMailto = false) => {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) || (allowMailto && url.protocol === 'mailto:');
  } catch { return false; }
};

export function validatePortfolioContent(content: PortfolioContent): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];
  const issue = (code: string, path: string, message: string) => issues.push({ code, path, message });
  const checkUnique = (records: readonly { id: string }[], path: string) => {
    const seen = new Set<string>();
    records.forEach((record, index) => {
      if (!record.id.trim()) issue('empty-id', `${path}[${index}].id`, 'ID must not be empty.');
      else if (seen.has(record.id)) issue('duplicate-id', `${path}[${index}].id`, `Duplicate ID: ${record.id}.`);
      seen.add(record.id);
    });
  };
  const arrays = [
    ['projects', content.projects], ['projectCategories', content.projectCategories], ['skills', content.skills],
    ['skillCategories', content.skillCategories], ['research', content.research], ['education', content.education],
    ['experience', content.experience], ['socialLinks', content.socialLinks],
  ] as const;
  arrays.forEach(([path, records]) => checkUnique(records, path));

  const projectIds = new Set(content.projects.map(({ id }) => id));
  const researchIds = new Set(content.research.map(({ id }) => id));
  const projectCategoryIds = new Set(content.projectCategories.map(({ id }) => id));
  const skillCategoryIds = new Set(content.skillCategories.map(({ id }) => id));
  const socialIds = new Set(content.socialLinks.map(({ id }) => id));
  const slugs = new Set<string>();
  content.projects.forEach((project, i) => {
    const path = `projects[${i}]`;
    if (!slugPattern.test(project.slug)) issue('invalid-slug', `${path}.slug`, 'Slug must use lowercase letters, numbers, and single hyphens.');
    if (slugs.has(project.slug)) issue('duplicate-slug', `${path}.slug`, `Duplicate slug: ${project.slug}.`);
    slugs.add(project.slug);
    if (project.visibility === 'published' && (!project.title.trim() || !project.shortDescription.trim())) issue('incomplete-published-record', path, 'Published projects need a title and short description.');
    if (project.categoryId && !projectCategoryIds.has(project.categoryId)) issue('missing-project-category', `${path}.categoryId`, `Unknown project category: ${project.categoryId}.`);
    if (project.featuredOrder !== undefined && (!Number.isInteger(project.featuredOrder) || project.featuredOrder < 0)) issue('invalid-featured-order', `${path}.featuredOrder`, 'Featured order must be a non-negative integer.');
    if (project.featuredOrder !== undefined && !project.featured) issue('order-without-featured', `${path}.featuredOrder`, 'Featured order is only valid for featured projects.');
    if (project.startDate && !isDate(project.startDate)) issue('invalid-date', `${path}.startDate`, 'Date must be a valid YYYY-MM-DD date.');
    if (project.endDate && !isDate(project.endDate)) issue('invalid-date', `${path}.endDate`, 'Date must be a valid YYYY-MM-DD date.');
    if (project.startDate && project.endDate && isDate(project.startDate) && isDate(project.endDate) && project.startDate > project.endDate) issue('invalid-date-range', path, 'End date must not precede start date.');
    project.relatedResearchIds?.forEach((id) => { if (!researchIds.has(id)) issue('missing-research-reference', `${path}.relatedResearchIds`, `Unknown research ID: ${id}.`); });
    project.relatedProjectIds?.forEach((id) => { if (!projectIds.has(id)) issue('missing-project-reference', `${path}.relatedProjectIds`, `Unknown project ID: ${id}.`); });
    project.links?.forEach((link, j) => { if (!validUrl(link.href)) issue('invalid-url', `${path}.links[${j}].href`, 'Link must be an absolute HTTP(S) URL.'); });
    [project.coverImage, ...(project.gallery ?? [])].filter(Boolean).forEach((image, j) => {
      if (!image!.alt.trim()) issue('missing-image-alt', `${path}.images[${j}].alt`, 'Meaningful images need alternative text.');
      if (!validUrl(image!.src) && !image!.src.startsWith('/')) issue('invalid-image-url', `${path}.images[${j}].src`, 'Image path must be root-relative or an absolute HTTP(S) URL.');
    });
  });
  content.projects.forEach((project, i) => {
    if (project.featured && project.featuredOrder !== undefined && content.projects.some((other, j) => j !== i && other.featured && other.featuredOrder === project.featuredOrder)) {
      issue('duplicate-featured-order', `projects[${i}].featuredOrder`, `Featured order ${project.featuredOrder} is duplicated.`);
    }
  });
  content.skills.forEach((skill, i) => {
    if (skill.visibility === 'published' && !skill.name.trim()) issue('incomplete-published-record', `skills[${i}].name`, 'Published skills need a name.');
    if (skill.categoryId && !skillCategoryIds.has(skill.categoryId)) issue('missing-skill-category', `skills[${i}].categoryId`, `Unknown skill category: ${skill.categoryId}.`);
    skill.relatedProjectIds?.forEach((id) => { if (!projectIds.has(id)) issue('missing-project-reference', `skills[${i}].relatedProjectIds`, `Unknown project ID: ${id}.`); });
  });
  content.research.forEach((item, i) => {
    if (item.visibility === 'published' && !item.title.trim()) issue('incomplete-published-record', `research[${i}].title`, 'Published research needs a title.');
    if (item.date && !isDate(item.date)) issue('invalid-date', `research[${i}].date`, 'Date must be a valid YYYY-MM-DD date.');
    item.relatedProjectIds?.forEach((id) => { if (!projectIds.has(id)) issue('missing-project-reference', `research[${i}].relatedProjectIds`, `Unknown project ID: ${id}.`); });
    item.links?.forEach((link, j) => { if (!validUrl(link.href)) issue('invalid-url', `research[${i}].links[${j}].href`, 'Link must be an absolute HTTP(S) URL.'); });
  });
  content.education.forEach((item, i) => checkDateRange(item.startDate, item.endDate, `education[${i}]`, issue));
  content.experience.forEach((item, i) => {
    checkDateRange(item.startDate, item.endDate, `experience[${i}]`, issue);
    item.relatedProjectIds?.forEach((id) => { if (!projectIds.has(id)) issue('missing-project-reference', `experience[${i}].relatedProjectIds`, `Unknown project ID: ${id}.`); });
  });
  content.socialLinks.forEach((link, i) => {
    if (!validUrl(link.href, link.platform === 'email')) issue('invalid-url', `socialLinks[${i}].href`, 'Social links must use HTTP(S); email may use mailto:.');
  });
  content.profile.socialLinkIds?.forEach((id) => { if (!socialIds.has(id)) issue('missing-social-reference', 'profile.socialLinkIds', `Unknown social link ID: ${id}.`); });
  if (content.profile.resumeLink && !validUrl(content.profile.resumeLink.href)) issue('invalid-resume-url', 'profile.resumeLink.href', 'Resume URL must be an absolute HTTP(S) URL.');
  if (content.profile.image) {
    if (!content.profile.image.alt.trim()) issue('missing-image-alt', 'profile.image.alt', 'Profile image needs alternative text.');
    if (!validUrl(content.profile.image.src) && !content.profile.image.src.startsWith('/')) issue('invalid-image-url', 'profile.image.src', 'Image path must be root-relative or an absolute HTTP(S) URL.');
  }
  return issues;
}

function checkDateRange(start: string | undefined, end: string | null | undefined, path: string, issue: (code: string, path: string, message: string) => void) {
  if (start && !isDate(start)) issue('invalid-date', `${path}.startDate`, 'Date must be a valid YYYY-MM-DD date.');
  if (end && !isDate(end)) issue('invalid-date', `${path}.endDate`, 'Date must be a valid YYYY-MM-DD date.');
  if (start && end && isDate(start) && isDate(end) && start > end) issue('invalid-date-range', path, 'End date must not precede start date.');
}
