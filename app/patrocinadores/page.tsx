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
              <h2 className="section__title" style={{ marginTop: '16px' }}>Paquetes de <br /><em>Patrocinio</em></h2>
            </div>
          </Reveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {/* ORO */}
            <Reveal delay={100}>
              <div style={{ background: '#fff', padding: '40px 32px', borderRadius: '24px', borderTop: '6px solid var(--gold)', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '8px' }}>Patrocinio Oro</h3>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: 'var(--gold)', marginBottom: '16px' }}>CAD $8,000</div>
                <p style={{ color: 'var(--text)', marginBottom: '24px', lineHeight: 1.6 }}>Nuestro paquete de mayor posicionamiento, diseñado para organizaciones que buscan una presencia sólida antes, durante y después del evento.</p>
                <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Incluye:</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--gold)' }}>•</span> Stand premium de 6 x 4 metros</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--gold)' }}>•</span> 3 accesos al Mexican Fashion Gala Show</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--gold)' }}>•</span> 2 accesos al Ontario – Mexico Business Summit, encuentro de negocios binacional</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--gold)' }}>•</span> Participación en la agenda de la Misión Comercial a Montreal, ante empresarios, organismos, cámaras de comercio e instituciones, generando espacios adicionales de networking y oportunidades de negocio</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--gold)' }}>•</span> Presencia del logotipo de su empresa en todos los materiales promocionales impresos y digitales del evento</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--gold)' }}>•</span> Promoción de los productos o servicios profesionales a través de las redes sociales y del sitio web oficial de Expo México Mujer durante toda la campaña de difusión</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--gold)' }}>•</span> Proyección del logotipo en pantallas durante el evento</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--gold)' }}>•</span> Presencia de marca mediante banners en áreas estratégicas</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--gold)' }}>•</span> Distribución de material promocional proporcionado por la empresa entre los asistentes</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--gold)' }}>•</span> Espacio para dirigir un mensaje institucional durante el evento</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--gold)' }}>•</span> Posibilidad de participar como ponentes dentro del Women Leaders Forum, en alguno de nuestros paneles o conferencias dependiendo de la industria a la que pertenezcan.</li>
                </ul>
              </div>
            </Reveal>

            {/* PLATA */}
            <Reveal delay={200}>
              <div style={{ background: '#fff', padding: '40px 32px', borderRadius: '24px', borderTop: '6px solid #B0BEC5', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '8px' }}>Patrocinio Plata</h3>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: '#B0BEC5', marginBottom: '16px' }}>CAD $6,000</div>
                <p style={{ color: 'var(--text)', marginBottom: '24px', lineHeight: 1.6 }}>Una excelente alternativa para organizaciones que buscan una presencia destacada y una relación cercana con la comunidad empresarial mexicana – canadiense.</p>
                <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Incluye:</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#B0BEC5' }}>•</span> Stand de 4 x 3 metros</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#B0BEC5' }}>•</span> 2 accesos al Mexican Fashion Gala Show</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#B0BEC5' }}>•</span> 2 accesos al Ontario – Mexico Business Summit</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#B0BEC5' }}>•</span> Presencia del logotipo en materiales promocionales impresos y digitales</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#B0BEC5' }}>•</span> Promoción de sus productos o servicios mediante nuestras redes sociales y sitio web oficial durante la campaña de difusión</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#B0BEC5' }}>•</span> Proyección del logotipo en pantallas durante el evento</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#B0BEC5' }}>•</span> Presencia de marca mediante banners</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#B0BEC5' }}>•</span> Reconocimiento institucional como patrocinador</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#B0BEC5' }}>•</span> Posibilidad de recibir la palabra durante alguna actividad del Women Leaders Forum, sujeto a la integración del programa</li>
                </ul>
              </div>
            </Reveal>

            {/* BRONCE */}
            <Reveal delay={300}>
              <div style={{ background: '#fff', padding: '40px 32px', borderRadius: '24px', borderTop: '6px solid #CD7F32', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '8px' }}>Patrocinio Bronce</h3>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: '#CD7F32', marginBottom: '16px' }}>CAD $4,000</div>
                <p style={{ color: 'var(--text)', marginBottom: '24px', lineHeight: 1.6 }}>Ideal para organizaciones que desean incorporarse a Expo México Mujer y comenzar a posicionar sus servicios dentro de la comunidad y mercado canadiense.</p>
                <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Incluye:</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#CD7F32' }}>•</span> Stand de 2 x 2 metros</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#CD7F32' }}>•</span> 1 acceso al Mexican Fashion Gala Show</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#CD7F32' }}>•</span> 1 acceso al Ontario – Mexico Business Summit</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#CD7F32' }}>•</span> Presencia del logotipo en materiales promocionales impresos y digitales</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#CD7F32' }}>•</span> Promoción de sus productos o servicios mediante nuestras redes sociales y sitio web oficial</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#CD7F32' }}>•</span> Proyección del logotipo en pantallas durante el evento</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#CD7F32' }}>•</span> Presencia de marca mediante banners</li>
                  <li style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#CD7F32' }}>•</span> Reconocimiento institucional como patrocinador</li>
                </ul>
              </div>
            </Reveal>
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
