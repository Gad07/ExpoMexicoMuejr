'use client';

import { useEffect, useState, useRef } from 'react';

export default function InitialLoader() {
  const [show, setShow] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    if (hasSeenLoader) {
      setShow(false);
      return;
    }

    // Try playing video explicitly when component mounts
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    };

    playVideo();
    const timer = setTimeout(playVideo, 200);

    // Safety fallback of 15s in case of total failure
    fallbackRef.current = setTimeout(() => {
      handleComplete();
    }, 15000);

    return () => {
      clearTimeout(timer);
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    };
  }, []);

  const handleComplete = () => {
    if (fallbackRef.current) {
      clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
    setIsFading(true);
    sessionStorage.setItem('hasSeenLoader', 'true');
    window.dispatchEvent(new Event('initial_loader_complete'));
    setTimeout(() => {
      setShow(false);
    }, 800);
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
        backgroundColor: '#ffffff',
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
        preload="auto"
        muted
        playsInline
        onCanPlay={(e) => {
          e.currentTarget.play().catch(() => {});
        }}
        onLoadedData={(e) => {
          e.currentTarget.play().catch(() => {});
        }}
        onEnded={handleComplete}
        onError={handleComplete}
        style={{
          width: '50vw',
          minWidth: '320px',
          maxWidth: '700px',
          height: 'auto',
          objectFit: 'contain',
          borderRadius: '16px',
        }}
      />

      {/* Botón de saltar */}
      <button
        onClick={handleComplete}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          background: 'rgba(0,46,81,0.08)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,46,81,0.15)',
          color: '#002E51',
          padding: '10px 24px',
          borderRadius: '30px',
          fontFamily: 'var(--font-display, sans-serif)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#E4007C';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0,46,81,0.08)';
          e.currentTarget.style.color = '#002E51';
        }}
      >
        Saltar intro
      </button>
    </div>
  );
}
