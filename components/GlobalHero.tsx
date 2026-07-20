'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Hero from './Hero';
import { useLanguage } from '@/context/LanguageContext';

const noHeroPaths = [
  '/business-card',
  '/francisco-solorio',
  '/luis-garcia',
  '/lucia-martinez',
  '/terminos',
  '/privacidad',
];

export default function GlobalHero() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [heroes, setHeroes] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/heroes')
      .then(r => r.json())
      .then(d => {
        if (d.heroes) setHeroes(d.heroes);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (pathname === '/') return null;

  if (
    (pathname.startsWith('/expositores/') && pathname !== '/expositores') ||
    (pathname.startsWith('/patrocinadores/') && pathname !== '/patrocinadores') ||
    (pathname.startsWith('/embajadoras/') && pathname !== '/embajadoras') ||
    (pathname.startsWith('/invitados/') && pathname !== '/invitados') ||
    (pathname.startsWith('/academy/') && pathname !== '/academy') ||
    (pathname.startsWith('/recursos/noticia/') && pathname !== '/recursos/noticia')
  ) {
    return null;
  }

  if (noHeroPaths.includes(pathname)) return null;

  if (loading) return null; // Avoid flicker

  const heroData = heroes[pathname];

  // Si no hay configuración para esta ruta, mostramos el Hero por defecto
  if (!heroData) {
    return <Hero />;
  }

  const eyebrow = heroData.eyebrow?.[language] || heroData.eyebrow?.es || '';
  const title = heroData.title?.[language] || heroData.title?.es || '';
  const titleEm = heroData.titleEm?.[language] || heroData.titleEm?.es || '';
  const desc = heroData.desc?.[language] || heroData.desc?.es || '';

  const cta1 = heroData.cta1?.text?.[language] || heroData.cta1?.text?.es;
  const primaryCta = cta1 ? { 
    text: cta1, 
    action: heroData.cta1.action || 'link', 
    href: heroData.cta1.href 
  } : undefined;

  const cta2 = heroData.cta2?.text?.[language] || heroData.cta2?.text?.es;
  const secondaryCta = cta2 ? { 
    text: cta2, 
    action: heroData.cta2.action || 'link', 
    href: heroData.cta2.href 
  } : undefined;

  return (
    <Hero
      eyebrow={eyebrow}
      title={<>{title}<br /><em>{titleEm}</em></>}
      description={desc}
      image={heroData.image}
      imagePosition={heroData.imagePosition}
      overlayVariant={heroData.overlayVariant}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
    />
  );
}
