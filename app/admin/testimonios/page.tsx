'use client';

import React, { useState, useEffect } from 'react';
import { Video, Plus, Trash2, Edit2, ArrowUp, ArrowDown, Save, Eye, Sparkles, ExternalLink, Play, Check } from 'lucide-react';
import { TestimonioVideo } from '@/app/api/admin/testimonios/route';

export default function AdminTestimoniosPage() {
  const [videos, setVideos] = useState<TestimonioVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  // Form State for Add / Edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<TestimonioVideo>>({
    name: '',
    role: 'Expositora',
    title: 'Testimonio EMM',
    url: '',
    thumbTime: 5,
  });

  useEffect(() => {
    fetch('/api/admin/testimonios')
      .then(res => res.json())
      .then(data => {
        if (data.videos) {
          setVideos(data.videos);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage('');
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/testimonios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ videos }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.videos) setVideos(data.videos);
        setMessage('✅ Videos de Nuestras Voces guardados exitosamente');
      } else {
        setMessage(`❌ Error: ${data.error || 'No se pudo guardar'}`);
      }
    } catch {
      setMessage('❌ Error al conectar con el servidor');
    } finally {
      setSaving(false);
    }
  };

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.url) {
      alert('Por favor ingresa el nombre de la persona y la URL del video de Dropbox/MP4');
      return;
    }

    if (editingId) {
      setVideos(prev => prev.map(v => v.id === editingId ? { ...v, ...form } as TestimonioVideo : v));
      setEditingId(null);
    } else {
      const newVideo: TestimonioVideo = {
        id: `v-${Date.now()}`,
        name: form.name || '',
        role: form.role || 'Expositora',
        title: form.title || 'Testimonio',
        url: form.url || '',
        thumbTime: form.thumbTime || 5,
        thumbPos: 'center center',
      };
      setVideos(prev => [...prev, newVideo]);
    }

    setForm({ name: '', role: 'Expositora', title: 'Testimonio EMM', url: '', thumbTime: 5 });
  };

  const handleEdit = (video: TestimonioVideo) => {
    setEditingId(video.id);
    setForm(video);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este video de la sección Nuestras Voces?')) {
      setVideos(prev => prev.filter(v => v.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setForm({ name: '', role: 'Expositora', title: 'Testimonio EMM', url: '', thumbTime: 5 });
      }
    }
  };

  const moveVideo = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= videos.length) return;
    const updated = [...videos];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setVideos(updated);
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', color: '#002E51', fontWeight: 600 }}>
        Cargando sección de Nuestras Voces...
      </div>
    );
  }

  const currentPreview = videos[activePreviewIndex] || videos[0];

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(228,0,124,0.1)', color: '#E4007C', padding: '4px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            <Video size={14} /> Sección del Sitio Web
          </div>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, color: '#002E51', letterSpacing: '-0.02em' }}>
            Nuestras Voces (Videos de Testimonios)
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.92rem' }}>
            Administra los videos testimoniales que se muestran en el carrusel de la página de inicio. Soporta enlaces directos de Dropbox.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: saving ? '#94a3b8' : 'linear-gradient(135deg, #E4007C 0%, #990053 100%)',
            color: '#fff',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '12px',
            fontSize: '0.95rem',
            fontWeight: 800,
            cursor: saving ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 20px rgba(228,0,124,0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          <Save size={18} /> {saving ? 'Guardando...' : 'Guardar Todos los Cambios'}
        </button>
      </div>

      {message && (
        <div style={{ padding: '14px 20px', borderRadius: '12px', background: message.startsWith('✅') ? '#ecfdf5' : '#fef2f2', color: message.startsWith('✅') ? '#047857' : '#b91c1c', border: `1px solid ${message.startsWith('✅') ? '#a7f3d0' : '#fecaca'}`, fontWeight: 600, marginBottom: '24px' }}>
          {message}
        </div>
      )}

      {/* DROPBOX HELP BOX */}
      <div style={{ background: 'linear-gradient(135deg, rgba(0,46,81,0.04) 0%, rgba(0,46,81,0.08) 100%)', border: '1px solid rgba(0,46,81,0.15)', borderRadius: '18px', padding: '20px 24px', marginBottom: '32px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{ background: '#002E51', color: '#fff', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Sparkles size={20} />
        </div>
        <div>
          <div style={{ fontWeight: 800, color: '#002E51', fontSize: '0.95rem', marginBottom: '4px' }}>
            💡 ¿Cómo usar videos alojados en Dropbox?
          </div>
          <div style={{ color: '#475569', fontSize: '0.86rem', lineHeight: 1.5 }}>
            Puedes copiar cualquier enlace generado por Dropbox (ejemplo: <code>https://www.dropbox.com/scl/fi/xyz/video.mp4?dl=0</code>). 
            El sistema transformará automáticamente el enlace en un <strong>stream directo de alta velocidad</strong> para que el video cargue en milisegundos sin consumir espacio de tu servidor.
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        
        {/* LEFT: FORM TO ADD / EDIT */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', height: 'fit-content' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: '1.25rem', fontWeight: 800, color: '#002E51', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {editingId ? <Edit2 size={20} color="#E4007C" /> : <Plus size={20} color="#E4007C" />}
            {editingId ? 'Editar Video de Testimonio' : 'Agregar Nuevo Video'}
          </h2>

          <form onSubmit={handleAddOrUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Nombre de la Persona *
              </label>
              <input
                type="text"
                value={form.name || ''}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Ej. Adriana Perdomo"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                  Rol / Cargo
                </label>
                <input
                  type="text"
                  value={form.role || ''}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  placeholder="Ej. Expositora / Participante"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                  Categoría / Título
                </label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Ej. Testimonio EMM"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Enlace del Video (Dropbox URL o archivo MP4) *
              </label>
              <input
                type="text"
                value={form.url || ''}
                onChange={e => setForm({ ...form, url: e.target.value })}
                placeholder="https://www.dropbox.com/scl/fi/..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontFamily: 'monospace' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Segundo para miniatura (segundos)
              </label>
              <input
                type="number"
                step="0.5"
                value={form.thumbTime || 5}
                onChange={e => setForm({ ...form, thumbTime: parseFloat(e.target.value) || 0 })}
                placeholder="5.0"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  background: '#002E51',
                  color: '#fff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {editingId ? 'Actualizar Video' : '+ Agregar a la Lista'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ name: '', role: 'Expositora', title: 'Testimonio EMM', url: '', thumbTime: 5 });
                  }}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: '1px solid #cbd5e1',
                    padding: '12px 16px',
                    borderRadius: '100px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT: LIST OF VIDEOS */}
        <div>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '32px' }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '1.25rem', fontWeight: 800, color: '#002E51', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Videos de Nuestras Voces ({videos.length})</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Arrastra o usa las flechas para reordenar</span>
            </h2>

            {videos.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', background: '#f8fafc', borderRadius: '12px' }}>
                No hay videos registrados. Agrega el primero usando el formulario de la izquierda.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {videos.map((v, index) => {
                  const isDropbox = v.url.includes('dropbox');
                  return (
                    <div
                      key={v.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 18px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '14px',
                        gap: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                        <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#002E51', color: '#fff', fontSize: '0.78rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {index + 1}
                        </span>

                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontWeight: 800, color: '#002E51', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {v.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>{v.role} &bull; {v.title}</span>
                            {isDropbox && (
                              <span style={{ background: '#0061FE', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800 }}>
                                DROPBOX
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => moveVideo(index, 'up')}
                          disabled={index === 0}
                          style={{ border: 'none', background: '#e2e8f0', padding: '6px', borderRadius: '6px', cursor: index === 0 ? 'not-allowed' : 'pointer', opacity: index === 0 ? 0.3 : 1 }}
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveVideo(index, 'down')}
                          disabled={index === videos.length - 1}
                          style={{ border: 'none', background: '#e2e8f0', padding: '6px', borderRadius: '6px', cursor: index === videos.length - 1 ? 'not-allowed' : 'pointer', opacity: index === videos.length - 1 ? 0.3 : 1 }}
                        >
                          <ArrowDown size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEdit(v)}
                          style={{ border: 'none', background: '#e0e7ff', color: '#4338ca', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Edit2 size={13} /> Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(v.id)}
                          style={{ border: 'none', background: '#fee2e2', color: '#b91c1c', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Trash2 size={13} /> Eliminar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* PREVIEW CONTAINER */}
          {currentPreview && (
            <div style={{ background: '#002E51', borderRadius: '20px', padding: '24px', color: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#E4007C', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Eye size={16} /> Vista Previa en Vivo
                </span>
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                  {currentPreview.name} ({currentPreview.role})
                </span>
              </div>

              <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#000', position: 'relative', aspectRatio: '16/9' }}>
                <video
                  key={currentPreview.url}
                  src={currentPreview.url}
                  controls
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
