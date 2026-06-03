import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import LegalPageLayout from '@/app/components/LegalPageLayout';

export const metadata = {
  title: 'Privacy Policy — Licenvo',
  description: 'Informativa sulla privacy di Licenvo. Come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.',
};

const content = `
## 1. Titolare del Trattamento

Licenvo S.r.l., con sede legale in Via Roma 42, 20121 Milano MI, P.IVA IT12345678901 (di seguito "Licenvo", "noi" o "ci"), è il Titolare del Trattamento dei dati personali raccolti tramite il sito web licenvo.it.

Per qualsiasi questione relativa alla privacy, puoi contattarci a: privacy@licenvo.it

## 2. Dati Raccolti

Raccogliamo i seguenti tipi di dati personali:

**Dati forniti direttamente:**
- Nome e cognome
- Indirizzo email
- Dati di fatturazione (quando richiesta)
- Dati di pagamento (processati da provider certificati, non conservati da noi)

**Dati raccolti automaticamente:**
- Indirizzo IP
- Dati di navigazione (pagine visitate, tempo di permanenza)
- Cookie tecnici e analitici (vedi Cookie Policy)
- Dispositivo e browser utilizzati

## 3. Finalità del Trattamento

Utilizziamo i tuoi dati per:
- Elaborare e consegnare gli ordini acquistati
- Fornire assistenza clienti
- Inviare comunicazioni transazionali (conferma ordine, chiavi di licenza)
- Inviare newsletter promozionali (solo con consenso esplicito)
- Migliorare i nostri servizi tramite analisi aggregate
- Adempiere a obblighi legali e fiscali

## 4. Base Giuridica

Il trattamento dei tuoi dati si basa su:
- **Esecuzione del contratto**: per elaborare gli ordini e fornire i prodotti acquistati
- **Obbligo legale**: per adempiere agli obblighi fiscali e contabili
- **Consenso**: per l'invio di newsletter e comunicazioni marketing
- **Legittimo interesse**: per prevenire frodi e migliorare i nostri servizi

## 5. Conservazione dei Dati

Conserviamo i tuoi dati per i seguenti periodi:
- Dati degli ordini: 10 anni (obbligo fiscale)
- Dati dell'account: fino alla cancellazione dell'account + 30 giorni
- Dati di marketing: fino alla revoca del consenso
- Log di accesso: 12 mesi

## 6. Condivisione dei Dati

Non vendiamo i tuoi dati. Li condividiamo solo con:
- Provider di pagamento (Stripe, PayPal) per processare le transazioni
- Provider di email per la consegna delle chiavi
- Servizi di analisi (Google Analytics, anonimizzato)
- Autorità competenti se richiesto dalla legge

## 7. Diritti dell'Interessato

Ai sensi del GDPR, hai il diritto di:
- **Accesso**: richiedere copia dei tuoi dati
- **Rettifica**: correggere dati inesatti
- **Cancellazione**: richiedere la cancellazione dei tuoi dati
- **Portabilità**: ricevere i tuoi dati in formato strutturato
- **Opposizione**: opporti al trattamento per marketing
- **Limitazione**: limitare il trattamento in certi casi

Per esercitare questi diritti: privacy@licenvo.it

## 8. Cookie

Utilizziamo cookie tecnici necessari al funzionamento del sito e cookie analitici per migliorare l'esperienza. Per i dettagli, consulta la nostra Cookie Policy.

## 9. Sicurezza

Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i tuoi dati, inclusa la crittografia SSL/TLS per tutte le comunicazioni.

## 10. Modifiche

Ci riserviamo il diritto di aggiornare questa informativa. Le modifiche significative saranno comunicate via email agli utenti registrati.

*Ultimo aggiornamento: 15 Maggio 2025*
`;

export default function PrivacyPage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main className="pt-16">
            <LegalPageLayout
              title="Privacy Policy"
              subtitle="Come raccogliamo e proteggiamo i tuoi dati personali"
              lastUpdated="15 Maggio 2025"
              content={content}
              breadcrumb="Privacy Policy"
            />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}