"use client";
import React from 'react';
import { Link } from 'wouter';

const CDN = 'https://cdn.shopify.com/s/files/1/1049/6268/7317/files';

interface SoftwareIcon {
  name: string;
  image: string;
}

interface CollectionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  handle: string;
  gradient: string;
  borderColor: string;
  software: SoftwareIcon[];
}

const collections: CollectionData[] = [
  {
    id: 'aec',
    title: 'AEC Collection',
    subtitle: 'Architecture, Engineering & Construction',
    description: 'La suite completa per architetti, ingegneri e professionisti delle costruzioni. Include i migliori strumenti per progettazione BIM, infrastrutture civili e coordinamento cantiere.',
    handle: 'autodesk-aec-collection',
    gradient: 'from-sky-600/20 to-blue-800/10',
    borderColor: 'hover:border-sky-500/50',
    software: [
      { name: 'AutoCAD', image: `${CDN}/autocad-2023-simplified-badge-75x75.png` },
      { name: 'Revit', image: `${CDN}/revit-2023-simplified-badge-75x75.png` },
      { name: 'Civil 3D', image: `${CDN}/civil-3d-2023-simplified-badge-75x75.png` },
      { name: 'Navisworks', image: `${CDN}/navisworks-simulate-2023-simplified-badge-75x75.png` },
      { name: 'Advance Steel', image: `${CDN}/adsk-icon-badge-75x75.png` },
      { name: 'InfraWorks', image: `${CDN}/adsk-icon-badge-75x75.png` },
      { name: 'ReCap Pro', image: `${CDN}/recap-pro-2023-simplified-badge-75x75.png` },
    ],
  },
  {
    id: 'pdmc',
    title: 'PDMC Collection',
    subtitle: 'Product Design & Manufacturing',
    description: 'Tutti gli strumenti per il design industriale, prototipazione e produzione. Dalla modellazione 3D alla simulazione, dalla progettazione meccanica al CAM.',
    handle: 'autodesk-pdmc-collection',
    gradient: 'from-orange-600/20 to-amber-800/10',
    borderColor: 'hover:border-orange-500/50',
    software: [
      { name: 'Inventor', image: `${CDN}/inventor-professional-2023-simplified-badge-75x75.png` },
      { name: 'AutoCAD', image: `${CDN}/autocad-2023-simplified-badge-75x75.png` },
      { name: 'Fusion 360', image: `${CDN}/fusion-360-2023-simplified-badge-75x75.png` },
      { name: 'AutoCAD Electrical', image: `${CDN}/autocad-2023-simplified-badge-75x75.png` },
      { name: 'ReCap Pro', image: `${CDN}/recap-pro-2023-simplified-badge-75x75.png` },
      { name: 'Navisworks', image: `${CDN}/navisworks-simulate-2023-simplified-badge-75x75.png` },
    ],
  },
  {
    id: 'me',
    title: 'Media & Entertainment Collection',
    subtitle: 'VFX, Animazione & Gaming',
    description: 'La collection definitiva per artisti VFX, animatori e sviluppatori di giochi. Rendering fotorealistico, animazione 3D e pipeline di produzione completa.',
    handle: 'autodesk-media-entertainment-collection',
    gradient: 'from-purple-600/20 to-violet-800/10',
    borderColor: 'hover:border-purple-500/50',
    software: [
      { name: 'Maya', image: `${CDN}/maya-2023-simplified-badge-75x75.png` },
      { name: '3ds Max', image: `${CDN}/3ds-max-2023-simplified-badge-75x75.png` },
      { name: 'Arnold', image: `${CDN}/arnold-2023-simplified-badge-75x75.png` },
      { name: 'MotionBuilder', image: `${CDN}/adsk-icon-badge-75x75.png` },
      { name: 'Mudbox', image: `${CDN}/mudbox-2023-simplified-badge-75x75.png` },
      { name: 'Flame', image: `${CDN}/flame-2023-simplified-badge-75x75.png` },
    ],
  },
];

export default function AutodeskCollectionsClient() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Autodesk Collections
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Pacchetti completi di software Autodesk per ogni settore professionale.
            Risparmia fino al 30% rispetto alle licenze singole.
          </p>
        </div>

        {/* Collection Cards */}
        <div className="grid gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/autodesk-collections/${col.id}`}
              className={`group block rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 ${col.borderColor} hover:shadow-lg`}
            >
              <div className={`bg-gradient-to-br ${col.gradient} p-6 md:p-8`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      {col.subtitle}
                    </p>
                    <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {col.title}
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-lg">
                      {col.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Scopri i piani disponibili →
                    </span>
                  </div>

                  {/* Software Icons Grid */}
                  <div className="flex flex-wrap gap-3 md:max-w-[280px] justify-center md:justify-end">
                    {col.software.map((sw) => (
                      <div
                        key={sw.name}
                        className="flex flex-col items-center gap-1 w-16"
                        title={sw.name}
                      >
                        <div className="w-12 h-12 rounded-lg bg-background/70 border border-border/50 flex items-center justify-center p-1 group-hover:border-border transition-colors">
                          <img
                            src={sw.image}
                            alt={sw.name}
                            className="w-9 h-9 object-contain"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground text-center leading-tight truncate w-full">
                          {sw.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground mb-3">
            Non sai quale Collection scegliere? Contattaci per una consulenza gratuita.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Richiedi Consulenza
          </Link>
        </div>
      </div>
    </div>
  );
}
