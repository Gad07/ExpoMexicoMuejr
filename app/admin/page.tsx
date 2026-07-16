'use client';

import { Newspaper, FileText, Users, User, Eye, Calendar, ArrowUpRight, BookOpen, Handshake, Medal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ noticias: 0, expositores: 0, embajadoras: 0, aliados: 0, patrocinadores: 0 });
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');

    fetch('/api/admin/noticias')
      .then(res => res.json())
      .then(data => {
        if (data.noticias) setStats(s => ({ ...s, noticias: data.noticias.length }));
      })
      .catch(() => {});

    fetch('/api/admin/expositores')
      .then(res => res.json())
      .then(data => {
        if (data.exhibitors) setStats(s => ({ ...s, expositores: data.exhibitors.length }));
      })
      .catch(() => {});

    fetch('/api/admin/embajadoras')
      .then(res => res.json())
      .then(data => {
        if (data.ambassadors) setStats(s => ({ ...s, embajadoras: data.ambassadors.length }));
      })
      .catch(() => {});

    fetch('/api/admin/aliados')
      .then(res => res.json())
      .then(data => {
        if (data.allies) setStats(s => ({ ...s, aliados: data.allies.length }));
      })
      .catch(() => {});

    fetch('/api/admin/patrocinadores')
      .then(res => res.json())
      .then(data => {
        if (data.sponsors) setStats(s => ({ ...s, patrocinadores: data.sponsors.length }));
      })
      .catch(() => {});
  }, []);

  const cards = [
    {
      title: 'Noticias',
      value: stats.noticias,
      icon: <Newspaper size={20} />,
      color: '#E4007C',
      bg: 'rgba(228,0,124,0.06)',
      href: '/admin/noticias',
      desc: 'Artículos publicados',
      trend: '+12% este mes',
      sparkline: 'M0 25 Q15 15 30 28 T60 10 T90 30 L100 15',
    },
    {
      title: 'Páginas',
      value: '5',
      icon: <FileText size={20} />,
      color: '#002E51',
      bg: 'rgba(0,46,81,0.06)',
      href: '#',
      desc: 'Contenido estático',
      disabled: true,
      trend: 'Estable',
      sparkline: 'M0 20 Q15 20 30 20 T60 20 T90 20 L100 20',
    },
    {
      title: 'Expositores',
      value: stats.expositores,
      icon: <Users size={20} />,
      color: '#C79E45',
      bg: 'rgba(199,158,69,0.06)',
      href: '/admin/expositores',
      desc: 'Marcas registradas',
      trend: '+4 esta semana',
      sparkline: 'M0 30 Q15 25 30 15 T60 22 T90 5 L100 12',
    },
    {
      title: 'Embajadoras',
      value: stats.embajadoras,
      icon: <User size={20} />,
      color: '#00A3A3',
      bg: 'rgba(0,163,163,0.06)',
      href: '/admin/embajadoras',
      desc: 'Representantes estatales',
      trend: 'Completado',
      sparkline: 'M0 15 Q15 28 30 18 T60 25 T90 12 L100 8',
    },
    {
      title: 'Aliados',
      value: stats.aliados,
      icon: <Handshake size={20} />,
      color: '#8A2BE2',
      bg: 'rgba(138,43,226,0.06)',
      href: '/admin/aliados',
      desc: 'Aliados oficiales',
      trend: 'Configurables',
      sparkline: 'M0 20 Q15 10 30 25 T60 12 T90 28 L100 18',
    },
    {
      title: 'Patrocinadores',
      value: stats.patrocinadores,
      icon: <Medal size={20} />,
      color: '#E4B000',
      bg: 'rgba(228,176,0,0.06)',
      href: '/admin/patrocinadores',
      desc: 'Socios comerciales',
      trend: 'Nivelados',
      sparkline: 'M0 30 Q15 15 30 20 T60 5 T90 15 L100 10',
    },
    {
      title: 'Ver Sitio',
      value: 'Live',
      icon: <Eye size={20} />,
      color: '#002E51',
      bg: 'rgba(0,46,81,0.06)',
      href: '/',
      desc: 'Abrir página principal',
      external: true,
      trend: 'En Línea',
      sparkline: 'M0 20 Q15 15 30 25 T60 18 T90 22 L100 15',
    },
  ];

  const quickActions = [
    {
      label: 'Crear Noticia',
      desc: 'Redactar y publicar un nuevo artículo, boletín o anuncio en la sección de recursos.',
      icon: <Newspaper size={20} />,
      color: '#E4007C',
      bg: 'rgba(228,0,124,0.06)',
      href: '/admin/noticias',
    },
    {
      label: 'Gestionar Expositores',
      desc: 'Añadir marcas, logotipos, asignación de stands, información comercial y galerías.',
      icon: <Users size={20} />,
      color: '#C79E45',
      bg: 'rgba(199,158,69,0.06)',
      href: '/admin/expositores',
    },
    {
      label: 'Gestionar Embajadoras',
      desc: 'Administrar los datos, estados, fotos y biografías de las representantes de la Expo.',
      icon: <User size={20} />,
      color: '#00A3A3',
      bg: 'rgba(0,163,163,0.06)',
      href: '/admin/embajadoras',
    },
    {
      label: 'Gestionar Aliados',
      desc: 'Configurar los logotipos oficiales, enlaces de redirección y colores de marca de los aliados.',
      icon: <Handshake size={20} />,
      color: '#8A2BE2',
      bg: 'rgba(138,43,226,0.06)',
      href: '/admin/aliados',
    },
    {
      label: 'Gestionar Patrocinadores',
      desc: 'Configurar marcas patrocinadoras, niveles de aporte, logotipos y detalles comerciales.',
      icon: <Medal size={20} />,
      color: '#E4B000',
      bg: 'rgba(228,176,0,0.06)',
      href: '/admin/patrocinadores',
    },
    {
      label: 'Ver Recursos Públicos',
      desc: 'Revisar la sección pública de noticias, prensa y documentos descargables de la Expo.',
      icon: <BookOpen size={20} />,
      color: '#002E51',
      bg: 'rgba(0,46,81,0.06)',
      href: '/recursos',
      external: true,
    }
  ];

  return (
    <div className="admin-dashboard-container" style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
      <style>{`
        @media (max-width: 991px) {
          .admin-dashboard-container {
            padding: 24px 20px !important;
          }
          .admin-welcome-banner {
            padding: 32px 24px !important;
            border-radius: 16px !important;
          }
          .admin-welcome-banner h1 {
            font-size: 1.6rem !important;
          }
        }
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }
        @media (max-width: 1200px) {
          .admin-stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .admin-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Welcome Banner Card */}
      <div className="admin-welcome-banner" style={{
        background: 'linear-gradient(135deg, #002E51 0%, #001C33 100%)',
        borderRadius: '24px',
        padding: '40px',
        color: '#fff',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 30px rgba(0,46,81,0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        {/* Glow circle */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(228,0,124,0.15) 0%, rgba(228,0,124,0) 70%)',
          pointerEvents: 'none',
        }} />
        
        <div>
          <div style={{
            background: 'rgba(228,0,124,0.15)',
            color: '#FF6EB4',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: '100px',
            display: 'inline-block',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            border: '1px solid rgba(228,0,124,0.3)',
          }}>
            {greeting}
          </div>
          <h1 style={{
            margin: 0,
            fontSize: '2rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            Panel de Control Administrativo
          </h1>
          <p style={{
            margin: '8px 0 0',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.95rem',
            fontWeight: 400,
          }}>
            Expo México Mujer 2027 &middot; Gestiona el contenido dinámico del sitio principal
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
          <Calendar size={18} color="#FF6EB4" />
          Toronto &middot; Canadá
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {cards.map(card => (
          <div
            key={card.title}
            onClick={() => {
              if (!card.disabled) {
                if (card.external) window.open(card.href, '_blank');
                else router.push(card.href);
              }
            }}
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              cursor: card.disabled ? 'default' : 'pointer',
              border: '1px solid rgba(0,0,0,0.05)',
              borderLeft: `4px solid ${card.color}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: card.disabled ? 0.5 : 1,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '190px',
              boxSizing: 'border-box',
            }}
            onMouseEnter={e => {
              if (!card.disabled) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = card.color;
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.01)';
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: card.bg,
                color: card.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {card.icon}
              </div>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: card.color,
                background: `${card.color}0A`,
                padding: '2px 8px',
                borderRadius: '100px',
                border: `1px solid ${card.color}1C`,
              }}>
                {card.trend}
              </span>
            </div>

            {/* Middle row: Values */}
            <div style={{ margin: '14px 0 0' }}>
              <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '2px' }}>
                {card.title}
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#002E51', lineHeight: 1 }}>
                {card.value}
              </div>
            </div>

            {/* Sparkline & Subtitle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginTop: 'auto' }}>
              <div style={{ fontSize: '0.8rem', color: '#666', whiteSpace: 'nowrap' }}>{card.desc}</div>
              <div style={{ width: '60px', flexShrink: 0 }}>
                <svg width="100%" height="20" viewBox="0 0 100 20" fill="none">
                  <path d={card.sparkline} stroke={card.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 style={{ margin: '0 0 20px', fontSize: '1.2rem', fontWeight: 800, color: '#002E51', letterSpacing: '-0.01em' }}>
          Acciones Rápidas
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {quickActions.map(action => (
            <div
              key={action.label}
              onClick={() => {
                if (action.external) window.open(action.href, '_blank');
                else router.push(action.href);
              }}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '180px',
                boxSizing: 'border-box',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = action.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.01)';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: action.bg,
                  color: action.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {action.icon}
                </div>
                <ArrowUpRight size={18} style={{ opacity: 0.3, transition: 'all 0.2s' }} />
              </div>

              <div>
                <h4 style={{ margin: '0 0 6px', fontSize: '0.95rem', fontWeight: 800, color: '#002E51' }}>
                  {action.label}
                </h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', lineHeight: 1.4 }}>
                  {action.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}