'use client';

import { useEffect, useRef, useState } from 'react';

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
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${inView ? 'revealed' : ''} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const stats = [
  { 
    value: '+5,000', 
    label: 'Asistentes Proyectados',
    desc: 'Mujeres líderes, ejecutivas y emprendedoras de alto impacto.'
  },
  { 
    value: '50+', 
    label: 'Conferencias Magistrales',
    desc: 'Voces internacionales que inspiran y transforman industrias.'
  },
  { 
    value: 'B2B', 
    label: 'Networking Estratégico',
    desc: 'Mesas de negocios para cerrar alianzas comerciales binacionales.'
  },
  { 
    value: '100%', 
    label: 'Talento Mexicano',
    desc: 'Proyección global de nuestra cultura, innovación y excelencia.'
  },
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


function MissionVision() {
  return (
    <section className="mv-split" id="mision" aria-labelledby="mv-title">
      <div className="mv-split__inner">
        <Reveal>
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
    <section className="stmt" id="estadisticas" aria-label="Estadísticas">
      <div className="stmt__scanlines" aria-hidden="true" />
      <img src="/recursos/Recurso 8.png" alt="" aria-hidden="true" className="stmt__butterfly" />
      <div className="stmt__ghost-date" aria-hidden="true" style={{ fontSize: '15rem', opacity: 0.5 }}>IMPACTO</div>
      
      <div className="stmt__grid" style={{ alignItems: 'flex-start' }}>
        {/* LEFT COLUMN */}
        <div className="stmt__col stmt__col--left">
          <Reveal>
            <span className="stmt__location">
              <span className="stmt__location-dot" />
              Toronto · Canadá
            </span>
            <h2 className="stmt__headline" style={{ marginTop: '16px' }}>
              El liderazgo<br />
              mexicano<br />
              <em>no tiene<br />fronteras</em>
            </h2>
          </Reveal>
        </div>

        {/* CENTER COLUMN */}
        <div className="stmt__col stmt__col--center" aria-hidden="true">
          <div className="stmt__rule" />
          <img src="/recursos/Recurso 8.png" alt="" className="stmt__center-butterfly" />
          <div className="stmt__rule" />
        </div>

        {/* RIGHT COLUMN */}
        <div className="stmt__col stmt__col--right">
          <div className="stats-bar__grid">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className="stat-card">
                <div className="stat-card__glow"></div>
                <div className="stat-card__number">{s.value}</div>
                <div className="stat-card__label">{s.label}</div>
                <div className="stat-card__desc" style={{ 
                  marginTop: '12px', 
                  fontSize: '0.8rem', 
                  lineHeight: 1.5, 
                  color: 'rgba(255,255,255,0.5)' 
                }}>
                  {s.desc}
                </div>
              </Reveal>
            ))}
          </div>
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


/* ══════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════ */
export default function NosotrosPage() {
  return (
    <>
      <MissionVision />
      <StatsBar />
      <ValuesGrid />
      <Timeline />
    </>
  );
}
