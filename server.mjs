import express from "express";
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
        query: "query($handle: String!) { productByHandle(handle: $handle) { title description productType vendor tags featuredImage { url altText } priceRange { minVariantPrice { amount currencyCode } } compareAtPriceRange { maxVariantPrice { amount currencyCode } } variants(first: 3) { nodes { title barcode availableForSale price { amount currencyCode } compareAtPrice { amount currencyCode } } } } }",
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
    description: "Acquista licenze software originali Windows, Office, Autodesk e antivirus con consegna istantanea. Risparmia fino al 92%. Garanzia soddisfatti o rimborsati.",
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
};

function escHtml(s) {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildHtml(url, meta, productData) {
  const qIdx = url.indexOf("?");
  const hasHandle = url.includes("?handle=");
  const canonical = "https://licenvo.com" + (hasHandle ? url : (qIdx > -1 ? url.substring(0, qIdx) : url));

  // Determine og:type and og:image based on product data
  const ogType = productData ? "product" : "website";
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
      gtin13: productData.variants?.nodes?.[0]?.barcode || undefined,
      category: "Software > Computer Software",
      offers: {
        "@type": "Offer",
        url: "https://licenvo.com" + url,
        price: price,
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

  // Inject product meta tags and JSON-LD before </head>
  const headInject = productMetaTags + jsonLd + orgLd;
  if (headInject) {
    html = html.replace("</head>", headInject + "\n</head>");
  }

  // Inject content inside #root for bots (hidden from visual rendering, visible to crawlers)
  html = html.replace('<div id="root"></div>', '<div id="root"><div id="ssr-content" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden">' + bodyContent + '</div></div>');

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

  if (!isBot) {
    // Normal users get plain SPA
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "no-cache");
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
