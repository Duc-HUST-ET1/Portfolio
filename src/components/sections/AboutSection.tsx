import type { Profile } from '../../features/profile/types';
import { SectionHeading } from './SectionHeading';

type AboutSectionProps = { profile: Profile };

export function AboutSection({ profile }: AboutSectionProps) {
  const paragraphs = (profile.biography ?? '').split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
  return (
    <section className="content-section" id="about" aria-labelledby="about-title">
      <SectionHeading id="about-title" index="01" label="About" title="About" />
      <div className="section-copy about-copy">{paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}</div>
    </section>
  );
}
