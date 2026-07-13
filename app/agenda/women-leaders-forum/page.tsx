"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Heart, Users, ArrowLeft, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Mariposa } from '@/components/BrandAssets';

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

const mockForumSpeakers = [
  {
    name: "María López",
    role: "Fundadora de Mujeres en STEM",
    desc: "Líder mexicana en la industria tecnológica binacional, impulsora del desarrollo de software educativo en América del Norte.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    detailsPath: "/invitados/maria-lopez"
  },
  {
    name: "Valeria Romero",
    role: "Autora de 'Lidera sin Límites'",
    desc: "Mentora de negocios y conferencista motivacional internacional sobre resiliencia en la alta dirección corporativa.",
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
    detailsPath: "/invitados/valeria-romero"
  },
  {
    name: "Dra. Emily Wong",
    role: "Directora en Nordic Wellness Co.",
    desc: "Especialista en cadenas globales de suministro y comercio justo con enfoque en cooperativas lideradas por mujeres.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    detailsPath: "/compradores/emily-wong"
  }
];

const mockTopics = [
  {
    title: "Liderazgo en Mercados Internacionales",
    desc: "Estrategias de negociación y adaptación cultural para la internacionalización exitosa de proyectos empresariales liderados por mujeres."
  },
  {
    title: "Finanzas Binacionales e Inversión",
    desc: "Acceso a fondos ángel canadienses, capital de riesgo y programas de financiamiento enfocados en el empoderamiento binacional."
  },
  {
    title: "Sustentabilidad y Economía Circular",
    desc: "Cómo integrar modelos de negocio con responsabilidad ambiental positiva para cumplir los estándares de consumo norteamericanos."
  }
];

export default function WomenLeadersForumPage() {
  const forumAgenda = [
    {
      time: '10:00 AM - 11:30 AM',
      title: 'Panel: Liderazgo Femenino en Mercados Internacionales',
      location: 'Auditorio Magna',
      desc: 'Mesa de discusión entre empresarias mexicanas consolidadas y directivas canadienses sobre barreras, retos y oportunidades en el Tratado Comercial (T-MEC).'
    },
    {
      time: '12:00 PM - 01:30 PM',
      title: 'Conferencia Magistral: Habilidades de Negociación y Crecimiento Global',
      location: 'Auditorio Magna',
      desc: 'Taller conceptual y práctico enfocado en habilidades blandas, estructuración de acuerdos internacionales y resiliencia corporativa.'
    },
    {
      time: '03:00 PM - 05:00 PM',
      title: 'Mesas Redondas y Talleres Temáticos de Liderazgo',
      location: 'Salas B, C & D',
      desc: 'Grupos de trabajo interactivos donde las delegadas cooperan para resolver casos prácticos de estructuración de negocios en América del Norte.'
    }
  ];

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* Back Link */}
        <Link href="/agenda" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)', textDecoration: 'none', fontWeight: 700, marginBottom: '40px' }}>
          <ArrowLeft size={16} /> Volver a Agenda General
        </Link>

        {/* 1. Temáticas Section */}
        <div style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <span className="section__label">Líneas de Discusión</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Temáticas del Foro
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {mockTopics.map((topic, idx) => (
              <Reveal key={topic.title} delay={idx * 100}>
                <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)' }}>
                  <div style={{ color: 'var(--magenta)', marginBottom: '20px' }}><BookOpen size={32} /></div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', lineHeight: 1.25 }}>{topic.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{topic.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 2. Conferencistas Grid */}
        <div style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px', textAlign: 'center' }}>
            <span className="section__label">Keynotes Destacadas</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Conferencistas del Foro
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
            {mockForumSpeakers.map((speaker, idx) => (
              <Reveal key={speaker.name} delay={idx * 100}>
                <Link href={speaker.detailsPath} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ 
                    background: '#fff', 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    boxShadow: '0 15px 35px rgba(0,25,76,0.06)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,25,76,0.12)';
                    const iconBox = e.currentTarget.querySelector('.card-btn') as HTMLElement;
                    if (iconBox) { iconBox.style.background = 'var(--cyan)'; iconBox.style.color = '#fff'; }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,25,76,0.06)';
                    const iconBox = e.currentTarget.querySelector('.card-btn') as HTMLElement;
                    if (iconBox) { iconBox.style.background = 'rgba(0,186,211,0.1)'; iconBox.style.color = 'var(--cyan)'; }
                  }}>
                    {/* COVER PHOTO */}
                    <div style={{ height: '160px', width: '100%', position: 'relative', background: '#f0f0f0' }}>
                      <img src={speaker.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                    </div>

                    {/* FLOATING LOGO */}
                    <div style={{ 
                      width: '70px', height: '70px', background: '#fff', borderRadius: '50%', padding: '4px',
                      position: 'absolute', top: '125px', left: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                    }}>
                      <img src={speaker.photo} alt={speaker.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    </div>

                    {/* BODY */}
                    <div style={{ padding: '56px 24px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '4px', lineHeight: 1.2, textTransform: 'uppercase' }}>{speaker.name}</h3>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {speaker.role}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '32px', flexGrow: 1 }}>{speaker.desc}</p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--navy)' }}>Ver perfil completo</span>
                        <div className="card-btn" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,186,211,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)', transition: 'background 0.3s, color 0.3s' }}>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 3. Programa Completo */}
        <div id="programa" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <span className="section__label">Cronograma</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Programa del Foro
            </h2>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {forumAgenda.map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div style={{ background: '#fff', borderRadius: '24px', padding: '36px 40px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.02)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', alignItems: 'start' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--magenta)', fontWeight: 800, fontSize: '0.95rem' }}>
                      <Clock size={16} /> {item.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <MapPin size={16} /> {item.location}
                    </div>
                  </div>

                  <div style={{ flexGrow: 2 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', margin: '0 0 12px 0', lineHeight: 1.25 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
