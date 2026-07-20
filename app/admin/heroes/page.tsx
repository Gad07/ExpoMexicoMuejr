'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, X, Image as ImageIcon } from 'lucide-react';

type Language = 'es' | 'en' | 'fr';

export default function AdminHeroes() {
  const [heroes, setHeroes] = useState<Record<string, any>>({});
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('es');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newPath, setNewPath] = useState('');

  useEffect(() => {
    fetch('/api/admin/heroes')
      .then(r => r.json())
      .then(d => {
        if (d.heroes) {
          setHeroes(d.heroes);
          const keys = Object.keys(d.heroes);
          if (keys.length > 0) setSelectedPath(keys[0]);
        }
      });
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

  const getSelectedHero = () => selectedPath ? heroes[selectedPath] : null;

  const updateHero = (updates: any) => {
    if (!selectedPath) return;
    setHeroes(prev => ({
      ...prev,
      [selectedPath]: { ...prev[selectedPath], ...updates }
    }));
  };

  const updateHeroField = (field: string, value: string) => {
    const hero = getSelectedHero();
    if (!hero) return;
    updateHero({ [field]: { ...hero[field], [lang]: value } });
  };

  const handleAddPath = () => {
    if (!newPath.trim() || !newPath.startsWith('/')) {
      alert('La ruta debe empezar con / (ej: /nueva-pagina)');
      return;
    }
    if (heroes[newPath]) {
      alert('Esta ruta ya existe');
      return;
    }
    setHeroes(prev => ({
      ...prev,
      [newPath]: {
        eyebrow: { es: '', en: '', fr: '' },
        title: { es: 'Nuevo Título', en: '', fr: '' },
        titleEm: { es: '', en: '', fr: '' },
        desc: { es: '', en: '', fr: '' },
        image: '',
        imagePosition: 'center',
        overlayVariant: 'default'
      }
    }));
    setSelectedPath(newPath);
    setNewPath('');
  };

  const handleDeletePath = (path: string) => {
    if (!confirm(`¿Eliminar la portada para la ruta ${path}?`)) return;
    const newHeroes = { ...heroes };
    delete newHeroes[path];
    setHeroes(newHeroes);
    if (selectedPath === path) {
      const keys = Object.keys(newHeroes);
      setSelectedPath(keys.length > 0 ? keys[0] : null);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.875rem',
    fontFamily: 'inherit', outline: 'none', background: '#fff'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#002E51'
  };

  const hero = getSelectedHero();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 'calc(100vh - 82px)' }}>
      {/* SIDEBAR */}
      <div style={{ background: '#fff', borderRight: '1px solid rgba(0,0,0,0.07)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
        <h2 style={{ margin: '0 0 16px 8px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51' }}>Rutas (URLs)</h2>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="/nueva-ruta" 
            value={newPath} 
            onChange={e => setNewPath(e.target.value)} 
            style={{ ...inputStyle, padding: '8px 12px' }} 
          />
          <button onClick={handleAddPath} style={{ padding: '8px 12px', background: '#E4007C', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
            <Plus size={16} />
          </button>
        </div>

        {Object.keys(heroes).map(path => (
          <div key={path} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setSelectedPath(path)}
              style={{
                flex: 1, padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: selectedPath === path ? 'rgba(228,0,124,0.08)' : 'transparent',
                color: selectedPath === path ? '#E4007C' : '#333',
                fontWeight: selectedPath === path ? 700 : 500,
                fontSize: '0.85rem',
                transition: 'all 0.15s',
              }}
            >
              {path}
            </button>
            <button onClick={() => handleDeletePath(path)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', opacity: selectedPath === path ? 1 : 0.3 }}><X size={16} /></button>
          </div>
        ))}
      </div>

      {/* EDITOR */}
      <div style={{ padding: '32px 40px', overflowY: 'auto', background: '#F9F7F5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#002E51', margin: 0 }}>
              Portada para: <span style={{ color: '#E4007C' }}>{selectedPath}</span>
            </h1>
            <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#002E51', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.875rem', cursor: saving ? 'not-allowed' : 'pointer' }}>
              <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>

          {message && (
            <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.875rem', fontWeight: 600, background: message.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: message.type === 'success' ? '#059669' : '#DC2626' }}>
              {message.text}
            </div>
          )}

          {hero ? (
            <>
              {/* IMAGE SETTINGS */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#002E51', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ImageIcon size={18} /> Apariencia Global
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>URL de Imagen de Fondo</label>
                    <input type="text" value={hero.image || ''} onChange={e => updateHero({ image: e.target.value })} style={inputStyle} placeholder="https://..." />
                  </div>
                  <div>
                    <label style={labelStyle}>Posición de Imagen</label>
                    <select value={hero.imagePosition || 'center'} onChange={e => updateHero({ imagePosition: e.target.value })} style={inputStyle}>
                      <option value="center">Centro</option>
                      <option value="top">Arriba</option>
                      <option value="bottom">Abajo</option>
                      <option value="right top">Arriba Derecha</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Opacidad / Overlay</label>
                    <select value={hero.overlayVariant || 'default'} onChange={e => updateHero({ overlayVariant: e.target.value })} style={inputStyle}>
                      <option value="default">Normal</option>
                      <option value="strong">Oscuro</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* TRANSLATIONS TABS */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                {(['es', 'en', 'fr'] as Language[]).map(l => (
                  <button key={l} onClick={() => setLang(l)} style={{ padding: '12px 24px', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', color: lang === l ? '#E4007C' : '#999', borderBottom: lang === l ? '2px solid #E4007C' : '2px solid transparent', textTransform: 'uppercase' }}>
                    {l}
                  </button>
                ))}
              </div>

              {/* TEXT CONTENT */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#002E51' }}>Textos de Portada</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Ceja (Texto pequeño superior)</label>
                    <input type="text" value={hero.eyebrow?.[lang] || ''} onChange={e => updateHeroField('eyebrow', e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Título Principal</label>
                      <input type="text" value={hero.title?.[lang] || ''} onChange={e => updateHeroField('title', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Título Énfasis (Cursiva)</label>
                      <input type="text" value={hero.titleEm?.[lang] || ''} onChange={e => updateHeroField('titleEm', e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Descripción</label>
                    <textarea value={hero.desc?.[lang] || ''} onChange={e => updateHeroField('desc', e.target.value)} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                  </div>
                </div>
              </div>

              {/* CTAS (BOTONES) */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#002E51' }}>Botones y Acciones</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  {/* CTA 1 */}
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#0f172a' }}>Botón Principal</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input type="text" placeholder={`Texto del Botón (${lang.toUpperCase()})`} value={hero.cta1?.text?.[lang] || ''} onChange={e => updateHero({ cta1: { ...hero.cta1, text: { ...hero.cta1?.text, [lang]: e.target.value } } })} style={inputStyle} />
                      <select value={hero.cta1?.action || 'link'} onChange={e => updateHero({ cta1: { ...hero.cta1, action: e.target.value } })} style={inputStyle}>
                        <option value="link">Ir a un Enlace</option>
                        <option value="popup">Abrir Formulario (Pop-up)</option>
                      </select>
                      {hero.cta1?.action !== 'popup' && (
                        <input type="text" placeholder="URL de destino" value={hero.cta1?.href || ''} onChange={e => updateHero({ cta1: { ...hero.cta1, href: e.target.value } })} style={inputStyle} />
                      )}
                    </div>
                  </div>
                  
                  {/* CTA 2 */}
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#0f172a' }}>Botón Secundario</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input type="text" placeholder={`Texto del Botón (${lang.toUpperCase()})`} value={hero.cta2?.text?.[lang] || ''} onChange={e => updateHero({ cta2: { ...hero.cta2, text: { ...hero.cta2?.text, [lang]: e.target.value } } })} style={inputStyle} />
                      <select value={hero.cta2?.action || 'link'} onChange={e => updateHero({ cta2: { ...hero.cta2, action: e.target.value } })} style={inputStyle}>
                        <option value="link">Ir a un Enlace</option>
                        <option value="popup">Abrir Formulario (Pop-up)</option>
                      </select>
                      {hero.cta2?.action !== 'popup' && (
                        <input type="text" placeholder="URL de destino" value={hero.cta2?.href || ''} onChange={e => updateHero({ cta2: { ...hero.cta2, href: e.target.value } })} style={inputStyle} />
                      )}
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
