"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { mockInvitados } from '../data/invitados';
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

  const baseStyle: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  };
  const inViewStyle: React.CSSProperties = {
    opacity: 1,
    transform: 'translateY(0)',
    transitionDelay: `${delay}ms`,
  };

  return (
    <div ref={ref} className={className} style={{ ...style, ...baseStyle, ...(inView ? inViewStyle : {}) }}>
      {children}
    </div>
  );
}

export default function InvitadosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [invitados, setInvitados] = useState<any[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    fetch('/api/admin/invitados')
      .then(res => res.json())
      .then(data => {
        if (data.invitados) setInvitados(data.invitados);
      })
      .catch(() => {});
  }, []);

  // Filter invitados by search term
  const filteredInvitados = invitados.filter(invitado => {
    const tierVal = invitado.tier && (invitado.tier[language] || invitado.tier.es || invitado.tier || '');
    return invitado.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tierVal.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="invitados-page" style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '80px 48px' }}>
        
        {/* Header & Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              Invitados Destacados
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, color: 'var(--navy)', margin: 0, lineHeight: 1 }}>
              Invitados Especiales
            </h2>
          </Reveal>

          <Reveal delay={100} style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--magenta)' }} size={20} />
              <input 
                type="text" 
                placeholder="Buscar invitado..." 
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

        {/* INVITADOS CATEGORIES SECTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {[
            'Líderes empresariales',
            'Conferencistas',
            'Personalidades'
          ].map((cat) => {
            const list = filteredInvitados.filter(i => i.category === cat);
            if (list.length === 0) return null;

            return (
              <div key={cat} style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '48px' }}>
                <Reveal>
                  <div style={{ marginBottom: '32px' }}>
                    <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '8px' }}>
                      Categoría
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
                      {cat}
                    </h3>
                  </div>
                </Reveal>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
                  {list.map((invitado, idx) => (
                    <Reveal key={invitado.id} delay={idx * 50}>
                      <Link href={`/invitados/${invitado.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                            {invitado.gallery && invitado.gallery.length > 0 && (
                              <img src={invitado.gallery[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width="600" height="400" />
                            )}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                          </div>

                          {/* FLOATING LOGO */}
                          <div style={{ 
                            width: '70px', height: '70px', background: '#fff', borderRadius: '50%', padding: '4px',
                            position: 'absolute', top: '125px', left: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                          }}>
                            <img src={invitado.logo} alt={invitado.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} loading="lazy" width="200" height="80" />
                          </div>

                          {/* BODY */}
                          <div style={{ padding: '56px 24px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px', lineHeight: 1.2 }}>{invitado.name}</h3>
                            
                            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '32px', flexGrow: 1 }}>{invitado.description && (invitado.description[language] || invitado.description.es || invitado.description || '').substring(0, 100)}...</p>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--navy)' }}>Ver perfil completo</span>
                              <div className="card-btn" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,186,211,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)', transition: 'background 0.3s, color 0.3s' }}>
                                <ArrowRight size={16} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredInvitados.length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px', background: '#fff', borderRadius: '24px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--text)' }}>No se encontraron invitados con ese término.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
