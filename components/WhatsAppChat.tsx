"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './WhatsAppChat.module.css';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0: closed, 1: typing, 2: message shown
  const pathname = usePathname();

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setStep(1);
    } else {
      setIsOpen(false);
      setTimeout(() => setStep(0), 300);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && step === 1) {
      timer = setTimeout(() => {
        setStep(2);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, step]);

  const whatsappNumber = "1234567890"; // Reemplazar con el número real de Expo México Mujer

  let botMessage = (
    <>Bienvenida a <b>Expo México Mujer 2027</b>. ¿En qué podemos ayudarte a impulsar tu negocio hoy?</>
  );
  let userMessage = "Hola, me gustaría obtener información sobre la Expo México Mujer 2027.";

  if (pathname.startsWith('/expositores')) {
    botMessage = <>Bienvenida a <b>Expo México Mujer 2027</b>. ¿Te interesa asegurar tu lugar como expositora y llegar a más clientes?</>;
    userMessage = "Hola, me gustaría recibir el dossier e información para participar como expositora.";
  } else if (pathname.startsWith('/embajadoras')) {
    botMessage = <>Bienvenida al programa de <b>Embajadoras EMM</b>. ¿Lista para liderar y representar a tu estado?</>;
    userMessage = "Hola, me gustaría postularme o recibir más información sobre el programa de Embajadoras.";
  } else if (pathname.startsWith('/patrocinadores')) {
    botMessage = <>Bienvenido a <b>Expo México Mujer 2027</b>. ¿Deseas potenciar tu marca con nuestros planes de patrocinio?</>;
    userMessage = "Hola, me gustaría conocer las opciones comerciales y de patrocinio para el evento.";
  } else if (pathname.startsWith('/invitados')) {
    botMessage = <>Bienvenido a <b>Expo México Mujer 2027</b>. ¿Tienes dudas sobre nuestros invitados especiales?</>;
    userMessage = "Hola, me gustaría obtener más detalles sobre los invitados especiales de la Expo.";
  } else if (pathname.startsWith('/agenda')) {
    botMessage = <>La <b>Agenda EMM 2027</b> está llena de conferencias y networking. ¿Qué información buscas?</>;
    userMessage = "Hola, me gustaría obtener más información sobre la agenda y el programa de actividades.";
  } else if (pathname.startsWith('/academy')) {
    botMessage = <>Bienvenida a <b>EMM Academy</b>. ¿Lista para capacitarte y crecer tu negocio?</>;
    userMessage = "Hola, me interesa conocer más sobre los talleres y capacitaciones de EMM Academy.";
  } else if (pathname.startsWith('/visa') || pathname.startsWith('/tramites')) {
    botMessage = <>Sabemos que viajar a Canadá requiere preparación. ¿Tienes dudas sobre el trámite de tu eTA o Visa?</>;
    userMessage = "Hola, necesito asesoría sobre los trámites migratorios (Visa/eTA) para asistir a la Expo.";
  } else if (pathname.startsWith('/contacto')) {
    botMessage = <>Estás en nuestra área de contacto. ¿Cómo podemos asistirte el día de hoy?</>;
    userMessage = "Hola, tengo una consulta general sobre la Expo México Mujer 2027.";
  }

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(userMessage)}`;

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={styles.container}>
      <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>

        {/* Cabecera idéntica a WA */}
        <div className={styles.header}>
          <div className={styles.avatar}>
            <img 
              src="/recursos/logo-emm-corto.png" 
              alt="Logo Expo México Mujer" 
            />
          </div>
          <div className={styles.headerInfo}>
            <h3 className={styles.headerTitle}>Expo México Mujer</h3>
            <p className={styles.headerSubtitle}>
              {step === 1 ? 'escribiendo...' : 'en línea'}
            </p>
          </div>

          {/* Botón de cerrar dentro de la cabecera */}
          <button className={styles.closeButton} onClick={toggleChat} aria-label="Cerrar chat">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </div>

        {/* Cuerpo con fondo y patrón oficial */}
        <div className={styles.body}>
          <div className={styles.dateBadge}>Hoy</div>

          {step >= 1 && (
            <>
              {step === 1 ? (
                <div className={`${styles.messageBubble} ${styles.typingBubble}`}>
                  <div className={styles.typing}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </div>
                </div>
              ) : (
                <div className={styles.messageBubble}>
                  <span>
                    ¡Hola! 👋<br /><br />
                    {botMessage}
                  </span>
                  <span className={styles.timestamp}>{timeString}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Área de Input de Texto Falso y Botón de Enviar */}
        <div className={styles.inputArea}>
          {step === 2 ? (
            <>
              <div className={styles.fakeInput}>
                {userMessage}
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.sendIconBtn} aria-label="Enviar mensaje a WhatsApp">
                {/* Ícono exacto de Enviar de WhatsApp Web */}
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
                </svg>
              </a>
            </>
          ) : (
            <div style={{ height: '48px', width: '100%' }}></div> /* Espaciador proporcional al nuevo botón */
          )}
        </div>

      </div>

      {/* Botón flotante que desaparece cuando el chat está abierto */}
      <button
        className={`${styles.toggleButton} ${isOpen ? styles.chatOpen : ''}`}
        onClick={toggleChat}
        aria-label="Abrir chat de WhatsApp"
      >
        <div className={styles.iconWrapper}>
          <svg className={styles.icon} viewBox="0 0 24 24">
            {/* Ícono oficial de WA */}
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </div>
      </button>
    </div>
  );
}
