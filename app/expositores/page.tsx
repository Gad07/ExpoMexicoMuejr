"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { mexicanStates, mockExhibitors, businessCategories } from '../data/expositores';
import { Search, ChevronLeft, MapPin, Calendar, Clock, Map, Ruler, Lightbulb, Handshake, Folder, Megaphone } from 'lucide-react';

function Reveal({
  children, className = '', delay = 0, style = {}, onClick
}: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties; onClick?: () => void }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
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
    <div ref={ref} className={className} style={{ ...style, ...baseStyle, ...(inView ? inViewStyle : {}) }} onClick={onClick}>
      {children}
    </div>
  );
}

import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';

function ExpositoresContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [exhibitors, setExhibitors] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/expositores')
      .then(res => res.json())
      .then(data => {
        if (data.exhibitors) setExhibitors(data.exhibitors);
      })
      .catch(() => {});
  }, []);
  
  const activeCategory = searchParams ? searchParams.get('categoria') : null;
  const [searchQuery, setSearchQuery] = useState('');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  
  // Modal states for Calendar and Map
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedExhibitor, setSelectedExhibitor] = useState<any | null>(null);
  
  const [appointmentDate, setAppointmentDate] = useState('12');
  const [appointmentTime, setAppointmentTime] = useState('10:00');
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentEmail, setAppointmentEmail] = useState('');
  const [appointmentPhone, setAppointmentPhone] = useState('');
  const [appointmentSent, setAppointmentSent] = useState(false);

  // VISTA 2: Lista de Expositoras por Categoría
  if (activeCategory) {
    const categoryData = businessCategories.find(cat => cat.name === activeCategory);
    
    // Filtrar expositoras
    const filteredExhibitors = exhibitors.filter(ex => {
      const matchCategory = ex.category === activeCategory;
      const descVal = ex.description && (ex.description[language] || ex.description.es || ex.description || '');
      const matchSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ex.personName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          descVal.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    const openCalendar = (ex: any) => {
      setSelectedExhibitor(ex);
      setAppointmentSent(false);
      setAppointmentName('');
      setAppointmentEmail('');
      setAppointmentPhone('');
      setAppointmentDate('12');
      setAppointmentTime('10:00');
      setShowCalendar(true);
    };

    const openMap = (ex: any) => {
      setSelectedExhibitor(ex);
      setShowMap(true);
    };

    return (
      <div className="exhibitors-page">
        <style>{`
          .exh-topbar {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 40px; padding-bottom: 24px;
            border-bottom: 1px solid rgba(0,0,0,0.06);
            flex-wrap: wrap; gap: 20px;
          }
          .btn-back {
            display: inline-flex; align-items: center; gap: 8px;
            background: none; border: none; padding: 0; cursor: pointer;
            font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
            letter-spacing: 0.1em; color: var(--navy); font-size: 0.85rem;
            transition: color 0.3s;
          }
          .btn-back:hover { color: var(--magenta); }
          .exh-search-wrapper {
            position: relative; width: 100%; max-width: 400px;
          }
          .exh-search-icon {
            position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted);
          }
          .exh-search-input {
            width: 100%; padding: 14px 20px 14px 48px;
            border-radius: 30px; border: 1px solid rgba(0,0,0,0.1);
            background: #fff; font-family: var(--font-body); font-size: 0.95rem;
            outline: none; transition: border-color 0.3s, box-shadow 0.3s;
          }
          .exh-search-input:focus {
            border-color: var(--cyan); box-shadow: 0 0 0 4px rgba(0,186,211,0.1);
          }
          .exh-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 32px;
          }
          .action-btn {
            display: flex; align-items: center; justify-content: center; gap: 6px;
            padding: 10px; border-radius: 8px; border: none; cursor: pointer;
            font-family: var(--font-display); font-weight: 700; font-size: 0.7rem;
            text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.2s;
            flex: 1;
          }
          .btn-calendar { background: rgba(0,46,81,0.06); color: var(--navy); }
          .btn-calendar:hover { background: var(--navy); color: #fff; }
          .btn-map { background: rgba(228,0,124,0.06); color: var(--magenta); }
          .btn-map:hover { background: var(--magenta); color: #fff; }
          
          /* ── PREMIUM APPOINTMENT MODAL ── */
          .modal-overlay {
            position: fixed; inset: 0;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            z-index: 200;
            display: flex; align-items: center; justify-content: center;
            padding: 20px;
            animation: fadeInOverlay 0.3s ease;
          }
          @keyframes fadeInOverlay {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          .modal-content {
            background: #fff;
            border-radius: 28px; width: 100%; max-width: 820px;
            position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.35);
            display: flex; align-items: stretch; overflow: hidden;
            animation: slideUpModal 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            max-height: 92vh;
          }
          /* pseudo-elemento que garantiza navy en toda la altura del panel izq */
          .modal-content::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 240px;
            background: #002E51;
            z-index: 0;
            pointer-events: none;
          }
          @keyframes slideUpModal {
            from { opacity: 0; transform: translateY(30px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          .modal-left {
            width: 240px; flex-shrink: 0;
            padding: 40px 28px;
            display: flex; flex-direction: column;
            position: relative; z-index: 1;
            overflow: hidden;
            align-self: stretch;
          }
          .modal-left::before {
            content: '';
            position: absolute; bottom: -60px; right: -60px;
            width: 200px; height: 200px;
            background: radial-gradient(circle, rgba(228,0,124,0.3) 0%, transparent 70%);
            border-radius: 50%;
          }
          .modal-left-tag {
            display: inline-block;
            background: rgba(255,255,255,0.1);
            color: rgba(255,255,255,0.7);
            font-family: var(--font-display); font-weight: 800;
            font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.2em;
            padding: 5px 12px; border-radius: 100px; margin-bottom: 20px;
          }
          .modal-left-title {
            font-family: var(--font-display);
            font-size: 1.35rem; font-weight: 900;
            color: #fff; line-height: 1.15;
            margin: 0 0 8px;
          }
          .modal-left-sub {
            font-size: 0.82rem; color: rgba(255,255,255,0.55);
            margin: 0 0 28px;
          }
          .modal-left-divider {
            height: 1px; background: rgba(255,255,255,0.12);
            margin-bottom: 24px;
          }
          .modal-left-info-row {
            display: flex; align-items: flex-start; gap: 10px;
            margin-bottom: 16px;
          }
          .modal-left-info-icon {
            width: 28px; height: 28px; border-radius: 8px;
            background: rgba(255,255,255,0.08);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; color: var(--cyan);
          }
          .modal-left-info-label {
            font-family: var(--font-display); font-size: 0.65rem; font-weight: 800;
            text-transform: uppercase; letter-spacing: 0.1em;
            color: rgba(255,255,255,0.4); display: block; margin-bottom: 2px;
          }
          .modal-left-info-val {
            font-size: 0.82rem; color: rgba(255,255,255,0.9); line-height: 1.4;
          }
          .modal-right {
            flex: 1; padding: 40px; overflow-y: auto;
          }
          .modal-close {
            position: absolute; top: 16px; right: 16px;
            width: 44px; height: 44px; border-radius: 50%;
            background: rgba(0,0,0,0.06); border: none; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            color: #666; font-size: 18px; z-index: 10;
            transition: background 0.2s, color 0.2s;
          }
          .modal-close:hover { background: rgba(228,0,124,0.1); color: var(--magenta); }
          .modal-section-label {
            font-family: var(--font-display); font-size: 0.7rem; font-weight: 800;
            text-transform: uppercase; letter-spacing: 0.18em;
            color: var(--magenta); margin-bottom: 14px; display: block;
          }
          .modal-section-title {
            font-family: var(--font-display); font-size: 1.4rem;
            font-weight: 900; color: var(--navy); margin: 0 0 24px;
          }
          /* Date chips */
          .date-chips {
            display: flex; gap: 10px; margin-bottom: 28px; flex-wrap: wrap;
          }
          .date-chip {
            flex: 1; min-width: 120px;
            padding: 14px 12px; border-radius: 14px;
            border: 2px solid rgba(0,0,0,0.08);
            background: #fafafa; cursor: pointer;
            text-align: center; transition: all 0.25s;
            font-family: var(--font-display);
          }
          .date-chip:hover { border-color: var(--navy); background: rgba(0,46,81,0.03); }
          .date-chip.active {
            border-color: var(--navy); background: var(--navy); color: #fff;
          }
          .date-chip-day {
            font-size: 0.65rem; font-weight: 800;
            text-transform: uppercase; letter-spacing: 0.12em;
            opacity: 0.6; display: block; margin-bottom: 4px;
          }
          .date-chip.active .date-chip-day { opacity: 0.7; }
          .date-chip-num {
            font-size: 1.6rem; font-weight: 900; line-height: 1;
            display: block; margin-bottom: 2px;
          }
          .date-chip-month {
            font-size: 0.72rem; font-weight: 700;
            opacity: 0.55;
          }
          .date-chip.active .date-chip-month { opacity: 0.8; }
          /* Time chips */
          .time-chips {
            display: grid; grid-template-columns: repeat(4, 1fr);
            gap: 8px; margin-bottom: 28px;
          }
          .time-chip {
            padding: 12px 6px; border-radius: 10px;
            border: 2px solid rgba(0,0,0,0.08);
            background: #fafafa; cursor: pointer;
            text-align: center;
            font-family: var(--font-display); font-size: 0.82rem; font-weight: 800;
            transition: all 0.25s;
          }
          .time-chip:hover { border-color: var(--magenta); color: var(--magenta); background: rgba(228,0,124,0.04); }
          .time-chip.active {
            border-color: var(--magenta); background: var(--magenta); color: #fff;
          }
          /* Form inputs */
          .appt-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
          .appt-form-group { display: flex; flex-direction: column; gap: 6px; }
          .appt-form-label {
            font-family: var(--font-display); font-size: 0.68rem; font-weight: 800;
            text-transform: uppercase; letter-spacing: 0.12em; color: #555;
          }
          .appt-form-label span { color: var(--magenta); }
          .appt-input {
            padding: 12px 14px; border-radius: 10px;
            border: 1.5px solid rgba(0,0,0,0.1);
            font-family: var(--font-body); font-size: 0.9rem; outline: none;
            transition: border-color 0.3s, box-shadow 0.3s; background: #fafafa;
          }
          .appt-input:focus { border-color: var(--magenta); box-shadow: 0 0 0 4px rgba(228,0,124,0.07); background: #fff; }
          .appt-btn-submit {
            width: 100%; padding: 16px; border-radius: 14px;
            background: linear-gradient(135deg, var(--magenta) 0%, #c0006a 100%);
            color: #fff; border: none;
            font-family: var(--font-display); font-weight: 900;
            font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.15em;
            cursor: pointer; margin-top: 4px;
            box-shadow: 0 8px 24px rgba(228,0,124,0.35);
            transition: transform 0.2s, box-shadow 0.2s;
            display: flex; align-items: center; justify-content: center; gap: 10px;
          }
          .appt-btn-submit:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(228,0,124,0.45); }
          .appt-btn-submit:active { transform: translateY(0); }
          /* Success state */
          .success-card {
            display: flex; flex-direction: column; align-items: center;
            text-align: center; padding: 40px 20px;
          }
          .success-ring {
            width: 80px; height: 80px; border-radius: 50%;
            background: linear-gradient(135deg, rgba(0,46,81,0.06), rgba(228,0,124,0.06));
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 24px;
            box-shadow: 0 0 0 12px rgba(228,0,124,0.04);
            font-size: 2.2rem; color: var(--magenta);
          }
          .btn-submit { display: none; }
          .form-select { display: none; }
          @media (max-width: 900px) {
            .modal-content { flex-direction: column; }
            .modal-content::before { display: none; }
            .modal-left { width: 100%; padding: 28px; background: #002E51; }
            .time-chips { grid-template-columns: repeat(2, 1fr); }
            .appt-form-row { grid-template-columns: 1fr; }
            .exh-topbar { flex-direction: column; gap: 20px; align-items: stretch; }
            .exhibitors-container { padding: 40px 16px !important; }
            .category-card { padding: 24px; }
            .exh-card-inner { padding: 20px; }
          }
        `}</style>

        <section className="exhibitors-container" style={{ padding: '80px 48px', minHeight: '80vh', background: 'var(--cream)', position: 'relative' }}>
          <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
            
            {/* Top Bar: Back & Search */}
            <div className="exh-topbar" style={{ justifyContent: 'flex-end' }}>
              
              <div className="exh-search-wrapper">
                <Search size={20} className="exh-search-icon" />
                <input 
                  type="text"
                  placeholder="Buscar marca o expositora..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="exh-search-input"
                />
              </div>
            </div>

            <Reveal>
              <div style={{ marginBottom: '64px' }}>
                <h2 className="section__title" style={{ marginTop: '8px' }}>
                  Marcas en <br /><em>{activeCategory}</em>
                </h2>
              </div>
            </Reveal>

            {/* Exhibitors Grid */}
            {filteredExhibitors.length > 0 ? (
              <div className="exh-grid">
                {filteredExhibitors.map((ex, i) => (
                  <Reveal key={ex.id} delay={i * 50}>
                    <div style={{ 
                      background: '#fff', borderRadius: '24px', overflow: 'hidden', 
                      boxShadow: '0 15px 35px rgba(0,25,76,0.06)', display: 'flex',
                      flexDirection: 'column', height: '100%', position: 'relative'
                    }}>
                      <Link href={`/expositores/${ex.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                        {/* COVER PHOTO */}
                        <div style={{ height: '160px', width: '100%', position: 'relative', background: '#f0f0f0' }}>
                          {ex.gallery && ex.gallery.length > 0 && (
                            <img src={ex.gallery[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width="600" height="400" />
                          )}
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                        </div>

                        {/* FLOATING LOGO */}
                        <div style={{ 
                          width: '70px', height: '70px', background: '#fff', borderRadius: '50%', padding: '4px',
                          position: 'absolute', top: '125px', left: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 10,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                        }}>
                          <img src={ex.logo} alt={ex.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} loading="lazy" width="200" height="80" />
                        </div>

                        {/* BODY */}
                        <div style={{ padding: '56px 24px 24px', display: 'flex', flexDirection: 'column' }}>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px', lineHeight: 1.2 }}>{ex.name}</h3>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>por {ex.personName}</p>
                          
                          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--magenta)', fontWeight: 700, fontSize: '0.75rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <MapPin size={14} /> {ex.booth}
                          </p>
                          
                          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '24px' }}>{(ex.description[language] || ex.description.es || ex.description || '').substring(0, 90)}...</p>
                        </div>
                      </Link>

                      {/* ACTIONS */}
                      <div style={{ padding: '0 24px 24px', display: 'flex', gap: '10px', marginTop: 'auto', flexDirection: 'column' }}>
                        <button className="action-btn btn-calendar" onClick={() => openCalendar(ex)} style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'var(--magenta)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.25s, transform 0.2s' }}
                          onMouseOver={e => (e.currentTarget.style.background = 'var(--navy)')}
                          onMouseOut={e => (e.currentTarget.style.background = 'var(--magenta)')}>
                          <Calendar size={15} /> Agendar Cita Presencial
                        </button>
                        <button className="action-btn btn-map" onClick={() => openMap(ex)}>
                          <Map size={16} /> Ver en Mapa
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                <Search size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '8px' }}>No se encontraron expositoras</h3>
                <p>Prueba con otra marca o nombre de expositora.</p>
              </div>
            )}
          </div>
        </section>

        {/* CALENDAR MODAL – PREMIUM REDESIGN */}
        {showCalendar && selectedExhibitor && (
          <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowCalendar(false); }}>
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowCalendar(false)} aria-label="Cerrar">×</button>

              {/* LEFT PANEL */}
              <div className="modal-left">
                <span className="modal-left-tag">Cita Presencial</span>
                <p className="modal-left-title">{selectedExhibitor.name}</p>
                <p className="modal-left-sub">por {selectedExhibitor.personName}</p>
                <div className="modal-left-divider" />
                <div className="modal-left-info-row">
                  <div className="modal-left-info-icon">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <span className="modal-left-info-label">Stand</span>
                    <span className="modal-left-info-val">{selectedExhibitor.booth}</span>
                  </div>
                </div>
                <div className="modal-left-info-row">
                  <div className="modal-left-info-icon">
                    <Calendar size={14} />
                  </div>
                  <div>
                    <span className="modal-left-info-label">Evento</span>
                    <span className="modal-left-info-val">Expo México Mujer 2027</span>
                  </div>
                </div>
                <div className="modal-left-info-row">
                  <div className="modal-left-info-icon">
                    <Clock size={14} />
                  </div>
                  <div>
                    <span className="modal-left-info-label">Duración</span>
                    <span className="modal-left-info-val">30 minutos</span>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="modal-right">
                {appointmentSent ? (
                  <div className="success-card">
                    <div className="success-ring">✓</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--navy)', margin: '0 0 10px' }}>¡Cita Confirmada!</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '28px', fontSize: '0.92rem' }}>
                      Nos vemos el <strong>{appointmentDate === '12' ? 'Viernes 12' : 'Sábado 13'} de Junio</strong> a las <strong>{appointmentTime}</strong>.<br />
                      Te enviamos la confirmación a <strong>{appointmentEmail}</strong>.
                    </p>
                    <button className="appt-btn-submit" style={{ maxWidth: '220px' }} onClick={() => setShowCalendar(false)}>Cerrar</button>
                  </div>
                ) : (
                  <>
                    <span className="modal-section-label">Reserva tu lugar</span>
                    <h3 className="modal-section-title">Elige fecha y hora</h3>

                    {/* Fecha chips */}
                    <div className="date-chips">
                      {[{val:'12', day:'Viernes', num:'12', month:'Jun 2027'}, {val:'13', day:'Sábado', num:'13', month:'Jun 2027'}].map(d => (
                        <div key={d.val} className={`date-chip ${appointmentDate === d.val ? 'active' : ''}`} onClick={() => setAppointmentDate(d.val)}>
                          <span className="date-chip-day">{d.day}</span>
                          <span className="date-chip-num">{d.num}</span>
                          <span className="date-chip-month">{d.month}</span>
                        </div>
                      ))}
                    </div>

                    {/* Horario chips */}
                    <span className="modal-section-label">Horario disponible</span>
                    <div className="time-chips">
                      {[{val:'10:00',label:'10:00 AM'},{val:'11:30',label:'11:30 AM'},{val:'14:00',label:'02:00 PM'},{val:'16:00',label:'04:00 PM'}].map(t => (
                        <div key={t.val} className={`time-chip ${appointmentTime === t.val ? 'active' : ''}`} onClick={() => setAppointmentTime(t.val)}>
                          {t.label}
                        </div>
                      ))}
                    </div>

                    {/* Datos de contacto */}
                    <span className="modal-section-label">Tus datos</span>
                    <div className="appt-form-group" style={{ marginBottom: '14px' }}>
                      <label className="appt-form-label">Nombre completo <span>*</span></label>
                      <input type="text" className="appt-input" placeholder="Ej. Laura González" required
                        value={appointmentName} onChange={e => setAppointmentName(e.target.value)} />
                    </div>
                    <div className="appt-form-row">
                      <div className="appt-form-group">
                        <label className="appt-form-label">Correo <span>*</span></label>
                        <input type="email" className="appt-input" placeholder="correo@ejemplo.com" required
                          value={appointmentEmail} onChange={e => setAppointmentEmail(e.target.value)} />
                      </div>
                      <div className="appt-form-group">
                        <label className="appt-form-label">WhatsApp <span>*</span></label>
                        <input type="tel" className="appt-input" placeholder="+52 55 1234 5678" required
                          value={appointmentPhone} onChange={e => setAppointmentPhone(e.target.value)} />
                      </div>
                    </div>

                    <button className="appt-btn-submit" onClick={() => {
                      if (!appointmentName || !appointmentEmail || !appointmentPhone) {
                        alert('Por favor completa todos los campos.');
                        return;
                      }
                      setAppointmentSent(true);
                    }}>
                      <Calendar size={16} /> Confirmar Cita Presencial
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MAP MODAL */}
        {showMap && selectedExhibitor && (
          <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowMap(false); }}>
            <div className="modal-content" style={{ maxWidth: '800px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--navy)' }}>Ubicación del Stand</h3>
                  <p style={{ color: 'var(--magenta)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginTop: '4px' }}>{selectedExhibitor.booth}</p>
                </div>
                <button className="modal-close" style={{ position: 'static' }} onClick={() => setShowMap(false)} aria-label="Cerrar">×</button>
              </div>
              
              {/* Interactive map placeholder */}
              <div style={{ width: '100%', height: '400px', background: '#e0e5ec', borderRadius: '16px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(var(--navy) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <MapPin size={48} color="var(--magenta)" style={{ margin: '0 auto 16px' }} />
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--navy)', fontSize: '1.2rem' }}>{selectedExhibitor.booth}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Plano interactivo cargando...</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // VISTA 1: Grid de Estados
  return (
    <div className="exhibitors-page">
      <style>{`
        .state-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 280px;
          grid-auto-flow: dense;
          gap: 24px;
        }
        @media (max-width: 1200px) {
          .state-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .state-grid {
            grid-template-columns: repeat(1, 1fr);
            grid-auto-rows: auto;
          }
          .state-card {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            min-height: 240px;
          }
        }
        .state-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          background: #000;
        }
        .state-card:hover .state-img {
          transform: scale(1.05);
          opacity: 0.6;
        }
        .state-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s;
          opacity: 0.8;
        }
        .state-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,46,81,0.9) 0%, rgba(0,46,81,0.2) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
          pointer-events: none;
        }
        .state-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.8rem;
          color: #fff;
          margin: 0 0 8px;
          line-height: 1.1;
          transform: translateY(0);
          transition: transform 0.4s;
        }
        .state-desc {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: rgba(255,255,255,0.7);
          margin: 0;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.4s;
        }
        .state-card:hover .state-title {
          transform: translateY(-5px);
        }
        .state-card:hover .state-desc {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>

      <section style={{ padding: '100px 48px', background: 'var(--cream)', minHeight: '90vh' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' }}>
              <h2 className="section__title section__title--center" style={{ marginTop: '16px' }}>
                Descubre el talento por <br /><em>Categoría de Negocio</em>
              </h2>
              <p className="section__desc section__desc--center">
                Explora las marcas, productos y servicios que las mujeres emprendedoras de México traen a Toronto. Haz clic en una categoría para ver su directorio.
              </p>
            </div>
          </Reveal>

          {/* 1. Stands y Espacios */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center', marginBottom: '120px', marginTop: '60px' }}>
            <Reveal delay={100}>
              <div>
                <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '12px' }}>
                  Infraestructura Premium
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px', lineHeight: 1.15 }}>
                  Stands y Espacios <br /><em>de Exhibición</em>
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '32px' }}>
                  Diseñamos cada espacio para proyectar la máxima presencia corporativa. Nuestros stands de 3x3 y 2x2 metros están completamente equipados con rotulación oficial de la marca, iluminación LED direccional y conexiones eléctricas de 110v listas para usar en el centro de convenciones de Toronto.
                </p>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '2px', background: 'var(--magenta)' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '1px' }}>Montaje Completo</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ borderRadius: '32px', overflow: 'hidden', height: '400px', position: 'relative', boxShadow: '0 20px 40px rgba(0,46,81,0.06)' }}>
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" alt="Stands" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width="800" height="600" />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Centro de Convenciones</span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, margin: '4px 0 0 0', color: 'var(--navy)' }}>Toronto, Canadá 2027</h4>
                </div>
              </div>
            </Reveal>
          </div>

          {/* 1.5 Costos de Stand */}
          <div style={{ marginBottom: '120px' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h2 className="section__title section__title--center" style={{ marginTop: '16px' }}>Adquiere tu <br /><em>Stand</em></h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--navy)', marginTop: '16px', fontWeight: 600 }}>
                  Pueden apartar su lugar con el <strong style={{ color: 'var(--magenta)' }}>50% de anticipo</strong> antes del <strong style={{ color: 'var(--gold)' }}>30 de Agosto</strong>
                </p>
              </div>
            </Reveal>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              
              {/* Tarjeta del Costo Base (Horizontal) */}
              <Reveal delay={100}>
                <div style={{
                  background: '#fff', borderRadius: '24px', padding: '40px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)', borderLeft: '6px solid var(--navy)',
                  display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center'
                }}>
                  {/* Columna Izquierda: Información */}
                  <div style={{ flex: '1 1 350px' }}>
                    <div style={{ color: 'var(--navy)', fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 900, marginBottom: '8px' }}>Stand</div>
                    
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: '16px 0 24px', lineHeight: 1.6 }}>
                      Asegura tu espacio en la Expo México Mujer 2027. Un lugar perfecto para exhibir tus productos y servicios en Norteamérica.
                    </p>
                    
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ display: 'flex', marginBottom: '12px', fontSize: '0.95rem', color: 'var(--text)' }}>
                        <span style={{ color: 'var(--magenta)', marginRight: '12px', fontWeight: 'bold' }}>✓</span> Espacio de 3x3 o 2x2 metros
                      </li>
                      <li style={{ display: 'flex', marginBottom: '12px', fontSize: '0.95rem', color: 'var(--text)' }}>
                        <span style={{ color: 'var(--magenta)', marginRight: '12px', fontWeight: 'bold' }}>✓</span> Iluminación LED direccional
                      </li>
                      <li style={{ display: 'flex', marginBottom: '0', fontSize: '0.95rem', color: 'var(--text)' }}>
                        <span style={{ color: 'var(--magenta)', marginRight: '12px', fontWeight: 'bold' }}>✓</span> Conexión eléctrica de 110v
                      </li>
                    </ul>
                  </div>

                  {/* Columna Derecha: Precio y CTA */}
                  <div style={{ 
                    flex: '0 0 auto', minWidth: '280px', display: 'flex', flexDirection: 'column', 
                    alignItems: 'center', textAlign: 'center', padding: '32px', 
                    background: 'rgba(0,46,81,0.03)', borderRadius: '16px' 
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '12px' }}>Precio Regular</div>
                    <div style={{ color: 'var(--navy)', fontSize: '3.5rem', fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 1, marginBottom: '32px' }}>$2,000 <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>CAD</span></div>
                    
                    <a href="mailto:francisco@expomexico.ca" style={{ 
                      background: 'var(--navy)', color: '#fff', padding: '16px 32px', textAlign: 'center', 
                      borderRadius: '12px', textDecoration: 'none', fontFamily: 'var(--font-display)', fontWeight: 800,
                      textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', transition: 'transform 0.2s, box-shadow 0.2s',
                      boxShadow: '0 10px 20px rgba(0,46,81,0.2)', width: '100%'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 25px rgba(0,46,81,0.3)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,46,81,0.2)'; }}
                    >
                      Reservar con el 50%
                    </a>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>

          {/* 2. Beneficios de participación (Horizontal Cards Layout) */}
          <div style={{ marginBottom: '120px' }}>
            <Reveal delay={100} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ display: 'inline-block', color: 'var(--cyan)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '12px' }}>
                Retorno de Inversión
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.15 }}>
                Beneficios Clave de <br /><em>tu Participación</em>
              </h3>
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              <Reveal delay={150}>
                <div style={{ background: '#fff', padding: '40px 32px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.02)', borderTop: '4px solid var(--cyan)', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ background: 'rgba(0,186,211,0.06)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Folder size={24} color="var(--cyan)" />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 10px 0' }}>Directorio de Expositoras</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>Presencia destacada en el catálogo oficial para compradores y distribuidores en Norteamérica.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div style={{ background: '#fff', padding: '40px 32px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.02)', borderTop: '4px solid var(--magenta)', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ background: 'rgba(228,0,124,0.06)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Megaphone size={24} color="var(--magenta)" />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 10px 0' }}>Campañas de Difusión</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>Aparece en comunicados de prensa binacionales, redes sociales oficiales y cobertura de prensa local.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div style={{ background: '#fff', padding: '40px 32px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.02)', borderTop: '4px solid var(--navy)', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ background: 'rgba(0,25,76,0.04)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Calendar size={24} color="var(--navy)" />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 10px 0' }}>Ruedas de Negocio B2B</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>Agendamiento inteligente de citas uno a uno basado en intereses y perfiles de compradores.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Header del Grid de Estados */}
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' }}>
              <h2 className="section__title section__title--center" style={{ marginTop: '16px' }}>
                Descubre el talento por <br /><em>Categoría de Negocio</em>
              </h2>
              <p className="section__desc section__desc--center">
                Explora las marcas, productos y servicios que las mujeres emprendedoras de México traen a Toronto. Haz clic en una categoría para ver su directorio.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text"
                placeholder="Buscar categoría..."
                value={categorySearchQuery}
                onChange={(e) => setCategorySearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '16px 24px 16px 54px', borderRadius: '30px', border: '1px solid rgba(0,0,0,0.1)',
                  fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}
              />
            </div>
          </div>

          {/* Grid de los Estados */}
          <div className="state-grid" style={{ marginBottom: '80px' }}>
            {businessCategories.filter(c => c.name.toLowerCase().includes(categorySearchQuery.toLowerCase())).map((cat, i) => (
              <Reveal 
                key={cat.name} 
                delay={i * 100} 
                className="state-card"
                onClick={() => {
                  router.push(`/expositores?categoria=${encodeURIComponent(cat.name)}`);
                }}
                style={{
                  gridColumn: cat.size === 'wide' ? 'span 2' : 'span 1',
                  gridRow: cat.size === 'tall' ? 'span 2' : 'span 1',
                }}
              >
                <img src={cat.img} alt={cat.name} className="state-img" loading="lazy" width="600" height="400" />
                <div className="state-overlay">
                  <h3 className="state-title">{cat.name}</h3>
                  <p className="state-desc">{cat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 4. Registro Oficial al final */}
          <Reveal delay={250} style={{ textAlign: 'center', marginTop: '80px' }}>
            <div style={{ background: '#fff', padding: '60px 40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,25,76,0.04)', maxWidth: '900px', margin: '0 auto' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>Registro Oficial de Expositoras</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                Completa el formulario de inscripción oficial para solicitar tu stand de exhibición en Expo México Mujer Toronto.
              </p>
              
              <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', background: '#FAF8F5' }}>
                <iframe
                  id="JotFormIFrame-RegistroExpositores"
                  title="Registro Oficial de Expositoras"
                  src="https://form.jotform.com/241686259021053"
                  frameBorder="0"
                  style={{ width: '100%', height: '700px', border: 'none' }}
                  scrolling="yes"
                  allowFullScreen={true}
                />
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
}

export default function ExpositoresPage() {
  return (
    <React.Suspense fallback={<div style={{ padding: '120px 0', textAlign: 'center', fontFamily: 'var(--font-display)' }}>Cargando directorio...</div>}>
      <ExpositoresContent />
    </React.Suspense>
  );
}
