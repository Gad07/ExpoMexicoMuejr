import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'invitados.json';

interface Invitado {
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
  category: 'Líderes empresariales' | 'Conferencistas' | 'Personalidades';
}



function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getNextId(invitados: Invitado[]): string {
  if (invitados.length === 0) return 'inv-1';
  const numericIds = invitados
    .map(a => parseInt(a.id.replace('inv-', '')))
    .filter(id => !isNaN(id));
  if (numericIds.length === 0) return 'inv-1';
  return `inv-${Math.max(...numericIds) + 1}`;
}

// GET /api/admin/invitados - List all invitados
export async function GET(request: Request) {
  try {
    const invitados = readJSON<Invitado>(DB_FILE);
    return NextResponse.json({ invitados });
  } catch {
    return NextResponse.json({ error: 'Error al leer invitados' }, { status: 500 });
  }
}

// POST /api/admin/invitados - Create new invitado
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const invitados = readJSON<Invitado>(DB_FILE);

    const newInvitado: Invitado = {
      id: getNextId(invitados),
      slug: body.slug || slugify(body.name || ''),
      tier: body.tier || { es: 'Invitado Especial', en: 'Special Guest', fr: 'Invitée Spéciale' },
      name: body.name || '',
      logo: body.logo || '',
      description: body.description || { es: '', en: '', fr: '' },
      website: body.website || '',
      contact: body.contact || '',
      personName: body.personName || body.name || '',
      personPhoto: body.personPhoto || '',
      bio: body.bio || { es: '', en: '', fr: '' },
      gallery: body.gallery || [],
      category: body.category || 'Personalidades',
    };

    invitados.push(newInvitado);
    writeJSON(DB_FILE, invitados);

    return NextResponse.json({ invitado: newInvitado, message: 'Invitado creado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al crear invitado' }, { status: 500 });
  }
}

// PUT /api/admin/invitados - Update existing invitado
export async function PUT(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const invitados = readJSON<Invitado>(DB_FILE);
    const index = invitados.findIndex(a => a.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Invitado no encontrado' }, { status: 404 });
    }

    const updatedInvitado: Invitado = {
      ...invitados[index],
      name: body.name || invitados[index].name,
      slug: body.name ? slugify(body.name) : invitados[index].slug,
      tier: body.tier || invitados[index].tier,
      logo: body.logo !== undefined ? body.logo : invitados[index].logo,
      description: body.description !== undefined ? body.description : invitados[index].description,
      website: body.website !== undefined ? body.website : invitados[index].website,
      contact: body.contact !== undefined ? body.contact : invitados[index].contact,
      personName: body.personName || body.name || invitados[index].personName,
      personPhoto: body.personPhoto !== undefined ? body.personPhoto : invitados[index].personPhoto,
      bio: body.bio !== undefined ? body.bio : invitados[index].bio,
      gallery: body.gallery !== undefined ? body.gallery : invitados[index].gallery,
      category: body.category || invitados[index].category,
    };

    invitados[index] = updatedInvitado;
    writeJSON(DB_FILE, invitados);

    return NextResponse.json({ invitado: updatedInvitado, message: 'Invitado actualizado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar invitado' }, { status: 500 });
  }
}

// DELETE /api/admin/invitados - Delete existing invitado
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const invitados = readJSON<Invitado>(DB_FILE);
    const filtered = invitados.filter(a => a.id !== body.id);

    if (filtered.length === invitados.length) {
      return NextResponse.json({ error: 'Invitado no encontrado' }, { status: 404 });
    }

    writeJSON(DB_FILE, filtered);
    return NextResponse.json({ message: 'Invitado eliminado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar invitado' }, { status: 500 });
  }
}
