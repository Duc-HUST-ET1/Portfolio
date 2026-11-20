import type { ExternalLink, ImageAsset } from '../shared/types';

export type AvailabilityStatus = 'open-to-opportunities' | 'not-looking' | 'unspecified';

export type Profile = {
  name?: string;
  headline?: string;
  shortIntroduction?: string;
  biography?: string;
  location?: string;
  image?: ImageAsset;
  resumeLink?: ExternalLink;
  availabilityStatus?: AvailabilityStatus;
  socialLinkIds?: readonly string[];
};
