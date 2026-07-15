"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Play, Eye, Users, Landmark, TrendingUp, Calendar } from 'lucide-react';
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

const mockStats = [
  { val: "$1.2M+", label: "Intenciones de Compra (USD)", icon: <TrendingUp size={28} />, desc: "Acuerdos y pedidos comerciales consolidados a mediano plazo." },
  { val: "80+", label: "Expositoras Delegadas", icon: <Users size={28} />, desc: "Empresarias representando a más de 15 estados mexicanos." },
  { val: "1,500+", label: "Visitantes Profesionales", icon: <Eye size={28} />, desc: "Público canadiense, compradores corporativos e inversionistas." },
  { val: "25+", label: "Aliados y Cámaras", icon: <Landmark size={28} />, desc: "Apoyo institucional consular, gubernamental y empresarial." }
];

const mockGallery = [
  { url: "/Galeria/Ponencias/IMG_6323.JPG", cap: "Inauguración Oficial de la Expo Ottawa 2026" },
  { url: "/Galeria/Arte_y_Cultura/IMG_5945.JPG", cap: "Presentación de danza tradicional y folklor nacional" },
  { url: "/Galeria/Artesanias/IMG_5932.JPG", cap: "Pabellón de Artesanías Finas y Arte Popular" },
  { url: "/Galeria/Gastronomia/IMG_5940.JPG", cap: "Degustación gastronómica y cata de tequila artesanal" },
  { url: "/Galeria/Moda_y_textiles/IMG_6036.JPG", cap: "Showroom interactivo de diseño y confección textil" },
  { url: "/Galeria/Otros/IMG_4805.JPG", cap: "Rueda de negocios B2B entre delegadas y compradores" }
];

export default function OttawaPage() {
  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* 1. Historia de la edición */}
        <div style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px', lineHeight: 1.1 }}>
                El gran precedente en la capital canadiense
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text)', marginBottom: '20px' }}>
                La edición de **Expo México Mujer Ottawa 2026** marcó un hito en las relaciones comerciales binacionales independientes. Durante tres días intensivos en el centro neurálgico de la capital de Canadá, consolidamos una plataforma que conectó la herencia, creatividad y capacidad productiva mexicana con redes de distribución norteamericanas.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: 0 }}>
                Esta edición fue respaldada por embajadores, senadores, cámaras de comercio binacionales y cooperativas de empresarias, sentando las bases operativas, logísticas y de mercado para la próxima edición central de Toronto 2027.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 40px rgba(0,25,76,0.04)', border: '1px solid rgba(0,0,0,0.01)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>Detalles de la Edición</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--navy)' }}>Fecha:</span>
                    <span style={{ color: 'var(--text-muted)' }}>Mayo, 2026</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--navy)' }}>Sede:</span>
                    <span style={{ color: 'var(--text-muted)' }}>Convention Centre, Ottawa</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--navy)' }}>Estados particip.:</span>
                    <span style={{ color: 'var(--text-muted)' }}>15 Delegaciones estatales</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, color: 'var(--navy)' }}>Enfoque B2B:</span>
                    <span style={{ color: 'var(--text-muted)' }}>Cadenas globales de valor</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 2. Resultados e Impacto (Dashboard de estadísticas) */}
        <div id="resultados" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Resultados e Impacto Económico
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            {mockStats.map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 80}>
                <div style={{ background: '#fff', padding: '40px 32px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)', textAlign: 'center' }}>
                  <div style={{ color: 'var(--cyan)', display: 'inline-flex', marginBottom: '20px', background: 'rgba(0,186,211,0.06)', padding: '16px', borderRadius: '50%' }}>
                    {stat.icon}
                  </div>
                  <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '8px', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                    {stat.val}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>{stat.label}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{stat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 3. Galería Fotográfica y Videos */}
        <div id="galeria" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Galería Fotográfica
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {mockGallery.map((item, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div style={{ 
                  background: '#fff', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 30px rgba(0,25,76,0.03)', 
                  height: '100%', 
                  border: '1px solid rgba(0,0,0,0.01)' 
                }}>
                  <div style={{ height: '220px', width: '100%', position: 'relative' }}>
                    <img src={item.url} alt={item.cap} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px 30px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{item.cap}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 4. Videos Recopilatorios */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Videos e Intervenciones
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#000', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,25,76,0.12)', aspectRatio: '16/9', position: 'relative' }}>
              <video 
                src="https://www.w3schools.com/html/mov_bbb.mp4" 
                poster="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"
                controls 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              >
                Tu navegador no soporta el formato de video.
              </video>
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  );
}
