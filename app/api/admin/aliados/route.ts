import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

const DB_FILE = 'aliados.json';

interface Ally {
  id: string;
  name: string;
  logo: string;
  website: string;
  color: string;
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

function getNextId(allies: Ally[]): string {
  if (allies.length === 0) return 'ally-1';
  const numericIds = allies
    .map(a => parseInt(a.id.replace('ally-', '')))
    .filter(id => !isNaN(id));
  if (numericIds.length === 0) return 'ally-1';
  return `ally-${Math.max(...numericIds) + 1}`;
}

// GET /api/admin/aliados - List all allies
export async function GET(request: Request) {
  try {
    const allies = readJSON<Ally>(DB_FILE);
    return NextResponse.json({ allies });
  } catch {
    return NextResponse.json({ error: 'Error al leer aliados' }, { status: 500 });
  }
}

// POST /api/admin/aliados - Create new ally
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const allies = readJSON<Ally>(DB_FILE);

    const newAlly: Ally = {
      id: getNextId(allies),
      name: body.name || '',
      logo: body.logo || '',
      website: body.website || '',
      color: body.color || '#E4007C',
    };

    allies.push(newAlly);
    writeJSON(DB_FILE, allies);

    return NextResponse.json({ ally: newAlly, message: 'Aliado creado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al crear aliado' }, { status: 500 });
  }
}

// PUT /api/admin/aliados - Update existing ally
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

    const allies = readJSON<Ally>(DB_FILE);
    const index = allies.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Aliado no encontrado' }, { status: 404 });
    }

    allies[index] = {
      ...allies[index],
      ...updates,
      id,
    };

    writeJSON(DB_FILE, allies);
    return NextResponse.json({ ally: allies[index], message: 'Aliado actualizado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar aliado' }, { status: 500 });
  }
}

// DELETE /api/admin/aliados - Delete ally
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    let allies = readJSON<Ally>(DB_FILE);
    const exists = allies.find(a => a.id === id);

    if (!exists) {
      return NextResponse.json({ error: 'Aliado no encontrado' }, { status: 404 });
    }

    allies = allies.filter(a => a.id !== id);
    writeJSON(DB_FILE, allies);

    return NextResponse.json({ message: 'Aliado eliminado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar aliado' }, { status: 500 });
  }
}
