import crypto from 'crypto';

// Base32 decode for Google Authenticator TOTP secrets
function base32Decode(base32: string): Buffer {
  const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = 0;
  let value = 0;
  const output: number[] = [];

  const clean = base32.toUpperCase().replace(/=+$/, '');
  for (let i = 0; i < clean.length; i++) {
    const idx = base32chars.indexOf(clean[i]);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(output);
}

/**
 * Genera el código TOTP dinámico de 6 dígitos para un momento dado
 */
export function generateTOTP(secret: string, windowOffset: number = 0): string {
  const key = base32Decode(secret);
  const epoch = Math.floor(Date.now() / 1000);
  const time = Math.floor((epoch + windowOffset * 30) / 30);

  const buffer = Buffer.alloc(8);
  buffer.writeBigInt64BE(BigInt(time), 0);

  const hmac = crypto.createHmac('sha1', key).update(buffer).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code =
    (((hmac[offset] & 0x7f) << 24) |
      ((hmac[offset + 1] & 0xff) << 16) |
      ((hmac[offset + 2] & 0xff) << 8) |
      (hmac[offset + 3] & 0xff)) %
    1000000;

  return code.toString().padStart(6, '0');
}

/**
 * Verifica un código de 6 dígitos ingresado por el usuario con tolerancia de +/- 2 minutos (4 ventanas de 30s)
 */
export function verifyTOTP(token: string, secret: string): boolean {
  const cleanToken = token.trim().replace(/\s/g, '');
  if (cleanToken.length !== 6) return false;

  // Permite ventana actual y +/- 4 pasos (tolerancia amplia de desfase de tiempo de hasta 2 minutos)
  for (let window = -4; window <= 4; window++) {
    const expected = generateTOTP(secret, window);
    if (expected === cleanToken) {
      return true;
    }
  }
  return false;
}

/**
 * Genera el enlace otpauth:// y el enlace al código QR para escanear con la app Google Authenticator
 */
export function getGoogleAuthQrUrl(secret: string, accountName: string = 'admin@expomexicomujer.com', issuer: string = 'ExpoMexicoMujer'): { otpauthUrl: string; qrImageUrl: string } {
  const otpauthUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauthUrl)}`;
  return { otpauthUrl, qrImageUrl };
}
