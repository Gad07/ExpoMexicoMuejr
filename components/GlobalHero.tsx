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
  if (pathname === '/francisco-solorio') return null;
  if (pathname === '/luis-garcia') return null;
  if (pathname === '/lucia-martinez') return null;
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

  if (pathname === '/expo/que-es') {
    return (
      <Hero
        eyebrow="Identidad y Propósito"
        title={<>¿Qué es<br /><em>Expo México Mujer?</em></>}
        description="Descubre nuestra misión, visión y los objetivos binacionales estratégicos que consolidan la alianza comercial y cultural entre México y Canadá."
        image="/Galeria/Otros/IMG_5602.JPG"
        primaryCta={{ text: "Equipo Directivo", href: "#equipo" }}
        secondaryCta={{ text: "Misión & Visión", href: "#mision-vision" }}
      />
    );
  }

  if (pathname === '/expo/industrias') {
    return (
      <Hero
        eyebrow="Pabellones y Sectores"
        title={<>Industrias<br /><em>Participantes</em></>}
        description="Un recorrido completo por los 12 sectores comerciales clave que representan la innovación, calidad y tradición de México en Toronto."
        image="/Galeria/Moda_y_textiles/IMG_5423.JPG"
        primaryCta={{ text: "Ver Sectores", href: "#sectores" }}
      />
    );
  }

  if (pathname === '/expo/ottawa-2026') {
    return (
      <Hero
        eyebrow="Nuestra Trayectoria"
        title={<>Expo México Mujer<br /><em>Ottawa 2026</em></>}
        description="Revive los mejores momentos de nuestra edición anterior en la capital canadiense. Resultados históricos de vinculación comercial y cultural."
        image="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"
        primaryCta={{ text: "Ver Resultados", href: "#resultados" }}
        secondaryCta={{ text: "Galería & Videos", href: "#galeria" }}
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

  if (pathname === '/participa') {
    return (
      <Hero
        eyebrow="Participa con Nosotros"
        title={<>Únete a la<br /><em>Delegación Binacional</em></>}
        description="Forma parte activa del encuentro empresarial y cultural más relevante entre México y Canadá. Stands comerciales, convocatorias estatales, patrocinios premium y ruedas de negocios."
        image="/Galeria/Otros/IMG_5602.JPG"
        primaryCta={{ text: "Quiero Participar", href: "/expositores" }}
        secondaryCta={{ text: "Patrocinios", href: "/patrocinadores" }}
      />
    );
  }

  if (pathname === '/aliados') {
    return (
      <Hero
        eyebrow="Nuestros Socios"
        title={<>Aliados &<br /><em>Organismos</em></>}
        description="Conoce a las cámaras binacionales, gobiernos e instituciones de México y Canadá que respaldan activamente a la Expo México Mujer."
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
        primaryCta={{ text: "Ver Cámaras", href: "#aliados" }}
      />
    );
  }

  if (pathname === '/compradores') {
    return (
      <Hero
        eyebrow="Vinculación B2B"
        title={<>Compradores &<br /><em>Inversionistas</em></>}
        description="Oportunidades únicas de vinculación comercial directa con marcas premium del talento y la cultura empresarial mexicana en Canadá."
        image="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=800"
        primaryCta={{ text: "Registro B2B", href: "/contacto" }}
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

  if (pathname === '/agenda/mexico-ontario-business-summit') {
    return (
      <Hero
        eyebrow="Summit Binacional de Alto Nivel"
        title={<>México Ontario<br /><em>Business Summit</em></>}
        description="El encuentro estratégico diseñado para consolidar acuerdos comerciales, fomentar inversiones mutuas y tender puentes operativos directos entre la delegación de empresarias mexicanas y los líderes corporativos de Ontario."
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
        primaryCta={{ text: "Ver Agenda", href: "#agenda" }}
      />
    );
  }

  if (pathname === '/agenda/mexican-fashion-gala-show') {
    return (
      <Hero
        eyebrow="Celebración de Arte y Textil"
        title={<>Mexican Fashion<br /><em>Gala Show</em></>}
        description="Una noche excepcional donde la riqueza textil y artesanal de México converge con las pasarelas globales en Toronto, mostrando el talento de diseñadoras independientes a distribuidores y medios canadienses."
        image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
        primaryCta={{ text: "Ver Programa", href: "#programa" }}
      />
    );
  }

  if (pathname === '/agenda/women-leaders-forum') {
    return (
      <Hero
        eyebrow="Empoderamiento y Alta Dirección"
        title={<>Women Leaders<br /><em>Forum</em></>}
        description="Un espacio intelectual e interactivo para debatir, compartir y asentar directrices sobre el papel fundamental del liderazgo femenino y el crecimiento corporativo global en la relación bilateral México-Canadá."
        image="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800"
        primaryCta={{ text: "Ver Programa", href: "#programa" }}
      />
    );
  }

  if (pathname === '/agenda/mision-comercial-montreal') {
    return (
      <Hero
        eyebrow="Expansión y Delegaciones"
        title={<>Misión Comercial<br /><em>Montreal</em></>}
        description="Exploración de mercados directos en la provincia de Quebec. La delegación empresarial viaja para analizar canales locales y concretar encuentros de negocios previos a la exhibición central en Toronto."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
        primaryCta={{ text: "Ver Itinerario", href: "#itinerario" }}
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

  if (pathname === '/informacion') {
    return (
      <Hero
        eyebrow="Recursos & Servicios"
        title={<>Guía de<br /><em>Participantes</em></>}
        description="Encuentra el manual técnico de montaje, herramientas de exportación y logística, tarifas con hoteles sede y canales de contacto directo."
        image="/Galleria/Otras_Fotos/IMG_6260.JPG"
        primaryCta={{ text: "Manual del Expositor", href: "#participantes" }}
        secondaryCta={{ text: "Logística", href: "#logistica" }}
      />
    );
  }

  if (pathname === '/informacion/prensa') {
    return (
      <Hero
        eyebrow="Sala de Prensa"
        title={<>Cobertura &<br /><em>Comunicados</em></>}
        description="Accede a comunicados de prensa, cobertura de medios, entrevistas de la delegación y galería fotográfica de la Expo México Mujer."
        image="/Galeria/Ponencias/IMG_4931.JPG"
        primaryCta={{ text: "Ver Comunicados", href: "#comunicados" }}
        secondaryCta={{ text: "Multimedia", href: "#galeria" }}
      />
    );
  }

  if (pathname === '/informacion/participantes') {
    return (
      <Hero
        eyebrow="Delegación de Expositores"
        title={<>Manual del<br /><em>Expositor</em></>}
        description="Instrucciones técnicas de montaje, requerimientos de stands, reglamentos generales y respuestas a preguntas frecuentes."
        image="/Galeria/Otros/IMG_5602.JPG"
        primaryCta={{ text: "Manual Técnico", href: "#manual" }}
        secondaryCta={{ text: "Preguntas Frecuentes", href: "#faq" }}
      />
    );
  }

  if (pathname === '/informacion/logistica') {
    return (
      <Hero
        eyebrow="Comercio Binacional"
        title={<>Logística Internacional<br /><em>& Exportación</em></>}
        description="Pautas operativas para importaciones temporales y definitivas, consolidación de mercancía y servicios aduanales México-Canadá."
        image="/Galeria/Otros/IMG_4805.JPG"
        primaryCta={{ text: "Asesoría Aduanal", href: "#aduanas" }}
        secondaryCta={{ text: "Socios Logísticos", href: "#transporte" }}
      />
    );
  }

  if (pathname === '/informacion/viajero') {
    return (
      <Hero
        eyebrow="Soporte y Estadía"
        title={<>Servicios al<br /><em>Viajero</em></>}
        description="Tarifas preferentes de hospedaje, información de vuelos recomendados y guías operativas de transporte local en Toronto."
        image="/Galeria/Turismo/IMG_6140.JPG"
        primaryCta={{ text: "Hoteles Sede", href: "#hospedaje" }}
        secondaryCta={{ text: "Vuelos y Traslado", href: "#vuelos" }}
      />
    );
  }

  if (pathname === '/informacion/contacto') {
    return (
      <Hero
        eyebrow="Atención Directa"
        title={<>Contacto</>}
        description="Dirección de la sede, tarjetas de presentación digital de nuestros directores y formulario de atención directa."
        image="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=800"
        primaryCta={{ text: "Formulario", href: "#formulario" }}
        secondaryCta={{ text: "Business Cards", href: "#directores" }}
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
