import { NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    if (!adminUser || !adminPass) {
      return NextResponse.json(
        { error: 'El servidor no tiene configuradas las credenciales de administración.' },
        { status: 500 }
      );
    }

    if (username !== adminUser || password !== adminPass) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const token = createToken(username, 'admin');
    return NextResponse.json({ token, user: { username, role: 'admin' } });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}