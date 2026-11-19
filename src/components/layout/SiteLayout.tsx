import type { ReactNode } from 'react';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { SkipLink } from './SkipLink';
import type { NavigationItem } from './navigation';

type SiteLayoutProps = {
  navigationItems: readonly NavigationItem[];
  children: ReactNode;
};

export function SiteLayout({ navigationItems, children }: SiteLayoutProps) {
  return (
    <div className="site-shell">
      <SkipLink />
      <SiteHeader navigationItems={navigationItems} />
      <main className="site-main site-container" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
