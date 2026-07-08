"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, PlayCircle, Clock, ArrowRight, BarChart, BookOpen } from 'lucide-react';
import { mockAcademy } from '../data/academy';

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

  const baseStyle: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  };
  const inViewStyle: React.CSSProperties = {
    opacity: 1,
    transform: 'translateY(0)',
    transitionDelay: `${delay}ms`,
  };

  return (
    <div ref={ref} className={className} style={{ ...baseStyle, ...(inView ? inViewStyle : {}) }}>
      {children}
    </div>
  );
}

export default function AcademyPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = mockAcademy.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="academy-page" style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '160px 48px 80px' }}>
        
        {/* Header & Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
          <Reveal>
            <span style={{ display: 'inline-block', color: 'var(--magenta)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '16px' }}>
              Videoteca Exclusiva
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 900, color: 'var(--navy)', margin: 0, lineHeight: 1 }}>
              Academy
            </h2>
            <p style={{ marginTop: '16px', fontSize: '1.2rem', color: 'var(--text)', maxWidth: '500px' }}>
              Revive ponencias, entrevistas y paneles inspiradores en cualquier momento y lugar.
            </p>
          </Reveal>

          <Reveal delay={100} style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--magenta)' }} size={20} />
              <input 
                type="text" 
                placeholder="Buscar por video, ponente o tema..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '16px 16px 16px 48px', 
                  borderRadius: '100px', 
                  border: '1px solid rgba(0,0,0,0.1)',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                  outline: 'none'
                }}
              />
            </div>
          </Reveal>
        </div>

        {/* ACADEMY GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, idx) => (
              <Reveal key={course.id} delay={idx * 50}>
                <Link href={`/academy/${course.slug}`} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
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
                    <div style={{ height: '200px', width: '100%', position: 'relative', background: '#f0f0f0' }}>
                      <img src={course.coverImage} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}></div>
                      
                      {/* CATEGORY PILL */}
                      <div style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--magenta)', color: '#fff', padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {course.category}
                      </div>
                    </div>

                    {/* FLOATING INSTRUCTOR AVATAR */}
                    <div style={{ 
                      width: '70px', height: '70px', background: '#fff', borderRadius: '50%', padding: '4px',
                      position: 'absolute', top: '165px', left: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                    }}>
                      <img src={course.instructorPhoto} alt={course.instructor} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    </div>

                    {/* BODY */}
                    <div style={{ padding: '48px 24px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      <div style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.8rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Por: {course.instructor}
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px', lineHeight: 1.2 }}>
                        {course.title}
                      </h3>
                      
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: '24px', flexGrow: 1 }}>
                        {course.description.substring(0, 110)}...
                      </p>

                      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', fontSize: '0.8rem', color: 'var(--navy)', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} color="var(--magenta)" /> {course.duration}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><BarChart size={14} color="var(--magenta)" /> {course.level}</div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--navy)' }}>Ver video</span>
                        <div className="card-btn" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,186,211,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)', transition: 'background 0.3s, color 0.3s' }}>
                          <PlayCircle size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px', background: '#fff', borderRadius: '24px' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--text)' }}>No se encontraron videos con ese término.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
