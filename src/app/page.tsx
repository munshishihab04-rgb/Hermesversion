import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import HeroSection from '@/app/components/HeroSection';
import TrustSection from '@/app/components/TrustSection';
import FeaturedProducts from '@/app/components/FeaturedProducts';
import CategoryGrid from '@/app/components/CategoryGrid';
import HowToBuySection from '@/app/components/HowToBuySection';
import NewsletterSection from '@/app/components/NewsletterSection';

export default function HomePage() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <main>
            <HeroSection />
            <TrustSection />
            <FeaturedProducts />
            <CategoryGrid />
            <HowToBuySection />
            <NewsletterSection />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
