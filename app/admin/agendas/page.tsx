'use client';

import React, { useState, useEffect } from 'react';
import { Save, ExternalLink, Plus, Trash2, Calendar, Clock, MapPin, Users, Code, Eye, User, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

type Language = 'es' | 'en' | 'fr';

interface ScheduleItem {
  id?: string;
  time: string;
  type: string;
  title: string | { es: string; en: string; fr: string };
  desc?: string | { es: string; en: string; fr: string };
  speaker?: string;
  location?: string;
}

interface GuestItem {
  id?: string;
  name: string;
  role: string | { es: string; en: string; fr: string };
  org?: string;
  image?: string;
}

export default function AdminAgendas() {
  const [agendas, setAgendas] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<any | null>(null);
  const [lang, setLang] = useState<Language>('es');
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const EVENT_TYPES = ['Keynote', 'Expo', 'Networking', 'Panel', 'Workshop', 'Show', 'B2B', 'Logística'];

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
      })
      .catch(() => {});
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
      id: Date.now().toString(),
      slug: 'nueva-agenda',
      date: '10 de Junio, 2027',
      title: { es: 'Nueva Agenda', en: '', fr: '' },
      description: { es: '', en: '', fr: '' },
      scheduleTitle: { es: 'Programa Oficial', en: 'Official Program', fr: 'Programme Officiel' },
      schedule: [],
      guestsTitle: { es: 'Invitados Destacados', en: 'Featured Guests', fr: 'Invités En Vedette' },
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
    const currentObj = typeof editing[field] === 'object' && editing[field] !== null ? editing[field] : { es: '', en: '', fr: '' };
    setEditing({
      ...editing,
      [field]: { ...currentObj, [lang]: value }
    });
  };

  const getLocString = (val: any, l: Language = lang): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[l] || val.es || '';
  };

  const setLocString = (val: any, newText: string, l: Language = lang): any => {
    if (typeof val === 'object' && val !== null) {
      return { ...val, [l]: newText };
    }
    return { es: newText, en: newText, fr: newText };
  };

  // Schedule Helpers
  const addScheduleItem = () => {
    if (!editing) return;
    const newItem: ScheduleItem = {
      id: `sch-${Date.now()}`,
      time: '09:00 AM - 10:00 AM',
      type: 'Keynote',
      title: { es: 'Nueva Actividad', en: '', fr: '' },
      desc: { es: '', en: '', fr: '' },
      location: 'Auditorio Principal'
    };
    const currentSchedule = Array.isArray(editing.schedule) ? editing.schedule : [];
    update('schedule', [...currentSchedule, newItem]);
  };

  const updateScheduleItem = (index: number, key: string, value: any) => {
    if (!editing || !editing.schedule) return;
    const newSchedule = [...editing.schedule];
    if (key === 'title' || key === 'desc') {
      newSchedule[index][key] = setLocString(newSchedule[index][key], value, lang);
    } else {
      newSchedule[index][key] = value;
    }
    update('schedule', newSchedule);
  };

  const removeScheduleItem = (index: number) => {
    if (!editing || !editing.schedule) return;
    const newSchedule = editing.schedule.filter((_: any, i: number) => i !== index);
    update('schedule', newSchedule);
  };

  // Guest Helpers
  const addGuestItem = () => {
    if (!editing) return;
    const newGuest: GuestItem = {
      id: `g-${Date.now()}`,
      name: 'Nuevo Invitado',
      role: { es: 'Conferencista', en: 'Speaker', fr: 'Conférencier' },
      org: 'Organización / Empresa',
      image: ''
    };
    const currentGuests = Array.isArray(editing.guests) ? editing.guests : [];
    update('guests', [...currentGuests, newGuest]);
  };

  const updateGuestItem = (index: number, key: string, value: any) => {
    if (!editing || !editing.guests) return;
    const newGuests = [...editing.guests];
    if (key === 'role') {
      newGuests[index][key] = setLocString(newGuests[index][key], value, lang);
    } else {
      newGuests[index][key] = value;
    }
    update('guests', newGuests);
  };

  const removeGuestItem = (index: number) => {
    if (!editing || !editing.guests) return;
    const newGuests = editing.guests.filter((_: any, i: number) => i !== index);
    update('guests', newGuests);
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
    fontFamily: 'inherit', outline: 'none', backgroundColor: '#FFFFFF'
  };

  if (!editing) {
    return (
      <div style={{ padding: '64px', textAlign: 'center', color: '#64748b' }}>
        No hay agendas cargadas. <button onClick={handleCreateNew} style={{ color: '#E4007C', fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none' }}>+ Crear nueva agenda</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 'calc(100vh - 82px)' }}>
      {/* SIDEBAR */}
      <div style={{ background: '#fff', borderRight: '1px solid rgba(0,0,0,0.07)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: '0 0 0 8px', fontSize: '1.1rem', fontWeight: 800, color: '#002E51' }}>Agendas</h2>
          <button onClick={handleCreateNew} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: '#E4007C', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
            <Plus size={14} /> Nueva
          </button>
        </div>
        {agendas.map(a => {
          const itemTitle = getLocString(a.title, 'es') || 'Sin Título';
          return (
            <button
              key={a.id}
              onClick={() => handleSelect(a.id)}
              title={itemTitle}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: selected === a.id ? 'rgba(228,0,124,0.08)' : 'transparent',
                color: selected === a.id ? '#E4007C' : '#333',
                fontWeight: selected === a.id ? 700 : 500,
                transition: 'all 0.15s',
                width: '100%'
              }}
            >
              <Calendar size={16} style={{ flexShrink: 0 }} color={selected === a.id ? '#E4007C' : '#64748b'} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                {itemTitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* EDITOR AREA */}
      <div style={{ padding: '32px 40px', overflowY: 'auto', background: '#F9F7F5' }}>
        <div style={{ maxWidth: '950px', margin: '0 auto', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', padding: '32px' }}>
          
          {/* TOP BAR */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#002E51', margin: 0 }}>
                {isNew ? 'Nueva Agenda' : getLocString(editing.title, 'es')}
              </h1>
              {!isNew && editing.slug && (
                <Link href={`/agenda/${editing.slug}`} target="_blank" style={{
                  display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700,
                  color: '#E4007C', background: 'rgba(228,0,124,0.1)', padding: '6px 12px', borderRadius: '100px', textDecoration: 'none'
                }}>
                  <ExternalLink size={12} /> Ver en sitio público
                </Link>
              )}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setJsonMode(!jsonMode)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px',
                  background: jsonMode ? '#002E51' : 'rgba(0,46,81,0.06)', color: jsonMode ? '#fff' : '#002E51',
                  border: 'none', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer'
                }}
              >
                {jsonMode ? <Eye size={14} /> : <Code size={14} />}
                {jsonMode ? 'Modo Visual (Fácil)' : 'Modo Código (JSON)'}
              </button>

              {!isNew && (
                <button onClick={handleDelete} style={{ padding: '10px 14px', background: 'transparent', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                  Eliminar
                </button>
              )}
              <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#E4007C', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.875rem', cursor: saving ? 'not-allowed' : 'pointer' }}>
                <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
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
              <button key={l} onClick={() => setLang(l)} style={{ padding: '10px 20px', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', color: lang === l ? '#E4007C' : '#999', borderBottom: lang === l ? '2px solid #E4007C' : '2px solid transparent', textTransform: 'uppercase' }}>
                {l}
              </button>
            ))}
          </div>

          {jsonMode ? (
            /* JSON MODE */
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#0f172a' }}>Edición Directa JSON</h3>
              <textarea
                value={JSON.stringify(editing, null, 2)}
                onChange={e => {
                  try { setEditing(JSON.parse(e.target.value)); } catch {}
                }}
                style={{ ...inputStyle, minHeight: '400px', fontFamily: 'monospace', fontSize: '0.8rem' }}
              />
            </div>
          ) : (
            /* VISUAL MODE */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* DATOS BÁSICOS */}
              <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', color: '#002E51', fontWeight: 800 }}>Información General de la Agenda</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Fecha de la Agenda</label>
                    <input type="text" placeholder="Ej: 10 de Junio, 2027" value={editing.date || ''} onChange={e => update('date', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Slug (URL) <span style={{ fontWeight: 400, color: '#94a3b8' }}>(sin espacios)</span></label>
                    <input type="text" placeholder="ej: mexico-ontario-business-summit" value={editing.slug || ''} onChange={e => update('slug', e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Título ({lang.toUpperCase()})</label>
                  <input type="text" placeholder="Nombre de la agenda" value={getLocString(editing.title)} onChange={e => updateLoc('title', e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Descripción ({lang.toUpperCase()})</label>
                  <textarea rows={2} placeholder="Resumen o descripción de esta agenda..." value={getLocString(editing.description)} onChange={e => updateLoc('description', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
              </div>

              {/* SECCIÓN DE PROGRAMA (SCHEDULE) */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#002E51', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={18} color="#E4007C" /> Programa y Actividades (Schedule)
                    </h3>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>Edita los horarios, ponentes y actividades oficiales de la agenda</p>
                  </div>
                  <button onClick={addScheduleItem} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#002E51', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                    <Plus size={14} /> + Agregar Actividad
                  </button>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Título de la Sección del Programa ({lang.toUpperCase()})</label>
                  <input type="text" placeholder="Ej: Programa Oficial / Programa de Sesiones" value={getLocString(editing.scheduleTitle)} onChange={e => updateLoc('scheduleTitle', e.target.value)} style={inputStyle} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                  {(editing.schedule || []).map((item: any, idx: number) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #cbd5e1', position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#002E51', background: '#e2e8f0', padding: '4px 10px', borderRadius: '100px' }}>
                          Actividad #{idx + 1}
                        </span>
                        <button onClick={() => removeScheduleItem(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Horario (time)</label>
                          <input type="text" placeholder="Ej: 09:00 AM - 10:30 AM" value={item.time || ''} onChange={e => updateScheduleItem(idx, 'time', e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Tipo de Evento</label>
                          <select value={item.type || 'Keynote'} onChange={e => updateScheduleItem(idx, 'type', e.target.value)} style={inputStyle}>
                            {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Ubicación / Sala</label>
                          <input type="text" placeholder="Ej: Pabellón Central / Sala VIP" value={item.location || ''} onChange={e => updateScheduleItem(idx, 'location', e.target.value)} style={inputStyle} />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Título de la Actividad ({lang.toUpperCase()})</label>
                          <input type="text" placeholder="Nombre de la conferencia / actividad" value={getLocString(item.title)} onChange={e => updateScheduleItem(idx, 'title', e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Ponentes / Descripción ({lang.toUpperCase()})</label>
                          <input type="text" placeholder="Nombres de ponentes o breve detalle" value={getLocString(item.desc || item.speaker)} onChange={e => updateScheduleItem(idx, 'desc', e.target.value)} style={inputStyle} />
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!editing.schedule || editing.schedule.length === 0) && (
                    <div style={{ textAlign: 'center', padding: '24px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', color: '#94a3b8', fontSize: '0.85rem' }}>
                      No hay actividades agregadas al programa. Haz clic en "+ Agregar Actividad" para comenzar.
                    </div>
                  )}
                </div>
              </div>

              {/* SECCIÓN DE INVITADOS (GUESTS) */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#002E51', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={18} color="#00BAD3" /> Invitados Especiales y Ponentes (Guests)
                    </h3>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>Agrega expositores, moderadores o invitados de honor</p>
                  </div>
                  <button onClick={addGuestItem} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#002E51', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                    <Plus size={14} /> + Agregar Invitado
                  </button>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Título de la Sección de Invitados ({lang.toUpperCase()})</label>
                  <input type="text" placeholder="Ej: Invitados Destacados / Conferencistas" value={getLocString(editing.guestsTitle)} onChange={e => updateLoc('guestsTitle', e.target.value)} style={inputStyle} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                  {(editing.guests || []).map((guest: any, idx: number) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 1fr 1fr 40px', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #cbd5e1', flexShrink: 0 }}>
                          {guest.image ? (
                            <img src={guest.image} alt={guest.name || 'Invitado'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <User size={22} color="#94a3b8" />
                          )}
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Nombre Completo</label>
                          <input type="text" placeholder="Ej: Francisco Solorio" value={guest.name || ''} onChange={e => updateGuestItem(idx, 'name', e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Cargo / Rol ({lang.toUpperCase()})</label>
                          <input type="text" placeholder="Ej: Presidente & Fundador" value={getLocString(guest.role)} onChange={e => updateGuestItem(idx, 'role', e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Empresa / Org</label>
                          <input type="text" placeholder="Ej: Expo México Mujer" value={guest.org || ''} onChange={e => updateGuestItem(idx, 'org', e.target.value)} style={inputStyle} />
                        </div>
                        <button onClick={() => removeGuestItem(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px', marginTop: '16px' }} title="Eliminar invitado">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Foto / Imagen de Perfil (URL)</label>
                        <input type="text" placeholder="Ej: /recursos/Recurso 1.png o URL de la imagen" value={guest.image || ''} onChange={e => updateGuestItem(idx, 'image', e.target.value)} style={inputStyle} />
                      </div>
                    </div>
                  ))}

                  {(!editing.guests || editing.guests.length === 0) && (
                    <div style={{ textAlign: 'center', padding: '24px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', color: '#94a3b8', fontSize: '0.85rem' }}>
                      No hay invitados agregados a esta agenda. Haz clic en "+ Agregar Invitado" para incluir ponentes.
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
