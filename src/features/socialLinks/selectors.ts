import type { SocialLink } from './types';
import { isSafeExternalHref } from '../shared/links';

function hasSafeHref(link: SocialLink) {
  try {
    const url = new URL(link.href);
    return (url.protocol === 'https:' || url.protocol === 'http:' || (link.platform === 'email' && url.protocol === 'mailto:')) && isSafeExternalHref(link.href);
  } catch { return false; }
}

export const selectAvailableSocialLinks = (links: readonly SocialLink[]) =>
  links.filter((link) => link.visibility === 'published' && link.label.trim() && hasSafeHref(link))
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) || a.id.localeCompare(b.id));
