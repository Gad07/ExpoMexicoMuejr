'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function Reveal({
  children, className = '', delay = 0, onClick, style = {},
}: { children: React.ReactNode; className?: string; delay?: number; onClick?: () => void; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${inView ? 'revealed' : ''} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      onClick={onClick}>
      {children}
    </div>
  );
}

export default function CtaSkyline() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [jotformUrl, setJotformUrl] = useState<string>('');

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/jotforms').then(r => r.json()).catch(() => ({})),
      fetch('/api/admin/navbar').then(r => r.json()).catch(() => ({}))
    ]).then(([jotData, navData]) => {
      let url = '';
      let navbarMatchFound = false;
      const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

      // 1. Check if navbar has a sub-link matching current pathname
      if (navData.navbar && Array.isArray(navData.navbar)) {
        for (const menu of navData.navbar) {
          if (menu.items && Array.isArray(menu.items)) {
            // First check exact href match
            let found = menu.items.find((it: any) => {
              if (!it.href) return false;
              const itemHref = it.href === '/' ? '/' : it.href.replace(/\/$/, '');
              return itemHref === cleanPath;
            });

            // Second check prefix match (excluding root '/')
            if (!found) {
              found = menu.items.find((it: any) => {
                if (!it.href || it.href === '/') return false;
                const itemHref = it.href.replace(/\/$/, '');
                return cleanPath.startsWith(itemHref);
              });
            }

            if (found) {
              navbarMatchFound = true;
              url = (found.jotformUrl || '').trim();
              break;
            }
          }
        }
      }

      // 2. If not found in navbar items, fallback to page-based jotforms config
      if (!navbarMatchFound && jotData.jotforms) {
        let pageKey = 'default';
        if (cleanPath === '/') pageKey = 'home';
        else if (cleanPath.startsWith('/contacto')) pageKey = 'contacto';
        else if (cleanPath.startsWith('/expositores')) pageKey = 'expositores';
        else if (cleanPath.startsWith('/embajadoras')) pageKey = 'embajadoras';
        else if (cleanPath.startsWith('/compradores')) pageKey = 'compradores';
        else if (cleanPath.startsWith('/patrocinadores')) pageKey = 'patrocinadores';
        else if (cleanPath.startsWith('/invitados')) pageKey = 'invitados';

        url = (jotData.jotforms[pageKey] || '').trim();
      }

      setJotformUrl(url);
    });
  }, [pathname]);

  return (
    <>
      {/* Formulario JotForm Embebido */}
      {jotformUrl && (
        <section style={{ padding: '80px 24px 40px', background: '#fff' }} id="formulario-registro" suppressHydrationWarning>
          <Reveal>
            <div style={{ background: '#fff', padding: '50px 30px', borderRadius: '32px', maxWidth: '950px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '12px' }}>
                Formulario de Registro Oficial
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                Completa tus datos para formar parte de la Expo México Mujer 2027 en Toronto.
              </p>

              <div style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', background: '#FAF8F5' }}>
                <iframe
                  id="JotFormIFrame-Global"
                  title="Formulario de Registro Oficial Expo México Mujer"
                  src={jotformUrl}
                  frameBorder="0"
                  style={{ width: '100%', height: '700px', border: 'none' }}
                  scrolling="yes"
                  allowFullScreen={true}
                />
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Sección ¿Lista para ser parte de esta edición? */}
      <section className="cta--lux" id="registro" aria-labelledby="cta-title">
        <div className="cta__lux-inner">
          <Reveal>
            <h2 className="cta__lux-title" id="cta-title">
              {t('cta.title')}<br />
              <em>{t('cta.titleEm')}</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="cta__lux-actions">
              <a href="mailto:luis@expomexico.ca" className="cta__lux-btn cta__lux-btn--primary">
                <span className="cta__lux-btn-text">{t('cta.email')}</span>
                <span className="cta__lux-btn-fill" />
              </a>
              <a href="https://wa.me/527225514645" className="cta__lux-btn cta__lux-btn--outline" target="_blank" rel="noopener noreferrer">
                {t('cta.whatsapp')}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Skyline de Toronto */}
        <div className="cta__skyline-wrap" style={{ position: 'relative', marginTop: '60px', overflow: 'hidden', marginBottom: '-1px' }}>
          <svg viewBox="0 0 724.74 286.22" style={{ width: '100%', height: 'auto', display: 'block', fill: 'var(--magenta)' }} aria-hidden="true">
            <path d="M721.21,276.58v-7.94h-3.46v-4.95h-14.32v-8.48h-5.97v3.8h-2.99v-8.55l-2.92,1.29v-7.06h-8.08v7.4l-2.92-1.76v15.14h-5.48v-14.9h-2.44v-2.24h-8.25v-11.3h-1.83v-3.21h-14.2v3.21h-2.8v17.77h-4.73v4.53h-2.41v-38.86h-1.9v-4.34h-3.26v-3.46h-2.24v-3.7h-6.52v3.94h-1.93v3.22h-3.33v4.31h-2.48v10.96h-4.68v3.8h-1.43v11.33h-3.19v-31.9h-2.51v-5.53h-10.72v5.63h-2.48v26.4h-3.56v-11.78h-1.15v-4.85h-3.27v-4.17h-8.09v3.82h-2.55v5.55h-1.22v14.25h-2.49v-5.19h-2.94v-35.5h-1.63v-4.11h-2.92v-3.67h2.07v-1.73h-12.93v1.66h1.54v3.89h-2.65v4.07h-2.34v24.08h-3.31v-3h-3.56v2.85h-2.51v-40.57h-4v-6.24h-11v6.31h-5.19v58.68h-3.26v-17.92h-10.59v-39.3h-4.78v-2.17h-3.46v-21.62h-1.22v21.62h-8.08v-21.62h-1.22v21.62h-2.92v1.56h-4.34v37.57h-2.51v-6.72h-3.66v-5.09h-8.01v5.09h-6.72v12.83h-2.78v-23.52h-6.79v-4.58h-16.09v4.28h-10.59v9.06h-4.89v5.29h-1.43v21.79h-4.58l-.61-60.78h-2.77v-2.85h.88l1.93-4.12h-24.13l1.93,4.12h.88v2.85h-3.27l-.34,57.76h-8.35v-8.89h-3.8v-2.44h-12.66v2.34h-4.48v27.9h-2.04l-6.39-134.42h5.95c1.57,0,2.85-1.28,2.85-2.85s-1.28-2.85-2.85-2.85c1.57,0,2.85-1.28,2.85-2.85h0c0-1.57-1.28-2.85-2.85-2.85h.81c1.12,0,2.04-.91,2.04-2.04s-.91-2.04-2.04-2.04h-.81v-4.34h-5.74l.51-8.62h-1.43l-.48-32.87c1-.21,1.77-1.05,1.77-2.12s-.8-1.95-1.84-2.13l-.34-22.74h-.77v-9.37h-.75l-.99-27.41-.64,27.35h-.78v9.43h-.68l-.38,22.67c-1.21,0-2.2.99-2.2,2.2s.95,2.14,2.12,2.19l-.55,32.53h-1.37l.5,8.89h-5.18v4.34h-.81c-1.12,0-2.04.91-2.04,2.04s.91,2.04,2.04,2.04h.81c-1.57,0-2.85,1.28-2.85,2.85s1.28,2.85,2.85,2.85c-1.57,0-2.85,1.28-2.85,2.85s1.28,2.85,2.85,2.85h5.42l-4.64,126.31h-9.47v-8.62h-2.21v-4.78h-3.12v-4.45h-5.94v4.28h-3.16v4.28h-3.05v13.64h-6.82v-29.42h-2.95v-4.68h-7.53v4.89h-2.95v25.76h-6.92c-4.99-4.15-23-18.1-49.89-18.33-28.75-.24-47.85,15.38-52.48,19.39l4.09,5.45v1.86h-4.52v9.32h-3.93v-23.19h-3.33v-3.02h-6.35v2.82h-3.73v19.68h-1.83v-3.7h-3v-33.04l-4.99-2.8v-2.61h-7.14v2.58h-3.94v15.27h-4.28v-2.71h-6.38v4.21h-2.1v-12.9h-2.92v-3.87h-12.42v8.21h-2.88v23.01h-6.79v-2.68h-5.31v3.56h-2.75v5.04h-2.43v-28.8h-1.76v-2.17h-12.49v2.38h-3.73v27.69h-4.48v-5.77h-3.94v-2.1h-7.19v1.76h-1.9v4.48h-3.46v-14.25h-2.44v-2.24h-7.53v1.9h-3.12v13.64h-4.75v-2.78h-12.83v9.91h-4.41v-3.33H7.67v8.35H0v13.71h724.74v-9.64h-3.53ZM389.5,182.85v-2.85h15.98v2.85h-15.98Z" />
          </svg>
        </div>
      </section>
    </>
  );
}
