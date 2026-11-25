import type { Profile } from '../../features/profile/types';
import { isSafeExternalHref } from '../../features/shared/links';

type HeroSectionProps = { profile: Profile };

function SystemsConcept() {
  return (
    <figure className="systems-concept">
      <figcaption><span>Conceptual model</span><span>Not a deployment diagram</span></figcaption>
      <div className="systems-concept-flow" role="group" aria-label="Conceptual relationship: network, systems, and software support reliable solutions">
        <ul className="systems-foundations">
          <li><span>01 / FOUNDATION</span><strong>Network</strong><small>Connectivity · boundaries</small></li>
          <li><span>02 / FOUNDATION</span><strong>Systems</strong><small>Compute · operating systems</small></li>
          <li><span>03 / FOUNDATION</span><strong>Software</strong><small>Delivery · automation</small></li>
        </ul>
        <div className="systems-outcome"><span>ENGINEERING OUTCOME</span><strong>Reliable solutions</strong><small>Designed with care</small></div>
      </div>
      <div className="systems-concept-caption"><span>Network + systems + software</span><span aria-hidden="true">→</span><span>Reliable solutions</span></div>
    </figure>
  );
}

export function HeroSection({ profile }: HeroSectionProps) {
  const resume = profile.resumeLink && profile.resumeLink.label.trim() && isSafeExternalHref(profile.resumeLink.href)
    ? profile.resumeLink : undefined;
  const image = profile.image?.src.trim() && profile.image.alt.trim() ? profile.image : undefined;

  return (
    <section className="home-hero" id="home" aria-labelledby="hero-title">
      <div className="home-hero-copy">
        <p className="eyebrow">Portfolio</p>
        <h1 id="hero-title">{profile.name?.trim() || profile.headline?.trim() || 'Portfolio'}</h1>
        {profile.name?.trim() && profile.headline?.trim() && <p className="hero-role">{profile.headline.trim()}</p>}
        {profile.shortIntroduction?.trim() && <p className="hero-intro">{profile.shortIntroduction.trim()}</p>}
        {profile.location?.trim() && <p className="hero-location">{profile.location.trim()}</p>}
        {profile.availabilityStatus && profile.availabilityStatus !== 'unspecified' && (
          <p className={`availability-indicator${profile.availabilityStatus === 'open-to-opportunities' ? ' is-open' : ''}`}><span aria-hidden="true" />{profile.availabilityStatus === 'open-to-opportunities' ? 'Open to opportunities' : 'Not currently looking'}</p>
        )}
        {resume && <div className="hero-actions"><a className="portfolio-button" href={resume.href} target={resume.target === 'new-tab' ? '_blank' : undefined} rel={resume.target === 'new-tab' ? 'noopener noreferrer' : undefined}>{resume.label}{resume.target === 'new-tab' && <span className="visually-hidden"> (opens in a new tab)</span>}</a></div>}
      </div>
      {image ? <figure className="hero-image"><img src={image.src} alt={image.alt} width={image.width} height={image.height} /></figure> : <SystemsConcept />}
    </section>
  );
}
