'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Save, X, Eye, Image, FileText, Check, AlertCircle, MapPin, Globe, Mail, Users } from 'lucide-react';
import { Exhibitor } from '../../data/expositores';

const STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de México',
  'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco',
  'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
  'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

const CATEGORIES = [
  'Gastronomía', 'Tecnología', 'Educación', 'Energía', 'Transporte y Logística', 'Turismo',
  'Restaurantes', 'Textiles', 'Arte y Cultura', 'Bienes Raíces', 'Salud y Belleza', 'Artesanías', 'Moda y Textiles'
];

const EMPTY_EXHIBITOR: Exhibitor = {
  id: '',
  slug: '',
  name: '',
  personName: '',
  description: { es: '', en: '', fr: '' } as any,
  state: 'Aguascalientes',
  category: 'Artesanías',
  website: '',
  social: '',
  contact: '',
  booth: '',
  logo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=150&q=80',
  personPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  bio: { es: '', en: '', fr: '' } as any,
  gallery: [],
  mapImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
  mapCoords: '50,50'
};

/* ══════════════════════════════════════════════════════════════
   PREVIEW CARD
   ══════════════════════════════════════════════════════════════ */
function ExhibitorCardPreview({ data }: { data: Exhibitor }) {
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
      {/* Cover image */}
      <div style={{ height: '140px', width: '100%', position: 'relative', background: '#e5e7eb' }}>
        {data.gallery && data.gallery.length > 0 && (
          <img src={data.gallery[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' }} />
      </div>

      {/* Floating logo */}
      <div style={{
        width: '64px',
        height: '64px',
        background: '#fff',
        borderRadius: '50%',
        padding: '4px',
        position: 'absolute',
        top: '110px',
        left: '20px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {data.logo ? (
          <img src={data.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image size={24} color="#999" />
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '48px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E4007C', marginBottom: '4px' }}>
          {data.category} · {data.state}
        </span>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#002E51', margin: '0 0 4px', lineHeight: 1.2 }}>
          {data.name || 'Nombre de la Marca'}
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#666', margin: '0 0 12px' }}>
          por {data.personName || 'Nombre Representante'}
        </p>

        {data.booth && (
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#E4007C', fontWeight: 700, fontSize: '0.72rem', margin: '0 0 12px' }}>
            <MapPin size={12} /> {data.booth}
          </p>
        )}

        <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#444', margin: '0 0 16px' }}>
          {(() => {
            const d = data.description;
            if (!d) return 'Breve descripción de la marca o de su propuesta de negocio...';
            const v = typeof d === 'object' ? (d.es || '') : String(d);
            return v ? (v.length > 100 ? v.substring(0, 100) + '...' : v) : 'Breve descripción...';
          })()}
        </p>

        <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', marginTop: 'auto', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px' }}>
          {data.website && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#00A3A3' }}><Globe size={12} /> Web</span>}
          {data.contact && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#002E51' }}><Mail size={12} /> Email</span>}
          {data.social && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#C79E45' }}>IG: {data.social}</span>}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */
export default function AdminExpositoresPage() {
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Exhibitor | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [showGalleryInput, setShowGalleryInput] = useState(false);
  const [langTab, setLangTab] = useState<'es' | 'en' | 'fr'>('es');
  const editorRef = useRef<HTMLDivElement>(null);

  const loadExhibitors = async () => {
    try {
      const res = await fetch('/api/admin/expositores');
      const data = await res.json();
      if (data.exhibitors) setExhibitors(data.exhibitors);
    } catch {
      setMessage({ type: 'error', text: 'Error al cargar expositores' });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadExhibitors();
  }, []);

  const handleNew = () => {
    setEditing({ ...EMPTY_EXHIBITOR, id: Date.now().toString() });
    setIsNew(true);
    setMessage(null);
    setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/expositores/${id}`);
      const data = await res.json();
      if (data.exhibitor) {
        setEditing(data.exhibitor);
        setIsNew(false);
        setMessage(null);
        setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } catch {
      setMessage({ type: 'error', text: 'Error al cargar expositor' });
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.name.trim()) {
      setMessage({ type: 'error', text: 'El nombre comercial de la marca es obligatorio' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/expositores', {
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

      setMessage({ type: 'success', text: isNew ? 'Expositor creado exitosamente' : 'Expositor actualizado exitosamente' });
      await loadExhibitors();
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

      const res = await fetch('/api/admin/expositores', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Error al eliminar' });
        return;
      }

      setMessage({ type: 'success', text: 'Expositor eliminado' });
      if (editing?.id === id) {
        setEditing(null);
        setIsNew(false);
      }
      setShowDeleteConfirm(null);
      await loadExhibitors();
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

  const addGalleryImage = () => {
    if (!editing || !newGalleryUrl.trim()) return;
    setEditing({
      ...editing,
      gallery: [...(editing.gallery || []), newGalleryUrl.trim()],
    });
    setNewGalleryUrl('');
    setShowGalleryInput(false);
  };

  const removeGalleryImage = (index: number) => {
    if (!editing) return;
    const imgs = [...(editing.gallery || [])];
    imgs.splice(index, 1);
    setEditing({ ...editing, gallery: imgs });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 991px) {
          .expositores-list-panel {
            display: ${editing ? 'none' : 'flex'} !important;
            width: 100% !important;
            min-width: 100% !important;
          }
          .expositores-editor-panel {
            display: ${editing ? 'block' : 'none'} !important;
            width: 100% !important;
          }
          .expositores-editor-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .expositores-editor-padding {
            padding: 20px 16px !important;
          }
        }
        @media (max-width: 576px) {
          .expositores-sub-grid-2,
          .expositores-sub-grid-3 {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* ── LEFT PANEL: List ── */}
      <div className="expositores-list-panel" style={{
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
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#002E51', letterSpacing: '-0.01em' }}>Expositores</h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#888' }}>{exhibitors.length} marcas</p>
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
            Nuevo
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 12px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888', fontSize: '0.9rem' }}>Cargando...</div>
          ) : exhibitors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              <p style={{ margin: '0 0 4px', fontWeight: 600 }}>No hay expositores aún</p>
              <p style={{ margin: 0, fontSize: '0.8rem' }}>Crea el primer expositor</p>
            </div>
          ) : (
            exhibitors.map(ex => (
              <div
                key={ex.id}
                onClick={() => handleEdit(ex.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  background: editing?.id === ex.id ? 'rgba(228,0,124,0.03)' : '#fff',
                  border: `1px solid ${editing?.id === ex.id ? 'rgba(228,0,124,0.2)' : 'rgba(0,0,0,0.05)'}`,
                  boxShadow: editing?.id === ex.id ? '0 4px 12px rgba(228,0,124,0.04)' : '0 2px 4px rgba(0,0,0,0.01)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
                onMouseEnter={e => {
                  if (editing?.id !== ex.id) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(228,0,124,0.15)';
                  }
                }}
                onMouseLeave={e => {
                  if (editing?.id !== ex.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.01)';
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                  }
                }}
              >
                {/* Brand Logo Avatar */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#f3f4f6',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}>
                  {ex.logo ? (
                    <img src={ex.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
                  ) : (
                    <Users size={18} color="#9ca3af" />
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#002E51', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ex.name || 'Sin nombre'}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: '#666', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {ex.personName || 'Sin representante'}
                    </span>
                    <span style={{
                      fontSize: '0.6rem',
                      padding: '1px 6px',
                      borderRadius: '100px',
                      background: 'rgba(228,0,124,0.05)',
                      color: '#E4007C',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}>
                      {ex.category}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(ex.id); }}
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
      <div className="expositores-editor-panel" ref={editorRef} style={{ flex: 1, overflow: 'auto', background: '#F4F5F7' }}>
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
                <Users size={28} />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 800, color: '#002E51' }}>Gestión de Expositores</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.6 }}>
                Selecciona un expositor de la lista para editar sus datos, o haz clic en <strong>"+ Nuevo"</strong> para registrar una nueva marca o empresa.
              </p>
            </div>
          </div>
        ) : (
          <div className="expositores-editor-padding" style={{ padding: '32px' }}>
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
                <span style={{ fontSize: '0.9rem', color: '#111' }}>¿Eliminar este expositor?</span>
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
            <div className="expositores-editor-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px' }}>
              {/* ── LEFT: Form ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111' }}>
                    {isNew ? 'Nuevo Expositor' : 'Editar Expositor'}
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
                  
                  {/* Brand name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                      Nombre de la Marca
                    </label>
                    <input
                      type="text"
                      value={editing.name}
                      onChange={e => updateField('name', e.target.value)}
                      placeholder="Ej: Artesanías Mexicanas"
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
                      placeholder="url-de-la-marca"
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

                  {/* Representative & Booth */}
                  <div className="expositores-sub-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Nombre Representante
                      </label>
                      <input
                        type="text"
                        value={editing.personName}
                        onChange={e => updateField('personName', e.target.value)}
                        placeholder="Ej: María Pérez"
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
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Stand / Booth
                      </label>
                      <input
                        type="text"
                        value={editing.booth}
                        onChange={e => updateField('booth', e.target.value)}
                        placeholder="Ej: Stand 2002"
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

                  {/* Floor Plan Map Image & Pin Coordinates */}
                  <div className="expositores-sub-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Imagen del Plano del Recinto / Mapa (URL)
                      </label>
                      <input
                        type="text"
                        value={editing.mapImage || ''}
                        onChange={e => updateField('mapImage', e.target.value)}
                        placeholder="Ej: https://.../plano-stand.jpg"
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
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Posición del Pin (% X, % Y)
                      </label>
                      <input
                        type="text"
                        value={editing.mapCoords || ''}
                        onChange={e => updateField('mapCoords', e.target.value)}
                        placeholder="Ej: 45, 55"
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

                  {/* State & Category selects */}
                  <div className="expositores-sub-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Estado de México
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
                        Categoría de Industria
                      </label>
                      <select
                        value={editing.category}
                        onChange={e => updateField('category', e.target.value)}
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
                        {CATEGORIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Website & Socials & Contact */}
                  <div className="expositores-sub-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Sitio Web (URL)
                      </label>
                      <input
                        type="text"
                        value={editing.website}
                        onChange={e => updateField('website', e.target.value)}
                        placeholder="https://ejemplo.com"
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
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Instagram / Red Social
                      </label>
                      <input
                        type="text"
                        value={editing.social}
                        onChange={e => updateField('social', e.target.value)}
                        placeholder="@marca.instagram"
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
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Email de Contacto
                      </label>
                      <input
                        type="email"
                        value={editing.contact}
                        onChange={e => updateField('contact', e.target.value)}
                        placeholder="contacto@ejemplo.com"
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

                  {/* Logo & Person Photo */}
                  <div className="expositores-sub-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Logo de la Marca (URL)
                      </label>
                      <input
                        type="text"
                        value={editing.logo}
                        onChange={e => updateField('logo', e.target.value)}
                        placeholder="https://ejemplo.com/logo.jpg"
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
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Foto del Representante (URL)
                      </label>
                      <input
                        type="text"
                        value={editing.personPhoto}
                        onChange={e => updateField('personPhoto', e.target.value)}
                        placeholder="https://ejemplo.com/representante.jpg"
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

                  {/* Commercial description - Multilingual */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#555' }}>Descripción Comercial</label>
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
                      placeholder={`Descripción en ${langTab === 'es' ? 'Español' : langTab === 'en' ? 'English' : 'Français'}...`}
                      rows={4}
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

                  {/* Representative Bio - Multilingual */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#555' }}>Biografía de la Expositora</label>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {(['es', 'en', 'fr'] as const).map(l => (
                          <button key={l} onClick={() => setLangTab(l)} style={{
                            padding: '3px 10px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700,
                            background: langTab === l ? '#002E51' : 'rgba(0,0,0,0.06)',
                            color: langTab === l ? '#fff' : '#666',
                            transition: 'all 0.15s',
                          }}>{l.toUpperCase()}</button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      value={getLocalizedValue('bio', langTab)}
                      onChange={e => updateLocalizedField('bio', langTab, e.target.value)}
                      placeholder={`Biografía en ${langTab === 'es' ? 'Español' : langTab === 'en' ? 'English' : 'Français'}...`}
                      rows={3}
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

                  {/* Gallery Section */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '8px' }}>
                      Galería de Fotos
                    </label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {editing.gallery?.map((img, idx) => (
                        <div key={idx} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
                          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button
                            onClick={() => removeGalleryImage(idx)}
                            style={{
                              position: 'absolute', top: '4px', right: '4px',
                              background: 'rgba(0,0,0,0.6)', border: 'none',
                              color: '#fff', borderRadius: '50%',
                              width: '20px', height: '20px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', fontSize: '10px'
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    {!showGalleryInput ? (
                      <button
                        onClick={() => setShowGalleryInput(true)}
                        style={{
                          padding: '8px 16px', borderRadius: '6px',
                          border: '1px solid rgba(0,0,0,0.15)', background: '#FAF8F5',
                          fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer'
                        }}
                      >
                        Añadir Imagen a Galería
                      </button>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={newGalleryUrl}
                          onChange={e => setNewGalleryUrl(e.target.value)}
                          placeholder="https://ejemplo.com/galeria-imagen.jpg"
                          style={{
                            flex: 1, padding: '8px 12px',
                            borderRadius: '6px', border: '1px solid rgba(0,0,0,0.15)',
                            fontSize: '0.85rem', outline: 'none'
                          }}
                        />
                        <button onClick={addGalleryImage} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#002E51', color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                          Añadir
                        </button>
                        <button onClick={() => setShowGalleryInput(false)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>
                          Cancelar
                        </button>
                      </div>
                    )}
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
                  <ExhibitorCardPreview data={editing} />
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
