import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useSearch } from 'wouter';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getProductById } from '@/data/products';
import { fetchProductById, shopifyProductToProduct, createCart } from '@/lib/shopify';
import HoppyTrustBadges, { HoppyPaymentIcons } from '@/components/HoppyTrustBadges';
import type { ShopifyProduct } from '@/lib/shopify';
import { useShopifyProducts } from '@/hooks/useShopifyProducts';
import type { Product } from '@/data/products';

// ─── Utilities ────────────────────────────────────────────────────────────────

function fmtEur(n: number): string { return n.toFixed(2).replace('.', ','); }

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const szPx = size === 'lg' ? 20 : 14;
  const starPath = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = Math.min(Math.max(rating - (s - 1), 0), 1);
        const pct = Math.round(fill * 100);
        if (pct >= 100) return <svg key={s} width={szPx} height={szPx} viewBox="0 0 20 20"><path d={starPath} fill="rgb(251,191,36)" /></svg>;
        if (pct <= 0) return <svg key={s} width={szPx} height={szPx} viewBox="0 0 20 20"><path d={starPath} fill="rgba(156,163,175,0.3)" /></svg>;
        const clipId = `clip${size}${s}${String(rating).replace('.', 'p')}`;
        return (
          <svg key={s} width={szPx} height={szPx} viewBox="0 0 20 20">
            <defs><clipPath id={clipId}><rect x="0" y="0" width={`${pct}%`} height="20" /></clipPath></defs>
            <path d={starPath} fill="rgba(156,163,175,0.3)" />
            <path d={starPath} fill="rgb(251,191,36)" clipPath={`url(#${clipId})`} />
          </svg>
        );
      })}
    </div>
  );
}

// ─── FAQ dinamici per categoria prodotto ─────────────────────────────────────

function getFaqItems(product: Product) {
  const isAutodesk = product.softwareBrand?.toLowerCase().includes('autodesk') ||
    product.category?.toLowerCase().includes('autodesk') ||
    product.nameIt?.toLowerCase().includes('autodesk');

  const isWindows = product.nameIt?.toLowerCase().includes('windows');
  const isOffice = product.nameIt?.toLowerCase().includes('office') || product.nameIt?.toLowerCase().includes('microsoft 365');
  const isAntivirus = product.category?.toLowerCase().includes('antivirus') || product.softwareBrand?.toLowerCase().includes('kaspersky');
  const isCollection = product.nameIt?.toLowerCase().includes('collection') || product.nameIt?.toLowerCase().includes('aec') || product.nameIt?.toLowerCase().includes('pd&m') || product.nameIt?.toLowerCase().includes('m&e');

  if (isAutodesk || isCollection) {
    const deliveryTime = product.deliveryTime || 'entro 10 minuti';
    return [
      {
        q: 'Come funziona l\'assegnazione dell\'abbonamento Autodesk?',
        a: `Dopo il pagamento, il nostro team assegnerà l'abbonamento all'indirizzo email che hai usato durante il checkout. Riceverai una notifica da Autodesk ${deliveryTime}. È necessario disporre o creare un account Autodesk ID con quella email.`
      },
      {
        q: 'Quale email devo usare per l\'acquisto?',
        a: 'Devi usare l\'email associata al tuo account Autodesk (o quella con cui vuoi creare un nuovo account). L\'abbonamento viene assegnato direttamente a quell\'indirizzo: non è possibile cambiarlo dopo l\'acquisto, quindi verifica attentamente prima di procedere al pagamento.'
      },
      {
        q: 'Qual è la differenza tra piano mensile e piano triennale?',
        a: 'Il piano mensile (€14,99/mese) si rinnova automaticamente ogni mese e può essere disdetto in qualsiasi momento. Il piano triennale (€87,99) copre 3 anni a prezzo bloccato e offre un risparmio significativo rispetto al mensile. Entrambi includono gli stessi strumenti e aggiornamenti.'
      },
      {
        q: 'Posso usare l\'abbonamento per uso commerciale?',
        a: 'Sì. Gli abbonamenti Autodesk venduti su Licenvo sono licenze commerciali complete, valide per uso professionale e aziendale. Per acquisti multipli aziendali ti invitiamo a contattarci tramite la sezione Consulenza Aziendale per ricevere un preventivo personalizzato.'
      },
      {
        q: 'Cosa succede alla scadenza dell\'abbonamento?',
        a: 'Il piano mensile si rinnova automaticamente ogni mese. Il piano triennale scade dopo 3 anni: riceverai una notifica via email prima della scadenza. I file creati rimangono accessibili in sola lettura anche dopo la scadenza; per continuare a modificarli è necessario rinnovare l\'abbonamento.'
      },
      {
        q: 'Il software è scaricabile subito?',
        a: 'Sì. Non appena ricevi la conferma di assegnazione da Autodesk, puoi scaricare il software dal portale ufficiale Autodesk (autodesk.com) accedendo con il tuo account. Il download è sempre ufficiale e aggiornato all\'ultima versione disponibile.'
      },
    ];
  }

  if (isWindows) {
    return [
      { q: 'Come ricevo la chiave di attivazione Windows?', a: 'Dopo il pagamento riceverai la chiave di attivazione via email in pochi secondi. Controlla anche la cartella spam. La chiave è valida per sempre e non ha scadenza.' },
      { q: 'Su quanti PC posso attivare Windows?', a: 'Ogni chiave attiva Windows su 1 PC. Se sostituisci l\'hardware principale (scheda madre), potresti dover riattivare via telefono contattando Microsoft.' },
      { q: 'Posso aggiornare da Windows 10 a Windows 11 con questa chiave?', a: 'Sì, se il tuo PC soddisfa i requisiti hardware di Windows 11 (TPM 2.0, Secure Boot, CPU compatibile), puoi usare questa chiave per attivare un\'installazione pulita di Windows 11 Pro.' },
      { q: 'La licenza include gli aggiornamenti futuri?', a: 'Sì. Windows 11 Pro riceve aggiornamenti di sicurezza gratuiti per tutta la durata del supporto Microsoft (previsto fino al 2031 e oltre). Non include l\'upgrade automatico a eventuali versioni future di Windows.' },
      { q: 'Cosa fare se la chiave non funziona?', a: 'Contattaci subito via email o chat. Offriamo sostituzione gratuita o rimborso completo entro 30 giorni dall\'acquisto, senza fare domande.' },
    ];
  }

  if (isOffice) {
    return [
      { q: 'Come ricevo la chiave di attivazione Office?', a: 'Riceverai la chiave via email in pochi secondi dal pagamento. Puoi attivarla su office.com/setup oppure direttamente dall\'applicazione Office dopo il download.' },
      { q: 'Su quanti dispositivi posso usare Office?', a: 'Dipende dalla versione: Office 2021 Home & Business è per 1 PC o Mac. Microsoft 365 Personal copre 1 utente su più dispositivi. Le versioni Family coprono fino a 6 utenti.' },
      { q: 'Questa è una licenza permanente o abbonamento?', a: 'Office 2021 è una licenza perpetua (acquisto una tantum, nessun rinnovo). Microsoft 365 è invece un abbonamento annuale che include aggiornamenti continui e OneDrive.' },
      { q: 'Include gli aggiornamenti?', a: 'Office 2021 riceve aggiornamenti di sicurezza ma non nuove funzionalità. Microsoft 365 riceve continuamente nuove funzionalità e versioni aggiornate delle app.' },
      { q: 'Cosa fare se la chiave non funziona?', a: 'Contattaci subito. Offriamo sostituzione gratuita o rimborso completo entro 30 giorni dall\'acquisto.' },
    ];
  }

  if (isAntivirus) {
    return [
      { q: 'Come attivo Kaspersky dopo l\'acquisto?', a: 'Riceverai il codice di attivazione via email in pochi secondi. Scarica Kaspersky dal sito ufficiale kaspersky.com, installalo e inserisci il codice durante la configurazione iniziale.' },
      { q: 'Su quanti dispositivi funziona?', a: 'Il numero di dispositivi è indicato nella descrizione del prodotto (es. 1, 3 o 5 dispositivi). Puoi usarli su una combinazione di PC Windows, Mac, Android e iOS.' },
      { q: 'La protezione inizia subito dopo l\'attivazione?', a: 'Sì. Non appena inserisci il codice, la protezione è attiva immediatamente. Kaspersky eseguirà una scansione iniziale del sistema.' },
      { q: 'Posso rinnovare alla scadenza?', a: 'Sì. Prima della scadenza riceverai una notifica via email. Puoi acquistare un nuovo codice di rinnovo su Licenvo.' },
      { q: 'Cosa fare se il codice non funziona?', a: 'Contattaci subito. Offriamo sostituzione gratuita o rimborso completo entro 30 giorni.' },
    ];
  }

  // Default generico
  return [
    { q: 'Come ricevo il mio prodotto?', a: 'Dopo il pagamento riceverai la chiave di attivazione o le credenziali di accesso via email. I tempi di consegna sono indicati nella pagina prodotto.' },
    { q: 'Il prodotto è originale e legale?', a: 'Sì, tutte le licenze vendute su Licenvo sono originali e legittime, acquistate da distributori autorizzati e attivabili sui server ufficiali del produttore.' },
    { q: 'Cosa fare se il prodotto non funziona?', a: 'Contattaci subito via email o chat. Offriamo sostituzione gratuita o rimborso completo entro 30 giorni dall\'acquisto.' },
    { q: 'Posso avere fattura elettronica?', a: 'Sì. Al momento del checkout seleziona "Fattura elettronica" e inserisci i tuoi dati fiscali (Codice Fiscale/P.IVA e Codice SDI). La fattura verrà emessa e inviata automaticamente.' },
  ];
}

function FaqAccordion({ product }: { product: Product }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = getFaqItems(product);
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
          >
            <span className="font-semibold text-sm text-foreground pr-4">{item.q}</span>
            <Icon name="ChevronDownIcon" size={16} className={`text-muted-foreground transition-transform duration-300 shrink-0 ${open === idx ? 'rotate-180' : ''}`} />
          </button>
          <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open === idx ? '400px' : '0px' }}>
            <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Sezione Consulenza Aziendale ────────────────────────────────────────────

function BusinessConsultingSection({ product }: { product: Product }) {
  const isAutodesk = product.softwareBrand?.toLowerCase().includes('autodesk') ||
    product.nameIt?.toLowerCase().includes('autodesk') ||
    product.nameIt?.toLowerCase().includes('collection');
  if (!isAutodesk) return null;

  return (
    <div className="mb-5">
      <div className="rounded-2xl overflow-hidden border border-primary/20">
        {/* Header */}
        <div className="bg-primary px-8 py-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Icon name="BuildingOffice2Icon" size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Consulenza per Aziende</h2>
              <p className="text-sm text-white/80 max-w-2xl">
                Stai valutando l'adozione di Autodesk per la tua azienda? Offriamo soluzioni su misura
                per team di progettazione, studi tecnici e grandi organizzazioni — con prezzi dedicati,
                licenze multi-seat e supporto all'onboarding.
              </p>
            </div>
          </div>
        </div>

        {/* Corpo */}
        <div className="bg-white p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: 'UserGroupIcon',
                title: 'Licenze Multi-Utente',
                desc: 'Gestisci abbonamenti per team di qualsiasi dimensione — da 2 a 500+ utenti — con un unico account amministratore. Assegnazione e revoca semplificate.'
              },
              {
                icon: 'DocumentTextIcon',
                title: 'Fatturazione B2B',
                desc: 'Fattura elettronica intestata alla tua azienda con P.IVA, split payment e possibilità di pagamento a 30/60 giorni per clienti qualificati.'
              },
              {
                icon: 'AcademicCapIcon',
                title: 'Supporto Dedicato',
                desc: 'Un referente dedicato ti segue nella scelta del piano, nell\'attivazione e nell\'onboarding del team. Assistenza prioritaria via email e telefono.'
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Prodotti disponibili per aziende */}
          <div className="bg-muted/40 rounded-xl p-5 mb-6 border border-border">
            <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
              <Icon name="CubeIcon" size={16} className="text-primary" />
              Soluzioni Autodesk disponibili per aziende
            </h3>
            <div className="grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
              {[
                { name: 'AEC Collection', desc: 'Architettura, Ingegneria, Edilizia — Revit, AutoCAD, Civil 3D' },
                { name: 'PD&M Collection', desc: 'Progettazione Prodotto — Fusion, Inventor, AutoCAD' },
                { name: 'M&E Collection', desc: 'Media & Entertainment — Maya, 3ds Max, Arnold' },
              ].map((c) => (
                <div key={c.name} className="bg-white rounded-lg p-3 border border-border">
                  <p className="font-semibold text-foreground mb-0.5">{c.name}</p>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <a
              href="mailto:enterprise@licenvo.com?subject=Consulenza%20Autodesk%20Aziendale"
              className="inline-flex items-center gap-2 btn-primary px-6 py-3 text-sm font-bold rounded-xl"
            >
              <Icon name="EnvelopeIcon" size={16} />
              Richiedi Preventivo Gratuito
            </a>
            <a
              href="https://wa.me/393000000000?text=Ciao%2C%20sono%20interessato%20a%20una%20consulenza%20Autodesk%20per%20la%20mia%20azienda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl border border-border bg-white hover:bg-muted/40 transition-colors text-foreground"
            >
              <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contattaci su WhatsApp
            </a>
            <p className="text-xs text-muted-foreground sm:ml-2">
              Risposta entro 2 ore lavorative — Lun/Ven 9:00-18:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Selettore Variante dinamico da Shopify ──────────────────────────────────

interface ShopifyVariantSlim {
  id: string;
  title: string;
  price: string;
  available: boolean;
}

function VariantSelector({
  variants,
  selectedId,
  onSelect,
}: {
  variants: ShopifyVariantSlim[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  if (!variants || variants.length <= 1) return null;

  // Etichette descrittive per piano
  const META: Record<string, { sub: string; badge?: string; badgeColor?: string }> = {
    mensile:    { sub: '€14,99/mese · Rinnovo mensile' },
    triennale:  { sub: '€87,99 · Prezzo bloccato 3 anni', badge: 'Miglior Valore', badgeColor: 'bg-emerald-600' },
  };

  return (
    <div>
      <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">
        Piano di Abbonamento
      </label>
      <div className={`grid gap-2.5 ${variants.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {variants.map((v) => {
          const key = v.title.toLowerCase();
          const meta = META[key] || { sub: v.title };
          const isSelected = v.id === selectedId;
          const price = parseFloat(v.price);
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              className={`relative rounded-xl border-2 p-2.5 sm:p-3 text-left transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/40 bg-white'
              }`}
            >
              {meta.badge && (
                <span className={`absolute -top-2.5 right-1 ${meta.badgeColor} text-white text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wide`}>
                  {meta.badge}
                </span>
              )}
              <p className={`text-[11px] sm:text-xs font-semibold mb-0.5 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                {v.title}
              </p>
              <p className="text-sm sm:text-base font-extrabold text-foreground">€{fmtEur(price)}</p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 leading-tight">{meta.sub}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Reviews statiche ─────────────────────────────────────────────────────────

const defaultReviews = [
  { name: 'Alessandro Ricci', date: '10 Maggio 2025', rating: 5, text: 'Chiave ricevuta in 20 secondi. Attivazione perfetta al primo tentativo. Prezzo imbattibile!', verified: true },
  { name: 'Francesca Conti', date: '5 Maggio 2025', rating: 5, text: 'Ottimo servizio, prodotto originale come promesso. Lo consiglio a tutti.', verified: true },
  { name: 'Roberto Mancini', date: '28 Aprile 2025', rating: 4, text: 'Tutto funzionante, piccolo ritardo nell\'email ma risolto subito dal supporto.', verified: true },
];

// ─── Componente principale ────────────────────────────────────────────────────

export default function ProductDetailClient() {
  const searchStr = useSearch();
  const urlParams = new URLSearchParams(searchStr);
  const productId = urlParams.get('id') || '1';

  const { products: shopifyProducts } = useShopifyProducts();
  const [product, setProduct] = useState<(Product & { variantId?: string }) | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'descrizione' | 'compatibilita' | 'istruzioni'>('descrizione');
  const [quantity, setQuantity] = useState(1);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [quickCheckoutLoading, setQuickCheckoutLoading] = useState(false);
  const [shopifyVariants, setShopifyVariants] = useState<Array<{id:string;title:string;price:string;available:boolean}>>([]);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const ctaRef = useRef<HTMLButtonElement>(null);

  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -20px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [product]);

  const isAutodeskProduct = (p: Product | null) =>
    !!(p && (p.softwareBrand?.toLowerCase().includes('autodesk') ||
      p.nameIt?.toLowerCase().includes('autodesk') ||
      p.nameIt?.toLowerCase().includes('collection')));

  const selectedShopifyVariant = shopifyVariants.find(v => v.id === selectedVariantId);
  const currentPrice = isAutodeskProduct(product) && selectedShopifyVariant
    ? parseFloat(selectedShopifyVariant.price)
    : (product?.salePrice ?? 0);

  const handleQuickCheckout = async () => {
    if (!product) return;
    // Autodesk: usa la variante selezionata dal selettore
    const variantId = isAutodeskProduct(product) && selectedVariantId
      ? selectedVariantId
      : (product as Product & { variantId?: string }).variantId;
    if (!variantId) { addToCart(product); return; }
    setQuickCheckoutLoading(true);
    try {
      const cart = await createCart([{ merchandiseId: variantId, quantity: 1 }]);
      window.location.href = cart.checkoutUrl;
    } catch {
      addToCart(product);
    } finally {
      setQuickCheckoutLoading(false);
    }
  };

  useEffect(() => {
    setLoadingProduct(true);
    setActiveImage(0);
    fetchProductById(productId)
      .then((sp) => {
        if (sp) {
          setProduct(shopifyProductToProduct(sp));
          // Carica tutte le varianti con ID, titolo, prezzo
          const variants = sp.variants.nodes.map(v => ({
            id: v.id,
            title: v.title,
            price: v.price.amount,
            available: v.availableForSale,
          }));
          setShopifyVariants(variants);
          // Seleziona di default la variante "Mensile" se esiste, altrimenti la prima
          const mensile = variants.find(v => v.title.toLowerCase().includes('mensile'));
          setSelectedVariantId(mensile?.id ?? variants[0]?.id ?? '');
        } else { const fb = getProductById(productId); if (fb) setProduct(fb); }
      })
      .catch(() => { const fb = getProductById(productId); if (fb) setProduct(fb); })
      .finally(() => setLoadingProduct(false));
  }, [productId]);

  if (loadingProduct || !product) {
    return (
      <div className="section-container py-6 text-center">
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Caricamento prodotto...</p>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const isAutodesk = isAutodeskProduct(product);

  const activationSteps = [
    { title: product.activationStep1Title, text: product.activationStep1Text },
    { title: product.activationStep2Title, text: product.activationStep2Text },
    { title: product.activationStep3Title, text: product.activationStep3Text },
    { title: product.activationStep4Title, text: product.activationStep4Text },
  ].filter((s) => s.title && s.text);

  const badges = [product.badge1, product.badge2, product.badge3].filter(Boolean) as string[];

  const compatibilityItems = [
    { label: 'Piattaforma', value: product.cardPlatform || product.platform },
    { label: 'Regione', value: product.region },
    { label: 'Categoria', value: product.softwareCategory || product.category },
    { label: 'Tipo Licenza', value: product.licenseType || product.cardLicenseType },
    { label: 'Lingua', value: product.language || product.cardLanguage || 'Multilingua' },
    { label: 'Supporto', value: product.support || product.cardSupport || '24/7' },
    { label: 'Dispositivi', value: product.devicesSupported },
    { label: 'Durata', value: product.subscriptionDuration },
    { label: 'Aggiornamenti', value: product.updates },
    { label: 'Garanzia', value: product.warranty },
    { label: 'Uso Commerciale', value: product.commercialUse },
    { label: 'Formato', value: product.productFormat },
  ].filter((item) => item.value);

  const featuresList = product.softwareFeatures
    ? product.softwareFeatures.split('\n').filter((f) => f.trim())
    : ['Licenza originale con attivazione garantita', 'Aggiornamenti inclusi per tutta la durata', 'Supporto tecnico in italiano', 'Consegna via email'];

  const deliveryText = product.deliveryTime || 'Entro pochi secondi';
  const isCheckoutEmailRequired = product.checkoutEmailRequired?.toLowerCase().startsWith('sì');

  return (
    <>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.nameIt,
            description: product.descriptionIt,
            brand: product.softwareBrand ? { '@type': 'Brand', name: product.softwareBrand } : undefined,
            offers: {
              '@type': 'Offer',
              price: currentPrice,
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
            },
            aggregateRating: product.reviewCount > 0 ? {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            } : undefined,
          }),
        }}
      />

      <div className="section-container pt-2 pb-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Icon name="ChevronRightIcon" size={12} />
          <Link href="/product-catalog" className="hover:text-foreground transition-colors">Catalogo</Link>
          <Icon name="ChevronRightIcon" size={12} />
          <span className="text-foreground truncate max-w-[200px]">{product.nameIt}</span>
        </nav>

        {/* ── GRID PRINCIPALE ── */}
        <div className="grid lg:grid-cols-12 gap-6 mb-8 items-start">

          {/* Galleria immagini */}
          <div className="lg:col-span-4 space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border relative flex items-center justify-center">
              <AppImage
                src={product.images[activeImage] || product.image}
                alt={`${product.nameIt} — immagine ${activeImage + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="discount-badge text-sm font-bold px-3 py-1 rounded-full">-{product.discount}%</span>
                </div>
              )}
              {product.instantDelivery && !(product.deliveryTime?.toLowerCase().includes('minut')) && (
                <div className="absolute top-4 right-4">
                  <span className="instant-badge text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Icon name="BoltIcon" size={12} variant="solid" />
                    Consegna Istantanea
                  </span>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all bg-muted ${activeImage === idx ? 'border-primary' : 'border-border hover:border-primary/50'}`}>
                    <AppImage src={img} alt={`thumbnail ${idx + 1}`} width={64} height={64} className="w-full h-full object-contain p-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info prodotto */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {product.softwareCategory || product.category}
                </span>
                {product.softwareBrand && (
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                    {product.softwareBrand}
                  </span>
                )}
                {product.isBestseller && (
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Icon name="FireIcon" size={11} variant="solid" className="text-amber-500" />
                    Più Venduto
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-extrabold text-foreground leading-tight mb-3">{product.nameIt}</h1>
              {product.shortDescription && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{product.shortDescription}</p>
              )}
              <div className="flex items-center gap-3">
                <StarRating rating={product.rating} size="sm" />
                <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                {product.reviewCount > 0 && (
                  <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString('it-IT')} recensioni)</span>
                )}
              </div>
            </div>

            {/* Badge info */}
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-muted/50 border border-border rounded-lg px-3 py-1.5">
                <Icon name="ComputerDesktopIcon" size={13} className="text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">{product.platform}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/50 border border-border rounded-lg px-3 py-1.5">
                <Icon name="GlobeAltIcon" size={13} className="text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">{product.region}</span>
              </div>
              {product.licenseType && (
                <div className="flex items-center gap-1.5 bg-muted/50 border border-border rounded-lg px-3 py-1.5">
                  <Icon name="KeyIcon" size={13} className="text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">{product.licenseType}</span>
                </div>
              )}
            </div>

            {/* Garanzie */}
            <div className="space-y-2">
              {(badges.length > 0 ? badges.map((b, i) => ({ icon: i === 0 ? 'BoltIcon' : i === 1 ? 'ShieldCheckIcon' : 'ArrowPathIcon', text: b, color: i === 0 ? 'text-amber-500' : i === 1 ? 'text-emerald-500' : 'text-blue-500' })) : [
                { icon: 'BoltIcon', text: `Consegna ${deliveryText.toLowerCase()}`, color: 'text-amber-500' },
                { icon: 'ShieldCheckIcon', text: 'Licenza originale garantita al 100%', color: 'text-emerald-500' },
                { icon: 'ArrowPathIcon', text: product.refundPolicyLabel || 'Garanzia rimborso 30 giorni', color: 'text-blue-500' },
              ]).map((g) => (
                <div key={g.text} className="flex items-center gap-2.5 text-sm">
                  <Icon name={g.icon as Parameters<typeof Icon>[0]['name']} size={15} className={g.color} />
                  <span className="text-muted-foreground">{g.text}</span>
                </div>
              ))}
            </div>

            {/* Fattura elettronica */}
            <div className="flex items-center gap-2 bg-muted/30 border border-border rounded-lg px-3 py-2">
              <Icon name="DocumentCheckIcon" size={13} className="text-primary shrink-0" />
              <p className="text-xs text-muted-foreground"><strong className="text-foreground font-semibold">Fattura elettronica</strong> disponibile — inserisci P.IVA al checkout.</p>
            </div>
          </div>

          {/* ── PURCHASE BOX ── */}
          <div className="lg:col-span-3">
            <div className="sticky top-20 glass-card rounded-2xl p-5 space-y-4 border border-primary/20">

              {/* Selettore variante Autodesk */}
              {isAutodesk && shopifyVariants.length > 0 && (
                <VariantSelector variants={shopifyVariants} selectedId={selectedVariantId} onSelect={setSelectedVariantId} />
              )}

              {/* Prezzo */}
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="price-mono text-3xl font-extrabold text-primary">
                    €{fmtEur(currentPrice)}
                    {isAutodesk && selectedShopifyVariant?.title?.toLowerCase().includes('mensile') && (
                      <span className="text-sm font-normal text-muted-foreground ml-1">/mese</span>
                    )}
                  </span>
                  {!isAutodesk && product.originalPrice > product.salePrice && (
                    <span className="price-mono text-base text-muted-foreground line-through">€{fmtEur(product.originalPrice)}</span>
                  )}
                </div>
                {!isAutodesk && product.discount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="discount-badge text-xs font-bold px-2 py-0.5 rounded-full">-{product.discount}%</span>
                    <span className="text-xs text-emerald-600 font-semibold">Risparmi €{fmtEur(product.originalPrice - product.salePrice)}</span>
                  </div>
                )}
                {isAutodesk && selectedShopifyVariant?.title?.toLowerCase().includes('triennale') && (
                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Icon name="CheckCircleIcon" size={12} />
                    Risparmio di €{fmtEur(14.99 * 36 - 87.99)} rispetto al mensile
                  </p>
                )}
              </div>

              {/* Quantità (solo non-Autodesk) */}
              {!isAutodesk && (
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">Quantità</label>
                  <div className="flex items-center gap-3 border border-border rounded-xl overflow-hidden w-fit">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-bold">−</button>
                    <span className="px-3 font-bold text-foreground">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-bold">+</button>
                  </div>
                </div>
              )}

              {/* CTA buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={handleQuickCheckout}
                  disabled={quickCheckoutLoading}
                  ref={ctaRef}
                  className="w-full btn-primary py-2.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {quickCheckoutLoading ? (
                    <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Attendi…</>
                  ) : (
                    <><Icon name="BoltIcon" size={16} variant="solid" />{isAutodesk ? 'Acquista Abbonamento' : 'Acquista Ora'}</>
                  )}
                </button>
                {!isAutodesk && (
                  <button
                    onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-primary/40 bg-primary/5 text-primary font-semibold text-sm transition-all hover:bg-primary/10"
                  >
                    <Icon name="ShoppingCartIcon" size={14} />
                    Aggiungi al Carrello
                  </button>
                )}
                <button
                  onClick={() => toggle(product)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border font-semibold text-sm transition-all ${wishlisted ? 'border-red-400/50 bg-red-50 text-red-500' : 'border-border bg-muted/20 text-muted-foreground hover:text-foreground'}`}
                >
                  <Icon name="HeartIcon" size={14} variant={wishlisted ? 'solid' : 'outline'} />
                  {wishlisted ? 'Nei Preferiti' : 'Aggiungi ai Preferiti'}
                </button>
              </div>

              {/* Box consegna */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center gap-2">
                <Icon name="BoltIcon" size={13} className="text-emerald-600 shrink-0" variant="solid" />
                <span className="text-emerald-700 text-xs font-semibold">
                  {isAutodesk ? `Assegnazione ${deliveryText.toLowerCase()}` : `Consegna ${deliveryText.toLowerCase()}`}
                </span>
              </div>

              {/* Avviso email checkout per prodotti Autodesk */}
              {isCheckoutEmailRequired && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2">
                  <Icon name="ExclamationTriangleIcon" size={13} className="text-amber-600 shrink-0" />
                  <span className="text-amber-700 text-xs font-semibold">Usa l&apos;email del tuo account Autodesk al checkout</span>
                </div>
              )}

              {/* Trust badges + metodi pagamento (Hoppy) */}
              <HoppyTrustBadges />
            </div>
          </div>
        </div>

        {/* ── TAB CONTENUTO ── */}
        <div className="mb-5">
          <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto scrollbar-hide">
            {(['descrizione', 'compatibilita', 'istruzioni'] as const).map((tab) => {
              const labels = { descrizione: 'Descrizione', compatibilita: 'Specifiche', istruzioni: 'Istruzioni' };
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all -mb-px ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          <div className="glass-card rounded-2xl p-6">
            {activeTab === 'descrizione' && (
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-5">{product.descriptionIt}</p>
                <h3 className="text-base font-bold text-foreground mb-3">Caratteristiche principali</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {featuresList.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Icon name="CheckCircleIcon" size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                {product.systemRequirements && (
                  <>
                    <h3 className="text-base font-bold text-foreground mt-6 mb-3">Requisiti di Sistema</h3>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {product.systemRequirements.split('\n').filter(Boolean).map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Icon name="CpuChipIcon" size={14} className="text-primary/60 shrink-0 mt-0.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {activeTab === 'compatibilita' && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {compatibilityItems.map((item) => (
                    <div key={item.label} className="bg-muted/40 rounded-xl p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
                {product.compatibility && (
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-3">Compatibilità Sistema</h3>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {product.compatibility.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Icon name="CheckIcon" size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'istruzioni' && (
              <div className="space-y-4">
                {(activationSteps.length > 0 ? activationSteps.map((s, idx) => ({ step: String(idx + 1).padStart(2, '0'), title: s.title!, desc: s.text! })) : [
                  { step: '01', title: isAutodesk ? 'Completa il pagamento' : 'Completa il pagamento', desc: isAutodesk ? 'Procedi al checkout. Usa l\'email del tuo account Autodesk — verrà usata per l\'assegnazione.' : 'Procedi al checkout sicuro e completa il pagamento.' },
                  { step: '02', title: isAutodesk ? 'Conferma di assegnazione' : 'Ricevi la chiave', desc: isAutodesk ? `Riceverai una email da Autodesk che conferma l'assegnazione dell'abbonamento al tuo account.` : 'Ricevi la chiave di attivazione via email in pochi secondi.' },
                  { step: '03', title: isAutodesk ? 'Scarica il software' : 'Attiva il prodotto', desc: isAutodesk ? 'Accedi ad autodesk.com con il tuo account e scarica il software direttamente dal portale ufficiale.' : 'Segui le istruzioni nell\'email per attivare il prodotto.' },
                  { step: '04', title: 'Inizia a lavorare', desc: isAutodesk ? 'Il software è attivato e pronto all\'uso. Hai accesso a tutti gli aggiornamenti durante il periodo di abbonamento.' : 'Inizia subito a utilizzare il tuo software con licenza originale.' },
                ]).map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary font-bold text-xs flex items-center justify-center shrink-0">{s.step}</div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-0.5">{s.title}</p>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── CONSULENZA AZIENDALE (solo Autodesk) ── */}
        <BusinessConsultingSection product={product} />

        {/* ── RECENSIONI ── */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-foreground mb-6">Recensioni dei Clienti</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3">
              <div className="price-mono text-5xl font-extrabold text-foreground">{product.rating}</div>
              <StarRating rating={product.rating} size="lg" />
              {product.reviewCount > 0 && <p className="text-sm text-muted-foreground">{product.reviewCount.toLocaleString('it-IT')} recensioni verificate</p>}
            </div>
            <div className="lg:col-span-2 space-y-4">
              {defaultReviews.map((r) => (
                <div key={r.name} className="glass-card-light rounded-xl p-4 border border-border space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">{r.name[0]}</div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{r.name}</p>
                        <p className="text-[10px] text-muted-foreground">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={r.rating} />
                      {r.verified && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                          <Icon name="CheckBadgeIcon" size={10} className="text-emerald-600" />
                          Verificato
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ DINAMICHE ── */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-foreground mb-6">Domande Frequenti</h2>
          <FaqAccordion product={product} />
        </div>

        {/* ── PRODOTTI CORRELATI ── */}
        {(() => {
          const related = shopifyProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
          const fallback = related.length >= 2 ? related : shopifyProducts.filter((p) => p.id !== product.id).slice(0, 4);
          if (shopifyProducts.length === 0) return null;
          return (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Prodotti Correlati</h2>
                <Link href="/product-catalog" className="btn-ghost text-sm flex items-center gap-1">
                  Vedi tutti <Icon name="ArrowRightIcon" size={14} />
                </Link>
              </div>
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
                {fallback.map((p) => (
                  <div key={p.id} className="snap-start shrink-0 w-[70vw] sm:w-auto">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* ── STICKY BAR MOBILE ── */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="bg-white/98 backdrop-blur-xl border-t border-border shadow-lg px-4 pt-3 pb-4 safe-area-bottom">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
              <img src={product.image} alt={product.nameIt} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-muted-foreground truncate">{product.nameIt}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="price-mono font-extrabold text-primary text-base">€{fmtEur(currentPrice)}</span>
                {!isAutodesk && product.originalPrice > product.salePrice && (
                  <span className="price-mono text-xs text-muted-foreground line-through">€{fmtEur(product.originalPrice)}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {!isAutodesk && (
              <button onClick={() => addToCart(product)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-primary/40 bg-primary/5 text-primary font-semibold text-sm">
                <Icon name="ShoppingCartIcon" size={14} />
                Carrello
              </button>
            )}
            <button onClick={handleQuickCheckout} disabled={quickCheckoutLoading}
              className={`${isAutodesk ? 'w-full' : 'flex-1'} btn-primary py-2.5 text-sm font-bold flex items-center justify-center gap-1.5 disabled:opacity-60`}>
              {quickCheckoutLoading ? <><div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />Attendi…</> : <><Icon name="BoltIcon" size={14} variant="solid" />Acquista</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
