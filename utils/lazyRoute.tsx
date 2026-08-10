import React from 'react';

/**
 * Route-level code splitting that still works with build-time prerendering.
 *
 * Why this exists: every page component was statically imported by App.tsx, so
 * the homepage shipped and *executed* all of them — including data/blogContent,
 * data/serviceContent, data/serviceCityContent and data/cityContent (~490 KB of
 * source between them). Those files are not inert data; their content is JSX,
 * so loading the module builds every React element tree for every blog post and
 * every service×city page before the homepage can paint. That was the bulk of
 * an 852 KB bundle and the main-thread work delaying LCP.
 *
 * Why not plain React.lazy: scripts/prerender.mjs renders with renderToString,
 * which cannot render a lazy component — it throws rather than suspending.
 *
 * So this wrapper keeps both paths:
 *   - Server: prerender calls preload() on every route first. Once the module
 *     has resolved, `loaded` is set and the wrapper renders it synchronously,
 *     so renderToString never sees a lazy component.
 *   - Client: `loaded` starts null, so it renders the React.lazy version and
 *     the route arrives as its own chunk. During hydration React keeps the
 *     prerendered HTML in place until the chunk lands, so there is no flash.
 */
type AnyComponent = React.ComponentType;
type Loader = () => Promise<{ default: AnyComponent }>;

export type LazyRoute = React.FC & { preload: () => Promise<unknown> };

export function lazyRoute(loader: Loader): LazyRoute {
  let loaded: AnyComponent | null = null;

  const preload = () =>
    loader().then((mod) => {
      loaded = mod.default;
      return mod;
    });

  const Lazy = React.lazy(preload);

  const Route: React.FC = () => {
    const Resolved = loaded;
    return Resolved ? <Resolved /> : <Lazy />;
  };

  const withPreload = Route as LazyRoute;
  withPreload.preload = preload;
  return withPreload;
}
