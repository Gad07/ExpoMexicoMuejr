"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Heart, Users, ArrowLeft, Paintbrush, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Mariposa } from '@/components/BrandAssets';

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

const mockDesigners = [
  {
    slug: "alejandra-orozco",
    name: "Alejandra Orozco",
    state: "Oaxaca",
    specialty: "Bordados de Telar de Cintura",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1590736969955-71cb94801759?auto=format&fit=crop&q=80&w=800",
    collection: "Raíces Vivas — Fusión de siluetas contemporáneas con técnicas ancestrales zapotecas de teñido natural."
  },
  {
    slug: "fernanda-covarrubias",
    name: "Fernanda Covarrubias",
    state: "Jalisco",
    specialty: "Alta Costura y Joyería Textil",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
    cover: "https://images.unsplash.com/photo-1511406361295-0a1ee814c1e4?auto=format&fit=crop&q=80&w=800",
    collection: "Tequila Chic — Vestidos de gala con aplicaciones metálicas e hilos de algodón orgánico inspirados en paisajes de agave."
  },
  {
    slug: "gabriela-salazar",
    name: "Gabriela Salazar",
    state: "Chiapas",
    specialty: "Diseño Étnico y Accesorios",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    cover: "https://images.unsplash.com/photo-1565192647048-f997ded87950?auto=format&fit=crop&q=80&w=800",
    collection: "Selva Mágica — Colección de abrigos y bolsos estructurados que integran iconografía tzotzil brocada a mano."
  }
];

const mockCatwalks = [
  {
    theme: "Artesanal Vanguardista",
    time: "07:15 PM - 07:45 PM",
    desc: "Desfile inaugural centrado en el rescate de técnicas autóctonas mexicanas integradas en siluetas minimalistas de corte internacional."
  },
  {
    theme: "Gala Contemporánea",
    time: "07:45 PM - 08:15 PM",
    desc: "Presentación estelar de colecciones de alta costura con intervenciones textiles complejas, ideales para eventos de etiqueta y alfombras rojas."
  }
];

const mockGalaGuests = [
  { name: "Sylvia Davis", role: "Senadora de Canadá", org: "Invitada de Honor" },
  { name: "Jean-Pierre Cloutier", role: "Comprador de Moda", org: "Sterling Imports Ltd." },
  { name: "Valeria Romero", role: "Conferencista Internacional", org: "Líder de Opinión" }
];

export default function FashionGalaPage() {
  const galaAgenda = [
    {
      time: '06:00 PM - 07:00 PM',
      title: 'Recepción Alfombra Roja & Cóctel de Invitados',
      location: 'Foyer Principal',
      desc: 'Llegada de invitados especiales, diseñadoras y prensa. Espacio de fotos oficiales y cóctel de bienvenida con mixología de inspiración mexicana.'
    },
    {
      time: '07:00 PM - 08:30 PM',
      title: 'Pasarela Principal: Diseños y Textiles de Vanguardia',
      location: 'Salón de Gala Principal',
      desc: 'Show central con música en vivo y la presentación en pasarela de las colecciones exclusivas de nuestras diseñadoras invitadas.'
    },
    {
      time: '08:30 PM - 10:00 PM',
      title: 'Cena de Gala & Showroom de Piezas de Alta Costura',
      location: 'Salón de Gala Principal',
      desc: 'Cena formal de tres tiempos y apertura de un showroom interactivo donde los compradores minoristas pueden examinar los textiles de cerca.'
    }
  ];

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* Back Link */}
        <Link href="/agenda" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)', textDecoration: 'none', fontWeight: 700, marginBottom: '40px' }}>
          <ArrowLeft size={16} /> Volver a Agenda General
        </Link>

        {/* 1. Diseñadoras Grid */}
        <div style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <span className="section__label">Talento Creativo</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Diseñadoras Expositores
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
            {mockDesigners.map((designer, idx) => (
              <Reveal key={designer.name} delay={idx * 100}>
                <Link href={`/expositores/${designer.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                      <img src={designer.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                    </div>

                    {/* FLOATING LOGO */}
                    <div style={{ 
                      width: '70px', height: '70px', background: '#fff', borderRadius: '50%', padding: '4px',
                      position: 'absolute', top: '125px', left: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                    }}>
                      <img src={designer.photo} alt={designer.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    </div>

                    {/* BODY */}
                    <div style={{ padding: '56px 24px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px', lineHeight: 1.2, textTransform: 'uppercase' }}>{designer.name}</h3>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {designer.specialty}
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                          Representando a: {designer.state}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '32px', flexGrow: 1 }}>{designer.collection}</p>

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

        {/* 2. Pasarelas Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center', marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal delay={100}>
            <div>
              <span className="section__label">Desfiles Programados</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px' }}>
                Pasarelas y Bloques Temáticos
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '32px' }}>
                La gala se divide en pasarelas enfocadas, estructuradas de forma que cada diseñadora tenga una plataforma óptima para destacar la textura, los detalles tejidos a mano y la composición material de sus prendas.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {mockCatwalks.map((catwalk, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--magenta)', marginTop: '4px' }}><Sparkles size={20} /></div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px 0' }}>{catwalk.theme} <span style={{ fontSize: '0.8rem', color: 'var(--cyan)', marginLeft: '8px' }}>({catwalk.time})</span></h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{catwalk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', height: '420px', boxShadow: '0 20px 40px rgba(0,46,81,0.06)' }}>
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" alt="Pasarelas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </Reveal>
        </div>

        {/* 3. Programa Completo */}
        <div id="programa" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <span className="section__label">Cronograma</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Programa de la Gala
            </h2>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {galaAgenda.map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div style={{ background: '#fff', borderRadius: '24px', padding: '36px 40px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.02)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', alignItems: 'start' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--magenta)', fontWeight: 800, fontSize: '0.95rem' }}>
                      <Clock size={16} /> {item.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <MapPin size={16} /> {item.location}
                    </div>
                  </div>

                  <div style={{ flexGrow: 2 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 12px 0', lineHeight: 1.25 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 4. Invitados Destacados */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px', textAlign: 'center' }}>
            <span className="section__label">Asistencia Especial</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Invitados a la Gala
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
            {mockGalaGuests.map((guest, idx) => (
              <Reveal key={guest.name} delay={idx * 100}>
                <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)', textAlign: 'center', border: '1px solid rgba(0,0,0,0.01)' }}>
                  <div style={{ color: 'var(--cyan)', marginBottom: '16px', display: 'inline-flex', background: 'rgba(0,186,211,0.08)', padding: '12px', borderRadius: '50%' }}><Users size={24} /></div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px' }}>{guest.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, margin: '0 0 6px 0', textTransform: 'uppercase' }}>{guest.role}</p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--magenta)', fontWeight: 800 }}>{guest.org}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
