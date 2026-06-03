import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { getProductsByVendorAndType } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';

// Dati delle 3 Collection Autodesk
const COLLECTIONS = [
  {
    id: 'aec',
    handle: 'autodesk-aec-collection',
    title: 'AEC Collection',
    fullTitle: 'Autodesk AEC Collection',
    subtitle: 'Architecture, Engineering & Construction',
    description: 'La suite completa per progettisti, ingegneri e costruttori. Oltre 15 software Autodesk in un unico abbonamento: AutoCAD, Revit, Civil 3D, Navisworks e molto altro.',
    color: '#0052CC',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="4" y="28" width="40" height="16" rx="2" fill="#0052CC" opacity="0.15"/>
        <polygon points="24,6 44,28 4,28" fill="#0052CC" opacity="0.3"/>
        <polygon points="24,10 40,28 8,28" fill="#0052CC"/>
        <rect x="18" y="28" width="12" height="16" fill="#0052CC"/>
      </svg>
    ),
    software: ['AutoCAD', 'Revit', 'Civil 3D', 'Navisworks Manage', 'InfraWorks', 'FormIt Pro', 'AutoCAD Architecture', 'AutoCAD MEP'],
    idealFor: ['Studi di architettura', 'Ingegneria civile', 'Costruzioni e cantieri', 'Pianificazione urbana'],
  },
  {
    id: 'pdm',
    handle: 'autodesk-pdm-collection',
    title: 'PD&M Collection',
    fullTitle: 'Autodesk Product Design & Manufacturing Collection',
    subtitle: 'Product Design & Manufacturing',
    description: 'La suite completa per progettisti meccanici e produzione industriale. Inventor, Fusion 360, AutoCAD Mechanical, Vault e strumenti CAM avanzati.',
    color: '#FF6B35',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="24" r="14" stroke="#FF6B35" strokeWidth="3" fill="none" opacity="0.3"/>
        <circle cx="24" cy="24" r="8" fill="#FF6B35" opacity="0.4"/>
        <circle cx="24" cy="24" r="4" fill="#FF6B35"/>
        <rect x="22" y="4" width="4" height="8" rx="2" fill="#FF6B35"/>
        <rect x="22" y="36" width="4" height="8" rx="2" fill="#FF6B35"/>
        <rect x="4" y="22" width="8" height="4" rx="2" fill="#FF6B35"/>
        <rect x="36" y="22" width="8" height="4" rx="2" fill="#FF6B35"/>
      </svg>
    ),
    software: ['Inventor Professional', 'Fusion 360', 'AutoCAD Mechanical', 'AutoCAD Electrical', 'Vault Professional', 'HSMWorks', 'Nastran In-CAD'],
    idealFor: ['Progettazione meccanica', 'Industria manifatturiera', 'Automotive', 'Elettronica industriale'],
  },
  {
    id: 'me',
    handle: 'autodesk-me-collection',
    title: 'M&E Collection',
    fullTitle: 'Autodesk Media & Entertainment Collection',
    subtitle: 'Media & Entertainment',
    description: 'La suite per animatori, artisti 3D e professionisti VFX. Maya, 3ds Max, Arnold renderer e tutti gli strumenti del cinema e dell\'intrattenimento digitale.',
    color: '#6554C0',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="4" y="10" width="40" height="28" rx="4" fill="#6554C0" opacity="0.2"/>
        <polygon points="20,16 34,24 20,32" fill="#6554C0"/>
        <circle cx="38" cy="12" r="4" fill="#6554C0" opacity="0.5"/>
        <circle cx="38" cy="12" r="2" fill="#6554C0"/>
      </svg>
    ),
    software: ['Maya', '3ds Max', 'Arnold Renderer', 'MotionBuilder', 'Mudbox', 'Flame'],
    idealFor: ['Animazione 3D', 'Effetti visivi (VFX)', 'Sviluppo videogiochi', 'Cinema e broadcast'],
  },
];

interface CollectionCardProps {
  collection: typeof COLLECTIONS[0];
  product: ShopifyProduct | null;
}

function CollectionCard({ collection, product }: CollectionCardProps) {
  const mensile = product?.variants.nodes.find(v => v.title.toLowerCase().includes('mensile'));
  const triennale = product?.variants.nodes.find(v => v.title.toLowerCase().includes('triennale'));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header colorato */}
      <div className="p-6 border-b border-gray-100" style={{ background: `${collection.color}08` }}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">{collection.icon}</div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: collection.color }}>
              Autodesk Collection
            </div>
            <h2 className="text-xl font-bold text-gray-900">{collection.title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{collection.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Descrizione */}
        <p className="text-gray-600 text-sm leading-relaxed">{collection.description}</p>

        {/* Software inclusi */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Software inclusi</p>
          <div className="flex flex-wrap gap-1.5">
            {collection.software.map(sw => (
              <span key={sw} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                {sw}
              </span>
            ))}
          </div>
        </div>

        {/* Ideale per */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Ideale per</p>
          <ul className="space-y-1">
            {collection.idealFor.map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 16 16" style={{ color: collection.color }}>
                  <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Prezzi */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
            <div className="text-xs text-gray-500 mb-1">Mensile</div>
            <div className="text-lg font-bold text-gray-900">
              €{mensile ? parseFloat(mensile.price.amount).toFixed(2).replace('.', ',') : '14,99'}
            </div>
            <div className="text-xs text-gray-400">/mese</div>
          </div>
          <div className="text-center p-3 rounded-xl border-2" style={{ borderColor: collection.color, background: `${collection.color}08` }}>
            <div className="text-xs font-semibold mb-1" style={{ color: collection.color }}>Triennale</div>
            <div className="text-lg font-bold text-gray-900">
              €{triennale ? parseFloat(triennale.price.amount).toFixed(2).replace('.', ',') : '87,99'}
            </div>
            <div className="text-xs" style={{ color: collection.color }}>3 anni</div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={product ? `/product-detail?handle=${product.handle}` : `/product-catalog?q=${encodeURIComponent(collection.fullTitle)}`}
          className="block w-full text-center py-3 px-4 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: collection.color }}
        >
          Acquista {collection.title}
        </Link>
      </div>
    </div>
  );
}

export default function AutodeskCollectionsPage() {
  const [products, setProducts] = useState<Record<string, ShopifyProduct | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Carica i prodotti Collection da Shopify
        const handles = [
          'autodesk-aec-collection',
          'autodesk-pdm-collection',
          'autodesk-me-collection',
        ];
        const map: Record<string, ShopifyProduct | null> = {};
        for (const h of handles) {
          try {
            const { fetchProductByHandle } = await import('@/lib/shopify');
            map[h] = await fetchProductByHandle(h);
          } catch {
            map[h] = null;
          }
        }
        setProducts(map);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-14 text-center">
          {/* Autodesk logo badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
            <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#0052CC]" fill="currentColor">
              <path d="M10 2L2 7v6l8 5 8-5V7L10 2z"/>
            </svg>
            <span className="text-sm font-semibold text-[#0052CC]">Autodesk Partner Ufficiale</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Autodesk Collections
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Suite complete di software professionali Autodesk. Scegli la collection per il tuo settore
            e accedi a tutti gli strumenti di cui hai bisogno con un unico abbonamento digitale.
          </p>
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: '⚡', text: 'Consegna entro 24h' },
              { icon: '🛡️', text: 'Licenza ufficiale' },
              { icon: '🔄', text: 'Aggiornamenti inclusi' },
              { icon: '💬', text: 'Supporto in italiano' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Collections */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-[#0052CC] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {COLLECTIONS.map(coll => (
              <CollectionCard
                key={coll.id}
                collection={coll}
                product={products[coll.handle] ?? null}
              />
            ))}
          </div>
        )}

        {/* Confronto Collection */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Confronto Collection
          </h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0"><div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{minWidth:"480px"}}>
            {/* Header */}
            <div className="grid grid-cols-4 min-w-[500px] bg-gray-50 border-b border-gray-100">
              <div className="p-4 text-sm font-semibold text-gray-500">Caratteristica</div>
              {COLLECTIONS.map(c => (
                <div key={c.id} className="p-4 text-center">
                  <div className="text-sm font-bold text-gray-900">{c.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{c.subtitle}</div>
                </div>
              ))}
            </div>
            {/* Rows */}
            {[
              { label: 'Settore', values: ['Edilizia & Infrastrutture', 'Meccanica & Manifattura', 'Cinema & Animazione'] },
              { label: 'Software principali', values: ['AutoCAD, Revit, Civil 3D', 'Inventor, Fusion 360, AutoCAD', 'Maya, 3ds Max, Arnold'] },
              { label: 'N° software inclusi', values: ['15+', '10+', '6+'] },
              { label: 'Prezzo mensile', values: ['€14,99', '€14,99', '€14,99'] },
              { label: 'Prezzo triennale', values: ['€87,99', '€87,99', '€87,99'] },
            ].map((row, i) => (
              <div key={row.label} className={`grid grid-cols-4 border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <div className="p-4 text-sm font-medium text-gray-600">{row.label}</div>
                {row.values.map((v, j) => (
                  <div key={j} className="p-4 text-center text-sm text-gray-700">{v}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* FAQ */}
        <div className="mt-14 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Domande frequenti</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Qual è la differenza tra una Collection e un singolo prodotto Autodesk?',
                a: 'Le Collection includono una suite completa di software per il tuo settore a un prezzo vantaggioso. Acquistando la Collection hai accesso a tutti i software inclusi con un unico abbonamento.'
              },
              {
                q: 'Come ricevo la licenza dopo l\'acquisto?',
                a: 'Ricevi le istruzioni di attivazione via email entro 24 ore dall\'acquisto. La licenza viene attivata direttamente sul tuo account Autodesk.'
              },
              {
                q: 'Posso usare la Collection su più computer?',
                a: 'Sì, l\'abbonamento Autodesk permette l\'installazione su più dispositivi. Puoi usare il software su 3 dispositivi contemporaneamente con lo stesso account.'
              },
              {
                q: 'Cosa include l\'aggiornamento?',
                a: 'L\'abbonamento include sempre la versione più recente del software e tutti gli aggiornamenti rilasciati durante il periodo di abbonamento.'
              },
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-100 p-5 group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-semibold text-gray-800 text-sm pr-4">{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA finale */}
        <div className="mt-14 text-center bg-[#0052CC] rounded-2xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-2">Non sai quale Collection scegliere?</h2>
          <p className="text-blue-100 mb-6">Il nostro team ti aiuta a scegliere la soluzione giusta per la tua azienda.</p>
          <Link href="/contact" className="inline-block bg-white text-[#0052CC] font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Contattaci gratuitamente
          </Link>
        </div>
      </div>
    </div>
  );
}
