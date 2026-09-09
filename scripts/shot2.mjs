import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
await pg.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
await pg.screenshot({ path: '/tmp/top.jpg', type: 'jpeg', quality: 60 });
await pg.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await pg.waitForTimeout(400);
await pg.screenshot({ path: '/tmp/bottom.jpg', type: 'jpeg', quality: 60 });
await b.close();
