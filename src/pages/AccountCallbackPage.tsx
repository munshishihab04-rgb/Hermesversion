import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { exchangeCodeForTokens, saveTokens, STORAGE_KEYS } from '@/lib/customerAccount';

/**
 * Pagina di callback OAuth: gestisce il ritorno da Shopify dopo il login.
 * Legge ?code= e ?state= dall'URL, verifica lo state, scambia il code con i token.
 * Non ha header/footer — solo uno spinner di elaborazione.
 */
export default function AccountCallbackPage() {
  const [, navigate] = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      const errorParam = params.get('error');

      // Shopify ha restituito un errore
      if (errorParam) {
        setError(`Errore di autenticazione: ${params.get('error_description') ?? errorParam}`);
        return;
      }

      if (!code || !state) {
        setError('Parametri mancanti nella risposta OAuth.');
        return;
      }

      // Verifica state (protezione CSRF)
      const savedState = localStorage.getItem(STORAGE_KEYS.OAUTH_STATE);
      if (state !== savedState) {
        setError('Verifica di sicurezza fallita (state mismatch). Riprova il login.');
        return;
      }

      // Recupera il code_verifier salvato prima del redirect
      const verifier = localStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);
      if (!verifier) {
        setError('Code verifier non trovato. Riprova il login.');
        return;
      }

      try {
        const tokens = await exchangeCodeForTokens(code, verifier);
        saveTokens(tokens);

        // Pulisci i valori temporanei
        localStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
        localStorage.removeItem(STORAGE_KEYS.OAUTH_STATE);

        // Redirect all'area cliente
        navigate('/account');
      } catch (err) {
        console.error('[AccountCallback] Errore scambio token:', err);
        setError('Errore durante il login. Riprova.');
      }
    }

    handleCallback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-6">
          <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-destructive" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Errore di accesso</h2>
          <p className="text-muted-foreground text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="btn-primary px-6 py-2 rounded-lg text-sm font-medium"
          >
            Torna alla home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground text-sm">Accesso in corso...</p>
      </div>
    </div>
  );
}
