"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Plane, MapPin, Compass, DollarSign, ExternalLink } from 'lucide-react';
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

const mockHotels = [
  {
    name: "The Westin Harbour Castle",
    stars: "4.5★",
    desc: "Hotel sede oficial ubicado a pasos del lago Ontario. Cuenta con tarifas preferenciales exclusivas para expositoras de la delegación de EMM.",
    rate: "Desde $240 CAD / noche",
    photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Sheraton Centre Toronto",
    stars: "4.0★",
    desc: "Ubicación céntrica en el corazón financiero de Toronto. Conexión directa al PATH y fácil acceso en transporte público a las sedes del evento.",
    rate: "Desde $195 CAD / noche",
    photo: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=400"
  }
];

export default function ViajeroPage() {
  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.02, pointerEvents: 'none' }}>
        <Mariposa width={600} height={600} />
      </div>

      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '60px 48px 80px' }}>
        
        {/* 1. Hospedaje Sede */}
        <div id="hospedaje" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <Reveal style={{ marginBottom: '48px' }}>
            <span className="section__label">Convenios Oficiales</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Hospedaje & Hoteles Sede
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {mockHotels.map((hotel, idx) => (
              <Reveal key={hotel.name} delay={idx * 100}>
                <div style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,25,76,0.03)', height: '100%', border: '1px solid rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                    <img src={hotel.photo} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px 16px', background: 'rgba(255,255,255,0.92)', color: 'var(--navy)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                      {hotel.stars}
                    </span>
                  </div>
                  <div style={{ padding: '30px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>{hotel.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px', flexGrow: 1 }}>{hotel.desc}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--magenta)' }}>{hotel.rate}</span>
                      <a href="#" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--cyan)', textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Reservar tarifa <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 2. Vuelos y Traslados */}
        <div id="vuelos" style={{ marginBottom: '100px', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <Reveal>
              <span className="section__label">Convenios Aéreos</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--navy)', marginBottom: '24px' }}>
                Vuelos y Traslado Aéreo
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '24px' }}>
                Contamos con códigos promocionales oficiales de descuento en aerolíneas aliadas (Air Canada y Aeroméxico) aplicables para traslados directos hacia el Aeropuerto Internacional de Toronto Pearson (YYZ).
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Plane size={18} color="var(--magenta)" /> <span>Descuentos de hasta un 15% en vuelos de tarifa business y turista.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Compass size={18} color="var(--magenta)" /> <span>Soporte directo para la emisión de boletos grupales corporativos.</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: '#fff', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 40px rgba(0,25,76,0.04)', border: '1px solid rgba(0,0,0,0.01)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '24px' }}>Transporte Local en Toronto</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--cyan)', margin: '0 0 4px 0', textTransform: 'uppercase' }}>UP Express (Tren del Aeropuerto)</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Conecta Pearson (YYZ) con Union Station en solo 25 minutos. Salidas cada 15 minutos.</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--cyan)', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Red TTC (Metro y Tranvía)</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Sistema de tránsito integrado de la ciudad que conecta de forma rápida hoteles con todas las sedes.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </div>
  );
}
