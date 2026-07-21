import fs from 'fs';
import path from 'path';
import { navData } from '@/config/navData';
import GlobalHero from '@/components/GlobalHero';
import PageModules from '@/components/PageModules';
import BusinessCardPage from '@/app/business-card/[slug]/page';

// Helper to find title from navData based on slug
function findTitleByPath(pathStr: string): string {
  for (const item of navData) {
    if ('href' in item) {
      if (item.href === pathStr) return item.label;
    } else {
      for (const link of item.items) {
        if (link.href === pathStr) return link.label;
      }
    }
  }
  return "Página";
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const pathStr = "/" + slug.join('/');

  // 1. Business Card Check
  if (slug.length === 1) {
    try {
      const dbPath = path.join(process.cwd(), 'data', 'business-cards.json');
      if (fs.existsSync(dbPath)) {
        const cards = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        if (Array.isArray(cards) && cards.some((c: any) => c.slug === slug[0])) {
          return <BusinessCardPage params={Promise.resolve({ slug: slug[0] })} />;
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  // 2. Dynamic Page Builder Check (pages.json)
  try {
    const pagesPath = path.join(process.cwd(), 'data', 'pages.json');
    if (fs.existsSync(pagesPath)) {
      const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
      if (Array.isArray(pages)) {
        const pageConfig = pages.find((p: any) => p.slug === pathStr || p.url === pathStr);
        if (pageConfig && pageConfig.modules && Array.isArray(pageConfig.modules) && pageConfig.modules.length > 0) {
          return (
            <main className="main-content" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <PageModules modules={pageConfig.modules} />
            </main>
          );
        }
      }
    }
  } catch (e) {
    // Ignore error and fallback
  }

  // 3. Fallback Default Template
  const title = findTitleByPath(pathStr);

  return (
    <main className="main-content" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <GlobalHero />
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center', flex: 1 }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#0f172a' }}>
          {title}
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
          Bienvenido a la sección oficial de <strong>{title}</strong>. Puedes personalizar el contenido y la estructura de esta página desde el Administrador de Páginas.
        </p>
      </div>
    </main>
  );
}
