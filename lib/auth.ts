import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'emm-admin-secret-key-2027';

// Token-based auth
export function createToken(userId: string, role: string = 'admin'): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): { userId: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  } catch {
    return null;
  }
}

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: JWT_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      // Allow only specific emails (configure in env)
      const allowedEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
      if (allowedEmails.length === 0) return true; // Allow all if not configured
      if (user.email && allowedEmails.includes(user.email.toLowerCase())) return true;
      return false;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
};

// Middleware helper - check if request has valid auth (NextAuth session OR token)
export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return null;
}

export function isAuthenticated(request: Request): boolean {
  const token = getTokenFromRequest(request);
  if (!token) return false;
  return verifyToken(token) !== null;
}