'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit3, Save, X, Eye, Image, Film, User, FileText, Globe, Check, AlertCircle, ArrowLeft, ArrowRight, Newspaper } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════════════════════ */
interface NoticiaListItem {
  id: number;
  title: { es: string; en: string; fr: string };
  slug: string;
  date: string;
  featured: boolean;
  template: string;
  image?: string;
}

interface NoticiaFull extends NoticiaListItem {
  category: { es: string; en: string; fr: string };
  image: string;
  excerpt: { es: string; en: string; fr: string };
  content: { es: string; en: string; fr: string };
  images: string[];
  videoUrl: string;
  author: { name: string; role: string; bio: string; footer: string; image: string } | null;
}

type Lang = 'es' | 'en' | 'fr';
const LANGUAGES: { key: Lang; label: string; flag: string }[] = [
  { key: 'es', label: 'Español', flag: '🇲🇽' },
  { key: 'en', label: 'English', flag: '🇨🇦' },
  { key: 'fr', label: 'Français', flag: '🇫🇷' },
];

const TEMPLATES = [
  { id: 'standard', label: 'Estándar', icon: <FileText size={20} />, desc: 'Artículo de texto con cita destacada' },
  { id: 'gallery', label: 'Galería', icon: <Image size={20} />, desc: 'Ensayo fotográfico con collage' },
  { id: 'video', label: 'Video', icon: <Film size={20} />, desc: 'Contenido cinematográfico' },
  { id: 'author', label: 'Autor', icon: <User size={20} />, desc: 'Perfil editorial de autor' },
];

const EMPTY_NOTICIA: NoticiaFull = {
  id: 0,
  title: { es: '', en: '', fr: '' },
  slug: '',
  date: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }),
  category: { es: '', en: '', fr: '' },
  image: '',
  excerpt: { es: '', en: '', fr: '' },
  content: { es: '', en: '', fr: '' },
  featured: false,
  template: 'standard',
  images: [],
  videoUrl: '',
  author: null,
};

/* ══════════════════════════════════════════════════════════════
   TEMPLATE PREVIEW COMPONENTS
   ══════════════════════════════════════════════════════════════ */
function StandardPreview({ data, lang }: { data: NoticiaFull; lang: Lang }) {
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#FCFBF9', padding: '24px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C79E45', marginBottom: '12px' }}>
        {data.category[lang] || 'Categoría'}
      </div>
      <h2 style={{ fontFamily: 'Didot, Georgia, serif', fontSize: '1.8rem', color: '#002E51', margin: '0 0 16px', lineHeight: 1.2 }}>
        {data.title[lang] || 'Título de la noticia'}
      </h2>
      <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '16px' }}>
        {data.excerpt[lang] || 'Extracto de la noticia...'}
      </p>
      {data.image && (
        <img src={data.image} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '16px' }} />
      )}
      <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: 1.7 }}>
        {data.content[lang] ? data.content[lang].slice(0, 200) + '...' : 'Contenido de la noticia...'}
      </p>
      <div style={{ borderLeft: '2px solid #E4007C', paddingLeft: '16px', marginTop: '20px', fontStyle: 'italic', color: '#111' }}>
        "El talento y la visión de México en el escenario global."
      </div>
    </div>
  );
}

function GalleryPreview({ data, lang }: { data: NoticiaFull; lang: Lang }) {
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#FCFBF9', padding: '24px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C79E45', marginBottom: '12px' }}>
        {data.category[lang] || 'Categoría'} // GALLERY
      </div>
      <h2 style={{ fontFamily: 'Didot, Georgia, serif', fontSize: '1.8rem', color: '#002E51', margin: '0 0 16px', lineHeight: 1.2 }}>
        {data.title[lang] || 'Título de la noticia'}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        {data.image && <img src={data.image} alt="" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />}
        {data.images?.slice(0, 3).map((img, i) => (
          <img key={i} src={img} alt="" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
        ))}
        {!data.image && data.images?.length === 0 && (
          <div style={{ gridColumn: '1/-1', height: '120px', background: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.85rem' }}>
            Sin imágenes
          </div>
        )}
      </div>
      <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: 1.7 }}>
        {data.content[lang] ? data.content[lang].slice(0, 150) + '...' : 'Contenido de la noticia...'}
      </p>
    </div>
  );
}

function VideoPreview({ data, lang }: { data: NoticiaFull; lang: Lang }) {
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#FCFBF9', padding: '24px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C79E45', marginBottom: '12px' }}>
        {data.category[lang] || 'Categoría'} // FILM
      </div>
      <h2 style={{ fontFamily: 'Didot, Georgia, serif', fontSize: '1.8rem', color: '#002E51', margin: '0 0 16px', lineHeight: 1.2 }}>
        {data.title[lang] || 'Título de la noticia'}
      </h2>
      <div style={{ background: '#000', borderRadius: '4px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '16px' }}>
        <Film size={40} opacity={0.5} />
      </div>
      <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: 1.7 }}>
        {data.content[lang] ? data.content[lang].slice(0, 150) + '...' : 'Contenido de la noticia...'}
      </p>
    </div>
  );
}

function AuthorPreview({ data, lang }: { data: NoticiaFull; lang: Lang }) {
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#FCFBF9', padding: '24px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C79E45', marginBottom: '12px' }}>
        {data.category[lang] || 'Categoría'} // PERFIL
      </div>
      <h2 style={{ fontFamily: 'Didot, Georgia, serif', fontSize: '1.8rem', color: '#002E51', margin: '0 0 16px', lineHeight: 1.2 }}>
        {data.title[lang] || 'Título de la noticia'}
      </h2>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
        {data.author?.image ? (
          <img src={data.author.image} alt="" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        ) : (
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={24} color="#999" />
          </div>
        )}
        <div>
          <div style={{ fontWeight: 700, color: '#111' }}>{data.author?.name || 'Nombre del autor'}</div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>{data.author?.role || 'Rol del autor'}</div>
        </div>
      </div>
      <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: 1.7 }}>
        {data.content[lang] ? data.content[lang].slice(0, 150) + '...' : 'Contenido de la noticia...'}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */
export default function AdminNoticiasPage() {
  const [noticias, setNoticias] = useState<NoticiaListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NoticiaFull | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewLang, setPreviewLang] = useState<Lang>('es');
  const [editingLang, setEditingLang] = useState<Lang>('es');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const loadNoticias = async () => {
    try {
      const res = await fetch('/api/admin/noticias');
      const data = await res.json();
      if (data.noticias) setNoticias(data.noticias);
    } catch {
      setMessage({ type: 'error', text: 'Error al cargar noticias' });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNoticias();
  }, []);

  const handleNew = () => {
    setEditing({ ...EMPTY_NOTICIA, id: Date.now() });
    setIsNew(true);
    setEditingLang('es');
    setPreviewLang('es');
    setMessage(null);
    setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleEdit = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/noticias/${id}`);
      const data = await res.json();
      if (data.noticia) {
        setEditing(data.noticia);
        setIsNew(false);
        setEditingLang('es');
        setPreviewLang('es');
        setMessage(null);
        setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } catch {
      setMessage({ type: 'error', text: 'Error al cargar la noticia' });
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.title.es.trim()) {
      setMessage({ type: 'error', text: 'El título en español es obligatorio' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/noticias', {
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

      setMessage({ type: 'success', text: isNew ? 'Noticia creada exitosamente' : 'Noticia actualizada exitosamente' });
      await loadNoticias();
      if (isNew) {
        setEditing(null);
        setIsNew(false);
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/admin/noticias', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Error al eliminar' });
        return;
      }

      setMessage({ type: 'success', text: 'Noticia eliminada' });
      if (editing?.id === id) {
        setEditing(null);
        setIsNew(false);
      }
      setShowDeleteConfirm(null);
      await loadNoticias();
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
  };

  const updateField = (field: string, value: any) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  const updateLangField = (field: 'title' | 'category' | 'excerpt' | 'content', value: string) => {
    if (!editing) return;
    setEditing({
      ...editing,
      [field]: { ...editing[field], [editingLang]: value },
    });
  };

  const addImage = () => {
    if (!editing || !newImageUrl.trim()) return;
    setEditing({
      ...editing,
      images: [...(editing.images || []), newImageUrl.trim()],
    });
    setNewImageUrl('');
    setShowImageInput(false);
  };

  const removeImage = (index: number) => {
    if (!editing) return;
    const imgs = [...(editing.images || [])];
    imgs.splice(index, 1);
    setEditing({ ...editing, images: imgs });
  };

  const renderPreview = () => {
    if (!editing) return null;
    switch (editing.template) {
      case 'gallery': return <GalleryPreview data={editing} lang={previewLang} />;
      case 'video': return <VideoPreview data={editing} lang={previewLang} />;
      case 'author': return <AuthorPreview data={editing} lang={previewLang} />;
      default: return <StandardPreview data={editing} lang={previewLang} />;
    }
  };

  /* ══════════════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════════════ */
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 991px) {
          .noticias-list-panel {
            display: ${editing ? 'none' : 'flex'} !important;
            width: 100% !important;
            min-width: 100% !important;
          }
          .noticias-editor-panel {
            display: ${editing ? 'block' : 'none'} !important;
            width: 100% !important;
          }
          .noticias-editor-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .noticias-editor-padding {
            padding: 20px 16px !important;
          }
        }
      `}</style>

      {/* ── LEFT PANEL: List ── */}
      <div className="noticias-list-panel" style={{
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
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#002E51', letterSpacing: '-0.01em' }}>Noticias</h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#888' }}>{noticias.length} artículos</p>
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
          ) : noticias.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              <p style={{ margin: '0 0 4px', fontWeight: 600 }}>No hay noticias aún</p>
              <p style={{ margin: 0, fontSize: '0.8rem' }}>Crea la primera noticia</p>
            </div>
          ) : (
            noticias.map(n => (
              <div
                key={n.id}
                onClick={() => handleEdit(n.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  background: editing?.id === n.id ? 'rgba(228,0,124,0.03)' : '#fff',
                  border: `1px solid ${editing?.id === n.id ? 'rgba(228,0,124,0.2)' : 'rgba(0,0,0,0.05)'}`,
                  boxShadow: editing?.id === n.id ? '0 4px 12px rgba(228,0,124,0.04)' : '0 2px 4px rgba(0,0,0,0.01)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
                onMouseEnter={e => {
                  if (editing?.id !== n.id) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(228,0,124,0.15)';
                  }
                }}
                onMouseLeave={e => {
                  if (editing?.id !== n.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.01)';
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                  }
                }}
              >
                {/* News Image Avatar */}
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
                  {n.image ? (
                    <img src={n.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Newspaper size={18} color="#9ca3af" />
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#002E51', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {n.title.es || 'Sin título'}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', color: '#888' }}>
                      {n.date}
                    </span>
                    {n.featured && (
                      <span style={{
                        fontSize: '0.6rem',
                        padding: '1px 6px',
                        borderRadius: '100px',
                        background: '#E4007C',
                        color: '#fff',
                        fontWeight: 600,
                      }}>
                        Destacado
                      </span>
                    )}
                    <span style={{
                      fontSize: '0.6rem',
                      padding: '1px 6px',
                      borderRadius: '100px',
                      background: 'rgba(0,46,81,0.05)',
                      color: '#002E51',
                      fontWeight: 600,
                    }}>
                      {n.template}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(n.id); }}
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
      <div className="noticias-editor-panel" ref={editorRef} style={{ flex: 1, overflow: 'auto', background: '#F4F5F7' }}>
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
                <Newspaper size={28} />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 800, color: '#002E51' }}>Gestión de Noticias</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.6 }}>
                Selecciona una noticia de la lista para editar su contenido, o haz clic en <strong>"+ Nueva"</strong> para redactar un nuevo artículo o boletín de prensa.
              </p>
            </div>
          </div>
        ) : (
          <div className="noticias-editor-padding" style={{ padding: '32px' }}>
            {/* Message */}
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
                <span style={{ fontSize: '0.9rem', color: '#111' }}>¿Eliminar esta noticia?</span>
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
            <div className="noticias-editor-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* ── LEFT: Form ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111' }}>
                    {isNew ? 'Nueva Noticia' : 'Editar Noticia'}
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

                {/* Language tabs for editing */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', padding: '4px' }}>
                  {LANGUAGES.map(l => (
                    <button
                      key={l.key}
                      onClick={() => setEditingLang(l.key)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '6px',
                        border: 'none',
                        background: editingLang === l.key ? '#fff' : 'transparent',
                        color: editingLang === l.key ? '#111' : '#888',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        boxShadow: editingLang === l.key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                      }}
                    >
                      {l.flag} {l.label}
                    </button>
                  ))}
                </div>

                {/* Form fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Title */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                      Título ({editingLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={editing.title[editingLang]}
                      onChange={e => updateLangField('title', e.target.value)}
                      placeholder="Título de la noticia"
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
                      placeholder="url-de-la-noticia"
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

                  {/* Date + Featured */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        Fecha
                      </label>
                      <input
                        type="text"
                        value={editing.date}
                        onChange={e => updateField('date', e.target.value)}
                        placeholder="15 Oct 2026"
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
                        Destacado
                      </label>
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                      }}>
                        <input
                          type="checkbox"
                          checked={editing.featured}
                          onChange={e => updateField('featured', e.target.checked)}
                        />
                        Mostrar como destacado
                      </label>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                      Categoría ({editingLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={editing.category[editingLang]}
                      onChange={e => updateLangField('category', e.target.value)}
                      placeholder="Ej: Institucional, Alianzas, Cultura..."
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

                  {/* Template selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '8px' }}>
                      Plantilla
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {TEMPLATES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => updateField('template', t.id)}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: `2px solid ${editing.template === t.id ? '#E4007C' : 'rgba(0,0,0,0.06)'}`,
                            background: editing.template === t.id ? 'rgba(228,0,124,0.04)' : '#fff',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ color: editing.template === t.id ? '#E4007C' : '#666' }}>{t.icon}</span>
                            <span style={{ fontWeight: 600, fontSize: '0.85rem', color: editing.template === t.id ? '#E4007C' : '#333' }}>{t.label}</span>
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#888' }}>{t.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                      Imagen principal (URL)
                    </label>
                    <input
                      type="text"
                      value={editing.image}
                      onChange={e => updateField('image', e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
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

                  {/* Excerpt */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                      Extracto ({editingLang.toUpperCase()})
                    </label>
                    <textarea
                      value={editing.excerpt[editingLang]}
                      onChange={e => updateLangField('excerpt', e.target.value)}
                      placeholder="Breve descripción de la noticia..."
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

                  {/* Content */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                      Contenido ({editingLang.toUpperCase()})
                    </label>
                    <textarea
                      value={editing.content[editingLang]}
                      onChange={e => updateLangField('content', e.target.value)}
                      placeholder="Contenido completo de la noticia..."
                      rows={6}
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

                  {/* Video URL (only for video template) */}
                  {editing.template === 'video' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
                        URL del Video
                      </label>
                      <input
                        type="text"
                        value={editing.videoUrl}
                        onChange={e => updateField('videoUrl', e.target.value)}
                        placeholder="https://ejemplo.com/video.mp4"
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
                  )}

                  {/* Gallery images (only for gallery template) */}
                  {editing.template === 'gallery' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: '8px' }}>
                        Galería de imágenes
                      </label>
                      {editing.images && editing.images.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                          {editing.images.map((img, i) => (
                            <div key={i} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '6px', overflow: 'hidden' }}>
                              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button
                                onClick={() => removeImage(i)}
                                style={{
                                  position: 'absolute',
                                  top: '2px',
                                  right: '2px',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: 'none',
                                  background: 'rgba(0,0,0,0.6)',
                                  color: '#fff',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.7rem',
                                }}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      {showImageInput ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="text"
                            value={newImageUrl}
                            onChange={e => setNewImageUrl(e.target.value)}
                            placeholder="URL de la imagen"
                            style={{
                              flex: 1,
                              padding: '10px 14px',
                              borderRadius: '8px',
                              border: '1px solid rgba(0,0,0,0.1)',
                              fontSize: '0.9rem',
                              outline: 'none',
                            }}
                          />
                          <button onClick={addImage} style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#002E51', color: '#fff', cursor: 'pointer' }}>
                            <Plus size={16} />
                          </button>
                          <button onClick={() => { setShowImageInput(false); setNewImageUrl(''); }} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowImageInput(true)}
                          style={{
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: '1px dashed rgba(0,0,0,0.15)',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <Plus size={14} /> Agregar imagen
                        </button>
                      )}
                    </div>
                  )}

                  {/* Author fields (only for author template) */}
                  {editing.template === 'author' && (
                    <>
                      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '16px' }}>
                        <h4 style={{ margin: '0 0 16px', fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Información del Autor</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <input
                            type="text"
                            value={editing.author?.name || ''}
                            onChange={e => updateField('author', { ...(editing.author || { name: '', role: '', bio: '', footer: '', image: '' }), name: e.target.value })}
                            placeholder="Nombre del autor"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                          />
                          <input
                            type="text"
                            value={editing.author?.role || ''}
                            onChange={e => updateField('author', { ...(editing.author || { name: '', role: '', bio: '', footer: '', image: '' }), role: e.target.value })}
                            placeholder="Rol / Cargo"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                          />
                          <textarea
                            value={editing.author?.bio || ''}
                            onChange={e => updateField('author', { ...(editing.author || { name: '', role: '', bio: '', footer: '', image: '' }), bio: e.target.value })}
                            placeholder="Biografía"
                            rows={3}
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                          />
                          <input
                            type="text"
                            value={editing.author?.image || ''}
                            onChange={e => updateField('author', { ...(editing.author || { name: '', role: '', bio: '', footer: '', image: '' }), image: e.target.value })}
                            placeholder="URL de la foto del autor"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ── RIGHT: Preview ── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Eye size={20} /> Vista Previa
                  </h3>
                  <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.03)', borderRadius: '6px', padding: '3px' }}>
                    {LANGUAGES.map(l => (
                      <button
                        key={l.key}
                        onClick={() => setPreviewLang(l.key)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: 'none',
                          background: previewLang === l.key ? '#fff' : 'transparent',
                          color: previewLang === l.key ? '#111' : '#888',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          boxShadow: previewLang === l.key ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                        }}
                      >
                        {l.flag}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{
                  position: 'sticky',
                  top: '32px',
                  maxHeight: 'calc(100vh - 120px)',
                  overflow: 'auto',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  background: '#fff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                }}>
                  {renderPreview()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}