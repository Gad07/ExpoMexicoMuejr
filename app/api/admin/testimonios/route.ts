export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync, getSupabase } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'testimonios.json';

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
    title: 'Testimonio EMM',
    name: 'Bertha Gomez',
    role: 'Participante',
    url: '/Videos Testimonios EMM/BerthaGomez_EMM.mp4',
    thumbTime: 8.0,
    thumbPos: 'center center'
  },
  {
    id: 'v-3',
    title: 'Testimonio EMM',
    name: 'Isabel Gonzalez',
    role: 'Participante',
    url: '/Videos Testimonios EMM/IsabelGonzalez_EMM.mp4',
    thumbTime: 12.0,
    thumbPos: 'center 30%'
  },
  {
    id: 'v-4',
    title: 'Testimonio EMM',
    name: 'Norma Alonzo',
    role: 'Participante',
    url: '/Videos Testimonios EMM/NormaAlonzo_EMM.mp4',
    thumbTime: 15.0,
    thumbPos: 'center center'
  }
];

function formatDropboxUrl(url: string): string {
  if (!url) return '';
  let cleaned = url.trim();
  if (cleaned.includes('dropbox.com')) {
    cleaned = cleaned.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    cleaned = cleaned.replace('dl=0', 'dl=1');
    if (!cleaned.includes('dl=1') && !cleaned.includes('raw=1')) {
      cleaned += (cleaned.includes('?') ? '&' : '?') + 'raw=1';
    }
  }
  return cleaned;
}

export async function GET() {
  const cacheHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  };

  const supabase = getSupabase();
  if (supabase) {
    try {
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
    } catch {
      // Fallback to JSON
    }
  }

  const localVideos = await readJSONAsync<TestimonioVideo>(DB_FILE);
  if (localVideos && localVideos.length > 0) {
    const formatted = localVideos.map(v => ({ ...v, url: formatDropboxUrl(v.url) }));
    return NextResponse.json({ videos: formatted }, { headers: cacheHeaders });
  }

  return NextResponse.json({ videos: DEFAULT_VIDEOS.map(v => ({ ...v, url: formatDropboxUrl(v.url) })) }, { headers: cacheHeaders });
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
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

    // Save locally
    await writeJSONAsync(DB_FILE, formattedVideos);

    // Also attempt Supabase upsert if client is available
    const supabase = getSupabase();
    if (supabase) {
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

      await supabase.from('testimonios').upsert(dbRecords);
    }

    return NextResponse.json({
      videos: formattedVideos,
      message: 'Videos guardados exitosamente',
    });
  } catch (err: any) {
    console.error('Error writing testimonios:', err);
    return NextResponse.json({ error: err.message || 'Error al guardar los testimonios' }, { status: 500 });
  }
}
