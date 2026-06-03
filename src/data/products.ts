export interface Product {
  id: string;
  slug: string;
  name: string;
  nameIt: string;
  category: string;
  subcategory: string;
  platform: string;
  region: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  instantDelivery: boolean;
  isBestseller: boolean;
  isNew: boolean;
  isFeatured: boolean;
  description: string;
  descriptionIt: string;
  stock: number;
  badge?: string;
  tags: string[];
  variantId?: string;
  // Metafield data
  softwareBrand?: string;
  softwareCategory?: string;
  licenseType?: string;
  subscriptionDuration?: string;
  deliveryMethod?: string;
  activationType?: string;
  compatibility?: string;
  devicesSupported?: string;
  language?: string;
  updates?: string;
  support?: string;
  warranty?: string;
  systemRequirements?: string;
  downloadGuide?: string;
  commercialUse?: string;
  productFormat?: string;
  officialDownload?: string;
  softwareFeatures?: string;
  deliveryTime?: string;
  shortDescription?: string;
  cardPlatform?: string;
  cardCategory?: string;
  cardLicenseType?: string;
  cardLanguage?: string;
  cardSupport?: string;
  badge1?: string;
  badge2?: string;
  badge3?: string;
  activationStep1Title?: string;
  activationStep1Text?: string;
  activationStep2Title?: string;
  activationStep2Text?: string;
  activationStep3Title?: string;
  activationStep3Text?: string;
  activationStep4Title?: string;
  activationStep4Text?: string;
  accountAssignment?: string;
  checkoutEmailRequired?: string;
  refundPolicyLabel?: string;
}

export const products: Product[] = [
{
  id: '1',
  slug: 'windows-11-pro',
  name: 'Windows 11 Pro',
  nameIt: 'Windows 11 Pro — Licenza Originale',
  category: 'Windows & Office',
  subcategory: 'Windows',
  platform: 'PC',
  region: 'Global',
  originalPrice: 259.00,
  salePrice: 19.90,
  discount: 92,
  rating: 4.8,
  reviewCount: 3847,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ecbeb962-1773804716277.png",
  images: [
  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80'],

  instantDelivery: true,
  isBestseller: true,
  isNew: false,
  isFeatured: true,
  description: 'Genuine Windows 11 Pro license key. Full retail activation.',
  descriptionIt: 'Licenza originale Windows 11 Pro. Attivazione retail completa. Aggiornamenti gratuiti a vita, BitLocker, Hyper-V e Remote Desktop inclusi. Compatibile con PC a 64-bit.',
  stock: 999,
  badge: 'Più Venduto',
  tags: ['windows', 'microsoft', 'os', 'pro']
},
{
  id: '2',
  slug: 'microsoft-office-2021-home',
  name: 'Microsoft Office 2021 Home & Business',
  nameIt: 'Microsoft Office 2021 Home & Business',
  category: 'Windows & Office',
  subcategory: 'Office',
  platform: 'PC/Mac',
  region: 'Global',
  originalPrice: 299.00,
  salePrice: 34.90,
  discount: 88,
  rating: 4.7,
  reviewCount: 2156,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_181fdf16f-1776124181031.png",
  images: [
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80'],

  instantDelivery: true,
  isBestseller: true,
  isNew: false,
  isFeatured: true,
  description: 'Microsoft Office 2021 Home & Business for PC and Mac.',
  descriptionIt: 'Suite completa Microsoft Office 2021 con Word, Excel, PowerPoint, Outlook. Licenza perpetua per 1 PC o Mac. Nessun abbonamento richiesto.',
  stock: 999,
  badge: 'Offerta',
  tags: ['office', 'microsoft', 'word', 'excel', 'powerpoint']
},
{
  id: '3',
  slug: 'microsoft-365-personal',
  name: 'Microsoft 365 Personal — 1 Anno',
  nameIt: 'Microsoft 365 Personal — Abbonamento 1 Anno',
  category: 'Windows & Office',
  subcategory: 'Microsoft 365',
  platform: 'PC/Mac/Mobile',
  region: 'Global',
  originalPrice: 69.99,
  salePrice: 42.90,
  discount: 39,
  rating: 4.6,
  reviewCount: 1823,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13c33d0fa-1776124212149.png",
  images: ['https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80'],
  instantDelivery: true,
  isBestseller: false,
  isNew: false,
  isFeatured: true,
  description: 'Microsoft 365 Personal 1-year subscription.',
  descriptionIt: 'Abbonamento Microsoft 365 Personal di 1 anno. Include le ultime versioni di Word, Excel, PowerPoint, Outlook. 1 TB di spazio OneDrive incluso.',
  stock: 999,
  tags: ['microsoft365', 'abbonamento', 'cloud', 'office']
},
{
  id: '4',
  slug: 'kaspersky-total-security-2025',
  name: 'Kaspersky Total Security 2025 — 1 Anno 3 PC',
  nameIt: 'Kaspersky Total Security 2025 — 1 Anno 3 Dispositivi',
  category: 'Antivirus',
  subcategory: 'Kaspersky',
  platform: 'PC/Mac/Android',
  region: 'EU',
  originalPrice: 79.99,
  salePrice: 18.90,
  discount: 76,
  rating: 4.9,
  reviewCount: 4201,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e82a11f8-1778847383366.png",
  images: ['https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80'],
  instantDelivery: true,
  isBestseller: true,
  isNew: false,
  isFeatured: true,
  description: 'Kaspersky Total Security 2025 for 3 devices.',
  descriptionIt: 'Protezione completa Kaspersky Total Security 2025 per 3 dispositivi. Antivirus, anti-ransomware, VPN, gestore password e controllo parentale inclusi.',
  stock: 999,
  badge: 'Top Sicurezza',
  tags: ['kaspersky', 'antivirus', 'sicurezza', 'vpn']
}];


export const categories = [
{
  id: 'windows-office',
  name: 'Windows & Office',
  nameIt: 'Windows & Office',
  icon: 'WindowIcon',
  color: '#3B82F6',
  gradient: 'from-blue-600/20 to-blue-400/10',
  count: 15,
  slug: 'windows-office'
},
{
  id: 'autodesk',
  name: 'Autodesk',
  nameIt: 'Autodesk',
  icon: 'CubeIcon',
  color: '#0052CC',
  gradient: 'from-blue-700/20 to-blue-500/10',
  count: 35,
  slug: 'autodesk'
},
{
  id: 'antivirus',
  name: 'Antivirus',
  nameIt: 'Antivirus & Sicurezza',
  icon: 'ShieldCheckIcon',
  color: '#10B981',
  gradient: 'from-emerald-600/20 to-emerald-400/10',
  count: 3,
  slug: 'antivirus'
}];


export const getProductById = (id: string): Product | undefined =>
products.find((p) => p.id === id);

export const getProductBySlug = (slug: string): Product | undefined =>
products.find((p) => p.slug === slug);

export const getFeaturedProducts = (): Product[] =>
products.filter((p) => p.isFeatured);

export const getBestsellers = (): Product[] =>
products.filter((p) => p.isBestseller);

export const getNewArrivals = (): Product[] =>
products.filter((p) => p.isNew);

export const getProductsByCategory = (category: string): Product[] =>
products.filter((p) => p.category === category);

export const getRelatedProducts = (product: Product, limit = 4): Product[] =>
products.
filter((p) => p.id !== product.id && p.category === product.category).
slice(0, limit);