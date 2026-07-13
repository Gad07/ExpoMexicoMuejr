"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, ShieldCheck, Award, Handshake, Users, ArrowLeft } from 'lucide-react';
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

export default function BusinessSummitPage() {
  const summitAgenda = [
    {
      time: '09:30 AM - 11:30 AM',
      title: 'Encuentro de Negocios: Delegación Mexicana & Contrapartes Canadienses',
      speaker: 'Líderes de Cámaras Empresariales y Representantes Gubernamentales',
      location: 'Auditorio de Negocios',
      desc: 'Mesas de trabajo sectoriales donde empresarias mexicanas presentan sus productos y capacidades a importadores directos, distribuidores y representantes de corporaciones en Ontario.'
    },
    {
      time: '12:00 PM - 02:00 PM',
      title: 'Almuerzo Ejecutivo y Firma de Convenios Comerciales',
      speaker: 'Francisco Solorio y Presidentes de Cámaras de Ontario',
      location: 'Gran Salón Ejecutivo',
      desc: 'Momento de networking de alto nivel con discursos de autoridades de comercio exterior y firma de convenios bilaterales para impulsar el financiamiento y facilidades logísticas.'
    },
    {
      time: '03:00 PM - 05:00 PM',
      title: 'Sesiones de Negociación Sectoriales y Logística',
      speaker: 'Luis García y Especialistas en Exportación',
      location: 'Salas Ejecutivas A & B',
      desc: 'Mesas de asesoría técnica sobre cumplimiento de normas de etiquetado, aduanas canadienses, canales de distribución internacional y logística integrada.'
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

        {/* Sección 1: Encuentro de Negocios */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center', marginBottom: '100px' }}>
          <Reveal delay={100}>
            <div>
              <span className="section__label" style={{ marginBottom: '12px' }}>Objetivo Comercial</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px', lineHeight: 1.15 }}>
                Encuentro de la Delegación Mexicana y Contrapartes Canadienses
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '32px' }}>
                Este espacio reúne frente a frente a exportadoras mexicanas preparadas con importadores, directores de compras corporativas e inversionistas ángeles en Canadá. El objetivo es estructurar negociaciones seguras y sustentables que permitan introducir marcas mexicanas al mercado formal de Ontario.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--cyan)', margin: '0 0 4px' }}>40+</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, fontWeight: 700 }}>Compradores de Ontario</p>
                </div>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--magenta)', margin: '0 0 4px' }}>120+</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, fontWeight: 700 }}>Citas B2B Agendadas</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,46,81,0.04)', display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
                <div style={{ color: 'var(--cyan)', background: 'rgba(0,186,211,0.08)', padding: '12px', borderRadius: '12px' }}><Users size={24} /></div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Networking Corporativo</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Vínculos con la Cámara de Comercio de Ontario y asociaciones locales para expandir redes comerciales.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
                <div style={{ color: 'var(--magenta)', background: 'rgba(228,0,124,0.08)', padding: '12px', borderRadius: '12px' }}><Handshake size={24} /></div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Alianzas Bilaterales</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Facilitamos la creación de joint-ventures comerciales con importadores consolidados.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
                <div style={{ color: 'var(--navy)', background: 'rgba(0,25,76,0.05)', padding: '12px', borderRadius: '12px' }}><Award size={24} /></div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>Firma de Acuerdos</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Acuerdos oficiales de cooperación para simplificar el flujo logístico y aduanero.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Sección 2: Agenda */}
        <div id="agenda" style={{ marginTop: '80px', paddingTop: '80px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <span className="section__label">Programa Oficial</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Agenda del Summit
            </h2>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {summitAgenda.map((item, idx) => (
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
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                      {item.desc}
                    </p>
                    <span style={{ display: 'inline-block', background: 'rgba(0,186,211,0.08)', color: 'var(--cyan)', padding: '6px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700 }}>
                      Presenta: {item.speaker}
                    </span>
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
