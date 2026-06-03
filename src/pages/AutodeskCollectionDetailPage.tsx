import React, { useEffect, useState } from 'react';
import { Link, useRoute } from 'wouter';
import { fetchProductByHandle } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';

const CDN = 'https://cdn.shopify.com/s/files/1/1049/6268/7317/files';

interface SoftwareItem {
  name: string;
  image: string;
  description: string;
}

interface CollectionInfo {
  title: string;
  subtitle: string;
  description: string;
  handle: string;
  color: string;
  software: SoftwareItem[];
  idealFor: string[];
}

const collectionsData: Record<string, CollectionInfo> = {
  aec: {
    title: 'AEC Collection',
    subtitle: 'Architecture, Engineering & Construction',
    description: 'La suite professionale per architetti, ingegneri strutturali, progettisti di infrastrutture e imprese di costruzione. Progetta edifici, strade, ponti e impianti con strumenti BIM integrati.',
    handle: 'autodesk-aec-collection',
    color: '#0052CC',
    software: [
      { name: 'AutoCAD', image: `${CDN}/autocad-2023-simplified-badge-75x75.png`, description: 'CAD 2D e 3D per disegno tecnico e documentazione' },
      { name: 'Revit', image: `${CDN}/revit-2023-simplified-badge-75x75.png`, description: 'BIM per progettazione architettonica e strutturale' },
      { name: 'Civil 3D', image: `${CDN}/civil-3d-2023-simplified-badge-75x75.png`, description: 'Progettazione infrastrutture civili e strade' },
      { name: 'Navisworks', image: `${CDN}/navisworks-simulate-2023-simplified-badge-75x75.png`, description: 'Coordinamento modelli e rilevamento interferenze' },
      { name: 'Advance Steel', image: `${CDN}/adsk-icon-badge-75x75.png`, description: 'Dettaglio strutture in acciaio e carpenteria' },
      { name: 'InfraWorks', image: `${CDN}/adsk-icon-badge-75x75.png`, description: 'Progettazione concettuale infrastrutture' },
      { name: 'ReCap Pro', image: `${CDN}/recap-pro-2023-simplified-badge-75x75.png`, description: 'Scansione 3D e nuvole di punti' },
    ],
    idealFor: ['Studi di architettura', 'Ingegneria civile e strutturale', 'Imprese di costruzioni', 'Urbanistica e pianificazione territoriale'],
  },
  pdm: {
    title: 'PD&M Collection',
    subtitle: 'Product Design & Manufacturing',
    description: "Strumenti integrati per progettazione meccanica, simulazione, produzione e gestione dati di prodotto. Dall'idea al prototipo alla produzione industriale.",
    handle: 'autodesk-pdm-collection',
    color: '#FF6B35',
    software: [
      { name: 'Inventor Professional', image: `${CDN}/inventor-professional-2023-simplified-badge-75x75.png`, description: 'Progettazione meccanica 3D parametrica e simulazione' },
      { name: 'AutoCAD', image: `${CDN}/autocad-2023-simplified-badge-75x75.png`, description: 'CAD 2D/3D per documentazione tecnica di produzione' },
      { name: 'Fusion 360', image: `${CDN}/fusion-360-2023-simplified-badge-75x75.png`, description: 'CAD/CAM/CAE cloud per progettazione integrata' },
      { name: 'AutoCAD Electrical', image: `${CDN}/adsk-icon-badge-75x75.png`, description: 'Progettazione schemi elettrici industriali' },
      { name: 'ReCap Pro', image: `${CDN}/recap-pro-2023-simplified-badge-75x75.png`, description: 'Reality capture e reverse engineering' },
      { name: 'Navisworks', image: `${CDN}/navisworks-simulate-2023-simplified-badge-75x75.png`, description: 'Review e coordinamento progetti complessi' },
    ],
    idealFor: ['Progettazione meccanica', 'Industria manifatturiera e automotive', 'Ingegneria di produzione', 'Prototipazione rapida'],
  },
  me: {
    title: 'M&E Collection',
    subtitle: 'Media & Entertainment',
    description: "Pipeline completa per effetti visivi, animazione cinematografica, game development e motion graphics. Usata nei migliori studi di Hollywood e gaming mondiale.",
    handle: 'autodesk-me-collection',
    color: '#6554C0',
    software: [
      { name: 'Maya', image: `${CDN}/maya-2023-simplified-badge-75x75.png`, description: 'Animazione 3D, modellazione e effetti visivi' },
      { name: '3ds Max', image: `${CDN}/3ds-max-2023-simplified-badge-75x75.png`, description: 'Modellazione 3D, rendering e visualizzazione architettonica' },
      { name: 'Arnold', image: `${CDN}/arnold-2023-simplified-badge-75x75.png`, description: 'Rendering fotorealistico ray-tracing Monte Carlo' },
      { name: 'MotionBuilder', image: `${CDN}/adsk-icon-badge-75x75.png`, description: 'Motion capture e animazione real-time' },
      { name: 'Mudbox', image: `${CDN}/mudbox-2023-simplified-badge-75x75.png`, description: 'Sculpting digitale e texture painting 3D' },
      { name: 'Flame', image: `${CDN}/flame-2023-simplified-badge-75x75.png`, description: 'Compositing VFX e finishing per broadcast e cinema' },
    ],
    idealFor: ['Studi VFX e animazione', 'Game development AAA', 'Post-produzione cinematografica', 'Motion graphics e broadcast'],
  },
};

export default function AutodeskCollectionDetailPage() {
  const [, params] = useRoute('/autodesk-collections/:id');
  const colId = params?.id || 'aec';
  const col = collectionsData[colId];
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!col) return;
    fetchProductByHandle(col.handle)
      .then(p => setProduct(p))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [colId]);

  if (!col) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Collezione non trovata</h1>
        <Link href="/autodesk-collections" className="text-[#0052CC] font-medium hover:underline">
          ← Torna alle Collections
        </Link>
      </div>
    );
  }

  const mensile = product?.variants.nodes.find(v => v.title.toLowerCase().includes('mensile'));
  const triennale = product?.variants.nodes.find(v => v.title.toLowerCase().includes('triennale'));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="border-b border-gray-100" style={{ background: `${col.color}06` }}>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <Link href="/autodesk-collections" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Autodesk Collections
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${col.color}15` }}>
              <img src={col.software[0].image} alt={col.title} className="w-9 h-9 object-contain" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: col.color }}>
                {col.subtitle}
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                Autodesk {col.title}
              </h1>
              <p className="text-gray-600 max-w-2xl">{col.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Software Inclusi */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">Software inclusi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {col.software.map((sw) => (
            <div
              key={sw.name}
              className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:shadow-sm transition-shadow"
            >
              <img
                src={sw.image}
                alt={sw.name}
                className="w-11 h-11 object-contain flex-shrink-0"
                loading="lazy"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{sw.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{sw.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ideale per */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ideale per</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {col.idealFor.map(item => (
              <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${col.color}15` }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" style={{ color: col.color }}>
                    <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Piani disponibili</h2>
          <p className="text-sm text-gray-500 mb-6">Consegna digitale entro 24h. Attivazione sul tuo account Autodesk.</p>
          
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: col.color }} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                <div className="text-sm text-gray-500 mb-2">Mensile</div>
                <div className="text-2xl font-bold text-gray-900">
                  €{mensile ? parseFloat(mensile.price.amount).toFixed(2).replace('.', ',') : '14,99'}
                </div>
                <div className="text-xs text-gray-400 mt-1">al mese</div>
              </div>
              <div className="p-5 rounded-xl border-2" style={{ borderColor: col.color, background: `${col.color}06` }}>
                <div className="text-sm font-semibold mb-2" style={{ color: col.color }}>Triennale — Risparmia</div>
                <div className="text-2xl font-bold text-gray-900">
                  €{triennale ? parseFloat(triennale.price.amount).toFixed(2).replace('.', ',') : '87,99'}
                </div>
                <div className="text-xs mt-1" style={{ color: col.color }}>per 3 anni</div>
              </div>
            </div>
          )}

          <Link
            href={`/product-detail?handle=${col.handle}`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: col.color }}
          >
            Acquista ora
          </Link>
        </div>
      </div>
    </div>
  );
}
