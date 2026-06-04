import React, { useState } from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';

const faqSections = [
  {
    category: 'Acquisti e Pagamenti',
    icon: 'CreditCardIcon',
    color: 'text-blue-400',
    items: [
      {
        q: 'Come posso acquistare su Licenvo?',
        a: 'Aggiungi il prodotto al carrello, procedi al checkout e scegli il metodo di pagamento preferito. Accettiamo carte di credito/debito, PayPal, Klarna e bonifico bancario.',
      },
      {
        q: 'I miei dati di pagamento sono al sicuro?',
        a: 'Sì, tutte le transazioni sono protette con crittografia SSL a 256 bit. Non conserviamo i dati della tua carta. I pagamenti vengono processati da provider certificati PCI-DSS.',
      },
      {
        q: 'Posso pagare a rate?',
        a: 'Sì, offriamo la possibilità di pagare a rate tramite Klarna per acquisti superiori a €30. Puoi scegliere tra 3 o 6 rate senza interessi.',
      },
      {
        q: 'Ricevo una fattura per il mio acquisto?',
        a: 'Sì, riceverai automaticamente una ricevuta via email dopo ogni acquisto. Se hai bisogno di fattura con P.IVA, contattaci prima dell\'acquisto.',
      },
    ],
  },
  {
    category: 'Consegna e Attivazione',
    icon: 'BoltIcon',
    color: 'text-amber-400',
    items: [
      {
        q: 'Quanto tempo ci vuole per ricevere la mia chiave?',
        a: 'La consegna è istantanea. Dopo il pagamento confermato, riceverai la chiave di attivazione via email entro 30-60 secondi. In rari casi può richiedere fino a 5 minuti.',
      },
      {
        q: 'Non ho ricevuto la mia chiave, cosa faccio?',
        a: 'Prima controlla la cartella spam/junk. Se non trovi l\'email, accedi al tuo account Licenvo nella sezione "I miei ordini" per visualizzare le chiavi acquistate. Per ulteriore assistenza contatta il supporto.',
      },
      {
        q: 'Come si attiva una chiave di licenza?',
        a: 'Le istruzioni di attivazione sono incluse nell\'email di consegna. In genere: per Windows vai su Impostazioni > Aggiornamento e sicurezza > Attivazione. Per software, avvia il programma e inserisci la chiave nel campo "Attivazione prodotto".',
      },
      {
        q: 'Posso usare la chiave su più computer?',
        a: 'Dipende dal tipo di licenza acquistata. Le licenze standard sono per 1 dispositivo. Le licenze Family o Multi-device sono indicate esplicitamente nella descrizione del prodotto.',
      },
    ],
  },
  {
    category: 'Rimborsi e Garanzie',
    icon: 'ShieldCheckIcon',
    color: 'text-emerald-400',
    items: [
      {
        q: 'Qual è la vostra politica di rimborso?',
        a: 'Offriamo garanzia rimborso entro 30 giorni se la chiave non funziona o è già stata usata. Non rimborsiamo chiavi già attivate con successo. Vedi la nostra Politica Rimborsi per i dettagli.',
      },
      {
        q: 'La chiave che ho ricevuto non funziona, cosa faccio?',
        a: 'Contatta immediatamente il nostro supporto via email a assistenza@licenvo.com o tramite chat. Ti forniremo una chiave sostitutiva o un rimborso completo entro 24 ore.',
      },
      {
        q: 'Le licenze sono originali?',
        a: 'Assolutamente sì. Tutte le licenze vendute su Licenvo sono originali e legittime. Le chiavi vengono acquistate da distributori autorizzati e attivano i prodotti direttamente sui server ufficiali del produttore.',
      },
    ],
  },
  {
    category: 'Account e Preferenze',
    icon: 'UserCircleIcon',
    color: 'text-teal-400',
    items: [
      {
        q: 'Devo creare un account per acquistare?',
        a: 'Puoi acquistare anche come ospite, ma consigliamo di creare un account gratuito per accedere allo storico ordini, alle chiavi acquistate e alle offerte esclusive.',
      },
      {
        q: 'Come posso vedere i miei acquisti precedenti?',
        a: 'Accedi al tuo account e vai su "I miei ordini". Troverai tutte le chiavi acquistate con le relative istruzioni di attivazione.',
      },
      {
        q: 'Posso cancellare il mio account?',
        a: 'Sì, puoi richiedere la cancellazione dell\'account contattandoci a assistenza@licenvo.com. Conserveremo i dati fiscali per gli obblighi di legge (10 anni) ma cancelleremo tutti gli altri dati entro 30 giorni.',
      },
    ],
  },
];

export default function FaqPageClient() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="section-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <Icon name="ChevronRightIcon" size={12} />
        <span className="text-foreground">FAQ</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <Icon name="QuestionMarkCircleIcon" size={14} />
          Domande Frequenti
        </div>
        <h1 className="text-display font-extrabold text-foreground mb-4">Come possiamo aiutarti?</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Trova risposte alle domande più comuni su acquisti, consegna, attivazione e rimborsi.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-10 max-w-4xl mx-auto">
        {faqSections.map((section) => (
          <div key={section.category}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                <Icon name={section.icon as Parameters<typeof Icon>[0]['name']} size={18} className={section.color} />
              </div>
              <h2 className="text-lg font-bold text-foreground">{section.category}</h2>
            </div>
            <div className="space-y-2">
              {section.items.map((item, idx) => {
                const key = `${section.category}-${idx}`;
                const isOpen = openItems[key];
                return (
                  <div key={key} className="border border-border rounded-xl overflow-hidden glass-card-light">
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/20 transition-colors"
                    >
                      <span className="font-semibold text-sm text-foreground pr-4">{item.q}</span>
                      <Icon
                        name="ChevronDownIcon"
                        size={16}
                        className={`text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? '300px' : '0px' }}
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center glass-card rounded-2xl p-10 border border-primary/20">
        <h3 className="text-xl font-bold text-foreground mb-3">Non hai trovato la risposta?</h3>
        <p className="text-muted-foreground text-sm mb-6">Il nostro team di supporto è disponibile 24/7 per aiutarti.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/contact" className="btn-primary flex items-center gap-2 text-sm">
            <Icon name="EnvelopeIcon" size={15} />
            Contattaci
          </Link>
          <Link href="/help-center" className="btn-secondary flex items-center gap-2 text-sm">
            <Icon name="BookOpenIcon" size={15} />
            Centro Assistenza
          </Link>
        </div>
      </div>
    </div>
  );
}