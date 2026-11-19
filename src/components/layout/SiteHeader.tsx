import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { ThemeControl } from '../ui/ThemeControl';
import type { NavigationItem } from './navigation';

type SiteHeaderProps = {
  navigationItems: readonly NavigationItem[];
};

export function SiteHeader({ navigationItems }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(() => window.location.hash);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktopQuery = window.matchMedia('(min-width: 981px)');
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    desktopQuery.addEventListener('change', handleBreakpointChange);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      desktopQuery.removeEventListener('change', handleBreakpointChange);
    };
  }, [menuOpen]);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    const targetId = event.currentTarget.hash.slice(1);
    setActiveHash(event.currentTarget.hash);

    if (!menuOpen) return;
    document.getElementById(targetId)?.focus({ preventScroll: true });
    setMenuOpen(false);
  };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-container site-header-inner">
        <a className="site-brand" href="#home" onClick={handleNavigation}>Systems / Portfolio</a>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-icon" data-open={menuOpen} aria-hidden="true" />
        </button>

        <nav
          className="site-navigation"
          id="primary-navigation"
          aria-label="Primary navigation"
          data-open={menuOpen}
        >
          <ul>
            {navigationItems.map(({ id, label }) => {
              const href = `#${id}`;
              const active = activeHash === href;
              return (
                <li key={id}>
                  <a
                    className="site-navigation-link"
                    href={href}
                    aria-current={active ? 'location' : undefined}
                    onClick={handleNavigation}
                  >
                    {label}
                    {active && <span className="visually-hidden"> (current section)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <ThemeControl />
      </div>
    </header>
  );
}
