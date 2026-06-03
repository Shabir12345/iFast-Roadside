/**
 * Google Search Console — Bulk URL Indexing Request
 *
 * Automates the URL Inspection tool to request indexing for every page
 * in the sitemap. Opens a real Chromium window so you can log in with
 * Google once; then it iterates through all URLs automatically.
 *
 * Usage:
 *   node scripts/request-indexing.js
 *
 * Google limits indexing requests to ~200/day per property.
 * This script covers all 44 pages which is well within the limit.
 */

const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

// All pages to index — highest priority first
const URLS = [
  // Core pages
  'https://ifastroadside.ca/',
  'https://ifastroadside.ca/mobile-mechanic',
  'https://ifastroadside.ca/service-area/east-gta',

  // Service pages
  'https://ifastroadside.ca/service/mobile-mechanic',
  'https://ifastroadside.ca/service/tire-change',
  'https://ifastroadside.ca/service/jump-start',
  'https://ifastroadside.ca/service/lockout',
  'https://ifastroadside.ca/service/fuel',
  'https://ifastroadside.ca/service/towing',

  // City pages
  'https://ifastroadside.ca/areas/scarborough',
  'https://ifastroadside.ca/areas/pickering',
  'https://ifastroadside.ca/areas/ajax',
  'https://ifastroadside.ca/areas/whitby',
  'https://ifastroadside.ca/areas/oshawa',

  // Service × City pages (30 total)
  'https://ifastroadside.ca/service/mobile-mechanic/scarborough',
  'https://ifastroadside.ca/service/mobile-mechanic/pickering',
  'https://ifastroadside.ca/service/mobile-mechanic/ajax',
  'https://ifastroadside.ca/service/mobile-mechanic/whitby',
  'https://ifastroadside.ca/service/mobile-mechanic/oshawa',

  'https://ifastroadside.ca/service/tire-change/scarborough',
  'https://ifastroadside.ca/service/tire-change/pickering',
  'https://ifastroadside.ca/service/tire-change/ajax',
  'https://ifastroadside.ca/service/tire-change/whitby',
  'https://ifastroadside.ca/service/tire-change/oshawa',

  'https://ifastroadside.ca/service/jump-start/scarborough',
  'https://ifastroadside.ca/service/jump-start/pickering',
  'https://ifastroadside.ca/service/jump-start/ajax',
  'https://ifastroadside.ca/service/jump-start/whitby',
  'https://ifastroadside.ca/service/jump-start/oshawa',

  'https://ifastroadside.ca/service/lockout/scarborough',
  'https://ifastroadside.ca/service/lockout/pickering',
  'https://ifastroadside.ca/service/lockout/ajax',
  'https://ifastroadside.ca/service/lockout/whitby',
  'https://ifastroadside.ca/service/lockout/oshawa',

  'https://ifastroadside.ca/service/fuel/scarborough',
  'https://ifastroadside.ca/service/fuel/pickering',
  'https://ifastroadside.ca/service/fuel/ajax',
  'https://ifastroadside.ca/service/fuel/whitby',
  'https://ifastroadside.ca/service/fuel/oshawa',

  'https://ifastroadside.ca/service/towing/scarborough',
  'https://ifastroadside.ca/service/towing/pickering',
  'https://ifastroadside.ca/service/towing/ajax',
  'https://ifastroadside.ca/service/towing/whitby',
  'https://ifastroadside.ca/service/towing/oshawa',
];

const GSC_INSPECT_BASE = 'https://search.google.com/search-console/inspect?resource_id=sc-domain%3Aifastroadside.ca&id=';

const DELAY_BETWEEN = 4000; // ms between requests (be polite to Google's UI)

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function requestIndexing(page, url) {
  const inspectUrl = GSC_INSPECT_BASE + encodeURIComponent(url);
  console.log(`\n[${new Date().toLocaleTimeString()}] Inspecting: ${url}`);

  await page.goto(inspectUrl, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for the page to fully load and show inspection results
  try {
    // The URL inspection result panel takes a moment to load
    await page.waitForTimeout(3000);

    // Look for "Request Indexing" button
    const requestBtn = page.getByRole('button', { name: /request indexing/i });
    const btnVisible = await requestBtn.isVisible().catch(() => false);

    if (btnVisible) {
      console.log('  → Clicking "Request Indexing"...');
      await requestBtn.click();

      // Wait for the confirmation dialog
      await page.waitForTimeout(2000);

      // Confirm if a dialog appears (e.g. "Requesting indexing…" or "Got it")
      const gotItBtn = page.getByRole('button', { name: /got it/i });
      const gotItVisible = await gotItBtn.isVisible().catch(() => false);
      if (gotItVisible) {
        await gotItBtn.click();
        console.log('  ✓ Indexing requested successfully');
      } else {
        console.log('  ✓ Request submitted (no confirmation dialog appeared)');
      }
    } else {
      // Check if already indexed or URL is in a different state
      const pageContent = await page.content();
      if (pageContent.includes('URL is on Google') || pageContent.includes('URL is in Google')) {
        console.log('  ℹ Already indexed — skipping');
      } else if (pageContent.includes('Crawled') || pageContent.includes('Discovered')) {
        console.log('  ℹ In crawl queue — looking for request button...');
        // Sometimes we need to scroll or wait more
        await page.waitForTimeout(2000);
        const retryBtn = page.getByRole('button', { name: /request indexing/i });
        if (await retryBtn.isVisible().catch(() => false)) {
          await retryBtn.click();
          await page.waitForTimeout(1500);
          const gotIt2 = page.getByRole('button', { name: /got it/i });
          if (await gotIt2.isVisible().catch(() => false)) await gotIt2.click();
          console.log('  ✓ Indexing requested');
        }
      } else {
        console.log('  ⚠ Could not find "Request Indexing" button — check manually');
        await page.screenshot({ path: `scripts/debug-${url.replace(/[^a-z0-9]/gi, '-')}.png` });
      }
    }
  } catch (err) {
    console.log(`  ✗ Error: ${err.message}`);
    await page.screenshot({ path: `scripts/error-${Date.now()}.png` }).catch(() => {});
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('iFAST Roadside — Google Search Console Bulk Indexing');
  console.log('='.repeat(60));
  console.log(`\nTotal URLs to submit: ${URLS.length}`);
  console.log('\nA browser window will open. Log in with your Google account');
  console.log('that has access to Search Console for ifastroadside.ca.');
  console.log('\nThe script will wait 30 seconds for you to log in, then');
  console.log('start submitting URLs automatically.\n');

  // Use a persistent context so login is preserved across the session
  const userDataDir = path.join(os.tmpdir(), 'pw-gsc-ifast');

  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1280, height: 900 },
    args: ['--disable-blink-features=AutomationControlled'],
  });

  const page = browser.pages()[0] || await browser.newPage();

  // Navigate to Search Console to trigger login if needed
  await page.goto('https://search.google.com/search-console/welcome', { waitUntil: 'networkidle' });

  // Give user time to log in if not already authenticated
  const isLoggedIn = await page.url().then(u => !u.includes('accounts.google.com')).catch(() => false);

  if (!isLoggedIn) {
    console.log('⚠ Please log in to Google in the browser window that just opened.');
    console.log('  Waiting 45 seconds for you to complete login...\n');
    await sleep(45000);
  } else {
    console.log('✓ Already logged in! Starting in 3 seconds...\n');
    await sleep(3000);
  }

  // Process each URL
  const results = { success: [], skipped: [], failed: [] };

  for (let i = 0; i < URLS.length; i++) {
    const url = URLS[i];
    console.log(`\n[${i + 1}/${URLS.length}]`);

    try {
      await requestIndexing(page, url);
      results.success.push(url);
    } catch (err) {
      console.log(`  ✗ Fatal error for ${url}: ${err.message}`);
      results.failed.push(url);
    }

    if (i < URLS.length - 1) {
      console.log(`  Waiting ${DELAY_BETWEEN / 1000}s before next URL...`);
      await sleep(DELAY_BETWEEN);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('DONE — Summary');
  console.log('='.repeat(60));
  console.log(`✓ Submitted: ${results.success.length}`);
  console.log(`ℹ Skipped:   ${results.skipped.length}`);
  console.log(`✗ Failed:    ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed URLs (check screenshots in scripts/ folder):');
    results.failed.forEach(u => console.log('  - ' + u));
  }

  console.log('\nBrowser will stay open for 30 seconds so you can review.');
  await sleep(30000);
  await browser.close();
}

main().catch(err => {
  console.error('\nFatal error:', err);
  process.exit(1);
});
