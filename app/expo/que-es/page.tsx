"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, Globe, Award, ArrowLeft, Mail, Phone, Calendar, CheckCircle } from 'lucide-react';
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

const mockDirectors = [
  {
    name: "Francisco Solorio",
    role: "Director General",
    desc: "Líder binacional con más de 15 años de experiencia en relaciones comerciales, alianzas de inversión y desarrollo de proyectos de vinculación comercial entre México y Canadá.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    email: "francisco@expomexico.ca",
    phone: "+1 (416) 555-0199"
  },
  {
    name: "Luis García",
    role: "Director de Logística y Operaciones",
    desc: "Especialista en cadena de suministro global y logística internacional. Coordina aduanas, transporte y montajes de pabellones premium para garantizar el éxito de la Expo.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    email: "luis.garcia@expomexico.ca",
    phone: "+1 (416) 555-0188"
  }
];

export default function QueEsPage() {
  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* Back Link */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)', textDecoration: 'none', fontWeight: 700, marginBottom: '40px' }}>
          <ArrowLeft size={16} /> Volver al Inicio
        </Link>

        {/* 1. Presentación del evento */}
        <div style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <Reveal>
              <span className="section__label">Presentación</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px', lineHeight: 1.1 }}>
                Una plataforma que trasciende fronteras
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text)', marginBottom: '24px' }}>
                Expo México Mujer es el encuentro empresarial y cultural más relevante entre México y Canadá. Nace de la necesidad de proyectar el liderazgo y talento corporativo femenino de origen mexicano hacia mercados norteamericanos de alta competitividad.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: 0 }}>
                Durante 5 días en la metrópoli de Toronto, el evento reúne a delegadas de múltiples estados mexicanos con compradores globales, inversionistas institucionales y autoridades consulares en una serie de foros de alto nivel, pasarelas de moda y mesas de negociación directa.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', borderRadius: '32px', padding: '48px', boxShadow: '0 20px 50px rgba(0,25,76,0.04)', border: '1px solid rgba(0,0,0,0.01)', position: 'relative' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '24px' }}>Impacto México-Canadá</span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--cyan)', marginTop: '4px' }}><CheckCircle size={20} /></div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px 0' }}>Alianza Binacional</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Fortalecimiento del comercio internacional directo al amparo del acuerdo del T-MEC.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--cyan)', marginTop: '4px' }}><CheckCircle size={20} /></div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px 0' }}>Proyección Cultural</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Difusión artística, textil y artesanal de alta gama en espacios museísticos y comerciales de Canadá.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--cyan)', marginTop: '4px' }}><CheckCircle size={20} /></div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px 0' }}>Empoderamiento Económico</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Impulso al crecimiento empresarial de mujeres mexicanas a través de redes de mentoría y acceso a financiamiento internacional.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 2. Misión, Visión y Objetivos */}
        <div id="mision-vision" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <span className="section__label">Dirección Estratégica</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Misión, Visión y Objetivos
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <Reveal delay={100}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)' }}>
                <div style={{ color: 'var(--magenta)', marginBottom: '20px' }}><Target size={40} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>Misión</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                  Empoderar a la mujer empresaria y profesional de origen mexicano facilitando su inserción, posicionamiento e impacto en los mercados internacionales, especialmente en Canadá.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)' }}>
                <div style={{ color: 'var(--cyan)', marginBottom: '20px' }}><Globe size={40} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>Visión</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                  Ser la plataforma líder de vinculación empresarial y cultural para mujeres hispanas en Norteamérica, reconocida por su excelencia, impacto socioeconómico y resultados tangibles.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)' }}>
                <div style={{ color: 'var(--navy)', marginBottom: '20px' }}><Award size={40} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>Objetivos</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                  Generar alianzas comerciales sostenibles, brindar herramientas técnicas de capacitación global y proyectar el patrimonio e identidad cultural de México al más alto nivel.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 3. Equipo Directivo */}
        <div id="equipo" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px', textAlign: 'center' }}>
            <span className="section__label">Liderazgo</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Equipo Directivo
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', justifyContent: 'center', maxWidth: '900px', margin: '0 auto' }}>
            {mockDirectors.map((director, idx) => (
              <Reveal key={director.name} delay={idx * 150}>
                <div style={{ 
                  background: '#fff', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  boxShadow: '0 15px 35px rgba(0,25,76,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative'
                }}>
                  {/* COVER PHOTO */}
                  <div style={{ height: '160px', width: '100%', position: 'relative', background: '#f0f0f0' }}>
                    <img src={director.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                  </div>

                  {/* FLOATING LOGO */}
                  <div style={{ 
                    width: '80px', height: '80px', background: '#fff', borderRadius: '50%', padding: '4px',
                    position: 'absolute', top: '120px', left: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                  }}>
                    <img src={director.photo} alt={director.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  </div>

                  {/* BODY */}
                  <div style={{ padding: '56px 24px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px', lineHeight: 1.2, textTransform: 'uppercase' }}>{director.name}</h3>
                    
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '16px' }}>
                      {director.role}
                    </span>

                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '24px', flexGrow: 1 }}>{director.desc}</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy)' }}>
                        <Mail size={16} color="var(--cyan)" /> {director.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy)' }}>
                        <Phone size={16} color="var(--cyan)" /> {director.phone}
                      </div>
                    </div>
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
