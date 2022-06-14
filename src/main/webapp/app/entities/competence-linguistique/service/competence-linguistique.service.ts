import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICompetenceLinguistique, getCompetenceLinguistiqueIdentifier } from '../competence-linguistique.model';

export type EntityResponseType = HttpResponse<ICompetenceLinguistique>;
export type EntityArrayResponseType = HttpResponse<ICompetenceLinguistique[]>;

@Injectable({ providedIn: 'root' })
export class CompetenceLinguistiqueService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/competence-linguistiques');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(competenceLinguistique: ICompetenceLinguistique): Observable<EntityResponseType> {
    return this.http.post<ICompetenceLinguistique>(this.resourceUrl, competenceLinguistique, { observe: 'response' });
  }

  update(competenceLinguistique: ICompetenceLinguistique): Observable<EntityResponseType> {
    return this.http.put<ICompetenceLinguistique>(
      `${this.resourceUrl}/${getCompetenceLinguistiqueIdentifier(competenceLinguistique) as number}`,
      competenceLinguistique,
      { observe: 'response' }
    );
  }

  partialUpdate(competenceLinguistique: ICompetenceLinguistique): Observable<EntityResponseType> {
    return this.http.patch<ICompetenceLinguistique>(
      `${this.resourceUrl}/${getCompetenceLinguistiqueIdentifier(competenceLinguistique) as number}`,
      competenceLinguistique,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompetenceLinguistique>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompetenceLinguistique[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCompetenceLinguistiqueToCollectionIfMissing(
    competenceLinguistiqueCollection: ICompetenceLinguistique[],
    ...competenceLinguistiquesToCheck: (ICompetenceLinguistique | null | undefined)[]
  ): ICompetenceLinguistique[] {
    const competenceLinguistiques: ICompetenceLinguistique[] = competenceLinguistiquesToCheck.filter(isPresent);
    if (competenceLinguistiques.length > 0) {
      const competenceLinguistiqueCollectionIdentifiers = competenceLinguistiqueCollection.map(
        competenceLinguistiqueItem => getCompetenceLinguistiqueIdentifier(competenceLinguistiqueItem)!
      );
      const competenceLinguistiquesToAdd = competenceLinguistiques.filter(competenceLinguistiqueItem => {
        const competenceLinguistiqueIdentifier = getCompetenceLinguistiqueIdentifier(competenceLinguistiqueItem);
        if (
          competenceLinguistiqueIdentifier == null ||
          competenceLinguistiqueCollectionIdentifiers.includes(competenceLinguistiqueIdentifier)
        ) {
          return false;
        }
        competenceLinguistiqueCollectionIdentifiers.push(competenceLinguistiqueIdentifier);
        return true;
      });
      return [...competenceLinguistiquesToAdd, ...competenceLinguistiqueCollection];
    }
    return competenceLinguistiqueCollection;
  }
}
