"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './WhatsAppChat.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useLanguage();

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

  const whatsappNumber = "527225514645";

  const getRouteKey = () => {
    if (pathname.startsWith('/expositores')) return 'expositores';
    if (pathname.startsWith('/embajadoras')) return 'embajadoras';
    if (pathname.startsWith('/patrocinadores')) return 'patrocinadores';
    if (pathname.startsWith('/invitados')) return 'invitados';
    if (pathname.startsWith('/agenda')) return 'agenda';
    if (pathname.startsWith('/academy')) return 'academy';
    if (pathname.startsWith('/visa') || pathname.startsWith('/tramites')) return 'visa';
    if (pathname.startsWith('/contacto')) return 'contacto';
    return 'default';
  };

  const routeKey = getRouteKey();
  const botMessage = t(`wa.bot.${routeKey}`);
  const userMessage = t(`wa.user.${routeKey}`);

  useEffect(() => {
    setInputValue(userMessage);
  }, [pathname, userMessage]);

  useEffect(() => {
    if (textareaRef.current) {
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      }, 0);
    }
  }, [inputValue, step]);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(inputValue)}`;

  const handleSend = () => {
    if (!inputValue.trim()) return;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setInputValue("");
    setIsOpen(false);
    setTimeout(() => setStep(0), 300);
  };

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={styles.container}>
      <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>

        <div className={styles.header}>
          <div className={styles.avatar}>
            <img
              src="/recursos/logo-emm-corto.png"
              alt="Logo Expo México Mujer"
            />
          </div>
          <div className={styles.headerInfo}>
            <h3 className={styles.headerTitle}>{t('wa.chat.title')}</h3>
            <p className={styles.headerSubtitle}>
              {step === 1 ? t('wa.chat.typing') : t('wa.chat.online')}
            </p>
          </div>

          <button className={styles.closeButton} onClick={toggleChat} aria-label={t('wa.chat.closeChat')}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.dateBadge}>{t('wa.chat.today')}</div>

          {step >= 1 && (
            <>
              {step === 1 ? (
                <div key="typing" className={`${styles.messageBubble} ${styles.typingBubble}`}>
                  <div className={styles.typing}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </div>
                </div>
              ) : (
                <div key="message" className={styles.messageBubble}>
                  <span>
                    {t('wa.chat.greeting')}<br /><br />
                    {botMessage}
                  </span>
                  <span className={styles.timestamp}>{timeString}</span>
                </div>
              )}
            </>
          )}
        </div>

        <div className={styles.inputArea}>
          {step === 2 ? (
            <>
              <textarea
                ref={textareaRef}
                className={styles.realInput}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight + 2}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={t('wa.chat.placeholder')}
                rows={1}
              />
              <button
                onClick={handleSend}
                className={styles.sendIconBtn}
                aria-label={t('wa.chat.sendLabel')}
                disabled={!inputValue.trim()}
              >
                <svg width="24" height="24" viewBox="0 0 400 400" aria-hidden="true">
                  <path
                    className={`${styles.sendIconPath} ${inputValue.trim() ? styles.iconActive : styles.iconInactive}`}
                    style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 32, strokeLinecap: 'round', strokeLinejoin: 'round' }}
                    d="M168.83 200.504H79.218L33.04 44.284a1 1 0 0 1 1.386-1.188L365.083 199.04a1 1 0 0 1 .003 1.808L34.432 357.903a1 1 0 0 1-1.388-1.187l29.42-99.427"
                  />
                  <path
                    className={`${styles.sendIconPath} ${!inputValue.trim() ? styles.iconActive : styles.iconInactive}`}
                    style={{ fill: 'currentColor', stroke: 'none' }}
                    d="M318.087 318.087c-52.982 52.982-132.708 62.922-195.725 29.82l-80.449 10.18 10.358-80.112C18.956 214.905 28.836 134.99 81.913 81.913c65.218-65.217 170.956-65.217 236.174 0 42.661 42.661 57.416 102.727 34.02 184.664-28.796 236.175-101.442 57.416-250.771 28.85-236.174-36.368zM93.364 290.963l18.423-11.838c35.617 20.916 71.055 30.686 112.592 30.686 112.181 0 203.447-91.246 203.447-203.447S336.56 3.02 224.379 3.02 20.933 94.162 20.933 206.342c0 38.647 13.916 77.295 34.298 107.618l-15.006 58.742 53.139-81.739z"
                  />
                </svg>
              </button>
            </>
          ) : (
            <div style={{ height: '48px', width: '100%' }}></div>
          )}
        </div>

      </div>

      <button
        type="button"
        aria-label={t('wa.chat.openChat')}
        className={`${styles.jcCustomBtn} ${isOpen ? styles.chatOpen : ''}`}
        onClick={toggleChat}
      >
        <span aria-hidden="true" className={`${styles.jcPulse} ${styles.jcPulse1}`}></span>
        <span aria-hidden="true" className={`${styles.jcPulse} ${styles.jcPulse2}`}></span>
        <span aria-hidden="true" className={styles.jcIco}>
          <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
