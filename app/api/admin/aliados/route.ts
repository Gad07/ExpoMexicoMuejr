export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

import { cleanDropboxUrlsInObject } from '@/lib/dropbox';

const DB_FILE = 'aliados.json';

interface Ally {
  id: string;
  name: string;
  logo: string;
  website: string;
  color: string;
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
    const allies = await readJSONAsync<Ally>(DB_FILE);
    const cleaned = cleanDropboxUrlsInObject(allies);
    return NextResponse.json({ allies: cleaned });
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
    const rawBody = await request.json();
    const body = cleanDropboxUrlsInObject(rawBody);
    const allies = await readJSONAsync<Ally>(DB_FILE);

    const newAlly: Ally = {
      id: getNextId(allies),
      name: body.name || '',
      logo: body.logo || '',
      website: body.website || '',
      color: body.color || '#E4007C',
    };

    allies.push(newAlly);
    await writeJSONAsync(DB_FILE, allies);

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

    const allies = await readJSONAsync<Ally>(DB_FILE);
    const index = allies.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Aliado no encontrado' }, { status: 404 });
    }

    allies[index] = {
      ...allies[index],
      ...updates,
      id,
    };

    await writeJSONAsync(DB_FILE, allies);
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

    let allies = await readJSONAsync<Ally>(DB_FILE);
    const exists = allies.find(a => a.id === id);

    if (!exists) {
      return NextResponse.json({ error: 'Aliado no encontrado' }, { status: 404 });
    }

    allies = allies.filter(a => a.id !== id);
    await writeJSONAsync(DB_FILE, allies);

    return NextResponse.json({ message: 'Aliado eliminado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar aliado' }, { status: 500 });
  }
}
