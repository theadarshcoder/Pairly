/**
 * router.tsx — Issue 5: Path-param routes with legacy query-param redirects.
 *
 * Routes:
 *   /                — marketing landing page
 *   /join/:pin       — audience join with PIN prefilled
 *   /join            — audience join (manual PIN entry)
 *   /present/:pin    — presenter shell
 *   /present/:pin/results/:sessionId — post-session analytics
 *   /dashboard       — professor home
 *   /dashboard/syllabus — SyllabusUploader (Issue 25)
 *   /dashboard/decay — ConceptDecayGrid (Issue 25)
 *
 * Legacy redirects:
 *   /join?room=X     → /join/X
 *   /presenter?room=X → /present/X
 */
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, useSearchParams, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// ── Lazy-loaded pages ───────────────────────────────────────────────────────
const LandingPage = lazy(() => import('@pages/marketing/LandingPage.js'));
const PresenterPage = lazy(() => import('@pages/presenter/PresenterPage.js'));
const JoinPage = lazy(() => import('@pages/join/JoinPage.js'));
// Issue 25: Dashboard routes — static mockup shells for now
const DashboardPage = lazy(() => import('@pages/dashboard/DashboardPage.js'));
const SyllabusPage = lazy(() => import('@pages/dashboard/SyllabusPage.js'));
const DecayPage = lazy(() => import('@pages/dashboard/DecayPage.js'));
// Issue 25: Post-session analytics
const ResultsPage = lazy(() => import('@pages/presenter/ResultsPage.js'));

// Marketing layout & placeholder
const GetStartedPlaceholder = lazy(() => import('@pages/marketing/GetStartedPlaceholder.js'));
import { MarketingLayout } from '@pages/marketing/MarketingLayout.js';

function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg, var(--color-bg-base))',
        color: 'var(--accent, var(--color-brand-primary))',
      }}
    >
      <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
    </div>
  );
}

/**
 * Legacy redirect: /join?room=X → /join/X
 */
function LegacyJoinRedirect() {
  const [searchParams] = useSearchParams();
  const room = searchParams.get('room') || searchParams.get('pin');
  if (room) {
    return <Navigate to={`/join/${room}`} replace />;
  }
  return (
    <Suspense fallback={<PageLoader />}>
      <JoinPage />
    </Suspense>
  );
}

/**
 * Legacy redirect: /presenter?room=X → /present/X
 */
function LegacyPresenterRedirect() {
  const [searchParams] = useSearchParams();
  const room = searchParams.get('room') || searchParams.get('pin');
  if (room) {
    return <Navigate to={`/present/${room}`} replace />;
  }
  // No room specified — show an error state
  return (
    <Suspense fallback={<PageLoader />}>
      <PresenterPage />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  // ── Marketing landing page ────────────────────────────────────────────────
  {
    path: '/',
    element: <MarketingLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },
    ],
  },

  // ── Marketing placeholder route ───────────────────────────────────────────
  {
    path: '/get-started',
    element: (
      // TODO: Replace with real login/signup onboarding flow when implemented.
      // Static placeholder component; does NOT route to /presenter or any live app route.
      <Suspense fallback={<PageLoader />}>
        <GetStartedPlaceholder />
      </Suspense>
    ),
  },

  // ── Audience routes ───────────────────────────────────────────────────────
  {
    path: '/join',
    element: <LegacyJoinRedirect />,
  },
  {
    path: '/join/:pin',
    element: (
      <Suspense fallback={<PageLoader />}>
        <JoinPage />
      </Suspense>
    ),
  },

  // ── Presenter routes ──────────────────────────────────────────────────────
  {
    path: '/present/:pin',
    element: (
      <Suspense fallback={<PageLoader />}>
        <PresenterPage />
      </Suspense>
    ),
  },
  {
    path: '/present/:pin/results/:sessionId',
    element: (
      <Suspense fallback={<PageLoader />}>
        <ResultsPage />
      </Suspense>
    ),
  },
  // Legacy route redirect
  {
    path: '/presenter',
    element: <LegacyPresenterRedirect />,
  },

  // ── Dashboard routes (Issue 25) ───────────────────────────────────────────
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<PageLoader />}>
        <DashboardPage />
      </Suspense>
    ),
  },
  {
    path: '/dashboard/syllabus',
    element: (
      <Suspense fallback={<PageLoader />}>
        <SyllabusPage />
      </Suspense>
    ),
  },
  {
    path: '/dashboard/decay',
    element: (
      <Suspense fallback={<PageLoader />}>
        <DecayPage />
      </Suspense>
    ),
  },

  // ── Catch-all ─────────────────────────────────────────────────────────────
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

