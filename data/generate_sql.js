const fs = require('fs');
const path = require('path');

const dataDir = __dirname;
let sql = '';

sql += `-- =============================================================================\n`;
sql += `-- EXPO MÉXICO MUJER - FULL DATABASE BACKUP (SCHEMA + ALL INSERT DATA)\n`;
sql += `-- Generated: ${new Date().toISOString()}\n`;
sql += `-- =============================================================================\n\n`;

// 1. DDL Statements (CREATE TABLES)
const schemaSql = fs.readFileSync(path.join(dataDir, 'schema.sql'), 'utf-8');
sql += schemaSql + '\n\n';

// 2. Helper to escape SQL strings
function sqlEscape(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return val.toString();
  if (typeof val === 'object') return "'" + JSON.stringify(val).replace(/'/g, "''") + "'";
  return "'" + val.toString().replace(/'/g, "''") + "'";
}

// 3. READ JSON FILES & GENERATE INSERTS

// TRANSLATIONS
try {
  const translations = JSON.parse(fs.readFileSync(path.join(dataDir, 'translations.json'), 'utf-8'));
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- INSERTS: TRANSLATIONS\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;

  function flattenTrans(obj, prefix = '') {
    let rows = [];
    for (let k in obj) {
      if (k === '_custom_pages') continue;
      let pre = prefix ? prefix + '.' + k : k;
      let val = obj[k];
      if (val && typeof val === 'object' && ('es' in val || 'en' in val || 'fr' in val)) {
        rows.push({ key: pre, es: val.es || '', en: val.en || '', fr: val.fr || '' });
      } else if (val && typeof val === 'object') {
        rows = rows.concat(flattenTrans(val, pre));
      }
    }
    return rows;
  }

  const transRows = flattenTrans(translations);
  transRows.forEach((r) => {
    sql += `INSERT INTO translations (translation_key, text_es, text_en, text_fr) VALUES (${sqlEscape(r.key)}, ${sqlEscape(r.es)}, ${sqlEscape(r.en)}, ${sqlEscape(r.fr)}) ON CONFLICT (translation_key) DO UPDATE SET text_es = EXCLUDED.text_es, text_en = EXCLUDED.text_en, text_fr = EXCLUDED.text_fr;\n`;
  });
  sql += '\n';
} catch (e) {}

// PAGES & PAGE MODULES
try {
  const pages = JSON.parse(fs.readFileSync(path.join(dataDir, 'pages.json'), 'utf-8'));
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- INSERTS: PAGES & PAGE MODULES\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;

  pages.forEach((p) => {
    sql += `INSERT INTO pages (page_key, name, url, slug, group_name, is_custom) VALUES (${sqlEscape(p.key)}, ${sqlEscape(p.name)}, ${sqlEscape(p.url)}, ${sqlEscape(p.slug || p.url)}, ${sqlEscape(p.group || 'General')}, ${p.isCustom ? 'TRUE' : 'FALSE'}) ON CONFLICT (page_key) DO UPDATE SET name = EXCLUDED.name, group_name = EXCLUDED.group_name;\n`;

    if (Array.isArray(p.modules)) {
      p.modules.forEach((m, idx) => {
        sql += `INSERT INTO page_modules (id, page_key, module_type, module_order, title, subtitle, content, button_text, button_url, video_url, bg_image, image_position, bg_color, columns, items_json) VALUES (${sqlEscape(m.id || 'mod-' + Date.now() + idx)}, ${sqlEscape(p.key)}, ${sqlEscape(m.type)}, ${idx}, ${sqlEscape(m.title)}, ${sqlEscape(m.subtitle)}, ${sqlEscape(m.content)}, ${sqlEscape(m.buttonText)}, ${sqlEscape(m.buttonUrl)}, ${sqlEscape(m.videoUrl)}, ${sqlEscape(m.bgImage)}, ${sqlEscape(m.imagePosition)}, ${sqlEscape(m.bgColor)}, ${m.columns || 3}, ${sqlEscape(m.items || [])}) ON CONFLICT (id) DO NOTHING;\n`;
      });
    }
  });
  sql += '\n';
} catch (e) {}

// NAVBAR
try {
  const navbar = JSON.parse(fs.readFileSync(path.join(dataDir, 'navbar.json'), 'utf-8'));
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- INSERTS: NAVBAR\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;

  navbar.forEach((g, gIdx) => {
    sql += `INSERT INTO navbar_groups (id, menu_order, label_es, label_en, label_fr, base_path) VALUES (${sqlEscape(g.id)}, ${gIdx + 1}, ${sqlEscape(g.label?.es)}, ${sqlEscape(g.label?.en)}, ${sqlEscape(g.label?.fr)}, ${sqlEscape(g.basePath || '/')}) ON CONFLICT (id) DO UPDATE SET label_es = EXCLUDED.label_es;\n`;

    if (Array.isArray(g.items)) {
      g.items.forEach((it, iIdx) => {
        sql += `INSERT INTO navbar_items (id, group_id, item_order, label_es, label_en, label_fr, href) VALUES (${sqlEscape(it.id)}, ${sqlEscape(g.id)}, ${iIdx + 1}, ${sqlEscape(it.label?.es)}, ${sqlEscape(it.label?.en)}, ${sqlEscape(it.label?.fr)}, ${sqlEscape(it.href)}) ON CONFLICT (id) DO UPDATE SET label_es = EXCLUDED.label_es;\n`;
      });
    }
  });
  sql += '\n';
} catch (e) {}

// EXPOSITORES
try {
  const expositores = JSON.parse(fs.readFileSync(path.join(dataDir, 'expositores.json'), 'utf-8'));
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- INSERTS: EXPOSITORES\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;

  expositores.forEach((ex) => {
    sql += `INSERT INTO exhibitors (id, slug, name, description, category, stand_number, logo, cover_image, website, email, phone, city, state, country, is_featured) VALUES (${sqlEscape(ex.id)}, ${sqlEscape(ex.slug)}, ${sqlEscape(ex.name)}, ${sqlEscape(ex.description)}, ${sqlEscape(ex.category)}, ${sqlEscape(ex.standNumber)}, ${sqlEscape(ex.logo)}, ${sqlEscape(ex.coverImage)}, ${sqlEscape(ex.website)}, ${sqlEscape(ex.email)}, ${sqlEscape(ex.phone)}, ${sqlEscape(ex.city)}, ${sqlEscape(ex.state)}, ${sqlEscape(ex.country || 'México')}, ${ex.isFeatured ? 'TRUE' : 'FALSE'}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n`;
  });
  sql += '\n';
} catch (e) {}

// EMBAJADORAS
try {
  const embajadoras = JSON.parse(fs.readFileSync(path.join(dataDir, 'embajadoras.json'), 'utf-8'));
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- INSERTS: EMBAJADORAS\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;

  embajadoras.forEach((emb) => {
    sql += `INSERT INTO ambassadors (id, slug, name, state, role, bio, photo, linkedin, instagram, is_active) VALUES (${sqlEscape(emb.id)}, ${sqlEscape(emb.slug)}, ${sqlEscape(emb.name)}, ${sqlEscape(emb.state)}, ${sqlEscape(emb.role)}, ${sqlEscape(emb.bio)}, ${sqlEscape(emb.photo)}, ${sqlEscape(emb.linkedin)}, ${sqlEscape(emb.instagram)}, ${emb.isActive !== false ? 'TRUE' : 'FALSE'}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n`;
  });
  sql += '\n';
} catch (e) {}

// COMPRADORES
try {
  const compradores = JSON.parse(fs.readFileSync(path.join(dataDir, 'compradores.json'), 'utf-8'));
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- INSERTS: COMPRADORES\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;

  compradores.forEach((c) => {
    sql += `INSERT INTO buyers (id, slug, name, company, sector, country, interest_areas, photo, website, email) VALUES (${sqlEscape(c.id)}, ${sqlEscape(c.slug)}, ${sqlEscape(c.name)}, ${sqlEscape(c.company)}, ${sqlEscape(c.sector)}, ${sqlEscape(c.country || 'Canadá')}, ${sqlEscape(c.interestAreas)}, ${sqlEscape(c.photo)}, ${sqlEscape(c.website)}, ${sqlEscape(c.email)}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n`;
  });
  sql += '\n';
} catch (e) {}

// PATROCINADORES
try {
  const patrocinadores = JSON.parse(fs.readFileSync(path.join(dataDir, 'patrocinadores.json'), 'utf-8'));
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- INSERTS: PATROCINADORES\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;

  patrocinadores.forEach((pat) => {
    sql += `INSERT INTO sponsors (id, name, tier, logo, website, sponsor_order, is_active) VALUES (${sqlEscape(pat.id)}, ${sqlEscape(pat.name)}, ${sqlEscape(pat.tier)}, ${sqlEscape(pat.logo)}, ${sqlEscape(pat.website)}, ${pat.order || 0}, ${pat.isActive !== false ? 'TRUE' : 'FALSE'}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n`;
  });
  sql += '\n';
} catch (e) {}

// ALIADOS
try {
  const aliados = JSON.parse(fs.readFileSync(path.join(dataDir, 'aliados.json'), 'utf-8'));
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- INSERTS: ALIADOS\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;

  aliados.forEach((al) => {
    sql += `INSERT INTO allies (id, name, category, logo, website, ally_order) VALUES (${sqlEscape(al.id)}, ${sqlEscape(al.name)}, ${sqlEscape(al.category)}, ${sqlEscape(al.logo)}, ${sqlEscape(al.website)}, ${al.order || 0}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n`;
  });
  sql += '\n';
} catch (e) {}

// NOTICIAS
try {
  const noticias = JSON.parse(fs.readFileSync(path.join(dataDir, 'noticias.json'), 'utf-8'));
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- INSERTS: NOTICIAS\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;

  noticias.forEach((n) => {
    sql += `INSERT INTO news (id, slug, title, excerpt, content, image, category, author, published_date, is_featured) VALUES (${sqlEscape(n.id)}, ${sqlEscape(n.slug)}, ${sqlEscape(n.title)}, ${sqlEscape(n.excerpt)}, ${sqlEscape(n.content)}, ${sqlEscape(n.image)}, ${sqlEscape(n.category)}, ${sqlEscape(n.author)}, ${sqlEscape(n.publishedDate || n.date || '2026-07-01')}, ${n.isFeatured ? 'TRUE' : 'FALSE'}) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;\n`;
  });
  sql += '\n';
} catch (e) {}

// HEROES
try {
  const heroes = JSON.parse(fs.readFileSync(path.join(dataDir, 'heroes.json'), 'utf-8'));
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- INSERTS: HEROES BANNERS\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;

  Object.keys(heroes).forEach((route) => {
    let h = heroes[route];
    let routeKey = route.startsWith('/') ? route : '/' + route;
    if (routeKey === '/home') routeKey = '/';
    sql += `INSERT INTO heroes (id, page_route, title_es, title_en, title_fr, subtitle_es, subtitle_en, subtitle_fr, badge_es, badge_en, badge_fr, bg_image, cta_primary_text, cta_primary_url) VALUES (${sqlEscape('hero-' + routeKey.replace(/[^a-z0-9]+/g, '-'))}, ${sqlEscape(routeKey)}, ${sqlEscape(h.title?.es || h.title)}, ${sqlEscape(h.title?.en)}, ${sqlEscape(h.title?.fr)}, ${sqlEscape(h.subtitle?.es || h.subtitle)}, ${sqlEscape(h.subtitle?.en)}, ${sqlEscape(h.subtitle?.fr)}, ${sqlEscape(h.badge?.es || h.badge)}, ${sqlEscape(h.badge?.en)}, ${sqlEscape(h.badge?.fr)}, ${sqlEscape(h.bgImage || h.image)}, ${sqlEscape(h.ctaPrimaryText || h.buttonText)}, ${sqlEscape(h.ctaPrimaryUrl || h.buttonUrl)}) ON CONFLICT (page_route) DO UPDATE SET title_es = EXCLUDED.title_es;\n`;
  });
  sql += '\n';
} catch (e) {}

// BUSINESS CARDS
try {
  const cards = JSON.parse(fs.readFileSync(path.join(dataDir, 'business-cards.json'), 'utf-8'));
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- INSERTS: TARJETAS DIGITALES (BUSINESS CARDS)\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;

  cards.forEach((c, idx) => {
    const cardId = c.id || ('card-' + (c.slug || idx));
    const nameVal = c.name || c.nombre || 'Contacto EMM';
    const titleVal = (typeof c.title === 'string' ? c.title : c.title?.es) || (typeof c.cargo === 'string' ? c.cargo : c.cargo?.es) || 'Representante EMM';
    const bioVal = typeof c.bio === 'string' ? c.bio : c.bio?.es || '';
    const photoVal = c.photo || c.foto || '';
    const phoneVal = c.phone || c.telefono || '';

    sql += `INSERT INTO business_cards (id, slug, name, title, company, bio, photo, email, phone, whatsapp, website, linkedin, instagram, vcard_url) VALUES (${sqlEscape(cardId)}, ${sqlEscape(c.slug)}, ${sqlEscape(nameVal)}, ${sqlEscape(titleVal)}, ${sqlEscape(c.company || c.empresa || 'Expo México Mujer')}, ${sqlEscape(bioVal)}, ${sqlEscape(photoVal)}, ${sqlEscape(c.email)}, ${sqlEscape(phoneVal)}, ${sqlEscape(c.whatsapp)}, ${sqlEscape(c.website)}, ${sqlEscape(c.linkedin)}, ${sqlEscape(c.instagram)}, ${sqlEscape(c.vcardUrl)}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;\n`;
  });
  sql += '\n';
} catch (e) {}

fs.writeFileSync(path.join(dataDir, 'full_backup.sql'), sql, 'utf-8');
console.log('full_backup.sql generated successfully! Total size:', sql.length, 'bytes');
