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
        transform: 'translate3d(0,0,0)',
        willChange: 'opacity',
      }}
    >
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="brand-green-filter">
          
          {/* 0. Forzar el fondo a ULTRA BLANCO (equivalente a contrast 1.2 + brightness 1.15)
              Esto aclara los grises del video a blanco puro, pero lo hacemos ANTES 
              para no alterar nuestro verde exacto #044829 al final. */}
          <feComponentTransfer in="SourceGraphic" result="brightenedSource">
            <feFuncR type="linear" slope="1.38" intercept="-0.115" />
            <feFuncG type="linear" slope="1.38" intercept="-0.115" />
            <feFuncB type="linear" slope="1.38" intercept="-0.115" />
          </feComponentTransfer>

          {/* 1. Crear una máscara para aislar los pixeles verdes (Alpha = G - R) */}
          <feColorMatrix in="SourceGraphic" type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            -1 1 0 0 0
          " result="rawMask" />
          
          {/* Aumentar el contraste de la máscara para asegurar cobertura completa del verde */}
          <feComponentTransfer in="rawMask" result="hardMask">
            <feFuncA type="linear" slope="5" intercept="-0.1" />
          </feComponentTransfer>

          {/* 2. Crear una versión de la imagen en escala de grises */}
          <feColorMatrix in="SourceGraphic" type="matrix" values="
            0.33 0.33 0.33 0 0
            0.33 0.33 0.33 0 0
            0.33 0.33 0.33 0 0
            0 0 0 1 0
          " result="gray" />
          
          {/* 3. Gradient Map: Mapear la luminancia a nuestro verde #044829 (4, 72, 41) 
              Usamos 4 valores en la tabla (0, 0.33, 0.66, 1). 
              Esto asegura que los tonos medios (el cuerpo de la hoja) sean EXACTAMENTE #044829.
          */}
          <feComponentTransfer in="gray" result="tinted">
            <feFuncR type="table" tableValues="0 0.0157 0.0157 1" />
            <feFuncG type="table" tableValues="0 0.2824 0.2824 1" />
            <feFuncB type="table" tableValues="0 0.1608 0.1608 1" />
          </feComponentTransfer>

          {/* 4. Aplicar el color #044829 SOLO donde la máscara verde es visible */}
          <feComposite in="tinted" in2="hardMask" operator="in" result="maskedTint" />
          
          {/* 5. Combinar el verde corregido sobre la imagen ACLARADA (fondo ultra blanco) */}
          <feComposite in="maskedTint" in2="brightenedSource" operator="over" />

        </filter>
      </svg>

      <video
        ref={videoRef}
        src="/Video Project 3.mp4"
        autoPlay
        preload="auto"
        muted
        playsInline
        onEnded={handleComplete}
        style={{
          width: '50vw',
          minWidth: '320px',
          maxWidth: '700px',
          height: 'auto',
          /* Filtro SVG que reemplaza selectivamente el verde original por #044829 y vuelve el fondo ultra blanco */
          filter: 'url(#brand-green-filter)',
          mixBlendMode: 'multiply',
          /* Recortamos un par de pixeles de los bordes para eliminar la línea verde de compresión del MP4 */
          clipPath: 'inset(2px 2px 4px 2px)',
          /* Forzar aceleración de hardware para procesar el filtro SVG en la GPU */
          transform: 'translate3d(0, 0, 0)',
          willChange: 'filter, transform',
          backfaceVisibility: 'hidden',
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
