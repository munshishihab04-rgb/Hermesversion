import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';

const floatingCards = [
  {
    icon: 'WindowIcon',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    name: 'Windows 11 Pro',
    sub: 'Licenza Originale Retail',
    price: '€19,90',
    glow: true,
    style: { top: '0%', right: '8px' },
    parallax: { x: -8, y: -6 },
  },
  {
    icon: 'WrenchScrewdriverIcon',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    name: 'AutoCAD',
    sub: 'Abbonamento 1 Anno',
    price: '€14,99/mese',
    style: { top: '38%', left: '0px' },
    parallax: { x: 6, y: 8 },
  },
  {
    icon: 'CubeIcon',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    name: 'Autodesk AEC Collection',
    sub: 'Abbonamento Mensile',
    price: '€87,99',
    style: { bottom: '8%', right: '16px' },
    parallax: { x: -5, y: 10 },
  },
];

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg" />
      <div
        className="absolute w-[600px] h-[600px] blob-teal opacity-60 pointer-events-none"
        style={{
          top: '10%', left: '5%',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)`,
          transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] blob-cyan opacity-40 pointer-events-none"
        style={{
          top: '40%', right: '10%',
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -10}px)`,
          transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="section-container relative z-10 pt-2 pb-6 sm:pt-4 sm:pb-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-6 space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-600 font-semibold text-xs">Consegna Istantanea 24/7</span>
              <span className="text-muted-foreground text-xs">· Licenze Originali Garantite</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-hero-xl font-extrabold text-foreground leading-[1.0]">
                Licenze
                <span className="block gradient-text-teal">Software</span>
                <span className="block text-foreground/60 font-light">al Miglior Prezzo</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Windows, Office, Autodesk, antivirus e licenze originali. Risparmia fino al{' '}
                <span className="text-primary font-bold">92%</span> con consegna istantanea via email.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/product-catalog" className="btn-primary flex items-center gap-2 text-sm font-bold px-8 py-3.5 neon-glow-teal">
                <Icon name="BoltIcon" size={16} variant="solid" />
                Sfoglia Catalogo
              </Link>
              <Link href="/product-catalog?filter=bestseller" className="btn-secondary flex items-center gap-2 text-sm font-bold px-8 py-3.5">
                <Icon name="FireIcon" size={16} />
                Offerte del Giorno
              </Link>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { icon: 'BoltIcon', text: 'Consegna immediata via email' },
                { icon: 'ShieldCheckIcon', text: 'Licenze originali al 100%' },
                { icon: 'ArrowPathIcon', text: 'Rimborso garantito 30gg' },
              ].map((pill) => (
                <div key={pill.text} className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 border border-border rounded-full px-3 py-1.5">
                  <Icon name={pill.icon as Parameters<typeof Icon>[0]['name']} size={11} className="text-primary shrink-0" />
                  {pill.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Floating cards (desktop only) */}
          <div className="lg:col-span-6 relative h-[480px] hidden lg:block">
            {floatingCards.map((card, i) => (
              <div
                key={card.name}
                className={`absolute ${card.glow ? 'glass-card neon-glow-teal' : 'glass-card-light border border-border'} rounded-2xl p-${card.glow ? '5' : '4'} ${card.glow ? 'w-72' : 'w-64'}`}
                style={{
                  ...card.style,
                  transform: `translate(${mousePos.x * card.parallax.x}px, ${mousePos.y * card.parallax.y}px)`,
                  transition: `transform ${0.6 + i * 0.15}s cubic-bezier(0.16,1,0.3,1)`,
                }}
              >
                {card.glow ? (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <span className="instant-badge text-[10px] px-2 py-0.5 rounded-full font-medium">⚡ Istantaneo</span>
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{card.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{card.sub}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="price-mono text-2xl font-extrabold text-primary">{card.price}</span>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                        <Icon name={card.icon as Parameters<typeof Icon>[0]['name']} size={20} className={card.iconColor} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{card.name}</p>
                        <p className="text-[10px] text-muted-foreground">{card.sub}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="price-mono font-bold text-primary">{card.price}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Decorative rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-primary/10 animate-rotate-slow pointer-events-none" style={{ borderStyle: 'dashed' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-accent/10 pointer-events-none" style={{ animation: 'rotate-slow 15s linear infinite reverse' }} />
          </div>
        </div>
      </div>

      {/* Brand bar */}
      <div className="relative z-10 border-t border-border bg-secondary/20 backdrop-blur-sm">
        <div className="section-container py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">Brand</span>
            {['Windows', 'Office', 'Autodesk', 'Kaspersky', 'AutoCAD', 'Revit', 'Fusion', 'Inventor', 'Civil 3D', 'Maya', '3ds Max'].map((brand) => (
              <span key={brand} className="text-sm font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-default whitespace-nowrap">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
