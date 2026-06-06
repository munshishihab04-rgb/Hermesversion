import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-foreground text-white">
        <div className="section-container py-16 md:py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Chi Siamo
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            Dal 2020 offriamo licenze software a prezzi accessibili, con assistenza rapida e consegna digitale immediata.
          </p>
        </div>
      </div>

      <div className="section-container py-12 space-y-16 max-w-4xl mx-auto">

        {/* Chi Siamo */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground mb-4">Chi Siamo</h2>
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Licenvo</strong> è il brand commerciale di <strong className="text-foreground">DIGITALSOFT DI MUNSHI SHIHAB</strong>, azienda
              italiana con sede a Bologna, attiva dal 2020 nella vendita online di licenze software.
            </p>
            <p>
              Siamo specializzati nella distribuzione di licenze <strong className="text-foreground">Microsoft</strong> (Windows, Office, Microsoft 365),
              <strong className="text-foreground"> Autodesk</strong> (AutoCAD, Revit, Fusion 360, le Industry Collections) e
              <strong className="text-foreground"> Kaspersky</strong> (antivirus e sicurezza informatica).
            </p>
            <p>
              Il nostro obiettivo è rendere il software professionale accessibile a tutti — privati, liberi professionisti, studi tecnici
              e aziende — offrendo prezzi competitivi senza compromessi sulla qualità e l'affidabilità dei prodotti.
            </p>
          </div>
        </section>

        {/* La Nostra Missione */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground mb-4">La Nostra Missione</h2>
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Crediamo che ogni professionista meriti accesso a strumenti software di qualità senza dover affrontare costi proibitivi.
              La nostra missione è colmare il divario tra i prezzi di listino e ciò che il mercato può realmente sostenere,
              offrendo un servizio trasparente, rapido e affidabile.
            </p>
            <p>
              Lavoriamo ogni giorno per garantire un'esperienza d'acquisto semplice: scegli il prodotto, completa il pagamento
              e ricevi la tua licenza direttamente via email, pronta per l'attivazione. Nessuna attesa, nessuna complicazione.
            </p>
          </div>
        </section>

        {/* I Nostri Valori */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground mb-4">I Nostri Valori</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Trasparenza",
                desc: "Prezzi chiari, nessun costo nascosto. Ogni prodotto è descritto in modo completo con tipo di licenza, durata e modalità di attivazione."
              },
              {
                title: "Prezzi Accessibili",
                desc: "Offriamo licenze software a prezzi competitivi, rendendo il software professionale alla portata di tutti."
              },
              {
                title: "Assistenza Rapida",
                desc: "Il nostro team risponde entro 2 ore lavorative via email o WhatsApp. Non ti lasciamo mai solo durante l'attivazione o in caso di problemi."
              },
              {
                title: "Consegna Digitale Immediata",
                desc: "Le chiavi di attivazione e gli abbonamenti vengono consegnati rapidamente via email. Per abbonamenti Autodesk, l'assegnazione avviene entro 24 ore."
              },
            ].map((v) => (
              <div key={v.title} className="bg-white border border-border rounded-xl p-5">
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dati Aziendali */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground mb-4">Dati Aziendali</h2>
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8">
            <div className="space-y-3 text-sm">
              {[
                { label: "Ragione Sociale", value: "DIGITALSOFT DI MUNSHI SHIHAB" },
                { label: "Sede Legale", value: "Via Aldo Pio Manuzio 24, 40132 Bologna (BO), Italia" },
                { label: "Partita IVA", value: "IT04358941203" },
                { label: "REA", value: "BO-588058" },
                { label: "PEC", value: "munshishihab@legalmail.it" },
                { label: "Anno di Fondazione", value: "2020" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-border last:border-b-0">
                  <span className="font-semibold text-foreground min-w-[160px]">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contattaci */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground mb-4">Contattaci</h2>
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Hai domande, bisogno di assistenza o vuoi un preventivo personalizzato? Siamo a tua disposizione.
            </p>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-border">
                <span className="font-semibold text-foreground min-w-[160px]">Email Assistenza</span>
                <a href="mailto:assistenza@licenvo.com" className="text-primary hover:underline">assistenza@licenvo.com</a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-border">
                <span className="font-semibold text-foreground min-w-[160px]">WhatsApp</span>
                <a href="https://wa.me/393936841051" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+39 393 684 1051</a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2">
                <span className="font-semibold text-foreground min-w-[160px]">PEC</span>
                <span>munshishihab@legalmail.it</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Tempo medio di risposta: entro 2 ore lavorative (Lun-Ven 9:00-18:00).
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
