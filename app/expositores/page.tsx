"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { industries, mockExhibitors } from '../data/expositores';
import { Search, ChevronLeft, MapPin, ArrowRight } from 'lucide-react';
function Reveal({
  children, className = '', delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
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
    <div ref={ref} className={className} style={{ ...baseStyle, ...(inView ? inViewStyle : {}) }}>
      {children}
    </div>
  );
}

export default function ExpositoresPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // VISTA 2: Lista de Expositores por Categoría
  if (activeCategory) {
    const categoryData = industries.find(ind => ind.name === activeCategory);
    
    // Filtrar expositores
    const filteredExhibitors = mockExhibitors.filter(ex => {
      const matchCategory = ex.category === activeCategory;
      const matchSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ex.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    return (
      <div className="exhibitors-page">
        <section className="exhibitors-container" style={{ padding: '80px 48px', minHeight: '80vh', background: 'var(--cream)', position: 'relative' }}>
          <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
            
            {/* Top Bar: Back & Search */}
            <div className="exh-topbar">
              <button 
                className="btn-back"
                onClick={() => { setActiveCategory(null); setSearchQuery(''); }}
              >
                <ChevronLeft size={24} />
                Volver a Categorías
              </button>
              
              <div className="exh-search-wrapper">
                <Search size={20} className="exh-search-icon" />
                <input 
                  type="text"
                  placeholder="Buscar empresa, marca o servicio..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="exh-search-input"
                />
              </div>
            </div>

            <Reveal>
              <div style={{ marginBottom: '64px' }}>
                <span className="section__label">Directorio de Expositores</span>
                <h2 className="section__title" style={{ marginTop: '8px' }}>
                  Marcas en <br /><em>{activeCategory}</em>
                </h2>
              </div>
            </Reveal>

            {/* Exhibitors Grid */}
            {filteredExhibitors.length > 0 ? (
              <div className="exh-grid">
                {filteredExhibitors.map((ex, i) => (
                  <Reveal key={ex.id} delay={i * 50}>
                    <Link href={`/expositores/${ex.slug}`} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
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
                          {ex.gallery && ex.gallery.length > 0 && (
                            <img src={ex.gallery[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          )}
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                        </div>

                        {/* FLOATING LOGO */}
                        <div style={{ 
                          width: '70px', height: '70px', background: '#fff', borderRadius: '50%', padding: '4px',
                          position: 'absolute', top: '125px', left: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 10,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                        }}>
                          <img src={ex.logo} alt={ex.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>

                        {/* BODY */}
                        <div style={{ padding: '56px 24px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px', lineHeight: 1.2 }}>{ex.name}</h3>
                          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--magenta)', fontWeight: 700, fontSize: '0.75rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <MapPin size={14} /> {ex.booth}
                          </p>
                          
                          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '32px', flexGrow: 1 }}>{ex.description.substring(0, 100)}...</p>

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
            ) : (
              <div className="exh-empty">
                <p>No se encontraron expositores que coincidan con "{searchQuery}" en esta categoría.</p>
                {mockExhibitors.filter(ex => ex.category === activeCategory).length === 0 && (
                  <p style={{ marginTop: '12px', fontSize: '0.9rem', opacity: 0.7 }}>
                    (Nota: Aún no hay expositores de prueba creados para esta categoría. Intenta buscar en Gastronomía, Arte y Cultura, Moda y Textiles, o Tecnología).
                  </p>
                )}
              </div>
            )}
          </div>
        </section>


      </div>
    );
  }

  // VISTA 1: Lista de Categorías
  return (
    <div className="exhibitors-page">
      <section className="exhibitors-categories" style={{ padding: '140px 48px', background: 'var(--cream)', minHeight: '80vh' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span className="section__label">Directorio</span>
            <h2 className="section__title section__title--center">
              Nuestros <em>Sectores</em>
            </h2>
            <p className="section__desc section__desc--center" style={{ marginBottom: '64px' }}>
              Selecciona una industria para descubrir las marcas y empresas que están transformando el panorama empresarial en Expo México Mujer.
            </p>
          </Reveal>
          
          <div className="ind-grid">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 50}>
                <div
                  className="ind-card"
                  onClick={() => setActiveCategory(ind.name)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="ind-card__img-wrap">
                    <img src={ind.img} alt={ind.name} loading="lazy" />
                    <div className="ind-card__overlay" />
                  </div>
                  <div className="ind-card__body">
                    <span className="ind-card__num">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="ind-card__title">{ind.name}</h3>
                    <p className="ind-card__desc">{ind.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
