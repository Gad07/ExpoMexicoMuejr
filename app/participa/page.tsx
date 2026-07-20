"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Award, CheckCircle, Handshake, Users, Sparkles, ShoppingBag } from 'lucide-react';
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

export default function ParticipaPage() {
  const { t } = useLanguage();

  return (
    <div className="participa-page" style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* SECCIÓN 1: Expositoras */}
      <section id="expositoras" style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 4% 80px' }}>
        <Reveal>
          <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
            {t('pages.participa.expositoras.eyebrow')}
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '40px' }}>
            {t('pages.participa.expositoras.title')}
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
          <Reveal delay={100}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--magenta)', marginBottom: '20px' }}><Sparkles size={40} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>{t('pages.participa.expositoras.card1Title')}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '20px' }}>
                {t('pages.participa.expositoras.card1Desc')}
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>{t('pages.participa.expositoras.card1Li1')}</li>
                <li>{t('pages.participa.expositoras.card1Li2')}</li>
                <li>{t('pages.participa.expositoras.card1Li3')}</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--cyan)', marginBottom: '20px' }}><CheckCircle size={40} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>{t('pages.participa.expositoras.card2Title')}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '20px' }}>
                {t('pages.participa.expositoras.card2Desc')}
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>{t('pages.participa.expositoras.card2Li1')}</li>
                <li>{t('pages.participa.expositoras.card2Li2')}</li>
                <li>{t('pages.participa.expositoras.card2Li3')}</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} style={{ marginTop: '48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <a href="/#contacto" style={{ display: 'inline-block', background: 'var(--magenta)', color: '#fff', padding: '16px 36px', borderRadius: '100px', fontWeight: 700, textDecoration: 'none', transition: 'background 0.3s' }}
               onMouseOver={(e) => e.currentTarget.style.background = '#d0006f'}
               onMouseOut={(e) => e.currentTarget.style.background = 'var(--magenta)'}>
              {t('pages.participa.expositoras.btn1')}
            </a>
            <a href="/expositores" style={{ display: 'inline-block', border: '2px solid var(--navy)', color: 'var(--navy)', padding: '14px 34px', borderRadius: '100px', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s' }}
               onMouseOver={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = '#fff'; }}
               onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)'; }}>
              {t('pages.participa.expositoras.btn2')}
            </a>
          </div>
        </Reveal>
      </section>

      {/* SECCIÓN 2: Patrocinadores */}
      <section id="patrocinadores" style={{ background: 'var(--navy)', color: '#fff', padding: '120px 4%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--cyan)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              {t('pages.participa.patrocinadores.eyebrow')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              {t('pages.participa.patrocinadores.title')}
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginTop: '40px' }}>
            <Reveal delay={100}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                {t('pages.participa.patrocinadores.card1Title')}
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                {t('pages.participa.patrocinadores.card1Desc')}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                {t('pages.participa.patrocinadores.card2Title')}
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                {t('pages.participa.patrocinadores.card2Desc')}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Embajadoras */}
      <section id="embajadoras" style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 4% 80px' }}>
        <Reveal>
          <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
            {t('pages.participa.embajadoras.eyebrow')}
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '40px' }}>
            {t('pages.participa.embajadoras.title')}
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          <Reveal delay={100}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>{t('pages.participa.embajadoras.card1Title')}</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                {t('pages.participa.embajadoras.card1Desc')}
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>{t('pages.participa.embajadoras.card2Title')}</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                {t('pages.participa.embajadoras.card2Desc')}
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>{t('pages.participa.embajadoras.card3Title')}</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                {t('pages.participa.embajadoras.card3Desc')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECCIÓN 4: Aliados */}
      <section id="aliados" style={{ background: 'var(--cream)', borderTop: '1px solid rgba(0,0,0,0.05)', padding: '120px 4%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '40px', textAlign: 'center' }}>
              {t('pages.participa.aliados.title')}
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            <Reveal delay={100}>
              <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,46,81,0.02)', textAlign: 'center' }}>
                <div style={{ color: 'var(--magenta)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><Handshake size={32} /></div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>{t('pages.participa.aliados.card1Title')}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.5 }}>{t('pages.participa.aliados.card1Desc')}</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,46,81,0.02)', textAlign: 'center' }}>
                <div style={{ color: 'var(--cyan)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><Users size={32} /></div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>{t('pages.participa.aliados.card2Title')}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.5 }}>{t('pages.participa.aliados.card2Desc')}</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,46,81,0.02)', textAlign: 'center' }}>
                <div style={{ color: 'var(--navy)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><Award size={32} /></div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>{t('pages.participa.aliados.card3Title')}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.5 }}>{t('pages.participa.aliados.card3Desc')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: Invitados Especiales */}
      <section id="invitados" style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 4% 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--cyan)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              {t('pages.participa.invitados.eyebrow')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              {t('pages.participa.invitados.title')}
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)' }}>
              {t('pages.participa.invitados.desc')}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#eaeaea', borderRadius: '24px', overflow: 'hidden', height: '350px', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" alt="Conferencia EMM" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width="800" height="600" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECCIÓN 6: Compradores */}
      <section id="compradores" style={{ background: 'var(--navy)', color: '#fff', padding: '120px 4%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              {t('pages.participa.compradores.eyebrow')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              {t('pages.participa.compradores.title')}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>
              {t('pages.participa.compradores.desc')}
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', textAlign: 'left', marginBottom: '48px' }}>
            <Reveal delay={100}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '32px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>{t('pages.participa.compradores.card1Title')}</h4>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{t('pages.participa.compradores.card1Desc')}</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '32px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>{t('pages.participa.compradores.card2Title')}</h4>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{t('pages.participa.compradores.card2Desc')}</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '32px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>{t('pages.participa.compradores.card3Title')}</h4>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{t('pages.participa.compradores.card3Desc')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
