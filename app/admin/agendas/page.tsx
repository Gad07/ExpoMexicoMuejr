'use client';

import React, { useState, useEffect } from 'react';
import { Save, ExternalLink, Plus, X } from 'lucide-react';
import Link from 'next/link';

type Language = 'es' | 'en' | 'fr';

export default function AdminAgendas() {
  const [agendas, setAgendas] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<any | null>(null);
  const [lang, setLang] = useState<Language>('es');
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/agendas')
      .then(r => r.json())
      .then(d => {
        if (d.agendas) {
          setAgendas(d.agendas);
          if (d.agendas.length > 0 && !selected) {
            setSelected(d.agendas[0].id);
            setEditing(JSON.parse(JSON.stringify(d.agendas[0])));
          }
        }
      });
  }, []);

  const handleSelect = (id: string) => {
    const agenda = agendas.find(a => a.id === id);
    if (agenda) {
      setSelected(id);
      setEditing(JSON.parse(JSON.stringify(agenda)));
      setIsNew(false);
      setMessage(null);
    }
  };

  const handleCreateNew = () => {
    const emptyAgenda = {
      id: '', slug: '',
      title: { es: 'Nueva Agenda', en: '', fr: '' },
      description: { es: '', en: '', fr: '' },
      featuresTitle: { es: '', en: '', fr: '' },
      features: [],
      highlightsTitle: { es: '', en: '', fr: '' },
      highlightsDesc: { es: '', en: '', fr: '' },
      highlights: [],
      scheduleTitle: { es: '', en: '', fr: '' },
      schedule: [],
      guestsTitle: { es: '', en: '', fr: '' },
      guests: []
    };
    setSelected(null);
    setEditing(emptyAgenda);
    setIsNew(true);
    setMessage(null);
  };

  const update = (field: string, value: any) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  const updateLoc = (field: string, value: string) => {
    if (!editing) return;
    setEditing({
      ...editing,
      [field]: { ...editing[field], [lang]: value }
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      
      const res = await fetch('/api/admin/agendas', {
        method: isNew ? 'POST' : 'PUT',
        headers,
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Error al guardar' });
      } else {
        setMessage({ type: 'success', text: `Agenda ${isNew ? 'creada' : 'guardada'} exitosamente ✓` });
        if (isNew) {
          setAgendas([...agendas, data.agenda]);
          setSelected(data.agenda.id);
          setEditing(data.agenda);
          setIsNew(false);
        } else {
          setAgendas(prev => prev.map(a => a.id === editing.id ? JSON.parse(JSON.stringify(editing)) : a));
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!editing || isNew) return;
    if (!confirm('¿Estás seguro de eliminar esta Agenda?')) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/admin/agendas', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id: editing.id }),
      });
      if (res.ok) {
        const newAgendas = agendas.filter(a => a.id !== editing.id);
        setAgendas(newAgendas);
        if (newAgendas.length > 0) {
          handleSelect(newAgendas[0].id);
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
    fontFamily: 'inherit', outline: 'none'
  };

  if (!editing) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(100vh - 82px)' }}>
      {/* SIDEBAR */}
      <div style={{ background: '#fff', borderRight: '1px solid rgba(0,0,0,0.07)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: '0 0 0 8px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51' }}>Agendas</h2>
          <button onClick={handleCreateNew} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: '#E4007C', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
            <Plus size={14} /> Nueva
          </button>
        </div>
        {agendas.map(a => (
          <button
            key={a.id}
            onClick={() => handleSelect(a.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
              background: selected === a.id ? 'rgba(228,0,124,0.08)' : 'transparent',
              color: selected === a.id ? '#E4007C' : '#333',
              fontWeight: selected === a.id ? 700 : 500,
              transition: 'all 0.15s',
            }}
          >
            {a.title?.es || 'Sin Título'}
          </button>
        ))}
      </div>

      {/* EDITOR */}
      <div style={{ padding: '32px 40px', overflowY: 'auto', background: '#F9F7F5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', padding: '32px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#002E51', margin: 0 }}>
                {isNew ? 'Nueva Agenda' : editing.title?.es}
              </h1>
              {!isNew && editing.slug && (
                <Link href={`/agenda/${editing.slug}`} target="_blank" style={{
                  display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700,
                  color: '#E4007C', background: 'rgba(228,0,124,0.1)', padding: '6px 12px', borderRadius: '100px', textDecoration: 'none'
                }}>
                  <ExternalLink size={12} /> Ver público
                </Link>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              {!isNew && (
                <button onClick={handleDelete} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px', background: 'transparent', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
                  <X size={16} /> Eliminar
                </button>
              )}
              <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#002E51', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.875rem', cursor: saving ? 'not-allowed' : 'pointer' }}>
                <Save size={16} /> {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#002E51' }}>Slug (URL) <span style={{color: '#999', fontWeight: 400}}>(No uses espacios)</span></label>
              <input type="text" value={editing.slug} onChange={e => update('slug', e.target.value)} style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#002E51' }}>Título de la Agenda</label>
              <input type="text" value={editing.title?.[lang] || ''} onChange={e => updateLoc('title', e.target.value)} style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#002E51' }}>Descripción</label>
              <textarea value={editing.description?.[lang] || ''} onChange={e => updateLoc('description', e.target.value)} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
            </div>

            {/* SECTIONS EDITORS (Using JSON stringify for advanced nested arrays for simplicity) */}
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#0f172a' }}>Configuración Avanzada (Secciones)</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '24px' }}>Edita el contenido de las secciones especiales de esta agenda (Programa, Invitados, Destacados) usando formato JSON. Asegúrate de mantener la estructura.</p>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#002E51' }}>Schedule (Programa)</label>
                <textarea 
                  value={JSON.stringify(editing.schedule || [], null, 2)} 
                  onChange={e => {
                    try {
                      update('schedule', JSON.parse(e.target.value));
                    } catch {
                      // ignore parse errors while typing
                    }
                  }} 
                  style={{ ...inputStyle, minHeight: '200px', fontFamily: 'monospace', fontSize: '0.8rem' }} 
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#002E51' }}>Guests (Invitados)</label>
                <textarea 
                  value={JSON.stringify(editing.guests || [], null, 2)} 
                  onChange={e => {
                    try {
                      update('guests', JSON.parse(e.target.value));
                    } catch {
                      // ignore parse errors while typing
                    }
                  }} 
                  style={{ ...inputStyle, minHeight: '150px', fontFamily: 'monospace', fontSize: '0.8rem' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
