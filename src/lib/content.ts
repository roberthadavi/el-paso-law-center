import { HUBS, ALL_SERVICES, type CatalogHub, type CatalogService, type Lang, type L } from '../data/catalog';

export interface HubContent {
  title: L; metaDescription: L; eyebrow: L; h1: L; summary: L; intro: L[]; faqs: { q: L; a: L }[];
}
export interface ServiceContent {
  title: L; metaDescription: L; eyebrow: L; h1: L; summary: L; feeModel: L; timeline: L;
  intro: L[]; sections: { heading: L; body: L[] }[]; included: L[];
  process: { title: L; body: L }[]; faqs: { q: L; a: L }[];
  keywords: string[]; related: string[]; outbound: { label: L; url: string }[];
}
interface HubFile { hub: HubContent; services: Record<string, ServiceContent> }

const files = import.meta.glob<HubFile>('../content/*.json', { eager: true, import: 'default' });
const byHub: Record<string, HubFile> = {};
for (const [p, data] of Object.entries(files)) {
  const id = p.split('/').pop()!.replace(/\.json$/, '');
  byHub[id] = data;
}

export function hubContent(hubId: string): HubContent {
  const f = byHub[hubId];
  if (!f) throw new Error(`No content for hub ${hubId}`);
  return f.hub;
}
export function serviceContent(hubId: string, serviceId: string): ServiceContent {
  const f = byHub[hubId];
  const s = f?.services[serviceId];
  if (!s) throw new Error(`No content for service ${hubId}/${serviceId}`);
  return s;
}

export type ServiceWithHub = CatalogService & { hubId: string };
export function serviceById(id: string): ServiceWithHub {
  const s = ALL_SERVICES.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown service ${id}`);
  return s;
}
export function hubOf(service: ServiceWithHub): CatalogHub {
  return HUBS.find((h) => h.id === service.hubId)!;
}

/** Resolve a slug (EN or ES) to either a hub or a service */
export function resolveSlug(slug: string, lang: Lang):
  | { kind: 'hub'; hub: CatalogHub }
  | { kind: 'service'; hub: CatalogHub; service: ServiceWithHub }
  | null {
  for (const hub of HUBS) {
    if (hub.slug[lang] === slug) return { kind: 'hub', hub };
    for (const s of hub.services) if (s.slug[lang] === slug) return { kind: 'service', hub, service: { ...s, hubId: hub.id } };
  }
  return null;
}

export function allSlugs(lang: Lang): string[] {
  const out: string[] = [];
  for (const hub of HUBS) { out.push(hub.slug[lang]); for (const s of hub.services) out.push(s.slug[lang]); }
  return out;
}

export function pick(l: L, lang: Lang) { return l[lang]; }
