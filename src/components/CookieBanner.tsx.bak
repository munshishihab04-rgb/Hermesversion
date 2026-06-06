import React, { useState, useEffect } from "react";
import { Link } from "wouter";

const CONSENT_KEY = "licenvo_cookie_consent";

type ConsentState = "accepted" | "rejected" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>("accepted"); // Default hidden

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
    } else {
      setConsent(null); // Show banner
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
  };

  // Don't show if consent already given
  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl p-5 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium mb-1">
              Questo sito utilizza i cookie
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Utilizziamo cookie tecnici necessari per il funzionamento del sito e cookie analitici
              per migliorare la tua esperienza. Puoi accettare tutti i cookie o rifiutare quelli
              non necessari.{" "}
              <Link href="/cookie-policy" className="underline hover:text-foreground transition-colors">
                Leggi la Cookie Policy
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
            >
              Solo necessari
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent/90 rounded-lg transition-colors"
            >
              Accetta tutti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
