'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, Globe, Image, Check, AlertCircle, Handshake } from 'lucide-react';

interface Ally {
  id: string;
  name: string;
  logo: string;
  website: string;
  color: string;
}

const EMPTY_ALLY: Ally = {
  id: '',
  name: '',
  logo: 'https://placehold.co/150x150/e0e0e0/555555?text=Logo',
  website: '',
  color: '#E4007C',
};

export default function AdminAliados() {
  const [allies, setAllies] = useState<Ally[]>([]);
  const [selectedAlly, setSelectedAlly] = useState<Ally | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<Ally>(EMPTY_ALLY);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAllies();
  }, []);

  const fetchAllies = async () => {
    try {
      const res = await fetch('/api/admin/aliados');
      if (res.ok) {
        const data = await res.json();
        if (data.allies) setAllies(data.allies);
      }
    } catch {}
  };

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleEdit = (ally: Ally) => {
    setSelectedAlly(ally);
    setFormState({ ...ally });
    setIsEditing(true);
  };

  const handleNew = () => {
    setSelectedAlly(null);
    setFormState({ ...EMPTY_ALLY });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este aliado?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/admin/aliados', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setAllies(allies.filter(a => a.id !== id));
        showNotification('Aliado eliminado correctamente');
        if (selectedAlly?.id === id) {
          setIsEditing(false);
        }
      } else {
        const data = await res.json().catch(() => ({}));
        showNotification(data.error || 'Error al eliminar aliado', 'error');
      }
    } catch {
      showNotification('Error de conexión', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const method = formState.id ? 'PUT' : 'POST';

    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/admin/aliados', {
        method,
        headers,
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        const data = await res.json();
        showNotification(formState.id ? 'Aliado actualizado correctamente' : 'Aliado creado correctamente');
        fetchAllies();
        setIsEditing(false);
      } else {
        const data = await res.json().catch(() => ({}));
        showNotification(data.error || 'Error al guardar aliado', 'error');
      }
    } catch {
      showNotification('Error de conexión', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: notification.type === 'success' ? '#10B981' : '#EF4444',
          color: '#fff',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 2000,
          fontWeight: 600,
          fontSize: '0.9rem',
          animation: 'slideIn 0.3s ease-out',
        }}>
          {notification.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{notification.text}</span>
          <style>{`
            @keyframes slideIn {
              from { transform: translateY(100px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        paddingBottom: '20px',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#002E51' }}>
            Gestionar Aliados Oficiales
          </h1>
          <p style={{ margin: '4px 0 0', color: '#888', fontSize: '0.85rem' }}>
            Configura los logotipos, enlaces y colores de la sección de Aliados Oficiales del sitio.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleNew}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#E4007C',
              color: '#fff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(228,0,124,0.2)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Plus size={16} />
            <span>Agregar Aliado</span>
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isEditing ? '1fr 400px' : '1fr', gap: '32px' }}>
        {/* Allies List */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
          padding: '24px',
          boxSizing: 'border-box',
        }}>
          {allies.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#888' }}>
              <Handshake size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
              <div>No hay aliados registrados. Pulsa "Agregar Aliado" para crear uno.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {allies.map(ally => (
                <div
                  key={ally.id}
                  style={{
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '16px',
                    padding: '20px',
                    position: 'relative',
                    transition: 'all 0.2s',
                    background: selectedAlly?.id === ally.id ? 'rgba(0,46,81,0.02)' : '#fff',
                    borderColor: selectedAlly?.id === ally.id ? '#002E51' : 'rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Color preview bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: ally.color,
                    borderRadius: '16px 16px 0 0',
                  }} />

                  {/* Logo Container */}
                  <div style={{
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FAF8F5',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    border: '1px solid rgba(0,0,0,0.02)',
                    padding: '12px',
                    boxSizing: 'border-box',
                  }}>
                    {ally.logo ? (
                      <img
                        src={ally.logo}
                        alt={ally.name}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        onError={e => {
                          e.currentTarget.src = 'https://placehold.co/150x150/e0e0e0/555555?text=Error';
                        }}
                      />
                    ) : (
                      <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Sin logo</div>
                    )}
                  </div>

                  <h3 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: 800, color: '#002E51', lineHeight: 1.3 }}>
                    {ally.name}
                  </h3>

                  <a
                    href={ally.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.8rem',
                      color: '#E4007C',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginBottom: '20px',
                      fontWeight: 600,
                    }}
                  >
                    <Globe size={12} />
                    <span>Visitar sitio</span>
                  </a>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px' }}>
                    <button
                      onClick={() => handleEdit(ally)}
                      style={{
                        flex: 1,
                        background: '#FAF8F5',
                        border: '1px solid rgba(0,0,0,0.08)',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#002E51',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#002E510A'}
                      onMouseLeave={e => e.currentTarget.style.background = '#FAF8F5'}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(ally.id)}
                      style={{
                        padding: '8px 12px',
                        background: 'transparent',
                        border: '1px solid rgba(239,68,68,0.2)',
                        color: '#EF4444',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#EF44440A'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Form Panel */}
        {isEditing && (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
            padding: '24px',
            alignSelf: 'start',
            boxSizing: 'border-box',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#002E51' }}>
                {formState.id ? 'Editar Aliado' : 'Nuevo Aliado'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Form Input fields */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>
                  Nombre del Aliado
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Consulado de México"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>
                  Enlace Web (Sitio oficial)
                </label>
                <input
                  type="url"
                  required
                  placeholder="Ej. https://sitioweb.com"
                  value={formState.website}
                  onChange={e => setFormState({ ...formState, website: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>
                  URL del Logotipo
                </label>
                <input
                  type="url"
                  required
                  placeholder="Ej. https://url-de-imagen.jpg"
                  value={formState.logo}
                  onChange={e => setFormState({ ...formState, logo: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: '#002E51' }}>
                  Color Temático (Hover highlight)
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={formState.color}
                    onChange={e => setFormState({ ...formState, color: e.target.value })}
                    style={{
                      border: 'none',
                      background: 'none',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  />
                  <input
                    type="text"
                    placeholder="#E4007C"
                    value={formState.color}
                    onChange={e => setFormState({ ...formState, color: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      fontSize: '0.85rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Realtime Form Preview */}
              <div style={{
                background: '#FAF8F5',
                border: '1px dashed rgba(0,0,0,0.1)',
                borderRadius: '12px',
                padding: '16px',
                marginTop: '10px',
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#888', marginBottom: '10px', textTransform: 'uppercase' }}>
                  Vista previa de la Tarjeta
                </div>
                <div style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderTop: `4px solid ${formState.color}`,
                }}>
                  <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: '8px', marginBottom: '12px', padding: '8px' }}>
                    {formState.logo ? (
                      <img src={formState.logo} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                      <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Sin logo</div>
                    )}
                  </div>
                  <h4 style={{ margin: '0 0 2px', fontSize: '0.85rem', color: '#002E51', fontWeight: 800 }}>
                    {formState.name || 'Nombre del aliado'}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: '#E4007C', fontWeight: 600 }}>{formState.website || 'https://...'}</div>
                </div>
              </div>

              {/* Submit Buttons */}
              <button
                type="submit"
                disabled={isSaving}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#002E51',
                  color: '#fff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,46,81,0.15)',
                  marginTop: '10px',
                  transition: 'all 0.2s',
                }}
              >
                <Save size={16} />
                <span>{isSaving ? 'Guardando...' : 'Guardar Aliado'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
