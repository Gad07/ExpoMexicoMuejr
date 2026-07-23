import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'navbar.json';

// Cache pública 5 min en CDN, sin afectar al admin (POST invalida naturalmente)
const CACHE_5MIN = { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' };

export async function GET() {
  try {
    const navbar = await readJSONAsync<any>(DB_FILE);
    return NextResponse.json({ navbar }, { headers: CACHE_5MIN });
  } catch {
    return NextResponse.json({ error: 'Error al leer la navegación' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const body = await request.json();
    await writeJSONAsync(DB_FILE, body);
    return NextResponse.json({ message: 'Navegación actualizada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar la navegación' }, { status: 500 });
  }
}
