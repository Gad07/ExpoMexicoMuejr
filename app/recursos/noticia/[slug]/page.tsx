import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowDown, Play } from 'lucide-react';
import { ALL_NOTICIAS, Noticia } from '../../../data/noticias';

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

  // Define global styling and render template
  return (
    <div className="vogue-page">
      <style>{`
        /* ══════════════════════════════════════════════════════════
           GLOBAL VOGUE STYLE SYSTEM
           ══════════════════════════════════════════════════════════ */
        .vogue-page {
          background: #FCFBF9; /* Warm luxury paper linen background */
          color: #111111;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          padding-bottom: 120px;
          font-family: "Georgia", "Times New Roman", serif;
        }

        /* 15px Viewport Border Frame */
        .vogue-frame {
          position: fixed;
          inset: 15px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          pointer-events: none;
          z-index: 9999;
        }
        .vogue-frame::before, .vogue-frame::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          border: 1px solid rgba(0,0,0,0.3);
        }
        .vogue-frame::before { top: -4px; left: -4px; }
        .vogue-frame::after { bottom: -4px; right: -4px; }

        /* Top Page Navigation below the sticky main site nav */
        .vogue-nav {
          position: absolute;
          top: 130px;
          left: 40px;
          right: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-display), sans-serif;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          font-weight: 700;
          z-index: 100;
        }

        .vogue-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #000;
          text-decoration: none;
          transition: opacity 0.3s;
        }
        .vogue-back-link:hover {
          opacity: 0.6;
        }

        .vogue-nav-date {
          background: #000;
          color: #fff;
          padding: 6px 16px;
          letter-spacing: 0.25em;
          font-size: 0.65rem;
        }

        /* Hero / Magazine Cover Layout */
        .vogue-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          padding: 180px 5% 100px 5%;
        }

        .vogue-hero-img-wrap {
          position: absolute;
          top: 50%;
          right: 5%;
          transform: translateY(-50%);
          width: 45vw;
          height: 75vh;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.08);
          z-index: 1;
          border: 1px solid rgba(0,0,0,0.06);
          background: #FFF;
          padding: 8px;
        }

        .vogue-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Greyscale portrait specific for author news cover */
        .portrait-greyscale {
          filter: grayscale(100%) contrast(1.05);
        }

        .vogue-hero-text {
          position: relative;
          z-index: 20;
          max-width: 65vw;
          pointer-events: none;
        }

        .vogue-title {
          font-family: 'Didot', 'Bodoni MT', 'Times New Roman', serif;
          font-size: clamp(3.5rem, 9vw, 10rem);
          line-height: 0.85;
          margin: 0;
          text-transform: uppercase;
          color: var(--navy, #002E51);
          letter-spacing: -0.04em;
        }

        .vogue-title span.outline {
          display: block;
          color: #FCFBF9;
          -webkit-text-stroke: 2px var(--navy, #002E51);
          margin-left: 5vw;
        }

        .vogue-meta {
          margin-top: 60px;
          padding-left: 60px;
        }

        .vogue-meta-line {
          height: 1px;
          background: #000;
          margin-bottom: 24px;
          width: 100px;
        }

        .vogue-meta-text {
          font-family: var(--font-display), sans-serif;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 700;
          color: var(--navy);
          max-width: 350px;
          line-height: 1.6;
        }

        .vogue-meta-text em {
          font-family: 'Didot', serif;
          text-transform: none;
          font-size: 1.2rem;
          color: var(--magenta, #E4007C);
          font-style: italic;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 5%;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-display), sans-serif;
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        /* 2 Columns Editorial Layout */
        .vogue-article {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr);
          gap: 80px;
          box-sizing: border-box;
        }

        @media (max-width: 900px) {
          .vogue-article {
            grid-template-columns: 1fr;
            gap: 50px;
            padding: 60px 20px;
          }
          .vogue-hero-img-wrap {
            width: 80vw;
            right: 10vw;
            height: 60vh;
            position: relative;
            transform: none;
            top: 0;
            margin-top: 40px;
          }
          .vogue-hero {
            flex-direction: column;
            align-items: flex-start;
            padding-top: 180px;
            min-height: auto;
          }
          .vogue-hero-text {
            max-width: 100%;
          }
          .vogue-title {
            font-size: clamp(3.5rem, 12vw, 7rem);
          }
          .vogue-title span.outline {
            margin-left: 0;
          }
        }

        .vogue-sidebar {
          position: sticky;
          top: 120px;
          align-self: start;
          min-width: 0;
        }

        .vogue-category {
          font-family: var(--font-display), sans-serif;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--gold, #C79E45);
          margin-bottom: 24px;
          display: block;
        }

        .vogue-excerpt {
          font-family: 'Didot', 'Bodoni MT', 'Times New Roman', serif;
          font-size: clamp(1.8rem, 2.2vw, 2.6rem);
          line-height: 1.25;
          color: var(--navy);
          font-style: italic;
          margin-bottom: 40px;
        }

        .vogue-body {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 1.15rem;
          line-height: 1.9;
          color: #222;
          text-align: left;
          min-width: 0;
        }

        .vogue-body > p:first-of-type {
          font-size: 1.3rem;
          color: #000;
          line-height: 1.8;
        }

        .vogue-body > p:first-of-type::first-letter {
          float: left;
          font-family: 'Didot', 'Bodoni MT', serif;
          font-size: 7rem;
          line-height: 0.75;
          padding-top: 8px;
          padding-right: 14px;
          color: var(--magenta, #E4007C);
          font-weight: 300;
        }

        .vogue-body p {
          margin-bottom: 2.2rem;
        }

        .vogue-pull-quote {
          font-family: 'Didot', 'Georgia', serif;
          font-size: clamp(1.8rem, 2.4vw, 2.4rem);
          font-style: italic;
          font-weight: 400;
          line-height: 1.35;
          color: #111;
          margin: 60px 0;
          padding-left: 30px;
          border-left: 2px solid var(--magenta);
          position: relative;
        }

        .vogue-footer-mark {
          text-align: center;
          margin-top: 60px;
          font-family: var(--font-display), sans-serif;
          font-size: 2rem;
          color: var(--gold);
        }

        /* ══════════════════════════════════════════════════════════
           GALLERY SPECIFIC STYLES
           ══════════════════════════════════════════════════════════ */
        .editorial-images-column {
          display: flex;
          flex-direction: column;
          gap: 60px;
          margin-top: 40px;
        }

        .editorial-img-container {
          position: relative;
          box-shadow: 0 30px 60px rgba(0,0,0,0.04);
          background: #FFF;
          padding: 8px;
          border: 1px solid rgba(0,0,0,0.08);
        }

        .editorial-img-container img {
          width: 100%;
          height: auto;
          display: block;
          filter: grayscale(10%) contrast(1.02);
        }

        .editorial-img-caption {
          padding: 12px 4px 4px 4px;
          font-family: var(--font-display), sans-serif;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #555;
        }

        .editorial-img-container.offset-right {
          width: 90%;
          align-self: flex-end;
        }
        .editorial-img-container.offset-left {
          width: 90%;
          align-self: flex-start;
        }

        .gallery-collage-full {
          margin: 100px 0 0 0;
          background: #111;
          padding: 80px 0;
        }

        .collage-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .collage-inner {
            grid-template-columns: 1fr;
            padding: 0 20px;
          }
        }

        .collage-item {
          overflow: hidden;
          position: relative;
          aspect-ratio: 3/4;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .collage-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ══════════════════════════════════════════════════════════
           VIDEO SPECIFIC STYLES
           ══════════════════════════════════════════════════════════ */
        .video-editorial-frame {
          border: 1px solid rgba(0,0,0,0.1);
          padding: 10px;
          background: #FFF;
          box-shadow: 0 30px 60px rgba(0,0,0,0.04);
          margin-bottom: 40px;
        }

        .video-editorial-frame video {
          width: 100%;
          display: block;
          aspect-ratio: 16/9;
          object-fit: cover;
          background: #000;
        }

        .video-editorial-caption {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #777;
          text-align: right;
          margin-top: 10px;
          display: block;
        }

        .fashion-credits-box {
          border-top: 1.5px solid #111;
          margin-top: 40px;
          padding-top: 24px;
        }

        .credits-section-title {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.72rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #111;
          margin-bottom: 16px;
          display: block;
        }

        .credits-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .credit-row {
          display: flex;
          justify-content: space-between;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.72rem;
          border-bottom: 1px dashed rgba(0,0,0,0.1);
          padding-bottom: 8px;
        }
        .credit-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .credit-label {
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #777;
        }

        .credit-value {
          font-weight: 700;
          color: #111;
          text-transform: uppercase;
        }

        .cinematic-gallery-strip {
          border-top: 1px solid rgba(0,0,0,0.08);
          padding-top: 60px;
          margin-top: 80px;
        }

        .strip-title {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-bottom: 30px;
          color: #111;
          font-weight: 800;
          text-align: center;
        }

        .strip-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 768px) {
          .strip-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .strip-card {
          border: 1px solid rgba(0,0,0,0.1);
          padding: 6px;
          background: #FFF;
          box-shadow: 0 10px 25px rgba(0,0,0,0.03);
          aspect-ratio: 16/10;
          overflow: hidden;
          position: relative;
        }

        .strip-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          display: block;
        }

        .strip-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.2);
          pointer-events: none;
        }

        /* ══════════════════════════════════════════════════════════
           AUTHOR SPECIFIC STYLES
           ══════════════════════════════════════════════════════════ */
        .fashion-sidebar-topics {
          border-top: 1.5px solid #111;
          margin-top: 40px;
          padding-top: 24px;
        }

        .fashion-sidebar-topics-title {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.72rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #111;
          margin-bottom: 16px;
          display: block;
        }

        .fashion-sidebar-topics-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .fashion-sidebar-topics-item {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.72rem;
          border-bottom: 1px dashed rgba(0,0,0,0.1);
          padding-bottom: 8px;
        }
        .fashion-sidebar-topics-item:last-child {
          border-bottom: none;
        }

        .fashion-sidebar-item-label {
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--magenta, #E4007C);
          display: block;
          margin-bottom: 2px;
        }

        .fashion-sidebar-item-desc {
          color: #666;
          display: block;
          line-height: 1.3;
        }

        .fashion-benefits-section {
          margin: 80px 0 60px 0;
          border-top: 1px solid rgba(0,0,0,0.08);
          padding-top: 60px;
        }

        .fashion-benefits-header {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-bottom: 40px;
          text-align: center;
          color: #000;
        }

        .fashion-benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        @media (max-width: 768px) {
          .fashion-benefits-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .fashion-benefit-card {
          text-align: left;
          border-top: 1px solid rgba(0,0,0,0.1);
          padding-top: 20px;
        }

        .fashion-benefit-num {
          font-family: "Didot", serif;
          font-size: 3rem;
          font-style: italic;
          font-weight: 400;
          color: var(--magenta, #E4007C);
          margin-bottom: 10px;
          line-height: 1;
        }

        .fashion-benefit-title {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 12px 0;
          color: #111;
        }

        .fashion-benefit-desc {
          font-family: "Georgia", serif;
          font-size: 0.88rem;
          line-height: 1.6;
          color: #555;
        }

        .fashion-marquee-strip {
          border-top: 1px solid rgba(0,0,0,0.1);
          border-bottom: 1px solid rgba(0,0,0,0.1);
          padding: 16px 0;
          margin: 60px 0;
          overflow: hidden;
          white-space: nowrap;
        }

        .fashion-marquee-inner {
          display: inline-block;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #333;
          animation: fashionMarquee 30s linear infinite;
        }

        @keyframes fashionMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .fashion-author-footer-card {
          border-top: 1px solid #111;
          padding-top: 40px;
          margin-top: 60px;
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 30px;
          align-items: start;
        }

        @media (max-width: 600px) {
          .fashion-author-footer-card {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }

        .fashion-author-footer-img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          filter: grayscale(100%);
          display: block;
          margin: 0 auto;
          border: 1px solid rgba(0,0,0,0.1);
        }

        .fashion-author-footer-label {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--magenta, #E4007C);
          margin-bottom: 6px;
          display: block;
        }

        .fashion-author-footer-name {
          font-family: "Didot", serif;
          font-size: 1.8rem;
          font-weight: 400;
          margin: 0 0 10px 0;
          color: #111;
          text-transform: uppercase;
        }

        .fashion-author-footer-bio {
          font-family: "Georgia", serif;
          font-size: 0.95rem;
          line-height: 1.65;
          color: #444;
          margin-bottom: 12px;
        }

        .fashion-author-footer-bio strong {
          color: #111;
        }

        .fashion-author-footer-note {
          font-family: "Georgia", serif;
          font-size: 0.8rem;
          font-style: italic;
          color: #777;
          margin-top: 10px;
        }
      `}</style>

      {/* Shared Viewport Frame */}
      <div className="vogue-frame"></div>

      {/* Shared Top Navigation */}
      <div className="vogue-nav" style={{ justifyContent: 'flex-end' }}>
        <span className="vogue-nav-date">Vol. 01 — {noticia.date}</span>
      </div>

      {/* Shared Magazine Cover Hero */}
      <div className="vogue-hero">
        <div className="vogue-hero-text">
          <h1 className="vogue-title">
            Expo <br />
            <span className="outline">Mujer</span>
          </h1>
          <div className="vogue-meta">
            <div className="vogue-meta-line"></div>
            <div className="vogue-meta-text">
              {noticia.author ? (
                <>
                  Perfil especial / <em>{noticia.author.name}</em> <br />
                  {noticia.title}
                </>
              ) : (
                <>
                  Edición especial <em>Toronto</em> <br />
                  {noticia.title}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Cover image (scaled portrait greyscale if it's the author) */}
        <div className="vogue-hero-img-wrap">
          <img 
            src={noticia.author ? noticia.author.image : noticia.image} 
            alt={noticia.title} 
            className={`vogue-hero-img ${noticia.author ? 'portrait-greyscale' : ''}`} 
          />
        </div>

        <div className="scroll-indicator">
          Descubrir <ArrowDown size={14} style={{ transform: 'rotate(180deg)' }} />
        </div>
      </div>

      {/* Dynamic slots rendered inside the same standard grid columns */}
      {noticia.author ? (
        <AuthorProfileTemplate noticia={noticia} />
      ) : noticia.videoUrl ? (
        <CinematicVideoTemplate noticia={noticia} />
      ) : noticia.images && noticia.images.length > 0 ? (
        <EditorialGalleryTemplate noticia={noticia} />
      ) : (
        <StandardArticleTemplate noticia={noticia} />
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* ── 1. STANDARD ARTICLE TEMPLATE (Vogue Style Minimal) ── */
/* ──────────────────────────────────────────────────────── */
function StandardArticleTemplate({ noticia }: { noticia: Noticia }) {
  return (
    <div className="vogue-article">
      {/* Left Column */}
      <div className="vogue-sidebar">
        <span className="vogue-category">{noticia.category}</span>
        <p className="vogue-excerpt">{noticia.excerpt}</p>
      </div>

      {/* Right Column */}
      <div className="vogue-body">
        <p>{noticia.content || noticia.excerpt}</p>
        <p>
          El liderazgo mexicano no tiene fronteras. En un mundo cada vez más interconectado, la presencia de la mujer mexicana en plataformas internacionales como esta demuestra la capacidad, la resiliencia y la creatividad que caracteriza a nuestro talento. Cada paso que damos en el extranjero es una huella indeleble que inspira a las futuras generaciones.
        </p>

        <div className="vogue-pull-quote">
          El talento y la visión de México<br />en el escenario global.
        </div>

        <p>
          Esta iniciativa no solo promueve el intercambio comercial, sino que fortalece la identidad de la comunidad mexicana en el extranjero. Cada edición se convierte en un puente donde la cultura, los negocios y la innovación se encuentran para generar nuevas oportunidades de desarrollo para todos los participantes.
        </p>

        <div className="vogue-footer-mark">✶</div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ── 2. EDITORIAL GALLERY TEMPLATE (Photo Essay Spread) ── */
/* ────────────────────────────────────────────────────────── */
function EditorialGalleryTemplate({ noticia }: { noticia: Noticia }) {
  return (
    <div>
      <div className="vogue-article">
        {/* Left Column */}
        <div className="vogue-sidebar">
          <span className="vogue-category">{noticia.category} // GALLERY</span>
          <p className="vogue-excerpt">{noticia.excerpt}</p>
        </div>

        {/* Right Column */}
        <div className="vogue-body">
          <p className="vogue-excerpt" style={{ color: '#111', fontSize: '1.3rem' }}>{noticia.excerpt}</p>
          <p>{noticia.content}</p>
          
          <div className="vogue-pull-quote">
            "La estética visual y la solidez de la muestra se unen para redefinir la presencia comercial y artesanal de nuestras marcas en el extranjero."
          </div>

          <p>
            El diseño asimétrico de nuestra muestra busca reflejar la naturaleza dinámica y diversa de las empresarias de México. No existe un camino único hacia el éxito comercial, sino múltiples trayectorias creativas que merecen ser expuestas en toda su riqueza cromática y estructural.
          </p>

          <p>
            Al adentrarnos en las siguientes etapas del proyecto, invitamos al público a explorar no solo el producto terminado, sino el proceso artesanal y estratégico detrás de cada marca. Cada expositora porta una herencia viva que ahora dialoga con mercados globales de alta exigencia.
          </p>

          {/* Asymmetric image feeds embedded inside standard column flow */}
          <div className="editorial-images-column">
            <div className="editorial-img-container offset-left">
              <img src={noticia.image} alt={noticia.title} />
              <div className="editorial-img-caption">Imagen Principal: {noticia.title}</div>
            </div>

            {noticia.images && noticia.images.length > 1 && (
              <div className="editorial-img-container offset-right">
                <img src={noticia.images[1]} alt="Colección secundaria" />
                <div className="editorial-img-caption">Perspectiva: Escenarios del proyecto</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Collage Section if we have 3 or more images */}
      {noticia.images && noticia.images.length > 0 && (
        <div className="gallery-collage-full">
          <div className="collage-inner">
            {noticia.images.map((img, i) => (
              <div className="collage-item" key={i}>
                <img src={img} alt={`Colección ${i}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ── 3. CINEMATIC VIDEO TEMPLATE (Light-mode Fashion Video) ─ */
/* ────────────────────────────────────────────────────────── */
function CinematicVideoTemplate({ noticia }: { noticia: Noticia }) {
  const productionCredits = [
    { label: "Film Production", val: "EMM Creative Studio" },
    { label: "Curator / Agency", val: "Expo México Mujer" },
    { label: "Starring / Leaders", val: "200 Mexican Entrepreneurs" },
    { label: "Location Host", val: "Metro Toronto Convention Centre" }
  ];

  return (
    <div>
      <div className="vogue-article">
        {/* Left Column */}
        <div className="vogue-sidebar">
          <span className="vogue-category">{noticia.category} // FILM</span>
          <p className="vogue-excerpt">{noticia.excerpt}</p>

          {/* Credits Box nested cleanly inside the sidebar */}
          <div className="fashion-credits-box">
            <span className="credits-section-title">Créditos de Producción</span>
            <div className="credits-list">
              {productionCredits.map((credit, idx) => (
                <div className="credit-row" key={idx}>
                  <span className="credit-label">{credit.label}</span>
                  <span className="credit-value">{credit.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="vogue-body">
          {/* Framed Video Player inside the body feed */}
          <div className="video-editorial-frame">
            <video 
              src={noticia.videoUrl} 
              controls 
              poster={noticia.image} 
              playsInline 
            />
            <span className="video-editorial-caption">Experiencia en movimiento • Haga clic para reproducir</span>
          </div>

          <p>{noticia.content}</p>
          <p>
            La fuerza de la imagen y el testimonio directo nos permiten comprender el alcance binacional del proyecto. Al unir negocios, regulaciones comerciales y mentoría personalizada, EMM 2027 marca el inicio de una nueva era en el empoderamiento y la internacionalización de las empresarias.
          </p>

          <div className="vogue-pull-quote">
            "La narrativa audiovisual nos permite cruzar fronteras y sentir la vibración del evento mucho antes de pisar el Metro Toronto Convention Centre."
          </div>
        </div>
      </div>

      {/* Still Frame strip gallery at the bottom */}
      <div className="cinematic-gallery-strip">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', boxSizing: 'border-box' }}>
          <h4 className="strip-title">Fotogramas Destacados</h4>
          <div className="strip-grid">
            <div className="strip-card">
              <img src={noticia.image} alt="Fotograma 1" />
              <div className="strip-overlay"><Play size={20} color="#fff" /></div>
            </div>
            <div className="strip-card">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" alt="Fotograma 2" />
            </div>
            <div className="strip-card">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=600" alt="Fotograma 3" />
            </div>
            <div className="strip-card">
              <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=600" alt="Fotograma 4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ── 4. AUTHOR PROFILE TEMPLATE (Editorial High-Fashion) ── */
/* ────────────────────────────────────────────────────────── */
function AuthorProfileTemplate({ noticia }: { noticia: Noticia }) {
  const sidebarTitle = noticia.sidebarTitle || "TEMAS DESTACADOS";
  const sidebarItems = noticia.sidebarItems || [
    "Mentoría Personalizada",
    "Internacionalización de Marcas",
    "Establecimiento en Canadá",
    "Taller de Pitch de Negocios"
  ];
  const highlightQuote = noticia.highlightQuote || "EL TALENTO Y LA VISIÓN MÁS ALLÁ DE LAS FRONTERAS.";
  const benefitsTitle = noticia.benefitsTitle || "PUNTOS CLAVE DEL PROCESO";
  const benefits = noticia.benefits || [
    { num: "01", title: "ACOMPAÑAMIENTO", desc: "Consultores y especialistas a tu disposición durante todo el proceso." },
    { num: "02", title: "ESTRATEGIA", desc: "Planificación comercial y legal robusta adaptada al mercado meta." },
    { num: "03", title: "ALIANZAS", desc: "Vinculación comercial y de negocios directos con tomadores de decisiones." }
  ];
  const tickerText = noticia.tickerText || "SINERGIA • MIGRACIÓN • EDUCACIÓN • COMERCIO • NEGOCIOS • ";
  const author = noticia.author!;

  return (
    <div>
      <div className="vogue-article">
        {/* Left Column */}
        <div className="vogue-sidebar">
          <span className="vogue-category">{noticia.category} // PROFILE</span>
          <p className="vogue-excerpt">{noticia.excerpt}</p>

          {/* Topics List nested inside the sidebar */}
          <div className="fashion-sidebar-topics">
            <span className="fashion-sidebar-topics-title">{sidebarTitle}</span>
            <ul className="fashion-sidebar-topics-list">
              {sidebarItems.map((item, idx) => {
                const parts = item.split(' - ');
                const title = parts[0];
                const desc = parts[1] || "";
                return (
                  <li className="fashion-sidebar-topics-item" key={idx}>
                    <span className="fashion-sidebar-item-label">{title}</span>
                    {desc && <span className="fashion-sidebar-item-desc">{desc}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="vogue-body">
          <p>{noticia.content}</p>
          <p>
            El liderazgo de las mujeres mexicanas se proyecta con fuerza en Canadá, construyendo puentes binacionales y abriendo oportunidades en industrias creativas y tradicionales. Capacitación, vinculación directa y visión global definen hoy el emprendimiento de nuestra delegación.
          </p>

          <div className="vogue-pull-quote">
            "{highlightQuote}"
            <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-display)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '16px', color: 'var(--magenta)' }}>
              — {author.name}
            </span>
          </div>

          {/* 3 Columns Section (Left-aligned print style) inside body flow */}
          <div className="fashion-benefits-section">
            <h3 className="fashion-benefits-header">{benefitsTitle}</h3>
            <div className="fashion-benefits-grid">
              {benefits.map((benefit, idx) => (
                <div className="fashion-benefit-card" key={idx}>
                  <div className="fashion-benefit-num">{benefit.num}</div>
                  <h4 className="fashion-benefit-title">{benefit.title}</h4>
                  <p className="fashion-benefit-desc">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ticker Banner inside body flow */}
          <div className="fashion-marquee-strip">
            <div className="fashion-marquee-inner">
              {tickerText} {tickerText} {tickerText} {tickerText}
            </div>
          </div>

          {/* Author biography (integrated elegantly as page credits) */}
          <div className="fashion-author-footer-card">
            <img src={author.image} alt={author.name} className="fashion-author-footer-img" />
            <div className="fashion-author-footer-details">
              <span className="fashion-author-footer-label">Crédito Editorial</span>
              <h3 className="fashion-author-footer-name">{author.name}</h3>
              <p className="fashion-author-footer-bio">
                <strong>{author.role}.</strong> {author.bio}
              </p>
              {author.footer && (
                <p className="fashion-author-footer-note">{author.footer}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
