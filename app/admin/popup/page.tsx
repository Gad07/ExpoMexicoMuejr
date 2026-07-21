'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Save, Eye, Clock, MousePointer, DoorOpen, Globe, Home, Target, ArrowRight, X } from 'lucide-react';
import { PopupConfig } from '@/app/api/admin/popup/route';

export default function AdminPopupPage() {
  const [config, setConfig] = useState<PopupConfig>({
    isActive: true,
    title: '¡Gran Convocatoria Expo México Mujer 2027!',
    subtitle: 'Únete como Expositora o Embajadora en Toronto, Canadá. Conecta tu marca con líderes binacionales e inversionistas internacionales.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    showButton: true,
    buttonText: 'Registrar mi Marca / Stand',
    buttonUrl: '/contacto',
    triggerType: 'timer',
    triggerValue: 3,
    displayTarget: 'all',
    customPages: '/expo/que-es, /expositores, /visa',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/popup')
      .then((res) => res.json())
      .then((data) => {
        if (data?.popup) {
          setConfig(data.popup);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/popup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Error al guardar Pop-Up' });
      } else {
        setMessage({ type: 'success', text: '¡Configuración del Pop-Up guardada exitosamente! ✓' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#002E51', fontWeight: 700 }}>
        Cargando configuración del Pop-Up...
      </div>
    );
  }

  return (
    <div style={{ padding: '36px 40px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E4007C', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
            <Sparkles size={16} /> Módulo Promocional Flotante
          </div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: '#002E51', letterSpacing: '-0.02em' }}>
            Gestión del Pop-Up Promocional
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Configura el modal emergente, disparadores (tiempo, scroll, intención de salida) y las páginas donde aparecerá.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: '#002E51',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: saving ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 14px rgba(0,46,81,0.2)',
          }}
        >
          <Save size={18} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      {message && (
        <div
          style={{
            padding: '14px 20px',
            borderRadius: '12px',
            marginBottom: '24px',
            fontWeight: 700,
            fontSize: '0.9rem',
            background: message.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
            color: message.type === 'success' ? '#059669' : '#DC2626',
            border: `1px solid ${message.type === 'success' ? '#10B981' : '#EF4444'}`,
          }}
        >
          {message.text}
        </div>
      )}

      {/* TWO COLUMN GRID: EDITOR & LIVE PREVIEW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px' }}>
        {/* EDITOR FORM */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 24px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            1. Contenido y Apariencia
          </h3>

          {/* TOGGLE IS ACTIVE */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontWeight: 800, color: '#002E51', fontSize: '0.95rem' }}>Estado del Pop-Up</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Activar o desactivar la aparición en el sitio público</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.isActive}
                onChange={(e) => setConfig({ ...config, isActive: e.target.checked })}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: config.isActive ? '#E4007C' : '#cbd5e1',
                  borderRadius: '34px',
                  transition: '0.3s',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    content: '""',
                    height: '20px',
                    width: '20px',
                    left: config.isActive ? '26px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                  }}
                />
              </span>
            </label>
          </div>

          {/* TITLE INPUT */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
              Título del Pop-Up
            </label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              placeholder="Ej: ¡Gran Convocatoria Expo México Mujer!"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* SUBTITLE / MESSAGE */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
              Mensaje / Descripción
            </label>
            <textarea
              rows={3}
              value={config.subtitle}
              onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
              placeholder="Texto explicativo del anuncio..."
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>

          {/* IMAGE URL INPUT */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
              URL de Imagen / Ilustración
            </label>
            <input
              type="text"
              value={config.image}
              onChange={(e) => setConfig({ ...config, image: e.target.value })}
              placeholder="https://... (dejar vacío si no lleva imagen)"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* SHOW BUTTON TOGGLE */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '14px 18px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontWeight: 800, color: '#002E51', fontSize: '0.88rem' }}>¿Mostrar Botón de Llamada a la Acción (CTA)?</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Permite redirigir al visitante a una página o enlace</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.showButton}
                onChange={(e) => setConfig({ ...config, showButton: e.target.checked })}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: config.showButton ? '#E4007C' : '#cbd5e1',
                  borderRadius: '34px',
                  transition: '0.3s',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    content: '""',
                    height: '18px',
                    width: '18px',
                    left: config.showButton ? '23px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                  }}
                />
              </span>
            </label>
          </div>

          {config.showButton && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
                  Texto del Botón
                </label>
                <input
                  type="text"
                  value={config.buttonText}
                  onChange={(e) => setConfig({ ...config, buttonText: e.target.value })}
                  placeholder="Ej: Registrar mi Stand"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
                  Enlace de Destino (URL)
                </label>
                <input
                  type="text"
                  value={config.buttonUrl}
                  onChange={(e) => setConfig({ ...config, buttonUrl: e.target.value })}
                  placeholder="Ej: /contacto o /expositores"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          )}

          {/* 2. TRIGGER SELECTION */}
          <h3 style={{ margin: '32px 0 20px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            2. Regla de Disparo (Trigger)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
            {[
              { type: 'timer', label: '⏱️ Por Tiempo', desc: 'Retraso en segundos' },
              { type: 'scroll', label: '📜 Por Scroll', desc: '% de avance en página' },
              { type: 'exit', label: '🚪 Intención Salida', desc: 'Al mover el mouse fuera' },
            ].map((t) => (
              <div
                key={t.type}
                onClick={() => setConfig({ ...config, triggerType: t.type as any })}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  border: config.triggerType === t.type ? '2px solid #E4007C' : '1px solid #e2e8f0',
                  background: config.triggerType === t.type ? 'rgba(228,0,124,0.05)' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#002E51', marginBottom: '4px' }}>{t.label}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{t.desc}</div>
              </div>
            ))}
          </div>

          {config.triggerType === 'timer' && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
                Segundos de espera antes de mostrar (ej: 3 segundos)
              </label>
              <input
                type="number"
                min={0}
                max={30}
                value={config.triggerValue}
                onChange={(e) => setConfig({ ...config, triggerValue: Number(e.target.value) || 0 })}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          )}

          {config.triggerType === 'scroll' && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
                Porcentaje de Scroll para disparar (ej: 50%)
              </label>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <input
                  type="range"
                  min={10}
                  max={90}
                  step={5}
                  value={config.triggerValue}
                  onChange={(e) => setConfig({ ...config, triggerValue: Number(e.target.value) })}
                  style={{ flex: 1 }}
                />
                <span style={{ fontWeight: 800, color: '#E4007C', fontSize: '1rem' }}>{config.triggerValue}%</span>
              </div>
            </div>
          )}

          {/* 3. PAGE TARGETING */}
          <h3 style={{ margin: '32px 0 20px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            3. Ubicación (¿En qué páginas se mostrará?)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
            {[
              { target: 'all', label: '🌐 Todas las Páginas', desc: 'Aparece en todo el sitio' },
              { target: 'home', label: '🏠 Solo en la Inicio', desc: 'Únicamente en ruta /' },
              { target: 'custom', label: '📍 Páginas Específicas', desc: 'Definir rutas manualmente' },
            ].map((p) => (
              <div
                key={p.target}
                onClick={() => setConfig({ ...config, displayTarget: p.target as any })}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  border: config.displayTarget === p.target ? '2px solid #002E51' : '1px solid #e2e8f0',
                  background: config.displayTarget === p.target ? 'rgba(0,46,81,0.05)' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#002E51', marginBottom: '4px' }}>{p.label}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {config.displayTarget === 'custom' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
                Rutas específicas (separadas por coma)
              </label>
              <input
                type="text"
                value={config.customPages}
                onChange={(e) => setConfig({ ...config, customPages: e.target.value })}
                placeholder="Ej: /expositores, /visa, /agenda, /contacto"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          )}
        </div>

        {/* LIVE PREVIEW BOX */}
        <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#002E51', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Eye size={16} color="#E4007C" /> Vista Previa en Tiempo Real
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '3px 10px', borderRadius: '100px', background: config.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: config.isActive ? '#059669' : '#DC2626' }}>
              {config.isActive ? 'POP-UP ACTIVO' : 'POP-UP INACTIVO'}
            </span>
          </div>

          {/* MOCK POPUP CARD */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              background: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
              display: 'grid',
              gridTemplateColumns: config.image ? '1fr 1fr' : '1fr',
              border: '1px solid #e2e8f0',
              opacity: config.isActive ? 1 : 0.4,
              transition: 'all 0.3s ease',
            }}
          >
            {/* CLOSE MOCK BUTTON */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 5,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.4)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={14} />
            </div>

            {config.image && (
              <div
                style={{
                  minHeight: '200px',
                  backgroundImage: `url(${config.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}

            <div style={{ padding: '24px', background: 'linear-gradient(135deg, #002E51 0%, #001C33 100%)', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 900, lineHeight: 1.2 }}>
                {config.title || 'Título del Pop-Up'}
              </h4>
              <p style={{ margin: '0 0 16px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>
                {config.subtitle || 'Mensaje del Pop-Up...'}
              </p>

              {config.showButton && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    background: '#E4007C',
                    color: '#fff',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    width: 'fit-content',
                  }}
                >
                  {config.buttonText || 'Botón CTA'} <ArrowRight size={14} />
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '20px', fontSize: '0.78rem', color: '#64748b', textAlign: 'center' }}>
            Trigger configurado: <strong>{config.triggerType === 'timer' ? `⏱️ ${config.triggerValue}s de espera` : config.triggerType === 'scroll' ? `📜 ${config.triggerValue}% de Scroll` : '🚪 Exit Intent'}</strong>
            <br />
            Mostrando en: <strong>{config.displayTarget === 'all' ? 'Todas las páginas' : config.displayTarget === 'home' ? 'Página de Inicio (/)' : config.customPages}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
