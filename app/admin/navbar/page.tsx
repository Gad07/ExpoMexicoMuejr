'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, X, ArrowUp, ArrowDown, FormInput, CheckCircle } from 'lucide-react';

type Language = 'es' | 'en' | 'fr';

export default function AdminNavbar() {
  const [navbar, setNavbar] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('es');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/navbar')
      .then(r => r.json())
      .then(d => {
        if (d.navbar) {
          setNavbar(d.navbar);
          if (d.navbar.length > 0) setSelected(d.navbar[0].id);
        }
      });
  }, []);

  const handleSave = async (targetNavbar?: any[]) => {
    setSaving(true);
    setMessage(null);
    const dataToSave = targetNavbar || navbar;
    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/admin/navbar', {
        method: 'POST',
        headers,
        body: JSON.stringify(dataToSave),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Error al guardar' });
      } else {
        setMessage({ type: 'success', text: 'Navegación y enlaces de JotForm guardados exitosamente ✓' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
    setSaving(false);
  };

  const getSelectedMenu = () => navbar.find(n => n.id === selected);

  const updateMenu = (updates: any) => {
    setNavbar(prev => prev.map(n => n.id === selected ? { ...n, ...updates } : n));
  };

  const updateMenuLabel = (value: string) => {
    const menu = getSelectedMenu();
    if (!menu) return;
    updateMenu({ label: { ...menu.label, [lang]: value } });
  };

  const handleAddMenu = () => {
    const newId = Date.now().toString();
    const newNav = [...navbar, {
      id: newId,
      label: { es: 'Nuevo Menú', en: 'New Menu', fr: 'Nouveau Menu' },
      basePath: '/',
      items: []
    }];
    setNavbar(newNav);
    setSelected(newId);
    handleSave(newNav);
  };

  const handleDeleteMenu = (id: string) => {
    if (!confirm('¿Eliminar todo este menú y sus enlaces?')) return;
    const newNav = navbar.filter(n => n.id !== id);
    setNavbar(newNav);
    if (selected === id) {
      setSelected(newNav.length > 0 ? newNav[0].id : null);
    }
    handleSave(newNav);
  };

  const handleAddItem = () => {
    const menu = getSelectedMenu();
    if (!menu) return;
    const newItem = { id: Date.now().toString(), label: { es: 'Nuevo Enlace', en: '', fr: '' }, href: '/', jotformUrl: '' };
    updateMenu({ items: [...(menu.items || []), newItem] });
  };

  const updateItem = (itemId: string, field: string, value: any) => {
    const menu = getSelectedMenu();
    if (!menu) return;
    const newItems = menu.items.map((it: any) => {
      if (it.id === itemId) {
        if (field === 'label') {
          return { ...it, label: { ...it.label, [lang]: value } };
        }
        return { ...it, [field]: value };
      }
      return it;
    });
    updateMenu({ items: newItems });
  };

  const deleteItem = (itemId: string) => {
    const menu = getSelectedMenu();
    if (!menu) return;
    const nextItems = menu.items.filter((it: any) => it.id !== itemId);
    const updatedNav = navbar.map((n) => (n.id === selected ? { ...n, items: nextItems } : n));
    setNavbar(updatedNav);
    handleSave(updatedNav);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const menu = getSelectedMenu();
    if (!menu) return;
    const newItems = [...menu.items];
    if (direction === 'up' && index > 0) {
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    }
    updateMenu({ items: newItems });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.875rem',
    fontFamily: 'inherit', outline: 'none'
  };

  const menu = getSelectedMenu();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(100vh - 82px)' }}>
      {/* SIDEBAR MENUS */}
      <div style={{ background: '#fff', borderRight: '1px solid rgba(0,0,0,0.07)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: '0 0 0 8px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51' }}>Menús</h2>
          <button onClick={handleAddMenu} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: '#E4007C', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
            <Plus size={14} /> Nuevo
          </button>
        </div>
        {navbar.map(n => (
          <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setSelected(n.id)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: selected === n.id ? 'rgba(228,0,124,0.08)' : 'transparent',
                color: selected === n.id ? '#E4007C' : '#333',
                fontWeight: selected === n.id ? 700 : 500,
                transition: 'all 0.15s',
              }}
            >
              {n.label?.es || 'Sin Título'}
            </button>
            <button onClick={() => handleDeleteMenu(n.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', opacity: selected === n.id ? 1 : 0.3 }}><X size={16} /></button>
          </div>
        ))}
      </div>

      {/* EDITOR */}
      <div style={{ padding: '32px 40px', overflowY: 'auto', background: '#F9F7F5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', padding: '32px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#002E51', margin: 0 }}>
                Administrar Navegación & JotForms
              </h1>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748B' }}>
                Edita los nombres de menú, rutas de enlace y sus correspondientes formularios JotForm asociados.
              </p>
            </div>
            <button onClick={() => handleSave()} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#002E51', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.875rem', cursor: saving ? 'not-allowed' : 'pointer' }}>
              <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>

          {message && (
            <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.875rem', fontWeight: 600, background: message.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: message.type === 'success' ? '#059669' : '#DC2626' }}>
              {message.text}
            </div>
          )}

          {/* LANGUAGE TABS */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            {(['es', 'en', 'fr'] as Language[]).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '12px 24px', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', color: lang === l ? '#E4007C' : '#999', borderBottom: lang === l ? '2px solid #E4007C' : '2px solid transparent', textTransform: 'uppercase' }}>
                {l}
              </button>
            ))}
          </div>

          {menu ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#002E51' }}>Título del Menú ({lang.toUpperCase()})</label>
                  <input type="text" value={menu.label?.[lang] || ''} onChange={e => updateMenuLabel(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#002E51' }}>Ruta Base (Opcional)</label>
                  <input type="text" value={menu.basePath || ''} onChange={e => updateMenu({ basePath: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginTop: '24px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>SUB-ENLACES</h3>
                  <button onClick={handleAddItem} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 14px', background: '#F1F5F9', color: '#002E51', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                    <Plus size={16} /> Agregar Enlace
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {menu.items?.map((item: any, idx: number) => (
                    <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '8px' }}>
                        <button onClick={() => moveItem(idx, 'up')} disabled={idx === 0} style={{ background: 'none', border: 'none', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.3 : 1 }}><ArrowUp size={16} /></button>
                        <button onClick={() => moveItem(idx, 'down')} disabled={idx === menu.items.length - 1} style={{ background: 'none', border: 'none', cursor: idx === menu.items.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === menu.items.length - 1 ? 0.3 : 1 }}><ArrowDown size={16} /></button>
                      </div>
                      
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.78rem', fontWeight: 700, color: '#002E51' }}>Nombre del Enlace ({lang.toUpperCase()})</label>
                          <input type="text" placeholder={`Nombre (${lang.toUpperCase()})`} value={item.label?.[lang] || ''} onChange={e => updateItem(item.id, 'label', e.target.value)} style={inputStyle} />
                        </div>

                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.78rem', fontWeight: 700, color: '#002E51' }}>Ruta / URL del Sitio Web</label>
                          <input type="text" placeholder="URL (ej: /expositores)" value={item.href || ''} onChange={e => updateItem(item.id, 'href', e.target.value)} style={inputStyle} />
                        </div>

                        <div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px', fontSize: '0.78rem', fontWeight: 800, color: '#E4007C' }}>
                            <FormInput size={13} /> Enlace de JotForm (se embebe antes del CTA de esta sección)
                          </label>
                          <input
                            type="text"
                            placeholder="Enlace JotForm (ej: https://form.jotform.com/241686259021053)"
                            value={item.jotformUrl || ''}
                            onChange={e => updateItem(item.id, 'jotformUrl', e.target.value)}
                            style={{ ...inputStyle, background: '#FFF0F6', borderColor: '#FCC2D7', fontFamily: 'monospace' }}
                          />
                        </div>
                      </div>

                      <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '8px' }} aria-label="Eliminar enlace"><X size={20} /></button>
                    </div>
                  ))}
                  {(!menu.items || menu.items.length === 0) && (
                    <div style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '0.875rem' }}>No hay enlaces configurados</div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#94a3b8' }}>
              Selecciona un menú en la barra lateral para editarlo
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
