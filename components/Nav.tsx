'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'main' | 'participantes' | 'herramientas'>('main');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = (name: string) => {
    if (window.innerWidth > 900) {
      setOpenDropdown(name);
    }
  };
  const handleMouseLeave = () => {
    if (window.innerWidth > 900) {
      setOpenDropdown(null);
    }
  };

  const handleMobileClick = (e: React.MouseEvent, name: 'participantes' | 'herramientas') => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      setActiveMenu(name);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const isV2 = pathname === '/v2';
  const isV3 = pathname === '/v3';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Block body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.dataset.scrollY = String(scrollY);
    } else {
      const scrollY = Number(document.body.dataset.scrollY || '0');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
      setTimeout(() => setActiveMenu('main'), 300);
    }
    return () => {
      const scrollY = Number(document.body.dataset.scrollY || '0');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  if (isV2) {
    return (
      <nav className={`v2-nav ${scrolled ? 'v2-nav--scrolled' : ''}`} role="navigation" aria-label="Navegación V2">
        <div className="v2-nav__inner">
          <Link href="/v2" className="v2-nav__logo">
            <img src="/logo-emm.png" alt="Expo México Mujer" width={200} height={60} className="v2-nav__logo-img" />
          </Link>

          <div className="v2-nav__links">
            <a href="#inicio" className="v2-nav__link">Inicio</a>
            <a href="#concepto" className="v2-nav__link">Concepto</a>
            <a href="#sectores" className="v2-nav__link">Sectores</a>
            <a href="#agenda" className="v2-nav__link">Programa</a>
            <a href="#contacto" className="v2-nav__link">Contacto</a>
          </div>

          <div className="v2-nav__actions">
            <a href="#contacto" className="v2-nav__cta">
              Reservar Lugar
            </a>
          </div>
        </div>
      </nav>
    );
  }

  if (isV3) {
    return (
      <nav className={`v3-nav ${scrolled ? 'v3-nav--scrolled' : ''}`} role="navigation">
        <div className="v3-nav__inner">
          <Link href="/v3" className="v3-nav__logo">
            <img src="/logo-emm.png" alt="Expo México Mujer" width={200} height={60} className="v3-nav__logo-img" />
          </Link>

          <div className="v3-nav__links">
            <a href="#inicio" className="v3-nav__link">Inicio</a>
            <a href="#industrias" className="v3-nav__link">Sectores</a>
            <a href="#agenda" className="v3-nav__link">Agenda</a>
            <a href="#audiencia" className="v3-nav__link">Comunidad</a>
          </div>

          <div className="v3-nav__actions">
            <a href="#contacto" className="v3-nav__cta">
              Únete Ahora
            </a>
          </div>
        </div>
      </nav>
    );
  }

  const isInnerPage = pathname !== '/' && !isV2 && !isV3;

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}${isInnerPage ? ' nav--inner' : ''}`} role="navigation" aria-label="Navegación principal">
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
        <Link href="/" className="nav__logo" aria-label="Expo México Mujer 2027 – Inicio">
          <img src="/logo-emm.png" alt="Expo México Mujer" width={240} height={72} className="nav__logo-img" />
        </Link>

        <button className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav__mobile-wrapper ${menuOpen ? 'nav__mobile-wrapper--open' : ''}`}>

          <div className={`nav__links ${activeMenu !== 'main' ? 'nav__links--slide-out' : ''}`}>
            <Link href="/nosotros" className="nav__link" onClick={closeMenu}>Nosotros</Link>

            <div
              className={`nav__slide-dropdown ${openDropdown === 'participantes' ? 'nav__slide-dropdown--open' : ''}`}
              onMouseEnter={() => handleMouseEnter('participantes')}
              onMouseLeave={handleMouseLeave}
            >
              <span className={`nav__link nav__link--has-dropdown ${openDropdown === 'participantes' || pathname.startsWith('/expositores') || pathname.startsWith('/embajadoras') || pathname.startsWith('/patrocinadores') || pathname.startsWith('/invitados') ? 'nav__link--active' : ''}`} onClick={(e) => handleMobileClick(e, 'participantes')}>
                Participantes
                <ChevronRight className="nav__slide-icon-mobile" size={16} />
              </span>
              <div className="nav__slide-panel-desktop">
                <Link href="/expositores" className="nav__slide-item" onClick={closeMenu}>Expositoras</Link>
                <Link href="/embajadoras" className="nav__slide-item" onClick={closeMenu}>Embajadoras</Link>
                <Link href="/patrocinadores" className="nav__slide-item" onClick={closeMenu}>Patrocinadores</Link>
                <Link href="/invitados" className="nav__slide-item" onClick={closeMenu}>Invitados Especiales</Link>
              </div>
            </div>

            <div
              className={`nav__slide-dropdown ${openDropdown === 'herramientas' ? 'nav__slide-dropdown--open' : ''}`}
              onMouseEnter={() => handleMouseEnter('herramientas')}
              onMouseLeave={handleMouseLeave}
            >
              <span className={`nav__link nav__link--has-dropdown ${openDropdown === 'herramientas' || pathname.startsWith('/agenda') || pathname.startsWith('/academy') || pathname.startsWith('/recursos') ? 'nav__link--active' : ''}`} onClick={(e) => handleMobileClick(e, 'herramientas')}>
                Herramientas
                <ChevronRight className="nav__slide-icon-mobile" size={16} />
              </span>
              <div className="nav__slide-panel-desktop">
                <Link href="/agenda" className="nav__slide-item" onClick={closeMenu}>Agenda Oficial</Link>
                <Link href="/academy" className="nav__slide-item" onClick={closeMenu}>Academy</Link>
                <Link href="/recursos" className="nav__slide-item" onClick={closeMenu}>Noticias</Link>
              </div>
            </div>

            <Link href="/visa" className="nav__link" onClick={closeMenu}>Trámites</Link>

            <Link href="/#contacto" className="nav__link" onClick={closeMenu}>Contacto</Link>

            <div className="nav__socials">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="nav__social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="nav__social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="nav__social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="nav__social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>

            <Link href="/contacto" className="nav__cta" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Contacto
            </Link>
          </div>

          <div className={`nav__slide-panel-mobile ${activeMenu === 'participantes' ? 'nav__slide-panel-mobile--active' : ''}`}>
            <button className="nav__slide-back" onClick={() => setActiveMenu('main')}>
              <ChevronLeft size={20} />
              Volver al menú
            </button>
            <h3 className="nav__slide-title">Participantes</h3>
            <Link href="/expositores" className="nav__slide-item-mobile" onClick={closeMenu}>Expositoras</Link>
            <Link href="/embajadoras" className="nav__slide-item-mobile" onClick={closeMenu}>Embajadoras</Link>
            <Link href="/patrocinadores" className="nav__slide-item-mobile" onClick={closeMenu}>Patrocinadores</Link>
            <Link href="/invitados" className="nav__slide-item-mobile" onClick={closeMenu}>Invitados Especiales</Link>
          </div>

          <div className={`nav__slide-panel-mobile ${activeMenu === 'herramientas' ? 'nav__slide-panel-mobile--active' : ''}`}>
            <button className="nav__slide-back" onClick={() => setActiveMenu('main')}>
              <ChevronLeft size={20} />
              Volver al menú
            </button>
            <h3 className="nav__slide-title">Herramientas</h3>
            <Link href="/agenda" className="nav__slide-item-mobile" onClick={closeMenu}>Agenda Oficial</Link>
            <Link href="/academy" className="nav__slide-item-mobile" onClick={closeMenu}>Academy</Link>
            <Link href="/recursos" className="nav__slide-item-mobile" onClick={closeMenu}>Noticias</Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
