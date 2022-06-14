import { IEmploye } from 'app/entities/employe/employe.model';
import { ILangue } from 'app/entities/langue/langue.model';
import { Niveau } from 'app/entities/enumerations/niveau.model';

export interface ICompetenceLinguistique {
  id?: number;
  niveau?: Niveau | null;
  employe?: IEmploye | null;
  langue?: ILangue | null;
}

export class CompetenceLinguistique implements ICompetenceLinguistique {
  constructor(public id?: number, public niveau?: Niveau | null, public employe?: IEmploye | null, public langue?: ILangue | null) {}
}

export function getCompetenceLinguistiqueIdentifier(competenceLinguistique: ICompetenceLinguistique): number | undefined {
  return competenceLinguistique.id;
}
