export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { readJSONAsync, writeJSONAsync, getSupabase } from '@/lib/db';
import { checkAuth } from '@/lib/auth';
import { cleanDropboxUrlsInObject } from '@/lib/dropbox';

const DB_FILE = 'popup.json';

export interface PopupConfig {
  id: string;
  name: string;
  isActive: boolean;
  title: string;
  subtitle: string;
  image: string;
  imagePosition: 'left' | 'right' | 'top' | 'background';
  showButton: boolean;
  buttonText: string;
  buttonUrl: string;
  buttonBgColor: string;
  buttonTextColor: string;
  buttonHoverBgColor: string;
  bgGradient: string;
  textColor: string;
  triggerType: 'timer' | 'scroll' | 'exit';
  triggerValue: number; // seconds for timer, percentage 1-100 for scroll
  displayTarget: 'all' | 'home' | 'custom';
  customPages: string; // Comma separated paths, e.g. "/expositores, /visa, /agenda"
  delaySeconds?: number;
}

const DEFAULT_POPUPS: PopupConfig[] = [
  {
    id: 'popup-1',
    name: 'Convocatoria General Expo 2027',
    isActive: true,
    title: '¡Gran Convocatoria Expo México Mujer 2027!',
    subtitle: 'Únete como Expositora o Embajadora en Toronto, Canadá. Conecta tu marca con líderes binacionales e inversionistas internacionales.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    imagePosition: 'left',
    showButton: true,
    buttonText: 'Registrar mi Marca / Stand',
    buttonUrl: '/contacto',
    buttonBgColor: '#E4007C',
    buttonTextColor: '#ffffff',
    buttonHoverBgColor: '#ff0d8d',
    bgGradient: 'linear-gradient(135deg, #002E51 0%, #001C33 100%)',
    textColor: '#ffffff',
    triggerType: 'timer',
    triggerValue: 3,
    displayTarget: 'home',
    customPages: '',
    delaySeconds: 3,
  },
  {
    id: 'popup-2',
    name: 'Promoción Expositores & Stands',
    isActive: false,
    title: 'Reserva tu Stand Comercial en Toronto',
    subtitle: 'Obtén espacio preferencial y networking exclusivo con compradores de Canadá y Estados Unidos.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    imagePosition: 'right',
    showButton: true,
    buttonText: 'Ver Beneficios Expositores',
    buttonUrl: '/expositores',
    buttonBgColor: '#E4007C',
    buttonTextColor: '#ffffff',
    buttonHoverBgColor: '#ff0d8d',
    bgGradient: 'linear-gradient(135deg, #111827 0%, #000000 100%)',
    textColor: '#ffffff',
    triggerType: 'scroll',
    triggerValue: 40,
    displayTarget: 'custom',
    customPages: '/expositores, /participa',
    delaySeconds: 3,
  }
];

function getRoutesForPopup(pop: PopupConfig): string[] {
  if (pop.displayTarget === 'all') return ['*'];
  if (pop.displayTarget === 'home') return ['/'];
  if (pop.displayTarget === 'custom' && pop.customPages) {
    return pop.customPages
      .split(',')
      .map((p) => p.trim().toLowerCase())
      .filter(Boolean)
      .map((p) => (p === '/' ? '/' : p.replace(/\/$/, '')));
  }
  return [];
}

function findRouteConflict(
  targetPop: PopupConfig,
  allPops: PopupConfig[]
): { conflictRoute: string; conflictingPopName: string } | null {
  if (!targetPop.isActive) return null;

  const targetRoutes = getRoutesForPopup(targetPop);
  const otherActivePops = allPops.filter((p) => p.id !== targetPop.id && p.isActive);

  for (const otherPop of otherActivePops) {
    const otherRoutes = getRoutesForPopup(otherPop);
    const otherName = otherPop.name || otherPop.title || otherPop.id;

    // If target is global 'all' ('*') and other active pop-ups exist
    if (targetRoutes.includes('*')) {
      return { conflictRoute: 'Todas las páginas (Global)', conflictingPopName: otherName };
    }
    // If another active pop-up is global 'all' ('*')
    if (otherRoutes.includes('*')) {
      return { conflictRoute: 'Pop-Up Global Activo', conflictingPopName: otherName };
    }

    // Check specific route matches
    for (const r of targetRoutes) {
      for (const or of otherRoutes) {
        if (r === or || (or !== '/' && r.startsWith(or)) || (r !== '/' && or.startsWith(r))) {
          return { conflictRoute: r === '*' ? 'Todas' : r, conflictingPopName: otherName };
        }
      }
    }
  }

  return null;
}

// GET - List all popups and active popups
export async function GET() {
  const cacheHeaders = {
    'Cache-Control': 'public, max-age=10, s-maxage=30, stale-while-revalidate=60',
  };

  try {
    let popups: PopupConfig[] = await readJSONAsync<PopupConfig>(DB_FILE);

    if (!popups || !Array.isArray(popups) || popups.length === 0) {
      popups = DEFAULT_POPUPS;
      await writeJSONAsync(DB_FILE, popups);
    }

    const cleaned = cleanDropboxUrlsInObject(popups);
    const activePopups = cleaned.filter((p) => p.isActive);

    return NextResponse.json(
      {
        popups: cleaned,
        activePopups,
        // Backward compatibility single popup field:
        popup: activePopups.length > 0 ? activePopups[0] : cleaned[0] || DEFAULT_POPUPS[0],
      },
      { headers: cacheHeaders }
    );
  } catch {
    return NextResponse.json(
      {
        popups: DEFAULT_POPUPS,
        activePopups: DEFAULT_POPUPS.filter((p) => p.isActive),
        popup: DEFAULT_POPUPS[0],
      },
      { headers: cacheHeaders }
    );
  }
}

// POST - Create a new popup or replace list
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const rawBody = await request.json();
    const body = cleanDropboxUrlsInObject(rawBody);

    let popups: PopupConfig[] = await readJSONAsync<PopupConfig>(DB_FILE);
    if (!Array.isArray(popups)) popups = [];

    // If body contains popups array (full list update)
    if (body.popups && Array.isArray(body.popups)) {
      await writeJSONAsync(DB_FILE, body.popups);
      return NextResponse.json({ popups: body.popups, message: 'Pop-ups guardados exitosamente' });
    }

    const newPop: PopupConfig = {
      id: body.id || `popup-${Date.now()}`,
      name: body.name || body.title || 'Nuevo Pop-Up',
      isActive: body.isActive === true,
      title: body.title || 'Título del Pop-Up',
      subtitle: body.subtitle || '',
      image: body.image || '',
      imagePosition: body.imagePosition || 'left',
      showButton: body.showButton !== false,
      buttonText: body.buttonText || 'Saber Más',
      buttonUrl: body.buttonUrl || '/',
      buttonBgColor: body.buttonBgColor || '#E4007C',
      buttonTextColor: body.buttonTextColor || '#ffffff',
      buttonHoverBgColor: body.buttonHoverBgColor || '#ff0d8d',
      bgGradient: body.bgGradient || 'linear-gradient(135deg, #002E51 0%, #001C33 100%)',
      textColor: body.textColor || '#ffffff',
      triggerType: body.triggerType || 'timer',
      triggerValue: Number(body.triggerValue) || 3,
      displayTarget: body.displayTarget || 'all',
      customPages: body.customPages || '',
      delaySeconds: Number(body.triggerValue) || 3,
    };

    // Route conflict check if trying to activate
    if (newPop.isActive) {
      const conflict = findRouteConflict(newPop, popups);
      if (conflict) {
        return NextResponse.json(
          {
            error: `Conflicto de ruta: La ruta '${conflict.conflictRoute}' ya tiene un Pop-Up activo ('${conflict.conflictingPopName}'). Desactiva el otro Pop-Up o cambia la ruta para poder activarlo.`,
          },
          { status: 400 }
        );
      }
    }

    popups.push(newPop);
    await writeJSONAsync(DB_FILE, popups);

    return NextResponse.json({ popup: newPop, popups, message: 'Pop-Up creado exitosamente' });
  } catch (err: any) {
    console.error('Error in POST /api/admin/popup:', err);
    return NextResponse.json({ error: 'Error al crear Pop-Up' }, { status: 500 });
  }
}

// PUT - Update a popup
export async function PUT(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const rawBody = await request.json();
    const body = cleanDropboxUrlsInObject(rawBody);

    let popups: PopupConfig[] = await readJSONAsync<PopupConfig>(DB_FILE);
    if (!Array.isArray(popups)) popups = [];

    const index = popups.findIndex((p) => p.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Pop-Up no encontrado' }, { status: 404 });
    }

    const updatedPop: PopupConfig = {
      ...popups[index],
      ...body,
      triggerValue: Number(body.triggerValue ?? popups[index].triggerValue) || 3,
    };

    // Route conflict check if active
    if (updatedPop.isActive) {
      const conflict = findRouteConflict(updatedPop, popups);
      if (conflict) {
        return NextResponse.json(
          {
            error: `Conflicto de ruta: La ruta '${conflict.conflictRoute}' ya tiene un Pop-Up activo ('${conflict.conflictingPopName}'). Desactiva el otro Pop-Up o cambia la ruta para poder activarlo.`,
          },
          { status: 400 }
        );
      }
    }

    popups[index] = updatedPop;
    await writeJSONAsync(DB_FILE, popups);

    return NextResponse.json({ popup: updatedPop, popups, message: 'Pop-Up actualizado exitosamente' });
  } catch (err: any) {
    console.error('Error in PUT /api/admin/popup:', err);
    return NextResponse.json({ error: 'Error al actualizar Pop-Up' }, { status: 500 });
  }
}

// DELETE - Delete a popup
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID de Pop-Up requerido' }, { status: 400 });

    let popups: PopupConfig[] = await readJSONAsync<PopupConfig>(DB_FILE);
    if (!Array.isArray(popups)) popups = [];

    const exists = popups.some((p) => p.id === id);
    if (!exists) return NextResponse.json({ error: 'Pop-Up no encontrado' }, { status: 404 });

    popups = popups.filter((p) => p.id !== id);
    await writeJSONAsync(DB_FILE, popups);

    return NextResponse.json({ popups, message: 'Pop-Up eliminado exitosamente' });
  } catch (err: any) {
    console.error('Error in DELETE /api/admin/popup:', err);
    return NextResponse.json({ error: 'Error al eliminar Pop-Up' }, { status: 500 });
  }
}
