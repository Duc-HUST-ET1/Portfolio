import type { Visibility } from '../shared/types';

export type SocialPlatform = 'github' | 'linkedin' | 'email' | 'website' | 'other';

export type SocialLink = {
  id: string;
  platform: SocialPlatform;
  label: string;
  href: string;
  visibility: Visibility;
  order?: number;
  target?: 'same-tab' | 'new-tab';
};
