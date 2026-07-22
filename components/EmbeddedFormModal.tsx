'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, ExternalLink } from 'lucide-react';

interface ModalDetail {
  url?: string;
  title?: string;
}

function getCleanEmbedUrl(url?: string): string {
  if (!url) return '';
  let clean = url.trim();
  // Auto-convert Jotform submit URL to form URL (submit.jotform.com -> form.jotform.com)
  if (clean.includes('submit.jotform')) {
    clean = clean.replace(/submit\.jotform/gi, 'form.jotform');
  }
  return clean;
}

export default function EmbeddedFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [rawFormUrl, setRawFormUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('Formulario de Contacto / Registro');
  const [loadingIframe, setLoadingIframe] = useState(true);

  // Form State for embedded native form fallback
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'expositora',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<ModalDetail>;
      const detail = customEvent.detail || {};
      
      setRawFormUrl(detail.url || '');
      setTitle(detail.title || 'Formulario de Contacto / Registro');
      setLoadingIframe(true);
      setSubmitted(false);
      setIsOpen(true);
    };

    const handleOpenContact = () => {
      setRawFormUrl('');
      setTitle('Inscripción y Contacto');
      setSubmitted(false);
      setIsOpen(true);
    };

    window.addEventListener('openEmbeddedFormModal', handleOpen as EventListener);
    window.addEventListener('openContactModal', handleOpenContact);

    return () => {
      window.removeEventListener('openEmbeddedFormModal', handleOpen as EventListener);
      window.removeEventListener('openContactModal', handleOpenContact);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmitNative = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  if (!isOpen) return null;

  const formUrl = getCleanEmbedUrl(rawFormUrl);
  const isExternalUrl = formUrl && (formUrl.startsWith('http://') || formUrl.startsWith('https://'));

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 25, 76, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'emmModalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
      onClick={handleClose}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes emmModalFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      ` }} />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: isExternalUrl ? '900px' : '580px',
          height: isExternalUrl ? '85vh' : 'auto',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 24px',
            background: 'linear-gradient(135deg, #002E51 0%, #00194C 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-display)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isExternalUrl && (
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '8px 14px',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'background 0.2s'
                }}
              >
                Abrir fuera <ExternalLink size={14} />
              </a>
            )}

            <button
              onClick={handleClose}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, position: 'relative', overflowY: 'auto', padding: isExternalUrl ? 0 : '32px' }}>
          {isExternalUrl ? (
            <>
              {loadingIframe && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#F9F7F5',
                    color: '#002E51',
                    fontWeight: 600,
                    gap: '12px',
                    zIndex: 2
                  }}
                >
                  <div>Cargando formulario...</div>
                  <a
                    href={formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85rem', color: '#E4007C', textDecoration: 'underline' }}
                  >
                    ¿No carga? Haz clic aquí para abrir en ventana completa
                  </a>
                </div>
              )}
              <iframe
                src={formUrl}
                style={{ width: '100%', height: '100%', border: 'none' }}
                onLoad={() => setLoadingIframe(false)}
                allow="geolocation; microphone; camera; payment"
                allowFullScreen
                title="Formulario Embebido"
              />
            </>
          ) : (
            <div>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ color: '#E4007C', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                    <CheckCircle size={56} />
                  </div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#002E51', margin: '0 0 12px 0' }}>
                    ¡Solicitud Recibida!
                  </h4>
                  <p style={{ color: '#475569', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                    Gracias por ponerte en contacto. Un asesor de Expo México Mujer revisará tu información y te contactará en breve.
                  </p>
                  <button
                    onClick={handleClose}
                    style={{
                      padding: '12px 28px',
                      background: '#002E51',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cerrar Ventana
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitNative} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#002E51', marginBottom: '6px' }}>
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. María González"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#002E51', marginBottom: '6px' }}>
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="maria@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#002E51', marginBottom: '6px' }}>
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+52 55 1234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#002E51', marginBottom: '6px' }}>
                      Interés Principal *
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.95rem',
                        backgroundColor: '#FFF'
                      }}
                    >
                      <option value="expositora">Expositora / Registrar Stand</option>
                      <option value="patrocinador">Patrocinador / Aliado</option>
                      <option value="visitante">Visitante / Comprador Internacional</option>
                      <option value="prensa">Prensa / Comunicados</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#002E51', marginBottom: '6px' }}>
                      Mensaje Adicional
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Escribe tus dudas o requerimientos especiales..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.95rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '12px',
                      background: '#E4007C',
                      color: '#FFFFFF',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 10px 20px rgba(228, 0, 124, 0.25)'
                    }}
                  >
                    {isSubmitting ? 'Enviando...' : (
                      <>
                        Enviar Solicitud <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
