"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, ShieldCheck, HelpCircle, ChevronDown, Check } from 'lucide-react';
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

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(0,46,81,0.08)', padding: '24px 0' }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', cursor: 'pointer', outline: 'none' }}
      >
        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)' }}>{title}</span>
        <ChevronDown size={18} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', color: 'var(--magenta)' }} />
      </button>
      <div style={{ 
        maxHeight: open ? '500px' : '0', 
        overflow: 'hidden', 
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: open ? 1 : 0,
        paddingTop: open ? '16px' : '0'
      }}>
        <div style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ParticipantesPage() {
  const { t } = useLanguage();
  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* 1. Manual del expositor & Stands */}
        <h1 className="sr-only">{t('pages.participantes.srOnly')}</h1>
        <div id="manual" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px' }}>
                {t('pages.participantes.manualTitle')}
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '32px' }}>
                {t('pages.participantes.manualDesc')}
              </p>
              <Link href="/recursos" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'var(--cyan)', color: '#fff', padding: '16px 36px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 15px 30px rgba(0,186,211,0.25)' }}>
                {t('pages.participantes.descargarManual')} <Download size={18} />
              </Link>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 40px rgba(0,25,76,0.04)', border: '1px solid rgba(0,0,0,0.01)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '24px' }}>{t('pages.participantes.especificacionesTitle')}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--cyan)', marginTop: '2px' }}><Check size={18} /></div>
                    <span style={{ fontSize: '0.95rem', color: 'var(--text)' }}><strong>{t('pages.participantes.standStandard').split(':')[0]}:</strong> {t('pages.participantes.standStandard').split(':').slice(1).join(':').trim()}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--cyan)', marginTop: '2px' }}><Check size={18} /></div>
                    <span style={{ fontSize: '0.95rem', color: 'var(--text)' }}><strong>{t('pages.participantes.mobiliarioIncluido').split(':')[0]}:</strong> {t('pages.participantes.mobiliarioIncluido').split(':').slice(1).join(':').trim()}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--cyan)', marginTop: '2px' }}><Check size={18} /></div>
                    <span style={{ fontSize: '0.95rem', color: 'var(--text)' }}><strong>{t('pages.participantes.serviciosAdicionales').split(':')[0]}:</strong> {t('pages.participantes.serviciosAdicionales').split(':').slice(1).join(':').trim()}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 2. Requisitos */}
        <div id="requisitos" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              {t('pages.participantes.requisitosTitle')}
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <Reveal delay={100}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)' }}>
                <div style={{ color: 'var(--magenta)', marginBottom: '20px' }}><ShieldCheck size={36} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>{t('pages.participantes.docComercialTitle')}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                  {t('pages.participantes.docComercialDesc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)' }}>
                <div style={{ color: 'var(--cyan)', marginBottom: '20px' }}><ShieldCheck size={36} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>{t('pages.participantes.estatusMigratorioTitle')}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                  {t('pages.participantes.estatusMigratorioDesc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)' }}>
                <div style={{ color: 'var(--navy)', marginBottom: '20px' }}><ShieldCheck size={36} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>{t('pages.participantes.certSanitariaTitle')}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                  {t('pages.participantes.certSanitariaDesc')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 3. Preguntas Frecuentes (FAQ Accordion) */}
        <div id="faq" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              {t('pages.participantes.faqTitle')}
            </h2>
          </Reveal>

          <Reveal style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ background: '#fff', borderRadius: '32px', padding: '40px', boxShadow: '0 15px 40px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)' }}>
              <Accordion title={t('pages.participantes.faq1Q')}>
                {t('pages.participantes.faq1A')}
              </Accordion>
              <Accordion title={t('pages.participantes.faq2Q')}>
                {t('pages.participantes.faq2A')}
              </Accordion>
              <Accordion title={t('pages.participantes.faq3Q')}>
                {t('pages.participantes.faq3A')}
              </Accordion>
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  );
}
