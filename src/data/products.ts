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
  category: 'Abbonamenti',
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
},
{
  id: '5',
  slug: 'norton-360-premium',
  name: 'Norton 360 Premium — 1 Anno 5 Dispositivi',
  nameIt: 'Norton 360 Premium — 1 Anno 5 Dispositivi',
  category: 'Antivirus',
  subcategory: 'Norton',
  platform: 'PC/Mac/Mobile',
  region: 'EU',
  originalPrice: 109.99,
  salePrice: 24.90,
  discount: 77,
  rating: 4.7,
  reviewCount: 2987,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19728715e-1778847383364.png",
  images: ['https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80'],
  instantDelivery: true,
  isBestseller: false,
  isNew: false,
  isFeatured: false,
  description: 'Norton 360 Premium for 5 devices.',
  descriptionIt: 'Norton 360 Premium per 5 dispositivi. Include VPN illimitata, Dark Web Monitoring, Cloud Backup 75 GB e protezione completa da minacce online.',
  stock: 999,
  tags: ['norton', 'antivirus', 'vpn', 'sicurezza']
},
{
  id: '6',
  slug: 'steam-gift-card-50',
  name: 'Steam Gift Card €50',
  nameIt: 'Steam Gift Card €50 — Saldo Immediato',
  category: 'Gaming Keys',
  subcategory: 'Steam',
  platform: 'PC',
  region: 'EU',
  originalPrice: 50.00,
  salePrice: 44.90,
  discount: 10,
  rating: 4.9,
  reviewCount: 8934,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d6bbc165-1772576295171.png",
  images: ['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80'],
  instantDelivery: true,
  isBestseller: true,
  isNew: false,
  isFeatured: true,
  description: 'Steam Gift Card €50 for EU region.',
  descriptionIt: 'Gift Card Steam da €50. Utilizzabile su qualsiasi gioco Steam disponibile nella regione EU. Consegna del codice immediata via email.',
  stock: 999,
  tags: ['steam', 'gaming', 'giftcard', 'valve']
},
{
  id: '7',
  slug: 'xbox-game-pass-ultimate-3mesi',
  name: 'Xbox Game Pass Ultimate — 3 Mesi',
  nameIt: 'Xbox Game Pass Ultimate — 3 Mesi',
  category: 'Gaming Keys',
  subcategory: 'Xbox',
  platform: 'Xbox/PC',
  region: 'EU',
  originalPrice: 44.99,
  salePrice: 28.90,
  discount: 36,
  rating: 4.8,
  reviewCount: 5621,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c29c675e-1773372926659.png",
  images: ['https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&q=80'],
  instantDelivery: true,
  isBestseller: true,
  isNew: false,
  isFeatured: true,
  description: 'Xbox Game Pass Ultimate 3 months.',
  descriptionIt: 'Xbox Game Pass Ultimate 3 mesi. Accesso a oltre 100 giochi di alta qualità su Xbox e PC, Xbox Live Gold e EA Play inclusi.',
  stock: 999,
  badge: 'Popolare',
  tags: ['xbox', 'gamepass', 'microsoft', 'abbonamento']
},
{
  id: '8',
  slug: 'adobe-photoshop-2025',
  name: 'Adobe Photoshop 2025 — 1 Anno',
  nameIt: 'Adobe Photoshop 2025 — Abbonamento 1 Anno',
  category: 'Abbonamenti',
  subcategory: 'Adobe',
  platform: 'PC/Mac',
  region: 'Global',
  originalPrice: 263.88,
  salePrice: 89.90,
  discount: 66,
  rating: 4.6,
  reviewCount: 1432,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1695f4bb1-1774943869392.png",
  images: ['https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80'],
  instantDelivery: true,
  isBestseller: false,
  isNew: true,
  isFeatured: false,
  description: 'Adobe Photoshop 2025 annual subscription.',
  descriptionIt: 'Abbonamento Adobe Photoshop 2025 di 1 anno. Include tutte le funzionalità AI più recenti, 100 GB di spazio cloud e accesso alle ultime versioni.',
  stock: 999,
  tags: ['adobe', 'photoshop', 'grafica', 'design']
},
{
  id: '9',
  slug: 'nordvpn-2-anni',
  name: 'NordVPN — 2 Anni + 3 Mesi Gratis',
  nameIt: 'NordVPN — 2 Anni + 3 Mesi Gratis',
  category: 'VPN',
  subcategory: 'NordVPN',
  platform: 'Tutti i dispositivi',
  region: 'Global',
  originalPrice: 286.00,
  salePrice: 67.35,
  discount: 76,
  rating: 4.8,
  reviewCount: 7823,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19853a26d-1774943869835.png",
  images: ['https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80'],
  instantDelivery: true,
  isBestseller: false,
  isNew: false,
  isFeatured: false,
  description: 'NordVPN 2 years + 3 months free.',
  descriptionIt: 'NordVPN 2 anni + 3 mesi gratis. 6 connessioni simultanee, 5.600+ server in 60 paesi, nessun log delle attività, protezione da malware inclusa.',
  stock: 999,
  tags: ['nordvpn', 'vpn', 'privacy', 'sicurezza']
},
{
  id: '10',
  slug: 'playstation-plus-essential-12-mesi',
  name: 'PlayStation Plus Essential — 12 Mesi',
  nameIt: 'PlayStation Plus Essential — 12 Mesi',
  category: 'Gaming Keys',
  subcategory: 'PlayStation',
  platform: 'PS4/PS5',
  region: 'IT',
  originalPrice: 59.99,
  salePrice: 38.90,
  discount: 35,
  rating: 4.7,
  reviewCount: 9123,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19cb2e9a8-1776134159603.png",
  images: ['https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&q=80'],
  instantDelivery: true,
  isBestseller: true,
  isNew: false,
  isFeatured: false,
  description: 'PlayStation Plus Essential 12 months.',
  descriptionIt: 'PlayStation Plus Essential 12 mesi per PS4 e PS5. Giochi mensili gratuiti, multiplayer online, sconti esclusivi PlayStation Store.',
  stock: 999,
  tags: ['playstation', 'psplus', 'sony', 'ps5']
},
{
  id: '11',
  slug: 'mcafee-total-protection-2025',
  name: 'McAfee Total Protection 2025 — 5 Dispositivi',
  nameIt: 'McAfee Total Protection 2025 — 5 Dispositivi 1 Anno',
  category: 'Antivirus',
  subcategory: 'McAfee',
  platform: 'PC/Mac/Mobile',
  region: 'EU',
  originalPrice: 89.99,
  salePrice: 22.90,
  discount: 75,
  rating: 4.5,
  reviewCount: 1876,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1282d4ac8-1776545993525.png",
  images: ['https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80'],
  instantDelivery: true,
  isBestseller: false,
  isNew: false,
  isFeatured: false,
  description: 'McAfee Total Protection 2025 for 5 devices.',
  descriptionIt: 'McAfee Total Protection 2025 per 5 dispositivi. Protezione antivirus, firewall, VPN, gestore password e monitoraggio identità inclusi.',
  stock: 999,
  tags: ['mcafee', 'antivirus', 'sicurezza', 'protezione']
},
{
  id: '12',
  slug: 'ea-sports-fc-25-pc',
  name: 'EA Sports FC 25 — PC Steam Key',
  nameIt: 'EA Sports FC 25 — Chiave PC Steam',
  category: 'Gaming Keys',
  subcategory: 'EA',
  platform: 'PC',
  region: 'Global',
  originalPrice: 79.99,
  salePrice: 49.90,
  discount: 38,
  rating: 4.3,
  reviewCount: 3241,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19db62a53-1774518462754.png",
  images: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80'],
  instantDelivery: true,
  isBestseller: false,
  isNew: true,
  isFeatured: false,
  description: 'EA Sports FC 25 PC Steam Key.',
  descriptionIt: 'EA Sports FC 25 chiave Steam per PC. Il simulatore calcistico più amato al mondo con Ultimate Team, modalità carriera e molto altro.',
  stock: 999,
  badge: 'Nuovo',
  tags: ['ea', 'calcio', 'sports', 'steam', 'gaming']
}];


export const categories = [
{
  id: 'windows-office',
  name: 'Windows & Office',
  nameIt: 'Windows & Office',
  icon: 'WindowIcon',
  color: '#3B82F6',
  gradient: 'from-blue-600/20 to-blue-400/10',
  count: 24,
  slug: 'windows-office'
},
{
  id: 'abbonamenti',
  name: 'Subscriptions',
  nameIt: 'Abbonamenti',
  icon: 'CreditCardIcon',
  color: '#A855F7',
  gradient: 'from-purple-600/20 to-purple-400/10',
  count: 31,
  slug: 'abbonamenti'
},
{
  id: 'antivirus',
  name: 'Antivirus',
  nameIt: 'Antivirus',
  icon: 'ShieldCheckIcon',
  color: '#10B981',
  gradient: 'from-emerald-600/20 to-emerald-400/10',
  count: 18,
  slug: 'antivirus'
},
{
  id: 'gaming',
  name: 'Gaming Keys',
  nameIt: 'Gaming Keys',
  icon: 'PuzzlePieceIcon',
  color: '#F59E0B',
  gradient: 'from-amber-600/20 to-amber-400/10',
  count: 156,
  slug: 'gaming'
},
{
  id: 'vpn',
  name: 'VPN',
  nameIt: 'VPN & Privacy',
  icon: 'LockClosedIcon',
  color: '#06B6D4',
  gradient: 'from-cyan-600/20 to-cyan-400/10',
  count: 12,
  slug: 'vpn'
},
{
  id: 'adobe',
  name: 'Adobe & Creative',
  nameIt: 'Adobe & Creatività',
  icon: 'SparklesIcon',
  color: '#EC4899',
  gradient: 'from-pink-600/20 to-pink-400/10',
  count: 9,
  slug: 'adobe'
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