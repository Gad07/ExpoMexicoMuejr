import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync, getSupabase } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'translations.json';

function flattenTranslations(obj: any, prefix = ''): any[] {
  let rows: any[] = [];
  if (!obj || typeof obj !== 'object') return rows;
  for (const k in obj) {
    const newKey = prefix ? prefix + '.' + k : k;
    const val = obj[k];
    if (val && typeof val === 'object' && ('es' in val || 'en' in val || 'fr' in val)) {
      rows.push({
        translation_key: newKey,
        text_es: val.es || '',
        text_en: val.en || '',
        text_fr: val.fr || '',
        updated_at: new Date().toISOString()
      });
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      rows.push(...flattenTranslations(val, newKey));
    }
  }
  return rows;
}

function unflattenTranslations(rows: any[]): any {
  const result: any = {};
  for (const row of rows) {
    if (!row.translation_key) continue;
    const parts = row.translation_key.split('.');
    let curr = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (!curr[p] || typeof curr[p] !== 'object') curr[p] = {};
      curr = curr[p];
    }
    const lastKey = parts[parts.length - 1];
    curr[lastKey] = {
      es: row.text_es || '',
      en: row.text_en || '',
      fr: row.text_fr || ''
    };
  }
  return result;
}

export async function GET() {
  const cacheHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  };

  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from('translations').select('*');
      if (!error && data && data.length > 0) {
        const dict = unflattenTranslations(data);
        return NextResponse.json({ translations: dict }, { headers: cacheHeaders });
      }
    }

    const translations = await readJSONAsync<any>(DB_FILE);
    return NextResponse.json({ translations }, { headers: cacheHeaders });
  } catch {
    return NextResponse.json({ error: 'Error al leer las traducciones' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const body = await request.json();
    await writeJSONAsync(DB_FILE, body);

    const supabase = getSupabase();
    if (supabase) {
      const rows = flattenTranslations(body);
      if (rows.length > 0) {
        for (let i = 0; i < rows.length; i += 200) {
          const batch = rows.slice(i, i + 200);
          await supabase.from('translations').upsert(batch);
        }
      }
    }

    return NextResponse.json({ message: 'Traducciones actualizadas exitosamente en Supabase' });
  } catch (err: any) {
    console.error('Error updating translations:', err);
    return NextResponse.json({ error: 'Error al actualizar las traducciones' }, { status: 500 });
  }
}
