'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  content?: string;
  htmlContent?: string;
  breadcrumb: string;
  icon?: string;
}

interface TocItem {
  id: string;
  text: string;
}

function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  let match;
  let index = 0;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    const id = `section-${index}`;
    items.push({ id, text });
    index++;
  }
  return items;
}

function injectIds(html: string): string {
  let index = 0;
  return html.replace(/<h2([^>]*)>/gi, (_match, attrs) => {
    const id = `section-${index++}`;
    return `<h2${attrs} id="${id}">`;
  });
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-xl font-bold text-foreground mt-8 mb-4 pl-3 border-l-4 border-primary">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-base font-bold text-foreground mt-5 mb-2">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-sm text-muted-foreground leading-relaxed ml-4 list-disc">
          {line.replace('- ', '')}
        </li>
      );
    } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
      elements.push(
        <li key={key++} className="text-sm text-muted-foreground leading-relaxed ml-4 list-decimal">
          {line.replace(/^\d+\. /, '')}
        </li>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={key++} className="text-sm font-bold text-foreground mt-3 mb-1">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else if (line.startsWith('*') && line.endsWith('*')) {
      elements.push(
        <p key={key++} className="text-xs text-muted-foreground italic mt-4">
          {line.replace(/\*/g, '')}
        </p>
      );
    } else if (line.trim()) {
      elements.push(
        <p key={key++} className="text-sm text-muted-foreground leading-relaxed">
          {line}
        </p>
      );
    }
  }

  return elements;
}

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  content,
  htmlContent,
  breadcrumb,
  icon = 'DocumentTextIcon',
}: LegalPageLayoutProps) {
  const [activeId, setActiveId] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  const tocItems = htmlContent ? extractToc(htmlContent) : [];
  const processedHtml = htmlContent ? injectIds(htmlContent) : '';

  useEffect(() => {
    if (!tocItems.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [processedHtml]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Decorative background blobs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="section-container py-10 sm:py-14 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-7" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Icon name="ChevronRightIcon" size={12} />
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>{breadcrumb}</span>
          </nav>

          {/* Icon + Title */}
          <div className="flex items-start gap-5">
            <div
              className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 mt-1"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0.1) 100%)',
                border: '1px solid rgba(99,102,241,0.4)',
              }}
            >
              <Icon name={icon} size={28} className="text-indigo-400" />
            </div>
            <div className="flex-1">
              <h1
                className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight"
                style={{ color: '#ffffff' }}
              >
                {title}
              </h1>
              <p className="text-sm sm:text-base mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {subtitle}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(99,102,241,0.2)',
                  border: '1px solid rgba(99,102,241,0.35)',
                  color: '#a5b4fc',
                }}
              >
                <Icon name="CalendarIcon" size={12} />
                Ultimo aggiornamento: {lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="section-container py-8 sm:py-12">
        <div className="flex gap-8 max-w-6xl mx-auto">

          {/* Sidebar TOC — desktop only */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block w-64 shrink-0 self-start sticky top-8">
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'var(--card, #1a1a2e)',
                  border: '1px solid var(--border)',
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Indice dei Contenuti
                </p>
                <nav className="flex flex-col gap-0.5">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={[
                        'text-left text-xs px-3 py-2 rounded-lg transition-all w-full',
                        activeId === item.id
                          ? 'font-semibold'
                          : 'hover:opacity-80',
                      ].join(' ')}
                      style={
                        activeId === item.id
                          ? {
                              background: 'rgba(99,102,241,0.15)',
                              color: '#818cf8',
                              borderLeft: '2px solid #818cf8',
                            }
                          : {
                              color: 'var(--muted-foreground)',
                              borderLeft: '2px solid transparent',
                            }
                      }
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div
              ref={contentRef}
              className="glass-card rounded-2xl p-5 sm:p-8 border border-border"
            >
              {htmlContent ? (
                <div
                  className="legal-html-content"
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />
              ) : (
                <div className="space-y-1">{renderMarkdown(content || '')}</div>
              )}
            </div>

            {/* "Hai domande?" CTA */}
            <div
              className="mt-6 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(16,185,129,0.08) 100%)',
                border: '1px solid rgba(99,102,241,0.2)',
              }}
            >
              <div className="flex-1">
                <h3 className="text-base font-bold text-foreground mb-1">Hai domande?</h3>
                <p className="text-sm text-muted-foreground">
                  Il nostro team è disponibile per rispondere a qualsiasi dubbio.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-90"
                  style={{
                    background: 'var(--primary, #6366f1)',
                    color: '#fff',
                  }}
                >
                  <Icon name="QuestionMarkCircleIcon" size={16} />
                  Vai alle FAQ
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-80"
                  style={{
                    background: 'var(--card)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <Icon name="EnvelopeIcon" size={16} />
                  Contattaci
                </Link>
              </div>
            </div>

            {/* Legal links */}
            <div
              className="mt-5 p-5 rounded-xl"
              style={{
                background: 'var(--muted, rgba(0,0,0,0.3))',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-widest">
                Pagine Legali
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Termini di Servizio', href: '/terms' },
                  { label: 'Politica Rimborsi', href: '/refund' },
                  { label: 'Cookie Policy', href: '/cookie-policy' },
                  { label: 'Note Legali', href: '/legal-notes' },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
