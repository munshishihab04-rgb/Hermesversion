import React from 'react';
import { Link } from 'wouter';
import LogoIcon from '@/components/ui/LogoIcon';
import Icon from '@/components/ui/AppIcon';

const footerLinks = {
  prodotti: [
    { label: 'Windows & Office', href: '/product-catalog?cat=windows-office' },
    { label: 'Antivirus', href: '/product-catalog?cat=antivirus' },
    { label: 'Autodesk', href: '/autodesk-collections' },
    
  ],
  supporto: [
    { label: 'Centro Assistenza', href: '/help-center' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contattaci', href: '/contact' },
    { label: 'Stato Ordini', href: '#' },
  ],
  legale: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Termini di Servizio', href: '/terms' },
    { label: 'Politica Rimborsi', href: '/refund' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
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
              Il marketplace italiano per licenze software originali ai prezzi più bassi.
            </p>
            <div className="flex gap-3">
              {(['Twitter', 'Instagram', 'Facebook'] as const).map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all"
                >
                  <Icon name="GlobeAltIcon" size={14} />
                </a>
              ))}
            </div>
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

        {/* Bottom Row */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Licenvo S.r.l. — P.IVA IT12345678901 — Tutti i diritti riservati
          </p>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Consegna Istantanea Attiva 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
}