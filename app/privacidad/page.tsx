'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacidadPage() {
  return (
    <div className="privacy-page">
      <style>{`
        .privacy-page {
          background: #FCFBF9;
          color: #111;
          padding: 140px 0 100px 0;
          font-family: var(--font-body), sans-serif;
          min-height: 100vh;
        }

        .privacy-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .privacy-back-link {
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

        .privacy-back-link:hover {
          color: var(--magenta, #E4007C);
        }

        .privacy-header {
          border-bottom: 1.5px solid #111;
          padding-bottom: 30px;
          margin-bottom: 50px;
        }

        .privacy-category {
          font-family: var(--font-display), sans-serif;
          color: var(--magenta, #E4007C);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-bottom: 12px;
          display: block;
        }

        .privacy-title {
          font-family: 'Didot', 'Times New Roman', serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 400;
          text-transform: uppercase;
          color: var(--navy, #002E51);
          margin: 0;
          line-height: 1.1;
        }

        .privacy-date {
          font-size: 0.85rem;
          color: #777;
          font-style: italic;
          margin-top: 10px;
          display: block;
        }

        /* Policy layout standard formatting */
        .privacy-section {
          margin-bottom: 45px;
        }

        .privacy-section-title {
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

        .privacy-section p {
          font-size: 0.95rem;
          line-height: 1.75;
          color: #333;
          margin-bottom: 16px;
        }

        .privacy-section ul {
          margin: 0 0 20px 20px;
          padding: 0;
        }

        .privacy-section li {
          font-size: 0.92rem;
          line-height: 1.7;
          color: #444;
          margin-bottom: 8px;
          list-style-type: square;
        }
      `}</style>

      <div className="privacy-container">

        <header className="privacy-header">
          <span className="privacy-category">Información Legal</span>
          <h1 className="privacy-title">Aviso de Privacidad</h1>
          <span className="privacy-date">Última actualización: 09 de Julio de 2026</span>
        </header>

        <section className="privacy-section">
          <h2 className="privacy-section-title">1. Identidad y Domicilio del Responsable</h2>
          <p>
            Expo México Mujer (en adelante, "EMM"), con domicilio de operación en la Ciudad de México, es responsable del tratamiento de los datos personales proporcionados por las usuarias, expositoras, visitantes y solicitantes de gestoría de visas de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">2. Datos Personales Recabados</h2>
          <p>
            Para llevar a cabo las finalidades descritas en el presente aviso, recabamos los siguientes datos personales:
          </p>
          <ul>
            <li>
              <strong>Datos de Identificación y Contacto:</strong> Nombre completo, correo electrónico, teléfono/WhatsApp, estado de residencia y estatus de registro en la Expo.
            </li>
            <li>
              <strong>Datos Financieros y Patrimoniales (para trámite de visa):</strong> Comprobantes de ingresos bancarios, estados de cuenta, escrituras de propiedad y constancias de empleo. Estos datos son proporcionados voluntariamente por el solicitante exclusivamente para integrar el expediente migratorio.
            </li>
            <li>
              <strong>Datos Migratorios:</strong> Número y vigencia de pasaporte, historial de viajes previos, historial de visados de EE.UU. y Canadá.
            </li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">3. Finalidades del Tratamiento</h2>
          <p>
            Los datos personales recopilados se utilizarán para las siguientes finalidades primarias:
          </p>
          <ul>
            <li>
              Analizar la elegibilidad migratoria del solicitante (diagnóstico inicial).
            </li>
            <li>
              Integrar y llenar las solicitudes oficiales en el portal del gobierno de Canadá (IRCC).
            </li>
            <li>
              Coordinar las citas biométricas en los centros VFS Global autorizados.
            </li>
            <li>
              Enviar notificaciones del estatus de la solicitud de visa y coordinar la mensajería del pasaporte físico.
            </li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">4. Transferencia de Datos</h2>
          <p>
            EMM se compromete a no transferir sus datos personales a terceros comerciales sin su previo consentimiento. Las únicas transferencias realizadas serán aquellas necesarias por mandato de ley o para el cumplimiento del servicio solicitado, tales como el envío del expediente de visa a la plataforma oficial de inmigración del Gobierno de Canadá (IRCC) y centros de biometría VFS Global.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-section-title">5. Derechos ARCO</h2>
          <p>
            Usted tiene derecho a conocer qué datos personales tenemos, para qué los utilizamos y las condiciones de su uso (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal si está desactualizada o es inexacta (Rectificación); que la eliminemos de nuestros registros (Cancelación); así como oponerse al uso de sus datos para fines específicos (Oposición).
          </p>
          <p>
            Para el ejercicio de cualquiera de los derechos ARCO, deberá presentar una solicitud enviando un correo electrónico a <strong>legal@expomexicomujer.com</strong> detallando su nombre y derecho a ejercer.
          </p>
        </section>
      </div>
    </div>
  );
}
