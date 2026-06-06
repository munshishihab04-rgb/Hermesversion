import React from 'react';
import { Link } from 'wouter';
import LogoIcon from '@/components/ui/LogoIcon';
import Icon from '@/components/ui/AppIcon';

const footerLinks = {
  prodotti: [
    { label: 'Windows', href: '/product-catalog?cat=windows' },
    { label: 'Office', href: '/product-catalog?cat=office' },
    { label: 'Microsoft 365', href: '/product-catalog?cat=microsoft-365' },
    { label: 'Antivirus', href: '/product-catalog?cat=antivirus' },
    { label: 'Autodesk', href: '/autodesk-collections' },
    
  ],
  supporto: [
    { label: 'Centro Assistenza', href: '/help-center' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contattaci', href: '/contact' },
    { label: 'Stato Ordini', href: '/help-center' },
  ],
  legale: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Termini di Servizio', href: '/terms' },
    { label: 'Politica Rimborsi', href: '/refund' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Spedizione e Consegna', href: '/shipping' },
    { label: 'Note Legali', href: '/legal' },
    { label: 'Fatturazione', href: '/fatturazione' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 pt-12 pb-8">
      <div className="section-container">
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LogoIcon size={32} />
              <span className="font-bold text-lg text-foreground">Licenvo</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Il marketplace italiano per licenze software digitali a prezzi competitivi.
            </p>
          </div>

          {/* Products */}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Prodotti</div>
            <ul className="space-y-2.5">
              {footerLinks.prodotti.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Supporto</div>
            <ul className="space-y-2.5">
              {footerLinks.supporto.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Legale</div>
            <ul className="space-y-2.5">
              {footerLinks.legale.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-border pt-8 pb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Pagamento Sicuro SSL */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground">Pagamento Sicuro SSL</span>
          </div>
          {/* Consegna Digitale Immediata */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground">Consegna Digitale Immediata</span>
          </div>
          {/* Garanzia 30 giorni */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground">Garanzia 30 giorni</span>
          </div>
          {/* Assistenza in Italiano */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground">Assistenza in Italiano</span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-[11px] text-muted-foreground flex-wrap justify-center sm:justify-start">
            <p>
              &copy; {new Date().getFullYear()} DIGITALSOFT DI MUNSHI SHIHAB &mdash; P.IVA IT04358941203 &mdash; Tutti i diritti riservati
            </p>
            <span className="text-gray-400 hidden sm:inline">·</span>
            <span>Via Aldo Pio Manuzio 24, 40132 Bologna</span>
            <span className="text-gray-400 hidden sm:inline">·</span>
            <a href="mailto:supporto@licenvo.com" className="hover:text-white transition-colors">supporto@licenvo.com</a>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Consegna Istantanea Attiva 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
