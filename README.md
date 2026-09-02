# El Paso Law Center — elpasolawyers.org

Bilingual (EN/ES) Astro static site for the Law Office of Robert Navar, deployed as a Cloudflare Worker (static assets + `/api/contact` lead endpoint via Resend).

- `src/data/catalog.ts` — hubs, services, slugs (EN/ES), court-appearance flag
- `src/content/parts/<hub>/*.json` — source content per service; `npm run content:merge` builds `src/content/<hub>.json`
- `src/templates/*` — page templates shared by `/` and `/es/` routes
- `worker/index.ts` — Cloudflare Worker (assets binding, `/api/contact` → Resend)
- `scripts/check-site.mjs` — post-build QA (links, titles, hreflang, sitemap)

## Develop
```
npm install
npm run dev
```
## Build & QA
```
npm run build && node scripts/check-site.mjs
```
## Deploy
Every push to `main` builds and deploys via Cloudflare Workers Builds (`npm run build` → `npx wrangler deploy`).
Secrets on the worker: `RESEND_API_KEY`. Vars: `LEAD_TO_EMAIL` (pre-launch override; remove at cutover so leads go to help@elpasolawyers.org).
