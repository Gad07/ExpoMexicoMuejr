'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Globe, ArrowRight } from 'lucide-react';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${inView ? 'revealed' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function ContactoPage() {
  return (
    <main className="page-content-wrapper">
      <style>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal.revealed { opacity: 1; transform: translateY(0); }

        .c-hero { padding: 220px 24px 100px; text-align: center; background: #FAF8F5; position: relative; overflow: hidden; }
        .c-hero::before {
          content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle at center, rgba(214,0,110,0.03) 0%, transparent 50%);
          z-index: 0; pointer-events: none;
        }
        .c-hero-inner { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; }
        
        .c-badge { display: inline-block; padding: 8px 16px; border: 1px solid var(--magenta); color: var(--magenta); border-radius: 100px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 32px; }
        
        .c-title { font-family: var(--font-display, inherit); font-size: clamp(3.5rem, 8vw, 5.5rem); font-weight: 300; line-height: 1.1; margin-bottom: 24px; color: var(--blue); }
        .c-title em { font-style: italic; color: var(--magenta); }
        
        .c-desc { font-size: 1.25rem; line-height: 1.6; color: var(--text-muted, #666); max-width: 650px; margin: 0 auto; }

        .c-grid-section { padding: 80px 24px 120px; background: #fff; }
        .c-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; }

        .c-card {
          background: #fff; border-radius: 32px; padding: 48px; text-align: left;
          box-shadow: 0 10px 40px rgba(0,46,81,0.04); border: 1px solid rgba(0,46,81,0.05);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
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

        /* Sede Card */
        .hq-section { padding: 40px 24px 120px; background: #fff; }
        .hq-inner { 
          max-width: 1100px; margin: 0 auto; 
          background: #FAF8F5; border-radius: 40px; 
          padding: 32px; 
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px; 
          align-items: center;
          box-shadow: 0 20px 60px rgba(0,46,81,0.04); 
        }
        .hq-image-box { 
          border-radius: 32px; overflow: hidden; height: 100%; min-height: 450px; 
          position: relative;
        }
        .hq-image-box img { 
          width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;
          transition: transform 0.8s ease;
        }
        .hq-inner:hover .hq-image-box img { transform: scale(1.05); }
        .hq-content { padding: 20px; text-align: left; }
        .hq-icon { 
          width: 72px; height: 72px; border-radius: 20px; 
          background: #fff; color: var(--magenta); 
          display: flex; align-items: center; justify-content: center; 
          margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .hq-title { font-family: var(--font-display); font-size: clamp(2.5rem, 4vw, 3.5rem); margin-bottom: 24px; font-weight: 300; color: var(--blue); line-height: 1.1; }
        .hq-desc { font-size: 1.25rem; color: #555; margin-bottom: 40px; line-height: 1.6; }
        
        .hq-btn { 
          display: inline-flex; align-items: center; gap: 12px; padding: 18px 36px; 
          background: #E4007C; color: #fff; border-radius: 100px; 
          font-weight: 600; text-decoration: none; transition: transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease; 
          font-size: 1.05rem; 
        }
        .hq-btn:hover { 
          transform: translateY(-4px); box-shadow: 0 15px 30px rgba(0,46,81,0.15); 
          background: #002E51; 
        }

        @media (max-width: 900px) {
          .hq-inner { grid-template-columns: 1fr; padding: 24px; gap: 24px; }
          .hq-image-box { min-height: 300px; border-radius: 24px; }
          .hq-content { padding: 12px 0; text-align: center; }
          .hq-icon { margin: 0 auto 24px; }
        }
      `}</style>

      {/* Grid */}
      <section className="c-grid-section">
        <div className="c-grid">

          {/* Francisco Solorio */}
          <Reveal delay={100} className="c-card">
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
          </Reveal>

          {/* Luis García */}
          <Reveal delay={200} className="c-card">
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
          </Reveal>

        </div>
      </section>

      {/* Sede */}
      <section className="hq-section" id="sede">
        <Reveal className="hq-inner">
          <div className="hq-image-box">
            <img src="https://images.pexels.com/photos/935474/toronto-beauty-clouds-skyline-935474.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" alt="Toronto Skyline" />
          </div>
          <div className="hq-content">
            <div className="hq-icon"><MapPin size={32} /></div>
            <h2 className="hq-title">Sede Oficial 2027</h2>
            <p className="hq-desc">
              <strong>Metro Toronto Convention Centre.</strong><br />
              El evento binacional más importante del año en el corazón financiero de Toronto.
            </p>
            <a href="https://www.mtccc.com/" className="hq-btn" target="_blank" rel="noopener noreferrer">
              <span>Visitar sitio de la sede</span>
              <Globe size={20} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Formulario Jotform */}
      <section style={{ padding: '80px 24px 120px', background: '#FAF8F5' }}>
        <Reveal>
          <div style={{ background: '#fff', padding: '60px 40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,25,76,0.04)', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>
              Formulario de Contacto
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
              Completa el siguiente formulario oficial de registro para enviarnos tus dudas, propuestas o comentarios.
            </p>
            
            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', background: '#FAF8F5' }}>
              <iframe
                id="JotFormIFrame-Contacto"
                title="Formulario de Contacto"
                src="https://form.jotform.com/241686259021053"
                frameBorder="0"
                style={{ width: '100%', height: '700px', border: 'none' }}
                scrolling="yes"
                allowFullScreen={true}
              />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
