import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'heroes.json';

export async function GET() {
  const cacheHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  };

  try {
    const heroes = await readJSONAsync<any>(DB_FILE);
    return NextResponse.json({ heroes: heroes || {} }, { headers: cacheHeaders });
  } catch {
    return NextResponse.json({ error: 'Error al leer las portadas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const body = await request.json();
    await writeJSONAsync(DB_FILE, body);
    return NextResponse.json({ message: 'Portadas actualizadas exitosamente en Supabase' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar las portadas' }, { status: 500 });
  }
}
