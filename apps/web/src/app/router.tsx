import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PresenterPage = lazy(() => import('@pages/presenter/PresenterPage.js'));
const JoinPage = lazy(() => import('@pages/join/JoinPage.js'));

function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-base)',
        color: 'var(--color-brand-primary)',
      }}
    >
      <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/join" replace />,
  },
  {
    path: '/presenter',
    element: (
      <Suspense fallback={<PageLoader />}>
        <PresenterPage />
      </Suspense>
    ),
  },
  {
    path: '/join',
    element: (
      <Suspense fallback={<PageLoader />}>
        <JoinPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/join" replace />,
  },
]);
