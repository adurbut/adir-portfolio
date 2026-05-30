const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITES = [
  {
    url: 'https://lotanchik.vercel.app/',
    id: 'lotanchik',
    slots: ['cs-hero-lotanchik', 'cs-challenge-lotanchik', 'cs-solution-lotanchik',
            'cs-screen-lotanchik-0', 'cs-screen-lotanchik-1', 'cs-screen-lotanchik-2', 'cs-screen-lotanchik-3'],
  },
  {
    url: 'https://sushi-kivunim.vercel.app/',
    id: 'sushi',
    slots: ['cs-hero-sushi', 'cs-challenge-sushi', 'cs-solution-sushi',
            'cs-screen-sushi-0', 'cs-screen-sushi-1', 'cs-screen-sushi-2', 'cs-screen-sushi-3'],
  },
  {
    url: 'https://didifun.co.il/',
    id: 'didi',
    slots: ['cs-hero-didi', 'cs-challenge-didi', 'cs-solution-didi',
            'cs-screen-didi-0', 'cs-screen-didi-1', 'cs-screen-didi-2', 'cs-screen-didi-3'],
  },
];

// Viewport configs to capture
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile',  width: 390,  height: 844 },
];

async function toDataUrl(buffer) {
  return 'data:image/png;base64,' + buffer.toString('base64');
}

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors'],
  });

  const outDir = path.join(__dirname, 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });

  // We'll build the sidecar state JSON for image-slot
  const sidecarState = {};

  for (const site of SITES) {
    console.log(`\n📸 Capturing ${site.url}`);
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      locale: 'he-IL',
    });
    const page = await context.newPage();

    try {
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Full-page desktop screenshot (hero slot)
      const heroShot = await page.screenshot({ type: 'png', fullPage: false });
      const heroFile = path.join(outDir, `${site.id}-desktop.png`);
      fs.writeFileSync(heroFile, heroShot);
      sidecarState[site.slots[0]] = { u: await toDataUrl(heroShot), s: 1, x: 0, y: 0 };
      console.log(`  ✓ hero: ${site.slots[0]}`);

      // Challenge slot — scroll to ~30% of page
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.25));
      await page.waitForTimeout(500);
      const challengeShot = await page.screenshot({ type: 'png', fullPage: false });
      fs.writeFileSync(path.join(outDir, `${site.id}-challenge.png`), challengeShot);
      sidecarState[site.slots[1]] = { u: await toDataUrl(challengeShot), s: 1, x: 0, y: 0 };
      console.log(`  ✓ challenge: ${site.slots[1]}`);

      // Solution slot — scroll to ~55%
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
      await page.waitForTimeout(500);
      const solutionShot = await page.screenshot({ type: 'png', fullPage: false });
      fs.writeFileSync(path.join(outDir, `${site.id}-solution.png`), solutionShot);
      sidecarState[site.slots[2]] = { u: await toDataUrl(solutionShot), s: 1, x: 0, y: 0 };
      console.log(`  ✓ solution: ${site.slots[2]}`);

      // Screen 0 — top of page full viewport
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      const s0 = await page.screenshot({ type: 'png' });
      sidecarState[site.slots[3]] = { u: await toDataUrl(s0), s: 1, x: 0, y: 0 };
      console.log(`  ✓ screen-0: ${site.slots[3]}`);

      // Screen 1 — scroll to ~40%
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4));
      await page.waitForTimeout(300);
      const s1 = await page.screenshot({ type: 'png' });
      sidecarState[site.slots[4]] = { u: await toDataUrl(s1), s: 1, x: 0, y: 0 };
      console.log(`  ✓ screen-1: ${site.slots[4]}`);

      // Screen 2 — mobile viewport
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(800);
      const s2 = await page.screenshot({ type: 'png' });
      sidecarState[site.slots[5]] = { u: await toDataUrl(s2), s: 1, x: 0, y: 0 };
      console.log(`  ✓ screen-2 (mobile): ${site.slots[5]}`);

      // Screen 3 — mobile scroll ~30%
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.3));
      await page.waitForTimeout(300);
      const s3 = await page.screenshot({ type: 'png' });
      sidecarState[site.slots[6]] = { u: await toDataUrl(s3), s: 1, x: 0, y: 0 };
      console.log(`  ✓ screen-3 (mobile-scroll): ${site.slots[6]}`);

    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }

    await context.close();
  }

  await browser.close();

  // Write sidecar state file that image-slot reads
  const sidecarPath = path.join(__dirname, '.image-slots.state.json');
  fs.writeFileSync(sidecarPath, JSON.stringify(sidecarState, null, 2));
  console.log(`\n✅ Done! Wrote ${Object.keys(sidecarState).length} slots to .image-slots.state.json`);
  console.log(`📁 PNGs saved to ./screenshots/`);
})();
