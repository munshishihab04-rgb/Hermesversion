import express from "express";
import helmet from "helmet";
import { readFileSync } from "fs";
import { resolve, join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST = resolve(__dirname, "dist/public");
const INDEX_HTML = readFileSync(join(DIST, "index.html"), "utf-8");
const PORT = parseInt(process.env.PORT || "3000");

// Bot detection
const BOT_UA = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegrambot|google-inspectiontool|google-structured-data|adsbot-google|mediapartners-google|googleother|storebot-google/i;

// Shopify Storefront API for product data
const SHOPIFY_DOMAIN = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env["VITE_SHOPIFY_STOREFRONT_TOKEN"];
const SHOPIFY_VERSION = process.env.VITE_SHOPIFY_API_VERSION || "2025-01";

async function fetchProductByHandle(handle) {
  if (!handle || !SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) return null;
  try {
    const res = await fetch("https://" + SHOPIFY_DOMAIN + "/api/" + SHOPIFY_VERSION + "/graphql.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({
        query: "query($handle: String!) { productByHandle(handle: $handle) { title description productType vendor tags featuredImage { url altText } priceRange { minVariantPrice { amount currencyCode } } compareAtPriceRange { maxVariantPrice { amount currencyCode } } variants(first: 3) { nodes { title sku barcode availableForSale price { amount currencyCode } compareAtPrice { amount currencyCode } } } } }",
        variables: { handle },
      }),
    });
    const json = await res.json();
    return json?.data?.productByHandle || null;
  } catch (e) {
    console.error("Shopify fetch error:", e.message);
    return null;
  }
}

// SEO metadata per route
const ROUTE_META = {
  "/": {
    title: "Licenvo \u2014 Licenze Software Originali al Miglior Prezzo",
    description: "Acquista licenze software digitali per Windows, Office, Autodesk e antivirus con consegna istantanea. Prezzi competitivi. Garanzia soddisfatti o rimborsati.",
    h1: "Licenze Software Originali al Miglior Prezzo",
  },
  "/product-catalog": {
    title: "Catalogo Software \u2014 Licenvo",
    description: "Sfoglia il catalogo completo di licenze Windows, Office, Autodesk e antivirus a prezzi scontati.",
    h1: "Catalogo Licenze Software",
  },
  "/autodesk-collections": {
    title: "Autodesk Collections \u2014 Licenvo",
    description: "Abbonamenti Autodesk AEC, PD&M e M&E Collection a prezzi competitivi. AutoCAD, Revit, Inventor e pi\u00f9.",
    h1: "Collezioni Autodesk",
  },
  "/autodesk-collections/aec": {
    title: "Autodesk AEC Collection 2025 — Architettura, Ingegneria & Costruzioni | Licenvo",
    description: "Autodesk AEC Collection: AutoCAD, Revit, Civil 3D, Navisworks. Piano mensile da €49,99. Consegna digitale immediata.",
    h1: "Autodesk AEC Collection",
  },
  "/autodesk-collections/pdm": {
    title: "Autodesk PD&M Collection 2025 — Progettazione e Manifattura | Licenvo",
    description: "Autodesk PD&M Collection: Inventor, Fusion, AutoCAD, Vault Professional. Piano mensile da €49,99.",
    h1: "Autodesk PD&M Collection",
  },
  "/autodesk-collections/me": {
    title: "Autodesk M&E Collection 2025 — Media & Entertainment | Licenvo",
    description: "Autodesk M&E Collection: Maya, 3ds Max, Arnold, Mudbox. Piano mensile da €49,99. Animazione 3D e VFX.",
    h1: "Autodesk M&E Collection",
  },
  "/faq": {
    title: "Domande Frequenti (FAQ) \u2014 Licenvo",
    description: "Risposte alle domande pi\u00f9 frequenti su acquisto licenze, attivazione, pagamenti e assistenza Licenvo.",
    h1: "Domande Frequenti",
  },
  "/contact": {
    title: "Contattaci \u2014 Licenvo",
    description: "Assistenza clienti Licenvo. Email, WhatsApp, PEC. Rispondiamo entro 2 ore lavorative.",
    h1: "Contattaci",
  },
  "/help-center": {
    title: "Centro Assistenza \u2014 Licenvo",
    description: "Guide, tutorial e assistenza per attivazione licenze, problemi tecnici e gestione ordini.",
    h1: "Centro Assistenza",
  },
  "/assistenza": {
    title: "Centro Assistenza \u2014 Licenvo",
    description: "Guide, tutorial e assistenza per attivazione licenze, problemi tecnici e gestione ordini.",
    h1: "Centro Assistenza",
  },
  "/privacy": {
    title: "Privacy Policy \u2014 Licenvo",
    description: "Informativa sulla privacy di Licenvo. Come trattiamo i tuoi dati personali in conformit\u00e0 al GDPR.",
    h1: "Privacy Policy",
  },
  "/terms": {
    title: "Condizioni di Vendita \u2014 Licenvo",
    description: "Condizioni generali di vendita per acquisti di licenze software su Licenvo.com. DIGITALSOFT DI MUNSHI SHIHAB.",
    h1: "Condizioni Generali di Vendita",
  },
  "/refund": {
    title: "Politica di Rimborso e Reso | Licenvo",
    description: "Garanzia soddisfatti o rimborsati entro 14 giorni. Sostituzione gratuita per chiavi non funzionanti. Assistenza dedicata in italiano.",
    h1: "Politica di Rimborso e Reso",
  },
  "/cookie-policy": {
    title: "Cookie Policy \u2014 Licenvo",
    description: "Informativa sui cookie utilizzati da licenvo.com in conformit\u00e0 al GDPR e Garante Privacy.",
    h1: "Cookie Policy",
  },
  "/shipping": {
    title: "Spedizione e Consegna Digitale Gratuita | Licenvo",
    description: "Consegna digitale istantanea via email. Ricevi la tua licenza software in pochi minuti. Spedizione gratuita su tutti i prodotti Licenvo.",
    h1: "Spedizione e Consegna Digitale Gratuita",
  },
  "/legal": {
    title: "Note Legali \u2014 Licenvo",
    description: "Informazioni legali su DIGITALSOFT DI MUNSHI SHIHAB. P.IVA IT04358941203, sede Bologna.",
    h1: "Note Legali",
  },
  "/about": {
    title: "Chi Siamo \u2014 Licenvo",
    description: "DIGITALSOFT DI MUNSHI SHIHAB \u2014 Vendita licenze software originali dal 2020. Sede a Bologna, Italia.",
    h1: "Chi Siamo",
  },
  "/fatturazione": {
    title: "Fatturazione \u2014 Licenvo",
    description: "Informazioni sulla fatturazione elettronica per acquisti su Licenvo. Fattura disponibile per aziende e privati.",
    h1: "Fatturazione",
  },
  "/windows": {
    title: "Licenze Windows 10 e 11 al Miglior Prezzo | Licenvo",
    description: "Licenze digitali Windows 10 Home, Windows 10 Pro, Windows 11 Home, Windows 11 Pro. Consegna istantanea. Da \u20ac29,99.",
    h1: "Licenze Windows",
  },
  "/office": {
    title: "Microsoft Office 2021, 2024 e Microsoft 365 | Licenvo",
    description: "Licenze Office 2021, Office 2024, Microsoft 365 Personal e Family. ESD originali. Da \u20ac29,99.",
    h1: "Microsoft Office",
  },
  "/bundles": {
    title: "Bundle Windows + Office al Miglior Prezzo | Licenvo",
    description: "Bundle conveniente Windows 11 Pro + Office 2021 o 2024. Licenze ESD originali. Da \u20ac84,99.",
    h1: "Bundle Software",
  },
  "/visio-project": {
    title: "Microsoft Visio e Project 2021 | Licenvo",
    description: "Licenze Visio Professional, Visio Standard, Project Professional e Project Standard 2021. Da \u20ac164,99.",
    h1: "Visio & Project",
  },
  "/antivirus": {
    title: "Antivirus Kaspersky, ESET, Bitdefender | Licenvo",
    description: "Kaspersky Standard, Plus, Premium. ESET NOD32, Internet Security. Da \u20ac9,99.",
    h1: "Antivirus & Sicurezza",
  },
};

function escHtml(s) {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildHtml(url, meta, productData) {
  const qIdx = url.indexOf("?");
  const hasHandle = url.includes("?handle=");
  const canonical = "https://licenvo.com" + (hasHandle ? url : (qIdx > -1 ? url.substring(0, qIdx) : url));

  // Determine og:type based on product data or Autodesk collection detail pages
  const isCollectionDetailPage = url.startsWith("/autodesk-collections/") && url.split("/").filter(Boolean).length === 2;
  const ogType = (productData || isCollectionDetailPage) ? "product" : "website";
  const ogImage = productData && productData.featuredImage?.url ? productData.featuredImage.url : "https://licenvo.com/opengraph.jpg";

  // Build structured content for bots
  let bodyContent = "";
  if (meta.h1) {
    bodyContent += "<h1>" + escHtml(meta.h1) + "</h1>";
  }
  if (meta.description) {
    bodyContent += "<p>" + escHtml(meta.description) + "</p>";
  }

  // Product-specific JSON-LD and content
  let jsonLd = "";
  let productMetaTags = "";
  if (productData) {
    const price = productData.priceRange?.minVariantPrice?.amount || "0";
    const currency = productData.priceRange?.minVariantPrice?.currencyCode || "EUR";
    const available = productData.variants?.nodes?.some(function(v) { return v.availableForSale; }) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";

    // Product OG meta tags for price
    productMetaTags = '<meta property="product:price:amount" content="' + escHtml(price) + '"/>\n';
    productMetaTags += '<meta property="product:price:currency" content="' + escHtml(currency) + '"/>\n';

    bodyContent += '<div itemscope itemtype="https://schema.org/Product">';
    bodyContent += '<h1 itemprop="name">' + escHtml(productData.title) + '</h1>';
    bodyContent += '<p itemprop="description">' + escHtml(productData.description || "") + '</p>';
    if (productData.vendor) bodyContent += '<span itemprop="brand">' + escHtml(productData.vendor) + '</span>';
    if (productData.featuredImage?.url) bodyContent += '<img itemprop="image" src="' + escHtml(productData.featuredImage.url) + '" alt="' + escHtml(productData.featuredImage.altText || productData.title) + '">';
    bodyContent += '<div itemprop="offers" itemscope itemtype="https://schema.org/Offer">';
    bodyContent += '<span itemprop="price" content="' + price + '">\u20AC' + parseFloat(price).toFixed(2).replace(".", ",") + '</span>';
    bodyContent += '<meta itemprop="priceCurrency" content="EUR">';
    bodyContent += '<link itemprop="availability" href="' + available + '">';
    bodyContent += '</div></div>';

    jsonLd = '<script type="application/ld+json">' + JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: productData.title,
      description: productData.description,
      brand: productData.vendor ? { "@type": "Brand", name: productData.vendor } : undefined,
      image: productData.featuredImage?.url,
      sku: productData.variants?.nodes?.[0]?.sku || productData.handle,
      mpn: productData.handle,
      gtin13: productData.variants?.nodes?.[0]?.barcode || undefined,
      category: "Software > Computer Software",
      offers: {
        "@type": "Offer",
        url: "https://licenvo.com" + url,
        price: typeof price === "string" ? price : price.toFixed(2),
        priceValidUntil: new Date(Date.now() + 365*24*60*60*1000).toISOString().split("T")[0],
        priceCurrency: "EUR",
        availability: available,
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: "Licenvo" },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "EUR" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "IT" },
          deliveryTime: { "@type": "ShippingDeliveryTime", handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "MIN" }, transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 5, unitCode: "MIN" } },
        },
      },
    }) + '</script>';

    // BreadcrumbList JSON-LD
    const breadcrumbLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://licenvo.com" },
        { "@type": "ListItem", position: 2, name: "Catalogo", item: "https://licenvo.com/product-catalog" },
        { "@type": "ListItem", position: 3, name: productData.title, item: "https://licenvo.com" + url },
      ],
    });
    jsonLd += '<script type="application/ld+json">' + breadcrumbLd + '</script>';
  }

  // Organization JSON-LD for homepage
  let orgLd = "";
  if (url === "/") {
    orgLd = '<script type="application/ld+json">' + JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Licenvo",
      legalName: "DIGITALSOFT DI MUNSHI SHIHAB",
      url: "https://licenvo.com",
      logo: "https://licenvo.com/opengraph.jpg",
      contactPoint: { "@type": "ContactPoint", telephone: "+39-393-684-1051", contactType: "customer service", availableLanguage: "Italian" },
      address: { "@type": "PostalAddress", streetAddress: "Via Aldo Pio Manuzio 24", addressLocality: "Bologna", postalCode: "40132", addressCountry: "IT" },
      vatID: "IT04358941203",
    }) + '</script>';

    // WebSite schema with SearchAction
    const websiteLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Licenvo",
      url: "https://licenvo.com",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://licenvo.com/product-catalog?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    });
    orgLd += '<script type="application/ld+json">' + websiteLd + '</script>';
  }


  // FAQ JSON-LD for /faq page
  let faqLd = "";
  if (url.split("?")[0] === "/faq") {
    const faqJsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Come ricevo la licenza dopo il pagamento?", acceptedAnswer: { "@type": "Answer", text: "Dopo la conferma del pagamento ricevi la chiave di licenza via email entro pochi minuti per Microsoft e Kaspersky, entro 24 ore per Autodesk." } },
        { "@type": "Question", name: "Le licenze sono compatibili con il mio PC?", acceptedAnswer: { "@type": "Answer", text: "Sì, le licenze digitali sono compatibili con PC Windows 10 e Windows 11. Le licenze Mac sono disponibili per prodotti specifici indicati nella descrizione." } },
        { "@type": "Question", name: "Posso ottenere un rimborso?", acceptedAnswer: { "@type": "Answer", text: "Sì, offriamo garanzia di 30 giorni. Se la chiave non funziona, la sostituiamo gratuitamente o rimborsiamo entro 5-10 giorni lavorativi." } },
        { "@type": "Question", name: "Che differenza c'è tra licenza ESD e OEM?", acceptedAnswer: { "@type": "Answer", text: "La licenza ESD (Electronic Software Download) è legata al tuo account Microsoft e trasferibile. La licenza OEM è legata all'hardware del PC e non è trasferibile ad altro computer." } },
        { "@type": "Question", name: "Come funziona l'abbonamento Autodesk?", acceptedAnswer: { "@type": "Answer", text: "L'abbonamento Autodesk viene assegnato al tuo account Autodesk esistente o nuovo. Scegli Mensile o Triennale. L'accesso è immediato dopo l'assegnazione." } }
      ]
    });
    faqLd = '<script type="application/ld+json">' + faqJsonLd + '</script>';
  }

  // Replace head section with proper meta for this route
  let html = INDEX_HTML;

  // Replace title
  html = html.replace(/<title>[^<]*<\/title>/, "<title>" + escHtml(meta.title) + "</title>");

  // Replace meta description
  html = html.replace(/name="description" content="[^"]*"/, 'name="description" content="' + escHtml(meta.description) + '"');

  // Replace canonical
  html = html.replace(/rel="canonical" href="[^"]*"/, 'rel="canonical" href="' + canonical + '"');

  // Replace OG tags
  html = html.replace(/property="og:title" content="[^"]*"/, 'property="og:title" content="' + escHtml(meta.title) + '"');
  html = html.replace(/property="og:description" content="[^"]*"/, 'property="og:description" content="' + escHtml(meta.description) + '"');
  html = html.replace(/property="og:type" content="[^"]*"/, 'property="og:type" content="' + ogType + '"');
  html = html.replace(/property="og:image" content="[^"]*"/, 'property="og:image" content="' + escHtml(ogImage) + '"');

  // Add og:image:width, og:image:height, og:url before </head>
  const ogExtraTags =
    '<meta property="og:image:width" content="1200"/>\n' +
    '<meta property="og:image:height" content="630"/>\n' +
    '<meta property="og:url" content="' + escHtml(canonical) + '"/>\n';
  html = html.replace("</head>", ogExtraTags + "</head>");

  // Inject product meta tags and JSON-LD before </head>
  const headInject = productMetaTags + jsonLd + orgLd + faqLd;
  if (headInject) {
    html = html.replace("</head>", headInject + "\n</head>");
  }


  // Inject hreflang tags
  html = html.replace('</head>',
    `<link rel="alternate" hreflang="it" href="${canonical}"/>\n` +
    `<link rel="alternate" hreflang="x-default" href="${canonical}"/>\n` +
    '</head>'
  );

  // JSON-LD is in <head> via headInject — no hidden div needed

  return html;
}

const app = express();

// Static files first (hashed assets with long cache)
app.use("/assets", express.static(join(DIST, "assets"), {
  maxAge: "365d",
  immutable: true,
}));

// Non-hashed static files
app.use(express.static(DIST, {
  index: false,
  maxAge: "1h",
}));

// Security headers
app.use(helmet({
  contentSecurityPolicy: false,        // gestito da nginx
  hsts: false,                          // gestito da nginx
  frameguard: false,                    // gestito da nginx (X-Frame-Options)
  noSniff: false,                       // gestito da nginx (X-Content-Type-Options)
  referrerPolicy: false,                // gestito da nginx
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  // Lascia attivi solo quelli non gestiti da nginx:
  // xPoweredBy (rimuove X-Powered-By)
  // ieNoOpen
  // dnsPrefetchControl
  // permittedCrossDomainPolicies
}));

// All routes - SPA fallback with bot detection

// Redirect /products/:handle to /product-detail?handle= for non-bot users
// Bots get served by the wildcard handler with full SSR
app.get("/products/:handle", (req, res, next) => {
  const ua = req.headers["user-agent"] || "";
  const isBot = BOT_UA.test(ua);
  if (!isBot) {
    return res.redirect(301, "/product-detail?handle=" + encodeURIComponent(req.params.handle));
  }
  next(); // Bots fall through to wildcard for SSR
});

// Redirect /collections/:handle to /product-catalog for non-bot users
app.get("/collections/:handle", (req, res, next) => {
  const ua = req.headers["user-agent"] || "";
  const isBot = BOT_UA.test(ua);
  if (!isBot) {
    return res.redirect(301, "/product-catalog");
  }
  next();
});

app.get("/{*splat}", async (req, res) => {
  const ua = req.headers["user-agent"] || "";
  const isBot = BOT_UA.test(ua);
  const reqPathname = req.path;
  const isProductPath = reqPathname === "/product-detail" || reqPathname.startsWith("/products/");
  const isKnownSpaRoute = !!ROUTE_META[reqPathname] || isProductPath;

  if (!isBot) {
    // Normal users get plain SPA, but with proper 404 status for unknown routes
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "no-cache");
    if (!isKnownSpaRoute) {
      res.status(404);
      res.setHeader("X-Robots-Tag", "noindex, nofollow");
    }
    return res.send(INDEX_HTML);
  }

  // Bot path - generate rich HTML
  const url = req.originalUrl;
  const pathname = url.split("?")[0];
  const params = new URLSearchParams(url.split("?")[1] || "");

  let meta = ROUTE_META[pathname];
  let productData = null;

  // Product pages - support both /product-detail?handle=X and /products/HANDLE (Shopify standard)
  let productHandle = null;
  const productsMatch = pathname.match(/^\/products\/([^/?]+)/);
  if (productsMatch) {
    productHandle = productsMatch[1];
  } else if (pathname === "/product-detail") {
    productHandle = params.get("handle");
  }

  if (productHandle) {
    productData = await fetchProductByHandle(productHandle);
    if (productData) {
      meta = {
        title: productData.title + " \u2014 Licenvo",
        description: (productData.description || "").slice(0, 160) || ("Acquista " + productData.title + " su Licenvo con consegna istantanea."),
        h1: productData.title,
      };
    }
  }

  // 404 per route non valide (non prodotti, non in ROUTE_META)
  const isKnownRoute = !!ROUTE_META[pathname] || !!productHandle;
  if (!isKnownRoute) {
    meta = {
      title: "Pagina non trovata — Licenvo",
      description: "La pagina richiesta non esiste.",
      h1: "Pagina non trovata",
    };
    const html404 = buildHtml(url, meta, null);
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    return res.status(404).send(html404);
  }

  // Fallback meta
  if (!meta) {
    meta = ROUTE_META["/"];
  }

  const html = buildHtml(url, meta, productData);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "public, max-age=300");
  res.send(html);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Licenvo SSR server running on port " + PORT);
});
