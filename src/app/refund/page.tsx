import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import LegalPageLayout from '@/app/components/LegalPageLayout';

export const metadata = {
  title: 'Politica Rimborsi — Licenvo',
  description: 'Politica di rimborso e sostituzione prodotti di Licenvo. Garanzia 30 giorni su tutte le licenze.',
};

const content = `
## 1. La Nostra Garanzia

Licenvo garantisce l'autenticità e il funzionamento di tutte le licenze vendute. Se riscontri un problema con un prodotto acquistato, siamo qui per aiutarti.

## 2. Quando Hai Diritto al Rimborso

Hai diritto a rimborso o sostituzione gratuita nei seguenti casi:

**Rimborso completo garantito:**
- La chiave di licenza non funziona o è già stata attivata
- Il prodotto ricevuto è diverso da quello ordinato
- La chiave non è compatibile con la piattaforma/regione indicata nella descrizione

**Sostituzione gratuita:**
- La chiave smette di funzionare entro 30 giorni dall'acquisto
- Problemi tecnici risolvibili con una nuova chiave

## 3. Quando NON è Possibile Rimborsare

Non è possibile procedere con il rimborso nei seguenti casi:
- La chiave è stata attivata con successo
- Sono trascorsi più di 30 giorni dall'acquisto
- Il problema è causato da incompatibilità hardware non indicata nella descrizione
- Acquisto effettuato per errore (prodotto sbagliato)
- Violazione dei Termini di Servizio

## 4. Come Richiedere un Rimborso

1. **Contattaci entro 30 giorni** dall'acquisto tramite:
   - Email: assistenza@licenvo.com
   - Chat sul sito
   - Modulo di contatto

2. **Fornisci le seguenti informazioni:**
   - Numero ordine (formato: LCV-ANNO-XXXXX)
   - Email utilizzata per l'acquisto
   - Descrizione dettagliata del problema
   - Screenshot dell'errore (se disponibile)

3. **Elaborazione:**
   - Risposta entro 2 ore lavorative
   - Sostituzione chiave: immediata
   - Rimborso: 3-5 giorni lavorativi sul metodo di pagamento originale

## 5. Diritto di Recesso

Per i prodotti digitali, ai sensi dell'art. 59 del D.Lgs. 206/2005 (Codice del Consumo), il diritto di recesso non si applica una volta che il download o la consegna digitale è avvenuta e l'esecuzione del contratto è iniziata, purché il consumatore abbia fornito il consenso preventivo.

Tuttavia, per tua tutela, offriamo la nostra garanzia commerciale di 30 giorni descritta sopra.

## 6. Rimborsi per Abbonamenti

Per gli abbonamenti (es. Microsoft 365, antivirus):
- Se l'abbonamento non si attiva: rimborso completo
- Se l'abbonamento è attivo ma non soddisfacente: non rimborsabile (prodotto funzionante)

## 7. Metodi di Rimborso

I rimborsi vengono elaborati tramite:
- Carta di credito/debito: 3-5 giorni lavorativi
- PayPal: 1-3 giorni lavorativi
- Klarna: secondo le politiche Klarna
- Credito Licenvo: immediato (alternativa al rimborso monetario)

## 8. Contatti per Rimborsi

Email dedicata: assistenza@licenvo.com
Chat: disponibile 24/7 sul sito
Telefono: non disponibile (solo supporto scritto)

*Ultimo aggiornamento: 15 Maggio 2025*
`;

export default function RefundPage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main className="pt-16">
            <LegalPageLayout
              title="Politica Rimborsi"
              subtitle="Garanzia 30 giorni su tutte le licenze acquistate"
              lastUpdated="15 Maggio 2025"
              content={content}
              breadcrumb="Politica Rimborsi"
            />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}