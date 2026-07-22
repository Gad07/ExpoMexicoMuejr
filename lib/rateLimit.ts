import { NextResponse } from 'next/server';

interface IPRecord {
  attempts: number;
  blockedUntil: number | null;
}

interface RequestLimitRecord {
  count: number;
  resetTime: number;
}

// Map para bloqueo de intentos fallidos de Login (3 intentos = 2 horas)
const ipAttempts = new Map<string, IPRecord>();

// Map para limitación general de peticiones en APIs públicas (60 req / min)
const publicApiLimits = new Map<string, RequestLimitRecord>();

const MAX_LOGIN_ATTEMPTS = 3;
const BLOCK_DURATION_MS = 2 * 60 * 60 * 1000; // 2 horas

/**
 * Extrae la dirección IP cliente de la solicitud HTTP
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
 * Verifica si la IP está bloqueada por login fallido
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

  ipAttempts.delete(ip);
  return { blocked: false };
}

/**
 * Registra un intento fallido de login. Si llega a 3, bloquea la IP por 2 horas.
 */
export function recordFailedAttempt(ip: string): { attemptsLeft: number; blocked: boolean } {
  const now = Date.now();
  const record = ipAttempts.get(ip) || { attempts: 0, blockedUntil: null };

  record.attempts += 1;

  if (record.attempts >= MAX_LOGIN_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION_MS;
    ipAttempts.set(ip, record);
    return { attemptsLeft: 0, blocked: true };
  }

  ipAttempts.set(ip, record);
  return { attemptsLeft: MAX_LOGIN_ATTEMPTS - record.attempts, blocked: false };
}

/**
 * Reinicia el contador de intentos fallidos tras login exitoso
 */
export function resetAttempts(ip: string): void {
  ipAttempts.delete(ip);
}

/**
 * Rate limiter general para proteger APIs públicas contra spam/DoS (Máximo 60 peticiones por minuto)
 */
export function isPublicRateLimited(ip: string, maxRequests: number = 60, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = publicApiLimits.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    publicApiLimits.set(ip, record);
    return false;
  }

  record.count += 1;
  publicApiLimits.set(ip, record);

  return record.count > maxRequests;
}
