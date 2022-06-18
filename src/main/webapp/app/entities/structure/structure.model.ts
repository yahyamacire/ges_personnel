import { IEmploye } from 'app/entities/employe/employe.model';
import { Type } from 'app/entities/enumerations/type.model';

export interface IStructure {
  id?: number;
  nom?: string | null;
  type?: Type | null;
  imageContentType?: string | null;
  image?: string | null;
  parent?: IStructure | null;
  employes?: IEmploye[] | null;
  structures?: IStructure[] | null;
}

export class Structure implements IStructure {
  constructor(
    public id?: number,
    public nom?: string | null,
    public type?: Type | null,
    public imageContentType?: string | null,
    public image?: string | null,
    public parent?: IStructure | null,
    public employes?: IEmploye[] | null,
    public structures?: IStructure[] | null
  ) {}
}

export function getStructureIdentifier(structure: IStructure): number | undefined {
  return structure.id;
}
