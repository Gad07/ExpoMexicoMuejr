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

// This file exports types, interfaces, and the static news data.
export const ALL_NOTICIAS = noticiasData as unknown as Noticia[];

export async function getNoticias(): Promise<Noticia[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/page_modules?id=eq.store_noticias.json&select=items_json`, {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`
        },
        next: { revalidate: 0 }
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0].items_json) {
        return data[0].items_json as Noticia[];
      }
    } catch {
      // fallback
    }
  }
  return ALL_NOTICIAS;
}