import sponsorsData from '../../data/patrocinadores.json';

export interface LocalizedString {
  es: string;
  en: string;
  fr: string;
}

export interface Sponsor {
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
}

export const mockSponsors = sponsorsData as any as Sponsor[];
