import { useState, useEffect } from 'react';
import { fetchProducts, fetchProductByHandle, shopifyProductToProduct } from '@/lib/shopify';
import { products as staticProducts } from '@/data/products';
import type { Product } from '@/data/products';

export function useShopifyProducts() {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProducts(50)
      .then((shopifyProducts) => {
        if (cancelled) return;
        if (shopifyProducts.length > 0) {
          setProducts(shopifyProducts.map(shopifyProductToProduct));
        }
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('Shopify fetch failed, using static data:', err);
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
}

export function useShopifyProduct(handle: string | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) { setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    fetchProductByHandle(handle)
      .then((p) => {
        if (cancelled) return;
        if (p) setProduct(shopifyProductToProduct(p));
      })
      .catch((err) => {
        console.warn('Shopify product fetch failed:', err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [handle]);

  return { product, loading };
}
