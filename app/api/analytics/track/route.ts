import { NextResponse } from 'next/server';
import { readJSON, writeJSON, getSupabase } from '@/lib/db';

const DB_FILE = 'analytics.json';

interface AnalyticsRecord {
  id: string;
  path: string;
  timestamp: string;
  userAgent?: string;
  device?: 'mobile' | 'desktop';
  referer?: string;
  source?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, referer, userAgent } = body;

    if (!path) {
      return NextResponse.json({ error: 'Ruta requerida' }, { status: 400 });
    }

    const logs = readJSON<AnalyticsRecord>(DB_FILE) || [];

    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent || '');
    const device = isMobile ? 'mobile' : 'desktop';

    let source = 'Directo';
    if (referer) {
      if (referer.includes('google') || referer.includes('bing') || referer.includes('yahoo')) {
        source = 'Búsqueda Orgánica';
      } else if (referer.includes('instagram') || referer.includes('facebook') || referer.includes('linkedin') || referer.includes('t.co')) {
        source = 'Redes Sociales';
      } else {
        source = 'Referido Externe';
      }
    }

    const newRecord: AnalyticsRecord = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      path,
      timestamp: new Date().toISOString(),
      userAgent: userAgent || '',
      device,
      referer: referer || '',
      source,
    };

    const supabase = getSupabase();
    if (supabase) {
      await supabase.from('analytics_logs').insert({
        id: newRecord.id,
        path: newRecord.path,
        user_agent: newRecord.userAgent,
        device: newRecord.device,
        source: newRecord.source,
        referer: newRecord.referer,
      });
    }

    // Keep up to 10,000 most recent logs
    const updated = [newRecord, ...logs].slice(0, 10000);
    writeJSON(DB_FILE, updated);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error al registrar visita' }, { status: 500 });
  }
}
