"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Award, Target, Globe, Users, ArrowRight } from 'lucide-react';
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

const INDUSTRIES = [
  { name: "Alimentos Procesados", icon: "🍏", desc: "Innovación y tradición en productos gourmet y alimentos procesados con alto valor de exportación." },
  { name: "Tecnología", icon: "💻", desc: "Desarrollo de software, consultoría tecnológica y startups disruptivas lideradas por mujeres." },
  { name: "Educación", icon: "🎓", desc: "Programas educativos, e-learning y formación ejecutiva para las nuevas generaciones globales." },
  { name: "Energía", icon: "⚡", desc: "Soluciones de energía limpia, eficiencia energética y proyectos de sustentabilidad." },
  { name: "Transporte y Logística", icon: "📦", desc: "Soluciones de distribución, aduanas e integración de la cadena de suministro binacional." },
  { name: "Turismo", icon: "✈️", desc: "Destinos de clase mundial, turismo cultural y experiencias de viaje personalizadas." },
  { name: "Restaurantes y Gastronomía", icon: "🍳", desc: "Cocina mexicana de autor y establecimientos que elevan nuestra gastronomía en el mundo." },
  { name: "Textiles y Moda", icon: "👗", desc: "Diseños de alta costura, moda ética y textiles con raíces tradicionales y visión de vanguardia." },
  { name: "Arte y Cultura", icon: "🎨", desc: "Galerías, exposiciones, artesanía contemporánea y proyectos de industrias creativas." },
  { name: "Bienes Raíces", icon: "🏢", desc: "Desarrollo inmobiliario, inversiones seguras y asesoría de propiedades en México y Canadá." },
  { name: "Salud y Belleza", icon: "🧴", desc: "Cosmética natural, servicios de bienestar integral y clínicas especializadas." },
  { name: "Artesanías", icon: "🏺", desc: "Piezas únicas de arte popular que preservan el patrimonio cultural mexicano." }
];

export default function ExpoPage() {
  return (
    <div className="expo-page" style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* SECCIÓN 1: ¿Qué es Expo México Mujer? */}
      <section id="que-es" style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 4% 80px' }}>
        <Reveal>
          <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
            Identidad y Propósito
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '40px' }}>
            ¿Qué es Expo México Mujer?
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginTop: '40px' }}>
          <Reveal delay={100}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px' }}>
              Presentación del Evento
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text)' }}>
              Expo México Mujer es la plataforma binacional que transforma el liderazgo mexicano en oportunidades concretas de negocio, cultura y desarrollo en Canadá. Un punto de encuentro clave para empresarias, inversionistas y aliadas estratégicas dedicadas a expandir sus fronteras profesionales.
            </p>
          </Reveal>
          
          <Reveal delay={200}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px' }}>
              Impacto México–Canadá
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text)' }}>
              Promovemos la integración comercial y el intercambio cultural de una forma única. A través de dinámicas B2B, networking internacional y exposiciones de alto nivel, tendemos puentes sólidos que potencian el éxito y la colaboración mutua entre ambas naciones.
            </p>
          </Reveal>
        </div>

        {/* Misión y Visión */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '80px' }}>
          <Reveal delay={300}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--magenta)', marginBottom: '20px' }}><Target size={40} /></div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Misión</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                Empoderar a la mujer empresaria y profesional de origen mexicano facilitando su inserción e impacto en los mercados internacionales, especialmente en Canadá.
              </p>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--cyan)', marginBottom: '20px' }}><Globe size={40} /></div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Visión</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                Ser la plataforma líder de vinculación empresarial y cultural para mujeres hispanas en Norteamérica, reconocida por su excelencia y resultados económicos tangibles.
              </p>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', height: '100%' }}>
              <div style={{ color: 'var(--navy)', marginBottom: '20px' }}><Award size={40} /></div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Objetivos</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)' }}>
                Generar alianzas comerciales sostenibles, brindar herramientas de capacitación global y proyectar el talento y la identidad mexicana con el más alto nivel de prestigio.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Equipo Directivo */}
        <div id="equipo-directivo" style={{ marginTop: '120px' }}>
          <Reveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '48px' }}>
              Equipo Directivo
            </h3>
          </Reveal>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
            <Reveal delay={100} style={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <div style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', textAlign: 'center', padding: '40px 24px' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#eaeaea', margin: '0 auto 24px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Francisco Solorio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 8px 0' }}>Francisco Solorio</h4>
                <p style={{ color: 'var(--magenta)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 0' }}>Director General</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}>
                  Líder binacional con más de 15 años de experiencia en relaciones comerciales, alianzas de inversión y desarrollo de proyectos comerciales entre México y Canadá.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} style={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <div style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,46,81,0.03)', textAlign: 'center', padding: '40px 24px' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#eaeaea', margin: '0 auto 24px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" alt="Luis García" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 8px 0' }}>Luis García</h4>
                <p style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 0' }}>Director de Logística y Operaciones</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}>
                  Especialista en cadena de suministro global y logística internacional, encargado del transporte, coordinación de aduanas y montajes premium para expositores.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: Industrias */}
      <section id="industrias" style={{ background: 'var(--navy)', color: '#fff', padding: '120px 4%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--cyan)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              Pabellones y Sectores
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              Industrias Participantes
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '64px' }}>
              Nuestra plataforma agrupa una gran diversidad de sectores productivos liderados por mujeres que marcan la pauta comercial.
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={i} delay={i * 50}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '32px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', height: '100%', transition: 'all 0.3s' }}
                     onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                     onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{ind.icon}</div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>{ind.name}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{ind.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Ediciones Anteriores - Ottawa 2026 */}
      <section id="ediciones-anteriores" style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 4% 40px' }}>
        <Reveal>
          <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
            Nuestra Trayectoria
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
            Ediciones Anteriores
          </h2>
          <h3 id="ottawa-2026" style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '40px' }}>
            Expo México Mujer Ottawa 2026
          </h3>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <Reveal>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '24px' }}>
              Nuestra exitosa edición en la capital canadiense sentó un precedente histórico. En 2026 reunimos a más de 80 expositoras destacadas en una gran feria comercial y foro de negocios que impactó directamente a la comunidad de Ontario y Quebec.
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem', color: 'var(--text)', listStyleType: 'circle' }}>
              <li><strong>Historia de la edición:</strong> Tres días intensos de foros políticos, comerciales y sociales en el corazón de Ottawa.</li>
              <li><strong>Participantes e impulsoras:</strong> Amplia asistencia gubernamental, cámaras de comercio binacionales y empresarias consolidadas.</li>
              <li><strong>Aliados estratégicos:</strong> Respaldados por la Embajada de México en Canadá, COMCE y organismos comerciales de Ontario.</li>
              <li><strong>Resultados e impacto:</strong> Más de $1.2 millones de dólares en intenciones de compra a mediano y largo plazo.</li>
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ background: '#eaeaea', borderRadius: '24px', overflow: 'hidden', height: '350px', position: 'relative', boxShadow: '0 20px 40px rgba(0,46,81,0.06)' }}>
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800" alt="Galería Ottawa 2026" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Galería Fotográfica & Videos</span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, margin: '4px 0 0 0', color: 'var(--navy)' }}>Revive los mejores momentos de Ottawa</h4>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
