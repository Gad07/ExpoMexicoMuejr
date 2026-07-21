import { NextResponse } from 'next/server';
import { getClientIP, isIPBlocked, recordFailedAttempt, resetAttempts } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);

    // 1. Verificar si la IP está bloqueada por 3 intentos fallidos
    const { blocked, remainingMinutes } = isIPBlocked(ip);
    if (blocked) {
      return NextResponse.json(
        {
          error: `Acceso bloqueado por seguridad. Se excedieron los 3 intentos fallidos. Intenta nuevamente en aprox. ${remainingMinutes} minutos (bloqueo de 2 horas).`,
        },
        { status: 429 }
      );
    }

    const { token } = await request.json();
    const cleanToken = (token || '').trim();

    const expectedToken = (process.env.ADMIN_ACCESS_TOKEN || '').trim();

    if (!expectedToken) {
      return NextResponse.json(
        { error: 'El servidor no tiene configurado ADMIN_ACCESS_TOKEN en sus variables de entorno.' },
        { status: 500 }
      );
    }

    // Verificar token sin revelar longitud ni formato
    if (!cleanToken || cleanToken !== expectedToken) {
      const { attemptsLeft, blocked: justBlocked } = recordFailedAttempt(ip);

      if (justBlocked) {
        return NextResponse.json(
          {
            error: 'Has alcanzado los 3 intentos fallidos. Tu dirección IP ha sido bloqueada por 2 horas.',
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: `Token de seguridad incorrecto. Intentos restantes: ${attemptsLeft} de 3.`,
        },
        { status: 401 }
      );
    }

    // Token correcto: reiniciamos intentos de esta IP
    resetAttempts(ip);

    const response = NextResponse.json({
      success: true,
      message: 'Token verificado correctamente',
    });

    // Cookie de pre-autenticación válida por 15 minutos
    response.cookies.set('admin_preauth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}
