/**
 * Shopify Customer Account API - OAuth 2.0 PKCE flow
 * Docs: https://shopify.dev/docs/api/customer
 */

const SHOP_ID = import.meta.env.VITE_SHOPIFY_SHOP_ID as string;
const CLIENT_ID = import.meta.env.VITE_SHOPIFY_CLIENT_ID as string;
const REDIRECT_URI = `${import.meta.env.VITE_SITE_URL}/account/callback`;

// URL base autenticazione OAuth Shopify Customer Account API
const AUTH_URL = `https://shopify.com/authentication/${SHOP_ID}/oauth`;

// Endpoint GraphQL Customer Account API
const CUSTOMER_API_URL = `https://shopify.com/${SHOP_ID}/account/customer/api/2025-01/graphql`;

// ── Tipi ───────────────────────────────────────────────────────────────────

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  id_token?: string;
}

export interface CustomerOrder {
  id: string;
  name: string;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    nodes: Array<{
      title: string;
      quantity: number;
    }>;
  };
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  orders: CustomerOrder[];
}

// ── Storage keys ───────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'shopify_access_token',
  REFRESH_TOKEN: 'shopify_refresh_token',
  EXPIRES_AT: 'shopify_token_expires_at',
  CODE_VERIFIER: 'shopify_code_verifier',
  OAUTH_STATE: 'shopify_oauth_state',
} as const;

// ── PKCE helpers ──────────────────────────────────────────────────────────

/** Genera un code_verifier random di ~64 caratteri (base64url) */
export function generateCodeVerifier(): string {
  const array = new Uint8Array(48);
  crypto.getRandomValues(array);
  return base64urlEncode(array);
}

/** Genera il code_challenge SHA-256 dal verifier */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64urlEncode(new Uint8Array(digest));
}

function base64urlEncode(array: Uint8Array): string {
  let str = '';
  for (const byte of array) {
    str += String.fromCharCode(byte);
  }
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// ── OAuth flow ────────────────────────────────────────────────────────────

/**
 * Costruisce l'URL di autorizzazione OAuth con tutti i parametri PKCE.
 * Salva code_verifier e state in localStorage prima del redirect.
 */
export async function buildAuthorizationUrl(state: string): Promise<string> {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem(STORAGE_KEYS.CODE_VERIFIER, verifier);
  localStorage.setItem(STORAGE_KEYS.OAUTH_STATE, state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'openid email https://api.customers.com/auth/customer.graphql',
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });

  return `${AUTH_URL}/authorize?${params.toString()}`;
}

/** Scambia il code OAuth con access_token + refresh_token */
export async function exchangeCodeForTokens(
  code: string,
  verifier: string
): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code,
    code_verifier: verifier,
  });

  const response = await fetch(`${AUTH_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Token exchange fallito: ${response.status} - ${err}`);
  }

  return response.json() as Promise<TokenResponse>;
}

/** Rinnova l'access_token usando il refresh_token */
export async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: CLIENT_ID,
    refresh_token: refreshToken,
  });

  const response = await fetch(`${AUTH_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Refresh token fallito: ${response.status} - ${err}`);
  }

  return response.json() as Promise<TokenResponse>;
}

/** Revoca il token (logout lato Shopify) */
export async function revokeToken(token: string): Promise<void> {
  const body = new URLSearchParams({
    token,
    client_id: CLIENT_ID,
  });

  await fetch(`${AUTH_URL}/revoke`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
}

// ── Customer GraphQL ──────────────────────────────────────────────────────

/** Recupera i dati del cliente autenticato (profilo + ultimi 10 ordini) */
export async function getCustomer(accessToken: string): Promise<Customer> {
  const query = `
    query GetCustomerOrders {
      customer {
        id
        firstName
        lastName
        emailAddress { emailAddress }
        orders(first: 10) {
          nodes {
            id
            name
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice { amount currencyCode }
            lineItems(first: 5) {
              nodes {
                title
                quantity
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(CUSTOMER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Customer API error: ${response.status}`);
  }

  const { data, errors } = await response.json();

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  const c = data.customer;
  return {
    id: c.id,
    firstName: c.firstName ?? '',
    lastName: c.lastName ?? '',
    email: c.emailAddress?.emailAddress ?? '',
    orders: c.orders?.nodes ?? [],
  };
}

// ── Token storage helpers ─────────────────────────────────────────────────

export function saveTokens(tokens: TokenResponse): void {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
  const expiresAt = Date.now() + tokens.expires_in * 1000;
  localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, String(expiresAt));
}

export function clearTokens(): void {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
}

export function getStoredTokens(): {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
} {
  return {
    accessToken: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
    refreshToken: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
    expiresAt: Number(localStorage.getItem(STORAGE_KEYS.EXPIRES_AT)) || null,
  };
}

export function isTokenExpired(): boolean {
  const expiresAt = Number(localStorage.getItem(STORAGE_KEYS.EXPIRES_AT));
  if (!expiresAt) return true;
  // Considera scaduto 60 secondi prima per sicurezza
  return Date.now() > expiresAt - 60_000;
}
