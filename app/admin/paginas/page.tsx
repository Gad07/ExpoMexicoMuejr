'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  Type,
  ChevronRight,
  FileText,
  ExternalLink,
  Plus,
  Trash2,
  X,
  MoveUp,
  MoveDown,
  Layers,
  Layout,
  Grid,
  Image as ImageIcon,
  HelpCircle,
  Mail,
  SlidersHorizontal,
  Eye,
  Sparkles,
  TrendingUp,
  Quote,
  ListOrdered,
  PlayCircle,
  CreditCard,
  Users,
  Download,
} from 'lucide-react';
import { PageModule } from '@/components/PageModules';

type Language = 'es' | 'en' | 'fr';

interface CustomPage {
  key: string;
  name: string;
  url: string;
  group: string;
  modules?: PageModule[];
}

const flattenTranslations = (obj: any, prefix = ''): Record<string, { es: string; en: string; fr: string }> => {
  if (!obj || typeof obj !== 'object') return {};
  return Object.keys(obj).reduce((acc: any, k: string) => {
    if (k === '_custom_pages') return acc;
    const pre = prefix.length ? prefix + '.' : '';
    const val = obj[k];
    if (val && typeof val === 'object' && ('es' in val || 'en' in val || 'fr' in val)) {
      acc[pre + k] = val;
    } else if (val && typeof val === 'object') {
      Object.assign(acc, flattenTranslations(val, pre + k));
    }
    return acc;
  }, {});
};

const unflattenTranslations = (flat: Record<string, any>): any => {
  const result: any = {};
  for (const key in flat) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = flat[key];
  }
  return result;
};

const DEFAULT_PAGES_CONFIG: Record<string, { name: string; url: string; group: string }> = {
  'pages.expo.queEs': { name: '¿Qué es EMM?', url: '/expo/que-es', group: 'Expo' },
  'pages.expo.industrias': { name: 'Industrias', url: '/expo/industrias', group: 'Expo' },
  'pages.expo.ottawa2026': { name: 'Ottawa 2026', url: '/expo/ottawa-2026', group: 'Expo' },
  'pages.noticias': { name: 'Noticias', url: '/recursos', group: 'Expo' },
  'pages.visa': { name: 'Visas y Viaje', url: '/visa', group: 'Expo' },

  'pages.expositores': { name: 'Expositoras', url: '/expositores', group: 'Participa' },
  'pages.patrocinadores': { name: 'Patrocinadores', url: '/patrocinadores', group: 'Participa' },
  'pages.embajadoras': { name: 'Embajadoras', url: '/embajadoras', group: 'Participa' },
  'pages.aliados': { name: 'Aliados', url: '/aliados', group: 'Participa' },
  'pages.invitados': { name: 'Invitados', url: '/invitados', group: 'Participa' },
  'pages.compradores': { name: 'Compradores', url: '/compradores', group: 'Participa' },

  'pages.agenda': { name: 'Programa Oficial 2027', url: '/agenda', group: 'Agenda' },
  'pages.agenda.toronto2027': { name: 'Expo Toronto 2027', url: '/agenda/toronto-2027', group: 'Agenda' },
  'pages.agenda.summit': { name: 'México Ontario Business Summit', url: '/agenda/mexico-ontario-business-summit', group: 'Agenda' },
  'pages.agenda.gala': { name: 'Mexican Fashion Gala Show', url: '/agenda/mexican-fashion-gala-show', group: 'Agenda' },
  'pages.agenda.forum': { name: 'Women Leaders Forum', url: '/agenda/women-leaders-forum', group: 'Agenda' },
  'pages.agenda.mission': { name: 'Misión Comercial Montreal', url: '/agenda/mision-comercial-montreal', group: 'Agenda' },

  'pages.academy': { name: 'Academy General', url: '/academy', group: 'Academy' },
  'pages.academy.english': { name: 'Inglés Profesional', url: '/academy/ingles-profesional', group: 'Academy' },
  'pages.academy.skills': { name: 'Executive Global Skills', url: '/academy/executive-global-skills', group: 'Academy' },
  'pages.academy.business': { name: 'Capacitación Empresarial', url: '/academy/capacitacion-empresarial', group: 'Academy' },

  'pages.prensa': { name: 'Prensa', url: '/informacion/prensa', group: 'Información' },
  'pages.participantes': { name: 'Guía de Participantes', url: '/informacion/participantes', group: 'Información' },
  'pages.logistica': { name: 'Logística', url: '/informacion/logistica', group: 'Información' },
  'pages.viajero': { name: 'Guía del Viajero', url: '/informacion/viajero', group: 'Información' },
  'pages.privacidad': { name: 'Aviso de Privacidad', url: '/privacidad', group: 'Información' },
  'pages.terminos': { name: 'Términos y Condiciones', url: '/terminos', group: 'Información' },
  'pages.contacto': { name: 'Contacto', url: '/contacto', group: 'Información' },
};

const DEFAULT_GROUPS = [
  'Expo',
  'Participa',
  'Agenda',
  'Academy',
  'Información',
];

const MODULE_TYPES: Array<{
  type: PageModule['type'];
  name: string;
  description: string;
  icon: React.ReactNode;
}> = [
    {
      type: 'hero',
      name: 'Portada / Hero Banner',
      description: 'Encabezado principal con título, subtítulo, botón e imagen de fondo.',
      icon: <Layout color="#E4007C" size={22} />,
    },
    {
      type: 'text_block',
      name: 'Bloque de Texto y Contenido',
      description: 'Sección de texto con imagen lateral (izquierda/derecha) o superior.',
      icon: <FileText color="#002E51" size={22} />,
    },
    {
      type: 'feature_cards',
      name: 'Cuadrícula de Tarjetas / Beneficios',
      description: 'Tarjetas responsivas de 2, 3 o 4 columnas con íconos.',
      icon: <Grid color="#E4007C" size={22} />,
    },
    {
      type: 'stats_bar',
      name: 'Barra de Estadísticas e Impacto',
      description: 'Métricas de impacto destacadas (asistentes, conferencias, B2B).',
      icon: <TrendingUp color="#002E51" size={22} />,
    },
    {
      type: 'testimonials',
      name: 'Testimonios e Historias de Éxito',
      description: 'Tarjetas de opiniones y citas con foto, nombre y cargo.',
      icon: <Quote color="#E4007C" size={22} />,
    },
    {
      type: 'timeline',
      name: 'Línea de Tiempo / Pasos',
      description: 'Secuencia numerada de pasos para guiar a los visitantes.',
      icon: <ListOrdered color="#002E51" size={22} />,
    },
    {
      type: 'video_banner',
      name: 'Sección de Video Promocional',
      description: 'Reproductor de video destacado para tráileres o testimonios.',
      icon: <PlayCircle color="#E4007C" size={22} />,
    },
    {
      type: 'pricing_cards',
      name: 'Paquetes / Opciones de Stand',
      description: 'Tarjetas comparativas de precios o niveles de patrocinio.',
      icon: <CreditCard color="#002E51" size={22} />,
    },
    {
      type: 'team_grid',
      name: 'Directorio / Equipo y Ponentes',
      description: 'Tarjetas de perfiles con foto, cargo y descripción.',
      icon: <Users color="#E4007C" size={22} />,
    },
    {
      type: 'download_resource',
      name: 'Descarga de Documentos PDF',
      description: 'Banner destacado para descargar guías, manuales o folletos PDF.',
      icon: <Download color="#002E51" size={22} />,
    },
    {
      type: 'cta_banner',
      name: 'Llamado a la Acción (CTA)',
      description: 'Banner Skyline destacado para invitar al registro o participación.',
      icon: <Sparkles color="#002E51" size={22} />,
    },
    {
      type: 'faq',
      name: 'Preguntas Frecuentes (FAQ)',
      description: 'Acordeón interactivo de preguntas y respuestas desplegables.',
      icon: <HelpCircle color="#E4007C" size={22} />,
    },
    {
      type: 'gallery',
      name: 'Galería de Fotos',
      description: 'Cuadrícula visual de imágenes con pie de foto opcional.',
      icon: <ImageIcon color="#002E51" size={22} />,
    },
    {
      type: 'contact_form',
      name: 'Formulario de Contacto',
      description: 'Formulario integrado para recopilar mensajes de visitantes.',
      icon: <Mail color="#E4007C" size={22} />,
    },
  ];

export default function AdminTextos() {
  const [flatDict, setFlatDict] = useState<Record<string, { es: string; en: string; fr: string }>>({});
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [pageModulesMap, setPageModulesMap] = useState<Record<string, PageModule[]>>({});
  const [activeCategory, setActiveCategory] = useState<string>('home');
  const [activeTab, setActiveTab] = useState<'preview' | 'builder'>('preview');

  const [lang, setLang] = useState<Language>('es');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageUrl, setNewPageUrl] = useState('');
  const [newPageKey, setNewPageKey] = useState('');
  const [newPageGroup, setNewPageGroup] = useState('Principales');
  const [customGroup, setCustomGroup] = useState('');

  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  const pagesConfig: Record<string, { name: string; url: string; group: string; isCustom?: boolean }> = {
    ...DEFAULT_PAGES_CONFIG,
  };
  customPages.forEach((cp) => {
    pagesConfig[cp.key] = { name: cp.name, url: cp.url, group: cp.group, isCustom: true };
  });

  const pageGroupsMap: Record<string, string[]> = {};
  Object.keys(pagesConfig).forEach((catKey) => {
    const groupName = pagesConfig[catKey]?.group || 'Otros';
    if (!pageGroupsMap[groupName]) {
      pageGroupsMap[groupName] = [];
    }
    pageGroupsMap[groupName].push(catKey);
  });

  const pageGroups = Object.keys(pageGroupsMap).map((gName) => ({
    group: gName,
    items: pageGroupsMap[gName],
  }));

  useEffect(() => {
    fetch('/api/admin/translations')
      .then((r) => r.json())
      .then((d) => {
        if (d.translations) {
          const flat = flattenTranslations(d.translations);
          setFlatDict(flat);
          if (d.translations._custom_pages && Array.isArray(d.translations._custom_pages)) {
            setCustomPages((prev) => {
              const existingKeys = new Set(prev.map((c) => c.key));
              const newItems = d.translations._custom_pages.filter((c: any) => !existingKeys.has(c.key));
              return [...prev, ...newItems];
            });
          }
        }
      })
      .catch(() => { });

    fetch('/api/admin/pages')
      .then((r) => r.json())
      .then((d) => {
        if (d.pages && Array.isArray(d.pages)) {
          const map: Record<string, PageModule[]> = {};
          const loadedCustomPages: CustomPage[] = [];

          d.pages.forEach((p: any) => {
            const pageKey = p.key || p.slug || p.url;
            if (pageKey && Array.isArray(p.modules)) {
              map[pageKey] = p.modules;
            }
            if (p.isCustom && p.key) {
              loadedCustomPages.push({
                key: p.key,
                name: p.name || p.key,
                url: p.url || ('/' + p.key),
                group: p.group || 'General',
                modules: p.modules || [],
              });
            }
          });

          setPageModulesMap(map);
          if (loadedCustomPages.length > 0) {
            setCustomPages((prev) => {
              const existingKeys = new Set(prev.map((c) => c.key));
              const newItems = loadedCustomPages.filter((c) => !existingKeys.has(c.key));
              return [...prev, ...newItems];
            });
          }
        }
      })
      .catch(() => { });

    const handleVisualUpdate = (e: MessageEvent) => {
      if (e.data && e.data.type === 'VISUAL_EDIT_UPDATE') {
        const { key, value, lang: iframeLang } = e.data;
        setFlatDict((prev) => {
          const nextDict = {
            ...prev,
            [key]: { ...(prev[key] || { es: '', en: '', fr: '' }), [iframeLang]: value },
          };

          sendIframeMessage({
            type: 'UPDATE_TRANSLATIONS',
            payload: unflattenTranslations(nextDict),
          });

          return nextDict;
        });
      }
    };
    window.addEventListener('message', handleVisualUpdate);
    return () => window.removeEventListener('message', handleVisualUpdate);
  }, []);

  const sendIframeMessage = (msg: any) => {
    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(msg, '*');
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    sendIframeMessage({ type: 'CHANGE_LANGUAGE', lang: newLang });
  };

  const handleIframeLoad = () => {
    sendIframeMessage({ type: 'CHANGE_LANGUAGE', lang });
  };

  const currentModules = pageModulesMap[activeCategory] || pageModulesMap[pagesConfig[activeCategory]?.url] || [];

  const updateCurrentModules = (newModules: PageModule[]) => {
    setPageModulesMap((prev) => ({
      ...prev,
      [activeCategory]: newModules,
      [pagesConfig[activeCategory]?.url || '']: newModules,
    }));
  };

  const saveAllData = async (
    targetCustomPages?: CustomPage[],
    targetModulesMap?: Record<string, PageModule[]>,
    options: { syncNavbar?: boolean } = {}
  ) => {
    setSaving(true);
    setMessage(null);
    try {
      const activeCustomPages = targetCustomPages || customPages;
      const activeModulesMap = targetModulesMap || pageModulesMap;

      const nested = unflattenTranslations(flatDict);
      nested._custom_pages = activeCustomPages;

      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // Build pages config map including targetCustomPages
      const activePagesConfig: Record<string, { name: string; url: string; group: string; isCustom?: boolean }> = {
        ...DEFAULT_PAGES_CONFIG,
      };
      activeCustomPages.forEach((cp) => {
        activePagesConfig[cp.key] = { name: cp.name, url: cp.url, group: cp.group, isCustom: true };
      });

      const pagesArrayToSave = Object.keys(activePagesConfig).map((key) => {
        const item = activePagesConfig[key];
        const mods = activeModulesMap[key] || activeModulesMap[item.url] || [];
        return {
          key,
          name: item.name,
          url: item.url,
          slug: item.url,
          group: item.group,
          isCustom: item.isCustom || false,
          modules: mods,
        };
      });

      const resTrans = await fetch('/api/admin/translations', {
        method: 'POST',
        headers,
        body: JSON.stringify(nested),
      });

      const resPages = await fetch('/api/admin/pages', {
        method: 'POST',
        headers,
        body: JSON.stringify(pagesArrayToSave),
      });

      // Sync Navigation Menu (navbar.json) if explicitly requested (e.g. new page creation)
      if (options.syncNavbar) {
        try {
          const navRes = await fetch('/api/admin/navbar');
          if (navRes.ok) {
            const navData = await navRes.json();
            let currentNavbar: any[] = Array.isArray(navData.navbar) ? navData.navbar : [];
            let navChanged = false;

            pagesArrayToSave.forEach((p) => {
              if (!p.url || p.url === '/' || p.key === 'home' || p.key === 'nav' || p.key === 'hero' || p.key === 'common') return;
              const groupName = p.group || 'General';

              let existingMenu = currentNavbar.find(
                (m) =>
                  m.label?.es?.toLowerCase() === groupName.toLowerCase() ||
                  m.label?.en?.toLowerCase() === groupName.toLowerCase()
              );

              if (existingMenu) {
                const itemExists = existingMenu.items?.some((it: any) => it.href === p.url);
                if (!itemExists) {
                  existingMenu.items = existingMenu.items || [];
                  existingMenu.items.push({
                    id: 'nav-item-' + Date.now() + Math.random().toString(36).substring(2, 6),
                    label: { es: p.name, en: p.name, fr: p.name },
                    href: p.url,
                  });
                  navChanged = true;
                }
              } else {
                const newMenu = {
                  id: 'nav-group-' + Date.now() + Math.random().toString(36).substring(2, 6),
                  label: { es: groupName, en: groupName, fr: groupName },
                  basePath: '/' + groupName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                  items: [
                    {
                      id: 'nav-item-' + Date.now() + Math.random().toString(36).substring(2, 6),
                      label: { es: p.name, en: p.name, fr: p.name },
                      href: p.url,
                    },
                  ],
                };
                currentNavbar.push(newMenu);
                navChanged = true;
              }
            });

            if (navChanged) {
              await fetch('/api/admin/navbar', {
                method: 'POST',
                headers,
                body: JSON.stringify(currentNavbar),
              });
              sendIframeMessage({ type: 'UPDATE_NAVBAR', payload: currentNavbar });
            }
          }
        } catch (e) {
          // Ignore
        }
      }

      if (!resTrans.ok || !resPages.ok) {
        setMessage({ type: 'error', text: 'Error al guardar los datos' });
      } else {
        setMessage({ type: 'success', text: 'Páginas, módulos y navegación guardados exitosamente ✓' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' });
    }
    setSaving(false);
  };

  const handleSave = async () => {
    await saveAllData();
  };

  const handlePreview = () => {
    if (!activeCategory) return;
    const url = pagesConfig[activeCategory]?.url || '/';
    window.open(url, '_blank');
  };

  const handleAddPage = () => {
    if (!newPageName.trim()) {
      alert('Por favor introduce un nombre para la página');
      return;
    }

    let url = newPageUrl.trim();
    if (!url) url = '/' + newPageName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!url.startsWith('/')) url = '/' + url;

    let key = newPageKey.trim();
    if (!key) key = 'pages.' + newPageName.toLowerCase().replace(/[^a-z0-9]+/g, '');

    const group = newPageGroup === '__new__' ? customGroup.trim() || 'General' : newPageGroup;

    const initialModules: PageModule[] = [
      {
        id: 'mod-' + Date.now(),
        type: 'hero',
        title: newPageName.trim(),
        subtitle: 'Expo México Mujer',
        content: `Bienvenido a la sección oficial de ${newPageName.trim()}.`,
        buttonText: 'Conocer más',
        buttonUrl: url,
      },
    ];

    const newPageObj: CustomPage = { key, name: newPageName.trim(), url, group, modules: initialModules };

    const updatedCustomPages = [...customPages, newPageObj];
    const updatedModulesMap = { ...pageModulesMap, [key]: initialModules, [url]: initialModules };

    setCustomPages(updatedCustomPages);
    setPageModulesMap(updatedModulesMap);
    setActiveCategory(key);
    setActiveTab('builder');

    setFlatDict((prev) => ({
      ...prev,
      [`${key}.title`]: prev[`${key}.title`] || { es: newPageName.trim(), en: '', fr: '' },
    }));

    setShowAddPageModal(false);
    setNewPageName('');
    setNewPageUrl('');
    setNewPageKey('');
    setNewPageGroup('Principales');
    setCustomGroup('');

    // Instant persistence to disk
    saveAllData(updatedCustomPages, updatedModulesMap);
  };

  const handleDeleteCustomPage = (keyToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('¿Estás seguro de eliminar esta página personalizada?')) return;
    const filtered = customPages.filter((cp) => cp.key !== keyToDelete);
    setCustomPages(filtered);
    if (activeCategory === keyToDelete) {
      setActiveCategory('home');
    }
    saveAllData(filtered);
  };

  // ADD MODULE PALETTE LOGIC
  const handleAddModule = (type: PageModule['type']) => {
    const newModId = 'mod-' + Date.now();
    let newMod: PageModule = { id: newModId, type };

    switch (type) {
      case 'hero':
        newMod = {
          id: newModId,
          type: 'hero',
          title: 'Título Impactante',
          subtitle: 'Subtítulo Destacado',
          content: 'Descripción breve de la sección para cautivar a los visitantes.',
          buttonText: 'Saber Más',
          buttonUrl: '#',
        };
        break;
      case 'text_block':
        newMod = {
          id: newModId,
          type: 'text_block',
          title: 'Título del Contenido',
          subtitle: 'Información Detallada',
          content: 'Escribe aquí la información principal de esta sección de la página.',
          imagePosition: 'right',
          bgColor: 'white',
        };
        break;
      case 'feature_cards':
        newMod = {
          id: newModId,
          type: 'feature_cards',
          title: 'Nuestras Características',
          subtitle: 'Beneficios Destacados',
          columns: 3,
          items: [
            { title: 'Característica 1', description: 'Descripción de la primera ventaja o servicio.' },
            { title: 'Característica 2', description: 'Descripción de la segunda ventaja o servicio.' },
            { title: 'Característica 3', description: 'Descripción de la tercera ventaja o servicio.' },
          ],
        };
        break;
      case 'stats_bar':
        newMod = {
          id: newModId,
          type: 'stats_bar',
          title: 'Métricas de Impacto',
          items: [
            { value: '+5,000', label: 'Asistentes e Inversionistas' },
            { value: '50+', label: 'Conferencias B2B' },
            { value: '100%', label: 'Talento Femenino' },
            { value: '2026', label: 'Ottawa Canadá' },
          ],
        };
        break;
      case 'testimonials':
        newMod = {
          id: newModId,
          type: 'testimonials',
          title: 'Lo Que Dicen Nuestras Integrantes',
          subtitle: 'Historias de Éxito',
          items: [
            { name: 'María Fernández', role: 'Directora de Empresa', quote: 'Participar en Expo México Mujer nos abrió las puertas del mercado internacional.', image: '/recursos/Recurso 1.png' },
            { name: 'Sofia Rodríguez', role: 'Embajadora EMM', quote: 'Una plataforma única para conectar mujeres líderes en Norteamérica.', image: '/recursos/Recurso 2.png' },
          ],
        };
        break;
      case 'timeline':
        newMod = {
          id: newModId,
          type: 'timeline',
          title: 'Proceso de Registro',
          subtitle: 'Paso a Paso',
          items: [
            { title: 'Paso 1: Solicitud', description: 'Llena el formulario con la información de tu empresa.' },
            { title: 'Paso 2: Evaluación', description: 'Nuestro equipo revisa y aprueba la postulación.' },
            { title: 'Paso 3: Confirmación', description: 'Recibe tu confirmación y acceso al evento.' },
          ],
        };
        break;
      case 'video_banner':
        newMod = {
          id: newModId,
          type: 'video_banner',
          title: 'Video Promocional Oficial',
          subtitle: 'Conoce la Experiencia',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        };
        break;
      case 'pricing_cards':
        newMod = {
          id: newModId,
          type: 'pricing_cards',
          title: 'Opciones de Stand y Participación',
          subtitle: 'Planes a tu Medida',
          buttonText: 'Reservar Ahora',
          buttonUrl: '/contacto',
          items: [
            { title: 'Stand Estándar', price: '$1,200 USD', description: 'Espacio de 3x3m con iluminación básica y gafetes de acceso.' },
            { title: 'Pabellón Premium', price: '$2,500 USD', description: 'Espacio preferencial de 6x3m, logotipo destacado y reuniones B2B exclusivas.' },
          ],
        };
        break;
      case 'team_grid':
        newMod = {
          id: newModId,
          type: 'team_grid',
          title: 'Nuestros Directores y Ponentes',
          subtitle: 'Líderes de la Expo',
          items: [
            { name: 'Francisco Solorio', role: 'Director General', description: 'Líder binacional con más de 15 años de experiencia en alianzas entre México y Canadá.', image: '/recursos/Recurso 1.png' },
            { name: 'Luis García', role: 'Director de Logística', description: 'Especialista en cadena de suministro global y logística internacional.', image: '/recursos/Recurso 2.png' },
          ],
        };
        break;
      case 'download_resource':
        newMod = {
          id: newModId,
          type: 'download_resource',
          title: 'Descargar Dossier de Prensa PDF',
          content: 'Consulta la información oficial, estadísticas y contactos de prensa.',
          buttonText: 'Descargar PDF',
          buttonUrl: '/recursos/Dossier.pdf',
        };
        break;
      case 'cta_banner':
        newMod = {
          id: newModId,
          type: 'cta_banner',
          title: '¡Únete a Expo México Mujer!',
          subtitle: 'Forma parte del evento empresarial de mujeres más importante.',
          buttonText: 'Registrarme Ahora',
          buttonUrl: '/contacto',
        };
        break;
      case 'faq':
        newMod = {
          id: newModId,
          type: 'faq',
          title: 'Preguntas Frecuentes',
          subtitle: 'Resolvemos tus dudas',
          items: [
            { question: '¿Cuándo se realiza el evento?', answer: 'El evento se llevará a cabo en las fechas oficiales publicadas en nuestra agenda.' },
            { question: '¿Cómo puedo participar como expositora?', answer: 'Puedes ingresar a la sección de Expositores y llenar el formulario de registro.' },
          ],
        };
        break;
      case 'gallery':
        newMod = {
          id: newModId,
          type: 'gallery',
          title: 'Galería de Fotos',
          items: [
            { image: '/recursos/Recurso 1.png', caption: 'Imagen 1' },
            { image: '/recursos/Recurso 2.png', caption: 'Imagen 2' },
          ],
        };
        break;
      case 'contact_form':
        newMod = {
          id: newModId,
          type: 'contact_form',
          title: 'Ponte en Contacto',
          subtitle: 'Déjanos tus datos y te responderemos de inmediato.',
        };
        break;
    }

    const nextModules = [...currentModules, newMod];
    updateCurrentModules(nextModules);
    setExpandedModuleId(newModId);
    setShowAddModuleModal(false);
  };

  const handleMoveModule = (index: number, direction: 'up' | 'down') => {
    const next = [...currentModules];
    if (direction === 'up' && index > 0) {
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
    } else if (direction === 'down' && index < next.length - 1) {
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
    }
    updateCurrentModules(next);
  };

  const handleDeleteModule = (id: string) => {
    if (!confirm('¿Eliminar este módulo de la página?')) return;
    const next = currentModules.filter((m) => m.id !== id);
    updateCurrentModules(next);
  };

  const handleUpdateModuleField = (id: string, field: string, value: any) => {
    const next = currentModules.map((m) => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    });
    updateCurrentModules(next);
  };

  const handleAddItemToModule = (modId: string) => {
    const next = currentModules.map((m) => {
      if (m.id === modId) {
        const items = m.items || [];
        if (m.type === 'faq') {
          return { ...m, items: [...items, { question: 'Nueva Pregunta', answer: 'Respuesta correspondiente' }] };
        }
        if (m.type === 'feature_cards') {
          return { ...m, items: [...items, { title: 'Nuevo Beneficio', description: 'Detalle del beneficio o característica' }] };
        }
        if (m.type === 'stats_bar') {
          return { ...m, items: [...items, { value: '100+', label: 'Nueva Métrica' }] };
        }
        if (m.type === 'testimonials') {
          return { ...m, items: [...items, { name: 'Nombre Persona', role: 'Cargo / Empresa', quote: 'Excelente experiencia de participación.', image: '/recursos/Recurso 1.png' }] };
        }
        if (m.type === 'timeline') {
          return { ...m, items: [...items, { title: 'Nuevo Paso', description: 'Explicación del paso' }] };
        }
        if (m.type === 'pricing_cards') {
          return { ...m, items: [...items, { title: 'Nuevo Paquete', price: '$500 USD', description: 'Descripción del paquete' }] };
        }
        if (m.type === 'team_grid') {
          return { ...m, items: [...items, { name: 'Nombre Integrante', role: 'Cargo u Ocupación', description: 'Biografía breve', image: '/recursos/Recurso 1.png' }] };
        }
        if (m.type === 'gallery') {
          return { ...m, items: [...items, { image: '/recursos/Recurso 1.png', caption: 'Nueva Foto' }] };
        }
      }
      return m;
    });
    updateCurrentModules(next);
  };

  const handleRemoveItemFromModule = (modId: string, itemIdx: number) => {
    const next = currentModules.map((m) => {
      if (m.id === modId && m.items) {
        const items = m.items.filter((_, idx) => idx !== itemIdx);
        return { ...m, items };
      }
      return m;
    });
    updateCurrentModules(next);
  };

  const handleUpdateModuleItemField = (modId: string, itemIdx: number, field: string, val: string) => {
    const next = currentModules.map((m) => {
      if (m.id === modId && m.items) {
        const items = m.items.map((it, idx) => {
          if (idx === itemIdx) {
            return { ...it, [field]: val };
          }
          return it;
        });
        return { ...m, items };
      }
      return m;
    });
    updateCurrentModules(next);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '0.85rem',
    outline: 'none',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 'calc(100vh - 82px)' }}>
      {/* SIDEBAR - PAGES LIST */}
      <div
        style={{
          background: '#fff',
          borderRight: '1px solid rgba(0,0,0,0.07)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#002E51' }}>Páginas</h2>
          <button
            onClick={() => setShowAddPageModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              background: '#E4007C',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(228,0,124,0.2)',
            }}
          >
            <Plus size={14} /> Nueva
          </button>
        </div>

        {pageGroups.map((group) => (
          <div key={group.group} style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
                paddingLeft: '8px',
              }}
            >
              {group.group}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {group.items.map((cat) => {
                const pageItem = pagesConfig[cat];
                const isActive = activeCategory === cat;
                const modsCount = (pageModulesMap[cat] || pageModulesMap[pageItem?.url] || []).length;

                return (
                  <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        background: isActive ? 'rgba(228,0,124,0.08)' : 'transparent',
                        color: isActive ? '#E4007C' : '#333',
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '0.8rem',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                        <FileText size={14} style={{ flexShrink: 0 }} />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {pageItem?.name || cat}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        {modsCount > 0 && (
                          <span
                            title={`${modsCount} módulos activos`}
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              background: isActive ? '#E4007C' : '#cbd5e1',
                              color: '#fff',
                              padding: '1px 6px',
                              borderRadius: '10px',
                            }}
                          >
                            {modsCount}
                          </span>
                        )}
                        {isActive && <ChevronRight size={14} />}
                      </div>
                    </button>
                    {pageItem?.isCustom && (
                      <button
                        onClick={(e) => handleDeleteCustomPage(cat, e)}
                        title="Eliminar página personalizada"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          padding: '4px',
                          borderRadius: '4px',
                          opacity: 0.7,
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 82px)', overflow: 'hidden' }}>
        {/* HEADER BAR */}
        <div
          style={{
            padding: '12px 20px',
            background: '#fff',
            borderBottom: '1px solid rgba(0,0,0,0.07)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#002E51', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Type color="#E4007C" size={18} />
              {pagesConfig[activeCategory]?.name || activeCategory}
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px' }}>
                {pagesConfig[activeCategory]?.url}
              </span>
            </span>

            {/* TAB SELECTOR: PREVIEW VS ELEMENTOR BUILDER */}
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px', gap: '2px' }}>
              <button
                onClick={() => setActiveTab('preview')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  background: activeTab === 'preview' ? '#fff' : 'transparent',
                  color: activeTab === 'preview' ? '#002E51' : '#64748b',
                  boxShadow: activeTab === 'preview' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                <Eye size={14} /> Vista Previa Live
              </button>
              <button
                onClick={() => setActiveTab('builder')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  background: activeTab === 'builder' ? '#E4007C' : 'transparent',
                  color: activeTab === 'builder' ? '#fff' : '#64748b',
                  boxShadow: activeTab === 'builder' ? '0 2px 4px rgba(228,0,124,0.3)' : 'none',
                }}
              >
                <Layers size={14} /> Constructor (14 Módulos)
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* LANGUAGE TABS */}
            <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
              {(['es', 'en', 'fr'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  style={{
                    padding: '6px 12px',
                    border: 'none',
                    background: lang === l ? '#fff' : 'transparent',
                    boxShadow: lang === l ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    color: lang === l ? '#E4007C' : '#64748b',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            {message && (
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: message.type === 'success' ? '#059669' : '#DC2626' }}>
                {message.text}
              </span>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: '#002E51',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>

            <button
              onClick={handlePreview}
              title="Abrir en pestaña nueva"
              style={{
                background: 'transparent',
                border: '1px solid rgba(0,46,81,0.2)',
                color: '#002E51',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        {/* TAB CONTENT */}
        {activeTab === 'preview' ? (
          <iframe
            id="preview-iframe"
            onLoad={handleIframeLoad}
            src={activeCategory ? (pagesConfig[activeCategory]?.url || '/') + '?visualEdit=true' : '/?visualEdit=true'}
            style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
            title="Live Preview"
          />
        ) : (
          /* ELEMENTOR STYLE MODULE BUILDER */
          <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
            <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#002E51', margin: 0 }}>
                    Estructura y Módulos de la Página
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0' }}>
                    Construye la página agregando y personalizando cualquiera de nuestros 14 módulos prediseñados.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModuleModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: '#E4007C',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(228,0,124,0.3)',
                  }}
                >
                  <Plus size={16} /> Agregar Módulo
                </button>
              </div>

              {currentModules.length === 0 ? (
                <div style={{ background: '#fff', padding: '48px', borderRadius: '16px', border: '2px dashed #cbd5e1', textAlign: 'center' }}>
                  <Layers size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#002E51', marginBottom: '8px' }}>
                    Esta página no tiene módulos personalizados todavía
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '480px', margin: '0 auto 24px' }}>
                    Haz clic en "Agregar Módulo" para construir el diseño visual con las secciones que prefieras.
                  </p>
                  <button
                    onClick={() => setShowAddModuleModal(true)}
                    style={{
                      padding: '10px 20px',
                      background: '#002E51',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    + Añadir Primer Módulo
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {currentModules.map((mod, idx) => {
                    const isExpanded = expandedModuleId === mod.id;
                    const modTypeInfo = MODULE_TYPES.find((t) => t.type === mod.type);

                    return (
                      <div
                        key={mod.id}
                        style={{
                          background: '#fff',
                          borderRadius: '14px',
                          border: isExpanded ? '2px solid #E4007C' : '1px solid #e2e8f0',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                          overflow: 'hidden',
                        }}
                      >
                        {/* MODULE HEADER BAR */}
                        <div
                          style={{
                            padding: '16px 20px',
                            background: isExpanded ? 'rgba(228,0,124,0.04)' : '#fff',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                          }}
                          onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ padding: '8px', borderRadius: '8px', background: '#f8fafc' }}>
                              {modTypeInfo?.icon || <Layers size={20} />}
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#E4007C', textTransform: 'uppercase' }}>
                                  Módulo #{idx + 1}
                                </span>
                                <span style={{ fontSize: '0.75rem', background: '#e2e8f0', color: '#475569', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                                  {mod.type}
                                </span>
                              </div>
                              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#002E51', margin: '2px 0 0' }}>
                                {mod.title || modTypeInfo?.name || 'Módulo sin título'}
                              </h3>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleMoveModule(idx, 'up')}
                              disabled={idx === 0}
                              title="Mover arriba"
                              style={{ background: '#f1f5f9', border: 'none', padding: '6px', borderRadius: '6px', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.4 : 1 }}
                            >
                              <MoveUp size={16} />
                            </button>
                            <button
                              onClick={() => handleMoveModule(idx, 'down')}
                              disabled={idx === currentModules.length - 1}
                              title="Mover abajo"
                              style={{ background: '#f1f5f9', border: 'none', padding: '6px', borderRadius: '6px', cursor: idx === currentModules.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === currentModules.length - 1 ? 0.4 : 1 }}
                            >
                              <MoveDown size={16} />
                            </button>
                            <button
                              onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                              style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <SlidersHorizontal size={14} /> {isExpanded ? 'Cerrar' : 'Editar'}
                            </button>
                            <button
                              onClick={() => handleDeleteModule(mod.id)}
                              title="Eliminar módulo"
                              style={{ background: 'rgba(239,68,68,0.1)', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#EF4444' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* EXPANDED EDITING FORM */}
                        {isExpanded && (
                          <div style={{ padding: '24px', borderTop: '1px solid #e2e8f0', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '4px' }}>
                                  Título del Módulo
                                </label>
                                <input
                                  type="text"
                                  value={mod.title || ''}
                                  onChange={(e) => handleUpdateModuleField(mod.id, 'title', e.target.value)}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '4px' }}>
                                  Subtítulo / Etiqueta
                                </label>
                                <input
                                  type="text"
                                  value={mod.subtitle || ''}
                                  onChange={(e) => handleUpdateModuleField(mod.id, 'subtitle', e.target.value)}
                                  style={inputStyle}
                                />
                              </div>
                            </div>

                            {(mod.type === 'hero' || mod.type === 'text_block' || mod.type === 'download_resource') && (
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '4px' }}>
                                  Contenido / Texto Principal
                                </label>
                                <textarea
                                  rows={4}
                                  value={mod.content || ''}
                                  onChange={(e) => handleUpdateModuleField(mod.id, 'content', e.target.value)}
                                  style={{ ...inputStyle, fontFamily: 'inherit' }}
                                />
                              </div>
                            )}

                            {mod.type === 'video_banner' && (
                              <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '4px' }}>
                                  URL de Embebido del Video (YouTube / Vimeo / MP4)
                                </label>
                                <input
                                  type="text"
                                  placeholder="https://www.youtube.com/embed/..."
                                  value={mod.videoUrl || ''}
                                  onChange={(e) => handleUpdateModuleField(mod.id, 'videoUrl', e.target.value)}
                                  style={inputStyle}
                                />
                              </div>
                            )}

                            {(mod.type === 'hero' || mod.type === 'text_block' || mod.type === 'cta_banner' || mod.type === 'pricing_cards' || mod.type === 'download_resource') && (
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '4px' }}>
                                    Texto del Botón
                                  </label>
                                  <input
                                    type="text"
                                    value={mod.buttonText || ''}
                                    onChange={(e) => handleUpdateModuleField(mod.id, 'buttonText', e.target.value)}
                                    style={inputStyle}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '4px' }}>
                                    Enlace / URL del Botón
                                  </label>
                                  <input
                                    type="text"
                                    value={mod.buttonUrl || ''}
                                    onChange={(e) => handleUpdateModuleField(mod.id, 'buttonUrl', e.target.value)}
                                    style={inputStyle}
                                  />
                                </div>
                              </div>
                            )}

                            {mod.type === 'text_block' && (
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '4px' }}>
                                    URL de Imagen Lateral
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="/recursos/Recurso 1.png"
                                    value={mod.bgImage || ''}
                                    onChange={(e) => handleUpdateModuleField(mod.id, 'bgImage', e.target.value)}
                                    style={inputStyle}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '4px' }}>
                                    Posición de Imagen
                                  </label>
                                  <select
                                    value={mod.imagePosition || 'right'}
                                    onChange={(e) => handleUpdateModuleField(mod.id, 'imagePosition', e.target.value)}
                                    style={{ ...inputStyle, background: '#fff' }}
                                  >
                                    <option value="right">Derecha</option>
                                    <option value="left">Izquierda</option>
                                    <option value="none">Sin imagen</option>
                                  </select>
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '4px' }}>
                                    Fondo de la Sección
                                  </label>
                                  <select
                                    value={mod.bgColor || 'white'}
                                    onChange={(e) => handleUpdateModuleField(mod.id, 'bgColor', e.target.value)}
                                    style={{ ...inputStyle, background: '#fff' }}
                                  >
                                    <option value="white">Blanco</option>
                                    <option value="cream">Crema Tradicional</option>
                                    <option value="dark">Azul Marino Profundo</option>
                                  </select>
                                </div>
                              </div>
                            )}

                            {/* ITEMS BUILDER (FOR FAQ, FEATURE CARDS, STATS, TESTIMONIALS, TIMELINE, PRICING, TEAM, GALLERY) */}
                            {(mod.type === 'faq' ||
                              mod.type === 'feature_cards' ||
                              mod.type === 'stats_bar' ||
                              mod.type === 'testimonials' ||
                              mod.type === 'timeline' ||
                              mod.type === 'pricing_cards' ||
                              mod.type === 'team_grid' ||
                              mod.type === 'gallery') && (
                                <div style={{ marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#002E51' }}>
                                      Elementos del Módulo ({mod.items?.length || 0})
                                    </h4>
                                    <button
                                      onClick={() => handleAddItemToModule(mod.id)}
                                      style={{ padding: '6px 12px', background: '#002E51', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                                    >
                                      + Agregar Elemento
                                    </button>
                                  </div>

                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {(mod.items || []).map((it, itemIdx) => (
                                      <div key={itemIdx} style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#E4007C' }}>
                                            Elemento #{itemIdx + 1}
                                          </span>
                                          <button onClick={() => handleRemoveItemFromModule(mod.id, itemIdx)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                                            <X size={14} />
                                          </button>
                                        </div>

                                        {mod.type === 'faq' && (
                                          <>
                                            <input
                                              type="text"
                                              placeholder="Pregunta"
                                              value={it.question || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'question', e.target.value)}
                                              style={inputStyle}
                                            />
                                            <textarea
                                              rows={2}
                                              placeholder="Respuesta"
                                              value={it.answer || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'answer', e.target.value)}
                                              style={{ ...inputStyle, fontFamily: 'inherit' }}
                                            />
                                          </>
                                        )}

                                        {mod.type === 'stats_bar' && (
                                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px' }}>
                                            <input
                                              type="text"
                                              placeholder="Valor (ej: +5,000)"
                                              value={it.value || it.title || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'value', e.target.value)}
                                              style={inputStyle}
                                            />
                                            <input
                                              type="text"
                                              placeholder="Etiqueta / Descripción"
                                              value={it.label || it.description || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'label', e.target.value)}
                                              style={inputStyle}
                                            />
                                          </div>
                                        )}

                                        {mod.type === 'testimonials' && (
                                          <>
                                            <input
                                              type="text"
                                              placeholder="Nombre de la Persona"
                                              value={it.name || it.title || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'name', e.target.value)}
                                              style={inputStyle}
                                            />
                                            <input
                                              type="text"
                                              placeholder="Cargo / Empresa"
                                              value={it.role || it.company || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'role', e.target.value)}
                                              style={inputStyle}
                                            />
                                            <textarea
                                              rows={2}
                                              placeholder="Cita / Testimonio"
                                              value={it.quote || it.description || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'quote', e.target.value)}
                                              style={{ ...inputStyle, fontFamily: 'inherit' }}
                                            />
                                          </>
                                        )}

                                        {mod.type === 'timeline' && (
                                          <>
                                            <input
                                              type="text"
                                              placeholder="Título del Paso"
                                              value={it.title || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'title', e.target.value)}
                                              style={inputStyle}
                                            />
                                            <textarea
                                              rows={2}
                                              placeholder="Descripción del Paso"
                                              value={it.description || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'description', e.target.value)}
                                              style={{ ...inputStyle, fontFamily: 'inherit' }}
                                            />
                                          </>
                                        )}

                                        {mod.type === 'pricing_cards' && (
                                          <>
                                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
                                              <input
                                                type="text"
                                                placeholder="Nombre del Paquete"
                                                value={it.title || ''}
                                                onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'title', e.target.value)}
                                                style={inputStyle}
                                              />
                                              <input
                                                type="text"
                                                placeholder="Precio (ej: $1,200 USD)"
                                                value={it.price || ''}
                                                onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'price', e.target.value)}
                                                style={inputStyle}
                                              />
                                            </div>
                                            <textarea
                                              rows={2}
                                              placeholder="Descripción de lo que incluye"
                                              value={it.description || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'description', e.target.value)}
                                              style={{ ...inputStyle, fontFamily: 'inherit' }}
                                            />
                                          </>
                                        )}

                                        {mod.type === 'team_grid' && (
                                          <>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                              <input
                                                type="text"
                                                placeholder="Nombre"
                                                value={it.name || it.title || ''}
                                                onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'name', e.target.value)}
                                                style={inputStyle}
                                              />
                                              <input
                                                type="text"
                                                placeholder="Cargo u Ocupación"
                                                value={it.role || it.subtitle || ''}
                                                onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'role', e.target.value)}
                                                style={inputStyle}
                                              />
                                            </div>
                                            <input
                                              type="text"
                                              placeholder="URL Foto de Perfil"
                                              value={it.image || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'image', e.target.value)}
                                              style={inputStyle}
                                            />
                                            <textarea
                                              rows={2}
                                              placeholder="Biografía breve"
                                              value={it.description || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'description', e.target.value)}
                                              style={{ ...inputStyle, fontFamily: 'inherit' }}
                                            />
                                          </>
                                        )}

                                        {mod.type === 'feature_cards' && (
                                          <>
                                            <input
                                              type="text"
                                              placeholder="Título del Beneficio"
                                              value={it.title || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'title', e.target.value)}
                                              style={inputStyle}
                                            />
                                            <input
                                              type="text"
                                              placeholder="Descripción corta"
                                              value={it.description || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'description', e.target.value)}
                                              style={inputStyle}
                                            />
                                          </>
                                        )}

                                        {mod.type === 'gallery' && (
                                          <>
                                            <input
                                              type="text"
                                              placeholder="URL de la Imagen (/recursos/...)"
                                              value={it.image || it.url || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'image', e.target.value)}
                                              style={inputStyle}
                                            />
                                            <input
                                              type="text"
                                              placeholder="Pie de Foto (opcional)"
                                              value={it.caption || ''}
                                              onChange={(e) => handleUpdateModuleItemField(mod.id, itemIdx, 'caption', e.target.value)}
                                              style={inputStyle}
                                            />
                                          </>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: ADD NEW PAGE */}
      {showAddPageModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '28px',
              width: '100%',
              maxWidth: '480px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#002E51' }}>
                Agregar Nueva Página
              </h3>
              <button onClick={() => setShowAddPageModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '6px' }}>
                  Nombre de la Página *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Registro de Asistentes"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '6px' }}>
                  Ruta / URL de la Página
                </label>
                <input
                  type="text"
                  placeholder="Ej: /registro"
                  value={newPageUrl}
                  onChange={(e) => setNewPageUrl(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '6px' }}>
                  Grupo / Categoría
                </label>
                <select
                  value={newPageGroup}
                  onChange={(e) => setNewPageGroup(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', background: '#fff' }}
                >
                  {DEFAULT_GROUPS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                  <option value="__new__">+ Crear nuevo grupo</option>
                </select>
              </div>

              {newPageGroup === '__new__' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#002E51', marginBottom: '6px' }}>
                    Nombre del Nuevo Grupo
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Eventos Especiales"
                    value={customGroup}
                    onChange={(e) => setCustomGroup(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button onClick={() => setShowAddPageModal(false)} style={{ padding: '10px 18px', background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button onClick={handleAddPage} style={{ padding: '10px 20px', background: '#E4007C', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(228,0,124,0.3)' }}>
                  Crear Página y Diseñar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD MODULE SELECTOR (ELEMENTOR PALETTE) */}
      {showAddModuleModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '32px',
              width: '100%',
              maxWidth: '740px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#002E51' }}>
                  Catálogo de 14 Módulos Prediseñados
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  Selecciona la sección que deseas incorporar a esta página.
                </p>
              </div>
              <button onClick={() => setShowAddModuleModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {MODULE_TYPES.map((m) => (
                <div
                  key={m.type}
                  onClick={() => handleAddModule(m.type)}
                  style={{
                    background: '#f8fafc',
                    padding: '18px',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#E4007C';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(228,0,124,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', borderRadius: '10px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      {m.icon}
                    </div>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#002E51' }}>
                      {m.name}
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b', lineHeight: 1.45 }}>
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
