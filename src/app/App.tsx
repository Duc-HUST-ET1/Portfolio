import { portfolioContent } from '../content';
import { selectContentAvailability } from '../features/contentAvailability/selectors';
import { getAvailableNavigationItems } from '../components/layout/navigation';
import { SiteLayout } from '../components/layout/SiteLayout';
import { HomePage } from '../pages/HomePage';

export function App() {
  const availability = selectContentAvailability(portfolioContent);
  const navigationItems = getAvailableNavigationItems(availability);
  return <SiteLayout navigationItems={navigationItems}>
    <HomePage content={portfolioContent} availability={availability} />
  </SiteLayout>;
}
