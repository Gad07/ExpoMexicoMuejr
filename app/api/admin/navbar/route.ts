import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

const DB_FILE = 'navbar.json';

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
    const navbar = readJSON<any>(DB_FILE);
    return NextResponse.json({ navbar });
  } catch {
    return NextResponse.json({ error: 'Error al leer la navegación' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const body = await request.json();
    writeJSON(DB_FILE, body);
    return NextResponse.json({ message: 'Navegación actualizada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar la navegación' }, { status: 500 });
  }
}
