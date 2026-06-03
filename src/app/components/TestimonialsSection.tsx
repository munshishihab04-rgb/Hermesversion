import React from 'react';
import AppImage from '@/components/ui/AppImage';


const testimonials = [
{
  name: 'Mario',
  role: 'Cliente verificato, Italia',
  avatar: `https://ui-avatars.com/api/?name=Mario&background=7c3aed&color=fff&size=96`,
  rating: 5,
  text: `AFFIDABILITA e SERIETA MASSIMA. Ho contattato Licenvo per un problema, sono stato assistito telefonicamente da Davide con massima cortesia. SUPERCONSIGLIATO!!!`,
  product: 'Office 2019 Retail',
  date: '19 Maggio 2026'
},
{
  name: 'Cristian Schifone',
  role: 'Cliente verificato, Italia',
  avatar: `https://ui-avatars.com/api/?name=CS&background=0891b2&color=fff&size=96`,
  rating: 5,
  text: `Ho scritto al supporto di sabato mattina aspettandomi risposta lunedi, invece mi hanno risposto dopo 5 minuti e mi hanno risolto il problema.`,
  product: 'Licenza Software',
  date: '16 Maggio 2026'
},
{
  name: 'Luca',
  role: 'Cliente verificato, Italia',
  avatar: `https://ui-avatars.com/api/?name=Luca&background=059669&color=fff&size=96`,
  rating: 5,
  text: `Ottima esperienza, sono anni che acquisto licenze su questo sito. L'assistenza risponde immediatamente ed e' cordiale.`,
  product: 'Licenze Software',
  date: '18 Aprile 2026'
},
{
  name: 'Giulia M.',
  role: 'Architetta, Milano',
  avatar: `https://ui-avatars.com/api/?name=GM&background=0891b2&color=fff&size=96`,
  rating: 5,
  text: `Ho acquistato l'abbonamento Revit e AutoCAD in bundle. L'assegnazione è avvenuta in 8 minuti come promesso. Il risparmio rispetto al sito ufficiale è enorme.`,
  product: 'Autodesk AEC Collection',
  date: '2 Giugno 2026'
},
{
  name: 'Marco Ferretti',
  role: 'Ingegnere Meccanico, Torino',
  avatar: `https://ui-avatars.com/api/?name=MF&background=7c3aed&color=fff&size=96`,
  rating: 5,
  text: `Uso Fusion 360 da anni. Finalmente ho trovato un rivenditore italiano affidabile. Supporto eccellente, risposta in 10 minuti anche la sera.`,
  product: 'Autodesk Fusion 360',
  date: '28 Maggio 2026'
}];


function StarRating({ count }: {count: number;}) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) =>
      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </div>);

}

export default function TestimonialsSection() {
  return (
    <section className="py-8">
      <div className="section-container">
        <div className="text-center mb-5">
          <h2 className="section-title mb-3">Cosa Dicono i Nostri Clienti</h2>
          <p className="section-subtitle text-sm">Recensioni reali dei nostri clienti verificati</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) =>
          <div
            key={t.name}
            className="glass-card rounded-2xl p-4 space-y-3 card-hover-glow">
            
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
                  <AppImage
                  src={t.avatar}
                  alt={`Foto di ${t.name}`}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover" />
                
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-sm">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{t.role}</p>
                </div>
                <StarRating count={t.rating} />
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-[10px] text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                  {t.product}
                </span>
                <span className="text-[10px] text-muted-foreground">{t.date}</span>
              </div>
            </div>
          )}
        </div>

        {/* Aggregate rating */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 glass-card rounded-2xl border border-border">
          <div className="text-center sm:text-left">
            <div className="price-mono text-4xl font-extrabold text-foreground">4.9</div>
            <StarRating count={5} />
            <p className="text-xs text-muted-foreground mt-1">Media su 52.000+ recensioni</p>
          </div>
          <div className="w-px h-16 bg-border hidden sm:block" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
            { label: '5 stelle', pct: 87 },
            { label: '4 stelle', pct: 10 },
            { label: '3 stelle', pct: 2 },
            { label: '1-2 stelle', pct: 1 }].
            map((r) =>
            <div key={r.label} className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground w-14">{r.label}</span>
                <div className="flex-1 bg-muted rounded-full h-1.5">
                  <div
                  className="bg-amber-400 h-1.5 rounded-full"
                  style={{ width: `${r.pct}%` }} />
                
                </div>
                <span className="text-[11px] text-muted-foreground w-8">{r.pct}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}
