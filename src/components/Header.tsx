import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import LogoIcon from '@/components/ui/LogoIcon';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const navCategories = [
  { label: 'Windows & Office', href: '/product-catalog?cat=windows-office', icon: 'WindowIcon' },
  { label: 'Autodesk', href: '/autodesk-collections', icon: 'CubeIcon' },
  { label: 'Antivirus', href: '/product-catalog?cat=antivirus', icon: 'ShieldCheckIcon' },
];

const announcementMessages = [
  '⚡ Consegna istantanea via email — licenze originali garantite al 100%',
  '🛡️ Pagamento sicuro SSL · Garanzia rimborso 30 giorni · Supporto in italiano',
  '🏆 Oltre 10.000 clienti soddisfatti — Recensioni verificate ★★★★★',
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearch, setMobileSearch] = useState('');
  const [annIdx, setAnnIdx] = useState(0);
  const catRef = useRef<HTMLDivElement>(null);
  const { openCart, itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [, navigate] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setAnnIdx((i) => (i + 1) % announcementMessages.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-catalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearch.trim()) {
      setMobileOpen(false);
      navigate(`/product-catalog?q=${encodeURIComponent(mobileSearch)}`);
    }
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="announcement-bar text-white text-xs py-2 px-4 text-center overflow-hidden">
        <div
          key={annIdx}
          className="animate-float-up font-medium tracking-wide"
          style={{ animationDuration: '0.4s' }}
        >
          {announcementMessages[annIdx]}
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-white border-b border-border'
        }`}
      >
        <div className="section-container">

          {/* ── MOBILE HEADER ── */}
          <div className="flex lg:hidden items-center h-14 relative gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              <Icon name="Bars3Icon" size={22} />
            </button>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              <LogoIcon size={28} />
              <span className="font-bold text-lg text-foreground tracking-tight" style={{ letterSpacing: '-0.02em' }}>Licenvo</span>
            </Link>

            <div className="ml-auto flex items-center gap-0.5">
              <Link href="/product-catalog" className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">
                <Icon name="MagnifyingGlassIcon" size={21} />
              </Link>
              <button
                onClick={openCart}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                <Icon name="ShoppingCartIcon" size={21} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ── DESKTOP HEADER ── */}
          <div className="hidden lg:flex items-center gap-5 h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 mr-2">
              <LogoIcon size={32} />
              <span className="font-extrabold text-xl text-foreground" style={{ letterSpacing: '-0.025em' }}>Licenvo</span>
            </Link>

            {/* Category Dropdown */}
            <div className="relative" ref={catRef}>
              <button
                onClick={() => setCatOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
              >
                <Icon name="Squares2X2Icon" size={16} className="text-primary" />
                Prodotti
                <Icon name="ChevronDownIcon" size={13} className={`text-muted-foreground transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50">
                  <div className="px-3 py-2 border-b border-border">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Categorie</span>
                  </div>
                  {navCategories.map((cat) => (
                    <Link
                      key={cat.label}
                      href={cat.href}
                      onClick={() => setCatOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted/40 hover:text-primary transition-colors"
                    >
                      <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon name={cat.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-primary" />
                      </div>
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <form className="flex flex-1 max-w-lg" onSubmit={handleSearch}>
              <div className="relative w-full">
                <Icon name="MagnifyingGlassIcon" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cerca Windows, Office, Autodesk, Kaspersky..."
                  className="w-full bg-muted/50 border border-border text-foreground placeholder-muted-foreground rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 ml-auto shrink-0">
              <Link href="/product-catalog" className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                Catalogo
              </Link>
              <Link href="/help-center" className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                Assistenza
              </Link>

              <div className="w-px h-5 bg-border mx-1" />

              <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50">
                <Icon name="HeartIcon" size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={openCart}
                className="relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
              >
                <Icon name="ShoppingCartIcon" size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <Link
                href="/product-catalog"
                className="ml-1 flex items-center gap-1.5 btn-primary text-sm px-4 py-2 rounded-lg"
              >
                <Icon name="BoltIcon" size={14} variant="solid" />
                Acquista
              </Link>
            </div>
          </div>
        </div>

        {/* ── TRUST BAR DESKTOP ── */}
        <div className="hidden lg:block border-t border-border bg-muted/30">
          <div className="section-container flex items-center justify-center gap-8 py-1.5">
            {[
              { icon: '🔒', text: 'Pagamento Sicuro SSL' },
              { icon: '⚡', text: 'Consegna via Email Istantanea' },
              { icon: '✅', text: 'Licenze Originali Garantite' },
              { icon: '🔄', text: 'Rimborso 30 Giorni' },
              { icon: '🇮🇹', text: 'Supporto in Italiano' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                <span>{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white border-r border-border flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <LogoIcon size={26} />
                <span className="font-bold text-foreground tracking-tight">Licenvo</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50">
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b border-border">
              <form onSubmit={handleMobileSearch}>
                <div className="relative">
                  <Icon name="MagnifyingGlassIcon" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    value={mobileSearch}
                    onChange={(e) => setMobileSearch(e.target.value)}
                    placeholder="Cerca prodotti..."
                    className="w-full bg-muted/60 border border-border text-foreground placeholder-muted-foreground rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    autoFocus
                  />
                </div>
              </form>
            </div>

            {/* Nav */}
            <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
              <Link href="/product-catalog" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-primary bg-primary/5 rounded-lg">
                <Icon name="TagIcon" size={17} className="text-primary" />
                Tutti i Prodotti
              </Link>

              <div className="pt-3 pb-1 px-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Categorie</span>
              </div>

              {navCategories.map((cat) => (
                <Link key={cat.label} href={cat.href} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                  <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name={cat.icon as Parameters<typeof Icon>[0]['name']} size={13} className="text-primary" />
                  </div>
                  {cat.label}
                </Link>
              ))}

              <div className="border-t border-border my-3" />

              <button onClick={() => { setMobileOpen(false); openCart(); }}
                className="w-full flex items-center gap-3 px-3 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                <Icon name="ShoppingCartIcon" size={17} className="text-primary/70" />
                Carrello
                {itemCount > 0 && (
                  <span className="ml-auto bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{itemCount}</span>
                )}
              </button>

              <Link href="/help-center" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                <Icon name="QuestionMarkCircleIcon" size={17} className="text-primary/70" />
                Assistenza
              </Link>
            </div>

            {/* Trust badges mobile */}
            <div className="border-t border-border p-4 space-y-2">
              {['🔒 Pagamento Sicuro SSL', '✅ Licenze Originali', '🔄 Rimborso 30 Giorni'].map((t) => (
                <div key={t} className="text-xs text-muted-foreground flex items-center gap-2">{t}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
