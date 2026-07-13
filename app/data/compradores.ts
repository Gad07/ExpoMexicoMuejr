export interface Comprador {
  id: string;
  slug: string;
  name: string;
  company: string;
  role: string;
  location: string;
  interest: string;
  description: string;
  photo: string;
  cover: string;
  color: string;
  bgColor: string;
  bio: string;
  website: string;
  contact: string;
  gallery: string[];
}

export const mockBuyers: Comprador[] = [
  {
    id: 'buyer-1',
    slug: 'sarah-jenkins',
    name: "Sarah Jenkins",
    company: "Maple Trade Distributors",
    role: "Directora de Adquisiciones",
    location: "Toronto, ON",
    interest: "Alimentos Procesados & Bebidas",
    description: "Establecemos contacto directo con productoras mexicanas de salsas artesanales, café de altura y confitería gourmet para posicionamiento en cadenas de autoservicio de Ontario.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800",
    color: "var(--magenta)",
    bgColor: "var(--magenta)10",
    bio: "Nuestra misión es llevar los sabores más auténticos de México a las mesas canadienses, garantizando calidad excepcional y consistencia de suministro.",
    website: "www.mapletrade.ca",
    contact: "sjenkins@mapletrade.ca",
    gallery: [
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 'buyer-2',
    slug: 'jean-pierre-cloutier',
    name: "Jean-Pierre Cloutier",
    company: "Sterling Imports Ltd.",
    role: "Gerente de Importaciones",
    location: "Montreal, QC",
    interest: "Textiles, Moda & Accesorios",
    description: "Interesado en adquirir colecciones exclusivas de ropa artesanal contemporánea y calzado mexicano hecho a mano bajo esquemas éticos y de comercio justo.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    color: "var(--cyan)",
    bgColor: "var(--cyan)10",
    bio: "Buscamos diseñadoras y artesanas con propuestas de identidad sólida, cuyos productos cuenten historias únicas a través de sus tejidos y acabados.",
    website: "www.sterlingimports.ca",
    contact: "jpcloutier@sterlingimports.ca",
    gallery: [
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 'buyer-3',
    slug: 'emily-wong',
    name: "Dra. Emily Wong",
    company: "Nordic Wellness Co.",
    role: "Directora de Desarrollo de Insumos",
    location: "Vancouver, BC",
    interest: "Salud, Cuidado Personal & Belleza",
    description: "Especializada en la compra e importación de aceites esenciales, extractos botánicos naturales e insumos orgánicos producidos por cooperativas mexicanas de mujeres.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    color: "#D6A354",
    bgColor: "#D6A35410",
    bio: "Valoramos los procesos sustentables, la pureza de los ingredientes y el impacto socioeconómico directo que generamos al comprar a productoras.",
    website: "www.nordicwellness.ca",
    contact: "ewong@nordicwellness.ca",
    gallery: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 'buyer-4',
    slug: 'marcus-vance',
    name: "Marcus Vance",
    company: "Horizon Retail Canada",
    role: "Líder de Categoría Hogar",
    location: "Ottawa, ON",
    interest: "Artesanías & Decoración",
    description: "Busca vajillas de cerámica, textiles para el hogar y piezas ornamentales hechas a mano por artesanas y diseñadoras independientes de origen mexicano.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
    color: "var(--navy)",
    bgColor: "var(--navy)10",
    bio: "El diseño artesanal mexicano tiene un atractivo indiscutible en Canadá. Queremos curar las mejores piezas para nuestro portafolio de decoración.",
    website: "www.horizonretail.ca",
    contact: "mvance@horizonretail.ca",
    gallery: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800"
    ]
  }
];
