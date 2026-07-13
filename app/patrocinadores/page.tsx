"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, Medal, ArrowRight } from 'lucide-react';
import { mockSponsors } from '../data/patrocinadores';

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

export default function PatrocinadoresPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter sponsors by search term
  const filteredSponsors = mockSponsors.filter(sponsor => 
    sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sponsor.tier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patrocinadores-page" style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '80px 48px' }}>
        
        <div style={{ marginBottom: '80px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="section__label">Patrocinios Expo México Mujer</span>
              <h2 className="section__title section__title--center" style={{ marginTop: '16px' }}>Paquetes de <br /><em>Patrocinio</em></h2>
            </div>
          </Reveal>
          
          <style>{`
            .pricing-card--bronce { border-top: 6px solid #cd7f32; }
            .pricing-card--plata { border-top: 6px solid #a0a0a0; }
            .pricing-card--oro { 
              border-top: 6px solid #e4b000; 
              transform: scale(1.05); 
              box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
              z-index: 10; 
              position: relative;
              padding-top: 64px !important;
              padding-bottom: 64px !important;
            }
            .pricing-card--oro .pricing-card__name { color: #e4b000; font-size: 2.3rem !important; }
            .pricing-card--oro .pricing-card__cta { background: #e4b000; color: #000; border: none; font-size: 1rem; padding: 20px; }
            .pricing-card--oro .pricing-card__cta:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }
          `}</style>

          <div className="pricing-tiers__grid" style={{ marginTop: 48, alignItems: 'stretch', textAlign: 'center' }}>
            {[
              {
                name: "Patrocinio Bronce",
                type: "Acceso Inicial",
                discount: "Bronce",
                theme: "bronce",
                color: "#CD7F32",
                price: "$4,000",
                sub: "CAD — Paquete Base",
                description: "Ideal para organizaciones que desean incorporarse a Expo México Mujer y comenzar a posicionar sus servicios dentro de la comunidad y mercado canadiense.",
                features: [
                  "Stand de 2 x 2 metros",
                  "1 acceso al Mexican Fashion Gala Show",
                  "1 acceso al Ontario – Mexico Business Summit",
                  "Presencia del logotipo en materiales oficiales",
                  "Promoción mediante redes sociales y sitio web",
                  "Proyección del logotipo en pantallas",
                  "Presencia de marca mediante banners",
                  "Reconocimiento institucional"
                ]
              },
              {
                name: "Patrocinio Plata",
                type: "Presencia Destacada",
                discount: "Plata",
                theme: "plata",
                color: "#a0a0a0",
                price: "$6,000",
                sub: "CAD — Impulso Comercial",
                description: "Una excelente alternativa para organizaciones que buscan una presencia destacada y una relación cercana con la comunidad binacional.",
                features: [
                  "Stand de 4 x 3 metros",
                  "2 accesos al Mexican Fashion Gala Show",
                  "2 accesos al Ontario – Mexico Business Summit",
                  "Presencia del logotipo en materiales oficiales",
                  "Promoción mediante redes sociales y sitio web oficial",
                  "Proyección del logotipo en pantallas",
                  "Presencia de marca mediante banners",
                  "Reconocimiento institucional",
                  "Intervención en el Women Leaders Forum"
                ]
              },
              {
                name: "Patrocinio Oro",
                type: "Presencia Estelar",
                discount: "Oro",
                theme: "oro",
                color: "#e4b000",
                price: "$8,000",
                sub: "CAD — Cobertura Completa",
                featured: true,
                description: "Nuestro paquete de mayor posicionamiento, diseñado para organizaciones que buscan una presencia sólida antes, durante y después del evento.",
                features: [
                  "Stand premium de 6 x 4 metros",
                  "3 accesos al Mexican Fashion Gala Show",
                  "2 accesos al Ontario – Mexico Business Summit",
                  "Participación en la Misión Comercial a Montreal",
                  "Presencia del logotipo en todos los materiales oficiales",
                  "Promoción a través de redes sociales y sitio web oficial",
                  "Proyección del logotipo en pantallas",
                  "Presencia de marca en áreas estratégicas",
                  "Distribución de material promocional",
                  "Mensaje institucional durante el evento",
                  "Ponentes en el Women Leaders Forum"
                ]
              }
            ].map((t) => (
              <Reveal key={t.name} delay={150} className={`pricing-card pricing-card--${t.theme}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {t.featured && <div className="pricing-card__badge" style={{ background: t.color }}>Más Popular</div>}

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ padding: '6px 14px', background: `${t.color}20`, color: t.color, borderRadius: '20px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem' }}>
                    {t.type}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Nivel {t.discount}
                  </span>
                </div>

                <div className="pricing-card__name" style={{ color: t.featured ? t.color : 'inherit', fontSize: '2rem' }}>{t.name}</div>
                <div className="pricing-card__price">{t.price} <span>CAD</span></div>
                <div className="pricing-card__sub">{t.sub}</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '16px 0', lineHeight: 1.5, textAlign: 'left' }}>{t.description}</p>

                <div className="pricing-card__divider" />

                <ul className="pricing-card__features" style={{ flex: 1 }}>
                  {t.features.map((f) => (
                    <li key={f} className="pricing-card__feature">
                      <svg viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2" style={{ width: 16, height: 16, marginRight: 8, flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="mailto:francisco@expomexico.ca" className="pricing-card__cta" style={{ ...(!t.featured ? { border: `1px solid ${t.color}`, color: t.color, background: 'transparent' } : {}), marginTop: 'auto' }}>
                  Reservar con el 50%
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Header & Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', paddingTop: '80px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              Nuestros Aliados
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, color: 'var(--navy)', margin: 0, lineHeight: 1 }}>
              Directorio de Patrocinadores
            </h2>
          </Reveal>

          <Reveal delay={100} style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--magenta)' }} size={20} />
              <input 
                type="text" 
                placeholder="Buscar patrocinador..." 
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

        {/* SPONSORS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
          {filteredSponsors.length > 0 ? (
            filteredSponsors.map((sponsor, idx) => (
              <Reveal key={sponsor.id} delay={idx * 50}>
                <Link href={`/patrocinadores/${sponsor.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                      {sponsor.gallery && sponsor.gallery.length > 0 && (
                        <img src={sponsor.gallery[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                    </div>

                    {/* FLOATING LOGO */}
                    <div style={{ 
                      width: '70px', height: '70px', background: '#fff', borderRadius: '50%', padding: '4px',
                      position: 'absolute', top: '125px', left: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                    }}>
                      <img src={sponsor.logo} alt={sponsor.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    </div>

                    {/* BODY */}
                    <div style={{ padding: '56px 24px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px', lineHeight: 1.2 }}>{sponsor.name}</h3>
                      
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '32px', flexGrow: 1 }}>{sponsor.description.substring(0, 100)}...</p>

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
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px', background: '#fff', borderRadius: '24px' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--text)' }}>No se encontraron patrocinadores con ese término.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
