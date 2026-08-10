/**
 * One-off image optimizer. Run with `node scripts/optimize-images.mjs`.
 *
 * The source photos in public/ are full-resolution and dominate page weight
 * (logo.png alone was 2.4 MB). This downscales them to roughly the size they
 * actually render at and emits WebP, which the components reference directly.
 * Re-run this after swapping in new source photos.
 */
import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
// Full-resolution originals that must NOT ship. Everything under public/ is
// copied verbatim into dist/, so sources for generated images live here instead.
const src = join(root, 'assets-src');

const jobs = [
  // Logo: keep a compressed PNG for social/schema meta + a small WebP for display.
  //
  // The WebP was 800px wide / 78 KiB while the header renders it at 240px CSS
  // (h-40 w-auto inside a w-64 box) — Lighthouse measured 360px on a 1.5x DPR
  // phone. 512px covers 2x on the widest breakpoint with room to spare.
  { in: 'logo.png', out: 'logo.webp', width: 512, fmt: 'webp', quality: 80 },
  { in: 'logo.png', out: 'logo.png', width: 1024, fmt: 'png' },
  // Hero photo — the LCP element. Rendered in a max-w-lg (512px) column at
  // aspect-[4/5] with object-cover, so we crop to 4:5 here rather than shipping
  // pixels the browser throws away. 1024x1280 covers 2x DPR at that width.
  // Source is the Unsplash photo the component used to hotlink; self-hosting it
  // takes a third-party origin off the LCP critical path.
  {
    in: 'hero_roadside_technician.jpg',
    fromSrc: true,
    out: 'hero_roadside_technician.webp',
    width: 1024,
    height: 1280,
    fit: 'cover',
    fmt: 'webp',
    quality: 74,
  },
  // About-section photos render at ~h-64 in a half-width column.
  { in: 'roadside_assistance_help.jpg', out: 'roadside_assistance_help.webp', width: 760, fmt: 'webp', quality: 72 },
  { in: 'roadside_technician_towing.jpg', out: 'roadside_technician_towing.webp', width: 760, fmt: 'webp', quality: 72 },
];

for (const job of jobs) {
  const pipeline = sharp(join(job.fromSrc ? src : pub, job.in)).resize({
    width: job.width,
    height: job.height,
    fit: job.fit ?? 'inside',
    withoutEnlargement: true,
  });
  if (job.fmt === 'webp') pipeline.webp({ quality: job.quality });
  if (job.fmt === 'png') pipeline.png({ compressionLevel: 9, palette: true });
  const info = await pipeline.toBuffer();
  // toBuffer first so we can safely overwrite the same path (logo.png).
  const { writeFileSync } = await import('node:fs');
  writeFileSync(join(pub, job.out), info);
  console.log(`✓ ${job.in} -> ${job.out} (${(info.length / 1024).toFixed(0)} KiB)`);
}
