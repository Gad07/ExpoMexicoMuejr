import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'translations.json';

export async function GET() {
  try {
    const translations = readJSON<any>(DB_FILE);
    return NextResponse.json({ translations });
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
    writeJSON(DB_FILE, body);
    return NextResponse.json({ message: 'Traducciones actualizadas exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar las traducciones' }, { status: 500 });
  }
}
