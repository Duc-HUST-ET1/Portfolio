import type { ReactNode } from 'react';

type SiteFooterProps = {
  children?: ReactNode;
};

export function SiteFooter({ children }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <span className="site-footer-brand">Systems / Portfolio</span>
        {children ?? <span className="site-footer-note">Temporary layout preview · portfolio content not added</span>}
      </div>
    </footer>
  );
}
