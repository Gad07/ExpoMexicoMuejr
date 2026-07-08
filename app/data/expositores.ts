export const industries = [
  {
    name: 'Gastronomía',
    img: '/Galeria/Gastronomia/IMG_5924.JPG',
    size: 'large',
    desc: 'Sabor tradicional con proyección y exportación internacional.',
    carousel: [
      '/Galeria/Gastronomia/IMG_5940.JPG',
      '/Galeria/Gastronomia/IMG_6008.JPG',
      '/Galeria/Gastronomia/IMG_5981.JPG'
    ]
  },
  {
    name: 'Arte y Cultura',
    img: '/Galeria/Arte_y_Cultura/IMG_5885.JPG',
    size: 'tall',
    desc: 'Expresiones artísticas que proyectan el alma de México.',
    carousel: [
      '/Galeria/Arte_y_Cultura/IMG_5967.JPG',
      '/Galeria/Arte_y_Cultura/IMG_6244.JPG',
      '/Galeria/Arte_y_Cultura/IMG_6116.JPG'
    ]
  },
  {
    name: 'Artesanías',
    img: '/Galeria/Artesanias/IMG_5494.JPG',
    size: 'large',
    desc: 'Piezas únicas creadas por manos maestras mexicanas.',
    carousel: [
      '/Galeria/Artesanias/IMG_5928.JPG',
      '/Galeria/Artesanias/IMG_5931.JPG',
      '/Galeria/Artesanias/IMG_5923.JPG'
    ]
  },
  {
    name: 'Turismo',
    img: '/Galeria/Turismo/IMG_5986.JPG',
    size: 'wide',
    desc: 'Destinos inolvidables y experiencias culturales de primer nivel.',
    carousel: [
      '/Galeria/Turismo/IMG_5990.JPG',
      '/Galeria/Turismo/IMG_6140.JPG',
      '/Galeria/Turismo/IMG_5986.JPG'
    ]
  },
  {
    name: 'Ponencias',
    img: '/Galeria/Ponencias/IMG_4931.JPG',
    size: 'wide',
    desc: 'Intercambio académico y formación con visión global.',
    carousel: [
      '/Galeria/Ponencias/IMG_5999.JPG',
      '/Galeria/Ponencias/IMG_5169.JPG',
      '/Galeria/Ponencias/IMG_6117.JPG'
    ]
  },
  {
    name: 'Moda y textiles',
    img: '/Galeria/Moda_y_textiles/IMG_6031.JPG',
    size: 'tall',
    desc: 'Diseño, moda y tejidos con identidad artesanal única.',
    carousel: [
      '/Galeria/Moda_y_textiles/IMG_6032.JPG',
      '/Galeria/Moda_y_textiles/IMG_6036.JPG',
      '/Galeria/Moda_y_textiles/IMG_6023.JPG'
    ]
  }
];

export const mockExhibitors = [
  // Gastronomía
  {
    id: 'gastro-1',
    slug: 'sabores-de-origen',
    category: 'Gastronomía',
    name: 'Sabores de Origen',
    logo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=200',
    description: 'Sabores de Origen rescata recetas ancestrales mexicanas y las empaca para distribución internacional, llevando la auténtica cocina de humo a las mesas de Norteamérica.',
    website: 'www.saboresorigen.mx',
    booth: 'Pabellón A - Stand 14',
    contact: 'contacto@saboresorigen.mx',
    personName: 'Carmen Ruíz',
    personPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Chef y fundadora con más de 15 años de experiencia investigando la gastronomía indígena de Oaxaca. Ha sido galardonada internacionalmente por su labor de preservación culinaria.',
    gallery: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'gastro-2',
    slug: 'mezcal-tierra-viva',
    category: 'Gastronomía',
    name: 'Mezcal Tierra Viva',
    logo: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=200',
    description: 'Productora de mezcal artesanal liderada 100% por mujeres de Oaxaca. Destilados premium reconocidos internacionalmente por sus notas únicas.',
    website: 'www.tierraviva.mx',
    booth: 'Pabellón A - Stand 22',
    contact: 'ventas@tierraviva.mx',
    personName: 'Lucía Mendoza',
    personPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'Maestra mezcalera de tercera generación. Rompiendo estereotipos en la industria de los destilados y promoviendo el comercio justo para las mujeres productoras.',
    gallery: [
      'https://images.unsplash.com/photo-1590487532349-2ab251141cc1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1575037614876-c385cc9697bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1567171465223-28f08f103b41?auto=format&fit=crop&q=80&w=800'
    ]
  },
  // Arte y Cultura
  {
    id: 'arte-1',
    slug: 'galeria-raices',
    category: 'Arte y Cultura',
    name: 'Galería Raíces',
    logo: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=200',
    description: 'Colectivo de artistas plásticas que fusionan el arte contemporáneo con técnicas prehispánicas.',
    website: 'www.galeriaraices.com',
    booth: 'Pabellón B - Stand 05',
    contact: 'hola@galeriaraices.com',
    personName: 'Isabel Torres',
    personPhoto: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    bio: 'Curadora y artista plástica, ha expuesto en Europa y Norteamérica. Su misión es visibilizar el talento femenino en las artes visuales.',
    gallery: [
      'https://images.unsplash.com/photo-1518998053401-a46274b7852c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=800'
    ]
  },
  // Moda y Textiles
  {
    id: 'moda-1',
    slug: 'hilos-de-jade',
    category: 'Moda y textiles',
    name: 'Hilos de Jade',
    logo: 'https://images.unsplash.com/photo-1489987707023-afc660bc8755?auto=format&fit=crop&q=80&w=200',
    description: 'Moda sustentable y alta costura. Colaboramos con comunidades indígenas para crear prendas exclusivas.',
    website: 'www.hilosdejade.com',
    booth: 'Pabellón C - Stand 31',
    contact: 'info@hilosdejade.com',
    personName: 'Valeria Guzmán',
    personPhoto: 'https://images.unsplash.com/photo-1508214751196-bfd141134b44?auto=format&fit=crop&q=80&w=400',
    bio: 'Diseñadora de modas enfocada en la sostenibilidad y el comercio ético. Ganadora del premio "Innovación Textil 2025".',
    gallery: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550614000-4b95d466f244?auto=format&fit=crop&q=80&w=800'
    ]
  }
];
