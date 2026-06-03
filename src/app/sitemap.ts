

export default function sitemap():  {
  const base = import.meta.env.VITE_SITE_URL ?? 'https://licenvo.it' || 'http://localhost:3000';
  return [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/product-catalog`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/product-detail`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/help-center`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/privacy`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/terms`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/refund`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/cookie-policy`, lastModified: new Date(), priority: 0.3 },
  ];
}