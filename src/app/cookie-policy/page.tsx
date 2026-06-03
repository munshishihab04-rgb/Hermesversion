import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import LegalPageLayout from '@/app/components/LegalPageLayout';

export const metadata = {
  title: 'Cookie Policy — Licenvo',
  description: 'Informativa sui cookie di Licenvo. Come utilizziamo i cookie per migliorare la tua esperienza.',
};

const content = `
## 1. Cosa sono i Cookie

I cookie sono piccoli file di testo che vengono salvati sul tuo dispositivo quando visiti un sito web. Permettono al sito di ricordare le tue preferenze e migliorare la tua esperienza di navigazione.

## 2. Tipi di Cookie Utilizzati

### Cookie Tecnici (Necessari)
Questi cookie sono essenziali per il funzionamento del sito e non possono essere disabilitati:
- **Sessione**: mantengono attiva la sessione di navigazione
- **Carrello**: memorizzano i prodotti nel carrello
- **Autenticazione**: mantengono l'accesso all'account
- **Preferenze**: ricordano le tue impostazioni (lingua, valuta)

### Cookie Analitici
Utilizziamo Google Analytics (con IP anonimizzato) per:
- Analizzare il traffico del sito
- Migliorare le pagine e i contenuti
- Comprendere come gli utenti navigano il sito

Questi cookie raccolgono dati in forma aggregata e anonima.

### Cookie di Marketing
Con il tuo consenso, utilizziamo cookie di terze parti per:
- Mostrare annunci pertinenti su altri siti
- Misurare l'efficacia delle campagne pubblicitarie - Personalizzare l'esperienza di acquisto

## 3. Cookie di Terze Parti

Il sito può includere cookie di:
- **Google Analytics**: analisi del traffico
- **Stripe/PayPal**: sicurezza dei pagamenti
- **Hotjar**: analisi del comportamento utente (con consenso)

## 4. Durata dei Cookie

- Cookie di sessione: vengono eliminati alla chiusura del browser
- Cookie persistenti: rimangono per il periodo indicato (da 30 giorni a 2 anni)
- Cookie di terze parti: secondo le politiche dei rispettivi provider

## 5. Come Gestire i Cookie

**Dal banner cookie:**
Alla prima visita, puoi accettare o rifiutare i cookie non necessari tramite il banner presente nella pagina.

**Dal tuo browser:**
Puoi gestire o eliminare i cookie dalle impostazioni del browser:
- Chrome: Impostazioni > Privacy e sicurezza > Cookie
- Firefox: Opzioni > Privacy e sicurezza > Cookie
- Safari: Preferenze > Privacy > Cookie
- Edge: Impostazioni > Cookie e autorizzazioni sito

**Nota:** Disabilitare i cookie tecnici potrebbe compromettere il funzionamento del sito.

## 6. Opt-Out Google Analytics

Per disabilitare il tracciamento di Google Analytics, puoi installare il componente aggiuntivo per il browser disponibile su: tools.google.com/dlpage/gaoptout

## 7. Aggiornamenti

Questa Cookie Policy può essere aggiornata periodicamente. Ti consigliamo di consultarla regolarmente.

## 8. Contatti

Per domande sui cookie: privacy@licenvo.it

*Ultimo aggiornamento: 15 Maggio 2025*
`;

export default function CookiePolicyPage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main className="pt-16">
            <LegalPageLayout
              title="Cookie Policy"
              subtitle="Come utilizziamo i cookie per migliorare la tua esperienza"
              lastUpdated="15 Maggio 2025"
              content={content}
              breadcrumb="Cookie Policy"
            />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}