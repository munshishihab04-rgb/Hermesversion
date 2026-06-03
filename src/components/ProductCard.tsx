import React, { useState } from 'react';
import { Link } from 'wouter';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  className?: string;
}

function fmtEur(n: number): string { return n.toFixed(2).replace('.', ','); }

function StarRating({ rating }: { rating: number }) {
  const starPath = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = Math.min(Math.max(rating - (s - 1), 0), 1);
        const pct = Math.round(fill * 100);
        if (pct >= 100) return (
          <svg key={s} width={12} height={12} viewBox="0 0 20 20" style={{display:'inline-block',flexShrink:0}}>
            <path d={starPath} fill="rgb(251,191,36)" />
          </svg>
        );
        if (pct <= 0) return (
          <svg key={s} width={12} height={12} viewBox="0 0 20 20" style={{display:'inline-block',flexShrink:0}}>
            <path d={starPath} fill="rgba(156,163,175,0.3)" />
          </svg>
        );
        const clipId = `pcc${s}${String(rating).replace('.','p')}`;
        return (
          <svg key={s} width={12} height={12} viewBox="0 0 20 20" style={{display:'inline-block',flexShrink:0}}>
            <defs>
              <clipPath id={clipId}>
                <rect x="0" y="0" width={`${pct}%`} height="20" />
              </clipPath>
            </defs>
            <path d={starPath} fill="rgba(156,163,175,0.3)" />
            <path d={starPath} fill="rgb(251,191,36)" clipPath={`url(#${clipId})`} />
          </svg>
        );
      })}
    </div>
  );
}

/** Determine category brand badge info based on category/subcategory */
function getBrandBadge(product: Product): { label: string; className: string } | null {
  const cat = (product.category + ' ' + (product.subcategory ?? '')).toLowerCase();
  if (cat.includes('autodesk')) {
    return { label: 'Autodesk', className: 'bg-blue-900/90 text-blue-100 border border-blue-700/60' };
  }
  if (cat.includes('windows') || cat.includes('office') || cat.includes('microsoft')) {
    return { label: 'Microsoft', className: 'bg-blue-600/90 text-white border border-blue-500/60' };
  }
  if (cat.includes('antivirus') || cat.includes('kaspersky')) {
    return { label: 'Kaspersky', className: 'bg-emerald-700/90 text-white border border-emerald-500/60' };
  }
  return null;
}

/** Delivery time label based on product */
function getDeliveryBadge(product: Product): { label: string; className: string } {
  const cat = (product.category + ' ' + (product.subcategory ?? '')).toLowerCase();
  if (cat.includes('autodesk')) {
    return { label: '⏱ 10-15 min', className: 'text-amber-500 font-semibold text-[10px]' };
  }
  return { label: '⚡ Immediato', className: 'text-emerald-500 font-semibold text-[10px]' };
}

/** Extract 2-3 feature bullet points from descriptionIt */
function getFeatureSnippets(description: string): string[] {
  if (!description) return [];
  // Split by common delimiters: period, comma at end of clause, or newline
  const parts = description
    .split(/[.\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10 && s.length < 80);
  return parts.slice(0, 3);
}

/** Resolve product detail link — use handle (slug) for Shopify products */
function getProductLink(product: Product): string {
  // If product has a variantId it came from Shopify — use handle/slug
  if (product.variantId && product.slug) {
    return `/product-detail?handle=${product.slug}`;
  }
  // Fallback for static products: prefer slug, otherwise id
  if (product.slug) {
    return `/product-detail?handle=${product.slug}`;
  }
  return `/product-detail?id=${product.id}`;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [hovered, setHovered] = useState(false);

  const brandBadge = getBrandBadge(product);
  const deliveryBadge = getDeliveryBadge(product);
  const featureSnippets = getFeatureSnippets(product.descriptionIt || product.description || '');
  const productLink = getProductLink(product);

  return (
    <div
      className={`group relative bg-card border border-border rounded-2xl overflow-hidden card-hover-glow flex flex-col ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted flex items-center justify-center">
        <Link href={productLink} className="w-full h-full flex items-center justify-center">
          <AppImage
            src={product.image}
            alt={product.nameIt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount > 0 && (
            <span className="discount-badge text-[10px] font-bold px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
          {product.badge && (
            <span className="bg-primary/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="bg-cyan-50 border border-cyan-200 text-cyan-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Nuovo
            </span>
          )}
          {/* Brand badge */}
          {brandBadge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${brandBadge.className}`}>
              {brandBadge.label}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggle(product)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? 'bg-red-500 text-white' :'bg-white/80 text-muted-foreground hover:bg-red-500/90 hover:text-white'
          }`}
          aria-label={wishlisted ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
        >
          <Icon name={wishlisted ? 'HeartIcon' : 'HeartIcon'} size={14} variant={wishlisted ? 'solid' : 'outline'} />
        </button>

        {/* Instant delivery */}
        {product.instantDelivery && !(product.deliveryTime && product.deliveryTime.toLowerCase().includes("minut")) && (
          <div className="absolute bottom-3 left-3">
            <span className="instant-badge text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <span>⚡</span> Istantaneo
            </span>
          </div>
        )}

        {/* Hover feature preview overlay */}
        {hovered && featureSnippets.length > 0 && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col justify-end p-3 transition-all duration-300 pointer-events-none">
            <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1.5 font-semibold">Caratteristiche</p>
            <ul className="space-y-1">
              {featureSnippets.map((feat, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-white/90 leading-tight">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-4 gap-1.5 sm:gap-3">
        {/* Platform & Region */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">
            {product.platform}
          </span>
          <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">
            {product.region}
          </span>
        </div>

        {/* Title */}
        <Link href={productLink}>
          <h3 className="text-xs sm:text-sm font-semibold text-foreground leading-tight line-clamp-2 hover:text-primary transition-colors">
            {product.nameIt}
          </h3>
        </Link>

        {/* Rating */}
        <div className="hidden sm:flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-muted-foreground">
            {product.rating} ({product.reviewCount.toLocaleString('it-IT')})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="price-mono text-base sm:text-xl font-bold text-primary">
            €{fmtEur(product.salePrice)}
          </span>
          {product.originalPrice > product.salePrice && (
            <span className="price-mono text-sm text-muted-foreground line-through">
              €{fmtEur(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Delivery time footer */}
        <div className="flex items-center justify-between">
          <span className={deliveryBadge.className}>{deliveryBadge.label}</span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary font-semibold text-xs sm:text-sm py-2 sm:py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn"
        >
          <Icon name="ShoppingCartIcon" size={15} />
          <span className="hidden sm:inline">Aggiungi al Carrello</span><span className="sm:hidden">Carrello</span>
        </button>
      </div>
    </div>
  );
}
