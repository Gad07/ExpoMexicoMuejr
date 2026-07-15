'use client';

import Link from 'next/link';
import { navData } from '@/config/navData';

export default function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-footer__top">
        <div className="v2-footer__inner">
          {/* Brand column */}
          <div className="v2-footer__brand">
            <img src="/logo-emm.png" alt="Expo México Mujer" width={240} height={72} className="v2-footer__logomark" />
            <p className="v2-footer__brand-desc">
              La plataforma binacional líder de vinculación, cultura y desarrollo comercial entre México y Canadá.
            </p>
            <div className="v2-footer__social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="v2-footer__social-link" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="v2-footer__social-link" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="v2-footer__social-link" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-2.61.94-5.26 3.03-6.72 1.48-1.03 3.27-1.45 5.03-1.38v4.07c-1.25-.09-2.54.19-3.57.87-1.16.74-1.87 2.06-1.78 3.42.06 1.49 1.25 2.82 2.72 3.1 1.22.25 2.53-.1 3.43-.88.94-.82 1.43-2.06 1.41-3.32V.02h-4.34z" /></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="v2-footer__social-link" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
            </div>
          </div>

          {/* Links columns */}
          {navData.map((section, idx) => (
            <div key={idx} className="v2-footer__col">
              <span className="v2-footer__col-title">{section.label}</span>
              <nav className="v2-footer__links">
                {'items' in section && section.items.map((link, i) => (
                  <Link key={i} href={link.href} className="v2-footer__link">{link.label}</Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Contact Column */}
          <div className="v2-footer__col">
            <span className="v2-footer__col-title">Contacto</span>
            <nav className="v2-footer__links">
              <a href="mailto:francisco@expomexico.ca" className="v2-footer__link">francisco@expomexico.ca</a>
              <a href="https://wa.link/jboroz" className="v2-footer__link" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <div style={{ height: '8px' }}></div>
              <a href="/contacto" className="v2-footer__cta-btn" style={{ width: 'fit-content' }}>Reservar Lugar</a>
            </nav>
          </div>
        </div>
      </div>

      <div className="v2-footer__bottom">
        <div className="v2-footer__bottom-inner">
          <p className="v2-footer__copy" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>Todos los derechos reservados © 2027 Expo México Mujer.</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Desarrollado por Gadiel Palma</span>
          </p>
          <div className="v2-footer__bottom-links">
            <a href="#" className="v2-footer__bottom-link">Privacidad</a>
            <a href="#" className="v2-footer__bottom-link">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
