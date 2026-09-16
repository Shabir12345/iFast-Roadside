import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App, { preloadAllRoutes } from './App';
import { extractHead } from './utils/extractHead';

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
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  // Every page renders its <title>/<meta>/<link> tags directly in its own
  // JSX (no Helmet wrapper — React 19 hoists them to the front of the
  // renderToString output on its own). Split them out here so prerender.mjs
  // can place them in the real <head> instead of inside #root.
  const { head, body } = extractHead(html);
  return { head, html: body };
}
