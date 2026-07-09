'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, ExternalLink, Mail, CheckCircle2 } from 'lucide-react';
import { mexicanStates } from './data/expositores';
import { WordMark, Mariposa, DecoMariposa, ArrowDown } from '../components/BrandAssets';
import Hero from '../components/Hero';
import Link from 'next/link';
/* ══════════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════════ */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}


/* ══════════════════════════════════════════════════════════════
   REVEAL WRAPPER
══════════════════════════════════════════════════════════════ */
function Reveal({
  children, className = '', delay = 0, onClick, style = {},
}: { children: React.ReactNode; className?: string; delay?: number; onClick?: () => void; style?: React.CSSProperties }) {
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
    <div ref={ref} className={`reveal ${inView ? 'revealed' : ''} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      onClick={onClick}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LOGO MARK — Silueta oficial de la mujer EMM
   Izquierda: verde profundo (nuca/cabello)
   Centro: barra oscura divisoria
   Derecha: rojo (perfil facial)
══════════════════════════════════════════════════════════════ */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 234" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      {/* Verde — nuca, cabello, perfil posterior */}
      <path
        d="M 12 226 L 12 34 C 12 17 26 8 44 12 C 68 19 88 50 88 97
           C 88 144 74 188 54 212 C 40 228 22 232 12 226 Z"
        fill="#002E51"
      />
      {/* Sombra interior verde (profundidad) */}
      <path
        d="M 32 218 L 32 48 C 32 36 40 30 52 34 C 68 40 80 65 80 97
           C 80 130 68 168 50 202 C 42 218 34 222 32 218 Z"
        fill="rgba(0,0,0,0.22)"
      />

      {/* Barra central oscura — divisor de identidad */}
      <rect x="87" y="7" width="20" height="220" rx="2" fill="#14100c" />

      {/* Rojo — perfil facial frontal */}
      <path
        d="M 107 7 L 152 7 C 159 7 163 14 163 24 L 163 184
           C 163 204 150 220 134 225 C 118 230 107 224 107 215 Z"
        fill="#E4007C"
      />
      {/* Iluminación facial (perfil de la cara) */}
      <path
        d="M 107 44 C 126 40 148 55 156 80 C 162 102 158 128 150 147
           C 142 164 128 174 118 178 C 112 180 107 180 107 177 L 107 44 Z"
        fill="rgba(255,255,255,0.10)"
      />
      {/* Silueta de nariz — detalle del perfil */}
      <path d="M 153 108 C 159 117 161 128 155 139"
        stroke="rgba(255,255,255,0.16)" strokeWidth="2.5" fill="none"
        strokeLinecap="round" />
    </svg>
  );
}


/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const highlights = [
  { value: '9–13 JUN', label: 'Toronto, Canadá' },
  { value: 'MX + CA', label: 'Plataforma binacional' },
  { value: '12+', label: 'Industrias presentes' },
];

const impactMetrics = [
  {
    value: '+78',
    title: 'Expositoras',
    text: 'Participación destacada de mujeres en la primera edición de la Expo.',
    color: 'var(--cyan)',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  },
  {
    value: '14',
    title: 'Estados',
    text: '60 expositoras provenientes de diversas regiones de la República Mexicana.',
    color: 'var(--magenta)',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  },
  {
    value: '18',
    title: 'Comunidades',
    text: 'Integrantes de comunidades indígenas y afromexicanas compartiendo su riqueza cultural.',
    color: 'var(--gold)',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
  },
  {
    value: '18',
    title: 'Empresas',
    text: 'Empresas mexicanas establecidas en las provincias de Ontario y Québec.',
    color: 'var(--green-deep)',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
  },
  {
    value: '59',
    title: 'Marcas',
    text: 'Presencia de marcas mexicanas impulsando el desarrollo económico y cultural.',
    color: 'var(--navy)',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
  },
  {
    value: '120',
    title: 'Artistas',
    text: 'Representando el ámbito cultural de pintura, danza, música, canto y escultura.',
    color: 'var(--magenta)',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
  },
  {
    value: '+60',
    title: 'Artistas Mexicanas',
    text: 'Obras exhibidas en la Galería de Arte al interior del recinto.',
    color: 'var(--cyan)',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
  },
  {
    value: '4.2M',
    title: 'Impresiones',
    text: 'Más de 4 mil asistentes, 15 mil interacciones en redes y un 92% de reputación positiva.',
    color: 'var(--gold)',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
  }
];



const agenda = [
  {
    day: 'Día 01', title: 'Apertura y relaciones institucionales',
    text: 'Bienvenida, presentación de visión binacional y encuentros con aliados estratégicos. Ceremonia inaugural.'
  },
  {
    day: 'Día 02', title: 'Negocios, exportación y oportunidades',
    text: 'Paneles de exposición comercial, networking, ruedas de negocio y vitrinas sectoriales.'
  },
  {
    day: 'Día 03', title: 'Marca, comunidad y prensa',
    text: 'Activaciones de marca, contenido para medios, entrevistas en vivo y campañas de visibilidad social.'
  },
  {
    day: 'Día 04–05', title: 'Cierre, seguimiento y expansión',
    text: 'Reuniones bilaterales, continuidad post evento, firma de acuerdos y nuevas rutas de colaboración.'
  },
];

const audiences = [
  'Emprendedoras que buscan expandirse a Canadá',
  'Empresas que quieren patrocinar con propósito',
  'Expositoras y compradores con interés binacional',
  'Medios, cámaras y aliados institucionales',
];

const marqueeItems = [
  'Toronto 2027', 'México – Canadá', 'Empoderamiento',
  'Negocios globales', 'Cultura mexicana', 'Innovación',
  'Liderazgo femenino', 'Comercio binacional',
];

/* ══════════════════════════════════════════════════════════════
   CROSSOVER BUTTERFLY (con parallax)
══════════════════════════════════════════════════════════════ */
function CrossoverButterfly({ side = 'left', speed = 0.06, style }: { side?: 'left' | 'right'; speed?: number; style?: React.CSSProperties }) {
  const scrollY = useScrollY();
  return (
    <div className="section-crossover">
      <img
        src="/recursos/Recurso 8.png"
        alt=""
        aria-hidden="true"
        className={`crossover-butterfly${side === 'right' ? ' crossover-butterfly--right' : ''}`}
        style={{
          ...style,
          transform: `${side === 'right' ? 'scaleX(-1) ' : ''}rotate(${side === 'right' ? '5' : '-5'}deg) translateY(${scrollY * speed}px)`
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VIDEO HERO
══════════════════════════════════════════════════════════════ */
function VideoHero() {
  return (
    <section className="video-hero">
      <div className="video-hero__bg">
        <video
          className="video-hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/Galeria/Ponencias/IMG_6323.JPG"
        >
          <source src="/Galeria/Videos/bg_home.mp4" type="video/mp4" />
        </video>
        <div className="video-hero__overlay" />
      </div>
      <div className="video-hero__content">
        <h1 className="video-hero__title">Expo México Mujer 2028</h1>
        <p className="video-hero__sub">Toronto · Canadá</p>
      </div>
    </section>
  );
}



/* ══════════════════════════════════════════════════════════════
   STATEMENT STRIP — Premium Editorial Redesign
══════════════════════════════════════════════════════════════ */
function StatementStrip() {
  return (
    <div className="stmt" aria-label="Evento principal">
      {/* Scan-line texture overlay */}
      <div className="stmt__scanlines" aria-hidden="true" />

      {/* Floating butterfly watermark */}
      <img
        src="/recursos/Recurso 8.png"
        alt=""
        aria-hidden="true"
        className="stmt__butterfly"
      />

      {/* Giant ghost date in background */}
      <div className="stmt__ghost-date" aria-hidden="true">9–13</div>

      {/* ── Main content grid ── */}
      <div className="stmt__grid">

        {/* LEFT — Location + tagline */}
        <div className="stmt__col stmt__col--left">
          <span className="stmt__location">
            <span className="stmt__location-dot" />
            Toronto · Canadá
          </span>
          <h2 className="stmt__headline">
            El liderazgo<br />
            mexicano<br />
            <em>no tiene<br />fronteras</em>
          </h2>
        </div>

        {/* CENTER — Vertical rule + decorative monogram */}
        <div className="stmt__col stmt__col--center" aria-hidden="true">
          <div className="stmt__rule" />
          <img src="/recursos/Recurso 8.png" alt="" className="stmt__center-butterfly" />
          <div className="stmt__rule" />
        </div>

        {/* RIGHT — Date + CTA */}
        <div className="stmt__col stmt__col--right">
          <div className="stmt__date-unit">
            <span className="stmt__date-label">Fecha del evento</span>
            <span className="stmt__date-num">9–13</span>
            <span className="stmt__date-month">Junio 2027</span>
          </div>

          <a href="#registro" className="stmt__cta">
            <span className="stmt__cta-fill" />
            <span className="stmt__cta-text">Reservar lugar</span>
            <svg className="stmt__cta-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <p className="stmt__sub">
            5 días · Plataforma binacional
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MARQUEE BAR
══════════════════════════════════════════════════════════════ */
/* ── Cinta superior: texto grande, hacia adelante ── */
function MarqueeTop() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__row">
        <div className="marquee__track">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="marquee__item">
              {marqueeItems.map((item) => (
                <span key={item}>
                  {item}
                  <span className="marquee__dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Cinta inferior: texto pequeño, en reversa ── */
function MarqueeBottom() {
  const items = [
    '9–13 Junio 2027', 'Liderazgo femenino', 'Toronto · Canada',
    'Binacional', 'Exportación', 'Innovación', 'Comunidad mexicana',
    'Empoderamiento', '5 días · 12 industrias',
  ];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__row">
        <div className="marquee__track marquee__track--reverse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="marquee__item marquee__item--sm">
              {items.map((item) => (
                <span key={item}>
                  {item}
                  <span className="marquee__dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONCEPT (Minimalist High-End)
══════════════════════════════════════════════════════════════ */
function Concept() {
  const scrollY = useScrollY();
  return (
    <section className="concept--lux" id="concepto" aria-labelledby="concepto-title">
      <div className="concept__lux-inner">

        <Reveal className="concept__lux-eyebrow">
          <span className="concept__lux-line" />
          Misión Binacional
        </Reveal>

        <Reveal delay={100} className="concept__lux-title-wrap">
          <h2 className="concept__lux-title" id="concepto-title">
            Consolidar la proyección<br />
            <em>internacional de México</em>
          </h2>
        </Reveal>

        <div className="concept__lux-grid">
          <Reveal delay={200} className="concept__lux-text-block">
            <p>
              Expo México Mujer 2027 es una plataforma de encuentros internacionales que
              transforma el liderazgo mexicano en acciones concretas, creando oportunidades
              de desarrollo económico y fortaleciendo la identidad de México
              en el extranjero.
            </p>
          </Reveal>

          <Reveal delay={300} className="concept__lux-text-block">
            <p>
              Nuestra misión es fortalecer los puentes comerciales, culturales y sociales
              entre México y Canadá, consolidando una comunidad binacional que impulse el
              crecimiento de empresas, productos y talentos mexicanos.
            </p>
          </Reveal>
        </div>

      </div>

      <DecoMariposa className="concept__lux-watermark" style={{ transform: `translateY(${scrollY * 0.05}px)` }} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PILLARS
══════════════════════════════════════════════════════════════ */
function Pillars() {
  return (
    <section className="section section--alt" id="impacto" aria-labelledby="impacto-title">
      <div className="section__inner" style={{ textAlign: 'center', maxWidth: '1400px', margin: '0 auto' }}>
        <Reveal>
          <span className="section__label">El impacto de la Expo México Mujer 2026</span>
          <h2 className="section__title section__title--center" id="impacto-title" style={{ color: 'var(--magenta)' }}>
            Nuestros Resultados
          </h2>
          <p className="section__desc section__desc--center" style={{ marginBottom: 0 }}>
            Expo México Mujer 2026, Toronto, Canadá.
          </p>
        </Reveal>
        <style>{`
          .diamond-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 70px 24px;
            margin-top: 80px;
          }
          .diamond-card {
            position: relative;
            background: #ffffff;
            border-radius: 12px;
            padding: 85px 24px 35px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .diamond-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
          }
          .diamond-shape {
            position: absolute;
            top: -45px;
            left: 50%;
            margin-left: -45px;
            width: 90px;
            height: 90px;
            transform: rotate(45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
          }
          .diamond-icon {
            transform: rotate(-45deg);
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          @media (max-width: 1024px) {
            .diamond-grid { grid-template-columns: repeat(2, 1fr); gap: 70px 24px; }
          }
          @media (max-width: 600px) {
            .diamond-grid { grid-template-columns: 1fr; gap: 70px 24px; }
          }
        `}</style>

        <div className="diamond-grid reveal-stagger">
          {impactMetrics.map((m, i) => (
            <Reveal key={i} className="diamond-card" style={{ border: `1px solid color-mix(in srgb, ${m.color} 30%, transparent)` }}>
              <div className="diamond-shape" style={{ background: m.color, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.06)' }}>
                <div className="diamond-icon">
                  {m.icon}
                </div>
              </div>

              <div style={{ fontSize: '3rem', color: m.color, fontFamily: 'var(--font-display), sans-serif', fontWeight: 800, lineHeight: 1, marginBottom: '12px' }}>
                {m.value}
              </div>

              <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.05em', color: 'var(--navy)' }}>
                {m.title}
              </h3>

              <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '1.05rem', lineHeight: 1.6, margin: '0 auto', color: 'var(--text-muted)' }}>
                {m.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   INDUSTRIES
══════════════════════════════════════════════════════════════ */
function MexicanStates() {
  return (
    <section className="section" id="estados" aria-labelledby="estados-title">
      <div className="section__inner" style={{ textAlign: 'center' }}>
        <Reveal>
          <span className="section__label">Directorio Nacional</span>
          <h2 className="section__title section__title--center" id="estados-title">
            Descubre el talento por. <em>Estados de México.</em>
          </h2>
          <p className="section__desc section__desc--center">
            Diversos estados con presencia destacada en la expo, reflejando la
            diversidad y riqueza de la oferta mexicana.
          </p>
        </Reveal>

        <style>{`
          .states-masonry {
            columns: 1;
            column-gap: 24px;
            margin-top: 48px;
          }
          @media (min-width: 640px) { .states-masonry { columns: 2; } }
          @media (min-width: 1024px) { .states-masonry { columns: 3; } }
          @media (min-width: 1280px) { .states-masonry { columns: 4; } }
          
          .states-masonry-wrap {
            break-inside: avoid;
            margin-bottom: 24px;
          }
          .states-masonry-item {
            border-radius: 16px;
            overflow: hidden;
            position: relative;
            display: block;
            transform: translateZ(0);
            transition: transform 0.4s, box-shadow 0.4s;
            box-shadow: 0 10px 30px rgba(0,46,81,0.05);
          }
          .states-masonry-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,46,81,0.15);
          }
          .states-masonry-item img {
            width: 100%;
            display: block;
            object-fit: cover;
            transition: transform 0.8s ease;
          }
          .states-masonry-item:hover img {
            transform: scale(1.05);
          }
          .states-masonry-item--tall img { height: 400px; }
          .states-masonry-item--wide img { height: 260px; }
          .states-masonry-item--large img { height: 320px; }
          
          .states-masonry-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,25,76,0.9) 0%, transparent 50%);
          }
          .states-masonry-title {
            position: absolute;
            bottom: 24px;
            left: 24px;
            right: 24px;
            font-family: var(--font-display);
            font-weight: 900;
            font-size: 1.4rem;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin: 0;
            line-height: 1.1;
            text-align: left;
          }
        `}</style>

        <div className="states-masonry">
          {mexicanStates.map((st, i) => (
            <Reveal key={st.name} delay={(i % 4) * 100} className="states-masonry-wrap">
              <Link
                href={`/expositores?estado=${encodeURIComponent(st.name)}`}
                className={`states-masonry-item states-masonry-item--${st.size || 'large'}`}
              >
                <img src={st.img} alt={st.name} loading="lazy" />
                <div className="states-masonry-overlay" />
                <h3 className="states-masonry-title">{st.name}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   AGENDA
══════════════════════════════════════════════════════════════ */
function Agenda() {
  return (
    <section className="section section--alt" id="agenda" aria-labelledby="agenda-title">
      <div className="section__inner">
        <Reveal>
          <h2 className="agenda__title" id="agenda-title">
            Agenda Oficial <br />
            <em>Impacto Binacional</em>
          </h2>
        </Reveal>

        <div className="agenda-timeline">
          {agenda.map((item, i) => (
            <Reveal key={item.day} className="agenda-item" delay={i * 100}>
              <div className="agenda-item__day">{item.day}</div>
              <div className="agenda-item__content">
                <h3 className="agenda-item__title">{item.title}</h3>
                <p className="agenda-item__text">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   AUDIENCE
══════════════════════════════════════════════════════════════ */
function Audience() {
  return (
    <section className="section" id="audiencia" aria-labelledby="audiencia-title">
      <div className="section__inner">
        <div className="audience-grid">
          <div>
            <Reveal>
              <span className="section__label">Para quién es</span>
              <h2 className="section__title" id="audiencia-title">
                Esto es para quienes <em>construyen puentes</em>
              </h2>
              <p className="section__desc" style={{ marginBottom: 32 }}>
                Un espacio diseñado para que cada visitante encuentre su lugar
                en la expo y defina su rol en esta historia binacional.
              </p>
            </Reveal>
            <div className="audience-list reveal-stagger">
              {audiences.map((a) => (
                <Reveal key={a} className="audience-item">
                  <span className="audience-item__dot" aria-hidden="true" />
                  <span className="audience-item__text">{a}</span>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={150}>
            <div className="quote-block">
              <span className="quote-block__mark" aria-hidden="true">&ldquo;</span>
              <div className="quote-block__line" />
              <p className="quote-block__text">
                La expo necesita una presencia que se sienta institucional,
                contemporánea y lista para convertir liderazgo en legado.
              </p>
              <span className="quote-block__attr">— Dirección creativa, EMM 2027</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   NOTICIAS
══════════════════════════════════════════════════════════════ */
const noticiasData = [
  {
    id: 1,
    title: "Anuncian fecha oficial para la edición 2027 en Toronto",
    date: "15 Oct 2026",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800",
    excerpt: "El Metro Toronto Convention Centre será la sede del evento binacional más importante del año para el liderazgo femenino.",
    featured: true
  },
  {
    id: 2,
    title: "Nueva alianza estratégica con cámaras de comercio",
    date: "02 Oct 2026",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=600",
    excerpt: "Las principales cámaras empresariales de México y Canadá se unen al proyecto.",
    featured: false
  },
  {
    id: 3,
    title: "Apertura de registro para expositoras",
    date: "28 Sep 2026",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600",
    excerpt: "Conoce los requisitos para ser parte de las 200 empresas mexicanas presentes en Canadá.",
    featured: false
  },
  {
    id: 4,
    title: "Presentan el programa de mentoría binacional",
    date: "15 Sep 2026",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    excerpt: "Líderes de ambos países compartirán su experiencia con nuevas emprendedoras.",
    featured: false
  },
  {
    id: 5,
    title: "El impacto cultural de la Expo en Canadá",
    date: "05 Sep 2026",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600",
    excerpt: "Una muestra de gastronomía, arte y tradiciones que cruzará fronteras.",
    featured: false
  }
];

function Noticias() {
  const featured = noticiasData[0];
  const list = noticiasData.slice(1);

  return (
    <section className="section" id="noticias" style={{ background: '#FAF8F5' }}>
      <div className="section__inner">
        <Reveal>
          <div className="section__header" style={{ marginBottom: '60px' }}>
            <span className="section__label">Actualidad</span>
            <h2 className="section__title">
              Últimas <em>noticias</em>
            </h2>
            <p className="section__desc">
              Mantente al tanto de los avances, convocatorias y anuncios oficiales rumbo a Expo México Mujer.
            </p>
          </div>
        </Reveal>

        <div className="news-magazine">
          <div className="news-magazine__left">
            <Reveal>
              <a href="/recursos" className="news-feat-card">
                <div className="news-feat-img-wrap">
                  <img src={featured.image} alt={featured.title} />
                  <div className="news-feat-badge">Destacado</div>
                </div>
                <div className="news-feat-meta">
                  <span>{featured.date}</span>
                </div>
                <h3 className="news-feat-title">{featured.title}</h3>
                <p className="news-feat-excerpt">{featured.excerpt}</p>
              </a>
            </Reveal>
          </div>

          <div className="news-magazine__right">
            <div className="news-list">
              {list.map((news, i) => (
                <Reveal key={news.id} delay={i * 100}>
                  <a href="/recursos" className="news-list-item">
                    <div className="news-list-content">
                      <span className="news-list-date">{news.date}</span>
                      <h4 className="news-list-title">{news.title}</h4>
                    </div>
                    <div className="news-list-img-wrap">
                      <img src={news.image} alt={news.title} />
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={200} style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="/recursos" className="btn btn--primary">
            Ver todas las noticias
          </a>
        </Reveal>
      </div>
    </section>
  );
}


/* Removed Footer - Moved to components/Footer.tsx */

/* ══════════════════════════════════════════════════════════════
   UBICACIÓN SECTION
══════════════════════════════════════════════════════════════ */
const venueDetails = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    title: 'Cómo llegar',
    text: 'El recinto está ubicado en el corazón del centro de Toronto, a 5 minutos a pie de la estación Union Station. Fácil acceso desde el aeropuerto Pearson mediante UP Express (25 min) o taxi.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
    title: 'El recinto',
    text: 'Un espacio versátil con capacidad para más de 500 asistentes, salas de exposición, auditorio principal, áreas de networking y espacios para ruedas de negocio. Accesibilidad completa.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    title: 'Horarios',
    text: 'El evento se llevará a cabo de <strong>9:00 a.m. a 7:00 p.m.</strong> todos los días. Registro abre a las 8:00 a.m. Sesiones de networking matutinas y eventos especiales por la tarde.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>,
    title: 'Estacionamiento',
    text: 'Estacionamiento público disponible en los alrededores del recinto. Tarifas desde $15 CAD por día. Recomendamos usar transporte público por la cercanía a Union Station.',
  },
];

function Ubicacion() {
  return (
    <div style={{ position: 'relative', zIndex: 9999 }}>
      {/* Top Divider */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10, lineHeight: 0, pointerEvents: 'none', transform: 'translateY(-28%)' }}>
        <img src="/recursos svg/Recurso 10.svg" alt="" aria-hidden="true" style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.9 }} />
      </div>

      <section className="location-gradient" id="ubicacion" aria-labelledby="ubicacion-title" style={{ position: 'relative' }}>
        <div className="location-gradient__bg">
          <img
            className="location-gradient__image"
            src="https://images.pexels.com/photos/935474/toronto-beauty-clouds-skyline-935474.jpeg?cs=srgb&dl=-935474.jpg&fm=jpg"
            alt="Toronto, Canadá"
          />
          <div className="location-gradient__overlay"></div>
        </div>

        <div className="location-gradient__content-wrapper">
          <div className="location-gradient__right">
            <div className="location-gradient__content">
              <Reveal>
                <span className="section__label">Ubicación</span>
                <h2 className="section__title" id="ubicacion-title">
                  Toronto, Canadá <em>Te esperamos</em>
                </h2>
                <p className="section__desc" style={{ marginBottom: 0 }}>
                  En el corazón del centro financiero de Toronto, a pasos de los principales
                  puntos de interés de la ciudad.
                </p>
              </Reveal>

              <div className="venue-details__grid" style={{ gridTemplateColumns: '1fr', gap: '24px', marginTop: '32px' }}>
                {venueDetails.map((d) => (
                  <Reveal key={d.title} delay={100} className="venue-detail-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                    <div className="venue-detail-card__icon" style={{ marginBottom: '12px' }}>{d.icon}</div>
                    <div>
                      <h3 className="venue-detail-card__title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{d.title}</h3>
                      <p className="venue-detail-card__text" style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }} dangerouslySetInnerHTML={{ __html: d.text }} />
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200}>
                <div style={{ marginTop: 32 }}>
                  <a href="https://maps.google.com" className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                    Ver en mapa
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Divider */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 10, lineHeight: 0, pointerEvents: 'none', transform: 'translateY(28%)' }}>
        <img src="/recursos svg/Recurso 10.svg" alt="" aria-hidden="true" style={{ width: '100%', height: 'auto', display: 'block', transform: 'rotate(180deg)', opacity: 0.9 }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SERVICIOS MIGRATORIOS SECTION
══════════════════════════════════════════════════════════════ */
function ServiciosMigratorios() {
  return (
    <section className="section" id="servicios-migratorios" aria-labelledby="servicios-title" style={{ background: '#fff' }}>
      <div className="section__inner">
        <Reveal>
          <span className="section__label">Acompañamiento integral</span>
          <h2 className="section__title" id="servicios-title">
            Servicios <em>Migratorios</em>
          </h2>
          <p className="section__desc">
            Ofrecemos asesoría y gestión especializada para asegurar tu participación en Expo México Mujer 2027 sin contratiempos.
            <br />
            <strong style={{ color: 'var(--magenta)', display: 'block', marginTop: '8px' }}>
              Servicios ofrecidos por LET (Patrocinador Oficial EMM 2027)
            </strong>
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '48px' }}>
          <Reveal delay={100}>
            <div style={{ padding: '32px', background: 'var(--cream)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--navy)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '12px' }}>Visa Canadiense</h3>
              <p style={{ color: 'var(--text)', lineHeight: 1.6, flex: 1 }}>
                Gestión completa para el trámite de visado, garantizando que tu delegación comercial cumpla con todos los requisitos para el viaje de negocios a Toronto.
              </p>
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Canaliza tu información con nuestro asesor:</p>
                <a href="mailto:luis.garcia@let.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)', fontWeight: 700, textDecoration: 'none' }}>
                  <Mail size={16} /> Contactar a Luis García
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ padding: '32px', background: 'var(--cream)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--magenta)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '12px' }}>eTA Canadiense</h3>
              <p style={{ color: 'var(--text)', lineHeight: 1.6, flex: 1 }}>
                Procesamiento ágil de la Autorización Electrónica de Viaje (eTA) para participantes elegibles, asegurando un tránsito rápido y seguro hacia el evento.
              </p>
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Canaliza tu información con nuestro asesor:</p>
                <a href="mailto:luis.garcia@let.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)', fontWeight: 700, textDecoration: 'none' }}>
                  <Mail size={16} /> Contactar a Luis García
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   COSTOS SECTION
══════════════════════════════════════════════════════════════ */
const costTiers = [
  {
    name: 'Paquete Bronce',
    type: 'Nuevas Expositoras',
    discount: '20%',
    price: '$4,000',
    sub: 'CAD — Paquete base',
    featured: false,
    theme: 'bronce',
    color: '#cd7f32',
    description: 'Ideal para organizaciones que desean incorporarse a Expo México Mujer y comenzar a posicionar sus servicios dentro de la comunidad y mercado canadiense.',
    features: [
      'Stand de 2 x 2 metros',
      '1 acceso al Mexican Fashion Gala Show',
      '1 acceso al Ontario – Mexico Business Summit',
      'Presencia del logotipo en materiales promocionales',
      'Promoción en redes sociales y sitio web oficial',
      'Proyección del logotipo en pantallas',
      'Presencia de marca mediante banners',
      'Reconocimiento institucional como patrocinador'
    ],
  },
  {
    name: 'Paquete Plata',
    type: 'Expositoras Referidas',
    discount: '25%',
    price: '$6,000',
    sub: 'CAD — Precio preferencial',
    featured: false,
    theme: 'plata',
    color: '#a0a0a0',
    description: 'Una excelente alternativa para organizaciones que buscan una presencia destacada y una relación cercana con la comunidad empresarial mexicana – canadiense.',
    features: [
      'Stand de 4 x 3 metros',
      '2 accesos al Mexican Fashion Gala Show',
      '2 accesos al Ontario – Mexico Business Summit',
      'Presencia del logotipo en materiales promocionales',
      'Promoción en redes sociales y sitio web oficial',
      'Proyección del logotipo en pantallas',
      'Presencia de marca mediante banners',
      'Reconocimiento institucional',
      'Posibilidad de recibir la palabra en foro'
    ],
  },
  {
    name: 'Paquete Oro',
    type: 'Expositoras 2026',
    discount: '30%',
    price: '$8,000',
    sub: 'CAD — Beneficio de lealtad',
    featured: true,
    theme: 'oro',
    color: '#e4b000',
    description: 'Nuestro paquete de mayor posicionamiento, diseñado para organizaciones que buscan una presencia sólida antes, durante y después del evento.',
    features: [
      'Stand premium de 6 x 4 metros',
      '3 accesos al Mexican Fashion Gala Show',
      '2 accesos al Ontario – Mexico Business Summit',
      'Participación en la Misión Comercial a Montreal',
      'Logotipo en todos los materiales promocionales',
      'Promoción en redes sociales y sitio web oficial',
      'Proyección del logotipo en pantallas',
      'Presencia de marca mediante banners',
      'Distribución de material promocional',
      'Mensaje institucional durante el evento',
      'Participación como ponentes'
    ],
  },
];

function Costos() {
  return (
    <section className="section section--alt" id="costos" aria-labelledby="costos-title">
      <div className="section__inner" style={{ textAlign: 'center' }}>
        <Reveal>
          <span className="section__label">Inversión y Costos</span>
          <h2 className="section__title section__title--center" id="costos-title">
            Aparta tu <em>espacio</em>
          </h2>
          <p className="section__desc section__desc--center" style={{ marginBottom: 0 }}>
            Pueden apartar su lugar con el <strong>50% de anticipo</strong> antes de la fecha límite (Por confirmar).
          </p>
        </Reveal>

        <style>{`
          .pricing-card--bronce { border-top: 6px solid #cd7f32; }
          .pricing-card--plata { border-top: 6px solid #a0a0a0; }
          .pricing-card--oro { 
            border-top: 6px solid #e4b000; 
            transform: scale(1.05); 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
            z-index: 10; 
            position: relative;
            padding-top: 64px !important;
            padding-bottom: 64px !important;
          }
          .pricing-card--oro .pricing-card__name { color: #e4b000; font-size: 2.3rem !important; }
          .pricing-card--oro .pricing-card__cta { background: #e4b000; color: #000; border: none; font-size: 1rem; padding: 20px; }
          .pricing-card--oro .pricing-card__cta:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }
        `}</style>

        <div className="pricing-tiers__grid" style={{ marginTop: 48, alignItems: 'stretch' }}>
          {costTiers.map((t) => (
            <Reveal key={t.name} delay={150} className={`pricing-card pricing-card--${t.theme}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {t.featured && <div className="pricing-card__badge" style={{ background: t.color }}>Más Popular</div>}
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ padding: '6px 14px', background: `${t.color}20`, color: t.color, borderRadius: '20px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem' }}>
                  {t.type}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  Ahorro del {t.discount}
                </span>
              </div>
              
              <div className="pricing-card__name" style={{ color: t.featured ? t.color : 'inherit', fontSize: '2rem' }}>{t.name}</div>
              <div className="pricing-card__price">{t.price} <span>CAD</span></div>
              <div className="pricing-card__sub">{t.sub}</div>
              <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', margin: '16px 0', lineHeight: 1.5, textAlign: 'left'}}>{t.description}</p>
              
              <div className="pricing-card__divider" />
              
              <ul className="pricing-card__features">
                {t.features.map((f) => (
                  <li key={f} className="pricing-card__feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2" style={{ width: 16, height: 16, marginRight: 8, flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="mailto:francisco@expomexico.ca" className="pricing-card__cta" style={{ ...(!t.featured ? { border: `1px solid ${t.color}`, color: t.color, background: 'transparent' } : {}), marginTop: 'auto' }}>
                Reservar con el 50%
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   EXPOSITORES CTA
══════════════════════════════════════════════════════════════ */
function ExpositoresCta() {
  return (
    <section className="section" style={{ background: 'var(--cream)', padding: '100px 24px', textAlign: 'center' }}>
      <div className="section__inner">
        <Reveal>
          <span className="section__label">Directorio</span>
          <h2 className="section__title section__title--center">
            Conoce a nuestras <br /><em>Expositoras.</em>
          </h2>
          <p className="section__desc section__desc--center" style={{ marginBottom: '40px' }}>
            Explora las marcas, productos y servicios que las mujeres emprendedoras de cada región de México traen a Toronto.
          </p>
          <Link href="/expositores" className="btn btn--primary">
            Ver Directorio Completo
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <VideoHero />
      <Hero />

      <div className="page-content-wrapper">
        <MarqueeTop />
        <StatementStrip />
        <MarqueeBottom />
        <Concept />
        <CrossoverButterfly side="left" speed={0.06} style={{ width: '200px', left: '-20px', bottom: '-100px' }} />
        <Pillars />
        {/* <MexicanStates /> */}
        <ExpositoresCta />
        <Agenda />
        {/* <Ubicacion /> */}
        <ServiciosMigratorios />
        <Costos />
        <Audience />
        <Noticias />
        <CrossoverButterfly side="right" speed={0.04} />

      </div>
    </>
  );
}
