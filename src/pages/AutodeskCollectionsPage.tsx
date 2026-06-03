import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { fetchProductByHandle } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';
import {
  BuildingLibraryIcon,
  CubeIcon,
  FilmIcon,
  WrenchScrewdriverIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowRightIcon,
  StarIcon,
  BoltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

const CDN = 'https://cdn.shopify.com/s/files/1/1049/6268/7317/files';

// ─── Dati Collections ────────────────────────────────────────────────────────

const COLLECTIONS = [
  {
    id: 'aec',
    handle: 'autodesk-aec-collection',
    title: 'AEC Collection',
    fullTitle: 'Architecture, Engineering & Construction Collection',
    subtitle: 'Architettura · Ingegneria · Edilizia',
    description:
      'La suite completa per professionisti AEC: progettazione BIM, infrastrutture civili, coordinamento di progetto e documentazione tecnica avanzata.',
    accentColor: '#0052CC',
    accentLight: 'bg-blue-50',
    accentText: 'text-blue-700',
    accentBorder: 'border-blue-200',
    tagColor: 'bg-blue-600',
    Icon: BuildingLibraryIcon,
    software: [
      { name: 'AutoCAD', icon: `${CDN}/autocad-2023-simplified-badge-75x75.png` },
      { name: 'Revit', icon: `${CDN}/revit-2023-simplified-badge-75x75.png` },
      { name: 'Civil 3D', icon: `${CDN}/civil-3d-2023-simplified-badge-75x75.png` },
      { name: 'Navisworks', icon: `${CDN}/navisworks-simulate-2023-simplified-badge-75x75.png` },
      { name: 'ReCap Pro', icon: `${CDN}/recap-pro-2023-simplified-badge-75x75.png` },
      { name: 'AutoCAD LT', icon: `${CDN}/autocad-lt-2023-simplified-badge-75x75.png` },
    ],
    toolCount: '15+',
    idealFor: ['Studi di architettura', 'Ingegneria civile', 'Imprese di costruzione', 'BIM Manager'],
    highlight: 'Revit + AutoCAD + Civil 3D',
    upsellHandles: ['autodesk-autocad', 'autodesk-revit'],
  },
  {
    id: 'pdm',
    handle: 'autodesk-pdm-collection',
    title: 'PD&M Collection',
    fullTitle: 'Product Design & Manufacturing Collection',
    subtitle: 'Progettazione Prodotto · Manifattura · Meccanica',
    description:
      'La suite per progettisti meccanici e ingegneri di produzione: CAD 3D, simulazione, automazione CAM e gestione dati di prodotto in un unico abbonamento.',
    accentColor: '#FF6B35',
    accentLight: 'bg-orange-50',
    accentText: 'text-orange-700',
    accentBorder: 'border-orange-200',
    tagColor: 'bg-orange-500',
    Icon: WrenchScrewdriverIcon,
    software: [
      { name: 'Inventor', icon: `${CDN}/inventor-professional-2023-simplified-badge-75x75.png` },
      { name: 'Fusion 360', icon: `${CDN}/fusion-360-2023-simplified-badge-75x75.png` },
      { name: 'AutoCAD', icon: `${CDN}/autocad-2023-simplified-badge-75x75.png` },
      { name: 'Navisworks', icon: `${CDN}/navisworks-simulate-2023-simplified-badge-75x75.png` },
      { name: 'ReCap Pro', icon: `${CDN}/recap-pro-2023-simplified-badge-75x75.png` },
      { name: 'AutoCAD LT', icon: `${CDN}/autocad-lt-2023-simplified-badge-75x75.png` },
    ],
    toolCount: '12+',
    idealFor: ['Progettazione meccanica', 'Automotive & Aerospace', 'Manifattura industriale', 'CAD/CAM Engineer'],
    highlight: 'Fusion 360 + Inventor + AutoCAD',
    upsellHandles: ['autodesk-fusion-360', 'autodesk-autocad'],
  },
  {
    id: 'me',
    handle: 'autodesk-me-collection',
    title: 'M&E Collection',
    fullTitle: 'Media & Entertainment Collection',
    subtitle: 'Animazione · VFX · Cinema · Videogiochi',
    description:
      "La suite per artisti 3D, animatori e professionisti VFX: Maya, 3ds Max, Arnold renderer e tutti gli strumenti per cinema, broadcast e gaming.",
    accentColor: '#6554C0',
    accentLight: 'bg-violet-50',
    accentText: 'text-violet-700',
    accentBorder: 'border-violet-200',
    tagColor: 'bg-violet-600',
    Icon: FilmIcon,
    software: [
      { name: 'Maya', icon: `${CDN}/maya-2023-simplified-badge-75x75.png` },
      { name: '3ds Max', icon: `${CDN}/3ds-max-2023-simplified-badge-75x75.png` },
      { name: 'Arnold', icon: `${CDN}/arnold-2023-simplified-badge-75x75.png` },
      { name: 'Mudbox', icon: `${CDN}/mudbox-2023-simplified-badge-75x75.png` },
      { name: 'Flame', icon: `${CDN}/flame-2023-simplified-badge-75x75.png` },
      { name: 'AutoCAD LT', icon: `${CDN}/autocad-lt-2023-simplified-badge-75x75.png` },
    ],
    toolCount: '10+',
    idealFor: ['Animatori 3D', 'Studi VFX', 'Sviluppatori di videogiochi', 'Motion designer'],
    highlight: 'Maya + 3ds Max + Arnold',
    upsellHandles: [],
  },
] as const;

// ─── Tabella comparativa feature ─────────────────────────────────────────────

const COMPARISON_ROWS = [
  { feature: 'CAD 2D / Disegno tecnico',        aec: true,  pdm: true,  me: false },
  { feature: 'BIM (Building Info. Modeling)',    aec: true,  pdm: false, me: false },
  { feature: 'Progettazione meccanica 3D',      aec: false, pdm: true,  me: false },
  { feature: 'Simulazione strutturale',         aec: false, pdm: true,  me: false },
  { feature: 'Infrastrutture civili',           aec: true,  pdm: false, me: false },
  { feature: 'Animazione 3D',                   aec: false, pdm: false, me: true  },
  { feature: 'Rendering avanzato (Arnold)',      aec: false, pdm: false, me: true  },
  { feature: 'VFX & Compositing',              aec: false, pdm: false, me: true  },
  { feature: 'Scansione 3D (ReCap Pro)',        aec: true,  pdm: true,  me: false },
  { feature: 'Coordinamento modelli',           aec: true,  pdm: true,  me: false },
];

// ─── Componente Card Collection ───────────────────────────────────────────────

function CollectionCard({
  coll,
  product,
}: {
  coll: (typeof COLLECTIONS)[number];
  product: ShopifyProduct | null;
}) {
  const mensile = product?.variants.nodes.find((v) =>
    v.title.toLowerCase().includes('mensile')
  );
  const triennale = product?.variants.nodes.find((v) =>
    v.title.toLowerCase().includes('triennale')
  );
  const CollIcon = coll.Icon;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
      {/* Header */}
      <div
        className="px-6 pt-6 pb-5 border-b border-border relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${coll.accentColor}10 0%, ${coll.accentColor}04 100%)` }}
      >
        {/* Decorative dot */}
        <div
          className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10"
          style={{ background: coll.accentColor }}
        />
        <div className="relative">
          <div className="flex items-start gap-4 mb-4">
            {/* Icona primo software */}
            <img
              src={coll.software[0].icon}
              alt={coll.software[0].name}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-widest mb-0.5"
                style={{ color: coll.accentColor }}
              >
                Autodesk Collection
              </p>
              <h2 className="text-xl font-extrabold text-foreground leading-tight">
                {coll.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">{coll.subtitle}</p>
            </div>
          </div>

          {/* Tool count badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${coll.accentLight} ${coll.accentText} ${coll.accentBorder} border`}
          >
            <CubeIcon className="w-3 h-3" />
            {coll.toolCount} strumenti inclusi
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-5 flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed">{coll.description}</p>

        {/* Software badges con icone reali */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Software inclusi
          </p>
          <div className="flex flex-wrap gap-2">
            {coll.software.map((sw) => (
              <div
                key={sw.name}
                className="flex items-center gap-1.5 bg-muted/50 border border-border rounded-lg px-2.5 py-1.5"
              >
                <img
                  src={sw.icon}
                  alt={sw.name}
                  className="w-4 h-4 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-xs font-medium text-foreground">{sw.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ideale per */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Ideale per
          </p>
          <div className="space-y-1">
            {coll.idealFor.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckIcon className="w-3.5 h-3.5 shrink-0" style={{ color: coll.accentColor }} />
                <span className="text-xs text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prezzi */}
        {(mensile || triennale) && (
          <div className="bg-muted/30 border border-border rounded-xl p-3 space-y-2">
            {mensile && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Piano Mensile</span>
                <span className="font-bold text-foreground">
                  €{parseFloat(mensile.price.amount).toFixed(2).replace('.', ',')}/mese
                </span>
              </div>
            )}
            {triennale && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">Piano Triennale</span>
                  <span className="text-[9px] font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded-full">
                    -80%
                  </span>
                </div>
                <span className="font-bold text-emerald-700">
                  €{parseFloat(triennale.price.amount).toFixed(2).replace('.', ',')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-2 space-y-2">
          <Link
            href={`/autodesk-collections/${coll.id}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
            style={{ backgroundColor: coll.accentColor }}
          >
            Scopri {coll.title}
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <Link
            href={`/product-detail?handle=${coll.handle}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-border bg-white text-sm font-semibold text-foreground hover:bg-muted/40 transition-colors"
          >
            <BoltIcon className="w-4 h-4 text-primary" />
            Acquista Direttamente
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Sezione valore incluso ───────────────────────────────────────────────────

function ValuePropsSection() {
  const props = [
    {
      Icon: CubeIcon,
      title: 'Suite Completa',
      desc: 'Tutti i software di categoria in un unico abbonamento — nessun costo aggiuntivo per strumenti singoli.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      Icon: BoltIcon,
      title: 'Assegnazione immediata',
      desc: 'Il nostro team assegna l\'abbonamento direttamente al tuo Autodesk ID. Nessun download di terze parti.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      Icon: ShieldCheckIcon,
      title: 'Licenza Commerciale Ufficiale',
      desc: 'Abbonamento originale Autodesk, valido per uso professionale e aziendale, con supporto diretto.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      Icon: CalendarDaysIcon,
      title: 'Aggiornamenti Inclusi',
      desc: 'Sempre all\'ultima versione disponibile per tutta la durata dell\'abbonamento, senza costi extra.',
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {props.map((p) => (
        <div key={p.title} className="bg-white border border-border rounded-xl p-5">
          <div className={`w-10 h-10 rounded-xl ${p.bg} flex items-center justify-center mb-3`}>
            <p.Icon className={`w-5 h-5 ${p.color}`} />
          </div>
          <h3 className="font-bold text-sm text-foreground mb-1">{p.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Tabella comparativa interattiva ─────────────────────────────────────────

function ComparisonTable({ products }: { products: Record<string, ShopifyProduct | null> }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-white">
      {/* Header */}
      <div className="grid grid-cols-4 bg-foreground text-white text-sm font-semibold">
        <div className="p-4 border-r border-white/10">Funzionalità</div>
        <div className="p-4 border-r border-white/10 text-center">
          <div className="font-extrabold">AEC</div>
          <div className="text-[10px] font-normal opacity-70 mt-0.5">Architettura / Ingegneria</div>
        </div>
        <div className="p-4 border-r border-white/10 text-center">
          <div className="font-extrabold">PD&M</div>
          <div className="text-[10px] font-normal opacity-70 mt-0.5">Progettazione Prodotto</div>
        </div>
        <div className="p-4 text-center">
          <div className="font-extrabold">M&E</div>
          <div className="text-[10px] font-normal opacity-70 mt-0.5">Media & Entertainment</div>
        </div>
      </div>
      {/* Rows */}
      {COMPARISON_ROWS.map((row, i) => (
        <div
          key={row.feature}
          className={`grid grid-cols-4 border-t border-border text-sm ${
            i % 2 === 0 ? 'bg-white' : 'bg-muted/20'
          }`}
        >
          <div className="p-3.5 border-r border-border text-muted-foreground text-xs leading-snug">
            {row.feature}
          </div>
          {(['aec', 'pdm', 'me'] as const).map((col) => (
            <div key={col} className="p-3.5 border-r border-border last:border-r-0 flex items-center justify-center">
              {row[col] ? (
                <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
              ) : (
                <XMarkIcon className="w-4 h-4 text-muted-foreground/30" />
              )}
            </div>
          ))}
        </div>
      ))}
      {/* Footer prezzi */}
      <div className="grid grid-cols-4 border-t border-border bg-muted/30">
        <div className="p-4 border-r border-border">
          <p className="text-xs font-bold text-foreground">Prezzo da</p>
          <p className="text-[10px] text-muted-foreground">mensile o triennale</p>
        </div>
        {COLLECTIONS.map((coll) => {
          const prod = products[coll.handle];
          const mensile = prod?.variants.nodes.find((v) =>
            v.title.toLowerCase().includes('mensile')
          );
          const triennale = prod?.variants.nodes.find((v) =>
            v.title.toLowerCase().includes('triennale')
          );
          return (
            <div key={coll.id} className="p-4 border-r border-border last:border-r-0 text-center">
              {mensile && (
                <p className="text-sm font-extrabold text-foreground">
                  €{parseFloat(mensile.price.amount).toFixed(2).replace('.', ',')}
                  <span className="text-[10px] font-normal text-muted-foreground">/mese</span>
                </p>
              )}
              {triennale && (
                <p className="text-xs text-emerald-700 font-bold mt-0.5">
                  o €{parseFloat(triennale.price.amount).toFixed(2).replace('.', ',')} triennale
                </p>
              )}
              <Link
                href={`/product-detail?handle=${coll.handle}`}
                className="inline-block mt-2 text-[10px] font-bold text-white px-3 py-1.5 rounded-full"
                style={{ backgroundColor: COLLECTIONS.find((c) => c.id === coll.id)?.accentColor }}
              >
                Acquista
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Sezione FAQ ──────────────────────────────────────────────────────────────

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    {
      q: 'Qual è la differenza tra una Collection e un software singolo?',
      a: 'Una Collection Autodesk include tutti i software della categoria in un unico abbonamento. Ad esempio, la AEC Collection comprende AutoCAD, Revit, Civil 3D, Navisworks e altri 10+ strumenti — a un prezzo nettamente inferiore rispetto all\'acquisto separato di ogni singolo software.',
    },
    {
      q: 'Come funziona l\'assegnazione dell\'abbonamento?',
      a: 'Dopo il pagamento, il nostro team assegna l\'abbonamento direttamente al tuo Autodesk ID immediatamente. Riceverai una notifica ufficiale da Autodesk. Il software si scarica dal portale ufficiale autodesk.com — nessun intermediario.',
    },
    {
      q: 'Qual è la differenza tra piano mensile e piano triennale?',
      a: 'Il piano mensile (€14,99/mese) è flessibile e si può disdire in qualsiasi momento. Il piano triennale (€87,99) copre 3 anni a prezzo bloccato — un risparmio di oltre €360 rispetto al mensile. Entrambi includono tutti i software e gli aggiornamenti automatici.',
    },
    {
      q: 'Posso usare la Collection per uso commerciale?',
      a: 'Sì. Gli abbonamenti Autodesk venduti su Licenvo sono licenze commerciali complete, valide per studi professionali, aziende e liberi professionisti. Per licenze multi-seat aziendali contattaci per un preventivo personalizzato.',
    },
    {
      q: 'Quale email devo usare al checkout?',
      a: 'Devi usare l\'indirizzo email del tuo Autodesk ID (o quello con cui vuoi creare un nuovo account). L\'abbonamento viene assegnato a quella email e non può essere cambiato in seguito — verificala attentamente prima di procedere.',
    },
  ];
  return (
    <div className="max-w-3xl mx-auto space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="border border-border rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 transition-colors"
          >
            <span className="font-semibold text-sm text-foreground pr-4">{item.q}</span>
            <ChevronRightIcon
              className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                open === idx ? 'rotate-90' : ''
              }`}
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: open === idx ? '400px' : '0px' }}
          >
            <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Sezione upsell "Cerchi un software singolo?" ────────────────────────────

function SingleSoftwareUpsell() {
  const singles = [
    { name: 'AutoCAD', handle: 'autodesk-autocad', icon: `${CDN}/autocad-2023-simplified-badge-75x75.png`, tag: 'CAD 2D/3D' },
    { name: 'Revit', handle: 'autodesk-revit', icon: `${CDN}/revit-2023-simplified-badge-75x75.png`, tag: 'BIM' },
    { name: 'Fusion 360', handle: 'autodesk-fusion-360', icon: `${CDN}/fusion-360-2023-simplified-badge-75x75.png`, tag: 'CAD/CAM 3D' },
    { name: 'Maya', handle: null, icon: `${CDN}/maya-2023-simplified-badge-75x75.png`, tag: 'Animazione 3D' },
  ];
  return (
    <div className="bg-muted/30 border border-border rounded-2xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <InformationCircleIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-foreground mb-1">Hai bisogno di un solo software?</h3>
          <p className="text-sm text-muted-foreground">
            Se utilizzi un solo strumento, puoi acquistare la licenza individuale. Tuttavia, se prevedi di usarne
            2 o più, la Collection è sempre più conveniente.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {singles.map((sw) => (
          <div key={sw.name} className="bg-white border border-border rounded-xl p-3 text-center">
            <img src={sw.icon} alt={sw.name} className="w-10 h-10 object-contain mx-auto mb-2"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            <p className="text-xs font-bold text-foreground mb-0.5">{sw.name}</p>
            <p className="text-[10px] text-muted-foreground mb-2">{sw.tag}</p>
            {sw.handle ? (
              <Link
                href={`/product-detail?handle=${sw.handle}`}
                className="text-[10px] font-semibold text-primary hover:underline"
              >
                Vedi prodotto →
              </Link>
            ) : (
              <Link
                href="/product-catalog?category=autodesk"
                className="text-[10px] font-semibold text-primary hover:underline"
              >
                Vedi catalogo →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Componente principale ────────────────────────────────────────────────────

export default function AutodeskCollectionsPage() {
  const [products, setProducts] = useState<Record<string, ShopifyProduct | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const map: Record<string, ShopifyProduct | null> = {};
      await Promise.all(
        COLLECTIONS.map(async (coll) => {
          try {
            map[coll.handle] = await fetchProductByHandle(coll.handle);
          } catch {
            map[coll.handle] = null;
          }
        })
      );
      setProducts(map);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── HERO ── */}
      <div className="bg-foreground text-white">
        <div className="section-container py-16 md:py-20">
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-white/80">Autodesk Collections</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 border border-white/20 px-3 py-1.5 rounded-full mb-4">
              <StarIcon className="w-3 h-3" />
              Abbonamenti Ufficiali Autodesk
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Autodesk Industry
              <br />
              <span className="text-primary">Collections</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
              Il modo più efficiente di accedere a tutti gli strumenti Autodesk di cui hai bisogno.
              Un abbonamento, tutta la suite professionale della tua categoria.
            </p>

            {/* Software badges mini hero */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                `${CDN}/autocad-2023-simplified-badge-75x75.png`,
                `${CDN}/revit-2023-simplified-badge-75x75.png`,
                `${CDN}/inventor-professional-2023-simplified-badge-75x75.png`,
                `${CDN}/maya-2023-simplified-badge-75x75.png`,
                `${CDN}/fusion-360-2023-simplified-badge-75x75.png`,
                `${CDN}/3ds-max-2023-simplified-badge-75x75.png`,
                `${CDN}/civil-3d-2023-simplified-badge-75x75.png`,
                `${CDN}/arnold-2023-simplified-badge-75x75.png`,
              ].map((icon, i) => (
                <img
                  key={i}
                  src={icon}
                  alt=""
                  className="w-9 h-9 object-contain opacity-80 hover:opacity-100 transition-opacity"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              ))}
              <span className="self-center text-white/40 text-sm font-medium">+30 altri strumenti</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#collections"
                className="inline-flex items-center gap-2 btn-primary px-6 py-3 font-bold text-sm rounded-xl"
              >
                Scopri le Collections
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <Link
                href="/product-catalog?category=autodesk"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Software Singoli
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-12 space-y-16">

        {/* ── VALUE PROPS ── */}
        <ValuePropsSection />

        {/* ── 3 COLLECTION CARDS ── */}
        <section id="collections">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-foreground mb-2">
              Scegli la Collection per il tuo settore
            </h2>
            <p className="text-muted-foreground">
              Ogni Collection è ottimizzata per una disciplina specifica. Confronta e scegli quella che fa per te.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-border bg-white h-[460px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {COLLECTIONS.map((coll) => (
                <CollectionCard
                  key={coll.id}
                  coll={coll}
                  product={products[coll.handle] ?? null}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── TABELLA CONFRONTO ── */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-foreground mb-2">
              Confronto dettagliato
            </h2>
            <p className="text-muted-foreground">
              Non sai quale Collection scegliere? Confronta le funzionalità per trovare quella giusta.
            </p>
          </div>
          <ComparisonTable products={products} />
        </section>

        {/* ── UPSELL SOFTWARE SINGOLI ── */}
        <SingleSoftwareUpsell />

        {/* ── CONSULENZA AZIENDALE CTA ── */}
        <section className="rounded-2xl overflow-hidden border border-primary/20">
          <div className="bg-primary px-8 py-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <UserGroupIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Licenze Aziendali Multi-Seat</h2>
              <p className="text-sm text-white/80 max-w-2xl">
                Stai valutando Autodesk per il tuo team o la tua azienda? Offriamo preventivi personalizzati
                per licenze multiple, fatturazione B2B e supporto all'onboarding.
              </p>
            </div>
          </div>
          <div className="bg-white p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { Icon: UserGroupIcon, title: 'Licenze Multi-Seat', desc: 'Gestisci abbonamenti per team da 2 a 500+ utenti con un unico account amministratore.' },
                { Icon: DocumentTextIcon, title: 'Fatturazione B2B', desc: 'Fattura elettronica con P.IVA, split payment e condizioni di pagamento personalizzate.' },
                { Icon: ShieldCheckIcon, title: 'Supporto Dedicato', desc: 'Un referente dedicato per la scelta del piano, l\'attivazione e l\'onboarding del team.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:assistenza@licenvo.com?subject=Consulenza%20Autodesk%20Aziendale"
                className="inline-flex items-center gap-2 btn-primary px-6 py-3 text-sm font-bold rounded-xl"
              >
                <DocumentTextIcon className="w-4 h-4" />
                Richiedi Preventivo Gratuito
              </a>
              <a
                href="https://wa.me/393514794187?text=Ciao%2C%20sono%20interessato%20a%20licenze%20Autodesk%20aziendali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted/40 transition-colors"
              >
                <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold text-foreground mb-2">Domande Frequenti</h2>
            <p className="text-muted-foreground">Tutto quello che devi sapere sulle Autodesk Collections</p>
          </div>
          <FaqSection />
        </section>

      </div>
    </div>
  );
}
