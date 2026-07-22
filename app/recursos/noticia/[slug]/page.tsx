import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getNoticias, ALL_NOTICIAS } from '../../../data/noticias';
import NoticiaDetailClient from './NoticiaDetailClient';

export const dynamic = 'force-dynamic';

export default async function NoticiaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const noticias = await getNoticias();
  const noticia = noticias.find(n => n.id.toString() === resolvedParams.slug || n.slug === resolvedParams.slug) || ALL_NOTICIAS.find(n => n.id.toString() === resolvedParams.slug);

  if (!noticia) {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--navy)' }}>Noticia no encontrada</h1>
        <Link href="/recursos" style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--magenta)', fontWeight: 700 }}>
          <ArrowLeft size={20} /> Volver a noticias
        </Link>
      </div>
    );
  }

  return <NoticiaDetailClient noticia={noticia} />;
}
