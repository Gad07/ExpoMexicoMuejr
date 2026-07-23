"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  Eye,
  Landmark,
  GraduationCap,
  Briefcase,
  Shirt,
  Utensils,
  Compass,
  Palette,
  Mic,
  Award,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Building2,
  Music
} from 'lucide-react';
import { Mariposa } from '@/components/BrandAssets';
import { useLanguage } from '@/context/LanguageContext';

function Reveal({
  children, className = '', delay = 0, style = {},
}: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      suppressHydrationWarning
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

// FASHION CAROUSEL COMPONENT (ONLY USED FOR FASHION SHOWCASE)
function FashionCarousel({ children, subtitle }: { children: React.ReactNode; subtitle: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {subtitle}
        </span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Anterior"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid rgba(0,46,81,0.15)',
              background: canScrollLeft ? '#fff' : 'rgba(0,0,0,0.03)',
              color: canScrollLeft ? 'var(--navy)' : 'rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canScrollLeft ? 'pointer' : 'default',
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Siguiente"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid rgba(0,46,81,0.15)',
              background: canScrollRight ? 'var(--navy)' : 'rgba(0,0,0,0.03)',
              color: canScrollRight ? '#fff' : 'rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canScrollRight ? 'pointer' : 'default',
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: '20px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {children}
      </div>
    </div>
  );
}

// TRILINGUAL CONTENT DICTIONARY
const pageText = {
  es: {
    stats: [
      { val: "$1.2M+", label: "Intenciones de Compra (USD)", desc: "Acuerdos comerciales y pedidos consolidados a mediano plazo." },
      { val: "80+", label: "Expositoras Delegadas", desc: "Empresarias representando a más de 15 estados mexicanos." },
      { val: "1,500+", label: "Visitantes Profesionales", desc: "Público canadiense, compradores corporativos e inversionistas." },
      { val: "25+", label: "Aliados y Cámaras", desc: "Apoyo institucional consular, gubernamental y empresarial." }
    ],
    capacitacionTag: "Formación Técnica & Diplomática",
    capacitacionTitle: "Programa de Capacitación Internacional (Bloques 1 y 2)",
    capacitacionDesc: "Programa integral coordinado junto a la Embajada de México en Canadá, COMCE Sur y LET (Link Education & Travel) para preparar la oferta exportable mexicana.",
    bloque1Tag: "Fase 1 · Virtual",
    bloque1Title: "Bloque 1: Conectando Oportunidades",
    bloque1Desc: "6 sesiones virtuales impartidas los viernes (09:00 am - 10:30 am) totalmente gratuitas con diploma institucional.",
    bloque2Tag: "Fase 2 · Especializada",
    bloque2Title: "Bloque 2: Embajada de México en Canadá",
    bloque2Desc: "Seminarios avanzados impartidos por agregados comerciales y asesores legales en Ontario y Quebec.",
    moduloLabel: "MÓDULO",
    modulosBloque1: [
      { num: "I", title: "Introducción Cultural y Comercial a Canadá", desc: "Adaptación de oferta exportable, etiqueta de negocios canadiense y perfil del consumidor en Ontario y Quebec." },
      { num: "II", title: "Oportunidades de Negocios en Turismo", desc: "Modelos de promoción turística regional, experiencias culturales y alianzas con agencias de viajes canadienses." },
      { num: "III", title: "Oportunidades Comerciales México - Canadá & T-MEC", desc: "Aprovechamiento arancelario del tratado trilateral, reglas de origen y ventajas competitivas para la empresa mexicana." },
      { num: "IV", title: "Certificaciones y Normativa de Alimentos en Canadá", desc: "Requisitos sanitarios de la CFIA (Canadian Food Inspection Agency), etiquetado bilingüe (inglés/francés) y empaque reglamentario." },
      { num: "V", title: "Exportación de Artesanías, Mezcal y Alimentos", desc: "Estrategias de valor agregado, denominación de origen, registros de bebidas alcohólicas y distribución internacional." },
      { num: "VI", title: "Aspectos Claves en la Logística de Exportación", desc: "Cadena de suministro, transporte multimodal, agente aduanal, incoterms y seguros internacionales." }
    ],
    modulosBloque2: [
      { title: "Régimen Arancelario T-MEC", desc: "Aprovechamiento de tratados y reglas de origen en Norteamérica." },
      { title: "Normativa CFIA & Etiquetado", desc: "Inspección sanitaria y etiquetado bilingüe (inglés/francés) para alimentos." },
      { title: "Incorporación Empresarial", desc: "Fiscalidad, permisos de importación y marcas registradas (CIPO)." },
      { title: "Logística Multimodal", desc: "Transporte, seguros internacionales y agentes aduanales en Canadá." }
    ],
    disenadorasTag: "Eje 4 · Pasarela Internacional",
    disenadorasTitle: "Diseñadoras, Moda y Joyería de Autor",
    disenadorasCarouselSubtitle: "Desliza para explorar la pasarela",
    expositoresTag: "Eje 3 · Pabellón B2B",
    expositoresTitle: "Delegación de Expositoras y Marcas Participantes",
    gastronomiaTag: "Eje 5 · Sabores Patrimonio Cultural",
    gastronomiaTitle: "Muestra Gastronómica & Mezcal Artesanal de Origen",
    gastronomiaQuote: '"Mezcal Tisú representa la diversidad del agave como patrimonio vivo de México. Es territorio, diálogo y presencia: un mezcal elaborado con responsabilidad ancestral listo para su distribución en Canadá."',
    gastronomiaCheck1: "Catas dirigidas por maestras mezcaleras en Ontario.",
    gastronomiaCheck2: "Repostería fina PanQ'Ayuda y trufas artesanales Gi-Health.",
    speakersTag: "Conferencias Magistrales",
    speakersTitle: "Nuestras Speakers Oficiales",
    artistasTag: "Eje 7 · Expresiones Artísticas",
    artistasTitle: "Artistas y Danza Folclórica",
    galeriaTag: "Archivo Fotográfico HD",
    galeriaTitle: "Fotogalería Memoria Ottawa 2026"
  },
  en: {
    stats: [
      { val: "$1.2M+", label: "Purchase Intentions (USD)", desc: "Commercial agreements and consolidated medium-term orders." },
      { val: "80+", label: "Delegated Exhibitors", desc: "Women entrepreneurs representing over 15 Mexican states." },
      { val: "1,500+", label: "Professional Visitors", desc: "Canadian public, corporate buyers, and investors." },
      { val: "25+", label: "Allies & Chambers", desc: "Consular, governmental, and corporate institutional support." }
    ],
    capacitacionTag: "Technical & Diplomatic Training",
    capacitacionTitle: "International Training Program (Blocks 1 & 2)",
    capacitacionDesc: "Comprehensive program coordinated with the Embassy of Mexico in Canada, COMCE Sur, and LET (Link Education & Travel) to prepare Mexico's export offer.",
    bloque1Tag: "Phase 1 · Virtual",
    bloque1Title: "Block 1: Connecting Opportunities",
    bloque1Desc: "6 free virtual sessions held on Fridays (09:00 am - 10:30 am) with institutional diploma.",
    bloque2Tag: "Phase 2 · Specialized",
    bloque2Title: "Block 2: Embassy of Mexico in Canada",
    bloque2Desc: "Advanced seminars delivered by trade commissioners and legal advisors in Ontario and Quebec.",
    moduloLabel: "MODULE",
    modulosBloque1: [
      { num: "I", title: "Cultural & Commercial Introduction to Canada", desc: "Export offer adaptation, Canadian business etiquette, and consumer profile in Ontario and Quebec." },
      { num: "II", title: "Business Opportunities in Tourism", desc: "Regional tourism promotion models, cultural experiences, and partnerships with Canadian travel agencies." },
      { num: "III", title: "Mexico - Canada Trade & CUSMA/T-MEC", desc: "Tariff optimization under the trilateral agreement, rules of origin, and competitive advantages for Mexican companies." },
      { num: "IV", title: "CFIA Regulations & Food Compliance in Canada", desc: "CFIA (Canadian Food Inspection Agency) health requirements, bilingual labeling (English/French), and regulatory packaging." },
      { num: "V", title: "Exporting Handicrafts, Mezcal & Gourmet Foods", desc: "Value-add strategies, designation of origin, alcoholic beverage licensing, and international distribution." },
      { num: "VI", title: "Key Aspects in Export Logistics", desc: "Supply chain, multimodal transport, customs broker procedures, Incoterms, and international insurance." }
    ],
    modulosBloque2: [
      { title: "CUSMA Tariff Regime", desc: "Treaty benefits and rules of origin compliance across North America." },
      { title: "CFIA Regulations & Labeling", desc: "Health inspection and bilingual labeling (English/French) for food items." },
      { title: "Business Incorporation & Legal", desc: "Taxation, import permits, and registered trademarks (CIPO)." },
      { title: "Multimodal Logistics", desc: "Transport, international insurance, and customs brokers in Canada." }
    ],
    disenadorasTag: "Pillar 4 · International Runway",
    disenadorasTitle: "Designers, Fashion & Fine Jewelry",
    disenadorasCarouselSubtitle: "Swipe to explore the runway",
    expositoresTag: "Pillar 3 · B2B Pavilion",
    expositoresTitle: "Delegation of Exhibitors & Participating Brands",
    gastronomiaTag: "Pillar 5 · Cultural Heritage Flavors",
    gastronomiaTitle: "Gastronomic Showcase & Artisanal Origin Mezcal",
    gastronomiaQuote: '"Mezcal Tisú represents agave diversity as Mexico\'s living heritage. It is territory, dialogue, and presence: an artisanal mezcal crafted with ancestral responsibility ready for Canadian distribution."',
    gastronomiaCheck1: "Guided tastings led by master mezcaleras in Ontario.",
    gastronomiaCheck2: "PanQ'Ayuda fine pastries and Gi-Health artisanal truffles.",
    speakersTag: "Keynote Conferences",
    speakersTitle: "Our Official Speakers",
    artistasTag: "Pillar 7 · Artistic Expressions",
    artistasTitle: "Artists & Mexican Folk Dance",
    galeriaTag: "HD Photo Archive",
    galeriaTitle: "Ottawa 2026 Memory Photo Gallery"
  },
  fr: {
    stats: [
      { val: "$1.2M+", label: "Intentions d'Achat (USD)", desc: "Accords commerciaux et commandes consolidées à moyen terme." },
      { val: "80+", label: "Exposantes Déléguées", desc: "Femmes entrepreneures représentant plus de 15 États mexicains." },
      { val: "1,500+", label: "Visiteurs Professionnels", desc: "Public canadien, acheteurs corporatifs et investisseurs." },
      { val: "25+", label: "Alliés & Chambres", desc: "Soutien institutionnel consulaire, gouvernemental et empresarial." }
    ],
    capacitacionTag: "Formation Technique & Diplomatique",
    capacitacionTitle: "Programme de Formation Internationale (Blocs 1 et 2)",
    capacitacionDesc: "Programme complet coordonné avec l'Ambassade du Mexique au Canada, COMCE Sur et LET (Link Education & Travel) pour préparer l'offre exportable mexicaine.",
    bloque1Tag: "Phase 1 · Virtuelle",
    bloque1Title: "Bloc 1: Connecter les Opportunités",
    bloque1Desc: "6 sessions virtuelles gratuites les vendredis (09h00 - 10h30) avec diplôme institutionnel.",
    bloque2Tag: "Phase 2 · Spécialisée",
    bloque2Title: "Bloc 2: Ambassade du Mexique au Canada",
    bloque2Desc: "Séminaires avancés animés par des délégués commerciaux et conseillers juridiques en Ontario et au Québec.",
    moduloLabel: "MODULE",
    modulosBloque1: [
      { num: "I", title: "Introduction Culturelle et Commerciale au Canada", desc: "Adaptation de l'offre exportable, étiquette des affaires canadienne et profil du consommateur en Ontario et au Québec." },
      { num: "II", title: "Opportunités d'Affaires dans le Tourisme", desc: "Modèles de promotion touristique régionale, expériences culturelles et partenariats avec les agences de voyages canadiennes." },
      { num: "III", title: "Commerce Mexique - Canada & ACEUM/T-MEC", desc: "Optimisation tarifaire dans le cadre de l'accord trilatéral, règles d'origine et avantages concurrentiels des entreprises mexicaines." },
      { num: "IV", title: "Réglementation ACIA & Normes Alimentaires au Canada", desc: "Exigences sanitaires de l'ACIA (Agence canadienne d'inspection des aliments), étiquetage bilingue (anglais/français) et emballage réglementaire." },
      { num: "V", title: "Exportation d'Artisanat, Mezcal et Produits Gourmets", desc: "Stratégies de valeur ajoutée, appellation d'origine, licences de boissons alcoolisées et distribution internationale." },
      { num: "VI", title: "Aspects Clés de la Logistique d'Exportation", desc: "Chaîne d'approvisionnement, transport multimodal, courtage en douane, Incoterms et assurances internationales." }
    ],
    modulosBloque2: [
      { title: "Régime Tarifaire ACEUM", desc: "Avantages du traité et respect des règles d'origine en Amérique du Nord." },
      { title: "Normes ACIA & Étiquetage", desc: "Inspection sanitaire et étiquetage bilingue (anglais/français) pour les produits alimentaires." },
      { title: "Incorporation d'Entreprise & Juridique", desc: "Fiscalité, permis d'importation et marques déposées (OPIC)." },
      { title: "Logistique Multimodale", desc: "Transport, assurances internationales et courtiers en douane au Canada." }
    ],
    disenadorasTag: "Axe 4 · Défilé International",
    disenadorasTitle: "Designers, Mode et Joaillerie d'Auteur",
    disenadorasCarouselSubtitle: "Glissez pour explorer le défilé",
    expositoresTag: "Axe 3 · Pavillon B2B",
    expositoresTitle: "Délégation d'Exposantes et Marques Participantes",
    gastronomiaTag: "Axe 5 · Saveurs du Patrimoine Culturel",
    gastronomiaTitle: "Dégustation Gastronomique & Mezcal Artisanal d'Origine",
    gastronomiaQuote: '"Mezcal Tisú représente la diversité de l\'agave comme patrimoine vivant du Mexique. C\'est un territoire, un dialogue et une présence: un mezcal artisanal conçu avec une responsabilité ancestrale prêt pour la distribution canadienne."',
    gastronomiaCheck1: "Dégustations dirigées par des maîtresses mezcaleras en Ontario.",
    gastronomiaCheck2: "Pâtisserie fine PanQ'Ayuda et truffes artisanales Gi-Health.",
    speakersTag: "Conférences Magistrales",
    speakersTitle: "Nos Conférencières Officielles",
    artistasTag: "Axe 7 · Expressions Artistiques",
    artistasTitle: "Artistes & Danse Folklorique Mexicaine",
    galeriaTag: "Archives Photos HD",
    galeriaTitle: "Galerie Photo Mémoire Ottawa 2026"
  }
};

// DATOS E IMÁGENES REALES DE EXPOMEXICO.CA - DISEÑADORAS & MODA
const designersData = [
  {
    name: "María Escobedo",
    brand: "Flight of the Monarch Artisanal Collection",
    origin: "Michoacán / Chiapas",
    role: { es: "Fundadora & Directora de Moda", en: "Founder & Creative Director", fr: "Fondatrice et Directrice de Mode" },
    category: { es: "Moda Artesanal & Sombreros Pintados", en: "Artisanal Fashion & Painted Hats", fr: "Mode Artisanale et Chapeaux Peints" },
    photo: "https://expomexico.ca/wp-content/uploads/2026/05/IMG_0507_11zon-819x1024.webp",
    desc: {
      es: "Marca mexicana-canadiense inspirada en la migración de la mariposa monarca como símbolo de resiliencia y conexión cultural entre México y Canadá.",
      en: "Mexican-Canadian brand inspired by the monarch butterfly migration as a symbol of resilience and cultural connection between Mexico and Canada.",
      fr: "Marque mexicano-canadienne inspirée par la migration du papillon monarque comme symbole de résilience et de connexion culturelle entre le Mexique et le Canada."
    }
  },
  {
    name: "Lily Cota",
    brand: "Arte & Joyería Lily Cota",
    origin: "Ciudad de México",
    role: { es: "Artista Plástica & Diseñadora", en: "Fine Artist & Designer", fr: "Artiste Peintre et Designer" },
    category: { es: "Abanicos Pintados a Mano & Resina Epóxica", en: "Hand-Painted Fans & Epoxy Resin Jewelry", fr: "Éventails Peints à la Main et Bijoux en Résine Époxy" },
    photo: "https://expomexico.ca/wp-content/uploads/2025/10/Foto-Liliana-Cota-fondo-blanco.jpg",
    desc: {
      es: "Formada en México, Italia y España con 18 años de trayectoria combinando realismo, abanicos exclusivos de autor y joyería en resina.",
      en: "Trained in Mexico, Italy, and Spain with an 18-year career combining realism, exclusive author hand-fans, and resin jewelry.",
      fr: "Formée au Mexique, en Italie et en Espagne avec 18 ans de carrière alliant réalisme, éventails d'auteur exclusifs et bijoux en résine."
    }
  },
  {
    name: "Silvia Virginia Ruiz Rodríguez",
    brand: "HF Uniformes",
    origin: "León, Guanajuato",
    role: { es: "Directora General & Fundadora", en: "CEO & Founder", fr: "Directrice Générale et Fondatrice" },
    category: { es: "Manufactura & Diseño Textil Industrial", en: "Industrial Textile Manufacturing & Design", fr: "Fabrication et Design Textile Industriel" },
    photo: "https://expomexico.ca/wp-content/uploads/2026/02/1770920579983-892x1024.jpg",
    desc: {
      es: "Líder en la fabricación de ropa de trabajo, overoles con reflejante y chamarras con borrega interior proyectando la calidad industrial de Guanajuato.",
      en: "Leader in workwear manufacturing, reflective coveralls, and fleece-lined jackets projecting Guanajuato's industrial quality.",
      fr: "Leader de la fabrication de vêtements de travail, de combinaisons réfléchissantes et de vestes doublées de polaire projetant la qualité industrielle de Guanajuato."
    }
  }
];

// DATOS E IMÁGENES REALES DE EXPOMEXICO.CA - EXPOSITORAS & MARCAS
const exhibitorsData = [
  {
    name: "Ana Yolanda López Domínguez",
    company: "PanQ’Ayuda Cooperativa Incluyente",
    origin: "Querétaro",
    category: { es: "Repostería Fina & Alimentos Gourmet", en: "Fine Pastry & Gourmet Foods", fr: "Pâtisserie Fine et Produits Gourmets" },
    photo: "https://expomexico.ca/wp-content/uploads/2026/02/AnaResponsabilidad-Social-980x1024.jpg",
    desc: {
      es: "Directora General de PanQ'Ayuda, cooperativa que genera autonomía económica para personas con discapacidad y mujeres cabeza de familia con proyección en Zero Project ONU Viena.",
      en: "CEO of PanQ'Ayuda, an inclusive cooperative providing economic autonomy for persons with disabilities and female heads of household showcased at Zero Project UN Vienna.",
      fr: "Directrice Générale de PanQ'Ayuda, coopérative offrant l'autonomie économique aux personnes handicapées et femmes chefs de famille, présentée à Zero Project ONU Vienne."
    }
  },
  {
    name: "Valeria Regina Dávila Reyes",
    company: "Mezcal Tisú",
    origin: "Oaxaca / Jalisco",
    category: { es: "Destilados Artesanales & Mezcal de Origen", en: "Artisanal Spirits & Origin Mezcal", fr: "Spiritueux Artisanaux et Mezcal d'Origine" },
    photo: "https://expomexico.ca/wp-content/uploads/2026/04/Gemini_Generated_Image_wzqsmnwzqsmnwzqs_11zon-1007x1024.webp",
    desc: {
      es: "Mezcal artesanal respetando los procesos ancestrales de la tierra y representando la diversidad del agave como patrimonio vivo de México.",
      en: "Artisanal mezcal honoring ancestral earth processes and representing agave diversity as Mexico's living heritage.",
      fr: "Mezcal artisanal honorant les processus ancestraux de la terre et représentant la diversité de l me l'agave comme patrimoine vivant du Mexique."
    }
  },
  {
    name: "Familia Duarte (Josefina & Jesús Duarte)",
    company: "Huerta JD",
    origin: "Michoacán",
    category: { es: "Producción Agroalimentaria de Aguacate", en: "Export Avocado Agri-food Production", fr: "Production Agroalimentaire d'Avocats d'Exportation" },
    photo: "https://expomexico.ca/wp-content/uploads/2026/04/Gemini_Generated_Image_tqkqu7tqkqu7tqkq_11zon-725x1024.webp",
    desc: {
      es: "Cosecha sustentable de aguacate de exportación basada en la dedicación familiar, resiliencia y responsabilidad ecológica.",
      en: "Sustainable export avocado harvest based on family dedication, resilience, and ecological responsibility.",
      fr: "Récolte d'avocats d'exportation durable basée sur le dévouement familial, la résilience et la responsabilité écologique."
    }
  },
  {
    name: "Salsas Chile de Amor",
    company: "Chile de Amor Gourmet",
    origin: "Veracruz",
    category: { es: "Salsas Artesanales & Aderezos Típicos", en: "Artisanal Hot Sauces & Dressings", fr: "Sauces Piquantes Artisanales et Assaisonnements" },
    photo: "https://expomexico.ca/wp-content/uploads/2026/05/Group-119.png",
    desc: {
      es: "Salsas artesanales elaboradas con chiles nativos y receta tradicional preparadas bajo norma de etiquetado para Norteamérica.",
      en: "Artisanal sauces crafted with native peppers and traditional recipes packaged under North American labeling compliance.",
      fr: "Sauces artisanales préparées avec des piments indigènes et des recettes traditionnelles conformes aux normes d'étiquetage d'Amérique du Nord."
    }
  }
];

// DATOS E IMÁGENES REALES DE EXPOMEXICO.CA - SPEAKERS
const realSpeakersData = [
  {
    name: "Ximena Zambrana Terrazas",
    title: { es: "CEO de Vital Dignity Academy & Abogada Corporativa", en: "CEO of Vital Dignity Academy & Corporate Lawyer", fr: "PDG de Vital Dignity Academy et Avocate Corporative" },
    org: "Vital Dignity Academy · Embajadora RIMEL Canadá",
    topic: {
      es: "Liderazgo Humano en Tiempos de IA: Cerebro, Emociones y Conciencia",
      en: "Human Leadership in AI Era: Brain, Emotions, and Consciousness",
      fr: "Leadership Humain à l'Ère de l'IA: Cerveau, Émotions et Conscience"
    },
    photo: "https://expomexico.ca/wp-content/uploads/2026/03/Foto-XZT-2026-767x1024.jpeg",
    desc: {
      es: "Conferencia magistral que combina neurociencia e inteligencia emocional para potenciar las habilidades humanas que ninguna máquina puede reemplazar.",
      en: "Keynote conference combining neuroscience and emotional intelligence to enhance human abilities no machine can replace.",
      fr: "Conférence magistrale alliant neurosciences et intelligence émotionnelle pour renforcer les compétences humaines qu'aucune machine ne peut remplacer."
    }
  },
  {
    name: "Lisseth Gil",
    title: { es: "Coach de Negocios en ActionCoach Iberoamérica", en: "Business Coach at ActionCoach Iberoamérica", fr: "Coach d'Affaires chez ActionCoach Iberoamérica" },
    org: "ASIC Empresarial & Investigadora PRODEP",
    topic: {
      es: "Herramientas Estratégicas para el Crecimiento de Negocios",
      en: "Strategic Tools for Business Growth and Scaling",
      fr: "Outils Stratégiques pour la Croissance et le Développement des Entreprises"
    },
    photo: "https://expomexico.ca/wp-content/uploads/2026/02/LISSETH-GIL-GUERRERO-819x1024.jpg",
    desc: {
      es: "Maestra en Administración con más de 250 proyectos consultados a nivel nacional y ponente internacional en más de 30 foros académicos y comerciales.",
      en: "Master in Business Administration with over 250 consulted projects nationwide and international speaker in over 30 academic and trade forums.",
      fr: "Master en Administration des Affaires avec plus de 250 projets consultés au niveau national et conférencière internationale dans plus de 30 forums."
    }
  },
  {
    name: "Grace Espinosa",
    title: { es: "Fundadora de Speak to Canada", en: "Founder of Speak to Canada", fr: "Fondatrice de Speak to Canada" },
    org: "Speak to Canada (STC) · Creadora del Método FAST",
    topic: {
      es: "Superación de Bloqueos para Hablar Inglés y Francés en Canadá",
      en: "Overcoming Communication Blockades in English and French in Canada",
      fr: "Surmonter los Blocages de Communication en Anglais et Français au Canada"
    },
    photo: "https://expomexico.ca/wp-content/uploads/2026/05/Grace-Espinosa_11zon-1024x1024.webp",
    desc: {
      es: "Metodología que integra idiomas, PNL y neurociencia para ayudar a emprendedoras y profesionales latinoamericanas a comunicarse con confianza en Canadá.",
      en: "Methodology integrating language learning, NLP, and neuroscience to empower Latin American entrepreneurs to communicate confidently in Canada.",
      fr: "Méthodologie intégrant apprentissage des langues, PNL et neurosciences pour aider les entrepreneures latino-américaines à communiquer avec confiance au Canada."
    }
  }
];

// ARTISTAS REALES DE EXPOMEXICO.CA
const realArtistsData = [
  {
    name: "Zuleyka Erazo",
    role: { es: "Directora Artística & Coreógrafa", en: "Artistic Director & Choreographer", fr: "Directrice Artistique et Chorégraphe" },
    group: "Grupo de Danza Viva México Ottawa",
    photo: "https://expomexico.ca/wp-content/uploads/2026/04/Foto-Z.Erazo_.jpg",
    desc: {
      es: "Coreógrafa egresada del Centro Cultural Ollin Yoliztli en CDMX con más de 20 años difundiendo el ballet folclórico y las raíces culturales mexicanas en Canadá.",
      en: "Choreographer graduated from Ollin Yoliztli Cultural Center in Mexico City with over 20 years promoting Mexican folk dance in Canada.",
      fr: "Chorégraphe diplômée du Centre Culturel Ollin Yoliztli à Mexico avec plus de 20 ans de promotion de la danse folklorique mexicaine au Canada."
    }
  },
  {
    name: "Yolanda Yadsany Cerezo Sanabria",
    role: { es: "Cantante de Música Vernácula", en: "Traditional Mexican Music Singer", fr: "Chanteuse de Musique Traditionnelle Mexicaine" },
    group: "Mariachi Tradicional",
    photo: "https://expomexico.ca/wp-content/uploads/2026/02/2-scaled.jpg",
    desc: {
      es: "Cantante mexicana de tercera generación dedicada a la interpretación de la música tradicional mexicana en escenarios y festivales internacionales.",
      en: "Third-generation Mexican singer performing traditional Mexican vernacular music on international stages and festivals.",
      fr: "Chanteuse mexicaine de troisième génération interprétant la musique traditionnelle mexicaine sur les scènes et festivals internationaux."
    }
  }
];

// FOTOGRAFÍAS REALES EN ALTA RESOLUCIÓN DESDE DROPBOX
const dropboxGalleryImages = [
  { url: "https://dl.dropboxusercontent.com/scl/fi/n5nvkf899stzjgd6xep2w/expo-mexico-portada-3.jpeg?rlkey=kq2qarvt9sd7wpn69xzmi0xiw&st=cca06w54&raw=1" },
  { url: "https://dl.dropboxusercontent.com/scl/fi/kfblfmmvd0i0sre7fskkj/expo-mexico-portada-2.jpeg?rlkey=kg5kq52y8xlpumxdt33z1r27e&st=zh9hhvxs&raw=1" },
  { url: "https://dl.dropboxusercontent.com/scl/fi/rcd85i563npl5tx1kg4te/IMG_6068.JPG?rlkey=9no88hl8xqa8vscx2zxe3y5l1&st=yuwjsais&raw=1" },
  { url: "https://dl.dropboxusercontent.com/scl/fi/zi1ntmhci2ln3n1v0naks/IMG_6014.JPG?rlkey=n51i03rjjqyuh6mqjyaa8kl7m&st=0wjdywr7&raw=1" },
  { url: "https://dl.dropboxusercontent.com/scl/fi/qg1gpj41szcx3lt2zxxjz/IMG_6007.JPG?rlkey=alscr6py479b0rhydmxj823yu&st=cmd0i5td&raw=1" },
  { url: "https://dl.dropboxusercontent.com/scl/fi/4i5lmni9rlkcbe12ebw9w/IMG_5967.JPG?rlkey=tte7nkg92144kmpmuxphsysa8&st=6god4z5r&raw=1" },
  { url: "https://dl.dropboxusercontent.com/scl/fi/8tqlync04pgx4pz5vymdp/IMG_5926.JPG?rlkey=nuf70cynx8ryxean4tt1zy4vx&st=44745ell&raw=1" },
  { url: "https://dl.dropboxusercontent.com/scl/fi/wap1v3geyzxfep5eehmhx/IMG_5372.JPG?rlkey=mqsur44jtsk4kc80ns1rzizyr&st=p526kgqu&raw=1" },
  { url: "https://dl.dropboxusercontent.com/scl/fi/xeosnql8r9sqjdpbs4aw3/IMG_5165.JPG?rlkey=5udyuznlq8tvracdkihuilhys&st=j2qdwjg2&raw=1" },
  { url: "https://dl.dropboxusercontent.com/scl/fi/khgglibg7wh0m8w1dyv93/IMG_5717.JPG?rlkey=fxluxgqsib2rldz5wslhacasy&st=thgvon20&raw=1" },
  { url: "https://dl.dropboxusercontent.com/scl/fi/407i0mwa9viaxp7bbbnuf/IMG_5702.JPG?rlkey=4c96pyr3krahqgo7efl4u9ufw&st=k2vjypnx&raw=1" },
  { url: "https://dl.dropboxusercontent.com/scl/fi/96yeamiebeuxqq2eikdvv/IMG_5701.JPG?rlkey=m0xg04dosley5o33s9y979q25&st=0nnqhyiy&raw=1" }
];

export default function OttawaPage() {
  const { language } = useLanguage();
  const currentLang = (language === 'en' || language === 'fr') ? language : 'es';
  const txt = pageText[currentLang];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ background: '#FAF8F4', minHeight: '100vh' }} suppressHydrationWarning />
    );
  }

  return (
    <div style={{ background: '#FAF8F4', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }} suppressHydrationWarning>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '40px 24px 0' }}>

        {/* STATS STRIP */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '90px' }}>
          {txt.stats.map((s, idx) => (
            <Reveal key={s.label} delay={idx * 50}>
              <div style={{ background: '#fff', borderRadius: '24px', padding: '28px 24px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,25,76,0.03)' }}>
                <div style={{ color: 'var(--cyan)', display: 'inline-flex', marginBottom: '12px' }}>
                  {idx === 0 ? <TrendingUp size={24} /> : idx === 1 ? <Users size={24} /> : idx === 2 ? <Eye size={24} /> : <Landmark size={24} />}
                </div>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--navy)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--navy)', marginTop: '6px', marginBottom: '4px' }}>{s.label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 2. PROGRAMA DE CAPACITACIÓN — TIMELINE PARALELO */}
        {/* ========================================================================= */}
        <section id="programa-capacitacion" style={{ marginBottom: '100px', scrollMarginTop: '120px' }}>
          <Reveal>
            <div style={{ background: '#fff', borderRadius: '32px', padding: '56px 40px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 20px 50px rgba(0,25,76,0.04)' }}>

              <div style={{ marginBottom: '40px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  {txt.capacitacionTag}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
                  {txt.capacitacionTitle}
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--text)', marginTop: '12px', maxWidth: '850px', lineHeight: 1.7 }}>
                  {txt.capacitacionDesc}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>

                {/* BLOQUE 1 TIMELINE */}
                <div style={{ background: 'var(--cream)', borderRadius: '24px', padding: '32px', borderLeft: '6px solid var(--magenta)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ background: 'var(--magenta)', color: '#fff', padding: '10px', borderRadius: '14px' }}>
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase' }}>{txt.bloque1Tag}</span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>{txt.bloque1Title}</h3>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {txt.bloque1Desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {txt.modulosBloque1.map((m) => (
                      <div key={m.num} style={{ background: '#fff', borderRadius: '14px', padding: '14px 18px', border: '1px solid rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--magenta)' }}>{txt.moduloLabel} {m.num}</div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--navy)', marginTop: '2px' }}>{m.title}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>{m.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BLOQUE 2 TIMELINE */}
                <div style={{ background: '#F4F7FA', borderRadius: '24px', padding: '32px', borderLeft: '6px solid var(--navy)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ background: 'var(--navy)', color: '#fff', padding: '10px', borderRadius: '14px' }}>
                      <Building2 size={24} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase' }}>{txt.bloque2Tag}</span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>{txt.bloque2Title}</h3>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {txt.bloque2Desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {txt.modulosBloque2.map((item, idx) => (
                      <div key={idx} style={{ background: '#fff', borderRadius: '14px', padding: '14px 18px', border: '1px solid rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--navy)' }}>{item.title}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </Reveal>
        </section>

        {/* ========================================================================= */}
        {/* 3. SHOWROOM DE DISEÑADORAS — IMÁGENES Y DATOS TRILINGÜES */}
        {/* ========================================================================= */}
        <section id="disenadoras" style={{ marginBottom: '100px', scrollMarginTop: '120px' }}>
          <Reveal>
            <div style={{ marginBottom: '32px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                {txt.disenadorasTag}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: 'var(--navy)', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Shirt size={32} style={{ color: 'var(--magenta)' }} /> {txt.disenadorasTitle}
              </h2>
            </div>

            <FashionCarousel subtitle={txt.disenadorasCarouselSubtitle}>
              {designersData.map((d, idx) => (
                <div key={idx} style={{
                  minWidth: '320px',
                  maxWidth: '360px',
                  scrollSnapAlign: 'start',
                  background: '#fff',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 12px 30px rgba(0,25,76,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  flexShrink: 0
                }}>
                  <div style={{ height: '320px', width: '100%', position: 'relative' }}>
                    <img src={d.photo} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(228,0,124,0.9)', color: '#fff', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                      {d.origin}
                    </div>
                  </div>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {d.role[currentLang]}
                    </span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--navy)', margin: '0 0 4px 0' }}>
                      {d.name}
                    </h3>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--cyan)', marginBottom: '12px' }}>
                      {d.brand} — {d.category[currentLang]}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                      {d.desc[currentLang]}
                    </p>
                  </div>
                </div>
              ))}
            </FashionCarousel>
          </Reveal>
        </section>

        {/* ========================================================================= */}
        {/* 4. DELEGACIÓN DE EXPOSITORAS — DATOS TRILINGÜES */}
        {/* ========================================================================= */}
        <section id="expositores" style={{ marginBottom: '100px', scrollMarginTop: '120px' }}>
          <Reveal>
            <div style={{ marginBottom: '32px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                {txt.expositoresTag}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: 'var(--navy)', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Briefcase size={32} style={{ color: 'var(--navy)' }} /> {txt.expositoresTitle}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
              {exhibitorsData.map((ex, idx) => (
                <div key={idx} style={{
                  background: '#fff',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 12px 30px rgba(0,25,76,0.04)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ height: '260px', width: '100%', position: 'relative' }}>
                    <img src={ex.photo} alt={ex.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,46,81,0.85)', color: '#fff', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                      {ex.origin}
                    </div>
                  </div>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {ex.category[currentLang]}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--navy)', margin: '0 0 4px 0' }}>
                      {ex.name}
                    </h3>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--magenta)', marginBottom: '12px' }}>
                      {ex.company}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                      {ex.desc[currentLang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ========================================================================= */}
        {/* 5. GASTRONOMÍA — MEZCAL TISÚ SHOWCASE */}
        {/* ========================================================================= */}
        <section id="gastronomia" style={{ marginBottom: '100px', scrollMarginTop: '120px' }}>
          <Reveal>
            <div style={{ background: '#fff', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 20px 50px rgba(0,25,76,0.04)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'stretch' }}>

                <div style={{ position: 'relative', minHeight: '380px' }}>
                  <img src="https://expomexico.ca/wp-content/uploads/2026/04/Gemini_Generated_Image_wzqsmnwzqsmnwzqs_11zon-1007x1024.webp" alt="Mezcal Tisú" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,25,76,0.85) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: '24px', left: '24px', color: '#fff' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF77C2', textTransform: 'uppercase' }}>Cata Guiada Oficial</span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '2px 0 0 0' }}>Valeria Regina Dávila Reyes — Mezcal Tisú</h3>
                  </div>
                </div>

                <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {txt.gastronomiaTag}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '16px', lineHeight: 1.2 }}>
                    {txt.gastronomiaTitle}
                  </h2>
                  <p style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: 1.7, marginBottom: '24px' }}>
                    {txt.gastronomiaQuote}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy)' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--magenta)' }} /> {txt.gastronomiaCheck1}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy)' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--magenta)' }} /> {txt.gastronomiaCheck2}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================================================================= */}
        {/* 6. SPEAKERS REALES TRILINGÜES */}
        {/* ========================================================================= */}
        <section id="speakers" style={{ marginBottom: '100px', scrollMarginTop: '120px' }}>
          <Reveal>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                {txt.speakersTag}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
                {txt.speakersTitle}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {realSpeakersData.map((s, idx) => (
                <div key={idx} style={{
                  background: '#fff',
                  borderRadius: '28px',
                  padding: '32px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 14px 36px rgba(0,25,76,0.04)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ height: '280px', width: '100%', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}>
                    <img src={s.photo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--magenta)', textTransform: 'uppercase' }}>{s.org}</span>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--navy)', margin: '4px 0' }}>{s.name}</h3>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--cyan)', marginBottom: '8px' }}>{s.topic[currentLang]}</div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{s.desc[currentLang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ========================================================================= */}
        {/* 7. ARTISTAS REALES TRILINGÜES */}
        {/* ========================================================================= */}
        <section id="artistas" style={{ marginBottom: '100px', scrollMarginTop: '120px' }}>
          <Reveal>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                {txt.artistasTag}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: 'var(--navy)', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <Music size={32} style={{ color: 'var(--navy)' }} /> {txt.artistasTitle}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {realArtistsData.map((a, idx) => (
                <div key={idx} style={{
                  background: '#fff',
                  borderRadius: '28px',
                  padding: '32px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 14px 36px rgba(0,25,76,0.04)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ height: '300px', width: '100%', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}>
                    <img src={a.photo} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--cyan)', textTransform: 'uppercase' }}>{a.group}</span>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--navy)', margin: '4px 0' }}>{a.name}</h3>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--magenta)', marginBottom: '8px' }}>{a.role[currentLang]}</div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{a.desc[currentLang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ========================================================================= */}
        {/* 8. FOTOGALERÍA DE ALTA RESOLUCIÓN DESDE DROPBOX (SIN TEXTO) */}
        {/* ========================================================================= */}
        <section id="galeria-memorias" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
          <Reveal>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                {txt.galeriaTag}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
                {txt.galeriaTitle}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {dropboxGalleryImages.map((img, idx) => (
                <div key={idx} style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(0,25,76,0.06)',
                  aspectRatio: '4/3',
                  position: 'relative'
                }}>
                  <img src={img.url} alt="Ottawa 2026 Memory Photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>
        </section>

      </div>
    </div>
  );
}
