'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { PopupConfig } from '@/app/api/admin/popup/route';

export default function PromoPopup() {
  const router = useRouter();
  const pathname = usePathname();

  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't run in admin panel
    if (pathname.startsWith('/admin')) return;

    // Check if user already dismissed pop-up in current session
    const seen = sessionStorage.getItem('emm_popup_seen');
    if (seen === 'true') return;

    fetch('/api/admin/popup')
      .then((res) => res.json())
      .then((data) => {
        if (!data?.popup || !data.popup.isActive) return;

        const pop: PopupConfig = data.popup;

        // Check Page Targeting Match
        let pageMatch = false;
        if (pop.displayTarget === 'all') {
          pageMatch = true;
        } else if (pop.displayTarget === 'home') {
          pageMatch = pathname === '/' || pathname === '/home';
        } else if (pop.displayTarget === 'custom' && pop.customPages) {
          const allowedPaths = pop.customPages.split(',').map((p) => p.trim().toLowerCase());
          pageMatch = allowedPaths.some((p) => p && (pathname.toLowerCase() === p || pathname.toLowerCase().startsWith(p)));
        }

        if (!pageMatch) return;
        setConfig(pop);

        // Configure Triggers
        const triggerType = pop.triggerType || 'timer';
        const triggerVal = Number(pop.triggerValue) || 3;

        if (triggerType === 'timer') {
          const timer = setTimeout(() => {
            setVisible(true);
          }, triggerVal * 1000);
          return () => clearTimeout(timer);
        } else if (triggerType === 'scroll') {
          const handleScroll = () => {
            const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScrollable <= 0) return;
            const currentPercentage = (window.scrollY / totalScrollable) * 100;

            if (currentPercentage >= triggerVal) {
              setVisible(true);
              window.removeEventListener('scroll', handleScroll);
            }
          };

          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        } else if (triggerType === 'exit') {
          const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 5) {
              setVisible(true);
              document.removeEventListener('mouseleave', handleMouseLeave);
            }
          };

          document.addEventListener('mouseleave', handleMouseLeave);
          return () => document.removeEventListener('mouseleave', handleMouseLeave);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem('emm_popup_seen', 'true');
  };

  const handleCta = () => {
    if (!config?.buttonUrl) return;
    handleClose();
    if (config.buttonUrl.startsWith('http')) {
      window.open(config.buttonUrl, '_blank');
    } else {
      router.push(config.buttonUrl);
    }
  };

  if (!visible || !config || !config.isActive) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(0, 28, 51, 0.78)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.3s ease-out forwards',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '820px',
          background: '#fff',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          display: 'grid',
          gridTemplateColumns: config.image ? '1.1fr 1fr' : '1fr',
          animation: 'scaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          aria-label="Cerrar modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)',
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            transition: 'transform 0.2s, background 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.background = '#E4007C';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
          }}
        >
          <X size={18} />
        </button>

        {/* IMAGE COLUMN */}
        {config.image && (
          <div
            style={{
              position: 'relative',
              minHeight: '280px',
              backgroundImage: `url(${config.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)',
              }}
            />
          </div>
        )}

        {/* CONTENT COLUMN */}
        <div
          style={{
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #002E51 0%, #001C33 100%)',
            color: '#fff',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(228, 0, 124, 0.2)',
              color: '#FF6EB4',
              padding: '4px 12px',
              borderRadius: '100px',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '16px',
              width: 'fit-content',
              border: '1px solid rgba(228, 0, 124, 0.4)',
            }}
          >
            <Sparkles size={14} /> Anuncio Oficial
          </div>

          <h2
            style={{
              margin: '0 0 12px',
              fontSize: '1.6rem',
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            {config.title}
          </h2>

          <p
            style={{
              margin: '0 0 24px',
              fontSize: '0.92rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.5,
            }}
          >
            {config.subtitle}
          </p>

          {/* CTA BUTTON */}
          {config.showButton && config.buttonText && (
            <button
              onClick={handleCta}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px 28px',
                background: '#E4007C',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(228, 0, 124, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = '#ff0d8d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#E4007C';
              }}
            >
              {config.buttonText}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
