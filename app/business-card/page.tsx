"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

/* ─── Reveal ── */
function Reveal({ children, delay = 0, className = "", style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } },
      { threshold: 0.06 }
    );
    o.observe(el); return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{
        ...style,
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}>
      {children}
    </div>
  );
}

/* ─── Datos ── */
const DIRECTOR = {
  nombre: "Lucía Martínez Reyes",
  cargo: "Directora General",
  empresa: "Expo México Mujer",
  ciudad: "Toronto, Canadá · CDMX",
  email: "lucia@expomexico.ca",
  telefono: "+1 (416) 555-0192",
  website: "expomexico.ca",
  linkedin: "linkedin.com/in/lucia-martinez",
  instagram: "@expomexico_mujer",
  bio: "Líder visionaria con más de 15 años conectando el talento femenino mexicano con oportunidades binacionales en Canadá. Fundadora de la plataforma más importante de negocios y cultura mexicana en Toronto.",
  foto: "/directora-emm.png",
};

/* ─── Noticias Mock ── */
const NOTICIAS = [
  {
    fecha: "15 MAYO 2026",
    categoria: "Institucional",
    titulo: "Expo México Mujer 2027 anuncia su sede en el corazón de Toronto",
    excerpt: "La edición de este año tomará lugar en el centro de convenciones más prestigioso, esperando recibir a más de 500 líderes.",
    link: "#",
    img: "/Galeria/Ponencias/IMG_6323.JPG",
  },
  {
    fecha: "28 ABRIL 2026",
    categoria: "Participación",
    titulo: "Lucía Martínez Reyes en el Foro Binacional de Comercio",
    excerpt: "Nuestra directora general fue panelista destacada hablando sobre la exportación del talento mexicano hacia Norteamérica.",
    link: "#",
    img: "/Galeria/Ponencias/IMG_6117.JPG",
  },
  {
    fecha: "10 ABRIL 2026",
    categoria: "Convocatoria",
    titulo: "Apertura de registros para expositoras 2027 supera expectativas",
    excerpt: "En la primera semana de registro, más de 200 empresas lideradas por mujeres han asegurado su espacio para el evento.",
    link: "#",
    img: "/Galeria/Ponencias/IMG_5999.JPG",
  },
];

/* ─── Iconos ── */
const Icons = {
  Mail:      () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Phone:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.18z"/></svg>,
  Globe:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  LinkedIn:  () => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  Instagram: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  MapPin:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Share:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
};

/* ─── PAGE ── */
export default function BusinessCardPage() {
  const [copied, setCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText(DIRECTOR.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        /* ═══ RESPONSIVE PROFILE PAGE ═══ */

        /* Hero layout */
        .bc-hero {
          position: relative;
          background: var(--cream);
          min-height: 100vh;
          display: flex;
          overflow: hidden;
        }

        /* Photo panel — desktop: right 45% */
        .bc-hero__photo-panel {
          flex: 0 0 45%;
          position: relative;
          overflow: hidden;
        }
        .bc-hero__photo {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }
        /* Overlays to blend photo into background on desktop */
        .bc-hero__photo-overlay-left {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(to right, var(--cream) 0%, transparent 40%);
          pointer-events: none;
        }
        .bc-hero__photo-overlay-tb {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(to bottom, var(--cream) 0%, transparent 15%, transparent 85%, var(--cream) 100%);
          pointer-events: none;
        }

        /* Content panel */
        .bc-hero__content {
          flex: 1 1 500px;
          display: flex; flex-direction: column; justify-content: center;
          padding: 140px 7% 100px;
          position: relative; z-index: 3;
        }
        .bc-hero__name {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(2.8rem, 5.5vw, 6.5rem);
          line-height: 0.92; color: var(--navy);
          text-transform: uppercase;
          letter-spacing: -0.03em;
          margin: 0 0 16px;
        }
        .bc-hero__name span { display: block; }
        .bc-hero__cargo {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 12px;
        }
        .bc-hero__cargo-line { width: 28px; height: 2px; background: var(--magenta); flex-shrink: 0; }
        .bc-hero__cargo-text {
          font-family: var(--font-body);
          font-weight: 700; font-size: 0.85rem;
          color: var(--magenta);
          letter-spacing: 0.16em; text-transform: uppercase;
        }
        .bc-hero__city {
          display: flex; align-items: center; gap: 7px;
          font-family: var(--font-body); font-size: 0.85rem;
          color: var(--text-muted); margin-bottom: 32px;
        }
        .bc-hero__bio {
          font-family: var(--font-body);
          font-size: 1.05rem; line-height: 1.75;
          color: var(--navy); opacity: 0.7;
          max-width: 50ch; margin: 0 0 40px; font-weight: 300;
        }

        /* Contact links */
        .bc-links { display: flex; flex-direction: column; gap: 10px; max-width: 440px; }
        .bc-link {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 20px;
          background: #fff;
          border: 1px solid rgba(0,46,81,0.06);
          box-shadow: 0 4px 12px rgba(0,46,81,0.03);
          text-decoration: none; color: var(--navy);
          font-family: var(--font-body); font-size: 0.9rem;
          transition: background 0.3s, border-color 0.3s, transform 0.25s, box-shadow 0.25s;
        }
        .bc-link:hover {
          background: var(--navy); color: #fff;
          border-color: var(--navy); transform: translateX(6px);
          box-shadow: 0 8px 24px rgba(0,46,81,0.1);
        }
        .bc-link:hover .bc-link__icon { color: var(--cyan); }
        .bc-link__icon { color: var(--cyan); flex-shrink: 0; }

        /* Social buttons */
        .bc-socials { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .bc-social {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 24px;
          font-family: var(--font-display);
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; cursor: pointer; border: none;
          transition: transform 0.25s, background 0.25s;
        }
        .bc-social--li  { background: var(--navy);  color: #fff; }
        .bc-social--li:hover  { background: #003d70; transform: translateY(-2px); }
        .bc-social--ig  { background: linear-gradient(135deg,#E4007C,#d4a849); color:#fff; }
        .bc-social--ig:hover  { transform: translateY(-2px); }
        .bc-social--share { background: transparent; border: 1.5px solid var(--navy); color: var(--navy); }
        .bc-social--share:hover { background: var(--navy); color: #fff; transform: translateY(-2px); }

        /* News Cards */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 48px;
        }
        .news-card {
          background: #fff;
          border: 1px solid var(--line, rgba(24,20,14,0.08));
          display: flex; flex-direction: column;
          box-shadow: 0 4px 24px rgba(0,46,81,0.06);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s;
          text-decoration: none;
          overflow: hidden;
        }
        .news-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 60px rgba(0,46,81,0.12);
        }
        .news-card__img {
          width: 100%; height: 220px;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .news-card:hover .news-card__img {
          transform: scale(1.05);
        }
        .news-card__content {
          padding: 32px 28px;
          display: flex; flex-direction: column; flex: 1;
        }
        .news-card__meta {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px;
        }
        .news-card__cat {
          font-family: var(--font-body); font-weight: 700;
          font-size: 0.7rem; color: var(--magenta);
          letter-spacing: 0.15em; text-transform: uppercase;
        }
        .news-card__date {
          font-family: var(--font-body);
          font-size: 0.7rem; color: var(--text-muted);
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .news-card__title {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.4rem; color: var(--navy); line-height: 1.15;
          letter-spacing: -0.01em; margin: 0 0 12px;
        }
        .news-card__excerpt {
          font-family: var(--font-body); font-size: 0.95rem;
          line-height: 1.6; color: rgba(0,46,81,0.65);
          margin: 0 0 24px;
        }
        .news-card__link {
          margin-top: auto;
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-display); font-weight: 700;
          font-size: 0.75rem; color: var(--cyan);
          letter-spacing: 0.15em; text-transform: uppercase;
          transition: gap 0.3s;
        }
        .news-card:hover .news-card__link { gap: 14px; }


        /* ── MOBILE breakpoint ── */
        @media (max-width: 900px) {
          /* Hero switches to a block layout: photo on top, content below */
          .bc-hero {
            flex-direction: column;
            min-height: auto;
            background: #fff;
          }
          
          .bc-hero__photo-panel {
            flex: none;
            width: 100%;
            height: 400px; /* Fixed height for photo block on mobile */
          }
          .bc-hero__photo-overlay-left, .bc-hero__photo-overlay-tb { 
            display: none; /* No fading out the photo on mobile, let it be clear */
          }

          .bc-hero__content {
            flex: none;
            padding: 48px 6% 80px;
            background: #fff; /* Clean white background for the text */
            margin-top: -30px; /* Slight overlap for styling */
            border-radius: 24px 24px 0 0;
            box-shadow: 0 -10px 40px rgba(0,0,0,0.05);
          }
          
          .bc-hero__name { font-size: clamp(2.6rem, 11vw, 3.5rem); }
          .bc-hero__bio { max-width: 100%; font-size: 1rem; }
          .bc-links { max-width: 100%; }
          .bc-socials { flex-direction: column; }
          .bc-social { justify-content: center; width: 100%; }
        }

        @media (max-width: 600px) {
          .bc-hero__photo-panel { height: 320px; }
          .bc-hero__content { padding: 40px 6% 60px; }
          .bc-hero__name { font-size: 2.8rem; }
        }

        @keyframes bc-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* ═══════════════════════════════════════
          HERO — Perfil (Desktop: Split / Mobile: Stack)
      ═══════════════════════════════════════ */}
      <section className="bc-hero" aria-label="Perfil Directora EMM">

        {/* Panel de foto */}
        <div className="bc-hero__photo-panel">
          <div className="bc-hero__photo-overlay-left" aria-hidden="true" />
          <div className="bc-hero__photo-overlay-tb"   aria-hidden="true" />
          <img src={DIRECTOR.foto} alt={`Foto de ${DIRECTOR.nombre}`} className="bc-hero__photo" />
        </div>

        {/* Panel de contenido */}
        <div className="bc-hero__content">

          {/* Badge org */}
          <Reveal delay={50}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--magenta)", display: "inline-block", animation: "bc-pulse 2s ease-in-out infinite" }} />
              <span className="section__label" style={{ margin: 0 }}>Expo México Mujer 2027</span>
            </div>
          </Reveal>

          {/* Nombre */}
          <Reveal delay={100}>
            <h1 className="bc-hero__name">
              {DIRECTOR.nombre.split(" ").map((w, i) => <span key={i}>{w}</span>)}
            </h1>
          </Reveal>

          {/* Cargo */}
          <Reveal delay={180}>
            <div className="bc-hero__cargo">
              <div className="bc-hero__cargo-line" />
              <span className="bc-hero__cargo-text">{DIRECTOR.cargo} — {DIRECTOR.empresa}</span>
            </div>
          </Reveal>

          {/* Ciudad */}
          <Reveal delay={220}>
            <p className="bc-hero__city"><Icons.MapPin /> {DIRECTOR.ciudad}</p>
          </Reveal>

          {/* Bio */}
          <Reveal delay={290}>
            <p className="bc-hero__bio">{DIRECTOR.bio}</p>
          </Reveal>

          {/* Links de contacto */}
          <Reveal delay={360}>
            <div className="bc-links">
              <a href={`mailto:${DIRECTOR.email}`}  className="bc-link" id="link-email">
                <span className="bc-link__icon"><Icons.Mail /></span>{DIRECTOR.email}
              </a>
              <a href={`tel:${DIRECTOR.telefono}`}  className="bc-link" id="link-telefono">
                <span className="bc-link__icon"><Icons.Phone /></span>{DIRECTOR.telefono}
              </a>
              <a href={`https://${DIRECTOR.website}`} target="_blank" rel="noopener noreferrer" className="bc-link" id="link-website">
                <span className="bc-link__icon"><Icons.Globe /></span>{DIRECTOR.website}
              </a>
            </div>
          </Reveal>

          {/* Botones sociales */}
          <Reveal delay={430}>
            <div className="bc-socials">
              <a href={`https://${DIRECTOR.linkedin}`} target="_blank" rel="noopener noreferrer"
                className="bc-social bc-social--li" id="btn-linkedin">
                <Icons.LinkedIn /> LinkedIn
              </a>
              <a href={`https://instagram.com/${DIRECTOR.instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer"
                className="bc-social bc-social--ig" id="btn-instagram">
                <Icons.Instagram /> Instagram
              </a>
              <button className="bc-social bc-social--share bc-noprint" id="btn-compartir" onClick={copyEmail}>
                {copied ? "✓ Copiado" : <><Icons.Share /> Compartir</>}
              </button>
            </div>
          </Reveal>
        </div>

      </section>

      {/* ═══════════════════════════════════════
          SECCIÓN NOTICIAS — 3 cards
      ═══════════════════════════════════════ */}
      <section className="section section--alt" aria-label="Noticias y Actualidad">
        <div className="section__inner">

          <Reveal>
            <span className="section__label">Actualidad y Prensa</span>
            <h2 className="section__title">Noticias <em>relevantes</em></h2>
            <p className="section__desc">
              Mantente al tanto de las últimas novedades sobre la participación de nuestra directora y los avances rumbo a Expo México Mujer 2027.
            </p>
          </Reveal>

          <div className="news-grid">
            {NOTICIAS.map((n, i) => (
              <Reveal key={i} delay={i * 100} style={{ height: "100%" }}>
                <a href={n.link} className="news-card">
                  <div style={{ overflow: "hidden" }}>
                    <img src={n.img} alt={n.titulo} className="news-card__img" />
                  </div>
                  <div className="news-card__content">
                    <div className="news-card__meta">
                      <span className="news-card__cat">{n.categoria}</span>
                      <span style={{ color: "var(--line)", fontSize: "10px" }}>•</span>
                      <span className="news-card__date">{n.fecha}</span>
                    </div>
                    <h3 className="news-card__title">{n.titulo}</h3>
                    <p className="news-card__excerpt">{n.excerpt}</p>
                    <span className="news-card__link">Leer nota completa <ArrowRight size={14} /></span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
