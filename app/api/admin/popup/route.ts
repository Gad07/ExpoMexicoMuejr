import { NextResponse } from 'next/server';
import { readJSON, writeJSON, getSupabase } from '@/lib/db';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

const DB_FILE = 'popup.json';

export interface PopupConfig {
  id?: string;
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

const DEFAULT_POPUP: PopupConfig = {
  id: 'popup-main',
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
  displayTarget: 'all',
  customPages: '/expo/que-es, /expositores, /visa',
  delaySeconds: 3,
};

function checkAuth(request: Request): boolean {
  if (process.env.NODE_ENV === 'development') return true;
  const cookieHeader = request.headers.get('cookie') || '';
  if (cookieHeader.includes('next-auth.session-token') || cookieHeader.includes('__Secure-next-auth.session-token')) {
    return true;
  }
  const token = getTokenFromRequest(request);
  if (token) return true;
  const authHeader = request.headers.get('authorization');
  if (authHeader) return true;
  return true;
}

export async function GET() {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from('page_modules').select('*').eq('id', 'popup-main').single();
      if (!error && data) {
        const config = typeof data.items_json === 'string' ? JSON.parse(data.items_json) : data.items_json;
        return NextResponse.json({ popup: { ...DEFAULT_POPUP, ...config } });
      }
    }

    const localData = readJSON<PopupConfig>(DB_FILE);
    if (localData && localData.length > 0) {
      return NextResponse.json({ popup: { ...DEFAULT_POPUP, ...localData[0] } });
    }

    return NextResponse.json({ popup: DEFAULT_POPUP });
  } catch {
    return NextResponse.json({ popup: DEFAULT_POPUP });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const config: PopupConfig = {
      id: 'popup-main',
      isActive: body.isActive !== false,
      title: body.title || '',
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

    const supabase = getSupabase();
    if (supabase) {
      await supabase.from('popups').upsert({
        id: 'popup-main',
        is_active: config.isActive,
        title: config.title,
        subtitle: config.subtitle,
        image: config.image,
        image_position: config.imagePosition,
        show_button: config.showButton,
        button_text: config.buttonText,
        button_url: config.buttonUrl,
        button_bg_color: config.buttonBgColor,
        button_text_color: config.buttonTextColor,
        button_hover_bg_color: config.buttonHoverBgColor,
        bg_gradient: config.bgGradient,
        text_color: config.textColor,
        trigger_type: config.triggerType,
        trigger_value: config.triggerValue,
        display_target: config.displayTarget,
        custom_pages: config.customPages,
      });

      await supabase.from('page_modules').upsert({
        id: 'popup-main',
        page_key: 'global',
        module_type: 'popup',
        title: config.title,
        subtitle: config.subtitle,
        items_json: config,
      });
    }

    writeJSON(DB_FILE, [config]);

    return NextResponse.json({ popup: config, message: 'Pop-Up guardado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al guardar Pop-Up' }, { status: 500 });
  }
}
