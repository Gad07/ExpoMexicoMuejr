import aliadosData from '../../data/aliados.json';

export interface Ally {
  id: string;
  name: string;
  logo: string;
  website: string;
  color: string;
}

export const ALL_ALIADOS = aliadosData as Ally[];
