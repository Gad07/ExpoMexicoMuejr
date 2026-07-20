'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Newspaper, LayoutDashboard, Settings, Users, User, Menu, X, Handshake, Medal, ChevronDown, ShoppingBag, Star, Image as ImageIcon, IdCard, Calendar, Navigation, AppWindow, Type } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name?: string; email?: string; method: string } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        if (token) {
          setAuthenticated(true);
          setUser({ name: 'Admin', method: 'token' });
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const session = await res.json();
          if (session?.user) {
            setAuthenticated(true);
            setUser({ name: session.user.name, email: session.user.email, method: 'google' });
            setLoading(false);
            return;
          }
        }
      } catch {}
      setAuthenticated(false);
      setLoading(false);
    };

    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    checkAuth();
  }, [pathname]);

  useEffect(() => {
    if (!loading && !authenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [loading, authenticated, pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#FAF8F5',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #E4007C',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ color: '#002E51', fontWeight: 600, fontSize: '0.9rem' }}>Cargando...</div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

    const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/admin' },
    { label: 'Banners', icon: <ImageIcon size={18} />, href: '/admin/banners' },
    { label: 'Portadas', icon: <AppWindow size={18} />, href: '/admin/heroes' },
    { label: 'Páginas', icon: <Type size={18} />, href: '/admin/paginas' },
    { label: 'Noticias', icon: <Newspaper size={18} />, href: '/admin/noticias' },
    { label: 'Navegación', icon: <Navigation size={18} />, href: '/admin/navbar' },
    { label: 'Agendas', icon: <Calendar size={18} />, href: '/admin/agendas' },
    {
      label: 'Directorios',
      icon: <Users size={18} />,
      items: [
        { label: 'Expositores', href: '/admin/expositores', icon: <Users size={16} /> },
        { label: 'Embajadoras', href: '/admin/embajadoras', icon: <User size={16} /> },
        { label: 'Compradores', href: '/admin/compradores', icon: <ShoppingBag size={16} /> },
        { label: 'Invitados', href: '/admin/invitados', icon: <Star size={16} /> },
        { label: 'Patrocinadores', href: '/admin/patrocinadores', icon: <Medal size={16} /> },
        { label: 'Aliados', href: '/admin/aliados', icon: <Handshake size={16} /> },
      ]
    },
    { label: 'Business Cards', icon: <IdCard size={18} />, href: '/admin/business-cards' },
    { label: 'Configuración', icon: <Settings size={18} />, href: '/admin/config', disabled: true },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: '#F9F7F5',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <style>{`
        /* Top Navigation Header Styles */
        .admin-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        .admin-nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .admin-nav-links {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .admin-nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: none;
          background: transparent;
          color: #555;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .admin-nav-btn:hover:not(:disabled) {
          background: rgba(228,0,124,0.05);
          color: #E4007C;
        }
        .admin-nav-btn.active {
          background: rgba(228,0,124,0.1);
          color: #E4007C;
        }
        .admin-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        
        .admin-nav-mobile-menu {
          display: none;
          position: fixed;
          top: 77px; /* 72px + 5px colorbar height */
          left: 0;
          right: 0;
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          padding: 16px;
          flex-direction: column;
          gap: 8px;
          z-index: 999;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }
        .admin-nav-mobile-menu.open {
          display: flex;
        }

        .admin-dropdown-panel {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          padding: 8px;
          min-width: 180px;
          z-index: 1010;
          flex-direction: column;
          gap: 4px;
        }
        .admin-dropdown-panel.open {
          display: flex;
        }
        .admin-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border: none;
          background: transparent;
          color: #555;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          width: 100%;
          text-align: left;
          transition: all 0.2s;
        }
        .admin-dropdown-item:hover {
          background: rgba(228,0,124,0.05);
          color: #E4007C;
        }
        .admin-dropdown-item.active {
          background: rgba(228,0,124,0.1);
          color: #E4007C;
        }

        @media (max-width: 991px) {
          .admin-nav-links {
            display: none;
          }
          .admin-nav-right {
            display: none;
          }
          .admin-hamburger {
            display: block !important;
          }
        }
      `}</style>

      {/* Color Bar at the very top */}
      <div className="color-bar" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '5px', zIndex: 1001 }} aria-hidden="true">
        <span className="color-bar__swatch color-bar__swatch--1" />
        <span className="color-bar__swatch color-bar__swatch--2" />
        <span className="color-bar__swatch color-bar__swatch--3" />
        <span className="color-bar__swatch color-bar__swatch--4" />
        <span className="color-bar__swatch color-bar__swatch--5" />
        <span className="color-bar__swatch color-bar__swatch--6" />
        <span className="color-bar__swatch color-bar__swatch--7" />
        <span className="color-bar__swatch color-bar__swatch--8" />
      </div>

      {/* Navbar */}
      <header className="admin-navbar" style={{ top: '5px' }}>
        <div className="admin-nav-container">
          {/* Logo / Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => router.push('/admin')}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #E4007C, #002E51)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.8rem',
              color: '#fff',
              letterSpacing: '0.05em',
            }}>
              E
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#002E51', letterSpacing: '-0.02em', lineHeight: 1.1 }}>EMM Admin</div>
              <div style={{ fontSize: '0.65rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Panel de Control</div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="admin-nav-links">
            {navItems.map(item => {
              if (item.items) {
                const isSubActive = item.items.some(sub => pathname.startsWith(sub.href));
                return (
                  <div
                    key={item.label}
                    className="admin-nav-dropdown-wrap"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    style={{ position: 'relative' }}
                  >
                    <button className={`admin-nav-btn ${isSubActive ? 'active' : ''}`}>
                      <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{item.icon}</span>
                      <span>{item.label}</span>
                      <ChevronDown size={14} style={{ marginLeft: '4px' }} />
                    </button>
                    
                    {/* Dropdown panel */}
                    <div className={`admin-dropdown-panel ${dropdownOpen ? 'open' : ''}`}>
                      {item.items.map(sub => {
                        const isLinkActive = pathname === sub.href || pathname.startsWith(sub.href);
                        return (
                          <button
                            key={sub.label}
                            onClick={() => {
                              setDropdownOpen(false);
                              router.push(sub.href);
                            }}
                            className={`admin-dropdown-item ${isLinkActive ? 'active' : ''}`}
                          >
                            {sub.icon}
                            <span>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href!));
                return (
                  <button
                    key={item.label}
                    disabled={item.disabled}
                    onClick={() => router.push(item.href!)}
                    className={`admin-nav-btn ${isActive ? 'active' : ''}`}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              }
            })}
          </nav>

          {/* Desktop User details & Logout */}
          <div className="admin-nav-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(0,46,81,0.03)',
              border: '1px solid rgba(0,46,81,0.05)',
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #E4007C, #002E51)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.75rem',
                color: '#fff',
                textTransform: 'uppercase',
              }}>
                {(user?.name || 'A').slice(0, 1)}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#002E51' }}>
                {user?.name || 'Admin'}
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                border: '1px solid rgba(228,0,124,0.15)',
                borderRadius: '8px',
                background: 'transparent',
                color: '#E4007C',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#E4007C';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#E4007C';
              }}
            >
              <LogOut size={14} />
              <span>Salir</span>
            </button>
          </div>

          {/* Hamburger button (Mobile only) */}
          <button
            className="admin-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#002E51',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown Menu */}
      <div className={`admin-nav-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navItems.map(item => {
          if (item.items) {
            return (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  color: '#999',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.items.map(sub => {
                  const isActive = pathname === sub.href || pathname.startsWith(sub.href);
                  return (
                    <button
                      key={sub.label}
                      onClick={() => {
                        setMobileOpen(false);
                        router.push(sub.href);
                      }}
                      className={`admin-nav-btn ${isActive ? 'active' : ''}`}
                      style={{ paddingLeft: '32px', width: '100%' }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>{sub.icon}</span>
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </div>
            );
          } else {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href!));
            return (
              <button
                key={item.label}
                disabled={item.disabled}
                onClick={() => {
                  setMobileOpen(false);
                  router.push(item.href!);
                }}
                className={`admin-nav-btn ${isActive ? 'active' : ''}`}
                style={{ width: '100%' }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          }
        })}
        <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '8px 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
          <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>{user?.name || 'Admin'}</div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              border: '1px solid rgba(228,0,124,0.15)',
              borderRadius: '6px',
              background: 'transparent',
              color: '#E4007C',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            <LogOut size={14} />
            <span>Salir</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="admin-main" style={{
        flex: 1,
        minHeight: '100vh',
        paddingTop: '82px', /* Height of navbar + colorbar */
      }}>
        {children}
      </main>
    </div>
  );
}