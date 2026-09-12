import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { applyTheme, getStoredTheme } from '../../shared/lib/theme.js';
import './landing-tokens.css';

export function MarketingLayout() {
  useEffect(() => {
    const currentMode = getStoredTheme();
    applyTheme(currentMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (getStoredTheme() === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark', 'light');
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="pairly-marketing-theme">
      <Outlet />
    </div>
  );
}
