import React from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';

const helpTopics = [
  {
    icon: 'BoltIcon',
    title: 'Attivazione Prodotti',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    articles: [
      'Come attivare Windows 11 Pro',
      'Attivare Microsoft Office 2021',
      'Riscattare una Steam Gift Card',
      'Attivare Xbox Game Pass',
    ],
  },
  {
    icon: 'ShoppingCartIcon',
    title: 'Ordini e Pagamenti',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    articles: [
      'Come effettuare un ordine',
      'Metodi di pagamento accettati',
      'Pagamento a rate con Klarna',
      'Richiedere fattura con P.IVA',
    ],
  },
  {
    icon: 'EnvelopeIcon',
    title: 'Consegna e Ricezione',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    articles: [
      'Non ho ricevuto la chiave',
      'Dove trovare le chiavi acquistate',
      'Tempi di consegna stimati',
      'Cosa fare se l\'email non arriva',
    ],
  },
  {
    icon: 'ArrowPathIcon',
    title: 'Rimborsi e Resi',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    articles: [
      'Politica di rimborso Licenvo',
      'Come richiedere un rimborso',
      'Chiave non funzionante: cosa fare',
      'Tempi di elaborazione rimborso',
    ],
  },
  {
    icon: 'UserCircleIcon',
    title: 'Account e Sicurezza',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    articles: [
      'Creare un account Licenvo',
      'Reimpostare la password',
      'Attivare l\'autenticazione a due fattori',
      'Gestire le preferenze di privacy',
    ],
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Sicurezza Licenze',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    articles: [
      'Come verificare l\'autenticità di una licenza',
      'Differenza tra licenze Retail e OEM',
      'Licenze per uso aziendale',
      'Trasferire una licenza su altro PC',
    ],
  },
];

export default function HelpCenterClient() {
  return (
    <div className="section-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <Icon name="ChevronRightIcon" size={12} />
        <span className="text-foreground">Centro Assistenza</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <Icon name="BookOpenIcon" size={14} />
          Centro Assistenza
        </div>
        <h1 className="text-display font-extrabold text-foreground mb-4">Come possiamo aiutarti?</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Trova guide, tutorial e risposte per gestire i tuoi acquisti e attivare i prodotti.
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {helpTopics.map((topic) => (
          <div
            key={topic.title}
            className={`rounded-2xl border ${topic.border} ${topic.bg} p-6 space-y-4 hover:scale-[1.01] transition-transform`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center ${topic.color}`}>
                <Icon name={topic.icon as Parameters<typeof Icon>[0]['name']} size={20} />
              </div>
              <h2 className="font-bold text-foreground text-sm">{topic.title}</h2>
            </div>
            <ul className="space-y-2">
              {topic.articles.map((article) => (
                <li key={article}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors group">
                    <Icon name="DocumentTextIcon" size={13} className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                    {article}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Still need help */}
      <div className="glass-card rounded-2xl p-8 border border-primary/20 text-center">
        <h3 className="text-xl font-bold text-foreground mb-3">Non hai trovato quello che cerchi?</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
          Il nostro team di supporto è disponibile 24/7 per rispondere a qualsiasi domanda.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/contact" className="btn-primary flex items-center gap-2 text-sm">
            <Icon name="ChatBubbleLeftRightIcon" size={15} />
            Parla con il Supporto
          </Link>
          <Link href="/faq" className="btn-secondary flex items-center gap-2 text-sm">
            <Icon name="QuestionMarkCircleIcon" size={15} />
            Vedi le FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}