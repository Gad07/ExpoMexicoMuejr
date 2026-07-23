import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

import { cleanDropboxUrlsInObject } from '@/lib/dropbox';

const DB_FILE = 'banners.json';

export interface Banner {
  id: number;
  imageUrl: string;
  active: boolean;
  order: number;
}

function getNextId(banners: Banner[]): number {
  if (banners.length === 0) return 1;
  return Math.max(...banners.map(b => b.id)) + 1;
}

// GET /api/admin/banners - List all banners
export async function GET(request: Request) {
  try {
    const banners = (await readJSONAsync<Banner>(DB_FILE)) || [];
    // Sort by order ascending
    const sorted = banners.sort((a, b) => a.order - b.order);
    const cleaned = cleanDropboxUrlsInObject(sorted);
    return NextResponse.json({ banners: cleaned });
  } catch {
    return NextResponse.json({ error: 'Error al leer banners' }, { status: 500 });
  }
}

// POST /api/admin/banners - Create new banner
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const rawBody = await request.json();
    const body = cleanDropboxUrlsInObject(rawBody);
    const banners = (await readJSONAsync<Banner>(DB_FILE)) || [];

    const newBanner: Banner = {
      id: getNextId(banners),
      imageUrl: body.imageUrl || '',
      active: body.active !== undefined ? body.active : true,
      order: body.order !== undefined ? body.order : banners.length,
    };

    banners.push(newBanner);
    await writeJSONAsync(DB_FILE, banners);

    return NextResponse.json({ banner: newBanner, message: 'Banner creado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al crear banner' }, { status: 500 });
  }
}

// PUT /api/admin/banners - Update existing banner
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

    const banners = (await readJSONAsync<Banner>(DB_FILE)) || [];
    const index = banners.findIndex(b => b.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Banner no encontrado' }, { status: 404 });
    }

    banners[index] = {
      ...banners[index],
      ...updates,
      id,
    };

    await writeJSONAsync(DB_FILE, banners);
    return NextResponse.json({ banner: banners[index], message: 'Banner actualizado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar banner' }, { status: 500 });
  }
}

// DELETE /api/admin/banners - Delete banner
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    let banners = (await readJSONAsync<Banner>(DB_FILE)) || [];
    const exists = banners.find(b => b.id === id);
    
    if (!exists) {
      return NextResponse.json({ error: 'Banner no encontrado' }, { status: 404 });
    }

    banners = banners.filter(b => b.id !== id);
    await writeJSONAsync(DB_FILE, banners);

    return NextResponse.json({ message: 'Banner eliminado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar banner' }, { status: 500 });
  }
}
