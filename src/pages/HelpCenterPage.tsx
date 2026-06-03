import React, { useState } from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';

const supportCategories = [
  {
    icon: 'ComputerDesktopIcon',
    title: 'Attivazione Software',
    desc: 'Guida passo per passo per attivare Windows, Office e prodotti Autodesk.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    link: '/faq#consegna',
    tag: 'Più richiesto',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    icon: 'ArrowPathIcon',
    title: 'Rimborsi & Resi',
    desc: 'Politica di rimborso, prodotti non rimborsabili e procedura di reso.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    link: '/faq#rimborsi',
    tag: null,
    tagColor: '',
  },
  {
    icon: 'DocumentTextIcon',
    title: 'Fatturazione',
    desc: 'Richiesta fattura, P.IVA, split payment e documentazione fiscale.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    link: '/faq#fatturazione',
    tag: null,
    tagColor: '',
  },
  {
    icon: 'ClipboardDocumentListIcon',
    title: 'Stato Ordine',
    desc: "Verifica lo stato del tuo ordine, email mancante o problema di consegna.",
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    link: '/faq#consegna',
    tag: null,
    tagColor: '',
  },
];

interface GuideStep {
  step: number;
  text: string;
}

interface Guide {
  title: string;
  icon: string;
  color: string;
  product: string;
  steps: GuideStep[];
}

const guides: Guide[] = [
  {
    title: 'Come attivare Windows 11 Pro',
    icon: 'WindowIcon',
    color: 'text-sky-600',
    product: 'Windows',
    steps: [
      { step: 1, text: 'Apri Impostazioni → Sistema → Attivazione' },
      { step: 2, text: 'Clicca su "Cambia codice Product Key"' },
      { step: 3, text: 'Inserisci il codice a 25 caratteri ricevuto via email' },
      { step: 4, text: 'Clicca Avanti e attendi la conferma di attivazione online' },
    ],
  },
  {
    title: 'Come attivare un prodotto Office',
    icon: 'DocumentIcon',
    color: 'text-orange-600',
    product: 'Office',
    steps: [
      { step: 1, text: 'Apri Word, Excel o qualsiasi app Office' },
      { step: 2, text: 'Nella barra gialla in alto, clicca "Attiva Office"' },
      { step: 3, text: 'Seleziona "Ho un codice Product Key" e inseriscilo' },
      { step: 4, text: 'Segui la procedura guidata — Office si attiverà online' },
    ],
  },
  {
    title: 'Come attivare un abbonamento Autodesk',
    icon: 'CubeIcon',
    color: 'text-red-600',
    product: 'Autodesk',
    steps: [
      { step: 1, text: 'Usa la stessa email inserita al checkout su Licenvo' },
      { step: 2, text: "Vai su accounts.autodesk.com e accedi (o crea l'account)" },
      { step: 3, text: "L'abbonamento apparirà immediatamente nel tuo account" },
      { step: 4, text: 'Scarica il software dal portale Autodesk Access' },
      { step: 5, text: 'Avvia il software e accedi con il tuo account Autodesk' },
    ],
  },
];

export default function HelpCenterPage() {
  const [expandedGuide, setExpandedGuide] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-indigo-50/50 border-b border-border py-16">
        <div className="section-container">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Icon name="ChevronRightIcon" size={12} />
            <span className="text-foreground">Centro Assistenza</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="LifebuoyIcon" size={14} />
              Supporto Licenvo
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Centro Assistenza
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Benvenuto nel Centro Assistenza Licenvo. Trova guide rapide, risposte alle domande frequenti
              e contatti diretti con il nostro team.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Supporto online · Lun–Sab 8:00–20:00
              </div>
              <div className="flex items-center gap-2 text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/20">
                <Icon name="BoltIcon" size={14} />
                Risposta &lt; 2 ore
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Categories */}
      <div className="section-container py-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Come possiamo aiutarti?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {supportCategories.map((cat) => (
            <Link key={cat.title} href={cat.link}>
              <div className={`glass-card rounded-2xl p-6 border ${cat.border} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative h-full`}>
                {cat.tag && (
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.tagColor}`}>
                    {cat.tag}
                  </span>
                )}
                <div className={`w-11 h-11 rounded-xl ${cat.bg} flex items-center justify-center ${cat.color} mb-4`}>
                  <Icon name={cat.icon} size={22} />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">{cat.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                <div className={`mt-3 flex items-center gap-1 text-xs font-semibold ${cat.color}`}>
                  Vai alla sezione <Icon name="ArrowRightIcon" size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Guides */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Icon name="BookOpenIcon" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Guide Rapide</h2>
              <p className="text-muted-foreground text-sm">Attiva il tuo software in pochi minuti</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {guides.map((guide, idx) => (
              <div key={idx} className="glass-card rounded-2xl border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedGuide(expandedGuide === idx ? null : idx)}
                  className="w-full flex items-center gap-3 p-5 hover:bg-muted/30 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${guide.color} flex-shrink-0`}>
                    <Icon name={guide.icon} size={20} />
                  </div>
                  <div className="text-left flex-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${guide.color} block mb-0.5`}>{guide.product}</span>
                    <h3 className="font-bold text-foreground text-sm">{guide.title}</h3>
                  </div>
                  <Icon
                    name={expandedGuide === idx ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                    size={16}
                    className="text-muted-foreground flex-shrink-0"
                  />
                </button>

                {expandedGuide === idx && (
                  <div className="px-5 pb-5 border-t border-border">
                    <ol className="space-y-3 mt-4">
                      {guide.steps.map((step) => (
                        <li key={step.step} className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5 ${
                            guide.color.includes('sky') ? 'bg-sky-500' :
                            guide.color.includes('orange') ? 'bg-orange-500' : 'bg-red-500'
                          }`}>
                            {step.step}
                          </span>
                          <span className="text-sm text-muted-foreground leading-relaxed">{step.text}</span>
                        </li>
                      ))}
                    </ol>
                    <Link href="/faq" className="mt-4 inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                      Maggiori dettagli nelle FAQ <Icon name="ArrowTopRightOnSquareIcon" size={12} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Direct Contacts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Contatti Rapidi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Email */}
            <div className="glass-card rounded-2xl p-6 border border-blue-200 bg-blue-50/50">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <Icon name="EnvelopeIcon" size={22} />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">Email Supporto</h3>
              <a href="mailto:assistenza@licenvo.com" className="text-blue-600 font-semibold text-sm hover:underline">
                assistenza@licenvo.com
              </a>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon name="ClockIcon" size={13} />
                Risposta &lt; 2 ore nei giorni lavorativi
              </div>
            </div>

            {/* WhatsApp */}
            <div className="glass-card rounded-2xl p-6 border border-emerald-200 bg-emerald-50/50">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                <Icon name="ChatBubbleOvalLeftIcon" size={22} />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">WhatsApp</h3>
              <a
                href="https://wa.me/393514794187"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 font-semibold text-sm hover:underline"
              >
                +39 351 479 4187
              </a>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon name="ClockIcon" size={13} />
                Lun–Ven 9:00–18:00
              </div>
            </div>

            {/* Orari */}
            <div className="glass-card rounded-2xl p-6 border border-purple-200 bg-purple-50/50">
              <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <Icon name="CalendarDaysIcon" size={22} />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">Orari Supporto</h3>
              <p className="text-purple-600 font-semibold text-sm">Lun–Sab 8:00–20:00</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon name="CheckCircleIcon" size={13} className="text-emerald-500" />
                Anche il sabato mattina
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card rounded-2xl p-8 border border-primary/20 bg-gradient-to-br from-primary/5 to-background text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Hai ancora bisogno di aiuto?</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Compila il modulo di contatto e il nostro team ti risponderà entro 2 ore nei giorni lavorativi.
          </p>
          <Link
            href="/contact"
            className="btn-primary px-8 py-3 rounded-lg font-semibold text-sm inline-flex items-center gap-2"
          >
            <Icon name="PaperAirplaneIcon" size={16} />
            Invia una richiesta
          </Link>
        </div>
      </div>
    </div>
  );
}
