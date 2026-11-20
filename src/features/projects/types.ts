import type { ExternalLink, ImageAsset, Visibility } from '../shared/types';

export type ProjectStatus = 'planned' | 'in-progress' | 'completed' | 'archived';

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  visibility: Visibility;
  longDescription?: string;
  categoryId?: string;
  technologies?: readonly string[];
  tags?: readonly string[];
  coverImage?: ImageAsset;
  gallery?: readonly ImageAsset[];
  links?: readonly ExternalLink[];
  featured?: boolean;
  featuredOrder?: number;
  startDate?: string;
  endDate?: string;
  status?: ProjectStatus;
  teamContext?: string;
  role?: string;
  relatedResearchIds?: readonly string[];
  relatedProjectIds?: readonly string[];
};

export type ProjectCategory = {
  id: string;
  title: string;
  visibility: Visibility;
  description?: string;
  order?: number;
};
