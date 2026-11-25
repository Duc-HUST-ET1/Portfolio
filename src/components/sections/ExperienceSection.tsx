import type { Education } from '../../features/education/types';
import type { Experience } from '../../features/experience/types';
import { SectionHeading } from './SectionHeading';

function formatPeriod(start?: string, end?: string | null) {
  if (!start && end !== null && !end) return undefined;
  const format = (date: string) => date.slice(0, 7);
  return `${start ? format(start) : ''} – ${end === null ? 'Present' : end ? format(end) : ''}`;
}

export function ExperienceSection({ experience, education }: { experience: readonly Experience[]; education: readonly Education[] }) {
  return (
    <section className="content-section" id="experience" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" index="05" label="Background" title="Experience & education" />
      {experience.length > 0 && <div className="timeline-list" aria-label="Experience">{experience.map((item) => <article className="timeline-entry" key={`work-${item.id}`}><div className="timeline-heading"><h3>{item.role}</h3><span>{item.organization}</span></div>{formatPeriod(item.startDate, item.endDate) && <p className="record-date">{formatPeriod(item.startDate, item.endDate)}</p>}{item.location?.trim() && <p className="record-meta">{item.location}</p>}{item.description?.trim() && <p>{item.description}</p>}{(item.responsibilities?.length || item.achievements?.length) && <ul>{[...(item.responsibilities ?? []), ...(item.achievements ?? [])].filter((detail) => detail.trim()).map((detail, index) => <li key={`${item.id}-${index}`}>{detail}</li>)}</ul>}</article>)}</div>}
      {education.length > 0 && <div className="timeline-list education-list" aria-label="Education">{education.map((item) => <article className="timeline-entry" key={`education-${item.id}`}><div className="timeline-heading"><h3>{item.program}</h3><span>{item.institution}</span></div>{item.fieldOfStudy?.trim() && <p className="record-meta">{item.fieldOfStudy}</p>}{formatPeriod(item.startDate, item.endDate) && <p className="record-date">{formatPeriod(item.startDate, item.endDate)}</p>}{item.description?.trim() && <p>{item.description}</p>}{item.achievements?.filter((detail) => detail.trim()).length ? <ul>{item.achievements.filter((detail) => detail.trim()).map((detail, index) => <li key={`${item.id}-${index}`}>{detail}</li>)}</ul> : null}</article>)}</div>}
    </section>
  );
}
