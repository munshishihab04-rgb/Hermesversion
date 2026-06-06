import { Suspense } from 'react';
import { useSearch } from 'wouter';
import ProductDetailClient from '@/app/product-detail/components/ProductDetailClient';
import AutodeskCollectionDetailPage from '@/pages/AutodeskCollectionDetailPage';

const COLLECTION_HANDLES: Record<string, string> = {
  'autodesk-aec-collection': 'aec',
  'autodesk-pdm-collection': 'pdm',
  'autodesk-me-collection': 'me',
};

export default function ProductDetailPage() {
  const searchStr = useSearch();
  const urlParams = new URLSearchParams(searchStr);
  const handle = urlParams.get('handle') || '';

  // If this is a collection product, render the rich collection detail page
  const collectionId = COLLECTION_HANDLES[handle];
  if (collectionId) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Caricamento...</div>}>
        <AutodeskCollectionDetailPage overrideCollectionId={collectionId} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Caricamento...</div>}>
      <ProductDetailClient />
    </Suspense>
  );
}
