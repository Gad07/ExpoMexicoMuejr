"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Handshake, Users, Award, Shield } from 'lucide-react';

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
  return (
    <div className="aliados-page" style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 4% 80px' }}>
        <Reveal>
          <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
            Vinculación Institucional
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
            Aliados Estratégicos & Cámaras
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text)', maxWidth: '700px', marginBottom: '60px', lineHeight: 1.6 }}>
            Expo México Mujer cuenta con el respaldo y vinculación activa de organismos gubernamentales, cámaras de comercio binacionales y asociaciones empresariales comprometidas con la integración económica y el liderazgo femenino.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          <Reveal delay={100}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--magenta)', marginBottom: '20px' }}><Handshake size={40} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Aliados Estratégicos</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                Empresas líderes del sector privado nacional e internacional que aportan innovación, recursos y soporte operativo clave para materializar la visión binacional del evento.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--cyan)', marginBottom: '20px' }}><Shield size={40} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Aliados Institucionales</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                Entidades gubernamentales, consulados y embajadas de México y Canadá que brindan respaldo oficial, legitimidad y acompañamiento político en todos los intercambios.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--navy)', marginBottom: '20px' }}><Award size={40} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Cámaras Empresariales</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                Organizaciones e intermediarios de negocios (como COMCE, cámaras hispanas y asociaciones locales de Ontario) que catalizan las ruedas de negocios y el networking comercial.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Grid de Logotipos de Aliados */}
        <div style={{ marginTop: '100px', paddingTop: '80px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginTop: '16px' }}>
                Aliados Oficiales
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '16px auto 0', lineHeight: 1.6 }}>
                Vinculación activa con organismos institucionales y cámaras comerciales.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px', justifyContent: 'center' }}>
            {[
              {
                name: "Consulado General de México en Toronto",
                color: "#006847",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="11" r="3" />
                    <path d="M12 8v6M9 11h6" />
                  </svg>
                )
              },
              {
                name: "Embajada de México en Canadá",
                color: "#D6A354",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 22h16M4 20h16M5 20V9m14 11V9M9 20V9m6 10V9M3 9l9-6 9 6H3z" />
                  </svg>
                )
              },
              {
                name: "Cámara de Comercio de Canadá en México",
                color: "#FF0000",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3l1.5 4 4.5-.5-2.5 3.5 3 3.5-4.5-.5-2 4-2-4-4.5.5 3-3.5-2.5-3.5 4.5.5L12 3zM12 17v4" />
                  </svg>
                )
              },
              {
                name: "COMCE",
                color: "#002F51",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                )
              },
              {
                name: "Ontario Chamber of Commerce",
                color: "#0085A1",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                    <path d="M15 8h3.7V11.7" />
                  </svg>
                )
              },
              {
                name: "Government of Ontario",
                color: "#4A90E2",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8 6 3 12 3 15c0 4 3.5 6 9 6s9-2 9-6c0-3-5-9-9-13z" />
                    <path d="M12 21V9M12 9c-2-2-4-2-6 0M12 9c2-2 4-2 6 0" />
                  </svg>
                )
              },
              {
                name: "Quebec International",
                color: "#0033A0",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2c0 6-3 10-6 11 4 0 6 3 6 8 0-5 2-8 6-8-3-1-6-5-6-11z" />
                    <path d="M2 13c5 0 9-2 10-7 1 5 5 7 10 7M12 11h.01" />
                  </svg>
                )
              },
              {
                name: "WBE Canada",
                color: "#E03C8A",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5zM12 14c-4.4 0-8 3.6-8 8h16c0-4.4-3.6-8-8-8z" />
                    <circle cx="12" cy="7" r="1" />
                  </svg>
                )
              },
              {
                name: "Mexican Chamber of Commerce in Canada",
                color: "#E25C34",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                )
              }
            ].map((ally, idx) => (
              <Reveal key={ally.name} delay={idx * 40}>
                <div 
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
                    color: '#8A99AD',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,25,76,0.06)';
                    e.currentTarget.style.color = ally.color;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,25,76,0.02)';
                    e.currentTarget.style.color = '#8A99AD';
                  }}
                >
                  {ally.svg}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
