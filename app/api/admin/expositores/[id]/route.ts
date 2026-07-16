import { NextResponse } from 'next/server';
import { readJSON } from '@/lib/db';

const DB_FILE = 'expositores.json';

interface LocalizedString {
  es: string;
  en: string;
  fr: string;
}

interface Exhibitor {
  id: string;
  slug: string;
  name: string;
  personName: string;
  description: LocalizedString;
  state: string;
  category: string;
  website: string;
  social: string;
  contact: string;
  booth: string;
  logo: string;
  personPhoto: string;
  bio: LocalizedString;
  gallery: string[];
}

// GET /api/admin/expositores/[id] - Get single exhibitor with full data
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

    const exhibitors = readJSON<Exhibitor>(DB_FILE);
    const exhibitor = exhibitors.find(e => e.id === id);

    if (!exhibitor) {
      return NextResponse.json({ error: 'Expositor no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ exhibitor });
  } catch {
    return NextResponse.json({ error: 'Error al leer expositor' }, { status: 500 });
  }
}
