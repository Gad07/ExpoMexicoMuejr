"use client";

import React, { useState, useEffect } from 'react';

import { Search, ChevronLeft, MapPin, Calendar, Clock, X, User } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { mexicanStates } from '../data/embajadoras';

/* ─── Reveal Animation Component ─── */
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

/* ─── Main Content ─── */
function EmbajadorasContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const [ambassadors, setAmbassadors] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/embajadoras')
      .then(res => res.json())
      .then(data => {
        if (data.ambassadors) setAmbassadors(data.ambassadors);
      })
      .catch(() => {});
  }, []);

  const activeState = searchParams ? searchParams.get('estado') : null;
  const [searchQuery, setSearchQuery] = useState('');
  const [stateSearchQuery, setStateSearchQuery] = useState('');

  const [showMap, setShowMap] = useState(false);
  const [selectedAmbassador, setSelectedAmbassador] = useState<any | null>(null);

  const openMap = (amb: any) => {
    setSelectedAmbassador(amb);
    setShowMap(true);
  };

  /* ─── VISTA 2: Lista de Embajadoras por Estado ─── */
  if (activeState) {
    const filteredAmbassadors = ambassadors.filter(amb => {
      const matchState = amb.state === activeState;
      const descVal = amb.description && (amb.description[language] || amb.description.es || amb.description || '');
      const matchSearch = amb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          descVal.toLowerCase().includes(searchQuery.toLowerCase());
      return matchState && matchSearch;
    });

    return (
      <div className="embajadoras-page">
        <style>{`
          .emb-topbar {
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
          .emb-search-wrapper { position: relative; width: 100%; max-width: 400px; }
          .emb-search-icon {
            position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted);
          }
          .emb-search-input {
            width: 100%; padding: 14px 20px 14px 48px;
            border-radius: 30px; border: 1px solid rgba(0,0,0,0.1);
            background: #fff; font-family: var(--font-body); font-size: 0.95rem;
            outline: none; transition: border-color 0.3s, box-shadow 0.3s;
          }
          .emb-search-input:focus { border-color: var(--cyan); box-shadow: 0 0 0 4px rgba(0,186,211,0.1); }
          .emb-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 28px;
          }
          .emb-card {
            background: #fff; border-radius: 24px; overflow: hidden;
            box-shadow: 0 15px 35px rgba(0,25,76,0.06);
            display: flex; flex-direction: column;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .emb-card:hover { transform: translateY(-6px); box-shadow: 0 25px 50px rgba(0,25,76,0.1); }
          .emb-photo-wrapper {
            width: 100%; height: 220px; position: relative; overflow: hidden; background: #f0f0f0;
          }
          .emb-photo-wrapper img {
            width: 100%; height: 100%; object-fit: cover; object-position: top;
            transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .emb-card:hover .emb-photo-wrapper img { transform: scale(1.04); }
          .emb-photo-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to top, rgba(0,46,81,0.5), transparent 60%);
          }
          .emb-body { padding: 24px 24px 16px; flex: 1; }
          .emb-name {
            font-family: var(--font-display); font-size: 1.25rem; font-weight: 800;
            color: var(--navy); margin: 0 0 4px;
          }
          .emb-state {
            display: inline-flex; align-items: center; gap: 5px;
            color: var(--magenta); font-weight: 700; font-size: 0.75rem;
            text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;
          }
          .emb-desc {
            font-size: 0.88rem; line-height: 1.65; color: var(--text); margin: 0;
          }
          .emb-actions {
            padding: 16px 24px 24px;
            display: flex; flex-direction: column; gap: 10px;
          }
          .btn-map-emb {
            display: flex; align-items: center; justify-content: center; gap: 8px;
            padding: 10px 16px; border-radius: 10px; border: none; cursor: pointer;
            font-family: var(--font-display); font-weight: 700; font-size: 0.72rem;
            text-transform: uppercase; letter-spacing: 0.1em;
            background: rgba(0,46,81,0.06); color: var(--navy);
            transition: background 0.25s;
          }
          .btn-map-emb:hover { background: var(--navy); color: #fff; }

          /* Modal */
          .modal-overlay {
            position: fixed; inset: 0; background: rgba(0,46,81,0.8); backdrop-filter: blur(8px);
            z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px;
          }
          .modal-box {
            background: #fff; border-radius: 24px; width: 100%; max-width: 480px;
            padding: 40px; position: relative; box-shadow: 0 32px 80px rgba(0,0,0,0.25);
            max-height: 90vh; overflow-y: auto;
          }
          .modal-close-btn {
            position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.05);
            border: none; width: 44px; height: 44px; border-radius: 50%; cursor: pointer;
            display: flex; align-items: center; justify-content: center; color: var(--navy);
            transition: background 0.2s;
          }
          .modal-close-btn:hover { background: rgba(228,0,124,0.1); color: var(--magenta); }
          .modal-title {
            font-family: var(--font-display); font-size: 1.6rem; color: var(--navy); margin: 0 0 4px;
          }
          .modal-subtitle { color: var(--text-muted); margin: 0 0 28px; font-size: 0.9rem; }
          .form-group-modal { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
          .form-label-modal {
            font-family: var(--font-display); font-weight: 800; font-size: 0.75rem;
            text-transform: uppercase; letter-spacing: 0.1em; color: #333;
          }
          .form-label-modal span { color: var(--magenta); }
          .form-input-modal {
            padding: 13px 16px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.12);
            font-family: var(--font-body); font-size: 0.92rem; outline: none;
            transition: border-color 0.3s, box-shadow 0.3s;
          }
          .form-input-modal:focus { border-color: var(--magenta); box-shadow: 0 0 0 3px rgba(228,0,124,0.08); }
          .form-select-modal {
            padding: 13px 16px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.12);
            font-family: var(--font-body); font-size: 0.92rem; outline: none;
            background: #fff; appearance: none;
          }
          .btn-submit-modal {
            width: 100%; padding: 16px; border-radius: 10px; background: var(--navy); color: #fff;
            border: none; font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
            letter-spacing: 0.1em; margin-top: 8px; cursor: pointer; transition: background 0.3s;
            font-size: 0.82rem;
          }
          .btn-submit-modal:hover { background: var(--magenta); }
          .success-box { text-align: center; padding: 20px 0; }
          .success-icon {
            width: 64px; height: 64px; border-radius: 50%; background: rgba(0,46,81,0.05);
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 20px; color: var(--magenta); font-size: 2rem;
          }

          /* ── PREMIUM MODAL SHARED ── */
          .modal-overlay {
            position: fixed; inset: 0;
            background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
            z-index: 200; display: flex; align-items: center; justify-content: center;
            padding: 20px; animation: fadeInOverlay 0.3s ease;
          }
          @keyframes fadeInOverlay { from { opacity:0; } to { opacity:1; } }
          .modal-content {
            background: #fff;
            border-radius: 28px; width: 100%; max-width: 820px;
            position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.35);
            display: flex; align-items: stretch; overflow: hidden;
            animation: slideUpModal 0.4s cubic-bezier(0.16,1,0.3,1); max-height: 92vh;
          }
          .modal-content::before {
            content: ''; position: absolute;
            left: 0; top: 0; bottom: 0; width: 240px;
            background: #002E51; z-index: 0; pointer-events: none;
          }
          @keyframes slideUpModal { from { opacity:0; transform:translateY(30px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
          .modal-left {
            width: 240px; flex-shrink: 0;
            padding: 40px 28px; display: flex; flex-direction: column;
            position: relative; z-index: 1;
            overflow: hidden;
            align-self: stretch;
          }
          .modal-left::before {
            content:''; position:absolute; bottom:-60px; right:-60px;
            width:200px; height:200px;
            background: radial-gradient(circle, rgba(228,0,124,0.3) 0%, transparent 70%);
            border-radius:50%;
          }
          .modal-left-tag {
            display:inline-block; background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.7);
            font-family:var(--font-display); font-weight:800; font-size:0.65rem;
            text-transform:uppercase; letter-spacing:0.2em;
            padding:5px 12px; border-radius:100px; margin-bottom:20px;
          }
          .modal-left-title { font-family:var(--font-display); font-size:1.35rem; font-weight:900; color:#fff; line-height:1.15; margin:0 0 8px; }
          .modal-left-sub { font-size:0.82rem; color:rgba(255,255,255,0.55); margin:0 0 28px; }
          .modal-left-divider { height:1px; background:rgba(255,255,255,0.12); margin-bottom:24px; }
          .modal-left-info-row { display:flex; align-items:flex-start; gap:10px; margin-bottom:16px; }
          .modal-left-info-icon {
            width:28px; height:28px; border-radius:8px; background:rgba(255,255,255,0.08);
            display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--cyan);
          }
          .modal-left-info-label { font-family:var(--font-display); font-size:0.65rem; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; color:rgba(255,255,255,0.4); display:block; margin-bottom:2px; }
          .modal-left-info-val { font-size:0.82rem; color:rgba(255,255,255,0.9); line-height:1.4; }
          .modal-right { flex:1; padding:40px; overflow-y:auto; }
          .modal-close {
            position:absolute; top:16px; right:16px; width:44px; height:44px; border-radius:50%;
            background:rgba(0,0,0,0.06); border:none; cursor:pointer;
            display:flex; align-items:center; justify-content:center;
            color:#666; font-size:18px; z-index:10; transition:background 0.2s, color 0.2s;
          }
          .modal-close:hover { background:rgba(228,0,124,0.1); color:var(--magenta); }
          .modal-section-label { font-family:var(--font-display); font-size:0.7rem; font-weight:800; text-transform:uppercase; letter-spacing:0.18em; color:var(--magenta); margin-bottom:14px; display:block; }
          .modal-section-title { font-family:var(--font-display); font-size:1.4rem; font-weight:900; color:var(--navy); margin:0 0 24px; }
          .date-chips { display:flex; gap:10px; margin-bottom:28px; flex-wrap:wrap; }
          .date-chip {
            flex:1; min-width:120px; padding:14px 12px; border-radius:14px;
            border:2px solid rgba(0,0,0,0.08); background:#fafafa; cursor:pointer;
            text-align:center; transition:all 0.25s; font-family:var(--font-display);
          }
          .date-chip:hover { border-color:var(--navy); background:rgba(0,46,81,0.03); }
          .date-chip.active { border-color:var(--navy); background:var(--navy); color:#fff; }
          .date-chip-day { font-size:0.65rem; font-weight:800; text-transform:uppercase; letter-spacing:0.12em; opacity:0.6; display:block; margin-bottom:4px; }
          .date-chip.active .date-chip-day { opacity:0.7; }
          .date-chip-num { font-size:1.6rem; font-weight:900; line-height:1; display:block; margin-bottom:2px; }
          .date-chip-month { font-size:0.72rem; font-weight:700; opacity:0.55; }
          .date-chip.active .date-chip-month { opacity:0.8; }
          .time-chips { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:28px; }
          .time-chip {
            padding:12px 6px; border-radius:10px; border:2px solid rgba(0,0,0,0.08);
            background:#fafafa; cursor:pointer; text-align:center;
            font-family:var(--font-display); font-size:0.82rem; font-weight:800; transition:all 0.25s;
          }
          .time-chip:hover { border-color:var(--magenta); color:var(--magenta); background:rgba(228,0,124,0.04); }
          .time-chip.active { border-color:var(--magenta); background:var(--magenta); color:#fff; }
          .appt-form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
          .appt-form-group { display:flex; flex-direction:column; gap:6px; }
          .appt-form-label { font-family:var(--font-display); font-size:0.68rem; font-weight:800; text-transform:uppercase; letter-spacing:0.12em; color:#555; }
          .appt-form-label span { color:var(--magenta); }
          .appt-input {
            padding:12px 14px; border-radius:10px; border:1.5px solid rgba(0,0,0,0.1);
            font-family:var(--font-body); font-size:0.9rem; outline:none;
            transition:border-color 0.3s, box-shadow 0.3s; background:#fafafa;
          }
          .appt-input:focus { border-color:var(--magenta); box-shadow:0 0 0 4px rgba(228,0,124,0.07); background:#fff; }
          .appt-btn-submit {
            width:100%; padding:16px; border-radius:14px;
            background:linear-gradient(135deg, var(--magenta) 0%, #c0006a 100%);
            color:#fff; border:none; font-family:var(--font-display); font-weight:900;
            font-size:0.82rem; text-transform:uppercase; letter-spacing:0.15em;
            cursor:pointer; margin-top:4px;
            box-shadow:0 8px 24px rgba(228,0,124,0.35);
            transition:transform 0.2s, box-shadow 0.2s;
            display:flex; align-items:center; justify-content:center; gap:10px;
          }
          .appt-btn-submit:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(228,0,124,0.45); }
          .success-card { display:flex; flex-direction:column; align-items:center; text-align:center; padding:40px 20px; }
          .success-ring {
            width:80px; height:80px; border-radius:50%;
            background:linear-gradient(135deg, rgba(0,46,81,0.06), rgba(228,0,124,0.06));
            display:flex; align-items:center; justify-content:center;
            margin-bottom:24px; box-shadow:0 0 0 12px rgba(228,0,124,0.04);
            font-size:2.2rem; color:var(--magenta);
          }
          @media (max-width: 900px) {
            .modal-content { flex-direction: column; }
            .modal-content::before { display: none; }
            .modal-left { width: 100%; padding: 28px; background: #002E51; }
            .time-chips { grid-template-columns: repeat(2, 1fr); }
            .appt-form-row { grid-template-columns: 1fr; }
            .emb-topbar { flex-direction: column; gap: 20px; align-items: stretch; }
            .exhibitors-container { padding: 40px 16px !important; }
            .emb-state-card { padding: 24px; }
            .emb-card { padding: 24px; }
          }
        `}</style>

        <section className="exhibitors-container" style={{ padding: '80px 48px', minHeight: '80vh', background: 'var(--cream)', position: 'relative' }}>
          <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>

            {/* Topbar */}
            <div className="emb-topbar" style={{ justifyContent: 'flex-end' }}>
              
              <div className="emb-search-wrapper">
                <Search size={20} className="emb-search-icon" />
                <input
                  type="text"
                  placeholder={t('pages.embajadoras.buscarEmbajadora')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="emb-search-input"
                />
              </div>
            </div>

            <Reveal>
              <div style={{ marginBottom: '56px' }}>
                <h2 className="section__title" style={{ marginTop: '8px' }}>
                  {t('pages.embajadoras.embajadorasDe')} <br /><em>{activeState}</em>
                </h2>
              </div>
            </Reveal>

            {/* Grid de tarjetas */}
            {filteredAmbassadors.length > 0 ? (
              <div className="emb-grid">
                {filteredAmbassadors.map((amb, i) => (
                  <Reveal key={amb.id} delay={i * 60}>
                    <div className="emb-card" style={{ cursor: 'pointer' }} onClick={() => router.push('/embajadoras/' + amb.slug)}>
                      {/* Foto */}
                      <div className="emb-photo-wrapper">
                        <img src={amb.photo} alt={amb.name} loading="lazy" width="120" height="120" />
                        <div className="emb-photo-overlay" />
                      </div>

                      {/* Cuerpo */}
                      <div className="emb-body">
                        <h3 className="emb-name">{amb.name}</h3>
                        <p className="emb-state"><MapPin size={13} /> {amb.state}</p>
                        <p className="emb-desc">{amb.description && (amb.description[language] || amb.description.es || amb.description)}</p>
                      </div>

                      {/* Acciones */}
                      <div className="emb-actions">
                        <button className="btn-map-emb" onClick={(e) => { e.stopPropagation(); openMap(amb); }}>
                          <MapPin size={15} />
                          {t('pages.embajadoras.verUbicacion')}
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                <User size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '8px' }}>
                  {t('pages.embajadoras.noHayEmbajadoras')}
                </h3>
                <p>{t('pages.embajadoras.proximamente')} {activeState}.</p>
              </div>
            )}
          </div>
        </section>


        {/* POPUP: Ver Ubicación */}
        {showMap && selectedAmbassador && (
          <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowMap(false); }}>
            <div className="modal-box" style={{ maxWidth: '700px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--navy)', margin: 0 }}>{t('pages.embajadoras.ubicacion')}</h3>
                  <p style={{ color: 'var(--magenta)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', margin: '4px 0 0' }}>
                    {selectedAmbassador.booth}
                  </p>
                </div>
                <button className="modal-close-btn" style={{ position: 'static' }} onClick={() => setShowMap(false)} aria-label="Cerrar mapa">
                  <X size={18} />
                </button>
              </div>

              <div style={{ width: '100%', height: '340px', background: '#e0e5ec', borderRadius: '16px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(var(--navy) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <MapPin size={48} color="var(--magenta)" style={{ margin: '0 auto 16px' }} />
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--navy)', fontSize: '1.1rem' }}>{selectedAmbassador.booth}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('pages.embajadoras.planoInteractivo')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─── VISTA 1: Grid de Estados ─── */
  return (
    <div className="embajadoras-page">
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
          position: relative; border-radius: 24px; overflow: hidden;
          cursor: pointer; background: #000;
        }
        .state-card:hover .state-img { transform: scale(1.05); opacity: 0.6; }
        .state-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s; opacity: 0.8;
        }
        .state-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,46,81,0.9) 0%, rgba(0,46,81,0.2) 50%, transparent 100%);
          display: flex; flex-direction: column; justify-content: flex-end; padding: 32px;
          pointer-events: none;
        }
        .state-title {
          font-family: var(--font-display); font-weight: 800; font-size: 1.8rem;
          color: #fff; margin: 0 0 8px; line-height: 1.1;
          transform: translateY(0); transition: transform 0.4s;
        }
        .state-desc {
          font-family: var(--font-body); font-size: 0.95rem; color: rgba(255,255,255,0.7); margin: 0;
          transform: translateY(20px); opacity: 0; transition: all 0.4s;
        }
        .state-card:hover .state-title { transform: translateY(-5px); }
        .state-card:hover .state-desc { transform: translateY(0); opacity: 1; }
      `}</style>

      <section style={{ padding: '100px 48px', background: 'var(--cream)', minHeight: '90vh' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>

          {/* Convocatoria Inicial */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'start', marginBottom: '100px' }}>
            <Reveal delay={100}>
              <div>
                <h3 className="section__title">
                  {t('pages.embajadoras.embajadorasDe')} <br /><em>Expo México Mujer</em>
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '32px' }}>
                  {t('pages.embajadoras.busquedaDesc')} 
                </p>

                {/* Requisitos y Fechas en dos sub-columnas */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '24px' }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--navy)', fontWeight: 800, marginBottom: '12px' }}>{t('pages.embajadoras.requisitos')}</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--magenta)' }}>•</span> {t('pages.embajadoras.req1')}</li>
                      <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--magenta)' }}>•</span> {t('pages.embajadoras.req2')}</li>
                      <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--magenta)' }}>•</span> {t('pages.embajadoras.req3')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--navy)', fontWeight: 800, marginBottom: '12px' }}>{t('pages.embajadoras.fechasClave')}</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--magenta)' }}>•</span> <strong>{t('pages.embajadoras.aperturaLabel')}</strong> {t('pages.embajadoras.aperturaVal')}</li>
                      <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--magenta)' }}>•</span> <strong>{t('pages.embajadoras.cierreLabel')}</strong> {t('pages.embajadoras.cierreVal')}</li>
                      <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--magenta)' }}>•</span> <strong>{t('pages.embajadoras.resultadosLabel')}</strong> {t('pages.embajadoras.resultadosVal')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ borderRadius: '32px', overflow: 'hidden', height: '480px', position: 'relative', boxShadow: '0 20px 40px rgba(0,46,81,0.06)' }}>
                <img src="/Galeria/Arte_y_Cultura/IMG_5945.JPG" alt="Embajadoras Convocatoria" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width="600" height="400" />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('pages.embajadoras.conexionBinacional')}</span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, margin: '4px 0 0 0', color: 'var(--navy)' }}>{t('pages.embajadoras.representacionOficial')}</h4>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px', paddingTop: '80px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <h2 className="section__title section__title--center" style={{ marginTop: '16px' }}>
                {t('pages.embajadoras.conoceEmbajadoras')}
              </h2>
              <p className="section__desc section__desc--center">
                {t('pages.embajadoras.conoceEmbajadorasDesc')}
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder={t('pages.embajadoras.buscarEstado')}
                value={stateSearchQuery}
                onChange={e => setStateSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '16px 24px 16px 54px', borderRadius: '30px',
                  border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'var(--font-body)',
                  fontSize: '1rem', outline: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}
              />
            </div>
          </div>

          <div className="state-grid">
            {mexicanStates
              .filter(s => {
                return s.name.toLowerCase().includes(stateSearchQuery.toLowerCase());
              })
              .map((state, i) => {
                return (
                  <Reveal
                    key={state.name}
                    delay={i * 80}
                    className="state-card"
                    onClick={() => {
                      router.push(`/embajadoras?estado=${encodeURIComponent(state.name)}`);
                    }}
                    style={{
                      gridColumn: state.size === 'wide' ? 'span 2' : 'span 1',
                      gridRow: state.size === 'tall' ? 'span 2' : 'span 1',
                    }}
                  >
                    <img src={state.img} alt={state.name} className="state-img" loading="lazy" width="600" height="400" />
                    <div className="state-overlay">
                      <h3 className="state-title">{state.name}</h3>
                      <p className="state-desc">{state.desc}</p>
                    </div>
                  </Reveal>
                );
              })
            }
          </div>

          {/* Registro Oficial al final (Jotform) */}
          <Reveal delay={250} style={{ textAlign: 'center', marginTop: '100px' }}>
            <div style={{ background: '#fff', padding: '60px 40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,25,76,0.04)', maxWidth: '900px', margin: '0 auto' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px' }}>{t('pages.embajadoras.registroEmbajadoras')}</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                {t('pages.embajadoras.registroEmbajadorasDesc')}
              </p>
              
              <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', background: '#FAF8F5' }}>
                <iframe
                  id="JotFormIFrame-RegistroEmbajadoras"
                  title="Registro Oficial de Embajadoras"
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

export default function EmbajadorasPage() {
  const { t } = useLanguage();
  return (
    <React.Suspense fallback={
      <div style={{ padding: '120px 0', textAlign: 'center', fontFamily: 'var(--font-display)' }}>
        {t('pages.embajadoras.cargandoEmbajadoras')}
      </div>
    }>
      <EmbajadorasContent />
    </React.Suspense>
  );
}
