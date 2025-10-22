// scripts/ab-test-extended.cjs
// Extended Playwright script to visit more AB variants and ratio values.
// Usage:
//   npm i -D playwright
//   npx playwright install chromium
//   node scripts/ab-test-extended.cjs

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const base = process.env.BASE_URL || 'http://localhost:5173/gpt-study/recipe1/tutorial';
  // Add several ratio variants to stress different thresholds
  const ratioVariants = [0.2, 0.4, 0.6, 0.8];
  const baseVariants = [
    { name: 'baseline', qs: '' },
    { name: 'waitLonger', qs: '?ab=waitLonger' },
    { name: 'delayRefresh', qs: '?ab=delayRefresh' },
    { name: 'disableIO', qs: '?ab=disableIO' }
  ];

  const variants = [];
  for (const b of baseVariants) {
    for (const r of ratioVariants) {
      const sep = b.qs && b.qs.includes('?') ? '&' : (b.qs ? '?' : '?');
      variants.push({ name: `${b.name}_ratio${r}`, qs: `${b.qs}${sep}ratio=${r}` });
    }
  }

  const outDir = path.resolve(__dirname, '..', 'tmp', 'ab-logs');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const v of variants) {
    const url = base + v.qs;
    const logfile = path.join(outDir, `ab-${v.name}.log`);
    const logs = [];
    console.log(`\n=== Visiting ${v.name}: ${url} ===`);

    const context = await browser.newContext();
    const page = await context.newPage();

    page.on('console', msg => {
      try {
        const text = `[${new Date().toISOString()}] ${msg.type().toUpperCase()}: ${msg.text()}`;
        logs.push(text);
        console.log(text);
      } catch (e) {}
    });

    page.on('pageerror', err => {
      const text = `[${new Date().toISOString()}] PAGEERROR: ${err.message}`;
      logs.push(text);
      console.error(text);
    });

    try {
      await page.goto(url, { waitUntil: 'networkidle' });

      // Wait for centering COMPLETE log (or timeout)
      const timeoutMs = 12000;
      const start = Date.now();
      let seenComplete = false;

      while (Date.now() - start < timeoutMs) {
        if (logs.find(l => l.includes('centering COMPLETE') || l.includes('Scroll completed to') || l.includes('Skipped expanded centering'))) {
          seenComplete = true;
          break;
        }
        await new Promise(r => setTimeout(r, 200));
      }

      // Allow some stability time after completion
      await new Promise(r => setTimeout(r, seenComplete ? 1500 : 2500));

    } catch (e) {
      logs.push(`[${new Date().toISOString()}] ERROR: ${e && e.message}`);
    }

    // Write logs
    try {
      fs.writeFileSync(logfile, logs.join('\n'));
      console.log(`Wrote ${logs.length} log lines to ${logfile}`);
    } catch (e) {
      console.error('Failed to write log', e);
    }

    try { await page.close(); } catch (e) {}
    try { await context.close(); } catch (e) {}
  }

  await browser.close();
  console.log('\nAll variants ran. Check tmp/ab-logs for outputs.');
})();