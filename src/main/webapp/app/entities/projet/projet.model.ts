import dayjs from 'dayjs/esm';
import { IEmploye } from 'app/entities/employe/employe.model';

export interface IProjet {
  id?: number;
  nom?: string | null;
  dateDebut?: dayjs.Dayjs | null;
  dateFin?: dayjs.Dayjs | null;
  description?: string | null;
  employes?: IEmploye[] | null;
}

export class Projet implements IProjet {
  constructor(
    public id?: number,
    public nom?: string | null,
    public dateDebut?: dayjs.Dayjs | null,
    public dateFin?: dayjs.Dayjs | null,
    public description?: string | null,
    public employes?: IEmploye[] | null
  ) {}
}

export function getProjetIdentifier(projet: IProjet): number | undefined {
  return projet.id;
}
