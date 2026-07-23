export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'embajadoras.json';

interface LocalizedString {
  es: string;
  en: string;
  fr: string;
}

interface Ambassador {
  id: string;
  slug: string;
  name: string;
  state: string;
  photo: string;
  description: LocalizedString;
  booth: string;
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

function getNextId(ambassadors: Ambassador[]): string {
  if (ambassadors.length === 0) return 'emb-1';
  const numericIds = ambassadors
    .map(a => parseInt(a.id.replace('emb-', '')))
    .filter(id => !isNaN(id));
  if (numericIds.length === 0) return 'emb-1';
  return `emb-${Math.max(...numericIds) + 1}`;
}

// GET /api/admin/embajadoras - List all ambassadors
export async function GET(request: Request) {
  try {
    const ambassadors = await readJSONAsync<Ambassador>(DB_FILE);
    return NextResponse.json({ ambassadors });
  } catch {
    return NextResponse.json({ error: 'Error al leer embajadoras' }, { status: 500 });
  }
}

// POST /api/admin/embajadoras - Create new ambassador
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const ambassadors = await readJSONAsync<Ambassador>(DB_FILE);

    const name = (body.name || '').trim();
    if (!name) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });
    }

    let slug = (body.slug || '').trim();
    if (!slug) {
      slug = slugify(name);
    }
    if (!slug) {
      slug = `emb-${Date.now()}`;
    }

    const description = typeof body.description === 'object' && body.description !== null
      ? {
          es: body.description.es || '',
          en: body.description.en || '',
          fr: body.description.fr || '',
        }
      : typeof body.description === 'string'
      ? { es: body.description, en: '', fr: '' }
      : { es: '', en: '', fr: '' };

    const newAmbassador: Ambassador = {
      id: getNextId(ambassadors),
      slug,
      name,
      state: body.state || 'Aguascalientes',
      photo: body.photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      description,
      booth: body.booth || '',
    };

    ambassadors.push(newAmbassador);
    await writeJSONAsync(DB_FILE, ambassadors);

    return NextResponse.json({ ambassador: newAmbassador, message: 'Embajadora creada exitosamente' });
  } catch (err) {
    console.error('Error in POST /api/admin/embajadoras:', err);
    return NextResponse.json({ error: 'Error al crear embajadora' }, { status: 500 });
  }
}

// PUT /api/admin/embajadoras - Update existing ambassador
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

    const ambassadors = await readJSONAsync<Ambassador>(DB_FILE);
    const index = ambassadors.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Embajadora no encontrada' }, { status: 404 });
    }

    if (updates.name && (!updates.slug || !updates.slug.trim())) {
      updates.slug = slugify(updates.name);
    }

    if (updates.description && typeof updates.description === 'string') {
      updates.description = { es: updates.description, en: '', fr: '' };
    }

    ambassadors[index] = {
      ...ambassadors[index],
      ...updates,
      id,
      slug: updates.slug || ambassadors[index].slug,
    };

    await writeJSONAsync(DB_FILE, ambassadors);
    return NextResponse.json({ ambassador: ambassadors[index], message: 'Embajadora actualizada exitosamente' });
  } catch (err) {
    console.error('Error in PUT /api/admin/embajadoras:', err);
    return NextResponse.json({ error: 'Error al actualizar embajadora' }, { status: 500 });
  }
}

// DELETE /api/admin/embajadoras - Delete ambassador
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    let ambassadors = await readJSONAsync<Ambassador>(DB_FILE);
    const exists = ambassadors.find(a => a.id === id);

    if (!exists) {
      return NextResponse.json({ error: 'Embajadora no encontrada' }, { status: 404 });
    }

    ambassadors = ambassadors.filter(a => a.id !== id);
    await writeJSONAsync(DB_FILE, ambassadors);

    return NextResponse.json({ message: 'Embajadora eliminada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar embajadora' }, { status: 500 });
  }
}
