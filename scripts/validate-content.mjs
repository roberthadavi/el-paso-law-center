// Usage: node scripts/validate-content.mjs <hub-id> [...]
import fs from 'node:fs';
import path from 'node:path';

const catalogSrc = fs.readFileSync(new URL('../src/data/catalog.ts', import.meta.url), 'utf8');
// crude parse: extract hub ids and their service ids in order
const hubs = [];
// hubs are multi-line objects (`{\n    id:`), services are single-line (`{ id:`)
for (const m of catalogSrc.matchAll(/\{(\s*)id: '([a-z0-9-]+)',\s*slug: \{ en: '[^']+', es: '[^']+' \},\s*name:/g)) {
  if (m[1].includes('\n')) hubs.push({ id: m[2], services: [] });
  else hubs[hubs.length - 1].services.push(m[2]);
}
const courtOf = {};
for (const m of catalogSrc.matchAll(/\{ id: '([a-z0-9-]+)', slug: .*?court: '(never|remote|brief)' \}/g)) courtOf[m[1]] = m[2];

const isL = (v) => v && typeof v === 'object' && typeof v.en === 'string' && typeof v.es === 'string' && v.en.trim() && v.es.trim();
const errs = [];
const chk = (cond, msg) => { if (!cond) errs.push(msg); };

function checkL(v, name, max) {
  chk(isL(v), `${name}: must be {en,es} non-empty`);
  if (isL(v) && max) { chk(v.en.length <= max, `${name}.en > ${max} chars (${v.en.length})`); chk(v.es.length <= max + 10, `${name}.es > ${max + 10} chars (${v.es.length})`); }
  if (isL(v)) for (const l of ['en', 'es']) chk(!(/\[|lorem ipsum|\bTODO\b|\[insert/.test(v[l])) || /\[Notice|\[HIPAA/.test(v[l]), `${name}.${l}: placeholder text`);
}
function checkLArr(v, name, min, max) {
  chk(Array.isArray(v) && v.length >= min && v.length <= max, `${name}: need ${min}-${max} items`);
  if (Array.isArray(v)) v.forEach((x, i) => checkL(x, `${name}[${i}]`));
}
function checkFaqs(v, name, n) {
  chk(Array.isArray(v) && v.length === n, `${name}: need exactly ${n} faqs`);
  if (Array.isArray(v)) v.forEach((f, i) => { checkL(f.q, `${name}[${i}].q`); checkL(f.a, `${name}[${i}].a`); });
}

for (const hubId of process.argv.slice(2)) {
  const hub = hubs.find((h) => h.id === hubId);
  if (!hub) { errs.push(`unknown hub ${hubId}`); continue; }
  const file = path.resolve(`src/content/${hubId}.json`);
  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { errs.push(`${hubId}: invalid JSON — ${e.message}`); continue; }
  const H = data.hub || {};
  const p = `${hubId}.hub`;
  checkL(H.title, `${p}.title`, 60); checkL(H.metaDescription, `${p}.metaDescription`, 155); checkL(H.eyebrow, `${p}.eyebrow`); checkL(H.h1, `${p}.h1`, 90); checkL(H.summary, `${p}.summary`);
  checkLArr(H.intro, `${p}.intro`, 2, 2); checkFaqs(H.faqs, `${p}.faqs`, 3);
  const S = data.services || {};
  for (const sid of hub.services) {
    const s = S[sid]; const q = `${hubId}.services.${sid}`;
    if (!s) { errs.push(`${q}: missing`); continue; }
    checkL(s.title, `${q}.title`, 60); checkL(s.metaDescription, `${q}.metaDescription`, 155); checkL(s.eyebrow, `${q}.eyebrow`); checkL(s.h1, `${q}.h1`, 90); checkL(s.summary, `${q}.summary`);
    checkL(s.feeModel, `${q}.feeModel`); checkL(s.timeline, `${q}.timeline`);
    checkLArr(s.intro, `${q}.intro`, 3, 3);
    chk(Array.isArray(s.sections) && s.sections.length === 2, `${q}.sections: need 2`);
    if (Array.isArray(s.sections)) s.sections.forEach((sec, i) => { checkL(sec.heading, `${q}.sections[${i}].heading`); checkLArr(sec.body, `${q}.sections[${i}].body`, 1, 2); });
    checkLArr(s.included, `${q}.included`, 5, 7);
    chk(Array.isArray(s.process) && s.process.length === 3, `${q}.process: need 3`);
    if (Array.isArray(s.process)) s.process.forEach((st, i) => { checkL(st.title, `${q}.process[${i}].title`); checkL(st.body, `${q}.process[${i}].body`); });
    checkFaqs(s.faqs, `${q}.faqs`, 5);
    chk(Array.isArray(s.keywords) && s.keywords.length >= 4, `${q}.keywords: need >=4`);
    chk(Array.isArray(s.related) && s.related.length >= 2 && s.related.length <= 4, `${q}.related: need 2-4`);
    if (Array.isArray(s.related)) s.related.forEach((r) => chk(courtOf[r] !== undefined, `${q}.related: unknown service id "${r}"`));
    chk(Array.isArray(s.outbound) && s.outbound.length >= 1 && s.outbound.length <= 2, `${q}.outbound: need 1-2`);
    if (Array.isArray(s.outbound)) s.outbound.forEach((o, i) => { checkL(o.label, `${q}.outbound[${i}].label`); chk(/^https:\/\//.test(o.url || ''), `${q}.outbound[${i}].url must be https`); });
    const blob = JSON.stringify(s);
    chk((blob.match(/El Paso/g) || []).length >= 3, `${q}: mention "El Paso" >= 3 times`);
  }
  for (const k of Object.keys(S)) chk(hub.services.includes(k), `${hubId}: unexpected service key "${k}"`);
}
if (errs.length) { console.error(errs.join('\n')); console.error(`\n${errs.length} error(s)`); process.exit(1); }
console.log('OK');
