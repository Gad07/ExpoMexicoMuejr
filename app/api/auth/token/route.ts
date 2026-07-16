import { NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'emm2027admin';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const token = createToken(username, 'admin');
    return NextResponse.json({ token, user: { username, role: 'admin' } });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}