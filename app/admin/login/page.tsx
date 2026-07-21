'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, ShieldCheck, ArrowRight, CheckCircle2, Smartphone, Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [tokenInput, setTokenInput] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [code6, setCode6] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // PASO 1: Verificar token
  const handleVerifyToken = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    const cleanToken = tokenInput.trim();

    if (!cleanToken) {
      setError('Por favor ingresa el token de acceso.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: cleanToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Token de seguridad incorrecto.');
        setLoading(false);
        return;
      }

      // Paso 1 completado -> Avanzar al Paso 2
      setStep(2);
      setError('');
    } catch {
      setError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  // PASO 2: Verificar código de 6 dígitos de Google Authenticator
  const handleVerify2FA = async (e?: React.FormEvent, customCode?: string) => {
    if (e) e.preventDefault();
    setError('');
    const cleanCode = (customCode || code6).trim();

    if (cleanCode.length !== 6) {
      setError('El código debe contener 6 dígitos.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Código de Google Authenticator incorrecto.');
        setLoading(false);
        return;
      }

      // Guardar token en localStorage y cookie, e ir al Admin
      localStorage.setItem('admin_token', data.token);
      document.cookie = `admin_token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      window.location.href = '/admin';
    } catch {
      setError('Error de conexión al verificar el código.');
      setLoading(false);
    }
  };

  // Auto-submit al completar 6 dígitos en el Paso 2
  const handleCodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setCode6(clean);
    if (clean.length === 6 && !loading) {
      handleVerify2FA(undefined, clean);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#F5F2ED',
      fontFamily: 'var(--font-body), system-ui, sans-serif',
    }}>
      {/* ── PANEL IZQUIERDO: Marca y Seguridad ── */}
      <div style={{
        flex: '1',
        background: 'linear-gradient(135deg, #002E51 0%, #0D1B2A 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Patrón decorativo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #fff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
          <div style={{ marginBottom: '48px' }}>
            <img
              src="/logo-emm.png"
              alt="Expo México Mujer"
              width="280"
              height="84"
              style={{
                display: 'block',
                filter: 'brightness(0) invert(1)',
                opacity: 0.95,
              }}
            />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display), sans-serif',
            fontSize: '2.8rem',
            fontWeight: 900,
            color: '#fff',
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Panel de<br />
            <span style={{ color: '#E4007C' }}>Administración</span>
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.6,
            marginTop: '24px',
            maxWidth: '400px',
          }}>
            Acceso restringido de alta seguridad con autenticación de dos factores y protección contra ataques por fuerza bruta.
          </p>

          <div style={{
            marginTop: '40px',
            padding: '20px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <ShieldCheck size={32} style={{ color: '#E4007C', flexShrink: 0 }} />
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>
                Protección IP Anti-Fuerza Bruta
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '2px' }}>
                Máximo 3 intentos fallidos. Bloqueo automático de IP por 2 horas.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PANEL DERECHO: Formulario ── */}
      <div style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
        background: '#F5F2ED',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '460px',
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#0D1B2A',
              margin: 0,
              lineHeight: 1.1,
            }}>
              Acceso Seguro Admin
            </h2>
            <p style={{
              fontSize: '0.9rem',
              color: '#777',
              marginTop: '8px',
            }}>
              Ingresa las credenciales de administración.
            </p>
          </div>

          {/* Stepper Indicator */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '36px',
          }}>
            <div style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: '10px',
              background: step === 1 ? '#002E51' : 'rgba(0,46,81,0.08)',
              color: step === 1 ? '#fff' : '#002E51',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              transition: 'all 0.3s',
            }}>
              {step > 1 ? <CheckCircle2 size={16} style={{ color: '#2E7D32' }} /> : <KeyRound size={16} />}
              <span>1. Token de Acceso</span>
            </div>

            <div style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: '10px',
              background: step === 2 ? '#E4007C' : '#E8E4DE',
              color: step === 2 ? '#fff' : '#888',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              transition: 'all 0.3s',
            }}>
              <Smartphone size={16} />
              <span>2. Código 2FA</span>
            </div>
          </div>

          {step === 1 ? (
            /* ── PASO 1: Token de Acceso ── */
            <form onSubmit={handleVerifyToken}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#333', marginBottom: '8px' }}>
                  Token de Acceso
                </label>

                <div style={{
                  border: `2px solid ${tokenInput.trim().length > 0 ? '#002E51' : 'rgba(0,0,0,0.1)'}`,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'border-color 0.2s',
                }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={tokenInput}
                    onChange={e => setTokenInput(e.target.value.replace(/\s/g, ''))}
                    placeholder="••••••••••••••••••••"
                    style={{
                      flex: 1,
                      padding: '16px',
                      border: 'none',
                      background: 'transparent',
                      color: '#0D1B2A',
                      fontSize: '0.95rem',
                      letterSpacing: '0.05em',
                      fontWeight: 600,
                      outline: 'none',
                      fontFamily: 'monospace',
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#888',
                      cursor: 'pointer',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    title={showPass ? 'Ocultar token' : 'Mostrar token'}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(228,0,124,0.06)',
                  color: '#E4007C',
                  fontSize: '0.85rem',
                  marginBottom: '20px',
                  border: '1px solid rgba(228,0,124,0.15)',
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !tokenInput.trim()}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: tokenInput.trim() && !loading
                    ? 'linear-gradient(135deg, #002E51, #0D1B2A)'
                    : '#ccc',
                  color: '#fff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: tokenInput.trim() && !loading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                }}
              >
                <span>{loading ? 'Verificando Token...' : 'Verificar Token (Paso 1)'}</span>
                <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            /* ── PASO 2: Código de 6 dígitos Google Authenticator ── */
            <form onSubmit={handleVerify2FA}>
              <div style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(46,125,50,0.08)',
                border: '1px solid rgba(46,125,50,0.2)',
                color: '#2E7D32',
                fontSize: '0.82rem',
                fontWeight: 600,
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <CheckCircle2 size={18} />
                <span>Paso 1 OK: Token de acceso verificado.</span>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#333', marginBottom: '8px' }}>
                  Código de 6 dígitos (Google Authenticator)
                </label>
                <div style={{
                  border: `2px solid ${code6.trim().length === 6 ? '#E4007C' : 'rgba(0,0,0,0.1)'}`,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#fff',
                  transition: 'border-color 0.2s',
                }}>
                  <input
                    type="text"
                    maxLength={6}
                    autoFocus
                    value={code6}
                    onChange={e => handleCodeChange(e.target.value)}
                    placeholder="000000"
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: 'none',
                      background: 'transparent',
                      color: '#0D1B2A',
                      fontSize: '1.4rem',
                      letterSpacing: '0.3em',
                      textAlign: 'center',
                      fontWeight: 800,
                      outline: 'none',
                      fontFamily: 'monospace',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {error && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(228,0,124,0.06)',
                  color: '#E4007C',
                  fontSize: '0.85rem',
                  marginBottom: '20px',
                  border: '1px solid rgba(228,0,124,0.15)',
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || code6.trim().length !== 6}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: code6.trim().length === 6 && !loading
                    ? 'linear-gradient(135deg, #E4007C, #C4006E)'
                    : '#ccc',
                  color: '#fff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: code6.trim().length === 6 && !loading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  boxShadow: code6.trim().length === 6 ? '0 4px 12px rgba(228,0,124,0.25)' : 'none',
                }}
              >
                <Lock size={18} />
                <span>{loading ? 'Verificando...' : 'Ingresar al Panel (Paso 2)'}</span>
              </button>
            </form>
          )}

          <p style={{
            textAlign: 'center',
            marginTop: '32px',
            fontSize: '0.75rem',
            color: '#aaa',
          }}>
            Panel de Administración · Expo México Mujer 2027
          </p>
        </div>
      </div>
    </div>
  );
}