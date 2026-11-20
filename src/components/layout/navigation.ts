export const navigationConfiguration = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SiteSectionId = (typeof navigationConfiguration)[number]['id'];

export type NavigationItem = {
  id: SiteSectionId;
  label: string;
};

import type { ContentAvailability } from '../../features/contentAvailability/types';

export function getAvailableNavigationItems(
  availability: ContentAvailability,
): NavigationItem[] {
  return navigationConfiguration.filter(({ id }) => id === 'home' || availability[id]);
}
