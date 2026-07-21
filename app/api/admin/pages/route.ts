import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

const DB_FILE = 'pages.json';

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
    const pages = readJSON<any>(DB_FILE);
    return NextResponse.json({ pages: Array.isArray(pages) ? pages : [] });
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
    writeJSON(DB_FILE, Array.isArray(body) ? body : []);
    return NextResponse.json({ message: 'Páginas y módulos guardados exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al guardar las páginas' }, { status: 500 });
  }
}
