import HeroSection from '@/app/components/HeroSection';
import CategoryGrid from '@/app/components/CategoryGrid';
import FeaturedProducts from '@/app/components/FeaturedProducts';
import TrustSection from '@/app/components/TrustSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import NewsletterSection from '@/app/components/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <TrustSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
