import { NextResponse } from 'next/server';

interface IPRecord {
  attempts: number;
  blockedUntil: number | null;
}

// In-memory store for IP rate limiting
const ipAttempts = new Map<string, IPRecord>();

const MAX_ATTEMPTS = 3;
const BLOCK_DURATION_MS = 2 * 60 * 60 * 1000; // 2 horas en milisegundos

/**
 * Extrae la dirección IP cliente del Request
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

/**
 * Comprueba si la IP está bloqueada por haber excedido los 3 intentos fallidos
 */
export function isIPBlocked(ip: string): { blocked: boolean; remainingMinutes?: number } {
  const record = ipAttempts.get(ip);
  if (!record || !record.blockedUntil) {
    return { blocked: false };
  }

  const now = Date.now();
  if (now < record.blockedUntil) {
    const remainingMs = record.blockedUntil - now;
    const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));
    return { blocked: true, remainingMinutes };
  }

  // Si el tiempo de bloqueo ya expiró, reiniciamos el registro
  ipAttempts.delete(ip);
  return { blocked: false };
}

/**
 * Registra un intento fallido para la IP. Si llega a 3, bloquea la IP por 2 horas.
 */
export function recordFailedAttempt(ip: string): { attemptsLeft: number; blocked: boolean } {
  const now = Date.now();
  const record = ipAttempts.get(ip) || { attempts: 0, blockedUntil: null };

  record.attempts += 1;

  if (record.attempts >= MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION_MS;
    ipAttempts.set(ip, record);
    return { attemptsLeft: 0, blocked: true };
  }

  ipAttempts.set(ip, record);
  return { attemptsLeft: MAX_ATTEMPTS - record.attempts, blocked: false };
}

/**
 * Reinicia los intentos fallidos tras un login exitoso
 */
export function resetAttempts(ip: string): void {
  ipAttempts.delete(ip);
}
