AB test helper

This script uses Playwright to open the local dev app and capture console logs for four AB variants:
- baseline
- waitLonger
- delayRefresh
- disableIO

Prereqs (run in repo root):

```powershell
npm i -D playwright
npx playwright install chromium
node scripts/ab-test.js
```

Outputs go to `tmp/ab-logs/ab-<variant>.log`.

Notes:
- Start your dev server (`npm run dev`) before running the script.
- The script runs the browser in headed mode for easier observation; set `headless: true` in the script if you prefer headless.
