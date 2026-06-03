import { Suspense } from 'react';
import ProductDetailClient from '@/app/product-detail/components/ProductDetailClient';

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Caricamento...</div>}>
      <ProductDetailClient />
    </Suspense>
  );
}
