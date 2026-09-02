// Master catalog: hubs (practice-area groups) and services (landing pages).
// Content for each lives in src/content/<hub-id>.json (generated), keyed by service id.

export type Lang = 'en' | 'es';
export type L = { en: string; es: string };

export interface CatalogService {
  id: string;
  slug: L;           // URL slug without leading slash; ES lives under /es/
  name: L;           // short name for menus and cards
  court: 'never' | 'remote' | 'brief'; // client court appearance
}

export interface CatalogHub {
  id: string;
  slug: L;
  name: L;
  icon: string;      // emoji, matches source-site card style
  services: CatalogService[];
}

export const COURT_LABEL: Record<CatalogService['court'], L> = {
  never: { en: 'No court appearance', es: 'Sin comparecer en corte' },
  remote: { en: 'Brief hearing, usually by Zoom', es: 'Audiencia breve, usualmente por Zoom' },
  brief: { en: 'One short hearing, we handle it', es: 'Una audiencia corta, nosotros la manejamos' },
};

export const HUBS: CatalogHub[] = [
  {
    id: 'traffic-license',
    slug: { en: 'traffic-ticket-drivers-license-lawyer-el-paso', es: 'abogado-multas-licencia-el-paso' },
    name: { en: "Traffic Tickets & Driver's License", es: 'Multas de Tráfico y Licencia' },
    icon: '🚗',
    services: [
      { id: 'traffic-tickets', slug: { en: 'traffic-ticket-lawyer-el-paso', es: 'abogado-multas-de-trafico-el-paso' }, name: { en: 'Traffic Tickets', es: 'Multas de Tráfico' }, court: 'never' },
      { id: 'cdl-tickets', slug: { en: 'cdl-ticket-lawyer-el-paso', es: 'abogado-multa-cdl-el-paso' }, name: { en: 'CDL Tickets', es: 'Multas CDL' }, court: 'never' },
      { id: 'warrant-recall', slug: { en: 'warrant-recall-lawyer-el-paso', es: 'abogado-cancelar-orden-de-arresto-el-paso' }, name: { en: 'Warrant Recall', es: 'Cancelación de Orden de Arresto' }, court: 'never' },
      { id: 'failure-to-appear', slug: { en: 'failure-to-appear-lawyer-el-paso', es: 'abogado-falta-de-comparecencia-el-paso' }, name: { en: 'Failure to Appear & OmniBase Holds', es: 'Falta de Comparecencia y Bloqueo OmniBase' }, court: 'never' },
      { id: 'license-reinstatement', slug: { en: 'drivers-license-reinstatement-el-paso', es: 'reinstalacion-de-licencia-el-paso' }, name: { en: "Driver's License Reinstatement", es: 'Reinstalación de Licencia' }, court: 'never' },
      { id: 'occupational-license', slug: { en: 'occupational-drivers-license-el-paso', es: 'licencia-ocupacional-el-paso' }, name: { en: "Occupational Driver's License", es: 'Licencia Ocupacional' }, court: 'brief' },
      { id: 'alr-hearing', slug: { en: 'alr-hearing-dwi-license-suspension-el-paso', es: 'audiencia-alr-suspension-licencia-dwi-el-paso' }, name: { en: 'ALR Hearing (DWI License Suspension)', es: 'Audiencia ALR (Suspensión por DWI)' }, court: 'never' },
      { id: 'bonded-title', slug: { en: 'bonded-title-vehicle-title-problems-el-paso', es: 'titulo-con-fianza-problemas-de-titulo-el-paso' }, name: { en: 'Bonded Title & Vehicle Title Problems', es: 'Título con Fianza y Problemas de Título' }, court: 'never' },
    ],
  },
  {
    id: 'record-cleanup',
    slug: { en: 'expungement-record-sealing-lawyer-el-paso', es: 'abogado-eliminacion-de-antecedentes-el-paso' },
    name: { en: 'Criminal Record Cleanup', es: 'Limpieza de Antecedentes Penales' },
    icon: '📋',
    services: [
      { id: 'expunction', slug: { en: 'expungement-lawyer-el-paso', es: 'abogado-expuncion-el-paso' }, name: { en: 'Expunction (Expungement)', es: 'Expunción de Antecedentes' }, court: 'never' },
      { id: 'nondisclosure', slug: { en: 'order-of-nondisclosure-lawyer-el-paso', es: 'orden-de-no-divulgacion-el-paso' }, name: { en: 'Order of Nondisclosure (Record Sealing)', es: 'Orden de No Divulgación (Sellar Antecedentes)' }, court: 'never' },
      { id: 'dwi-nondisclosure', slug: { en: 'dwi-nondisclosure-lawyer-el-paso', es: 'no-divulgacion-dwi-el-paso' }, name: { en: 'DWI Nondisclosure', es: 'No Divulgación de DWI' }, court: 'never' },
      { id: 'juvenile-sealing', slug: { en: 'juvenile-record-sealing-el-paso', es: 'sellar-antecedentes-juveniles-el-paso' }, name: { en: 'Juvenile Record Sealing', es: 'Sellar Antecedentes Juveniles' }, court: 'never' },
      { id: 'background-check-review', slug: { en: 'background-check-review-el-paso', es: 'revision-de-antecedentes-el-paso' }, name: { en: 'Background Check Review', es: 'Revisión de Verificación de Antecedentes' }, court: 'never' },
    ],
  },
  {
    id: 'estate-planning',
    slug: { en: 'estate-planning-lawyer-el-paso', es: 'abogado-planificacion-patrimonial-el-paso' },
    name: { en: 'Wills & Estate Planning', es: 'Testamentos y Planificación Patrimonial' },
    icon: '📜',
    services: [
      { id: 'wills', slug: { en: 'will-lawyer-el-paso', es: 'abogado-de-testamentos-el-paso' }, name: { en: 'Wills', es: 'Testamentos' }, court: 'never' },
      { id: 'living-trusts', slug: { en: 'living-trust-lawyer-el-paso', es: 'abogado-fideicomiso-en-vida-el-paso' }, name: { en: 'Revocable Living Trusts', es: 'Fideicomisos en Vida Revocables' }, court: 'never' },
      { id: 'power-of-attorney', slug: { en: 'power-of-attorney-el-paso', es: 'poder-notarial-el-paso' }, name: { en: 'Durable Power of Attorney', es: 'Poder Notarial Duradero' }, court: 'never' },
      { id: 'medical-directives', slug: { en: 'medical-power-of-attorney-living-will-el-paso', es: 'poder-medico-y-testamento-vital-el-paso' }, name: { en: 'Medical POA, Living Will & HIPAA Release', es: 'Poder Médico, Testamento Vital y HIPAA' }, court: 'never' },
      { id: 'transfer-on-death-deed', slug: { en: 'transfer-on-death-deed-el-paso', es: 'escritura-de-transferencia-por-muerte-el-paso' }, name: { en: 'Transfer on Death Deed', es: 'Escritura de Transferencia por Muerte' }, court: 'never' },
      { id: 'lady-bird-deed', slug: { en: 'lady-bird-deed-el-paso', es: 'escritura-lady-bird-el-paso' }, name: { en: 'Lady Bird Deed', es: 'Escritura Lady Bird' }, court: 'never' },
      { id: 'declaration-of-guardian', slug: { en: 'declaration-of-guardian-el-paso', es: 'declaracion-de-tutor-el-paso' }, name: { en: 'Declaration of Guardian & Beneficiary Review', es: 'Declaración de Tutor y Revisión de Beneficiarios' }, court: 'never' },
    ],
  },
  {
    id: 'probate',
    slug: { en: 'probate-lawyer-el-paso', es: 'abogado-de-sucesiones-el-paso' },
    name: { en: 'Probate & Estate Administration', es: 'Sucesiones y Administración de Herencias' },
    icon: '⚖️',
    services: [
      { id: 'muniment-of-title', slug: { en: 'muniment-of-title-el-paso', es: 'muniment-of-title-titulo-de-herencia-el-paso' }, name: { en: 'Muniment of Title', es: 'Muniment of Title (Título de Herencia)' }, court: 'brief' },
      { id: 'small-estate-affidavit', slug: { en: 'small-estate-affidavit-el-paso', es: 'declaracion-jurada-de-herencia-pequena-el-paso' }, name: { en: 'Small Estate Affidavit', es: 'Declaración Jurada de Herencia Pequeña' }, court: 'never' },
      { id: 'affidavit-of-heirship', slug: { en: 'affidavit-of-heirship-el-paso', es: 'declaracion-jurada-de-herederos-el-paso' }, name: { en: 'Affidavit of Heirship', es: 'Declaración Jurada de Herederos' }, court: 'never' },
      { id: 'independent-administration', slug: { en: 'independent-administration-probate-el-paso', es: 'administracion-independiente-sucesion-el-paso' }, name: { en: 'Independent Administration', es: 'Administración Independiente' }, court: 'brief' },
      { id: 'determination-of-heirship', slug: { en: 'determination-of-heirship-el-paso', es: 'determinacion-de-herederos-el-paso' }, name: { en: 'Determination of Heirship', es: 'Determinación de Herederos' }, court: 'brief' },
    ],
  },
  {
    id: 'family',
    slug: { en: 'uncontested-family-law-lawyer-el-paso', es: 'abogado-derecho-familiar-sin-disputa-el-paso' },
    name: { en: 'Uncontested Family Law', es: 'Derecho Familiar Sin Disputa' },
    icon: '👨‍👩‍👧',
    services: [
      { id: 'adult-name-change', slug: { en: 'name-change-lawyer-el-paso', es: 'abogado-cambio-de-nombre-el-paso' }, name: { en: 'Adult Name Change', es: 'Cambio de Nombre de Adulto' }, court: 'remote' },
      { id: 'minor-name-change', slug: { en: 'child-name-change-el-paso', es: 'cambio-de-nombre-de-menor-el-paso' }, name: { en: 'Minor Name Change', es: 'Cambio de Nombre de Menor' }, court: 'remote' },
      { id: 'uncontested-divorce', slug: { en: 'uncontested-divorce-lawyer-el-paso', es: 'abogado-divorcio-sin-disputa-el-paso' }, name: { en: 'Uncontested Divorce', es: 'Divorcio Sin Disputa' }, court: 'remote' },
      { id: 'prenuptial-agreement', slug: { en: 'prenuptial-agreement-lawyer-el-paso', es: 'acuerdo-prenupcial-el-paso' }, name: { en: 'Prenuptial Agreement', es: 'Acuerdo Prenupcial' }, court: 'never' },
      { id: 'postnuptial-agreement', slug: { en: 'postnuptial-agreement-el-paso', es: 'acuerdo-postnupcial-el-paso' }, name: { en: 'Postnuptial Agreement', es: 'Acuerdo Postnupcial' }, court: 'never' },
      { id: 'stepparent-adoption', slug: { en: 'stepparent-adoption-lawyer-el-paso', es: 'adopcion-por-padrastro-el-paso' }, name: { en: 'Stepparent Adoption', es: 'Adopción por Padrastro o Madrastra' }, court: 'brief' },
      { id: 'adult-adoption', slug: { en: 'adult-adoption-el-paso', es: 'adopcion-de-adulto-el-paso' }, name: { en: 'Adult Adoption', es: 'Adopción de Adulto' }, court: 'brief' },
      { id: 'agreed-modification', slug: { en: 'agreed-custody-child-support-modification-el-paso', es: 'modificacion-de-custodia-por-acuerdo-el-paso' }, name: { en: 'Agreed Custody & Support Modification', es: 'Modificación de Custodia por Acuerdo' }, court: 'remote' },
    ],
  },
  {
    id: 'personal-injury',
    slug: { en: 'personal-injury-lawyer-el-paso', es: 'abogado-de-lesiones-personales-el-paso' },
    name: { en: 'Personal Injury', es: 'Lesiones Personales' },
    icon: '🏥',
    services: [
      { id: 'car-accident', slug: { en: 'car-accident-lawyer-el-paso', es: 'abogado-accidente-de-auto-el-paso' }, name: { en: 'Car Accidents', es: 'Accidentes de Auto' }, court: 'never' },
      { id: 'truck-accident', slug: { en: 'truck-accident-lawyer-el-paso', es: 'abogado-accidente-de-camion-el-paso' }, name: { en: 'Truck Accidents', es: 'Accidentes de Camión' }, court: 'never' },
      { id: 'motorcycle-accident', slug: { en: 'motorcycle-accident-lawyer-el-paso', es: 'abogado-accidente-de-motocicleta-el-paso' }, name: { en: 'Motorcycle Accidents', es: 'Accidentes de Motocicleta' }, court: 'never' },
      { id: 'slip-and-fall', slug: { en: 'slip-and-fall-lawyer-el-paso', es: 'abogado-caidas-y-resbalones-el-paso' }, name: { en: 'Slip and Fall', es: 'Caídas y Resbalones' }, court: 'never' },
      { id: 'dog-bite', slug: { en: 'dog-bite-lawyer-el-paso', es: 'abogado-mordida-de-perro-el-paso' }, name: { en: 'Dog Bites', es: 'Mordidas de Perro' }, court: 'never' },
      { id: 'uninsured-motorist', slug: { en: 'uninsured-motorist-lawyer-el-paso', es: 'abogado-motorista-sin-seguro-el-paso' }, name: { en: 'Uninsured Motorist Claims', es: 'Reclamos por Motorista Sin Seguro' }, court: 'never' },
      { id: 'wrongful-death', slug: { en: 'wrongful-death-lawyer-el-paso', es: 'abogado-muerte-por-negligencia-el-paso' }, name: { en: 'Wrongful Death', es: 'Muerte por Negligencia' }, court: 'never' },
      { id: 'property-damage', slug: { en: 'property-damage-diminished-value-claim-el-paso', es: 'reclamo-danos-a-propiedad-valor-disminuido-el-paso' }, name: { en: 'Property Damage & Diminished Value', es: 'Daños a Propiedad y Valor Disminuido' }, court: 'never' },
    ],
  },
  {
    id: 'immigration',
    slug: { en: 'immigration-lawyer-el-paso', es: 'abogado-de-inmigracion-el-paso' },
    name: { en: 'Immigration', es: 'Inmigración' },
    icon: '🌎',
    services: [
      { id: 'naturalization', slug: { en: 'citizenship-naturalization-lawyer-el-paso', es: 'abogado-ciudadania-naturalizacion-el-paso' }, name: { en: 'Citizenship & Naturalization (N-400)', es: 'Ciudadanía y Naturalización (N-400)' }, court: 'never' },
      { id: 'family-green-card', slug: { en: 'family-green-card-lawyer-el-paso', es: 'abogado-residencia-por-familia-el-paso' }, name: { en: 'Family-Based Green Card (I-130 / I-485)', es: 'Residencia por Petición Familiar (I-130 / I-485)' }, court: 'never' },
      { id: 'daca-renewal', slug: { en: 'daca-renewal-lawyer-el-paso', es: 'renovacion-daca-el-paso' }, name: { en: 'DACA Renewal', es: 'Renovación de DACA' }, court: 'never' },
      { id: 'work-permit', slug: { en: 'work-permit-ead-lawyer-el-paso', es: 'permiso-de-trabajo-ead-el-paso' }, name: { en: 'Work Permit (I-765)', es: 'Permiso de Trabajo (I-765)' }, court: 'never' },
      { id: 'tps', slug: { en: 'tps-temporary-protected-status-el-paso', es: 'tps-estatus-de-proteccion-temporal-el-paso' }, name: { en: 'Temporary Protected Status (TPS)', es: 'Estatus de Protección Temporal (TPS)' }, court: 'never' },
      { id: 'fiance-visa', slug: { en: 'k1-fiance-visa-lawyer-el-paso', es: 'visa-de-prometido-k1-el-paso' }, name: { en: 'K-1 Fiancé(e) Visa', es: 'Visa de Prometido(a) K-1' }, court: 'never' },
      { id: 'consular-processing', slug: { en: 'consular-processing-ciudad-juarez-lawyer', es: 'proceso-consular-ciudad-juarez' }, name: { en: 'Consular Processing (Ciudad Juárez)', es: 'Proceso Consular (Ciudad Juárez)' }, court: 'never' },
      { id: 'waivers', slug: { en: 'i-601a-provisional-waiver-lawyer-el-paso', es: 'perdon-i-601a-el-paso' }, name: { en: 'I-601 / I-601A Waivers', es: 'Perdones I-601 / I-601A' }, court: 'never' },
      { id: 'foia-request', slug: { en: 'immigration-foia-records-request-el-paso', es: 'solicitud-foia-inmigracion-el-paso' }, name: { en: 'Immigration FOIA Records Request', es: 'Solicitud de Expediente FOIA' }, court: 'never' },
    ],
  },
  {
    id: 'business',
    slug: { en: 'business-lawyer-el-paso', es: 'abogado-de-negocios-el-paso' },
    name: { en: 'Business & Startups', es: 'Negocios y Emprendedores' },
    icon: '🏢',
    services: [
      { id: 'llc-formation', slug: { en: 'llc-formation-lawyer-el-paso', es: 'formacion-de-llc-el-paso' }, name: { en: 'LLC Formation', es: 'Formación de LLC' }, court: 'never' },
      { id: 'corporation-formation', slug: { en: 'corporation-formation-el-paso', es: 'formacion-de-corporacion-el-paso' }, name: { en: 'Corporation Formation', es: 'Formación de Corporación' }, court: 'never' },
      { id: 'operating-agreement', slug: { en: 'llc-operating-agreement-el-paso', es: 'acuerdo-operativo-llc-el-paso' }, name: { en: 'Operating Agreements', es: 'Acuerdos Operativos' }, court: 'never' },
      { id: 'dba-filing', slug: { en: 'dba-assumed-name-filing-el-paso', es: 'registro-de-nombre-comercial-dba-el-paso' }, name: { en: 'DBA / Assumed Name Filing', es: 'Registro de Nombre Comercial (DBA)' }, court: 'never' },
      { id: 'contract-drafting', slug: { en: 'business-contract-lawyer-el-paso', es: 'abogado-de-contratos-comerciales-el-paso' }, name: { en: 'Contract Drafting & Review', es: 'Redacción y Revisión de Contratos' }, court: 'never' },
      { id: 'nda', slug: { en: 'nda-non-disclosure-agreement-el-paso', es: 'acuerdo-de-confidencialidad-nda-el-paso' }, name: { en: 'Non-Disclosure Agreements', es: 'Acuerdos de Confidencialidad (NDA)' }, court: 'never' },
      { id: 'independent-contractor', slug: { en: 'independent-contractor-agreement-el-paso', es: 'contrato-de-contratista-independiente-el-paso' }, name: { en: 'Independent Contractor Agreements', es: 'Contratos de Contratista Independiente' }, court: 'never' },
      { id: 'trademark', slug: { en: 'trademark-registration-lawyer-el-paso', es: 'registro-de-marca-el-paso' }, name: { en: 'Trademark Search & Registration', es: 'Búsqueda y Registro de Marca' }, court: 'never' },
      { id: 'registered-agent', slug: { en: 'registered-agent-service-el-paso', es: 'agente-registrado-el-paso' }, name: { en: 'Registered Agent Service', es: 'Servicio de Agente Registrado' }, court: 'never' },
      { id: 'business-purchase', slug: { en: 'business-purchase-sale-agreement-el-paso', es: 'compraventa-de-negocio-el-paso' }, name: { en: 'Business Purchase & Sale', es: 'Compraventa de Negocios' }, court: 'never' },
    ],
  },
  {
    id: 'real-estate',
    slug: { en: 'real-estate-lawyer-el-paso', es: 'abogado-de-bienes-raices-el-paso' },
    name: { en: 'Real Estate', es: 'Bienes Raíces' },
    icon: '🏠',
    services: [
      { id: 'deeds', slug: { en: 'deed-preparation-lawyer-el-paso', es: 'preparacion-de-escrituras-el-paso' }, name: { en: 'Deeds (Warranty, Quitclaim, Gift)', es: 'Escrituras (Garantía, Finiquito, Donación)' }, court: 'never' },
      { id: 'purchase-contracts', slug: { en: 'real-estate-purchase-contract-el-paso', es: 'contrato-de-compraventa-inmobiliaria-el-paso' }, name: { en: 'Purchase Contracts', es: 'Contratos de Compraventa' }, court: 'never' },
      { id: 'owner-finance', slug: { en: 'owner-financing-seller-finance-documents-el-paso', es: 'financiamiento-del-vendedor-el-paso' }, name: { en: 'Owner Financing Documents', es: 'Documentos de Financiamiento del Vendedor' }, court: 'never' },
      { id: 'residential-lease', slug: { en: 'residential-lease-drafting-el-paso', es: 'contrato-de-arrendamiento-residencial-el-paso' }, name: { en: 'Residential Leases', es: 'Arrendamientos Residenciales' }, court: 'never' },
      { id: 'commercial-lease', slug: { en: 'commercial-lease-lawyer-el-paso', es: 'arrendamiento-comercial-el-paso' }, name: { en: 'Commercial Leases', es: 'Arrendamientos Comerciales' }, court: 'never' },
      { id: 'lease-review', slug: { en: 'lease-review-for-tenants-el-paso', es: 'revision-de-contrato-de-renta-el-paso' }, name: { en: 'Lease Review for Tenants', es: 'Revisión de Contrato de Renta' }, court: 'never' },
      { id: 'title-curative', slug: { en: 'title-curative-lawyer-el-paso', es: 'correccion-de-titulo-de-propiedad-el-paso' }, name: { en: 'Title Curative Work', es: 'Corrección de Título de Propiedad' }, court: 'never' },
      { id: 'eviction-notice', slug: { en: 'eviction-notice-landlord-lawyer-el-paso', es: 'aviso-de-desalojo-el-paso' }, name: { en: 'Eviction Notices & Demand Letters', es: 'Avisos de Desalojo y Cartas de Demanda' }, court: 'never' },
    ],
  },
  {
    id: 'consumer-debt',
    slug: { en: 'consumer-debt-lawyer-el-paso', es: 'abogado-de-deudas-y-consumidor-el-paso' },
    name: { en: 'Consumer & Debt', es: 'Consumidor y Deudas' },
    icon: '💳',
    services: [
      { id: 'debt-settlement', slug: { en: 'debt-settlement-lawyer-el-paso', es: 'negociacion-de-deudas-el-paso' }, name: { en: 'Debt Settlement Negotiation', es: 'Negociación de Deudas' }, court: 'never' },
      { id: 'debt-collector-harassment', slug: { en: 'debt-collector-harassment-lawyer-el-paso', es: 'acoso-de-cobradores-el-paso' }, name: { en: 'Debt Collector Harassment (FDCPA)', es: 'Acoso de Cobradores (FDCPA)' }, court: 'never' },
      { id: 'credit-report-dispute', slug: { en: 'credit-report-dispute-lawyer-el-paso', es: 'disputa-de-reporte-de-credito-el-paso' }, name: { en: 'Credit Report Disputes', es: 'Disputas de Reporte de Crédito' }, court: 'never' },
      { id: 'lemon-law', slug: { en: 'lemon-law-lawyer-el-paso', es: 'ley-limon-autos-defectuosos-el-paso' }, name: { en: 'Lemon Law & Warranty Claims', es: 'Ley Limón y Reclamos de Garantía' }, court: 'never' },
      { id: 'chapter-7-bankruptcy', slug: { en: 'chapter-7-bankruptcy-lawyer-el-paso', es: 'abogado-bancarrota-capitulo-7-el-paso' }, name: { en: 'Chapter 7 Bankruptcy', es: 'Bancarrota Capítulo 7' }, court: 'brief' },
    ],
  },
  {
    id: 'employment',
    slug: { en: 'employment-lawyer-el-paso', es: 'abogado-laboral-el-paso' },
    name: { en: 'Employment', es: 'Derecho Laboral' },
    icon: '💼',
    services: [
      { id: 'severance-review', slug: { en: 'severance-agreement-review-el-paso', es: 'revision-de-acuerdo-de-indemnizacion-el-paso' }, name: { en: 'Severance Agreement Review', es: 'Revisión de Acuerdo de Indemnización' }, court: 'never' },
      { id: 'non-compete-review', slug: { en: 'non-compete-agreement-review-el-paso', es: 'revision-de-clausula-de-no-competencia-el-paso' }, name: { en: 'Non-Compete Review', es: 'Revisión de No Competencia' }, court: 'never' },
      { id: 'unpaid-wages', slug: { en: 'unpaid-wages-demand-letter-el-paso', es: 'salarios-no-pagados-el-paso' }, name: { en: 'Unpaid Wages & Overtime', es: 'Salarios y Horas Extra No Pagados' }, court: 'never' },
      { id: 'unemployment-appeal', slug: { en: 'unemployment-appeal-lawyer-el-paso', es: 'apelacion-de-desempleo-el-paso' }, name: { en: 'Unemployment Appeals (TWC)', es: 'Apelaciones de Desempleo (TWC)' }, court: 'never' },
    ],
  },
  {
    id: 'documents',
    slug: { en: 'legal-documents-demand-letters-el-paso', es: 'documentos-legales-cartas-de-demanda-el-paso' },
    name: { en: 'Letters & Legal Documents', es: 'Cartas y Documentos Legales' },
    icon: '✉️',
    services: [
      { id: 'demand-letter', slug: { en: 'demand-letter-lawyer-el-paso', es: 'carta-de-demanda-abogado-el-paso' }, name: { en: 'Demand Letters', es: 'Cartas de Demanda' }, court: 'never' },
      { id: 'cease-and-desist', slug: { en: 'cease-and-desist-letter-el-paso', es: 'carta-de-cese-y-desistimiento-el-paso' }, name: { en: 'Cease and Desist Letters', es: 'Cartas de Cese y Desistimiento' }, court: 'never' },
      { id: 'contract-review', slug: { en: 'flat-fee-contract-review-el-paso', es: 'revision-de-contrato-tarifa-fija-el-paso' }, name: { en: 'Flat-Fee Contract Review', es: 'Revisión de Contrato a Tarifa Fija' }, court: 'never' },
      { id: 'notary-apostille', slug: { en: 'notary-apostille-services-el-paso', es: 'notario-y-apostilla-el-paso' }, name: { en: 'Notary & Apostille', es: 'Notario y Apostilla' }, court: 'never' },
      { id: 'affidavits', slug: { en: 'affidavit-sworn-statement-el-paso', es: 'declaracion-jurada-el-paso' }, name: { en: 'Affidavits & Sworn Statements', es: 'Declaraciones Juradas' }, court: 'never' },
      { id: 'legal-second-opinion', slug: { en: 'legal-second-opinion-el-paso', es: 'segunda-opinion-legal-el-paso' }, name: { en: 'Legal Second Opinion', es: 'Segunda Opinión Legal' }, court: 'never' },
    ],
  },
];

export const ALL_SERVICES = HUBS.flatMap((h) => h.services.map((s) => ({ ...s, hubId: h.id })));

export function findHub(id: string) {
  return HUBS.find((h) => h.id === id)!;
}
export function findService(id: string) {
  return ALL_SERVICES.find((s) => s.id === id)!;
}
export function hubPath(hub: CatalogHub, lang: Lang) {
  return lang === 'en' ? `/${hub.slug.en}/` : `/es/${hub.slug.es}/`;
}
export function servicePath(svc: CatalogService, lang: Lang) {
  return lang === 'en' ? `/${svc.slug.en}/` : `/es/${svc.slug.es}/`;
}
