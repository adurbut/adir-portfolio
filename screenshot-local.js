const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3001';

const SHOTS = [
  // main portfolio cards
  { url: `${BASE}/mockup-lotanchik.html`, id: 'work-lotanchik', scroll: 0, w: 1440, h: 900 },
  { url: `${BASE}/mockup-sushi.html`,     id: 'work-sushi',     scroll: 0, w: 1440, h: 900 },
  { url: `${BASE}/mockup-didi.html`,      id: 'work-didi',      scroll: 0, w: 1440, h: 900 },
  // case study — lotanchik
  { url: `${BASE}/mockup-lotanchik.html`, id: 'cs-hero-lotanchik',       scroll: 0,    w: 1440, h: 900 },
  { url: `${BASE}/mockup-lotanchik.html`, id: 'cs-challenge-lotanchik',  scroll: 0.28, w: 1440, h: 900 },
  { url: `${BASE}/mockup-lotanchik.html`, id: 'cs-solution-lotanchik',   scroll: 0.55, w: 1440, h: 900 },
  { url: `${BASE}/mockup-lotanchik.html`, id: 'cs-screen-lotanchik-0',   scroll: 0,    w: 1440, h: 900 },
  { url: `${BASE}/mockup-lotanchik.html`, id: 'cs-screen-lotanchik-1',   scroll: 0.4,  w: 1440, h: 900 },
  { url: `${BASE}/mockup-lotanchik.html`, id: 'cs-screen-lotanchik-2',   scroll: 0,    w: 390,  h: 844 },
  { url: `${BASE}/mockup-lotanchik.html`, id: 'cs-screen-lotanchik-3',   scroll: 0.35, w: 390,  h: 844 },
  // case study — sushi
  { url: `${BASE}/mockup-sushi.html`, id: 'cs-hero-sushi',       scroll: 0, w: 1440, h: 900 },
  { url: `${BASE}/mockup-sushi.html`, id: 'cs-challenge-sushi',  scroll: 0, w: 1440, h: 900 },
  { url: `${BASE}/mockup-sushi.html`, id: 'cs-solution-sushi',   scroll: 0, w: 1440, h: 900 },
  { url: `${BASE}/mockup-sushi.html`, id: 'cs-screen-sushi-0',   scroll: 0, w: 1440, h: 900 },
  { url: `${BASE}/mockup-sushi.html`, id: 'cs-screen-sushi-1',   scroll: 0, w: 1440, h: 900 },
  { url: `${BASE}/mockup-sushi.html`, id: 'cs-screen-sushi-2',   scroll: 0, w: 390,  h: 844 },
  { url: `${BASE}/mockup-sushi.html`, id: 'cs-screen-sushi-3',   scroll: 0, w: 390,  h: 844 },
  // case study — didi
  { url: `${BASE}/mockup-didi.html`, id: 'cs-hero-didi',       scroll: 0,    w: 1440, h: 900 },
  { url: `${BASE}/mockup-didi.html`, id: 'cs-challenge-didi',  scroll: 0.3,  w: 1440, h: 900 },
  { url: `${BASE}/mockup-didi.html`, id: 'cs-solution-didi',   scroll: 0.55, w: 1440, h: 900 },
  { url: `${BASE}/mockup-didi.html`, id: 'cs-screen-didi-0',   scroll: 0,    w: 1440, h: 900 },
  { url: `${BASE}/mockup-didi.html`, id: 'cs-screen-didi-1',   scroll: 0.42, w: 1440, h: 900 },
  { url: `${BASE}/mockup-didi.html`, id: 'cs-screen-didi-2',   scroll: 0,    w: 390,  h: 844 },
  { url: `${BASE}/mockup-didi.html`, id: 'cs-screen-didi-3',   scroll: 0.38, w: 390,  h: 844 },
];

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const outDir = path.join(__dirname, 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });

  const sidecar = {};

  for (const s of SHOTS) {
    const ctx = await browser.newContext({ viewport: { width: s.w, height: s.h } });
    const page = await ctx.newPage();
    await page.goto(s.url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    if (s.scroll > 0) {
      await page.evaluate(sc => window.scrollTo(0, document.body.scrollHeight * sc), s.scroll);
      await page.waitForTimeout(400);
    }
    const buf = await page.screenshot({ type: 'png' });
    fs.writeFileSync(path.join(outDir, `${s.id}.png`), buf);
    sidecar[s.id] = { u: 'data:image/png;base64,' + buf.toString('base64'), s: 1, x: 0, y: 0 };
    console.log(`✓ ${s.id} (${s.w}×${s.h})`);
    await ctx.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(__dirname, '.image-slots.state.json'),
    JSON.stringify(sidecar, null, 2)
  );
  console.log(`\n✅  ${Object.keys(sidecar).length} slots saved`);
})();
