export type ThemeMode = 'system' | 'light' | 'dark';

export const THEME_STORAGE_KEY = 'pairly-theme';

export function getStoredTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
  } catch {}
  return 'system';
}

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export function applyTheme(mode: ThemeMode): 'light' | 'dark' {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {}

  const effective = mode === 'system' ? getSystemTheme() : mode;

  const root = document.documentElement;
  root.setAttribute('data-theme', effective);

  if (effective === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    if (document.body) {
      document.body.style.backgroundColor = '#090A0D';
    }
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    if (document.body) {
      document.body.style.backgroundColor = '#F6F1E6';
    }
  }

  window.dispatchEvent(
    new CustomEvent('pairly-theme-change', {
      detail: { mode, effective },
    })
  );

  return effective;
}
