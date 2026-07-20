"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Handshake, Users, Award, Shield } from 'lucide-react';
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

export default function AliadosPage() {
  const { t } = useLanguage();
  const [aliados, setAliados] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/aliados')
      .then(res => res.json())
      .then(data => {
        if (data.allies) setAliados(data.allies);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="aliados-page" style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 4% 80px' }}>
        <Reveal>
          <h1 className="sr-only">{t('pages.aliados.aliadosTitle')}</h1>
          <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
            {t('pages.aliados.vinculacionInstitucional')}
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
            {t('pages.aliados.aliadosTitle')}
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text)', maxWidth: '700px', marginBottom: '60px', lineHeight: 1.6 }}>
            {t('pages.aliados.aliadosDesc')}
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          <Reveal delay={100}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--magenta)', marginBottom: '20px' }}><Handshake size={40} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>{t('pages.aliados.aliadosEstTitle')}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                {t('pages.aliados.aliadosEstDesc')}
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--cyan)', marginBottom: '20px' }}><Shield size={40} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>{t('pages.aliados.aliadosInstTitle')}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                {t('pages.aliados.aliadosInstDesc')}
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--navy)', marginBottom: '20px' }}><Award size={40} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>{t('pages.aliados.camarasEmpTitle')}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                {t('pages.aliados.camarasEmpDesc')}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Grid de Logotipos de Aliados */}
        <div style={{ marginTop: '100px', paddingTop: '80px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginTop: '16px' }}>
                {t('pages.aliados.aliadosOficiales')}
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '16px auto 0', lineHeight: 1.6 }}>
                {t('pages.aliados.aliadosOficialesDesc')}
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px', justifyContent: 'center' }}>
            {aliados.map((ally, idx) => (
              <Reveal key={ally.id} delay={idx * 40}>
                <a 
                  href={ally.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={ally.name}
                  style={{ 
                    background: '#fff', 
                    height: '120px',
                    borderRadius: '20px', 
                    boxShadow: '0 8px 25px rgba(0,25,76,0.02)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.02)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                    padding: '20px',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,25,76,0.06)';
                    e.currentTarget.style.borderColor = ally.color || 'var(--magenta)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,25,76,0.02)';
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.02)';
                  }}
                >
                  <img src={ally.logo} alt={ally.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
