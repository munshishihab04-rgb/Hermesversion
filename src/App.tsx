import React, { Suspense, useEffect } from 'react';
import { Switch, Route, Router as WouterRouter, useLocation } from 'wouter';
import { CartProvider } from '@/context/CartContext';
import { CustomerProvider } from '@/context/CustomerContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CookieBanner from '@/components/CookieBanner';

// Lazy-loaded page components for code splitting
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const ProductCatalogPage = React.lazy(() => import('@/pages/ProductCatalogPage'));
const ProductDetailPage = React.lazy(() => import('@/pages/ProductDetailPage'));
const FaqPage = React.lazy(() => import('@/pages/FaqPage'));
const ContactPage = React.lazy(() => import('@/pages/ContactPage'));
const HelpCenterPage = React.lazy(() => import('@/pages/HelpCenterPage'));
const PrivacyPage = React.lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = React.lazy(() => import('@/pages/TermsPage'));
const RefundPage = React.lazy(() => import('@/pages/RefundPage'));
const CookiePolicyPage = React.lazy(() => import('@/pages/CookiePolicyPage'));
const LegalNotesPage = React.lazy(() => import('@/pages/LegalNotesPage'));
const ShippingPage = React.lazy(() => import("@/pages/ShippingPage"));
const AboutPage = React.lazy(() => import("@/pages/AboutPage"));
const FatturazionePage = React.lazy(() => import("@/pages/FatturaziPage"));
const AutodeskCollectionsPage = React.lazy(() => import('@/pages/AutodeskCollectionsPage'));
const AutodeskCollectionDetailPage = React.lazy(() => import('@/pages/AutodeskCollectionDetailPage'));
const NotFound = React.lazy(() => import('@/app/not-found'));
const AccountPage = React.lazy(() => import('@/pages/AccountPage'));
const AccountCallbackPage = React.lazy(() => import('@/pages/AccountCallbackPage'));

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <CartDrawer />
          <CookieBanner />
          <main className="pt-0">
            {children}
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-muted-foreground text-sm">Caricamento...</span>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ScrollToTop />
      <Switch>
        <Route path="/">{() => <PageWrapper><HomePage /></PageWrapper>}</Route>
        <Route path="/product-catalog">{() => <PageWrapper><ProductCatalogPage /></PageWrapper>}</Route>
        <Route path="/product-detail">{() => <PageWrapper><ProductDetailPage /></PageWrapper>}</Route>
        <Route path="/faq">{() => <PageWrapper><FaqPage /></PageWrapper>}</Route>
        <Route path="/contact">{() => <PageWrapper><ContactPage /></PageWrapper>}</Route>
        <Route path="/help-center">{() => <PageWrapper><HelpCenterPage /></PageWrapper>}</Route>
        <Route path="/assistenza">{() => <PageWrapper><HelpCenterPage /></PageWrapper>}</Route>
        <Route path="/privacy">{() => <PageWrapper><PrivacyPage /></PageWrapper>}</Route>
        <Route path="/terms">{() => <PageWrapper><TermsPage /></PageWrapper>}</Route>
        <Route path="/refund">{() => <PageWrapper><RefundPage /></PageWrapper>}</Route>
        <Route path="/cookie-policy">{() => <PageWrapper><CookiePolicyPage /></PageWrapper>}</Route>
        <Route path="/legal">{() => <PageWrapper><LegalNotesPage /></PageWrapper>}</Route>
        <Route path="/shipping">{() => <PageWrapper><ShippingPage /></PageWrapper>}</Route>
        <Route path="/about">{() => <PageWrapper><AboutPage /></PageWrapper>}</Route>
        <Route path="/fatturazione">{() => <PageWrapper><FatturazionePage /></PageWrapper>}</Route>
        <Route path="/autodesk-collections">{() => <PageWrapper><AutodeskCollectionsPage /></PageWrapper>}</Route>
        <Route path="/autodesk-collections/:id">{() => <PageWrapper><AutodeskCollectionDetailPage /></PageWrapper>}</Route>
        <Route path="/account">{() => <PageWrapper><AccountPage /></PageWrapper>}</Route>
        <Route path="/account/callback">{() => <AccountCallbackPage />}</Route>
        <Route>{() => <PageWrapper><NotFound /></PageWrapper>}</Route>
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') ?? ''}>
      <CustomerProvider>
        <Router />
      </CustomerProvider>
    </WouterRouter>
  );
}

export default App;
