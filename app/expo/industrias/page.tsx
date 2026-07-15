"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, Box, Check,
  Apple, Cpu, GraduationCap, Zap, Truck, Compass, ChefHat, Shirt, Palette, Building, Heart, Paintbrush 
} from 'lucide-react';
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
  { 
    name: "Alimentos Procesados", 
    icon: <Apple size={40} color="var(--magenta)" />, 
    desc: "Productos gourmet, salsas artesanales, dulces típicos y alimentos procesados premium con certificaciones y listos para distribución en supermercados canadienses.",
    expositoresQuery: "Gastronómica"
  },
  { 
    name: "Tecnología", 
    icon: <Cpu size={40} color="var(--cyan)" />, 
    desc: "Desarrollo de software a medida, automatización de procesos, consultoría digital y plataformas e-commerce con liderazgo e innovación femenina.",
    expositoresQuery: "Tecnología"
  },
  { 
    name: "Educación", 
    icon: <GraduationCap size={40} color="var(--navy)" />, 
    desc: "EdTech, capacitación empresarial continua, programas de liderazgo ejecutivo y plataformas educativas con metodologías de clase mundial.",
    expositoresQuery: "Educación"
  },
  { 
    name: "Energía", 
    icon: <Zap size={40} color="var(--magenta)" />, 
    desc: "Proyectos e ingenierías sustentables, consultoría en energías limpias, eficiencia ambiental y soluciones verdes para la industria corporativa.",
    expositoresQuery: "Energía"
  },
  { 
    name: "Transporte y Logística", 
    icon: <Truck size={40} color="var(--cyan)" />, 
    desc: "Servicios de cadena de suministro internacional, aduanas estructuradas, fletes consolidados y gestoría operativa para exportaciones México-Canadá.",
    expositoresQuery: "Transporte y Logística"
  },
  { 
    name: "Turismo", 
    icon: <Compass size={40} color="var(--navy)" />, 
    desc: "Destinos de lujo, agencias de viaje con experiencias a la medida, promoción turística y hospitalidad con la calidez representativa de México.",
    expositoresQuery: "Turismo"
  },
  { 
    name: "Restaurantes y Gastronomía", 
    icon: <ChefHat size={40} color="var(--magenta)" />, 
    desc: "Proyectos culinarios de autor, chefs delegadas, banquetes corporativos e ingredientes tradicionales que conquistan paladares extranjeros.",
    expositoresQuery: "Gastronomía"
  },
  { 
    name: "Textiles y Moda", 
    icon: <Shirt size={40} color="var(--cyan)" />, 
    desc: "Líneas de alta costura, joyería fina de autor, bolsos de diseño independiente y prendas sustentables con identidad única y vanguardista.",
    expositoresQuery: "Moda y Textiles"
  },
  { 
    name: "Arte y Cultura", 
    icon: <Palette size={40} color="var(--navy)" />, 
    desc: "Galerías y exposiciones de arte contemporáneo, curadurías binacionales, pintura, escultura y fomento a las industrias creativas.",
    expositoresQuery: "Arte y Cultura"
  },
  { 
    name: "Bienes Raíces", 
    icon: <Building size={40} color="var(--magenta)" />, 
    desc: "Asesoría patrimonial, desarrollos inmobiliarios sustentables, gestión de propiedades y oportunidades de inversión inmobiliaria binacional.",
    expositoresQuery: "Bienes Raíces"
  },
  { 
    name: "Salud y Belleza", 
    icon: <Heart size={40} color="var(--cyan)" />, 
    desc: "Líneas de cosmética limpia y orgánica, spas de bienestar integral, fitomedicina y productos de cuidado personal con ingredientes naturales.",
    expositoresQuery: "Salud y Belleza"
  },
  { 
    name: "Artesanías", 
    icon: <Paintbrush size={40} color="var(--navy)" />, 
    desc: "Arte popular mexicano en barro, cobre martillado, textiles tejidos en telares ancestrales y piezas artesanales con denominación de origen.",
    expositoresQuery: "Artesanías"
  }
];

export default function IndustriasPage() {
  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* Intro */}
        <div style={{ marginBottom: '80px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px', lineHeight: 1.1 }}>
                Sectores que impulsan el desarrollo binacional
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text)', marginBottom: 0 }}>
                La delegación empresarial de Expo México Mujer Toronto 2027 abarca 12 industrias clave. Cada pabellón está organizado estratégicamente para facilitar el flujo de compradores canadienses e inversionistas norteamericanos interesados en expandir sus redes de proveedores y socios comerciales.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: '32px', padding: '48px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--cyan)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>Ventajas de Participación</span>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--cyan)' }}><Check size={18} /></span> Ruedas de negocios B2B personalizadas.
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--cyan)' }}><Check size={18} /></span> Espacio de exhibición comercial en la sede central de Toronto.
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--cyan)' }}><Check size={18} /></span> Vinculación directa con dependencias aduanales y logísticas.
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 12 Industries Grid */}
        <div id="sectores" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Sectores & Industrias Participantes
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
            {INDUSTRIES.map((ind, idx) => (
              <Reveal key={ind.name} delay={idx * 50}>
                <div style={{ 
                  background: '#fff', 
                  borderRadius: '24px', 
                  padding: '40px 32px', 
                  boxShadow: '0 10px 30px rgba(0,25,76,0.03)', 
                  height: '100%', 
                  border: '1px solid rgba(0,0,0,0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,25,76,0.07)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,25,76,0.03)';
                }}>
                  <div style={{ marginBottom: '24px', display: 'inline-block' }}>{ind.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', lineHeight: 1.2 }}>{ind.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '28px', flexGrow: 1 }}>{ind.desc}</p>
                  
                  <Link 
                    href={`/expositores?categoria=${encodeURIComponent(ind.expositoresQuery)}`} 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontSize: '0.8rem', 
                      fontWeight: 800, 
                      color: 'var(--cyan)', 
                      textDecoration: 'none', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em' 
                    }}
                  >
                    Ver expositores <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
