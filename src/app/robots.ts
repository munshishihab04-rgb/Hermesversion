

export default function robots():  {
  const base = import.meta.env.VITE_SITE_URL ?? 'https://licenvo.it' || 'http://localhost:3000';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}