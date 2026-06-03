import React, { useState } from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, total, itemCount, coupon, setCoupon, discount, checkoutLoading, proceedToCheckout } = useCart();
  const [couponInput, setCouponInput] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeCart}
      />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="ShoppingCartIcon" size={20} className="text-primary" />
            <span className="font-bold text-foreground">Carrello</span>
            {itemCount > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
          >
            <Icon name="XMarkIcon" size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <Icon name="ShoppingCartIcon" size={28} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Il carrello è vuoto</p>
                <p className="text-sm text-muted-foreground">Aggiungi prodotti per iniziare</p>
              </div>
              <button
                onClick={closeCart}
                className="btn-primary text-sm px-6 py-2.5"
              >
                Sfoglia Prodotti
              </button>
            </div>
          ) : (
            items?.map((item) => (
              <div key={item?.product?.id} className="flex gap-3 p-3 bg-muted/30 rounded-xl border border-border">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                  <AppImage
                    src={item?.product?.image}
                    alt={item?.product?.nameIt}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate leading-tight mb-1">
                    {item?.product?.nameIt}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="instant-badge text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                      ⚡ Istantaneo
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item?.product?.id, item?.quantity - 1)}
                        className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="px-2 text-sm font-medium text-foreground">{item?.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item?.product?.id, item?.quantity + 1)}
                        className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="price-mono font-bold text-primary text-sm">
                        €{(item?.product?.salePrice * item?.quantity)?.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item?.product?.id)}
                        className="p-1 text-muted-foreground hover:text-red-400 transition-colors"
                      >
                        <Icon name="TrashIcon" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items?.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            {/* Coupon */}
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e?.target?.value)}
                placeholder="Codice coupon"
                className="flex-1 input-dark text-sm py-2"
              />
              <button
                onClick={() => setCoupon(couponInput)}
                className="btn-secondary text-sm px-4 py-2"
              >
                Applica
              </button>
            </div>
            {discount > 0 && (
              <div className="flex items-center gap-2 text-emerald-600 text-sm">
                <Icon name="CheckCircleIcon" size={16} />
                <span>Coupon applicato: -{discount}%</span>
              </div>
            )}

            {/* Total */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotale</span>
                <span className="price-mono">€{items?.reduce((s, i) => s + i?.product?.salePrice * i?.quantity, 0)?.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Sconto ({discount}%)</span>
                  <span className="price-mono">-€{(items?.reduce((s, i) => s + i?.product?.salePrice * i?.quantity, 0) * discount / 100)?.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-foreground text-lg pt-2 border-t border-border">
                <span>Totale</span>
                <span className="price-mono text-primary">€{total?.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={proceedToCheckout}
              disabled={checkoutLoading}
              className="w-full btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkoutLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Preparazione checkout...
                </>
              ) : (
                <>
                  <Icon name="LockClosedIcon" size={15} />
                  Procedi al Checkout
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-muted-foreground">
              🔒 Pagamento sicuro Shopify · Consegna istantanea via email
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
