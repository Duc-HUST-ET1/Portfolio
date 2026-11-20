import type { ExternalLink, Visibility } from '../shared/types';

export type ResearchPublication = {
  venue?: string;
  citation?: string;
  status?: 'preprint' | 'submitted' | 'published';
};

export type ResearchItem = {
  id: string;
  title: string;
  visibility: Visibility;
  description?: string;
  topics?: readonly string[];
  publication?: ResearchPublication;
  date?: string;
  links?: readonly ExternalLink[];
  relatedProjectIds?: readonly string[];
};
