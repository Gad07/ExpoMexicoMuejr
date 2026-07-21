-- ========================================================
-- TABLA Y CONFIGURACIÓN SQL PARA POP-UP PROMOCIONAL
-- Expo México Mujer 2027 (Supabase Database)
-- ========================================================

-- 1. Crear la tabla de popups si no existe
CREATE TABLE IF NOT EXISTS popups (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'popup-main',
    is_active BOOLEAN DEFAULT true,
    title TEXT NOT NULL,
    subtitle TEXT,
    image TEXT,
    image_position VARCHAR(20) DEFAULT 'left',
    show_button BOOLEAN DEFAULT true,
    button_text VARCHAR(100) DEFAULT 'Registrar mi Marca / Stand',
    button_url TEXT DEFAULT '/contacto',
    button_bg_color VARCHAR(30) DEFAULT '#E4007C',
    button_text_color VARCHAR(30) DEFAULT '#ffffff',
    button_hover_bg_color VARCHAR(30) DEFAULT '#ff0d8d',
    bg_gradient TEXT DEFAULT 'linear-gradient(135deg, #002E51 0%, #001C33 100%)',
    text_color VARCHAR(30) DEFAULT '#ffffff',
    trigger_type VARCHAR(20) DEFAULT 'timer',
    trigger_value INTEGER DEFAULT 3,
    display_target VARCHAR(20) DEFAULT 'all',
    custom_pages TEXT DEFAULT '/expo/que-es, /expositores, /visa',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE popups ENABLE ROW LEVEL SECURITY;

-- Políticas de Seguridad RLS para Lectura Pública y Control Admin
DROP POLICY IF EXISTS "Lectura pública de popups" ON popups;
CREATE POLICY "Lectura pública de popups" ON popups FOR SELECT USING (true);

DROP POLICY IF EXISTS "Edición total de popups" ON popups;
CREATE POLICY "Edición total de popups" ON popups FOR ALL USING (true);

-- 2. Insertar o actualizar la configuración por defecto
INSERT INTO popups (
    id,
    is_active,
    title,
    subtitle,
    image,
    image_position,
    show_button,
    button_text,
    button_url,
    button_bg_color,
    button_text_color,
    button_hover_bg_color,
    bg_gradient,
    text_color,
    trigger_type,
    trigger_value,
    display_target,
    custom_pages
) VALUES (
    'popup-main',
    true,
    '¡Gran Convocatoria Expo México Mujer 2027!',
    'Únete como Expositora o Embajadora en Toronto, Canadá. Conecta tu marca con líderes binacionales e inversionistas internacionales.',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    'left',
    true,
    'Registrar mi Marca / Stand',
    '/contacto',
    '#E4007C',
    '#ffffff',
    '#ff0d8d',
    'linear-gradient(135deg, #002E51 0%, #001C33 100%)',
    '#ffffff',
    'timer',
    3,
    'all',
    '/expo/que-es, /expositores, /visa'
) ON CONFLICT (id) DO UPDATE SET
    is_active = EXCLUDED.is_active,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    image = EXCLUDED.image,
    image_position = EXCLUDED.image_position,
    show_button = EXCLUDED.show_button,
    button_text = EXCLUDED.button_text,
    button_url = EXCLUDED.button_url,
    button_bg_color = EXCLUDED.button_bg_color,
    button_text_color = EXCLUDED.button_text_color,
    button_hover_bg_color = EXCLUDED.button_hover_bg_color,
    bg_gradient = EXCLUDED.bg_gradient,
    text_color = EXCLUDED.text_color,
    trigger_type = EXCLUDED.trigger_type,
    trigger_value = EXCLUDED.trigger_value,
    display_target = EXCLUDED.display_target,
    custom_pages = EXCLUDED.custom_pages,
    updated_at = CURRENT_TIMESTAMP;

-- 3. También asegurar registro en la tabla global `page_modules`
INSERT INTO page_modules (id, page_key, module_type, title, subtitle, items_json)
VALUES (
    'popup-main',
    'global',
    'popup',
    '¡Gran Convocatoria Expo México Mujer 2027!',
    'Únete como Expositora o Embajadora en Toronto, Canadá.',
    '{"id":"popup-main","isActive":true,"title":"¡Gran Convocatoria Expo México Mujer 2027!","subtitle":"Únete como Expositora o Embajadora en Toronto, Canadá. Conecta tu marca con líderes binacionales e inversionistas internacionales.","image":"https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800","imagePosition":"left","showButton":true,"buttonText":"Registrar mi Marca / Stand","buttonUrl":"/contacto","buttonBgColor":"#E4007C","buttonTextColor":"#ffffff","buttonHoverBgColor":"#ff0d8d","bgGradient":"linear-gradient(135deg, #002E51 0%, #001C33 100%)","textColor":"#ffffff","triggerType":"timer","triggerValue":3,"displayTarget":"all","customPages":"/expo/que-es, /expositores, /visa"}'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    items_json = EXCLUDED.items_json;
