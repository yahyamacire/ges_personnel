import { ICompetenceLinguistique } from 'app/entities/competence-linguistique/competence-linguistique.model';

export interface ILangue {
  id?: number;
  nom?: string | null;
  competenceLinguistiques?: ICompetenceLinguistique[] | null;
}

export class Langue implements ILangue {
  constructor(public id?: number, public nom?: string | null, public competenceLinguistiques?: ICompetenceLinguistique[] | null) {}
}

export function getLangueIdentifier(langue: ILangue): number | undefined {
  return langue.id;
}
