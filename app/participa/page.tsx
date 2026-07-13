"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Award, CheckCircle, Handshake, Users, Sparkles, ShoppingBag } from 'lucide-react';

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
  return (
    <div className="participa-page" style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* SECCIÓN 1: Expositoras */}
      <section id="expositoras" style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 4% 80px' }}>
        <Reveal>
          <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
            Participación Comercial
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '40px' }}>
            Expositoras
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
          <Reveal delay={100}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--magenta)', marginBottom: '20px' }}><Sparkles size={40} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>Stands y Espacios</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '20px' }}>
                Disponemos de espacios de exhibición premium diseñados para maximizar la visibilidad de tu marca y productos en el centro de convenciones de Toronto.
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Stands de 3x3 y 2x2 metros completamente equipados.</li>
                <li>Montaje premium con iluminación y rotulación personalizada.</li>
                <li>Zonas de B2B y áreas de networking exclusivas.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--cyan)', marginBottom: '20px' }}><CheckCircle size={40} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>Beneficios de Participación</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '20px' }}>
                Posiciona tu negocio a nivel internacional e interactúa directamente con importadores, distribuidores y el público general canadiense.
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Acceso directo al Directorio Digital oficial de expositoras.</li>
                <li>Presencia en medios de prensa y campañas publicitarias.</li>
                <li>Agendamiento previo de citas de negocios (Matchmaking).</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} style={{ marginTop: '48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <a href="/#contacto" style={{ display: 'inline-block', background: 'var(--magenta)', color: '#fff', padding: '16px 36px', borderRadius: '100px', fontWeight: 700, textDecoration: 'none', transition: 'background 0.3s' }}
               onMouseOver={(e) => e.currentTarget.style.background = '#d0006f'}
               onMouseOut={(e) => e.currentTarget.style.background = 'var(--magenta)'}>
              Registro Oficial de Expositoras
            </a>
            <a href="/expositores" style={{ display: 'inline-block', border: '2px solid var(--navy)', color: 'var(--navy)', padding: '14px 34px', borderRadius: '100px', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s' }}
               onMouseOver={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = '#fff'; }}
               onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)'; }}>
              Ver Directorio Digital
            </a>
          </div>
        </Reveal>
      </section>

      {/* SECCIÓN 2: Patrocinadores */}
      <section id="patrocinadores" style={{ background: 'var(--navy)', color: '#fff', padding: '120px 4%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--cyan)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              Alianzas Corporativas
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              Patrocinadores
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginTop: '40px' }}>
            <Reveal delay={100}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                Categorías de Patrocinio
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                Ofrecemos distintas modalidades de vinculación comercial para adaptarnos al tamaño e impacto de tu corporación: Platino, Oro, Plata y Bronce, además de patrocinios especiales en áreas temáticas específicas como gastronomía, moda o tecnología.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                Beneficios de Patrocinio
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                Los patrocinadores oficiales reciben una exposición de marca inigualable en todas las plataformas digitales, físicas, impresas y espacios VIP del evento, sumado a oportunidades directas de vinculación con delegaciones empresariales de alto nivel.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Embajadoras */}
      <section id="embajadoras" style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 4% 80px' }}>
        <Reveal>
          <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
            Liderazgo Territorial
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '40px' }}>
            Embajadoras Expo México Mujer
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          <Reveal delay={100}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>Convocatoria Nacional</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                Buscamos a mujeres líderes en cada rincón del país que deseen representar los valores de innovación, cultura y esfuerzo de la mujer mexicana en Canadá.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>Representación Estatal</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                Las embajadoras coordinan la participación territorial de sus estados, llevando muestras artesanales, gastronómicas e industriales representativas del interior de la república.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>Registro de Aspirantes</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                Si deseas postularte o proponer a una líder de tu comunidad, completa nuestro formulario oficial para ser evaluada por el comité directivo.
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
              Nuestros Aliados
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            <Reveal delay={100}>
              <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,46,81,0.02)', textAlign: 'center' }}>
                <div style={{ color: 'var(--magenta)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><Handshake size={32} /></div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Aliados Estratégicos</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.5 }}>Empresas y agencias de desarrollo que co-crean valor y sustentan la estructura del evento.</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,46,81,0.02)', textAlign: 'center' }}>
                <div style={{ color: 'var(--cyan)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><Users size={32} /></div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Aliados Institucionales</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.5 }}>Gobiernos estatales, embajadas y consulados de ambos países respaldando las operaciones.</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,46,81,0.02)', textAlign: 'center' }}>
                <div style={{ color: 'var(--navy)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><Award size={32} /></div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Cámaras Empresariales</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.5 }}>Cámaras binacionales y asociaciones de comercio que promueven los intercambios comerciales.</p>
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
              Ponentes y Líderes
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              Invitados Especiales
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)' }}>
              Nuestra agenda se nutre con la experiencia de líderes empresariales sobresalientes, conferencistas inspiradoras y personalidades influyentes en el ámbito del comercio internacional y el empoderamiento femenino de Canadá y Latinoamérica.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#eaeaea', borderRadius: '24px', overflow: 'hidden', height: '350px', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" alt="Conferencia EMM" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECCIÓN 6: Compradores */}
      <section id="compradores" style={{ background: 'var(--navy)', color: '#fff', padding: '120px 4%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              Vinculación B2B
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              Compradores e Inversionistas
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>
              Si eres distribuidor, comprador corporativo o inversionista en Canadá y deseas contactar con productos premium mexicanos, este es tu espacio de vinculación.
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', textAlign: 'left', marginBottom: '48px' }}>
            <Reveal delay={100}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '32px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>Registro de Compradores</h4>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>Obtén credenciales VIP y accede a las agendas exclusivas de citas de negocios uno a uno durante el evento.</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '32px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>Directorio de Compradores</h4>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>Directorio dinámico que facilita a las marcas identificar y conectar con perfiles de interés comercial.</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '32px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>Vinculación Empresarial</h4>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>Mesas redondas de negociación sectoriales guiadas por mentores comerciales certificados.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
