'use client';

import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TerminosPage() {
  return (
    <div className="terms-page">
      <style>{`
        .terms-page {
          background: #FCFBF9;
          color: #111;
          padding: 140px 0 100px 0;
          font-family: var(--font-body), sans-serif;
          min-height: 100vh;
        }

        .terms-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .terms-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display), sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #666;
          text-decoration: none;
          margin-bottom: 40px;
          transition: color 0.2s;
        }

        .terms-back-link:hover {
          color: var(--magenta, #E4007C);
        }

        .terms-header {
          border-bottom: 1.5px solid #111;
          padding-bottom: 30px;
          margin-bottom: 50px;
        }

        .terms-category {
          font-family: var(--font-display), sans-serif;
          color: var(--magenta, #E4007C);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-bottom: 12px;
          display: block;
        }

        .terms-title {
          font-family: 'Didot', 'Times New Roman', serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 400;
          text-transform: uppercase;
          color: var(--navy, #002E51);
          margin: 0;
          line-height: 1.1;
        }

        .terms-date {
          font-size: 0.85rem;
          color: #777;
          font-style: italic;
          margin-top: 10px;
          display: block;
        }

        /* Callout Box for Visa Service Specifics */
        .terms-callout {
          background: rgba(228, 0, 124, 0.03);
          border: 1px solid rgba(228, 0, 124, 0.12);
          padding: 30px;
          margin: 40px 0;
          position: relative;
        }

        .terms-callout__title {
          font-family: var(--font-display), sans-serif;
          font-size: 0.82rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--magenta, #E4007C);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .terms-callout__text {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #444;
        }

        /* Policy layout standard formatting */
        .terms-section {
          margin-bottom: 45px;
        }

        .terms-section-title {
          font-family: var(--font-display), sans-serif;
          font-size: 0.95rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--navy, #002E51);
          margin: 0 0 20px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding-bottom: 10px;
        }

        .terms-section p {
          font-size: 0.95rem;
          line-height: 1.75;
          color: #333;
          margin-bottom: 16px;
        }

        .terms-section ul {
          margin: 0 0 20px 20px;
          padding: 0;
        }

        .terms-section li {
          font-size: 0.92rem;
          line-height: 1.7;
          color: #444;
          margin-bottom: 8px;
          list-style-type: square;
        }
      `}</style>

      <div className="terms-container">
        <Link href="/visa" className="terms-back-link">
          <ArrowLeft size={14} /> Volver a visas
        </Link>

        <header className="terms-header">
          <span className="terms-category">Información Legal</span>
          <h1 className="terms-title">Términos y Condiciones</h1>
          <span className="terms-date">Última actualización: 09 de Julio de 2026</span>
        </header>

        {/* Visa Special Callout Disclaimer */}
        <div className="terms-callout">
          <div className="terms-callout__title">
            <ShieldAlert size={18} />
            Cláusula de Deslinde para Trámite de Visas
          </div>
          <div className="terms-callout__text">
            Expo México Mujer (EMM) y sus asesores de visas actúan exclusivamente como facilitadores y gestores de solicitudes ante el gobierno de Canadá. <strong>Bajo ninguna circunstancia EMM garantiza la aprobación o estampado de visas</strong>, ya que la decisión final corresponde en su totalidad a Immigration, Refugees and Citizenship Canada (IRCC).
          </div>
        </div>

        <section className="terms-section">
          <h2 className="terms-section-title">1. Aceptación de los Términos</h2>
          <p>
            Al acceder a este sitio web y utilizar los servicios de registro, consultoría, compra de stands o gestoría de visas de Expo México Mujer 2027, el usuario acepta de manera expresa e incondicional sujetarse a los presentes Términos y Condiciones. Si no está de acuerdo con alguna de las cláusulas, solicitamos abstenerse de utilizar el sitio y contratar los servicios.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-section-title">2. Servicio de Trámite de Visas Canadienses</h2>
          <p>
            El servicio de asesoría y gestoría de visas prestado a través de nuestra plataforma se rige por las siguientes condiciones específicas:
          </p>
          <ul>
            <li>
              <strong>Rol del Gestor:</strong> Nuestra labor consiste en la asesoría, traducción simple, ordenamiento y carga en línea de los expedientes oficiales de la solicitud. No somos oficiales consulares ni empleados de la Embajada de Canadá.
            </li>
            <li>
              <strong>Responsabilidad de los Datos:</strong> El solicitante es el único responsable de la veracidad y legalidad de toda la información y documentos bancarios, de propiedad o laborales proporcionados. Proporcionar datos falsos es un delito grave ante la ley canadiense.
            </li>
            <li>
              <strong>Derechos Consulares No Reembolsables:</strong> Los pagos consulares ($185 CAD por visa de visitante, $100 CAD por renovación o $7 CAD por eTA) son cobrados directamente por el gobierno de Canadá. Dochis montos son no reembolsables bajo ningún supuesto de cancelación o rechazo.
            </li>
            <li>
              <strong>Tarifas de Asesoría de EMM:</strong> Los cargos cobrados por EMM por concepto de honorarios de gestoría cubren las horas invertidas en la revisión e integración del expediente. Una vez que la solicitud ha sido ingresada al portal IRCC, estos honorarios no son reembolsables.
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="terms-section-title">3. Cancelación de Stand por Falta de Visa</h2>
          <p>
            En caso de que a una expositora confirmada se le deniegue la visa canadiense, aplicarán las políticas de reembolso y cancelación ordinarias descritas en su contrato de stand. La denegación de visa no exime del cumplimiento de los plazos de cancelación del stand contratado. Recomendamos realizar el trámite con suficiente anticipación.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-section-title">4. Propiedad Intelectual</h2>
          <p>
            Todo el material contenido en este sitio, incluyendo textos, logotipos, imágenes, audios, videos y el código de programación, es propiedad intelectual exclusiva de Expo México Mujer 2027 o sus licenciantes, estando protegido bajo las leyes nacionales e internacionales de propiedad industrial. Queda prohibida su reproducción parcial o total sin consentimiento previo por escrito.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-section-title">5. Modificaciones</h2>
          <p>
            EMM se reserva el derecho de modificar o actualizar estos términos en cualquier momento sin previo aviso. Es responsabilidad del usuario revisar periódicamente esta sección para mantenerse informado de los lineamientos vigentes.
          </p>
        </section>
      </div>
    </div>
  );
}
