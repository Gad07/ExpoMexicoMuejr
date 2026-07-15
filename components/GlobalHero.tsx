'use client';

import { usePathname } from 'next/navigation';
import Hero from './Hero';
import { useLanguage } from '@/context/LanguageContext';

const heroKeys: Record<string, string> = {
  '/visa': 'visa',
  '/nosotros': 'nosotros',
  '/contacto': 'contacto',
  '/expo/que-es': 'queEs',
  '/expo/industrias': 'industrias',
  '/expo/ottawa-2026': 'ottawa2026',
  '/expositores': 'expositores',
  '/embajadoras': 'embajadoras',
  '/participa': 'participa',
  '/aliados': 'aliados',
  '/compradores': 'compradores',
  '/agenda': 'agenda',
  '/agenda/mexico-ontario-business-summit': 'summit',
  '/agenda/mexican-fashion-gala-show': 'fashionshow',
  '/agenda/women-leaders-forum': 'womenleaders',
  '/agenda/mision-comercial-montreal': 'mision',
  '/academy': 'academy',
  '/informacion': 'informacion',
  '/informacion/prensa': 'prensa',
  '/informacion/participantes': 'participantes',
  '/informacion/logistica': 'logistica',
  '/informacion/viajero': 'viajero',
  '/informacion/contacto': 'contactoInfo',
  '/recursos': 'noticias',
  '/patrocinadores': 'patrocinadores',
  '/invitados': 'invitados',
};

const heroImages: Record<string, string> = {
  '/visa': 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=800',
  '/nosotros': '/nosotros-hero.webp',
  '/contacto': '/Galleria/Otras_Fotos/IMG_6099.webp',
  '/expo/que-es': '/Galeria/Otros/IMG_5602.webp',
  '/expo/industrias': '/Galleria/Otras_Fotos/IMG_5984.webp',
  '/expo/ottawa-2026': '/Galleria/Otras_Fotos/IMG_6066.webp',
  '/expositores': '/Galeria/Otros/IMG_5602.webp',
  '/embajadoras': '/Galeria/Otros/IMG_5682.webp',
  '/participa': '/Galleria/Otras_Fotos/IMG_6068.webp',
  '/aliados': '/Galleria/Otras_Fotos/IMG_6078.webp',
  '/compradores': '/Galleria/Otras_Fotos/IMG_6118.webp',
  '/agenda': '/Galeria/Arte_y_Cultura/IMG_6244.webp',
  '/agenda/mexico-ontario-business-summit': '/Galleria/Otras_Fotos/IMG_6230.webp',
  '/agenda/mexican-fashion-gala-show': '/Galleria/Moda/IMG_6039.webp',
  '/agenda/women-leaders-forum': '/Galleria/Otras_Fotos/IMG_5916.webp',
  '/agenda/mision-comercial-montreal': 'https://wanderingwheatleys.com/wp-content/uploads/2023/02/best-things-to-do-in-montreal-canada-header-1800x1080.jpg',
  '/academy': '/Galleria/Otras_Fotos/IMG_6229.webp',
  '/informacion': '/Galleria/Otras_Fotos/IMG_6260.webp',
  '/informacion/prensa': '/Galleria/Energia/IMG_5915.webp',
  '/informacion/participantes': '/Galeria/Otros/IMG_5602.webp',
  '/informacion/logistica': 'https://img.magnific.com/free-photo/industrial-port-container-yard_1112-1200.jpg?t=st=1784092959~exp=1784096559~hmac=274f78bf242dcc50365d8a28d23978850f0af302ff36efa4b358fc10b5fcc4be&w=1480',
  '/informacion/viajero': 'https://img.magnific.com/free-photo/you-are-all-set-your-vacations-sales-representative-giving-passports-plane-tickets-young-woman-man-their-holiday-trip-travel-agency_662251-2215.jpg?t=st=1784093032~exp=1784096632~hmac=04e8e4bd4b89f8f6053a8b4a576351cdd7f6cf2e777af7aa5675908e9f387f7b&w=1480',
  '/informacion/contacto': 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=800',
  '/recursos': '/Galleria/Otras_Fotos/IMG_6260.webp',
  '/patrocinadores': '/Galleria/Otras_Fotos/IMG_6078.webp',
  '/invitados': '/Galeria/Otros/IMG_5682.webp',
};

const heroImagePositions: Record<string, string> = {
  '/embajadoras': 'right top',
  '/invitados': 'center',
};

const heroOverlays: Record<string, 'default' | 'strong'> = {
  '/embajadoras': 'strong',
};

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
  const { t } = useLanguage();

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

  const heroKey = heroKeys[pathname];
  if (!heroKey) return <Hero />;

  const prefix = `hero.${heroKey}`;
  const eyebrow = t(`${prefix}.eyebrow`);
  const title = t(`${prefix}.title`);
  const titleEm = t(`${prefix}.titleEm`);
  const desc = t(`${prefix}.desc`);
  const cta1 = t(`${prefix}.cta1`);
  const cta2 = t(`${prefix}.cta2`);

  return (
    <Hero
      eyebrow={eyebrow}
      title={<>{title}<br /><em>{titleEm}</em></>}
      description={desc}
      image={heroImages[pathname]}
      imagePosition={heroImagePositions[pathname]}
      overlayVariant={heroOverlays[pathname] || 'default'}
      primaryCta={cta1 !== prefix + '.cta1' ? { text: cta1, href: '#' } : undefined}
      secondaryCta={cta2 !== prefix + '.cta2' ? { text: cta2, href: '#contacto' } : undefined}
    />
  );
}
