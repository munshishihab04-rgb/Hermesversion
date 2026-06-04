import React from "react";

export default function FatturaziPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-foreground text-white">
        <div className="section-container py-16 md:py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Fatturazione
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            Informazioni sulla fatturazione elettronica e le ricevute per i tuoi acquisti su Licenvo.
          </p>
        </div>
      </div>

      <div className="section-container py-12 space-y-16 max-w-4xl mx-auto">

        {/* Intro */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground mb-4">Fatturazione Elettronica</h2>
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              La fatturazione elettronica è disponibile per tutti gli acquisti effettuati su Licenvo.
              Di seguito trovi le informazioni per privati e aziende.
            </p>
          </div>
        </section>

        {/* Per Privati */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground mb-4">Per Privati (Consumatori Finali)</h2>
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Per gli acquisti effettuati come privato (senza Partita IVA), riceverai automaticamente una
              <strong className="text-foreground"> ricevuta via email</strong> subito dopo il completamento dell'ordine.
            </p>
            <p>
              La ricevuta contiene tutti i dettagli dell'acquisto: prodotto, importo pagato, data e metodo di pagamento.
              Non è necessaria alcuna azione aggiuntiva da parte tua.
            </p>
          </div>
        </section>

        {/* Per Aziende / P.IVA */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground mb-4">Per Aziende e Titolari di Partita IVA</h2>
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Per gli acquisti effettuati con Partita IVA, emettiamo <strong className="text-foreground">fattura elettronica</strong> entro
              12 giorni dalla data di vendita, inviata tramite il Sistema di Interscambio (SDI).
            </p>
            <p className="font-semibold text-foreground">Per richiedere la fattura, inserisci i seguenti dati:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Ragione Sociale</li>
              <li>Partita IVA</li>
              <li>Codice Destinatario SDI (7 caratteri) oppure indirizzo PEC</li>
            </ul>
            <p>
              Puoi inserire questi dati nel <strong className="text-foreground">campo note al momento del checkout</strong>, oppure
              comunicarli via email a <a href="mailto:assistenza@licenvo.com" className="text-primary hover:underline">assistenza@licenvo.com</a> subito dopo l'acquisto.
            </p>
          </div>
        </section>

        {/* Regime Fiscale */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground mb-4">Regime Fiscale</h2>
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Le fatture sono emesse da:
            </p>
            <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="font-semibold text-foreground min-w-[140px]">Emittente</span>
                <span>DIGITALSOFT DI MUNSHI SHIHAB</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="font-semibold text-foreground min-w-[140px]">Partita IVA</span>
                <span>IT04358941203</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="font-semibold text-foreground min-w-[140px]">Regime Fiscale</span>
                <span>Regime forfettario (art. 1, commi 54-89, L. 190/2014)</span>
              </div>
            </div>
            <p>
              In applicazione del regime forfettario, le fatture emesse <strong className="text-foreground">non riportano IVA</strong> (operazione
              non soggetta ad IVA ai sensi dell'art. 1, comma 58, Legge 190/2014).
            </p>
          </div>
        </section>

        {/* Contatti */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground mb-4">Hai bisogno di assistenza?</h2>
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Per qualsiasi domanda relativa alla fatturazione, contattaci:
            </p>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="font-semibold text-foreground min-w-[100px]">Email</span>
                <a href="mailto:assistenza@licenvo.com" className="text-primary hover:underline">assistenza@licenvo.com</a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="font-semibold text-foreground min-w-[100px]">WhatsApp</span>
                <a href="https://wa.me/393936841051" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+39 393 684 1051</a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
