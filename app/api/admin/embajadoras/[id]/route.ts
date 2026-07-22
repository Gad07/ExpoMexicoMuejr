export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { readJSONAsync } from '@/lib/db';

const DB_FILE = 'embajadoras.json';

interface LocalizedString {
  es: string;
  en: string;
  fr: string;
}

interface Ambassador {
  id: string;
  slug: string;
  name: string;
  state: string;
  photo: string;
  description: LocalizedString;
  booth: string;
}

// GET /api/admin/embajadoras/[id] - Get single ambassador with full data
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const ambassadors = await readJSONAsync<Ambassador>(DB_FILE);
    const ambassador = ambassadors.find(a => a.id === id);

    if (!ambassador) {
      return NextResponse.json({ error: 'Embajadora no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ ambassador });
  } catch {
    return NextResponse.json({ error: 'Error al leer embajadora' }, { status: 500 });
  }
}
