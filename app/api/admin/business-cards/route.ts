import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'business-cards.json';

interface LocalizedString {
  es: string;
  en: string;
  fr: string;
}

interface LocalizedStringArray {
  es: string[];
  en: string[];
  fr: string[];
}

interface BusinessCard {
  id: string;
  slug: string;
  nombre: string;
  cargo: LocalizedString;
  empresa: string;
  ciudad: string;
  email: string;
  telefono: string;
  whatsapp: string;
  website: string;
  linkedin: string;
  instagram: string;
  foto: string;
  bio: LocalizedString;
  bio2: LocalizedString;
  quote: LocalizedString;
  stats: { num: string; label: string }[];
  fullBio: LocalizedStringArray;
  vision: LocalizedStringArray;
}



// GET - list all or get one by slug
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const cards = readJSON<BusinessCard>(DB_FILE);
    if (slug) {
      const card = cards.find(c => c.slug === slug);
      return card
        ? NextResponse.json({ card })
        : NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    }
    return NextResponse.json({ cards });
  } catch {
    return NextResponse.json({ error: 'Error al leer' }, { status: 500 });
  }
}

// PUT - update a card by slug
export async function PUT(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const cards = readJSON<BusinessCard>(DB_FILE);
    const index = cards.findIndex(c => c.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Business card no encontrada' }, { status: 404 });
    }
    cards[index] = { ...cards[index], ...updates };
    writeJSON(DB_FILE, cards);
    return NextResponse.json({ card: cards[index], message: 'Business card actualizada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}

// POST - create a new card
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const cards = readJSON<BusinessCard>(DB_FILE);
    
    // Generate simple ID
    const newId = Date.now().toString();
    const newCard: BusinessCard = {
      ...body,
      id: newId,
      slug: body.slug || `card-${newId}`,
    };
    
    cards.push(newCard);
    writeJSON(DB_FILE, cards);
    return NextResponse.json({ card: newCard, message: 'Business card creada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al crear' }, { status: 500 });
  }
}

// DELETE - delete a card by id
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    let cards = readJSON<BusinessCard>(DB_FILE);
    const exists = cards.find(c => c.id === id);
    if (!exists) {
      return NextResponse.json({ error: 'No encontrada' }, { status: 404 });
    }
    cards = cards.filter(c => c.id !== id);
    writeJSON(DB_FILE, cards);
    return NextResponse.json({ message: 'Eliminada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
  }
}
