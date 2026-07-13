"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockAcademy } from '../../data/academy';
import { Clock, BarChart, PlayCircle, Quote, ArrowRight } from 'lucide-react';
import { Mariposa } from '@/components/BrandAssets';

function Reveal({
  children, className = '', delay = 0, style = {}
}: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
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
    <div ref={ref} className={className} style={{ 
      ...style,
      opacity: inView ? 1 : 0, 
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }}>
      {children}
    </div>
  );
}

export default function AcademyCourse({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const course = mockAcademy.find(ex => ex.slug === resolvedParams.slug);

  if (!course) {
    notFound();
  }

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* EDITORIAL HERO (SPLIT SCREEN) */}
      <div style={{ display: 'flex', minHeight: '100vh', flexWrap: 'wrap', position: 'relative' }}>
        
        {/* Left: Typography & Bio */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '160px 8% 10%', position: 'relative', zIndex: 10 }}>
          
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', opacity: 0.03, pointerEvents: 'none' }}>
            <Mariposa width={500} height={500} />
          </div>

          <Reveal delay={100}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', background: 'var(--magenta)', color: '#fff', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.75rem', borderRadius: '100px' }}>
                {course.category}
              </span>
            </div>
            
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 40px 0', color: 'var(--navy)' }}>
              {course.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ position: 'relative', paddingLeft: '40px', marginBottom: '48px' }}>
              <Quote size={80} color="var(--magenta)" style={{ position: 'absolute', left: '-20px', top: '-30px', opacity: 0.1, zIndex: -1 }} />
              <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: 'var(--navy)', fontWeight: 500, maxWidth: '600px', margin: '0 0 16px 0', fontStyle: 'italic' }}>
                "{course.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '30px', height: '2px', background: 'var(--cyan)' }}></div>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {course.instructor}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <a href="#video-player" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'var(--cyan)', color: '#fff', padding: '16px 40px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 15px 30px rgba(0,186,211,0.3)', transition: 'transform 0.3s, box-shadow 0.3s' }}>
                Ver video <PlayCircle size={20} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: Framed Instructor Photo */}
        <div style={{ flex: '1 1 400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10% 5%', minHeight: '60vh' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '3/4', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,25,76,0.15)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--navy)', animation: 'slideRight 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards', zIndex: 2 }}></div>
            <img 
              src={course.instructorPhoto} 
              alt={course.instructor} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', animation: 'scaleDown 2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }} 
            />
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes slideRight {
              0% { transform: translateX(0); }
              100% { transform: translateX(100%); }
            }
            @keyframes scaleDown {
              0% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          `}} />
        </div>
      </div>

      {/* EDITORIAL COURSE DETAILS */}
      <div style={{ padding: '140px 8%', background: '#fff', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center' }}>
          
          <Reveal delay={100} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ background: 'var(--cream)', padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '32px', borderLeft: '8px solid var(--magenta)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={24} color="var(--magenta)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text)' }}>Duración</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)' }}>{course.duration}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart size={24} color="var(--cyan)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--text)' }}>Categoría</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)' }}>{course.level}</div>
                </div>
              </div>
            </div>

          </Reveal>
          
          <Reveal delay={200}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, marginBottom: '32px', color: 'var(--navy)', lineHeight: 1 }}>
              Acerca de este video
            </h2>
            <div style={{ width: '60px', height: '4px', background: 'var(--magenta)', marginBottom: '32px' }}></div>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.9, color: 'var(--text)', fontWeight: 400, letterSpacing: '0.01em' }}>
              {course.description}
            </p>
          </Reveal>

        </div>
      </div>

      {/* VIDEO PLAYER SECTION */}
      <div id="video-player" style={{ padding: '120px 8% 160px', background: 'var(--navy)', color: '#fff' }}>
        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ display: 'block', color: 'var(--cyan)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '16px' }}>
              Reproductor
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, margin: 0 }}>
              Ver {course.category}
            </h2>
          </div>
        </Reveal>
        
        <Reveal delay={200}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', background: '#000', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', aspectRatio: '16/9', position: 'relative' }}>
            <video 
              src={course.videoUrl} 
              poster={course.coverImage}
              controls 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              Tu navegador no soporta el formato de video.
            </video>
          </div>
        </Reveal>
      </div>

    </div>
  );
}
