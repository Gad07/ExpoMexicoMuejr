"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Box, Truck, CheckCircle, AlertCircle, FileText, Anchor } from 'lucide-react';
import { Mariposa } from '@/components/BrandAssets';

function Reveal({
  children, className = '', delay = 0, style = {},
}: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }}>
      {children}
    </div>
  );
}

export default function LogisticaPage() {
  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* Back Link */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--cyan)', textDecoration: 'none', fontWeight: 700, marginBottom: '40px' }}>
          <ArrowLeft size={16} /> Volver al Inicio
        </Link>

        {/* 1. Exportación Temporal vs Definitiva */}
        <div id="aduanas" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <Reveal>
              <span className="section__label">Aduanas y Regulaciones</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px' }}>
                Esquemas de Exportación
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '24px' }}>
                Para el ingreso de tus productos de exhibición a territorio canadiense, el comité organizador de Expo México Mujer ofrece asesoría y acompañamiento técnico en dos esquemas comerciales principales.
              </p>
              
              <div style={{ background: '#fff', padding: '32px', borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)', display: 'flex', gap: '16px', alignItems: 'start' }}>
                <AlertCircle size={24} color="var(--magenta)" style={{ flexShrink: 0, marginTop: '4px' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  <strong>Importante:</strong> Los trámites aduanales deben iniciarse al menos con 90 días de anticipación para evitar demoras en aduana fronteriza.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,186,211,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)' }}><FileText size={20} /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>Exportación Temporal</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                    Ideal para muestras de exhibición, mobiliario de stand o piezas de pasarela que regresarán a México después del evento. Exento del pago de aranceles bajo el cuaderno ATA o fianza aduanal temporal.
                  </p>
                </div>

                <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,186,211,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)' }}><Anchor size={20} /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>Exportación Definitiva</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                    Recomendado para productos destinados a la venta directa en el evento, muestras de degustación consumibles o inventario vendido previamente a importadores canadienses. Sujeto a impuestos e importación formal canadiense.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 2. Asesoría Logística & Soluciones de Transporte */}
        <div id="transporte" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px', textAlign: 'center' }}>
            <span className="section__label">Operaciones</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Asesoría & Soluciones de Transporte
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <Reveal delay={100}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)', height: '100%' }}>
                <div style={{ color: 'var(--magenta)', marginBottom: '24px' }}><Truck size={36} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>Consolidación de Carga</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: 0 }}>
                  Ofrecemos recolección de mercancías en hubs estratégicos (CDMX, Guadalajara y Monterrey) para realizar un embarque consolidated terrestre o aéreo hacia Toronto con tarifas preferenciales.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)', height: '100%' }}>
                <div style={{ color: 'var(--magenta)', marginBottom: '24px' }}><CheckCircle size={36} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>Brokerage Aduanal</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: 0 }}>
                  Coordinación integral con agencias aduanales en frontera (Laredo) y en las aduanas de Canadá para agilizar la clasificación arancelaria y la liberación de embarques comerciales.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', border: '1px solid rgba(0,0,0,0.01)', height: '100%' }}>
                <div style={{ color: 'var(--magenta)', marginBottom: '24px' }}><Box size={36} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>Servicio de Entrega Final</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: 0 }}>
                  Recepción de mercancía en el warehouse de Toronto previo al evento, custodia asegurada y entrega directa de cajas en el stand asignado a cada delegada expositora.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </div>
  );
}
