const DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string;
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string;
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION as string;

const endpoint = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message ?? 'GraphQL error');
  return json.data as T;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  featuredImage: { url: string; altText: string | null } | null;
  images: { nodes: Array<{ url: string; altText: string | null }> };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange: { maxVariantPrice: { amount: string; currencyCode: string } };
  variants: {
    nodes: Array<{
      id: string;
      title: string;
      price: { amount: string; currencyCode: string };
      compareAtPrice: { amount: string; currencyCode: string } | null;
      availableForSale: boolean;
    }>;
  };
  metafields: Array<{ key: string; value: string } | null>;
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    descriptionHtml
    productType
    tags
    featuredImage { url altText }
    images(first: 5) { nodes { url altText } }
    priceRange { minVariantPrice { amount currencyCode } }
    compareAtPriceRange { maxVariantPrice { amount currencyCode } }
    variants(first: 10) {
      nodes {
        id
        title
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        availableForSale
      }
    }
    metafields(identifiers: [
      { namespace: "custom", key: "name_it" }
      { namespace: "custom", key: "platform" }
      { namespace: "custom", key: "region" }
      { namespace: "custom", key: "badge" }
      { namespace: "custom", key: "software_brand" }
      { namespace: "custom", key: "software_category" }
      { namespace: "custom", key: "license_type" }
      { namespace: "custom", key: "subscription_duration" }
      { namespace: "custom", key: "delivery_method" }
      { namespace: "custom", key: "activation_type" }
      { namespace: "custom", key: "compatibility" }
      { namespace: "custom", key: "devices_supported" }
      { namespace: "custom", key: "language" }
      { namespace: "custom", key: "updates" }
      { namespace: "custom", key: "support" }
      { namespace: "custom", key: "warranty" }
      { namespace: "custom", key: "system_requirements" }
      { namespace: "custom", key: "download_guide" }
      { namespace: "custom", key: "commercial_use" }
      { namespace: "custom", key: "product_format" }
      { namespace: "custom", key: "official_download" }
      { namespace: "custom", key: "software_features" }
      { namespace: "custom", key: "delivery_time" }
      { namespace: "custom", key: "short_description" }
      { namespace: "custom", key: "card_platform" }
      { namespace: "custom", key: "card_category" }
      { namespace: "custom", key: "card_license_type" }
      { namespace: "custom", key: "card_language" }
      { namespace: "custom", key: "card_support" }
      { namespace: "custom", key: "badge_1" }
      { namespace: "custom", key: "badge_2" }
      { namespace: "custom", key: "badge_3" }
      { namespace: "custom", key: "activation_step_1_title" }
      { namespace: "custom", key: "activation_step_1_text" }
      { namespace: "custom", key: "activation_step_2_title" }
      { namespace: "custom", key: "activation_step_2_text" }
      { namespace: "custom", key: "activation_step_3_title" }
      { namespace: "custom", key: "activation_step_3_text" }
      { namespace: "custom", key: "activation_step_4_title" }
      { namespace: "custom", key: "activation_step_4_text" }
      { namespace: "custom", key: "account_assignment" }
      { namespace: "custom", key: "checkout_email_required" }
      { namespace: "custom", key: "refund_policy_label" }
    ]) { key value }
  }
`;

export async function fetchProducts(first = 50): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { nodes: ShopifyProduct[] } }>(`
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first, sortKey: BEST_SELLING) {
        nodes { ...ProductFields }
      }
    }
  `, { first });
  return data.products.nodes;
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(`
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) { ...ProductFields }
    }
  `, { handle });
  return data.productByHandle;
}

export async function fetchProductById(id: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ node: ShopifyProduct | null }>(`
    ${PRODUCT_FRAGMENT}
    query GetProductById($id: ID!) {
      node(id: $id) { ...ProductFields }
    }
  `, { id });
  return data.node;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
    subtotalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    nodes: Array<{
      id: string;
      quantity: number;
      cost: { totalAmount: { amount: string; currencyCode: string } };
      merchandise: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        product: { id: string; handle: string; title: string; featuredImage: { url: string } | null };
      };
    }>;
  };
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product { id handle title featuredImage { url } }
          }
        }
      }
    }
  }
`;

export async function createCart(lines: Array<{ merchandiseId: string; quantity: number }>): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(`
    ${CART_FRAGMENT}
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFields }
      }
    }
  `, { lines });
  return data.cartCreate.cart;
}

export async function addCartLines(cartId: string, lines: Array<{ merchandiseId: string; quantity: number }>): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(`
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
  `, { cartId, lines });
  return data.cartLinesAdd.cart;
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(`
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
      }
    }
  `, { cartId, lineIds });
  return data.cartLinesRemove.cart;
}

export async function updateCartLines(cartId: string, lines: Array<{ id: string; quantity: number }>): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(`
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
  `, { cartId, lines });
  return data.cartLinesUpdate.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(`
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
  `, { cartId });
  return data.cart;
}

import type { Product } from '@/data/products';

export function shopifyProductToProduct(p: ShopifyProduct): Product & { variantId?: string } {
  const variant = p.variants.nodes[0];
  const salePrice = parseFloat(variant?.price.amount ?? '0');
  const compareAt = parseFloat(variant?.compareAtPrice?.amount ?? p.compareAtPriceRange.maxVariantPrice.amount ?? '0');
  const originalPrice = compareAt > salePrice ? compareAt : salePrice;
  const discount = originalPrice > salePrice ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) : 0;

  const getMeta = (key: string) => p.metafields?.find((m) => m?.key === key)?.value ?? '';

  const images = p.images.nodes.map((i) => i.url);
  const featuredImage = p.featuredImage?.url ?? images[0] ?? '';

  return {
    id: p.id,
    slug: p.handle,
    name: p.title,
    nameIt: getMeta('name_it') || p.title,
    category: p.productType || 'Software',
    subcategory: p.productType || 'Software',
    platform: getMeta('platform') || getMeta('card_platform') || 'PC/Mac',
    region: getMeta('region') || 'Global',
    originalPrice,
    salePrice,
    discount,
    rating: 4.8,
    reviewCount: 0,
    image: featuredImage,
    images: images.length > 0 ? images : [featuredImage],
    instantDelivery: true,
    isBestseller: p.tags.includes('bestseller'),
    isNew: p.tags.includes('new'),
    isFeatured: p.tags.includes('featured'),
    description: p.title,
    descriptionIt: getMeta('short_description') || p.descriptionHtml.replace(/<[^>]+>/g, '') || p.title,
    stock: variant?.availableForSale ? 999 : 0,
    badge: getMeta('badge') || undefined,
    tags: p.tags,
    variantId: variant?.id,
    // Extended metafield data
    softwareBrand: getMeta('software_brand') || undefined,
    softwareCategory: getMeta('software_category') || undefined,
    licenseType: getMeta('license_type') || getMeta('card_license_type') || undefined,
    subscriptionDuration: getMeta('subscription_duration') || undefined,
    deliveryMethod: getMeta('delivery_method') || undefined,
    activationType: getMeta('activation_type') || undefined,
    compatibility: getMeta('compatibility') || undefined,
    devicesSupported: getMeta('devices_supported') || undefined,
    language: getMeta('language') || getMeta('card_language') || undefined,
    updates: getMeta('updates') || undefined,
    support: getMeta('support') || getMeta('card_support') || undefined,
    warranty: getMeta('warranty') || undefined,
    systemRequirements: getMeta('system_requirements') || undefined,
    downloadGuide: getMeta('download_guide') || undefined,
    commercialUse: getMeta('commercial_use') || undefined,
    productFormat: getMeta('product_format') || undefined,
    officialDownload: getMeta('official_download') || undefined,
    softwareFeatures: getMeta('software_features') || undefined,
    deliveryTime: getMeta('delivery_time') || undefined,
    shortDescription: getMeta('short_description') || undefined,
    cardPlatform: getMeta('card_platform') || undefined,
    cardCategory: getMeta('card_category') || undefined,
    cardLicenseType: getMeta('card_license_type') || undefined,
    cardLanguage: getMeta('card_language') || undefined,
    cardSupport: getMeta('card_support') || undefined,
    badge1: getMeta('badge_1') || undefined,
    badge2: getMeta('badge_2') || undefined,
    badge3: getMeta('badge_3') || undefined,
    activationStep1Title: getMeta('activation_step_1_title') || undefined,
    activationStep1Text: getMeta('activation_step_1_text') || undefined,
    activationStep2Title: getMeta('activation_step_2_title') || undefined,
    activationStep2Text: getMeta('activation_step_2_text') || undefined,
    activationStep3Title: getMeta('activation_step_3_title') || undefined,
    activationStep3Text: getMeta('activation_step_3_text') || undefined,
    activationStep4Title: getMeta('activation_step_4_title') || undefined,
    activationStep4Text: getMeta('activation_step_4_text') || undefined,
    accountAssignment: getMeta('account_assignment') || undefined,
    checkoutEmailRequired: getMeta('checkout_email_required') || undefined,
    refundPolicyLabel: getMeta('refund_policy_label') || undefined,
  } as Product & { variantId?: string };
}
