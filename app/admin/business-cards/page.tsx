'use client';

import { useState, useEffect } from 'react';
import { Save, Check, AlertCircle, User, Plus, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface LocalizedString { es: string; en: string; fr: string; }
interface LocalizedStringArray { es: string[]; en: string[]; fr: string[]; }
type Language = 'es' | 'en' | 'fr';

interface Stat { num: string; label: string; }
interface BusinessCard {
  id: string;
  slug: string;
  nombre: string;
  cargo: LocalizedString;
  empresa: string;
  ciudad: string;
  email: string;
  telefono: string;
  whatsapp: string;
  website: string;
  linkedin: string;
  instagram: string;
  foto: string;
  bio: LocalizedString;
  bio2: LocalizedString;
  quote: LocalizedString;
  stats: Stat[];
  fullBio: LocalizedStringArray;
  vision: LocalizedStringArray;
}

export default function AdminBusinessCards() {
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<BusinessCard | null>(null);
  const [lang, setLang] = useState<Language>('es');
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/business-cards')
      .then(r => r.json())
      .then(d => {
        if (d.cards) {
          setCards(d.cards);
          if (d.cards.length > 0 && !selected) {
            setSelected(d.cards[0].id);
            setEditing(JSON.parse(JSON.stringify(d.cards[0])));
          }
        }
      });
  }, []);

  const handleSelect = (id: string) => {
    const card = cards.find(c => c.id === id);
    if (card) {
      setSelected(id);
      setEditing(JSON.parse(JSON.stringify(card)));
      setIsNew(false);
      setMessage(null);
    }
  };

  const handleCreateNew = () => {
    const emptyCard: BusinessCard = {
      id: '', slug: '', nombre: 'Nueva Business Card',
      cargo: { es: '', en: '', fr: '' }, empresa: '', ciudad: '',
      email: '', telefono: '', whatsapp: '', website: '',
      linkedin: '', instagram: '', foto: '',
      bio: { es: '', en: '', fr: '' }, bio2: { es: '', en: '', fr: '' },
      quote: { es: '', en: '', fr: '' },
      stats: [], fullBio: { es: [], en: [], fr: [] }, vision: { es: [], en: [], fr: [] }
    };
    setSelected(null);
    setEditing(emptyCard);
    setIsNew(true);
    setMessage(null);
  };

  const update = (field: keyof BusinessCard, value: any) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  const updateLoc = (field: keyof BusinessCard, value: string) => {
    if (!editing) return;
    const currentLoc = (editing as any)[field] || { es: '', en: '', fr: '' };
    setEditing({ ...editing, [field]: { ...currentLoc, [lang]: value } });
  };

  const updateLocArray = (field: 'fullBio' | 'vision', idx: number, value: string) => {
    if (!editing) return;
    const currentLocArray = editing[field] || { es: [], en: [], fr: [] };
    const currentArray = currentLocArray[lang] ? [...currentLocArray[lang]] : [];
    currentArray[idx] = value;
    setEditing({ ...editing, [field]: { ...currentLocArray, [lang]: currentArray } });
  };

  const addLocArrayItem = (field: 'fullBio' | 'vision') => {
    if (!editing) return;
    const currentLocArray = editing[field] || { es: [], en: [], fr: [] };
    const currentArray = currentLocArray[lang] ? [...currentLocArray[lang]] : [];
    currentArray.push('');
    setEditing({ ...editing, [field]: { ...currentLocArray, [lang]: currentArray } });
  };

  const removeLocArrayItem = (field: 'fullBio' | 'vision', idx: number) => {
    if (!editing) return;
    const currentLocArray = editing[field] || { es: [], en: [], fr: [] };
    const currentArray = currentLocArray[lang] ? [...currentLocArray[lang]] : [];
    currentArray.splice(idx, 1);
    setEditing({ ...editing, [field]: { ...currentLocArray, [lang]: currentArray } });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/admin/business-cards', {
        method: isNew ? 'POST' : 'PUT',
        headers,
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Error al guardar' });
      } else {
        setMessage({ type: 'success', text: `Business card ${isNew ? 'creada' : 'guardada'} exitosamente ✓` });
        if (isNew) {
          setCards([...cards, data.card]);
          setSelected(data.card.id);
          setEditing(data.card);
          setIsNew(false);
        } else {
          setCards(prev => prev.map(c => c.id === editing.id ? JSON.parse(JSON.stringify(editing)) : c));
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!editing || isNew) return;
    if (!confirm('¿Estás seguro de eliminar esta Business Card? Esta acción no se puede deshacer.')) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/admin/business-cards', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id: editing.id }),
      });
      if (res.ok) {
        const newCards = cards.filter(c => c.id !== editing.id);
        setCards(newCards);
        if (newCards.length > 0) {
          handleSelect(newCards[0].id);
        } else {
          setEditing(null);
          setSelected(null);
        }
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Error al eliminar' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.875rem',
    fontFamily: 'inherit', boxSizing: 'border-box', background: '#fff',
    color: '#111', outline: 'none',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.75rem', fontWeight: 700,
    color: '#002E51', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em',
  };
  const sectionStyle: React.CSSProperties = {
    background: '#fff', borderRadius: '16px', padding: '24px',
    border: '1px solid rgba(0,0,0,0.06)', marginBottom: '20px',
  };

  const activeLocArray = (field: 'fullBio' | 'vision') => {
    if (!editing) return [];
    if (!editing[field]) return [];
    if (!editing[field][lang]) return [];
    return editing[field][lang];
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(100vh - 82px)' }}>

      {/* ── SIDEBAR ── */}
      <div style={{ background: '#fff', borderRight: '1px solid rgba(0,0,0,0.07)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: '0 0 0 8px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51' }}>Business Cards</h2>
          <button
            onClick={handleCreateNew}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: '#E4007C', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
          >
            <Plus size={14} /> Nueva
          </button>
        </div>
        {cards.map(c => (
          <button
            key={c.id}
            onClick={() => handleSelect(c.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
              background: selected === c.id ? 'rgba(228,0,124,0.08)' : 'transparent',
              color: selected === c.id ? '#E4007C' : '#333',
              fontWeight: selected === c.id ? 700 : 500,
              transition: 'all 0.15s',
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', overflow: 'hidden', flexShrink: 0 }}>
              {c.foto
                ? <img src={c.foto} alt={c.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <User size={20} color="#aaa" style={{ margin: '10px' }} />
              }
            </div>
            <div>
              <div style={{ fontSize: '0.875rem' }}>{c.nombre}</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.6, fontWeight: 400 }}>{c.cargo?.es || '—'}</div>
            </div>
          </button>
        ))}
      </div>

      {/* ── EDITOR ── */}
      {editing ? (
        <div style={{ padding: '32px', overflowY: 'auto', background: '#F9F7F5' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#002E51' }}>{editing.nombre}</h1>
                <a 
                  href={`/${editing.slug}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', background: 'rgba(0,46,81,0.06)', color: '#002E51', textDecoration: 'none' }}
                >
                  <ExternalLink size={12} /> Ver público
                </a>
              </div>
              
              {/* Language switcher */}
              <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '8px', display: 'inline-flex' }}>
                {(['es', 'en', 'fr'] as Language[]).map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      padding: '4px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                      fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                      background: lang === l ? '#fff' : 'transparent',
                      color: lang === l ? '#E4007C' : '#666',
                      boxShadow: lang === l ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
                    }}
                  >
                    {l === 'es' ? 'Español' : l === 'en' ? 'English' : 'Français'}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              {!isNew && (
                <button
                  onClick={handleDelete}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px',
                    background: 'transparent', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px',
                    fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  <X size={16} /> Eliminar
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                  background: '#002E51', color: '#fff', border: 'none', borderRadius: '10px',
                  fontWeight: 700, fontSize: '0.875rem', cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.7 : 1, transition: 'all 0.2s',
                }}
              >
                <Save size={16} />
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
              borderRadius: '10px', marginBottom: '20px', fontSize: '0.875rem',
              background: message.type === 'success' ? 'rgba(0,200,83,0.08)' : 'rgba(228,0,124,0.08)',
              color: message.type === 'success' ? '#00A855' : '#E4007C',
              border: `1px solid ${message.type === 'success' ? 'rgba(0,200,83,0.2)' : 'rgba(228,0,124,0.2)'}`,
            }}>
              {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </div>
          )}

          {/* ── DATOS BÁSICOS (Globales / No traducidos) ── */}
          <div style={sectionStyle}>
            <h3 style={{ margin: '0 0 20px', fontSize: '0.875rem', fontWeight: 700, color: '#E4007C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Datos Generales (Global)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { field: 'slug', label: 'Slug (URL)' },
                { field: 'nombre', label: 'Nombre completo' },
                { field: 'empresa', label: 'Empresa' },
                { field: 'ciudad', label: 'Ciudad' },
                { field: 'email', label: 'Email' },
                { field: 'telefono', label: 'Teléfono' },
                { field: 'whatsapp', label: 'WhatsApp (solo números, con código país)' },
                { field: 'website', label: 'Sitio web' },
                { field: 'linkedin', label: 'LinkedIn URL' },
                { field: 'instagram', label: 'Instagram URL' },
                { field: 'foto', label: 'URL / ruta de la foto' },
              ].map(({ field, label }) => (
                <div key={field} style={field === 'linkedin' || field === 'instagram' || field === 'foto' || field === 'whatsapp' ? { gridColumn: '1 / -1' } : {}}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    type="text"
                    value={(editing as any)[field] || ''}
                    onChange={e => update(field as keyof BusinessCard, e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── DATOS TRADUCIBLES ── */}
          <div style={sectionStyle}>
            <h3 style={{ margin: '0 0 20px', fontSize: '0.875rem', fontWeight: 700, color: '#E4007C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Textos ({lang.toUpperCase()})</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Cargo</label>
              <input type="text" value={editing.cargo?.[lang] || ''} onChange={e => updateLoc('cargo', e.target.value)} style={inputStyle} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Bio corta (se muestra en el hero)</label>
                <textarea rows={3} value={editing.bio?.[lang] || ''} onChange={e => updateLoc('bio', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <div>
                <label style={labelStyle}>Bio secundaria</label>
                <textarea rows={3} value={editing.bio2?.[lang] || ''} onChange={e => updateLoc('bio2', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <div>
                <label style={labelStyle}>Cita destacada (quote)</label>
                <input type="text" value={editing.quote?.[lang] || ''} onChange={e => updateLoc('quote', e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* ── SEMBLANZA COMPLETA ── */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: '#E4007C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Semblanza completa ({lang.toUpperCase()})</h3>
              <button
                onClick={() => addLocArrayItem('fullBio')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(228,0,124,0.08)', color: '#E4007C', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}
              >
                <Plus size={14} /> Agregar párrafo
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeLocArray('fullBio').map((para, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%', background: '#002E51', color: '#fff', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>{idx + 1}</div>
                  <textarea
                    rows={3}
                    value={para}
                    onChange={e => updateLocArray('fullBio', idx, e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical', flex: 1 }}
                    placeholder={`Párrafo ${idx + 1}...`}
                  />
                  <button
                    onClick={() => removeLocArrayItem('fullBio', idx)}
                    style={{ marginTop: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '4px' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {activeLocArray('fullBio').length === 0 && (
                <div style={{ fontSize: '0.875rem', color: '#999', fontStyle: 'italic' }}>No hay párrafos en {lang.toUpperCase()}.</div>
              )}
            </div>
          </div>

          {/* ── VISIÓN ── */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: '#E4007C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Visión ({lang.toUpperCase()})</h3>
              <button
                onClick={() => addLocArrayItem('vision')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(228,0,124,0.08)', color: '#E4007C', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}
              >
                <Plus size={14} /> Agregar párrafo
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeLocArray('vision').map((para, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <textarea
                    rows={3}
                    value={para}
                    onChange={e => updateLocArray('vision', idx, e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical', flex: 1 }}
                    placeholder={`Párrafo de visión ${idx + 1}...`}
                  />
                  <button
                    onClick={() => removeLocArrayItem('vision', idx)}
                    style={{ marginTop: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '4px' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {activeLocArray('vision').length === 0 && (
                <div style={{ fontSize: '0.875rem', color: '#999', fontStyle: 'italic' }}>No hay párrafos en {lang.toUpperCase()}.</div>
              )}
            </div>
          </div>

          {/* ── PREVIEW CARD ── */}
          <div style={{ ...sectionStyle, background: 'linear-gradient(135deg, #002E51 0%, #001a30 100%)', color: '#fff' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '0.875rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vista previa ({lang.toUpperCase()})</h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }}>
                {editing.foto && <img src={editing.foto} alt={editing.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>{editing.nombre || '—'}</div>
                <div style={{ fontSize: '0.8rem', color: '#E4007C', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{editing.cargo?.[lang] || ''}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{editing.empresa} · {editing.ciudad}</div>
              </div>
            </div>
            {editing.quote?.[lang] && (
              <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: '3px solid #E4007C', fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                "{editing.quote[lang]}"
              </div>
            )}
          </div>

        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F7F5' }}>
          <div style={{ textAlign: 'center', color: '#999' }}>
            <User size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <p>Selecciona una business card para editar</p>
          </div>
        </div>
      )}
    </div>
  );
}
