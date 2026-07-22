import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

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



function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getNextId(noticias: Noticia[]): number {
  if (noticias.length === 0) return 1;
  return Math.max(...noticias.map(n => n.id)) + 1;
}

// GET /api/admin/noticias - List all news
export async function GET(request: Request) {
  try {
    const noticias = readJSON<Noticia>(DB_FILE);
    // Return only necessary fields for listing
    const list = noticias.map(n => ({
      id: n.id,
      title: n.title,
      slug: n.slug,
      date: n.date,
      featured: n.featured,
      template: n.template,
      category: n.category,
      image: n.image,
      excerpt: n.excerpt,
    }));
    return NextResponse.json({ noticias: list });
  } catch {
    return NextResponse.json({ error: 'Error al leer noticias' }, { status: 500 });
  }
}

// POST /api/admin/noticias - Create new news
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const noticias = readJSON<Noticia>(DB_FILE);

    const newNoticia: Noticia = {
      id: getNextId(noticias),
      title: body.title || { es: '', en: '', fr: '' },
      slug: body.slug || slugify(body.title?.es || ''),
      date: body.date || new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: body.category || { es: '', en: '', fr: '' },
      image: body.image || '',
      excerpt: body.excerpt || { es: '', en: '', fr: '' },
      content: body.content || { es: '', en: '', fr: '' },
      featured: body.featured || false,
      template: body.template || 'standard',
      images: body.images || [],
      videoUrl: body.videoUrl || '',
      author: body.author || null,
    };

    noticias.push(newNoticia);
    writeJSON(DB_FILE, noticias);

    return NextResponse.json({ noticia: newNoticia, message: 'Noticia creada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al crear noticia' }, { status: 500 });
  }
}

// PUT /api/admin/noticias - Update existing news
export async function PUT(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const noticias = readJSON<Noticia>(DB_FILE);
    const index = noticias.findIndex(n => n.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Noticia no encontrada' }, { status: 404 });
    }

    noticias[index] = {
      ...noticias[index],
      ...updates,
      id,
      slug: updates.slug || noticias[index].slug,
    };

    writeJSON(DB_FILE, noticias);
    return NextResponse.json({ noticia: noticias[index], message: 'Noticia actualizada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar noticia' }, { status: 500 });
  }
}

// DELETE /api/admin/noticias - Delete news
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    let noticias = readJSON<Noticia>(DB_FILE);
    const exists = noticias.find(n => n.id === id);
    
    if (!exists) {
      return NextResponse.json({ error: 'Noticia no encontrada' }, { status: 404 });
    }

    noticias = noticias.filter(n => n.id !== id);
    writeJSON(DB_FILE, noticias);

    return NextResponse.json({ message: 'Noticia eliminada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar noticia' }, { status: 500 });
  }
}