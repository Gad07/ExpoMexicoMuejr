import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const hasAdminToken = request.cookies.has('admin_token');
    const hasPreauth = request.cookies.has('admin_preauth');
    const hasSessionToken =
      request.cookies.has('next-auth.session-token') ||
      request.cookies.has('__Secure-next-auth.session-token');

    // If no valid auth cookie is present, redirect to login page
    if (!hasAdminToken && !hasPreauth && !hasSessionToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
