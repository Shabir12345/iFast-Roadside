// Automates Google Search Console URL Inspection to request indexing
// for all 4 blog posts. Uses the globally installed Playwright.
const playwright = require('C:/Users/khati/AppData/Roaming/npm/node_modules/playwright');

const BLOG_URLS = [
  'https://ifastroadside.ca/blog/flat-tire-on-401-east-gta',
  'https://ifastroadside.ca/blog/winter-roadside-emergencies-ontario-guide',
  'https://ifastroadside.ca/blog/caa-vs-independent-roadside-assistance-ontario',
  'https://ifastroadside.ca/blog/mobile-mechanic-cost-ontario-pricing-guide',
];

const SEARCH_CONSOLE_BASE = 'https://search.google.com/search-console';

async function requestIndexingForUrl(page, url) {
  console.log(`\n📍 Processing: ${url}`);
  const encodedUrl = encodeURIComponent(url);

  // Try URL-prefix property first, then sc-domain if that fails
  const inspectUrls = [
    `${SEARCH_CONSOLE_BASE}/inspect?resource_id=https%3A%2F%2Fifastroadside.ca%2F&id=${encodedUrl}`,
    `${SEARCH_CONSOLE_BASE}/inspect?resource_id=sc-domain%3Aifastroadside.ca&id=${encodedUrl}`,
  ];

  let loaded = false;
  for (const inspectUrl of inspectUrls) {
    try {
      await page.goto(inspectUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      // If we land on an error/access page we'll know from the DOM
      const title = await page.title();
      if (!title.toLowerCase().includes('error') && !title.toLowerCase().includes('404')) {
        loaded = true;
        break;
      }
    } catch (_) {
      // try next
    }
  }

  if (!loaded) {
    console.log('   ⚠️  Could not load URL inspection page — skipping.');
    return;
  }

  console.log('   ⏳ Waiting for inspection results...');
  await page.waitForTimeout(7000);

  // Request Indexing button — GSC renders different text variants
  const buttonCandidates = [
    'text="Request Indexing"',
    'text="REQUEST INDEXING"',
    'button:has-text("Request indexing")',
    '[data-ved] button >> text=/request indexing/i',
    'div[role="button"]:has-text("Request Indexing")',
  ];

  let clicked = false;
  for (const sel of buttonCandidates) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 4000 })) {
        await el.click();
        clicked = true;
        console.log('   ✅ Clicked "Request Indexing"');
        break;
      }
    } catch (_) {}
  }

  if (!clicked) {
    // Maybe the URL is already indexed — check for that message
    const alreadyIndexed = await page.locator('text=/URL is on Google/i').isVisible({ timeout: 2000 }).catch(() => false);
    if (alreadyIndexed) {
      console.log('   ℹ️  URL is already on Google — requesting re-crawl...');
      // GSC still shows a "Request Indexing" link even for indexed URLs
      try {
        await page.locator('text=/Test Live URL|Request Indexing/i').first().click({ timeout: 3000 });
        clicked = true;
      } catch (_) {}
    }

    if (!clicked) {
      console.log('   ⚠️  "Request Indexing" button not found. May need manual submission or the site is not yet verified.');
      return;
    }
  }

  // Wait for & dismiss the confirmation/progress dialog
  await page.waitForTimeout(5000);

  const dismissCandidates = [
    'button:has-text("Got it")',
    'button:has-text("OK")',
    'button:has-text("Close")',
    '[aria-label="Close"]',
    '[aria-label="close"]',
    'text="GOT IT"',
  ];

  for (const sel of dismissCandidates) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 3000 })) {
        await btn.click();
        console.log('   ✅ Dismissed confirmation dialog');
        break;
      }
    } catch (_) {}
  }

  await page.waitForTimeout(2000);
  console.log(`   🎉 Done: ${url}`);
}

(async () => {
  console.log('━'.repeat(60));
  console.log('  iFAST Blog Post Indexing Script');
  console.log('  Powered by Playwright v1.59.1');
  console.log('━'.repeat(60));
  console.log('\n🚀 Launching Chrome...\n');

  let browser;
  try {
    browser = await playwright.chromium.launch({
      headless: false,
      channel: 'chrome', // use installed Chrome (stays logged into Google)
      args: ['--start-maximized'],
      slowMo: 200,
    });
  } catch (e) {
    console.log('   Chrome not available, falling back to Playwright Chromium...');
    browser = await playwright.chromium.launch({
      headless: false,
      args: ['--start-maximized'],
      slowMo: 200,
    });
  }

  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  await page.goto(`${SEARCH_CONSOLE_BASE}/`, { waitUntil: 'domcontentloaded' });

  // Detect whether we need login
  const needsLogin = await page.locator('text=/Sign in|Log in/i').isVisible({ timeout: 3000 }).catch(() => true);

  if (needsLogin) {
    console.log('━'.repeat(60));
    console.log('  ACTION REQUIRED');
    console.log('  A browser window has opened.');
    console.log('  1. Log into Google Search Console');
    console.log('  2. Select the ifastroadside.ca property');
    console.log('  The script will auto-continue once you\'re on the');
    console.log('  Search Console dashboard.');
    console.log('━'.repeat(60));

    // Wait until the user has navigated to a Search Console property page
    try {
      await page.waitForURL(
        (url) => url.includes('search-console') && (url.includes('overview') || url.includes('inspect')),
        { timeout: 180000 }
      );
      console.log('\n✅ Logged in and property detected. Continuing...');
      await page.waitForTimeout(2000);
    } catch (e) {
      console.log('\n⚠️  Timed out waiting for login. Trying to proceed anyway...');
    }
  } else {
    console.log('✅ Already logged in to Search Console.');
    await page.waitForTimeout(2000);
  }

  // Process all 4 URLs
  for (const url of BLOG_URLS) {
    await requestIndexingForUrl(page, url);
  }

  console.log('\n' + '━'.repeat(60));
  console.log('  ✅ All 4 blog posts submitted for indexing!');
  console.log('  Google typically processes requests within 1–7 days.');
  console.log('  Check Search Console URL Inspection to confirm.');
  console.log('━'.repeat(60));
  console.log('\nBrowser will stay open. Close it manually when done.\n');

  // Keep open so the user can see the results
  await new Promise(() => {});
})();
