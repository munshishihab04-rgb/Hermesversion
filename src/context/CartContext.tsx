import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Product } from '@/data/products';
import {
  createCart,
  addCartLines,
  removeCartLines,
  updateCartLines,
  getCart,
  type ShopifyCart,
} from '@/lib/shopify';

export interface CartItem {
  product: Product & { variantId?: string };
  quantity: number;
  lineId?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product & { variantId?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  coupon: string;
  setCoupon: (c: string) => void;
  discount: number;
  checkoutUrl: string | null;
  checkoutLoading: boolean;
  proceedToCheckout: () => void;
}

const CartContext = createContext<CartContextType | null>(null);
const CART_ID_KEY = 'licenvo_shopify_cart_id';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCouponState] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shopifyCart, setShopifyCart] = useState<ShopifyCart | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const savedId = localStorage.getItem(CART_ID_KEY);
    if (savedId) {
      getCart(savedId)
        .then((cart) => {
          if (cart) {
            setShopifyCart(cart);
            const syncedItems: CartItem[] = cart.lines.nodes.map((line) => ({
              product: {
                id: line.merchandise.product.id,
                slug: line.merchandise.product.handle,
                name: line.merchandise.product.title,
                nameIt: line.merchandise.product.title,
                category: '',
                subcategory: '',
                platform: '',
                region: '',
                originalPrice: parseFloat(line.merchandise.price.amount),
                salePrice: parseFloat(line.merchandise.price.amount),
                discount: 0,
                rating: 5,
                reviewCount: 0,
                image: line.merchandise.product.featuredImage?.url ?? '',
                images: [line.merchandise.product.featuredImage?.url ?? ''],
                instantDelivery: true,
                isBestseller: false,
                isNew: false,
                isFeatured: false,
                description: '',
                descriptionIt: '',
                stock: 999,
                tags: [],
                variantId: line.merchandise.id,
              },
              quantity: line.quantity,
              lineId: line.id,
            }));
            if (syncedItems.length > 0) setItems(syncedItems);
          } else {
            localStorage.removeItem(CART_ID_KEY);
          }
        })
        .catch(() => localStorage.removeItem(CART_ID_KEY));
    }
  }, []);

  const syncShopifyCart = useCallback(async (
    updatedItems: CartItem[],
    currentCart: ShopifyCart | null,
    action: 'add' | 'remove' | 'update',
    payload: unknown
  ): Promise<ShopifyCart | null> => {
    try {
      if (action === 'add') {
        const { variantId, quantity } = payload as { variantId: string; quantity: number };
        if (!currentCart) {
          const cart = await createCart([{ merchandiseId: variantId, quantity }]);
          localStorage.setItem(CART_ID_KEY, cart.id);
          return cart;
        } else {
          const existingLine = currentCart.lines.nodes.find(
            (l) => l.merchandise.id === variantId
          );
          if (existingLine) {
            return await updateCartLines(currentCart.id, [
              { id: existingLine.id, quantity: existingLine.quantity + quantity },
            ]);
          } else {
            return await addCartLines(currentCart.id, [{ merchandiseId: variantId, quantity }]);
          }
        }
      } else if (action === 'remove') {
        const { lineId } = payload as { lineId: string };
        if (currentCart && lineId) {
          return await removeCartLines(currentCart.id, [lineId]);
        }
      } else if (action === 'update') {
        const { lineId, quantity } = payload as { lineId: string; quantity: number };
        if (currentCart && lineId) {
          return await updateCartLines(currentCart.id, [{ id: lineId, quantity }]);
        }
      }
    } catch (err) {
      console.warn('Shopify cart sync failed:', err);
    }
    return currentCart;
  }, []);

  const addToCart = useCallback(
    async (product: Product & { variantId?: string }) => {
      const variantId = product.variantId;

      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
      setIsOpen(true);

      if (variantId) {
        const updatedCart = await syncShopifyCart([], shopifyCart, 'add', {
          variantId,
          quantity: 1,
        });
        if (updatedCart) {
          setShopifyCart(updatedCart);
          setItems((prev) =>
            prev.map((item) => {
              if (item.product.id !== product.id) return item;
              const line = updatedCart.lines.nodes.find(
                (l) => l.merchandise.id === variantId
              );
              return line ? { ...item, lineId: line.id } : item;
            })
          );
        }
      }
    },
    [shopifyCart, syncShopifyCart]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      const item = items.find((i) => i.product.id === productId);
      setItems((prev) => prev.filter((i) => i.product.id !== productId));

      if (item?.lineId && shopifyCart) {
        const updatedCart = await syncShopifyCart([], shopifyCart, 'remove', {
          lineId: item.lineId,
        });
        if (updatedCart) setShopifyCart(updatedCart);
      }
    },
    [items, shopifyCart, syncShopifyCart]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      const item = items.find((i) => i.product.id === productId);
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      );

      if (item?.lineId && shopifyCart) {
        const updatedCart = await syncShopifyCart([], shopifyCart, 'update', {
          lineId: item.lineId,
          quantity,
        });
        if (updatedCart) setShopifyCart(updatedCart);
      }
    },
    [items, shopifyCart, syncShopifyCart, removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setShopifyCart(null);
    localStorage.removeItem(CART_ID_KEY);
  }, []);

  const applyCoupon = useCallback(async (code: string) => {
    setCouponState(code);
    const upper = code.toUpperCase().trim();
    if (!upper) { setDiscount(0); return; }
    // Aggiorna discount codes su Shopify cart se esiste
    if (shopifyCart?.id) {
      try {
        const updated = await cartDiscountCodesUpdate(shopifyCart.id, [upper]);
        const applied = updated?.discountCodes ?? [];
        const isValid = applied.some((d: { code: string; applicable: boolean }) => d.applicable);
        setDiscount(isValid ? 0 : 0); // Shopify applica lo sconto nel checkout
        if (!isValid) {
          setCouponState(''); // codice non valido — resetta
        }
      } catch (e) {
        console.error('Coupon error', e);
      }
    }
    // Fallback locale (per anteprima nel cart): mantieni per UX
    if (upper === 'LICENVO10') setDiscount(10);
    else if (upper === 'SAVE20') setDiscount(20);
    // Se non è un codice noto localmente, discount rimane 0 ma Shopify lo applica nel checkout
  }, [shopifyCart]);

  const proceedToCheckout = useCallback(async () => {
    if (shopifyCart?.checkoutUrl) {
      window.location.href = shopifyCart.checkoutUrl;
      return;
    }
    if (items.length === 0) return;
    setCheckoutLoading(true);
    try {
      const lines = items
        .filter((i) => i.product.variantId)
        .map((i) => ({ merchandiseId: i.product.variantId!, quantity: i.quantity }));

      if (lines.length === 0) {
        console.warn('No variant IDs found — cannot create Shopify checkout');
        setCheckoutLoading(false);
        return;
      }
      const cart = await createCart(lines, coupon ? [coupon.toUpperCase()] : []);
      localStorage.setItem(CART_ID_KEY, cart.id);
      setShopifyCart(cart);
      window.location.href = cart.checkoutUrl;
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setCheckoutLoading(false);
    }
  }, [shopifyCart, items]);

  const subtotal = items.reduce(
    (sum, i) => sum + i.product.salePrice * i.quantity,
    0
  );
  const total = subtotal * (1 - discount / 100);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const checkoutUrl = shopifyCart?.checkoutUrl ?? null;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        coupon,
        setCoupon: applyCoupon,
        discount,
        checkoutUrl,
        checkoutLoading,
        proceedToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
