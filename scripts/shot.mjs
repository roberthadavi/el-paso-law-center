import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }); 
const pages = [['home','/'],['hub','/estate-planning-lawyer-el-paso/'],['svc','/expungement-lawyer-el-paso/'],['es-svc','/es/abogado-cambio-de-nombre-el-paso/'],['contact','/contact/'],['practice','/practice-areas/']];
for (const [n,p] of pages) {
  const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await pg.goto('http://127.0.0.1:4321'+p, { waitUntil: 'networkidle' });
  await pg.screenshot({ path: `/tmp/shot-${n}.jpg`, fullPage: n==='home'||n==='svc', quality: 60, type: 'jpeg' });
  await pg.close();
}
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
await m.screenshot({ path: '/tmp/shot-mobile.jpg', quality: 60, type: 'jpeg' });
await m.click('[data-menu]'); await m.waitForTimeout(300);
await m.screenshot({ path: '/tmp/shot-mobile-menu.jpg', quality: 60, type: 'jpeg' });
await b.close();
