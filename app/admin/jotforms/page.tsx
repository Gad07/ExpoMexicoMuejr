'use client';

import React, { useState, useEffect } from 'react';
import { FormInput, Save, CheckCircle, ExternalLink, HelpCircle, RefreshCw, Eye } from 'lucide-react';

interface PageConfig {
  key: string;
  label: string;
  description: string;
}

const PAGES: PageConfig[] = [
  { key: 'default', label: 'Por Defecto (Global)', description: 'Se utiliza como respaldo si una página no tiene un JotForm específico.' },
  { key: 'home', label: 'Página de Inicio (Home)', description: 'Formulario embebido al final de la página principal.' },
  { key: 'contacto', label: 'Contacto', description: 'Formulario de la página /contacto.' },
  { key: 'expositores', label: 'Expositores', description: 'Formulario de la página /expositores.' },
  { key: 'embajadoras', label: 'Embajadoras', description: 'Formulario de la página /embajadoras.' },
  { key: 'compradores', label: 'Compradores', description: 'Formulario de la página /compradores.' },
  { key: 'patrocinadores', label: 'Patrocinadores', description: 'Formulario de la página /patrocinadores.' },
  { key: 'invitados', label: 'Invitados VIP', description: 'Formulario de la página /invitados.' },
];

export default function AdminJotFormsPage() {
  const [jotforms, setJotforms] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activePreviewKey, setActivePreviewKey] = useState<string>('home');

  useEffect(() => {
    fetch('/api/admin/jotforms')
      .then((res) => res.json())
      .then((data) => {
        if (data.jotforms) {
          setJotforms(data.jotforms);
        }
      })
      .catch((err) => console.error('Error al cargar JotForms:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, url: string) => {
    setJotforms((prev) => ({ ...prev, [key]: url }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/jotforms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jotforms }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg('¡Formularios JotForm guardados y actualizados correctamente!');
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.error || 'Error al guardar los formularios');
      }
    } catch (err: any) {
      setErrorMsg('Error de red al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', color: '#002E51' }}>
          <RefreshCw className="animate-spin" size={32} style={{ margin: '0 auto 12px' }} />
          <p style={{ fontWeight: 600 }}>Cargando configuración de JotForms...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#002E51', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FormInput size={28} color="#E4007C" /> Configuración de JotForms por Página
          </h1>
          <p style={{ color: '#64748B', margin: '6px 0 0', fontSize: '0.95rem' }}>
            Asigna el enlace del formulario de JotForm que aparecerá embebido justo antes de la sección CTA en cada página.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            background: saving ? '#ccc' : '#E4007C',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: saving ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(228, 0, 124, 0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div style={{ padding: '16px 20px', background: '#DCFCE7', color: '#166534', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600 }}>
          <CheckCircle size={20} /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ padding: '16px 20px', background: '#FEE2E2', color: '#991B1B', borderRadius: '12px', marginBottom: '24px', fontWeight: 600 }}>
          {errorMsg}
        </div>
      )}

      {/* Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Form Inputs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PAGES.map((page) => {
            const url = jotforms[page.key] || '';
            const isPreviewActive = activePreviewKey === page.key;

            return (
              <div
                key={page.key}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  border: isPreviewActive ? '2px solid #E4007C' : '1px solid #E2E8F0',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#002E51' }}>
                      {page.label}
                    </h3>
                    <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748B' }}>
                      {page.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePreviewKey(page.key)}
                    style={{
                      background: isPreviewActive ? 'rgba(228,0,124,0.1)' : '#F1F5F9',
                      color: isPreviewActive ? '#E4007C' : '#475569',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Eye size={14} /> Vista previa
                  </button>
                </div>

                <div style={{ position: 'relative', marginTop: '12px' }}>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleChange(page.key, e.target.value)}
                    placeholder="https://form.jotform.com/..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace',
                      color: '#1E293B',
                      background: '#FAF8F5',
                      outline: 'none',
                    }}
                  />
                </div>

                {url && (
                  <div style={{ marginTop: '8px', textAlign: 'right' }}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.78rem', color: '#2563EB', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      Probar enlace JotForm <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Preview Panel */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#002E51', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={18} color="#E4007C" /> Vista Previa En Vivo
              </h3>
              <span style={{ fontSize: '0.8rem', background: '#F1F5F9', padding: '4px 10px', borderRadius: '12px', fontWeight: 700, color: '#475569' }}>
                {PAGES.find((p) => p.key === activePreviewKey)?.label}
              </span>
            </div>

            {jotforms[activePreviewKey] ? (
              <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0', height: '550px', background: '#FAF8F5' }}>
                <iframe
                  title="JotForm Preview"
                  src={jotforms[activePreviewKey]}
                  frameBorder="0"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            ) : (
              <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8', background: '#F8FAFC', borderRadius: '12px' }}>
                <HelpCircle size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>No hay ninguna URL configurada para esta página.</p>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem' }}>Introduce un enlace de JotForm en el campo correspondiente.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
