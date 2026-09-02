# Content spec for El Paso Law Center service content

You are writing bilingual (English + Spanish) website copy for **El Paso Law Center**, the "one-stop legal services" website of the **Law Office of Robert Navar** in El Paso, Texas. Attorney: **Robert Navar** (Texas-licensed, El Paso native, 10+ years in El Paso County courts). Phone **(915) 526-0787**. Office: 11860 Vista Del Sol, El Paso, TX 79935. Email help@elpasolawyers.org.

Positioning: flat fees, plain English, most matters handled **without the client ever appearing in court** (some require one brief hearing the attorney handles, often by Zoom). Audience: everyday El Paso residents, many bilingual; many searching "X lawyer El Paso" / "abogado de X El Paso".

## Output
Write ONE JSON file: `src/content/<hub-id>.json` with this exact shape:

```json
{
  "hub": { ...HubContent },
  "services": { "<service-id>": { ...ServiceContent }, ... }
}
```

Every localized field is an object `{ "en": "...", "es": "..." }`. Spanish must be natural Mexican-border Spanish (El Paso / Juárez register), not machine-translated; keep legal terms of art in English in parentheses where locals use them (e.g. "expunción (expungement)", "orden de arresto (warrant)").

### HubContent
- `title` L — SEO <title>, ≤ 60 chars, pattern "El Paso <Hub> Lawyer | El Paso Law Center" (ES: "Abogado de <Hub> en El Paso | El Paso Law Center")
- `metaDescription` L — ≤ 155 chars, includes "El Paso", a benefit, and a call to action
- `eyebrow` L — small-caps label, e.g. "EL PASO ESTATE PLANNING ATTORNEY"
- `h1` L — compelling headline ≤ 90 chars, keyword-rich, human
- `summary` L — 1–2 sentences for cards/menus
- `intro` L[] — 2 paragraphs (each 60–110 words) explaining the practice group, Texas law context, and the no-court-appearance angle. Cite real Texas statutes/codes where relevant (e.g. Texas Estates Code, Texas Code of Criminal Procedure Ch. 55, Texas Transportation Code § 521, Texas Family Code Ch. 45).
- `faqs` — 3 items `{ "q": L, "a": L }`, answers 40–80 words

### ServiceContent (for each service id listed in the assignment)
- `title` L — SEO <title>, ≤ 60 chars, pattern "<Service> Lawyer El Paso | El Paso Law Center" (shorten as needed)
- `metaDescription` L — ≤ 155 chars
- `eyebrow` L
- `h1` L — ≤ 90 chars
- `summary` L — 1–2 sentences for cards
- `feeModel` L — short, e.g. "Flat fee, quoted upfront" / "Contingency — no fee unless we recover" / "Flat fee + filing costs"
- `timeline` L — short, e.g. "Typically 2–4 weeks" (be honest and realistic for Texas/El Paso; for immigration use USCIS realistic ranges)
- `intro` L[] — 3 paragraphs (each 70–120 words). Paragraph 1: what the service is and who needs it, in El Paso context. Paragraph 2: the Texas/federal legal framework with at least one real statute or form number. Paragraph 3: how the firm handles it, the court-appearance reality, and why hiring a lawyer beats DIY.
- `sections` — 2 items `{ "heading": L, "body": L[] }`, each body 1–2 paragraphs (60–100 words). Good headings: eligibility/requirements, common mistakes, what happens after, costs & timeline, El Paso-specific court/office details (El Paso County Clerk, 34th/41st District Courts, USCIS El Paso Field Office, Texas Secretary of State, etc.).
- `included` L[] — 5–7 bullets, "what's included" in the flat fee (concrete deliverables)
- `process` — 3 steps `{ "title": L, "body": L }` (body 25–45 words)
- `faqs` — 5 items `{ "q": L, "a": L }`, answers 40–80 words, written to match real search queries ("How long does X take in Texas?", "Do I have to go to court for X?", "How much does X cost in El Paso?")
- `keywords` string[] — 4–6 English target keywords
- `outbound` — 1–2 items `{ "label": L, "url": "https://..." }` linking to authoritative sources: Texas statutes (statutes.capitol.texas.gov), Texas DPS, USCIS, Texas Secretary of State, El Paso County, Texas Workforce Commission, FTC, etc. Use real, stable URLs only (top-level agency pages are safest).

## Rules
- Accuracy over hype. Do not invent statistics, case results, or guarantees. Never promise outcomes.
- Court-appearance honesty: the catalog says for each service whether the client appears `never`, `remote` (brief hearing usually by Zoom) or `brief` (one short hearing the attorney handles). Reflect that accurately in the copy.
- No placeholder text, no lorem ipsum, no "[insert]". No markdown inside strings. Plain text only; you may use a single em dash and normal punctuation.
- Every service must mention "El Paso" naturally at least 3 times across its copy, and include internal-link-worthy references to related services by their plain names (the template links them automatically via `related`).
- `related` string[] — 2–4 service ids from the catalog (any hub) that are logically related.
- Keep JSON strictly valid (escape quotes, no trailing commas). Validate with `node scripts/validate-content.mjs <hub-id>` before finishing, and fix any error it reports.
