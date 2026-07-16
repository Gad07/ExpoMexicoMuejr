import { MetadataRoute } from 'next';

const BASE = 'https://expomexico.ca';

const routes = [
  '',
  '/visa',
  '/nosotros',
  '/contacto',
  '/expo/que-es',
  '/expo/industrias',
  '/expo/ottawa-2026',
  '/expositores',
  '/embajadoras',
  '/participa',
  '/aliados',
  '/compradores',
  '/agenda',
  '/agenda/mexico-ontario-business-summit',
  '/agenda/mexican-fashion-gala-show',
  '/agenda/women-leaders-forum',
  '/agenda/mision-comercial-montreal',
  '/academy',
  '/informacion',
  '/informacion/prensa',
  '/informacion/participantes',
  '/informacion/logistica',
  '/informacion/viajero',
  '/informacion/contacto',
  '/recursos',
  '/patrocinadores',
  '/invitados',
  '/terminos',
  '/privacidad',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
