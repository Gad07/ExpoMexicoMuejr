'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'token' | 'google'>('token');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTokenLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      localStorage.setItem('admin_token', data.token);
      router.push('/admin');
    } catch {
      setError('Error de conexión');
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/signin/google';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#F5F2ED',
      fontFamily: 'var(--font-body), system-ui, sans-serif',
    }}>
      {/* ── LEFT: Brand Panel ── */}
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
        {/* Decorative pattern */}
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

        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(228,0,124,0.06) 0%, transparent 70%)',
          top: '-150px',
          right: '-150px',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(199,158,69,0.04) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-100px',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
          {/* Logo real de la marca */}
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
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.6,
            marginTop: '24px',
            maxWidth: '380px',
          }}>
            Gestiona el contenido de la plataforma binacional que conecta el talento mexicano con Canadá.
          </p>

          <div style={{
            marginTop: '60px',
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
          }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Toronto · Canadá 2027
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Login Form ── */}
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
          maxWidth: '440px',
        }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#0D1B2A',
              margin: 0,
              lineHeight: 1.1,
            }}>
              Bienvenido
            </h2>
            <p style={{
              fontSize: '0.95rem',
              color: '#888',
              marginTop: '8px',
            }}>
              Inicia sesión para gestionar el contenido
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '2px',
            background: '#E8E4DE',
            borderRadius: '10px',
            padding: '3px',
            marginBottom: '36px',
          }}>
            <button
              onClick={() => setMode('token')}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                background: mode === 'token' ? '#fff' : 'transparent',
                color: mode === 'token' ? '#0D1B2A' : '#999',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
                boxShadow: mode === 'token' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Acceso por Token
            </button>
            <button
              onClick={() => setMode('google')}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                background: mode === 'google' ? '#fff' : 'transparent',
                color: mode === 'google' ? '#0D1B2A' : '#999',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
                boxShadow: mode === 'google' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Google Auth
            </button>
          </div>

          {mode === 'token' ? (
            <form onSubmit={handleTokenLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '8px' }}>
                  Usuario
                </label>
                <div style={{
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#fff',
                  transition: 'border-color 0.2s',
                }}>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="admin"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: 'none',
                      background: 'transparent',
                      color: '#0D1B2A',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '8px' }}>
                  Contraseña
                </label>
                <div style={{
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'border-color 0.2s',
                }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      flex: 1,
                      padding: '14px 16px',
                      border: 'none',
                      background: 'transparent',
                      color: '#0D1B2A',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#aaa',
                      cursor: 'pointer',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
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
                  marginBottom: '16px',
                  border: '1px solid rgba(228,0,124,0.1)',
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !username || !password}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: loading ? '#ccc' : 'linear-gradient(135deg, #E4007C, #C4006E)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: loading || !username || !password ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  opacity: loading || !username || !password ? 0.5 : 1,
                }}
              >
                <LogIn size={18} />
                {loading ? 'Iniciando sesión...' : 'Ingresar al Panel'}
              </button>

              <p style={{
                textAlign: 'center',
                marginTop: '24px',
                fontSize: '0.75rem',
                color: '#aaa',
              }}>
                Acceso restringido · Expo México Mujer 2027
              </p>
            </form>
          ) : (
            <div>
              <p style={{
                color: '#888',
                fontSize: '0.9rem',
                marginBottom: '28px',
                lineHeight: 1.6,
              }}>
                Inicia sesión con tu cuenta de Google autorizada para acceder al panel de administración de Expo México Mujer.
              </p>
              <button
                onClick={handleGoogleLogin}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  background: '#fff',
                  color: '#0D1B2A',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#E4007C'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(228,0,124,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar con Google
              </button>
              <p style={{
                textAlign: 'center',
                marginTop: '24px',
                fontSize: '0.75rem',
                color: '#aaa',
              }}>
                Solo correos autorizados pueden acceder
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}