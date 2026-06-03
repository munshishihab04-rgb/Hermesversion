import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AutodeskCollectionsClient from './components/AutodeskCollectionsClient';

export const metadata = {
  title: 'Autodesk Collections — Licenvo',
  description: 'Scopri le Collections Autodesk: AEC per architettura e costruzioni, PDMC per design industriale, Media & Entertainment per VFX e animazione.',
};

export default function AutodeskCollectionsPage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main className="pt-16">
            <AutodeskCollectionsClient />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
