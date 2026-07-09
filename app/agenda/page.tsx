"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, User, Tag } from 'lucide-react';
import { mockAgenda } from '../data/agenda';

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

  const baseStyle: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  };
  const inViewStyle: React.CSSProperties = {
    opacity: 1,
    transform: 'translateY(0)',
    transitionDelay: `${delay}ms`,
  };

  return (
    <div ref={ref} className={className} style={{ ...style, ...baseStyle, ...(inView ? inViewStyle : {}) }}>
      {children}
    </div>
  );
}

export default function AgendaPage() {
  const [activeDay, setActiveDay] = useState(mockAgenda[0].id);

  const currentDay = mockAgenda.find(d => d.id === activeDay) || mockAgenda[0];

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'keynote': return { bg: 'rgba(228,0,124,0.1)', text: 'var(--magenta)' }; // Magenta
      case 'panel': return { bg: 'rgba(0,186,211,0.1)', text: 'var(--cyan)' }; // Cyan
      case 'workshop': return { bg: 'rgba(0,25,76,0.1)', text: 'var(--navy)' }; // Navy
      case 'networking': return { bg: 'rgba(255,200,0,0.15)', text: '#d9a400' }; // Yellow
      case 'break': return { bg: '#f5f5f5', text: '#888' };
      default: return { bg: 'rgba(0,25,76,0.05)', text: 'var(--navy)' };
    }
  };

  return (
    <div className="agenda-page" style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* HEADER SECTION */}
      <div style={{ background: 'var(--navy)', color: '#fff', padding: '160px 48px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '50%', height: '150%', background: 'radial-gradient(ellipse at center, rgba(0,186,211,0.2) 0%, rgba(0,25,76,0) 70%)', pointerEvents: 'none' }}></div>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--cyan)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '24px' }}>
              Programa Oficial
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 24px 0' }}>
              Agenda del Evento
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Explora las conferencias magistrales, paneles, talleres y espacios de networking diseñados para impulsar tu desarrollo.
            </p>
          </Reveal>
        </div>
      </div>

      {/* AGENDA CONTENT */}
      <div style={{ maxWidth: '1000px', margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        
        {/* TABS */}
        <Reveal delay={100}>
          <div style={{ display: 'flex', gap: '16px', background: '#fff', padding: '16px', borderRadius: '100px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', marginBottom: '64px', overflowX: 'auto', flexWrap: 'nowrap', WebkitOverflowScrolling: 'touch' }}>
            {mockAgenda.map(day => (
              <button 
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                style={{
                  flex: '1 0 auto',
                  padding: '16px 32px',
                  borderRadius: '100px',
                  border: 'none',
                  background: activeDay === day.id ? 'var(--magenta)' : 'transparent',
                  color: activeDay === day.id ? '#fff' : 'var(--navy)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>{day.title.split(':')[0]}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 500, opacity: activeDay === day.id ? 0.9 : 0.6 }}>{day.date}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* TIMELINE */}
        <div style={{ background: '#fff', borderRadius: '32px', padding: '48px', boxShadow: '0 15px 35px rgba(0,25,76,0.04)' }}>
          <Reveal delay={200}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '40px', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '24px' }}>
              {currentDay.title}
            </h2>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {currentDay.events.map((event, idx) => {
              const colors = getTypeColor(event.type);
              
              return (
                <Reveal key={event.id} delay={idx * 100}>
                  <div style={{ display: 'flex', gap: '32px', borderLeft: '3px solid', borderColor: colors.text, paddingLeft: '24px', position: 'relative' }}>
                    
                    {/* Time Column */}
                    <div style={{ flex: '0 0 160px', paddingTop: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy)', fontWeight: 700, fontSize: '0.95rem' }}>
                        <Clock size={16} color="var(--magenta)" />
                        {event.time.split(' - ')[0]}
                      </div>
                      <div style={{ color: 'var(--text)', fontSize: '0.85rem', marginLeft: '24px', marginTop: '4px' }}>
                        hasta {event.time.split(' - ')[1]}
                      </div>
                    </div>

                    {/* Content Column */}
                    <div style={{ flex: '1' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <span style={{ background: colors.bg, color: colors.text, padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {event.type}
                        </span>
                      </div>
                      
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px', lineHeight: 1.3 }}>
                        {event.title}
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {event.speaker && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text)' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,25,76,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <User size={14} color="var(--navy)" />
                            </div>
                            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{event.speaker}</span>
                          </div>
                        )}
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text)' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,186,211,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MapPin size={14} color="var(--cyan)" />
                          </div>
                          <span style={{ fontSize: '0.95rem' }}>{event.location}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
