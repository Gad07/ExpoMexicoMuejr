'use client';

import { usePathname } from 'next/navigation';
import Hero from './Hero';

export default function GlobalHero() {
  const pathname = usePathname();

  // En el home, el Hero se renderiza manualmente después del VideoHero
  if (pathname === '/') return null;

  // En las páginas de detalle (perfiles individuales) no mostramos el Hero global
  if (
    (pathname.startsWith('/expositores/') && pathname !== '/expositores') ||
    (pathname.startsWith('/patrocinadores/') && pathname !== '/patrocinadores') ||
    (pathname.startsWith('/invitados/') && pathname !== '/invitados') ||
    (pathname.startsWith('/academy/') && pathname !== '/academy')
  ) {
    return null;
  }

  if (pathname === '/business-card') return null;

  if (pathname === '/nosotros') {
    return (
      <Hero
        eyebrow="Expo México Mujer 2027"
        title={<>Nosotros<br /><em>Nuestra historia</em></>}
        description="Una plataforma binacional que nace con la convicción de que el liderazgo mexicano femenino merece un escenario global. Cinco días en Toronto que transforman identidad en oportunidad."
        image="/Galeria/Ponencias/IMG_6323.JPG"
        primaryCta={{ text: "Conocer más", href: "#mision" }}
        secondaryCta={{ text: "Contáctanos", href: "#contacto" }}
      />
    );
  }

  return <Hero />;
}
