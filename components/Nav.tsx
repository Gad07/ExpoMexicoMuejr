'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronLeft, Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import OptImage from './OptImage';

export default function Nav() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navbar, setNavbar] = useState<any[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/admin/navbar')
      .then(r => r.json())
      .then(d => {
        if (d.navbar) setNavbar(d.navbar);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setActiveMobileMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleMouseEnter = (label: string) => {
    if (window.innerWidth > 1024) {
      setOpenDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) {
      setOpenDropdown(null);
    }
  };

  const toggleMobileMenu = (label: string) => {
    if (activeMobileMenu === label) {
      setActiveMobileMenu(null);
    } else {
      setActiveMobileMenu(label);
    }
  };

  const isInnerPage = pathname !== '/';

  const dynamicNavData = navbar.map((item: any) => {
    return {
      ...item,
      label: item.label?.[language] || item.label?.es || '',
      items: item.items?.map((sub: any) => ({
        ...sub,
        label: sub.label?.[language] || sub.label?.es || ''
      })) || []
    };
  });

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}${isInnerPage ? ' nav--inner' : ''}`} role="navigation">
      <div className="color-bar" aria-hidden="true">
        <span className="color-bar__swatch color-bar__swatch--1" />
        <span className="color-bar__swatch color-bar__swatch--2" />
        <span className="color-bar__swatch color-bar__swatch--3" />
        <span className="color-bar__swatch color-bar__swatch--4" />
        <span className="color-bar__swatch color-bar__swatch--5" />
        <span className="color-bar__swatch color-bar__swatch--6" />
        <span className="color-bar__swatch color-bar__swatch--7" />
        <span className="color-bar__swatch color-bar__swatch--8" />
      </div>
      <div className="nav__inner">
        <Link href="/" className="nav__logo">
          <OptImage src="/logo-emm.png" alt="Expo México Mujer" width={240} height={72} className="nav__logo-img" priority />
        </Link>

        {/* Desktop Menu */}
        <div className="nav__desktop-links">
          {dynamicNavData.map((item, index) => {
            if (item.href) {
              return (
                <Link key={index} href={item.href} className="nav__link">
                  {item.label}
                </Link>
              );
            } else {
              return (
                <div 
                  key={index} 
                  className={`nav__simple-dropdown-wrap ${openDropdown === item.label ? 'nav__simple-dropdown-wrap--open' : ''}`}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="#" className={`nav__link ${openDropdown === item.label ? 'nav__link--active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', outline: 'none' }} onClick={(e) => { e.preventDefault(); }}>
                    {item.label}
                    <ChevronDown size={14} className="nav__mega-icon" />
                  </a>
                  
                  {/* Panel Simple (no mega menu) */}
                  <div className="nav__simple-panel">
                    <ul className="nav__simple-list">
                      {item.items?.map((link: any, linkIdx: number) => (
                        <li key={linkIdx}>
                          <Link href={link.href} className="nav__simple-list-item" onClick={() => setOpenDropdown(null)}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Desktop Actions (Right Side) */}
        <div className="nav__desktop-actions">
          <div 
            className={`nav__simple-dropdown-wrap nav__lang-selector ${openDropdown === 'language' ? 'nav__simple-dropdown-wrap--open' : ''}`}
            onMouseEnter={() => handleMouseEnter('language')}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#" className={`nav__link ${openDropdown === 'language' ? 'nav__link--active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', outline: 'none' }} onClick={(e) => { e.preventDefault(); }}>
              <img src={`https://flagcdn.com/w20/${language === 'en' ? 'ca' : language === 'fr' ? 'fr' : 'mx'}.png`} width="20" height="14" alt={language.toUpperCase()} loading="lazy" /> {language.toUpperCase()}
              <ChevronDown size={14} className="nav__mega-icon" />
            </a>
            
            <div className="nav__simple-panel">
              <ul className="nav__simple-list">
                <li>
                  <button className="nav__simple-list-item" style={{ background: 'none', border: 'none', outline: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { setLanguage('es'); setOpenDropdown(null); }}>
                    <img src="https://flagcdn.com/w20/mx.png" width="20" height="14" alt="ES" loading="lazy" /> Español
                  </button>
                </li>
                <li>
                  <button className="nav__simple-list-item" style={{ background: 'none', border: 'none', outline: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { setLanguage('en'); setOpenDropdown(null); }}>
                    <img src="https://flagcdn.com/w20/ca.png" width="20" height="14" alt="EN" loading="lazy" /> English
                  </button>
                </li>
                <li>
                  <button className="nav__simple-list-item" style={{ background: 'none', border: 'none', outline: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { setLanguage('fr'); setOpenDropdown(null); }}>
                    <img src="https://flagcdn.com/w20/fr.png" width="20" height="14" alt="FR" loading="lazy" /> Français
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="nav__social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="nav__social-link" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="nav__social-link" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="nav__social-link" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="nav__social-link" aria-label="TikTok">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-2.61.94-5.26 3.03-6.72 1.48-1.03 3.27-1.45 5.03-1.38v4.07c-1.25-.09-2.54.19-3.57.87-1.16.74-1.87 2.06-1.78 3.42.06 1.49 1.25 2.82 2.72 3.1 1.22.25 2.53-.1 3.43-.88.94-.82 1.43-2.06 1.41-3.32V.02h-4.34z" /></svg>
            </a>
          </div>

          <Link href="/contacto" className="nav__cta">
            {t('nav.registrate')}
          </Link>
        </div>

        <button className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
          <Menu className={!menuOpen ? 'icon-active' : 'icon-inactive'} size={28} />
          <X className={menuOpen ? 'icon-active' : 'icon-inactive'} size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav__mobile-menu ${menuOpen ? 'nav__mobile-menu--open' : ''}`}>
        <div className="nav__mobile-container">
          {dynamicNavData.map((item, index) => {
            if (item.href) {
              return (
                <Link key={index} href={item.href} className="nav__mobile-link" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              );
            } else {
              const isOpen = activeMobileMenu === item.label;
              return (
                <div key={index} className="nav__mobile-accordion">
                  <button className="nav__mobile-accordion-btn" onClick={() => toggleMobileMenu(item.label)}>
                    {item.label}
                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  <div className={`nav__mobile-accordion-content ${isOpen ? 'nav__mobile-accordion-content--open' : ''}`}>
                    {item.items?.map((link: any, linkIdx: number) => (
                      <div key={linkIdx} className="nav__mobile-group">
                        <ul className="nav__mobile-group-list">
                          <li key={linkIdx}>
                            <Link href={link.href} className="nav__mobile-sublink" onClick={() => setMenuOpen(false)}>
                              {link.label}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          })}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', marginBottom: '0.5rem', gap: '15px' }}>
            <button onClick={() => setLanguage('es')} className="nav__mobile-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: language === 'es' ? 'rgba(0,46,81,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: language === 'es' ? 700 : 400 }}>
              <img src="https://flagcdn.com/w20/mx.png" width="20" height="14" alt="ES" loading="lazy" /> ES
            </button>
            <button onClick={() => setLanguage('en')} className="nav__mobile-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: language === 'en' ? 'rgba(0,46,81,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: language === 'en' ? 700 : 400 }}>
              <img src="https://flagcdn.com/w20/ca.png" width="20" height="14" alt="EN" loading="lazy" /> EN
            </button>
            <button onClick={() => setLanguage('fr')} className="nav__mobile-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: language === 'fr' ? 'rgba(0,46,81,0.1)' : 'rgba(0,0,0,0.03)', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: language === 'fr' ? 700 : 400 }}>
              <img src="https://flagcdn.com/w20/fr.png" width="20" height="14" alt="FR" loading="lazy" /> FR
            </button>
          </div>

          <Link href="/contacto" className="nav__cta" style={{ textAlign: 'center', marginTop: '1rem', display: 'flex', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
            {t('nav.registrate')}
          </Link>

          {/* Social links mobile */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="nav__social-link" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="nav__social-link" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="nav__social-link" aria-label="LinkedIn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="nav__social-link" aria-label="TikTok">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
