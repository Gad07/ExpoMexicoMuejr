'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronLeft, Menu, X, ChevronDown } from 'lucide-react';
import { navData, NavDropdown } from '@/config/navData';
import { useLanguage } from '@/context/LanguageContext';

export default function Nav() {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

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
          <img src="/logo-emm.png" alt="Expo México Mujer" width={240} height={72} className="nav__logo-img" />
        </Link>

        {/* Desktop Menu */}
        <div className="nav__desktop-links">
          {navData.map((item, index) => {
            if ('href' in item) {
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
                  <Link href={item.basePath || '#'} className={`nav__link ${openDropdown === item.label ? 'nav__link--active' : ''}`}>
                    {item.label}
                    <ChevronDown size={14} className="nav__mega-icon" />
                  </Link>
                  
                  {/* Simple Dropdown Panel */}
                  <div className="nav__simple-panel">
                    <ul className="nav__simple-list">
                      {item.items.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link href={link.href} className="nav__simple-list-item" onClick={() => setMenuOpen(false)}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
          })}

          <div className="nav__lang-selector">
            <span className="nav__link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img src="https://flagcdn.com/w20/mx.png" width="20" alt="ES" /> ES
            </span>
          </div>

          <Link href="/contacto" className="nav__cta">
            Regístrate
          </Link>
        </div>

        <button className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className={!menuOpen ? 'icon-active' : 'icon-inactive'} size={28} />
          <X className={menuOpen ? 'icon-active' : 'icon-inactive'} size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav__mobile-menu ${menuOpen ? 'nav__mobile-menu--open' : ''}`}>
        <div className="nav__mobile-container">
          {navData.map((item, index) => {
            if ('href' in item) {
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
                    {item.basePath && (
                      <div className="nav__mobile-group">
                        <ul className="nav__mobile-group-list">
                          <li>
                            <Link href={item.basePath} className="nav__mobile-group-item" style={{ fontWeight: 700, color: 'var(--magenta)' }} onClick={() => setMenuOpen(false)}>
                              Ver todo {item.label}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                    {item.items.map((link, linkIdx) => (
                      <div key={linkIdx} className="nav__mobile-group">
                        <ul className="nav__mobile-group-list">
                          <li>
                            <Link href={link.href} className="nav__mobile-group-item" onClick={() => setMenuOpen(false)}>
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

          <Link href="/contacto" className="nav__cta" style={{ textAlign: 'center', marginTop: '1rem', display: 'flex', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
            Regístrate
          </Link>
        </div>
      </div>
    </nav>
  );
}
