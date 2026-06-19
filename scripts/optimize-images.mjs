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

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const jobs = [
  // Logo: keep a compressed PNG for social/schema meta + a small WebP for display.
  { in: 'logo.png', out: 'logo.webp', width: 800, fmt: 'webp', quality: 82 },
  { in: 'logo.png', out: 'logo.png', width: 1024, fmt: 'png' },
  // About-section photos render at ~h-64 in a half-width column.
  { in: 'roadside_assistance_help.jpg', out: 'roadside_assistance_help.webp', width: 760, fmt: 'webp', quality: 72 },
  { in: 'roadside_technician_towing.jpg', out: 'roadside_technician_towing.webp', width: 760, fmt: 'webp', quality: 72 },
];

for (const job of jobs) {
  const pipeline = sharp(join(pub, job.in)).resize({ width: job.width, withoutEnlargement: true });
  if (job.fmt === 'webp') pipeline.webp({ quality: job.quality });
  if (job.fmt === 'png') pipeline.png({ compressionLevel: 9, palette: true });
  const info = await pipeline.toBuffer();
  // toBuffer first so we can safely overwrite the same path (logo.png).
  const { writeFileSync } = await import('node:fs');
  writeFileSync(join(pub, job.out), info);
  console.log(`✓ ${job.in} -> ${job.out} (${(info.length / 1024).toFixed(0)} KiB)`);
}
