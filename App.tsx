import React, { Suspense } from 'react';
import { useRoutes, matchRoutes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyCall from './components/StickyCall';
import { lazyRoute, type LazyRoute } from './utils/lazyRoute';
import { onIdle } from './utils/onIdle';

// Header, Footer and StickyCall stay eagerly imported — they render on every
// route, so splitting them would only add round trips.
//
// Page components are split (see utils/lazyRoute). Each route's long-form
// content data is the heavy part, and no visitor needs more than one route's
// worth. prerenderRoutes() below must be awaited before any renderToString.
const Home = lazyRoute(() => import('./pages/Home'));
const MobileMechanicLanding = lazyRoute(() => import('./pages/MobileMechanicLanding'));
const ServicePage = lazyRoute(() => import('./pages/ServicePage'));
const ServiceCityPage = lazyRoute(() => import('./pages/ServiceCityPage'));
const RegionServiceAreaPage = lazyRoute(() => import('./pages/RegionServiceAreaPage'));
const CityPage = lazyRoute(() => import('./pages/CityPage'));
const Blog = lazyRoute(() => import('./pages/Blog'));
const BlogPost = lazyRoute(() => import('./pages/BlogPost'));
const ContactPage = lazyRoute(() => import('./pages/ContactPage'));

// Single source of truth for the route table: <Routes> renders from it, and
// preloadMatchingRoute() matches against it. Keeping one list means the
// preloading can never drift out of sync with the routing.
const ROUTES: { path: string; Component: LazyRoute }[] = [
  { path: '/', Component: Home },
  { path: '/mobile-mechanic', Component: MobileMechanicLanding },
  { path: '/service/:id', Component: ServicePage },
  { path: '/service/:id/:city', Component: ServiceCityPage },
  { path: '/service-area/:region', Component: RegionServiceAreaPage },
  { path: '/areas/:city', Component: CityPage },
  { path: '/blog', Component: Blog },
  { path: '/blog/:slug', Component: BlogPost },
  { path: '/contact', Component: ContactPage },
];

/**
 * Resolves every split route so renderToString can run synchronously.
 * Called once by entry-server.tsx before prerendering.
 */
export const preloadAllRoutes = () => Promise.all(ROUTES.map((r) => r.Component.preload()));

/**
 * Resolves only the chunk for the route currently in the address bar.
 *
 * index.tsx awaits this before hydrating, and that is load-bearing rather than
 * an optimisation: React does NOT keep prerendered HTML for a Suspense boundary
 * that suspends during hydration — it client-renders the boundary instead. With
 * the route chunk still in flight that empties the page for a frame, which
 * collapsed the document and moved the footer a full viewport (measured CLS of
 * 1.0). Resolving the match first means lazyRoute renders synchronously and the
 * boundary never suspends on first paint.
 */
export const preloadMatchingRoute = (pathname: string): Promise<unknown> => {
  const matches = matchRoutes(ROUTES, pathname) ?? [];
  const route = matches[matches.length - 1]?.route as (typeof ROUTES)[number] | undefined;
  return route ? route.Component.preload() : Promise.resolve();
};

/**
 * Warms the split route chunks on the visitor's first interaction.
 *
 * Without this, a client-side <Link> navigation would hit an unloaded chunk and
 * briefly render the Suspense fallback between the header and footer. Doing it
 * on first pointer move / touch / key / scroll means the chunks are usually
 * cached before any link can be clicked, while costing nothing during page load
 * — an automated audit never interacts, so it never pays for this.
 */
const useWarmRoutesOnInteraction = () => {
  React.useEffect(() => {
    const events = ['pointermove', 'touchstart', 'keydown', 'scroll'] as const;
    let done = false;

    let cancelIdle: (() => void) | null = null;

    const warm = () => {
      if (done) return;
      done = true;
      events.forEach((e) => window.removeEventListener(e, warm));
      // Idle so the parse cost of the larger content chunks never lands in the
      // middle of the interaction that triggered it.
      cancelIdle = onIdle(() => void preloadAllRoutes());
    };

    events.forEach((e) => window.addEventListener(e, warm, { once: true, passive: true }));
    return () => {
      done = true;
      events.forEach((e) => window.removeEventListener(e, warm));
      cancelIdle?.();
    };
  }, []);
};

const App: React.FC = () => {
  useWarmRoutesOnInteraction();
  // useRoutes rather than <Routes>/<Route> so the route table stays a plain
  // array shared with matchRoutes in preloadMatchingRoute — one definition,
  // used for both rendering and preloading.
  const routing = useRoutes(ROUTES.map(({ path, Component }) => ({ path, element: <Component /> })));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-16 md:pb-0">
      <Header />
      {/* This boundary should never show on first load — index.tsx resolves the
          matching route chunk before mounting. It exists for client-side <Link>
          navigation to a route whose chunk has not been warmed yet, and
          fallback={null} keeps the header and footer in place while it lands. */}
      <Suspense fallback={null}>{routing}</Suspense>
      <Footer />

      {/* Floating Elements */}
      <StickyCall />
    </div>
  );
};

export default App;
