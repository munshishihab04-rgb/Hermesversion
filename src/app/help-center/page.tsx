import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import HelpCenterClient from '@/app/help-center/components/HelpCenterClient';

export const metadata = {
  title: 'Centro Assistenza — Licenvo',
  description: 'Guide, tutorial e risorse per utilizzare al meglio i prodotti acquistati su Licenvo.',
};

export default function HelpCenterPage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main className="pt-16">
            <HelpCenterClient />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}