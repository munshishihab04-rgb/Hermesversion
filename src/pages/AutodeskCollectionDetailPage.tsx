import React, { useEffect, useState } from 'react';
import { Link, useRoute } from 'wouter';
import { fetchProductByHandle, createCart } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';
import {
  BuildingLibraryIcon,
  FilmIcon,
  WrenchScrewdriverIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BoltIcon,
  ShieldCheckIcon,
  CubeIcon,
  InformationCircleIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  TagIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon, StarIcon } from '@heroicons/react/24/solid';

const CDN = 'https://cdn.shopify.com/s/files/1/1049/6268/7317/files';

function fmtEur(n: number) {
  return n.toFixed(2).replace('.', ',');
}

// ─── Dati collections ────────────────────────────────────────────────────────

interface SoftwareItem {
  name: string;
  icon: string;
  description: string;
}

interface CollectionData {
  id: string;
  handle: string;
  title: string;
  fullTitle: string;
  subtitle: string;
  description: string;
  accentColor: string;
  accentLight: string;
  accentText: string;
  accentBorder: string;
  Icon: React.ElementType;
  software: SoftwareItem[];
  toolCount: string;
  idealFor: string[];
  keyBenefits: string[];
  singleAlternatives: { name: string; handle: string; icon: string; price: string }[];
  collectionSaving: string;
}

const COLLECTIONS_DATA: Record<string, CollectionData> = {
  aec: {
    id: 'aec',
    handle: 'autodesk-aec-collection',
    title: 'AEC Collection',
    fullTitle: 'Architecture, Engineering & Construction Collection',
    subtitle: 'Architettura · Ingegneria civile · Edilizia',
    description:
      'La suite completa per professionisti del settore AEC. Progettazione BIM avanzata, coordinamento di cantiere, infrastrutture civili e documentazione tecnica in un unico abbonamento.',
    accentColor: '#0052CC',
    accentLight: 'bg-blue-50',
    accentText: 'text-blue-700',
    accentBorder: 'border-blue-200',
    Icon: BuildingLibraryIcon,
    toolCount: '15+',
    software: [
      { name: 'AutoCAD', icon: `${CDN}/autocad-2023-simplified-badge-75x75.png`, description: 'CAD 2D e 3D per disegno tecnico e documentazione professionale' },
      { name: 'Revit', icon: `${CDN}/revit-2023-simplified-badge-75x75.png`, description: 'BIM per progettazione architettonica, strutturale e MEP' },
      { name: 'Civil 3D', icon: `${CDN}/civil-3d-2023-simplified-badge-75x75.png`, description: 'Progettazione infrastrutture civili, strade e reti idriche' },
      { name: 'Navisworks', icon: `${CDN}/navisworks-simulate-2023-simplified-badge-75x75.png`, description: 'Coordinamento modelli BIM e rilevamento interferenze' },
      { name: 'ReCap Pro', icon: `${CDN}/recap-pro-2023-simplified-badge-75x75.png`, description: 'Scansione 3D laser e nuvole di punti per rilievi' },
      { name: 'AutoCAD LT', icon: `${CDN}/autocad-lt-2023-simplified-badge-75x75.png`, description: 'CAD 2D per documentazione e disegno tecnico leggero' },
    ],
    idealFor: [
      'Studi di architettura e progettazione',
      'Ingegneria civile e strutturale',
      'Imprese di costruzione e cantieri',
      'BIM Manager e Coordinator',
      'Urbanistica e pianificazione territoriale',
    ],
    keyBenefits: [
      'Workflow BIM completo da progetto a cantiere',
      'Interoperabilità nativa tra tutti gli strumenti',
      'Formati standard IFC, DWG, RVT nativi',
      'Cloud collaboration con BIM 360 incluso',
    ],
    singleAlternatives: [
      { name: 'AutoCAD', handle: 'autodesk-autocad', icon: `${CDN}/autocad-2023-simplified-badge-75x75.png`, price: '~€60/mese' },
      { name: 'Revit', handle: 'autodesk-revit', icon: `${CDN}/revit-2023-simplified-badge-75x75.png`, price: '~€330/mese' },
    ],
    collectionSaving: 'Includi tutti i software AEC in un unico abbonamento, invece di acquistarli separatamente',
  },
  pdm: {
    id: 'pdm',
    handle: 'autodesk-pdm-collection',
    title: 'PD&M Collection',
    fullTitle: 'Product Design & Manufacturing Collection',
    subtitle: 'Progettazione Prodotto · Manifattura · Meccanica',
    description:
      'La suite per ingegneri meccanici e progettisti industriali. CAD 3D parametrico, simulazione strutturale, automazione CAM e gestione dati di prodotto in un unico ambiente integrato.',
    accentColor: '#FF6B35',
    accentLight: 'bg-orange-50',
    accentText: 'text-orange-700',
    accentBorder: 'border-orange-200',
    Icon: WrenchScrewdriverIcon,
    toolCount: '12+',
    software: [
      { name: 'Inventor Professional', icon: `${CDN}/inventor-professional-2023-simplified-badge-75x75.png`, description: 'CAD 3D parametrico per progettazione meccanica e assemblaggio' },
      { name: 'Fusion 360', icon: `${CDN}/fusion-360-2023-simplified-badge-75x75.png`, description: 'Design integrato CAD/CAM/CAE/PCB su cloud' },
      { name: 'AutoCAD', icon: `${CDN}/autocad-2023-simplified-badge-75x75.png`, description: 'Disegno tecnico 2D e 3D per documentazione meccanica' },
      { name: 'AutoCAD LT', icon: `${CDN}/autocad-lt-2023-simplified-badge-75x75.png`, description: 'Disegno tecnico 2D per documentazione e layout' },
      { name: 'Navisworks', icon: `${CDN}/navisworks-simulate-2023-simplified-badge-75x75.png`, description: 'Revisione e coordinamento di modelli complessi' },
      { name: 'ReCap Pro', icon: `${CDN}/recap-pro-2023-simplified-badge-75x75.png`, description: 'Reverse engineering con scansione 3D e nuvole di punti' },
    ],
    idealFor: [
      'Ingegneria meccanica e industriale',
      'Progettazione automotive & aerospace',
      'Manifattura e produzione industriale',
      'CAD/CAM Engineer e CNC programmer',
      'Startup di hardware e prodotto fisico',
    ],
    keyBenefits: [
      'Workflow integrato dalla progettazione alla produzione',
      'Simulazione FEM/stress analysis nativa',
      'Generazione toolpath CAM direttamente nel CAD',
      'Vault PDM per gestione dati di prodotto',
    ],
    singleAlternatives: [
      { name: 'Fusion 360', handle: 'autodesk-fusion-360', icon: `${CDN}/fusion-360-2023-simplified-badge-75x75.png`, price: '~€70/mese' },
      { name: 'AutoCAD', handle: 'autodesk-autocad', icon: `${CDN}/autocad-2023-simplified-badge-75x75.png`, price: '~€60/mese' },
    ],
    collectionSaving: 'Includi Inventor, Fusion 360, AutoCAD e altri strumenti in un unico abbonamento integrato',
  },
  me: {
    id: 'me',
    handle: 'autodesk-me-collection',
    title: 'M&E Collection',
    fullTitle: 'Media & Entertainment Collection',
    subtitle: 'Animazione 3D · VFX · Cinema · Videogiochi',
    description:
      "La suite per artisti 3D, animatori e professionisti VFX. Maya per l'animazione character, 3ds Max per la visualizzazione architetturale, Arnold per il rendering fotorealistico — tutto in un abbonamento.",
    accentColor: '#6554C0',
    accentLight: 'bg-sky-50',
    accentText: 'text-sky-700',
    accentBorder: 'border-sky-200',
    Icon: FilmIcon,
    toolCount: '10+',
    software: [
      { name: 'Maya', icon: `${CDN}/maya-2023-simplified-badge-75x75.png`, description: 'Animazione 3D, rigging, simulazioni fluidi e FX' },
      { name: '3ds Max', icon: `${CDN}/3ds-max-2023-simplified-badge-75x75.png`, description: 'Modellazione, rendering e visualizzazione architettonica' },
      { name: 'Arnold', icon: `${CDN}/arnold-2023-simplified-badge-75x75.png`, description: 'Renderer fisicamente accurato per produzione cinematografica' },
      { name: 'Mudbox', icon: `${CDN}/mudbox-2023-simplified-badge-75x75.png`, description: 'Scultura digitale e pittura 3D per character art' },
      { name: 'Flame', icon: `${CDN}/flame-2023-simplified-badge-75x75.png`, description: 'Compositing VFX avanzato per broadcast e cinema' },
      { name: 'MotionBuilder', icon: `${CDN}/adsk-icon-badge-75x75.png`, description: 'Performance capture e animazione real-time per gaming' },
    ],
    idealFor: [
      'Animatori 3D e character artist',
      'Studi VFX per cinema e broadcast',
      'Sviluppatori di videogiochi',
      'Motion designer e visual artist',
      'Visualizzazione architettonica e product design',
    ],
    keyBenefits: [
      'Pipeline VFX completa da Maya ad Arnold',
      'Interoperabilità nativa Maya ↔ 3ds Max ↔ Arnold',
      'Standard industry per produzioni cinematografiche',
      'MotionBuilder per performance capture e gaming pipeline',
    ],
    singleAlternatives: [],
    collectionSaving: 'Maya + 3ds Max + Arnold insieme: disponibili solo con M&E Collection',
  },
};

// ─── Componente principale ────────────────────────────────────────────────────

export default function AutodeskCollectionDetailPage({ overrideCollectionId }: { overrideCollectionId?: string } = {}) {
  const [, params] = useRoute('/autodesk-collections/:id');
  const colId = overrideCollectionId || params?.id || 'aec';
  const col = COLLECTIONS_DATA[colId];

  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [activeTab, setActiveTab] = useState<'software' | 'benefici' | 'ideale'>('software');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  useEffect(() => {
    if (!col) return;
    setLoading(true);
    fetchProductByHandle(col.handle)
      .then((p) => {
        setProduct(p);
        const mensile = p?.variants.nodes.find((v) =>
          v.title.toLowerCase().includes('mensile')
        );
        setSelectedVariantId(mensile?.id ?? p?.variants.nodes[0]?.id ?? '');
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [colId]);

  if (!col) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 section-container">
        <h1 className="text-2xl font-bold text-foreground">Collezione non trovata</h1>
        <Link href="/autodesk-collections" className="text-primary font-medium hover:underline flex items-center gap-1">
          <ChevronRightIcon className="w-4 h-4 rotate-180" />
          Torna alle Collections
        </Link>
      </div>
    );
  }

  const mensile = product?.variants.nodes.find((v) => v.title.toLowerCase().includes('mensile'));
  const triennale = product?.variants.nodes.find((v) => v.title.toLowerCase().includes('triennale'));
  const selectedVariant = product?.variants.nodes.find((v) => v.id === selectedVariantId);

  const mensilePrice = mensile ? parseFloat(mensile.price.amount) : 49.99;
  const triennalePrice = triennale ? parseFloat(triennale.price.amount) : 349.99;
  const saving = fmtEur(mensilePrice * 36 - triennalePrice);

  const handleCheckout = async () => {
    if (!selectedVariantId) return;
    setCheckoutLoading(true);
    try {
      const cart = await createCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
      window.location.href = cart.checkoutUrl;
    } catch {
      // fallback
    } finally {
      setCheckoutLoading(false);
    }
  };

  const otherCollections = Object.values(COLLECTIONS_DATA).filter((c) => c.id !== colId);

  const faqItems = [
    {
      q: `Cosa è incluso nella ${col.title}?`,
      a: `La ${col.title} include ${col.toolCount} software Autodesk specializzati per il settore ${col.subtitle}. Con un unico abbonamento hai accesso a tutti gli strumenti — inclusi ${col.software.slice(0, 3).map((s) => s.name).join(', ')} e altri.`,
    },
    {
      q: 'Come funziona l\'assegnazione?',
      a: 'Dopo il pagamento, il nostro team assegna l\'abbonamento al tuo Autodesk ID immediatamente. Riceverai una notifica ufficiale da Autodesk e potrai scaricare il software direttamente da autodesk.com.',
    },
    {
      q: 'Qual è la differenza tra mensile e triennale?',
      a: `Il piano mensile (€${fmtEur(mensilePrice)}/mese) è flessibile e disdibile in qualsiasi momento. Il piano triennale (€${fmtEur(triennalePrice)}) copre 3 anni a prezzo bloccato — un risparmio di €${saving} rispetto al mensile. Entrambi includono tutti i software e gli aggiornamenti.`,
    },
    {
      q: 'Perché scegliere la Collection invece del software singolo?',
      a: `Se usi più di uno strumento della categoria, la Collection è sempre più conveniente. ${col.collectionSaving}. Inoltre hai accesso immediato a tutti i nuovi strumenti aggiunti alla suite senza costi aggiuntivi.`,
    },
    {
      q: 'Quale email devo usare al checkout?',
      a: 'Devi inserire l\'email del tuo Autodesk ID. L\'abbonamento viene assegnato all\'account Autodesk indicato al checkout — non può essere modificato in seguito.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── HERO ── */}
      <div className="bg-foreground text-white">
        <div className="section-container py-12 md:py-16">
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/autodesk-collections" className="hover:text-white/80 transition-colors">Autodesk Collections</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-white/80">{col.title}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: info */}
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-4"
                style={{ color: col.accentColor, borderColor: `${col.accentColor}50`, background: `${col.accentColor}15` }}
              >
                <col.Icon className="w-3.5 h-3.5" />
                {col.subtitle}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
                Autodesk {col.title}
              </h1>
              <p className="text-white/70 text-base leading-relaxed mb-6 max-w-xl">
                {col.description}
              </p>

              {/* Software badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {col.software.map((sw) => (
                  <div
                    key={sw.name}
                    className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-lg px-2.5 py-1.5 backdrop-blur-sm"
                  >
                    <img
                      src={sw.icon}
                      alt={sw.name}
                      className="w-4 h-4 object-contain"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                    <span className="text-xs font-medium text-white">{sw.name}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5">
                  <span className="text-xs font-medium text-white/50">+{parseInt(col.toolCount) - col.software.length} altri</span>
                </div>
              </div>

              {/* Key benefits */}
              <div className="grid sm:grid-cols-2 gap-2">
                {col.keyBenefits.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: col.accentColor }} />
                    <span className="text-sm text-white/70">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: purchase box */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-white/10">
                {/* Header box */}
                <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                  <img
                    src={col.software[0].icon}
                    alt={col.title}
                    className="w-10 h-10 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div>
                    <p className="text-sm font-bold text-foreground">{col.title}</p>
                    <p className="text-xs text-muted-foreground">{col.toolCount} software inclusi</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Piano selector */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                      Piano di Abbonamento
                    </label>
                    {loading ? (
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2.5">
                        {/* Mensile */}
                        {mensile && (
                          <button
                            onClick={() => setSelectedVariantId(mensile.id)}
                            className={`relative rounded-xl border-2 p-3 text-left transition-all ${
                              selectedVariantId === mensile.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/40 bg-white'
                            }`}
                          >
                            <p className={`text-[11px] font-semibold mb-1 ${selectedVariantId === mensile.id ? 'text-primary' : 'text-muted-foreground'}`}>
                              Mensile
                            </p>
                            <p className="text-base font-extrabold text-foreground">
                              €{fmtEur(mensilePrice)}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">/mese · Flessibile</p>
                          </button>
                        )}
                        {/* Triennale */}
                        {triennale && (
                          <button
                            onClick={() => setSelectedVariantId(triennale.id)}
                            className={`relative rounded-xl border-2 p-3 text-left transition-all ${
                              selectedVariantId === triennale.id
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-border hover:border-emerald-400 bg-white'
                            }`}
                          >
                            <span className="absolute -top-2.5 right-2 bg-emerald-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                              Risparmia -80%
                            </span>
                            <p className={`text-[11px] font-semibold mb-1 ${selectedVariantId === triennale.id ? 'text-emerald-700' : 'text-muted-foreground'}`}>
                              Triennale
                            </p>
                            <p className="text-base font-extrabold text-emerald-700">
                              €{fmtEur(triennalePrice)}
                            </p>
                            <p className="text-[10px] text-emerald-600 mt-0.5">3 anni · Risparmio €{saving}</p>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Prezzo selezionato */}
                  {selectedVariant && (
                    <div className="border-t border-border pt-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-primary">
                          €{fmtEur(parseFloat(selectedVariant.price.amount))}
                        </span>
                        {selectedVariant.title.toLowerCase().includes('mensile') && (
                          <span className="text-sm text-muted-foreground">/mese</span>
                        )}
                        {selectedVariant.title.toLowerCase().includes('triennale') && (
                          <span className="text-sm text-muted-foreground">· 3 anni</span>
                        )}
                      </div>
                      {selectedVariant.title.toLowerCase().includes('triennale') && (
                        <p className="text-xs text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                          <CheckCircleIcon className="w-3.5 h-3.5" />
                          Risparmio totale di €{saving} rispetto al mensile
                        </p>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading || !selectedVariantId || loading}
                    className="w-full btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {checkoutLoading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Attendi…
                      </>
                    ) : (
                      <>
                        <BoltIcon className="w-4 h-4" />
                        Acquista {col.title}
                      </>
                    )}
                  </button>

                  {/* Info consegna */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
                    <BoltIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-emerald-700">Assegnazione immediata</p>
                      <p className="text-[10px] text-emerald-600">Usa l'email del tuo Autodesk ID al checkout</p>
                    </div>
                  </div>

                  {/* Trust */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[
                      { Icon: ShieldCheckIcon, label: 'Attivazione diretta' },
                      { Icon: CheckBadgeIcon, label: 'Uso Commerciale' },
                      { Icon: ArrowTrendingUpIcon, label: 'Aggiornamenti inclusi' },
                    ].map((t) => (
                      <div key={t.label} className="flex flex-col items-center gap-1 text-center">
                        <t.Icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-[9px] text-muted-foreground leading-tight">{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-12 space-y-12">

        {/* ── TABS DETTAGLIO ── */}
        <section>
          <div className="flex gap-1 border-b border-border mb-8">
            {([ 'software', 'benefici', 'ideale' ] as const).map((tab) => {
              const labels = { software: 'Software inclusi', benefici: 'Vantaggi chiave', ideale: 'Ideale per' };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all -mb-px ${
                    activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          {activeTab === 'software' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {col.software.map((sw) => (
                <div key={sw.name} className="bg-white border border-border rounded-xl p-4 flex gap-3 items-start">
                  <img
                    src={sw.icon}
                    alt={sw.name}
                    className="w-10 h-10 object-contain shrink-0"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div>
                    <h3 className="font-bold text-sm text-foreground mb-1">{sw.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{sw.description}</p>
                  </div>
                </div>
              ))}
              <div
                className="rounded-xl border-2 border-dashed border-border p-4 flex items-center justify-center text-center"
              >
                <div>
                  <CubeIcon className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-muted-foreground">+{parseInt(col.toolCount) - col.software.length} altri strumenti</p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">inclusi nell'abbonamento</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'benefici' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {col.keyBenefits.map((b, i) => (
                <div key={i} className="bg-white border border-border rounded-xl p-4 flex gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${col.accentColor}15` }}
                  >
                    <CheckIcon className="w-4 h-4" style={{ color: col.accentColor }} />
                  </div>
                  <p className="text-sm text-foreground font-medium leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ideale' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {col.idealFor.map((item) => (
                <div key={item} className="bg-white border border-border rounded-xl p-4 flex items-center gap-3">
                  <UserGroupIcon className="w-5 h-5 shrink-0" style={{ color: col.accentColor }} />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── SEZIONE STRATEGICA: Collection vs Software Singolo ── */}
        <section className="rounded-2xl overflow-hidden border border-border bg-white">
          <div className="px-6 py-5 border-b border-border bg-muted/20 flex items-center gap-3">
            <ArrowTrendingUpIcon className="w-5 h-5 text-primary shrink-0" />
            <h2 className="text-lg font-bold text-foreground">
              {col.title} vs Software Singoli: quale conviene?
            </h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Singoli */}
              <div className="rounded-xl border border-border p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TagIcon className="w-5 h-5 text-muted-foreground" />
                  <h3 className="font-bold text-foreground">Acquisto Software Singoli</h3>
                </div>
                {col.singleAlternatives.length > 0 ? (
                  <div className="space-y-3 mb-4">
                    {col.singleAlternatives.map((sw) => (
                      <div key={sw.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={sw.icon}
                            alt={sw.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                          />
                          <span className="text-sm text-foreground font-medium">{sw.name}</span>
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">{sw.price}</span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex items-center justify-between text-sm font-bold text-foreground">
                        <span>Totale (2 software)</span>
                        <span className="text-red-500">€120+/mese</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">
                    I software M&E (Maya, 3ds Max, Arnold) non sono disponibili come licenze singole retail — sono esclusivi della M&E Collection.
                  </p>
                )}
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    Ideale se usi solo 1 software
                  </li>
                  {col.singleAlternatives.length > 0 && (
                    <li className="flex items-center gap-1.5">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      Costo elevato con 2+ strumenti
                    </li>
                  )}
                </ul>
              </div>

              {/* Collection */}
              <div
                className="rounded-xl border-2 p-5 relative"
                style={{ borderColor: col.accentColor, background: `${col.accentColor}06` }}
              >
                <div className="absolute -top-3 left-4">
                  <span
                    className="text-[10px] font-extrabold text-white px-3 py-1 rounded-full uppercase tracking-wide"
                    style={{ background: col.accentColor }}
                  >
                    Consigliato
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4 mt-1">
                  <col.Icon className="w-5 h-5" style={{ color: col.accentColor }} />
                  <h3 className="font-bold text-foreground">{col.title}</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{col.toolCount} software inclusi</span>
                    <span className="font-extrabold text-emerald-700">€{fmtEur(mensilePrice)}/mese</span>
                  </div>
                  {triennale && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Piano triennale</span>
                      <span className="font-extrabold text-emerald-700">€{fmtEur(triennalePrice)} · 3 anni</span>
                    </div>
                  )}
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mb-4">
                  <p className="text-xs font-semibold text-emerald-700 flex items-start gap-1.5">
                    <SparklesIcon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    {col.collectionSaving}
                  </p>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {[
                    `${col.toolCount} software completi in un abbonamento`,
                    'Nuovi strumenti inclusi senza costi extra',
                    'Aggiornamenti automatici per tutta la durata',
                    'Massima flessibilità con piano mensile',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <CheckIcon className="w-3.5 h-3.5 shrink-0" style={{ color: col.accentColor }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA inline */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
              {col.singleAlternatives.map((sw) => (
                <Link
                  key={sw.name}
                  href={`/product-detail?handle=${sw.handle}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground border border-border rounded-lg px-3 py-2 hover:bg-muted/40 transition-colors"
                >
                  <img
                    src={sw.icon}
                    alt={sw.name}
                    className="w-4 h-4 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  Vedi {sw.name} singolo
                </Link>
              ))}
              <Link
                href={`/product-detail?handle=${col.handle}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-lg"
                style={{ background: col.accentColor }}
              >
                <BoltIcon className="w-3.5 h-3.5" />
                Acquista {col.title}
              </Link>
            </div>
          </div>
        </section>

        {/* ── ALTRE COLLECTIONS ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Esplora le altre Collections</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {otherCollections.map((other) => (
              <Link
                key={other.id}
                href={`/autodesk-collections/${other.id}`}
                className="group bg-white border border-border rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${other.accentColor}12` }}
                >
                  <other.Icon className="w-6 h-6" style={{ color: other.accentColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-foreground">{other.title}</h3>
                    <ArrowRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{other.subtitle}</p>
                  <div className="flex gap-1.5">
                    {other.software.slice(0, 3).map((sw) => (
                      <img
                        key={sw.name}
                        src={sw.icon}
                        alt={sw.name}
                        className="w-5 h-5 object-contain"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    ))}
                    <span className="text-[10px] text-muted-foreground self-center">+{parseInt(other.toolCount) - 3}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Domande Frequenti</h2>
          <div className="space-y-2 max-w-2xl">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-white border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/20 transition-colors"
                >
                  <span className="font-semibold text-sm text-foreground pr-4">{item.q}</span>
                  <ChevronRightIcon
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${faqOpen === idx ? 'rotate-90' : ''}`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: faqOpen === idx ? '300px' : '0px' }}
                >
                  <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
