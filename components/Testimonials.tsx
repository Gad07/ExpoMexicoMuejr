"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

const MOCK_VIDEOS = [
  {
    id: 1,
    title: 'La experiencia de crecer en Canadá',
    name: 'María González',
    role: 'Emprendedora',
    url: '/Galeria/Videos/bg_home.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=700'
  },
  {
    id: 2,
    title: 'Oportunidades de inversión',
    name: 'Ana Silva',
    role: 'Inversora',
    url: '/Galeria/Videos/bg_home.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=700'
  },
  {
    id: 3,
    title: 'Abriendo mercados',
    name: 'Laura Méndez',
    role: 'Directora Comercial',
    url: '/Galeria/Videos/bg_home.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=700'
  },
  {
    id: 4,
    title: 'Visión a futuro',
    name: 'Carmen Robles',
    role: 'Consultora',
    url: '/Galeria/Videos/bg_home.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&q=80&w=400&h=700'
  },
  {
    id: 5,
    title: 'Empoderamiento y liderazgo',
    name: 'Diana Reyes',
    role: 'CEO',
    url: '/Galeria/Videos/bg_home.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=700'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = MOCK_VIDEOS[activeIndex];

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 400); 
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
    }
  }, [activeIndex]);

  return (
    <section className="section" id="testimonios" style={{ background: 'var(--cream)', padding: '140px 24px', position: 'relative' }}>
      
      <style>{`
        .testim-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
        }
        @media (min-width: 1024px) {
          .testim-container {
            grid-template-columns: 5fr 6fr;
            gap: 120px;
            align-items: start;
          }
        }

        /* FASHION EDITORIAL TYPOGRAPHY - STRUCTURED */
        .editorial-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 300;
          color: var(--navy);
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          margin: 0 0 32px 0;
        }
        
        .editorial-title em {
          font-style: italic;
          color: var(--magenta);
          font-weight: 400;
          display: block;
        }

        /* MAIN VIDEO PLAYER */
        .testim-main {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #000;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,46,81,0.1);
        }

        .testim-main-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.8s ease, filter 0.8s ease;
        }
        
        .testim-main-video.transitioning {
          opacity: 0;
          filter: grayscale(100%) brightness(0.5);
        }

        /* PLAYLIST (EDITORIAL INDEX) */
        .testim-playlist {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(0,46,81,1);
        }

        .testim-item {
          display: grid;
          grid-template-columns: 40px 80px 1fr;
          align-items: center;
          gap: 32px;
          padding: 24px 0;
          cursor: pointer;
          border-bottom: 1px solid rgba(0,46,81,0.15);
          transition: all 0.4s ease;
          position: relative;
        }

        .testim-item:hover {
          border-bottom-color: var(--navy);
        }

        .testim-number {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 300;
          color: rgba(0,46,81,0.4);
          transition: color 0.4s ease;
        }

        .testim-item.active .testim-number {
          color: var(--magenta);
          font-weight: 600;
        }

        .testim-thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #e0e0e0;
        }

        .testim-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          opacity: 0.6;
          transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .testim-item:hover .testim-thumb {
          transform: scale(1.05);
          opacity: 0.8;
        }

        .testim-item.active .testim-thumb {
          filter: grayscale(0%);
          opacity: 1;
        }

        .testim-item-info {
          display: flex;
          flex-direction: column;
        }

        .testim-item-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--navy);
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.1;
          margin-bottom: 8px;
          transition: transform 0.4s ease, color 0.4s ease;
        }

        .testim-item.active .testim-item-title {
          color: var(--magenta);
        }

        .testim-item:hover .testim-item-title {
          transform: translateX(10px);
        }

        .testim-item-name {
          font-size: 0.95rem;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 300;
        }

        .testim-item-role {
          font-style: italic;
          color: #888;
          text-transform: none;
          letter-spacing: 0;
        }
        
        .testim-play-indicator {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          color: var(--magenta);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .testim-item.active .testim-play-indicator {
          opacity: 1;
        }
      `}</style>
      
      <div className="testim-container">
        {/* Left: Main Player */}
        <div style={{ position: 'relative' }}>
          <h2 className="editorial-title">
            Voces <em>Nuestras</em>
          </h2>
          <div className="testim-main">
            <video
              ref={videoRef}
              className={`testim-main-video ${isTransitioning ? 'transitioning' : ''}`}
              src={activeVideo.url}
              autoPlay
              loop
              muted
              playsInline
              poster={activeVideo.thumbnail}
            />
          </div>
        </div>

        {/* Right: Playlist / Index */}
        <div style={{ paddingTop: '40px' }}>
          <p style={{ margin: '0 0 40px 0', fontSize: '1.2rem', color: '#555', maxWidth: '400px', lineHeight: 1.6, fontWeight: 300 }}>
            Descubre de primera mano cómo nuestras líderes y emprendedoras están transformando su entorno.
          </p>
          <div className="testim-playlist">
            {MOCK_VIDEOS.map((video, index) => {
              const isActive = index === activeIndex;
              const num = String(index + 1).padStart(2, '0');
              return (
                <div 
                  key={video.id} 
                  className={`testim-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelect(index)}
                >
                  <span className="testim-number">{num}</span>
                  <div className="testim-thumb-wrap">
                    <img src={video.thumbnail} alt={video.title} className="testim-thumb" />
                  </div>
                  <div className="testim-item-info">
                    <span className="testim-item-title">{video.title}</span>
                    <span className="testim-item-name">
                      {video.name} <span className="testim-item-role">&mdash; {video.role}</span>
                    </span>
                  </div>
                  <Play size={20} className="testim-play-indicator" strokeWidth={1.5} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
