import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ThemePreference, ResolvedTheme } from '../../hooks/useTheme';

const STORAGE_KEY = 'portfolio-theme-preference';
const ThemeContext = createContext<{
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
} | null>(null);

function readPreference(): ThemePreference {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    return 'system';
  }
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(readPreference);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);
  const resolvedTheme = preference === 'system' ? systemTheme : preference;

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const update = (event: MediaQueryListEvent) => setSystemTheme(event.matches ? 'dark' : 'light');
    setSystemTheme(query.matches ? 'dark' : 'light');
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) themeColor.content = resolvedTheme === 'dark' ? '#151A19' : '#F5F5F0';
  }, [resolvedTheme]);

  const setPreference = (next: ThemePreference) => {
    setPreferenceState(next);
    try {
      if (next === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Theme selection remains active for this page view when storage is unavailable.
    }
  };

  const value = useMemo(() => ({ preference, resolvedTheme, setPreference }), [preference, resolvedTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { ThemeContext };
