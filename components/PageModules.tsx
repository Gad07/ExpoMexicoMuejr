'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Send,
  Sparkles,
  Star,
  Play,
  Download,
  FileText,
  Check,
  TrendingUp,
  Users,
  Award,
  Globe,
  Quote,
} from 'lucide-react';
import CtaSkyline from './CtaSkyline';

export interface PageModule {
  id: string;
  type:
    | 'hero'
    | 'text_block'
    | 'feature_cards'
    | 'stats_bar'
    | 'testimonials'
    | 'timeline'
    | 'video_banner'
    | 'pricing_cards'
    | 'team_grid'
    | 'download_resource'
    | 'cta_banner'
    | 'faq'
    | 'gallery'
    | 'contact_form';
  title?: string;
  subtitle?: string;
  content?: string;
  bgImage?: string;
  bgColor?: string; // 'white' | 'cream' | 'dark'
  imagePosition?: 'left' | 'right' | 'top' | 'none';
  buttonText?: string;
  buttonUrl?: string;
  videoUrl?: string;
  columns?: number; // 2, 3, 4
  items?: Array<{
    title?: string;
    subtitle?: string;
    description?: string;
    icon?: string;
    image?: string;
    question?: string;
    answer?: string;
    url?: string;
    caption?: string;
    value?: string;
    label?: string;
    name?: string;
    role?: string;
    company?: string;
    quote?: string;
    price?: string;
    period?: string;
    features?: string[];
    fileSize?: string;
  }>;
}

interface Props {
  modules: PageModule[];
}

function Reveal({
  children,
  className = '',
  delay = 0,
  style = {},
}: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
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
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function PageModules({ modules }: Props) {
  if (!modules || !Array.isArray(modules) || modules.length === 0) {
    return null;
  }

  return (
    <div className="page-modules-wrapper" style={{ width: '100%', background: 'var(--cream, #f3ece0)', minHeight: '100vh', overflow: 'hidden' }}>
      {modules.map((mod, index) => (
        <React.Fragment key={mod.id || index}>
          {renderModule(mod, index)}
        </React.Fragment>
      ))}
    </div>
  );
}

function renderModule(mod: PageModule, index: number) {
  switch (mod.type) {
    case 'hero':
      return <ModuleHero module={mod} />;
    case 'text_block':
      return <ModuleTextBlock module={mod} index={index} />;
    case 'feature_cards':
      return <ModuleFeatureCards module={mod} />;
    case 'stats_bar':
      return <ModuleStatsBar module={mod} />;
    case 'testimonials':
      return <ModuleTestimonials module={mod} />;
    case 'timeline':
      return <ModuleTimeline module={mod} />;
    case 'video_banner':
      return <ModuleVideoBanner module={mod} />;
    case 'pricing_cards':
      return <ModulePricingCards module={mod} />;
    case 'team_grid':
      return <ModuleTeamGrid module={mod} />;
    case 'download_resource':
      return <ModuleDownloadResource module={mod} />;
    case 'cta_banner':
      return <ModuleCtaBanner module={mod} />;
    case 'faq':
      return <ModuleFaq module={mod} />;
    case 'gallery':
      return <ModuleGallery module={mod} />;
    case 'contact_form':
      return <ModuleContactForm module={mod} />;
    default:
      return null;
  }
}

// 1. HERO MODULE
function ModuleHero({ module }: { module: PageModule }) {
  return (
    <section
      style={{
        position: 'relative',
        padding: '130px 24px 100px',
        background: module.bgImage
          ? `linear-gradient(180deg, rgba(0,46,81,0.85) 0%, rgba(0,27,51,0.94) 100%), url(${module.bgImage}) center/cover no-repeat`
          : 'linear-gradient(135deg, var(--navy, #002E51) 0%, #001B33 100%)',
        color: '#ffffff',
        textAlign: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(228,0,124,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 'var(--container-narrow, 960px)', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <Reveal>
          {module.subtitle && (
            <span
              style={{
                display: 'inline-block',
                padding: '6px 20px',
                borderRadius: '30px',
                background: 'rgba(228,0,124,0.15)',
                border: '1px solid rgba(228,0,124,0.3)',
                color: 'var(--magenta, #E4007C)',
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontWeight: 900,
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              {module.subtitle}
            </span>
          )}
          {module.title && (
            <h2
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '-0.01em',
                lineHeight: 1.05,
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '24px',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              {module.title}
            </h2>
          )}
          {module.content && (
            <p
              style={{
                fontFamily: 'var(--font-body, "Nunito Sans", sans-serif)',
                fontSize: '1.15rem',
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '760px',
                margin: '0 auto 32px',
                lineHeight: 1.75,
              }}
            >
              {module.content}
            </p>
          )}
          {module.buttonText && module.buttonUrl && (
            <Link
              href={module.buttonUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 36px',
                background: 'var(--magenta, #E4007C)',
                color: '#ffffff',
                borderRadius: '40px',
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontWeight: 900,
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(228,0,124,0.4)',
              }}
            >
              {module.buttonText} <ArrowRight size={18} />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}

// 2. TEXT BLOCK MODULE
function ModuleTextBlock({ module, index }: { module: PageModule; index: number }) {
  const isDark = module.bgColor === 'dark';
  const isCream = module.bgColor === 'cream';

  const sectionBg = isDark
    ? 'var(--navy, #002E51)'
    : isCream
    ? 'var(--cream-dark, #ece4d4)'
    : 'transparent';

  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#ffffff';
  const textColor = isDark ? '#ffffff' : 'var(--navy, #002E51)';
  const bodyColor = isDark ? 'rgba(255,255,255,0.85)' : 'var(--text, #1a1410)';

  const hasImage = !!module.items?.[0]?.image || !!module.bgImage;
  const imageSrc = module.items?.[0]?.image || module.bgImage;
  const pos = module.imagePosition || 'right';

  return (
    <section
      style={{
        padding: '90px 24px',
        background: sectionBg,
        borderTop: index > 0 ? '1px solid rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div style={{ maxWidth: 'var(--container-width, 1320px)', margin: '0 auto' }}>
        <Reveal>
          <div
            style={{
              background: cardBg,
              borderRadius: '32px',
              padding: '56px 48px',
              boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.2)' : '0 16px 50px rgba(0, 46, 81, 0.04)',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.03)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: hasImage && (pos === 'left' || pos === 'right') ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr',
                gap: '56px',
                alignItems: 'center',
              }}
            >
              {hasImage && pos === 'left' && (
                <div>
                  <img
                    src={imageSrc}
                    alt={module.title || ''}
                    style={{
                      width: '100%',
                      maxHeight: '440px',
                      objectFit: 'cover',
                      borderRadius: '24px',
                      boxShadow: '0 20px 40px rgba(0, 46, 81, 0.12)',
                    }}
                  />
                </div>
              )}

              <div>
                {module.subtitle && (
                  <span
                    style={{
                      fontFamily: 'var(--font-display, "Futura", sans-serif)',
                      fontSize: '0.8rem',
                      fontWeight: 900,
                      color: 'var(--magenta, #E4007C)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '12px',
                    }}
                  >
                    {module.subtitle}
                  </span>
                )}
                {module.title && (
                  <h2
                    style={{
                      fontFamily: 'var(--font-display, "Futura", sans-serif)',
                      fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                      fontWeight: 900,
                      color: textColor,
                      textTransform: 'uppercase',
                      marginBottom: '24px',
                      lineHeight: 1.1,
                    }}
                  >
                    {module.title}
                  </h2>
                )}
                {module.content && (
                  <div
                    style={{
                      fontFamily: 'var(--font-body, "Nunito Sans", sans-serif)',
                      fontSize: '1.05rem',
                      lineHeight: 1.8,
                      color: bodyColor,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {module.content}
                  </div>
                )}
                {module.buttonText && module.buttonUrl && (
                  <div style={{ marginTop: '32px' }}>
                    <Link
                      href={module.buttonUrl}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '14px 30px',
                        background: 'var(--navy, #002E51)',
                        color: '#ffffff',
                        borderRadius: '30px',
                        fontFamily: 'var(--font-display, "Futura", sans-serif)',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        boxShadow: '0 8px 24px rgba(0,46,81,0.2)',
                      }}
                    >
                      {module.buttonText} <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>

              {hasImage && pos === 'right' && (
                <div>
                  <img
                    src={imageSrc}
                    alt={module.title || ''}
                    style={{
                      width: '100%',
                      maxHeight: '440px',
                      objectFit: 'cover',
                      borderRadius: '24px',
                      boxShadow: '0 20px 40px rgba(0, 46, 81, 0.12)',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// 3. FEATURE CARDS MODULE
function ModuleFeatureCards({ module }: { module: PageModule }) {
  const cols = module.columns || 3;
  const items = module.items || [];

  return (
    <section style={{ padding: '90px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: 'var(--container-width, 1320px)', margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          {module.subtitle && (
            <span
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: '0.8rem',
                fontWeight: 900,
                color: 'var(--magenta, #E4007C)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {module.subtitle}
            </span>
          )}
          {module.title && (
            <h2
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 900,
                color: 'var(--navy, #002E51)',
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {module.title}
            </h2>
          )}
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${320 / cols + 240}px, 1fr))`,
            gap: '32px',
          }}
        >
          {items.map((it, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div
                style={{
                  background: '#ffffff',
                  padding: '40px 32px',
                  borderRadius: '24px',
                  boxShadow: '0 12px 40px rgba(0, 46, 81, 0.04)',
                  border: '1px solid rgba(0,0,0,0.02)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {it.image ? (
                  <img src={it.image} alt={it.title || ''} style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '8px' }} />
                ) : (
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: 'rgba(40,172,227,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--cyan, #28ace3)',
                      marginBottom: '8px',
                    }}
                  >
                    <CheckCircle2 size={24} />
                  </div>
                )}
                {it.title && (
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, "Futura", sans-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      color: 'var(--navy, #002E51)',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    {it.title}
                  </h3>
                )}
                {it.description && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body, "Nunito Sans", sans-serif)',
                      fontSize: '0.98rem',
                      color: 'var(--text-muted, #6b5f4f)',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {it.description}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. STATS BAR MODULE (NEW)
function ModuleStatsBar({ module }: { module: PageModule }) {
  const items = module.items || [
    { value: '+5,000', label: 'Asistentes e Inversionistas' },
    { value: '50+', label: 'Conferencias y Keynotes' },
    { value: '100%', label: 'Talento y Liderazgo Femenino' },
    { value: 'B2B', label: 'Mesas de Negocios Internacionales' },
  ];

  return (
    <section
      style={{
        padding: '70px 24px',
        background: 'linear-gradient(135deg, var(--navy, #002E51) 0%, #001B33 100%)',
        color: '#ffffff',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-width, 1320px)', margin: '0 auto' }}>
        {module.title && (
          <Reveal style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: '1.8rem',
                fontWeight: 900,
                color: 'var(--magenta, #E4007C)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {module.title}
            </h2>
          </Reveal>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`, gap: '32px', textAlign: 'center' }}>
          {items.map((st, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display, "Futura", sans-serif)',
                    fontSize: 'clamp(2.8rem, 4.5vw, 3.8rem)',
                    fontWeight: 900,
                    color: '#ffffff',
                    lineHeight: 1,
                    textShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  }}
                >
                  {st.value || st.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body, "Nunito Sans", sans-serif)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.4,
                  }}
                >
                  {st.label || st.description}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5. TESTIMONIALS MODULE (NEW)
function ModuleTestimonials({ module }: { module: PageModule }) {
  const items = module.items || [];

  return (
    <section style={{ padding: '90px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: 'var(--container-width, 1320px)', margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          {module.subtitle && (
            <span
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: '0.8rem',
                fontWeight: 900,
                color: 'var(--magenta, #E4007C)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {module.subtitle}
            </span>
          )}
          <h2
            style={{
              fontFamily: 'var(--font-display, "Futura", sans-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--navy, #002E51)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {module.title || 'Historias de Éxito y Testimonios'}
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {items.map((t, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div
                style={{
                  background: '#ffffff',
                  padding: '40px 32px',
                  borderRadius: '24px',
                  boxShadow: '0 12px 40px rgba(0,46,81,0.04)',
                  border: '1px solid rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '24px',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ color: 'var(--magenta, #E4007C)', marginBottom: '16px' }}>
                    <Quote size={32} />
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body, "Nunito Sans", sans-serif)',
                      fontSize: '1.05rem',
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                      color: 'var(--text, #1a1410)',
                      margin: 0,
                    }}
                  >
                    "{t.quote || t.description}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '20px' }}>
                  {t.image && (
                    <img src={t.image} alt={t.name || ''} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  )}
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display, "Futura", sans-serif)', fontSize: '1rem', fontWeight: 800, color: 'var(--navy, #002E51)', margin: 0 }}>
                      {t.name || t.title}
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted, #6b5f4f)' }}>
                      {t.role || t.subtitle || t.company}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. TIMELINE MODULE (NEW)
function ModuleTimeline({ module }: { module: PageModule }) {
  const items = module.items || [];

  return (
    <section style={{ padding: '90px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: 'var(--container-narrow, 960px)', margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          {module.subtitle && (
            <span
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: '0.8rem',
                fontWeight: 900,
                color: 'var(--magenta, #E4007C)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {module.subtitle}
            </span>
          )}
          <h2
            style={{
              fontFamily: 'var(--font-display, "Futura", sans-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--navy, #002E51)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {module.title || 'Proceso y Pasos'}
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
          {items.map((step, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div
                style={{
                  background: '#ffffff',
                  padding: '32px',
                  borderRadius: '24px',
                  boxShadow: '0 10px 30px rgba(0,46,81,0.04)',
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'start',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--magenta, #E4007C)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    boxShadow: '0 6px 18px rgba(228,0,124,0.3)',
                  }}
                >
                  {idx + 1}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, "Futura", sans-serif)',
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      color: 'var(--navy, #002E51)',
                      margin: '0 0 8px 0',
                      textTransform: 'uppercase',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-muted, #6b5f4f)', margin: 0, lineHeight: 1.65 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. VIDEO BANNER MODULE (NEW)
function ModuleVideoBanner({ module }: { module: PageModule }) {
  return (
    <section style={{ padding: '90px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: 'var(--container-width, 1320px)', margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '40px' }}>
          {module.subtitle && (
            <span
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: '0.8rem',
                fontWeight: 900,
                color: 'var(--magenta, #E4007C)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {module.subtitle}
            </span>
          )}
          {module.title && (
            <h2
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 900,
                color: 'var(--navy, #002E51)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {module.title}
            </h2>
          )}
        </Reveal>

        <Reveal>
          <div
            style={{
              position: 'relative',
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,46,81,0.15)',
              background: '#000000',
              paddingTop: '56.25%', // 16:9 aspect ratio
            }}
          >
            {module.videoUrl ? (
              <iframe
                src={module.videoUrl}
                title={module.title || 'Video'}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #002E51 0%, #001B33 100%)', color: '#fff' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--magenta)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 10px 30px rgba(228,0,124,0.4)' }}>
                    <Play size={36} color="#fff" style={{ marginLeft: '4px' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', textTransform: 'uppercase' }}>{module.title || 'Video Promocional'}</h3>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// 8. PRICING CARDS MODULE (NEW)
function ModulePricingCards({ module }: { module: PageModule }) {
  const items = module.items || [];

  return (
    <section style={{ padding: '90px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: 'var(--container-width, 1320px)', margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          {module.subtitle && (
            <span
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: '0.8rem',
                fontWeight: 900,
                color: 'var(--magenta, #E4007C)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {module.subtitle}
            </span>
          )}
          <h2
            style={{
              fontFamily: 'var(--font-display, "Futura", sans-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--navy, #002E51)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {module.title || 'Opciones y Paquetes de Participación'}
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {items.map((plan, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div
                style={{
                  background: idx === 1 ? 'var(--navy, #002E51)' : '#ffffff',
                  color: idx === 1 ? '#ffffff' : 'var(--navy, #002E51)',
                  padding: '48px 36px',
                  borderRadius: '28px',
                  boxShadow: '0 16px 50px rgba(0,46,81,0.06)',
                  border: idx === 1 ? '2px solid var(--magenta)' : '1px solid rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, "Futura", sans-serif)',
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      color: idx === 1 ? '#ffffff' : 'var(--navy, #002E51)',
                      marginBottom: '16px',
                    }}
                  >
                    {plan.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '24px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: idx === 1 ? 'var(--magenta)' : 'var(--navy)' }}>
                      {plan.price || '$0'}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: idx === 1 ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
                      {plan.period || ' / evento'}
                    </span>
                  </div>

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.6, color: idx === 1 ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)', marginBottom: '32px' }}>
                    {plan.description}
                  </p>
                </div>

                <Link
                  href={module.buttonUrl || '/contacto'}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '14px',
                    borderRadius: '30px',
                    background: idx === 1 ? 'var(--magenta)' : 'var(--navy)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  }}
                >
                  {module.buttonText || 'Solicitar Información'}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 9. TEAM GRID MODULE (NEW)
function ModuleTeamGrid({ module }: { module: PageModule }) {
  const items = module.items || [];

  return (
    <section style={{ padding: '90px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: 'var(--container-width, 1320px)', margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          {module.subtitle && (
            <span
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: '0.8rem',
                fontWeight: 900,
                color: 'var(--magenta, #E4007C)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {module.subtitle}
            </span>
          )}
          <h2
            style={{
              fontFamily: 'var(--font-display, "Futura", sans-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--navy, #002E51)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {module.title || 'Directores y Ponentes'}
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {items.map((person, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,46,81,0.05)',
                  border: '1px solid rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '260px', overflow: 'hidden' }}>
                  <img src={person.image || '/recursos/Recurso 1.png'} alt={person.name || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: 'var(--navy)', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                    {person.name || person.title}
                  </h3>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                    {person.role || person.subtitle}
                  </span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {person.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 10. DOWNLOAD RESOURCE MODULE (NEW)
function ModuleDownloadResource({ module }: { module: PageModule }) {
  return (
    <section style={{ padding: '80px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: 'var(--container-narrow, 960px)', margin: '0 auto' }}>
        <Reveal>
          <div
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, var(--cream-light) 100%)',
              borderRadius: '28px',
              padding: '48px 40px',
              border: '2px solid rgba(40,172,227,0.2)',
              boxShadow: '0 16px 50px rgba(0,46,81,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: '280px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(228,0,124,0.1)', color: 'var(--magenta)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={32} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Documento Oficial PDF
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, color: 'var(--navy)', margin: '4px 0 6px 0', textTransform: 'uppercase' }}>
                  {module.title || 'Descargar Recurso'}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
                  {module.content || 'Obtén la guía oficial en formato PDF lista para consultar.'}
                </p>
              </div>
            </div>

            <a
              href={module.buttonUrl || '#'}
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                background: 'var(--navy, #002E51)',
                color: '#ffffff',
                borderRadius: '40px',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0,46,81,0.25)',
                whiteSpace: 'nowrap',
              }}
            >
              <Download size={18} /> {module.buttonText || 'Descargar PDF'}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// 11. CTA BANNER MODULE
function ModuleCtaBanner({ module }: { module: PageModule }) {
  return <CtaSkyline />;
}

// 12. FAQ MODULE
function ModuleFaq({ module }: { module: PageModule }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = module.items || [];

  return (
    <section style={{ padding: '90px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: 'var(--container-narrow, 960px)', margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          {module.subtitle && (
            <span
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: '0.8rem',
                fontWeight: 900,
                color: 'var(--magenta, #E4007C)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              {module.subtitle}
            </span>
          )}
          <h2
            style={{
              fontFamily: 'var(--font-display, "Futura", sans-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--navy, #002E51)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {module.title || 'Preguntas Frecuentes'}
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((it, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Reveal key={idx} delay={idx * 80}>
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: isOpen ? '1px solid var(--magenta, #E4007C)' : '1px solid rgba(0,46,81,0.08)',
                    boxShadow: isOpen ? '0 10px 30px rgba(228,0,124,0.1)' : '0 6px 20px rgba(0,46,81,0.03)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '22px 28px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      fontFamily: 'var(--font-display, "Futura", sans-serif)',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      color: isOpen ? 'var(--magenta, #E4007C)' : 'var(--navy, #002E51)',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <HelpCircle size={20} color={isOpen ? '#E4007C' : '#28ace3'} style={{ flexShrink: 0 }} />
                      {it.question}
                    </span>
                    {isOpen ? <ChevronUp size={20} color="#E4007C" /> : <ChevronDown size={20} color="#002E51" />}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 28px 24px 62px',
                        fontFamily: 'var(--font-body, "Nunito Sans", sans-serif)',
                        fontSize: '1.02rem',
                        color: 'var(--text-muted, #6b5f4f)',
                        lineHeight: 1.7,
                      }}
                    >
                      {it.answer}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 13. GALLERY MODULE
function ModuleGallery({ module }: { module: PageModule }) {
  const items = module.items || [];
  return (
    <section style={{ padding: '90px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: 'var(--container-width, 1320px)', margin: '0 auto' }}>
        {module.title && (
          <Reveal style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 900,
                color: 'var(--navy, #002E51)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {module.title}
            </h2>
          </Reveal>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {items.map((imgItem, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  height: '240px',
                  position: 'relative',
                  boxShadow: '0 12px 32px rgba(0, 46, 81, 0.08)',
                  background: '#ffffff',
                }}
              >
                <img
                  src={imgItem.image || imgItem.url}
                  alt={imgItem.caption || ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {imgItem.caption && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      inset: 'auto 0 0 0',
                      padding: '12px 18px',
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0,46,81,0.85) 100%)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-display, "Futura", sans-serif)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                    }}
                  >
                    {imgItem.caption}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 14. CONTACT FORM MODULE
function ModuleContactForm({ module }: { module: PageModule }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section style={{ padding: '90px 24px', background: 'transparent' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <Reveal>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '32px',
              padding: '56px 48px',
              boxShadow: '0 20px 60px rgba(0, 46, 81, 0.06)',
              border: '1px solid rgba(0,0,0,0.02)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display, "Futura", sans-serif)',
                fontSize: '2.2rem',
                fontWeight: 900,
                color: 'var(--navy, #002E51)',
                textTransform: 'uppercase',
                marginBottom: '12px',
                textAlign: 'center',
              }}
            >
              {module.title || 'Ponte en Contacto'}
            </h2>
            {module.subtitle && (
              <p style={{ fontFamily: 'var(--font-body, "Nunito Sans", sans-serif)', textAlign: 'center', color: 'var(--text-muted, #6b5f4f)', marginBottom: '32px', fontSize: '1.05rem' }}>
                {module.subtitle}
              </p>
            )}

            {submitted ? (
              <div
                style={{
                  padding: '32px',
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  color: '#059669',
                  borderRadius: '20px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-display, "Futura", sans-serif)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                }}
              >
                ¡Gracias por comunicarte con Expo México Mujer! Te responderemos muy pronto.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--navy, #002E51)', marginBottom: '8px', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,46,81,0.15)',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--navy, #002E51)', marginBottom: '8px', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,46,81,0.15)',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--navy, #002E51)', marginBottom: '8px', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                    Mensaje *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Escribe tu mensaje aquí..."
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,46,81,0.15)',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px',
                    background: 'var(--magenta, #E4007C)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '40px',
                    fontFamily: 'var(--font-display, "Futura", sans-serif)',
                    fontWeight: 900,
                    fontSize: '0.95rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(228,0,124,0.35)',
                    marginTop: '8px',
                  }}
                >
                  <Send size={18} /> Enviar Mensaje
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
