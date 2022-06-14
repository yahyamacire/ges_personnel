import dayjs from 'dayjs/esm';
import { IDiplome } from 'app/entities/diplome/diplome.model';
import { ICompetence } from 'app/entities/competence/competence.model';
import { ICompetenceLinguistique } from 'app/entities/competence-linguistique/competence-linguistique.model';
import { IExperience } from 'app/entities/experience/experience.model';
import { IProjet } from 'app/entities/projet/projet.model';
import { IStructure } from 'app/entities/structure/structure.model';
import { Genre } from 'app/entities/enumerations/genre.model';
import { Fonction } from 'app/entities/enumerations/fonction.model';
import { Status } from 'app/entities/enumerations/status.model';
import { Domaine } from 'app/entities/enumerations/domaine.model';

export interface IEmploye {
  id?: number;
  nni?: number;
  nom?: string;
  prenom?: string;
  sexe?: Genre;
  dateNaissance?: dayjs.Dayjs;
  email?: string;
  telephone?: number;
  dateRecrutement?: dayjs.Dayjs | null;
  matricule?: string | null;
  fonction?: Fonction;
  adresse?: string | null;
  status?: Status | null;
  domaine?: Domaine | null;
  photoContentType?: string | null;
  photo?: string | null;
  diplomes?: IDiplome[] | null;
  competences?: ICompetence[] | null;
  competenceLinguistiques?: ICompetenceLinguistique[] | null;
  experiences?: IExperience[] | null;
  projets?: IProjet[] | null;
  structure?: IStructure | null;
}

export class Employe implements IEmploye {
  constructor(
    public id?: number,
    public nni?: number,
    public nom?: string,
    public prenom?: string,
    public sexe?: Genre,
    public dateNaissance?: dayjs.Dayjs,
    public email?: string,
    public telephone?: number,
    public dateRecrutement?: dayjs.Dayjs | null,
    public matricule?: string | null,
    public fonction?: Fonction,
    public adresse?: string | null,
    public status?: Status | null,
    public domaine?: Domaine | null,
    public photoContentType?: string | null,
    public photo?: string | null,
    public diplomes?: IDiplome[] | null,
    public competences?: ICompetence[] | null,
    public competenceLinguistiques?: ICompetenceLinguistique[] | null,
    public experiences?: IExperience[] | null,
    public projets?: IProjet[] | null,
    public structure?: IStructure | null
  ) {}
}

export function getEmployeIdentifier(employe: IEmploye): number | undefined {
  return employe.id;
}
