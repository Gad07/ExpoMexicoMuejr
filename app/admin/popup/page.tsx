'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Save, Eye, Layout, Palette, ArrowRight, X } from 'lucide-react';
import { PopupConfig } from '@/app/api/admin/popup/route';

const COLOR_PRESETS = [
  { name: 'Azul EMM Noche', bg: 'linear-gradient(135deg, #002E51 0%, #001C33 100%)', text: '#ffffff', btnBg: '#E4007C', btnText: '#ffffff', btnHover: '#ff0d8d' },
  { name: 'Magenta EMM Vibrante', bg: 'linear-gradient(135deg, #E4007C 0%, #990053 100%)', text: '#ffffff', btnBg: '#002E51', btnText: '#ffffff', btnHover: '#001C33' },
  { name: 'Dorado Luxury', bg: 'linear-gradient(135deg, #C79E45 0%, #8C6A21 100%)', text: '#ffffff', btnBg: '#002E51', btnText: '#ffffff', btnHover: '#E4007C' },
  { name: 'Negro & Rosa Elegante', bg: 'linear-gradient(135deg, #111827 0%, #000000 100%)', text: '#ffffff', btnBg: '#E4007C', btnText: '#ffffff', btnHover: '#ff0d8d' },
  { name: 'Blanco & Azul Moderno', bg: '#ffffff', text: '#002E51', btnBg: '#002E51', btnText: '#ffffff', btnHover: '#E4007C' },
];

export default function AdminPopupPage() {
  const [config, setConfig] = useState<PopupConfig>({
    isActive: true,
    title: '¡Gran Convocatoria Expo México Mujer 2027!',
    subtitle: 'Únete como Expositora o Embajadora en Toronto, Canadá. Conecta tu marca con líderes binacionales e inversionistas internacionales.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    imagePosition: 'left',
    showButton: true,
    buttonText: 'Registrar mi Marca / Stand',
    buttonUrl: '/contacto',
    buttonBgColor: '#E4007C',
    buttonTextColor: '#ffffff',
    buttonHoverBgColor: '#ff0d8d',
    bgGradient: 'linear-gradient(135deg, #002E51 0%, #001C33 100%)',
    textColor: '#ffffff',
    triggerType: 'timer',
    triggerValue: 3,
    displayTarget: 'all',
    customPages: '/expo/que-es, /expositores, /visa',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
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

  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setConfig({
      ...config,
      bgGradient: preset.bg,
      textColor: preset.text,
      buttonBgColor: preset.btnBg,
      buttonTextColor: preset.btnText,
      buttonHoverBgColor: preset.btnHover,
    });
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#002E51', fontWeight: 700 }}>
        Cargando configuración del Pop-Up...
      </div>
    );
  }

  const pos = config.imagePosition || 'left';
  const hasImage = Boolean(config.image);

  let gridCols = '1fr';
  if (hasImage) {
    if (pos === 'left') gridCols = '1fr 1fr';
    if (pos === 'right') gridCols = '1fr 1fr';
    if (pos === 'top' || pos === 'background') gridCols = '1fr';
  }

  return (
    <div style={{ padding: '36px 40px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E4007C', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
            <Sparkles size={16} /> Diseñador del Pop-Up Promocional
          </div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: '#002E51', letterSpacing: '-0.02em' }}>
            Personalización de Diseño, Colores y Posición
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Ajusta la posición de la imagen, colores de fondo, colores del botón e interacciones hover.
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
          
          {/* 1. LAYOUT & POSITION */}
          <h3 style={{ margin: '0 0 20px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layout size={18} color="#E4007C" /> 1. Posición de la Imagen y Contenido
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
            {[
              { pos: 'left', label: '👈 Izquierda', desc: 'En columna' },
              { pos: 'right', label: '👉 Derecha', desc: 'En columna' },
              { pos: 'top', label: '👆 Arriba', desc: 'Banner superior' },
              { pos: 'background', label: '🖼️ Fondo', desc: 'Fondo completo' },
            ].map((p) => (
              <div
                key={p.pos}
                onClick={() => setConfig({ ...config, imagePosition: p.pos as any })}
                style={{
                  padding: '12px 10px',
                  borderRadius: '12px',
                  border: config.imagePosition === p.pos ? '2px solid #E4007C' : '1px solid #e2e8f0',
                  background: config.imagePosition === p.pos ? 'rgba(228,0,124,0.05)' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#002E51', marginBottom: '2px' }}>{p.label}</div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* 2. PRESET COLOR PALETTES */}
          <h3 style={{ margin: '28px 0 20px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Palette size={18} color="#E4007C" /> 2. Paletas de Colores Rápidas (Presets)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '24px' }}>
            {COLOR_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#002E51',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: p.bg, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
                <span>{p.name}</span>
              </button>
            ))}
          </div>

          {/* CUSTOM COLOR PICKERS */}
          <h3 style={{ margin: '28px 0 20px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            3. Personalización Fina de Colores & Hover
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
                Fondo / Degradado Pop-Up
              </label>
              <input
                type="text"
                value={config.bgGradient}
                onChange={(e) => setConfig({ ...config, bgGradient: e.target.value })}
                placeholder="linear-gradient(...)"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
                Color del Texto
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="color"
                  value={config.textColor.startsWith('#') ? config.textColor : '#ffffff'}
                  onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                  style={{ width: '40px', height: '38px', padding: 0, border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={config.textColor}
                  onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          </div>

          {/* BUTTON COLORS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
                Fondo Botón CTA
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="color"
                  value={config.buttonBgColor.startsWith('#') ? config.buttonBgColor : '#E4007C'}
                  onChange={(e) => setConfig({ ...config, buttonBgColor: e.target.value })}
                  style={{ width: '36px', height: '36px', padding: 0, border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={config.buttonBgColor}
                  onChange={(e) => setConfig({ ...config, buttonBgColor: e.target.value })}
                  style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
                Texto Botón CTA
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="color"
                  value={config.buttonTextColor.startsWith('#') ? config.buttonTextColor : '#ffffff'}
                  onChange={(e) => setConfig({ ...config, buttonTextColor: e.target.value })}
                  style={{ width: '36px', height: '36px', padding: 0, border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={config.buttonTextColor}
                  onChange={(e) => setConfig({ ...config, buttonTextColor: e.target.value })}
                  style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#002E51', marginBottom: '6px' }}>
                Fondo Botón (HOVER)
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="color"
                  value={config.buttonHoverBgColor.startsWith('#') ? config.buttonHoverBgColor : '#ff0d8d'}
                  onChange={(e) => setConfig({ ...config, buttonHoverBgColor: e.target.value })}
                  style={{ width: '36px', height: '36px', padding: 0, border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={config.buttonHoverBgColor}
                  onChange={(e) => setConfig({ ...config, buttonHoverBgColor: e.target.value })}
                  style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                />
              </div>
            </div>
          </div>

          {/* 4. BASIC CONTENT & TEXTS */}
          <h3 style={{ margin: '28px 0 20px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            4. Textos, Botón e Imagen
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#002E51', marginBottom: '4px' }}>
              Título del Pop-Up
            </label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#002E51', marginBottom: '4px' }}>
              Mensaje / Descripción
            </label>
            <textarea
              rows={2}
              value={config.subtitle}
              onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#002E51', marginBottom: '4px' }}>
              URL de Imagen / Ilustración
            </label>
            <input
              type="text"
              value={config.image}
              onChange={(e) => setConfig({ ...config, image: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#002E51', marginBottom: '4px' }}>
                Texto del Botón CTA
              </label>
              <input
                type="text"
                value={config.buttonText}
                onChange={(e) => setConfig({ ...config, buttonText: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#002E51', marginBottom: '4px' }}>
                Enlace de Destino (URL)
              </label>
              <input
                type="text"
                value={config.buttonUrl}
                onChange={(e) => setConfig({ ...config, buttonUrl: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>
          </div>
        </div>

        {/* LIVE PREVIEW BOX */}
        <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: '100px', height: 'fit-content' }}>
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
              background: pos === 'background' ? 'none' : '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
              display: 'grid',
              gridTemplateColumns: gridCols,
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

            {hasImage && pos === 'left' && (
              <div
                style={{
                  minHeight: '180px',
                  backgroundImage: `url(${config.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}

            {hasImage && pos === 'top' && (
              <div
                style={{
                  height: '140px',
                  backgroundImage: `url(${config.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}

            {hasImage && pos === 'background' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${config.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: config.bgGradient,
                    opacity: 0.88,
                  }}
                />
              </div>
            )}

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                padding: '24px',
                background: pos === 'background' ? 'transparent' : config.bgGradient,
                color: config.textColor,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gridColumn: pos === 'right' ? 1 : undefined,
                gridRow: pos === 'right' ? 1 : undefined,
              }}
            >
              <h4 style={{ margin: '0 0 8px', fontSize: '1.15rem', fontWeight: 900, lineHeight: 1.2, color: config.textColor }}>
                {config.title || 'Título del Pop-Up'}
              </h4>
              <p style={{ margin: '0 0 16px', fontSize: '0.78rem', color: config.textColor, opacity: 0.85, lineHeight: 1.4 }}>
                {config.subtitle || 'Mensaje del Pop-Up...'}
              </p>

              {config.showButton && (
                <div
                  onMouseEnter={() => setIsPreviewHovered(true)}
                  onMouseLeave={() => setIsPreviewHovered(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    background: isPreviewHovered ? config.buttonHoverBgColor : config.buttonBgColor,
                    color: config.buttonTextColor,
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    width: 'fit-content',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {config.buttonText || 'Botón CTA'} <ArrowRight size={14} />
                </div>
              )}
            </div>

            {hasImage && pos === 'right' && (
              <div
                style={{
                  minHeight: '180px',
                  backgroundImage: `url(${config.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  gridColumn: 2,
                  gridRow: 1,
                }}
              />
            )}
          </div>

          <div style={{ marginTop: '16px', fontSize: '0.78rem', color: '#64748b', textAlign: 'center' }}>
            Pasa el mouse sobre el botón en la vista previa para probar el efecto <strong>Hover</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}
