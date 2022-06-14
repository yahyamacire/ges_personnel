import dayjs from 'dayjs/esm';
import { IEmploye } from 'app/entities/employe/employe.model';

export interface IExperience {
  id?: number;
  entreprise?: string;
  dateDebut?: dayjs.Dayjs;
  dateFin?: dayjs.Dayjs | null;
  description?: string;
  employe?: IEmploye | null;
}

export class Experience implements IExperience {
  constructor(
    public id?: number,
    public entreprise?: string,
    public dateDebut?: dayjs.Dayjs,
    public dateFin?: dayjs.Dayjs | null,
    public description?: string,
    public employe?: IEmploye | null
  ) {}
}

export function getExperienceIdentifier(experience: IExperience): number | undefined {
  return experience.id;
}
