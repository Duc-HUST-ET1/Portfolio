import type { Visibility } from '../shared/types';

export type Experience = {
  id: string;
  organization: string;
  role: string;
  visibility: Visibility;
  startDate?: string;
  endDate?: string | null;
  description?: string;
  responsibilities?: readonly string[];
  achievements?: readonly string[];
  location?: string;
  relatedProjectIds?: readonly string[];
};
