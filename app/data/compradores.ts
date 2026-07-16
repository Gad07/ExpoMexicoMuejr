import fs from 'fs';
import path from 'path';

export interface LocalizedString {
  es: string;
  en: string;
  fr: string;
}

export interface Comprador {
  id: string;
  slug: string;
  name: string;
  company: string;
  role: LocalizedString;
  location: string;
  interest: LocalizedString;
  description: LocalizedString;
  photo: string;
  cover: string;
  color: string;
  bgColor: string;
  bio: LocalizedString;
  website: string;
  contact: string;
  gallery: string[];
}

const dbPath = path.join(process.cwd(), 'data', 'compradores.json');

export const mockBuyers: Comprador[] = (() => {
  try {
    const fileContents = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(fileContents);
  } catch {
    return [];
  }
})();
