/**
 * HoppyTrustBadges — trust badge e icone di pagamento
 * Configurato dal blocco Hoppy "c0dbbf9d-efcc-42b3-b1f1-8d546daa18b6"
 * SVG inline (il CDN Hoppy blocca hotlink diretti)
 */
import React from 'react';

/* ── SVG icone di pagamento ─────────────────────────────────────────────── */

const VisaSVG = () => (
  <svg viewBox="0 0 750 471" className="h-5 w-auto" aria-label="Visa">
    <rect width="750" height="471" rx="40" fill="#1A1F71"/>
    <path d="M278 313l29-182h47l-29 182h-47zm214-177c-9-4-24-8-42-8-46 0-79 25-79 60-1 26 23 40 40 49 18 9 24 15 24 23 0 12-14 18-28 18-19 0-29-3-45-10l-6-3-7 43c11 5 31 10 52 10 49 0 81-24 82-62 0-21-12-37-40-50-17-9-27-14-27-23 0-8 9-16 28-16 16 0 28 4 37 7l5 2 6-40zm119 -5h-36c-11 0-19 3-24 14l-68 164h48l10-27h59l5 27h43l-37-178zm-56 112l18-50 3-8 2 7 8 51h-31zm-321-112l-46 124-5-25c-9-30-36-62-67-78l42 161h49l73-182h-46z" fill="white"/>
  </svg>
);

const MastercardSVG = () => (
  <svg viewBox="0 0 152 95" className="h-5 w-auto" aria-label="Mastercard">
    <rect width="152" height="95" rx="8" fill="#252525"/>
    <circle cx="58" cy="47" r="30" fill="#EB001B"/>
    <circle cx="94" cy="47" r="30" fill="#F79E1B"/>
    <path d="M76 24a30 30 0 0 1 0 46 30 30 0 0 1 0-46z" fill="#FF5F00"/>
  </svg>
);

const AmexSVG = () => (
  <svg viewBox="0 0 780 500" className="h-5 w-auto" aria-label="American Express">
    <rect width="780" height="500" rx="40" fill="#007BC1"/>
    <text x="390" y="300" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="140" fill="white">AMEX</text>
  </svg>
);

const ApplePaySVG = () => (
  <svg viewBox="0 0 165 105" className="h-5 w-auto" aria-label="Apple Pay">
    <rect width="165" height="105" rx="8" fill="#000"/>
    <text x="82" y="52" textAnchor="middle" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif" fontSize="18" fill="white"></text>
    <text x="82" y="72" textAnchor="middle" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif" fontWeight="600" fontSize="22" fill="white">Pay</text>
    <path d="M55 33c-1.5 1.8-4 3.2-6.4 3-0.3-2.5 0.9-5.2 2.3-6.8 1.5-1.9 4.2-3.2 6.3-3.3 0.3 2.6-0.8 5.2-2.2 7.1zm2.2 3.5c-3.5-0.2-6.5 2-8.2 2-1.7 0-4.3-1.9-7.2-1.8-3.7 0-7.1 2.1-9 5.4-3.8 6.6-1 16.4 2.7 21.8 1.8 2.6 4 5.5 6.9 5.4 2.7-0.1 3.8-1.8 7.1-1.8 3.3 0 4.2 1.8 7.2 1.7 3-0.1 4.8-2.6 6.6-5.2 2.1-3 3-5.9 3-6.1-0.1 0-5.7-2.2-5.8-8.8-0.1-5.5 4.5-8.1 4.7-8.2-2.6-3.8-6.6-4.2-8-4.4z" fill="white"/>
  </svg>
);

/* ── SVG icone trust ────────────────────────────────────────────────────── */

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#0052CC" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RefundIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#0052CC" strokeWidth="1.8">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7v5l4 2" strokeLinecap="round"/>
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#0052CC" strokeWidth="1.8">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TRUST_ITEMS = [
  { Icon: ShieldIcon,  title: 'Pagamento Sicuro',      sub: 'SSL crittografato' },
  { Icon: RefundIcon,  title: 'Rimborso 30 Giorni',    sub: 'Garanzia inclusa' },
  { Icon: BoltIcon,    title: 'Consegna in 10 min',    sub: 'Assegnazione immediata' },
];

/* ── Componenti esportati ───────────────────────────────────────────────── */

export function HoppyPaymentIcons() {
  return (
    <div className="text-center">
      <p className="text-[10px] text-muted-foreground mb-2.5 uppercase tracking-widest font-medium">
        Metodi di Pagamento Accettati
      </p>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { C: VisaSVG,       label: 'Visa' },
          { C: MastercardSVG, label: 'Mastercard' },
          { C: AmexSVG,       label: 'American Express' },
          { C: ApplePaySVG,   label: 'Apple Pay' },
        ].map(({ C, label }) => (
          <div
            key={label}
            title={label}
            className="h-8 px-2.5 bg-white border border-border rounded-md flex items-center justify-center shadow-sm"
          >
            <C />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HoppyTrustBlock() {
  return (
    <div className="grid grid-cols-3 gap-2 py-3 border-y border-border">
      {TRUST_ITEMS.map(({ Icon, title, sub }) => (
        <div key={title} className="flex flex-col items-center text-center gap-1 px-1">
          <Icon />
          <p className="text-[10px] sm:text-xs font-semibold text-foreground leading-tight mt-0.5">
            {title}
          </p>
          <p className="text-[9px] text-muted-foreground leading-tight hidden sm:block">
            {sub}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function HoppyTrustBadges() {
  return <HoppyPaymentIcons />;
}
