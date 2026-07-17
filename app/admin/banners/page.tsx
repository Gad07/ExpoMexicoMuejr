'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, Save, Image as ImageIcon } from 'lucide-react';

interface Banner {
  id: number;
  imageUrl: string;
  active: boolean;
  order: number;
}

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  
  const [formData, setFormData] = useState({
    imageUrl: '',
    active: true,
    order: 0
  });

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/admin/banners');
      const data = await res.json();
      if (res.ok) {
        setBanners(data.banners);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpenModal = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        imageUrl: banner.imageUrl,
        active: banner.active,
        order: banner.order
      });
    } else {
      setEditingBanner(null);
      setFormData({
        imageUrl: '',
        active: true,
        order: banners.length > 0 ? Math.max(...banners.map(b => b.order)) + 1 : 0
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
    setError('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('admin_token');
      const url = '/api/admin/banners';
      const method = editingBanner ? 'PUT' : 'POST';
      const payload = editingBanner ? { ...formData, id: editingBanner.id } : formData;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${token}\`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al guardar el banner');
      }

      await fetchBanners();
      handleCloseModal();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este banner?')) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/banners', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${token}\`
        },
        body: JSON.stringify({ id })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al eliminar');
      }

      await fetchBanners();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--navy)' }}>Cargando banners...</div>;
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>Banners Promocionales</h1>
          <p style={{ color: '#555', fontSize: '0.9rem' }}>Gestiona las imágenes del carrusel de inicio.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          style={{ 
            background: 'var(--magenta)', color: '#fff', border: 'none', 
            padding: '12px 24px', borderRadius: '8px', fontWeight: 600, 
            display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'var(--navy)'}
          onMouseOut={e => e.currentTarget.style.background = 'var(--magenta)'}
        >
          <Plus size={18} />
          Nuevo Banner
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {banners.map((banner) => (
          <div key={banner.id} style={{ 
            background: '#fff', borderRadius: '16px', overflow: 'hidden', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,46,81,0.05)'
          }}>
            <div style={{ height: '160px', width: '100%', background: '#eee', position: 'relative' }}>
              {banner.imageUrl ? (
                <img src={banner.imageUrl} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#aaa' }}>
                  <ImageIcon size={48} />
                </div>
              )}
              {!banner.active && (
                <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                  INACTIVO
                </div>
              )}
            </div>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#555' }}>Orden: <strong>{banner.order}</strong></div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleOpenModal(banner)} style={{ background: 'transparent', border: 'none', color: 'var(--navy)', cursor: 'pointer', padding: '6px' }} title="Editar">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(banner.id)} style={{ background: 'transparent', border: 'none', color: 'var(--red)', cursor: 'pointer', padding: '6px' }} title="Eliminar">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,46,81,0.5)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>
                {editingBanner ? 'Editar Banner' : 'Nuevo Banner'}
              </h2>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                <X size={24} />
              </button>
            </div>
            
            {error && <div style={{ background: 'rgba(198,11,30,0.1)', color: 'var(--red)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem' }}>{error}</div>}

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)' }}>URL de la Imagen</label>
                <input 
                  type="text" 
                  value={formData.imageUrl} 
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                />
                <p style={{ fontSize: '0.75rem', color: '#777', marginTop: '6px' }}>Puedes usar imágenes alojadas externamente o rutas locales como `/home-hero-2.jpg`</p>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)' }}>Orden</label>
                  <input 
                    type="number" 
                    value={formData.order} 
                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '28px' }}>
                  <input 
                    type="checkbox" 
                    id="active-banner"
                    checked={formData.active} 
                    onChange={e => setFormData({ ...formData, active: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="active-banner" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)', cursor: 'pointer' }}>Activo</label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  style={{ padding: '12px 24px', background: '#eee', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '12px 24px', background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Save size={18} />
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
