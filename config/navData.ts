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
    label: "nav.expo.title",
    basePath: "/expo",
    items: [
      { label: "nav.expo.queEs", href: "/expo/que-es" },
      { label: "nav.expo.industrias", href: "/expo/industrias" },
      { label: "nav.expo.ottawa2026", href: "/expo/ottawa-2026" },
      { label: "nav.expo.noticias", href: "/recursos" },
      { label: "nav.expo.visas", href: "/visa" },
    ],
  },
  {
    label: "nav.participa.title",
    basePath: "/participa",
    items: [
      { label: "nav.participa.expositoras", href: "/expositores" },
      { label: "nav.participa.patrocinadores", href: "/patrocinadores" },
      { label: "nav.participa.embajadoras", href: "/embajadoras" },
      { label: "nav.participa.aliados", href: "/aliados" },
      { label: "nav.participa.invitados", href: "/invitados" },
      { label: "nav.participa.compradores", href: "/compradores" },
    ],
  },
  {
    label: "nav.agenda.title",
    basePath: "/agenda",
    items: [
      { label: "nav.agenda.toronto2027", href: "/agenda" },
      { label: "nav.agenda.summit", href: "/agenda/mexico-ontario-business-summit" },
      { label: "nav.agenda.fashionshow", href: "/agenda/mexican-fashion-gala-show" },
      { label: "nav.agenda.womenleaders", href: "/agenda/women-leaders-forum" },
      { label: "nav.agenda.mision", href: "/agenda/mision-comercial-montreal" },
    ],
  },
  {
    label: "nav.academy.title",
    basePath: "/academy",
    items: [
      { label: "nav.academy.ingles", href: "/academy/ingles-profesional" },
      { label: "nav.academy.executive", href: "/academy/executive-global-skills" },
      { label: "nav.academy.capacitacion", href: "/academy/capacitacion-empresarial" },
    ],
  },
  {
    label: "nav.informacion.title",
    basePath: "/informacion",
    items: [
      { label: "nav.informacion.prensa", href: "/informacion/prensa" },
      { label: "nav.informacion.participantes", href: "/informacion/participantes" },
      { label: "nav.informacion.logistica", href: "/informacion/logistica" },
      { label: "nav.informacion.viajero", href: "/informacion/viajero" },
      { label: "nav.informacion.contacto", href: "/contacto" },
    ],
  }
];
