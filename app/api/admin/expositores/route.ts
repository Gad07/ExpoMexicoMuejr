export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync, getSupabase } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

import { cleanDropboxUrlsInObject } from '@/lib/dropbox';

const DB_FILE = 'expositores.json';

interface LocalizedString {
  es: string;
  en: string;
  fr: string;
}

interface Exhibitor {
  id: string;
  slug: string;
  name: string;
  personName: string;
  description: LocalizedString;
  state: string;
  category: string;
  website: string;
  social: string;
  contact: string;
  booth: string;
  logo: string;
  personPhoto: string;
  bio: LocalizedString;
  gallery: string[];
  mapImage?: string;
  mapCoords?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getNextId(exhibitors: Exhibitor[]): string {
  if (exhibitors.length === 0) return '1';
  const numericIds = exhibitors.map(e => parseInt(e.id)).filter(id => !isNaN(id));
  if (numericIds.length === 0) return '1';
  return (Math.max(...numericIds) + 1).toString();
}

// GET /api/admin/expositores - List all exhibitors
export async function GET(request: Request) {
  try {
    const exhibitors = await readJSONAsync<Exhibitor>(DB_FILE);
    const cleaned = cleanDropboxUrlsInObject(exhibitors);
    return NextResponse.json({ exhibitors: cleaned });
  } catch {
    return NextResponse.json({ error: 'Error al leer expositores' }, { status: 500 });
  }
}

// POST /api/admin/expositores - Create new exhibitor
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const rawBody = await request.json();
    const body = cleanDropboxUrlsInObject(rawBody);
    const exhibitors = await readJSONAsync<Exhibitor>(DB_FILE);

    const newExhibitor: Exhibitor = {
      id: getNextId(exhibitors),
      slug: body.slug || slugify(body.name || ''),
      name: body.name || '',
      personName: body.personName || '',
      description: body.description || { es: '', en: '', fr: '' },
      state: body.state || '',
      category: body.category || '',
      website: body.website || '',
      social: body.social || '',
      contact: body.contact || '',
      booth: body.booth || '',
      logo: body.logo || '',
      personPhoto: body.personPhoto || '',
      bio: body.bio || { es: '', en: '', fr: '' },
      gallery: body.gallery || [],
      mapImage: body.mapImage || '',
      mapCoords: body.mapCoords || '',
    };

    const supabase = getSupabase();
    if (supabase) {
      await supabase.from('exhibitors').upsert({
        id: newExhibitor.id,
        slug: newExhibitor.slug,
        name: newExhibitor.name,
        category: newExhibitor.category,
        stand_number: newExhibitor.booth,
        logo: newExhibitor.logo,
        website: newExhibitor.website,
        state: newExhibitor.state,
      });
    }

    exhibitors.push(newExhibitor);
    await writeJSONAsync(DB_FILE, exhibitors);

    return NextResponse.json({ exhibitor: newExhibitor, message: 'Expositor creado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al crear expositor' }, { status: 500 });
  }
}

// PUT /api/admin/expositores - Update existing exhibitor
export async function PUT(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const rawBody = await request.json();
    const body = cleanDropboxUrlsInObject(rawBody);
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const exhibitors = await readJSONAsync<Exhibitor>(DB_FILE);
    const index = exhibitors.findIndex(e => e.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Expositor no encontrado' }, { status: 404 });
    }

    exhibitors[index] = {
      ...exhibitors[index],
      ...updates,
      id,
      slug: updates.slug || exhibitors[index].slug,
    };

    await writeJSONAsync(DB_FILE, exhibitors);
    return NextResponse.json({ exhibitor: exhibitors[index], message: 'Expositor actualizado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar expositor' }, { status: 500 });
  }
}

// DELETE /api/admin/expositores - Delete exhibitor
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    let exhibitors = await readJSONAsync<Exhibitor>(DB_FILE);
    const exists = exhibitors.find(e => e.id === id);

    if (!exists) {
      return NextResponse.json({ error: 'Expositor no encontrado' }, { status: 404 });
    }

    exhibitors = exhibitors.filter(e => e.id !== id);
    await writeJSONAsync(DB_FILE, exhibitors);

    return NextResponse.json({ message: 'Expositor eliminado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar expositor' }, { status: 500 });
  }
}
