'use client';

import { useEffect, useRef, useState } from 'react';

function Reveal({
  children, className = '', delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
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
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const stats = [
  { value: '9–13', label: 'Junio 2027' },
  { value: '12+', label: 'Industrias' },
  { value: 'MX+CA', label: 'Plataforma binacional' },
  { value: '5 días', label: 'En Toronto' },
];

const values = [
  {
    title: 'Identidad sin fronteras',
    text: 'Proyectamos lo mejor de México al mundo, celebrando nuestra cultura, talento y creatividad como puente de entendimiento entre naciones.',
  },
  {
    title: 'Liderazgo con propósito',
    text: 'Ponemos a las mujeres mexicanas al centro, impulsando su desarrollo económico, profesional y social como motor de transformación.',
  },
  {
    title: 'Conexión que trasciende',
    text: 'Construimos redes binacionales sólidas entre México y Canadá, generando oportunidades de negocio, colaboración y crecimiento mutuo.',
  },
  {
    title: 'Impacto medible',
    text: 'Cada acción está diseñada para generar resultados concretos: exportaciones, alianzas estratégicas y proyectos de desarrollo sostenible.',
  },
];

const milestones = [
  { year: '2023', title: 'Primera edición', text: 'Nacimiento de Expo México Mujer como plataforma para conectar el talento mexicano con oportunidades internacionales.' },
  { year: '2024', title: 'Expansión binacional', text: 'Consolidación del evento con la participación de más de 12 industrias y la llegada de compradores canadienses.' },
  { year: '2025', title: 'Reconocimiento institucional', text: 'Aliados estratégicos de gobierno, cámaras de comercio y organismos internacionales se suman al proyecto.' },
  { year: '2027', title: 'Edición histórica', text: 'Cinco días en Toronto con la participación de líderes, empresarias y creadoras que transforman el liderazgo mexicano en legado.' },
];

/* ══════════════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════════════ */

function AboutHero() {
  return (
    <section className="about-hero" aria-label="Nosotros">
      <div className="about-hero__bg">
        <img
          className="about-hero__image"
          src="/Galeria/Ponencias/IMG_6323.JPG"
          alt=""
        />
        <div className="about-hero__overlay" />
      </div>
      <div className="about-hero__content-wrapper">
        <div className="about-hero__content">
          <div className="about-hero__eyebrow">Expo México Mujer 2027</div>
          <h1 className="about-hero__title">
            Nosotros
            <em>Nuestra historia</em>
          </h1>
          <p className="about-hero__desc">
            Una plataforma binacional que nace con la convicción de que el liderazgo
            mexicano femenino merece un escenario global. Cinco días en Toronto que
            transforman identidad en oportunidad.
          </p>
          <div className="hero-gradient__actions">
            <a href="#mision" className="btn btn--primary">
              Conocer más
            </a>
            <a href="#contacto" className="btn btn--outline">
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="mv-split" id="mision" aria-labelledby="mv-title">
      <div className="mv-split__inner">
        <Reveal>
          <span className="section__label">Nuestra razón de ser</span>
          <h2 className="section__title" id="mv-title">
            México en el mundo, <em>con todo su poder</em>
          </h2>
        </Reveal>

        <div className="mv-split__grid">
          <Reveal delay={150} className="mv-card">
            <div className="mv-card__label">Misión</div>
            <h3 className="mv-card__title">Conectar el talento mexicano con el mundo</h3>
            <p className="mv-card__text">
              Consolidar la proyección internacional de México a través de una plataforma
              que conecta el talento, la cultura y los productos mexicanos con oportunidades
              concretas en Canadá, impulsando el desarrollo económico y fortaleciendo la
              identidad nacional en el extranjero.
            </p>
          </Reveal>

          <Reveal delay={250} className="mv-card mv-card--vision">
            <div className="mv-card__label">Visión</div>
            <h3 className="mv-card__title">Ser el referente binacional del liderazgo femenino</h3>
            <p className="mv-card__text">
              Ser el referente binacional más importante para el liderazgo femenino
              mexicano, creando un ecosistema de negocios, cultura y comunidad que
              trascienda generaciones y fronteras.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="stats-bar" aria-label="Estadísticas">
      <div className="stats-bar__inner">
        <div className="stats-bar__grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <div className="stat-item__number">{s.value}</div>
              <div className="stat-item__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesGrid() {
  return (
    <section className="vals" id="valores" aria-labelledby="vals-title">
      <div className="vals__inner">
        <Reveal>
          <span className="section__label">Nuestros principios</span>
          <h2 className="section__title" id="vals-title">
            Lo que nos define, <em>nos distingue</em>
          </h2>
          <p className="section__desc" style={{ marginBottom: 0 }}>
            Cuatro valores que guían cada decisión, cada alianza y cada paso.
          </p>
        </Reveal>
        <div className="vals__grid reveal-stagger">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80} className="val-card">
              <span className="val-card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="val-card__title">{v.title}</h3>
              <p className="val-card__text">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="tl" id="historia" aria-labelledby="tl-title">
      <div className="tl__inner">
        <Reveal>
          <span className="section__label">Nuestra trayectoria</span>
          <h2 className="section__title" id="tl-title">
            De la visión a la <em>realidad</em>
          </h2>
          <p className="section__desc" style={{ marginBottom: 0 }}>
            Cada edición ha sido un paso firme hacia la consolidación de una comunidad
            binacional que impulsa el talento mexicano.
          </p>
        </Reveal>

        <div className="tl__line">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 100}>
              <div className={`tl-item ${i % 2 === 0 ? 'tl-item--left' : 'tl-item--right'}`}>
                <div className="tl-item__dot" />
                <div className="tl-item__side">
                  <div className="tl-item__year">{m.year}</div>
                  <h3 className="tl-item__title">{m.title}</h3>
                  <p className="tl-item__text">{m.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="about-cta" id="contacto" aria-labelledby="acta-title">
      <div className="about-cta__inner">
        <Reveal>
          <div className="about-cta__eyebrow">Sé parte de la historia</div>
          <h2 className="about-cta__title" id="acta-title">
            ¿Listo para construir el futuro<br />
            <em>del liderazgo mexicano?</em>
          </h2>
          <p className="about-cta__desc">
            Cada edición construye un legado. Únete a la plataforma que transforma
            el talento mexicano en oportunidades globales.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="about-cta__actions">
            <a href="mailto:francisco@expomexico.ca" className="about-cta__btn about-cta__btn--primary">
              Escribir por correo
            </a>
            <a href="https://wa.link/jboroz" className="about-cta__btn about-cta__btn--outline" target="_blank" rel="noopener noreferrer">
              Abrir WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════ */
export default function NosotrosPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <StatsBar />
      <ValuesGrid />
      <Timeline />
      <AboutCTA />
    </>
  );
}
