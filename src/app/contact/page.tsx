import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ContactClient from '@/app/contact/components/ContactClient';

export const metadata = {
  title: 'Contattaci — Licenvo',
  description: 'Contatta il supporto Licenvo. Siamo disponibili 24/7 per assisterti con ordini, attivazioni e rimborsi.',
};

export default function ContactPage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main className="pt-16">
            <ContactClient />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}