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
    (pathname.startsWith('/academy/') && pathname !== '/academy') ||
    (pathname.startsWith('/recursos/noticia/') && pathname !== '/recursos/noticia')
  ) {
    return null;
  }

  if (pathname === '/business-card') return null;
  if (pathname === '/terminos') return null;
  if (pathname === '/privacidad') return null;

  if (pathname === '/visa') {
    return (
      <Hero
        eyebrow="Expo México Mujer 2027"
        title={<>Trámite de Visa<br /><em>Tu viaje a Canadá</em></>}
        description="Te brindamos asesoría integral y gestoría especializada para tramitar tu visa de ingreso a Canadá. Nos encargamos de la revisión y acompañamiento de tu expediente para asegurar tu presencia en Toronto de manera rápida y sin complicaciones."
        image="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=800"
        primaryCta={{ text: "Iniciar Asesoría", href: "#solicitud" }}
        secondaryCta={{ text: "Requisitos", href: "#requisitos" }}
      />
    );
  }

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
