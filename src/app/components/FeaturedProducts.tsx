import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/AppIcon';
import { useShopifyProducts } from '@/hooks/useShopifyProducts';

const tabs = [
  { id: 'featured', label: 'In Evidenza', icon: 'StarIcon' },
  { id: 'bestsellers', label: 'Più Venduti', icon: 'FireIcon' },
  { id: 'new', label: 'Nuovi Arrivi', icon: 'SparklesIcon' },
  { id: 'deals', label: 'Offerte', icon: 'TagIcon' },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('featured');
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { products, loading } = useShopifyProducts();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const getProducts = () => {
    switch (activeTab) {
      case 'bestsellers': return products.filter((p) => p.isBestseller).slice(0, 8);
      case 'new': return products.filter((p) => p.isNew).slice(0, 8);
      case 'deals': return [...products].sort((a, b) => b.discount - a.discount).slice(0, 8);
      default: return products.filter((p) => p.isFeatured).slice(0, 8);
    }
  };

  const displayProducts = loading ? [] : (getProducts().length > 0 ? getProducts() : products.slice(0, 8));

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="py-6">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="section-title mb-2">Prodotti in Tendenza</h2>
            <p className="section-subtitle text-sm">Le licenze più richieste in questo momento</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Arrow controls — desktop */}
            <button onClick={scrollLeft} className="hidden sm:flex p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <Icon name="ChevronLeftIcon" size={16} />
            </button>
            <button onClick={scrollRight} className="hidden sm:flex p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <Icon name="ChevronRightIcon" size={16} />
            </button>
            <Link href="/product-catalog" className="btn-ghost text-sm flex items-center gap-1">
              Vedi tutto <Icon name="ArrowRightIcon" size={14} />
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={tab.icon as Parameters<typeof Icon>[0]['name']} size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Carousel */}
        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-muted/30 border border-border animate-pulse shrink-0 w-[240px] h-72" />
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          >
            {displayProducts.map((product, idx) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[240px] sm:w-[260px]"
                style={{ animationDelay: visible ? `${idx * 60}ms` : '0ms' }}
              >
                <ProductCard product={product} />
              </div>
            ))}

            {/* "View all" card at end */}
            <div className="snap-start shrink-0 w-[200px] flex items-center justify-center">
              <Link
                href="/product-catalog"
                className="flex flex-col items-center gap-3 text-center p-6 rounded-2xl border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name="ArrowRightIcon" size={20} className="text-primary" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  Vedi tutti i prodotti
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
