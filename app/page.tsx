'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { WordMark, Mariposa, DecoMariposa, ArrowDown } from '../components/BrandAssets';

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
  { 
    name: 'Gastronomía', 
    img: '/Galeria/Gastronomia/IMG_5924.JPG', 
    size: 'large', 
    desc: 'Sabor tradicional con proyección y exportación internacional.',
    carousel: [
      '/Galeria/Gastronomia/IMG_5940.JPG',
      '/Galeria/Gastronomia/IMG_6008.JPG',
      '/Galeria/Gastronomia/IMG_5981.JPG'
    ]
  },
  { 
    name: 'Arte y Cultura', 
    img: '/Galeria/Arte_y_Cultura/IMG_5885.JPG', 
    size: 'tall', 
    desc: 'Expresiones artísticas que proyectan el alma de México.',
    carousel: [
      '/Galeria/Arte_y_Cultura/IMG_5967.JPG',
      '/Galeria/Arte_y_Cultura/IMG_6244.JPG',
      '/Galeria/Arte_y_Cultura/IMG_6116.JPG'
    ]
  },
  { 
    name: 'Artesanías', 
    img: '/Galeria/Artesanias/IMG_5494.JPG', 
    size: 'large', 
    desc: 'Piezas únicas creadas por manos maestras mexicanas.',
    carousel: [
      '/Galeria/Artesanias/IMG_5928.JPG',
      '/Galeria/Artesanias/IMG_5931.JPG',
      '/Galeria/Artesanias/IMG_5923.JPG'
    ]
  },
  { 
    name: 'Turismo', 
    img: '/Galeria/Turismo/IMG_5986.JPG', 
    size: 'wide', 
    desc: 'Destinos inolvidables y experiencias culturales de primer nivel.',
    carousel: [
      '/Galeria/Turismo/IMG_5990.JPG',
      '/Galeria/Turismo/IMG_6140.JPG',
      '/Galeria/Turismo/IMG_5986.JPG'
    ]
  },
  { 
    name: 'Ponencias', 
    img: '/Galeria/Ponencias/IMG_4931.JPG', 
    size: 'wide', 
    desc: 'Intercambio académico y formación con visión global.',
    carousel: [
      '/Galeria/Ponencias/IMG_5999.JPG',
      '/Galeria/Ponencias/IMG_5169.JPG',
      '/Galeria/Ponencias/IMG_6117.JPG'
    ]
  },
  { 
    name: 'Moda y textiles', 
    img: '/Galeria/Moda_y_textiles/IMG_6031.JPG', 
    size: 'tall', 
    desc: 'Diseño, moda y tejidos con identidad artesanal única.',
    carousel: [
      '/Galeria/Moda_y_textiles/IMG_6032.JPG',
      '/Galeria/Moda_y_textiles/IMG_6036.JPG',
      '/Galeria/Moda_y_textiles/IMG_6023.JPG'
    ]
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
function CrossoverButterfly({ side = 'left', speed = 0.06 }: { side?: 'left' | 'right'; speed?: number }) {
  const scrollY = useScrollY();
  return (
    <div className="section-crossover">
      <img
        src="/recursos/Recurso 8.png"
        alt=""
        aria-hidden="true"
        className={`crossover-butterfly${side === 'right' ? ' crossover-butterfly--right' : ''}`}
        style={{ transform: `${side === 'right' ? 'scaleX(-1) ' : ''}rotate(${side === 'right' ? '5' : '-5'}deg) translateY(${scrollY * speed}px)` }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LOADER
══════════════════════════════════════════════════════════════ */
function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let raf: number;
    let current = 0;
    const step = () => {
      const speed = current < 60 ? 1.8 : current < 85 ? 0.9 : current < 97 ? 0.35 : 0.12;
      current = Math.min(100, current + speed);
      setProgress(Math.floor(current));
      if (current < 100) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => { setExiting(true); setTimeout(onDone, 900); }, 500);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`loader${exiting ? ' loader--exit' : ''}`} aria-hidden="true">
      <div className="loader__midline" />
      <div className="loader__mariposas-wrap">
        <Mariposa className="loader__mariposa loader__mariposa--1" />
        <Mariposa className="loader__mariposa loader__mariposa--2" />
      </div>
      <div className="loader__brand">
        Expo México Mujer
        <span className="loader__brand-sub">Toronto · Canadá</span>
      </div>
      <div className="loader__percent">
        {String(progress).padStart(2, '0')}<sup>%</sup>
      </div>
      <div className="loader__tagline">Cinco días · Un impacto binacional</div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   SCROLL PROGRESS + COLOR BAR
══════════════════════════════════════════════════════════════ */

/* Removed Nav - Moved to components/Nav.tsx */

/* ══════════════════════════════════════════════════════════════
/* ══════════════════════════════════════════════════════════════
   HERO — Editorial Gradient
══════════════════════════════════════════════════════════════ */
function Hero() {
  const videoUrl = ""; // No dynamic video URL, fallback to poster image

  return (
    <section className="hero-gradient" id="inicio" aria-label="Sección principal">

      {/* Background Video Layer */}
      <div className="hero-gradient__bg">
        <video
          className="hero-gradient__video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://portales.sre.gob.mx/saladeprensa/images/CatrinasFashionShowPhoto.jpg"
        >
          {videoUrl && <source src={videoUrl} type="video/mp4" />}
        </video>
        {/* Gradient overlay: Cream on the left, fading to transparent on the right */}
        <div className="hero-gradient__overlay"></div>
      </div>

      {/* Content Layer */}
      <div className="hero-gradient__content-wrapper">
        <div className="hero-gradient__left">
          <div className="hero-gradient__content">
            <div className="hero-gradient__eyebrow">Expo México Mujer 2027</div>
            <h1 className="hero-gradient__title">
              México en<br />Toronto
              <em>Con todo su poder</em>
            </h1>
            <p className="hero-gradient__desc">
              La plataforma binacional que transforma el liderazgo mexicano
              en oportunidades concretas de negocio, cultura y desarrollo.
              Cinco días que conectan a México con Canadá.
            </p>
            <div className="hero-gradient__actions">
              <a href="#registro" className="btn btn--primary">
                Reservar Lugar
              </a>
              <a href="#agenda" className="btn btn--outline">
                Ver Agenda
              </a>
            </div>
          </div>
        </div>
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
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
    <section className="section section--alt" id="pilares" aria-labelledby="pilares-title">
      <div className="section__inner" style={{ textAlign: 'center' }}>
        <Reveal>
          <span className="section__label">Nuestra propuesta</span>
          <h2 className="section__title section__title--center" id="pilares-title">
            Tres pilares, <em>un solo propósito</em>
          </h2>
          <p className="section__desc section__desc--center" style={{ marginBottom: 0 }}>
            Cada decisión está pensada para servir a estos principios.
          </p>
        </Reveal>
        <div className="pillars-grid reveal-stagger">
          {pillars.map((p, i) => (
            <Reveal key={p.title} className="pillar-card">
              <div className="pillar-card__accent" />
              <span className="pillar-card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="pillar-card__title">{p.title}</h3>
              <p className="pillar-card__text">{p.text}</p>
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
function IndustryModal({ 
  industry, 
  onClose 
}: { 
  industry: typeof industries[number] & { index: number }; 
  onClose: () => void 
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? industry.carousel.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === industry.carousel.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="ind-modal-overlay" onClick={onClose}>
      <div className="ind-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ind-modal__close" onClick={onClose} aria-label="Cerrar modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="ind-modal__grid">
          {/* Left Panel: Content */}
          <div className="ind-modal__info">
            <span className="ind-modal__num">{String(industry.index + 1).padStart(2, '0')}</span>
            <h3 className="ind-modal__title">{industry.name}</h3>
            <div className="ind-modal__divider" />
            <p className="ind-modal__desc">{industry.desc}</p>
            
            <div className="ind-modal__bullets">
              <div className="ind-modal__bullet">
                <span className="ind-modal__bullet-dot" />
                <span>Oportunidades de exportación e inversión binacional.</span>
              </div>
              <div className="ind-modal__bullet">
                <span className="ind-modal__bullet-dot" />
                <span>Vinculación con compradores del mercado canadiense.</span>
              </div>
            </div>

            <a href="#registro" className="btn btn--primary ind-modal__cta" onClick={onClose}>
              Reservar espacio en este sector
            </a>
          </div>

          {/* Right Panel: Image Carousel */}
          <div className="ind-modal__carousel">
            <div className="ind-modal__slides-wrap">
              {industry.carousel.map((slideImg, slideIdx) => (
                <div 
                  key={slideIdx} 
                  className={`ind-modal__slide ${slideIdx === currentSlide ? 'ind-modal__slide--active' : ''}`}
                >
                  <img src={slideImg} alt={`${industry.name} slide ${slideIdx + 1}`} className="ind-modal__slide-img" />
                  <div className="ind-modal__slide-overlay" />
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button className="ind-modal__arrow ind-modal__arrow--prev" onClick={handlePrev}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="ind-modal__arrow ind-modal__arrow--next" onClick={handleNext}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicators / Dots */}
            <div className="ind-modal__dots">
              {industry.carousel.map((_, slideIdx) => (
                <button
                  key={slideIdx}
                  className={`ind-modal__dot ${slideIdx === currentSlide ? 'ind-modal__dot--active' : ''}`}
                  onClick={() => setCurrentSlide(slideIdx)}
                  aria-label={`Ir al slide ${slideIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Industries() {
  const [activeIndustry, setActiveIndustry] = useState<number | null>(null);

  return (
    <section className="section" id="industrias" aria-labelledby="industrias-title">
      <div className="section__inner" style={{ textAlign: 'center' }}>
        <Reveal>
          <span className="section__label">Alcance sectorial</span>
          <h2 className="section__title section__title--center" id="industrias-title">
            Todas las industrias. <em>Un solo escenario.</em>
          </h2>
          <p className="section__desc section__desc--center">
            Doce sectores con presencia destacada en la expo, reflejando la
            diversidad y riqueza de la oferta mexicana.
          </p>
        </Reveal>

        <div className="ind-puzzle-container reveal-stagger">
          {industries.map((ind, i) => (
            <Reveal 
              key={ind.name} 
              className={`ind-puzzle-card ind-puzzle-card--${ind.size}`}
              onClick={() => setActiveIndustry(i)}
            >
              <div className="ind-card__img-wrap">
                <img src={ind.img} alt={ind.name} className="ind-card__img" loading="lazy" />
                <div className="ind-card__overlay" />
              </div>
              <div className="ind-card__content">
                <span className="ind-card__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ind-card__title">{ind.name}</h3>
                <p className="ind-card__desc">{ind.desc}</p>
                <div className="ind-card__arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {activeIndustry !== null && (
        <IndustryModal 
          industry={{ ...industries[activeIndustry], index: activeIndustry }}
          onClose={() => setActiveIndustry(null)}
        />
      )}
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
          <span className="section__label">Agenda propuesta</span>
          <h2 className="section__title" id="agenda-title">
            Cinco días de <em>impacto binacional</em>
          </h2>
          <p className="section__desc">
            Una estructura clara que ayuda a decidir cómo participar en cada fase del evento.
          </p>
        </Reveal>
        <div className="agenda-timeline">
          {agenda.map((item, i) => (
            <Reveal key={item.day} className="agenda-item" delay={i * 80}>
              <div className="agenda-item__marker">
                <span className="agenda-item__dot" />
                <span className="agenda-item__counter">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div>
                <span className="agenda-item__day">{item.day}</span>
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
   CTA (Impact Dark Block)
══════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="cta--lux" id="registro" aria-labelledby="cta-title">
      <div className="cta__lux-inner">
        <Reveal>
          <div className="cta__lux-eyebrow">Únete a la plataforma</div>
          <h2 className="cta__lux-title" id="cta-title">
            ¿Lista para ser parte de<br />
            <em>esta edición?</em>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="cta__lux-actions">
            <a href="mailto:francisco@expomexico.ca" className="cta__lux-btn cta__lux-btn--primary">
              <span className="cta__lux-btn-text">Escribir por correo</span>
              <span className="cta__lux-btn-fill" />
            </a>
            <a href="https://wa.link/jboroz" className="cta__lux-btn cta__lux-btn--outline" target="_blank" rel="noopener noreferrer">
              Abrir WhatsApp
            </a>
          </div>
        </Reveal>
      </div>

      {/* Skyline de Toronto — silueta rosa sólida */}
      <div className="cta__skyline-wrap" style={{ position: 'relative', marginTop: '60px', overflow: 'hidden' }}>
        <img
          src="/recursos/Recurso 15.png"
          alt="Skyline de Toronto"
          style={{ 
            width: '100%', 
            height: 'auto', 
            display: 'block',
            filter: 'brightness(0) saturate(100%) invert(13%) sepia(87%) saturate(5451%) hue-rotate(319deg) brightness(84%) contrast(106%)'
          }}
        />
      </div>
    </section>
  );
}

/* Removed Footer - Moved to components/Footer.tsx */

/* ══════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Loader onDone={onDone} />

      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Hero />

        <div className="page-content-wrapper">
          <MarqueeTop />
          <StatementStrip />
          <MarqueeBottom />
          <Concept />
          {/* Mariposa cruzando la frontera entre Concept y Pillars */}
          <CrossoverButterfly side="left" speed={0.06} />
          <Pillars />
          <Industries />
          <Agenda />
          <Audience />
          <CrossoverButterfly side="right" speed={0.04} />
          <CTA />
        </div>
      </div>
    </>
  );
}
