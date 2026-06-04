import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const perks = [
  { icon: 'TagIcon', text: 'Sconti esclusivi fino al 95%' },
  { icon: 'BellIcon', text: 'Avvisi su nuovi prodotti' },
  { icon: 'BoltIcon', text: 'Flash sale in anteprima' },
];

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        setError(data.error || 'Errore. Riprova tra poco.');
      }
    } catch {
      setError('Errore di rete. Riprova.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-6 bg-secondary/20 border-t border-border">
      <div className="section-container">
        <div className="relative rounded-3xl overflow-hidden border border-primary/20">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-40 blob-teal opacity-25 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 blob-cyan opacity-15 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            {/* Left */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <Icon name="BellIcon" size={12} />
                Newsletter Gratuita
              </div>
              <div>
                <h2 className="text-display font-extrabold text-foreground mb-2">
                  Offerte Esclusive
                  <span className="block gradient-text-teal">Solo per Te</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Iscriviti e ricevi le migliori offerte su licenze software prima di tutti. Niente spam, solo sconti veri.
                </p>
              </div>

              {/* Perks */}
              <div className="space-y-2">
                {perks.map((perk) => (
                  <div key={perk.text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Icon name={perk.icon as Parameters<typeof Icon>[0]['name']} size={11} className="text-primary" />
                    </div>
                    {perk.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                    <Icon name="CheckCircleIcon" size={32} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1">Sei dentro!</p>
                    <p className="text-sm text-muted-foreground">Riceverai le prossime offerte direttamente nella tua email.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold block mb-2">
                      La tua email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@email.com"
                      className="w-full input-dark text-sm py-3"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full btn-primary flex items-center justify-center gap-2 text-sm font-bold py-3.5 neon-glow-teal disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Icon name="PaperAirplaneIcon" size={15} />
                    {sending ? 'Iscrizione…' : 'Iscriviti Gratis'}
                  </button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    Nessuno spam. Cancellati quando vuoi. ·{' '}
                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                  </p>
                </form>
              )}

              {/* Social proof — no fake numbers */}
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border">
                <div className="flex -space-x-2">
                  {['A', 'M', 'G', 'L'].map((letter, i) => (
                    <div
                      key={letter}
                      className="w-7 h-7 rounded-full border-2 border-card bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-foreground font-semibold">Tanti acquirenti</span> già iscritti alla newsletter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
