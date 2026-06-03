import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    number: '01',
    icon: 'MagnifyingGlassIcon',
    title: 'Scegli il prodotto',
    desc: 'Naviga il catalogo e trova la licenza che fa per te — Windows, Office, antivirus, gaming e molto altro.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    number: '02',
    icon: 'ShoppingCartIcon',
    title: 'Aggiungilo al carrello',
    desc: 'Clicca su "Aggiungi al carrello" oppure usa "Acquista ora" per andare direttamente al checkout.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    number: '03',
    icon: 'LockClosedIcon',
    title: 'Paga in sicurezza',
    desc: 'Completa il pagamento tramite il checkout sicuro Shopify. Accettiamo carte, PayPal e Klarna.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    number: '04',
    icon: 'EnvelopeIcon',
    title: 'Ricevi via email',
    desc: 'Entro pochi secondi ricevi la chiave di attivazione nella tua casella email. Pronto da usare subito.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

export default function HowToBuySection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-5 bg-secondary/10 border-y border-border">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Icon name="BoltIcon" size={12} />
            Semplice e Veloce
          </div>
          <h2 className="section-title mb-3">Come si Acquista</h2>
          <p className="section-subtitle text-sm max-w-xl mx-auto">
            Dal catalogo alla tua email in meno di un minuto. Nessuna registrazione obbligatoria.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`relative rounded-2xl border ${step.border} ${step.bg} p-6 space-y-4 transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: visible ? `${idx * 100}ms` : '0ms' }}
            >
              {/* Connector line (desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-2.5 w-5 h-px bg-border z-10" />
              )}

              {/* Number badge */}
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center ${step.color}`}>
                  <Icon name={step.icon as Parameters<typeof Icon>[0]['name']} size={20} />
                </div>
                <span className={`font-black text-3xl ${step.color} opacity-20 leading-none`}>{step.number}</span>
              </div>

              <div>
                <h3 className="font-bold text-foreground text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6 sm:p-8 glass-card rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent text-center">
          <div className="space-y-1">
            <p className="font-bold text-foreground">Pronto ad acquistare?</p>
            <p className="text-sm text-muted-foreground">Sfoglia il catalogo e trova subito la licenza che ti serve.</p>
          </div>
          <Link
            href="/product-catalog"
            className="btn-primary flex items-center gap-2 text-sm font-bold px-8 py-3 neon-glow-purple shrink-0"
          >
            <Icon name="BoltIcon" size={15} variant="solid" />
            Vai al Catalogo
          </Link>
        </div>
      </div>
    </section>
  );
}
