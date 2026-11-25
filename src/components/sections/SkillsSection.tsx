import type { Skill, SkillCategory } from '../../features/skills/types';
import { SectionHeading } from './SectionHeading';

export type SkillGroupData = { category?: SkillCategory; skills: readonly Skill[] };
type SkillsSectionProps = { groups: readonly SkillGroupData[] };

export function SkillItem({ skill }: { skill: Skill }) {
  return <li className="skill-item"><span>{skill.name}</span>{skill.description?.trim() && <p>{skill.description}</p>}</li>;
}

export function SkillGroup({ group }: { group: SkillGroupData }) {
  return (
    <section className="skill-group" aria-label={group.category?.title ?? 'Other skills'}>
      <h3>{group.category?.title ?? 'Other skills'}</h3>
      {group.category?.description?.trim() && <p className="skill-group-description">{group.category.description}</p>}
      <ul>{group.skills.map((skill) => <SkillItem key={skill.id} skill={skill} />)}</ul>
    </section>
  );
}

export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <section className="content-section" id="skills" aria-labelledby="skills-title">
      <SectionHeading id="skills-title" index="02" label="Capabilities" title="Skills" />
      <div className="skills-groups">{groups.map((group) => <SkillGroup key={group.category?.id ?? 'uncategorized'} group={group} />)}</div>
    </section>
  );
}
