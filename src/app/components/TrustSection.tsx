import React, { useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const trustItems = [
  {
    icon: 'BoltIcon',
    title: 'Consegna in 30 Secondi',
    desc: 'La chiave di attivazione arriva via email in meno di 30 secondi. Disponibile 24/7, anche nei weekend e festivi.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    glow: 'shadow-amber-500/10',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Licenze 100% Originali',
    desc: 'Licenze genuine acquistate da distributori autorizzati. Attivazione diretta sui server Microsoft, Autodesk e Kaspersky.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    glow: 'shadow-emerald-500/10',
  },
  {
    icon: 'ArrowPathIcon',
    title: 'Garanzia Soddisfatti o Rimborsati',
    desc: 'Chiave non funzionante? Sostituzione immediata o rimborso completo entro 30 giorni. Nessuna domanda.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/25',
    glow: 'shadow-blue-500/10',
  },
  {
    icon: 'LockClosedIcon',
    title: 'Checkout Protetto Shopify',
    desc: 'Pagamento SSL con Visa, Mastercard, Apple Pay. Checkout gestito da Shopify — lo stesso di milioni di e-commerce.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/25',
    glow: 'shadow-teal-500/10',
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
