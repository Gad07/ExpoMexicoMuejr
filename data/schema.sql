-- =============================================================================
-- EXPO MÉXICO MUJER - COMPREHENSIVE DATABASE SCHEMA (SQL)
-- Target RDBMS: PostgreSQL / Supabase / Neon / MySQL / MariaDB / SQLite
-- Created: 2026-07-21
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. ADMIN USERS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
    id VARCHAR(255) PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 2. TRANSLATIONS DICTIONARY TABLE (TRI-LINGUAL ES/EN/FR)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS translations (
    translation_key VARCHAR(255) PRIMARY KEY,
    text_es TEXT,
    text_en TEXT,
    text_fr TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 3. CUSTOM PAGES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pages (
    page_key VARCHAR(255) PRIMARY KEY,
    name TEXT,
    url TEXT,
    slug TEXT,
    group_name TEXT DEFAULT 'General',
    is_custom BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 4. PAGE MODULES TABLE (ELEMENTOR BUILDER STRUCTURE - 14 MODULE TYPES)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS page_modules (
    id VARCHAR(255) PRIMARY KEY,
    page_key VARCHAR(255) NOT NULL REFERENCES pages(page_key) ON DELETE CASCADE,
    module_type TEXT NOT NULL,
    module_order INT NOT NULL DEFAULT 0,
    title TEXT,
    subtitle TEXT,
    content TEXT,
    button_text TEXT,
    button_url TEXT,
    video_url TEXT,
    bg_image TEXT,
    image_position TEXT DEFAULT 'right',
    bg_color TEXT DEFAULT 'white',
    columns INT DEFAULT 3,
    items_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 5. NAVBAR MENU STRUCTURE TABLES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS navbar_groups (
    id VARCHAR(255) PRIMARY KEY,
    menu_order INT NOT NULL DEFAULT 0,
    label_es TEXT,
    label_en TEXT,
    label_fr TEXT,
    base_path TEXT DEFAULT '/',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS navbar_items (
    id VARCHAR(255) PRIMARY KEY,
    group_id VARCHAR(255) NOT NULL REFERENCES navbar_groups(id) ON DELETE CASCADE,
    item_order INT NOT NULL DEFAULT 0,
    label_es TEXT,
    label_en TEXT,
    label_fr TEXT,
    href TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 6. EXPOSITORES (EXHIBITORS) & GALLERY TABLES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS exhibitors (
    id VARCHAR(255) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE,
    name TEXT,
    description TEXT,
    category TEXT,
    stand_number TEXT,
    logo TEXT,
    cover_image TEXT,
    website TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'México',
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exhibitor_gallery (
    id VARCHAR(255) PRIMARY KEY,
    exhibitor_id VARCHAR(255) NOT NULL REFERENCES exhibitors(id) ON DELETE CASCADE,
    image_url TEXT,
    caption TEXT,
    photo_order INT DEFAULT 0
);

-- -----------------------------------------------------------------------------
-- 7. EMBAJADORAS (AMBASSADORS) TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ambassadors (
    id VARCHAR(255) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE,
    name TEXT,
    state TEXT,
    role TEXT,
    bio TEXT,
    photo TEXT,
    linkedin TEXT,
    instagram TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 8. COMPRADORES E INVERSIONISTAS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS buyers (
    id VARCHAR(255) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE,
    name TEXT,
    company TEXT,
    sector TEXT,
    country TEXT DEFAULT 'Canadá',
    interest_areas TEXT,
    photo TEXT,
    website TEXT,
    email TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 9. PATROCINADORES (SPONSORS) TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sponsors (
    id VARCHAR(255) PRIMARY KEY,
    name TEXT,
    tier TEXT,
    logo TEXT,
    website TEXT,
    sponsor_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 10. ALIADOS (ALLIES / PARTNERS) TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS allies (
    id VARCHAR(255) PRIMARY KEY,
    name TEXT,
    category TEXT,
    logo TEXT,
    website TEXT,
    ally_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 11. NOTICIAS Y RECURSOS (NEWS & ARTICLES) TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS news (
    id VARCHAR(255) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE,
    title TEXT,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    category TEXT DEFAULT 'Noticias',
    author TEXT DEFAULT 'Equipo EMM',
    published_date DATE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 12. BANNERS HEROES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS heroes (
    id VARCHAR(255) PRIMARY KEY,
    page_route VARCHAR(255) UNIQUE,
    title_es TEXT,
    title_en TEXT,
    title_fr TEXT,
    subtitle_es TEXT,
    subtitle_en TEXT,
    subtitle_fr TEXT,
    badge_es TEXT,
    badge_en TEXT,
    badge_fr TEXT,
    bg_image TEXT,
    cta_primary_text TEXT,
    cta_primary_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 13. TARJETAS DIGITALES DE PRESENTACIÓN (BUSINESS CARDS) TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS business_cards (
    id VARCHAR(255) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE,
    name TEXT,
    title TEXT,
    company TEXT DEFAULT 'Expo México Mujer',
    bio TEXT,
    photo TEXT,
    email TEXT,
    phone TEXT,
    whatsapp TEXT,
    website TEXT,
    linkedin TEXT,
    instagram TEXT,
    vcard_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 14. REAL ANALYTICS TELEMETRY LOGS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS analytics_logs (
    id VARCHAR(255) PRIMARY KEY,
    path TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    device TEXT DEFAULT 'desktop',
    source TEXT DEFAULT 'Directo',
    referer TEXT,
    ip_hash TEXT
);

-- -----------------------------------------------------------------------------
-- 15. CONTACT LEADS & B2B INQUIRIES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_leads (
    id VARCHAR(255) PRIMARY KEY,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    inquiry_type TEXT DEFAULT 'General',
    message TEXT,
    status TEXT DEFAULT 'Nuevo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_pages_url ON pages(url);
CREATE INDEX IF NOT EXISTS idx_modules_page_key ON page_modules(page_key);
CREATE INDEX IF NOT EXISTS idx_exhibitors_slug ON exhibitors(slug);
CREATE INDEX IF NOT EXISTS idx_ambassadors_slug ON ambassadors(slug);
CREATE INDEX IF NOT EXISTS idx_buyers_slug ON buyers(slug);
CREATE INDEX IF NOT EXISTS idx_cards_slug ON business_cards(slug);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_path ON analytics_logs(path);
CREATE INDEX IF NOT EXISTS idx_leads_created ON contact_leads(created_at);

-- =============================================================================
-- SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE navbar_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE navbar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE exhibitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE exhibitor_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE ambassadors ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE allies ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE heroes ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Allow public read access to site content
DO $$ BEGIN CREATE POLICY "Public Read translations" ON translations FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read pages" ON pages FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read page_modules" ON page_modules FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read navbar_groups" ON navbar_groups FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read navbar_items" ON navbar_items FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read exhibitors" ON exhibitors FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read exhibitor_gallery" ON exhibitor_gallery FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read ambassadors" ON ambassadors FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read buyers" ON buyers FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read sponsors" ON sponsors FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read allies" ON allies FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read news" ON news FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read heroes" ON heroes FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Read business_cards" ON business_cards FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Allow public inserts for analytics & contact leads
DO $$ BEGIN CREATE POLICY "Public Insert analytics_logs" ON analytics_logs FOR INSERT WITH CHECK (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Public Insert contact_leads" ON contact_leads FOR INSERT WITH CHECK (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Allow full access to service role / anon for write operations via API
DO $$ BEGIN CREATE POLICY "Allow All translations" ON translations FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow All pages" ON pages FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow All page_modules" ON page_modules FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow All navbar_groups" ON navbar_groups FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow All navbar_items" ON navbar_items FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow All exhibitors" ON exhibitors FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow All ambassadors" ON ambassadors FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow All sponsors" ON sponsors FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow All allies" ON allies FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow All news" ON news FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow All heroes" ON heroes FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
