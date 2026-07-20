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
  // Principales
  'home': { name: 'Inicio', url: '/' },
  'nav': { name: 'Menú Principal (Nav)', url: '/' },
  'hero': { name: 'Banners', url: '/' },
  'common': { name: 'Textos Globales (Footer)', url: '/' },
  
  // Expo Mexico Mujer
  'pages.expo.queEs': { name: '¿Qué es Expo México Mujer?', url: '/expo/que-es' },
  'pages.expo.industrias': { name: 'Industrias', url: '/expo/industrias' },
  'pages.expo.ottawa2026': { name: 'Expo México Mujer Ottawa 2026', url: '/expo/ottawa-2026' },
  'pages.visa': { name: 'Visas y Trámites', url: '/visa' },
  'pages.noticias': { name: 'Noticias', url: '/recursos' },

  // Get Involved (Participa)
  'pages.expositores': { name: 'Expositores', url: '/expositores' },
  'pages.patrocinadores': { name: 'Patrocinadores', url: '/patrocinadores' },
  'pages.embajadoras': { name: 'Embajadoras EMM', url: '/embajadoras' },
  'pages.aliados': { name: 'Aliados', url: '/aliados' },
  'pages.invitados': { name: 'Invitados Especiales', url: '/invitados' },
  'pages.compradores': { name: 'Compradores e Inversionistas', url: '/compradores' },

  // Agenda
  'pages.agenda': { name: 'Agenda General', url: '/agenda' },
  'pages.agenda.toronto2027': { name: 'Expo Toronto 2027', url: '/agenda/toronto-2027' },
  'pages.agenda.summit': { name: 'México Ontario Business Summit', url: '/agenda/business-summit' },
  'pages.agenda.gala': { name: 'Mexican Fashion Gala Show', url: '/agenda/fashion-gala' },
  'pages.agenda.forum': { name: 'Women Leaders Forum', url: '/agenda/leaders-forum' },
  'pages.agenda.mission': { name: 'Misión Comercial Montreal', url: '/agenda/montreal-mission' },

  // Academy
  'pages.academy': { name: 'Academy General', url: '/academy' },
  'pages.academy.english': { name: 'Online English', url: '/academy/online-english' },
  'pages.academy.skills': { name: 'Executive Global Skills', url: '/academy/executive-global-skills' },
  'pages.academy.business': { name: 'Business Training Agenda', url: '/academy/business-training' },

  // Information
  'pages.prensa': { name: 'Prensa', url: '/informacion/prensa' },
  'pages.participantes': { name: 'Manual del Expositor', url: '/informacion/participantes' },
  'pages.logistica': { name: 'Logística y Aduanas', url: '/informacion/logistica' },
  'pages.viajero': { name: 'Guía del Viajero', url: '/informacion/viajero' },

  // Contact
  'pages.contacto': { name: 'Contacto', url: '/contacto' },
};

const PAGE_GROUPS = [
  { group: 'Principales', items: ['home', 'nav', 'hero', 'common'] },
  { group: 'Expo México Mujer', items: ['pages.expo.queEs', 'pages.expo.industrias', 'pages.expo.ottawa2026', 'pages.visa', 'pages.noticias'] },
  { group: 'Get Involved', items: ['pages.expositores', 'pages.patrocinadores', 'pages.embajadoras', 'pages.aliados', 'pages.invitados', 'pages.compradores'] },
  { group: 'Agenda', items: ['pages.agenda', 'pages.agenda.toronto2027', 'pages.agenda.summit', 'pages.agenda.gala', 'pages.agenda.forum', 'pages.agenda.mission'] },
  { group: 'Academy', items: ['pages.academy', 'pages.academy.english', 'pages.academy.skills', 'pages.academy.business'] },
  { group: 'Información', items: ['pages.prensa', 'pages.participantes', 'pages.logistica', 'pages.viajero'] },
  { group: 'Contacto', items: ['pages.contacto'] }
];

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
          
          const cats = Object.keys(PAGES_CONFIG);
          setCategories(cats);
          if (cats.length > 0) setActiveCategory('home');
        }
      });

    const handleVisualUpdate = (e: MessageEvent) => {
      if (e.data && e.data.type === 'VISUAL_EDIT_UPDATE') {
        const { key, value, lang: iframeLang } = e.data;
        setFlatDict(prev => {
          const nextDict = {
            ...prev,
            [key]: { ...(prev[key] || { es: '', en: '', fr: '' }), [iframeLang]: value }
          };
          
          const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
              type: 'UPDATE_TRANSLATIONS',
              payload: unflattenTranslations(nextDict)
            }, '*');
          }
          
          return nextDict;
        });
      }
    };
    window.addEventListener('message', handleVisualUpdate);
    return () => window.removeEventListener('message', handleVisualUpdate);
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
    setFlatDict(prev => {
      const nextDict = {
        ...prev,
        [key]: { ...prev[key], [lang]: value }
      };
      
      // Update iframe live
      const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'UPDATE_TRANSLATIONS',
          payload: unflattenTranslations(nextDict)
        }, '*');
      }

      return nextDict;
    });
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
        {PAGE_GROUPS.map(group => (
          <div key={group.group} style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', paddingLeft: '8px' }}>
              {group.group}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {group.items.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: activeCategory === cat ? 'rgba(228,0,124,0.08)' : 'transparent',
                    color: activeCategory === cat ? '#E4007C' : '#333',
                    fontWeight: activeCategory === cat ? 700 : 500,
                    fontSize: '0.8rem',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={14} />
                    {PAGES_CONFIG[cat]?.name || cat}
                  </div>
                  {activeCategory === cat && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* PREVIEW FRAME */}
      <div style={{ background: '#eaeaea', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 82px)' }}>
        <div style={{ padding: '12px 16px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#002E51', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Type color="#E4007C" size={18} />
            {PAGES_CONFIG[activeCategory || '']?.name || activeCategory} (Vista Previa)
          </span>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* LANGUAGE TABS */}
            <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
              {(['es', 'en', 'fr'] as Language[]).map(l => (
                <button 
                  key={l} 
                  onClick={() => {
                    setLang(l);
                    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
                    if (iframe && iframe.contentWindow) {
                      iframe.contentWindow.postMessage({ type: 'CHANGE_LANGUAGE', lang: l }, '*');
                    }
                  }} 
                  style={{ 
                    padding: '6px 12px', border: 'none', 
                    background: lang === l ? '#fff' : 'transparent', 
                    boxShadow: lang === l ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem', 
                    color: lang === l ? '#E4007C' : '#64748b', 
                    borderRadius: '6px', textTransform: 'uppercase',
                    transition: 'all 0.2s'
                  }}>
                  {l}
                </button>
              ))}
            </div>

            {message && (
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: message.type === 'success' ? '#059669' : '#DC2626' }}>
                {message.text}
              </span>
            )}
            
            <button onClick={handleSave} disabled={saving} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#002E51', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
              <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            
            <button onClick={handlePreview} style={{ background: 'transparent', border: '1px solid rgba(0,46,81,0.2)', color: '#002E51', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, transition: 'all 0.2s' }}>
               <ExternalLink size={16} />
            </button>
          </div>
        </div>
        <iframe
          id="preview-iframe"
          src={activeCategory ? (PAGES_CONFIG[activeCategory]?.url || '/') + '?visualEdit=true' : '/?visualEdit=true'}
          style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
          title="Live Preview"
        />
      </div>
    </div>
  );
}
