"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Box, Truck, CheckCircle, AlertCircle, FileText, Anchor } from 'lucide-react';
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

export default function LogisticaPage() {
  const { t } = useLanguage();
  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* 1. Exportación Temporal vs Definitiva */}
        <h1 className="sr-only">{t('pages.logistica.srOnly')}</h1>
        <div id="aduanas" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px' }}>
                {t('pages.logistica.esquemasTitle')}
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '24px' }}>
                {t('pages.logistica.esquemasDesc')}
              </p>
              
              <div style={{ background: '#fff', padding: '32px', borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)', display: 'flex', gap: '16px', alignItems: 'start' }}>
                <AlertCircle size={24} color="var(--magenta)" style={{ flexShrink: 0, marginTop: '4px' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  <strong>{t('pages.logistica.importante')}</strong> {t('pages.logistica.importanteDesc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,186,211,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)' }}><FileText size={20} /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>{t('pages.logistica.expTemporalTitle')}</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {t('pages.logistica.expTemporalDesc')}
                  </p>
                </div>

                <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,186,211,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)' }}><Anchor size={20} /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>{t('pages.logistica.expDefinitivaTitle')}</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {t('pages.logistica.expDefinitivaDesc')}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 2. Asesoría Logística & Soluciones de Transporte */}
        <div id="transporte" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              {t('pages.logistica.asesoriaTitle')}
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <Reveal delay={100}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)', height: '100%' }}>
                <div style={{ color: 'var(--magenta)', marginBottom: '24px' }}><Truck size={36} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>{t('pages.logistica.consolidacionTitle')}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: 0 }}>
                  {t('pages.logistica.consolidacionDesc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)', height: '100%' }}>
                <div style={{ color: 'var(--magenta)', marginBottom: '24px' }}><CheckCircle size={36} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>{t('pages.logistica.brokerageTitle')}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: 0 }}>
                  {t('pages.logistica.brokerageDesc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)', height: '100%' }}>
                <div style={{ color: 'var(--magenta)', marginBottom: '24px' }}><Box size={36} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>{t('pages.logistica.entregaTitle')}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: 0 }}>
                  {t('pages.logistica.entregaDesc')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </div>
  );
}
