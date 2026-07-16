'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Save, X, Globe, Mail, User, Image, Check, AlertCircle, Sparkles, Search } from 'lucide-react';

interface Invitado {
  id: string;
  slug: string;
  tier: any;
  name: string;
  logo: string;
  description: any;
  website: string;
  contact: string;
  personName: string;
  personPhoto: string;
  bio: any;
  gallery: string[];
  category: string;
}

const CATEGORIES = ['Líderes empresariales', 'Conferencistas', 'Personalidades'];

const EMPTY_INVITADO: Invitado = {
  id: '',
  slug: '',
  tier: { es: '', en: '', fr: '' },
  name: '',
  logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  description: { es: '', en: '', fr: '' },
  website: '',
  contact: '',
  personName: '',
  personPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  bio: { es: '', en: '', fr: '' },
  gallery: [''],
  category: 'Personalidades',
};

export default function AdminInvitados() {
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [editing, setEditing] = useState<Invitado | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [langTab, setLangTab] = useState<'es' | 'en' | 'fr'>('es');
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchInvitados();
  }, []);

  const fetchInvitados = async () => {
    try {
      const res = await fetch('/api/admin/invitados');
      if (res.ok) {
        const data = await res.json();
        if (data.invitados) setInvitados(data.invitados);
      }
    } catch {}
  };

  const getLocVal = (val: any, lang: string): string => {
    if (!val) return '';
    if (typeof val === 'string') return lang === 'es' ? val : '';
    return val[lang] || '';
  };

  const updateField = (field: keyof Invitado, value: any) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  const setLocField = (field: keyof Invitado, lang: string, value: string) => {
    if (!editing) return;
    const current: any = editing[field] || { es: '', en: '', fr: '' };
    const updated = typeof current === 'object' && current !== null ? { ...current, [lang]: value } : { es: '', en: '', fr: '', [lang]: value };
    setEditing({ ...editing, [field]: updated });
  };

  const handleNew = () => {
    setEditing({ ...EMPTY_INVITADO, id: Date.now().toString(), gallery: [''] });
    setIsNew(true);
    setMessage(null);
    setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleEdit = (invitado: Invitado) => {
    setEditing({
      ...invitado,
      gallery: invitado.gallery && invitado.gallery.length > 0 ? [...invitado.gallery] : [''],
    });
    setIsNew(false);
    setMessage(null);
    setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.name.trim()) {
      setMessage({ type: 'error', text: 'El nombre es obligatorio' });
      return;
    }

    setSaving(true);
    setMessage(null);

    const filteredGallery = editing.gallery.filter(url => url.trim() !== '');
    const dataToSend = { ...editing, gallery: filteredGallery };
    const method = isNew ? 'POST' : 'PUT';

    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/admin/invitados', {
        method,
        headers,
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Error al guardar invitado' });
        setSaving(false);
        return;
      }

      setMessage({ type: 'success', text: isNew ? 'Invitado creado exitosamente' : 'Invitado actualizado exitosamente' });
      await fetchInvitados();
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

      const res = await fetch('/api/admin/invitados', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Error al eliminar' });
        return;
      }

      setMessage({ type: 'success', text: 'Invitado eliminado' });
      if (editing?.id === id) {
        setEditing(null);
        setIsNew(false);
      }
      setShowDeleteConfirm(null);
      await fetchInvitados();
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
  };

  const handleGalleryChange = (index: number, value: string) => {
    if (!editing) return;
    const nextGallery = [...editing.gallery];
    nextGallery[index] = value;
    setEditing({ ...editing, gallery: nextGallery });
  };

  const addGalleryField = () => {
    if (!editing) return;
    setEditing({ ...editing, gallery: [...editing.gallery, ''] });
  };

  const removeGalleryField = (index: number) => {
    if (!editing) return;
    const nextGallery = editing.gallery.filter((_, idx) => idx !== index);
    setEditing({ ...editing, gallery: nextGallery });
  };

  const filtered = invitados.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', minHeight: 'calc(100vh - 72px)' }}>
      {/* LEFT PANEL - Sidebar List */}
      <div style={{ background: '#fff', borderRight: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 72px)', position: 'sticky', top: '72px' }}>
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
          <h1 style={{ margin: '0 0 16px', fontSize: '1.4rem', fontWeight: 800, color: '#002E51', lineHeight: 1.1 }}>Invitados Especiales</h1>
          
          <button
            onClick={handleNew}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#E4007C', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', marginBottom: '16px', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Plus size={16} />
            <span>Agregar Invitado</span>
          </button>

          <div style={{ position: 'relative' }}>
            <Search size={16} color="#aaa" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', boxSizing: 'border-box', background: '#F9F7F5' }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 20px', color: '#888', fontSize: '0.85rem' }}>No se encontraron invitados.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {filtered.map(invitado => {
                const isActive = editing?.id === invitado.id;
                return (
                  <div key={invitado.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => handleEdit(invitado)}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', border: 'none', background: isActive ? 'rgba(0,46,81,0.04)' : 'transparent', textAlign: 'left', cursor: 'pointer', transition: 'all 0.1s' }}
                    >
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eee', overflow: 'hidden', flexShrink: 0 }}>
                        {invitado.logo ? (
                          <img src={invitado.logo} alt={invitado.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <Sparkles size={18} color="#aaa" style={{ margin: '9px' }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#002E51', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{invitado.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{invitado.category}</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(invitado.id)}
                      style={{ padding: '8px', background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', opacity: 0.5 }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL - Editor or Empty State */}
      <div style={{ background: '#F9F7F5', display: 'flex', flexDirection: 'column' }} ref={editorRef}>
        {!editing ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', padding: '48px 32px', maxWidth: '420px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,25,76,0.02)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(228,0,124,0.08)', color: '#E4007C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Sparkles size={28} />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 800, color: '#002E51' }}>Gestión de Invitados Especiales</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.6 }}>Selecciona un invitado de la lista para editar sus datos, o haz clic en <strong>"+ Agregar Invitado"</strong> para registrar uno nuevo.</p>
            </div>
          </div>
        ) : (
          <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
            {message && (
              <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', background: message.type === 'success' ? 'rgba(0,200,83,0.08)' : 'rgba(228,0,124,0.08)', color: message.type === 'success' ? '#00C853' : '#E4007C' }}>
                {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                {message.text}
              </div>
            )}

            {showDeleteConfirm && (
              <div style={{ padding: '16px', borderRadius: '8px', marginBottom: '20px', background: '#fff', border: '1px solid rgba(228,0,124,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem', color: '#111' }}>¿Eliminar este invitado?</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setShowDeleteConfirm(null)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>Cancelar</button>
                  <button onClick={() => handleDelete(showDeleteConfirm)} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#E4007C', color: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>Eliminar</button>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px' }}>
              {/* Form Column */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111' }}>{isNew ? 'Nuevo Invitado' : 'Editar Invitado'}</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <X size={14} /> Cancelar
                    </button>
                    <button onClick={handleSave} disabled={saving} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#002E51', color: '#fff', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', opacity: saving ? 0.7 : 1 }}>
                      <Save size={14} /> {saving ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                </div>

                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>Nombre</label>
                      <input type="text" value={editing.name} onChange={e => updateField('name', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>Categoría</label>
                      <select value={editing.category} onChange={e => updateField('category', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', boxSizing: 'border-box', background: '#fff' }}>
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Language Tab controls for localized fields */}
                  <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '16px', background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                      {(['es', 'en', 'fr'] as const).map(l => (
                        <button key={l} type="button" onClick={() => setLangTab(l)} style={{ padding: '6px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, background: langTab === l ? '#E4007C' : 'rgba(0,0,0,0.06)', color: langTab === l ? '#fff' : '#666' }}>
                          {l === 'es' ? 'Español' : l === 'en' ? 'English' : 'Français'}
                        </button>
                      ))}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>Tipo de Participación ({langTab.toUpperCase()})</label>
                      <input type="text" value={getLocVal(editing.tier, langTab)} onChange={e => setLocField('tier', langTab, e.target.value)} placeholder="Ej. Invitado Especial" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>Biografía corta / Logros ({langTab.toUpperCase()})</label>
                      <textarea rows={2} value={getLocVal(editing.bio, langTab)} onChange={e => setLocField('bio', langTab, e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>Descripción / Agenda ({langTab.toUpperCase()})</label>
                      <textarea rows={3} value={getLocVal(editing.description, langTab)} onChange={e => setLocField('description', langTab, e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>URL Slug</label>
                      <input type="text" value={editing.slug} onChange={e => updateField('slug', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>URL Logo Principal</label>
                      <input type="url" value={editing.logo} onChange={e => updateField('logo', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>Website</label>
                      <input type="text" value={editing.website} onChange={e => updateField('website', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>Contacto (Email/Tel)</label>
                      <input type="text" value={editing.contact} onChange={e => updateField('contact', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>Nombre de Persona Clave</label>
                      <input type="text" value={editing.personName} onChange={e => updateField('personName', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>URL Foto Persona</label>
                      <input type="url" value={editing.personPhoto} onChange={e => updateField('personPhoto', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#002E51' }}>Galería de Imágenes (Opcional)</label>
                      <button type="button" onClick={addGalleryField} style={{ background: 'none', border: 'none', color: '#E4007C', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>+ Agregar</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {editing.gallery.map((url, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                          <input type="url" placeholder="URL de la imagen" value={url} onChange={e => handleGalleryChange(idx, e.target.value)} style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem' }} />
                          {editing.gallery.length > 1 && (
                            <button type="button" onClick={() => removeGalleryField(idx)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '8px' }}>
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Preview Column */}
              <div>
                <h3 style={{ margin: '0 0 24px', fontSize: '1rem', fontWeight: 700, color: '#888' }}>Vista Previa (Tarjeta)</h3>
                <div style={{ position: 'sticky', top: '24px' }}>
                  <div style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px 24px 16px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#E4007C', background: '#E4007C12', padding: '4px 12px', borderRadius: '100px' }}>
                        {editing.category || 'Categoría'}
                      </span>
                    </div>

                    <div style={{ padding: '0 24px 32px', position: 'relative', textAlign: 'center', marginTop: '16px' }}>
                      <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifycontent: 'center', background: '#FAF8F5', borderRadius: '16px', marginBottom: '24px', padding: '16px', margin: '0 auto 20px' }}>
                        {editing.logo ? <img src={editing.logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} onError={e => e.currentTarget.style.display = 'none'} /> : <Sparkles size={40} color="#ccc" style={{ margin: '0 auto' }} />}
                      </div>

                      <h3 style={{ margin: '0 0 4px', fontSize: '1.4rem', fontWeight: 800, color: '#002E51', lineHeight: 1.1 }}>{editing.name || 'Nombre del Invitado'}</h3>
                      <p style={{ margin: '0 0 16px', color: '#666', fontSize: '0.9rem', fontWeight: 700 }}>{getLocVal(editing.tier, langTab) || 'Participación'}</p>
                      
                      <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '0 0 20px' }} />
                      
                      <p style={{ margin: '0 0 24px', fontSize: '0.85rem', color: '#666', lineHeight: 1.5 }}>
                        "{getLocVal(editing.bio, langTab) || 'Biografía corta...'}"
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#555', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Globe size={14} color="#002E51" />
                          <span>{editing.website || 'Sitio web'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Mail size={14} color="#002E51" />
                          <span>{editing.contact || 'Contacto'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <User size={14} color="#002E51" />
                          <span>Rep: <strong>{editing.personName || 'Persona clave'}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
