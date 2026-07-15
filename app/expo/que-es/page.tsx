"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, Globe, Award, ArrowLeft, Mail, Phone, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
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
        
        {/* 1. Presentación del evento */}
        <div style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <Reveal>
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Equipo Directivo
            </h2>
          </Reveal>

          <style>{`
            .c-grid { max-width: 1100px; margin: 40px auto 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; text-align: left; }
            .c-card {
              background: #fff; border-radius: 32px; padding: 48px; text-align: left;
              box-shadow: 0 10px 40px rgba(0,46,81,0.04); border: 1px solid rgba(0,46,81,0.05);
              transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
              position: relative; overflow: hidden; display: flex; flex-direction: column;
            }
            .c-card:hover { transform: translateY(-8px); box-shadow: 0 25px 60px rgba(0,46,81,0.08); }
            .c-card::after {
              content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 6px; background: var(--magenta);
              transform: scaleX(0); transform-origin: left; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .c-card:hover::after { transform: scaleX(1); }
            .c-avatar-box { width: 120px; height: 120px; border-radius: 24px; background: #FAF8F5; display: flex; align-items: center; justify-content: center; margin-bottom: 32px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
            .c-avatar-box img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
            .c-name { font-family: var(--font-display); font-size: 2.5rem; color: var(--blue); margin-bottom: 8px; font-weight: 400; line-height: 1.1; }
            .c-role { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--magenta); margin-bottom: 40px; font-weight: 600; }
            .c-links { display: flex; flex-direction: column; gap: 20px; margin-bottom: 48px; flex: 1; }
            .c-link-item { display: flex; align-items: center; gap: 16px; color: #555; text-decoration: none; font-size: 1.1rem; transition: color 0.3s ease; }
            .c-link-item:hover { color: var(--magenta); }
            .c-link-icon-box { width: 48px; height: 48px; border-radius: 50%; background: #FAF8F5; display: flex; align-items: center; justify-content: center; color: var(--blue); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
            .c-link-item:hover .c-link-icon-box { background: var(--magenta); color: #fff; transform: scale(1.1); }
            .c-action { display: inline-flex; align-items: center; justify-content: space-between; padding: 20px 28px; background: #FAF8F5; border-radius: 100px; color: var(--blue); font-weight: 600; text-decoration: none; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); font-size: 1.05rem; }
            .c-action:hover { background: var(--magenta); color: #fff; box-shadow: 0 10px 20px rgba(214,0,110,0.2); }
            .c-action-icon { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
            .c-action:hover .c-action-icon { transform: translateX(6px); }
          `}</style>

          <div className="c-grid">
            {/* Francisco Solorio */}
            <div className="c-card">
              <div className="c-avatar-box">
                <img src="/fotos perfil/Foto Francisco.jpg" alt="Francisco Solorio" />
              </div>
              <h2 className="c-name">Francisco Solorio</h2>
              <div className="c-role">Director General</div>

              <div className="c-links">
                <a href="mailto:francisco@expomexico.ca" className="c-link-item">
                  <div className="c-link-icon-box"><Mail size={20} /></div>
                  <span>francisco@expomexico.ca</span>
                </a>
                <a href="tel:+525527199694" className="c-link-item">
                  <div className="c-link-icon-box"><Phone size={20} /></div>
                  <span>+52 55 2719 9694</span>
                </a>
              </div>

              <a href="https://wa.me/525527199694" className="c-action" target="_blank" rel="noopener noreferrer">
                <span>Iniciar chat en WhatsApp</span>
                <ArrowRight size={22} className="c-action-icon" />
              </a>
            </div>

            {/* Luis García */}
            <div className="c-card">
              <div className="c-avatar-box">
                <img src="/fotos perfil/Foto Luis.jpg" alt="Luis García" />
              </div>
              <h2 className="c-name">Luis García</h2>
              <div className="c-role">Director de Operaciones</div>

              <div className="c-links">
                <a href="mailto:luis@expomexico.ca" className="c-link-item">
                  <div className="c-link-icon-box"><Mail size={20} /></div>
                  <span>luis@expomexico.ca</span>
                </a>
                <a href="tel:+527225514645" className="c-link-item">
                  <div className="c-link-icon-box"><Phone size={20} /></div>
                  <span>+52 722 551 4645</span>
                </a>
              </div>

              <a href="https://wa.me/527225514645" className="c-action" target="_blank" rel="noopener noreferrer">
                <span>Iniciar chat en WhatsApp</span>
                <ArrowRight size={22} className="c-action-icon" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
