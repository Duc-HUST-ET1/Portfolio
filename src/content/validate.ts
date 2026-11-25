import type { ExternalLink, ImageAsset, Visibility } from '../features/shared/types';
import type { PortfolioContent } from './types';

export type IntegrityIssue = {
  code: string;
  path: string;
  message: string;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const visibilityValues = new Set<Visibility>(['draft', 'published']);
const linkKinds = new Set(['github', 'demo', 'documentation', 'download', 'article', 'other']);
const targetValues = new Set(['same-tab', 'new-tab']);
const projectStatuses = new Set(['planned', 'in-progress', 'completed', 'archived']);
const publicationStatuses = new Set(['preprint', 'submitted', 'published']);
const socialPlatforms = new Set(['github', 'linkedin', 'email', 'website', 'other']);

const isDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
};

function validUrl(value: string, allowMailto = false) {
  if (!value || value !== value.trim() || /\s/.test(value)) return false;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' || url.protocol === 'http:') return Boolean(url.hostname);
    return allowMailto && url.protocol === 'mailto:' && url.pathname.includes('@') && !/\s/.test(url.pathname);
  } catch {
    return false;
  }
}

function validImagePath(value: string) {
  return validUrl(value) || (value.startsWith('/') && !value.startsWith('//') && !/[\\\s]/.test(value));
}

export function validatePortfolioContent(content: PortfolioContent): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];
  const issue = (code: string, path: string, message: string) => issues.push({ code, path, message });
  const checkUnique = (records: readonly { id: string }[], path: string) => {
    const seen = new Set<string>();
    records.forEach((record, index) => {
      const recordPath = `${path}[${index}].id`;
      if (!record.id.trim()) issue('empty-id', recordPath, 'ID must not be empty.');
      else if (record.id !== record.id.trim()) issue('invalid-id', recordPath, 'ID must not have leading or trailing whitespace.');
      else if (seen.has(record.id)) issue('duplicate-id', recordPath, `Duplicate ID: ${record.id}.`);
      seen.add(record.id);
    });
  };
  const checkVisibility = (records: readonly { visibility: string }[], path: string) => {
    records.forEach((record, index) => {
      if (!visibilityValues.has(record.visibility as Visibility)) {
        issue('invalid-visibility', `${path}[${index}].visibility`, 'Visibility must be either draft or published.');
      }
    });
  };
  const checkOptionalText = (record: Record<string, unknown>, fields: readonly string[], path: string) => {
    fields.forEach((field) => {
      const value = record[field];
      if (value !== undefined && (typeof value !== 'string' || !value.trim())) {
        issue('empty-value', `${path}.${field}`, 'Omit an optional text field when it has no value.');
      }
    });
  };
  const checkStringList = (values: readonly string[] | undefined, path: string) => {
    values?.forEach((value, index) => {
      if (!value.trim()) issue('empty-value', `${path}[${index}]`, 'List values must not be empty.');
    });
  };
  const checkOrder = (value: number | undefined, path: string) => {
    if (value !== undefined && (!Number.isInteger(value) || value < 0)) {
      issue('invalid-order', path, 'Order must be a non-negative integer.');
    }
  };
  const checkDateField = (value: string | undefined, path: string) => {
    if (value !== undefined && !isDate(value)) issue('invalid-date', path, 'Date must be a valid YYYY-MM-DD date.');
  };
  const checkDateRange = (start: string | undefined, end: string | null | undefined, path: string) => {
    checkDateField(start, `${path}.startDate`);
    if (end !== null) checkDateField(end, `${path}.endDate`);
    if (start && end && isDate(start) && isDate(end) && start > end) {
      issue('invalid-date-range', path, 'End date must not precede start date.');
    }
  };
  const checkImage = (image: ImageAsset, path: string) => {
    if (!image.alt.trim()) issue('missing-image-alt', `${path}.alt`, 'Meaningful images need alternative text.');
    if (!validImagePath(image.src)) issue('invalid-image-path', `${path}.src`, 'Image path must be root-relative or an absolute HTTP(S) URL.');
    for (const dimension of ['width', 'height'] as const) {
      const value = image[dimension];
      if (value !== undefined && (!Number.isInteger(value) || value <= 0)) {
        issue('invalid-image-dimensions', `${path}.${dimension}`, 'Image dimensions must be positive integers when provided.');
      }
    }
  };
  const checkExternalLink = (link: ExternalLink, path: string) => {
    if (!link.label.trim()) issue('empty-link-label', `${path}.label`, 'Links need a descriptive label.');
    if (!validUrl(link.href)) issue('invalid-url', `${path}.href`, 'Link must be an absolute HTTP(S) URL.');
    if (!linkKinds.has(link.kind)) issue('invalid-link-kind', `${path}.kind`, 'Link kind is not supported.');
    if (link.target !== undefined && !targetValues.has(link.target)) issue('invalid-link-target', `${path}.target`, 'Target must be same-tab or new-tab.');
  };
  const checkExternalLinks = (links: readonly ExternalLink[] | undefined, path: string) => {
    if (!links) return;
    checkUnique(links, path);
    links.forEach((link, index) => checkExternalLink(link, `${path}[${index}]`));
  };

  const collections = [
    ['projects', content.projects], ['projectCategories', content.projectCategories], ['skills', content.skills],
    ['skillCategories', content.skillCategories], ['research', content.research], ['education', content.education],
    ['experience', content.experience], ['socialLinks', content.socialLinks],
  ] as const;
  collections.forEach(([path, records]) => {
    checkUnique(records, path);
    checkVisibility(records, path);
  });

  const projectIds = new Set(content.projects.map(({ id }) => id));
  const researchIds = new Set(content.research.map(({ id }) => id));
  const projectCategoryIds = new Set(content.projectCategories.map(({ id }) => id));
  const skillCategoryIds = new Set(content.skillCategories.map(({ id }) => id));
  const socialIds = new Set(content.socialLinks.map(({ id }) => id));
  const slugs = new Set<string>();

  content.projectCategories.forEach((category, index) => {
    const path = `projectCategories[${index}]`;
    if (category.visibility === 'published' && !category.title.trim()) issue('incomplete-published-record', `${path}.title`, 'Published project categories need a title.');
    checkOptionalText(category, ['description'], path);
    checkOrder(category.order, `${path}.order`);
  });
  content.skillCategories.forEach((category, index) => {
    const path = `skillCategories[${index}]`;
    if (category.visibility === 'published' && !category.title.trim()) issue('incomplete-published-record', `${path}.title`, 'Published skill categories need a title.');
    checkOptionalText(category, ['description'], path);
    checkOrder(category.order, `${path}.order`);
  });

  content.projects.forEach((project, index) => {
    const path = `projects[${index}]`;
    if (!slugPattern.test(project.slug)) issue('invalid-slug', `${path}.slug`, 'Slug must use lowercase letters, numbers, and single hyphens.');
    if (slugs.has(project.slug)) issue('duplicate-slug', `${path}.slug`, `Duplicate slug: ${project.slug}.`);
    slugs.add(project.slug);
    if (project.visibility === 'published' && (!project.title.trim() || !project.shortDescription.trim())) {
      issue('incomplete-published-record', path, 'Published projects need a title and short description.');
    }
    checkOptionalText(project, ['longDescription', 'teamContext', 'role'], path);
    checkStringList(project.technologies, `${path}.technologies`);
    checkStringList(project.tags, `${path}.tags`);
    if (project.categoryId && !projectCategoryIds.has(project.categoryId)) issue('missing-project-category', `${path}.categoryId`, `Unknown project category: ${project.categoryId}.`);
    if (project.featuredOrder !== undefined && (!Number.isInteger(project.featuredOrder) || project.featuredOrder < 0)) issue('invalid-featured-order', `${path}.featuredOrder`, 'Featured order must be a non-negative integer.');
    if (project.featuredOrder !== undefined && !project.featured) issue('order-without-featured', `${path}.featuredOrder`, 'Featured order is only valid for featured projects.');
    checkDateField(project.startDate, `${path}.startDate`);
    checkDateField(project.endDate, `${path}.endDate`);
    if (project.startDate && project.endDate && isDate(project.startDate) && isDate(project.endDate) && project.startDate > project.endDate) issue('invalid-date-range', path, 'End date must not precede start date.');
    if (project.status !== undefined && !projectStatuses.has(project.status)) issue('invalid-project-status', `${path}.status`, 'Project status is not supported.');
    project.relatedResearchIds?.forEach((id) => { if (!researchIds.has(id)) issue('missing-research-reference', `${path}.relatedResearchIds`, `Unknown research ID: ${id}.`); });
    project.relatedProjectIds?.forEach((id) => { if (!projectIds.has(id)) issue('missing-project-reference', `${path}.relatedProjectIds`, `Unknown project ID: ${id}.`); });
    checkExternalLinks(project.links, `${path}.links`);
    if (project.coverImage) checkImage(project.coverImage, `${path}.coverImage`);
    project.gallery?.forEach((image, imageIndex) => checkImage(image, `${path}.gallery[${imageIndex}]`));
  });
  content.projects.forEach((project, index) => {
    if (project.featured && project.featuredOrder !== undefined && content.projects.some((other, otherIndex) => otherIndex !== index && other.featured && other.featuredOrder === project.featuredOrder)) {
      issue('duplicate-featured-order', `projects[${index}].featuredOrder`, `Featured order ${project.featuredOrder} is duplicated.`);
    }
  });

  content.skills.forEach((skill, index) => {
    const path = `skills[${index}]`;
    if (skill.visibility === 'published' && !skill.name.trim()) issue('incomplete-published-record', `${path}.name`, 'Published skills need a name.');
    checkOptionalText(skill, ['description', 'iconId'], path);
    checkOrder(skill.order, `${path}.order`);
    if (skill.categoryId && !skillCategoryIds.has(skill.categoryId)) issue('missing-skill-category', `${path}.categoryId`, `Unknown skill category: ${skill.categoryId}.`);
    skill.relatedProjectIds?.forEach((id) => { if (!projectIds.has(id)) issue('missing-project-reference', `${path}.relatedProjectIds`, `Unknown project ID: ${id}.`); });
  });

  content.research.forEach((item, index) => {
    const path = `research[${index}]`;
    if (item.visibility === 'published' && !item.title.trim()) issue('incomplete-published-record', `${path}.title`, 'Published research needs a title.');
    checkOptionalText(item, ['description'], path);
    checkStringList(item.topics, `${path}.topics`);
    if (item.date !== undefined) checkDateField(item.date, `${path}.date`);
    if (item.publication) {
      checkOptionalText(item.publication, ['venue', 'citation'], `${path}.publication`);
      if (item.publication.status !== undefined && !publicationStatuses.has(item.publication.status)) {
        issue('invalid-publication-status', `${path}.publication.status`, 'Publication status must be preprint, submitted, or published.');
      }
    }
    item.relatedProjectIds?.forEach((id) => { if (!projectIds.has(id)) issue('missing-project-reference', `${path}.relatedProjectIds`, `Unknown project ID: ${id}.`); });
    checkExternalLinks(item.links, `${path}.links`);
  });

  content.education.forEach((item, index) => {
    const path = `education[${index}]`;
    if (item.visibility === 'published' && (!item.institution.trim() || !item.program.trim())) issue('incomplete-published-record', path, 'Published education needs an institution and program.');
    checkOptionalText(item, ['fieldOfStudy', 'description'], path);
    checkStringList(item.achievements, `${path}.achievements`);
    checkDateRange(item.startDate, item.endDate, path);
  });

  content.experience.forEach((item, index) => {
    const path = `experience[${index}]`;
    if (item.visibility === 'published' && (!item.organization.trim() || !item.role.trim())) issue('incomplete-published-record', path, 'Published experience needs an organization and role.');
    checkOptionalText(item, ['description', 'location'], path);
    checkStringList(item.responsibilities, `${path}.responsibilities`);
    checkStringList(item.achievements, `${path}.achievements`);
    checkDateRange(item.startDate, item.endDate, path);
    item.relatedProjectIds?.forEach((id) => { if (!projectIds.has(id)) issue('missing-project-reference', `${path}.relatedProjectIds`, `Unknown project ID: ${id}.`); });
  });

  content.socialLinks.forEach((link, index) => {
    const path = `socialLinks[${index}]`;
    if (link.visibility === 'published' && !link.label.trim()) issue('incomplete-published-record', `${path}.label`, 'Published social links need a label.');
    if (!socialPlatforms.has(link.platform)) issue('invalid-social-platform', `${path}.platform`, 'Social platform is not supported.');
    if (!validUrl(link.href, link.platform === 'email')) issue('invalid-url', `${path}.href`, 'Social links must use HTTP(S); email may use a mailto: URL with a recipient.');
    if (link.target !== undefined && !targetValues.has(link.target)) issue('invalid-link-target', `${path}.target`, 'Target must be same-tab or new-tab.');
    checkOrder(link.order, `${path}.order`);
  });

  content.profile.socialLinkIds?.forEach((id) => { if (!socialIds.has(id)) issue('missing-social-reference', 'profile.socialLinkIds', `Unknown social link ID: ${id}.`); });
  checkOptionalText(content.profile, ['name', 'headline', 'shortIntroduction', 'biography', 'location'], 'profile');
  if (content.profile.availabilityStatus !== undefined && !['open-to-opportunities', 'not-looking', 'unspecified'].includes(content.profile.availabilityStatus)) {
    issue('invalid-availability-status', 'profile.availabilityStatus', 'Availability status is not supported.');
  }
  if (content.profile.resumeLink) {
    checkUnique([content.profile.resumeLink], 'profile.resumeLink');
    checkExternalLink(content.profile.resumeLink, 'profile.resumeLink');
  }
  if (content.profile.image) checkImage(content.profile.image, 'profile.image');
  return issues;
}
