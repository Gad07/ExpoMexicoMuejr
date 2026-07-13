export interface Invitado {
  id: string;
  slug: string;
  tier: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  contact: string;
  personName: string;
  personPhoto: string;
  bio: string;
  gallery: string[];
  category: 'Líderes empresariales' | 'Conferencistas' | 'Personalidades';
}

export const mockInvitados: Invitado[] = [
  {
    id: 'inv-1',
    slug: 'maria-lopez',
    tier: 'Invitada Especial',
    name: 'María López',
    logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    description: 'Reconocida líder en la industria de la tecnología y fundadora de "Mujeres en STEM". Su participación ha sido clave en la promoción de la diversidad en las ciencias.',
    website: 'www.marialopez.mx',
    contact: 'contacto@marialopez.mx',
    personName: 'María López',
    personPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    bio: 'Pionera en el desarrollo de software educativo, con más de 15 años de experiencia liderando equipos internacionales.',
    gallery: [
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Líderes empresariales'
  },
  {
    id: 'inv-2',
    slug: 'regina-gomez',
    tier: 'Socia Fundadora',
    name: 'Regina Gómez',
    logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    description: 'Directora de Fondos de Inversión Ángel orientados a impulsar el crecimiento comercial de empresas fundadas por mujeres en toda Latinoamérica.',
    website: 'www.reginagomez.com',
    contact: 'inversiones@reginagomez.com',
    personName: 'Regina Gómez',
    personPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    bio: 'Especialista en capital de riesgo y aceleración corporativa, con un portafolio de más de 30 startups exitosas lideradas por mujeres.',
    gallery: [
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Líderes empresariales'
  },
  {
    id: 'inv-3',
    slug: 'laura-sterling',
    tier: 'Directora Logística',
    name: 'Laura Sterling',
    logo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200',
    description: 'Fundadora de Sterling Logistics Canada, experta en optimización y estructuración de cadenas de suministro binacionales entre México y Canadá.',
    website: 'www.sterlinglogistics.ca',
    contact: 'lsterling@sterlinglogistics.ca',
    personName: 'Laura Sterling',
    personPhoto: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800',
    bio: 'Consultora senior con más de dos décadas de trayectoria en regulaciones aduaneras de importación y exportación de productos agrícolas y textiles.',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Líderes empresariales'
  },
  {
    id: 'inv-4',
    slug: 'gabriela-mistral',
    tier: 'Conferencista Magistral',
    name: 'Gabriela Mistral',
    logo: 'https://images.unsplash.com/photo-1508214751196-bfd141134b44?auto=format&fit=crop&q=80&w=200',
    description: 'Experta en innovación y sostenibilidad, enfocada en la creación de negocios de impacto ambiental positivo y responsabilidad social.',
    website: 'www.innovacion-verde.mx',
    contact: 'hola@innovacion-verde.mx',
    personName: 'Gabriela Mistral',
    personPhoto: 'https://images.unsplash.com/photo-1508214751196-bfd141134b44?auto=format&fit=crop&q=80&w=800',
    bio: 'Fundadora de "Green Future", una de las startups más exitosas en el ámbito de las energías renovables y la sostenibilidad corporativa.',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Conferencistas'
  },
  {
    id: 'inv-5',
    slug: 'clara-dupont',
    tier: 'Ponente Académica',
    name: 'Dra. Clara Dupont',
    logo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
    description: 'Investigadora y doctora en Estudios Globales. Especialista en la formulación de tratados bilaterales de comercio en América del Norte.',
    website: 'www.claradupont.edu',
    contact: 'cdupont@claradupont.edu',
    personName: 'Clara Dupont',
    personPhoto: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    bio: 'Catedrática de prestigiosas universidades en Canadá y México, centrada en el análisis socioeconómico del empoderamiento femenino en industrias clave.',
    gallery: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Conferencistas'
  },
  {
    id: 'inv-6',
    slug: 'valeria-romero',
    tier: 'Conferencista Internacional',
    name: 'Valeria Romero',
    logo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200',
    description: 'Reconocida conferencista motivacional y especialista en el desarrollo de resiliencia empresarial y mentalidad de abundancia para mujeres líderes.',
    website: 'www.valeriaromero.mx',
    contact: 'contacto@valeriaromero.mx',
    personName: 'Valeria Romero',
    personPhoto: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800',
    bio: 'Autora del best-seller "Lidera sin Límites", mentora de negocios y fundadora de comunidades de crecimiento profesional.',
    gallery: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Conferencistas'
  },
  {
    id: 'inv-7',
    slug: 'carmen-sanchez',
    tier: 'Invitada de Honor',
    name: 'Dra. Carmen Sánchez',
    logo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    description: 'Especialista en economía internacional y asesora de políticas públicas para el desarrollo empresarial de mujeres en América Latina.',
    website: 'www.carmensanchez.com',
    contact: 'asesoria@carmensanchez.com',
    personName: 'Carmen Sánchez',
    personPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
    bio: 'Autora de múltiples libros sobre economía y equidad de género, galardonada con el Premio Internacional de Economía 2021.',
    gallery: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Personalidades'
  },
  {
    id: 'inv-8',
    slug: 'sylvia-davis',
    tier: 'Personalidad de Honor',
    name: 'Senadora Sylvia Davis',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200',
    description: 'Senadora canadiense impulsora de programas de intercambio cultural y de relaciones comerciales binacionales entre Canadá y México.',
    website: 'www.sylviadavis.ca',
    contact: 'sdavis@sen.parl.gc.ca',
    personName: 'Sylvia Davis',
    personPhoto: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    bio: 'Líder política canadiense que ha abogado firmemente por el fortalecimiento de lazos económicos y sociales a través de la educación y el arte.',
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Personalidades'
  },
  {
    id: 'inv-9',
    slug: 'michelle-vance',
    tier: 'Representante Oficial',
    name: 'Michelle Vance',
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    description: 'Representante oficial de Global Women Initiative Canada, liderando programas de inserción comercial para empresarias extranjeras en el mercado local.',
    website: 'www.globalwomeninitiative.ca',
    contact: 'mvance@globalwomen.ca',
    personName: 'Michelle Vance',
    personPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    bio: 'Activista e impulsora de políticas corporativas incluyentes con amplia experiencia en mentorías ejecutivas y desarrollo de redes de apoyo comercial.',
    gallery: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Personalidades'
  }
];
