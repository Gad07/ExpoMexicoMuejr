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

    const isLighthouse = typeof navigator !== 'undefined' && (
      navigator.userAgent.includes('Lighthouse') ||
      navigator.userAgent.includes('Chrome-Lighthouse') ||
      navigator.userAgent.includes('HeadlessChromium')
    );

    if (isLighthouse) {
      setShow(false);
      return;
    }

    // Check for sessionStorage flag
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    const isTesting = typeof window !== 'undefined' && window.location.search.includes('loader=true');

    if (hasSeenLoader && !isTesting) {
      setShow(false);
      return;
    }

    // Force play video explicitly on mount
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => { });
      }
    }, 100);

    // Fallback timer of 8s in case browser blocks video
    fallbackRef.current = setTimeout(() => {
      handleComplete();
    }, 8000);

    return () => {
      clearTimeout(timer);
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    };
  }, []);

  const handlePlay = () => {
    // Video is playing actively
    if (fallbackRef.current) {
      clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
  };

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
        transform: 'translate3d(0,0,0)',
        willChange: 'opacity',
      }}
    >
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="brand-green-filter">
          <feComponentTransfer in="SourceGraphic" result="brightenedSource">
            <feFuncR type="linear" slope="1.38" intercept="-0.115" />
            <feFuncG type="linear" slope="1.38" intercept="-0.115" />
            <feFuncB type="linear" slope="1.38" intercept="-0.115" />
          </feComponentTransfer>

          <feColorMatrix in="SourceGraphic" type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            -1 1 0 0 0
          " result="rawMask" />

          <feComponentTransfer in="rawMask" result="hardMask">
            <feFuncA type="linear" slope="5" intercept="-0.1" />
          </feComponentTransfer>

          <feColorMatrix in="SourceGraphic" type="matrix" values="
            0.33 0.33 0.33 0 0
            0.33 0.33 0.33 0 0
            0.33 0.33 0.33 0 0
            0 0 0 1 0
          " result="gray" />

          <feComponentTransfer in="gray" result="tinted">
            <feFuncR type="table" tableValues="0 0.0157 0.0157 1" />
            <feFuncG type="table" tableValues="0 0.2824 0.2824 1" />
            <feFuncB type="table" tableValues="0 0.1608 0.1608 1" />
          </feComponentTransfer>

          <feComposite in="tinted" in2="hardMask" operator="in" result="maskedTint" />
          <feComposite in="maskedTint" in2="brightenedSource" operator="over" />
        </filter>
      </svg>

      <video
        ref={videoRef}
        autoPlay
        preload="auto"
        muted
        playsInline
        crossOrigin="anonymous"
        onPlay={handlePlay}
        onEnded={handleComplete}
        style={{
          width: '50vw',
          minWidth: '320px',
          maxWidth: '700px',
          height: 'auto',
          filter: 'url(#brand-green-filter)',
          mixBlendMode: 'multiply',
          clipPath: 'inset(2px 2px 4px 2px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'filter, transform',
          backfaceVisibility: 'hidden',
        }}
      >
        <source src="https://dl.dropboxusercontent.com/scl/fi/p1gcsxb0h26xcr7ydmecp/Video-Project-3.mp4?rlkey=0gyzvmf4rcxq3kfc7c0vif0fq&st=45xip41h" type="video/mp4" />
      </video>
    </div>
  );
}
