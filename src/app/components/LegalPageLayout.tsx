import React from 'react';
import { Link } from 'wouter';
import Icon from '@/components/ui/AppIcon';

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  content?: string;
  htmlContent?: string;
  breadcrumb: string;
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-xl font-bold text-foreground mt-8 mb-4 pb-2 border-b border-border">
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
}: LegalPageLayoutProps) {
  return (
    <div className="section-container py-6 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4 sm:mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <Icon name="ChevronRightIcon" size={12} />
        <span className="text-foreground">{breadcrumb}</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-5 sm:mb-10">
          <h1 className="text-2xl sm:text-display font-extrabold text-foreground mb-2 sm:mb-3">{title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{subtitle}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="CalendarIcon" size={13} />
            <span>Ultimo aggiornamento: {lastUpdated}</span>
          </div>
        </div>

        {/* Content */}
        <div className="glass-card rounded-2xl p-4 sm:p-8 border border-border space-y-1">
          {htmlContent ? (
            <div
              className="legal-html-content"
              style={{
                fontSize: '0.9375rem',
                lineHeight: '1.75',
                color: 'inherit',
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            renderMarkdown(content || '')
          )}
        </div>

        {/* Legal links */}
        <div className="mt-8 p-5 bg-muted/30 rounded-xl border border-border">
          <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-widest">Pagine Legali</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Termini di Servizio', href: '/terms' },
              { label: 'Politica Rimborsi', href: '/refund' },
              { label: 'Cookie Policy', href: '/cookie-policy' },
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
  );
}