"use client";
import React, { useState, useEffect } from 'react';
import { Link, useRoute } from 'wouter';
import { fetchCollectionProducts } from '@/lib/shopify';

const CDN = 'https://cdn.shopify.com/s/files/1/1049/6268/7317/files';

interface CollectionInfo {
  title: string;
  subtitle: string;
  description: string;
  handle: string;
  gradient: string;
  accentColor: string;
  software: { name: string; image: string; description: string }[];
}

const collectionsData: Record<string, CollectionInfo> = {
  aec: {
    title: 'AEC Collection',
    subtitle: 'Architecture, Engineering & Construction',
    description: 'La suite professionale per architetti, ingegneri strutturali, progettisti di infrastrutture e imprese di costruzione. Progetta edifici, strade, ponti e impianti con strumenti BIM integrati.',
    handle: 'autodesk-aec-collection',
    gradient: 'from-sky-600/30 to-blue-900/10',
    accentColor: 'text-sky-400',
    software: [
      { name: 'AutoCAD', image: `${CDN}/autocad-2023-simplified-badge-75x75.png`, description: 'CAD 2D e 3D per disegno tecnico e documentazione' },
      { name: 'Revit', image: `${CDN}/revit-2023-simplified-badge-75x75.png`, description: 'BIM per progettazione architettonica e strutturale' },
      { name: 'Civil 3D', image: `${CDN}/civil-3d-2023-simplified-badge-75x75.png`, description: 'Progettazione infrastrutture civili e strade' },
      { name: 'Navisworks', image: `${CDN}/navisworks-simulate-2023-simplified-badge-75x75.png`, description: 'Coordinamento modelli e rilevamento interferenze' },
      { name: 'Advance Steel', image: `${CDN}/adsk-icon-badge-75x75.png`, description: 'Dettaglio strutture in acciaio e carpenteria' },
      { name: 'InfraWorks', image: `${CDN}/adsk-icon-badge-75x75.png`, description: 'Progettazione concettuale infrastrutture' },
      { name: 'ReCap Pro', image: `${CDN}/recap-pro-2023-simplified-badge-75x75.png`, description: 'Scansione 3D e nuvole di punti' },
    ],
  },
  pdmc: {
    title: 'PDMC Collection',
    subtitle: 'Product Design & Manufacturing',
    description: 'Strumenti integrati per progettazione meccanica, simulazione, produzione e gestione dati di prodotto. Dall\'idea al prototipo alla produzione industriale.',
    handle: 'autodesk-pdmc-collection',
    gradient: 'from-orange-600/30 to-amber-900/10',
    accentColor: 'text-orange-400',
    software: [
      { name: 'Inventor', image: `${CDN}/inventor-professional-2023-simplified-badge-75x75.png`, description: 'Progettazione meccanica 3D e simulazione' },
      { name: 'AutoCAD', image: `${CDN}/autocad-2023-simplified-badge-75x75.png`, description: 'CAD 2D/3D per documentazione tecnica' },
      { name: 'Fusion 360', image: `${CDN}/fusion-360-2023-simplified-badge-75x75.png`, description: 'CAD/CAM/CAE cloud per progettazione integrata' },
      { name: 'AutoCAD Electrical', image: `${CDN}/autocad-2023-simplified-badge-75x75.png`, description: 'Progettazione schemi elettrici' },
      { name: 'ReCap Pro', image: `${CDN}/recap-pro-2023-simplified-badge-75x75.png`, description: 'Reality capture e scansione 3D' },
      { name: 'Navisworks', image: `${CDN}/navisworks-simulate-2023-simplified-badge-75x75.png`, description: 'Review e coordinamento progetti' },
    ],
  },
  me: {
    title: 'Media & Entertainment Collection',
    subtitle: 'VFX, Animazione & Gaming',
    description: 'Pipeline completa per effetti visivi, animazione cinematografica, game development e motion graphics. Usata nei migliori studi di Hollywood e gaming.',
    handle: 'autodesk-media-entertainment-collection',
    gradient: 'from-purple-600/30 to-violet-900/10',
    accentColor: 'text-purple-400',
    software: [
      { name: 'Maya', image: `${CDN}/maya-2023-simplified-badge-75x75.png`, description: 'Animazione 3D, modellazione e VFX' },
      { name: '3ds Max', image: `${CDN}/3ds-max-2023-simplified-badge-75x75.png`, description: 'Modellazione 3D, rendering e visualizzazione' },
      { name: 'Arnold', image: `${CDN}/arnold-2023-simplified-badge-75x75.png`, description: 'Rendering fotorealistico ray-tracing' },
      { name: 'MotionBuilder', image: `${CDN}/adsk-icon-badge-75x75.png`, description: 'Motion capture e animazione real-time' },
      { name: 'Mudbox', image: `${CDN}/mudbox-2023-simplified-badge-75x75.png`, description: 'Sculpting digitale e texture painting' },
      { name: 'Flame', image: `${CDN}/flame-2023-simplified-badge-75x75.png`, description: 'Compositing VFX e finishing' },
    ],
  },
};

export default function CollectionDetailClient() {
  const [, params] = useRoute('/autodesk-collections/:id');
  const colId = params?.id || 'aec';
  const col = collectionsData[colId];

  if (!col) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Collezione non trovata</h1>
        <Link href="/autodesk-collections" className="text-primary mt-4 inline-block">
          ← Torna alle Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link href="/autodesk-collections" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Autodesk Collections
          </Link>
        </nav>

        {/* Hero */}
        <div className={`rounded-2xl bg-gradient-to-br ${col.gradient} border border-border p-8 mb-10`}>
          <p className={`text-xs uppercase tracking-wider ${col.accentColor} mb-1`}>
            {col.subtitle}
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Autodesk {col.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {col.description}
          </p>
        </div>

        {/* Software Included */}
        <h2 className="text-xl font-bold text-foreground mb-6">
          Software inclusi nella {col.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {col.software.map((sw) => (
            <div
              key={sw.name}
              className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-border/80 transition-colors"
            >
              <img
                src={sw.image}
                alt={sw.name}
                className="w-10 h-10 object-contain flex-shrink-0"
                loading="lazy"
              />
              <div>
                <h3 className="font-semibold text-foreground text-sm">{sw.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{sw.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <h3 className="text-lg font-bold text-foreground mb-2">
            Abbonamento {col.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Disponibile in abbonamento mensile o triennale. Consegna istantanea via email.
          </p>
          <Link
            href={`/product-catalog?cat=autodesk`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Vedi Piani e Prezzi
          </Link>
        </div>
      </div>
    </div>
  );
}
