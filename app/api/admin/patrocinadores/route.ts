export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'patrocinadores.json';

interface Sponsor {
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

function getNextId(sponsors: Sponsor[]): string {
  if (sponsors.length === 0) return 'spon-1';
  const numericIds = sponsors
    .map(a => parseInt(a.id.replace('spon-', '')))
    .filter(id => !isNaN(id));
  if (numericIds.length === 0) return 'spon-1';
  return `spon-${Math.max(...numericIds) + 1}`;
}

// GET /api/admin/patrocinadores - List all sponsors
export async function GET(request: Request) {
  try {
    const sponsors = await readJSONAsync<Sponsor>(DB_FILE);
    return NextResponse.json({ sponsors });
  } catch {
    return NextResponse.json({ error: 'Error al leer patrocinadores' }, { status: 500 });
  }
}

// POST /api/admin/patrocinadores - Create new sponsor
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const sponsors = await readJSONAsync<Sponsor>(DB_FILE);

    const newSponsor: Sponsor = {
      id: getNextId(sponsors),
      slug: body.slug || slugify(body.name || ''),
      tier: body.tier || { es: 'Socio Bronce', en: 'Bronze Partner', fr: 'Partenaire Bronze' },
      name: body.name || '',
      logo: body.logo || '',
      description: body.description || { es: '', en: '', fr: '' },
      website: body.website || '',
      contact: body.contact || '',
      personName: body.personName || '',
      personPhoto: body.personPhoto || '',
      bio: body.bio || { es: '', en: '', fr: '' },
      gallery: body.gallery || [],
    };

    sponsors.push(newSponsor);
    await writeJSONAsync(DB_FILE, sponsors);

    return NextResponse.json({ sponsor: newSponsor, message: 'Patrocinador creado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al crear patrocinador' }, { status: 500 });
  }
}

// PUT /api/admin/patrocinadores - Update existing sponsor
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

    const sponsors = await readJSONAsync<Sponsor>(DB_FILE);
    const index = sponsors.findIndex(s => s.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Patrocinador no encontrado' }, { status: 404 });
    }

    sponsors[index] = {
      ...sponsors[index],
      ...updates,
      id,
      slug: updates.slug || sponsors[index].slug,
    };

    await writeJSONAsync(DB_FILE, sponsors);
    return NextResponse.json({ sponsor: sponsors[index], message: 'Patrocinador actualizado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar patrocinador' }, { status: 500 });
  }
}

// DELETE /api/admin/patrocinadores - Delete sponsor
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    let sponsors = await readJSONAsync<Sponsor>(DB_FILE);
    const exists = sponsors.find(s => s.id === id);

    if (!exists) {
      return NextResponse.json({ error: 'Patrocinador no encontrado' }, { status: 404 });
    }

    sponsors = sponsors.filter(s => s.id !== id);
    await writeJSONAsync(DB_FILE, sponsors);

    return NextResponse.json({ message: 'Patrocinador eliminado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar patrocinador' }, { status: 500 });
  }
}
