import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getClientIP, isPublicRateLimited } from '@/lib/rateLimit';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const ip = getClientIP(request);

  // 1. Encabezados de Seguridad HTTP globales para TODO el sitio web
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  // 2. Limitador de peticiones (Rate Limiting) para APIs públicas para prevenir DoS/Spam
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/admin') && !pathname.startsWith('/api/auth')) {
    if (isPublicRateLimited(ip, 60, 60000)) {
      return NextResponse.json(
        { error: 'Límite de solicitudes excedido. Por favor intenta más tarde.' },
        { status: 429 }
      );
    }
  }

  // 3. Obtener credenciales de autenticación para área Admin
  const adminToken = request.cookies.get('admin_token')?.value;
  const preauth = request.cookies.get('admin_preauth')?.value;
  const sessionToken =
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value;

  const authHeader = request.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  const hasValidAuth = Boolean(adminToken || preauth || sessionToken || bearerToken);

  // 4. Protección estricta de las APIs del Admin (/api/admin/*)
  if (pathname.startsWith('/api/admin')) {
    if (!hasValidAuth) {
      return NextResponse.json(
        { error: 'Acceso no autorizado al API de administración' },
        { status: 401 }
      );
    }
  }

  // 5. Protección de las vistas del Panel de Administración (/admin/* excepto /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!hasValidAuth) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
