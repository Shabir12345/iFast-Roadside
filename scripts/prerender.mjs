/**
 * Build-time prerendering.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server entry).
 * Renders every route in public/sitemap.xml to static HTML and writes
 * dist/<route>/index.html. Vercel serves these files before the SPA
 * rewrite kicks in, so crawlers get full HTML with per-page canonicals,
 * meta tags, and JSON-LD without executing JavaScript.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { render } = await import(
  pathToFileURL(join(root, 'dist-server', 'entry-server.js')).href
);

const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.ifastroadside\.ca([^<]*)<\/loc>/g)]
  .map((m) => m[1] || '/');

if (routes.length === 0) {
  console.error('No routes found in public/sitemap.xml — aborting.');
  process.exit(1);
}

const template = readFileSync(join(root, 'dist', 'index.html'), 'utf8');

const failures = [];
for (const route of routes) {
  const { html, helmet } = render(route);

  // A page that renders almost nothing (e.g. an unknown :id returning null)
  // would be served as a blank shell — fail the build instead of shipping it.
  if (html.length < 500) {
    failures.push(route);
    console.error(`✗ ${route} rendered only ${html.length} chars — check route data`);
    continue;
  }

  const head = ['title', 'meta', 'link', 'script']
    .map((k) => helmet?.[k]?.toString() ?? '')
    .filter(Boolean)
    .join('\n  ');

  const out = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('</head>', `  ${head}\n</head>`);

  const outDir =
    route === '/' ? join(root, 'dist') : join(root, 'dist', ...route.split('/').filter(Boolean));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), out);
  console.log(`✓ ${route}`);
}

console.log(`\nPrerendered ${routes.length - failures.length}/${routes.length} routes.`);
if (failures.length > 0) {
  console.error(`Failed routes:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
