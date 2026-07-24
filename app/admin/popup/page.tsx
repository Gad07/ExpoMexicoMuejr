'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Save, Eye, Layout, Palette, Zap, Globe, ArrowRight, X, Plus, Trash2, Check, AlertCircle, Copy } from 'lucide-react';
import { PopupConfig } from '@/app/api/admin/popup/route';

const COLOR_PRESETS = [
  { name: 'Azul EMM Noche', bg: 'linear-gradient(135deg, #002E51 0%, #001C33 100%)', text: '#ffffff', btnBg: '#E4007C', btnText: '#ffffff', btnHover: '#ff0d8d' },
  { name: 'Magenta EMM Vibrante', bg: 'linear-gradient(135deg, #E4007C 0%, #990053 100%)', text: '#ffffff', btnBg: '#002E51', btnText: '#ffffff', btnHover: '#001C33' },
  { name: 'Dorado Luxury', bg: 'linear-gradient(135deg, #C79E45 0%, #8C6A21 100%)', text: '#ffffff', btnBg: '#002E51', btnText: '#ffffff', btnHover: '#E4007C' },
  { name: 'Negro & Rosa Elegante', bg: 'linear-gradient(135deg, #111827 0%, #000000 100%)', text: '#ffffff', btnBg: '#E4007C', btnText: '#ffffff', btnHover: '#ff0d8d' },
  { name: 'Blanco & Azul Moderno', bg: '#ffffff', text: '#002E51', btnBg: '#002E51', btnText: '#ffffff', btnHover: '#E4007C' },
];

const EMPTY_POPUP: PopupConfig = {
  id: '',
  name: 'Nuevo Pop-Up Promocional',
  isActive: false,
  title: '¡Título del Pop-Up!',
  subtitle: 'Escribe aquí la descripción o llamado a la acción de esta promoción.',
  image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
  imagePosition: 'left',
  showButton: true,
  buttonText: 'Saber Más / Registrarme',
  buttonUrl: '/contacto',
  buttonBgColor: '#E4007C',
  buttonTextColor: '#ffffff',
  buttonHoverBgColor: '#ff0d8d',
  bgGradient: 'linear-gradient(135deg, #002E51 0%, #001C33 100%)',
  textColor: '#ffffff',
  triggerType: 'timer',
  triggerValue: 3,
  displayTarget: 'home',
  customPages: '/expositores, /visa',
};

export default function AdminPopupPage() {
  const [popups, setPopups] = useState<PopupConfig[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [config, setConfig] = useState<PopupConfig>(EMPTY_POPUP);
  const [isNew, setIsNew] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchPopups();
  }, []);

  const fetchPopups = async () => {
    try {
      const res = await fetch('/api/admin/popup');
      if (res.ok) {
        const data = await res.json();
        if (data.popups && Array.isArray(data.popups)) {
          setPopups(data.popups);
          if (data.popups.length > 0 && !selectedId) {
            setSelectedId(data.popups[0].id);
            setConfig(data.popups[0]);
          }
        }
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  const handleSelect = (pop: PopupConfig) => {
    setSelectedId(pop.id);
    setConfig({ ...pop });
    setIsNew(false);
    setMessage(null);
  };

  const handleCreateNew = () => {
    const newPop: PopupConfig = {
      ...EMPTY_POPUP,
      id: `popup-${Date.now()}`,
      name: `Pop-Up ${popups.length + 1}`,
    };
    setSelectedId(newPop.id);
    setConfig(newPop);
    setIsNew(true);
    setMessage(null);
  };

  const handleDelete = async (idToDelete: string) => {
    if (!confirm('¿Estás seguro de eliminar este Pop-Up?')) return;

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/admin/popup', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id: idToDelete }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Pop-Up eliminado exitosamente ✓' });
        const remaining = popups.filter((p) => p.id !== idToDelete);
        setPopups(remaining);
        if (selectedId === idToDelete) {
          if (remaining.length > 0) {
            setSelectedId(remaining[0].id);
            setConfig(remaining[0]);
          } else {
            handleCreateNew();
          }
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al eliminar Pop-Up' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión al eliminar' });
    }
  };

  const handleToggleActiveDirect = async (popToToggle: PopupConfig, e: React.MouseEvent) => {
    e.stopPropagation();
    const newActiveState = !popToToggle.isActive;
    const targetPayload = { ...popToToggle, isActive: newActiveState };

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/admin/popup', {
        method: 'PUT',
        headers,
        body: JSON.stringify(targetPayload),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'No se pudo cambiar el estado del Pop-Up' });
      } else {
        setMessage({
          type: 'success',
          text: `Pop-Up '${popToToggle.name || popToToggle.title}' ${newActiveState ? 'ACTIVADO ✓' : 'DESACTIVADO ✓'}`,
        });
        if (data.popups) setPopups(data.popups);
        if (selectedId === popToToggle.id) {
          setConfig(targetPayload);
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/popup', {
        method,
        headers,
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Error al guardar Pop-Up' });
      } else {
        setMessage({ type: 'success', text: '¡Configuración del Pop-Up guardada exitosamente! ✓' });
        setIsNew(false);
        if (data.popups) setPopups(data.popups);
        if (data.popup) {
          setSelectedId(data.popup.id);
          setConfig(data.popup);
        }
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
        Cargando configuración de Pop-ups...
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
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 'calc(100vh - 82px)' }}>
      {/* ── SIDEBAR WITH POP-UP LIST ── */}
      <div style={{ background: '#fff', borderRight: '1px solid rgba(0,0,0,0.07)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#002E51' }}>Mis Pop-ups</h2>
          <button
            onClick={handleCreateNew}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: '#E4007C', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
          >
            <Plus size={14} /> Nuevo
          </button>
        </div>

        {popups.map((p) => {
          const isSel = selectedId === p.id && !isNew;
          return (
            <div
              key={p.id}
              onClick={() => handleSelect(p)}
              style={{
                padding: '14px',
                borderRadius: '12px',
                border: isSel ? '2px solid #002E51' : '1px solid #e2e8f0',
                background: isSel ? 'rgba(0,46,81,0.04)' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#002E51', flex: 1, paddingRight: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name || p.title || 'Sin Nombre'}
                </span>
                <span
                  onClick={(e) => handleToggleActiveDirect(p, e)}
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '100px',
                    background: p.isActive ? '#ecfdf5' : '#fef2f2',
                    color: p.isActive ? '#047857' : '#b91c1c',
                    border: `1px solid ${p.isActive ? '#a7f3d0' : '#fecaca'}`,
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                  title="Haz clic para activar/desactivar"
                >
                  {p.isActive ? 'ACTIVO ✓' : 'INACTIVO'}
                </span>
              </div>

              <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span>{p.displayTarget === 'all' ? '🌐 Todas' : p.displayTarget === 'home' ? '🏠 Inicio' : '📍 Custom'}</span>
                <span>•</span>
                <span>{p.triggerType === 'timer' ? `⏱️ ${p.triggerValue}s` : p.triggerType === 'scroll' ? `📜 ${p.triggerValue}%` : '🚪 Exit'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── EDITOR & PREVIEW BODY ── */}
      <div style={{ padding: '36px 40px', overflowY: 'auto', background: '#F9F7F5' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          
          {/* HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E4007C', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                <Sparkles size={16} /> {isNew ? 'Creando Nuevo Pop-Up' : `Editando: ${config.name}`}
              </div>
              <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: '#002E51', letterSpacing: '-0.02em' }}>
                Gestión de Pop-Ups Promocionales
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {!isNew && popups.length > 1 && (
                <button
                  onClick={() => handleDelete(config.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '12px 16px',
                    background: 'transparent',
                    color: '#EF4444',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={16} /> Eliminar
                </button>
              )}
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
          </div>

          {/* NOTIFICATION MESSAGE */}
          {message && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
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
              {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
              <span>{message.text}</span>
            </div>
          )}

          {/* TWO COLUMN GRID: EDITOR & LIVE PREVIEW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '32px' }}>
            {/* EDITOR FORM */}
            <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              
              {/* POPUP NAME & STATE TOGGLE */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', marginBottom: '28px', border: '1px solid #e2e8f0' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                  <label style={{ display: 'block', fontWeight: 800, color: '#002E51', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Nombre del Pop-Up (Interno)
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    placeholder="Ej: Promo Expositores Toronto"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontWeight: 700, color: '#002E51' }}
                  />
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#002E51', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px' }}>Estado Activo</div>
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
              </div>

              {/* 1. TRIGGER SELECTION SECTION */}
              <h3 style={{ margin: '0 0 20px', fontSize: '1.05rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} color="#E4007C" /> 1. Regla de Disparo (Triggers)
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
                      padding: '14px 12px',
                      borderRadius: '12px',
                      border: config.triggerType === t.type ? '2px solid #E4007C' : '1px solid #e2e8f0',
                      background: config.triggerType === t.type ? 'rgba(228,0,124,0.05)' : '#fff',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#002E51', marginBottom: '2px' }}>{t.label}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.desc}</div>
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
                    Porcentaje de Scroll para disparar (ej: 40%)
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

              {/* 2. PAGE TARGETING SECTION */}
              <h3 style={{ margin: '28px 0 20px', fontSize: '1.05rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={18} color="#E4007C" /> 2. Ubicación (¿En qué páginas se mostrará?)
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
                      padding: '14px 12px',
                      borderRadius: '12px',
                      border: config.displayTarget === p.target ? '2px solid #002E51' : '1px solid #e2e8f0',
                      background: config.displayTarget === p.target ? 'rgba(0,46,81,0.05)' : '#fff',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#002E51', marginBottom: '2px' }}>{p.label}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{p.desc}</div>
                  </div>
                ))}
              </div>

              {config.displayTarget === 'custom' && (
                <div style={{ marginBottom: '24px' }}>
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

              {/* 3. LAYOUT & POSITION */}
              <h3 style={{ margin: '28px 0 20px', fontSize: '1.05rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layout size={18} color="#E4007C" /> 3. Posición de la Imagen y Estructura
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

              {/* 4. PRESET COLOR PALETTES */}
              <h3 style={{ margin: '28px 0 20px', fontSize: '1.05rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Palette size={18} color="#E4007C" /> 4. Paletas de Colores & Efecto Hover
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

              {/* 5. BASIC CONTENT & TEXTS */}
              <h3 style={{ margin: '28px 0 20px', fontSize: '1.05rem', fontWeight: 800, color: '#002E51', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                5. Textos, Botón e Imagen
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
                <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '3px 10px', borderRadius: '100px', background: config.isActive ? '#ecfdf5' : '#fef2f2', color: config.isActive ? '#047857' : '#b91c1c', border: `1px solid ${config.isActive ? '#a7f3d0' : '#fecaca'}` }}>
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

              <div style={{ marginTop: '16px', fontSize: '0.78rem', color: '#64748b', textAlign: 'center', lineHeight: 1.5 }}>
                Trigger: <strong>{config.triggerType === 'timer' ? `⏱️ ${config.triggerValue}s` : config.triggerType === 'scroll' ? `📜 ${config.triggerValue}% Scroll` : '🚪 Exit Intent'}</strong>
                <br />
                Mostrando en: <strong>{config.displayTarget === 'all' ? 'Todas las páginas' : config.displayTarget === 'home' ? 'Solo Inicio (/)' : config.customPages}</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
