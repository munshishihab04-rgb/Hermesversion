import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import FaqPageClient from '@/app/faq/components/FaqPageClient';

export const metadata = {
  title: 'FAQ — Domande Frequenti | Licenvo',
  description: 'Risposte alle domande più comuni su acquisti, consegna, attivazione e rimborsi su Licenvo.',
};

export default function FaqPage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main className="pt-16">
            <FaqPageClient />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}