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
    (pathname.startsWith('/embajadoras/') && pathname !== '/embajadoras') ||
    (pathname.startsWith('/invitados/') && pathname !== '/invitados') ||
    (pathname.startsWith('/academy/') && pathname !== '/academy') ||
    (pathname.startsWith('/recursos/noticia/') && pathname !== '/recursos/noticia')
  ) {
    return null;
  }

  if (pathname.startsWith('/business-card')) return null;
  if (pathname === '/terminos') return null;
  if (pathname === '/privacidad') return null;

  if (pathname === '/visa') {
    return (
      <Hero
        eyebrow="Expo México Mujer 2027"
        title={<>Servicios Migratorios<br /><em>Tu viaje a Canadá</em></>}
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
        image="/nosotros-hero.jpg"
        primaryCta={{ text: "Conocer más", href: "#mision" }}
        secondaryCta={{ text: "Contáctanos", href: "#contacto" }}
      />
    );
  }

  if (pathname === '/contacto') {
    return (
      <Hero
        eyebrow="Atención Personalizada"
        title={<>Conecta con<br /><em>los Directores</em></>}
        description="Resolución inmediata para patrocinios, espacios de exhibición y alianzas estratégicas para Expo México Mujer 2027."
        image="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=800"
        primaryCta={{ text: "Escribir", href: "mailto:francisco@expomexico.ca" }}
        secondaryCta={{ text: "Sede", href: "#sede" }}
      />
    );
  }

  if (pathname === '/expositores') {
    return (
      <Hero
        eyebrow="Participantes"
        title={<>Expositoras<br /><em>Talento Mexicano</em></>}
        description="Descubre a las mujeres líderes y empresarias que representarán a México en Toronto. Una muestra excepcional de innovación, cultura y calidad lista para conquistar el mercado canadiense."
        image="/Galeria/Otros/IMG_5602.JPG"
        primaryCta={{ text: "Ver Directorio", href: "#directorio" }}
        secondaryCta={{ text: "Participar", href: "/#contacto" }}
      />
    );
  }

  if (pathname === '/embajadoras') {
    return (
      <Hero
        eyebrow="Participantes"
        title={<>Embajadoras<br /><em>Voces de Inspiración</em></>}
        description="Conoce a las embajadoras de Expo México Mujer. Mujeres excepcionales cuya trayectoria, liderazgo e influencia conectan fronteras y elevan el orgullo mexicano a nivel internacional."
        image="/Galeria/Otros/IMG_5682.JPG"
        imagePosition="right top"
        overlayVariant="strong"
        primaryCta={{ text: "Conocer Perfiles", href: "#directorio" }}
        secondaryCta={{ text: "Participar", href: "/#contacto" }}
      />
    );
  }

  if (pathname === '/agenda') {
    return (
      <Hero
        eyebrow="Herramientas"
        title={<>Programa<br /><em>Agenda Oficial</em></>}
        description="Descubre los eventos, conferencias magistrales, paneles y actividades culturales que darán vida a los cinco días de Expo México Mujer 2027 en Toronto."
        image="/Galeria/Arte_y_Cultura/IMG_6244.JPG"
        primaryCta={{ text: "Descargar Agenda", href: "#descargar" }}
        secondaryCta={{ text: "Registrarse", href: "/#contacto" }}
      />
    );
  }

  if (pathname === '/academy') {
    return (
      <Hero
        eyebrow="Herramientas"
        title={<>Academy<br /><em>Formación y Liderazgo</em></>}
        description="Potencia tus habilidades y conocimientos con nuestro programa educativo. Sesiones exclusivas diseñadas para impulsar el crecimiento de mujeres emprendedoras en el mercado global."
        image="/Galleria/Otras_Fotos/IMG_6229.JPG"
        primaryCta={{ text: "Explorar Cursos", href: "#cursos" }}
        secondaryCta={{ text: "Inscripciones", href: "/#contacto" }}
      />
    );
  }

  if (pathname === '/recursos') {
    return (
      <Hero
        eyebrow="Herramientas"
        title={<>Noticias<br /><em>Actualidad y Tendencias</em></>}
        description="Mantente al tanto de las últimas novedades, anuncios oficiales y artículos destacados sobre Expo México Mujer y el empoderamiento femenino."
        image="/Galleria/Otras_Fotos/IMG_6260.JPG"
        primaryCta={{ text: "Leer Artículos", href: "#noticias" }}
        secondaryCta={{ text: "Suscribirse", href: "/#contacto" }}
      />
    );
  }

  return <Hero />;
}
