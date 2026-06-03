import React from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';
import { categories } from '@/data/products';

const categoryConfig = [
  { id: 'windows-office', colSpan: 'lg:col-span-1', rowSpan: '', minH: 'min-h-[160px]' },
  { id: 'autodesk', colSpan: 'lg:col-span-1', rowSpan: '', minH: 'min-h-[160px]' },
  { id: 'antivirus', colSpan: 'lg:col-span-1', rowSpan: '', minH: 'min-h-[160px]' },
];

const gradientMap: Record<string, string> = {
  'windows-office': 'from-blue-600/25 to-blue-400/5',
  autodesk: 'from-blue-700/25 to-blue-500/5',
  antivirus: 'from-emerald-600/25 to-emerald-400/5',
};

const colorMap: Record<string, string> = {
  'windows-office': 'text-blue-400',
  autodesk: 'text-blue-500',
  antivirus: 'text-emerald-400',
};

const borderMap: Record<string, string> = {
  'windows-office': 'hover:border-blue-500/40',
  autodesk: 'hover:border-blue-600/40',
  antivirus: 'hover:border-emerald-500/40',
};

const categoryOverrides: Record<string, { nameIt: string; count: number; href: string; description: string }> = {
  'windows-office': {
    nameIt: 'Microsoft',
    count: 15,
    href: '/product-catalog?category=microsoft',
    description: 'Windows, Office, Microsoft 365',
  },
  autodesk: {
    nameIt: 'Autodesk',
    count: 21,
    href: '/autodesk-collections',
    description: 'AutoCAD, Revit, Maya e 30+ prodotti',
  },
  antivirus: {
    nameIt: 'Antivirus & VPN',
    count: 3,
    href: '/product-catalog?cat=antivirus',
    description: 'Kaspersky Standard, Plus, Premium',
  },
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const cfg = categoryConfig.find((c) => c.id === cat.id);
            const override = categoryOverrides[cat.id];
            return (
              <Link
                key={cat.id}
                href={override?.href ?? (cat.id === 'autodesk' ? '/autodesk-collections' : `/product-catalog?cat=${cat.slug}`)}
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
                    <h3 className="font-bold text-foreground text-base mb-1">{override?.nameIt ?? cat.nameIt}</h3>
                    <p className="text-xs text-muted-foreground">{override?.count ?? cat.count} prodotti</p>
                    {override?.description && (
                      <p className="text-xs text-muted-foreground mt-1">{override.description}</p>
                    )}
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
