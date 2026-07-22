import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync, getSupabase } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'pages.json';

export async function GET() {
  const cacheHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  };

  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from('pages').select('*');
      if (!error && data && data.length > 0) {
        const formatted = data.map((p: any) => ({
          key: p.page_key,
          name: p.name,
          url: p.url,
          slug: p.slug,
          group: p.group_name,
          isCustom: p.is_custom,
        }));
        return NextResponse.json({ pages: formatted }, { headers: cacheHeaders });
      }
    }

    const pages = await readJSONAsync<any>(DB_FILE);
    return NextResponse.json({ pages: Array.isArray(pages) ? pages : [] }, { headers: cacheHeaders });
  } catch {
    return NextResponse.json({ pages: [] });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const pagesList = Array.isArray(body) ? body : [];

    await writeJSONAsync(DB_FILE, pagesList);

    const supabase = getSupabase();
    if (supabase && pagesList.length > 0) {
      const dbPages = pagesList.map((p: any) => ({
        page_key: p.key || p.slug || p.url,
        name: p.name || 'Página',
        url: p.url || '/',
        slug: p.slug || p.url || '/',
        group_name: p.group || 'General',
        is_custom: Boolean(p.isCustom),
        updated_at: new Date().toISOString(),
      }));

      await supabase.from('pages').upsert(dbPages);
    }

    return NextResponse.json({ message: 'Páginas y módulos guardados exitosamente en Supabase' });
  } catch (err: any) {
    console.error('Error saving pages:', err);
    return NextResponse.json({ error: 'Error al guardar las páginas' }, { status: 500 });
  }
}
