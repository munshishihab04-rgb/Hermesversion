import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CatalogClient from '@/app/product-catalog/components/CatalogClient';

export const metadata = {
  title: 'Catalogo Prodotti — Licenvo',
  description: 'Sfoglia le nostre licenze software, antivirus e abbonamenti digitali al miglior prezzo.',
};

export default function ProductCatalogPage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main className="pt-16">
            <CatalogClient />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}