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

export function getAvailableNavigationItems(
  availableIds: readonly SiteSectionId[],
): NavigationItem[] {
  const available = new Set(availableIds);
  return navigationConfiguration.filter(({ id }) => available.has(id));
}
