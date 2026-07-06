'use client';

import { useEffect, useRef, useState } from 'react';
import './v2.css';

/* ══════════════════════════════════════════════════════════════
   REVEAL WRAPPER (Slightly adjusted for editorial fade-in)
══════════════════════════════════════════════════════════════ */
function Reveal({ children, className = '', delay = 0, style = {} }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
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
    <div ref={ref} className={className}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DATA (From Original V1)
══════════════════════════════════════════════════════════════ */
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
  { day: 'Día 01', title: 'Apertura y relaciones institucionales', text: 'Bienvenida, presentación de visión binacional y encuentros con aliados estratégicos. Ceremonia inaugural.' },
  { day: 'Día 02', title: 'Negocios, exportación y oportunidades', text: 'Paneles de exposición comercial, networking, ruedas de negocio y vitrinas sectoriales.' },
  { day: 'Día 03', title: 'Marca, comunidad y prensa', text: 'Activaciones de marca, contenido para medios, entrevistas en vivo y campañas de visibilidad social.' },
  { day: 'Día 04–05', title: 'Cierre, seguimiento y expansión', text: 'Reuniones bilaterales, continuidad post evento, firma de acuerdos y nuevas rutas de colaboración.' },
];

/* ══════════════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════════════ */
function HeroEditorial() {
  return (
    <section className="v2-hero">
      <div className="v2-hero__bg">
        <img 
          src="/Galeria/Ponencias/IMG_6323.JPG" 
          alt="Liderazgo Femenino" 
          className="v2-hero__bg-img" 
        />
        <div className="v2-hero__bg-overlay"></div>
      </div>
      
      <div className="v2-hero__content-wrap">
        <Reveal delay={200}>
          <div className="v2-hero__meta">
            <span className="v2-hero__eyebrow">Edición 2027</span>
            <span className="v2-hero__date">9–13 JUN / TORONTO</span>
          </div>
          <h1 className="v2-hero__title">
            México <br />
            en Toronto
            <em>Con todo su poder</em>
          </h1>
          <p className="v2-hero__desc">
            La plataforma binacional que transforma el liderazgo mexicano en oportunidades concretas de negocio, cultura y desarrollo.
          </p>
          <div className="v2-hero__actions">
            <a href="#contacto" className="v2-btn v2-btn--pink">Reservar Lugar</a>
            <a href="#agenda" className="v2-btn v2-btn--outline">Ver Agenda</a>
          </div>
        </Reveal>
      </div>

      <div className="v2-hero__scroll-indicator">
        <span>Descubre más</span>
        <div className="v2-hero__scroll-line"></div>
      </div>
    </section>
  );
}

function StatementEditorial() {
  return (
    <section className="v2-statement">
      <img src="/pdf_images/page_1_image_3.png" alt="" className="v2-statement__watermark" />
      <Reveal>
        <h2 className="v2-statement__title">
          Consolidar la proyección <br /><em>internacional</em> de México.
        </h2>
      </Reveal>
    </section>
  );
}

function PillaresEditorial() {
  return (
    <section className="v2-pillars">
      <div className="v2-pillars__header">
        <h2 className="v2-pillars__title">
          Tres Pilares <br />
          <span className="v2-text-pink">Un Propósito</span>
        </h2>
      </div>

      <div className="v2-pillars__grid">
        {pillars.map((p, i) => (
          <Reveal key={i} delay={i * 200} className="v2-pillar">
            <span className="v2-pillar__num">{String(i + 1).padStart(2, '0')}</span>
            <div className="v2-pillar__content">
              <h3 className="v2-pillar__title">{p.title}</h3>
              <p className="v2-pillar__desc">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function IndustriesMagazine() {
  return (
    <section className="v2-industries">
      <div className="v2-industries__header">
        <Reveal>
          <h2 className="v2-industries__title">
            Alcance Sectorial <br />
            <em>Nuestra Oferta</em>
          </h2>
        </Reveal>
      </div>

      <div className="v2-industries__grid">
        {industries.map((ind, i) => (
          <Reveal key={i} className="v2-industry-card">
            <img src={ind.img} alt={ind.name} className="v2-industry-card__img" loading="lazy" />
            <div className="v2-industry-card__overlay" />
            <div className="v2-industry-card__content">
              <span className="v2-industry-card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="v2-industry-card__title">{ind.name}</h3>
              <p className="v2-industry-card__desc">{ind.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AgendaEstructurada() {
  return (
    <section className="v2-agenda">
      <div className="v2-agenda__header">
        <Reveal>
          <h2 className="v2-agenda__title">
            Agenda Oficial <br />
            <em>Impacto Binacional</em>
          </h2>
        </Reveal>
      </div>

      <div className="v2-agenda-timeline">
        {agenda.map((item, i) => (
          <Reveal key={i} className="v2-agenda-item" delay={i * 100}>
            <div className="v2-agenda-item__day">{item.day}</div>
            <div className="v2-agenda-item__content">
              <h3 className="v2-agenda-item__title">{item.title}</h3>
              <p className="v2-agenda-item__text">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function PageV2() {
  return (
    <div className="v2-editorial-wrapper">
      <HeroEditorial />
      <StatementEditorial />
      <PillaresEditorial />
      <IndustriesMagazine />
      <AgendaEstructurada />
    </div>
  );
}
