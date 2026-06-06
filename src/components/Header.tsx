import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import LogoIcon from '@/components/ui/LogoIcon';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCustomer } from '@/context/CustomerContext';

// ─── SVG ICONS (inline, no dependency) ──────────────────────────────────────
const Icons = {
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Search: ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Cart: ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  ),
  User: ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Heart: ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  ),
  ChevronDown: ({ size = 14, className = '' }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  ChevronRight: ({ size = 13 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Bolt: ({ size = 14 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Logout: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  // Category icons
  Windows: () => (
    <svg width="17" height="17" viewBox="0 0 88 88" fill="currentColor">
      <rect x="2" y="2" width="38" height="38"/><rect x="48" y="2" width="38" height="38"/>
      <rect x="2" y="48" width="38" height="38"/><rect x="48" y="48" width="38" height="38"/>
    </svg>
  ),
  Office: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Cloud: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
    </svg>
  ),
  Bundle: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Chart: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="3 9 21 9"/><line x1="12" y1="9" x2="12" y2="21"/>
    </svg>
  ),
  Box3D: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Grid: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Shield: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Tag: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  Help: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
};

// ─── NAV DATA ─────────────────────────────────────────────────────────────────
const navItems = [
  {
    label: 'Microsoft',
    dropdown: [
      { label: 'Windows',           sub: 'Win 10 & 11',          href: '/product-catalog?cat=windows',                                    Icon: Icons.Windows,  accent: '#0078D4' },
      { label: 'Office',            sub: 'Office 2021 & 2024',   href: '/product-catalog?cat=office',                                     Icon: Icons.Office,   accent: '#D83B01' },
      { label: 'Microsoft 365',     sub: 'Personal & Family',    href: '/product-catalog?category=microsoft-365',     Icon: Icons.Cloud,    accent: '#0078D4' },
      { label: 'Bundle Win+Office', sub: 'Risparmia di più',     href: '/product-catalog?cat=bundle',                                    Icon: Icons.Bundle,   accent: '#7B2FBE' },
      { label: 'Visio & Project',   sub: 'Versione 2021',        href: '/product-catalog?cat=visio-project',                              Icon: Icons.Chart,    accent: '#3955A3' },
    ],
  },
  {
    label: 'Autodesk',
    dropdown: [
      { label: 'Collections',       sub: 'AEC · PDM · M&E',      href: '/autodesk-collections',                       Icon: Icons.Box3D,    accent: '#0696D7' },
      { label: 'Tutti i prodotti',  sub: 'AutoCAD, Revit, Maya…', href: '/product-catalog?category=autodesk',         Icon: Icons.Grid,     accent: '#0696D7' },
    ],
  },
  { label: 'Antivirus', href: '/product-catalog?cat=antivirus' },
  { label: 'Catalogo',  href: '/product-catalog' },
  { label: 'Supporto',  href: '/assistenza' },
];

// ─── MOBILE CATEGORIES ────────────────────────────────────────────────────────
const mobileSections = [
  {
    label: 'Microsoft',
    dotColor: '#0078D4',
    items: [
      { label: 'Windows',         sub: 'Win 10 & 11',           href: '/product-catalog?cat=windows',                                 Icon: Icons.Windows,  bg: '#EFF6FF', color: '#1D4ED8' },
      { label: 'Office',          sub: '2021 & 2024',           href: '/product-catalog?cat=office',                                  Icon: Icons.Office,   bg: '#FFF7ED', color: '#C2410C' },
      { label: 'Microsoft 365',   sub: 'Personal & Family',     href: '/product-catalog?category=microsoft-365', Icon: Icons.Cloud,    bg: '#F0FDFA', color: '#0F766E' },
      { label: 'Bundle',          sub: 'Win + Office combo',    href: '/product-catalog?cat=bundle',                                 Icon: Icons.Bundle,   bg: '#FAF5FF', color: '#7E22CE' },
      { label: 'Visio & Project', sub: '2021 Professional',     href: '/product-catalog?cat=visio-project',                           Icon: Icons.Chart,    bg: '#EEF2FF', color: '#3730A3' },
    ],
  },
  {
    label: 'Autodesk',
    dotColor: '#0696D7',
    items: [
      { label: 'Collections',      sub: 'AEC · PDM · M&E',      href: '/autodesk-collections',                    Icon: Icons.Box3D,    bg: '#F0F9FF', color: '#0369A1' },
      { label: 'Tutti i prodotti', sub: 'AutoCAD, Revit, Maya…', href: '/product-catalog?category=autodesk',      Icon: Icons.Grid,     bg: '#F0F9FF', color: '#0369A1' },
    ],
  },
  {
    label: 'Sicurezza',
    dotColor: '#16A34A',
    items: [
      { label: 'Antivirus',        sub: 'Kaspersky',             href: '/product-catalog?cat=antivirus',                               Icon: Icons.Shield,   bg: '#F0FDF4', color: '#15803D' },
    ],
  },
];

const announcements = [
  '⚡ Consegna istantanea via email — licenze originali garantite al 100%',
  '🛡️ Pagamento sicuro SSL · Rimborso 30 giorni · Supporto in italiano',
  '🏆 Oltre 10.000 clienti soddisfatti — Recensioni verificate ★★★★★',
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDD, setActiveDD]     = useState<string | null>(null);
  const [searchQ, setSearchQ]       = useState('');
  const [mobileQ, setMobileQ]       = useState('');
  const [annIdx, setAnnIdx]         = useState(0);
  const [accDD, setAccDD]           = useState(false);
  const navRef  = useRef<HTMLDivElement>(null);
  const accRef  = useRef<HTMLDivElement>(null);
  const { openCart, itemCount }      = useCart();
  const { count: wishCount }         = useWishlist();
  const [, navigate]                 = useLocation();
  const { customer, isAuthenticated, login, logout } = useCustomer();

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', s, { passive: true });
    return () => window.removeEventListener('scroll', s);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAnnIdx(i => (i + 1) % announcements.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveDD(null);
      if (accRef.current && !accRef.current.contains(e.target as Node)) setAccDD(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const doSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQ.trim()) { navigate(`/product-catalog?q=${encodeURIComponent(searchQ.trim())}`); setSearchQ(''); }
  };
  const doMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileQ.trim()) { setMobileOpen(false); navigate(`/product-catalog?q=${encodeURIComponent(mobileQ.trim())}`); }
  };
  const close = () => setMobileOpen(false);

  return (
    <div className="sticky top-0 left-0 right-0 z-50">

      {/* ── ANNOUNCEMENT ── */}
      <div className="announcement-bar text-white text-xs py-1.5 px-4 text-center overflow-hidden">
        <div key={annIdx} className="animate-float-up font-medium" style={{ animationDuration: '0.35s' }}>
          {announcements[annIdx]}
        </div>
      </div>

      {/* ══════════════════════════════════════
          HEADER
      ══════════════════════════════════════ */}
      <header className={`transition-all duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]' : 'bg-white border-b border-gray-100'
      }`}>
        <div className="section-container">

          {/* ── MOBILE BAR ── */}
          <div className="flex lg:hidden items-center h-14 gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 -ml-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Apri menu"
            >
              <Icons.Menu />
            </button>

            <Link href="/" className="flex-1 flex items-center justify-center gap-2">
              <LogoIcon size={26} />
              <span className="font-bold text-base text-gray-900" style={{ letterSpacing: '-0.02em' }}>Licenvo</span>
            </Link>

            <div className="flex items-center gap-0.5">
              <Link href="/product-catalog" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Icons.Search size={19} />
              </Link>
              <button onClick={openCart} className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Icons.Cart size={19} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">{itemCount}</span>
                )}
              </button>
            </div>
          </div>

          {/* ── DESKTOP BAR ── */}
          <div className="hidden lg:flex items-center gap-3 h-16" ref={navRef}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 mr-2 group">
              <LogoIcon size={30} />
              <span className="font-extrabold text-lg text-gray-900 group-hover:text-primary transition-colors" style={{ letterSpacing: '-0.03em' }}>Licenvo</span>
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-gray-200 mr-1" />

            {/* Nav */}
            <nav className="flex items-center gap-0.5">
              {navItems.map((item) => {
                if (item.dropdown) {
                  const open = activeDD === item.label;
                  return (
                    <div key={item.label} className="relative">
                      <button
                        onClick={() => setActiveDD(open ? null : item.label)}
                        className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                          open ? 'text-primary bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {item.label}
                        <Icons.ChevronDown size={12} className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                      </button>

                      {open && (
                        <div
                          className="absolute top-full left-0 mt-1.5 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50"
                          style={{ minWidth: '240px' }}
                        >
                          {/* Dropdown header */}
                          <div className="px-4 pt-3 pb-2 border-b border-gray-50">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.label}</span>
                          </div>
                          <div className="p-1.5">
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setActiveDD(null)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group/item"
                              >
                                <div
                                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110"
                                  style={{ backgroundColor: sub.accent + '18', color: sub.accent }}
                                >
                                  <sub.Icon />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-800 leading-tight">{sub.label}</div>
                                  <div className="text-xs text-gray-400 mt-0.5">{sub.sub}</div>
                                </div>
                                <Icons.ChevronRight size={12} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Search bar */}
            <form className="flex flex-1 max-w-xs ml-2" onSubmit={doSearch}>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Icons.Search size={15} />
                </span>
                <input
                  type="text"
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  placeholder="Cerca software..."
                  className="w-full bg-gray-100 border border-transparent text-gray-900 placeholder-gray-400 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto shrink-0">

              {/* Account */}
              <div className="relative" ref={accRef}>
                {isAuthenticated ? (
                  <>
                    <button onClick={() => setAccDD(!accDD)}
                      className="flex items-center gap-1.5 text-sm font-medium px-2.5 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                      <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{customer?.firstName?.[0]?.toUpperCase() ?? 'U'}</span>
                      </div>
                      <span className="max-w-[72px] truncate">{customer?.firstName}</span>
                      <Icons.ChevronDown size={11} className={`text-gray-400 transition-transform ${accDD ? 'rotate-180' : ''}`} />
                    </button>
                    {accDD && (
                      <div className="absolute top-full right-0 mt-1.5 w-44 bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.10)] border border-gray-100 overflow-hidden z-50">
                        <Link href="/account" onClick={() => setAccDD(false)}
                          className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <Icons.User size={15} />
                          Il mio account
                        </Link>
                        <button onClick={() => { setAccDD(false); logout(); }}
                          className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gray-50">
                          <Icons.Logout />
                          Esci
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button onClick={login}
                    className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                    <Icons.User size={18} />
                    Accedi
                  </button>
                )}
              </div>

              {/* Wishlist */}
              <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Icons.Heart size={19} />
                {wishCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[17px] h-[17px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{wishCount}</span>
                )}
              </button>

              {/* Cart */}
              <button onClick={openCart} className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Icons.Cart size={19} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[17px] h-[17px] bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">{itemCount}</span>
                )}
              </button>

              {/* CTA */}
              <Link href="/product-catalog"
                className="ml-1.5 flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90 hover:shadow-md"
                style={{ background: 'linear-gradient(135deg,#0052CC,#0747A6)' }}>
                <Icons.Bolt size={13} />
                Acquista
              </Link>
            </div>
          </div>
        </div>

        {/* Trust bar — desktop only */}
        <div className="hidden lg:block border-t border-gray-100">
          <div className="section-container flex items-center justify-center gap-8 py-1.5">
            {[
              {
                text: 'SSL Sicuro',
                svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              },
              {
                text: 'Consegna Istantanea',
                svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              },
              {
                text: 'Licenze Originali',
                svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              },
              {
                text: 'Rimborso 30gg',
                svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
              },
              {
                text: 'Supporto Italiano',
                svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap">
                <span className="text-primary/70">{b.svg}</span><span className="font-medium">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MOBILE MENU (full-screen drawer)
      ══════════════════════════════════════ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={close}
            style={{ animation: 'mcFadeIn 0.2s ease' }} />

          {/* Panel */}
          <div
            className="absolute left-0 top-0 bottom-0 flex flex-col bg-white"
            style={{ width: 'min(85vw, 320px)', animation: 'mcSlideIn 0.26s cubic-bezier(0.32,0.72,0,1)', boxShadow: '4px 0 40px rgba(0,0,0,0.15)' }}
          >
            {/* ── HEADER ── */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3"
              style={{ background: 'linear-gradient(135deg,#0052CC 0%,#003D99 100%)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
                  <LogoIcon size={22} />
                </div>
                <div>
                  <div className="font-bold text-white text-sm leading-tight">Licenvo</div>
                  <div className="text-[10px] text-blue-200 font-medium">Licenze Software Originali</div>
                </div>
              </div>
              <button onClick={close}
                className="w-8 h-8 bg-white/15 hover:bg-white/25 rounded-xl flex items-center justify-center transition-colors text-white">
                <Icons.Close />
              </button>
            </div>

            {/* ── SEARCH ── */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <form onSubmit={doMobileSearch}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Icons.Search size={15} />
                  </span>
                  <input
                    type="text"
                    value={mobileQ}
                    onChange={e => setMobileQ(e.target.value)}
                    placeholder="Cerca prodotti..."
                    className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                    // NO autoFocus — evita tastiera automatica
                  />
                </div>
              </form>
            </div>

            {/* ── PROMO BANNER ── */}
            <div className="mx-3 mt-3 mb-1">
              <Link href="/product-catalog" onClick={close}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-white"
                style={{ background: 'linear-gradient(90deg,#FF6B35,#e85525)' }}>
                <div className="flex items-center gap-2">
                  <Icons.Bolt size={13} />
                  <span className="text-xs font-semibold">Offerte in evidenza</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium bg-white/20 rounded-lg px-2 py-1">
                  Vedi tutto <Icons.ChevronRight size={11} />
                </div>
              </Link>
            </div>

            {/* ── SCROLL AREA ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-3 pb-3" style={{ scrollbarWidth: 'none' }}>

              {mobileSections.map(section => (
                <div key={section.label} className="mt-4">
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: section.dotColor }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{section.label}</span>
                  </div>
                  <div className="space-y-0.5">
                    {section.items.map(item => (
                      <Link key={item.label} href={item.href} onClick={close}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 active:scale-[0.99] transition-all group/row">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/row:scale-105"
                          style={{ background: item.bg, color: item.color }}>
                          <item.Icon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-800 leading-tight">{item.label}</div>
                          <div className="text-xs text-gray-400 mt-0.5 truncate">{item.sub}</div>
                        </div>
                        <Icons.ChevronRight size={13} />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-4 border-t border-gray-100" />

              {/* Utility */}
              <div className="mt-3 space-y-0.5">
                <button onClick={() => { close(); openCart(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-primary shrink-0">
                    <Icons.Cart size={17} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold text-gray-800">Carrello</div>
                  </div>
                  {itemCount > 0 && (
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{itemCount}</span>
                  )}
                </button>

                {isAuthenticated ? (
                  <Link href="/account" onClick={close}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-primary shrink-0">
                      <Icons.User size={17} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-800">Il mio account</div>
                      <div className="text-xs text-gray-400">{customer?.firstName}</div>
                    </div>
                    <Icons.ChevronRight size={13} />
                  </Link>
                ) : (
                  <button onClick={() => { close(); login(); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-primary shrink-0">
                      <Icons.User size={17} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold text-gray-800">Accedi</div>
                      <div className="text-xs text-gray-400">Area clienti</div>
                    </div>
                    <Icons.ChevronRight size={13} />
                  </button>
                )}

                <Link href="/assistenza" onClick={close}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                    <Icons.Help />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">Assistenza</div>
                    <div className="text-xs text-gray-400">Supporto in italiano</div>
                  </div>
                  <Icons.ChevronRight size={13} />
                </Link>
              </div>
            </div>

            {/* ── FOOTER ── */}
            <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
              <div className="grid grid-cols-3 gap-1 text-center">
                {[
                {
                  t: 'SSL Sicuro',
                  svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                },
                {
                  t: 'Originali',
                  svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                },
                {
                  t: '30 giorni',
                  svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                },
              ].map(b => (
                  <div key={b.t} className="flex flex-col items-center gap-0.5">
                    <span className="text-primary">{b.svg}</span>
                    <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{b.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes mcFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes mcSlideIn { from { transform:translateX(-100%) } to { transform:translateX(0) } }
      `}</style>
    </div>
  );
}
