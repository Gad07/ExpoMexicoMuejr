"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Newspaper, Download, Play, BookOpen, Image as ImageIcon } from 'lucide-react';
import { Mariposa } from '@/components/BrandAssets';
import { useLanguage } from '@/context/LanguageContext';

function Reveal({
  children, className = '', delay = 0, style = {},
}: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
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
    <div ref={ref} className={className} style={{
      ...style,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }}>
      {children}
    </div>
  );
}

export default function PrensaPage() {
  const { t } = useLanguage();

  const mockPressReleases = t('pages.prensa.mockPressReleases') as Array<{ date: string; title: string; category: string; desc: string }>;
  const mockInterviews = t('pages.prensa.mockInterviews') as Array<{ person: string; role: string; media: string; quote: string }>;
  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* 1. Sala de Prensa & Comunicados */}
        <h1 className="sr-only">{t('pages.prensa.srOnly')}</h1>
        <div id="comunicados" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              {t('pages.prensa.comunicadosTitle')}
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {mockPressReleases.map((press, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{press.category}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{press.date}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', lineHeight: 1.25 }}>{press.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px', flexGrow: 1 }}>{press.desc}</p>
                  <Link href="/recursos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.05em' }}>
                    Leer más <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 2. Entrevistas */}
        <div id="entrevistas" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              {t('pages.prensa.entrevistasTitle')}
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {mockInterviews.map((interview, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)' }}>
                  <div style={{ color: 'var(--magenta)', marginBottom: '20px' }}><BookOpen size={32} /></div>
                  <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.6, color: 'var(--navy)', marginBottom: '24px', fontWeight: 500 }}>
                    "{interview.quote}"
                  </p>
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 2px 0' }}>{interview.person}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--cyan)', fontWeight: 700, textTransform: 'uppercase' }}>{interview.role} — {interview.media}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 3. Galería Multimedia & Kit */}
        <div id="galeria" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px' }}>
                {t('pages.prensa.galeriaTitle')}
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '32px' }}>
                {t('pages.prensa.galeriaDesc')}
              </p>
              <Link href="/recursos" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'var(--cyan)', color: '#fff', padding: '16px 36px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 15px 30px rgba(0,186,211,0.25)' }}>
                {t('pages.prensa.galeriaBtn')} <Download size={18} />
              </Link>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', borderRadius: '32px', overflow: 'hidden', height: '350px', position: 'relative', boxShadow: '0 20px 40px rgba(0,25,76,0.05)' }}>
                <img src="/Galeria/Ponencias/IMG_5169.JPG" alt="Prensa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width="600" height="400" />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(255,255,255,0.92)', padding: '20px', borderRadius: '16px', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase' }}>{t('pages.prensa.carpetaLabel')}</span>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, margin: '4px 0 0 0', color: 'var(--navy)' }}>{t('pages.prensa.carpetaSubtitle')}</h4>
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--magenta)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <ImageIcon size={18} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </div>
  );
}

function ArrowRight({ size, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 16} 
      height={size || 16} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={style}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
