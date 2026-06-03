import React, { useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const trustItems = [
  {
    icon: 'BoltIcon',
    title: 'Consegna Istantanea',
    desc: 'Ricevi la chiave di licenza via email entro pochi secondi dall\'acquisto, 24 ore su 24, 7 giorni su 7.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    glow: 'shadow-amber-500/10',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Licenze Originali',
    desc: 'Tutte le licenze sono originali e garantite al 100%. Attivazione diretta dai server ufficiali del produttore.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    glow: 'shadow-emerald-500/10',
  },
  {
    icon: 'ArrowPathIcon',
    title: 'Rimborso 30 Giorni',
    desc: 'Se la chiave non funziona, la sostituiamo o rimborsiamo completamente entro 30 giorni dall\'acquisto.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/25',
    glow: 'shadow-blue-500/10',
  },
  {
    icon: 'LockClosedIcon',
    title: 'Pagamento Sicuro',
    desc: 'Checkout protetto da Shopify con crittografia SSL. Accettiamo Visa, Mastercard, PayPal e Klarna.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/25',
    glow: 'shadow-purple-500/10',
  },
];

export default function TrustSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' });
      setActiveIdx(idx);
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = (el.children[0] as HTMLElement)?.offsetWidth + 12;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveIdx(Math.min(Math.max(idx, 0), trustItems.length - 1));
  };

  return (
    <section className="py-14 border-y border-border bg-secondary/10">
      <div className="section-container">
        <div className="text-center mb-8">
          <h2 className="section-title mb-2">Perché Scegliere Licenvo</h2>
          <p className="section-subtitle text-sm">Il modo più semplice e sicuro per acquistare software originali</p>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border ${item.border} ${item.bg} p-6 space-y-4 hover:scale-[1.02] transition-transform duration-200 shadow-lg ${item.glow}`}
            >
              <div className={`w-11 h-11 rounded-xl bg-background/60 flex items-center justify-center ${item.color} border ${item.border}`}>
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={22} />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: swipeable carousel */}
        <div className="sm:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1 pb-2"
          >
            {trustItems.map((item) => (
              <div
                key={item.title}
                className={`snap-start shrink-0 w-[80vw] max-w-[300px] rounded-2xl border ${item.border} ${item.bg} p-5 space-y-4`}
              >
                <div className={`w-11 h-11 rounded-xl bg-background/60 flex items-center justify-center ${item.color} border ${item.border}`}>
                  <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1.5">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {trustItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`rounded-full transition-all duration-200 ${
                  activeIdx === idx
                    ? 'w-5 h-2 bg-primary'
                    : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
