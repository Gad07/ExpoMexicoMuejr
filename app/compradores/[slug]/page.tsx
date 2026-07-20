"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Medal, ExternalLink, Mail, ArrowRight, Quote } from 'lucide-react';
import { Mariposa } from '@/components/BrandAssets';
import { useLanguage } from '@/context/LanguageContext';

function Reveal({
  children, className = '', delay = 0, style = {}
}: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
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

export default function BuyerProfile({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const [buyer, setBuyer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    fetch('/api/admin/compradores')
      .then(res => res.json())
      .then(data => {
        if (data.compradores) {
          const found = data.compradores.find((ex: any) => ex.slug === resolvedParams.slug);
          setBuyer(found || null);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#FAF8F5',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #E4007C',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ color: '#002E51', fontWeight: 600 }}>Cargando comprador...</div>
        </div>
      </div>
    );
  }

  if (!buyer) {
    notFound();
  }

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* EDITORIAL HERO (SPLIT SCREEN) */}
      <div style={{ display: 'flex', minHeight: '100vh', flexWrap: 'wrap', position: 'relative' }}>
        
        {/* Left: Typography & Bio */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '160px 8% 10%', position: 'relative', zIndex: 10 }}>
          
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', opacity: 0.03, pointerEvents: 'none' }}>
            <Mariposa width={500} height={500} />
          </div>

          <Reveal delay={100}>
            <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              Comprador Corporativo
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', margin: '0 0 40px 0', color: 'var(--navy)' }}>
              {buyer.company}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ position: 'relative', paddingLeft: '40px', marginBottom: '48px' }}>
              <Quote size={80} color="var(--magenta)" style={{ position: 'absolute', left: '-20px', top: '-30px', opacity: 0.1, zIndex: -1 }} />
              <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: 'var(--navy)', fontWeight: 500, maxWidth: '600px', margin: '0 0 16px 0', fontStyle: 'italic' }}>
                "{buyer.bio && (buyer.bio[language] || buyer.bio.es || buyer.bio)}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '30px', height: '2px', background: 'var(--cyan)' }}></div>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {buyer.name} — {buyer.role && (buyer.role[language] || buyer.role.es || buyer.role)}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <a href={`https://${buyer.website}`} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'var(--magenta)', color: '#fff', padding: '16px 40px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 15px 30px rgba(228,0,124,0.3)', transition: 'transform 0.3s, box-shadow 0.3s' }}>
                Sitio Web corporativo <ArrowRight size={20} />
              </a>
              <a href={`mailto:${buyer.contact}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', border: '2px solid rgba(0,25,76,0.1)', color: 'var(--navy)', padding: '16px 40px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'background 0.3s, color 0.3s' }}>
                <Mail size={20} /> Solicitar Cita B2B
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: Framed Representative Photo */}
        <div style={{ flex: '1 1 400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10% 5%', minHeight: '60vh' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '3/4', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,25,76,0.15)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--navy)', animation: 'slideRight 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards', zIndex: 2 }}></div>
            <img 
              src={buyer.photo} 
              alt={buyer.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', animation: 'scaleDown 2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }} 
              loading="lazy" width="120" height="120"
            />
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes slideRight {
              0% { transform: translateX(0); }
              100% { transform: translateX(100%); }
            }
            @keyframes scaleDown {
              0% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          `}} />
        </div>
      </div>

      {/* EDITORIAL BUSINESS DETAILS */}
      <div style={{ padding: '140px 8%', background: '#fff', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
          
          <Reveal delay={100} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '300px', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', borderRadius: '50%', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <img src={buyer.photo} alt={buyer.company} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} loading="lazy" width="120" height="120" />
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, marginBottom: '32px', color: 'var(--navy)' }}>
              Perfil de Adquisición
            </h2>
            <div style={{ width: '60px', height: '4px', background: 'var(--magenta)', marginBottom: '32px' }}></div>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.9, color: 'var(--text)', fontWeight: 400, letterSpacing: '0.01em', marginBottom: '24px' }}>
              {buyer.description && (buyer.description[language] || buyer.description.es || buyer.description)}
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy)', fontSize: '0.85rem' }}>Sector Prioritario:</span>
              <span style={{ padding: '6px 16px', background: buyer.bgColor, color: buyer.color, borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                {buyer.interest && (buyer.interest[language] || buyer.interest.es || buyer.interest)}
              </span>
            </div>
          </Reveal>

        </div>
      </div>

      {/* EDITORIAL GALLERY */}
      {buyer.gallery && buyer.gallery.length > 0 && (
        <div style={{ padding: '120px 8% 160px', background: 'var(--navy)', color: '#fff' }}>
          <Reveal delay={100}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <span style={{ display: 'block', color: 'var(--cyan)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '16px' }}>
                Operaciones
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, margin: 0 }}>
                Logística & Distribución
              </h2>
            </div>
          </Reveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
            {buyer.gallery.map((img: string, i: number) => (
              <Reveal key={img} delay={150 + i * 50}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width="600" height="400" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
