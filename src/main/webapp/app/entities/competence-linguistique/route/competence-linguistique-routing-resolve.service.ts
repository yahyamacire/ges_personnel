import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICompetenceLinguistique, CompetenceLinguistique } from '../competence-linguistique.model';
import { CompetenceLinguistiqueService } from '../service/competence-linguistique.service';

@Injectable({ providedIn: 'root' })
export class CompetenceLinguistiqueRoutingResolveService implements Resolve<ICompetenceLinguistique> {
  constructor(protected service: CompetenceLinguistiqueService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICompetenceLinguistique> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((competenceLinguistique: HttpResponse<CompetenceLinguistique>) => {
          if (competenceLinguistique.body) {
            return of(competenceLinguistique.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CompetenceLinguistique());
  }
}
