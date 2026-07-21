import { NextResponse } from 'next/server';
import { getSupabase, readJSON, writeJSON } from '@/lib/db';

export type TestimonioVideo = {
  id: string;
  name: string;
  role: string;
  title?: string;
  url: string;
  thumbTime?: number;
  thumbPos?: string;
};

const DB_FILE = 'testimonios.json';

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
  
  // Transform www.dropbox.com to dl.dropboxusercontent.com for direct streaming
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

  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from('page_modules')
        .select('*')
        .eq('id', 'nuestras-voces')
        .single();

      if (!error && data && data.items_json) {
        const items = typeof data.items_json === 'string' ? JSON.parse(data.items_json) : data.items_json;
        if (Array.isArray(items) && items.length > 0) {
          const formatted = items.map(v => ({ ...v, url: formatDropboxUrl(v.url) }));
          return NextResponse.json({ videos: formatted }, { headers: cacheHeaders });
        }
      }
    }

    const localData = readJSON<TestimonioVideo>(DB_FILE);
    if (localData && localData.length > 0) {
      const formatted = localData.map(v => ({ ...v, url: formatDropboxUrl(v.url) }));
      return NextResponse.json({ videos: formatted }, { headers: cacheHeaders });
    }

    const formatted = DEFAULT_VIDEOS.map(v => ({ ...v, url: formatDropboxUrl(v.url) }));
    return NextResponse.json({ videos: formatted }, { headers: cacheHeaders });
  } catch {
    const formatted = DEFAULT_VIDEOS.map(v => ({ ...v, url: formatDropboxUrl(v.url) }));
    return NextResponse.json({ videos: formatted }, { headers: cacheHeaders });
  }
}

export async function POST(request: Request) {
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
    }));

    writeJSON(DB_FILE, formattedVideos);

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('page_modules').upsert({
          id: 'nuestras-voces',
          page_key: 'global',
          module_type: 'testimonials_video',
          title: 'Nuestras Voces',
          items_json: formattedVideos,
        });
      } catch (e) {
        console.warn('Supabase nuestras-voces upsert notice:', e);
      }
    }

    return NextResponse.json({ videos: formattedVideos, message: 'Videos de Nuestras Voces guardados exitosamente' });
  } catch (err: any) {
    console.error('Error saving testimonios:', err);
    return NextResponse.json({ error: 'Error al guardar videos' }, { status: 500 });
  }
}
