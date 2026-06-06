import React from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';

interface CategoryItem {
  id: string;
  nameIt: string;
  count: number;
  href: string;
  description: string;
  icon: string;
  gradient: string;
  color: string;
  border: string;
}

const categoryItems: CategoryItem[] = [
  {
    id: 'windows',
    nameIt: 'Windows OS',
    count: 8,
    href: '/windows',
    description: 'Windows 10 Pro, Windows 11 Pro & Home',
    icon: 'WindowIcon',
    gradient: 'from-blue-600/25 to-blue-400/5',
    color: 'text-blue-400',
    border: 'hover:border-blue-500/40',
  },
  {
    id: 'office',
    nameIt: 'Microsoft Office',
    count: 7,
    href: '/office',
    description: 'Office 2021, 2024, Microsoft 365',
    icon: 'DocumentTextIcon',
    gradient: 'from-orange-600/25 to-orange-400/5',
    color: 'text-orange-400',
    border: 'hover:border-orange-500/40',
  },
  {
    id: 'autodesk',
    nameIt: 'Autodesk CAD',
    count: 21,
    href: '/autodesk-collections',
    description: 'AutoCAD, Revit, Maya e 30+ prodotti',
    icon: 'CubeIcon',
    gradient: 'from-blue-700/25 to-blue-500/5',
    color: 'text-blue-500',
    border: 'hover:border-blue-600/40',
  },
  {
    id: 'antivirus',
    nameIt: 'Antivirus',
    count: 3,
    href: '/antivirus',
    description: 'Kaspersky Standard, Plus, Premium',
    icon: 'ShieldCheckIcon',
    gradient: 'from-emerald-600/25 to-emerald-400/5',
    color: 'text-emerald-400',
    border: 'hover:border-emerald-500/40',
  },
  {
    id: 'bundles',
    nameIt: 'Bundle',
    count: 5,
    href: '/bundles',
    description: 'Pacchetti software combinati a risparmio',
    icon: 'ArchiveBoxIcon',
    gradient: 'from-violet-600/25 to-violet-400/5',
    color: 'text-violet-400',
    border: 'hover:border-violet-500/40',
  },
  {
    id: 'visio-project',
    nameIt: 'Visio & Project',
    count: 4,
    href: '/visio-project',
    description: 'Microsoft Visio e Project 2021/2024',
    icon: 'ChartBarIcon',
    gradient: 'from-cyan-600/25 to-cyan-400/5',
    color: 'text-cyan-400',
    border: 'hover:border-cyan-500/40',
  },
];

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

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categoryItems.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 min-h-[160px] ${cat.border} category-card-hover`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative p-6 h-full flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center category-icon transition-transform duration-300">
                    <Icon
                      name={cat.icon as Parameters<typeof Icon>[0]['name']}
                      size={24}
                      className={cat.color}
                    />
                  </div>
                  <Icon name="ArrowUpRightIcon" size={16} className="text-muted-foreground group-hover:text-foreground transition-colors opacity-0 group-hover:opacity-100" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base mb-1">{cat.nameIt}</h3>
                  <p className="text-xs text-muted-foreground">{cat.count} prodotti</p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
