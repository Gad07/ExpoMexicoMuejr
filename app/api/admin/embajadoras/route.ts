import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

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

function checkAuth(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') || '';
  if (cookieHeader.includes('next-auth.session-token') || cookieHeader.includes('__Secure-next-auth.session-token')) {
    return true;
  }
  const token = getTokenFromRequest(request);
  if (token && verifyToken(token)) {
    return true;
  }
  return false;
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
    const ambassadors = readJSON<Ambassador>(DB_FILE);
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
    const ambassadors = readJSON<Ambassador>(DB_FILE);

    const newAmbassador: Ambassador = {
      id: getNextId(ambassadors),
      slug: body.slug || slugify(body.name || ''),
      name: body.name || '',
      state: body.state || '',
      photo: body.photo || '',
      description: body.description || { es: '', en: '', fr: '' },
      booth: body.booth || '',
    };

    ambassadors.push(newAmbassador);
    writeJSON(DB_FILE, ambassadors);

    return NextResponse.json({ ambassador: newAmbassador, message: 'Embajadora creada exitosamente' });
  } catch {
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

    const ambassadors = readJSON<Ambassador>(DB_FILE);
    const index = ambassadors.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Embajadora no encontrada' }, { status: 404 });
    }

    ambassadors[index] = {
      ...ambassadors[index],
      ...updates,
      id,
      slug: updates.slug || ambassadors[index].slug,
    };

    writeJSON(DB_FILE, ambassadors);
    return NextResponse.json({ ambassador: ambassadors[index], message: 'Embajadora actualizada exitosamente' });
  } catch {
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

    let ambassadors = readJSON<Ambassador>(DB_FILE);
    const exists = ambassadors.find(a => a.id === id);

    if (!exists) {
      return NextResponse.json({ error: 'Embajadora no encontrada' }, { status: 404 });
    }

    ambassadors = ambassadors.filter(a => a.id !== id);
    writeJSON(DB_FILE, ambassadors);

    return NextResponse.json({ message: 'Embajadora eliminada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar embajadora' }, { status: 500 });
  }
}
