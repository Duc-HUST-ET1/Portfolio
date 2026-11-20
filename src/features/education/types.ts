import type { Visibility } from '../shared/types';

export type Education = {
  id: string;
  institution: string;
  program: string;
  visibility: Visibility;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string | null;
  description?: string;
  achievements?: readonly string[];
};
