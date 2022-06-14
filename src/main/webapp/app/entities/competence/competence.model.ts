import { IEmploye } from 'app/entities/employe/employe.model';

export interface ICompetence {
  id?: number;
  nom?: string | null;
  description?: string | null;
  employe?: IEmploye | null;
}

export class Competence implements ICompetence {
  constructor(public id?: number, public nom?: string | null, public description?: string | null, public employe?: IEmploye | null) {}
}

export function getCompetenceIdentifier(competence: ICompetence): number | undefined {
  return competence.id;
}
