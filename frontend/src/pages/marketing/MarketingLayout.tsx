import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './landing-tokens.css';

export function MarketingLayout() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.style.backgroundColor = '#F6F1E6';
    return () => {
      document.documentElement.removeAttribute('data-theme');
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="pairly-marketing-theme">
      <Outlet />
    </div>
  );
}
