import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import App, { preloadAllRoutes } from './App';

// Build-time prerendering entry — scripts/prerender.mjs calls render() for
// every sitemap route and writes the result as static HTML into dist/.

/**
 * Resolves every code-split route (see utils/lazyRoute).
 *
 * renderToString cannot render a lazy component — it throws instead of
 * suspending — so prerender.mjs must await this once before its render loop.
 */
export async function warmup() {
  await preloadAllRoutes();
}

export function render(url: string) {
  const helmetContext: { helmet?: Record<string, { toString(): string }> } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  return { html, helmet: helmetContext.helmet };
}
