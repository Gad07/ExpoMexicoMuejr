import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

const DB_FILE = 'heroes.json';

function checkAuth(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') || '';
  if (cookieHeader.includes('next-auth.session-token') || cookieHeader.includes('__Secure-next-auth.session-token')) {
    return true;
  }
  const token = getTokenFromRequest(request);
  if (token && verifyToken(token)) return true;
  return false;
}

export async function GET() {
  try {
    const heroes = readJSON<any>(DB_FILE);
    return NextResponse.json({ heroes });
  } catch {
    return NextResponse.json({ error: 'Error al leer las portadas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const body = await request.json();
    writeJSON(DB_FILE, body);
    return NextResponse.json({ message: 'Portadas actualizadas exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar las portadas' }, { status: 500 });
  }
}
