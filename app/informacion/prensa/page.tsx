"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Newspaper, Download, Play, BookOpen, Image as ImageIcon } from 'lucide-react';
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

const mockPressReleases = [
  {
    date: "10 de Junio, 2026",
    title: "Expo México Mujer anuncia oficialmente su próxima sede en Toronto para el 2027",
    category: "Comunicado Oficial",
    desc: "Tras el contundente impacto de Ottawa, la directiva confirma la alianza con la Cámara de Comercio de Ontario para el montaje comercial de 2027."
  },
  {
    date: "28 de Mayo, 2026",
    title: "Inauguración estelar de la Expo México Mujer en el Ottawa Convention Centre",
    category: "Comunicado de Prensa",
    desc: "Con presencia consular y delegadas empresariales de todo México, se inaugura formalmente el evento binacional más relevante del año."
  }
];

const mockInterviews = [
  {
    person: "Francisco Solorio",
    role: "Director General EMM",
    media: "Canadá Business Daily",
    quote: "La vinculación binacional es más que tratados; se trata de tender puentes directos y reales entre marcas mexicanas y canales de retail en Canadá."
  },
  {
    person: "María López",
    role: "Fundadora de Mujeres en STEM",
    media: "Televisión Consular",
    quote: "Llevar software y talento tecnológico en manos de mexicanas a corporativos canadienses rompe paradigmas en la industria norteamericana."
  }
];

export default function PrensaPage() {
  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* 1. Sala de Prensa & Comunicados */}
        <h1 className="sr-only">Prensa</h1>
        <div id="comunicados" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Comunicados Oficiales
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {mockPressReleases.map((press, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{press.category}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{press.date}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', lineHeight: 1.25 }}>{press.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px', flexGrow: 1 }}>{press.desc}</p>
                  <Link href="/recursos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.05em' }}>
                    Leer más <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 2. Entrevistas */}
        <div id="entrevistas" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Entrevistas Destacadas
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {mockInterviews.map((interview, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)' }}>
                  <div style={{ color: 'var(--magenta)', marginBottom: '20px' }}><BookOpen size={32} /></div>
                  <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.6, color: 'var(--navy)', marginBottom: '24px', fontWeight: 500 }}>
                    "{interview.quote}"
                  </p>
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 2px 0' }}>{interview.person}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--cyan)', fontWeight: 700, textTransform: 'uppercase' }}>{interview.role} — {interview.media}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 3. Galería Multimedia & Kit */}
        <div id="galeria" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px' }}>
                Kit de Prensa & Galería Multimedia
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '32px' }}>
                Ponemos a disposición de medios de comunicación, periodistas e instituciones el kit oficial de prensa que incluye logotipos en alta resolución, perfiles biográficos del equipo directivo y fotografías autorizadas del evento Ottawa 2026.
              </p>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'var(--cyan)', color: '#fff', padding: '16px 36px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 15px 30px rgba(0,186,211,0.25)' }}>
                Descargar Kit de Prensa <Download size={18} />
              </a>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', borderRadius: '32px', overflow: 'hidden', height: '350px', position: 'relative', boxShadow: '0 20px 40px rgba(0,25,76,0.05)' }}>
                <img src="/Galeria/Ponencias/IMG_5169.JPG" alt="Prensa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width="600" height="400" />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(255,255,255,0.92)', padding: '20px', borderRadius: '16px', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase' }}>Carpeta Fotográfica</span>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, margin: '4px 0 0 0', color: 'var(--navy)' }}>Imágenes de Ottawa 2026</h4>
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--magenta)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <ImageIcon size={18} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </div>
  );
}

function ArrowRight({ size, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 16} 
      height={size || 16} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={style}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
