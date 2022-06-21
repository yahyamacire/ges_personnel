import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmploye, getEmployeIdentifier } from '../employe.model';
import { IDiplome, getDiplomeIdentifier } from '../../diplome/diplome.model';
import { IExperience, getExperienceIdentifier } from '../../experience/experience.model';

export type EntityResponseType = HttpResponse<IEmploye>;
export type EntityArrayResponseType = HttpResponse<IEmploye[]>;

@Injectable({ providedIn: 'root' })
export class EmployeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employes');
  protected resourceEmploesUrl = this.applicationConfigService.getEndpointFor('api/structures/employes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(employe: IEmploye): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .post<IEmploye>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(employe: IEmploye): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .put<IEmploye>(`${this.resourceUrl}/${getEmployeIdentifier(employe) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(employe: IEmploye): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .patch<IEmploye>(`${this.resourceUrl}/${getEmployeIdentifier(employe) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEmploye>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEmploye[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  listEmployes(structureId: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<IEmploye[]>(`${this.resourceEmploesUrl}/${structureId}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEmployeToCollectionIfMissing(employeCollection: IEmploye[], ...employesToCheck: (IEmploye | null | undefined)[]): IEmploye[] {
    const employes: IEmploye[] = employesToCheck.filter(isPresent);
    if (employes.length > 0) {
      const employeCollectionIdentifiers = employeCollection.map(employeItem => getEmployeIdentifier(employeItem)!);
      const employesToAdd = employes.filter(employeItem => {
        const employeIdentifier = getEmployeIdentifier(employeItem);
        if (employeIdentifier == null || employeCollectionIdentifiers.includes(employeIdentifier)) {
          return false;
        }
        employeCollectionIdentifiers.push(employeIdentifier);
        return true;
      });
      return [...employesToAdd, ...employeCollection];
    }
    return employeCollection;
  }

  protected convertDateFromClient(employe: IEmploye): IEmploye {
    return Object.assign({}, employe, {
      dateNaissance: employe.dateNaissance?.isValid() ? employe.dateNaissance.toJSON() : undefined,
      dateRecrutement: employe.dateRecrutement?.isValid() ? employe.dateRecrutement.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaissance = res.body.dateNaissance ? dayjs(res.body.dateNaissance) : undefined;
      res.body.dateRecrutement = res.body.dateRecrutement ? dayjs(res.body.dateRecrutement) : undefined;

      if (res.body.diplomes) {
        res.body.diplomes.forEach((diplome: IDiplome) => {
          diplome.date = diplome.date ? dayjs(diplome.date) : undefined;
        });
      }

      if (res.body.experiences) {
        res.body.experiences.forEach((experience: IExperience) => {
          experience.dateDebut = experience.dateDebut ? dayjs(experience.dateDebut) : undefined;
          experience.dateFin = experience.dateFin ? dayjs(experience.dateFin) : undefined;
        });
      }
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((employe: IEmploye) => {
        employe.dateNaissance = employe.dateNaissance ? dayjs(employe.dateNaissance) : undefined;
        employe.dateRecrutement = employe.dateRecrutement ? dayjs(employe.dateRecrutement) : undefined;
      });
    }
    return res;
  }
}
