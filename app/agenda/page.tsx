"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import { mockAgenda } from '../data/agenda';
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
      transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }}>
      {children}
    </div>
  );
}

export default function AgendaPage() {
  const { language, t } = useLanguage();
  const [agendas, setAgendas] = useState<any[]>(mockAgenda);
  const [activeDay, setActiveDay] = useState(mockAgenda[0].id);

  useEffect(() => {
    fetch('/api/admin/agendas')
      .then(res => res.json())
      .then(data => {
        if (data.agendas && data.agendas.length > 0) {
          setAgendas(data.agendas);
          setActiveDay(data.agendas[0].id);
        }
      })
      .catch(() => {});
  }, []);

  const currentDay = agendas.find(d => d.id === activeDay || d.slug === activeDay) || agendas[0];

  const getLocString = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[language] || val.es || '';
  };

  const getEvents = (day: any) => {
    const list = day.schedule || day.events || [];
    return list.map((e: any, idx: number) => ({
      id: e.id || `ev-${idx}`,
      time: e.time || '09:00 AM - 10:00 AM',
      title: getLocString(e.title),
      speaker: getLocString(e.desc || e.speaker),
      location: e.location || 'Pabellón Principal',
      type: e.type || 'Keynote'
    }));
  };

  const getTypeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'keynote': return { bg: 'rgba(228,0,124,0.08)', text: 'var(--magenta)', border: 'var(--magenta)' };
      case 'panel': return { bg: 'rgba(0,186,211,0.08)', text: 'var(--cyan)', border: 'var(--cyan)' };
      case 'workshop': return { bg: 'rgba(0,25,76,0.05)', text: 'var(--navy)', border: 'var(--navy)' };
      case 'networking': return { bg: 'rgba(255,200,0,0.1)', text: '#cc9900', border: '#cc9900' };
      case 'expo': return { bg: 'rgba(228,0,124,0.08)', text: 'var(--magenta)', border: 'var(--magenta)' };
      case 'show': return { bg: 'rgba(0,186,211,0.08)', text: 'var(--cyan)', border: 'var(--cyan)' };
      case 'b2b': return { bg: 'rgba(0,25,76,0.05)', text: 'var(--navy)', border: 'var(--navy)' };
      case 'logística': return { bg: 'rgba(0,0,0,0.03)', text: '#888', border: '#ccc' };
      default: return { bg: 'rgba(0,25,76,0.05)', text: 'var(--navy)', border: 'var(--navy)' };
    }
  };

  return (
    <div className="agenda-vertical-premium">
      <style dangerouslySetInnerHTML={{ __html: `
        .agenda-vertical-premium {
          background: var(--cream);
          min-height: 100vh;
          color: var(--navy);
          position: relative;
          overflow: hidden;
          padding-bottom: 160px;
        }

        /* ─── DECORACIÓN DE FONDO ─── */
        .agenda-bg-pattern {
          position: absolute; top: -5%; right: -10%;
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(228,0,124,0.03) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .agenda-bg-mariposa {
          position: absolute; top: 100px; left: -100px;
          opacity: 0.03; pointer-events: none; z-index: 0;
          transform: rotate(-15deg);
        }

        /* ─── HEADER EDITORIAL ─── */
        .agenda-header {
          position: relative; z-index: 10;
          max-width: 1200px; margin: 0 auto;
          padding: 180px 4% 80px;
          text-align: center;
        }
        .agenda-label {
          display: inline-block; padding: 6px 20px;
          border: 1.5px solid var(--cyan);
          border-radius: 100px; color: var(--cyan);
          font-family: var(--font-display); font-weight: 800;
          font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.2em;
          margin-bottom: 32px;
        }
        .agenda-title {
          font-family: var(--font-display);
          font-size: clamp(4rem, 7vw, 7rem);
          font-weight: 900; line-height: 0.9; letter-spacing: -0.04em;
          color: var(--navy); margin: 0;
        }
        .agenda-subtitle {
          font-family: var(--font-body); font-size: 1.25rem;
          color: var(--text-muted); max-width: 600px; margin: 32px auto 0;
          line-height: 1.7;
        }

        /* ─── STICKY DAY SELECTOR ─── */
        .day-selector-wrapper {
          position: sticky; top: 100px; z-index: 100;
          display: flex; justify-content: center;
          margin-bottom: 100px; padding: 0 4%;
        }
        .day-selector {
          display: inline-flex; gap: 8px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0,46,81,0.05);
          padding: 10px; border-radius: 100px;
          box-shadow: 0 20px 40px rgba(0,25,76,0.06);
        }
        .day-btn {
          background: transparent; border: none;
          padding: 16px 32px; border-radius: 100px; cursor: pointer;
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.1rem; color: var(--navy); opacity: 0.6;
          transition: all 0.3s ease;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
        }
        .day-btn:hover { opacity: 1; }
        .day-btn.active {
          background: var(--navy); color: #fff; opacity: 1;
          box-shadow: 0 10px 20px rgba(0,25,76,0.2);
        }
        .day-date {
          font-family: var(--font-body); font-weight: 400;
          font-size: 0.8rem; letter-spacing: 0.05em; opacity: 0.8;
        }

        /* ─── EDITORIAL TIMELINE ─── */
        .timeline-wrapper {
          max-width: 1000px; margin: 0 auto; padding: 0 4%;
          position: relative; z-index: 10;
        }

        .event-row {
          display: flex; gap: 60px;
          margin-bottom: 40px;
        }

        /* Columna de Tiempo */
        .time-col {
          flex: 0 0 200px;
          text-align: right;
          position: relative;
          padding-top: 10px;
        }
        /* La línea de conexión vertical */
        .time-col::after {
          content: ''; position: absolute;
          top: 30px; bottom: -70px; right: -30px;
          width: 2px; background: rgba(0,46,81,0.06);
        }
        /* Ocultar la línea en el último elemento */
        .event-row:last-child .time-col::after { display: none; }

        /* El punto indicador en la línea */
        .time-col::before {
          content: ''; position: absolute;
          top: 24px; right: -35px;
          width: 12px; height: 12px; border-radius: 50%;
          background: var(--event-border);
          box-shadow: 0 0 0 6px var(--cream);
          z-index: 2;
          transition: transform 0.3s;
        }

        .event-row:hover .time-col::before {
          transform: scale(1.3);
        }

        .time-start {
          font-family: var(--font-display); font-weight: 900;
          font-size: 2.2rem; color: var(--navy); line-height: 1;
          margin-bottom: 8px; letter-spacing: -0.03em;
        }
        .time-end {
          font-family: var(--font-body); color: var(--text-muted);
          font-size: 0.95rem; font-weight: 500;
        }

        /* Tarjeta de Contenido */
        .content-col {
          flex: 1;
        }
        .event-card {
          background: #fff;
          border-radius: 32px;
          padding: 40px;
          box-shadow: 0 15px 35px rgba(0,25,76,0.03);
          border: 1px solid rgba(0,0,0,0.02);
          transition: transform 0.4s, box-shadow 0.4s;
          position: relative;
          overflow: hidden;
        }
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(0,25,76,0.08);
        }
        
        /* Delicada línea superior del color del evento */
        .event-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 4px; background: var(--event-border);
        }

        .event-badge {
          display: inline-block; padding: 6px 16px;
          background: var(--event-bg); color: var(--event-text);
          border-radius: 100px; font-family: var(--font-display);
          font-weight: 800; font-size: 0.75rem; text-transform: uppercase;
          letter-spacing: 0.15em; margin-bottom: 24px;
        }

        .event-title {
          font-family: var(--font-display); font-weight: 900;
          font-size: 1.8rem; color: var(--navy); line-height: 1.25;
          margin: 0 0 24px 0; letter-spacing: -0.02em;
        }

        .event-meta {
          display: flex; gap: 32px; flex-wrap: wrap;
          border-top: 1px solid rgba(0,46,81,0.06);
          padding-top: 24px;
        }
        .meta-item {
          display: flex; align-items: center; gap: 12px;
          color: var(--navy); font-size: 1rem; font-family: var(--font-body);
          font-weight: 500;
        }
        .meta-icon {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--cream);
          display: flex; align-items: center; justify-content: center;
          color: var(--magenta);
        }

        @media (max-width: 900px) {
          .day-selector-wrapper { padding: 0; margin-bottom: 60px; overflow-x: auto; justify-content: flex-start; }
          .day-selector { border-radius: 0; width: 100%; border: none; border-bottom: 1px solid rgba(0,0,0,0.1); }
          .day-btn { padding: 16px 24px; flex: 0 0 auto; border-radius: 20px; }
          
          .event-row { flex-direction: column; gap: 20px; }
          .time-col { flex: none; text-align: left; padding-top: 0; }
          .time-col::after, .time-col::before { display: none; }
          
          .time-start { font-size: 1.8rem; display: inline-block; margin-right: 12px; }
          .time-end { display: inline-block; }
          
          .event-card { padding: 32px 24px; border-radius: 24px; }
          .event-title { font-size: 1.4rem; }
          .event-meta { gap: 16px; flex-direction: column; }
        }
      `}} />

      <div className="agenda-bg-pattern" />
      <div className="agenda-bg-mariposa">
        <Mariposa width={600} height={600} />
      </div>

      <div className="agenda-header">
        <Reveal key={currentDay ? currentDay.id : 'default-header'}>
          <div className="agenda-label">{t('pages.agenda.programa')}</div>
          <h1 className="agenda-title">
            {currentDay ? getLocString(currentDay.title) : t('pages.agenda.title')}
          </h1>
          <p className="agenda-subtitle">
            {currentDay ? getLocString(currentDay.description) : t('pages.agenda.desc')}
          </p>
        </Reveal>
      </div>

      <div className="day-selector-wrapper">
        <div className="day-selector" style={{ overflowX: 'auto', maxWidth: '100%', whiteSpace: 'nowrap' }}>
          {agendas.map((day) => (
            <button 
              key={day.id} 
              onClick={() => setActiveDay(day.id)}
              className={`day-btn ${activeDay === day.id || activeDay === day.slug ? 'active' : ''}`}
              style={{ flexShrink: 0 }}
            >
              <span style={{ fontSize: '0.95rem' }}>{getLocString(day.title)}</span>
              <span className="day-date">{day.date}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="timeline-wrapper">
        {currentDay && getEvents(currentDay).map((event: any, idx: number) => {
          const typeStyle = getTypeStyle(event.type);
          
          return (
            <Reveal key={event.id} delay={idx * 100}>
              <div 
                className="event-row"
                style={{
                  '--event-bg': typeStyle.bg,
                  '--event-text': typeStyle.text,
                  '--event-border': typeStyle.border,
                } as React.CSSProperties}
              >
                
                {/* TIMELINE LEFT */}
                <div className="time-col">
                  <div className="time-start">{(event.time || '').split(' - ')[0] || event.time}</div>
                  <div className="time-end">
                    {(event.time || '').includes(' - ') ? `${t('pages.agenda.hasta')} ${event.time.split(' - ')[1]}` : ''}
                  </div>
                </div>

                {/* TIMELINE RIGHT (CARD) */}
                <div className="content-col">
                  <div className="event-card">
                    <div className="event-badge">{event.type}</div>
                    <h3 className="event-title">{event.title}</h3>
                    
                    <div className="event-meta">
                      {event.speaker && (
                        <div className="meta-item">
                          <div className="meta-icon"><User size={16} /></div>
                          {event.speaker}
                        </div>
                      )}
                      <div className="meta-item">
                        <div className="meta-icon"><MapPin size={16} color="var(--cyan)" /></div>
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Reveal>
          );
        })}
      </div>

    </div>
  );
}
