import { navData, NavDropdown } from '@/config/navData';
import GlobalHero from '@/components/GlobalHero';

// Helper to find title from navData based on slug
function findTitleByPath(path: string): string {
  for (const item of navData) {
    if ('href' in item) {
      if (item.href === path) return item.label;
    } else {
      for (const link of item.items) {
        if (link.href === path) return link.label;
      }
    }
  }
  return "Página en construcción";
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = "/" + slug.join('/');
  const title = findTitleByPath(path);

  return (
    <main className="main-content" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <GlobalHero />
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center', flex: 1 }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#0f172a' }}>
          Próximamente
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
          Estamos trabajando en los detalles de esta sección. Muy pronto encontrarás aquí toda la información oficial sobre <strong>{title}</strong>.
        </p>
      </div>
    </main>
  );
}
