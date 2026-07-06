'use client';

import { useEffect, useRef, useState } from 'react';
import './v3.css';

/* ══════════════════════════════════════════════════════════════
   REVEAL — Scroll-triggered fade-in
══════════════════════════════════════════════════════════════ */
function Reveal({
  children, className = '', delay = 0, style = {},
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
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
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const highlights = [
  { value: '9–13 JUN', label: 'Fechas 2027' },
  { value: '12+', label: 'Sectores' },
  { value: '5 DÍAS', label: 'Actividades' },
];

const pillars = [
  {
    title: 'Conexiones que abren mercado',
    text: 'Un puente directo entre el talento mexicano y las oportunidades canadienses. Networking de alto nivel con compradores, socios y aliados estratégicos.',
  },
  {
    title: 'Mujeres al centro',
    text: 'El liderazgo femenino mexicano como protagonista. Emprendedoras, empresarias y creadoras que transforman su comunidad desde una plataforma internacional.',
  },
  {
    title: 'Impacto con propósito',
    text: 'Cada participante impulsa el desarrollo económico y cultural de México en el extranjero. Una vitrina que trasciende lo comercial para construir identidad.',
  },
];

const industries = [
  { name: 'Arte y Cultura', img: '/Galeria/Arte_y_Cultura/IMG_5885.JPG', desc: 'Expresiones artísticas que proyectan el alma de México.' },
  { name: 'Artesanías', img: '/Galeria/Artesanias/IMG_5494.JPG', desc: 'Piezas únicas creadas por manos maestras mexicanas.' },
  { name: 'Gastronomía', img: '/Galeria/Gastronomia/IMG_5924.JPG', desc: 'Sabor tradicional con proyección y exportación internacional.' },
  { name: 'Moda y textiles', img: '/Galeria/Moda_y_textiles/IMG_6031.JPG', desc: 'Diseño, moda y tejidos con identidad artesanal única.' },
  { name: 'Ponencias', img: '/Galeria/Ponencias/IMG_4931.JPG', desc: 'Intercambio académico y formación con visión global.' },
  { name: 'Turismo', img: '/Galeria/Turismo/IMG_5986.JPG', desc: 'Destinos inolvidables y experiencias culturales de primer nivel.' },
  { name: 'Otros', img: '/Galeria/Otros/IMG_4805.JPG', desc: 'Proyectos sostenibles y exposición binacional.' }
];

const agenda = [
  { day: '01', title: 'Apertura y relaciones institucionales', text: 'Bienvenida, presentación de visión binacional y encuentros con aliados estratégicos. Ceremonia inaugural.' },
  { day: '02', title: 'Negocios, exportación y oportunidades', text: 'Paneles de exposición comercial, networking, ruedas de negocio y vitrinas sectoriales.' },
  { day: '03', title: 'Marca, comunidad y prensa', text: 'Activaciones de marca, contenido para medios, entrevistas en vivo y campañas de visibilidad social.' },
  { day: '04', title: 'Cierre, seguimiento y expansión', text: 'Reuniones bilaterales, continuidad post evento, firma de acuerdos y nuevas rutas de colaboración.' },
];

const audiences = [
  { icon: '01', text: 'Emprendedoras que buscan expandirse a Canadá' },
  { icon: '02', text: 'Empresas que quieren patrocinar con propósito' },
  { icon: '03', text: 'Expositoras y compradores con interés binacional' },
  { icon: '04', text: 'Medios, cámaras y aliados institucionales' },
];

/* ══════════════════════════════════════════════════════════════
   HERO — Center glass over color mosaic
══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="v3-hero" id="inicio">
      {/* 4-Color Mosaic Background */}
      <div className="v3-hero__mosaic">
        <div className="v3-hero__mosaic-block"><img src="/Galeria/Gastronomia/IMG_5940.JPG" alt="" /></div>
        <div className="v3-hero__mosaic-block"><img src="/Galeria/Arte_y_Cultura/IMG_5945.JPG" alt="" /></div>
        <div className="v3-hero__mosaic-block"><img src="/Galeria/Otros/IMG_4805.JPG" alt="" /></div>
        <div className="v3-hero__mosaic-block"><img src="/Galeria/Ponencias/IMG_5169.JPG" alt="" /></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, width: '100%' }}>
        {/* Center Panel */}
        <div className="v3-hero__center">
          <div className="v3-hero__logo-mark">
            <div className="v3-hero__logo-bar" />
            <div className="v3-hero__logo-bar" />
            <div className="v3-hero__logo-bar" />
            <div className="v3-hero__logo-bar" />
          </div>
          <div className="v3-hero__date">Toronto · Canadá</div>
          <h1 className="v3-hero__title">
            México en Toronto
            <span className="v3-hero__title-accent">Con todo su poder</span>
          </h1>
          <p className="v3-hero__desc">
            La plataforma binacional que transforma el liderazgo mexicano en
            oportunidades concretas de negocio, cultura y desarrollo.
          </p>
          <div className="v3-hero__actions">
            <a href="#contacto" className="v3-btn v3-btn--pink">
              Reservar Lugar
            </a>
            <a href="#agenda" className="v3-btn v3-btn--outline">
              Ver Agenda
            </a>
          </div>
        </div>

        {/* Stats Row attached to Hero */}
        <Reveal delay={200} className="v3-hero__stats">
          {highlights.map((h) => (
            <div key={h.label} className="v3-hero__stat">
              <span className="v3-hero__stat-value">{h.value}</span>
              <span className="v3-hero__stat-label">{h.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONCEPT — Full width Green block with center text
══════════════════════════════════════════════════════════════ */
function Concept() {
  return (
    <section className="v3-concept">
      <div className="v3-concept__img v3-concept__img--left">
        <img src="/Galeria/Otros/IMG_4805.JPG" alt="" />
      </div>
      <div className="v3-concept__center">
        <img src="/recursos/Recurso 8.png" alt="" className="v3-concept__icon" />
        <h2 className="v3-concept__title">
          Consolidar la proyección
          <em>internacional de México</em>
        </h2>
        <p className="v3-concept__text">
          Expo México Mujer 2027 es una plataforma de encuentros internacionales
          que transforma el liderazgo mexicano en acciones concretas, creando
          oportunidades de desarrollo económico y fortaleciendo la identidad de
          México en el extranjero.
        </p>
      </div>
      <div className="v3-concept__img v3-concept__img--right">
        <img src="/Galeria/Artesanias/IMG_5932.JPG" alt="" />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PILLARS — Full-width colored bands
══════════════════════════════════════════════════════════════ */
function Pillars() {
  return (
    <section className="v3-pillars" id="pilares">
      {pillars.map((p, i) => (
        <div key={p.title} className="v3-pillar-band">
          <div className="v3-pillar-band__ghost">{String(i + 1).padStart(2, '0')}</div>
          <div className="v3-pillar-band__num">{String(i + 1).padStart(2, '0')}</div>
          <div className="v3-pillar-band__content">
            <h3 className="v3-pillar-band__title">{p.title}</h3>
            <p className="v3-pillar-band__text">{p.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   INDUSTRIES — Alternating Grid + Compact
══════════════════════════════════════════════════════════════ */
function Industries() {
  return (
    <section className="v3-industries" id="industrias">
      <div className="v3-industries__header">
        <Reveal>
          <div className="v3-industries__label">Sectores</div>
          <h2 className="v3-industries__title">
            Todas las industrias. <em>Un solo escenario.</em>
          </h2>
        </Reveal>
      </div>

      <div className="v3-ind-grid">
        {industries.map((ind, i) => (
          <Reveal key={ind.name} className="v3-ind-card" delay={(i % 3) * 100}>
            <div className="v3-ind-card__img-wrapper">
              <img src={ind.img} alt={ind.name} loading="lazy" />
              <div className="v3-ind-card__overlay" />
            </div>
            <div className="v3-ind-card__content">
              <span className="v3-ind-card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="v3-ind-card__title">{ind.name}</h3>
              <p className="v3-ind-card__desc">{ind.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   AGENDA — Tabbed Interface
══════════════════════════════════════════════════════════════ */
function Agenda() {
  const [activeTab, setActiveTab] = useState(0);
  const current = agenda[activeTab];

  return (
    <section className="v3-agenda" id="agenda">
      <div className="v3-agenda__bg-text">AGENDA 2027</div>

      <div className="v3-agenda__header">
        <div className="v3-agenda__label">Itinerario</div>
        <h2 className="v3-agenda__title">
          Cinco días de <em>impacto binacional</em>
        </h2>
      </div>

      <div className="v3-agenda__tabs">
        {agenda.map((item, i) => (
          <button
            key={item.day}
            className={`v3-agenda__tab ${activeTab === i ? 'v3-agenda__tab--active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            Día {item.day}
          </button>
        ))}
      </div>

      <div className="v3-agenda__panel">
        <div className="v3-agenda__panel-day">{current.day}</div>
        <div className="v3-agenda__panel-bar" style={{
          background: activeTab === 0 ? 'var(--v3-green)' :
            activeTab === 1 ? 'var(--v3-pink)' :
              activeTab === 2 ? 'var(--v3-red)' : 'var(--v3-blue)'
        }} />
        <h3 className="v3-agenda__panel-title">{current.title}</h3>
        <p className="v3-agenda__panel-text">{current.text}</p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   AUDIENCE — Hover Fill Cards
══════════════════════════════════════════════════════════════ */
function Audience() {
  return (
    <section className="v3-audience" id="audiencia">
      <div className="v3-audience__header">
        <h2 className="v3-audience__title">
          Esto es para quienes <em>construyen puentes</em>
        </h2>
      </div>

      <div className="v3-audience__grid">
        {audiences.map((a, i) => (
          <Reveal key={i} delay={i * 100} className="v3-audience-card">
            <div className="v3-audience-card__icon">{a.icon}</div>
            <div className="v3-audience-card__text">{a.text}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CTA — Split Layout Left/Right
══════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="v3-cta" id="contacto">
      <div className="v3-cta__left">
        <img src="/recursos/Recurso 8.png" alt="" className="v3-cta__left-bg" />
        <div className="v3-cta__label">Únete a la plataforma</div>
        <h2 className="v3-cta__title">
          ¿Lista para ser parte<br />de <em>esta edición?</em>
        </h2>
        <p className="v3-cta__desc">
          Reserva tu lugar como expositora, patrocinadora o aliada
          estratégica. Forma parte del movimiento binacional más importante
          del año.
        </p>
      </div>

      <div className="v3-cta__right">
        <div className="v3-cta__card">
          <h3 className="v3-cta__card-title">Reserva tu espacio</h3>
          <p className="v3-cta__card-subtitle">
            Nuestro equipo te contactará para ofrecerte la mejor opción
            de participación.
          </p>
          <div className="v3-cta__card-actions">
            <a href="mailto:francisco@expomexico.ca" className="v3-btn v3-btn--pink">
              Escribir por correo
            </a>
            <a href="https://wa.link/jboroz" className="v3-btn v3-btn--ghost-white" target="_blank" rel="noopener noreferrer">
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="v3-cta__skyline">
        <img src="/recursos/Recurso 15.png" alt="Skyline" />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   DIVIDER
══════════════════════════════════════════════════════════════ */
function Divider() {
  return (
    <div className="v3-divider">
      <div className="v3-divider__bar v3-divider__bar--1" />
      <div className="v3-divider__bar v3-divider__bar--2" />
      <div className="v3-divider__bar v3-divider__bar--3" />
      <div className="v3-divider__bar v3-divider__bar--4" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════ */
export default function PageV3() {
  return (
    <div className="v3">
      <Hero />
      <Divider />
      <Concept />
      <Pillars />
      <Divider />
      <Industries />
      <Agenda />
      <Audience />
      <CTA />
    </div>
  );
}
