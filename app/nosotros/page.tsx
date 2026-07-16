'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

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
   COMPONENTS
══════════════════════════════════════════════════════════════ */


function MissionVision() {
  const { t } = useLanguage();
  return (
    <section className="mv-split" id="mision" aria-labelledby="mv-title">
      <div className="mv-split__inner">
        <Reveal>
          <h2 className="section__title" id="mv-title">
            {t('pages.nosotros.missionVisionTitle').split(',')[0]}, <em>{t('pages.nosotros.missionVisionTitle').split(',').slice(1).join(',').trim()}</em>
          </h2>
        </Reveal>

        <div className="mv-split__grid">
          <Reveal delay={150} className="mv-card">
            <div className="mv-card__label">{t('pages.nosotros.misionLabel')}</div>
            <h3 className="mv-card__title">{t('pages.nosotros.misionTitle')}</h3>
            <p className="mv-card__text">
              {t('pages.nosotros.misionText')}
            </p>
          </Reveal>

          <Reveal delay={250} className="mv-card mv-card--vision">
            <div className="mv-card__label">{t('pages.nosotros.visionLabel')}</div>
            <h3 className="mv-card__title">{t('pages.nosotros.visionTitle')}</h3>
            <p className="mv-card__text">
              {t('pages.nosotros.visionText')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const { t } = useLanguage();

  const stats = [
    { 
      value: '+5,000', 
      label: t('pages.nosotros.statsAsistentesLabel'),
      desc: t('pages.nosotros.statsAsistentesDesc')
    },
    { 
      value: '50+', 
      label: t('pages.nosotros.statsConferenciasLabel'),
      desc: t('pages.nosotros.statsConferenciasDesc')
    },
    { 
      value: 'B2B', 
      label: t('pages.nosotros.statsNetworkingLabel'),
      desc: t('pages.nosotros.statsNetworkingDesc')
    },
    { 
      value: '100%', 
      label: t('pages.nosotros.statsTalentoLabel'),
      desc: t('pages.nosotros.statsTalentoDesc')
    },
  ];

  return (
    <section className="stmt" id="estadisticas" aria-label="Estadísticas">
      <div className="stmt__scanlines" aria-hidden="true" />
      <img src="/recursos/Recurso 8.png" alt="" aria-hidden="true" className="stmt__butterfly" loading="lazy" width="100" height="100" />
      <div className="stmt__ghost-date" aria-hidden="true" style={{ fontSize: '15rem', opacity: 0.5 }}>IMPACTO</div>
      
      <div className="stmt__grid" style={{ alignItems: 'flex-start' }}>
        {/* LEFT COLUMN */}
        <div className="stmt__col stmt__col--left">
          <Reveal>
            <span className="stmt__location">
              <span className="stmt__location-dot" />
              {t('pages.nosotros.statsLocation')}
            </span>
            <h2 className="stmt__headline" style={{ marginTop: '16px' }}>
              {t('pages.nosotros.statsHeadline').split(' ')[0]}<br />
              {t('pages.nosotros.statsHeadline').split(' ')[1]}<br />
              <em>{t('pages.nosotros.statsHeadline').split(' ').slice(2).join(' ').split(' ').slice(0, 1).join(' ')}<br />{t('pages.nosotros.statsHeadline').split(' ').slice(2).join(' ').split(' ').slice(1).join(' ')}</em>
            </h2>
          </Reveal>
        </div>

        {/* CENTER COLUMN */}
        <div className="stmt__col stmt__col--center" aria-hidden="true">
          <div className="stmt__rule" />
          <img src="/recursos/Recurso 8.png" alt="" className="stmt__center-butterfly" loading="lazy" width="100" height="100" />
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
  const { t } = useLanguage();

  const values = [
    {
      title: t('pages.nosotros.val1Title'),
      text: t('pages.nosotros.val1Text'),
    },
    {
      title: t('pages.nosotros.val2Title'),
      text: t('pages.nosotros.val2Text'),
    },
    {
      title: t('pages.nosotros.val3Title'),
      text: t('pages.nosotros.val3Text'),
    },
    {
      title: t('pages.nosotros.val4Title'),
      text: t('pages.nosotros.val4Text'),
    },
  ];

  return (
    <section className="vals" id="valores" aria-labelledby="vals-title">
      <div className="vals__inner">
        <Reveal>
          <h2 className="section__title" id="vals-title">
            {t('pages.nosotros.valsTitle').split(',')[0]}, <em>{t('pages.nosotros.valsTitle').split(',').slice(1).join(',').trim()}</em>
          </h2>
          <p className="section__desc" style={{ marginBottom: 0 }}>
            {t('pages.nosotros.valsDesc')}
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
  const { t } = useLanguage();

  const milestones = [
    { year: t('pages.nosotros.milestone1Year'), title: t('pages.nosotros.milestone1Title'), text: t('pages.nosotros.milestone1Text') },
    { year: t('pages.nosotros.milestone2Year'), title: t('pages.nosotros.milestone2Title'), text: t('pages.nosotros.milestone2Text') },
    { year: t('pages.nosotros.milestone3Year'), title: t('pages.nosotros.milestone3Title'), text: t('pages.nosotros.milestone3Text') },
    { year: t('pages.nosotros.milestone4Year'), title: t('pages.nosotros.milestone4Title'), text: t('pages.nosotros.milestone4Text') },
  ];

  return (
    <section className="tl" id="historia" aria-labelledby="tl-title">
      <div className="tl__inner">
        <Reveal>
          <h2 className="section__title" id="tl-title">
            {t('pages.nosotros.tlTitle').split(' a ')[0]} a <em>{t('pages.nosotros.tlTitle').split(' a ')[1]}</em>
          </h2>
          <p className="section__desc" style={{ marginBottom: 0 }}>
            {t('pages.nosotros.tlDesc')}
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
