export interface NavItem {
  label: string;
  href: string;
}

export interface NavDropdown {
  label: string;
  basePath?: string;
  items: NavItem[];
}

export const navData: (NavItem | NavDropdown)[] = [
  {
    label: "Expo México Mujer",
    basePath: "/expo",
    items: [
      { label: "¿Qué es Expo México Mujer?", href: "/expo/que-es" },
      { label: "Industrias", href: "/expo/industrias" },
      { label: "Expo México Mujer Ottawa 2026", href: "/expo/ottawa-2026" },
      { label: "Noticias", href: "/recursos" },
      { label: "Visas y Trámites", href: "/visa" },
    ],
  },
  {
    label: "Participa",
    basePath: "/participa",
    items: [
      { label: "Expositoras", href: "/expositores" },
      { label: "Patrocinadores", href: "/patrocinadores" },
      { label: "Embajadoras Expo México Mujer", href: "/embajadoras" },
      { label: "Aliados", href: "/aliados" },
      { label: "Invitados Especiales", href: "/invitados" },
      { label: "Compradores e Inversionistas", href: "/compradores" },
    ],
  },
  {
    label: "Agenda",
    basePath: "/agenda",
    items: [
      { label: "Expo México Mujer Toronto 2027", href: "/agenda" },
      { label: "México Ontario Business Summit", href: "/agenda/mexico-ontario-business-summit" },
      { label: "Mexican Fashion Gala Show", href: "/agenda/mexican-fashion-gala-show" },
      { label: "Women Leaders Forum", href: "/agenda/women-leaders-forum" },
      { label: "Misión Comercial Montreal", href: "/agenda/mision-comercial-montreal" },
    ],
  },
  {
    label: "Academy",
    basePath: "/academy",
    items: [
      { label: "Inglés Online", href: "/academy/ingles-profesional" },
      { label: "Executive Global Skills", href: "/academy/executive-global-skills" },
      { label: "Capacitación Empresarial", href: "/academy/capacitacion-empresarial" },
    ],
  },
  {
    label: "Información",
    basePath: "/informacion",
    items: [
      { label: "Prensa", href: "/informacion/prensa" },
      { label: "Participantes", href: "/informacion/participantes" },
      { label: "Logística Internacional y Exportación", href: "/informacion/logistica" },
      { label: "Servicios al Viajero", href: "/informacion/viajero" },
      { label: "Contacto", href: "/contacto" },
    ],
  }
];
