'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, X, Image as ImageIcon, FileText, Layers, CheckCircle2 } from 'lucide-react';

type Language = 'es' | 'en' | 'fr';

interface RegisteredPage {
  name: string;
  url: string;
}

const SYSTEM_DEFAULT_PAGES: RegisteredPage[] = [
  { name: 'Inicio', url: '/' },
  { name: '¿Qué es Expo México Mujer?', url: '/expo/que-es' },
  { name: 'Industrias', url: '/expo/industrias' },
  { name: 'Ottawa 2026', url: '/expo/ottawa-2026' },
  { name: 'Visas y Trámites', url: '/visa' },
  { name: 'Noticias', url: '/recursos' },
  { name: 'Expositores', url: '/expositores' },
  { name: 'Patrocinadores', url: '/patrocinadores' },
  { name: 'Embajadoras EMM', url: '/embajadoras' },
  { name: 'Aliados', url: '/aliados' },
  { name: 'Invitados Especiales', url: '/invitados' },
  { name: 'Compradores e Inversionistas', url: '/compradores' },
  { name: 'Agenda General', url: '/agenda' },
  { name: 'Academy General', url: '/academy' },
  { name: 'Nosotros', url: '/nosotros' },
  { name: 'Prensa', url: '/informacion/prensa' },
  { name: 'Manual del Expositor', url: '/informacion/participantes' },
  { name: 'Logística y Aduanas', url: '/informacion/logistica' },
  { name: 'Guía del Viajero', url: '/informacion/viajero' },
  { name: 'Aviso de Privacidad', url: '/privacidad' },
  { name: 'Términos y Condiciones', url: '/terminos' },
  { name: 'Contacto', url: '/contacto' },
];

export default function AdminHeroes() {
  const [heroes, setHeroes] = useState<Record<string, any>>({});
  const [registeredPages, setRegisteredPages] = useState<RegisteredPage[]>(SYSTEM_DEFAULT_PAGES);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('es');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newPath, setNewPath] = useState('');

  useEffect(() => {
    // 1. Fetch Heroes
    fetch('/api/admin/heroes')
      .then((r) => r.json())
      .then((d) => {
        if (d.heroes) {
          setHeroes(d.heroes);
          const keys = Object.keys(d.heroes);
          if (keys.length > 0) setSelectedPath(keys[0]);
        }
      })
      .catch(() => {});

    // 2. Fetch Dynamic Pages from Pages API
    fetch('/api/admin/pages')
      .then((r) => r.json())
      .then((d) => {
        if (d.pages && Array.isArray(d.pages)) {
          const dynamicPages: RegisteredPage[] = d.pages.map((p: any) => ({
            name: p.name || p.url,
            url: p.url || p.slug || p.key,
          }));

          // Merge without duplicates
          setRegisteredPages((prev) => {
            const map = new Map<string, string>();
            prev.forEach((item) => map.set(item.url, item.name));
            dynamicPages.forEach((item) => {
              if (item.url && item.url.startsWith('/')) {
                map.set(item.url, item.name);
              }
            });
            return Array.from(map.entries()).map(([url, name]) => ({ url, name }));
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/admin/heroes', {
        method: 'POST',
        headers,
        body: JSON.stringify(heroes),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Error al guardar' });
      } else {
        setMessage({ type: 'success', text: 'Portadas guardadas exitosamente ✓' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
    setSaving(false);
  };

  const getSelectedHero = () => (selectedPath ? heroes[selectedPath] : null);

  const createDefaultHero = (path: string, pageName?: string) => {
    return {
      eyebrow: { es: 'EXPO MÉXICO MUJER', en: 'EXPO MEXICO MUJER', fr: 'EXPO MEXIQUE FEMME' },
      title: { es: pageName || 'Nuevo Título', en: '', fr: '' },
      titleEm: { es: '', en: '', fr: '' },
      desc: { es: '', en: '', fr: '' },
      image: '/recursos/Recurso 1.png',
      imagePosition: 'center',
      overlayVariant: 'default',
    };
  };

  const selectOrCreatePath = (path: string, pageName?: string) => {
    if (!heroes[path]) {
      setHeroes((prev) => ({
        ...prev,
        [path]: createDefaultHero(path, pageName),
      }));
    }
    setSelectedPath(path);
  };

  const updateHero = (updates: any) => {
    if (!selectedPath) return;
    setHeroes((prev) => ({
      ...prev,
      [selectedPath]: { ...(prev[selectedPath] || createDefaultHero(selectedPath)), ...updates },
    }));
  };

  const updateHeroField = (field: string, value: string) => {
    const hero = getSelectedHero();
    if (!hero) return;
    updateHero({ [field]: { ...hero[field], [lang]: value } });
  };

  const handleAddPath = () => {
    let formatted = newPath.trim();
    if (!formatted) return;
    if (!formatted.startsWith('/')) {
      formatted = '/' + formatted;
    }

    selectOrCreatePath(formatted);
    setNewPath('');
  };

  const handleDeletePath = (pathToDelete: string) => {
    if (!confirm(`¿Eliminar la portada personalizada para la ruta ${pathToDelete}?`)) return;
    const newHeroes = { ...heroes };
    delete newHeroes[pathToDelete];
    setHeroes(newHeroes);
    if (selectedPath === pathToDelete) {
      const keys = Object.keys(newHeroes);
      setSelectedPath(keys.length > 0 ? keys[0] : null);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.12)',
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    outline: 'none',
    background: '#fff',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#002E51',
  };

  const hero = getSelectedHero();

  // Combine configured heroes & registered site pages
  const configuredKeys = Object.keys(heroes);
  const unconfiguredPages = registeredPages.filter((p) => !heroes[p.url]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: 'calc(100vh - 82px)' }}>
      {/* SIDEBAR */}
      <div
        style={{
          background: '#fff',
          borderRight: '1px solid rgba(0,0,0,0.07)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto',
        }}
      >
        <div>
          <h2 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: 800, color: '#002E51' }}>
            Portadas por Ruta (URL)
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="/ejemplo-ruta"
              value={newPath}
              onChange={(e) => setNewPath(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddPath();
              }}
              style={{ ...inputStyle, padding: '8px 12px' }}
            />
            <button
              onClick={handleAddPath}
              title="Añadir nueva ruta"
              style={{
                padding: '8px 14px',
                background: '#E4007C',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* SECTION 1: CONFIGURED HEROES */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#E4007C', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            Portadas Personalizadas ({configuredKeys.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {configuredKeys.map((path) => (
              <div key={path} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  onClick={() => setSelectedPath(path)}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: selectedPath === path ? 'rgba(228,0,124,0.08)' : 'transparent',
                    color: selectedPath === path ? '#E4007C' : '#333',
                    fontWeight: selectedPath === path ? 700 : 500,
                    fontSize: '0.85rem',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{path}</span>
                  <CheckCircle2 size={14} color="#059669" style={{ flexShrink: 0 }} />
                </button>
                <button
                  onClick={() => handleDeletePath(path)}
                  title="Eliminar portada"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#EF4444',
                    cursor: 'pointer',
                    opacity: selectedPath === path ? 1 : 0.3,
                    padding: '4px',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: OTHER SITE PAGES (1-CLICK EDIT) */}
        {unconfiguredPages.length > 0 && (
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Otras Páginas del Sitio ({unconfiguredPages.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {unconfiguredPages.map((page) => (
                <button
                  key={page.url}
                  onClick={() => selectOrCreatePath(page.url, page.name)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px border #e2e8f0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: selectedPath === page.url ? 'rgba(228,0,124,0.08)' : '#f8fafc',
                    color: selectedPath === page.url ? '#E4007C' : '#64748b',
                    fontWeight: selectedPath === page.url ? 700 : 500,
                    fontSize: '0.8rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {page.name} <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>({page.url})</span>
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#E4007C', fontWeight: 700 }}>+ Editar</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EDITOR AREA */}
      <div style={{ padding: '32px 40px', overflowY: 'auto', background: '#F9F7F5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#002E51', margin: 0 }}>
              Portada para: <span style={{ color: '#E4007C' }}>{selectedPath}</span>
            </h1>
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
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>

          {message && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '24px',
                fontSize: '0.875rem',
                fontWeight: 600,
                background: message.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                color: message.type === 'success' ? '#059669' : '#DC2626',
              }}
            >
              {message.text}
            </div>
          )}

          {hero ? (
            <>
              {/* IMAGE SETTINGS */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#002E51', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ImageIcon size={18} /> Imagen y Apariencia
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>URL de Imagen de Fondo</label>
                    <input
                      type="text"
                      value={hero.image || ''}
                      onChange={(e) => updateHero({ image: e.target.value })}
                      style={inputStyle}
                      placeholder="/recursos/Recurso 1.png o https://..."
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Posición de Imagen</label>
                    <select value={hero.imagePosition || 'center'} onChange={(e) => updateHero({ imagePosition: e.target.value })} style={inputStyle}>
                      <option value="center">Centro</option>
                      <option value="top">Arriba</option>
                      <option value="bottom">Abajo</option>
                      <option value="right top">Arriba Derecha</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Opacidad / Overlay</label>
                    <select value={hero.overlayVariant || 'default'} onChange={(e) => updateHero({ overlayVariant: e.target.value })} style={inputStyle}>
                      <option value="default">Normal</option>
                      <option value="strong">Oscuro</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* TRANSLATIONS TABS */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                {(['es', 'en', 'fr'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      padding: '12px 24px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: lang === l ? '#E4007C' : '#999',
                      borderBottom: lang === l ? '2px solid #E4007C' : '2px solid transparent',
                      textTransform: 'uppercase',
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* TEXT CONTENT */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#002E51' }}>Textos de Portada ({lang.toUpperCase()})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Ceja (Texto pequeño superior)</label>
                    <input type="text" value={hero.eyebrow?.[lang] || ''} onChange={(e) => updateHeroField('eyebrow', e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Título Principal</label>
                      <input type="text" value={hero.title?.[lang] || ''} onChange={(e) => updateHeroField('title', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Título Énfasis (Cursiva)</label>
                      <input type="text" value={hero.titleEm?.[lang] || ''} onChange={(e) => updateHeroField('titleEm', e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Descripción</label>
                    <textarea value={hero.desc?.[lang] || ''} onChange={(e) => updateHeroField('desc', e.target.value)} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                  </div>
                </div>
              </div>

              {/* CTAS (BOTONES) */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#002E51' }}>Botones y Acciones ({lang.toUpperCase()})</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  {/* CTA 1 */}
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#0f172a' }}>Botón Principal</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input
                        type="text"
                        placeholder={`Texto del Botón (${lang.toUpperCase()})`}
                        value={hero.cta1?.text?.[lang] || ''}
                        onChange={(e) => updateHero({ cta1: { ...hero.cta1, text: { ...hero.cta1?.text, [lang]: e.target.value } } })}
                        style={inputStyle}
                      />
                      <select value={hero.cta1?.action || 'link'} onChange={(e) => updateHero({ cta1: { ...hero.cta1, action: e.target.value } })} style={inputStyle}>
                        <option value="link">Ir a un Enlace</option>
                        <option value="popup">Abrir Formulario (Pop-up)</option>
                      </select>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>
                          {hero.cta1?.action === 'popup' ? 'URL del Formulario / Pop-up (Opcional)' : 'URL de destino'}
                        </label>
                        <input
                          type="text"
                          placeholder={hero.cta1?.action === 'popup' ? 'Ej: https://forms.google.com/... o vació para modal' : 'URL de destino (ej: #registro, /contacto)'}
                          value={hero.cta1?.href || ''}
                          onChange={(e) => updateHero({ cta1: { ...hero.cta1, href: e.target.value } })}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA 2 */}
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#0f172a' }}>Botón Secundario</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input
                        type="text"
                        placeholder={`Texto del Botón (${lang.toUpperCase()})`}
                        value={hero.cta2?.text?.[lang] || ''}
                        onChange={(e) => updateHero({ cta2: { ...hero.cta2, text: { ...hero.cta2?.text, [lang]: e.target.value } } })}
                        style={inputStyle}
                      />
                      <select value={hero.cta2?.action || 'link'} onChange={(e) => updateHero({ cta2: { ...hero.cta2, action: e.target.value } })} style={inputStyle}>
                        <option value="link">Ir a un Enlace</option>
                        <option value="popup">Abrir Formulario (Pop-up)</option>
                      </select>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>
                          {hero.cta2?.action === 'popup' ? 'URL del Formulario / Pop-up (Opcional)' : 'URL de destino'}
                        </label>
                        <input
                          type="text"
                          placeholder={hero.cta2?.action === 'popup' ? 'Ej: https://forms.google.com/... o vacío para modal' : 'URL de destino (ej: #agenda, /contacto)'}
                          value={hero.cta2?.href || ''}
                          onChange={(e) => updateHero({ cta2: { ...hero.cta2, href: e.target.value } })}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#94a3b8' }}>
              Selecciona una ruta en la barra lateral para editar su portada
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
