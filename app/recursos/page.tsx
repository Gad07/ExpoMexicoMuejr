"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { WordMark } from '@/components/BrandAssets';

function Reveal({ children, delay = 0, className = "", style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } },
      { threshold: 0.08 }
    );
    o.observe(el); return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{
        ...style,
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}>
      {children}
    </div>
  );
}
import { ALL_NOTICIAS } from '../data/noticias';
export default function NoticiasPage() {
  const [search, setSearch] = useState("");
  
  const filtered = ALL_NOTICIAS.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        .news-hero {
          background: var(--navy);
          color: #fff;
          padding: 180px 7% 100px;
          position: relative;
          overflow: hidden;
        }
        .news-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 24px 24px; pointer-events: none;
        }
        
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 32px;
        }
        .news-card-full {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,46,81,0.06);
          transition: transform 0.4s, box-shadow 0.4s;
          display: flex; flex-direction: column;
          height: 100%;
          text-decoration: none;
        }
        .news-card-full:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,46,81,0.12);
        }
        .news-card-full__img {
          width: 100%; height: 240px; object-fit: cover;
          transition: transform 0.6s;
        }
        .news-card-full:hover .news-card-full__img { transform: scale(1.05); }
        .news-card-full__body {
          padding: 32px 24px;
          display: flex; flex-direction: column; flex: 1;
        }
      `}</style>

      <section className="news-hero">
        <div style={{ position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)', opacity: 0.03, pointerEvents: 'none' }}>
          <WordMark className="w-[600px] h-auto" />
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 1, marginBottom: '24px', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              Actualidad <br /><em style={{ color: 'var(--magenta)' }}>y Prensa</em>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: 1.6 }}>
              Todas las noticias, anuncios oficiales y novedades sobre la plataforma binacional Expo México Mujer 2027.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '80px 7%', background: 'var(--cream)', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '48px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
              <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Buscar noticias..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '14px 20px 14px 48px', borderRadius: '30px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'var(--font-body)', outline: 'none' }}
              />
            </div>
          </div>

          <div className="news-grid">
            {filtered.map((news, i) => (
              <Reveal key={news.id} delay={i * 100}>
                <Link href={`/recursos/noticia/${news.id}`} className="news-card-full">
                  <div style={{ overflow: 'hidden', position: 'relative' }}>
                    <img src={news.image} alt={news.title} className="news-card-full__img" />
                    {news.featured && (
                      <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--magenta)', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Destacado
                      </div>
                    )}
                  </div>
                  <div className="news-card-full__body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.75rem', color: 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{news.category}</span>
                      <span style={{ color: 'var(--line)' }}>•</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{news.date}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '12px', lineHeight: 1.2 }}>{news.title}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.6, marginBottom: '24px' }}>{news.excerpt}</p>
                    <span style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Leer nota <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--text-muted)' }}>No se encontraron noticias con ese término.</p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
