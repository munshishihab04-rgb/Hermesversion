import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

interface FaqSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  items: FaqItem[];
}

const faqSections: FaqSection[] = [
  {
    id: 'ordini',
    title: 'Ordini e Pagamenti',
    icon: 'CreditCardIcon',
    color: 'text-blue-600',
    items: [
      {
        q: 'Come posso effettuare un ordine?',
        a: (
          <p>
            Acquistare su Licenvo è semplice: sfoglia il catalogo, seleziona il prodotto, aggiungilo al carrello e procedi al checkout.
            Inserisci i tuoi dati, scegli il metodo di pagamento e conferma. Riceverai la licenza digitale direttamente via email.
          </p>
        ),
      },
      {
        q: 'Quali metodi di pagamento sono accettati?',
        a: (
          <p>
            Accettiamo tutti i principali metodi di pagamento: <strong>Visa, Mastercard, PayPal, Klarna</strong> (pagamento a rate) e{' '}
            <strong>Apple Pay</strong>. Tutti i pagamenti sono processati in modo sicuro tramite gateway certificati PCI-DSS.
          </p>
        ),
      },
      {
        q: "È sicuro acquistare su Licenvo?",
        a: (
          <p>
            Assolutamente sì. Il nostro sito utilizza crittografia SSL/TLS per proteggere ogni transazione.
            Siamo una società italiana registrata (P.IVA IT04358941203) e tutti i nostri prodotti sono licenze originali
            distribuite tramite canali autorizzati. Non conserviamo mai i dati della tua carta di credito.
          </p>
        ),
      },
      {
        q: 'Posso richiedere una fattura per il mio acquisto?',
        a: (
          <p>
            Sì. Durante il checkout, inserisci la tua Partita IVA nel campo apposito e la fattura verrà generata automaticamente
            con i tuoi dati aziendali. Per ordini già effettuati senza fattura, contattaci entro 30 giorni a{' '}
            <a href="mailto:assistenza@licenvo.com" className="text-primary hover:underline">
              assistenza@licenvo.com
            </a>
            .
          </p>
        ),
      },
      {
        q: 'Posso annullare un ordine dopo averlo effettuato?',
        a: (
          <p>
            Gli ordini di licenze digitali vengono elaborati immediatamente. Se non hai ancora ricevuto o attivato la licenza,
            contattaci subito a <a href="mailto:assistenza@licenvo.com" className="text-primary hover:underline">assistenza@licenvo.com</a>{' '}
            o su WhatsApp (+39 351 479 4187) e valuteremo insieme la situazione. Una volta attivata, la licenza non è annullabile.
          </p>
        ),
      },
    ],
  },
  {
    id: 'consegna',
    title: 'Consegna e Attivazione',
    icon: 'EnvelopeIcon',
    color: 'text-indigo-600',
    items: [
      {
        q: 'Quanto tempo ci vuole per ricevere la licenza?',
        a: (
          <p>
            I tempi variano in base al prodotto:
            <br />• <strong>Prodotti Microsoft</strong> (Windows, Office): consegna <strong>immediata</strong> dopo il pagamento, solitamente entro pochi secondi.
            <br />• <strong>Prodotti Autodesk</strong>: da <strong>10 a 15 minuti</strong> per l'assegnazione dell'abbonamento al tuo account.
          </p>
        ),
      },
      {
        q: "Non ho ricevuto l'email con la licenza. Cosa faccio?",
        a: (
          <p>
            Prima di tutto, controlla la cartella <strong>Spam/Posta indesiderata</strong> del tuo client email — spesso le email con codici finiscono lì.
            Cerca anche nelle cartelle "Promozioni" o "Aggiornamenti" (Gmail). Se dopo 30 minuti non hai trovato nulla,
            contattaci a <a href="mailto:assistenza@licenvo.com" className="text-primary hover:underline">assistenza@licenvo.com</a>{' '}
            con il numero d'ordine e ti riavremo immediatamente la licenza.
          </p>
        ),
      },
      {
        q: 'Come si attiva Windows 10 o Windows 11?',
        a: (
          <p>
            Segui questi passi:
            <br />1. Vai su <strong>Impostazioni → Sistema → Attivazione</strong>
            <br />2. Clicca su <strong>"Cambia codice Product Key"</strong>
            <br />3. Inserisci il codice a 25 caratteri ricevuto via email (formato: XXXXX-XXXXX-XXXXX-XXXXX-XXXXX)
            <br />4. Clicca <strong>Avanti</strong> e segui le istruzioni. Windows si attiverà automaticamente online.
          </p>
        ),
      },
      {
        q: 'Come si attiva Microsoft Office?',
        a: (
          <p>
            Per Office 2021/2024:
            <br />1. Apri qualsiasi applicazione Office (Word, Excel, ecc.)
            <br />2. Clicca <strong>Attiva Office</strong> nella barra gialla in alto
            <br />3. Seleziona <strong>"Ho un codice Product Key"</strong>
            <br />4. Inserisci il codice a 25 caratteri e completa l'attivazione.
            <br /><br />Per <strong>Office 365/Microsoft 365</strong>: vai su{' '}
            <a href="https://setup.microsoft.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">setup.microsoft.com</a>,
            accedi con il tuo account Microsoft e riscatta il codice.
          </p>
        ),
      },
      {
        q: 'Come si attiva un abbonamento Autodesk?',
        a: (
          <p>
            1. Accedi (o crea) il tuo account su <a href="https://accounts.autodesk.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">accounts.autodesk.com</a> con <strong>la stessa email usata al checkout</strong>
            <br />2. L'abbonamento apparirà automaticamente nel tuo account entro 10-15 minuti dall'acquisto
            <br />3. Scarica il software dal portale Autodesk Access
            <br />4. Avvia il software — il login con il tuo account Autodesk lo attiverà in automatico.
          </p>
        ),
      },
    ],
  },
  {
    id: 'microsoft',
    title: 'Prodotti Microsoft',
    icon: 'ComputerDesktopIcon',
    color: 'text-sky-600',
    items: [
      {
        q: 'Su quanti PC posso installare la licenza Windows?',
        a: (
          <p>
            Le licenze Windows vendute su Licenvo sono licenze <strong>OEM per 1 PC</strong>. Sono legate al dispositivo su cui vengono
            attivate e non possono essere trasferite su un altro computer. Se stai cercando una licenza trasferibile,
            opta per la versione <strong>Retail</strong> disponibile in catalogo.
          </p>
        ),
      },
      {
        q: 'Qual è la differenza tra Windows Pro e Windows Home?',
        a: (
          <p>
            <strong>Windows Home</strong> è pensato per uso domestico e include le funzionalità essenziali.
            <br /><strong>Windows Pro</strong> aggiunge funzionalità avanzate come: BitLocker (crittografia disco), Hyper-V (virtualizzazione),
            Remote Desktop, criteri di gruppo (Active Directory) e funzionalità di sicurezza enterprise. Consigliato per professionisti e aziende.
          </p>
        ),
      },
      {
        q: 'Qual è la differenza tra Office 2021, Office 2024 e Microsoft 365?',
        a: (
          <p>
            <strong>Office 2021 / 2024</strong>: licenza <em>perpetua</em> — paghi una volta e usi per sempre quella versione, senza aggiornamenti di versione futuri.
            <br /><strong>Microsoft 365</strong>: abbonamento annuale con accesso sempre all'ultima versione, 1 TB di OneDrive, Teams e applicazioni mobile incluse.
            <br />Per uso professionale e aggiornamenti continui, scegliamo Microsoft 365. Per uso stabile senza costi ricorrenti, Office 2021/2024.
          </p>
        ),
      },
      {
        q: 'Qual è la differenza tra Windows 10 e Windows 11?',
        a: (
          <p>
            <strong>Windows 11</strong> è la versione più recente, con interfaccia rinnovata, migliori performance sui processori moderni e supporto ufficiale
            prolungato. Richiede però hardware compatibile (TPM 2.0, CPU di 8ª gen Intel o Zen+ AMD).
            <br /><strong>Windows 10</strong> è supportato fino a ottobre 2025 ed è compatibile con hardware più datato. Se il tuo PC non supporta Windows 11,
            Windows 10 è la scelta giusta.
          </p>
        ),
      },
    ],
  },
  {
    id: 'autodesk',
    title: 'Prodotti Autodesk',
    icon: 'CubeIcon',
    color: 'text-orange-600',
    items: [
      {
        q: "Come funziona l'assegnazione di un abbonamento Autodesk?",
        a: (
          <p>
            Al checkout, inserisci <strong>la stessa email che usi per il tuo account Autodesk</strong>. Dopo l'acquisto,
            l'abbonamento viene assegnato direttamente a quell'account entro 10-15 minuti.
            Non serve nessun codice di attivazione: basta accedere al portale Autodesk con quell'email e il software sarà disponibile.
          </p>
        ),
      },
      {
        q: 'Posso usare le licenze Autodesk per uso commerciale?',
        a: (
          <p>
            Sì. Tutti gli abbonamenti Autodesk venduti su Licenvo includono i diritti per <strong>uso commerciale e professionale</strong>.
            Puoi usarli per progetti professionali, commesse aziendali e attività lavorative senza restrizioni.
          </p>
        ),
      },
      {
        q: 'Qual è la differenza tra abbonamento mensile e triennale?',
        a: (
          <p>
            <strong>Abbonamento mensile</strong>: €14,99/mese — massima flessibilità, puoi disdire quando vuoi.
            <br /><strong>Abbonamento triennale</strong>: €87,99 per 3 anni — risparmio significativo rispetto al mensile,
            ideale per professionisti e studi che usano il software costantemente.
          </p>
        ),
      },
      {
        q: 'Cosa include la AEC Collection di Autodesk?',
        a: (
          <p>
            La <strong>Architecture, Engineering & Construction Collection</strong> include:
            <br />• <strong>Revit</strong> (BIM e progettazione architettonica)
            <br />• <strong>AutoCAD</strong> (con toolset Architecture, MEP, Civil Engineering)
            <br />• <strong>Civil 3D</strong> (infrastrutture e ingegneria civile)
            <br />• <strong>Navisworks Manage</strong> (coordinamento e revisione progetto)
            <br />• <strong>BIM Collaborate Pro</strong> (collaborazione cloud)
            <br />Ideale per architetti, ingegneri strutturali e imprese di costruzione.
          </p>
        ),
      },
      {
        q: "Cosa includono la PD&M Collection e la M&E Collection?",
        a: (
          <p>
            <strong>Product Design & Manufacturing (PD&M)</strong>:
            <br />• Fusion (progettazione meccanica e simulazione)
            <br />• Inventor (CAD meccanico professionale)
            <br />• AutoCAD Electrical
            <br />Ideale per ingegneri meccanici e progettisti industriali.
            <br /><br />
            <strong>Media & Entertainment (M&E)</strong>:
            <br />• Maya (animazione 3D, VFX)
            <br />• 3ds Max (rendering e visualizzazione)
            <br />• Arnold (motore di rendering avanzato)
            <br />Ideale per animatori, graphic designer e studi VFX.
          </p>
        ),
      },
    ],
  },
  {
    id: 'rimborsi',
    title: 'Rimborsi e Garanzie',
    icon: 'ShieldCheckIcon',
    color: 'text-emerald-600',
    items: [
      {
        q: 'Qual è la politica di rimborso?',
        a: (
          <p>
            Offriamo una <strong>garanzia di 30 giorni</strong> su tutti i prodotti. Se la licenza non funziona o riscontri problemi
            tecnici non risolvibili, puoi richiedere il rimborso completo entro 30 giorni dall'acquisto.
            Contattaci a <a href="mailto:assistenza@licenvo.com" className="text-primary hover:underline">assistenza@licenvo.com</a> con
            il numero d'ordine e descrizione del problema.
          </p>
        ),
      },
      {
        q: 'Cosa non è rimborsabile?',
        a: (
          <p>
            Non sono rimborsabili le licenze che risultano <strong>già attivate e funzionanti</strong> sul dispositivo del cliente,
            o acquisti per cui il cliente ha dichiarato di aver attivato il prodotto con successo.
            In caso di ripensamento dopo l'attivazione, non possiamo procedere con il rimborso in quanto il prodotto digitale è stato
            già consumato irreversibilmente.
          </p>
        ),
      },
      {
        q: 'La mia chiave di attivazione non funziona. Cosa devo fare?',
        a: (
          <p>
            Contattaci immediatamente a <a href="mailto:assistenza@licenvo.com" className="text-primary hover:underline">assistenza@licenvo.com</a>{' '}
            oppure su WhatsApp (+39 351 479 4187). Il nostro team verificherà la chiave e, se il problema è confermato,
            ti invieremo una chiave sostitutiva o procederemo al rimborso completo senza costi aggiuntivi.
            Questo servizio è coperto dalla nostra garanzia.
          </p>
        ),
      },
      {
        q: 'In quanto tempo ricevo il rimborso?',
        a: (
          <p>
            Una volta approvato il rimborso, i tempi di accredito variano in base al metodo di pagamento:
            <br />• <strong>Carta di credito/debito</strong>: 3–5 giorni lavorativi
            <br />• <strong>PayPal</strong>: 1–2 giorni lavorativi
            <br />• <strong>Klarna</strong>: 5–7 giorni lavorativi
            <br />Riceverai una conferma via email non appena il rimborso viene processato.
          </p>
        ),
      },
    ],
  },
  {
    id: 'fatturazione',
    title: 'Fatturazione e Note Legali',
    icon: 'DocumentTextIcon',
    color: 'text-purple-600',
    items: [
      {
        q: 'Come posso richiedere la fattura?',
        a: (
          <p>
            Per ricevere fattura con P.IVA, <strong>inserisci la tua Partita IVA nel campo apposito durante il checkout</strong>.
            Il sistema genererà automaticamente una fattura elettronica con i tuoi dati aziendali.
            Per ordini già completati senza fattura, scrivi a{' '}
            <a href="mailto:assistenza@licenvo.com" className="text-primary hover:underline">assistenza@licenvo.com</a>{' '}
            entro 30 giorni dalla data dell'ordine.
          </p>
        ),
      },
      {
        q: "Come funziona lo split payment per le Pubbliche Amministrazioni?",
        a: (
          <p>
            Per gli enti pubblici soggetti allo split payment (scissione dei pagamenti), emettiamo fatture con IVA esposta
            che viene versata direttamente all'Erario dalla PA acquirente, come previsto dalla normativa italiana.
            Contattaci prima dell'acquisto per gestire correttamente la fatturazione PA.
          </p>
        ),
      },
      {
        q: 'Quali sono i dati aziendali di Licenvo?',
        a: (
          <p>
            <strong>DIGITALSOFT DI MUNSHI SHIHAB</strong>
            <br />Via Aldo Pio Manuzio 24, 40132 Bologna (BO) — Italia
            <br />P.IVA: <strong>IT04358941203</strong> · REA: BO-588058
            <br />Email: <a href="mailto:assistenza@licenvo.com" className="text-primary hover:underline">assistenza@licenvo.com</a>
            <br />PEC: <a href="mailto:munshishihab@legalmail.it" className="text-primary hover:underline">munshishihab@legalmail.it</a>
          </p>
        ),
      },
      {
        q: 'Per quanto tempo vengono conservati i documenti fiscali?',
        a: (
          <p>
            In conformità alla normativa fiscale italiana (D.P.R. 633/72 e D.P.R. 600/73), le fatture e i documenti fiscali
            vengono conservati per <strong>10 anni</strong>. Puoi richiedere copia di qualsiasi documento fiscale relativo ai tuoi
            acquisti contattandoci a <a href="mailto:assistenza@licenvo.com" className="text-primary hover:underline">assistenza@licenvo.com</a>.
          </p>
        ),
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`border border-border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? 'shadow-sm' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors duration-150 group"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-foreground text-sm pr-4 group-hover:text-primary transition-colors">{item.q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-muted text-muted-foreground'}`}>
          <Icon name="ChevronDownIcon" size={14} />
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border bg-muted/20">
          {item.a}
        </div>
      )}
    </div>
  );
}

function FaqSection({ section, defaultOpen }: { section: FaqSection; defaultOpen?: boolean }) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [sectionOpen, setSectionOpen] = useState(defaultOpen ?? true);

  const toggleItem = (idx: number) => {
    const next = new Set(openItems);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    setOpenItems(next);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setSectionOpen(!sectionOpen)}
        className="w-full flex items-center gap-3 mb-4 group"
      >
        <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${section.color}`}>
          <Icon name={section.icon} size={20} />
        </div>
        <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex-1 text-left">
          {section.title}
        </h2>
        <span className="text-xs text-muted-foreground font-medium">{section.items.length} domande</span>
        <Icon name={sectionOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={18} className="text-muted-foreground" />
      </button>

      {sectionOpen && (
        <div className="space-y-2 pl-13">
          {section.items.map((item, idx) => (
            <AccordionItem
              key={idx}
              item={item}
              isOpen={openItems.has(idx)}
              onToggle={() => toggleItem(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return faqSections;
    const q = search.toLowerCase();
    return faqSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.q.toLowerCase().includes(q) ||
            (typeof item.a === 'string' && item.a.toLowerCase().includes(q))
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [search]);

  const totalResults = filtered.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 border-b border-border py-16">
        <div className="section-container text-center">
          <nav className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Icon name="ChevronRightIcon" size={12} />
            <span className="text-foreground">Domande Frequenti</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="QuestionMarkCircleIcon" size={14} />
            Centro Assistenza
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Domande Frequenti
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Trova rapidamente le risposte alle domande più comuni su ordini, licenze, attivazione e rimborsi.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Icon name="MagnifyingGlassIcon" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cerca una domanda..."
              className="w-full input-dark pl-11 pr-4 py-3.5 text-sm shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="XMarkIcon" size={16} />
              </button>
            )}
          </div>
          {search && (
            <p className="text-xs text-muted-foreground mt-2">
              {totalResults === 0 ? 'Nessun risultato trovato.' : `${totalResults} risultat${totalResults === 1 ? 'o' : 'i'} trovato${totalResults === 1 ? '' : 'i'}`}
            </p>
          )}
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="section-container py-12">
        <div className="max-w-3xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="MagnifyingGlassIcon" size={40} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Nessun risultato</h3>
              <p className="text-muted-foreground text-sm">Prova con termini diversi o{' '}
                <Link href="/contact" className="text-primary hover:underline">contattaci direttamente</Link>.
              </p>
            </div>
          ) : (
            filtered.map((section, idx) => (
              <FaqSection key={section.id} section={section} defaultOpen={idx === 0} />
            ))
          )}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="glass-card rounded-2xl p-8 text-center border border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="ChatBubbleLeftRightIcon" size={26} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Non hai trovato la risposta?</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              Il nostro team di supporto è disponibile dal lunedì al sabato, 8:00–20:00.
              Risposta garantita entro 2 ore nei giorni lavorativi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="btn-primary px-6 py-3 rounded-lg font-semibold text-sm inline-flex items-center justify-center gap-2"
              >
                <Icon name="EnvelopeIcon" size={16} />
                Contattaci
              </Link>
              <Link
                href="/assistenza"
                className="btn-secondary px-6 py-3 rounded-lg font-semibold text-sm inline-flex items-center justify-center gap-2 border border-border"
              >
                <Icon name="LifebuoyIcon" size={16} />
                Centro Assistenza
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
