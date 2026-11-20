import { CoreLayoutPreview } from '../pages/CoreLayoutPreview';
import { portfolioContent } from '../content';
import { selectContentAvailability } from '../features/contentAvailability/selectors';
import { getAvailableNavigationItems } from '../components/layout/navigation';

export function App() {
  const availability = selectContentAvailability(portfolioContent);
  const navigationItems = getAvailableNavigationItems(availability);
  return <CoreLayoutPreview navigationItems={navigationItems} />;
}
