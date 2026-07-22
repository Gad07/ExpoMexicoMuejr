export interface TranslatableField {
  es: string;
  en: string;
  fr: string;
}

export interface AuthorInfo {
  name: string;
  role: string;
  bio: string;
  footer: string;
  image: string;
}

export interface Noticia {
  id: number;
  title: TranslatableField;
  slug: string;
  date: string;
  category: TranslatableField;
  image: string;
  excerpt: TranslatableField;
  content: TranslatableField;
  featured: boolean;
  template: string;
  images: string[];
  videoUrl: string;
  author: AuthorInfo | null;
  // Backwards compatibility fields for the detail template
  sidebarTitle?: string;
  sidebarItems?: string[];
  highlightQuote?: string;
  benefitsTitle?: string;
  benefits?: { num: string; title: string; desc: string }[];
  tickerText?: string;
}

import noticiasData from '../../data/noticias.json';
import { readJSONAsync } from '@/lib/db';

// This file exports types, interfaces, and the static news data.
export const ALL_NOTICIAS = noticiasData as unknown as Noticia[];

export async function getNoticias(): Promise<Noticia[]> {
  try {
    const data = await readJSONAsync<Noticia>('noticias.json');
    if (data && data.length > 0) return data;
  } catch {
    // fallback
  }
  return ALL_NOTICIAS;
}