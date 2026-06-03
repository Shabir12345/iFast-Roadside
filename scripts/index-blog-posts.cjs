// Automates Google Search Console URL Inspection to request indexing
// for all 4 blog posts. Uses the globally installed Playwright.
// v3: Uses the user's Chrome profile (persistent context) so Google session
//     is already authenticated — no manual login required.
const playwright = require('C:/Users/khati/AppData/Roaming/npm/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const BLOG_URLS = [
  'https://ifastroadside.ca/blog/flat-tire-on-401-east-gta',
  'https://ifastroadside.ca/blog/winter-roadside-emergencies-ontario-guide',
  'https://ifastroadside.ca/blog/caa-vs-independent-roadside-assistance-ontario',
  'https://ifastroadside.ca/blog/mobile-mechanic-cost-ontario-pricing-guide',
];

const SEARCH_CONSOLE_BASE = 'https://search.google.com/search-console';
const CHROME_PROFILE = 'C:/Users/khati/AppData/Local/Google/Chrome/User Data';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function waitForRequestIndexingButton(page, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    // All known ways GSC renders the Request Indexing button/link
    const candidates = [
      page.getByRole('button', { name: /request indexing/i }),
      page.getByRole('link',   { name: /request indexing/i }),
      page.getByText('REQUEST INDEXING', { exact: true }),
      page.getByText('Request Indexing', { exact: true }),
      page.locator('[role="button"]').filter({ hasText: /request indexing/i }),
      page.locator('button').filter({ hasText: /request/i }),
      page.locator('[jsname]').filter({ hasText: /request indexing/i }),
    ];
    for (const loc of candidates) {
      try {
        if (await loc.first().isVisible({ timeout: 800 })) return loc.first();
      } catch (_) {}
    }
    await page.waitForTimeout(1000);
  }
  return null;
}

async function requestIndexingForUrl(page, url) {
  console.log(`\n📍 Processing: ${url}`);
  const slug = url.split('/').pop();
  const encodedUrl = encodeURIComponent(url);

  // Try both resource_id formats
  const inspectUrls = [
    `${SEARCH_CONSOLE_BASE}/inspect?resource_id=https%3A%2F%2Fifastroadside.ca%2F&id=${encodedUrl}`,
    `${SEARCH_CONSOLE_BASE}/inspect?resource_id=sc-domain%3Aifastroadside.ca&id=${encodedUrl}`,
  ];

  let onInspectPage = false;
  for (const inspectUrl of inspectUrls) {
    try {
      await page.goto(inspectUrl, { waitUntil: 'networkidle', timeout: 25000 });
      const currentUrl = page.url();
      if (currentUrl.includes('search-console/inspect')) {
        onInspectPage = true;
        break;
      }
    } catch (_) {}
  }

  if (!onInspectPage) {
    // Fall back: use the URL inspection search bar on the overview page
    console.log('   ↩️  Direct inspect URL redirected — using GSC search bar...');
    await page.goto(`${SEARCH_CONSOLE_BASE}/`, { waitUntil: 'networkidle', timeout: 20000 });
    const inspectInput = page.locator('input[aria-label*="Inspect"], input[placeholder*="Inspect"], [role="combobox"]').first();
    if (await inspectInput.isVisible({ timeout: 6000 }).catch(() => false)) {
      await inspectInput.fill(url);
      await page.keyboard.press('Enter');
      await page.waitForURL('**/inspect**', { timeout: 15000 }).catch(() => {});
      onInspectPage = page.url().includes('inspect');
    }
  }

  if (!onInspectPage) {
    console.log('   ❌ Could not reach URL inspection page — skipping.');
    return;
  }

  // Wait for GSC inspection to finish (it runs a live crawl simulation)
  console.log('   ⏳ Waiting for inspection to complete...');
  // GSC shows a spinner; wait for it to disappear or the result panel to appear
  await page.waitForFunction(
    () => !document.querySelector('[aria-label="Loading"]') && !document.querySelector('.spinner'),
    { timeout: 25000 }
  ).catch(() => {});
  await page.waitForTimeout(4000);

  // Screenshot for debugging
  const screenshotPath = path.join(SCREENSHOTS_DIR, `${slug}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`   📸 Screenshot: ${screenshotPath}`);

  // Find and click "Request Indexing"
  const btn = await waitForRequestIndexingButton(page, 15000);
  if (!btn) {
    // Print page text near "request" for diagnosis
    const textSamples = await page.evaluate(() => {
      const all = [...document.querySelectorAll('button, [role="button"], a, span, div')]
        .filter(el => /request/i.test(el.textContent || el.getAttribute('aria-label') || ''))
        .map(el => `<${el.tagName.toLowerCase()} role="${el.getAttribute('role') || ''}">"${(el.textContent || '').trim().substring(0, 70)}"`)
        .slice(0, 10);
      return all;
    });
    console.log('   ⚠️  "Request Indexing" button not found on page.');
    if (textSamples.length) {
      console.log('   Elements with "request" text:', textSamples.join(', '));
    } else {
      const title = await page.title();
      console.log(`   Page title: "${title}" — may be a login wall or wrong property.`);
    }
    return;
  }

  const btnText = await btn.innerText().catch(() => '');
  console.log(`   🎯 Found button: "${btnText.trim()}"`);
  await btn.click({ timeout: 5000 });
  console.log('   ✅ Clicked "Request Indexing"!');

  // Wait for and dismiss the confirmation/status dialog
  await page.waitForTimeout(6000);
  const dismissSelectors = [
    page.getByRole('button', { name: /got it|ok|close|done/i }),
    page.getByText('GOT IT', { exact: true }),
    page.getByText('Got it', { exact: true }),
    page.locator('[aria-label="Close"]'),
  ];
  for (const loc of dismissSelectors) {
    try {
      if (await loc.first().isVisible({ timeout: 2000 })) {
        await loc.first().click();
        console.log('   ✅ Dismissed confirmation');
        break;
      }
    } catch (_) {}
  }

  await page.waitForTimeout(1500);
  const finalPath = path.join(SCREENSHOTS_DIR, `${slug}-done.png`);
  await page.screenshot({ path: finalPath });
  console.log(`   🎉 Done! Final screenshot: ${finalPath}`);
}

(async () => {
  console.log('━'.repeat(60));
  console.log('  iFAST Blog Indexing Script v3');
  console.log('  Using your Chrome profile for auth');
  console.log('━'.repeat(60));
  console.log('\n⚠️  NOTE: If Chrome is currently open, please close it first');
  console.log('   so Playwright can access your saved Google session.\n');

  let context;

  // Try persistent context with real Chrome profile (avoids manual login)
  try {
    console.log('🔑 Attempting to use your Chrome profile...');
    context = await playwright.chromium.launchPersistentContext(CHROME_PROFILE, {
      headless: false,
      channel: 'chrome',
      args: ['--start-maximized', '--no-first-run', '--no-default-browser-check'],
      slowMo: 200,
      timeout: 15000,
    });
    console.log('   ✅ Chrome profile loaded.\n');
  } catch (profileErr) {
    console.log(`   ⚠️  Could not use Chrome profile (${profileErr.message.split('\n')[0]})`);
    console.log('   Falling back to fresh Chromium — you will need to log in manually.\n');

    const browser = await playwright.chromium.launch({
      headless: false,
      args: ['--start-maximized'],
      slowMo: 200,
    });
    context = await browser.newContext({ viewport: null });
  }

  const page = await context.newPage();

  // Navigate to Search Console and verify we're logged in
  console.log('🌐 Opening Google Search Console...');
  await page.goto(`${SEARCH_CONSOLE_BASE}/`, { waitUntil: 'domcontentloaded', timeout: 20000 });

  // Check for login wall
  const isLoggedIn = await page.locator('[aria-label*="Google Account"], [data-email], .property-row, [data-view-type="overview"]')
    .isVisible({ timeout: 6000 })
    .catch(() => false);

  if (!isLoggedIn) {
    const onLoginPage = page.url().includes('accounts.google.com') || await page.locator('input[type="email"]').isVisible({ timeout: 3000 }).catch(() => false);
    if (onLoginPage) {
      console.log('\n━'.repeat(60));
      console.log('  ACTION REQUIRED');
      console.log('  A Chrome window has opened on your screen.');
      console.log('  Please log into Google Search Console and');
      console.log('  navigate to the ifastroadside.ca property.');
      console.log('  The script will auto-continue.');
      console.log('━'.repeat(60) + '\n');
      // Wait up to 3 minutes for user to log in and reach GSC dashboard
      await page.waitForURL(
        (u) => u.includes('search-console') && !u.includes('accounts.google'),
        { timeout: 180000 }
      ).catch(() => console.log('Timed out waiting for login — trying to proceed...'));
      await page.waitForTimeout(3000);
    }
  } else {
    console.log('✅ Logged in to Search Console.\n');
  }

  // Process all 4 URLs
  for (const url of BLOG_URLS) {
    await requestIndexingForUrl(page, url);
  }

  console.log('\n' + '━'.repeat(60));
  console.log('  ✅ All 4 URLs processed!');
  console.log(`  Screenshots saved to: ${SCREENSHOTS_DIR}`);
  console.log('');
  console.log('  NOTE: Make sure the blog is deployed to Vercel');
  console.log('  (push to main) so Google can actually crawl the');
  console.log('  pages when it processes these indexing requests.');
  console.log('━'.repeat(60));
  console.log('\nBrowser staying open — close manually when done.\n');

  await new Promise(() => {});
})();
