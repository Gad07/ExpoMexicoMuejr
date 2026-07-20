'use client';

import React, { useState } from 'react';
import { 
  FileText, Check, ChevronDown, ChevronUp, AlertCircle, 
  HelpCircle, Send, IdCard, Award, Clock, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function VisaPage() {
  const { t } = useLanguage();
  // Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  
  // Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hasUsVisa: '',
    role: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCheck = (id: number) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.hasUsVisa || !formData.role) {
      alert(t('pages.visa.form.alert'));
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const visaSteps = [
    {
      num: "01",
      title: t('pages.visa.steps.s1.title'),
      desc: t('pages.visa.steps.s1.desc')
    },
    {
      num: "02",
      title: t('pages.visa.steps.s2.title'),
      desc: t('pages.visa.steps.s2.desc')
    },
    {
      num: "03",
      title: t('pages.visa.steps.s3.title'),
      desc: t('pages.visa.steps.s3.desc')
    },
    {
      num: "04",
      title: t('pages.visa.steps.s4.title'),
      desc: t('pages.visa.steps.s4.desc')
    },
    {
      num: "05",
      title: t('pages.visa.steps.s5.title'),
      desc: t('pages.visa.steps.s5.desc')
    }
  ];

  const checklistItems = [
    { id: 1, text: t('pages.visa.checklist.i1') },
    { id: 2, text: t('pages.visa.checklist.i2') },
    { id: 3, text: t('pages.visa.checklist.i3') },
    { id: 4, text: t('pages.visa.checklist.i4') },
    { id: 5, text: t('pages.visa.checklist.i5') },
    { id: 6, text: t('pages.visa.checklist.i6') }
  ];

  const faqs = [
    {
      q: t('pages.visa.faqs.q1'),
      a: t('pages.visa.faqs.a1')
    },
    {
      q: t('pages.visa.faqs.q2'),
      a: t('pages.visa.faqs.a2')
    },
    {
      q: t('pages.visa.faqs.q3'),
      a: t('pages.visa.faqs.a3')
    },
    {
      q: t('pages.visa.faqs.q4'),
      a: t('pages.visa.faqs.a4')
    },
    {
      q: t('pages.visa.faqs.q5'),
      a: t('pages.visa.faqs.a5')
    }
  ];

  return (
    <div className="visa-service-page">
      <style>{`
        /* ══════════════════════════════════════════════════════════
           VISA SERVICE PAGE STYLE SYSTEM
           ══════════════════════════════════════════════════════════ */
        .visa-service-page {
          background: #FCFBF9; /* Consistent warm linen background */
          color: #111111;
          padding-bottom: 120px;
          font-family: var(--font-body), sans-serif;
        }

        .visa-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          box-sizing: border-box;
        }

        @media (max-width: 600px) {
          .visa-container {
            padding: 0 20px;
          }
        }

        /* Introduction / Service summary section */
        .visa-intro {
          padding: 80px 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        @media (max-width: 900px) {
          .visa-intro {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 60px 0;
          }
        }

        .visa-intro__left {
        }

        .visa-intro__category {
          font-family: var(--font-display), sans-serif;
          color: var(--magenta, #E4007C);
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-bottom: 16px;
          display: block;
        }

        .visa-intro__title {
          font-family: 'Didot', 'Bodoni MT', 'Times New Roman', serif;
          font-size: clamp(2.5rem, 4vw, 3.8rem);
          font-weight: 400;
          line-height: 1.1;
          color: var(--navy, #002E51);
          margin: 0 0 24px 0;
          text-transform: uppercase;
        }

        .visa-intro__text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #333;
        }

        .visa-intro__text p {
          margin-bottom: 20px;
        }

        .visa-intro__alert {
          background: rgba(228, 0, 124, 0.04);
          border-left: 2px solid var(--magenta);
          padding: 20px;
          margin-top: 30px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .visa-intro__alert-icon {
          color: var(--magenta);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .visa-intro__alert-text {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #444;
        }

        .visa-intro__alert-text strong {
          color: #111;
        }

        /* Highlights Card (Right Side) */
        .visa-intro__right {
          background: #FFF;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 20px 40px rgba(0,0,0,0.03);
          padding: 40px;
          position: sticky;
          top: 120px;
        }

        .visa-card__title {
          font-family: var(--font-display), sans-serif;
          font-size: 0.95rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--navy);
          border-bottom: 1.5px solid var(--navy);
          padding-bottom: 12px;
          margin-bottom: 30px;
          display: block;
        }

        .visa-features-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .visa-feature-item {
          display: flex;
          gap: 20px;
          align-items: start;
        }

        .visa-feature-icon-box {
          background: rgba(0, 46, 81, 0.05);
          color: var(--navy);
          padding: 10px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .visa-feature-content {
        }

        .visa-feature-title {
          font-family: var(--font-display), sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #111;
          margin-bottom: 4px;
          display: block;
        }

        .visa-feature-desc {
          font-size: 0.85rem;
          line-height: 1.45;
          color: #555;
        }

        /* Steps Timeline Section */
        .visa-steps-section {
          padding: 80px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .section-header-center {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 60px auto;
        }

        .section-category {
          font-family: var(--font-display), sans-serif;
          color: var(--gold, #C79E45);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 12px;
          display: block;
        }

        .section-title {
          font-family: 'Didot', 'Times New Roman', serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 400;
          text-transform: uppercase;
          color: var(--navy);
          margin: 0;
          letter-spacing: -0.01em;
        }

        .visa-steps-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .visa-steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 600px) {
          .visa-steps-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .visa-step-card {
          position: relative;
          background: #FFF;
          border: 1px solid rgba(0,0,0,0.06);
          padding: 24px;
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .visa-step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.05);
        }

        .visa-step-num {
          font-family: 'Didot', serif;
          font-size: 3rem;
          font-style: italic;
          color: var(--magenta);
          line-height: 1;
          margin-bottom: 12px;
          font-weight: 300;
        }

        .visa-step-title {
          font-family: var(--font-display), sans-serif;
          font-size: 0.8rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #111;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          padding-bottom: 8px;
          display: block;
        }

        .visa-step-desc {
          font-size: 0.82rem;
          line-height: 1.5;
          color: #555;
        }

        /* Interactive Checklist and FAQ Grid */
        .visa-details-grid {
          padding: 80px 0;
          display: grid;
          grid-template-columns: 1.1fr 1.2fr;
          gap: 80px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        @media (max-width: 900px) {
          .visa-details-grid {
            grid-template-columns: 1fr;
            gap: 60px;
            padding: 60px 0;
          }
        }

        /* Interactive Checklist */
        .visa-checklist-box {
        }

        .checklist-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #555;
          margin-bottom: 30px;
        }

        .checklist-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .checklist-item {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 16px;
          align-items: center;
          padding: 16px 20px;
          background: #FFF;
          border: 1px solid rgba(0,0,0,0.06);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          user-select: none;
        }

        .checklist-item:hover {
          background: #FDFDFB;
          border-color: rgba(0,0,0,0.12);
        }

        .checklist-item--checked {
          background: rgba(0, 46, 81, 0.01);
          border-color: rgba(0, 46, 81, 0.15);
        }

        .checklist-checkbox {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          background: #FFF;
        }

        .checklist-item--checked .checklist-checkbox {
          background: var(--navy);
          border-color: var(--navy);
          color: #FFF;
        }

        .checklist-text {
          font-size: 0.88rem;
          line-height: 1.5;
          color: #333;
          transition: color 0.2s;
        }

        .checklist-item--checked .checklist-text {
          color: #888;
          text-decoration: line-through;
        }

        /* Accordion FAQ */
        .visa-faq-box {
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-item {
          background: #FFF;
          border: 1px solid rgba(0,0,0,0.06);
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .faq-item--active {
          border-color: rgba(0, 46, 81, 0.15);
          box-shadow: 0 10px 25px rgba(0,0,0,0.02);
        }

        .faq-trigger {
          width: 100%;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          outline: none;
        }

        .faq-question {
          font-family: var(--font-display), sans-serif;
          font-size: 0.88rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--navy);
          line-height: 1.4;
          padding-right: 16px;
        }

        .faq-icon-box {
          color: var(--navy);
          flex-shrink: 0;
          transition: transform 0.3s;
        }

        .faq-content {
          max-height: 0;
          transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s;
          padding: 0 24px;
          overflow: hidden;
          font-size: 0.92rem;
          line-height: 1.6;
          color: #555;
        }

        .faq-item--active .faq-content {
          max-height: 200px;
          padding-bottom: 24px;
        }

        /* Premium Forms section */
        .visa-form-section {
          padding: 80px 0 20px 0;
        }

        .visa-form-layout {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 80px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .visa-form-layout {
            grid-template-columns: 1fr;
            gap: 50px;
          }
        }

        .visa-form-info {
        }

        .visa-form-info__text {
          font-size: 1.02rem;
          line-height: 1.75;
          color: #444;
          margin-bottom: 30px;
        }

        .visa-badge-row {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-top: 40px;
        }

        .visa-badge-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .visa-badge-val {
          font-family: var(--font-display), sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--navy);
          line-height: 1;
        }

        .visa-badge-lbl {
          font-family: var(--font-display), sans-serif;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #777;
          line-height: 1.3;
        }

        /* Glassmorphism Premium Form */
        .visa-glass-card {
          background: #FFF;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.04);
          padding: 50px;
          position: relative;
        }

        @media (max-width: 600px) {
          .visa-glass-card {
            padding: 30px 20px;
          }
        }

        .visa-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        @media (max-width: 600px) {
          .form-group-grid {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-family: var(--font-display), sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #333;
        }

        .form-label span.req {
          color: var(--magenta);
          margin-left: 4px;
        }

        .form-input {
          width: 100%;
          padding: 14px 20px;
          background: #FFF;
          border: 1px solid rgba(0, 0, 0, 0.12);
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: #111;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-input:focus {
          border-color: var(--magenta);
          box-shadow: 0 0 0 4px rgba(228, 0, 124, 0.06);
        }

        .form-select {
          width: 100%;
          padding: 14px 20px;
          background: #FFF;
          border: 1px solid rgba(0, 0, 0, 0.12);
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: #111;
          outline: none;
          box-sizing: border-box;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 20px center;
          background-size: 16px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-select:focus {
          border-color: var(--magenta);
          box-shadow: 0 0 0 4px rgba(228, 0, 124, 0.06);
        }

        .form-textarea {
          width: 100%;
          padding: 14px 20px;
          background: #FFF;
          border: 1px solid rgba(0, 0, 0, 0.12);
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: #111;
          outline: none;
          box-sizing: border-box;
          resize: vertical;
          min-height: 120px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-textarea:focus {
          border-color: var(--magenta);
          box-shadow: 0 0 0 4px rgba(228, 0, 124, 0.06);
        }

        .btn-submit {
          width: 100%;
          padding: 18px;
          background: var(--navy);
          color: #FFF;
          border: none;
          font-family: var(--font-display), sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.3s, transform 0.2s;
        }

        .btn-submit:hover {
          background: var(--magenta);
        }
        .btn-submit:active {
          transform: scale(0.98);
        }

        /* Success Card State */
        .success-card {
          text-align: center;
          padding: 40px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-icon-box {
          width: 70px;
          height: 70px;
          background: rgba(0, 46, 81, 0.04);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--magenta);
          margin-bottom: 24px;
          box-shadow: 0 10px 20px rgba(228,0,124,0.05);
        }

        .success-title {
          font-family: var(--font-display), sans-serif;
          font-size: 1.1rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--navy);
          margin: 0 0 12px 0;
        }

        .success-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #555;
          max-width: 420px;
          margin: 0 auto;
        }
      `}</style>

      {/* Intro Section */}
      <div className="visa-container">
        <section className="visa-intro">
          {/* Left Description column */}
          <div className="visa-intro__left">
            <span className="visa-intro__category">Servicios Binacionales // Canadá 2027</span>
            <h2 className="visa-intro__title">Gestión de Visas para Expositoras</h2>
            
            <div className="visa-intro__text">
              <p>
                Viajar a Canadá representa una oportunidad comercial inmejorable para consolidar y expandir tu empresa en el mercado norteamericano. Sin embargo, contar con la documentación legal adecuada es el primer y más importante paso de tu planeación de viaje.
              </p>
              <p>
                En **Expo México Mujer 2027**, entendemos los retos administrativos que esto representa. Por ello, ponemos a tu disposición un equipo de consultores especializados en derecho migratorio canadiense para coordinar, revisar y dar seguimiento completo a tu trámite de visa.
              </p>
            </div>

            {/* Official Change Alert */}
            <div className="visa-intro__alert">
              <AlertCircle className="visa-intro__alert-icon" size={24} />
              <div className="visa-intro__alert-text">
                <strong>Importante (Actualización de Viaje):</strong> A partir de 2024, el gobierno de Canadá ha reintroducido el requisito de <strong>Visa de Visitante</strong> para ciudadanos mexicanos. Si no cuentas con una visa americana vigente o visa canadiense previa en los últimos 10 años (requisitos para tramitar una eTA ágil), debes realizar un trámite completo de visa física. Te recomendamos iniciar tu solicitud hoy mismo.
              </div>
            </div>
          </div>

        </section>
      </div>

      {/* Steps Timeline Section */}
      <div className="visa-container">
        <section className="visa-steps-section">
          <div className="section-header-center">
            <span className="section-category">{t('pages.visa.methodology.eyebrow')}</span>
            <h3 className="section-title">{t('pages.visa.methodology.title')}</h3>
          </div>

          <div className="visa-steps-grid">
            {visaSteps.map((step, idx) => (
              <div className="visa-step-card" key={idx}>
                <div className="visa-step-num">{step.num}</div>
                <span className="visa-step-title">{step.title}</span>
                <p className="visa-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Checklist and FAQs grid */}
      <div className="visa-container">
        <section className="visa-details-grid" id="requisitos">
          
          {/* Interactive Checklist Column */}
          <div className="visa-checklist-box">
            <span className="section-category">{t('pages.visa.requirements.eyebrow')}</span>
            <h3 className="section-title" style={{ marginBottom: '16px' }}>{t('pages.visa.requirements.title')}</h3>
            <p className="checklist-desc">
              {t('pages.visa.requirements.desc')}
            </p>

            <div className="checklist-list">
              {checklistItems.map((item) => (
                <div 
                  className={`checklist-item ${checkedItems[item.id] ? 'checklist-item--checked' : ''}`}
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                >
                  <div className="checklist-checkbox">
                    {checkedItems[item.id] && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className="checklist-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion Column */}
          <div className="visa-faq-box">
            <span className="section-category">{t('pages.visa.faqSection.eyebrow')}</span>
            <h3 className="section-title" style={{ marginBottom: '30px' }}>{t('pages.visa.faqSection.title')}</h3>
            
            <div className="faq-list">
              {faqs.map((faq, idx) => (
                <div 
                  className={`faq-item ${activeFaq === idx ? 'faq-item--active' : ''}`}
                  key={idx}
                >
                  <button className="faq-trigger" onClick={() => toggleFaq(idx)}>
                    <span className="faq-question">{faq.q}</span>
                    <span className="faq-icon-box">
                      {activeFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  <div className="faq-content">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>

      {/* Intake Contact Form section */}
      <div className="visa-container" id="solicitud">
        <section className="visa-form-section">
          
          <div className="visa-form-layout">
            
            {/* Form text details */}
            <div className="visa-form-info">
              <span className="section-category">{t('pages.visa.formSection.eyebrow')}</span>
              <h3 className="section-title" style={{ marginBottom: '24px' }}>{t('pages.visa.formSection.title')}</h3>
              <p className="visa-form-info__text">
                {t('pages.visa.formSection.desc')}
              </p>
              
              <div className="visa-badge-row">
                <div className="visa-badge-item">
                  <div className="visa-badge-val">24h</div>
                  <div className="visa-badge-lbl">Tiempo de<br />Respuesta</div>
                </div>
                <div className="visa-badge-item">
                  <div className="visa-badge-val">100%</div>
                  <div className="visa-badge-lbl">Asesoría<br />Personalizada</div>
                </div>
              </div>
            </div>

            {/* Premium glass form container */}
            <div className="visa-glass-card">
              {submitted ? (
                <div className="success-card">
                  <div className="success-icon-box">
                    <ShieldCheck size={36} />
                  </div>
                  <h4 className="success-title">{t('pages.visa.form.successTitle')}</h4>
                  <p className="success-desc">
                    {t('pages.visa.form.successDesc')}
                  </p>
                </div>
              ) : (
                <form className="visa-form" onSubmit={handleSubmit}>
                  
                  <div className="form-group">
                    <label className="form-label">Nombre Completo<span className="req">*</span></label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Ej. María González Pérez"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group-grid">
                    <div className="form-group">
                      <label className="form-label">Correo Electrónico<span className="req">*</span></label>
                      <input 
                        type="email" 
                        className="form-input" 
                        placeholder="Ej. maria@ejemplo.com"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Teléfono (WhatsApp)<span className="req">*</span></label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        placeholder="Ej. +52 55 1234 5678"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group-grid">
                    <div className="form-group">
                      <label className="form-label">{t('pages.visa.form.usVisa')}<span className="req">*</span></label>
                      <select 
                        className="form-select" 
                        required
                        value={formData.hasUsVisa}
                        onChange={e => setFormData({ ...formData, hasUsVisa: e.target.value })}
                      >
                        <option value="">{t('pages.visa.form.select')}</option>
                        <option value="si">{t('pages.visa.form.usVisaYes')}</option>
                        <option value="no">{t('pages.visa.form.usVisaNo')}</option>
                        <option value="canadiense">{t('pages.visa.form.usVisaCan')}</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('pages.visa.form.status')}<span className="req">*</span></label>
                      <select 
                        className="form-select" 
                        required
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                      >
                        <option value="">{t('pages.visa.form.select')}</option>
                        <option value="expositora">{t('pages.visa.form.statusExpositora')}</option>
                        <option value="interesada">{t('pages.visa.form.statusInteresada')}</option>
                        <option value="visitante">{t('pages.visa.form.statusVisitante')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('pages.visa.form.message')}</label>
                    <textarea 
                      className="form-textarea" 
                      placeholder={t('pages.visa.form.messagePlaceholder')}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span>Procesando...</span>
                    ) : (
                      <>
                        Enviar Solicitud <Send size={14} />
                      </>
                    )}
                  </button>

                  <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '16px', textAlign: 'center', lineHeight: '1.4' }}>
                    Al enviar esta solicitud, aceptas nuestros{' '}
                    <a href="/terminos" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--magenta, #E4007C)', textDecoration: 'underline' }}>
                      Términos y Condiciones
                    </a>{' '}
                    y nuestro{' '}
                    <a href="/privacidad" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--magenta, #E4007C)', textDecoration: 'underline' }}>
                      Aviso de Privacidad
                    </a>.
                  </p>

                </form>
              )}
            </div>

          </div>

        </section>
      </div>

    </div>
  );
}
