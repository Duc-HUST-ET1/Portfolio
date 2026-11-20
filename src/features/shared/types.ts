export type Visibility = 'draft' | 'published';

export type ImageAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ExternalLinkKind = 'github' | 'demo' | 'documentation' | 'download' | 'article' | 'other';

export type ExternalLink = {
  id: string;
  label: string;
  href: string;
  kind: ExternalLinkKind;
  target?: 'same-tab' | 'new-tab';
};

export function externalLinkAttributes(link: ExternalLink) {
  return link.target === 'new-tab'
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};
}
