import { IEmploye } from 'app/entities/employe/employe.model';
import { Type } from 'app/entities/enumerations/type.model';

export interface IStructure {
  id?: number;
  nom?: string | null;
  type?: Type | null;
  parent?: IStructure | null;
  employes?: IEmploye[] | null;
}

export class Structure implements IStructure {
  constructor(
    public id?: number,
    public nom?: string | null,
    public type?: Type | null,
    public parent?: IStructure | null,
    public employes?: IEmploye[] | null
  ) {}
}

export function getStructureIdentifier(structure: IStructure): number | undefined {
  return structure.id;
}
