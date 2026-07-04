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

// All pages to index — highest priority first.
// Google's manual "Request Indexing" quota is ~10-12 URLs/day, and the script
// stops when the quota is hit, so the pages that matter most must come FIRST.
// The PRIORITY block below is the money-page set rebuilt 2026-07-02 that is not
// yet indexed (tire-change hub was "unknown to Google"; lockout/fuel/combos were
// "discovered, not indexed"). Request these before anything else.
const URLS = [
  // ── PRIORITY: rebuilt money pages, not yet indexed (2026-07-02) ──
  'https://www.ifastroadside.ca/service/tire-change',
  'https://www.ifastroadside.ca/service/lockout',
  'https://www.ifastroadside.ca/service/fuel',
  'https://www.ifastroadside.ca/service/mobile-mechanic',
  'https://www.ifastroadside.ca/service/tire-change/scarborough',
  'https://www.ifastroadside.ca/service/tire-change/ajax',
  'https://www.ifastroadside.ca/service/jump-start/pickering',
  'https://www.ifastroadside.ca/service/jump-start/scarborough',
  'https://www.ifastroadside.ca/service/lockout/pickering',
  'https://www.ifastroadside.ca/service/lockout/scarborough',
  'https://www.ifastroadside.ca/service/fuel/pickering',

  // ── New blog posts (published 2026-07-03, not yet known to Google) ──
  'https://www.ifastroadside.ca/blog/dead-car-battery-boost-or-replace-east-gta',
  'https://www.ifastroadside.ca/blog/locked-out-of-car-what-not-to-do-east-gta',
  'https://www.ifastroadside.ca/blog/tire-patch-repair-scarborough',

  // Core pages
  'https://www.ifastroadside.ca/',
  'https://www.ifastroadside.ca/mobile-mechanic',
  'https://www.ifastroadside.ca/service-area/east-gta',

  // Service pages
  'https://www.ifastroadside.ca/service/mobile-mechanic',
  'https://www.ifastroadside.ca/service/tire-change',
  'https://www.ifastroadside.ca/service/jump-start',
  'https://www.ifastroadside.ca/service/lockout',
  'https://www.ifastroadside.ca/service/fuel',
  'https://www.ifastroadside.ca/service/towing',
  'https://www.ifastroadside.ca/service/flat-tire-repair',
  'https://www.ifastroadside.ca/service/spare-tire-change',
  'https://www.ifastroadside.ca/service/tire-installation',
  'https://www.ifastroadside.ca/service/battery-diagnostic',
  'https://www.ifastroadside.ca/service/battery-replacement',

  // Blog
  'https://www.ifastroadside.ca/blog',
  'https://www.ifastroadside.ca/blog/flat-tire-on-401-east-gta',
  'https://www.ifastroadside.ca/blog/winter-roadside-emergencies-ontario-guide',
  'https://www.ifastroadside.ca/blog/caa-vs-independent-roadside-assistance-ontario',
  'https://www.ifastroadside.ca/blog/mobile-mechanic-cost-ontario-pricing-guide',
  'https://www.ifastroadside.ca/blog/correct-tire-pressure-scarborough',

  // City pages
  'https://www.ifastroadside.ca/areas/scarborough',
  'https://www.ifastroadside.ca/areas/pickering',
  'https://www.ifastroadside.ca/areas/ajax',
  'https://www.ifastroadside.ca/areas/whitby',
  'https://www.ifastroadside.ca/areas/oshawa',

  // Service × City pages (30 total)
  'https://www.ifastroadside.ca/service/mobile-mechanic/scarborough',
  'https://www.ifastroadside.ca/service/mobile-mechanic/pickering',
  'https://www.ifastroadside.ca/service/mobile-mechanic/ajax',
  'https://www.ifastroadside.ca/service/mobile-mechanic/whitby',
  'https://www.ifastroadside.ca/service/mobile-mechanic/oshawa',

  'https://www.ifastroadside.ca/service/tire-change/scarborough',
  'https://www.ifastroadside.ca/service/tire-change/pickering',
  'https://www.ifastroadside.ca/service/tire-change/ajax',
  'https://www.ifastroadside.ca/service/tire-change/whitby',
  'https://www.ifastroadside.ca/service/tire-change/oshawa',

  'https://www.ifastroadside.ca/service/jump-start/scarborough',
  'https://www.ifastroadside.ca/service/jump-start/pickering',
  'https://www.ifastroadside.ca/service/jump-start/ajax',
  'https://www.ifastroadside.ca/service/jump-start/whitby',
  'https://www.ifastroadside.ca/service/jump-start/oshawa',

  'https://www.ifastroadside.ca/service/lockout/scarborough',
  'https://www.ifastroadside.ca/service/lockout/pickering',
  'https://www.ifastroadside.ca/service/lockout/ajax',
  'https://www.ifastroadside.ca/service/lockout/whitby',
  'https://www.ifastroadside.ca/service/lockout/oshawa',

  'https://www.ifastroadside.ca/service/fuel/scarborough',
  'https://www.ifastroadside.ca/service/fuel/pickering',
  'https://www.ifastroadside.ca/service/fuel/ajax',
  'https://www.ifastroadside.ca/service/fuel/whitby',
  'https://www.ifastroadside.ca/service/fuel/oshawa',

  'https://www.ifastroadside.ca/service/towing/scarborough',
  'https://www.ifastroadside.ca/service/towing/pickering',
  'https://www.ifastroadside.ca/service/towing/ajax',
  'https://www.ifastroadside.ca/service/towing/whitby',
  'https://www.ifastroadside.ca/service/towing/oshawa',
];

// GSC serves a bare Google 404 when the session account picked by `authuser`
// has no access to the property. The right slot depends on login order, so we
// auto-detect it at startup by probing authuser=0..5 (plus GSC_ACCOUNT if set).
const RESOURCE_ID = 'sc-domain%3Aifastroadside.ca';
let AUTH_USER = null; // resolved in main()

function inspectUrlFor(url) {
  return `https://search.google.com/search-console/inspect?resource_id=${RESOURCE_ID}&authuser=${encodeURIComponent(AUTH_USER)}&id=${encodeURIComponent(url)}`;
}

async function isGoogle404(page) {
  const text = await page.locator('body').innerText().catch(() => '');
  // Note: Google renders a curly apostrophe in "That’s an error"
  return text.includes('requested URL was not found') ||
         text.includes('That’s an error') ||
         text.includes("That's an error");
}

function overviewUrl() {
  return `https://search.google.com/search-console?resource_id=${RESOURCE_ID}&authuser=${encodeURIComponent(AUTH_USER)}`;
}

async function detectAuthuser(page) {
  const candidates = process.env.GSC_ACCOUNT
    ? [process.env.GSC_ACCOUNT, 0, 1, 2, 3, 4, 5]
    : [0, 1, 2, 3, 4, 5];
  for (const au of candidates) {
    // Probe the property overview page — the inspect deep-link 404s until the
    // property has been opened once in the session, so it's a bad access test.
    const probe = `https://search.google.com/search-console?resource_id=${RESOURCE_ID}&authuser=${encodeURIComponent(au)}`;
    await page.goto(probe, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(5000);
    if (page.url().includes('accounts.google.com')) continue; // slot not logged in
    if (!(await isGoogle404(page))) {
      console.log(`✓ Found working Google session: authuser=${au}`);
      return au;
    }
  }
  return null;
}

const DELAY_BETWEEN = 4000; // ms between requests (be polite to Google's UI)

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function requestIndexing(page, url) {
  console.log(`\n[${new Date().toLocaleTimeString()}] Inspecting: ${url}`);

  try {
    // Drive the "Inspect any URL" box at the top of the GSC UI — the
    // /search-console/inspect deep-link 404s no matter the account, so
    // we type into the search box exactly like a human would.
    let box = page.locator('input[aria-label*="Inspect" i]').first();
    if (!(await box.isVisible().catch(() => false))) {
      await page.goto(overviewUrl(), { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(5000);
      box = page.locator('input[aria-label*="Inspect" i]').first();
      if (!(await box.isVisible().catch(() => false))) {
        box = page.locator('header input, input[placeholder*="Inspect" i]').first();
      }
      if (!(await box.isVisible().catch(() => false))) {
        await page.screenshot({ path: `scripts/no-searchbox-${Date.now()}.png` }).catch(() => {});
        throw new Error('could not find the "Inspect any URL" search box');
      }
    }

    // Clear any leftover dialog from the previous URL, then focus the box
    const leftover = page.getByRole('button', { name: /got it|ok|done/i }).first();
    if (await leftover.isVisible().catch(() => false)) await leftover.click().catch(() => {});
    try {
      await box.click({ timeout: 10000 });
    } catch {
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(1000);
      await box.click({ timeout: 15000 });
    }
    await box.fill(url);
    await page.keyboard.press('Enter');

    // Wait for the inspection result panel ("URL is/is not on Google") — can take 10-20s
    await page.waitForSelector('text=/URL is (on|not on) Google/i', { timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Stop the whole run when the daily quota is reached
    const verdictText = await page.locator('body').innerText().catch(() => '');
    if (/quota exceeded/i.test(verdictText)) {
      throw new Error('DAILY_QUOTA_EXCEEDED');
    }

    // Look for "Request Indexing" button
    const requestBtn = page.getByRole('button', { name: /request indexing/i });
    const btnVisible = await requestBtn.isVisible().catch(() => false);

    if (btnVisible) {
      console.log('  → Clicking "Request Indexing"... (Google live-tests the URL, takes 1-2 min)');
      await requestBtn.click();

      // Google shows a "Submitting request" dialog while it live-tests the
      // URL (can take minutes). Wait it out — navigating away cancels the
      // request, and the open dialog blocks every later click.
      let confirmed = false;
      for (let waited = 0; waited < 300000; waited += 3000) {
        await page.waitForTimeout(3000);
        const text = await page.locator('body').innerText().catch(() => '');
        if (/quota exceeded/i.test(text)) throw new Error('DAILY_QUOTA_EXCEEDED');
        if (/indexing requested|already requested/i.test(text)) { confirmed = true; break; }
        const gotItNow = page.getByRole('button', { name: /got it/i });
        if (await gotItNow.isVisible().catch(() => false)) { confirmed = true; break; }
        // keep waiting while the dialog shows Submitting/Testing/Requesting
        if (!/submitting|testing|requesting/i.test(text)) break;
      }

      // Dismiss whatever dialog is up so it can't block the next URL
      const gotItBtn = page.getByRole('button', { name: /got it|ok|done/i }).first();
      if (await gotItBtn.isVisible().catch(() => false)) {
        await gotItBtn.click().catch(() => {});
      } else if (!confirmed) {
        await page.keyboard.press('Escape').catch(() => {});
      }

      if (confirmed) {
        console.log('  ✓ Indexing requested successfully');
      } else {
        console.log('  ⚠ No confirmation seen — request may not have registered');
        await page.screenshot({ path: `scripts/noconfirm-${Date.now()}.png` }).catch(() => {});
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
          // Same live-test wait as the primary path
          for (let waited = 0; waited < 180000; waited += 3000) {
            await page.waitForTimeout(3000);
            const text = await page.locator('body').innerText().catch(() => '');
            if (/quota exceeded/i.test(text)) throw new Error('DAILY_QUOTA_EXCEEDED');
            if (/indexing requested|already requested/i.test(text)) break;
            if (!/submitting|testing|requesting/i.test(text)) break;
          }
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
    if (err.message === 'DAILY_QUOTA_EXCEEDED') throw err;
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
  await page.goto('https://search.google.com/search-console/welcome', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Wait until the user is logged in (poll instead of a fixed sleep)
  if (page.url().includes('accounts.google.com')) {
    console.log('⚠ Please log in to Google in the browser window that just opened.');
    console.log('  Waiting up to 3 minutes for you to complete login...\n');
    for (let waited = 0; waited < 180000; waited += 5000) {
      await sleep(5000);
      if (!page.url().includes('accounts.google.com')) break;
    }
    if (page.url().includes('accounts.google.com')) {
      console.log('✗ Still not logged in after 3 minutes — exiting. Run the script again.');
      await browser.close();
      process.exit(1);
    }
    console.log('✓ Login detected!\n');
  } else {
    console.log('✓ Already logged in!\n');
  }

  // Find which Google session slot actually has Search Console access.
  console.log('Detecting which signed-in account has access to the property...');
  AUTH_USER = await detectAuthuser(page);

  if (AUTH_USER === null) {
    console.log('\n⚠ None of the signed-in accounts can open this Search Console property.');
    console.log('  In the browser window: log in (or add an account) with the Google');
    console.log('  account you normally use to open Search Console for ifastroadside.ca.');
    console.log('  I will re-check every 30 seconds for up to 5 minutes...\n');
    for (let waited = 0; waited < 300000 && AUTH_USER === null; waited += 30000) {
      await sleep(30000);
      AUTH_USER = await detectAuthuser(page);
    }
    if (AUTH_USER === null) {
      console.log('✗ Still no account with access — exiting. Add the right account and rerun.');
      await browser.close();
      process.exit(1);
    }
  }
  console.log(`Starting submissions using authuser=${AUTH_USER}...\n`);

  // Process each URL
  const results = { success: [], skipped: [], failed: [] };

  for (let i = 0; i < URLS.length; i++) {
    const url = URLS[i];
    console.log(`\n[${i + 1}/${URLS.length}]`);

    try {
      await requestIndexing(page, url);
      results.success.push(url);
    } catch (err) {
      if (err.message === 'DAILY_QUOTA_EXCEEDED') {
        console.log('\n⚠ Google\'s daily "Request Indexing" quota is used up.');
        console.log('  Remaining URLs will be picked up from the sitemap, or rerun');
        console.log('  this script tomorrow to request them explicitly.');
        results.failed.push(...URLS.slice(i));
        break;
      }
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
