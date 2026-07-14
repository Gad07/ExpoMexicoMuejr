"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Heart, Users, ArrowLeft, Plane, Compass, Building } from 'lucide-react';
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

const mockTimeline = [
  {
    day: "Día 1: 5 de Junio",
    title: "Arribo a Montreal e Inducción Logística",
    desc: "Llegada de la delegación mexicana, registro en el hotel sede y sesión técnica privada sobre regulaciones aduaneras de Quebec."
  },
  {
    day: "Día 2: 6 de Junio",
    title: "Mesas Redondas con Cámaras de Comercio de Quebec",
    desc: "Encuentro institucional y presentación comercial ante agrupaciones de comercio locales y distribuidores francófonos."
  },
  {
    day: "Día 3: 7 de Junio",
    title: "Visitas de Prospección y Distribución Física",
    desc: "Recorrido por centros logísticos clave, supermercados gourmet y boutiques de alta gama en Montreal para entender canales locales."
  },
  {
    day: "Día 4: 8 de Junio",
    title: "Almuerzo de Vinculación y Rueda B2B",
    desc: "Ronda oficial de citas de negocios uno a uno con importadores y firmas de inversión en Le Westin Montreal."
  },
  {
    day: "Día 5: 9 de Junio",
    title: "Clausura y Traslado de Delegadas a Toronto",
    desc: "Cierre de la agenda en Montreal, evaluación comercial inicial y traslado terrestre/aéreo hacia la sede de Toronto para el evento central."
  }
];

export default function MontrealMissionPage() {
  const missionAgenda = [
    {
      time: '09:00 AM - 05:00 PM (Día a Día)',
      title: 'Agenda Comercial de Citas en Montreal',
      location: 'Centro de Negocios de Montreal',
      desc: 'Programa personalizado de reuniones comerciales estructurado según la capacidad de oferta de las delegadas mexicanas y las demandas de compra locales.'
    },
    {
      time: '01:00 PM - 03:00 PM (8 de Junio)',
      title: 'Almuerzo de Vinculación con COMCE Región Sur',
      location: 'Le Westin Montreal',
      desc: 'Encuentro culinario e institucional privado presidido por directivos de COMCE Región Sur e invitados corporativos de la región de Quebec.'
    },
    {
      time: '04:00 PM - 06:00 PM (9 de Junio)',
      title: 'Recepción de Clausura de la Misión y Traslado a Toronto',
      location: 'Aeropuerto de Montreal (YUL) / Estación Central',
      desc: 'Cierre protocolar de la delegación en la provincia de Quebec y salida oficial hacia Ontario.'
    }
  ];

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* 1. Programa General del 5 al 9 de Junio */}
        <div id="itinerario" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <span className="section__label">Cronograma de Viaje</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Programa del 5 al 9 de Junio de 2027
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {mockTimeline.map((item, idx) => (
              <Reveal key={item.day} delay={idx * 80}>
                <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>{item.day}</span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px', lineHeight: 1.25 }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 2. Vinculación con COMCE Región Sur */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center', marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal delay={100}>
            <div>
              <span className="section__label">Respaldo Institucional</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px' }}>
                Vinculación con COMCE Región Sur
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '32px' }}>
                El Consejo Empresarial Mexicano de Comercio Exterior, Inversión y Tecnología (COMCE) Región Sur encabeza y respalda institucionalmente a la delegación empresarial. A través de su estructura de vinculación internacional, facilitan los canales formales y validaciones necesarias para el éxito exportador.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                  <div style={{ color: 'var(--cyan)', marginTop: '4px' }}><Building size={20} /></div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 2px 0' }}>Sello de Calidad Exportadora</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Validación y soporte para el envío de muestras físicas y cumplimiento del T-MEC.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                  <div style={{ color: 'var(--magenta)', marginTop: '4px' }}><Compass size={20} /></div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 2px 0' }}>Guiado Profesional Binacional</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Acompañamiento técnico de consultores expertos en comercio binacional durante toda la misión.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', height: '400px', boxShadow: '0 20px 40px rgba(0,46,81,0.06)' }}>
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" alt="COMCE Región Sur" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </Reveal>
        </div>

        {/* 3. Agenda Comercial Día a Día */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <span className="section__label">Encuentros de Negocio</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Agenda Comercial de la Misión
            </h2>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {missionAgenda.map((item, idx) => (
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

      </div>
    </div>
  );
}
