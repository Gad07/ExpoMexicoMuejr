"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, Globe, Award, ArrowLeft, Mail, Phone, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { Mariposa } from '@/components/BrandAssets';
import { useLanguage } from '@/context/LanguageContext';
import OptImage from '@/components/OptImage';

function Reveal({
  children, className = '', delay = 0, style = {},
}: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties; suppressHydrationWarning?: boolean }) {
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
    <div ref={ref} className={className} style={{
      ...style,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }}>
      {children}
    </div>
  );
}

const mockDirectors = [
  {
    name: "Francisco Solorio",
    role: "Director General",
    desc: "Líder binacional con más de 15 años de experiencia en relaciones comerciales, alianzas de inversión y desarrollo de proyectos de vinculación comercial entre México y Canadá.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    email: "francisco@expomexico.ca",
    phone: "+1 (416) 555-0199"
  },
  {
    name: "Luis García",
    role: "Director de Logística y Operaciones",
    desc: "Especialista en cadena de suministro global y logística internacional. Coordina aduanas, transporte y montajes de pabellones premium para garantizar el éxito de la Expo.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    email: "luis.garcia@expomexico.ca",
    phone: "+1 (416) 555-0188"
  }
];

export default function QueEsPage() {
  const { t, lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch('/api/admin/business-cards')
      .then(res => res.json())
      .then(data => {
        if (data.cards && Array.isArray(data.cards) && data.cards.length > 0) {
          setCards(data.cards);
        }
      })
      .catch(err => console.error('Error fetching business cards:', err));
  }, []);

  const FALLBACK_CARDS = [
    {
      id: "1",
      slug: "francisco-solorio",
      nombre: "Francisco Solorio",
      cargo: { es: "Director General" },
      email: "francisco@expomexico.ca",
      telefono: "+52 55 2719 9694",
      whatsapp: "525527199694",
      foto: "https://dl.dropboxusercontent.com/scl/fo/rz6jn3fv9jihppxtf4kfa/AC_6E-DB3TM7pKHqXtbX7C4/BRAND%20KIT/FOTO%20PERFIL/BRAND%20KIT%20EMM%202027_Mesa%20de%20trabajo%201.jpg?rlkey=5dsdca8p0wqpzmkbg3am9qtnt&st=h6srbm92&raw=1"
    },
    {
      id: "2",
      slug: "luis-garcia",
      nombre: "Luis García",
      cargo: { es: "Director de Operaciones" },
      email: "luis@expomexico.ca",
      telefono: "+52 722 551 4645",
      whatsapp: "527225514645",
      foto: "https://dl.dropboxusercontent.com/scl/fo/rz6jn3fv9jihppxtf4kfa/AKTI6khpuneoHnce3Y1nHLA/BRAND%20KIT/FOTO%20PERFIL/BRAND%20KIT%20EMM%202027_Mesa%20de%20trabajo%201%20copia.jpg?rlkey=5dsdca8p0wqpzmkbg3am9qtnt&st=bq8uwbsi&raw=1"
    }
  ];

  const displayCards = cards.length > 0 ? cards : FALLBACK_CARDS;
  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>

      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>

        {/* 1. Presentación del evento */}
        <div style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px', lineHeight: 1.1 }}>
                {t('pages.expo.queEs.intro.title')}
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text)', marginBottom: '24px' }}>
                {t('pages.expo.queEs.intro.p1')}
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: 0 }}>
                {t('pages.expo.queEs.intro.p2')}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', borderRadius: '32px', padding: '48px', boxShadow: '0 20px 50px rgba(0,25,76,0.04)', border: '1px solid rgba(0,0,0,0.01)', position: 'relative' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '24px' }}>{t('pages.expo.queEs.impact.title')}</span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--cyan)', marginTop: '4px' }}><CheckCircle size={20} /></div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px 0' }}>{t('pages.expo.queEs.impact.i1.title')}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{t('pages.expo.queEs.impact.i1.desc')}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--cyan)', marginTop: '4px' }}><CheckCircle size={20} /></div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px 0' }}>{t('pages.expo.queEs.impact.i2.title')}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{t('pages.expo.queEs.impact.i2.desc')}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--cyan)', marginTop: '4px' }}><CheckCircle size={20} /></div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px 0' }}>{t('pages.expo.queEs.impact.i3.title')}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{t('pages.expo.queEs.impact.i3.desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 2. Misión, Visión y Objetivos */}
        <div id="mision-vision" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              {t('pages.expo.queEs.mision.title')}
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <Reveal delay={100}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)' }}>
                <div style={{ color: 'var(--magenta)', marginBottom: '20px' }}><Target size={40} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>{t('pages.expo.queEs.mision.m1.title')}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                  {t('pages.expo.queEs.mision.m1.desc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)' }}>
                <div style={{ color: 'var(--cyan)', marginBottom: '20px' }}><Globe size={40} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>{t('pages.expo.queEs.mision.m2.title')}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                  {t('pages.expo.queEs.mision.m2.desc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)' }}>
                <div style={{ color: 'var(--navy)', marginBottom: '20px' }}><Award size={40} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>{t('pages.expo.queEs.mision.m3.title')}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                  {t('pages.expo.queEs.mision.m3.desc')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 3. Equipo Directivo */}
        <div id="equipo" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              {t('pages.expo.queEs.equipo.title')}
            </h2>
          </Reveal>

          <style>{`
            .c-grid { max-width: 1100px; margin: 40px auto 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; text-align: left; }
            .c-card {
              background: #fff; border-radius: 32px; padding: 48px; text-align: left;
              box-shadow: 0 10px 40px rgba(0,46,81,0.04); border: 1px solid rgba(0,46,81,0.05);
              transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
              position: relative; overflow: hidden; display: flex; flex-direction: column;
            }
            .c-card:hover { transform: translateY(-8px); box-shadow: 0 25px 60px rgba(0,46,81,0.08); }
            .c-card::after {
              content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 6px; background: var(--magenta);
              transform: scaleX(0); transform-origin: left; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .c-card:hover::after { transform: scaleX(1); }
            .c-avatar-box { width: 120px; height: 120px; border-radius: 24px; background: #FAF8F5; position: relative; overflow: hidden; margin-bottom: 32px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
            .c-avatar-box img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
            .c-name { font-family: var(--font-display); font-size: 2.5rem; color: var(--blue); margin-bottom: 8px; font-weight: 400; line-height: 1.1; }
            .c-role { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--magenta); margin-bottom: 40px; font-weight: 600; }
            .c-links { display: flex; flex-direction: column; gap: 20px; margin-bottom: 48px; flex: 1; }
            .c-link-item { display: flex; align-items: center; gap: 16px; color: #555; text-decoration: none; font-size: 1.1rem; transition: color 0.3s ease; }
            .c-link-item:hover { color: var(--magenta); }
            .c-link-icon-box { width: 48px; height: 48px; border-radius: 50%; background: #FAF8F5; display: flex; align-items: center; justify-content: center; color: var(--blue); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
            .c-link-item:hover .c-link-icon-box { background: var(--magenta); color: #fff; transform: scale(1.1); }
            .c-action { display: inline-flex; align-items: center; justify-content: space-between; padding: 20px 28px; background: #FAF8F5; border-radius: 100px; color: var(--blue); font-weight: 600; text-decoration: none; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); font-size: 1.05rem; }
            .c-action:hover { background: var(--magenta); color: #fff; box-shadow: 0 10px 20px rgba(214,0,110,0.2); }
            .c-action-icon { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
            .c-action:hover .c-action-icon { transform: translateX(6px); }
          `}</style>

          <div className="c-grid" suppressHydrationWarning>
            {displayCards.map((card, idx) => {
              const roleStr = typeof card.cargo === 'object' && card.cargo !== null
                ? (card.cargo[lang] || card.cargo.es || '')
                : (card.cargo || '');
              const waNum = (card.whatsapp || card.telefono || '').replace(/\D/g, '');
              return (
                <Reveal key={card.id || card.slug || idx} delay={(idx + 1) * 100} className="c-card" suppressHydrationWarning>
                  <div className="c-avatar-box" suppressHydrationWarning>
                    <OptImage src={card.foto} alt={card.nombre} fill style={{ objectFit: 'cover' }} sizes="120px" />
                  </div>
                  <h2 className="c-name">{card.nombre}</h2>
                  <div className="c-role">{roleStr || t('pages.contacto.directorGeneral')}</div>

                  <div className="c-links">
                    {card.email && (
                      <a href={`mailto:${card.email}`} className="c-link-item">
                        <div className="c-link-icon-box"><Mail size={20} /></div>
                        <span>{card.email}</span>
                      </a>
                    )}
                    {card.telefono && (
                      <a href={`tel:${card.telefono}`} className="c-link-item">
                        <div className="c-link-icon-box"><Phone size={20} /></div>
                        <span>{card.telefono}</span>
                      </a>
                    )}
                  </div>

                  <a href={waNum ? `https://wa.me/${waNum}` : (card.slug ? `/${card.slug.replace(/^\//, '')}` : '#')} className="c-action" target={waNum ? "_blank" : "_self"} rel="noopener noreferrer">
                    <span>{t('pages.expo.queEs.equipo.startChat')}</span>
                    <ArrowRight size={22} className="c-action-icon" />
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
