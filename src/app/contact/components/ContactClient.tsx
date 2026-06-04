import React, { useState } from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';

export default function ContactClient() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    requestType: '',
    orderNumber: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const requestTypes = [
    { value: 'attivazione', label: 'Attivazione prodotto' },
    { value: 'ordine-non-ricevuto', label: 'Ordine non ricevuto' },
    { value: 'rimborso', label: 'Richiesta rimborso' },
    { value: 'fattura', label: 'Fattura / documentazione fiscale' },
    { value: 'pre-acquisto', label: 'Domanda pre-acquisto' },
    { value: 'tecnico', label: 'Problema tecnico' },
    { value: 'altro', label: 'Altro' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-indigo-50/50 border-b border-border py-16">
        <div className="section-container">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Icon name="ChevronRightIcon" size={12} />
            <span className="text-foreground">Contattaci</span>
          </nav>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="ChatBubbleLeftRightIcon" size={14} />
              Supporto Clienti
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Siamo qui per aiutarti
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              Hai un problema con un ordine, una licenza o vuoi informazioni prima di acquistare?
              Scrivici e ti risponderemo nel più breve tempo possibile.
            </p>
            <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 text-sm font-medium">
              <Icon name="BoltIcon" size={14} className="text-emerald-600" />
              Tempo di risposta stimato: <strong>&lt; 2 ore</strong> nei giorni lavorativi
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Direct Contact + Company Info */}
          <div className="lg:col-span-1 space-y-5">

            {/* WhatsApp — prominente */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white flex-shrink-0">
                  <Icon name="ChatBubbleOvalLeftIcon" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">Contatto Diretto</h3>
                  <p className="text-xs text-muted-foreground">Risposta immediata su WhatsApp</p>
                </div>
              </div>
              <a
                href="https://wa.me/393936841051?text=Ciao%2C%20ho%20bisogno%20di%20assistenza%20per%20un%20ordine%20su%20Licenvo."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold py-3.5 px-5 rounded-xl transition-all duration-200 shadow-sm shadow-emerald-200 text-sm"
              >
                <Icon name="ChatBubbleOvalLeftEllipsisIcon" size={18} />
                Scrivici su WhatsApp
              </a>
              <p className="text-center text-xs text-emerald-700 mt-2 font-medium">
                +39 351 479 4187 · Lun–Ven 9:00–18:00
              </p>
            </div>

            {/* Email */}
            <div className="glass-card rounded-2xl p-5 border border-blue-200 bg-blue-50/40">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Icon name="EnvelopeIcon" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">Email Assistenza</h3>
                  <p className="text-xs text-muted-foreground">Per richieste non urgenti</p>
                </div>
              </div>
              <a href="mailto:assistenza@licenvo.com" className="text-blue-600 font-semibold text-sm hover:underline">
                assistenza@licenvo.com
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                <Icon name="ClockIcon" size={11} className="inline mr-1" />
                Risposta &lt; 2 ore nei giorni lavorativi
              </p>
            </div>

            {/* PEC */}
            <div className="glass-card rounded-2xl p-5 border border-purple-200 bg-purple-50/40">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <Icon name="DocumentTextIcon" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">PEC</h3>
                  <p className="text-xs text-muted-foreground">Comunicazioni ufficiali</p>
                </div>
              </div>
              <a href="mailto:munshishihab@legalmail.it" className="text-purple-600 font-semibold text-sm hover:underline">
                munshishihab@legalmail.it
              </a>
            </div>

            {/* Orari */}
            <div className="glass-card rounded-2xl p-5 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                  <Icon name="CalendarDaysIcon" size={20} />
                </div>
                <h3 className="font-bold text-foreground text-sm">Orari Supporto</h3>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Lunedì – Venerdì</span>
                  <span className="font-semibold text-foreground">8:00 – 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabato</span>
                  <span className="font-semibold text-foreground">8:00 – 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domenica</span>
                  <span className="text-muted-foreground">Chiuso</span>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="glass-card rounded-2xl p-5 border border-border text-xs text-muted-foreground space-y-1.5">
              <p className="font-bold text-foreground text-sm">DIGITALSOFT DI MUNSHI SHIHAB</p>
              <p>Via Aldo Pio Manuzio 24, 40132 Bologna (BO)</p>
              <p>P.IVA: IT04358941203 · REA: BO-588058</p>
              <p>PEC: munshishihab@legalmail.it</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-8 border border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon name="PaperAirplaneIcon" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Invia una Richiesta</h2>
                  <p className="text-xs text-muted-foreground">Compila il modulo — risponderemo entro 2 ore</p>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                    <Icon name="CheckCircleIcon" size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Richiesta inviata!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    Ti risponderemo entro 2 ore lavorative all&apos;indirizzo email fornito.
                    Controlla anche la cartella Spam.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: '', email: '', requestType: '', orderNumber: '', message: '' });
                      }}
                      className="btn-secondary text-sm px-5 py-2.5 rounded-lg border border-border"
                    >
                      Invia un&apos;altra richiesta
                    </button>
                    <Link href="/" className="btn-primary text-sm px-5 py-2.5 rounded-lg inline-flex items-center justify-center gap-2">
                      <Icon name="HomeIcon" size={14} />
                      Torna alla Home
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">
                        Nome e Cognome *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full input-dark text-sm"
                        placeholder="Mario Rossi"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full input-dark text-sm"
                        placeholder="mario@email.it"
                      />
                    </div>
                  </div>

                  {/* Request Type */}
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">
                      Tipo di richiesta *
                    </label>
                    <select
                      required
                      value={form.requestType}
                      onChange={(e) => setForm({ ...form, requestType: e.target.value })}
                      className="w-full input-dark text-sm cursor-pointer"
                    >
                      <option value="" className="bg-white">Seleziona il tipo di richiesta</option>
                      {requestTypes.map((rt) => (
                        <option key={rt.value} value={rt.value} className="bg-white">
                          {rt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Order Number */}
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">
                      Numero Ordine{' '}
                      <span className="text-muted-foreground font-normal normal-case">(opzionale — aiuta a velocizzare l'assistenza)</span>
                    </label>
                    <input
                      type="text"
                      value={form.orderNumber}
                      onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                      className="w-full input-dark text-sm"
                      placeholder="LCV-2025-XXXXX"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">
                      Messaggio *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full input-dark text-sm resize-none"
                      placeholder="Descrivi il problema o la domanda nel dettaglio: più informazioni fornisci, più velocemente possiamo aiutarti."
                    />
                  </div>

                  {/* Response estimate banner */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <Icon name="ClockIcon" size={18} className="text-emerald-600 flex-shrink-0" />
                    <p className="text-xs text-emerald-800 font-medium">
                      Tempo di risposta stimato: <strong>&lt; 2 ore</strong> nei giorni lavorativi (Lun–Sab 8:00–20:00).
                      Per urgenze, usa <a href="https://wa.me/393936841051" target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a>.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-3.5 font-bold flex items-center justify-center gap-2 rounded-lg"
                  >
                    <Icon name="PaperAirplaneIcon" size={16} />
                    Invia Richiesta
                  </button>
                  <p className="text-center text-[11px] text-muted-foreground">
                    Inviando accetti la nostra{' '}
                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                    Non condividiamo i tuoi dati con terze parti.
                  </p>
                </form>
              )}
            </div>

            {/* FAQ Link */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Icon name="QuestionMarkCircleIcon" size={16} />
              Hai una domanda comune?{' '}
              <Link href="/faq" className="text-primary font-semibold hover:underline">
                Consulta le FAQ →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
