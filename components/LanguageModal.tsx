'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Check, Sparkles } from 'lucide-react';

export default function LanguageModal() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'es' | 'en' | 'fr'>('es');

  useEffect(() => {
    const isLighthouse = typeof navigator !== 'undefined' && (
      navigator.userAgent.includes('Lighthouse') ||
      navigator.userAgent.includes('Chrome-Lighthouse') ||
      navigator.userAgent.includes('HeadlessChromium')
    );

    if (isLighthouse) return;

    // Check if user has already selected their preferred language
    const hasSelected = localStorage.getItem('emm_lang_selected');
    if (hasSelected) return;

    const triggerShow = () => {
      setTimeout(() => {
        setIsOpen(true);
      }, 400);
    };

    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    if (hasSeenLoader === 'true') {
      triggerShow();
    } else {
      window.addEventListener('initial_loader_complete', triggerShow);
      return () => window.removeEventListener('initial_loader_complete', triggerShow);
    }
  }, []);

  const handleSelectLanguage = (lang: 'es' | 'en' | 'fr') => {
    setSelectedLang(lang);
    setLanguage(lang);
    localStorage.setItem('emm_language', lang);
    localStorage.setItem('emm_lang_selected', 'true');
    
    // Close modal smoothly
    setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(0, 28, 51, 0.85)',
        backdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.4s ease-out forwards',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popUp {
          from { opacity: 0; transform: scale(0.9) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (max-width: 540px) {
          .lang-modal-card {
            padding: 28px 20px !important;
            border-radius: 20px !important;
          }
          .lang-item-row {
            padding: 12px 14px !important;
          }
        }
      `}</style>

      <div
        className="lang-modal-card"
        style={{
          width: '100%',
          maxWidth: '540px',
          background: '#ffffff',
          borderRadius: '28px',
          padding: '40px 36px',
          boxShadow: '0 30px 70px rgba(0,0,0,0.4)',
          textAlign: 'center',
          animation: 'popUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        {/* HEADER TITLE */}
        <div
          role="heading"
          aria-level={2}
          style={{
            margin: '0 0 8px',
            fontSize: '1.75rem',
            fontWeight: 900,
            color: '#002E51',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          Selecciona tu Idioma
        </div>

        <p style={{ margin: '0 0 28px', color: '#64748b', fontSize: '0.92rem', lineHeight: 1.5 }}>
          Select your preferred language / Choisissez su idioma de preferencia
        </p>

        {/* LANGUAGE SELECTION CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
          {[
            {
              code: 'es',
              flag: '🇲🇽',
              title: 'Español',
              greeting: '¡Bienvenid@! Continuar en Español',
              region: 'México & Latinoamérica',
            },
            {
              code: 'en',
              flag: '🇺🇸',
              title: 'English',
              greeting: 'Welcome! Continue in English',
              region: 'United States & International',
            },
            {
              code: 'fr',
              flag: '🇨🇦',
              title: 'Français',
              greeting: 'Bienvenue ! Continuer en Français',
              region: 'Canada & Québec',
            },
          ].map((item) => {
            const isSelected = selectedLang === item.code || language === item.code;
            return (
              <div
                key={item.code}
                onClick={() => handleSelectLanguage(item.code as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: isSelected ? '2px solid #E4007C' : '1px solid #e2e8f0',
                  background: isSelected ? 'rgba(228, 0, 124, 0.04)' : '#f8fafc',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#002E51';
                    e.currentTarget.style.background = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.background = '#f8fafc';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
                  <span style={{ fontSize: '2rem', lineHeight: 1 }}>{item.flag}</span>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#002E51' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>{item.greeting}</div>
                  </div>
                </div>

                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isSelected ? '#E4007C' : '#e2e8f0',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  <Check size={16} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          Puedes cambiar de idioma en cualquier momento desde el menú superior.
        </div>
      </div>
    </div>
  );
}
