// Focused Google Search Console "Request Indexing" for the single new
// tire-pressure Scarborough story page. Mirrors index-blog-posts.cjs (uses
// your real Chrome profile so the Google session is already authenticated).
//
// Usage (close Chrome first so Playwright can use the profile):
//   node scripts/index-tire-pressure-page.cjs
const playwright = require('C:/Users/khati/AppData/Roaming/npm/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const BLOG_URLS = [
  'https://www.ifastroadside.ca/blog/correct-tire-pressure-scarborough',
];

const SEARCH_CONSOLE_BASE = 'https://search.google.com/search-console';
const CHROME_PROFILE = 'C:/Users/khati/AppData/Local/Google/Chrome/User Data';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function waitForRequestIndexingButton(page, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
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

  const inspectUrls = [
    `${SEARCH_CONSOLE_BASE}/inspect?resource_id=https%3A%2F%2Fifastroadside.ca%2F&id=${encodedUrl}`,
    `${SEARCH_CONSOLE_BASE}/inspect?resource_id=sc-domain%3Aifastroadside.ca&id=${encodedUrl}`,
  ];

  let onInspectPage = false;
  for (const inspectUrl of inspectUrls) {
    try {
      await page.goto(inspectUrl, { waitUntil: 'networkidle', timeout: 25000 });
      if (page.url().includes('search-console/inspect')) { onInspectPage = true; break; }
    } catch (_) {}
  }

  if (!onInspectPage) {
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

  console.log('   ⏳ Waiting for inspection to complete...');
  await page.waitForFunction(
    () => !document.querySelector('[aria-label="Loading"]') && !document.querySelector('.spinner'),
    { timeout: 25000 }
  ).catch(() => {});
  await page.waitForTimeout(4000);

  const screenshotPath = path.join(SCREENSHOTS_DIR, `${slug}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`   📸 Screenshot: ${screenshotPath}`);

  const btn = await waitForRequestIndexingButton(page, 15000);
  if (!btn) {
    console.log('   ⚠️  "Request Indexing" button not found (page may already be queued/indexed).');
    return;
  }

  const btnText = await btn.innerText().catch(() => '');
  console.log(`   🎯 Found button: "${btnText.trim()}"`);
  await btn.click({ timeout: 5000 });
  console.log('   ✅ Clicked "Request Indexing"! (Google live-tests the URL, ~1-2 min)');

  // Wait out the "Submitting request" dialog, then dismiss.
  let confirmed = false;
  for (let waited = 0; waited < 180000; waited += 3000) {
    await page.waitForTimeout(3000);
    const text = await page.locator('body').innerText().catch(() => '');
    if (/quota exceeded/i.test(text)) { console.log('   ⚠️  Daily quota exceeded.'); break; }
    if (/indexing requested|already requested/i.test(text)) { confirmed = true; break; }
    if (await page.getByRole('button', { name: /got it/i }).isVisible().catch(() => false)) { confirmed = true; break; }
    if (!/submitting|testing|requesting/i.test(text)) break;
  }

  const dismiss = page.getByRole('button', { name: /got it|ok|close|done/i }).first();
  if (await dismiss.isVisible({ timeout: 2000 }).catch(() => false)) await dismiss.click().catch(() => {});

  await page.waitForTimeout(1500);
  const finalPath = path.join(SCREENSHOTS_DIR, `${slug}-done.png`);
  await page.screenshot({ path: finalPath });
  console.log(`   ${confirmed ? '🎉 Indexing requested' : 'ℹ️  Finished (verify screenshot)'}: ${finalPath}`);
}

(async () => {
  console.log('━'.repeat(60));
  console.log('  iFAST — Request Indexing: tire-pressure Scarborough page');
  console.log('  Using your Chrome profile for auth');
  console.log('━'.repeat(60));
  console.log('\n⚠️  If Chrome is open, close it first so Playwright can use your session.\n');

  let context;
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
    const browser = await playwright.chromium.launch({ headless: false, args: ['--start-maximized'], slowMo: 200 });
    context = await browser.newContext({ viewport: null });
  }

  const page = await context.newPage();
  console.log('🌐 Opening Google Search Console...');
  await page.goto(`${SEARCH_CONSOLE_BASE}/`, { waitUntil: 'domcontentloaded', timeout: 20000 });

  const isLoggedIn = await page.locator('[aria-label*="Google Account"], [data-email], .property-row, [data-view-type="overview"]')
    .isVisible({ timeout: 6000 }).catch(() => false);
  if (!isLoggedIn) {
    const onLoginPage = page.url().includes('accounts.google.com') || await page.locator('input[type="email"]').isVisible({ timeout: 3000 }).catch(() => false);
    if (onLoginPage) {
      console.log('\n  ACTION REQUIRED: log into Google Search Console in the open window.');
      console.log('  The script will auto-continue once you reach the dashboard.\n');
      await page.waitForURL((u) => u.includes('search-console') && !u.includes('accounts.google'), { timeout: 180000 })
        .catch(() => console.log('Timed out waiting for login — trying to proceed...'));
      await page.waitForTimeout(3000);
    }
  } else {
    console.log('✅ Logged in to Search Console.\n');
  }

  for (const url of BLOG_URLS) {
    await requestIndexingForUrl(page, url);
  }

  console.log('\n' + '━'.repeat(60));
  console.log('  ✅ Done. Browser staying open — close it manually when satisfied.');
  console.log('━'.repeat(60) + '\n');
  await new Promise(() => {});
})();
