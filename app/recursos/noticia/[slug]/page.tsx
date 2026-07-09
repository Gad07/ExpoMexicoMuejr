import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { ALL_NOTICIAS } from '../../../data/noticias';

export function generateStaticParams() {
  return ALL_NOTICIAS.map((n) => ({
    slug: n.id.toString(),
  }));
}

export default async function NoticiaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const noticia = ALL_NOTICIAS.find(n => n.id.toString() === resolvedParams.slug);

  if (!noticia) {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--navy)' }}>Noticia no encontrada</h1>
        <Link href="/recursos" style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--magenta)', fontWeight: 700 }}>
          <ArrowLeft size={20} /> Volver a noticias
        </Link>
      </div>
    );
  }

  return (
    <div className="noticia-detail-page">
      <style>{`
        .noticia-hero {
          position: relative;
          height: 60vh;
          min-height: 400px;
          display: flex;
          align-items: flex-end;
          padding: 64px 7%;
          background: #000;
        }
        .noticia-hero__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.6;
        }
        .noticia-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,25,76,0.9) 0%, transparent 80%);
        }
        .noticia-hero__content {
          position: relative;
          z-index: 10;
          max-width: 1000px;
          width: 100%;
          margin: 0 auto;
        }
        .noticia-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .noticia-meta-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--magenta);
          color: #fff;
          padding: 6px 14px;
          border-radius: 20px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .noticia-meta-date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.8);
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 600;
        }
        .noticia-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          margin: 0;
          letter-spacing: -0.02em;
        }
        
        .noticia-body {
          padding: 80px 7%;
          background: var(--cream);
        }
        .noticia-body__inner {
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          padding: 64px;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.05);
        }
        .noticia-content {
          font-family: var(--font-body);
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text);
        }
        .noticia-content p {
          margin-bottom: 24px;
        }
        .noticia-content p:first-of-type {
          font-size: 1.35rem;
          color: var(--navy);
          font-weight: 600;
          line-height: 1.6;
          margin-bottom: 32px;
        }
        
        @media (max-width: 768px) {
          .noticia-body__inner { padding: 32px 24px; }
          .noticia-hero { padding: 40px 24px; }
        }
      `}</style>

      {/* Hero Section */}
      <div className="noticia-hero">
        <img src={noticia.image} alt={noticia.title} className="noticia-hero__img" />
        <div className="noticia-hero__overlay" />
        <div className="noticia-hero__content">
          <Link href="/recursos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', opacity: 0.8, marginBottom: '32px', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none' }}>
            <ArrowLeft size={20} /> Todas las noticias
          </Link>
          
          <div className="noticia-meta">
            <span className="noticia-meta-badge">
              <Tag size={14} /> {noticia.category}
            </span>
            <span className="noticia-meta-date">
              <Calendar size={16} /> {noticia.date}
            </span>
          </div>
          <h1 className="noticia-title">{noticia.title}</h1>
        </div>
      </div>

      {/* Body Section */}
      <div className="noticia-body">
        <div className="noticia-body__inner">
          <div className="noticia-content">
            <p>{noticia.excerpt}</p>
            <p>{noticia.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
