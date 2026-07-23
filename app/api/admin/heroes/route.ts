import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'heroes.json';

function cleanDropboxUrl(url?: string): string {
  if (!url || typeof url !== 'string') return url || '';
  let cleaned = url.trim();
  if (cleaned.includes('dropbox.com')) {
    cleaned = cleaned.replace(/https?:\/\/(www\.)?dropbox\.com/, 'https://dl.dropboxusercontent.com');
    if (cleaned.includes('dl=0') || cleaned.includes('dl=1')) {
      cleaned = cleaned.replace(/dl=[01]/, 'raw=1');
    } else if (!cleaned.includes('raw=1')) {
      cleaned += cleaned.includes('?') ? '&raw=1' : '?raw=1';
    }
  }
  return cleaned;
}

function normalizeHeroes(heroesObj: any) {
  if (heroesObj && typeof heroesObj === 'object' && !Array.isArray(heroesObj)) {
    Object.keys(heroesObj).forEach(key => {
      if (heroesObj[key] && heroesObj[key].image) {
        heroesObj[key].image = cleanDropboxUrl(heroesObj[key].image);
      }
    });
  }
  return heroesObj;
}

export async function GET() {
  const cacheHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  };

  try {
    const heroes = await readJSONAsync<any>(DB_FILE);
    const normalized = normalizeHeroes(heroes || {});
    return NextResponse.json({ heroes: normalized }, { headers: cacheHeaders });
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
    const normalized = normalizeHeroes(body || {});
    await writeJSONAsync(DB_FILE, normalized);
    return NextResponse.json({ message: 'Portadas actualizadas exitosamente en Supabase' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar las portadas' }, { status: 500 });
  }
}
