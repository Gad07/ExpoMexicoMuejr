import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'compradores.json';

interface Comprador {
  id: string;
  slug: string;
  name: string;
  company: string;
  role: string;
  location: string;
  interest: string;
  description: string;
  photo: string;
  cover: string;
  color: string;
  bgColor: string;
  bio: string;
  website: string;
  contact: string;
  gallery: string[];
}



function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getNextId(compradores: Comprador[]): string {
  if (compradores.length === 0) return 'buyer-1';
  const numericIds = compradores
    .map(a => parseInt(a.id.replace('buyer-', '')))
    .filter(id => !isNaN(id));
  if (numericIds.length === 0) return 'buyer-1';
  return `buyer-${Math.max(...numericIds) + 1}`;
}

// GET /api/admin/compradores - List all buyers
export async function GET(request: Request) {
  try {
    const compradores = readJSON<Comprador>(DB_FILE);
    return NextResponse.json({ compradores });
  } catch {
    return NextResponse.json({ error: 'Error al leer compradores' }, { status: 500 });
  }
}

// POST /api/admin/compradores - Create new buyer
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const compradores = readJSON<Comprador>(DB_FILE);

    const newComprador: Comprador = {
      id: getNextId(compradores),
      slug: body.slug || slugify(body.name || ''),
      name: body.name || '',
      company: body.company || '',
      role: body.role || { es: '', en: '', fr: '' },
      location: body.location || '',
      interest: body.interest || { es: '', en: '', fr: '' },
      description: body.description || { es: '', en: '', fr: '' },
      photo: body.photo || '',
      cover: body.cover || '',
      color: body.color || 'var(--magenta)',
      bgColor: body.bgColor || 'var(--magenta)10',
      bio: body.bio || { es: '', en: '', fr: '' },
      website: body.website || '',
      contact: body.contact || '',
      gallery: body.gallery || [],
    };

    compradores.push(newComprador);
    writeJSON(DB_FILE, compradores);

    return NextResponse.json({ comprador: newComprador, message: 'Comprador creado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al crear comprador' }, { status: 500 });
  }
}

// PUT /api/admin/compradores - Update existing buyer
export async function PUT(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const compradores = readJSON<Comprador>(DB_FILE);
    const index = compradores.findIndex(a => a.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Comprador no encontrado' }, { status: 404 });
    }

    const updatedComprador: Comprador = {
      ...compradores[index],
      name: body.name || compradores[index].name,
      slug: body.name ? slugify(body.name) : compradores[index].slug,
      company: body.company || compradores[index].company,
      role: body.role || compradores[index].role,
      location: body.location || compradores[index].location,
      interest: body.interest || compradores[index].interest,
      description: body.description !== undefined ? body.description : compradores[index].description,
      photo: body.photo !== undefined ? body.photo : compradores[index].photo,
      cover: body.cover !== undefined ? body.cover : compradores[index].cover,
      color: body.color || compradores[index].color,
      bgColor: body.bgColor || compradores[index].bgColor,
      bio: body.bio !== undefined ? body.bio : compradores[index].bio,
      website: body.website !== undefined ? body.website : compradores[index].website,
      contact: body.contact !== undefined ? body.contact : compradores[index].contact,
      gallery: body.gallery !== undefined ? body.gallery : compradores[index].gallery,
    };

    compradores[index] = updatedComprador;
    writeJSON(DB_FILE, compradores);

    return NextResponse.json({ comprador: updatedComprador, message: 'Comprador actualizado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar comprador' }, { status: 500 });
  }
}

// DELETE /api/admin/compradores - Delete existing buyer
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const compradores = readJSON<Comprador>(DB_FILE);
    const filtered = compradores.filter(a => a.id !== body.id);

    if (filtered.length === compradores.length) {
      return NextResponse.json({ error: 'Comprador no encontrado' }, { status: 404 });
    }

    writeJSON(DB_FILE, filtered);
    return NextResponse.json({ message: 'Comprador eliminado exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar comprador' }, { status: 500 });
  }
}
