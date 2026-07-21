-- ========================================================
-- TABLA Y CONFIGURACIÓN SQL PARA NUESTRAS VOCES (TESTIMONIOS)
-- Expo México Mujer 2027 (Supabase Database)
-- ========================================================

-- 1. Crear tabla dedicada `testimonios` en Supabase
CREATE TABLE IF NOT EXISTS testimonios (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'Participante',
    title VARCHAR(255) DEFAULT 'Testimonio EMM',
    url TEXT NOT NULL,
    thumb_time NUMERIC DEFAULT 5.0,
    thumb_pos VARCHAR(50) DEFAULT 'center center',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Habilitar RLS (Row Level Security)
ALTER TABLE testimonios ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de acceso público de lectura y escritura
DROP POLICY IF EXISTS "Lectura pública testimonios" ON testimonios;
CREATE POLICY "Lectura pública testimonios" ON testimonios FOR SELECT USING (true);

DROP POLICY IF EXISTS "Edición total testimonios" ON testimonios;
CREATE POLICY "Edición total testimonios" ON testimonios FOR ALL USING (true);
