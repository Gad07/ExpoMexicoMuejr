"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingBag, Users, Sparkles, Handshake, Search, ArrowRight, ShieldCheck, CalendarRange, Globe } from 'lucide-react';
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

export default function CompradoresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [buyers, setBuyers] = useState<any[]>([]);
  const { t, language } = useLanguage();

  useEffect(() => {
    fetch('/api/admin/compradores')
      .then(res => res.json())
      .then(data => {
        if (data.compradores) setBuyers(data.compradores);
      })
      .catch(() => {});
  }, []);

  const filteredBuyers = buyers.filter(buyer => {
    const interestVal = buyer.interest && (buyer.interest[language] || buyer.interest.es || buyer.interest || '');
    return buyer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interestVal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="compradores-page" style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '80px 48px' }}>
        
        {/* Header Principal */}
        <Reveal style={{ textAlign: 'center', marginBottom: '80px', marginTop: '40px' }}>
          <h1 className="sr-only">Compradores e Inversionistas</h1>
          <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
            {t('pages.compradores.vinculacionB2B')}
          </span>
          <h2 className="section__title section__title--center" style={{ margin: '0 auto 24px' }}>
            {t('pages.compradores.compradoresTitle')}
          </h2>
          <p className="section__desc section__desc--center" style={{ maxWidth: '750px', margin: '0 auto' }}>
            {t('pages.compradores.compradoresDesc')}
          </p>
        </Reveal>

        {/* 1. Vinculación Empresarial Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center', marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal delay={100}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px', lineHeight: 1.15 }}>
                {t('pages.compradores.ruedaNegocios')}
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '32px' }}>
                {t('pages.compradores.ruedaDesc')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                  <div style={{ color: 'var(--magenta)', marginTop: '4px' }}><ShieldCheck size={24} /></div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px' }}>{t('pages.compradores.perfilamiento')}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{t('pages.compradores.perfilamientoDesc')}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                  <div style={{ color: 'var(--cyan)', marginTop: '4px' }}><CalendarRange size={24} /></div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px' }}>{t('pages.compradores.agendaEstrategica')}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{t('pages.compradores.agendaEstrategicaDesc')}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                  <div style={{ color: 'var(--navy)', marginTop: '4px' }}><Globe size={24} /></div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px' }}>{t('pages.compradores.proyeccionInt')}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{t('pages.compradores.proyeccionDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ borderRadius: '32px', overflow: 'hidden', height: '480px', position: 'relative', boxShadow: '0 20px 40px rgba(0,46,81,0.06)' }}>
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" alt="B2B Matchmaking" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width="800" height="600" />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('pages.compradores.ruedaDeNegocios')}</span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, margin: '4px 0 0 0', color: 'var(--navy)' }}>{t('pages.compradores.ontarioBusinessSummit')}</h4>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 2. Directorio Digital de Compradores Section */}
        <div style={{ marginTop: '100px', paddingTop: '80px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <Reveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', marginTop: '8px', margin: 0 }}>
                {t('pages.compradores.directorioDigital')}
              </h3>
            </Reveal>

            <Reveal delay={100} style={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--magenta)' }} size={20} />
                <input 
                  type="text" 
                  placeholder={t('pages.compradores.buscarEmpresa')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '16px 16px 16px 48px', 
                    borderRadius: '100px', 
                    border: '1px solid rgba(0,0,0,0.1)',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                    outline: 'none'
                  }}
                />
              </div>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
            {filteredBuyers.length > 0 ? (
              filteredBuyers.map((buyer, idx) => (
                <Reveal key={buyer.company} delay={idx * 50}>
                  <Link href={`/compradores/${buyer.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ 
                      background: '#fff', 
                      borderRadius: '24px', 
                      overflow: 'hidden', 
                      boxShadow: '0 15px 35px rgba(0,25,76,0.06)',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      position: 'relative'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,25,76,0.12)';
                      const iconBox = e.currentTarget.querySelector('.card-btn') as HTMLElement;
                      if (iconBox) { iconBox.style.background = 'var(--cyan)'; iconBox.style.color = '#fff'; }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,25,76,0.06)';
                      const iconBox = e.currentTarget.querySelector('.card-btn') as HTMLElement;
                      if (iconBox) { iconBox.style.background = 'rgba(0,186,211,0.1)'; iconBox.style.color = 'var(--cyan)'; }
                    }}>
                      {/* COVER PHOTO */}
                      <div style={{ height: '160px', width: '100%', position: 'relative', background: '#f0f0f0' }}>
                        <img src={buyer.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width="600" height="400" />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                      </div>

                      {/* FLOATING LOGO */}
                      <div style={{ 
                        width: '70px', height: '70px', background: '#fff', borderRadius: '50%', padding: '4px',
                        position: 'absolute', top: '125px', left: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 10,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                      }}>
                        <img src={buyer.photo} alt={buyer.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} loading="lazy" width="120" height="120" />
                      </div>

                      {/* BODY */}
                      <div style={{ padding: '56px 24px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px', lineHeight: 1.2, textTransform: 'uppercase' }}>{buyer.name}</h3>
                        
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '16px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: buyer.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {buyer.company}
                          </span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                            {buyer.role && (buyer.role[language] || buyer.role.es || buyer.role)} — {buyer.location}
                          </span>
                        </div>

                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '32px', flexGrow: 1 }}>{buyer.description && (buyer.description[language] || buyer.description.es || buyer.description)}</p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--navy)' }}>{t('pages.compradores.verPerfil')}</span>
                          <div className="card-btn" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,186,211,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)', transition: 'background 0.3s, color 0.3s' }}>
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px', background: '#fff', borderRadius: '24px' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--text)' }}>{t('pages.compradores.noCorporaciones')}</p>
              </div>
            )}
          </div>
        </div>

        {/* 3. Registro Oficial de Compradores Section (Jotform) */}
        <Reveal delay={250} style={{ textAlign: 'center', marginTop: '100px' }}>
          <div style={{ background: '#fff', padding: '60px 40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,25,76,0.04)', maxWidth: '900px', margin: '0 auto' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>{t('pages.compradores.registroCompradores')}</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
              {t('pages.compradores.registroCompradoresDesc')}
            </p>
            
            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', background: '#FAF8F5' }}>
              <iframe
                id="JotFormIFrame-RegistroCompradores"
                title="Registro Oficial de Compradores"
                src="https://form.jotform.com/241686259021053"
                frameBorder="0"
                style={{ width: '100%', height: '700px', border: 'none' }}
                scrolling="yes"
                allowFullScreen={true}
              />
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
