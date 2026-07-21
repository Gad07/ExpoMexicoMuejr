import { NextResponse } from 'next/server';
import { verifyTOTP, getGoogleAuthQrUrl } from '@/lib/totp';
import { createToken } from '@/lib/auth';
import { getClientIP, isIPBlocked, recordFailedAttempt, resetAttempts } from '@/lib/rateLimit';

const DEFAULT_GAUTH_SECRET = 'EMMEXICOMUJER2FASECRETKEY234567';

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);

    // Verificar si la IP está bloqueada por 3 intentos fallidos
    const { blocked, remainingMinutes } = isIPBlocked(ip);
    if (blocked) {
      return NextResponse.json(
        {
          error: `Acceso bloqueado por seguridad. Se excedieron los 3 intentos fallidos. Intenta nuevamente en aprox. ${remainingMinutes} minutos (bloqueo de 2 horas).`,
        },
        { status: 429 }
      );
    }

    const { code } = await request.json();
    const cleanCode = (code || '').toString().trim();

    const secret = (process.env.ADMIN_GAUTH_SECRET || DEFAULT_GAUTH_SECRET).trim();

    const isValid = cleanCode.length === 6 && verifyTOTP(cleanCode, secret);

    if (!isValid) {
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
          error: `Código de Google Authenticator incorrecto. Intentos restantes: ${attemptsLeft} de 3.`,
        },
        { status: 401 }
      );
    }

    // Login exitoso: reiniciamos intentos de esta IP
    resetAttempts(ip);

    const token = createToken('admin', 'admin');

    const response = NextResponse.json({
      success: true,
      token,
      user: { name: 'Admin', role: 'admin' },
      message: 'Autenticación completada con éxito',
    });

    // Guardar cookie de sesión
    response.cookies.set('admin_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Error al procesar la verificación' }, { status: 500 });
  }
}

export async function GET() {
  const secret = (process.env.ADMIN_GAUTH_SECRET || DEFAULT_GAUTH_SECRET).trim();
  const { otpauthUrl, qrImageUrl } = getGoogleAuthQrUrl(secret);

  return NextResponse.json({
    secret,
    otpauthUrl,
    qrImageUrl,
  });
}
