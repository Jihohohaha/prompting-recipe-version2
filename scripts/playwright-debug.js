/* Lightweight Playwright-like runner using Playwright if available.
   This file assumes Playwright is installed in the environment.
   It opens the app, navigates to recipe1/tutorial, waits for expansion and then
   performs a long manual-like scroll inside the content container and records
   console messages to tmp/playwright-logs.

   Run with:
     node scripts/playwright-debug.js

   If Playwright isn't installed, this script will print instructions.
*/

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve(process.cwd(), 'tmp', 'playwright-logs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

try {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const logs = [];
  page.on('console', msg => {
    const text = `[page] ${msg.type()}: ${msg.text()}`;
    logs.push(text);
    console.log(text);
  });
  page.on('pageerror', err => {
    const text = `[page] ERROR: ${err.toString()}`;
    logs.push(text);
    console.error(text);
  });

  const url = 'http://localhost:5173/gpt-study/recipe1/tutorial';
  console.log('navigating to', url);
  await page.goto(url, { waitUntil: 'networkidle' });

  // wait for the content main to be ready
  await page.waitForSelector('main');

  // Give SPA settle time
  await page.waitForTimeout(1200);

  // Stepwise scroll: do multiple incremental scrolls down the container
  const getScrollInfo = async () => {
    return await page.evaluate(() => {
      const c = document.querySelector('main');
      if (!c) return null;
      return { scrollTop: c.scrollTop, clientHeight: c.clientHeight, scrollHeight: c.scrollHeight };
    });
  };

  const infoBefore = await getScrollInfo();
  console.log('scroll info before', infoBefore);

  const steps = 80;
  for (let i = 0; i < steps; i++) {
    await page.evaluate(() => {
      const c = document.querySelector('main');
      if (!c) return;
      c.scrollBy({ top: Math.round(c.clientHeight * 0.25), behavior: 'smooth' });
    });
    await page.waitForTimeout(250);
  }

  const infoAfter = await getScrollInfo();
  console.log('scroll info after', infoAfter);

  // Give app time to react
  await page.waitForTimeout(1200);

  // Snapshot activeSection and URL from store via window access
  const storeSnapshot = await page.evaluate(() => {
    try {
      if (window.__USE_GPT_STUDY_STORE__ && window.__USE_GPT_STUDY_STORE__.getState) {
        const st = window.__USE_GPT_STUDY_STORE__.getState();
        return { activeSection: st.activeSection, expandedContent: st.expandedContent, url: location.pathname + location.search };
      }
      const activeEl = document.querySelector('.sidebar .active');
      return { domActive: activeEl ? activeEl.textContent : null, url: location.pathname + location.search };
    } catch (e) {
      return { error: e && e.toString() };
    }
  });

  console.log('storeSnapshot', storeSnapshot);

  const outFile = path.join(outDir, `playwright-${Date.now()}.log`);
  fs.writeFileSync(outFile, logs.join('\n'));
  console.log('Wrote log to', outFile);

  console.log('Test complete — leaving browser open for manual inspection. Close manually when done.');
} catch (e) {
  console.error('Playwright run failed:', e && (e.message || e));
  process.exit(1);
}
