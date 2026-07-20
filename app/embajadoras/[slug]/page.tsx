"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Mariposa } from '@/components/BrandAssets';
import { useLanguage } from '@/context/LanguageContext';

function Reveal({
  children, delay = 0, style = {}, className = ''
}: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }}>
      {children}
    </div>
  );
}

function AmbassadorDescription({ ambassador }: { ambassador: any }) {
  const { language } = useLanguage();
  const desc = ambassador.description
    ? (ambassador.description[language] || ambassador.description.es || ambassador.description || '')
    : '';
  return <p>{desc}</p>;
}

export default function EmbajadoraProfile({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const [ambassador, setAmbassador] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/embajadoras')
      .then(res => res.json())
      .then(data => {
        if (data.ambassadors) {
          const found = data.ambassadors.find((a: any) => a.slug === resolvedParams.slug);
          setAmbassador(found || null);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', background: '#FAF8F5', fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px', height: '48px', border: '3px solid #E4007C',
            borderTopColor: 'transparent', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ color: '#002E51', fontWeight: 600 }}>Cargando embajadora...</div>
        </div>
      </div>
    );
  }

  if (!ambassador) notFound();

  return (
    <div className="amb-arch-page">
      <style dangerouslySetInnerHTML={{ __html: `
        .amb-arch-page {
          background: #FCF9F6; /* Un color crema muy cálido y lujoso */
          min-height: 100vh;
          color: var(--navy);
          position: relative;
          overflow: hidden;
        }

        /* ─── LÍNEAS DE DECORACIÓN MINIMALISTA ─── */
        .amb-line-h {
          position: absolute; top: 120px; left: 0; right: 0;
          height: 1px; background: rgba(0,46,81,0.06);
        }
        .amb-line-v {
          position: absolute; top: 0; bottom: 0; left: 8%;
          width: 1px; background: rgba(0,46,81,0.06);
        }

        .amb-wrapper {
          max-width: 1400px; margin: 0 auto;
          padding: 160px 4% 100px;
          display: flex; gap: 8vw;
          position: relative; z-index: 10;
        }

        /* ─── FOTO CON FORMA DE ARCO (Izquierda) ─── */
        .amb-left {
          flex: 0 0 420px;
        }
        .amb-sticky-container {
          position: sticky; top: 140px;
        }

        .amb-arch-photo {
          width: 100%;
          aspect-ratio: 3/4.5;
          object-fit: cover;
          /* Aquí está el arco superior */
          border-radius: 300px 300px 24px 24px;
          box-shadow: 0 40px 80px rgba(0, 25, 76, 0.08);
          border: 1px solid rgba(0,0,0,0.03);
          transform: scale(0.95);
          opacity: 0;
          animation: archReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes archReveal {
          to { transform: scale(1); opacity: 1; }
        }

        .amb-watermark-icon {
          position: absolute; bottom: -30px; left: -30px;
          opacity: 0.05; pointer-events: none;
        }

        /* ─── CONTENIDO (Derecha) ─── */
        .amb-right {
          flex: 1;
          padding-top: 40px;
        }

        .amb-back {
          display: inline-flex; align-items: center; gap: 8px;
          color: var(--text-muted); font-family: var(--font-display);
          font-weight: 700; font-size: 0.75rem; text-transform: uppercase;
          letter-spacing: 0.2em; text-decoration: none;
          margin-bottom: 60px; transition: color 0.3s;
        }
        .amb-back:hover { color: var(--magenta); }

        .amb-subtitle {
          font-family: var(--font-display);
          font-weight: 800; font-size: 0.8rem;
          text-transform: uppercase; letter-spacing: 0.3em;
          color: var(--magenta); margin-bottom: 20px;
          display: flex; align-items: center; gap: 16px;
        }
        .amb-subtitle::before {
          content: ''; width: 40px; height: 1px; background: var(--magenta);
        }

        .amb-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 6rem);
          font-weight: 900; line-height: 0.95; letter-spacing: -0.04em;
          color: var(--navy); margin: 0 0 40px 0;
        }

        .amb-info-row {
          display: flex; align-items: center; gap: 32px;
          margin-bottom: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(0,46,81,0.08);
        }
        .amb-info-item {
          display: flex; align-items: center; gap: 12px;
        }
        .amb-info-label {
          font-family: var(--font-display); font-weight: 800;
          font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em;
          color: var(--text-muted);
        }
        .amb-info-value {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.1rem; color: var(--navy); text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Primera letra capitular para el texto */
        .amb-desc p {
          font-family: var(--font-body);
          font-size: 1.25rem; line-height: 1.9;
          color: var(--text); font-weight: 400;
          max-width: 700px;
        }
        .amb-desc p::first-letter {
          font-family: var(--font-display);
          float: left; font-size: 4rem; line-height: 0.8;
          padding-right: 12px; padding-top: 4px;
          color: var(--magenta); font-weight: 900;
        }

        @media (max-width: 900px) {
          .amb-wrapper { flex-direction: column; gap: 40px; padding-top: 100px; }
          .amb-left { flex: none; width: 100%; max-width: 420px; margin: 0 auto; }
          .amb-sticky-container { position: relative; top: 0; }
          .amb-right { padding-top: 0; text-align: center; }
          .amb-subtitle::before { display: none; }
          .amb-subtitle { justify-content: center; }
          .amb-info-row { flex-direction: column; gap: 20px; }
          .amb-desc p::first-letter { float: none; font-size: inherit; line-height: inherit; padding: 0; color: inherit; font-family: inherit; font-weight: inherit; }
        }
      `}} />

      <div className="amb-line-h" />
      <div className="amb-line-v" />

      <div className="amb-wrapper">
        
        {/* Columna Izquierda: Foto con Arco */}
        <div className="amb-left">
          <div className="amb-sticky-container">
            <div className="amb-watermark-icon">
              <Mariposa width={200} height={200} />
            </div>
            <img src={ambassador.photo} alt={ambassador.name} className="amb-arch-photo" loading="lazy" width="120" height="120" />
          </div>
        </div>

        {/* Columna Derecha: Contenido Minimalista */}
        <div className="amb-right">
          
          

          <Reveal delay={200}>
            <div className="amb-subtitle">Embajadora Oficial</div>
            <h1 className="amb-title">{ambassador.name}</h1>
          </Reveal>

          <Reveal delay={300}>
            <div className="amb-info-row">
              <div className="amb-info-item">
                <MapPin color="var(--magenta)" size={24} />
                <div>
                  <div className="amb-info-label">Estado</div>
                  <div className="amb-info-value">{ambassador.state}</div>
                </div>
              </div>
              <div className="amb-info-item">
                <div style={{ width: '1px', height: '40px', background: 'rgba(0,46,81,0.1)', marginRight: '16px' }} />
                <div>
                  <div className="amb-info-label">Ubicación</div>
                  <div className="amb-info-value">{ambassador.booth}</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="amb-desc">
              <AmbassadorDescription ambassador={ambassador} />
            </div>
          </Reveal>
          
        </div>
      </div>
    </div>
  );
}
