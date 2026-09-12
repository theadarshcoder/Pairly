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

// Marketing layout & pages
import { MarketingLayout } from '@pages/marketing/MarketingLayout.js';
const AuthPage = lazy(() => import('@pages/marketing/AuthPage.js'));
const FeatureDetailPage = lazy(() => import('@pages/marketing/FeatureDetailPage.js'));
const DownloadPage = lazy(() => import('@pages/marketing/DownloadPage.js'));
const PricingPage = lazy(() => import('@pages/marketing/PricingPage.js'));
const AboutPage = lazy(() => import('@pages/marketing/AboutPage.js'));
const LegalPage = lazy(() => import('@pages/marketing/LegalPage.js'));
const CommunityPage = lazy(() => import('@pages/marketing/CommunityPage.js'));

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
  // ── Marketing & Public Routes ─────────────────────────────────────────────
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
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: 'get-started',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: 'features/:slug',
        element: (
          <Suspense fallback={<PageLoader />}>
            <FeatureDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'features',
        element: <Navigate to="/features/engage" replace />,
      },
      {
        path: 'download',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DownloadPage />
          </Suspense>
        ),
      },
      {
        path: 'pricing',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PricingPage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'privacy',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LegalPage />
          </Suspense>
        ),
      },
      {
        path: 'terms',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LegalPage />
          </Suspense>
        ),
      },
      {
        path: 'security',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LegalPage />
          </Suspense>
        ),
      },
      {
        path: 'community',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CommunityPage />
          </Suspense>
        ),
      },
    ],
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

