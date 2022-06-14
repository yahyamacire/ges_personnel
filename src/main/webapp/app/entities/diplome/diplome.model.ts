import dayjs from 'dayjs/esm';
import { IEmploye } from 'app/entities/employe/employe.model';

export interface IDiplome {
  id?: number;
  libelle?: string | null;
  universite?: string | null;
  date?: dayjs.Dayjs | null;
  description?: string | null;
  diplomeContentType?: string | null;
  diplome?: string | null;
  employe?: IEmploye | null;
}

export class Diplome implements IDiplome {
  constructor(
    public id?: number,
    public libelle?: string | null,
    public universite?: string | null,
    public date?: dayjs.Dayjs | null,
    public description?: string | null,
    public diplomeContentType?: string | null,
    public diplome?: string | null,
    public employe?: IEmploye | null
  ) {}
}

export function getDiplomeIdentifier(diplome: IDiplome): number | undefined {
  return diplome.id;
}
