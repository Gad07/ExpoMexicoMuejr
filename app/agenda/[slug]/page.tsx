"use client";

import React, { useState, useEffect, useRef, use } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Heart, Users, ArrowLeft, Paintbrush, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Mariposa } from '@/components/BrandAssets';
import { useLanguage } from '@/context/LanguageContext';

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

export default function DynamicAgendaPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { language } = useLanguage();
  const [D, setD] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/agendas?slug=${resolvedParams.slug}`)
      .then(r => r.json())
      .then(data => {
        setD(data.agenda || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#FAF8F5' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid #E4007C', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ color: '#002E51', fontWeight: 600 }}>Cargando agenda...</div>
        </div>
      </div>
    );
  }

  if (!D) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#FAF8F5', color: '#002E51', fontSize: '1.2rem', fontWeight: 600 }}>
        Agenda no encontrada
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '160px 48px 80px' }}>
        
        {/* HERO TITLE */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <Reveal>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 900, color: 'var(--navy)', margin: '0 0 24px 0', lineHeight: 1.1 }}>
              {D.title?.[language] || D.title?.es}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              {D.description?.[language] || D.description?.es}
            </p>
          </Reveal>
        </div>

        {/* 1. Features Grid */}
        {D.features && D.features.length > 0 && (
          <div style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
            <Reveal style={{ marginBottom: '48px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
                {D.featuresTitle?.[language] || D.featuresTitle?.es || 'Participantes'}
              </h2>
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
              {D.features.map((feature: any, idx: number) => (
                <Reveal key={idx} delay={idx * 100}>
                  <Link href={feature.link || '#'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ 
                      background: '#fff', 
                      borderRadius: '24px', 
                      overflow: 'hidden', 
                      boxShadow: '0 15px 35px rgba(0,25,76,0.06)',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      position: 'relative'
                    }}>
                      <div style={{ height: '160px', width: '100%', position: 'relative', background: '#f0f0f0' }}>
                        {feature.cover && <img src={feature.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                      </div>

                      <div style={{ 
                        width: '70px', height: '70px', background: '#fff', borderRadius: '50%', padding: '4px',
                        position: 'absolute', top: '125px', left: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 10,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                      }}>
                        {feature.photo && <img src={feature.photo} alt={feature.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} loading="lazy" />}
                      </div>

                      <div style={{ padding: '56px 24px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px', lineHeight: 1.2, textTransform: 'uppercase' }}>{feature.name}</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '16px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {feature.subtitle?.[language] || feature.subtitle?.es}
                          </span>
                        </div>

                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '32px', flexGrow: 1 }}>
                          {feature.description?.[language] || feature.description?.es}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* 2. Highlights */}
        {D.highlights && D.highlights.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center', marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
            <Reveal delay={100}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px' }}>
                  {D.highlightsTitle?.[language] || D.highlightsTitle?.es || 'Destacados'}
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '32px' }}>
                  {D.highlightsDesc?.[language] || D.highlightsDesc?.es}
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {D.highlights.map((hl: any, i: number) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                      <div style={{ color: 'var(--magenta)', marginTop: '4px' }}><Sparkles size={20} /></div>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px 0' }}>
                          {hl.theme?.[language] || hl.theme?.es} <span style={{ fontSize: '0.8rem', color: 'var(--cyan)', marginLeft: '8px' }}>({hl.time})</span>
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                          {hl.desc?.[language] || hl.desc?.es}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', height: '420px', boxShadow: '0 20px 40px rgba(0,46,81,0.06)' }}>
                <img src={D.highlightsImage || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"} alt="Highlights" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
            </Reveal>
          </div>
        )}

        {/* 3. Schedule */}
        {D.schedule && D.schedule.length > 0 && (
          <div id="programa" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
            <Reveal style={{ marginBottom: '48px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
                {D.scheduleTitle?.[language] || D.scheduleTitle?.es || 'Programa'}
              </h2>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {D.schedule.map((item: any, idx: number) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div style={{ background: '#fff', borderRadius: '24px', padding: '36px 40px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.02)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', alignItems: 'start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--magenta)', fontWeight: 800, fontSize: '0.95rem' }}>
                        <Clock size={16} /> {item.time}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <MapPin size={16} /> {item.location}
                      </div>
                    </div>
                    <div style={{ flexGrow: 2 }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 12px 0', lineHeight: 1.25 }}>
                        {item.title?.[language] || item.title?.es || item.title}
                      </h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                        {item.desc?.[language] || item.desc?.es || item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* 4. Guests */}
        {D.guests && D.guests.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
            <Reveal style={{ marginBottom: '48px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
                {D.guestsTitle?.[language] || D.guestsTitle?.es || 'Invitados'}
              </h2>
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
              {D.guests.map((guest: any, idx: number) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)', textAlign: 'center', border: '1px solid rgba(0,0,0,0.01)' }}>
                    <div style={{ color: 'var(--cyan)', marginBottom: '16px', display: 'inline-flex', background: 'rgba(0,186,211,0.08)', padding: '12px', borderRadius: '50%' }}><Users size={24} /></div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px' }}>{guest.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, margin: '0 0 6px 0', textTransform: 'uppercase' }}>
                      {guest.role?.[language] || guest.role?.es || guest.role}
                    </p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--magenta)', fontWeight: 800 }}>{guest.org}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
