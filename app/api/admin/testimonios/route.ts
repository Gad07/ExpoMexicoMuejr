import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/db';

export type TestimonioVideo = {
  id: string;
  name: string;
  role: string;
  title?: string;
  url: string;
  thumbTime?: number;
  thumbPos?: string;
  sort_order?: number;
};

const DEFAULT_VIDEOS: TestimonioVideo[] = [
  {
    id: 'v-1',
    title: 'Testimonio EMM',
    name: 'Adriana Perdomo',
    role: 'Participante',
    url: '/Videos Testimonios EMM/AdrianaPerdomo_EMM.mp4',
    thumbTime: 25.0,
    thumbPos: 'center 35%'
  },
  {
    id: 'v-2',
    title: 'Experiencia',
    name: 'Erika Tapia',
    role: 'Expositora',
    url: '/Videos Testimonios EMM/Erika Tapia.mp4',
    thumbTime: 22.0,
    thumbPos: 'center center'
  },
  {
    id: 'v-3',
    title: 'Testimonio',
    name: 'Leonor Alarcón',
    role: 'Expositora',
    url: '/Videos Testimonios EMM/TestimonioExpositorasLeonorAlarcón_EMM.mp4',
    thumbTime: 16.0,
    thumbPos: 'center center'
  },
  {
    id: 'v-4',
    title: 'Testimonio',
    name: 'Leticia Texis',
    role: 'Participante',
    url: '/Videos Testimonios EMM/LeticiaTexis_EMM.mp4',
    thumbTime: 8.0,
    thumbPos: 'center 35%'
  }
];

function formatDropboxUrl(url: string): string {
  if (!url) return '';
  let cleaned = url.trim();
  if (cleaned.includes('dropbox.com')) {
    cleaned = cleaned.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    cleaned = cleaned.replace('dl=0', 'raw=1').replace('dl=1', 'raw=1');
  }
  return cleaned;
}

export async function GET() {
  const cacheHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  };

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ videos: DEFAULT_VIDEOS.map(v => ({ ...v, url: formatDropboxUrl(v.url) })) }, { headers: cacheHeaders });
  }

  try {
    // 1. Intentar leer de la tabla dedicada `testimonios` en Supabase
    const { data: dbData, error: dbError } = await supabase
      .from('testimonios')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!dbError && dbData && dbData.length > 0) {
      const formatted = dbData.map(v => ({
        id: v.id,
        name: v.name,
        role: v.role,
        title: v.title,
        url: formatDropboxUrl(v.url),
        thumbTime: Number(v.thumb_time) || 5,
        thumbPos: v.thumb_pos || 'center center',
      }));
      return NextResponse.json({ videos: formatted }, { headers: cacheHeaders });
    }

    // 2. Intentar leer de la tabla `page_modules` en Supabase
    const { data: modData, error: modError } = await supabase
      .from('page_modules')
      .select('*')
      .eq('id', 'nuestras-voces')
      .single();

    if (!modError && modData && modData.items_json) {
      const items = typeof modData.items_json === 'string' ? JSON.parse(modData.items_json) : modData.items_json;
      if (Array.isArray(items) && items.length > 0) {
        const formatted = items.map(v => ({ ...v, url: formatDropboxUrl(v.url) }));
        return NextResponse.json({ videos: formatted }, { headers: cacheHeaders });
      }
    }

    return NextResponse.json({ videos: DEFAULT_VIDEOS.map(v => ({ ...v, url: formatDropboxUrl(v.url) })) }, { headers: cacheHeaders });
  } catch (err) {
    console.error('Error fetching testimonios from Supabase DB:', err);
    return NextResponse.json({ videos: DEFAULT_VIDEOS.map(v => ({ ...v, url: formatDropboxUrl(v.url) })) }, { headers: cacheHeaders });
  }
}

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase client not initialized' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const rawVideos = Array.isArray(body.videos) ? body.videos : [];

    const formattedVideos: TestimonioVideo[] = rawVideos.map((v: any, index: number) => ({
      id: v.id || `v-${Date.now()}-${index}`,
      name: v.name || 'Testimonio',
      role: v.role || 'Participante',
      title: v.title || 'Experiencia',
      url: formatDropboxUrl(v.url || ''),
      thumbTime: Number(v.thumbTime) || 5,
      thumbPos: v.thumbPos || 'center center',
      sort_order: index,
    }));

    // 1. Guardar registros en la tabla dedicada `testimonios` de Supabase DB
    const dbRecords = formattedVideos.map((v, idx) => ({
      id: v.id,
      name: v.name,
      role: v.role,
      title: v.title,
      url: v.url,
      thumb_time: v.thumbTime,
      thumb_pos: v.thumbPos,
      sort_order: idx,
      updated_at: new Date().toISOString(),
    }));

    const { error: upsertDbErr } = await supabase.from('testimonios').upsert(dbRecords);
    if (upsertDbErr) {
      console.warn('Notice: Supabase testimonios table upsert:', upsertDbErr.message);
    }

    // 2. Guardar módulo en la tabla `page_modules` de Supabase DB
    const { error: modErr } = await supabase.from('page_modules').upsert({
      id: 'nuestras-voces',
      page_key: 'inicio',
      module_type: 'testimonials_video',
      title: 'Nuestras Voces',
      items_json: formattedVideos,
    });

    if (modErr) {
      try {
        await supabase.from('page_modules').upsert({
          id: 'nuestras-voces',
          page_key: 'global',
          module_type: 'testimonials_video',
          title: 'Nuestras Voces',
          items_json: formattedVideos,
        });
      } catch (e) {
        console.warn('Notice: Supabase global page_modules fallback:', e);
      }
    }

    return NextResponse.json({
      videos: formattedVideos,
      message: 'Videos guardados exitosamente en la base de datos de Supabase',
    });
  } catch (err: any) {
    console.error('Error writing testimonios to Supabase DB:', err);
    return NextResponse.json({ error: err.message || 'Error al guardar en la base de datos' }, { status: 500 });
  }
}
