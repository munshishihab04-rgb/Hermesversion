import React, { Suspense } from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductDetailClient from '@/app/product-detail/components/ProductDetailClient';

export const metadata = {
  title: 'Dettaglio Prodotto — Licenvo',
  description: 'Acquista licenze software originali con consegna istantanea. Garanzia soddisfatti o rimborsati.',
};

export default function ProductDetailPage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main className="pt-16">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Caricamento...</div>}>
              <ProductDetailClient />
            </Suspense>
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}