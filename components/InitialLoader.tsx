'use client';

import { useEffect, useState, useRef } from 'react';

export default function InitialLoader() {
  const [show, setShow] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    if (hasSeenLoader) {
      setShow(false);
    }
  }, []);

  const handleComplete = () => {
    setIsFading(true);
    sessionStorage.setItem('hasSeenLoader', 'true');
    setTimeout(() => {
      setShow(false);
    }, 800); // 800ms fade duration
  };

  if (!mounted || !show) return null;

  return (
    <div 
      className={`initial-loader ${isFading ? 'initial-loader--fade' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff', /* Fondo blanco puro */
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out',
        pointerEvents: isFading ? 'none' : 'all',
      }}
    >
      <video
        ref={videoRef}
        src="/Video Project 3.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleComplete}
        style={{
          width: '50vw',
          minWidth: '320px',
          maxWidth: '700px',
          height: 'auto',
          /* Forzamos los tonos grises claros del video a blanco puro, manteniendo los colores del logo vibrantes */
          filter: 'contrast(1.2) brightness(1.15)',
          mixBlendMode: 'multiply',
        }}
      />
      
      {/* Botón de saltar */}
      <button 
        onClick={handleComplete}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          background: 'rgba(0,46,81,0.05)', /* var(--navy) con opacidad */
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,46,81,0.1)',
          color: 'var(--navy)',
          padding: '10px 24px',
          borderRadius: '30px',
          fontFamily: 'var(--font-display), sans-serif',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0,46,81,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0,46,81,0.05)';
        }}
      >
        Saltar intro
      </button>
    </div>
  );
}
