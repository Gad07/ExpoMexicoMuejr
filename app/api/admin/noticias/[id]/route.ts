import { NextResponse } from 'next/server';
import { readJSONAsync } from '@/lib/db';

export const dynamic = 'force-dynamic';

const DB_FILE = 'noticias.json';

interface Noticia {
  id: number;
  title: { es: string; en: string; fr: string };
  slug: string;
  date: string;
  category: { es: string; en: string; fr: string };
  image: string;
  excerpt: { es: string; en: string; fr: string };
  content: { es: string; en: string; fr: string };
  featured: boolean;
  template: string;
  images: string[];
  videoUrl: string;
  author: { name: string; role: string; bio: string; footer: string; image: string } | null;
}

// GET /api/admin/noticias/[id] - Get single news with full data
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const noticias = await readJSONAsync<Noticia>(DB_FILE);
    const noticia = noticias.find(n => n.id === id);

    if (!noticia) {
      return NextResponse.json({ error: 'Noticia no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ noticia });
  } catch {
    return NextResponse.json({ error: 'Error al leer noticia' }, { status: 500 });
  }
}