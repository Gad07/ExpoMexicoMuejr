"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, User, ExternalLink, Users, Calendar } from 'lucide-react';
import { mockAgenda } from '../data/agenda';
import { Mariposa } from '@/components/BrandAssets';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

// ID de la Agenda General/Madre
const GENERAL_ID = 'toronto-2027';

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
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }}>
      {children}
    </div>
  );
}

export default function AgendaPage() {
  const { language, t } = useLanguage();

  // Todas las agendas desde DB
  const [agendas, setAgendas] = useState<any[]>(mockAgenda);
  // La agenda activa en la pestaña (una de las sub-agendas)
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    fetch('/api/admin/agendas')
      .then(res => res.json())
      .then(data => {
        if (data.agendas && data.agendas.length > 0) {
          setAgendas(data.agendas);
          // La primera sub-agenda es la pestaña por defecto
          const subs = data.agendas.filter((a: any) => a.id !== GENERAL_ID);
          if (subs.length > 0) setActiveTab(subs[0].id);
          else setActiveTab(data.agendas[0].id);
        }
      })
      .catch(() => {
        const subs = mockAgenda.filter(a => a.id !== GENERAL_ID);
        if (subs.length > 0) setActiveTab(subs[0].id);
      });
  }, []);

  const getLocString = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[language] || val.es || '';
  };

  const getEvents = (day: any) => {
    const list = day.schedule || day.events || [];
    return list.map((e: any, idx: number) => ({
      id: e.id || `ev-${idx}`,
      time: e.time || '',
      title: getLocString(e.title),
      speaker: getLocString(e.desc || e.speaker),
      location: e.location || '',
      type: e.type || 'Keynote'
    }));
  };

  const getTypeStyle = (type: string) => {
    switch ((type || '').toLowerCase()) {
      case 'keynote':    return { bg: 'rgba(228,0,124,0.08)',  text: 'var(--magenta)', border: 'var(--magenta)' };
      case 'panel':      return { bg: 'rgba(0,186,211,0.08)',  text: 'var(--cyan)',    border: 'var(--cyan)' };
      case 'workshop':   return { bg: 'rgba(0,25,76,0.05)',    text: 'var(--navy)',    border: 'var(--navy)' };
      case 'networking': return { bg: 'rgba(255,200,0,0.10)', text: '#cc9900',        border: '#cc9900' };
      case 'expo':       return { bg: 'rgba(228,0,124,0.08)',  text: 'var(--magenta)', border: 'var(--magenta)' };
      case 'show':       return { bg: 'rgba(0,186,211,0.08)',  text: 'var(--cyan)',    border: 'var(--cyan)' };
      case 'b2b':        return { bg: 'rgba(0,25,76,0.05)',    text: 'var(--navy)',    border: 'var(--navy)' };
      case 'logística':  return { bg: 'rgba(0,0,0,0.03)',      text: '#888',           border: '#ccc' };
      default:           return { bg: 'rgba(0,25,76,0.05)',    text: 'var(--navy)',    border: 'var(--navy)' };
    }
  };

  // Agenda general (madre) — para el header
  const generalAgenda = agendas.find((a: any) => a.id === GENERAL_ID);
  // Sub-agendas = todas excepto la general → serán las PESTAÑAS
  const subAgendas = agendas.filter((a: any) => a.id !== GENERAL_ID);
  // Agenda actualmente seleccionada en la pestaña
  const currentTab = agendas.find((a: any) => a.id === activeTab);
  const events = currentTab ? getEvents(currentTab) : [];
  const guests: any[] = currentTab?.guests || [];

  return (
    <div className="agenda-premium">
      <style dangerouslySetInnerHTML={{ __html: `
        .agenda-premium {
          background: var(--cream);
          min-height: 100vh;
          color: var(--navy);
          position: relative;
          padding-bottom: 160px;
          overflow-x: hidden;
        }

        /* ─ DECORACIÓN ─ */
        .ag-bg-blob {
          position: absolute; top: -5%; right: -10%;
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(228,0,124,0.03) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .ag-bg-mariposa {
          position: absolute; top: 100px; left: -100px;
          opacity: 0.03; pointer-events: none; z-index: 0;
          transform: rotate(-15deg);
        }

        /* ─ HEADER ─ */
        .ag-header {
          position: relative; z-index: 10;
          max-width: 1100px; margin: 0 auto;
          padding: 180px 5% 64px;
          text-align: center;
        }
        .ag-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 20px;
          border: 1.5px solid var(--cyan); border-radius: 100px;
          color: var(--cyan); font-family: var(--font-display); font-weight: 800;
          font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.2em;
          margin-bottom: 28px;
        }
        .ag-main-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 900; line-height: 0.95; letter-spacing: -0.04em;
          color: var(--navy); margin: 0;
        }
        .ag-main-title em {
          font-style: normal;
          background: linear-gradient(135deg, var(--magenta), #c5006a);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ag-main-desc {
          font-size: 1.1rem; color: var(--text-muted);
          max-width: 560px; margin: 24px auto 0; line-height: 1.7;
        }
        .ag-dates-badge {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 20px; padding: 8px 20px;
          background: rgba(0,46,81,0.05); border-radius: 100px;
          font-family: var(--font-display); font-size: 0.85rem;
          font-weight: 700; color: var(--navy); opacity: 0.7;
        }

        /* ─ STICKY TAB BAR ─ */
        .ag-tabs-sticky {
          position: sticky; top: 82px; z-index: 200;
          background: rgba(250,248,245,0.95);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,46,81,0.06);
          padding: 0;
        }
        .ag-tabs-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 0 5%;
          display: flex; gap: 4px; overflow-x: auto;
          scrollbar-width: none;
        }
        .ag-tabs-inner::-webkit-scrollbar { display: none; }
        .ag-tab-btn {
          background: transparent; border: none;
          padding: 20px 24px 18px; cursor: pointer;
          font-family: var(--font-display); font-weight: 800;
          font-size: 0.9rem; color: var(--navy); opacity: 0.45;
          transition: all 0.2s ease;
          display: flex; flex-direction: column; align-items: flex-start; gap: 2px;
          white-space: nowrap; flex-shrink: 0;
          border-bottom: 3px solid transparent;
          position: relative;
        }
        .ag-tab-btn:hover { opacity: 0.8; }
        .ag-tab-btn.active {
          opacity: 1;
          border-bottom-color: var(--magenta);
          color: var(--magenta);
        }
        .ag-tab-date {
          font-family: var(--font-body); font-weight: 400;
          font-size: 0.7rem; color: var(--text-muted); opacity: 1;
        }
        .ag-tab-btn.active .ag-tab-date { color: rgba(228,0,124,0.6); }

        /* ─ CONTENT AREA ─ */
        .ag-content {
          max-width: 1100px; margin: 0 auto; padding: 0 5%;
          position: relative; z-index: 10;
        }

        /* ─ SUB-HEADER (título del sub-evento activo) ─ */
        .ag-subheader {
          padding: 56px 0 40px;
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 24px; flex-wrap: wrap;
          border-bottom: 1px solid rgba(0,46,81,0.06);
          margin-bottom: 48px;
        }
        .ag-sub-title {
          font-family: var(--font-display); font-size: 2.4rem;
          font-weight: 900; color: var(--navy); margin: 0 0 8px 0;
          letter-spacing: -0.03em; line-height: 1.1;
        }
        .ag-sub-desc {
          font-size: 1rem; color: var(--text-muted);
          max-width: 500px; line-height: 1.6; margin: 0;
        }
        .ag-view-page-link {
          display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0;
          font-family: var(--font-display); font-weight: 700;
          font-size: 0.78rem; color: var(--magenta);
          text-decoration: none; text-transform: uppercase; letter-spacing: 0.08em;
          padding: 8px 16px; background: rgba(228,0,124,0.08);
          border-radius: 100px; transition: background 0.2s;
          margin-top: 4px;
        }
        .ag-view-page-link:hover { background: rgba(228,0,124,0.15); }

        /* ─ SECTION LABEL ─ */
        .ag-section-label {
          font-family: var(--font-display); font-weight: 800;
          font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.18em;
          color: var(--text-muted); margin-bottom: 24px; display: flex;
          align-items: center; gap: 10px;
        }
        .ag-section-label::after {
          content: ''; flex: 1; height: 1px; background: rgba(0,0,0,0.07);
        }

        /* ─ TIMELINE ─ */
        .ag-timeline { display: flex; flex-direction: column; gap: 32px; }
        .ag-event-row { display: flex; gap: 56px; }
        .ag-time-col {
          flex: 0 0 180px; text-align: right; position: relative; padding-top: 8px;
        }
        .ag-time-col::after {
          content: ''; position: absolute;
          top: 28px; bottom: -52px; right: -28px;
          width: 2px; background: rgba(0,46,81,0.06);
        }
        .ag-event-row:last-child .ag-time-col::after { display: none; }
        .ag-time-col::before {
          content: ''; position: absolute;
          top: 22px; right: -33px;
          width: 12px; height: 12px; border-radius: 50%;
          background: var(--ev-border); box-shadow: 0 0 0 6px var(--cream);
          z-index: 2; transition: transform 0.3s;
        }
        .ag-event-row:hover .ag-time-col::before { transform: scale(1.4); }
        .ag-time-start {
          font-family: var(--font-display); font-weight: 900;
          font-size: 2rem; color: var(--navy); line-height: 1;
          margin-bottom: 6px; letter-spacing: -0.03em;
        }
        .ag-time-end {
          font-family: var(--font-body); color: var(--text-muted);
          font-size: 0.9rem; font-weight: 500;
        }
        .ag-card-col { flex: 1; }
        .ag-event-card {
          background: #fff; border-radius: 28px; padding: 36px 40px;
          box-shadow: 0 12px 32px rgba(0,25,76,0.04);
          border: 1px solid rgba(0,0,0,0.02);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          position: relative; overflow: hidden;
        }
        .ag-event-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 4px; background: var(--ev-border);
        }
        .ag-event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 56px rgba(0,25,76,0.07);
        }
        .ag-badge {
          display: inline-block; padding: 5px 14px;
          background: var(--ev-bg); color: var(--ev-text);
          border-radius: 100px; font-family: var(--font-display);
          font-weight: 800; font-size: 0.7rem; text-transform: uppercase;
          letter-spacing: 0.15em; margin-bottom: 20px;
        }
        .ag-event-title {
          font-family: var(--font-display); font-weight: 900;
          font-size: 1.6rem; color: var(--navy); line-height: 1.25;
          margin: 0 0 20px 0; letter-spacing: -0.02em;
        }
        .ag-event-meta {
          display: flex; gap: 28px; flex-wrap: wrap;
          border-top: 1px solid rgba(0,46,81,0.06); padding-top: 20px;
        }
        .ag-meta-item {
          display: flex; align-items: center; gap: 10px;
          color: var(--navy); font-size: 0.95rem; font-weight: 500;
        }
        .ag-meta-icon {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--cream);
          display: flex; align-items: center; justify-content: center;
          color: var(--magenta); flex-shrink: 0;
        }

        /* ─ GUESTS ─ */
        .ag-guests-title {
          font-family: var(--font-display); font-weight: 900;
          font-size: 1.8rem; color: var(--navy); margin: 0 0 24px 0;
        }
        .ag-guests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .ag-guest-card {
          background: #fff; border-radius: 18px;
          padding: 24px 20px; text-align: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.03);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .ag-guest-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.06);
        }
        .ag-guest-avatar {
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(228,0,124,0.12), rgba(0,186,211,0.12));
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 12px; color: var(--magenta);
        }

        /* ─ EMPTY ─ */
        .ag-empty {
          text-align: center; padding: 80px 24px; color: var(--text-muted);
        }

        /* ─ RESPONSIVE ─ */
        @media (max-width: 900px) {
          .ag-header { padding: 150px 5% 48px; }
          .ag-main-title { font-size: clamp(2.4rem, 8vw, 4rem); }
          .ag-event-row { flex-direction: column; gap: 16px; }
          .ag-time-col { flex: none; text-align: left; padding-top: 0; }
          .ag-time-col::after, .ag-time-col::before { display: none; }
          .ag-time-start { font-size: 1.6rem; display: inline; margin-right: 8px; }
          .ag-time-end { display: inline; }
          .ag-event-card { padding: 28px 20px; border-radius: 20px; }
          .ag-event-title { font-size: 1.3rem; }
          .ag-subheader { flex-direction: column; padding: 40px 0 32px; }
        }
      `}} />

      {/* FONDOS DECORATIVOS */}
      <div className="ag-bg-blob" />
      <div className="ag-bg-mariposa">
        <Mariposa width={600} height={600} />
      </div>

      {/* ══════════════════════════════════════════
          HEADER GENERAL — "Expo México Mujer Toronto 2027"
      ══════════════════════════════════════════ */}
      <div className="ag-header">
        <Reveal>
          <div className="ag-eyebrow">
            <Clock size={13} /> {t('pages.agenda.programa')}
          </div>
          <h1 className="ag-main-title">
            {generalAgenda
              ? <>
                  {getLocString(generalAgenda.title).split(' ').slice(0, -1).join(' ')}{' '}
                  <em>{getLocString(generalAgenda.title).split(' ').slice(-1)}</em>
                </>
              : <>Agenda <em>EMM 2027</em></>
            }
          </h1>
          <p className="ag-main-desc">
            {generalAgenda ? getLocString(generalAgenda.description) : t('pages.agenda.desc')}
          </p>
          {generalAgenda?.date && (
            <div className="ag-dates-badge">
              <Calendar size={14} /> {generalAgenda.date}
            </div>
          )}
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════
          PESTAÑAS STICKY — Una pestaña por sub-agenda
      ══════════════════════════════════════════ */}
      <div className="ag-tabs-sticky">
        <div className="ag-tabs-inner">
          {subAgendas.map((sub: any) => (
            <button
              key={sub.id}
              onClick={() => setActiveTab(sub.id)}
              className={`ag-tab-btn ${activeTab === sub.id ? 'active' : ''}`}
            >
              <span>{getLocString(sub.title)}</span>
              <span className="ag-tab-date">{sub.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CONTENIDO DE LA PESTAÑA ACTIVA
      ══════════════════════════════════════════ */}
      <div className="ag-content">

        {/* Sub-header: título y descripción del sub-evento */}
        {currentTab && (
          <Reveal key={currentTab.id}>
            <div className="ag-subheader">
              <div>
                <h2 className="ag-sub-title">{getLocString(currentTab.title)}</h2>
                <p className="ag-sub-desc">{getLocString(currentTab.description)}</p>
              </div>
              {currentTab.slug && (
                <Link href={`/agenda/${currentTab.slug}`} className="ag-view-page-link">
                  <ExternalLink size={12} /> Ver página completa
                </Link>
              )}
            </div>
          </Reveal>
        )}

        {/* ─── PROGRAMA / SCHEDULE ─── */}
        {events.length > 0 && (
          <>
            <Reveal>
              <div className="ag-section-label">
                {currentTab ? (getLocString(currentTab.scheduleTitle) || 'Programa Oficial') : 'Programa Oficial'}
              </div>
            </Reveal>

            <div className="ag-timeline">
              {events.map((event: any, idx: number) => {
                const ts = getTypeStyle(event.type);
                const timeParts = (event.time || '').split(' - ');
                return (
                  <Reveal key={`${currentTab?.id}-${event.id}`} delay={idx * 80}>
                    <div
                      className="ag-event-row"
                      style={{ '--ev-bg': ts.bg, '--ev-text': ts.text, '--ev-border': ts.border } as React.CSSProperties}
                    >
                      {/* Columna de tiempo */}
                      <div className="ag-time-col">
                        <div className="ag-time-start">{timeParts[0] || event.time}</div>
                        {timeParts[1] && (
                          <div className="ag-time-end">{t('pages.agenda.hasta')} {timeParts[1]}</div>
                        )}
                      </div>

                      {/* Tarjeta de evento */}
                      <div className="ag-card-col">
                        <div className="ag-event-card">
                          <div className="ag-badge">{event.type}</div>
                          <h3 className="ag-event-title">{event.title}</h3>
                          <div className="ag-event-meta">
                            {event.speaker && (
                              <div className="ag-meta-item">
                                <div className="ag-meta-icon"><User size={14} /></div>
                                {event.speaker}
                              </div>
                            )}
                            {event.location && (
                              <div className="ag-meta-item">
                                <div className="ag-meta-icon"><MapPin size={14} color="var(--cyan)" /></div>
                                {event.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </>
        )}

        {events.length === 0 && currentTab && (
          <div className="ag-empty">
            <Clock size={36} style={{ opacity: 0.25, marginBottom: 12 }} />
            <p style={{ fontWeight: 600, fontSize: '1rem' }}>Sin actividades registradas aún.</p>
            <p style={{ fontSize: '0.85rem', marginTop: 8, opacity: 0.7 }}>
              Agrégalas desde el panel <strong>/admin/agendas</strong>
            </p>
          </div>
        )}

        {/* ─── INVITADOS / GUESTS ─── */}
        {guests.length > 0 && (
          <div style={{ marginTop: '80px' }}>
            <Reveal>
              <div className="ag-section-label" style={{ marginBottom: '28px' }}>
                {currentTab ? (getLocString(currentTab.guestsTitle) || 'Invitados Especiales') : 'Invitados Especiales'}
              </div>
            </Reveal>
            <div className="ag-guests-grid">
              {guests.map((guest: any, idx: number) => (
                <Reveal key={`g-${idx}`} delay={idx * 70}>
                  <div className="ag-guest-card">
                    <div className="ag-guest-avatar"><Users size={24} /></div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px 0' }}>
                      {guest.name}
                    </h4>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px 0' }}>
                      {getLocString(guest.role)}
                    </p>
                    {guest.org && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{guest.org}</span>
                    )}
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
