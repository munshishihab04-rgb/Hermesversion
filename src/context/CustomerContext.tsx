import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Customer,
  buildAuthorizationUrl,
  revokeToken,
  refreshAccessToken,
  getCustomer,
  saveTokens,
  clearTokens,
  isTokenExpired,
  STORAGE_KEYS,
} from '@/lib/customerAccount';

// ── Tipi ───────────────────────────────────────────────────────────────────

interface CustomerContextType {
  customer: Customer | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  refreshCustomer: () => void;
}

// ── Context ────────────────────────────────────────────────────────────────

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

// ── Provider ───────────────────────────────────────────────────────────────

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /** Carica i dati cliente usando il token salvato (con auto-refresh) */
  const loadCustomer = useCallback(async () => {
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    if (!accessToken && !refreshToken) {
      setIsLoading(false);
      return;
    }

    try {
      let token = accessToken;

      // Auto-refresh se il token è scaduto
      if (isTokenExpired() && refreshToken) {
        const newTokens = await refreshAccessToken(refreshToken);
        saveTokens(newTokens);
        token = newTokens.access_token;
      }

      if (!token) {
        setIsLoading(false);
        return;
      }

      const data = await getCustomer(token);
      setCustomer(data);
    } catch (err) {
      console.error('[CustomerContext] Errore caricamento cliente:', err);
      // Token non valido → pulisci storage
      clearTokens();
      setCustomer(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carica il cliente al mount
  useEffect(() => {
    loadCustomer();
  }, [loadCustomer]);

  /** Avvia il flusso OAuth PKCE → redirect a Shopify */
  const login = useCallback(async () => {
    const state = crypto.randomUUID();
    const url = await buildAuthorizationUrl(state);
    window.location.href = url;
  }, []);

  /** Revoca token e pulisce lo stato */
  const logout = useCallback(async () => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      try {
        await revokeToken(token);
      } catch {
        // Ignora errori di revoca — pulisci comunque
      }
    }
    clearTokens();
    setCustomer(null);
    window.location.href = '/';
  }, []);

  /** Ricarica i dati cliente dall'API */
  const refreshCustomer = useCallback(() => {
    setIsLoading(true);
    loadCustomer();
  }, [loadCustomer]);

  const value: CustomerContextType = {
    customer,
    isLoading,
    isAuthenticated: !!customer,
    login,
    logout,
    refreshCustomer,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useCustomer(): CustomerContextType {
  const ctx = useContext(CustomerContext);
  if (!ctx) {
    throw new Error('useCustomer deve essere usato dentro <CustomerProvider>');
  }
  return ctx;
}
