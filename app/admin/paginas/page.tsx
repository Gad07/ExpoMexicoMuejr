'use client';

import React, { useState, useEffect } from 'react';
import { Save, Search, Type, ChevronRight, FileText, ExternalLink } from 'lucide-react';

type Language = 'es' | 'en' | 'fr';

// Helper to flatten nested object until finding {es, en, fr}
const flattenTranslations = (obj: any, prefix = ''): Record<string, {es:string, en:string, fr:string}> => {
  return Object.keys(obj).reduce((acc: any, k: string) => {
    const pre = prefix.length ? prefix + '.' : '';
    const val = obj[k];
    if (val && typeof val === 'object' && ('es' in val || 'en' in val || 'fr' in val)) {
      acc[pre + k] = val;
    } else if (val && typeof val === 'object') {
      Object.assign(acc, flattenTranslations(val, pre + k));
    }
    return acc;
  }, {});
};

// Helper to unflatten back into nested object
const unflattenTranslations = (flat: Record<string, any>): any => {
  const result: any = {};
  for (const key in flat) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = flat[key];
  }
  return result;
};

// Definimos la relación de claves con su ruta de preview real
const PAGES_CONFIG: Record<string, { name: string; url: string }> = {
  'home': { name: 'Inicio', url: '/' },
  'nav': { name: 'Menú Principal (Nav)', url: '/' },
  'visa': { name: 'Visas', url: '/visa' },
  'agenda': { name: 'Agenda y Programa', url: '/programa/actividades-especiales' },
  'contacto': { name: 'Contacto', url: '/contacto' },
  'common': { name: 'Textos Globales (Footer)', url: '/' }
};

export default function AdminTextos() {
  const [translations, setTranslations] = useState<any>({});
  const [flatDict, setFlatDict] = useState<Record<string, {es:string, en:string, fr:string}>>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const [lang, setLang] = useState<Language>('es');
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/translations')
      .then(r => r.json())
      .then(d => {
        if (d.translations) {
          setTranslations(d.translations);
          const flat = flattenTranslations(d.translations);
          setFlatDict(flat);
          
          const cats = Array.from(new Set(Object.keys(flat).map(k => k.split('.')[0])));
          setCategories(cats);
          if (cats.length > 0) setActiveCategory(cats[0]);
        }
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const nested = unflattenTranslations(flatDict);
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      
      const res = await fetch('/api/admin/translations', {
        method: 'POST',
        headers,
        body: JSON.stringify(nested),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Error al guardar' });
      } else {
        setMessage({ type: 'success', text: 'Páginas actualizadas exitosamente ✓' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
    setSaving(false);
  };

  const handleUpdate = (key: string, value: string) => {
    setFlatDict(prev => ({
      ...prev,
      [key]: { ...prev[key], [lang]: value }
    }));
  };

  const handlePreview = () => {
    if (!activeCategory) return;
    const url = PAGES_CONFIG[activeCategory]?.url || '/';
    window.open(url, '_blank');
  };

  const visibleKeys = Object.keys(flatDict).filter(k => {
    const isCategory = k.startsWith(activeCategory + '.');
    if (!isCategory) return false;
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const matchesKey = k.toLowerCase().includes(searchLower);
    const text = flatDict[k]?.[lang] || '';
    const matchesText = text.toLowerCase().includes(searchLower);
    return matchesKey || matchesText;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(100vh - 82px)' }}>
      {/* SIDEBAR */}
      <div style={{ background: '#fff', borderRight: '1px solid rgba(0,0,0,0.07)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
        <h2 style={{ margin: '0 0 16px 8px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51' }}>Páginas</h2>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
              background: activeCategory === cat ? 'rgba(228,0,124,0.08)' : 'transparent',
              color: activeCategory === cat ? '#E4007C' : '#333',
              fontWeight: activeCategory === cat ? 700 : 500,
              fontSize: '0.85rem',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} />
              {PAGES_CONFIG[cat]?.name || cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
            {activeCategory === cat && <ChevronRight size={16} />}
          </button>
        ))}
      </div>

      {/* EDITOR */}
      <div style={{ padding: '32px 40px', overflowY: 'auto', background: '#F9F7F5' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', padding: '32px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#002E51', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Type color="#E4007C" />
              Gestor de Contenido: {PAGES_CONFIG[activeCategory || '']?.name || activeCategory}
            </h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handlePreview} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '10px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
                <ExternalLink size={16} /> Vista Previa
              </button>
              <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#002E51', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.875rem', cursor: saving ? 'not-allowed' : 'pointer' }}>
                <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>

          {message && (
            <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.875rem', fontWeight: 600, background: message.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: message.type === 'success' ? '#059669' : '#DC2626' }}>
              {message.text}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '24px' }}>
            {/* LANGUAGE TABS */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(0,0,0,0.06)', flex: 1 }}>
              {(['es', 'en', 'fr'] as Language[]).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ padding: '12px 24px', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', color: lang === l ? '#E4007C' : '#999', borderBottom: lang === l ? '2px solid #E4007C' : '2px solid transparent', textTransform: 'uppercase' }}>
                  {l}
                </button>
              ))}
            </div>

            {/* SEARCH */}
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="Buscar texto o campo..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {visibleKeys.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', background: '#f8fafc', borderRadius: '12px' }}>
                No se encontraron textos que coincidan con la búsqueda.
              </div>
            ) : (
              visibleKeys.map(key => {
                const text = flatDict[key]?.[lang] || '';
                const isLongText = text.length > 80;
                
                return (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.5px' }}>
                      {key.replace(activeCategory + '.', '')}
                    </div>
                    {isLongText ? (
                      <textarea 
                        value={text} 
                        onChange={e => handleUpdate(key, e.target.value)}
                        style={{ width: '100%', minHeight: '80px', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.875rem', outline: 'none', resize: 'vertical' }}
                      />
                    ) : (
                      <input 
                        type="text" 
                        value={text} 
                        onChange={e => handleUpdate(key, e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.875rem', outline: 'none' }}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
