# Licenvo — Headless Shopify Storefront

Stack: **Vite + React 19 + TailwindCSS 4 + TypeScript + Shopify Storefront API**

## Setup rapido

```bash
git clone https://github.com/munshishihab04-rgb/Hermesversion.git
cd Hermesversion
npm install
```

## Variabili d ambiente

Crea un file `.env` nella root:

```env
VITE_SHOPIFY_STORE_DOMAIN=licenvo.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=il_tuo_token_storefront
```

## Avvio in sviluppo

```bash
npm run dev
```

## Build produzione

```bash
PORT=3000 BASE_PATH=/ npm run build
```

La build viene generata in `dist/`.

## Avvio con PM2 (EC2)

```bash
npm install -g pm2
pm2 start "npm run preview -- --port 3000 --host" --name licenvo-v2
pm2 save
```

## Struttura del progetto

```
src/
├── app/                    # Pagine e componenti di pagina
│   ├── components/         # HeroSection, CategoryGrid, ecc.
│   ├── product-catalog/    # Pagina catalogo
│   ├── product-detail/     # Pagina prodotto
│   └── ...                 # Pagine legali (privacy, termini, ecc.)
├── components/             # Componenti globali
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HoppyTrustBadges.tsx
│   └── ui/                 # Shadcn components
├── context/                # CartContext, WishlistContext
├── hooks/                  # useShopifyProducts, ecc.
├── lib/
│   └── shopify.ts          # Client Storefront API
└── data/
    └── products.ts         # Prodotti mock fallback
```

## API Shopify

Il file `src/lib/shopify.ts` contiene tutte le query GraphQL:
- `getProducts()` — lista prodotti con varianti e selling plans
- `getProductById(id)` — prodotto singolo
- `getSellingPlans(productId)` — piani abbonamento Mensile/Triennale

## Design

- Primary: `#0052CC` (blu tech)
- Accent: `#FF6B35` (arancione CTA)
- Font: Inter 800/900 per titoli
- Logo: SVG inline `src/components/ui/LogoIcon.tsx`
