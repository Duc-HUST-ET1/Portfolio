import type { Project } from '../../features/projects/types';
import { isSafeExternalHref } from '../../features/shared/links';
import { SectionHeading } from './SectionHeading';

export function ProjectCard({ project }: { project: Project }) {
  const links = project.links?.filter((link) => link.label.trim() && isSafeExternalHref(link.href)) ?? [];
  const technologies = project.technologies?.filter((item) => item.trim()) ?? [];
  const tags = project.tags?.filter((item) => item.trim()) ?? [];
  const description = project.longDescription?.trim() || project.shortDescription;
  return (
    <article className={`project-card${project.featured ? ' project-card-featured' : ''}`}>
      {project.coverImage?.src.trim() && project.coverImage.alt.trim() && <img className="project-cover" src={project.coverImage.src} alt={project.coverImage.alt} width={project.coverImage.width} height={project.coverImage.height} loading="lazy" />}
      <div className="project-card-body">
        {project.featured && <p className="project-kicker">Featured</p>}
        <h3>{project.title}</h3>
        <p className="project-description">{description}</p>
        {(technologies.length > 0 || tags.length > 0) && <ul className="content-tags" aria-label="Project technologies and tags">{[...technologies, ...tags].map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>}
        {links.length > 0 && <ul className="project-links">{links.map((link) => <li key={link.id}><a href={link.href} target={link.target === 'new-tab' ? '_blank' : undefined} rel={link.target === 'new-tab' ? 'noopener noreferrer' : undefined}>{link.label}{link.target === 'new-tab' && <span className="visually-hidden"> (opens in a new tab)</span>}</a></li>)}</ul>}
      </div>
    </article>
  );
}

export function ProjectsSection({ projects }: { projects: readonly Project[] }) {
  return <section className="content-section" id="projects" aria-labelledby="projects-title"><SectionHeading id="projects-title" index="03" label="Selected work" title="Projects" /><div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div></section>;
}
