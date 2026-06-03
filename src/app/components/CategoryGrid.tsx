import React from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';
import { categories } from '@/data/products';

const categoryConfig = [
  { id: 'windows-office', colSpan: 'lg:col-span-2', rowSpan: '', minH: 'min-h-[160px]' },
  { id: 'abbonamenti', colSpan: 'lg:col-span-1', rowSpan: '', minH: 'min-h-[160px]' },
  { id: 'antivirus', colSpan: 'lg:col-span-1', rowSpan: '', minH: 'min-h-[160px]' },
  { id: 'gaming', colSpan: 'lg:col-span-2', rowSpan: '', minH: 'min-h-[160px]' },
  { id: 'vpn', colSpan: 'lg:col-span-1', rowSpan: '', minH: 'min-h-[160px]' },
  { id: 'adobe', colSpan: 'lg:col-span-1', rowSpan: '', minH: 'min-h-[160px]' },
];

const gradientMap: Record<string, string> = {
  'windows-office': 'from-blue-600/25 to-blue-400/5',
  abbonamenti: 'from-purple-600/25 to-purple-400/5',
  antivirus: 'from-emerald-600/25 to-emerald-400/5',
  gaming: 'from-amber-600/25 to-amber-400/5',
  vpn: 'from-cyan-600/25 to-cyan-400/5',
  adobe: 'from-pink-600/25 to-pink-400/5',
};

const colorMap: Record<string, string> = {
  'windows-office': 'text-blue-400',
  abbonamenti: 'text-purple-400',
  antivirus: 'text-emerald-400',
  gaming: 'text-amber-400',
  vpn: 'text-cyan-400',
  adobe: 'text-pink-400',
};

const borderMap: Record<string, string> = {
  'windows-office': 'hover:border-blue-500/40',
  abbonamenti: 'hover:border-purple-500/40',
  antivirus: 'hover:border-emerald-500/40',
  gaming: 'hover:border-amber-500/40',
  vpn: 'hover:border-cyan-500/40',
  adobe: 'hover:border-pink-500/40',
};

export default function CategoryGrid() {
  return (
    <section className="py-8 bg-secondary/10">
      <div className="section-container">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="section-title mb-2">Esplora le Categorie</h2>
            <p className="section-subtitle text-sm">Trova la licenza perfetta per le tue esigenze</p>
          </div>
          <Link href="/product-catalog" className="btn-ghost text-sm hidden sm:flex items-center gap-1">
            Vedi tutto <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        {/* BENTO GRID AUDIT:
         * 6 cards: windows-office(cs-2), abbonamenti(cs-1), antivirus(cs-1), gaming(cs-2), vpn(cs-1), adobe(cs-1)
         * Row 1: [col-1-2: windows-office cs-2] [col-3: abbonamenti cs-1] [col-4: antivirus cs-1]
         * Row 2: [col-1-2: gaming cs-2] [col-3: vpn cs-1] [col-4: adobe cs-1]
         * Placed 6/6 ✓
         */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map((cat, idx) => {
            const cfg = categoryConfig.find((c) => c.id === cat.id);
            return (
              <Link
                key={cat.id}
                href={`/product-catalog?cat=${cat.slug}`}
                className={`group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 ${cfg?.colSpan || ''} ${cfg?.minH || 'min-h-[140px]'} ${borderMap[cat.id] || 'hover:border-primary/40'} category-card-hover`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientMap[cat.id] || 'from-primary/20 to-transparent'} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative p-6 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center category-icon transition-transform duration-300`}>
                      <Icon
                        name={cat.icon as Parameters<typeof Icon>[0]['name']}
                        size={24}
                        className={colorMap[cat.id] || 'text-primary'}
                      />
                    </div>
                    <Icon name="ArrowUpRightIcon" size={16} className="text-muted-foreground group-hover:text-foreground transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base mb-1">{cat.nameIt}</h3>
                    <p className="text-xs text-muted-foreground">{cat.count} prodotti</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}