import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const DB_FILE = 'agendas.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const agendas = readJSON<any>(DB_FILE);
    
    if (slug) {
      const agenda = agendas.find((a: any) => a.slug === slug);
      return agenda
        ? NextResponse.json({ agenda })
        : NextResponse.json({ error: 'Agenda no encontrada' }, { status: 404 });
    }
    return NextResponse.json({ agendas });
  } catch {
    return NextResponse.json({ error: 'Error al leer' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const agendas = readJSON<any>(DB_FILE);
    const index = agendas.findIndex((a: any) => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Agenda no encontrada' }, { status: 404 });
    }
    agendas[index] = { ...agendas[index], ...updates };
    writeJSON(DB_FILE, agendas);
    return NextResponse.json({ agenda: agendas[index], message: 'Agenda actualizada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const agendas = readJSON<any>(DB_FILE);
    
    const newId = Date.now().toString();
    const newAgenda = {
      ...body,
      id: newId,
      slug: body.slug || `agenda-${newId}`,
    };
    
    agendas.push(newAgenda);
    writeJSON(DB_FILE, agendas);
    return NextResponse.json({ agenda: newAgenda, message: 'Agenda creada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al crear' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    let agendas = readJSON<any>(DB_FILE);
    const exists = agendas.find((a: any) => a.id === id);
    if (!exists) {
      return NextResponse.json({ error: 'No encontrada' }, { status: 404 });
    }
    agendas = agendas.filter((a: any) => a.id !== id);
    writeJSON(DB_FILE, agendas);
    return NextResponse.json({ message: 'Eliminada exitosamente' });
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
  }
}
