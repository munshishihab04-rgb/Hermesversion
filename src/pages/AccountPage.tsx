import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import {
  UserCircleIcon,
  ShoppingBagIcon,
  ArrowRightStartOnRectangleIcon,
  CalendarDaysIcon,
  CurrencyEuroIcon,
  CheckBadgeIcon,
  ClockIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { useCustomer } from '@/context/CustomerContext';
import type { CustomerOrder } from '@/lib/customerAccount';

// ── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
  }).format(parseFloat(amount));
}

function FinancialBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; classes: string }> = {
    PAID: { label: 'Pagato', classes: 'bg-green-50 text-green-700 border border-green-200' },
    PENDING: { label: 'In attesa', classes: 'bg-yellow-50 text-yellow-700 border border-yellow-200' },
    REFUNDED: { label: 'Rimborsato', classes: 'bg-blue-50 text-blue-700 border border-blue-200' },
    PARTIALLY_REFUNDED: { label: 'Rimborso parziale', classes: 'bg-teal-50 text-teal-700 border border-teal-200' },
    VOIDED: { label: 'Annullato', classes: 'bg-gray-100 text-gray-600 border border-gray-200' },
  };
  const s = map[status] ?? { label: status, classes: 'bg-gray-100 text-gray-600 border border-gray-200' };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${s.classes}`}>
      {s.label}
    </span>
  );
}

function FulfillmentBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; icon: React.ComponentType<{className?: string}>; classes: string }> = {
    FULFILLED: { label: 'Spedito', icon: TruckIcon, classes: 'bg-green-50 text-green-700 border border-green-200' },
    UNFULFILLED: { label: 'In preparazione', icon: ClockIcon, classes: 'bg-orange-50 text-orange-700 border border-orange-200' },
    PARTIALLY_FULFILLED: { label: 'Parz. spedito', icon: TruckIcon, classes: 'bg-blue-50 text-blue-700 border border-blue-200' },
  };
  const s = map[status] ?? { label: status, icon: ClockIcon, classes: 'bg-gray-100 text-gray-600 border border-gray-200' };
  const IconCmp = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${s.classes}`}>
      <IconCmp className="w-3 h-3" />
      {s.label}
    </span>
  );
}

function OrderCard({ order }: { order: CustomerOrder }) {
  return (
    <div className="bg-white border border-border rounded-xl p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{order.name}</span>
            <FinancialBadge status={order.financialStatus} />
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
            <CalendarDaysIcon className="w-3.5 h-3.5" />
            <span>{formatDate(order.processedAt)}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-semibold text-foreground">
            {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
          </div>
          <div className="mt-1">
            <FulfillmentBadge status={order.fulfillmentStatus} />
          </div>
        </div>
      </div>

      {order.lineItems.nodes.length > 0 && (
        <div className="border-t border-border pt-3 mt-3 space-y-1">
          {order.lineItems.nodes.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="truncate mr-4">{item.title}</span>
              <span className="shrink-0 font-medium">x{item.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Pagina principale ──────────────────────────────────────────────────────

export default function AccountPage() {
  const { customer, isLoading, isAuthenticated, login, logout } = useCustomer();
  const [, navigate] = useLocation();

  // Redirect al login se non autenticato
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      login();
    }
  }, [isLoading, isAuthenticated, login]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-muted-foreground text-sm">Caricamento profilo...</span>
        </div>
      </div>
    );
  }

  if (!customer) return null;

  const hasOrders = customer.orders.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header profilo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Ciao, {customer.firstName || 'Cliente'}!
              </h1>
              <p className="text-muted-foreground text-sm">{customer.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 py-2 rounded-lg transition-colors"
          >
            <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
            Esci
          </button>
        </div>

        {/* Sezione ordini */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBagIcon className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">I miei ordini</h2>
            {hasOrders && (
              <span className="ml-auto text-xs text-muted-foreground">
                {customer.orders.length} ordini
              </span>
            )}
          </div>

          {hasOrders ? (
            <div className="space-y-3">
              {customer.orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-border rounded-xl p-10 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingBagIcon className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium mb-1">Nessun ordine trovato</p>
              <p className="text-muted-foreground text-sm mb-5">
                Non hai ancora effettuato ordini su Licenvo.
              </p>
              <button
                onClick={() => navigate('/product-catalog')}
                className="btn-primary px-5 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2"
              >
                <CheckBadgeIcon className="w-4 h-4" />
                Sfoglia il catalogo
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
