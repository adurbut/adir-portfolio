const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SITES = [
  {
    url: 'https://lotanchik.vercel.app/',
    id: 'lotanchik',
    slots: ['cs-hero-lotanchik', 'cs-challenge-lotanchik', 'cs-solution-lotanchik',
            'cs-screen-lotanchik-0', 'cs-screen-lotanchik-1', 'cs-screen-lotanchik-2', 'cs-screen-lotanchik-3'],
    portfolio: 'work-lotanchik',
    // scroll positions as fraction of page height for each slot
    scrolls: [0, 0.22, 0.5, 0, 0.35, 0, 0.28],
    mobileSlots: [5, 6], // indices that should use mobile viewport
  },
  {
    url: 'https://sushi-kivunim.vercel.app/',
    id: 'sushi',
    slots: ['cs-hero-sushi', 'cs-challenge-sushi', 'cs-solution-sushi',
            'cs-screen-sushi-0', 'cs-screen-sushi-1', 'cs-screen-sushi-2', 'cs-screen-sushi-3'],
    portfolio: 'work-sushi',
    scrolls: [0, 0.3, 0.55, 0, 0.4, 0, 0.3],
    mobileSlots: [5, 6],
    login: process.env.SUSHI_USER ? { user: process.env.SUSHI_USER, pass: process.env.SUSHI_PASS } : null,
  },
  {
    url: 'https://didifun.co.il/',
    id: 'didi',
    slots: ['cs-hero-didi', 'cs-challenge-didi', 'cs-solution-didi',
            'cs-screen-didi-0', 'cs-screen-didi-1', 'cs-screen-didi-2', 'cs-screen-didi-3'],
    portfolio: 'work-didi',
    scrolls: [0, 0.25, 0.5, 0, 0.38, 0, 0.25],
    mobileSlots: [5, 6],
    extraWait: 3000,
  },
];

async function toDataUrl(buffer) {
  return 'data:image/png;base64,' + buffer.toString('base64');
}

async function dismissPopups(page) {
  // press Escape first
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // try clicking visible close buttons
  const closers = [
    'button[aria-label*="close" i]', 'button[aria-label*="סגור"]',
    'button:has-text("סגור")', 'button:has-text("Close")',
    'button:has-text("OK")', 'button:has-text("אישור")',
    'button:has-text("המשך")', 'button:has-text("קבל")',
    '[class*="close"]', '[class*="Close"]',
    '[class*="overlay"] button', '[class*="modal"] button',
    '[class*="popup"] button', '[class*="dialog"] button',
  ];
  for (const sel of closers) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 400 })) {
        await btn.click();
        await page.waitForTimeout(500);
        break;
      }
    } catch {}
  }

  // remove ALL fixed-position elements except sticky navs/headers
  await page.evaluate(() => {
    const keep = new Set();
    // mark real nav/header elements to keep
    document.querySelectorAll('nav, header, [role="navigation"], [role="banner"]').forEach(el => {
      let cur = el;
      while (cur) { keep.add(cur); cur = cur.parentElement; }
    });
    document.querySelectorAll('*').forEach(el => {
      if (keep.has(el)) return;
      try {
        const s = window.getComputedStyle(el);
        if (s.position === 'fixed') el.remove();
      } catch {}
    });
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  });
  await page.waitForTimeout(400);
}

async function login(page, creds) {
  await page.fill('input[type="email"], input[type="text"], input[name="email"], input[name="username"]', creds.user);
  await page.fill('input[type="password"]', creds.pass);
  await page.click('button[type="submit"], button:has-text("כניסה"), button:has-text("התחבר")');
  await page.waitForTimeout(3000);
}

async function waitForFullLoad(page, extraWait = 0) {
  // wait for fonts
  await page.evaluate(() => document.fonts.ready);
  // scroll full page to trigger lazy-loaded images
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let pos = 0;
      const step = () => {
        window.scrollTo(0, pos);
        pos += 400;
        if (pos < document.body.scrollHeight) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  });
  await page.waitForTimeout(2000);
  // wait for all images to finish loading
  await page.evaluate(() => Promise.all(
    Array.from(document.images).map(img =>
      img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })
    )
  ));
  await page.waitForTimeout(1000 + extraWait);
  // scroll back to top and wait for page to settle
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(2000);
  // verify we're at top
  await page.evaluate(() => { document.documentElement.scrollTop = 0; window.scrollY && window.scrollTo(0, 0); });
  await page.waitForTimeout(500);
}

async function shoot(page, scroll) {
  if (scroll > 0) {
    await page.evaluate((s) => window.scrollTo(0, document.body.scrollHeight * s), scroll);
    await page.waitForTimeout(800);
  }
  return page.screenshot({ type: 'png' });
}

(async () => {
  const customExe = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const launchOpts = {
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
           '--disable-blink-features=AutomationControlled'],
  };
  if (fs.existsSync(customExe)) launchOpts.executablePath = customExe;
  const browser = await chromium.launch(launchOpts);

  const outDir = path.join(__dirname, 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });

  const sidecar = {};

  for (const site of SITES) {
    console.log(`\n📸  ${site.url}`);

    // ── Desktop context ──────────────────────────────────────
    const ctxD = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      ignoreHTTPSErrors: true,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      locale: 'he-IL',
      extraHTTPHeaders: { 'Accept-Language': 'he-IL,he;q=0.9,en-US;q=0.8' },
    });
    const pageD = await ctxD.newPage();

    try {
      await pageD.goto(site.url, { waitUntil: 'networkidle', timeout: 45000 });
      await pageD.waitForTimeout(3000);

      if (site.login) {
        await login(pageD, site.login);
        console.log(`  🔑 logged in`);
        await pageD.waitForTimeout(3000);
      }

      await waitForFullLoad(pageD, site.extraWait || 0);
      await dismissPopups(pageD);
      console.log(`  ✓ page fully loaded`);

      // portfolio card thumbnail — ensure we're at the very top
      await pageD.evaluate(() => { window.scrollTo(0, 0); document.documentElement.scrollTop = 0; });
      await pageD.waitForTimeout(1500);
      const portfolioBuf = await shoot(pageD, 0);
      fs.writeFileSync(path.join(outDir, `${site.id}-desktop.png`), portfolioBuf);
      sidecar[site.portfolio] = { u: await toDataUrl(portfolioBuf), s: 1, x: 0, y: 0 };
      console.log(`  ✓ portfolio card: ${site.portfolio}`);

      for (let i = 0; i < site.slots.length; i++) {
        if (site.mobileSlots.includes(i)) continue;
        await pageD.evaluate(() => window.scrollTo(0, 0));
        await pageD.waitForTimeout(800);
        const buf = await shoot(pageD, site.scrolls[i]);
        fs.writeFileSync(path.join(outDir, `${site.id}-slot${i}.png`), buf);
        sidecar[site.slots[i]] = { u: await toDataUrl(buf), s: 1, x: 0, y: 0 };
        console.log(`  ✓ ${site.slots[i]}`);
      }
    } catch (err) {
      console.error(`  ✗ desktop: ${err.message}`);
    }
    await ctxD.close();

    // ── Mobile context ───────────────────────────────────────
    const ctxM = await browser.newContext({
      viewport: { width: 390, height: 844 },
      ignoreHTTPSErrors: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      locale: 'he-IL',
    });
    const pageM = await ctxM.newPage();

    try {
      await pageM.goto(site.url, { waitUntil: 'networkidle', timeout: 45000 });
      await pageM.waitForTimeout(3000);

      if (site.login) {
        await login(pageM, site.login);
        await pageM.waitForTimeout(3000);
      }

      await waitForFullLoad(pageM, site.extraWait || 0);
      await dismissPopups(pageM);

      for (const i of site.mobileSlots) {
        await pageM.evaluate(() => window.scrollTo(0, 0));
        await pageM.waitForTimeout(800);
        const buf = await shoot(pageM, site.scrolls[i]);
        fs.writeFileSync(path.join(outDir, `${site.id}-slot${i}-mobile.png`), buf);
        sidecar[site.slots[i]] = { u: await toDataUrl(buf), s: 1, x: 0, y: 0 };
        console.log(`  ✓ ${site.slots[i]} (mobile)`);
      }
    } catch (err) {
      console.error(`  ✗ mobile: ${err.message}`);
    }
    await ctxM.close();
  }

  await browser.close();

  const sidecarPath = path.join(__dirname, '.image-slots.state.json');
  fs.writeFileSync(sidecarPath, JSON.stringify(sidecar, null, 2));
  console.log(`\n✅  ${Object.keys(sidecar).length} slots → .image-slots.state.json`);
})();
