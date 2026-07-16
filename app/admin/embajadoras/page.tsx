'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Save, X, Eye, FileText, Check, AlertCircle, MapPin, User, Image } from 'lucide-react';
import { Ambassador } from '../../data/embajadoras';

const STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de México',
  'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco',
  'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
  'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

const EMPTY_AMBASSADOR: Ambassador = {
  id: '',
  slug: '',
  name: '',
  state: 'Aguascalientes',
  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  description: { es: '', en: '', fr: '' } as any,
  booth: ''
};

/* ══════════════════════════════════════════════════════════════
   PREVIEW CARD
   ══════════════════════════════════════════════════════════════ */
function AmbassadorCardPreview({ data }: { data: Ambassador }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 15px 35px rgba(0,25,76,0.06)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      border: '1px solid rgba(0,0,0,0.04)',
      width: '100%',
      maxWidth: '340px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Profile Photo */}
      <div style={{ height: '240px', width: '100%', position: 'relative', background: '#e5e7eb' }}>
        {data.photo ? (
          <img src={data.photo} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={48} color="#999" />
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
      </div>

      {/* Card body */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E4007C', marginBottom: '4px' }}>
          Embajadora Oficial · {data.state}
        </span>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#002E51', margin: '0 0 8px', lineHeight: 1.2 }}>
          {data.name || 'Nombre de la Embajadora'}
        </h3>

        {data.booth && (
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#00A3A3', fontWeight: 700, fontSize: '0.75rem', margin: '0 0 16px' }}>
            <MapPin size={12} /> {data.booth}
          </p>
        )}

        <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#444', margin: '0 0 16px' }}>
          {data.description ? (() => { const d = data.description as any; return d?.es || d || 'Descripción...'; })() : 'Descripción o trayectoria de la embajadora...'}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */
export default function AdminEmbajadorasPage() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Ambassador | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [langTab, setLangTab] = useState<'es' | 'en' | 'fr'>('es');
  const editorRef = useRef<HTMLDivElement>(null);

  const loadAmbassadors = async () => {
    try {
      const res = await fetch('/api/admin/embajadoras');
      const data = await res.json();
      if (data.ambassadors) setAmbassadors(data.ambassadors);
    } catch {
      setMessage({ type: 'error', text: 'Error al cargar embajadoras' });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAmbassadors();
  }, []);

  const handleNew = () => {
    setEditing({ ...EMPTY_AMBASSADOR, id: `emb-${Date.now()}` });
    setIsNew(true);
    setMessage(null);
    setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/embajadoras/${id}`);
      const data = await res.json();
      if (data.ambassador) {
        setEditing(data.ambassador);
        setIsNew(false);
        setMessage(null);
        setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } catch {
      setMessage({ type: 'error', text: 'Error al cargar embajadora' });
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.name.trim()) {
      setMessage({ type: 'error', text: 'El nombre de la embajadora es obligatorio' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/embajadoras', {
        method,
        headers,
        body: JSON.stringify(editing),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Error al guardar' });
        setSaving(false);
        return;
      }

      setMessage({ type: 'success', text: isNew ? 'Embajadora creada exitosamente' : 'Embajadora actualizada exitosamente' });
      await loadAmbassadors();
      if (isNew) {
        setEditing(null);
        setIsNew(false);
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/admin/embajadoras', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Error al eliminar' });
        return;
      }

      setMessage({ type: 'success', text: 'Embajadora eliminada' });
      if (editing?.id === id) {
        setEditing(null);
        setIsNew(false);
      }
      setShowDeleteConfirm(null);
      await loadAmbassadors();
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
  };

  const updateField = (field: string, value: any) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  const updateLocalizedField = (field: string, lang: string, value: string) => {
    if (!editing) return;
    const current: any = (editing as any)[field] || { es: '', en: '', fr: '' };
    const updated = typeof current === 'object' && current !== null ? { ...current, [lang]: value } : { es: '', en: '', fr: '', [lang]: value };
    setEditing({ ...editing, [field]: updated });
  };

  const getLocalizedValue = (field: string, lang: string): string => {
    if (!editing) return '';
    const val: any = (editing as any)[field];
    if (!val) return '';
    if (typeof val === 'string') return lang === 'es' ? val : '';
    return val[lang] || '';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 991px) {
          .embajadoras-list-panel {
            display: ${editing ? 'none' : 'flex'} !important;
            width: 100% !important;
            min-width: 100% !important;
          }
          .embajadoras-editor-panel {
            display: ${editing ? 'block' : 'none'} !important;
            width: 100% !important;
          }
          .embajadoras-editor-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .embajadoras-editor-padding {
            padding: 20px 16px !important;
          }
        }
        @media (max-width: 576px) {
          .embajadoras-sub-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* ── LEFT PANEL: List ── */}
      <div className="embajadoras-list-panel" style={{
        width: '380px',
        minWidth: '380px',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        background: '#FAF9F6',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}>
        {/* Header */}
        <div style={{
          padding: '28px 20px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fff',
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#002E51', letterSpacing: '-0.01em' }}>Embajadoras</h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#888' }}>{ambassadors.length} registradas</p>
          </div>
          <button
            onClick={handleNew}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '100px',
              border: 'none',
              background: 'linear-gradient(135deg, #E4007C 0%, #FF4081 100%)',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(228,0,124,0.2)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(228,0,124,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(228,0,124,0.2)';
            }}
          >
            <Plus size={16} />
            Nueva
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 12px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888', fontSize: '0.9rem' }}>Cargando...</div>
          ) : ambassadors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              <p style={{ margin: '0 0 4px', fontWeight: 600 }}>No hay embajadoras aún</p>
              <p style={{ margin: 0, fontSize: '0.8rem' }}>Crea la primera embajadora</p>
            </div>
          ) : (
            ambassadors.map(amb => (
              <div
                key={amb.id}
                onClick={() => handleEdit(amb.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  background: editing?.id === amb.id ? 'rgba(228,0,124,0.03)' : '#fff',
                  border: `1px solid ${editing?.id === amb.id ? 'rgba(228,0,124,0.2)' : 'rgba(0,0,0,0.05)'}`,
                  boxShadow: editing?.id === amb.id ? '0 4px 12px rgba(228,0,124,0.04)' : '0 2px 4px rgba(0,0,0,0.01)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
                onMouseEnter={e => {
                  if (editing?.id !== amb.id) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(228,0,124,0.15)';
                  }
                }}
                onMouseLeave={e => {
                  if (editing?.id !== amb.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.01)';
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                  }
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#f3f4f6',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}>
                  {amb.photo ? (
                    <img src={amb.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <User size={18} color="#9ca3af" />
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#002E51', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {amb.name || 'Sin nombre'}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '2px 8px',
                      borderRadius: '100px',
                      background: 'rgba(0,46,81,0.05)',
                      color: '#002E51',
                      fontWeight: 600,
                    }}>
                      {amb.state}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(amb.id); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ccc',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#E4007C';
                    e.currentTarget.style.background = 'rgba(228,0,124,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#ccc';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── RIGHT PANEL: Editor + Preview ── */}
      <div className="embajadoras-editor-panel" ref={editorRef} style={{ flex: 1, overflow: 'auto', background: '#F4F5F7' }}>
        {!editing ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            background: 'linear-gradient(135deg, #F8F9FA 0%, #EAEFF5 100%)',
            padding: '40px',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '24px',
              padding: '48px 32px',
              maxWidth: '420px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,25,76,0.03)',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(228,0,124,0.08)',
                color: '#E4007C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 0 0 10px rgba(228,0,124,0.02)',
              }}>
                <User size={28} />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 800, color: '#002E51' }}>Gestión de Embajadoras</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.6 }}>
                Selecciona una embajadora de la lista para editar sus datos, o haz clic en <strong>"+ Nueva"</strong> para registrar una nueva representante estatal.
              </p>
            </div>
          </div>
        ) : (
          <div className="embajadoras-editor-padding" style={{ padding: '32px' }}>
            {/* Messages */}
            {message && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                background: message.type === 'success' ? 'rgba(0,200,83,0.08)' : 'rgba(228,0,124,0.08)',
                color: message.type === 'success' ? '#00C853' : '#E4007C',
                border: `1px solid ${message.type === 'success' ? 'rgba(0,200,83,0.2)' : 'rgba(228,0,124,0.2)'}`,
              }}>
                {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                {message.text}
              </div>
            )}

            {/* Delete confirmation */}
            {showDeleteConfirm && (
              <div style={{
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px',
                background: '#fff',
                border: '1px solid rgba(228,0,124,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '0.9rem', color: '#111' }}>¿Eliminar esta embajadora?</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setShowDeleteConfirm(null)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Cancelar
                  </button>
                  <button onClick={() => handleDelete(showDeleteConfirm)} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#E4007C', color: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Eliminar
                  </button>
                </div>
              </div>
            )}

            {/* Editor Grid */}
            <div className="embajadoras-editor-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px' }}>
              {/* ── LEFT: Form ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111' }}>
                    {isNew ? 'Nueva Embajadora' : 'Editar Embajadora'}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => { setEditing(null); setIsNew(false); }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <X size={14} /> Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      style={{
                        padding: '8px 20px',
                        borderRadius: '6px',
                        border: 'none',
                        background: saving ? '#ccc' : '#E4007C',
                        color: '#fff',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Save size={14} /> {saving ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)' }}>
                  
                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      value={editing.name}
                      onChange={e => updateField('name', e.target.value)}
                      placeholder="Ej: Claudia Ramírez"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={editing.slug}
                      onChange={e => updateField('slug', e.target.value)}
                      placeholder="claudia-ramirez"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontFamily: 'monospace',
                      }}
                    />
                  </div>

                  {/* State & Booth */}
                  <div className="embajadoras-sub-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Estado Representante
                      </label>
                      <select
                        value={editing.state}
                        onChange={e => updateField('state', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: '1px solid rgba(0,0,0,0.1)',
                          fontSize: '0.95rem',
                          outline: 'none',
                          background: '#fff',
                        }}
                      >
                        {STATES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Stand / Mesa de Trabajo
                      </label>
                      <input
                        type="text"
                        value={editing.booth}
                        onChange={e => updateField('booth', e.target.value)}
                        placeholder="Ej: Pabellón Jalisco – Mesa A-01"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: '1px solid rgba(0,0,0,0.1)',
                          fontSize: '0.95rem',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                      Foto de Perfil (URL)
                    </label>
                    <input
                      type="text"
                      value={editing.photo}
                      onChange={e => updateField('photo', e.target.value)}
                      placeholder="https://ejemplo.com/embajadora.jpg"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Description / Bio - Multilingual */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#555' }}>Descripción / Trayectoria Profesional</label>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {(['es', 'en', 'fr'] as const).map(l => (
                          <button key={l} onClick={() => setLangTab(l)} style={{
                            padding: '3px 10px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700,
                            background: langTab === l ? '#E4007C' : 'rgba(0,0,0,0.06)',
                            color: langTab === l ? '#fff' : '#666',
                            transition: 'all 0.15s',
                          }}>{l.toUpperCase()}</button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      value={getLocalizedValue('description', langTab)}
                      onChange={e => updateLocalizedField('description', langTab, e.target.value)}
                      placeholder={`Trayectoria en ${langTab === 'es' ? 'Español' : langTab === 'en' ? 'English' : 'Français'}...`}
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                </div>
              </div>

              {/* ── RIGHT: Preview ── */}
              <div>
                <h3 style={{ margin: '0 0 24px', fontSize: '1.2rem', fontWeight: 700, color: '#111' }}>
                  Vista Previa
                </h3>
                <div style={{
                  position: 'sticky',
                  top: '32px',
                  background: '#eaeaea',
                  padding: '40px 20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <AmbassadorCardPreview data={editing} />
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
