"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { mexicanStates, mockExhibitors } from '../data/expositores';
import { Search, ChevronLeft, MapPin, Calendar, Clock, Map } from 'lucide-react';

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

function ExpositoresContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [activeState, setActiveState] = useState<string | null>(searchParams ? searchParams.get('estado') : null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateSearchQuery, setStateSearchQuery] = useState('');

  // Update URL when activeState changes to allow sharing links or going back
  useEffect(() => {
    if (activeState) {
      const url = new URL(window.location.href);
      url.searchParams.set('estado', activeState);
      router.replace(url.pathname + url.search, { scroll: false });
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('estado');
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [activeState, router]);
  
  // Modal states for Calendar and Map
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedExhibitor, setSelectedExhibitor] = useState<typeof mockExhibitors[0] | null>(null);
  
  const [appointmentDate, setAppointmentDate] = useState('12');
  const [appointmentTime, setAppointmentTime] = useState('10:00');

  // VISTA 2: Lista de Expositores por Estado
  if (activeState) {
    const stateData = mexicanStates.find(st => st.name === activeState);
    
    // Filtrar expositores
    const filteredExhibitors = mockExhibitors.filter(ex => {
      const matchState = ex.state === activeState;
      const matchSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ex.personName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchState && matchSearch;
    });

    const openCalendar = (ex: typeof mockExhibitors[0]) => {
      setSelectedExhibitor(ex);
      setShowCalendar(true);
    };

    const openMap = (ex: typeof mockExhibitors[0]) => {
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
          
          /* Modals */
          .modal-overlay {
            position: fixed; inset: 0; background: rgba(0,46,81,0.8); backdrop-filter: blur(8px);
            z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px;
          }
          .modal-content {
            background: #fff; border-radius: 24px; width: 100%; max-width: 500px;
            padding: 40px; position: relative; box-shadow: 0 24px 60px rgba(0,0,0,0.2);
          }
          .modal-close {
            position: absolute; top: 24px; right: 24px; background: none; border: none;
            font-size: 24px; cursor: pointer; color: var(--text-muted);
          }
          .form-select {
            width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.1);
            font-family: var(--font-body); font-size: 1rem; margin-top: 8px; outline: none;
          }
          .btn-submit {
            width: 100%; padding: 16px; border-radius: 8px; background: var(--navy); color: #fff;
            border: none; font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
            letter-spacing: 0.1em; margin-top: 24px; cursor: pointer; transition: background 0.3s;
          }
          .btn-submit:hover { background: var(--magenta); }
        `}</style>

        <section className="exhibitors-container" style={{ padding: '80px 48px', minHeight: '80vh', background: 'var(--cream)', position: 'relative' }}>
          <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
            
            {/* Top Bar: Back & Search */}
            <div className="exh-topbar">
              <button 
                className="btn-back"
                onClick={() => { setActiveState(null); setSearchQuery(''); }}
              >
                <ChevronLeft size={24} />
                Volver a Estados
              </button>
              
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
                <span className="section__label">Directorio de Expositores</span>
                <h2 className="section__title" style={{ marginTop: '8px' }}>
                  Marcas en <br /><em>{activeState}</em>
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
                            <img src={ex.gallery[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          )}
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                        </div>

                        {/* FLOATING LOGO */}
                        <div style={{ 
                          width: '70px', height: '70px', background: '#fff', borderRadius: '50%', padding: '4px',
                          position: 'absolute', top: '125px', left: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 10,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                        }}>
                          <img src={ex.logo} alt={ex.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>

                        {/* BODY */}
                        <div style={{ padding: '56px 24px 24px', display: 'flex', flexDirection: 'column' }}>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px', lineHeight: 1.2 }}>{ex.name}</h3>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>por {ex.personName}</p>
                          
                          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--magenta)', fontWeight: 700, fontSize: '0.75rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <MapPin size={14} /> {ex.booth}
                          </p>
                          
                          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '24px' }}>{ex.description.substring(0, 90)}...</p>
                        </div>
                      </Link>

                      {/* ACTIONS */}
                      <div style={{ padding: '0 24px 24px', display: 'flex', gap: '12px', marginTop: 'auto' }}>
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

        {/* CALENDAR MODAL */}
        {showCalendar && selectedExhibitor && (
          <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowCalendar(false); }}>
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowCalendar(false)}>×</button>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '8px' }}>Agendar Cita</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Con <strong>{selectedExhibitor.name}</strong> ({selectedExhibitor.personName})</p>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Día de la cita</label>
                <select className="form-select" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)}>
                  <option value="12">Viernes 12 de Junio, 2027</option>
                  <option value="13">Sábado 13 de Junio, 2027</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Horario disponible</label>
                <select className="form-select" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)}>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>

              <button className="btn-submit" onClick={() => { alert(`Cita solicitada el ${appointmentDate} de Junio a las ${appointmentTime}`); setShowCalendar(false); }}>
                Confirmar Cita
              </button>
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
                <button className="modal-close" style={{ position: 'static' }} onClick={() => setShowMap(false)}>×</button>
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
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          grid-auto-rows: 280px;
          grid-auto-flow: dense;
          gap: 24px;
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
            <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
              <span className="section__label">Directorio de Expositores</span>
              <h2 className="section__title" style={{ marginTop: '16px' }}>
                Descubre el talento por <br /><em>Estados de México</em>
              </h2>
              <p className="section__desc">
                Explora las marcas, productos y servicios que las mujeres emprendedoras de cada región de México traen a Toronto. Haz clic en un estado para ver su directorio.
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text"
                placeholder="Buscar estado..."
                value={stateSearchQuery}
                onChange={(e) => setStateSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '16px 24px 16px 54px', borderRadius: '30px', border: '1px solid rgba(0,0,0,0.1)',
                  fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}
              />
            </div>
          </div>

          <div className="state-grid">
            {mexicanStates.filter(s => s.name.toLowerCase().includes(stateSearchQuery.toLowerCase())).map((state, i) => (
              <Reveal 
                key={state.name} 
                delay={i * 100} 
                className="state-card"
                onClick={() => setActiveState(state.name)}
                style={{
                  gridColumn: state.size === 'wide' ? 'span 2' : 'span 1',
                  gridRow: state.size === 'tall' ? 'span 2' : 'span 1',
                }}
              >
                <img src={state.img} alt={state.name} className="state-img" />
                <div className="state-overlay">
                  <h3 className="state-title">{state.name}</h3>
                  <p className="state-desc">{state.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

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
