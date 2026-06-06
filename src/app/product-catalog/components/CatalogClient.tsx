import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearch, useLocation } from 'wouter';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/AppIcon';
import { categories } from '@/data/products';
import { useShopifyProducts } from '@/hooks/useShopifyProducts';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'discount' | 'rating' | 'bestseller';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Rilevanza' },
  { value: 'price-asc', label: 'Prezzo: Crescente' },
  { value: 'price-desc', label: 'Prezzo: Decrescente' },
  { value: 'discount', label: 'Maggior Sconto' },
  { value: 'rating', label: 'Migliori Recensioni' },
  { value: 'bestseller', label: 'Più Venduti' },
];

// Filter helpers
function isMicrosoftCategory(category: string): boolean {
  const cat = category.toLowerCase();
  return cat.includes('windows') || cat.includes('office');
}
function isWindowsCategory(category: string): boolean {
  return category.toLowerCase().includes('windows');
}
function isOfficeCategory(category: string, title: string): boolean {
  const t = title.toLowerCase();
  const cat = category.toLowerCase();
  return (cat.includes('office') || t.includes('office')) && !t.includes('visio') && !t.includes('project');
}
function isMicrosoft365Category(_category: string, title: string): boolean {
  const t = title.toLowerCase();
  return t.includes('microsoft 365') || t.includes('m365');
}
function isAutodeskCategory(category: string): boolean {
  return category.toLowerCase().includes('autodesk');
}

function isAntivirusCategory(category: string): boolean {
  return category.toLowerCase().includes('antivirus');
}

function isBundleCategory(category: string): boolean {
  return category.toLowerCase().includes('bundle');
}

function isVisioProjectTitle(title: string): boolean {
  const t = title.toLowerCase();
  return t.includes('visio') || t.includes('project');
}

// Sidebar filter tabs
const filterTabs = [
  { key: 'all', label: 'Tutti' },
  { key: 'windows', label: 'Windows' },
  { key: 'office', label: 'Office' },
  { key: 'microsoft-365', label: 'M365' },
  { key: 'autodesk', label: 'Autodesk' },
  { key: 'antivirus', label: 'Antivirus' },
  { key: 'bundle', label: 'Bundle' },
  { key: 'visio-project', label: 'Visio & Project' },
] as const;

type FilterKey = typeof filterTabs[number]['key'];

export default function CatalogClient() {
  const { products, loading } = useShopifyProducts();
  const searchStr = useSearch();
  const [location] = useLocation();

  // Mappa pathname → filterKey (per route tipo /windows, /office, ecc.)
  const pathnameFilter: FilterKey = useMemo(() => {
    const map: Record<string, FilterKey> = {
      '/windows': 'windows',
      '/office': 'office',
      '/antivirus': 'antivirus',
      '/bundles': 'bundle',
      '/visio-project': 'visio-project',
    };
    return map[location] ?? 'all';
  }, [location]);

  const urlParams = useMemo(() => new URLSearchParams(searchStr), [searchStr]);

  const [search, setSearch] = useState(() => urlParams.get('q') ?? '');
  const [selectedCat, setSelectedCat] = useState<string>(() => urlParams.get('cat') ?? 'all');
  const [categoryParam, setCategoryParam] = useState<string>(() => urlParams.get('category') ?? '');
  const [filterKey, setFilterKey] = useState<FilterKey>(() => {
    const cat = urlParams.get('category') ?? '';
    const catSlug = urlParams.get('cat') ?? 'all';
    if (catSlug === 'windows' || cat === 'windows') return 'windows';
    if (catSlug === 'office' || cat === 'office') return 'office';
    if (catSlug === 'microsoft-365' || cat === 'microsoft-365') return 'microsoft-365';
    if (catSlug === 'autodesk' || cat === 'autodesk') return 'autodesk';
    if (catSlug === 'antivirus' || cat === 'antivirus') return 'antivirus';
    if (catSlug === 'bundle' || cat === 'bundle') return 'bundle';
    if (catSlug === 'visio-project' || cat === 'visio-project') return 'visio-project';
    // Fallback: leggi il pathname direttamente
    const pathMap: Record<string, FilterKey> = {
      '/windows': 'windows', '/office': 'office', '/antivirus': 'antivirus',
      '/bundles': 'bundle', '/visio-project': 'visio-project',
    };
    return pathMap[window.location.pathname] ?? 'all';
  });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [minRating, setMinRating] = useState(0);
  const [instantOnly, setInstantOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>(() => {
    const f = urlParams.get('filter');
    if (f === 'bestseller') return 'bestseller';
    return 'default';
  });

  useEffect(() => {
    const q = urlParams.get('q') ?? '';
    const cat = urlParams.get('cat') ?? 'all';
    const category = urlParams.get('category') ?? '';
    const filter = urlParams.get('filter');
    setSearch(q);
    setSelectedCat(cat);
    setCategoryParam(category);
    if (filter === 'bestseller') setSort('bestseller');
    // Sync filterKey from URL
    if (cat === 'windows' || category === 'windows') setFilterKey('windows');
    else if (cat === 'office' || category === 'office') setFilterKey('office');
    else if (cat === 'microsoft-365' || category === 'microsoft-365') setFilterKey('microsoft-365');
    else if (cat === 'autodesk' || category === 'autodesk') setFilterKey('autodesk');
    else if (cat === 'antivirus' || category === 'antivirus') setFilterKey('antivirus');
    else if (cat === 'bundle' || category === 'bundle') setFilterKey('bundle');
    else if (cat === 'visio-project' || category === 'visio-project') setFilterKey('visio-project');
    else if (pathnameFilter !== 'all') setFilterKey(pathnameFilter);
    else setFilterKey('all');
  }, [urlParams, pathnameFilter]);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const applyFilterTab = (key: FilterKey) => {
    setFilterKey(key);
    // Reset category-related state
    setSelectedCat('all');
    setCategoryParam(key !== 'all' ? key : '');
  };

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.nameIt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    // Apply tab filter
    if (filterKey === 'windows') {
      list = list.filter((p) => isWindowsCategory(p.category));
    } else if (filterKey === 'office') {
      list = list.filter((p) => isOfficeCategory(p.category, p.nameIt ?? p.name ?? ''));
    } else if (filterKey === 'microsoft-365') {
      list = list.filter((p) => isMicrosoft365Category(p.category, p.nameIt ?? p.name ?? ''));
    } else if (filterKey === 'autodesk') {
      list = list.filter((p) => isAutodeskCategory(p.category));
    } else if (filterKey === 'antivirus') {
      list = list.filter((p) => isAntivirusCategory(p.category));
    } else if (filterKey === 'bundle') {
      list = list.filter((p) => isBundleCategory(p.category, p.nameIt ?? p.name ?? ''));
    } else if (filterKey === 'visio-project') {
      list = list.filter((p) => isVisioProjectTitle(p.nameIt ?? p.name ?? ''));
    } else if (selectedCat !== 'all') {
      const cat = categories.find((c) => c.slug === selectedCat);
      if (cat) list = list.filter((p) => p.category === cat.name);
    }

    list = list.filter(
      (p) => p.salePrice >= minPrice && p.salePrice <= maxPrice
    );

    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (instantOnly) list = list.filter((p) => p.instantDelivery);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.salePrice - b.salePrice); break;
      case 'price-desc': list.sort((a, b) => b.salePrice - a.salePrice); break;
      case 'discount': list.sort((a, b) => b.discount - a.discount); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'bestseller': list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)); break;
    }

    return list;
  }, [products, search, filterKey, selectedCat, categoryParam, minPrice, maxPrice, minRating, instantOnly, sort]);

  const activeFilterLabel = filterTabs.find((t) => t.key === filterKey)?.label ?? '';
  const activeFilters = [
    filterKey !== 'all' && activeFilterLabel,
    instantOnly && 'Consegna Istantanea',
    minRating > 0 && `Min ${minRating}★`,
  ].filter(Boolean) as string[];

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Categoria</h3>
        <div className="space-y-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => applyFilterTab(tab.key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                filterKey === tab.key
                  ? 'bg-primary/20 text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <span>{tab.label}</span>
              {'badge' in tab && tab.badge && (
                <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Fascia di Prezzo</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full input-dark text-sm py-1.5 text-center"
              placeholder="Min"
            />
            <span className="text-muted-foreground text-sm">—</span>
            <input
              type="number"
              min={minPrice}
              max={300}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full input-dark text-sm py-1.5 text-center"
              placeholder="Max"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>€{minPrice}</span>
            <span>€{maxPrice}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Valutazione Minima</h3>
        <div className="space-y-1">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${minRating === r ? 'bg-primary/20 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
            >
              {r === 0 ? (
                'Tutti'
              ) : (
                <>
                  <span className="text-amber-400">{'★'.repeat(Math.floor(r))}</span>
                  <span>{r}+</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={() => setInstantOnly((v) => !v)}
          className={`w-full flex items-center justify-between px-3 py-3 rounded-xl border transition-all ${instantOnly ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-border text-muted-foreground'}`}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>⚡</span>
            <span>Solo Consegna Istantanea</span>
          </div>
          <div className={`w-9 h-5 rounded-full transition-colors relative ${instantOnly ? 'bg-emerald-500' : 'bg-muted'}`}>
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${instantOnly ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
        </button>
      </div>

      <button
        onClick={() => {
          applyFilterTab('all');
          setMinPrice(0);
          setMaxPrice(300);
          setMinRating(0);
          setInstantOnly(false);
          setSort('default');
        }}
        className="w-full btn-ghost text-sm border border-border rounded-xl py-2"
      >
        Azzera Filtri
      </button>
    </div>
  );

  return (
    <div className="section-container pt-4 pb-8">
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <Icon name="ChevronRightIcon" size={12} />
        <span className="text-foreground">Catalogo Prodotti</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-display font-extrabold text-foreground mb-2">Catalogo Prodotti</h1>
        <p className="text-muted-foreground text-sm flex items-center gap-2">
          {loading ? (
            <>
              <span className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin inline-block" />
              Caricamento prodotti da Shopify...
            </>
          ) : (
            `${filtered.length} prodotti disponibili · Consegna istantanea su tutti gli articoli`
          )}
        </p>
      </div>

      {/* Filter tab bar */}
      <div className="flex flex-wrap gap-2 mb-5 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => applyFilterTab(tab.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
              filterKey === tab.key
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/50'
            }`}
          >
            {tab.label}
            {'badge' in tab && tab.badge && (
              <span className="ml-1.5 text-[10px] opacity-70">{tab.badge}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca prodotti..."
            className="w-full input-dark pl-9 text-sm"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="input-dark text-sm min-w-[180px] cursor-pointer"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value} className="bg-card">
              {o.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => setFiltersOpen(true)}
          className="lg:hidden btn-secondary flex items-center gap-2 text-sm"
        >
          <Icon name="FunnelIcon" size={16} />
          Filtri
          {activeFilters.length > 0 && (
            <span className="bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {activeFilters.length}
            </span>
          )}
        </button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {activeFilters.map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5 bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/30">
              {f}
              <button
                onClick={() => {
                  if (f === 'Consegna Istantanea') setInstantOnly(false);
                  else if (f.startsWith('Min')) setMinRating(0);
                  else applyFilterTab('all');
                }}
                className="hover:text-white transition-colors"
              >
                <Icon name="XMarkIcon" size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20 glass-card rounded-2xl p-5">
            <h2 className="font-bold text-foreground text-sm mb-5 flex items-center gap-2">
              <Icon name="FunnelIcon" size={16} className="text-primary" />
              Filtri
            </h2>
            <FilterSidebar />
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-muted/30 border border-border animate-pulse h-64" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10">
              <Icon name="MagnifyingGlassIcon" size={48} className="mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-lg font-bold text-foreground mb-2">Nessun prodotto trovato</h3>
              <p className="text-muted-foreground text-sm mb-4">Prova a modificare i filtri o la ricerca</p>
              <button
                onClick={() => { setSearch(''); applyFilterTab('all'); setInstantOnly(false); setMinRating(0); }}
                className="btn-primary text-sm"
              >
                Azzera Filtri
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[min(288px,85vw)] bg-card border-l border-border flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-bold text-foreground">Filtri</span>
              <button onClick={() => setFiltersOpen(false)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg">
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterSidebar />
            </div>
            <div className="p-4 border-t border-border">
              <button onClick={() => setFiltersOpen(false)} className="w-full btn-primary text-sm">
                Applica Filtri ({filtered.length} risultati)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
