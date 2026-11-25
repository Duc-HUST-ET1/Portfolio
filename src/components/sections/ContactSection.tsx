import type { SocialLink } from '../../features/socialLinks/types';
import { SectionHeading } from './SectionHeading';

export function ContactSection({ links }: { links: readonly SocialLink[] }) {
  return <section className="content-section" id="contact" aria-labelledby="contact-title"><SectionHeading id="contact-title" index="06" label="Contact" title="Contact" /><ul className="contact-links">{links.map((link) => <li key={link.id}><a href={link.href} target={link.target === 'new-tab' ? '_blank' : undefined} rel={link.target === 'new-tab' ? 'noopener noreferrer' : undefined}>{link.label}<span aria-hidden="true"> ↗</span>{link.target === 'new-tab' && <span className="visually-hidden"> (opens in a new tab)</span>}</a></li>)}</ul></section>;
}
