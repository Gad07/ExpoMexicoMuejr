'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

function PageLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  // Instant dismissal when route changes
  useEffect(() => {
    if (loading) {
      setFadingOut(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setFadingOut(false);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.currentTarget || e.target) as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('#') && href !== pathname) {
        setLoading(true);
        setFadingOut(false);
      }
    };

    const handleAnchorHover = (e: MouseEvent) => {
      const target = (e.currentTarget || e.target) as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('#') && href !== pathname) {
        try {
          router.prefetch(href);
        } catch { }
      }
    };

    const attachListeners = () => {
      const anchors = document.querySelectorAll('a[href^="/"]');
      anchors.forEach((a) => {
        a.removeEventListener('click', handleAnchorClick as any);
        a.removeEventListener('mouseenter', handleAnchorHover as any);
        a.removeEventListener('touchstart', handleAnchorHover as any);

        a.addEventListener('click', handleAnchorClick as any);
        a.addEventListener('mouseenter', handleAnchorHover as any, { passive: true });
        a.addEventListener('touchstart', handleAnchorHover as any, { passive: true });
      });
    };

    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const anchors = document.querySelectorAll('a[href^="/"]');
      anchors.forEach((a) => {
        a.removeEventListener('click', handleAnchorClick as any);
        a.removeEventListener('mouseenter', handleAnchorHover as any);
        a.removeEventListener('touchstart', handleAnchorHover as any);
      });
    };
  }, [pathname, router]);

  if (!loading) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(250, 248, 244, 0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 0.12s ease-out',
        pointerEvents: 'all',
      }}
    >
      {/* Animated Spinner + Logo */}
      <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(0, 46, 81, 0.1)',
            borderTopColor: '#002E51',
            borderRightColor: '#E4007C',
            animation: 'spinLoader 0.7s linear infinite',
          }}
        />
        <img
          src="/recursos/Recurso 8.png"
          alt=""
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'contain',
            animation: 'pulseLogo 1.2s ease-in-out infinite',
          }}
        />
      </div>

      <p
        style={{
          marginTop: '20px',
          color: '#002E51',
          fontFamily: 'var(--font-display), sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          fontWeight: 800,
        }}
      >
        Cargando...
      </p>

      <style>{`
        @keyframes spinLoader {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseLogo {
          0%, 100% { transform: scale(0.96); opacity: 0.9; }
          50% { transform: scale(1.06); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function TopProgressBar() {
  return (
    <Suspense fallback={null}>
      <PageLoaderContent />
    </Suspense>
  );
}
