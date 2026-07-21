"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import LazyVideo from './LazyVideo';

const MOCK_VIDEOS = [
  {
    id: 1,
    title: 'Testimonio EMM',
    name: 'Adriana Perdomo',
    role: 'Participante',
    url: '/Videos Testimonios EMM/AdrianaPerdomo_EMM.mp4',
    thumbTime: 25.0,
    thumbPos: 'center 35%'
  },
  {
    id: 2,
    title: 'Experiencia',
    name: 'Erika Tapia',
    role: 'Expositora',
    url: '/Videos Testimonios EMM/Erika Tapia.mp4',
    thumbTime: 22.0,
    thumbPos: 'center center'
  },
  {
    id: 3,
    title: 'Testimonio',
    name: 'Leonor Alarcón',
    role: 'Expositora',
    url: '/Videos Testimonios EMM/TestimonioExpositorasLeonorAlarcón_EMM.mp4',
    thumbTime: 16.0,
    thumbPos: 'center center'
  },
  {
    id: 4,
    title: 'Testimonio',
    name: 'Leticia Texis',
    role: 'Participante',
    url: '/Videos Testimonios EMM/LeticiaTexis_EMM.mp4',
    thumbTime: 8.0,
    thumbPos: 'center 35%'
  },
  {
    id: 5,
    title: 'Experiencia',
    name: 'Arlene Eunice',
    role: 'Participante',
    url: '/Videos Testimonios EMM/Testimonio3ArleneEunice_EMM.mp4',
    thumbTime: 25.0,
    thumbPos: 'center center'
  },
  {
    id: 6,
    title: 'Testimonio',
    name: 'Ana Yolanda López',
    role: 'Participante',
    url: '/Videos Testimonios EMM/TestimonioAnaYolandaLopez_EMM.mp4',
    thumbTime: 22.0,
    thumbPos: 'center center'
  },
  {
    id: 7,
    title: 'Experiencia',
    name: 'Expositora',
    role: 'Participante',
    url: '/Videos Testimonios EMM/Expositora_Testimonio.mp4',
    thumbTime: 24.0,
    thumbPos: 'center 20%'
  },
  {
    id: 8,
    title: 'Testimonio',
    name: 'Participante',
    role: 'Expo México Mujer',
    url: '/Videos Testimonios EMM/TestimonioSiete_EMM.mp4',
    thumbTime: 6.0,
    thumbPos: 'center center'
  }
];

export default function Testimonials() {
  const [videos, setVideos] = useState<any[]>(MOCK_VIDEOS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetch('/api/admin/testimonios')
      .then(res => res.json())
      .then(data => {
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos);
        }
      })
      .catch(err => console.warn('Error loading testimonios:', err));
  }, []);

  const activeVideo = videos[activeIndex] || videos[0] || MOCK_VIDEOS[0];

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
  }, [activeIndex, videos]);

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
        @media (max-width: 640px) {
          .testim-item {
            grid-template-columns: 20px 90px 1fr !important;
            gap: 12px !important;
            padding: 10px !important;
          }
          .testim-thumb-wrap {
            height: 90px !important;
          }
          .editorial-title {
            font-size: 2.2rem !important;
            margin-bottom: 20px !important;
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
          margin: 0 auto 32px auto;
          max-width: 380px;
          width: 100%;
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
          width: auto;
          height: auto;
          max-height: 75vh;
          max-width: 380px;
          aspect-ratio: 9 / 16;
          overflow: hidden;
          background: transparent;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,46,81,0.1);
          margin: 0 auto;
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
          gap: 4px;
          padding-right: 12px;
          max-height: 75vh;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,46,81,0.2) transparent;
        }

        .testim-playlist::-webkit-scrollbar {
          width: 6px;
        }
        .testim-playlist::-webkit-scrollbar-track {
          background: transparent;
        }
        .testim-playlist::-webkit-scrollbar-thumb {
          background-color: rgba(0,46,81,0.2);
          border-radius: 10px;
        }

        .testim-item {
          display: grid;
          grid-template-columns: 24px 120px 1fr;
          align-items: center;
          gap: 24px;
          padding: 16px;
          cursor: pointer;
          border-radius: 12px;
          border-bottom: 1px solid rgba(0,46,81,0.05);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
        }

        .testim-item:hover {
          background: rgba(0,46,81,0.02);
          border-bottom-color: transparent;
        }
        
        .testim-item.active {
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0,46,81,0.08);
          border-bottom-color: transparent;
          transform: scale(1.02);
          z-index: 2;
        }

        .testim-number {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 400;
          color: rgba(0,46,81,0.4);
          transition: color 0.4s ease;
        }

        .testim-item.active .testim-number {
          color: var(--magenta);
          font-weight: 700;
        }

        .testim-thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 8px;
          overflow: hidden;
          background: #e0e0e0;
          box-shadow: 0 4px 15px rgba(0,46,81,0.1);
        }
        
        .testim-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0.8;
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .testim-item.active .testim-thumb {
          opacity: 1;
        }

        .testim-item:hover .testim-thumb {
          opacity: 1;
          transform: scale(1.08);
        }



        .testim-item-info {
          display: flex;
          flex-direction: column;
        }

        .testim-item-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy);
          text-transform: uppercase;
          letter-spacing: 0.02em;
          line-height: 1.25;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.4s ease;
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
          display: none;
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
              key={activeVideo.id || activeIndex}
              ref={videoRef}
              src={activeVideo.url}
              className={`testim-main-video ${isTransitioning ? 'transitioning' : ''}`}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }}
            />
          </div>
        </div>

        {/* Right: Playlist / Index */}
        <div style={{ paddingTop: '40px' }}>
          <p style={{ margin: '0 0 40px 0', fontSize: '1.2rem', color: '#555', maxWidth: '400px', lineHeight: 1.6, fontWeight: 300 }}>
            Descubre de primera mano cómo nuestras líderes y emprendedoras están transformando su entorno.
          </p>
          <div className="testim-playlist">
            {videos.map((video, index) => {
              const isActive = index === activeIndex;
              const num = String(index + 1).padStart(2, '0');
              return (
                <div
                  key={video.id || index}
                  className={`testim-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelect(index)}
                >
                  <span className="testim-number">{num}</span>
                  <div className="testim-thumb-wrap">
                    <video
                      src={`${video.url}#t=${video.thumbTime || 5}`}
                      className="testim-thumb"
                      style={{ objectFit: 'cover', objectPosition: video.thumbPos || 'center' }}
                      preload="metadata"
                      muted
                      playsInline
                    />
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
