'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { PopupConfig } from '@/app/api/admin/popup/route';

export default function PromoPopup() {
  const router = useRouter();
  const pathname = usePathname();

  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Don't run in admin panel
    if (pathname.startsWith('/admin')) return;

    // Check if user already dismissed pop-up in current session
    const seenKey = `emm_popup_seen_${pathname}`;
    const globalSeen = sessionStorage.getItem('emm_popup_seen_global');
    if (globalSeen === 'true') return;
    if (sessionStorage.getItem(seenKey) === 'true') return;

    fetch('/api/admin/popup')
      .then((res) => res.json())
      .then((data) => {
        const activeList: PopupConfig[] = data.activePopups || (data.popup && data.popup.isActive ? [data.popup] : []);
        if (!activeList || activeList.length === 0) return;

        // Find matching active pop-up for current pathname
        const currentPath = pathname.toLowerCase() === '/' ? '/' : pathname.toLowerCase().replace(/\/$/, '');

        const matchingPop = activeList.find((pop) => {
          if (!pop.isActive) return false;

          if (pop.displayTarget === 'all') return true;

          if (pop.displayTarget === 'home') {
            return currentPath === '/' || currentPath === '/home';
          }

          if (pop.displayTarget === 'custom' && pop.customPages) {
            const allowedPaths = pop.customPages
              .split(',')
              .map((p) => p.trim().toLowerCase())
              .filter(Boolean)
              .map((p) => (p === '/' ? '/' : p.replace(/\/$/, '')));

            return allowedPaths.some(
              (p) => currentPath === p || (p !== '/' && currentPath.startsWith(p))
            );
          }

          return false;
        });

        if (!matchingPop) return;
        setConfig(matchingPop);

        // Configure Triggers
        const triggerType = matchingPop.triggerType || 'timer';
        const triggerVal = Number(matchingPop.triggerValue) || 3;

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
    sessionStorage.setItem(`emm_popup_seen_${pathname}`, 'true');
    sessionStorage.setItem('emm_popup_seen_global', 'true');
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

  const pos = config.imagePosition || 'left';
  const hasImage = Boolean(config.image);

  let gridColumns = '1fr';
  if (hasImage) {
    if (pos === 'left') gridColumns = '1.1fr 1fr';
    if (pos === 'right') gridColumns = '1fr 1.1fr';
    if (pos === 'top' || pos === 'background') gridColumns = '1fr';
  }

  const bgGradient = config.bgGradient || 'linear-gradient(135deg, #002E51 0%, #001C33 100%)';
  const textColor = config.textColor || '#ffffff';
  const buttonBg = config.buttonBgColor || '#E4007C';
  const buttonTextCol = config.buttonTextColor || '#ffffff';
  const buttonHoverBg = config.buttonHoverBgColor || '#ff0d8d';

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
          maxWidth: pos === 'top' ? '600px' : '820px',
          background: pos === 'background' ? 'none' : '#fff',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          display: 'grid',
          gridTemplateColumns: gridColumns,
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
            background: 'rgba(0,0,0,0.5)',
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
            e.currentTarget.style.background = buttonBg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
          }}
        >
          <X size={18} />
        </button>

        {/* IMAGE ON LEFT */}
        {hasImage && pos === 'left' && (
          <div
            style={{
              position: 'relative',
              minHeight: '300px',
              backgroundImage: `url(${config.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        {/* IMAGE ON TOP */}
        {hasImage && pos === 'top' && (
          <div
            style={{
              height: '220px',
              backgroundImage: `url(${config.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        {/* FULL BACKGROUND IMAGE */}
        {hasImage && pos === 'background' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${config.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: bgGradient,
                opacity: 0.88,
              }}
            />
          </div>
        )}

        {/* CONTENT COLUMN */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: pos === 'top' ? '28px 32px 36px' : '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: pos === 'background' ? 'transparent' : bgGradient,
            color: textColor,
            gridColumn: pos === 'right' ? 1 : undefined,
            gridRow: pos === 'right' ? 1 : undefined,
          }}
        >
          <div
            role="heading"
            aria-level={2}
            style={{
              margin: '0 0 14px',
              fontSize: pos === 'top' ? '1.45rem' : '1.65rem',
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: textColor,
            }}
          >
            {config.title}
          </div>

          <p
            style={{
              margin: '0 0 24px',
              fontSize: '0.92rem',
              color: textColor,
              opacity: 0.9,
              lineHeight: 1.5,
            }}
          >
            {config.subtitle}
          </p>

          {/* CTA BUTTON */}
          {config.showButton && config.buttonText && (
            <button
              onClick={handleCta}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px 28px',
                background: isHovered ? buttonHoverBg : buttonBg,
                color: buttonTextCol,
                border: 'none',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: `0 8px 20px ${buttonBg}55`,
                transition: 'all 0.25s ease',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                width: 'fit-content',
              }}
            >
              {config.buttonText}
              <ArrowRight size={18} />
            </button>
          )}
        </div>

        {/* IMAGE ON RIGHT */}
        {hasImage && pos === 'right' && (
          <div
            style={{
              position: 'relative',
              minHeight: '300px',
              backgroundImage: `url(${config.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              gridColumn: 2,
              gridRow: 1,
            }}
          />
        )}
      </div>
    </div>
  );
}
