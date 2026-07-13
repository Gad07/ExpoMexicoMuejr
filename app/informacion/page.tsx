"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Newspaper, ClipboardList, Ship, Plane, PhoneCall, ChevronDown, Download, HelpCircle, Mail, Globe } from 'lucide-react';

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

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(0,46,81,0.08)', padding: '16px 0' }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', cursor: 'pointer', outline: 'none' }}
      >
        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)' }}>{title}</span>
        <ChevronDown size={18} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', color: 'var(--magenta)' }} />
      </button>
      <div style={{ 
        maxHeight: open ? '500px' : '0', 
        overflow: 'hidden', 
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: open ? 1 : 0,
        paddingTop: open ? '12px' : '0'
      }}>
        <div style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function InformacionPage() {
  return (
    <div className="informacion-page" style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* SECCIÓN 1: Prensa */}
      <section id="prensa" style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 4% 80px' }}>
        <Reveal>
          <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
            Sala de Redacción
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '40px' }}>
            Prensa y Comunicación
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <Reveal delay={100}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)' }}>
              <Newspaper size={36} color="var(--magenta)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>Noticias y Sala de Prensa</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '24px' }}>
                Encuentra los últimos comunicados de prensa oficiales, coberturas mediáticas binacionales y entrevistas con las directoras y líderes invitadas de esta edición.
              </p>
              <a href="/recursos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Ir al Centro de Noticias →
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)' }}>
              <Download size={36} color="var(--cyan)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>Galería Multimedia & Kit</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '24px' }}>
                Descarga logotipos oficiales de EMM, material fotográfico de alta resolución de la edición Ottawa 2026 y carpetas de información corporativa oficiales.
              </p>
              <a href="#descargas" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--magenta)', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Descargar Kit de Prensa →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECCIÓN 2: Participantes */}
      <section id="participantes" style={{ background: 'var(--navy)', color: '#fff', padding: '120px 4%' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--cyan)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              Guía del Expositor
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '48px' }}>
              Información para Participantes
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '64px' }}>
            <Reveal delay={100}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <ClipboardList size={24} color="var(--cyan)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Manual del Expositor</h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Descarga el documento con el reglamento técnico, horarios de montaje y desmontaje, requerimientos de electricidad y proveedores recomendados.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <HelpCircle size={24} color="var(--cyan)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Requisitos Técnicos</h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Formatos requeridos para logotipos, pólizas de seguros de stands temporales obligatorias y lineamientos de seguridad contra incendios.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '24px' }}>Preguntas Frecuentes</h3>
              
              <div style={{ color: '#fff' }}>
                <Accordion title="¿Qué incluye la reservación de un Stand?">
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>Incluye la estructura divisoria modular, rótulo en fachada, conexión eléctrica básica de 110v, inclusión en el directorio dinámico y dos accesos completos VIP para expositoras.</p>
                </Accordion>
                <Accordion title="¿Cuáles son las fechas de montaje oficiales en Toronto?">
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>El montaje de pabellones se realizará el 8 de junio de 2027 de 8:00 AM a 8:00 PM. El desmontaje se efectuará inmediatamente al cerrar el evento el 13 de junio por la noche.</p>
                </Accordion>
                <Accordion title="¿El evento cuenta con traducción simultánea?">
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>Sí, las ponencias del Women Leaders Forum y el Business Summit contarán con traducción simultánea español-inglés mediante auriculares inalámbricos en la sala principal.</p>
                </Accordion>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECCIÓN 3: Logística y Exportación */}
      <section id="logistica" style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 4% 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              Cadena de Suministro
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              Logística Internacional y Exportación
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '20px' }}>
              Sabemos que el transporte físico de mercancías y muestras puede ser complejo. Por eso, contamos con convenios logísticos y agentes aduanales especializados para facilitar el tránsito seguro de tus productos.
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem', color: 'var(--text)', listStyleType: 'circle' }}>
              <li><strong>Exportación temporal y definitiva:</strong> Asesoría para internar muestras sin aranceles de importación (bajo regímenes especiales temporales).</li>
              <li><strong>Asesoría aduanal:</strong> Revisión de etiquetado, restricciones fitosanitarias de alimentos y regulaciones técnicas canadienses.</li>
              <li><strong>Soluciones de transporte consolidado:</strong> Logística marítima, aérea y terrestre coordinada directamente con nuestras bodegas en Toronto.</li>
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#eaeaea', borderRadius: '24px', overflow: 'hidden', height: '350px', position: 'relative', boxShadow: '0 20px 40px rgba(0,46,81,0.06)' }}>
              <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800" alt="Logística y Carga" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECCIÓN 4: Servicios al Viajero */}
      <section id="viajero" style={{ background: '#fff', padding: '120px 4%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ display: 'inline-block', color: 'var(--cyan)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              Tu Estancia en Toronto
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1 }}>
              Servicios al Viajero
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <Reveal delay={100}>
              <div style={{ background: 'var(--cream)', padding: '40px', borderRadius: '24px', height: '100%' }}>
                <Plane size={36} color="var(--cyan)" style={{ marginBottom: '20px' }} />
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>Hospedaje & Hoteles</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)' }}>
                  Contamos con tarifas de descuento corporativas con hoteles sede ubicados a pocos pasos del centro de convenciones. Reserva con anticipación usando el código EMM2027.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: 'var(--cream)', padding: '40px', borderRadius: '24px', height: '100%' }}>
                <Globe size={36} color="var(--magenta)" style={{ marginBottom: '20px' }} />
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>Vuelos & Traslados</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)' }}>
                  Aprovecha las tarifas preferenciales y descuentos en vuelos directos a Toronto Pearson (YYZ) con nuestras aerolíneas aliadas para participantes acreditadas.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ background: 'var(--cream)', padding: '40px', borderRadius: '24px', height: '100%' }}>
                <ClipboardList size={36} color="var(--navy)" style={{ marginBottom: '20px' }} />
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>Trámites Migratorios (eTA)</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)' }}>
                  Asegúrate de contar con tu visa de visitante canadiense o tu autorización electrónica de viaje (eTA) vigente. Brindamos asesoría en el proceso de expedición.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: Contacto */}
      <section id="contacto" style={{ maxWidth: '1000px', margin: '0 auto', padding: '120px 4% 0' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
            Atención Inmediata
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1 }}>
            Contacto & Directores
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '64px' }}>
          <Reveal delay={100}>
            <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Francisco Solorio</h4>
              <p style={{ color: 'var(--magenta)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '16px' }}>Director General</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text)' }}>
                <Mail size={16} /> francisco@expomexico.ca
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Luis García</h4>
              <p style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '16px' }}>Director de Logística</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text)' }}>
                <Mail size={16} /> logistica@expomexico.ca
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div style={{ background: '#fff', padding: '48px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,25,76,0.04)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>Formulario de Contacto</h3>
            <form style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <input type="text" placeholder="Nombre" style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'var(--font-body)', outline: 'none' }} />
                <input type="email" placeholder="Correo Electrónico" style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'var(--font-body)', outline: 'none' }} />
              </div>
              <input type="text" placeholder="Asunto" style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'var(--font-body)', outline: 'none' }} />
              <textarea placeholder="Mensaje" rows={5} style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }}></textarea>
              <button type="button" style={{ background: 'var(--navy)', color: '#fff', padding: '18px', borderRadius: '12px', border: 'none', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1.1rem', cursor: 'pointer', transition: 'background 0.3s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'var(--magenta)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'var(--navy)'}>
                Enviar Mensaje
              </button>
            </form>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
