"use client";

import React, { useEffect, useRef, useState, use } from "react";
import { Mail, Phone, Globe, MapPin, ArrowRight } from "lucide-react";

/* ─── Reveal ── */
function Reveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: 0.06 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
    }}>{children}</div>
  );
}

/* ─── Data ── */
const DIRECTORS: Record<string, any> = {
  lucia: {
    nombre: "Lucía Martínez Reyes",
    cargo: "Directora General",
    empresa: "Expo México Mujer",
    ciudad: "Toronto, Canadá · CDMX",
    email: "lucia@expomexico.ca",
    telefono: "+1 (416) 555-0192",
    whatsapp: "14165550192",
    website: "expomexico.ca",
    linkedin: "https://linkedin.com/in/lucia-martinez",
    instagram: "https://instagram.com/expomexico_mujer",
    bio: "Líder visionaria con más de 15 años conectando el talento femenino mexicano con oportunidades binacionales en Canadá. Fundadora de la plataforma más importante de negocios y cultura mexicana en Toronto.",
    bio2: "Su trayectoria como empresaria y gestora cultural la ha posicionado como una de las voces más influyentes del ecosistema emprendedor latinoamericano en Norteamérica.",
    foto: "/directora-emm.png",
    stats: [{ num: "+15", label: "Años de experiencia" }, { num: "500+", label: "Empresas conectadas" }, { num: "3", label: "Ediciones del evento" }],
  },
  francisco: {
    nombre: "Francisco Solorio",
    cargo: "Director General",
    empresa: "Expo México Mujer",
    ciudad: "Toronto, Canadá · CDMX",
    email: "francisco@expomexico.ca",
    telefono: "+52 55 2719 9694",
    whatsapp: "525527199694",
    website: "expomexico.ca",
    linkedin: "https://linkedin.com/in/francisco-solorio",
    instagram: "https://instagram.com/expomexico_mujer",
    bio: "Soy especialista en cooperación internacional y desarrollo de alianzas estratégicas. Como Director General de Expo México Mujer, lidero una plataforma internacional que impulsa el talento y emprendimiento de las mujeres entre México y Canadá.",
    bio2: "Concibo el liderazgo femenino como una fuerza vital de cambio. Mi labor responde a la convicción de que la educación y la creación de oportunidades construyen sociedades más prósperas.",
    foto: "/fotos perfil/Foto Francisco.jpg",
    stats: [],
    quote: "El liderazgo femenino es un motor de transformación social y económica.",
    fullBio: [
      "Soy un especialista en cooperación internacional y desarrollo de alianzas estratégicas con una destacada trayectoria en la creación de proyectos de alto impacto que promueven la educación, la internacionalización, el emprendimiento y el desarrollo social entre México y Canadá.",
      "A lo largo de mis más de trece años de experiencia profesional, he construido puentes de colaboración entre gobiernos, representaciones diplomáticas, universidades, organismos empresariales y organizaciones de la sociedad civil, consolidándome como un articulador de iniciativas que generan oportunidades de crecimiento, intercambio y desarrollo sostenible.",
      "Mi experiencia en instituciones de atención ciudadana y derechos humanos como el Consejo Ciudadano de la Ciudad de México, fortaleció mi compromiso con la igualdad de oportunidades, la inclusión y la construcción de entornos más seguros y equitativos para las mujeres. Esta visión me ha permitido impulsar proyectos orientados al liderazgo femenino, el fortalecimiento de capacidades, la generación de redes de colaboración y el empoderamiento económico de las mujeres.",
      "Como Director General de Expo México Mujer, lidero una plataforma internacional que impulsa el talento, el emprendimiento y el liderazgo de las mujeres mediante la creación de espacios de vinculación empresarial, cooperación institucional e intercambio cultural y económico entre México y Canadá. Bajo mi dirección, Expo México Mujer se ha consolidado como un punto de encuentro para líderes, empresarias, instituciones, organismos internacionales y agentes de cambio comprometidos con el desarrollo y la visibilidad del liderazgo femenino.",
      "Mi trayectoria profesional incluye posiciones de liderazgo en organizaciones educativas e internacionales, entre ellas Grupo LET, Charles International School y la Universidad Humanitas, desde donde he impulsado proyectos de internacionalización y programas de formación ejecutiva desarrollados en colaboración con instituciones de prestigio mundial, como la Universidad de Harvard, el Instituto Tecnológico de Massachusetts (MIT), la Universidad de Cambridge y la Universidad de Columbia.",
      "Soy Licenciado en Derecho por la Universidad Nacional Autónoma de México (UNAM) y cuento con una Maestría en Justicia Penal y Seguridad Pública, complementadas con formación internacional en Canadá y una amplia experiencia en el diseño y dirección de iniciativas de cooperación internacional.",
      "He sido distinguido con el Premio Nacional a la Excelencia en Atención Ciudadana y soy Miembro Honorario de la Asociación Mexicana de Lingüística Aplicada (AMLA)."
    ],
    vision: [
      "Concibo el liderazgo femenino como un motor de transformación social y económica. Mi labor al frente de Expo México Mujer responde a la convicción de que la cooperación internacional, la educación y la creación de oportunidades son herramientas fundamentales para impulsar el empoderamiento de las mujeres, promover la igualdad y construir sociedades más inclusivas, prósperas y sostenibles."
    ]
  },
  luis: {
    nombre: "Luis García González",
    cargo: "Director de Operaciones México–Canadá",
    empresa: "Expo México Mujer",
    ciudad: "Toronto, Canadá · CDMX",
    email: "luis@expomexico.ca",
    telefono: "+52 722 551 4645",
    whatsapp: "527225514645",
    website: "expomexico.ca",
    linkedin: "https://linkedin.com/in/luis-garcia",
    instagram: "https://instagram.com/expomexico_mujer",
    bio: "Soy experto en cooperación internacional y gestión estratégica. Como Director de Operaciones México–Canadá de Expo México Mujer, lidero la coordinación operativa con una visión de sostenibilidad e inclusión.",
    bio2: "Mi liderazgo está orientado a fortalecer alianzas internacionales que generen oportunidades, impulsen la igualdad de género y contribuyan al desarrollo sostenible binacional.",
    foto: "/fotos perfil/Foto Luis.jpg",
    stats: [],
    quote: "El empoderamiento de las mujeres constituye una condición indispensable para construir un futuro más justo, sostenible y próspero.",
    fullBio: [
      "Soy un líder en cooperación internacional y gestión estratégica, con una sólida trayectoria en la construcción de alianzas de alto impacto entre gobiernos, organismos internacionales, academia, sector privado y sociedad civil, orientadas al impulso del desarrollo sostenible, la inclusión social y el fortalecimiento comunitario.",
      "A lo largo de mi trayectoria he diseñado y coordinado proyectos de alcance nacional e internacional orientados a la conservación del patrimonio natural, la resiliencia territorial y el desarrollo inclusivo, impulsando iniciativas que han ampliado las oportunidades de participación y desarrollo para las mujeres indígenas, reconociéndolas como actores fundamentales en la preservación del patrimonio biocultural y el fortalecimiento de las economías comunitarias.",
      "Entre mis principales contribuciones destaca la articulación de alianzas estratégicas con organismos internacionales de referencia, entre ellos la Agencia Francesa de Desarrollo (AFD) y el World Wide Fund for Nature (WWF), impulsando iniciativas de cooperación para la conservación de la biodiversidad y el desarrollo de proyectos con impacto social y ambiental de largo plazo.",
      "Asimismo, lideré proyectos de restauración ecológica y fortalecimiento territorial en la zona Patrimonio Mundial de Tláhuac, Milpa Alta y Xochimilco, promoviendo modelos de gobernanza participativa que integran la protección del patrimonio biocultural con el desarrollo local sostenible, con especial énfasis en el empoderamiento de las mujeres de los pueblos originarios y de las comunidades afromexicanas como agentes estratégicos de conservación, resiliencia y transformación social.",
      "Mi experiencia en el sector público me ha permitido dirigir programas estratégicos en la Secretaría del Medio Ambiente de la Ciudad de México y en la Comisión de Recursos Naturales y Desarrollo Rural, encabezando equipos multidisciplinarios y desarrollando iniciativas que han fortalecido la coordinación interinstitucional, la participación ciudadana y la construcción de soluciones innovadoras frente a desafíos sociales y ambientales.",
      "Soy Presidente y Fundador del Consejo Global Ambiental (CGA), una plataforma de cooperación nacional e internacional dedicada a promover la sostenibilidad, la gobernanza y las alianzas estratégicas para el cumplimiento de la Agenda 2030 de las Naciones Unidas. Desde este espacio he impulsado iniciativas que reconocen el papel de las mujeres como agentes esenciales de transformación, resiliencia comunitaria y protección del patrimonio natural.",
      "Asimismo, soy autor y coautor de publicaciones científicas y de divulgación especializadas en biodiversidad, conservación y desarrollo sostenible, y columnista de la Revista Capitel, donde promuevo la reflexión y el diálogo en torno a la sostenibilidad, la educación, la acción climática y los desafíos globales desde una perspectiva de inclusión y cooperación internacional.",
      "Como Director de Operaciones México–Canadá de Expo México Mujer, lidero la coordinación estratégica y operativa de una plataforma internacional dedicada al fortalecimiento del liderazgo femenino, la generación de alianzas institucionales y la creación de oportunidades de desarrollo económico y social para las mujeres. Mi experiencia en la construcción de proyectos internacionales y en la articulación de redes de cooperación multisectorial aporta una visión integral que fortalece la misión de Expo México Mujer como un espacio de diálogo, colaboración y transformación con impacto binacional."
    ],
    vision: [
      "Promuevo una visión de desarrollo sostenible e inclusivo en la que las mujeres, particularmente las pertenecientes a pueblos originarios y comunidades afromexicanas, son protagonistas de la transformación social, la conservación del patrimonio biocultural y la construcción de comunidades resilientes.",
      "Mi liderazgo está orientado a fortalecer alianzas internacionales que generen oportunidades, impulsen la igualdad de género y contribuyan al cumplimiento de la Agenda 2030 de las Naciones Unidas, convencido de que el empoderamiento de las mujeres constituye una condición indispensable para construir un futuro más justo, sostenible y próspero."
    ]
  }
};

const NOTICIAS = [
  { fecha: "15 MAYO 2026", categoria: "Institucional", titulo: "Expo México Mujer 2027 anuncia su sede en Toronto", excerpt: "Más de 500 líderes empresariales se darán cita en el corazón de Canadá.", link: "#", img: "/Galeria/Ponencias/IMG_6323.JPG" },
  { fecha: "28 ABRIL 2026", categoria: "Participación", titulo: "Foro Binacional de Comercio México-Canadá", excerpt: "Directiva presente como panelistas en el mayor foro de negocios binacional del año.", link: "#", img: "/Galeria/Ponencias/IMG_6117.JPG" },
  { fecha: "10 ABRIL 2026", categoria: "Convocatoria", titulo: "Registros para expositoras 2027 superan expectativas", excerpt: "Más de 200 empresas lideradas por mujeres aseguran su espacio en la primera semana.", link: "#", img: "/Galeria/Ponencias/IMG_5999.JPG" },
];

/* ─── PAGE ── */
export default function BusinessCardPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const D = DIRECTORS[resolvedParams.slug] || DIRECTORS["francisco"];

  return (
    <main className="page-content-wrapper">
      <style>{`

        /* ══════════════════════════════════════
           MAGAZINE PROFILE — Expo México Mujer
        ══════════════════════════════════════ */

        .mag { background: #FAF8F5; }

        /* ── COVER ── */
        .mag-cover {
          background: #FAF8F5;
          padding: 0;
          overflow: hidden;
          padding-top: 80px;
        }

        /* Top strip — issue label */
        .mag-strip {
          background: var(--magenta, #E4007C);
          padding: 10px 7%;
          display: flex; align-items: center; justify-content: space-between;
        }
        .mag-strip__left {
          font-family: var(--font-display, serif);
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #fff;
        }
        .mag-strip__right {
          font-family: var(--font-body, sans-serif);
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.75);
        }

        .mag-hero {
          display: grid;
          grid-template-columns: 52% 48%;
          min-height: calc(100vh - 56px);
        }

        /* Photo side */
        .mag-photo-side {
          position: relative;
          overflow: hidden;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mag-photo {
          width: 100%; 
          height: 100%;
          object-fit: contain; 
          object-position: center;
          display: block;
        }
        /* Vertical label on photo */
        .mag-photo-label {
          position: absolute;
          bottom: 40px; left: 32px;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-family: var(--font-body, sans-serif);
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }
        /* Issue number watermark on photo */
        .mag-photo-issue {
          position: absolute;
          bottom: 36px; right: 28px;
          font-family: var(--font-display, serif);
          font-size: 5rem; font-weight: 900;
          color: rgba(255,255,255,0.07);
          line-height: 1;
          user-select: none;
        }

        /* Content side */
        .mag-content-side {
          display: flex; flex-direction: column; justify-content: center;
          padding: 72px 7% 72px 8%;
          background: #FAF8F5;
          position: relative;
        }
        /* Thin vertical line separating the two halves */
        .mag-content-side::before {
          content: '';
          position: absolute;
          top: 10%; bottom: 10%; left: 0;
          width: 1px;
          background: rgba(0,46,81,0.1);
        }

        /* Eyebrow / edition */
        .mag-ey {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 24px;
        }
        .mag-ey__line { width: 36px; height: 2px; background: var(--magenta, #E4007C); flex-shrink: 0; }
        .mag-ey__text {
          font-family: var(--font-body, sans-serif);
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--magenta, #E4007C);
        }

        /* Main name — editorial headline */
        .mag-name {
          font-family: var(--font-display, serif);
          font-weight: 900;
          font-size: clamp(3rem, 5.5vw, 6rem);
          line-height: 0.9;
          letter-spacing: -0.05em;
          color: var(--navy, #002E51);
          text-transform: uppercase;
          margin: 0 0 28px;
        }
        .mag-name em {
          font-style: italic;
          font-weight: 300;
          color: var(--magenta, #E4007C);
        }

        /* Role bar */
        .mag-role {
          display: flex; align-items: center; gap: 0;
          border-top: 1px solid rgba(0,46,81,0.12);
          border-bottom: 1px solid rgba(0,46,81,0.12);
          padding: 12px 0;
          margin-bottom: 32px;
        }
        .mag-role__cargo {
          font-family: var(--font-body, sans-serif);
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--navy, #002E51);
          padding-right: 16px;
          margin-right: 16px;
          border-right: 1px solid rgba(0,46,81,0.15);
        }
        .mag-role__empresa {
          font-family: var(--font-body, sans-serif);
          font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(0,46,81,0.45);
        }

        /* Intro text */
        .mag-intro {
          font-family: var(--font-body, sans-serif);
          font-size: 1.05rem; line-height: 1.78;
          color: rgba(0,46,81,0.65); font-weight: 300;
          margin: 0 0 36px;
          max-width: 52ch;
        }

        /* Stat row */
        .mag-stats {
          display: flex; gap: 0;
          border-top: 1px solid rgba(0,46,81,0.1);
          margin-bottom: 40px;
        }
        .mag-stat {
          flex: 1;
          padding: 20px 0;
          border-right: 1px solid rgba(0,46,81,0.08);
          text-align: center;
        }
        .mag-stat:last-child { border-right: none; }
        .mag-stat__num {
          font-family: var(--font-display, serif);
          font-size: 2.4rem; font-weight: 900;
          color: var(--navy, #002E51);
          letter-spacing: -0.04em;
          line-height: 1; display: block;
        }
        .mag-stat__label {
          font-family: var(--font-body, sans-serif);
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: var(--magenta, #E4007C); display: block;
          margin-top: 4px;
        }

        /* Contact links in hero */
        .mag-hero-contacts {
          display: flex; flex-direction: column; gap: 0;
          border-top: 1px solid rgba(0,46,81,0.1);
          border-bottom: 1px solid rgba(0,46,81,0.1);
          margin-bottom: 28px;
        }
        .mag-hc-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 0;
          border-bottom: 1px solid rgba(0,46,81,0.06);
          text-decoration: none; color: rgba(0,46,81,0.7);
          font-size: 0.9rem; transition: color 0.2s, padding-left 0.2s;
        }
        .mag-hc-link:last-child { border-bottom: none; }
        .mag-hc-link:hover { color: var(--magenta, #E4007C); padding-left: 4px; }
        .mag-hc-link__left { display: flex; align-items: center; gap: 12px; }
        .mag-hc-link__left svg { color: var(--magenta, #E4007C); flex-shrink: 0; }
        .mag-hc-link__sub {
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(0,46,81,0.35); display: block; line-height: 1; margin-bottom: 1px;
        }
        .mag-hc-link:hover .mag-hc-link__sub { color: rgba(228,0,124,0.5); }
        .mag-hc-arrow { color: rgba(0,46,81,0.2); transition: transform 0.2s; }
        .mag-hc-link:hover .mag-hc-arrow { transform: translateX(4px); color: var(--magenta, #E4007C); }

        /* Social row in hero */
        .mag-hero-socials { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
        .mag-hs-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 10px 18px;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; cursor: pointer; border: none;
          transition: transform 0.22s, opacity 0.22s;
        }
        .mag-hs-btn:hover { transform: translateY(-2px); opacity: 0.88; }
        .mag-hs-btn--wa  { background: #22c55e; color: #fff; }
        .mag-hs-btn--li  { background: var(--navy, #002E51); color: #fff; }
        .mag-hs-btn--ig  { background: linear-gradient(135deg,#e4007c,#f59e0b); color: #fff; }
        .mag-hs-btn--cp  { background: transparent; border: 1.5px solid rgba(0,46,81,0.2); color: var(--navy,#002E51); }
        .mag-hs-btn--cp:hover { opacity: 1; border-color: var(--navy); background: var(--navy); color: #fff; }

        /* ── FEATURE ARTICLE ── */
        .mag-article {
          background: #fff;
          padding: 88px 7%;
        }
        .mag-article__inner {
          max-width: 820px; margin: 0 auto;
        }

        /* Article text */
        .mag-article__kicker {
          font-family: var(--font-body, sans-serif);
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--magenta, #E4007C);
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
        }
        .mag-article__kicker::before { content: ""; width: 28px; height: 2px; background: var(--magenta, #E4007C); display: block; }
        .mag-article__h {
          font-family: var(--font-display, serif);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 300; color: var(--navy, #002E51);
          line-height: 1.15; letter-spacing: -0.02em;
          margin: 0 0 32px;
        }
        .mag-article__h strong { font-weight: 900; }
        .mag-article__body {
          font-family: var(--font-body, sans-serif);
          font-size: 1.05rem; line-height: 1.85;
          color: rgba(0,46,81,0.65); font-weight: 300;
          column-count: 2; column-gap: 48px;
        }

        /* Pull quote */
        .mag-pull {
          border-left: 3px solid var(--magenta, #E4007C);
          padding: 4px 0 4px 24px;
          margin: 32px 0;
          font-family: var(--font-display, serif);
          font-size: 1.35rem; font-weight: 300;
          font-style: italic;
          color: var(--navy, #002E51);
          line-height: 1.45;
          break-inside: avoid;
        }

        /* ── NEWS ── */
        .mag-news { background: #FAF8F5; padding: 88px 7%; }
        .mag-news__inner { max-width: 1100px; margin: 0 auto; }
        .mag-news__header {
          display: flex; align-items: flex-end; justify-content: space-between;
          border-bottom: 2px solid var(--navy, #002E51);
          padding-bottom: 16px; margin-bottom: 48px;
        }
        .mag-news__title {
          font-family: var(--font-display, serif);
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 900; letter-spacing: -0.03em;
          color: var(--navy, #002E51); text-transform: uppercase;
          margin: 0;
        }
        .mag-news__issue {
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(0,46,81,0.35);
        }
        .mag-news__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 32px;
        }

        /* Featured card (first, big) */
        .mag-nc {
          text-decoration: none;
          display: flex; flex-direction: column;
          padding-right: 32px;
          border-right: 1px solid rgba(0,46,81,0.1);
          transition: color 0.3s;
        }
        .mag-nc:last-child { border-right: none; padding-right: 0; }
        .mag-nc:not(:first-child) { padding-left: 0; }
        .mag-nc__img-wrap { overflow: hidden; margin-bottom: 20px; }
        .mag-nc__img { width: 100%; object-fit: cover; transition: transform 0.6s ease; display: block; }
        .mag-nc:first-child .mag-nc__img { height: 340px; }
        .mag-nc:not(:first-child) .mag-nc__img { height: 180px; }
        .mag-nc:hover .mag-nc__img { transform: scale(1.04); }
        .mag-nc__cat {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--magenta, #E4007C); margin-bottom: 8px; display: block;
        }
        .mag-nc__title {
          font-family: var(--font-display, serif);
          font-weight: 700; color: var(--navy, #002E51);
          line-height: 1.2; margin: 0 0 10px;
        }
        .mag-nc:first-child .mag-nc__title { font-size: 1.5rem; }
        .mag-nc:not(:first-child) .mag-nc__title { font-size: 1.1rem; }
        .mag-nc__excerpt {
          font-size: 0.88rem; line-height: 1.6;
          color: rgba(0,46,81,0.6); margin: 0 0 16px; flex: 1;
        }
        .mag-nc__date { font-size: 0.65rem; color: #999; letter-spacing: 0.08em; text-transform: uppercase; }
        .mag-nc:hover .mag-nc__title { color: var(--magenta, #E4007C); }

        /* ── MOBILE ── */
        @media (max-width: 900px) {
          .mag-hero { grid-template-columns: 1fr; min-height: auto; }
          .mag-photo-side { height: 60vw; max-height: 420px; order: -1; }
          .mag-content-side::before { display: none; }
          .mag-content-side { padding: 52px 6% 60px; }
          .mag-article__inner { grid-template-columns: 1fr; gap: 48px; }
          .mag-article__body { column-count: 1; }
          .mag-contact-card { position: static; }
          .mag-news__grid { grid-template-columns: 1fr; gap: 32px; }
          .mag-nc { border-right: none; border-bottom: 1px solid rgba(0,46,81,0.1); padding-right: 0; padding-bottom: 32px; margin-bottom: 0; }
          .mag-nc:not(:first-child) { padding-left: 0; }
          .mag-nc:last-child { border-bottom: none; padding-bottom: 0; }
        }
        @media (max-width: 580px) {
          .mag-strip { padding: 8px 6%; flex-direction: column; gap: 4px; align-items: flex-start; }
          .mag-name { font-size: 3.2rem; }
          .mag-stats { flex-wrap: wrap; }
          .mag-stat { flex: 1 1 50%; border-right: none; border-bottom: 1px solid rgba(0,46,81,0.08); }
          .mag-news__header { flex-direction: column; align-items: flex-start; gap: 4px; }
        }
      `}</style>

      <div className="mag">

        {/* ══ COVER ══ */}
        <section className="mag-cover" aria-label={`Perfil — ${D.nombre}`}>

          {/* Strip — al inicio */}
          <div className="mag-strip">
            <span className="mag-strip__left">Expo México Mujer · Directorio 2027</span>
            <span className="mag-strip__right">Perfil Ejecutivo · Toronto, Canadá</span>
          </div>

          {/* Hero grid */}
          <div className="mag-hero">

            {/* Photo */}
            <div className="mag-photo-side">
              <img src={D.foto} alt={`Foto de ${D.nombre}`} className="mag-photo" loading="lazy" width="120" height="120" />
              <span className="mag-photo-label" aria-hidden="true">Expo México Mujer 2027</span>
              <span className="mag-photo-issue" aria-hidden="true">27</span>
            </div>

            {/* Content */}
            <div className="mag-content-side">
              {/* Removed mag-ey eyebrow */}

              <Reveal delay={140}>
                <h1 className="mag-name">
                  {D.nombre.split(" ").map((w: string, i: number, arr: string[]) =>
                    i === arr.length - 1
                      ? <em key={i}><br />{w}</em>
                      : <span key={i}>{i > 0 ? " " : ""}{w}</span>
                  )}
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <div className="mag-role">
                  <span className="mag-role__cargo">{D.cargo}</span>
                  <span className="mag-role__empresa">{D.empresa}</span>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <p className="mag-intro">{D.bio}</p>
              </Reveal>


              {/* Contact links */}
              <Reveal delay={360}>
                <div className="mag-hero-contacts">
                  <a href={`mailto:${D.email}`} className="mag-hc-link" id="lnk-email">
                    <span className="mag-hc-link__left">
                      <Mail size={15} />
                      <span><span className="mag-hc-link__sub">Email</span>{D.email}</span>
                    </span>
                    <ArrowRight size={14} className="mag-hc-arrow" />
                  </a>
                  <a href={`tel:${D.telefono.replace(/\s/g, "")}`} className="mag-hc-link" id="lnk-tel">
                    <span className="mag-hc-link__left">
                      <Phone size={15} />
                      <span><span className="mag-hc-link__sub">Teléfono</span>{D.telefono}</span>
                    </span>
                    <ArrowRight size={14} className="mag-hc-arrow" />
                  </a>
                  <a href={`https://${D.website}`} target="_blank" rel="noopener noreferrer" className="mag-hc-link" id="lnk-web">
                    <span className="mag-hc-link__left">
                      <Globe size={15} />
                      <span><span className="mag-hc-link__sub">Sitio web</span>{D.website}</span>
                    </span>
                    <ArrowRight size={14} className="mag-hc-arrow" />
                  </a>
                </div>
              </Reveal>

              {/* Social + copy */}
              <Reveal delay={420}>
                <div className="mag-hero-socials">
                  <a href={`https://wa.me/${D.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mag-hs-btn mag-hs-btn--wa" id="btn-wa">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                    WhatsApp
                  </a>
                  <a href={D.linkedin} target="_blank" rel="noopener noreferrer" className="mag-hs-btn mag-hs-btn--li" id="btn-li">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                    LinkedIn
                  </a>
                  <a href={D.instagram} target="_blank" rel="noopener noreferrer" className="mag-hs-btn mag-hs-btn--ig" id="btn-ig">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                    Instagram
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FEATURE ARTICLE ══ */}
        <section className="mag-article" aria-label="Semblanza">
          <div className="mag-article__inner">
            <Reveal>
              <p className="mag-article__kicker">Semblanza ejecutiva</p>
              <h2 className="mag-article__h">
                Liderazgo con <strong>visión binacional</strong>
              </h2>
              <div className="mag-article__body">
                {D.fullBio ? (
                  D.fullBio.map((para: string, idx: number) => (
                    <React.Fragment key={idx}>
                      {idx === 4 && (
                        <blockquote className="mag-pull">
                          "{D.quote || "La clave está en crear puentes reales entre el talento mexicano y las oportunidades internacionales."}"
                        </blockquote>
                      )}
                      <p>{para}</p>
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <p>{D.bio}</p>
                    <blockquote className="mag-pull">
                      "La clave está en crear puentes reales entre el talento mexicano y las oportunidades internacionales."
                    </blockquote>
                    <p>{D.bio2}</p>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ VISION SECTION ══ */}
        {D.vision && D.vision.length > 0 && (
          <section className="mag-vision" style={{ background: 'var(--navy, #002E51)', color: '#fff', padding: '100px 7%', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.05, pointerEvents: 'none', transform: 'translate(20%, -20%)' }}>
              <div style={{ width: '400px', height: '400px', borderRadius: '50%', border: '4px solid #fff' }}></div>
            </div>
            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
              <Reveal>
                <span style={{ color: 'var(--magenta, #E4007C)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '16px', display: 'block' }}>Compromiso EMM</span>
                <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '3rem', fontWeight: 300, lineHeight: 1.1, margin: 0 }}>
                  Nuestra <br /><em style={{ fontStyle: 'italic', color: 'var(--magenta, #E4007C)' }}>Visión</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {D.vision.map((para: string, i: number) => (
                    <p key={i} style={{ fontSize: '1.25rem', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 300, margin: 0 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ══ NEWS ══ */}
        <section className="mag-news" aria-label="Noticias">
          <div className="mag-news__inner">
            <Reveal>
              <div className="mag-news__header">
                <h2 className="mag-news__title">Actualidad & Prensa</h2>
                <span className="mag-news__issue">Expo México Mujer · 2026–2027</span>
              </div>
            </Reveal>

            <div className="mag-news__grid">
              {NOTICIAS.map((n, i) => (
                <Reveal key={i} delay={i * 80}>
                  <a href={n.link} className="mag-nc">
                    <div className="mag-nc__img-wrap">
                      <img src={n.img} alt={n.titulo} className="mag-nc__img" loading="lazy" width="600" height="400" />
                    </div>
                    <span className="mag-nc__cat">{n.categoria}</span>
                    <h3 className="mag-nc__title">{n.titulo}</h3>
                    <p className="mag-nc__excerpt">{n.excerpt}</p>
                    <span className="mag-nc__date">{n.fecha}</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
