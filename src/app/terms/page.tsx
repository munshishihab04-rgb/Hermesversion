import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const htmlContent = `
<h1>Condizioni Generali di Vendita</h1>
<p><strong>Ultimo aggiornamento:</strong> Maggio 2026</p>
<h2>Premessa</h2>
<p>Le presenti Condizioni Generali di Vendita ("CGV") regolano tutti gli acquisti di prodotti software, licenze digitali e soluzioni per ufficio effettuati tramite il sito web <strong><a href="https://www.locenvo.com">locenvo.com</a></strong> ("Sito"), di proprietà di <strong>DIGITALSOFT DI MUNSHI SHIHAB</strong> ("Titolare").</p>
<h3>Dati aziendali</h3>
<ul>
<li><strong>Ragione Sociale:</strong> DIGITALSOFT DI MUNSHI SHIHAB</li>
<li><strong>Sede legale:</strong> Via Aldo Pio Manuzio 24, 40132 Bologna (BO), Italia</li>
<li><strong>Partita IVA:</strong> 04358941203</li>
<li><strong>Numero REA:</strong> BO-588058</li>
<li><strong>PEC:</strong> munshishihab@legalmail.it</li>
<li><strong>Email supporto:</strong> supporto@locenvo.com</li>
<li><strong>Telefono / WhatsApp:</strong> +39 351 479 4187</li>
</ul>
<p>Effettuando un ordine sul Sito, il Cliente dichiara di aver letto, compreso e accettato integralmente le presenti CGV. Le disposizioni che fanno riferimento ai Consumatori (come definiti alla Sezione 1) si applicano esclusivamente ai soggetti che rientrano in tale definizione. I Consumatori beneficiano di tutte le tutele previste dal Titolo III, Sezione II, del D.lgs. 6 settembre 2005, n. 206 ("Codice del Consumo") e da ogni altra norma inderogabile applicabile.</p>
<p>Il Servizio Clienti di Licenvo è a disposizione per informazioni, chiarimenti, reclami e contestazioni ai recapiti sopra indicati, dal Lunedì al Venerdì dalle ore 08:00 alle ore 17:00. Il Titolare si rende disponibile — anche telefonicamente — ad offrire ai Clienti qualsiasi chiarimento riguardo al contenuto delle CGV, del Contratto e alla relativa disciplina, nonché in relazione a qualsiasi reclamo. Qualora il Cliente decida di non avvalersi del servizio telefonico, restano in ogni caso salvi e impregiudicati tutti i diritti e le facoltà riconosciuti dalla legge.</p>
<p>Il diritto di recesso in favore dei consumatori è disciplinato dalla Sezione 5 delle presenti CGV, consultabile anche dalla pagina dedicata <a href="/refund">Politica di Reso e Rimborso</a> del Sito.</p>
<hr>
<h2>1. Definizioni</h2>
<ul>
<li><strong>Consumatore:</strong> persona fisica che acquista per scopi estranei alla propria attività imprenditoriale, commerciale, artigianale o professionale, ai sensi dell'art. 3, comma 1, lett. a) del Codice del Consumo.</li>
<li><strong>Professionista:</strong> persona fisica o giuridica che acquista per scopi connessi alla propria attività imprenditoriale, commerciale, artigianale o professionale.</li>
<li><strong>Cliente:</strong> qualsiasi soggetto — Consumatore o Professionista — che effettua un acquisto sul Sito.</li>
<li><strong>Prodotto:</strong> chiavi di licenza software (nuove o usate), abbonamenti software, soluzioni per ufficio e ogni altro bene digitale disponibile sul Sito.</li>
<li><strong>Licenza Usata:</strong> licenza software precedentemente acquistata e legittimamente rivenduta in conformità alla normativa europea sull'esaurimento del diritto di distribuzione.</li>
<li><strong>Contratto:</strong> accordo di vendita concluso tra il Cliente e il Titolare tramite il Sito, regolato dalle presenti CGV.</li>
<li><strong>Abbonamento:</strong> diritto di utilizzo di un software concesso per un periodo di tempo determinato, soggetto a rinnovo.</li>
</ul>
<hr>
<h2>2. Oggetto del Servizio</h2>
<h3>2.1 Descrizione del servizio</h3>
<p>Il Titolare offre ai Clienti la possibilità di acquistare licenze software — nuove e usate —, abbonamenti software e altri prodotti digitali destinati all'uso personale o aziendale. Tutti i Prodotti disponibili sul Sito sono forniti in conformità alle normative europee applicabili, in particolare:</p>
<ul>
<li><strong>Direttiva Europea 2009/24/CE</strong> — relativa alla tutela giuridica dei programmi per elaboratore, che disciplina l'esaurimento del diritto di distribuzione delle licenze software, consentendone la rivendita legale.</li>
<li><strong>Sentenza della Corte di Giustizia dell'Unione Europea C-128/11 (UsedSoft GmbH c. Oracle International Corp.)</strong> — la quale stabilisce che la rivendita di licenze software usate, incluse quelle originariamente scaricate in formato digitale, è lecita purché il precedente titolare abbia cessato di utilizzare la propria copia.</li>
</ul>
<h3>2.2 Caratteristiche delle licenze software</h3>
<p>Le licenze fornite dal Titolare sono:</p>
<ul>
<li><strong>Autentiche e verificate:</strong> ogni licenza è sottoposta a controllo di autenticità e funzionalità prima della vendita.</li>
<li><strong>Legalmente acquisite:</strong> tutte le licenze provengono da fonti legittime e rispettano i requisiti normativi per la rivendita.</li>
<li><strong>Non più in uso dal cedente:</strong> le licenze usate sono state disattivate o non sono più utilizzate dal precedente titolare, garantendo il trasferimento esclusivo dei diritti al nuovo acquirente.</li>
</ul>
<h3>2.3 Esclusività del formato digitale</h3>
<p>Tutti i Prodotti disponibili sul Sito sono distribuiti <strong>esclusivamente in formato digitale</strong>. Non vengono forniti supporti fisici (CD, DVD, chiavette USB o altro). La consegna avviene in via telematica, come specificato alla Sezione 4.</p>
<h3>2.4 Responsabilità del Cliente</h3>
<ul>
<li>Il Cliente è tenuto a verificare, prima dell'acquisto, i requisiti tecnici del software (compatibilità con il sistema operativo, specifiche hardware, ecc.).</li>
<li>Il software è destinato esclusivamente all'uso personale o professionale del Cliente e non può essere rivenduto, ceduto, duplicato o condiviso con terzi senza autorizzazione.</li>
</ul>
<hr>
<h2>3. Prezzi e Pagamenti</h2>
<h3>3.1 Prezzi</h3>
<ul>
<li><strong>Trasparenza:</strong> tutti i prezzi sono espressi in Euro (€) e si intendono comprensivi di IVA, salvo diversa indicazione specificata nel carrello o nella conferma d'ordine.</li>
<li><strong>Aggiornamenti:</strong> il Titolare si riserva il diritto di modificare i prezzi in qualsiasi momento senza preavviso. Eventuali variazioni non si applicano agli ordini già confermati.</li>
<li><strong>Offerte promozionali:</strong> alcuni Prodotti possono essere oggetto di sconti o promozioni temporanee. I termini di tali offerte saranno indicati di volta in volta sul Sito.</li>
<li><strong>Errori evidenti:</strong> eventuali errori manifesti nei prezzi (es. prezzo palesemente incongruo) non sono vincolanti. Il Titolare si riserva di annullare gli ordini associati a tali errori e di rimborsare l'importo eventualmente già pagato.</li>
</ul>
<h3>3.2 Validità del prezzo</h3>
<p>Il prezzo visualizzato al momento della conferma dell'ordine è quello applicato alla transazione. Eventuali variazioni successive non avranno effetto sugli ordini già confermati.</p>
<h3>3.3 Metodi di pagamento accettati</h3>
<p>Il Titolare accetta i seguenti metodi di pagamento:</p>
<ul>
<li><strong>Carte di credito e debito:</strong> Visa, Mastercard, American Express e altri circuiti supportati, tramite gateway bancario sicuro.</li>
<li><strong>PayPal:</strong> per transazioni rapide e protette dal programma di protezione acquirenti.</li>
<li><strong>Bonifico bancario:</strong> le coordinate saranno fornite al momento dell'ordine. L'elaborazione potrà richiedere tempi più lunghi.</li>
<li><strong>Altri metodi:</strong> eventuali metodi aggiuntivi disponibili al checkout.</li>
</ul>
<h3>3.4 Sicurezza dei pagamenti</h3>
<p>Tutte le transazioni sono protette da crittografia SSL/TLS. Il Titolare non memorizza in alcun modo i dati delle carte di credito o debito. Le transazioni sono gestite interamente da fornitori di servizi di pagamento certificati PCI-DSS.</p>
<h3>3.5 Conferma del pagamento</h3>
<p>A pagamento avvenuto, il Cliente riceverà un'email di conferma contenente:</p>
<ul>
<li>Riepilogo del Prodotto acquistato.</li>
<li>Numero d'ordine univoco.</li>
<li>Fattura o ricevuta, ove applicabile. Per maggiori informazioni sulla fatturazione, consultare la pagina <a href="/faq">Fatturazione</a>.</li>
</ul>
<h3>3.6 Pagamento rifiutato</h3>
<p>In caso di pagamento rifiutato, il Cliente sarà informato e invitato a verificare i dati inseriti o a contattare il proprio istituto finanziario. L'ordine rimarrà in sospeso fino alla ricezione di un pagamento valido; se non completato entro <strong>3 giorni</strong>, sarà annullato automaticamente.</p>
<h3>3.7 Costi aggiuntivi</h3>
<ul>
<li>Nessuna commissione aggiuntiva è applicata per pagamenti con carte o PayPal.</li>
<li>Per pagamenti tramite bonifico bancario, eventuali commissioni bancarie sono a carico del Cliente.</li>
</ul>
<h3>3.8 Prevenzione frodi</h3>
<p>Il Titolare si riserva il diritto di:</p>
<ul>
<li>Richiedere verifiche aggiuntive in caso di sospetta attività fraudolenta.</li>
<li>Rifiutare o annullare transazioni ritenute non sicure o in violazione delle presenti CGV.</li>
</ul>
<hr>
<h2>4. Consegna dei Prodotti Digitali</h2>
<h3>4.1 Modalità di consegna</h3>
<p>La consegna avviene <strong>esclusivamente in formato digitale</strong> tramite email all'indirizzo fornito dal Cliente in fase di acquisto. Non viene spedito alcun supporto fisico. L'email di consegna conterrà:</p>
<ul>
<li>Il codice di attivazione o la chiave di licenza.</li>
<li>Istruzioni dettagliate per il download e l'attivazione del Prodotto.</li>
<li>Link ufficiali del produttore per il download del software, ove disponibili.</li>
</ul>
<p>Per maggiori dettagli sulle modalità di consegna, il Cliente può consultare la pagina dedicata <a href="/help-center">Spedizione e Consegna</a>.</p>
<h3>4.2 Tempi di consegna</h3>
<ul>
<li><strong>Prodotti Autodesk:</strong> consegna entro 15 minuti dall'elaborazione dell'ordine, durante l'orario lavorativo.</li>
<li><strong>Prodotti Microsoft, Antivirus e altri:</strong> consegna generalmente immediata; in casi eccezionali, entro un massimo di 24 ore.</li>
</ul>
<p>I tempi indicati si riferiscono agli ordini effettuati e confermati durante l'orario lavorativo (Lun–Ven, 08:00–17:00). Ordini effettuati al di fuori di tale orario saranno elaborati il primo giorno lavorativo utile.</p>
<h3>4.3 Assistenza post-consegna</h3>
<p>In caso di problemi con la licenza ricevuta (codice non funzionante, difficoltà di installazione o attivazione), il Cliente può contattare il Servizio Clienti tramite la pagina <a href="/contact">Contatti</a> oppure ai seguenti recapiti:</p>
<ul>
<li><strong>Email:</strong> supporto@locenvo.com</li>
<li><strong>Telefono / WhatsApp:</strong> +39 351 479 4187</li>
</ul>
<p>Il Titolare si impegna a risolvere ogni problematica nel minor tempo possibile, fornendo — ove necessario — una chiave sostitutiva, assistenza tecnica o un rimborso completo.</p>
<h3>4.4 Conferma di ricezione</h3>
<p>Il Cliente riceverà un'email di conferma della consegna. È responsabilità del Cliente verificare la cartella "Posta indesiderata" o "Spam" in caso di mancata ricezione.</p>
<h3>4.5 Limitazioni di responsabilità sulla consegna</h3>
<p>Il Titolare non è responsabile per ritardi o mancata consegna dovuti a:</p>
<ul>
<li>Errori nell'indirizzo email fornito dal Cliente.</li>
<li>Filtri antispam, problemi tecnici o limitazioni della piattaforma di posta del Cliente.</li>
<li>Interruzioni della connessione internet del Cliente.</li>
<li>Cause di forza maggiore.</li>
</ul>
<hr>
<h2>5. Diritto di Recesso e Politica di Reso</h2>
<h3>5.1 Impegno del Titolare</h3>
<p>DIGITALSOFT DI MUNSHI SHIHAB si impegna a garantire la <strong>massima soddisfazione</strong> dei propri Clienti. Trattandosi di prodotti digitali — in particolare licenze software usate — il Titolare offre condizioni di reso particolarmente flessibili e migliorative rispetto ai minimi previsti dalla legge, al fine di assicurare al Cliente la massima tranquillità nell'acquisto.</p>
<h3>5.2 Informativa sul diritto di recesso (Consumatori)</h3>
<p>Ai sensi degli artt. 52 e ss. del D.lgs. 206/2005 (Codice del Consumo), il Consumatore ha il diritto di recedere dal contratto, senza indicarne le ragioni, entro <strong>14 (quattordici) giorni</strong>.</p>
<p>Il periodo di recesso scade dopo <strong>14 giorni dal giorno della conclusione del contratto</strong>.</p>
<p>Per esercitare il diritto di recesso, il Consumatore è tenuto a informare:</p>
<p><strong>DIGITALSOFT DI MUNSHI SHIHAB</strong><br>
Via Aldo Pio Manuzio 24, 40132 Bologna (BO), Italia<br>
Email: supporto@locenvo.com<br>
PEC: munshishihab@legalmail.it<br>
Telefono / WhatsApp: +39 351 479 4187</p>
<p>della sua decisione di recedere dal presente contratto tramite una dichiarazione esplicita (ad esempio lettera inviata per posta, email o PEC). A tal fine può utilizzare il modulo tipo di recesso riportato alla Sezione 5.9, ma non è obbligatorio.</p>
<p>Per rispettare il termine di recesso, è sufficiente che il Consumatore invii la comunicazione relativa all'esercizio del diritto di recesso <strong>prima della scadenza del periodo di recesso</strong>.</p>
<p>Il diritto di recesso si applica a condizione che:</p>
<ul>
<li>La licenza <strong>non sia stata attivata</strong> sul server del produttore (es. Microsoft, Autodesk).</li>
<li>La licenza <strong>non sia stata installata</strong> o utilizzata su alcun dispositivo.</li>
</ul>
<h3>5.3 Effetti del recesso</h3>
<p>Se il Consumatore recede dal presente contratto, gli saranno rimborsati tutti i pagamenti effettuati a favore del Titolare, senza indebito ritardo e in ogni caso non oltre <strong>14 giorni</strong> dal giorno in cui il Titolare è informato della decisione del Consumatore di recedere dal presente contratto.</p>
<p>Detti rimborsi saranno effettuati utilizzando lo stesso mezzo di pagamento usato dal Consumatore per la transazione iniziale, salvo che il Consumatore non abbia espressamente convenuto altrimenti; in ogni caso, il Consumatore non dovrà sostenere alcun costo quale conseguenza di tale rimborso.</p>
<h3>5.4 Esclusioni del diritto di recesso</h3>
<p>Ai sensi dell'art. 59, comma 1, lett. o) del Codice del Consumo, il diritto di recesso è <strong>escluso</strong> nel caso di fornitura di contenuto digitale mediante un supporto non materiale se l'esecuzione è iniziata e, se il contratto impone al consumatore l'obbligo di pagare, qualora:</p>
<ul>
<li>il Consumatore abbia dato il proprio <strong>consenso preventivo ed espresso</strong> a ricevere il contenuto digitale durante il periodo di recesso;</li>
<li>il Consumatore abbia <strong>riconosciuto di perdere</strong> in tal modo il proprio diritto di recesso;</li>
<li>il Titolare abbia fornito la <strong>conferma</strong> del consenso prestato dal Consumatore su un supporto durevole.</li>
</ul>
<p>In particolare, il diritto di recesso non si applica qualora:</p>
<ul>
<li>La licenza sia stata <strong>attivata</strong> sul server del produttore.</li>
<li>Il software sia stato <strong>scaricato, installato e utilizzato</strong> dal Cliente.</li>
</ul>
<p>Resta inteso che tali esclusioni <strong>non si applicano</strong> al reso per prodotto difettoso o non conforme (Sezione 5.5), per il quale il Cliente mantiene sempre il diritto alla sostituzione o al rimborso.</p>
<h3>5.5 Reso per prodotto difettoso o non conforme</h3>
<p><strong>Indipendentemente dall'attivazione o dall'utilizzo</strong>, il Cliente ha diritto al rimborso completo o alla sostituzione gratuita nei seguenti casi:</p>
<ul>
<li>La chiave di licenza risulta <strong>non valida, già utilizzata da terzi, bloccata</strong> o non funzionante per cause non imputabili al Cliente.</li>
<li>Il Prodotto consegnato è <strong>diverso</strong> da quello ordinato.</li>
<li>Il Prodotto presenta un <strong>difetto di conformità</strong> ai sensi degli artt. 128 e ss. del Codice del Consumo.</li>
</ul>
<p>In tali casi, il Titolare provvederà — a scelta del Cliente — alla <strong>sostituzione immediata con una nuova chiave funzionante</strong> oppure al <strong>rimborso completo</strong> dell'importo pagato. Il diritto alla sostituzione o al rimborso per prodotto difettoso è esercitabile <strong>per tutta la durata della garanzia</strong> (v. Sezione 6).</p>
<h3>5.6 Come esercitare il recesso</h3>
<p>Per esercitare il diritto di recesso, il Consumatore può:</p>
<ul>
<li>Inviare un'email a <strong>supporto@locenvo.com</strong></li>
<li>Inviare una PEC a <strong>munshishihab@legalmail.it</strong></li>
<li>Contattare il Servizio Clienti via <strong>WhatsApp al +39 351 479 4187</strong></li>
<li>Compilare e inviare il modulo tipo di recesso riportato alla Sezione 5.9</li>
<li>Compilare il modulo di recesso disponibile nella pagina <a href="/refund">Politica di Reso e Rimborso</a> del Sito</li>
</ul>
<p>La comunicazione deve contenere:</p>
<ul>
<li>Nome e cognome del Cliente.</li>
<li>Numero dell'ordine.</li>
<li>Prodotto oggetto del recesso.</li>
<li>Data di acquisto.</li>
<li>Motivo del recesso (facoltativo, ma utile per migliorare il servizio).</li>
</ul>
<h3>5.7 Rimborso</h3>
<p>Se il recesso viene esercitato correttamente:</p>
<ul>
<li>Il rimborso sarà effettuato entro <strong>14 giorni</strong> dalla ricezione della comunicazione di recesso, utilizzando lo stesso metodo di pagamento scelto dal Cliente.</li>
<li>L'importo rimborsato corrisponde al prezzo effettivamente pagato per il Prodotto.</li>
<li>Non saranno addebitati costi aggiuntivi al Consumatore a seguito del rimborso.</li>
</ul>
<h3>5.8 Tempi di gestione</h3>
<p>Le richieste di recesso vengono prese in carico entro <strong>48 ore lavorative</strong> dalla ricezione. Il Titolare si impegna a comunicare al Cliente l'esito della richiesta (approvazione o eventuale richiesta di chiarimenti) nel più breve tempo possibile.</p>
<h3>5.9 Modulo tipo di recesso</h3>
<p>(ai sensi dell'Allegato I, parte B, del D.lgs. 206/2005 – Codice del Consumo)</p>
<p>— Compilare e restituire il presente modulo solo se si desidera recedere dal contratto —</p>
<p>Destinatario:<br>
<strong>DIGITALSOFT DI MUNSHI SHIHAB</strong><br>
Via Aldo Pio Manuzio 24, 40132 Bologna (BO), Italia<br>
Email: supporto@locenvo.com<br>
PEC: munshishihab@legalmail.it</p>
<p>Con la presente il/la sottoscritto/a notifica il recesso dal contratto di vendita dei seguenti beni/servizi:</p>
<p>___________</p>
<p>Ordinato il: ___</p>
<p>Nome e cognome del consumatore: ___________</p>
<p>Indirizzo del consumatore: ___________</p>
<p>Firma del consumatore (solo se il presente modulo è notificato in versione cartacea): ___</p>
<p>Data: ___</p>
<h3>5.10 Impegno “Soddisfatto o Rimborsato”</h3>
<p>Il Titolare si impegna a trovare <strong>sempre una soluzione</strong> per il Cliente: che si tratti di una sostituzione della licenza, di assistenza tecnica personalizzata o di un rimborso completo. La soddisfazione del Cliente è la priorità assoluta.</p>
<hr>
<h2>6. Garanzia sui Prodotti Digitali</h2>
<h3>6.1 Durata della garanzia</h3>
<ul>
<li><strong>Consumatori:</strong> garanzia legale di <strong>24 mesi</strong> dalla data di consegna, ai sensi degli artt. 128 e ss. del Codice del Consumo.</li>
<li><strong>Professionisti:</strong> garanzia di <strong>12 mesi</strong> dalla data di consegna, salvo diverse previsioni di legge inderogabili.</li>
</ul>
<h3>6.2 Cosa copre la garanzia</h3>
<ul>
<li>Chiave di licenza non funzionante o non valida.</li>
<li>Impossibilità di attivare il Prodotto per cause imputabili al codice fornito.</li>
<li>Difetti di conformità del Prodotto rispetto a quanto descritto sul Sito o nella conferma d'ordine.</li>
<li>Disattivazione della licenza da parte del produttore per cause non imputabili al Cliente.</li>
</ul>
<h3>6.3 Cosa non copre la garanzia</h3>
<ul>
<li>Errori di installazione o configurazione da parte del Cliente.</li>
<li>Utilizzo del software in ambienti non supportati o non conformi ai requisiti tecnici indicati dal produttore.</li>
<li>Malfunzionamenti dovuti a modifiche del sistema operativo, hardware o software del Cliente.</li>
<li>Blocchi, aggiornamenti o modifiche ai servizi del produttore (es. Microsoft, Autodesk) che esulano dal controllo del Titolare.</li>
<li>Danni derivanti da virus, malware o interventi di terzi sul dispositivo del Cliente.</li>
</ul>
<h3>6.4 Come attivare la garanzia</h3>
<p>In caso di difetto, il Cliente deve:</p>
<ol>
<li>Contattare il Servizio Clienti tramite la pagina <a href="/contact">Contatti</a> oppure via email o WhatsApp.</li>
<li>Fornire il numero d'ordine, la descrizione del problema e prove documentali (es. screenshot dell'errore).</li>
</ol>
<p>Il Titolare, a seguito delle verifiche, provvederà — a scelta del Cliente — a:</p>
<ul>
<li>Fornire una <strong>nuova chiave di licenza</strong> sostitutiva.</li>
<li>Proporre una <strong>soluzione tecnica</strong> alternativa.</li>
<li>Procedere al <strong>rimborso completo</strong> dell'importo pagato.</li>
</ul>
<hr>
<h2>7. Legittimità delle Licenze Software Usate</h2>
<h3>7.1 Base giuridica</h3>
<p>La rivendita di licenze software usate è pienamente lecita nell'Unione Europea. Il principio dell'<strong>esaurimento del diritto di distribuzione</strong> stabilisce che, una volta che una copia di un software è stata venduta con il consenso del titolare dei diritti, quest'ultimo non può opporsi a ulteriori rivendite di tale copia.</p>
<p>I principali riferimenti normativi e giurisprudenziali sono:</p>
<ul>
<li><strong>Direttiva 2009/24/CE</strong> del Parlamento Europeo e del Consiglio, del 23 aprile 2009, relativa alla tutela giuridica dei programmi per elaboratore.</li>
<li><strong>Sentenza CGUE del 3 luglio 2012, causa C-128/11</strong> (UsedSoft GmbH c. Oracle International Corp.) — la Corte ha stabilito che il diritto di distribuzione si esaurisce anche per le copie di software scaricate da internet, e che l'acquirente successivo è un "acquirente legittimo" della copia.</li>
</ul>
<h3>7.2 Garanzia di provenienza</h3>
<p>Il Titolare garantisce che ogni licenza usata venduta sul Sito:</p>
<ul>
<li>È stata <strong>originariamente acquistata in modo legittimo</strong> dal primo titolare.</li>
<li>È stata <strong>ceduta nel rispetto</strong> delle condizioni stabilite dalla normativa europea.</li>
<li><strong>Non è più in uso</strong> da parte del precedente titolare.</li>
<li>È <strong>pienamente funzionante</strong> e verificata prima della vendita.</li>
</ul>
<p>Per ulteriori dettagli sulle certificazioni e sulla provenienza delle licenze, il Cliente è invitato a consultare la pagina <a href="/help-center">Certificazioni</a> del Sito.</p>
<hr>
<h2>8. Obblighi del Cliente</h2>
<h3>8.1 Informazioni accurate</h3>
<p>Il Cliente è tenuto a fornire informazioni personali corrette e aggiornate durante il processo di acquisto, in particolare l'indirizzo email per la consegna e i dati di fatturazione. Il Titolare non è responsabile per problemi causati da informazioni errate o incomplete.</p>
<h3>8.2 Uso lecito delle licenze</h3>
<p>Il Cliente si impegna a:</p>
<ul>
<li>Utilizzare le licenze esclusivamente per scopi leciti e conformi ai termini d'uso del produttore.</li>
<li>Non rivendere, cedere, duplicare o distribuire le licenze a terzi senza autorizzazione.</li>
<li>Non installare il software su un numero di dispositivi superiore a quanto consentito dalla licenza.</li>
</ul>
<h3>8.3 Verifica dei requisiti tecnici</h3>
<p>È responsabilità del Cliente verificare la compatibilità del software con il proprio sistema operativo e le specifiche hardware del proprio dispositivo prima dell'acquisto.</p>
<h3>8.4 Segnalazione tempestiva</h3>
<p>In caso di problemi con la licenza, il Cliente è tenuto a segnalare tempestivamente il problema al Servizio Clienti, fornendo prove documentali (es. screenshot, messaggi di errore) per consentire una rapida risoluzione.</p>
<hr>
<h2>9. Protezione dei Dati Personali</h2>
<h3>9.1 Normativa di riferimento</h3>
<p>Il trattamento dei dati personali dei Clienti è effettuato in conformità al Regolamento (UE) 2016/679 ("GDPR") e al D.lgs. 196/2003 (come modificato dal D.lgs. 101/2018). Il Titolare del trattamento è DIGITALSOFT DI MUNSHI SHIHAB.</p>
<h3>9.2 Dati raccolti</h3>
<ul>
<li><strong>Dati identificativi:</strong> nome, cognome, indirizzo email, telefono, indirizzo di fatturazione.</li>
<li><strong>Dati di pagamento:</strong> gestiti esclusivamente da fornitori terzi certificati; il Titolare non memorizza dati di carte di credito.</li>
<li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di dispositivo, browser, pagine visitate e comportamento di navigazione.</li>
</ul>
<h3>9.3 Finalità del trattamento</h3>
<ul>
<li>Elaborazione e gestione degli ordini.</li>
<li>Assistenza clienti e supporto post-vendita.</li>
<li>Adempimento di obblighi fiscali, contabili e legali.</li>
<li>Comunicazioni promozionali, esclusivamente previo consenso esplicito del Cliente.</li>
</ul>
<h3>9.4 Condivisione dei dati</h3>
<p>I dati personali non sono venduti a terzi. Possono essere condivisi con fornitori di servizi strettamente necessari (gateway di pagamento, servizi di posta elettronica) e con autorità pubbliche ove richiesto dalla legge.</p>
<h3>9.5 Diritti dell'interessato</h3>
<p>Il Cliente ha diritto di accesso, rettifica, cancellazione, limitazione del trattamento, portabilità e opposizione al trattamento dei propri dati personali, nonché il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali. Per l'esercizio dei propri diritti, il Cliente può scrivere a <strong>supporto@locenvo.com</strong>.</p>
<p>Per maggiori dettagli, il Cliente è invitato a consultare la <a href="/privacy">Privacy Policy</a> e la <a href="/cookie-policy">Cookie Policy</a> disponibili nelle apposite sezioni del Sito.</p>
<hr>
<h2>10. Limitazione di Responsabilità</h2>
<p>Nei limiti consentiti dalla legge applicabile, il Titolare non è responsabile per:</p>
<ul>
<li>Danni indiretti, consequenziali, perdita di dati, mancato guadagno o interruzione dell'attività derivanti dall'uso dei Prodotti.</li>
<li>Incompatibilità del software con dispositivi, sistemi operativi o configurazioni del Cliente.</li>
<li>Malfunzionamenti, sospensioni o interruzioni dei servizi forniti da terze parti (produttori software, provider email, provider di rete).</li>
<li>Utilizzo improprio, illecito o non conforme del software da parte del Cliente.</li>
</ul>
<p>Resta ferma in ogni caso la responsabilità del Titolare per dolo o colpa grave, nonché per ogni ipotesi inderogabilmente prevista dalla legge.</p>
<hr>
<h2>11. Sospensione, Rifiuto e Annullamento degli Ordini</h2>
<p>Il Titolare si riserva il diritto di sospendere, rifiutare o annullare ordini e/o account Cliente in caso di:</p>
<ul>
<li>Sospetta frode o uso illecito.</li>
<li>Anomalie nei pagamenti o contestazioni ricorrenti e ingiustificate.</li>
<li>Violazione delle presenti CGV.</li>
</ul>
<p>In tali casi, ove sia già stato effettuato un pagamento, il Titolare potrà procedere al rimborso dell'importo pagato — compatibilmente con la normativa — oppure trattenere parzialmente le somme, nei limiti consentiti dalla legge, in caso di violazioni gravi accertate.</p>
<hr>
<h2>12. Legge Applicabile e Foro Competente</h2>
<p>Le presenti CGV sono regolate dalla <strong>legge italiana</strong>.</p>
<ul>
<li>Per le controversie con i <strong>Consumatori</strong>: è competente in via esclusiva il foro del luogo di residenza o domicilio del Consumatore, se situato nel territorio italiano, ai sensi dell'art. 66-bis del Codice del Consumo.</li>
<li>Per le controversie con i <strong>Professionisti</strong>: è competente in via esclusiva il Foro di <strong>Bologna</strong>.</li>
</ul>
<p>Il Titolare informa inoltre il Consumatore dell'esistenza della piattaforma europea per la risoluzione delle controversie online ("Piattaforma ODR"), accessibile al seguente indirizzo: <a rel="noopener" href="https://ec.europa.eu/consumers/odr" target="_blank">https://ec.europa.eu/consumers/odr</a>.</p>
<hr>
<h2>13. Accettazione Espressa delle Clausole Vessatorie</h2>
<p>Ai sensi e per gli effetti degli artt. 1341 e 1342 del Codice Civile, il Cliente dichiara di aver letto attentamente e di approvare espressamente le seguenti clausole delle presenti CGV:</p>
<ul>
<li>Art. 3.1 — Aggiornamenti dei prezzi ed errori evidenti sui prezzi</li>
<li>Art. 3.6 — Annullamento automatico degli ordini non pagati</li>
<li>Art. 3.8 — Prevenzione frodi e rifiuto transazioni</li>
<li>Art. 4.2 e 4.5 — Tempi di consegna e limitazioni di responsabilità</li>
<li>Art. 5.4 — Esclusioni del diritto di recesso per contenuti digitali</li>
<li>Art. 6.3 — Garanzia: esclusioni e limitazioni</li>
<li>Art. 8 — Obblighi del Cliente e responsabilità</li>
<li>Art. 10 — Limitazione di responsabilità del Titolare</li>
<li>Art. 11 — Sospensione, rifiuto e annullamento degli ordini</li>
<li>Art. 12 — Legge applicabile e foro competente</li>
</ul>
<hr>
<h2>14. Modifica delle Condizioni Generali di Vendita</h2>
<p>Il Titolare si riserva il diritto di modificare le presenti CGV in qualsiasi momento. Le modifiche saranno efficaci dalla data di pubblicazione sul Sito e si applicheranno esclusivamente agli ordini effettuati successivamente a tale data.</p>
<hr>
<h2>15. Contatti</h2>
<p>Per qualsiasi domanda, chiarimento o reclamo relativo alle presenti CGV o agli ordini effettuati sul Sito, il Cliente può contattare il Titolare tramite la pagina <a href="/contact">Contatti</a> o ai seguenti recapiti:</p>
<ul>
<li><strong>Email:</strong> supporto@locenvo.com</li>
<li><strong>PEC:</strong> munshishihab@legalmail.it</li>
<li><strong>Telefono / WhatsApp:</strong> +39 351 479 4187</li>
<li><strong>Indirizzo:</strong> Via Aldo Pio Manuzio 24, 40132 Bologna (BO), Italia</li>
</ul>
<p>Il Servizio Clienti è operativo dal Lunedì al Venerdì, dalle ore 08:00 alle ore 17:00.</p>
`;

export const metadata = {
  title: 'Condizioni Generali di Vendita — Licenvo',
  description: 'Condizioni generali di vendita di Licenvo - DIGITALSOFT DI MUNSHI SHIHAB.',
};

export default function TermsPage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main className="pt-16">
            <div className="max-w-4xl mx-auto px-4 py-12">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
