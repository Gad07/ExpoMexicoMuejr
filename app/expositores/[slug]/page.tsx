"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockExhibitors, industries } from '../../data/expositores';
import { MapPin, ExternalLink, Mail, ChevronLeft, ArrowRight, Quote } from 'lucide-react';
import { Mariposa } from '../../../components/BrandAssets';

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

export default function ExhibitorProfile({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const exhibitor = mockExhibitors.find(ex => ex.slug === resolvedParams.slug);

  if (!exhibitor) {
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{ display: 'inline-block', padding: '6px 16px', border: '1px solid var(--magenta)', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.75rem', borderRadius: '100px' }}>
                {exhibitor.category}
              </span>
            </div>
            
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 7vw, 7rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', margin: '0 0 40px 0', color: 'var(--navy)' }}>
              {exhibitor.name}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ position: 'relative', paddingLeft: '40px', marginBottom: '48px' }}>
              <Quote size={80} color="var(--magenta)" style={{ position: 'absolute', left: '-20px', top: '-30px', opacity: 0.1, zIndex: -1 }} />
              <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: 'var(--navy)', fontWeight: 500, maxWidth: '600px', margin: '0 0 16px 0', fontStyle: 'italic' }}>
                "{exhibitor.bio}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '30px', height: '2px', background: 'var(--cyan)' }}></div>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {exhibitor.personName}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <a href={`https://${exhibitor.website}`} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'var(--magenta)', color: '#fff', padding: '16px 40px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 15px 30px rgba(228,0,124,0.3)', transition: 'transform 0.3s, box-shadow 0.3s' }}>
                Visitar sitio <ArrowRight size={20} />
              </a>
              <a href={`mailto:${exhibitor.contact}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', border: '2px solid rgba(0,25,76,0.1)', color: 'var(--navy)', padding: '16px 40px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'background 0.3s, color 0.3s' }}>
                <Mail size={20} /> Contactar
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: Framed Person Photo */}
        <div style={{ flex: '1 1 400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10% 5%', minHeight: '60vh' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '3/4', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,25,76,0.15)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--navy)', animation: 'slideRight 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards', zIndex: 2 }}></div>
            <img 
              src={exhibitor.personPhoto} 
              alt={exhibitor.personName} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', animation: 'scaleDown 2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }} 
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
              <img src={exhibitor.logo} alt={exhibitor.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <div style={{ marginTop: '40px', display: 'inline-flex', alignItems: 'center', gap: '12px', color: 'var(--navy)', fontWeight: 800, fontSize: '1.2rem', padding: '16px 32px', background: 'rgba(0,186,211,0.1)', borderRadius: '100px' }}>
              <MapPin size={24} color="var(--cyan)" /> Ubicación: {exhibitor.booth}
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, marginBottom: '32px', color: 'var(--navy)' }}>
              Acerca de {exhibitor.name}
            </h2>
            <div style={{ width: '60px', height: '4px', background: 'var(--magenta)', marginBottom: '32px' }}></div>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.9, color: 'var(--text)', fontWeight: 400, letterSpacing: '0.01em' }}>
              {exhibitor.description}
            </p>
          </Reveal>

        </div>
      </div>

      {/* EDITORIAL GALLERY */}
      <div style={{ padding: '120px 8% 160px', background: 'var(--navy)', color: '#fff' }}>
        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ display: 'block', color: 'var(--cyan)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '16px' }}>
              Portafolio
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, margin: 0 }}>
              Galería Comercial
            </h2>
          </div>
        </Reveal>
        
        {/* Masonry Editorial Gallery */}
        <div style={{ columnCount: 3, columnGap: '20px', maxWidth: '1600px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px' }}>
          {exhibitor.gallery.map((img, idx) => (
            <Reveal key={idx} delay={200 + (idx * 50)} style={{ breakInside: 'avoid', marginBottom: '20px', overflow: 'hidden', position: 'relative', borderRadius: '8px' }}>
              <img 
                src={img} 
                alt={`${exhibitor.name} gallery ${idx}`} 
                style={{ width: '100%', display: 'block', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s' }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.filter = 'brightness(1.1)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              />
            </Reveal>
          ))}
        </div>
      </div>

    </div>
  );
}
