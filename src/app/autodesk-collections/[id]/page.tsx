import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CollectionDetailClient from '../components/CollectionDetailClient';

export default function CollectionDetailPage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main className="pt-16">
            <CollectionDetailClient />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
