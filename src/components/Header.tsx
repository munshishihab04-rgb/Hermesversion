import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import LogoIcon from '@/components/ui/LogoIcon';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCustomer } from '@/context/CustomerContext';

// ── MENU PRINCIPALE ──────────────────────────────────────────────────────────
const navItems = [
  {
    label: 'Microsoft',
    dropdown: [
      { label: 'Windows',           href: '/windows',        icon: 'WindowIcon' },
      { label: 'Office',            href: '/office',         icon: 'DocumentTextIcon' },
      { label: 'Microsoft 365',     href: '/product-catalog?category=microsoft-365', icon: 'CloudIcon' },
      { label: 'Bundle Win+Office', href: '/bundles',        icon: 'RectangleGroupIcon' },
      { label: 'Visio & Project',   href: '/visio-project',  icon: 'PresentationChartBarIcon' },
    ],
  },
  {
    label: 'Autodesk',
    dropdown: [
      { label: 'Autodesk Collections',      href: '/autodesk-collections',                   icon: 'CubeIcon' },
      { label: 'Tutti i prodotti Autodesk',  href: '/product-catalog?category=autodesk',     icon: 'Squares2X2Icon' },
    ],
  },
  { label: 'Antivirus',  href: '/antivirus' },
  { label: 'Catalogo',   href: '/product-catalog' },
  { label: 'Assistenza', href: '/assistenza' },
];

// Categorie mobile con colori e descrizioni
const mobileCategories = [
  {
    section: 'Microsoft',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    items: [
      { label: 'Windows',           sub: 'Win 10 & 11',        href: '/windows',                                icon: 'WindowIcon',                  color: 'text-blue-600',   dot: 'bg-blue-500' },
      { label: 'Office',            sub: '2021 & 2024',         href: '/office',                                 icon: 'DocumentTextIcon',            color: 'text-orange-600', dot: 'bg-orange-500' },
      { label: 'Microsoft 365',     sub: 'Personal & Family',   href: '/product-catalog?category=microsoft-365', icon: 'CloudIcon',                   color: 'text-teal-600',   dot: 'bg-teal-500' },
      { label: 'Bundle',            sub: 'Win + Office',        href: '/bundles',                                icon: 'RectangleGroupIcon',          color: 'text-purple-600', dot: 'bg-purple-500' },
      { label: 'Visio & Project',   sub: '2021 Professional',   href: '/visio-project',                          icon: 'PresentationChartBarIcon',    color: 'text-indigo-600', dot: 'bg-indigo-500' },
    ],
  },
  {
    section: 'Autodesk',
    color: 'from-slate-600 to-slate-700',
    bg: 'bg-slate-50',
    items: [
      { label: 'Collections',       sub: 'AEC · PDM · M&E',     href: '/autodesk-collections',                  icon: 'CubeIcon',                    color: 'text-slate-700',  dot: 'bg-slate-600' },
      { label: 'Tutti i prodotti',  sub: 'AutoCAD, Revit...',   href: '/product-catalog?category=autodesk',     icon: 'Squares2X2Icon',              color: 'text-slate-700',  dot: 'bg-slate-500' },
    ],
  },
  {
    section: 'Sicurezza',
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50',
    items: [
      { label: 'Antivirus',         sub: 'Kaspersky',            href: '/antivirus',                             icon: 'ShieldCheckIcon',             color: 'text-green-700',  dot: 'bg-green-500' },
    ],
  },
];

const announcementMessages = [
  '⚡ Consegna istantanea via email — licenze originali garantite al 100%',
  '🛡️ Pagamento sicuro SSL · Garanzia rimborso 30 giorni · Supporto in italiano',
  '🏆 Oltre 10.000 clienti soddisfatti — Recensioni verificate ★★★★★',
];

export default function Header() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery]       = useState('');
  const [mobileSearch, setMobileSearch]     = useState('');
  const [annIdx, setAnnIdx]                 = useState(0);
  const [searchFocused, setSearchFocused]   = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const { openCart, itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [, navigate] = useLocation();
  const { customer, isAuthenticated, login, logout } = useCustomer();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

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
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveDropdown(null);
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => mobileSearchRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = '';
    }
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

  const close = () => setMobileOpen(false);

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

          {/* ── MOBILE HEADER BAR ── */}
          <div className="flex lg:hidden items-center h-14 relative gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              aria-label="Apri menu"
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
          <div className="hidden lg:flex items-center gap-2 h-16" ref={navRef}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 mr-4">
              <LogoIcon size={32} />
              <span className="font-extrabold text-xl text-foreground" style={{ letterSpacing: '-0.025em' }}>Licenvo</span>
            </Link>

            {/* ── NAV ITEMS ── */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                if (item.dropdown) {
                  const isOpen = activeDropdown === item.label;
                  return (
                    <div key={item.label} className="relative">
                      <button
                        onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                        className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                          isOpen
                            ? 'text-primary bg-primary/5'
                            : 'text-foreground hover:text-primary hover:bg-muted/50'
                        }`}
                      >
                        {item.label}
                        <Icon
                          name="ChevronDownIcon"
                          size={13}
                          className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50">
                          <div className="px-3 py-2 border-b border-border">
                            <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">{item.label}</span>
                          </div>
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted/40 hover:text-primary transition-colors"
                            >
                              <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                                <Icon name={sub.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-primary" />
                              </div>
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 px-3 py-2 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Search */}
            <form className="flex flex-1 max-w-md ml-4" onSubmit={handleSearch}>
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
              <div className="relative" ref={accountRef}>
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                      className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors text-foreground hover:text-primary hover:bg-muted/50"
                    >
                      <Icon name="UserCircleIcon" size={20} />
                      <span className="max-w-[80px] truncate">{customer?.firstName}</span>
                      <Icon name="ChevronDownIcon" size={12} className={`text-muted-foreground transition-transform ${accountDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {accountDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50">
                        <Link href="/account" onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted/40 hover:text-primary transition-colors">
                          <Icon name="UserCircleIcon" size={15} className="text-primary" />
                          Il mio account
                        </Link>
                        <button onClick={() => { setAccountDropdownOpen(false); logout(); }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted/40 hover:text-destructive transition-colors">
                          <Icon name="ArrowRightStartOnRectangleIcon" size={15} className="text-muted-foreground" />
                          Esci
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button onClick={login}
                    className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors text-foreground hover:text-primary hover:bg-muted/50">
                    <Icon name="UserCircleIcon" size={20} />
                    Accedi
                  </button>
                )}
              </div>

              <div className="w-px h-5 bg-border mx-1" />

              <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50">
                <Icon name="HeartIcon" size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button onClick={openCart}
                className="relative p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50">
                <Icon name="ShoppingCartIcon" size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <Link href="/product-catalog" className="ml-1 flex items-center gap-1.5 btn-primary text-sm px-4 py-2 rounded-lg">
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

      {/* ══════════════════════════════════════════════════
          MOBILE MENU — Full-screen modern redesign
      ══════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
            style={{ animation: 'fadeIn 0.2s ease' }}
          />

          {/* Panel — slide in from left */}
          <div
            className="absolute left-0 top-0 bottom-0 flex flex-col bg-white shadow-2xl"
            style={{
              width: 'min(88vw, 340px)',
              animation: 'slideInLeft 0.28s cubic-bezier(0.32,0.72,0,1)',
            }}
          >
            {/* ── HEADER ── */}
            <div
              className="relative flex items-center justify-between px-5 py-4 text-white"
              style={{ background: 'linear-gradient(135deg, #0052CC 0%, #0747A6 100%)' }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <LogoIcon size={22} className="brightness-0 invert" />
                </div>
                <div>
                  <div className="font-bold text-base leading-tight tracking-tight">Licenvo</div>
                  <div className="text-[10px] text-white/70 font-medium">Licenze Software Originali</div>
                </div>
              </div>
              <button
                onClick={close}
                className="w-8 h-8 bg-white/15 hover:bg-white/25 rounded-xl flex items-center justify-center transition-colors"
                aria-label="Chiudi menu"
              >
                <Icon name="XMarkIcon" size={18} className="text-white" />
              </button>

              {/* Decorative circles */}
              <div className="absolute right-12 top-1 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute right-4 -top-4 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
            </div>

            {/* ── SEARCH ── */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <form onSubmit={handleMobileSearch}>
                <div className="relative">
                  <Icon
                    name="MagnifyingGlassIcon"
                    size={16}
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                      searchFocused ? 'text-primary' : 'text-gray-400'
                    }`}
                  />
                  <input
                    ref={mobileSearchRef}
                    type="text"
                    value={mobileSearch}
                    onChange={(e) => setMobileSearch(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder="Cerca prodotti..."
                    className="w-full bg-white border text-gray-800 placeholder-gray-400 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none transition-all"
                    style={{
                      borderColor: searchFocused ? '#0052CC' : '#e5e7eb',
                      boxShadow: searchFocused ? '0 0 0 3px rgba(0,82,204,0.12)' : 'none',
                    }}
                  />
                  {mobileSearch && (
                    <button
                      type="button"
                      onClick={() => setMobileSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Icon name="XMarkIcon" size={14} />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* ── PROMO STRIP ── */}
            <div className="mx-4 mt-3 mb-1 rounded-xl overflow-hidden"
              style={{ background: 'linear-gradient(90deg, #FF6B35 0%, #e85d2a 100%)' }}>
              <Link href="/product-catalog" onClick={close}
                className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Icon name="BoltIcon" size={14} variant="solid" className="text-white" />
                  <span className="text-white text-xs font-semibold">Offerte in evidenza</span>
                </div>
                <div className="flex items-center gap-1 bg-white/20 rounded-lg px-2.5 py-1">
                  <span className="text-white text-xs font-medium">Vedi tutto</span>
                  <Icon name="ChevronRightIcon" size={11} className="text-white" />
                </div>
              </Link>
            </div>

            {/* ── CATEGORIES SCROLL AREA ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4" style={{ scrollbarWidth: 'none' }}>

              {mobileCategories.map((section) => (
                <div key={section.section} className="mt-4">
                  {/* Section label */}
                  <div className="flex items-center gap-2 mb-2.5 px-0.5">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${section.color}`} />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      {section.section}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={close}
                        className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors group"
                      >
                        {/* Icon box */}
                        <div className="w-9 h-9 rounded-xl bg-gray-50 group-hover:bg-white border border-gray-100 flex items-center justify-center shrink-0 transition-colors shadow-sm">
                          <Icon
                            name={item.icon as Parameters<typeof Icon>[0]['name']}
                            size={17}
                            className={item.color}
                          />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-800 leading-tight">{item.label}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{item.sub}</div>
                        </div>

                        {/* Arrow */}
                        <Icon name="ChevronRightIcon" size={14} className="text-gray-300 group-hover:text-gray-400 shrink-0 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* ── DIVIDER ── */}
              <div className="mt-4 border-t border-gray-100" />

              {/* ── UTILITY LINKS ── */}
              <div className="mt-3 space-y-0.5">
                <button
                  onClick={() => { close(); openCart(); }}
                  className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon name="ShoppingCartIcon" size={17} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold text-gray-800">Carrello</div>
                  </div>
                  {itemCount > 0 && (
                    <span className="bg-primary text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{itemCount}</span>
                  )}
                </button>

                {isAuthenticated ? (
                  <Link href="/account" onClick={close}
                    className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                      <Icon name="UserCircleIcon" size={17} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-800">Il mio account</div>
                      <div className="text-xs text-gray-400">{customer?.firstName}</div>
                    </div>
                    <Icon name="ChevronRightIcon" size={14} className="text-gray-300" />
                  </Link>
                ) : (
                  <button onClick={() => { close(); login(); }}
                    className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                      <Icon name="UserCircleIcon" size={17} className="text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold text-gray-800">Accedi</div>
                      <div className="text-xs text-gray-400">Area clienti</div>
                    </div>
                    <Icon name="ChevronRightIcon" size={14} className="text-gray-300" />
                  </button>
                )}

                <Link href="/assistenza" onClick={close}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon name="QuestionMarkCircleIcon" size={17} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">Assistenza</div>
                    <div className="text-xs text-gray-400">Supporto in italiano</div>
                  </div>
                  <Icon name="ChevronRightIcon" size={14} className="text-gray-300" />
                </Link>
              </div>
            </div>

            {/* ── TRUST FOOTER ── */}
            <div className="border-t border-gray-100 bg-gray-50 px-5 py-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: '🔒', label: 'SSL' },
                  { icon: '✅', label: 'Originali' },
                  { icon: '🔄', label: '30 giorni' },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center gap-0.5">
                    <span className="text-base">{t.icon}</span>
                    <span className="text-[10px] font-medium text-gray-500">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
