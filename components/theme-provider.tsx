'use client';

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';

type ThemeContextValue = {
  isDark: boolean;
  setDark: (value: boolean) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getServerSnapshot() {
  return true;
}

function getSnapshot() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light') return false;
  if (stored === 'dark') return true;
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return !!prefersDark;
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => callback();
  media.addEventListener('change', onChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === 'theme') callback();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(callback);
    media.removeEventListener('change', onChange);
    window.removeEventListener('storage', onStorage);
  };
}

function setTheme(nextDark: boolean) {
  const root = document.documentElement;
  if (nextDark) {
    root.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  } else {
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
  }
  listeners.forEach((cb) => cb());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo(
    () => ({ isDark, setDark: (v: boolean) => setTheme(v), toggle: () => setTheme(!isDark) }),
    [isDark]
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
