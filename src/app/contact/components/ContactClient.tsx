import React, { useState } from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', orderNumber: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: 'EnvelopeIcon',
      title: 'Email Supporto',
      value: 'supporto@locenvo.com',
      desc: 'Risposta entro 2 ore lavorative',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      icon: 'ChatBubbleLeftRightIcon',
      title: 'WhatsApp',
      value: '+39 351 479 4187',
      desc: 'Lun–Ven 08:00–17:00',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      icon: 'DocumentTextIcon',
      title: 'PEC',
      value: 'munshishihab@legalmail.it',
      desc: 'Per comunicazioni ufficiali',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
  ];

  return (
    <div className="section-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <Icon name="ChevronRightIcon" size={12} />
        <span className="text-foreground">Contattaci</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-display font-extrabold text-foreground mb-4">Siamo qui per aiutarti</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Il nostro team di supporto è disponibile 24 ore su 24, 7 giorni su 7. Contattaci tramite il metodo che preferisci.
        </p>
      </div>

      {/* Contact methods */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {contactMethods.map((m) => (
          <div key={m.title} className={`rounded-2xl border ${m.border} ${m.bg} p-6 text-center space-y-2`}>
            <div className={`w-12 h-12 rounded-2xl bg-background/50 flex items-center justify-center mx-auto ${m.color}`}>
              <Icon name={m.icon as Parameters<typeof Icon>[0]['name']} size={22} />
            </div>
            <h3 className="font-bold text-foreground text-sm">{m.title}</h3>
            <p className={`font-semibold text-sm ${m.color}`}>{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <div className="glass-card rounded-2xl p-8 border border-primary/20">
          <h2 className="text-xl font-bold text-foreground mb-6">Invia un Messaggio</h2>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                <Icon name="CheckCircleIcon" size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Messaggio inviato!</h3>
              <p className="text-muted-foreground text-sm">Ti risponderemo entro 2 ore all&apos;indirizzo email fornito.</p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">
                Invia un altro messaggio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">Nome *</label>
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
                  <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">Email *</label>
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

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">Numero Ordine (opzionale)</label>
                <input
                  type="text"
                  value={form.orderNumber}
                  onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                  className="w-full input-dark text-sm"
                  placeholder="LCV-2025-XXXXX"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">Oggetto *</label>
                <select
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full input-dark text-sm cursor-pointer"
                >
                  <option value="" className="bg-card">Seleziona un argomento</option>
                  <option value="ordine" className="bg-card">Problema con un ordine</option>
                  <option value="attivazione" className="bg-card">Problema di attivazione</option>
                  <option value="rimborso" className="bg-card">Richiesta rimborso</option>
                  <option value="account" className="bg-card">Problema con l&apos;account</option>
                  <option value="altro" className="bg-card">Altro</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">Messaggio *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full input-dark text-sm resize-none"
                  placeholder="Descrivi il tuo problema o la tua domanda nel dettaglio..."
                />
              </div>

              <button type="submit" className="w-full btn-primary py-3.5 font-bold flex items-center justify-center gap-2">
                <Icon name="PaperAirplaneIcon" size={16} />
                Invia Messaggio
              </button>
              <p className="text-center text-[11px] text-muted-foreground">
                Risponderemo entro 2 ore lavorative. Vedi la nostra{' '}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Company Info */}
      <div className="mt-12 text-center text-sm text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">DIGITALSOFT DI MUNSHI SHIHAB</p>
        <p>Via Aldo Pio Manuzio 24, 40132 Bologna (BO) — Italia</p>
        <p>P.IVA: IT04358941203 · REA: BO-588058</p>
        <p>Email: supporto@locenvo.com · PEC: munshishihab@legalmail.it</p>
        <p>Tel / WhatsApp: +39 351 479 4187 · Orari: Lun–Ven 08:00–17:00</p>
      </div>
    </div>
  );
}