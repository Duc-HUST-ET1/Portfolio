import type { Project } from '../../features/projects/types';
import type { ResearchItem } from '../../features/research/types';
import { isSafeExternalHref } from '../../features/shared/links';
import { SectionHeading } from './SectionHeading';

export function ResearchSection({ items, projects }: { items: readonly ResearchItem[]; projects: readonly Project[] }) {
  const projectNames = new Map(projects.map((project) => [project.id, project.title]));
  return (
    <section className="content-section" id="research" aria-labelledby="research-title">
      <SectionHeading id="research-title" index="04" label="Research" title="Research" />
      <div className="research-grid">{items.map((item) => {
        const links = item.links?.filter((link) => link.label.trim() && isSafeExternalHref(link.href)) ?? [];
        const topics = item.topics?.filter((topic) => topic.trim()) ?? [];
        const related = item.relatedProjectIds?.flatMap((id) => projectNames.has(id) ? [projectNames.get(id)!] : []) ?? [];
        const publication = item.publication && Object.values(item.publication).filter((value) => typeof value === 'string' && value.trim()).join(' · ');
        return <article className="research-card" key={item.id}><h3>{item.title}</h3>{item.date && <p className="record-date">{item.date}</p>}{publication && <p className="record-meta">{publication}</p>}{item.description?.trim() && <p>{item.description.trim()}</p>}{topics.length > 0 && <ul className="content-tags">{topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>}{related.length > 0 && <p className="record-meta">Related projects: {related.join(', ')}</p>}{links.length > 0 && <ul className="project-links">{links.map((link) => <li key={link.id}><a href={link.href} target={link.target === 'new-tab' ? '_blank' : undefined} rel={link.target === 'new-tab' ? 'noopener noreferrer' : undefined}>{link.label}{link.target === 'new-tab' && <span className="visually-hidden"> (opens in a new tab)</span>}</a></li>)}</ul>}</article>;
      })}</div>
    </section>
  );
}
