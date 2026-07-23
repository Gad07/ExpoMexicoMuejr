import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync } from '@/lib/db';

const DEFAULT_JOTFORMS: Record<string, string> = {
  default: "https://form.jotform.com/241686259021053",
  home: "https://form.jotform.com/241686259021053",
  contacto: "https://form.jotform.com/241686259021053",
  expositores: "https://form.jotform.com/241686259021053",
  embajadoras: "https://form.jotform.com/241686259021053",
  compradores: "https://form.jotform.com/241686259021053",
  patrocinadores: "https://form.jotform.com/241686259021053",
  invitados: "https://form.jotform.com/241686259021053",
};

// Cache pública 30 min en CDN — JotForms rara vez cambian
const CACHE_30MIN = { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' };

export async function GET() {
  try {
    const rawData = await readJSONAsync<any>('jotforms.json');
    let jotforms = Array.isArray(rawData) && rawData.length > 0 ? rawData[0] : (rawData && !Array.isArray(rawData) ? rawData : null);

    if (!jotforms || typeof jotforms !== 'object') {
      jotforms = DEFAULT_JOTFORMS;
    } else {
      jotforms = { ...DEFAULT_JOTFORMS, ...jotforms };
    }

    return NextResponse.json({ success: true, jotforms }, { headers: CACHE_30MIN });
  } catch (error) {
    return NextResponse.json({ success: true, jotforms: DEFAULT_JOTFORMS }, { headers: CACHE_30MIN });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jotforms } = body;

    if (!jotforms || typeof jotforms !== 'object') {
      return NextResponse.json({ success: false, error: 'Datos de JotForm inválidos' }, { status: 400 });
    }

    await writeJSONAsync('jotforms.json', [jotforms]);
    return NextResponse.json({ success: true, message: 'Formularios JotForm actualizados correctamente', jotforms });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Error al guardar JotForms' }, { status: 500 });
  }
}
