import fs from 'fs';
import path from 'path';

export interface LocalizedString {
  es: string;
  en: string;
  fr: string;
}

export interface Invitado {
  id: string;
  slug: string;
  tier: LocalizedString;
  name: string;
  logo: string;
  description: LocalizedString;
  website: string;
  contact: string;
  personName: string;
  personPhoto: string;
  bio: LocalizedString;
  gallery: string[];
  category: 'Líderes empresariales' | 'Conferencistas' | 'Personalidades';
}

const dbPath = path.join(process.cwd(), 'data', 'invitados.json');

export const mockInvitados: Invitado[] = (() => {
  try {
    const fileContents = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(fileContents);
  } catch {
    return [];
  }
})();
